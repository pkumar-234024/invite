import { useState } from 'react';
import { Palette, Music, Settings, Edit3, Image, Sparkles, Download } from 'lucide-react';
import type { WeddingProject, TransitionType, PhotoFrameShape, PhotoFilter } from '../types/wedding';
import { VideoPreview } from './VideoPreview';
import { WEDDING_TEMPLATES } from '../templates/templateRegistry';
import { AudioTrimmer } from './AudioTrimmer';

interface VideoEditorProps {
  project: WeddingProject;
  onUpdateProject: (updater: (prev: WeddingProject) => WeddingProject) => void;
  onOpenGenerator: () => void;
}

const TRANSITION_OPTIONS: { id: TransitionType; title: string; desc: string; icon: string }[] = [
  { id: 'auto', title: 'Auto Cinematic Flow', desc: 'Custom transitions designed specifically for the chosen template', icon: '✨' },
  { id: 'gold-stardust', title: 'Golden Stardust Swirl', desc: 'Twinkling 24K gold particles and stardust dissolve', icon: '🌟' },
  { id: 'light-leak', title: 'Warm Golden Light Leak', desc: 'Cinematic anamorphic sunlight flare sweeping horizontally', icon: '☀️' },
  { id: 'royal-curtain', title: 'Royal Velvet Curtain', desc: 'Majestic deep maroon velvet draperies with golden tassels', icon: '🎭' },
  { id: 'mandala-bloom', title: 'Sacred Mandala Bloom', desc: 'Spinning sacred geometric golden mandala iris blossom', icon: '🏵️' },
  { id: 'zoom-push', title: 'Cinematic Zoom-Push', desc: 'Smooth camera push-through with motion blur streaks', icon: '🎬' },
];

const FRAME_SHAPES: { id: PhotoFrameShape; label: string }[] = [
  { id: 'royal-arch', label: 'Mughal Arch' },
  { id: 'oval-kundan', label: 'Kundan Oval' },
  { id: 'floral-wreath', label: 'Floral Wreath' },
  { id: 'heritage-square', label: 'Heritage Square' },
  { id: 'modern-card', label: 'Modern Card' },
];

const PHOTO_FILTERS: { id: PhotoFilter; label: string }[] = [
  { id: 'none', label: 'Natural' },
  { id: 'royal-gold', label: 'Royal Gold' },
  { id: 'festive-vibrant', label: 'Festive Vibrant' },
  { id: 'vintage-sepia', label: 'Vintage Sepia' },
  { id: 'romantic-soft', label: 'Romantic Soft' },
];

export const VideoEditor: React.FC<VideoEditorProps> = ({
  project,
  onUpdateProject,
  onOpenGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'template' | 'music' | 'photos' | 'settings'>('quick');

  const coupleOffsets = project.photos.offsets?.couple || {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    filter: 'none',
    frameShape: 'default',
  };

  return (
    <div style={{
      maxWidth: 1440,
      margin: '0 auto',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        background: 'rgba(26, 23, 31, 0.85)',
        padding: '14px 22px',
        borderRadius: 14,
        border: '1px solid rgba(212, 175, 55, 0.25)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.45rem',
            color: '#FFE494',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Sparkles size={22} color="#FFE494" /> Video Studio &amp; Real-Time Director
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
            Interactive 16:9 canvas preview synced frame-by-frame with audio trimming and cinematic transitions.
          </p>
        </div>

        <button
          onClick={onOpenGenerator}
          className="btn btn-gold"
          id="editor-top-download-btn"
          style={{ padding: '10px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}
        >
          <Download size={18} /> Download Video (1080p)
        </button>
      </div>

      {/* Editor Main Grid: Left = 16:9 Canvas Preview, Right = Controls & Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(380px, 1fr)',
        gap: 20,
        alignItems: 'start',
      }}>
        {/* Left Column: 16:9 Canvas Preview */}
        <div>
          <VideoPreview project={project} onOpenGenerator={onOpenGenerator} />
        </div>

        {/* Right Column: Interactive Editor Tabs */}
        <div className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tab Selector Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            background: 'rgba(0,0,0,0.4)',
            padding: 4,
            borderRadius: 10,
            border: '1px solid rgba(212, 175, 55, 0.2)',
            gap: 4,
          }}>
            <button
              onClick={() => setActiveTab('quick')}
              style={{
                padding: '8px 4px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'quick' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'quick' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Edit3 size={15} /> Text
            </button>

            <button
              onClick={() => setActiveTab('template')}
              style={{
                padding: '8px 4px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'template' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'template' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Palette size={15} /> Themes
            </button>

            <button
              onClick={() => setActiveTab('music')}
              style={{
                padding: '8px 4px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'music' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'music' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Music size={15} /> Audio
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              style={{
                padding: '8px 4px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'photos' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'photos' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Image size={15} /> Photo Style
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                padding: '8px 4px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'settings' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'settings' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Settings size={15} /> Transitions
            </button>
          </div>

          {/* TAB 1: Quick Text Editor */}
          {activeTab === 'quick' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bride's Name</label>
                  <input
                    type="text"
                    value={project.couple.brideName}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, brideName: e.target.value } }))}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Groom's Name</label>
                  <input
                    type="text"
                    value={project.couple.groomName}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, groomName: e.target.value } }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bride's Family</label>
                  <input
                    type="text"
                    value={project.couple.brideFamily}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, brideFamily: e.target.value } }))}
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Groom's Family</label>
                  <input
                    type="text"
                    value={project.couple.groomFamily}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, groomFamily: e.target.value } }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Auspicious Heading / Shloka</label>
                <input
                  type="text"
                  value={project.message.shlokaHeading}
                  onChange={(e) => onUpdateProject((p) => ({ ...p, message: { ...p.message, shlokaHeading: e.target.value } }))}
                  className="form-input font-hindi"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Closing Salutation / RSVP</label>
                <input
                  type="text"
                  value={project.message.closingSalutation}
                  onChange={(e) => onUpdateProject((p) => ({ ...p, message: { ...p.message, closingSalutation: e.target.value } }))}
                  className="form-input font-hindi"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Template Switcher */}
          {activeTab === 'template' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 420, overflowY: 'auto' }}>
              <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
                Select from 11 cinematic Indian wedding templates:
              </span>

              {WEDDING_TEMPLATES.map((t) => {
                const isSelected = project.templateId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => onUpdateProject((p) => ({ ...p, templateId: t.id }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.04)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFFDF9', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {t.name} <span style={{ fontFamily: 'var(--font-hindi)', fontSize: '0.82rem', color: '#FFE494' }}>({t.hindiName})</span>
                        {t.id === 'divine-temple' && (
                          <span style={{ fontSize: '0.65rem', background: '#D4AF37', color: '#3A030E', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                            Flagship
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{t.colorTheme}</div>
                    </div>

                    <div style={{ display: 'flex', gap: 4 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: t.primaryColor }} />
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: t.secondaryColor }} />
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: t.accentColor }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: Music & Precision Trimmer */}
          {activeTab === 'music' && (
            <AudioTrimmer
              audio={project.audio}
              videoDuration={project.videoSettings.durationSeconds || 45}
              onAudioChange={(updater) => onUpdateProject((p) => ({ ...p, audio: updater(p.audio) }))}
            />
          )}

          {/* TAB 4: Photo Styling */}
          {activeTab === 'photos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: '0.84rem', color: '#FFE494', fontWeight: 600 }}>
                Couple Photograph Styling Options
              </div>

              {/* Frame Shapes */}
              <div>
                <span style={{ fontSize: '0.76rem', color: '#9CA3AF', display: 'block', marginBottom: 6 }}>
                  Frame Shape &amp; Arch Style:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                  {FRAME_SHAPES.map((fs) => {
                    const isSelected = (coupleOffsets.frameShape || 'default') === fs.id;
                    return (
                      <button
                        key={fs.id}
                        type="button"
                        onClick={() =>
                          onUpdateProject((p) => ({
                            ...p,
                            photos: {
                              ...p.photos,
                              offsets: {
                                ...p.photos.offsets,
                                couple: { ...coupleOffsets, frameShape: fs.id },
                              },
                            },
                          }))
                        }
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                          background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                          color: isSelected ? '#FFE494' : '#E5D6C5',
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: 'left',
                        }}
                      >
                        {fs.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filters */}
              <div>
                <span style={{ fontSize: '0.76rem', color: '#9CA3AF', display: 'block', marginBottom: 6 }}>
                  Color Grading &amp; Lighting Filter:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
                  {PHOTO_FILTERS.map((pf) => {
                    const isSelected = (coupleOffsets.filter || 'none') === pf.id;
                    return (
                      <button
                        key={pf.id}
                        type="button"
                        onClick={() =>
                          onUpdateProject((p) => ({
                            ...p,
                            photos: {
                              ...p.photos,
                              offsets: {
                                ...p.photos.offsets,
                                couple: { ...coupleOffsets, filter: pf.id },
                              },
                            },
                          }))
                        }
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                          background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                          color: isSelected ? '#FFE494' : '#E5D6C5',
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: 'left',
                        }}
                      >
                        {pf.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rotation & Zoom */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#E5D6C5' }}>Rotation: {coupleOffsets.rotation || 0}°</span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateProject((p) => ({
                        ...p,
                        photos: {
                          ...p.photos,
                          offsets: {
                            ...p.photos.offsets,
                            couple: { ...coupleOffsets, rotation: ((coupleOffsets.rotation || 0) + 90) % 360 },
                          },
                        },
                      }))
                    }
                    className="btn btn-outline-gold"
                    style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                  >
                    Rotate +90°
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#E5D6C5' }}>Zoom: {(coupleOffsets.zoom || 1).toFixed(1)}x</span>
                  <input
                    type="range"
                    min={1}
                    max={2.5}
                    step={0.1}
                    value={coupleOffsets.zoom || 1}
                    onChange={(e) =>
                      onUpdateProject((p) => ({
                        ...p,
                        photos: {
                          ...p.photos,
                          offsets: {
                            ...p.photos.offsets,
                            couple: { ...coupleOffsets, zoom: parseFloat(e.target.value) },
                          },
                        },
                      }))
                    }
                    style={{ width: 140, accentColor: '#D4AF37' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Transitions & Video Output Settings */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Cinematic Transitions Selector */}
              <div>
                <label className="form-label" style={{ marginBottom: 6 }}>
                  Scene Transition Effect (S1 → S2 → S3 → S4...):
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {TRANSITION_OPTIONS.map((tr) => {
                    const isSelected = (project.videoSettings.transition || 'auto') === tr.id;
                    return (
                      <div
                        key={tr.id}
                        onClick={() =>
                          onUpdateProject((p) => ({
                            ...p,
                            videoSettings: { ...p.videoSettings, transition: tr.id },
                          }))
                        }
                        style={{
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1.5px solid',
                          borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(255,255,255,0.08)',
                          background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{tr.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: '#FFFDF9', fontSize: '0.86rem' }}>
                            {tr.title}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{tr.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Duration Slider */}
              <div className="form-group" style={{ margin: 0, marginTop: 4 }}>
                <label className="form-label">
                  Video Duration: {project.videoSettings.durationSeconds} seconds
                </label>
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={project.videoSettings.durationSeconds}
                  onChange={(e) => onUpdateProject((p) => ({
                    ...p,
                    videoSettings: { ...p.videoSettings, durationSeconds: parseInt(e.target.value) },
                  }))}
                  style={{ accentColor: '#D4AF37' }}
                />
                <span style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
                  Recommended: 45s for complete 7-scene cinematic temple storytelling.
                </span>
              </div>

              {/* Resolution */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Resolution Output</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {(['1080p', '720p'] as const).map((res) => (
                    <button
                      key={res}
                      onClick={() => onUpdateProject((p) => ({
                        ...p,
                        videoSettings: { ...p.videoSettings, resolution: res },
                      }))}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 8,
                        border: '1px solid',
                        borderColor: project.videoSettings.resolution === res ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                        background: project.videoSettings.resolution === res ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.04)',
                        color: project.videoSettings.resolution === res ? '#FFE494' : '#9CA3AF',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {res === '1080p' ? 'Full HD (1920×1080)' : 'HD (1280×720)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Export Action Button */}
          <button
            onClick={onOpenGenerator}
            className="btn btn-gold"
            id="editor-bottom-download-btn"
            style={{ width: '100%', padding: '14px', fontSize: '1.02rem', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700 }}
          >
            <Download size={20} /> Download Wedding Video (1080p)
          </button>
        </div>
      </div>
    </div>
  );
};
