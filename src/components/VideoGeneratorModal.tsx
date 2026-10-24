import { useState, useEffect, useRef } from 'react';
import { X, Film, Download, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WeddingProject } from '../types/wedding';
import { generateWeddingVideo, type GenerationProgress } from '../services/videoRenderer';
import { getBrowserCapabilities } from '../services/browserCapabilities';

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
  const abortControllerRef = useRef<AbortController | null>(null);

  const capabilities = getBrowserCapabilities();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setProgress({
        stage: 'idle',
        percent: 0,
        currentFrame: 0,
        totalFrames: 0,
        fps: 30,
        message: 'Click "Start Generation" to render your 16:9 invitation video at 30 FPS.',
      });
      setIsGenerating(false);
    }
  }, [isOpen]);

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      await generateWeddingVideo(
        project,
        (prog) => setProgress(prog),
        abortControllerRef.current.signal
      );

      // Trigger celebratory golden confetti when done!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
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
        message: `Video generation encountered an issue: ${errorMsg}`,
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
    onClose();
  };

  const handleDownload = () => {
    if (!progress.videoBlob || !progress.videoUrl) return;

    const groom = (project.couple.groomName || 'Groom').replace(/[^a-zA-Z0-9]/g, '-');
    const bride = (project.couple.brideName || 'Bride').replace(/[^a-zA-Z0-9]/g, '-');
    const ext = progress.format || 'mp4';
    const filename = `${groom}-${bride}-Wedding-Invitation.${ext}`;

    const link = document.createElement('a');
    link.href = progress.videoUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(5, 4, 7, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{
        background: '#15131B',
        border: '1.5px solid rgba(212, 175, 55, 0.4)',
        borderRadius: 18,
        width: '100%',
        maxWidth: 720,
        boxShadow: 'var(--shadow-gold-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          background: 'var(--grad-royal-maroon)',
          borderBottom: '1px solid var(--gold-primary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={22} color="#FFE494" />
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: '#FFE494',
            }}>
              Generate Wedding Video
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
              }}
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Target Resolution & Browser Capability Alert */}
          <div style={{
            background: 'rgba(26, 23, 31, 0.9)',
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
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '2px 8px',
                borderRadius: 4,
                fontWeight: 600,
              }}>
                16:9 • 1920×1080 • 30 FPS
              </span>
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>
              Template: <strong style={{ color: '#FFE494' }}>{project.templateId.toUpperCase()}</strong> • Duration: <strong style={{ color: '#FFE494' }}>{project.videoSettings.durationSeconds}s</strong> • Audio: <strong style={{ color: '#FFE494' }}>{project.audio.enabled ? 'Enabled' : 'Muted'}</strong>
            </div>

            {capabilities.hardwareNote && (
              <div style={{
                marginTop: 6,
                padding: '8px 10px',
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

          {/* Progress / Status Display */}
          <div style={{
            background: '#0B0A0E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
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
                <span>Aspect: 16:9 Landscape</span>
              </div>
            )}
          </div>

          {/* Completed Video Player */}
          {progress.stage === 'completed' && progress.videoUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#000',
                border: '1.5px solid var(--gold-primary)',
              }}>
                <video
                  src={progress.videoUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#9CA3AF',
                padding: '4px 8px',
              }}>
                <span>Format: <strong style={{ color: '#FFE494' }}>{progress.format?.toUpperCase()}</strong></span>
                <span>File Size: <strong style={{ color: '#FFE494' }}>{progress.fileSize}</strong></span>
                <span>Resolution: <strong style={{ color: '#FFE494' }}>1920 × 1080 (1080p)</strong></span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 4 }}>
            {isGenerating ? (
              <button
                onClick={handleCancel}
                className="btn btn-outline-gold"
                style={{ borderColor: '#EF4444', color: '#EF4444' }}
              >
                Cancel Generation
              </button>
            ) : progress.stage === 'completed' ? (
              <>
                <button
                  onClick={onClose}
                  className="btn btn-ghost"
                >
                  Done
                </button>
                <button
                  onClick={handleDownload}
                  className="btn btn-gold"
                  style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                  <Download size={18} /> Download Wedding Video
                </button>
              </>
            ) : progress.stage === 'error' ? (
              <>
                <button onClick={onClose} className="btn btn-ghost">Close</button>
                <button onClick={handleStartGeneration} className="btn btn-gold">
                  <RefreshCw size={16} /> Retry Generation
                </button>
              </>
            ) : (
              <>
                <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                <button
                  onClick={handleStartGeneration}
                  className="btn btn-gold"
                  style={{ padding: '12px 24px', fontSize: '0.98rem' }}
                >
                  <Film size={18} /> Start Video Generation
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
