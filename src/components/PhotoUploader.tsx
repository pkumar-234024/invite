import { useRef } from 'react';
import { Upload, Trash2, ZoomIn } from 'lucide-react';
import type { PhotoOffsets } from '../types/wedding';
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

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  projectId,
  slotKey,
  title,
  hindiTitle,
  description,
  currentPhotoUrl,
  offsets = { zoom: 1, offsetX: 0, offsetY: 0 },
  onPhotoChanged,
  onOffsetsChanged,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('Photo is too large. Please select an image under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      // Save directly to IndexedDB
      await indexedDBService.savePhoto(projectId, slotKey, result);
      onPhotoChanged(slotKey, result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    await indexedDBService.deletePhoto(projectId, slotKey);
    onPhotoChanged(slotKey, undefined);
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
        height: 200,
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
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={currentPhotoUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${offsets.zoom}) translate(${offsets.offsetX / 2}%, ${offsets.offsetY / 2}%)`,
                transition: 'transform 0.1s ease-out',
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

      {/* Action button to change image */}
      {currentPhotoUrl && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-outline-gold"
          style={{ padding: '6px 12px', fontSize: '0.8rem', width: '100%' }}
        >
          <Upload size={14} /> Replace Photo
        </button>
      )}

      {/* Positioning & Zoom Sliders (Preserves Face & Aspect Ratio) */}
      {currentPhotoUrl && (
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ZoomIn size={14} /> Zoom ({offsets.zoom.toFixed(1)}x)
            </span>
            <input
              type="range"
              min={1}
              max={2.5}
              step={0.1}
              value={offsets.zoom}
              onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, zoom: parseFloat(e.target.value) })}
              style={{ width: 120, accentColor: '#D4AF37' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
            <span>Pan X ({offsets.offsetX}%)</span>
            <input
              type="range"
              min={-50}
              max={50}
              step={1}
              value={offsets.offsetX}
              onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, offsetX: parseInt(e.target.value) })}
              style={{ width: 120, accentColor: '#D4AF37' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#D4AF37' }}>
            <span>Pan Y ({offsets.offsetY}%)</span>
            <input
              type="range"
              min={-50}
              max={50}
              step={1}
              value={offsets.offsetY}
              onChange={(e) => onOffsetsChanged(slotKey, { ...offsets, offsetY: parseInt(e.target.value) })}
              style={{ width: 120, accentColor: '#D4AF37' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
