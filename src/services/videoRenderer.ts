import type { TemplateId, WeddingProject } from '../types/wedding';
import { audioService } from './audioService';
import { getBrowserCapabilities } from './browserCapabilities';
import { indexedDBService } from './indexedDBService';

// Import all renderers
import { renderSampoornaKashi } from '../templates/renderers/sampoornaKashi';
import { renderDivineTemple } from '../templates/renderers/divineTemple';
import { renderSampoornaHindi } from '../templates/renderers/sampoornaHindi';
import { renderRoyalCreamPalace } from '../templates/renderers/royalCreamPalace';
import { renderCinematicWedding } from '../templates/renderers/cinematicWedding';
import { renderClassicIndian } from '../templates/renderers/classicIndian';
import { renderFloralDreams } from '../templates/renderers/floralDreams';
import { renderFloralMandap } from '../templates/renderers/floralMandap';
import { renderGoldenCelebration } from '../templates/renderers/goldenCelebration';
import { renderModernLove } from '../templates/renderers/modernLove';
import { renderRoyalMaharaja } from '../templates/renderers/royalMaharaja';
import { renderRoyalRajasthani } from '../templates/renderers/royalRajasthani';
import { renderShubhVivah } from '../templates/renderers/shubhVivah';
import { renderTraditionalIndian } from '../templates/renderers/traditionalIndian';
import { drawCinematicTransition } from '../templates/renderers/common';

export interface LoadedImages {
  bride?: HTMLImageElement;
  groom?: HTMLImageElement;
  couple?: HTMLImageElement;
  family?: HTMLImageElement;
}

export type GenerationStage =
  | 'idle'
  | 'validating'
  | 'loading_assets'
  | 'preparing_audio'
  | 'rendering_frames'
  | 'finalizing'
  | 'completed'
  | 'error';

export interface GenerationProgress {
  stage: GenerationStage;
  percent: number; // 0 to 100
  currentFrame: number;
  totalFrames: number;
  fps: number;
  message: string;
  error?: string;
  videoBlob?: Blob;
  videoUrl?: string;
  fileSize?: string;
  format?: 'mp4' | 'webm';
}

/**
 * Loads an image from a dataUrl, URL or Blob safely
 */
export async function loadImage(src?: string): Promise<HTMLImageElement | undefined> {
  if (!src) return undefined;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn('Failed to load image:', src.slice(0, 40));
      resolve(undefined);
    };
    img.src = src;
  });
}

/**
 * Preload all project images into HTMLImageElements for instantaneous canvas rendering
 */
export async function preloadProjectImages(project: WeddingProject): Promise<LoadedImages> {
  const [bride, groom, couple, family] = await Promise.all([
    loadImage(project.photos.bridePhoto),
    loadImage(project.photos.groomPhoto),
    loadImage(project.photos.couplePhoto),
    loadImage(project.photos.familyPhoto),
  ]);

  return { bride, groom, couple, family };
}

/**
 * Universal frame renderer: draws a single frame of the chosen template at time `t`
 */
export function renderTemplateFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  duration: number,
  project: WeddingProject,
  images: LoadedImages
) {
  const templateId: TemplateId = project.templateId || 'royal-maharaja';

  switch (templateId) {
    case 'sampoorna-kashi':
      renderSampoornaKashi(ctx, width, height, time, duration, project, images);
      break;
    case 'divine-temple':
      renderDivineTemple(ctx, width, height, time, duration, project, images);
      break;
    case 'sampoorna-hindi':
      renderSampoornaHindi(ctx, width, height, time, duration, project, images);
      break;
    case 'royal-cream-palace':
      renderRoyalCreamPalace(ctx, width, height, time, duration, project, images);
      break;
    case 'royal-maharaja':
      renderRoyalMaharaja(ctx, width, height, time, duration, project, images);
      break;
    case 'shubh-vivah':
      renderShubhVivah(ctx, width, height, time, duration, project, images);
      break;
    case 'royal-rajasthani':
      renderRoyalRajasthani(ctx, width, height, time, duration, project, images);
      break;
    case 'floral-dreams':
      renderFloralDreams(ctx, width, height, time, duration, project, images);
      break;
    case 'modern-love':
      renderModernLove(ctx, width, height, time, duration, project, images);
      break;
    case 'golden-celebration':
      renderGoldenCelebration(ctx, width, height, time, duration, project, images);
      break;
    case 'traditional-indian':
      renderTraditionalIndian(ctx, width, height, time, duration, project, images);
      break;
    case 'cinematic-wedding':
      renderCinematicWedding(ctx, width, height, time, duration, project, images);
      break;
    case 'floral-mandap':
      renderFloralMandap(ctx, width, height, time, duration, project, images);
      break;
    case 'classic-indian':
      renderClassicIndian(ctx, width, height, time, duration, project, images);
      break;
    default:
      renderDivineTemple(ctx, width, height, time, duration, project, images);
      break;
  }

  // Draw cinematic transition between scenes for other templates (Divine Temple has built-in exact 6 scene transitions)
  if (templateId !== 'divine-temple') {
    const sceneDuration = duration / 7;
    const sceneProgress = (time % sceneDuration) / sceneDuration;
    drawCinematicTransition(
      ctx,
      width,
      height,
      sceneProgress,
      project.videoSettings?.transition || 'auto',
      templateId,
      time
    );
  }
}

/**
 * Real client-side browser video export generator using Canvas API, Web Audio API, and MediaRecorder
 */
export async function generateWeddingVideo(
  project: WeddingProject,
  onProgress: (prog: GenerationProgress) => void,
  abortSignal?: AbortSignal
): Promise<{ blob: Blob; url: string; format: 'mp4' | 'webm'; fileSize: string }> {
  // 1. Validation
  onProgress({
    stage: 'validating',
    percent: 5,
    currentFrame: 0,
    totalFrames: 0,
    fps: 30,
    message: 'Validating wedding invitation project details and ceremonies...',
  });

  if (!project.couple.groomName || !project.couple.brideName) {
    throw new Error('Couple names are required for video generation.');
  }

  // 2. Load Assets & Fonts
  onProgress({
    stage: 'loading_assets',
    percent: 15,
    currentFrame: 0,
    totalFrames: 0,
    fps: 30,
    message: 'Loading high-resolution couple photos and royal Devanagari fonts...',
  });

  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }
  }

  const loadedImages = await preloadProjectImages(project);

  if (abortSignal?.aborted) throw new Error('Video generation was cancelled by user.');

  // 3. Audio Preparation
  onProgress({
    stage: 'preparing_audio',
    percent: 25,
    currentFrame: 0,
    totalFrames: 0,
    fps: 30,
    message: 'Synthesizing auspicious Indian wedding instrumental soundtrack with Web Audio API...',
  });

  const duration = Math.max(15, Math.min(60, project.videoSettings.durationSeconds || 35));
  const fps = 30;
  const totalFrames = Math.ceil(duration * fps);

  // Setup Offscreen / Hidden Canvas for Recording (1920x1080 or 1280x720)
  const is1080p = project.videoSettings.resolution === '1080p';
  const width = is1080p ? 1920 : 1280;
  const height = is1080p ? 1080 : 720;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas 2D context is not available.');

  // Audio track setup with trimming and fading
  const audioExport = audioService.createExportAudioTrack(
    project.audio.enabled ? project.audio.trackId : 'none',
    project.audio.enabled ? project.audio.volume : 0,
    duration,
    project.audio.startTime || 0,
    project.audio.fadeIn ?? true,
    project.audio.fadeOut ?? true
  );

  // Determine recording MIME type
  const capabilities = getBrowserCapabilities();
  const mimeType = capabilities.preferredMimeType;

  // Stream setup
  const canvasStream = canvas.captureStream(fps);
  const audioTrack = audioExport.destination.stream.getAudioTracks()[0];
  if (audioTrack && project.audio.enabled) {
    canvasStream.addTrack(audioTrack);
  }

  // MediaRecorder setup
  let recorder: MediaRecorder;
  try {
    recorder = new MediaRecorder(canvasStream, {
      mimeType,
      videoBitsPerSecond: is1080p ? 8000000 : 4500000,
    });
  } catch {
    // Fallback if specific codec option was rejected
    recorder = new MediaRecorder(canvasStream);
  }

  const recordedChunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  recorder.start(100);

  // 4. Render frames loop
  onProgress({
    stage: 'rendering_frames',
    percent: 30,
    currentFrame: 0,
    totalFrames,
    fps,
    message: `Rendering cinematic video frame 1 of ${totalFrames} (${width}x${height} @ 30 FPS)...`,
  });

  const frameTime = 1 / fps;
  const frameDurationMs = 1000 / fps;
  const renderStartTime = performance.now();

  for (let frame = 0; frame < totalFrames; frame++) {
    if (abortSignal?.aborted) {
      recorder.stop();
      audioExport.stop();
      throw new Error('Video generation was cancelled.');
    }

    const currentTime = frame * frameTime;

    // Render frame
    renderTemplateFrame(ctx, width, height, currentTime, duration, project, loadedImages);

    // Yield back periodically to keep browser UI responsive and report real progress
    if (frame % 4 === 0 || frame === totalFrames - 1) {
      const renderProgress = frame / totalFrames;
      const percent = Math.floor(30 + renderProgress * 60);
      const remainingSeconds = Math.max(0, Math.ceil(duration - currentTime));

      onProgress({
        stage: 'rendering_frames',
        percent,
        currentFrame: frame + 1,
        totalFrames,
        fps,
        message: `Recording: Frame ${frame + 1} / ${totalFrames} (${percent}%) • ${remainingSeconds}s remaining (${((frame + 1) / fps).toFixed(1)}s / ${duration}s)`,
      });
    }

    // Synchronize frames with real-time clock so MediaRecorder captures at authentic 30 FPS
    const expectedTime = renderStartTime + (frame + 1) * frameDurationMs;
    const now = performance.now();
    const waitMs = expectedTime - now;

    if (waitMs > 1) {
      await new Promise((r) => setTimeout(r, waitMs));
    } else {
      // Small yield to allow MediaRecorder to process stream data
      await new Promise((r) => setTimeout(r, 2));
    }
  }

  // 5. Finalizing Video
  onProgress({
    stage: 'finalizing',
    percent: 92,
    currentFrame: totalFrames,
    totalFrames,
    fps,
    message: 'Encoding audio-video streams and finalizing downloadable invitation video...',
  });

  // Stop recording and gather Blob
  const actualMime = recorder.mimeType || mimeType;
  const isMp4 = actualMime.toLowerCase().includes('mp4');
  const detectedFormat: 'mp4' | 'webm' = isMp4 ? 'mp4' : 'webm';
  const cleanMime = isMp4 ? 'video/mp4' : 'video/webm';

  const videoBlob = await new Promise<Blob>((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: cleanMime });
      resolve(blob);
    };
    recorder.stop();
    audioExport.stop();
  });

  const videoUrl = URL.createObjectURL(videoBlob);
  const sizeMB = (videoBlob.size / (1024 * 1024)).toFixed(2) + ' MB';

  // Save to IndexedDB
  try {
    await indexedDBService.saveExportedVideo(project.id, videoBlob);
  } catch (err) {
    console.warn('Could not cache video in IndexedDB:', err);
  }

  onProgress({
    stage: 'completed',
    percent: 100,
    currentFrame: totalFrames,
    totalFrames,
    fps,
    message: `Wedding invitation video ready! (${width}x${height}, ${duration}s, ${sizeMB})`,
    videoBlob,
    videoUrl,
    fileSize: sizeMB,
    format: detectedFormat,
  });

  return {
    blob: videoBlob,
    url: videoUrl,
    format: detectedFormat,
    fileSize: sizeMB,
  };
}
