import { useState } from 'react';
import { Film, Palette, Music, Settings, Edit3, Upload } from 'lucide-react';
import type { WeddingProject } from '../types/wedding';
import { VideoPreview } from './VideoPreview';
import { WEDDING_TEMPLATES } from '../templates/templateRegistry';
import { WEDDING_AUDIO_TRACKS, audioService } from '../services/audioService';

interface VideoEditorProps {
  project: WeddingProject;
  onUpdateProject: (updater: (prev: WeddingProject) => WeddingProject) => void;
  onOpenGenerator: () => void;
}

export const VideoEditor: React.FC<VideoEditorProps> = ({
  project,
  onUpdateProject,
  onOpenGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'template' | 'music' | 'settings'>('quick');
  const [customAudioName, setCustomAudioName] = useState<string | null>(null);

  const handleCustomAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const name = await audioService.setCustomAudio(file);
      setCustomAudioName(name);
      onUpdateProject((prev) => ({
        ...prev,
        audio: {
          ...prev.audio,
          trackId: 'custom',
          customTrackName: name,
        },
      }));
    } catch (err) {
      alert('Could not load custom audio file. Please ensure it is an MP3 or WAV file.');
    }
  };

  return (
    <div style={{
      maxWidth: 1400,
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
        padding: '12px 20px',
        borderRadius: 14,
        border: '1px solid rgba(212, 175, 55, 0.25)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: '#FFE494',
          }}>
            Video Studio &amp; Real-Time Editor
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
            Interactive 16:9 canvas preview synced frame-by-frame with audio. All edits reflect immediately!
          </p>
        </div>

        <button
          onClick={onOpenGenerator}
          className="btn btn-gold"
          style={{ padding: '10px 24px', fontSize: '0.95rem' }}
        >
          <Film size={18} /> Generate Video (1080p)
        </button>
      </div>

      {/* Editor Main Grid: Left = 16:9 Canvas Preview, Right = Controls & Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 1fr)',
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
            display: 'flex',
            background: 'rgba(0,0,0,0.4)',
            padding: 4,
            borderRadius: 10,
            border: '1px solid rgba(212, 175, 55, 0.2)',
            gap: 4,
          }}>
            <button
              onClick={() => setActiveTab('quick')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'quick' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'quick' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Edit3 size={14} /> Details
            </button>

            <button
              onClick={() => setActiveTab('template')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'template' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'template' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Palette size={14} /> Theme (10)
            </button>

            <button
              onClick={() => setActiveTab('music')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'music' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'music' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Music size={14} /> Music
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 6,
                border: 'none',
                background: activeTab === 'settings' ? 'var(--grad-royal-maroon)' : 'transparent',
                color: activeTab === 'settings' ? '#FFE494' : '#9CA3AF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Settings size={14} /> Settings
            </button>
          </div>

          {/* TAB 1: Quick Details Edit */}
          {activeTab === 'quick' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="grid-2">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Groom Name</label>
                  <input
                    type="text"
                    value={project.couple.groomName}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, groomName: e.target.value } }))}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Bride Name</label>
                  <input
                    type="text"
                    value={project.couple.brideName}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, brideName: e.target.value } }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">वर का नाम (Hindi)</label>
                  <input
                    type="text"
                    value={project.couple.groomHindiName || ''}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, groomHindiName: e.target.value } }))}
                    className="form-input font-hindi"
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">वधू का नाम (Hindi)</label>
                  <input
                    type="text"
                    value={project.couple.brideHindiName || ''}
                    onChange={(e) => onUpdateProject((p) => ({ ...p, couple: { ...p.couple, brideHindiName: e.target.value } }))}
                    className="form-input font-hindi"
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
                <label className="form-label">Love Quote</label>
                <input
                  type="text"
                  value={project.message.quote || ''}
                  onChange={(e) => onUpdateProject((p) => ({ ...p, message: { ...p.message, quote: e.target.value } }))}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Closing Salutation</label>
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
                Select a template to instantly preview it with your wedding details:
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
                      <div style={{ fontWeight: 700, color: '#FFFDF9', fontSize: '0.95rem' }}>
                        {t.name} <span style={{ fontFamily: 'var(--font-hindi)', fontSize: '0.85rem', color: '#FFE494' }}>({t.hindiName})</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>{t.colorTheme}</div>
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

          {/* TAB 3: Music Selector */}
          {activeTab === 'music' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFE494' }}>Enable Background Music</span>
                <input
                  type="checkbox"
                  checked={project.audio.enabled}
                  onChange={(e) => onUpdateProject((p) => ({ ...p, audio: { ...p.audio, enabled: e.target.checked } }))}
                  style={{ width: 20, height: 20, accentColor: '#D4AF37' }}
                />
              </div>

              {/* Volume Slider */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#C4B5A5' }}>
                  <span>Music Volume</span>
                  <span>{Math.round(project.audio.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={project.audio.volume}
                  onChange={(e) => onUpdateProject((p) => ({ ...p, audio: { ...p.audio, volume: parseFloat(e.target.value) } }))}
                  style={{ accentColor: '#D4AF37' }}
                />
              </div>

              {/* Track list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                <span style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>Traditional Indian Instrumentals:</span>

                {WEDDING_AUDIO_TRACKS.map((track) => {
                  const isSelected = project.audio.trackId === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => onUpdateProject((p) => ({ ...p, audio: { ...p.audio, trackId: track.id } }))}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.04)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#FFFDF9', fontSize: '0.9rem' }}>
                        {track.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#C4B5A5' }}>{track.description}</div>
                    </div>
                  );
                })}

                {/* Custom Audio Upload */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: project.audio.trackId === 'custom' ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid',
                  borderColor: project.audio.trackId === 'custom' ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#FFE494', fontSize: '0.88rem' }}>
                      Upload Custom Audio File (MP3 / WAV)
                    </span>
                  </div>

                  <label className="btn btn-outline-gold" style={{ padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <Upload size={14} /> Choose Audio File
                    <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleCustomAudioUpload} />
                  </label>

                  {customAudioName && (
                    <div style={{ fontSize: '0.76rem', color: '#4ADE80' }}>
                      ✓ Loaded: {customAudioName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Video Export Settings */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group" style={{ margin: 0 }}>
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
                  Recommended: 30s to 45s for standard WhatsApp and social invitations.
                </span>
              </div>

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

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '12px 14px',
                borderRadius: 8,
                fontSize: '0.78rem',
                color: '#C4B5A5',
                lineHeight: 1.5,
              }}>
                <strong style={{ color: '#FFE494' }}>Privacy &amp; Browser Rendering:</strong>
                <br />
                Videos are rendered completely on your device using Canvas API, Web Audio API, and MediaRecorder. No external rendering servers, databases, or cloud processing are used!
              </div>
            </div>
          )}

          {/* Bottom Export Action Button */}
          <button
            onClick={onOpenGenerator}
            className="btn btn-gold"
            style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: 10 }}
          >
            <Film size={18} /> Generate Wedding Video
          </button>
        </div>
      </div>
    </div>
  );
};
