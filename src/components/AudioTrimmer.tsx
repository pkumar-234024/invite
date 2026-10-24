import { useState, useEffect } from 'react';
import { Play, Square, Scissors, Volume2, Upload, Sparkles } from 'lucide-react';
import type { AudioSettings } from '../types/wedding';
import { WEDDING_AUDIO_TRACKS, audioService } from '../services/audioService';

interface AudioTrimmerProps {
  audio: AudioSettings;
  videoDuration: number;
  onAudioChange: (updater: (prev: AudioSettings) => AudioSettings) => void;
}

export const AudioTrimmer: React.FC<AudioTrimmerProps> = ({
  audio,
  videoDuration,
  onAudioChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState(60);
  const [customTrackName, setCustomTrackName] = useState<string | null>(audio.customTrackName || null);

  useEffect(() => {
    const dur = audioService.getTrackDuration(audio.trackId);
    setTrackDuration(Math.max(30, Math.round(dur)));
    return () => {
      audioService.stopPreview();
    };
  }, [audio.trackId]);

  const togglePreview = () => {
    if (isPlaying) {
      audioService.stopPreview();
      setIsPlaying(false);
    } else {
      audioService.startPreview(
        audio.trackId,
        audio.volume,
        audio.startTime || 0,
        audio.fadeIn
      );
      setIsPlaying(true);
    }
  };

  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const name = await audioService.setCustomAudio(file);
      setCustomTrackName(name);
      onAudioChange((prev) => ({
        ...prev,
        trackId: 'custom',
        customTrackName: name,
        startTime: 0,
      }));
    } catch {
      alert('Unable to load audio file. Please choose an MP3 or WAV file.');
    }
  };

  const maxStart = Math.max(0, trackDuration - 10);
  const startTime = Math.min(audio.startTime || 0, maxStart);

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: 'rgba(20, 16, 24, 0.7)',
      padding: 16,
      borderRadius: 12,
      border: '1px solid rgba(212, 175, 55, 0.25)',
    }}>
      {/* Header & Enable Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Scissors size={18} color="#FFE494" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFE494' }}>
            Audio Soundtrack &amp; Precision Trimmer
          </span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.82rem', color: '#E5D6C5' }}>
          <input
            type="checkbox"
            checked={audio.enabled}
            onChange={(e) => onAudioChange((prev) => ({ ...prev, enabled: e.target.checked }))}
            style={{ width: 18, height: 18, accentColor: '#D4AF37' }}
          />
          Enable Audio
        </label>
      </div>

      {audio.enabled && (
        <>
          {/* Track Selection Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Choose Auspicious Instrumental Theme:</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
              {WEDDING_AUDIO_TRACKS.map((t) => {
                const isSelected = audio.trackId === t.id || (!audio.trackId && t.id === 'wedding-shubh-vivah');
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (isPlaying) {
                        audioService.stopPreview();
                        setIsPlaying(false);
                      }
                      onAudioChange((prev) => ({ ...prev, trackId: t.id }));
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                      background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                      color: isSelected ? '#FFE494' : '#E5D6C5',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>{t.title}</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.75 }}>{t.tempo} BPM • {t.hindiTitle}</div>
                  </button>
                );
              })}

              {/* Custom Track Button */}
              <label
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px dashed',
                  borderColor: audio.trackId === 'custom' ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.4)',
                  background: audio.trackId === 'custom' ? 'var(--grad-royal-maroon)' : 'rgba(212, 175, 55, 0.05)',
                  color: audio.trackId === 'custom' ? '#FFE494' : '#E5D6C5',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Upload size={13} /> {customTrackName ? 'Custom Audio' : 'Upload MP3'}
                </div>
                <div style={{ fontSize: '0.68rem', opacity: 0.75 }}>
                  {customTrackName ? customTrackName.slice(0, 14) + '...' : 'Add Own Track'}
                </div>
                <input type="file" accept="audio/*" style={{ display: 'none' }} onChange={handleCustomUpload} />
              </label>
            </div>
          </div>

          {/* Interactive Trimmer Timeline & Waveform Scrubbing */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.45)',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(212, 175, 55, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: '#FFE494', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Scissors size={14} /> Trim Start Offset: {formatSec(startTime)}
              </span>
              <span style={{ color: '#9CA3AF' }}>
                Window: {formatSec(startTime)} → {formatSec(startTime + videoDuration)} ({videoDuration}s)
              </span>
            </div>

            {/* Visual Waveform track bar */}
            <div style={{ position: 'relative', width: '100%', height: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              {/* Simulated decorative audio bars */}
              <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', gap: 2, padding: '0 4px', opacity: 0.35 }}>
                {Array.from({ length: 48 }).map((_, i) => {
                  const h = 20 + Math.sin(i * 0.4) * 15 + Math.cos(i * 0.9) * 10;
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${Math.max(15, Math.min(90, h))}%`,
                        background: '#FFE494',
                        borderRadius: 1,
                      }}
                    />
                  );
                })}
              </div>

              {/* Highlight active trim window */}
              {trackDuration > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${(startTime / trackDuration) * 100}%`,
                    width: `${Math.min(100 - (startTime / trackDuration) * 100, (videoDuration / trackDuration) * 100)}%`,
                    background: 'rgba(212, 175, 55, 0.3)',
                    borderLeft: '2px solid #FFE494',
                    borderRight: '2px solid #FFE494',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={maxStart}
              step={1}
              value={startTime}
              onChange={(e) => {
                const newStart = parseInt(e.target.value);
                onAudioChange((prev) => ({ ...prev, startTime: newStart }));
                if (isPlaying) {
                  audioService.startPreview(audio.trackId, audio.volume, newStart, audio.fadeIn);
                }
              }}
              style={{ width: '100%', accentColor: '#D4AF37' }}
            />

            {/* Quick Trim Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>Quick Presets:</span>
              <button
                type="button"
                onClick={() => onAudioChange((prev) => ({ ...prev, startTime: 0 }))}
                className="btn btn-outline-gold"
                style={{ padding: '2px 8px', fontSize: '0.72rem' }}
              >
                00:00 (Intro)
              </button>
              <button
                type="button"
                onClick={() => onAudioChange((prev) => ({ ...prev, startTime: Math.min(10, maxStart) }))}
                className="btn btn-outline-gold"
                style={{ padding: '2px 8px', fontSize: '0.72rem' }}
              >
                00:10 (Skip Intro)
              </button>
              <button
                type="button"
                onClick={() => onAudioChange((prev) => ({ ...prev, startTime: Math.min(20, maxStart) }))}
                className="btn btn-outline-gold"
                style={{ padding: '2px 8px', fontSize: '0.72rem' }}
              >
                00:20 (Build Up)
              </button>
              <button
                type="button"
                onClick={() => onAudioChange((prev) => ({ ...prev, startTime: Math.min(30, maxStart) }))}
                className="btn btn-outline-gold"
                style={{ padding: '2px 8px', fontSize: '0.72rem' }}
              >
                00:30 (Grand Chorus)
              </button>
            </div>
          </div>

          {/* Audio Controls: Preview Play Button, Volume, Fade In / Out */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'center' }}>
            <button
              type="button"
              onClick={togglePreview}
              className={`btn ${isPlaying ? 'btn-outline-gold' : 'btn-gold'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {isPlaying ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              {isPlaying ? 'Stop Preview' : 'Play Trimmed Audio'}
            </button>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={16} color="#FFE494" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={audio.volume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  onAudioChange((prev) => ({ ...prev, volume: vol }));
                }}
                style={{ flex: 1, accentColor: '#D4AF37' }}
              />
              <span style={{ fontSize: '0.78rem', color: '#FFE494', minWidth: 36 }}>
                {Math.round(audio.volume * 100)}%
              </span>
            </div>
          </div>

          {/* Audio Fade In and Fade Out Checkboxes */}
          <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: '#E5D6C5', paddingTop: 2 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={audio.fadeIn}
                onChange={(e) => onAudioChange((prev) => ({ ...prev, fadeIn: e.target.checked }))}
                style={{ accentColor: '#D4AF37' }}
              />
              <Sparkles size={13} color="#FFE494" /> Soft Fade-In (1.5s)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={audio.fadeOut}
                onChange={(e) => onAudioChange((prev) => ({ ...prev, fadeOut: e.target.checked }))}
                style={{ accentColor: '#D4AF37' }}
              />
              <Sparkles size={13} color="#FFE494" /> Peaceful Fade-Out (2.5s)
            </label>
          </div>
        </>
      )}
    </div>
  );
};
