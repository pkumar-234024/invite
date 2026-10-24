import { ShieldCheck, Music, Video, Palette, Type, Smartphone } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: '100% In-Browser Privacy',
      desc: 'No account needed. Your private family photos and wedding details are stored in your browser and never transmitted to external cloud servers.',
    },
    {
      icon: Video,
      title: 'Full HD 1080p Export at 30 FPS',
      desc: 'Target 1920×1080 horizontal landscape video output with buttery smooth 30 FPS motion rendered directly by your browser.',
    },
    {
      icon: Type,
      title: 'Authentic Hindi & Devanagari Fonts',
      desc: 'Full support for Sanskrit shlokas, Hindi blessings, and English typography with fonts like Rozha One, Yatra One, and Cinzel.',
    },
    {
      icon: Music,
      title: 'Shehnai & Sitar Soundscapes',
      desc: 'Built-in traditional Indian wedding instrumentals generated via Web Audio API, or upload your own favorite Bollywood wedding song.',
    },
    {
      icon: Palette,
      title: '10 Distinct Wedding Themes',
      desc: 'From royal maroon Maharaja palace doors to ivory Shubh Vivah mandalas and romantic rose gardens, all customizable.',
    },
    {
      icon: Smartphone,
      title: 'Instant WhatsApp Sharing',
      desc: 'Generates a real, standard downloadable video file optimized for WhatsApp invitations, Instagram, and family messaging.',
    },
  ];

  return (
    <section style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '40px 16px 80px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <span style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#FFE494',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Engineered for Indian Weddings
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.4rem',
          color: '#FFFDF9',
          marginTop: 6,
        }}>
          Why Couples Love ShaadiMotion
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: 24,
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={22} color="#FFE494" />
              </div>

              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#FFFDF9', marginBottom: 6 }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#9CA3AF', lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
