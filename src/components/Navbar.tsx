import { Film, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'create' | 'templates' | 'editor' | 'projects';
  onSelectTab: (tab: 'home' | 'create' | 'templates' | 'editor' | 'projects') => void;
  onOpenGenerator: () => void;
  activeProjectName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenGenerator,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(14, 13, 17, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
      padding: '12px 24px',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* Logo */}
        <div
          onClick={() => onSelectTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'var(--grad-royal-maroon)',
            border: '1.5px solid #FFE494',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-gold-sm)',
          }}>
            <Sparkles size={22} color="#FFE494" />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '1px',
                background: 'var(--grad-gold)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                ShaadiMotion
              </span>
              <span style={{
                fontSize: '0.65rem',
                padding: '2px 8px',
                borderRadius: 20,
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#FFE494',
                fontWeight: 600,
              }}>
                100% IN-BROWSER
              </span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: '#C7A779',
              fontFamily: "var(--font-hindi)",
              letterSpacing: '0.5px',
            }}>
              भारतीय विवाह निमंत्रण वीडियो स्टूडियो
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(26, 23, 31, 0.8)',
          padding: '4px',
          borderRadius: 10,
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}>
          <button
            onClick={() => onSelectTab('home')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: currentTab === 'home' ? 'var(--grad-royal-maroon)' : 'transparent',
              color: currentTab === 'home' ? '#FFE494' : '#C4B5A5',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentTab === 'home' ? 'var(--gold-primary)' : 'transparent',
            }}
          >
            Home
          </button>

          <button
            onClick={() => onSelectTab('create')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: currentTab === 'create' ? 'var(--grad-royal-maroon)' : 'transparent',
              color: currentTab === 'create' ? '#FFE494' : '#C4B5A5',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentTab === 'create' ? 'var(--gold-primary)' : 'transparent',
            }}
          >
            Wedding Details
          </button>

          <button
            onClick={() => onSelectTab('templates')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: currentTab === 'templates' ? 'var(--grad-royal-maroon)' : 'transparent',
              color: currentTab === 'templates' ? '#FFE494' : '#C4B5A5',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentTab === 'templates' ? 'var(--gold-primary)' : 'transparent',
            }}
          >
            Templates (10)
          </button>

          <button
            onClick={() => onSelectTab('editor')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: currentTab === 'editor' ? 'var(--grad-royal-maroon)' : 'transparent',
              color: currentTab === 'editor' ? '#FFE494' : '#C4B5A5',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentTab === 'editor' ? 'var(--gold-primary)' : 'transparent',
            }}
          >
            Video Editor
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: currentTab === 'projects' ? 'var(--grad-royal-maroon)' : 'transparent',
              color: currentTab === 'projects' ? '#FFE494' : '#C4B5A5',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: currentTab === 'projects' ? 'var(--gold-primary)' : 'transparent',
            }}
          >
            My Projects
          </button>
        </nav>

        {/* Right Action: Generate Video button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: '#8A857D',
          }}>
            <ShieldCheck size={16} color="#4ADE80" />
            <span>100% Private</span>
          </div>

          <button
            onClick={onOpenGenerator}
            className="btn btn-gold"
            style={{
              padding: '8px 18px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Film size={18} />
            <span>Generate Video</span>
          </button>
        </div>
      </div>
    </header>
  );
};
