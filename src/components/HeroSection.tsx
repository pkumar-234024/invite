import { Sparkles, ArrowRight, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import type { WeddingProject } from '../types/wedding';
import { VideoPreview } from './VideoPreview';

interface HeroSectionProps {
  project: WeddingProject;
  onNavigateToCreate: () => void;
  onNavigateToTemplates: () => void;
  onOpenGenerator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  project,
  onNavigateToCreate,
  onNavigateToTemplates,
  onOpenGenerator,
}) => {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 16px 60px',
      background: 'radial-gradient(circle at 50% 20%, rgba(106, 13, 37, 0.45) 0%, rgba(14, 13, 17, 1) 75%)',
    }}>
      {/* Background Golden Glow Accents */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 700,
        height: 700,
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 28,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Top Auspicious Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(212, 175, 55, 0.12)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: 30,
          padding: '6px 16px',
          boxShadow: 'var(--shadow-gold-sm)',
        }}>
          <Sparkles size={16} color="#FFE494" />
          <span style={{
            fontSize: '0.86rem',
            fontWeight: 700,
            color: '#FFE494',
            fontFamily: 'var(--font-hindi)',
            letterSpacing: '0.5px',
          }}>
            ॥ श्री गणेशाय नमः ॥ 100% In-Browser Indian Wedding Invitation Video Maker
          </span>
        </div>

        {/* Hero Headline */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-hindi)',
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: 14,
            background: 'var(--grad-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 14px rgba(212, 175, 55, 0.4))',
          }}>
            आपकी शादी, आपकी कहानी, आपका अंदाज़!
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            color: '#F4ECE1',
            maxWidth: 780,
            margin: '0 auto',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}>
            Create beautiful cinematic Indian wedding invitation videos in minutes.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 4,
        }}>
          <button
            onClick={onNavigateToCreate}
            className="btn btn-gold"
            style={{
              padding: '14px 34px',
              fontSize: '1.05rem',
              borderRadius: 10,
              boxShadow: 'var(--shadow-gold-md)',
            }}
          >
            <Heart size={18} fill="#2D050D" />
            <span>Create Your Invitation</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onNavigateToTemplates}
            className="btn btn-outline-gold"
            style={{
              padding: '14px 28px',
              fontSize: '1.05rem',
              borderRadius: 10,
            }}
          >
            <span>Explore Templates</span>
          </button>
        </div>

        {/* Trust & Spec Badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          fontSize: '0.84rem',
          color: '#C4B5A5',
          marginTop: 6,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={16} color="#4ADE80" /> 16:9 Landscape Full HD (1080p)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={16} color="#4ADE80" /> 30 FPS Smooth Motion
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={16} color="#4ADE80" /> Hindi &amp; English Typography
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={16} color="#4ADE80" /> 100% Client-Side Privacy
          </span>
        </div>

        {/* Horizontal Animated Wedding Invitation Preview Showcase */}
        <div style={{
          width: '100%',
          maxWidth: 960,
          marginTop: 20,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
            padding: '0 6px',
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFE494', letterSpacing: '0.5px' }}>
              ✦ LIVE INTERACTIVE 16:9 WEDDING INVITATION PREVIEW ✦
            </span>
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
              Rendered real-time on HTML Canvas with Web Audio
            </span>
          </div>

          <VideoPreview project={project} onOpenGenerator={onOpenGenerator} />
        </div>
      </div>
    </div>
  );
};
