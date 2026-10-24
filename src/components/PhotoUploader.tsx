import { useRef } from 'react';
import { Upload, Trash2, ZoomIn, RotateCw, Sparkles, Shapes } from 'lucide-react';
import type { PhotoOffsets, PhotoFilter, PhotoFrameShape } from '../types/wedding';
import { indexedDBService } from '../services/indexedDBService';

interface PhotoUploaderProps {
  projectId: string;
  slotKey: 'bride' | 'groom' | 'couple' | 'family';
  title: string;
  hindiTitle?: string;
  description: string;
  currentPhotoUrl?: string;
  offsets?: PhotoOffsets;
  onPhotoChanged: (slotKey: 'bride' | 'groom' | 'couple' | 'family', dataUrl?: string) => void;
  onOffsetsChanged: (slotKey: 'bride' | 'groom' | 'couple' | 'family', offsets: PhotoOffsets) => void;
}

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

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  projectId,
  slotKey,
  title,
  hindiTitle,
  description,
  currentPhotoUrl,
  offsets = { zoom: 1, offsetX: 0, offsetY: 0, rotation: 0, filter: 'none', frameShape: 'default' },
  onPhotoChanged,
  onOffsetsChanged,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Photo is too large. Please select an image under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      await indexedDBService.savePhoto(projectId, slotKey, result);
      onPhotoChanged(slotKey, result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    await indexedDBService.deletePhoto(projectId, slotKey);
    onPhotoChanged(slotKey, undefined);
  };

  const rotatePhoto = () => {
    const cur = offsets.rotation || 0;
    const next = (cur + 90) % 360;
    onOffsetsChanged(slotKey, { ...offsets, rotation: next });
  };

  // Helper for live preview CSS filter
  const getCssFilter = (filter?: PhotoFilter) => {
    switch (filter) {
      case 'royal-gold':
        return 'sepia(0.28) contrast(1.15) brightness(1.04) saturate(1.22)';
      case 'festive-vibrant':
        return 'saturate(1.42) contrast(1.12) brightness(1.02)';
      case 'vintage-sepia':
        return 'sepia(0.65) contrast(1.08) brightness(0.96)';
      case 'romantic-soft':
        return 'brightness(1.06) contrast(0.96) saturate(1.18)';
      default:
        return 'none';
    }
  };

  // Helper for live preview border shape
  const getBorderRadius = (shape?: PhotoFrameShape) => {
    if (shape === 'royal-arch') return '100px 100px 8px 8px';
    if (shape === 'oval-kundan' || shape === 'floral-wreath') return '50%';
    if (shape === 'heritage-square') return '4px';
    return '14px';
  };

  return (
    <div style={{
      background: 'rgba(26, 23, 31, 0.85)',
      border: '1px solid rgba(212, 175, 55, 0.25)',
      borderRadius: 12,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Title & Description */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            color: '#FFE494',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            {title} {hindiTitle && <span style={{ fontFamily: 'var(--font-hindi)', fontSize: '0.9rem', color: '#C4B5A5' }}>({hindiTitle})</span>}
          </h4>
          <p style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{description}</p>
        </div>

        {currentPhotoUrl && (
          <button
            onClick={handleRemove}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#F87171',
              padding: '4px 8px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="Remove photo"
          >
            <Trash2 size={14} /> Remove
          </button>
        )}
      </div>

      {/* Image Preview Box or Empty Dropzone */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 220,
        borderRadius: 10,
        overflow: 'hidden',
        background: '#0F0E13',
        border: '1.5px dashed rgba(212, 175, 55, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {currentPhotoUrl ? (
          <div style={{
            width: '85%',
            height: '90%',
            overflow: 'hidden',
            borderRadius: getBorderRadius(offsets.frameShape),
            border: '3px solid #D4AF37',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-radius 0.2s ease',
          }}>
            <img
              src={currentPhotoUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: getCssFilter(offsets.filter),
                transform: `rotate(${offsets.rotation || 0}deg) scale(${offsets.zoom || 1}) translate(${(offsets.offsetX || 0) / 2}%, ${(offsets.offsetY || 0) / 2}%)`,
                transition: 'transform 0.15s ease-out, filter 0.2s ease',
              }}
            />
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              color: '#C4B5A5',
              padding: 20,
              textAlign: 'center',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--gold-primary)',
            }}>
              <Upload size={22} color="#FFE494" />
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFE494' }}>
              Upload {title}
            </span>
            <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>
              Supports JPG, PNG, WebP (Max 15MB)
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>

      {/* Action buttons */}
      {currentPhotoUrl && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-outline-gold"
            style={{ padding: '6px 12px', fontSize: '0.8rem', flex: 1 }}
          >
            <Upload size={14} /> Replace Photo
          </button>
          <button
            type="button"
            onClick={rotatePhoto}
            className="btn btn-outline-gold"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            title="Rotate 90 degrees clockwise"
          >
            <RotateCw size={14} /> Rotate ({offsets.rotation || 0}°)
          </button>
        </div>
      )}

      {/* Frame Shapes & Color Grading Filters */}
      {currentPhotoUrl && (
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {/* Frame Shape Selector */}
          <div>
            <div style={{ fontSize: '0.74rem', color: '#FFE494', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Shapes size={12} /> Royal Frame Shape:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {FRAME_SHAPES.map((fs) => {
                const isSelected = (offsets.frameShape || 'default') === fs.id;
                return (
                  <button
                    key={fs.id}
                    type="button"
                    onClick={() => onOffsetsChanged(slotKey, { ...offsets, frameShape: fs.id })}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: isSelected ? '#FFE494' : 'rgba(212, 175, 55, 0.2)',
                      background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                      color: isSelected ? '#FFE494' : '#C4B5A5',
                      fontWeight: isSelected ? 700 : 500,
                    }}
                  >
                    {fs.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Grading Filter */}
          <div>
            <div style={{ fontSize: '0.74rem', color: '#FFE494', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Sparkles size={12} /> Color Grading &amp; Lighting:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {PHOTO_FILTERS.map((pf) => {
                const isSelected = (offsets.filter || 'none') === pf.id;
                return (
                  <button
                    key={pf.id}
                    type="button"
                    onClick={() => onOffsetsChanged(slotKey, { ...offsets, filter: pf.id })}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: isSelected ? '#FFE494' : 'rgba(212, 175, 55, 0.2)',
                      background: isSelected ? 'var(--grad-royal-maroon)' : 'rgba(255,255,255,0.03)',
                      color: isSelected ? '#FFE494' : '#C4B5A5',
                      fontWeight: isSelected ? 700 : 500,
                    }}
                  >
                    {pf.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Positioning & Zoom Sliders (Preserves Face & Aspect Ratio) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ZoomIn size={14} /> Zoom ({(offsets.zoom || 1).toFixed(1)}x)
              </span>
              <input
                type="range"
                min={1}
                max={2.5}
                step={0.1}
                value={offsets.zoom || 1}
                onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, zoom: parseFloat(e.target.value) })}
                style={{ width: 120, accentColor: '#D4AF37' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
              <span>Pan X ({offsets.offsetX || 0}%)</span>
              <input
                type="range"
                min={-50}
                max={50}
                step={1}
                value={offsets.offsetX || 0}
                onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, offsetX: parseInt(e.target.value) })}
                style={{ width: 120, accentColor: '#D4AF37' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
              <span>Pan Y ({offsets.offsetY || 0}%)</span>
              <input
                type="range"
                min={-50}
                max={50}
                step={1}
                value={offsets.offsetY || 0}
                onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, offsetY: parseInt(e.target.value) })}
                style={{ width: 120, accentColor: '#D4AF37' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
