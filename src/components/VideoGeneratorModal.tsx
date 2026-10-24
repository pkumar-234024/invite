import { useState, useEffect, useRef } from 'react';
import { X, Download, RefreshCw, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingProject } from '../types/wedding';
import { generateWeddingVideo, type GenerationProgress } from '../services/videoRenderer';
import { getBrowserCapabilities } from '../services/browserCapabilities';
import { indexedDBService } from '../services/indexedDBService';

interface VideoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: WeddingProject;
}

export const VideoGeneratorModal: React.FC<VideoGeneratorModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [progress, setProgress] = useState<GenerationProgress>({
    stage: 'idle',
    percent: 0,
    currentFrame: 0,
    totalFrames: 0,
    fps: 30,
    message: 'Ready to generate high-definition wedding invitation video directly in your browser.',
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [cachedVideoBlob, setCachedVideoBlob] = useState<Blob | null>(null);
  const [cachedVideoUrl, setCachedVideoUrl] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const capabilities = getBrowserCapabilities();

  // Reset state and check for existing cached export when opened
  useEffect(() => {
    if (isOpen) {
      setProgress({
        stage: 'idle',
        percent: 0,
        currentFrame: 0,
        totalFrames: 0,
        fps: 30,
        message: 'Click "Generate & Download Video (1080p MP4)" to render and save your invitation video.',
      });
      setIsGenerating(false);

      // Check if this project already has an exported video in IndexedDB
      indexedDBService.getExportedVideo(project.id).then((blob) => {
        if (blob) {
          setCachedVideoBlob(blob);
          setCachedVideoUrl(URL.createObjectURL(blob));
        } else {
          setCachedVideoBlob(null);
          setCachedVideoUrl(null);
        }
      });
    }
  }, [isOpen, project.id]);

  /**
   * Generates a 100% clean ASCII filename with explicit .mp4/.webm extension.
   * Prevents Windows & Chrome from saving as a raw UUID or dropping the file extension.
   */
  const getSafeFilename = (ext: string = 'mp4'): string => {
    const groomEnglish = (project.couple.groomName || '').replace(/[^a-zA-Z0-9]/g, '').trim();
    const brideEnglish = (project.couple.brideName || '').replace(/[^a-zA-Z0-9]/g, '').trim();

    const groom = groomEnglish || 'Ayushman';
    const bride = brideEnglish || 'Ananya';

    const cleanExt = (ext || progress.format || 'mp4').toLowerCase().replace(/^\./, '');
    const validExt = cleanExt === 'webm' ? 'webm' : 'mp4';

    return `${groom}_${bride}_Wedding_Invitation.${validExt}`;
  };

  /**
   * Bulletproof video download:
   * 1. Uses modern Windows File System Access API (showSaveFilePicker) if supported,
   *    allowing user to choose folder and guaranteeing .mp4 extension.
   * 2. Falls back to clean File object download so Chrome/Windows never saves as raw GUID.
   */
  const triggerDownload = async (blob?: Blob, url?: string, ext: string = 'mp4') => {
    const videoBlob = blob || progress.videoBlob || cachedVideoBlob;
    const videoUrl = url || progress.videoUrl || cachedVideoUrl;

    if (!videoBlob && !videoUrl) return;

    const filename = getSafeFilename(ext);
    const mime = ext === 'webm' ? 'video/webm' : 'video/mp4';

    // 1. Try Windows File System Access API (opens standard Windows "Save As..." dialog)
    if (typeof window !== 'undefined' && 'showSaveFilePicker' in window && videoBlob) {
      try {
        const handle = await (window as unknown as {
          showSaveFilePicker: (options: unknown) => Promise<{
            createWritable: () => Promise<{ write: (b: Blob) => Promise<void>; close: () => Promise<void> }>;
          }>;
        }).showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: ext === 'mp4' ? 'MP4 Video (*.mp4)' : 'WebM Video (*.webm)',
              accept: {
                [mime]: [`.${ext}`],
              },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(videoBlob);
        await writable.close();
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          return; // User cancelled dialog
        }
        // Fallback to link click
      }
    }

    // 2. Fallback: Wrap in a File object with explicit name & MIME type
    let downloadHref = videoUrl;
    if (videoBlob) {
      const file = new File([videoBlob], filename, { type: mime });
      downloadHref = URL.createObjectURL(file);
    }

    const link = document.createElement('a');
    link.href = downloadHref!;
    link.setAttribute('download', filename);
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 500);
  };

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      const result = await generateWeddingVideo(
        project,
        (prog) => setProgress(prog),
        abortControllerRef.current.signal
      );

      if (result?.blob) {
        setCachedVideoBlob(result.blob);
        setCachedVideoUrl(result.url);
        // Automatically prompt download upon completion
        triggerDownload(result.blob, result.url, result.format);
      }

      // Celebratory golden confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FFE494', '#D4AF37', '#FF6B6B', '#FFF'],
        });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown generation error occurred.';
      setProgress((prev: GenerationProgress) => ({
        ...prev,
        stage: 'error',
        error: errorMsg,
        message: `Video generation issue: ${errorMsg}`,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(5, 4, 7, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#15131B',
        border: '1.5px solid rgba(212, 175, 55, 0.45)',
        borderRadius: 18,
        width: '100%',
        maxWidth: 740,
        maxHeight: '94vh',
        boxShadow: 'var(--shadow-gold-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          background: 'var(--grad-royal-maroon)',
          borderBottom: '1.5px solid var(--gold-primary)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={22} color="#FFE494" />
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#FFE494',
              margin: 0,
            }}>
              Download Wedding Invitation Video
            </h3>
          </div>

          {!isGenerating && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFE494',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 4,
              }}
              title="Close"
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
          flex: 1,
        }}>
          {/* Target Resolution & Specs Header */}
          <div style={{
            background: 'rgba(26, 23, 31, 0.95)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 10,
            padding: '12px 16px',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#FFE494', fontWeight: 600 }}>Video Output Specification:</span>
              <span style={{
                color: '#4ADE80',
                background: 'rgba(34, 197, 94, 0.12)',
                padding: '3px 10px',
                borderRadius: 4,
                fontWeight: 700,
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}>
                16:9 • 1920×1080 (Full HD MP4) • 30 FPS
              </span>
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
              Template: <strong style={{ color: '#FFE494' }}>{project.templateId.toUpperCase().replace('-', ' ')}</strong> • Duration: <strong style={{ color: '#FFE494' }}>{project.videoSettings.durationSeconds}s</strong> • Audio: <strong style={{ color: '#FFE494' }}>{project.audio.enabled ? 'Enabled' : 'Muted'}</strong>
            </div>

            {capabilities.hardwareNote && (
              <div style={{
                marginTop: 4,
                padding: '6px 10px',
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: 6,
                fontSize: '0.76rem',
                color: '#FDE68A',
                lineHeight: 1.4,
              }}>
                ℹ️ {capabilities.hardwareNote}
              </div>
            )}
          </div>

          {/* User Guide Alert for previous un-extended GUID downloads */}
          <div style={{
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: '0.78rem',
            color: '#FDE68A',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            lineHeight: 1.4,
          }}>
            <HelpCircle size={18} color="#FFE494" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>Windows Playback Tip:</strong> All videos are saved directly as <strong>.mp4</strong> files. If you previously downloaded a file shown as a code (like <code>5b6be19b...</code>), you can simply rename it to add <strong>.mp4</strong> at the end (e.g. <code>my_video.mp4</code>) to open and play it immediately!
            </div>
          </div>

          {/* Quick Download for Previously Rendered Video */}
          {cachedVideoBlob && progress.stage === 'idle' && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 12,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={22} color="#4ADE80" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F3F4F6' }}>
                    Exported Video Ready for Instant Download!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                    {(cachedVideoBlob.size / (1024 * 1024)).toFixed(2)} MB • File: <strong style={{ color: '#FFE494' }}>{getSafeFilename('mp4')}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => triggerDownload(cachedVideoBlob, cachedVideoUrl || undefined, 'mp4')}
                  className="btn btn-gold"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontWeight: 700,
                  }}
                >
                  <Download size={16} /> Save MP4 (.mp4)
                </button>
              </div>
            </div>
          )}

          {/* Progress / Status Display */}
          <div style={{
            background: '#0B0A0E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFE494' }}>
                Status: {progress.stage.toUpperCase().replace('_', ' ')}
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', color: '#FFF' }}>
                {progress.percent}%
              </span>
            </div>

            {/* Real Progress Bar */}
            <div style={{
              width: '100%',
              height: 10,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 6,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress.percent}%`,
                background: progress.stage === 'error' ? '#EF4444' : 'var(--grad-gold)',
                transition: 'width 0.15s ease-out',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
              }} />
            </div>

            {/* Current message */}
            <p style={{
              fontSize: '0.84rem',
              color: progress.stage === 'error' ? '#F87171' : '#C4B5A5',
              lineHeight: 1.4,
              margin: 0,
            }}>
              {progress.message}
            </p>

            {/* Rendering frame counter during active rendering */}
            {progress.stage === 'rendering_frames' && (
              <div style={{
                display: 'flex',
                gap: 16,
                fontSize: '0.76rem',
                color: '#FFE494',
                fontFamily: 'monospace',
                background: 'rgba(212, 175, 55, 0.1)',
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}>
                <span>Frame: {progress.currentFrame} / {progress.totalFrames}</span>
                <span>FPS: 30</span>
                <span>Format: MP4 (H.264)</span>
              </div>
            )}
          </div>

          {/* Completed Video Player Preview */}
          {progress.stage === 'completed' && progress.videoUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxHeight: 240,
                aspectRatio: '16 / 9',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#000',
                border: '1.5px solid var(--gold-primary)',
                margin: '0 auto',
              }}>
                <video
                  src={progress.videoUrl}
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#9CA3AF',
                padding: '2px 8px',
              }}>
                <span>File Name: <strong style={{ color: '#FFE494' }}>{getSafeFilename(progress.format)}</strong></span>
                <span>File Size: <strong style={{ color: '#FFE494' }}>{progress.fileSize}</strong></span>
                <span>Resolution: <strong style={{ color: '#FFE494' }}>1920 × 1080 (1080p)</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar — Always 100% visible */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 12,
          padding: '14px 24px',
          background: '#110F17',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          flexShrink: 0,
        }}>
          {isGenerating ? (
            <button
              onClick={handleCancel}
              className="btn btn-outline-gold"
              style={{ borderColor: '#EF4444', color: '#EF4444', padding: '10px 20px' }}
            >
              Cancel Generation
            </button>
          ) : progress.stage === 'completed' ? (
            <>
              <button
                onClick={onClose}
                className="btn btn-ghost"
                style={{ padding: '10px 18px' }}
              >
                Close
              </button>

              <button
                onClick={() => triggerDownload(undefined, undefined, 'webm')}
                className="btn btn-outline-gold"
                style={{
                  padding: '11px 18px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Download size={16} /> Save WebM
              </button>

              <button
                onClick={() => triggerDownload(undefined, undefined, 'mp4')}
                className="btn btn-gold"
                id="modal-download-video-btn"
                style={{
                  padding: '12px 26px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.45)',
                }}
              >
                <Download size={18} /> Save MP4 Video (.mp4)
              </button>
            </>
          ) : progress.stage === 'error' ? (
            <>
              <button onClick={onClose} className="btn btn-ghost" style={{ padding: '10px 18px' }}>
                Close
              </button>
              <button onClick={handleStartGeneration} className="btn btn-gold" style={{ padding: '10px 22px' }}>
                <RefreshCw size={16} /> Retry Generation
              </button>
            </>
          ) : (
            <>
              <button onClick={onClose} className="btn btn-ghost" style={{ padding: '10px 18px' }}>
                Cancel
              </button>
              <button
                onClick={handleStartGeneration}
                className="btn btn-gold"
                id="modal-start-generate-btn"
                style={{
                  padding: '12px 28px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.35)',
                }}
              >
                <Download size={20} /> Generate &amp; Download Video (1080p MP4)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
