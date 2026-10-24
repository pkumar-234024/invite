import { useState } from 'react';
import { Check, Eye, Palette, CheckCircle2 } from 'lucide-react';
import type { TemplateId } from '../types/wedding';
import { WEDDING_TEMPLATES } from '../templates/templateRegistry';

interface TemplateGalleryProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  onPreviewTemplate?: (templateId: TemplateId) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Royal', 'Traditional', 'Romantic', 'Modern', 'Cinematic'];

  const filteredTemplates = filterCategory === 'All'
    ? WEDDING_TEMPLATES
    : WEDDING_TEMPLATES.filter((t) => t.category === filterCategory);

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {/* Title & Filter bar */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem',
          background: 'var(--grad-gold)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>
          Indian Wedding Video Templates
        </h2>
        <p style={{ color: '#C4B5A5', fontSize: '1rem', maxWidth: 750, margin: '0 auto' }}>
          Explore 10 authentic, handcrafted Indian wedding styles. Switching templates seamlessly updates your video preview while keeping all your couple details and photos safe!
        </p>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 20,
          flexWrap: 'wrap',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filterCategory === cat ? 'var(--gold-primary)' : 'rgba(212, 175, 55, 0.25)',
                background: filterCategory === cat ? 'var(--grad-royal-maroon)' : 'rgba(26, 23, 31, 0.7)',
                color: filterCategory === cat ? '#FFE494' : '#C4B5A5',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid (10 distinct templates) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 24,
      }}>
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;

          return (
            <div
              key={template.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: isSelected ? '2px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.25)',
                boxShadow: isSelected ? 'var(--shadow-gold-md)' : 'var(--shadow-card)',
                transition: 'all 0.3s',
              }}
            >
              {/* Template Card Visual Header with Color Theme */}
              <div style={{
                position: 'relative',
                height: 160,
                background: template.bgGradient,
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFE494',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}>
                    {template.previewBadge}
                  </span>

                  {isSelected && (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: 'rgba(34, 197, 94, 0.85)',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <CheckCircle2 size={13} /> ACTIVE
                    </span>
                  )}
                </div>

                {/* Card Title on banner */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: '#FFFDF9',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}>
                    {template.name}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-hindi)',
                    fontSize: '1rem',
                    color: '#FFE494',
                    fontWeight: 600,
                  }}>
                    {template.hindiName}
                  </span>
                </div>
              </div>

              {/* Card Body & Features */}
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                <p style={{ fontSize: '0.86rem', color: '#C4B5A5', lineHeight: 1.5 }}>
                  {template.description}
                </p>

                {/* Color Theme & Swatches */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#FFE494' }}>
                    <Palette size={15} />
                    <span>{template.colorTheme}</span>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: template.primaryColor, border: '1.5px solid #FFF' }} title="Primary" />
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: template.secondaryColor, border: '1.5px solid #FFF' }} title="Secondary" />
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: template.accentColor, border: '1.5px solid #FFF' }} title="Accent" />
                  </div>
                </div>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {template.features.map((f, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.06)',
                        color: '#9CA3AF',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => {
                      onSelectTemplate(template.id);
                      if (onPreviewTemplate) onPreviewTemplate(template.id);
                    }}
                    className={isSelected ? 'btn btn-gold' : 'btn btn-outline-gold'}
                    style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} /> Selected Template
                      </>
                    ) : (
                      'Select Template'
                    )}
                  </button>

                  {onPreviewTemplate && (
                    <button
                      onClick={() => onPreviewTemplate(template.id)}
                      className="btn btn-ghost"
                      style={{ padding: '10px 14px', fontSize: '0.88rem' }}
                      title="Load in Video Preview"
                    >
                      <Eye size={16} /> Preview
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
