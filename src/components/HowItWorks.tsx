import { Heart, Palette, Film, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onNavigateToCreate: () => void;
  onNavigateToTemplates?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onNavigateToCreate,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Enter Wedding Details',
      hindiTitle: 'विवाह विवरण दर्ज करें',
      desc: 'Add bride and groom names in English & Hindi, family lineage, and custom ceremonies (Haldi, Mehndi, Sangeet, Shubh Vivah, Reception).',
      icon: Heart,
    },
    {
      step: '02',
      title: 'Upload Couple Photos',
      hindiTitle: 'तस्वीरें अपलोड करें',
      desc: 'Upload bride, groom, and couple photos. Use zoom and position sliders to fit frames perfectly while preserving natural facial proportions.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Select Indian Template',
      hindiTitle: 'शाही थीम चुनें',
      desc: 'Choose from 10 distinct Indian wedding templates (Royal Maharaja, Shubh Vivah, Rajasthani, Floral, Modern Love, and more).',
      icon: Palette,
    },
    {
      step: '04',
      title: 'Generate & Download',
      hindiTitle: 'वीडियो डाउनलोड करें',
      desc: 'Render your video at 1920×1080 30 FPS with Indian wedding Shehnai / Sitar music and download a real MP4 / WebM video file.',
      icon: Film,
    },
  ];

  return (
    <section style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '60px 16px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <span style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#FFE494',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Simple 4-Step Process
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.4rem',
          color: '#FFFDF9',
          marginTop: 6,
        }}>
          How ShaadiMotion Works
        </h2>
        <p style={{ color: '#C4B5A5', fontSize: '1rem', maxWidth: 650, margin: '8px auto 0' }}>
          Crafting an unforgettable Indian wedding invitation video has never been this effortless and private.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 24,
      }}>
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'var(--grad-royal-maroon)',
                  border: '1.5px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={20} color="#FFE494" />
                </div>

                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.4)',
                }}>
                  {s.step}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFDF9', marginBottom: 4 }}>
                  {s.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-hindi)', fontSize: '0.85rem', color: '#FFE494', marginBottom: 8 }}>
                  {s.hindiTitle}
                </div>
                <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: 1.5 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <button
          onClick={onNavigateToCreate}
          className="btn btn-gold"
          style={{ padding: '14px 32px', fontSize: '1rem' }}
        >
          <span>Get Started Now</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
