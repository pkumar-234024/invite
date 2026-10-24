import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Download } from 'lucide-react';
import type { WeddingProject } from '../types/wedding';
import { preloadProjectImages, renderTemplateFrame, type LoadedImages } from '../services/videoRenderer';
import { audioService } from '../services/audioService';

interface VideoPreviewProps {
  project: WeddingProject;
  onOpenGenerator?: () => void;
  onOpenEditorTab?: (tab: string) => void;
}

const TEMPLE_SCENE_NAMES = [
  '1. Temple Awakening',
  '2. Sacred Invitation',
  '3. Couple Reveal',
  '4. Beautiful Moments',
  '5. Auspicious Date',
  '6. Venue Celebration',
  '7. Grand Finale',
];

const KASHI_SCENE_NAMES = [
  '1. दिव्य मंगल आरम्भ (Divya Aarambh)',
  '2. काशी की दिव्य आभा (Kashi Aabha)',
  '3. शुभ विवाह पत्रिका (Vivah Patrika)',
  '4. दिव्य विवाह मंडप (Havan Kund)',
  '5. वर-वधू नाम दर्शन (Var-Vadhu)',
  '6. मंगल शुभकामनाएँ (Shubhkamnayen)',
  '7. राजसी मंगल समापन (Samapan)',
];

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  project,
  onOpenGenerator,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [volume, setVolume] = useState<number>(project.audio.volume || 0.85);
  const [isMuted, setIsMuted] = useState<boolean>(!project.audio.enabled);

  const timeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const duration = project.videoSettings?.durationSeconds || 45;
  const sceneDuration = duration / 7;
  const currentSceneIndex = Math.min(6, Math.floor(currentTime / sceneDuration));
  const activeSceneNames = project.templateId === 'sampoorna-kashi' ? KASHI_SCENE_NAMES : TEMPLE_SCENE_NAMES;

  // Preload images whenever project photos change
  useEffect(() => {
    let isCancelled = false;
    preloadProjectImages(project).then((imgs) => {
      if (!isCancelled) {
        setLoadedImages(imgs);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [project.photos]);

  // Audio preview playback sync with trimming support
  useEffect(() => {
    if (isPlaying && !isMuted && project.audio.enabled) {
      audioService.startPreview(
        project.audio.trackId,
        volume,
        project.audio.startTime || 0,
        project.audio.fadeIn
      );
    } else {
      audioService.stopPreview();
    }
    return () => {
      audioService.stopPreview();
    };
  }, [isPlaying, isMuted, project.audio.trackId, project.audio.enabled, project.audio.startTime, project.audio.fadeIn]);

  useEffect(() => {
    audioService.setPreviewVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // High-performance smooth animation frame loop (60 FPS)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let lastUIUpdateTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (isPlayingRef.current) {
        timeRef.current += delta;
        if (timeRef.current >= duration) {
          timeRef.current = 0; // Loop seamlessly
        }

        // Throttle React state update to ~15 FPS to avoid re-rendering entire component tree 60 times/sec
        if (now - lastUIUpdateTime > 65) {
          setCurrentTime(timeRef.current);
          lastUIUpdateTime = now;
        }
      }

      // Draw active frame to canvas smoothly at full 60 FPS
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          renderTemplateFrame(ctx, canvas.width, canvas.height, timeRef.current, duration, project, loadedImages);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [duration, project, loadedImages]);

  // Scene navigation jump
  const jumpToScene = (sceneIdx: number) => {
    const target = sceneIdx * sceneDuration + 0.05;
    timeRef.current = target;
    setCurrentTime(target);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        renderTemplateFrame(ctx, canvas.width, canvas.height, target, duration, project, loadedImages);
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReplay = () => {
    timeRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        background: 'rgba(20, 18, 25, 0.95)',
        border: '1.5px solid rgba(212, 175, 55, 0.35)',
        borderRadius: 16,
        padding: 16,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header bar with template badge and technical specs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
        paddingBottom: 8,
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#FFE494',
            background: 'var(--grad-royal-maroon)',
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid var(--gold-primary)',
            letterSpacing: '0.5px',
          }}>
            TEMPLATE: {project.templateId.toUpperCase().replace('-', ' ')}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#A09D97' }}>
            Scene {currentSceneIndex + 1} of 7: <strong style={{ color: '#FFE494' }}>{activeSceneNames[currentSceneIndex]}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: '0.74rem',
            color: '#9CA3AF',
            background: 'rgba(0,0,0,0.4)',
            padding: '3px 8px',
            borderRadius: 4,
            border: '1px solid #374151',
          }}>
            16:9 • 1920×1080 • 30 FPS
          </span>
          {onOpenGenerator && (
            <button
              onClick={onOpenGenerator}
              className="btn btn-gold"
              id="preview-header-download-btn"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontWeight: 700,
                boxShadow: '0 0 14px rgba(212, 175, 55, 0.35)',
              }}
            >
              <Download size={16} />
              <span>Download Video (1080p)</span>
            </button>
          )}
        </div>
      </div>

      {/* Strict 16:9 Canvas Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        background: '#08080C',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
      }}>
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Play/Pause Overlay indicator when paused */}
        {!isPlaying && (
          <div
            onClick={handlePlayPause}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--grad-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
              color: '#2A040B',
            }}>
              <Play size={36} fill="#2A040B" style={{ marginLeft: 4 }} />
            </div>
          </div>
        )}
      </div>

      {/* Timeline Scrubber & Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#FFE494', minWidth: 42 }}>
            {currentTime.toFixed(1)}s
          </span>

          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              timeRef.current = val;
              setCurrentTime(val);
              const canvas = canvasRef.current;
              if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  renderTemplateFrame(ctx, canvas.width, canvas.height, val, duration, project, loadedImages);
                }
              }
            }}
            style={{
              flex: 1,
              accentColor: '#D4AF37',
              height: 6,
              cursor: 'pointer',
            }}
          />

          <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#9CA3AF', minWidth: 42 }}>
            {duration.toFixed(1)}s
          </span>
        </div>

        {/* Scene division marks on timeline */}
        <div style={{
          display: 'flex',
          gap: 4,
          height: 4,
        }}>
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => jumpToScene(idx)}
              style={{
                flex: 1,
                borderRadius: 2,
                background: currentSceneIndex === idx ? 'var(--gold-primary)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              title={activeSceneNames[idx]}
            />
          ))}
        </div>
      </div>

      {/* Control Buttons & Scene Selectors */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        paddingTop: 4,
      }}>
        {/* Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handlePlayPause}
            className="btn btn-maroon"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleReplay}
            className="btn btn-outline-gold"
            style={{ padding: '8px 12px' }}
            title="Replay from start"
          >
            <RotateCcw size={18} />
          </button>

          {/* Audio volume controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 10px',
            borderRadius: 8,
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: 'none',
                border: 'none',
                color: isMuted ? '#EF4444' : '#FFE494',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title={isMuted ? 'Unmute music' : 'Mute music'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              style={{
                width: 70,
                accentColor: '#D4AF37',
                cursor: 'pointer',
              }}
              title={`Music Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>

        {/* Scene jump pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexWrap: 'wrap',
        }}>
          {activeSceneNames.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToScene(idx)}
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: '1px solid',
                borderColor: currentSceneIndex === idx ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                background: currentSceneIndex === idx ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.04)',
                color: currentSceneIndex === idx ? '#FFE494' : '#9CA3AF',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: currentSceneIndex === idx ? 700 : 500,
              }}
            >
              S{idx + 1}
            </button>
          ))}

          <button
            onClick={toggleFullscreen}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle fullscreen preview"
          >
            <Maximize2 size={16} />
          </button>

          {onOpenGenerator && (
            <button
              onClick={onOpenGenerator}
              className="btn btn-gold"
              id="player-bar-download-btn"
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 700,
              }}
              title="Download Full HD 1080p Video"
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
