import { useState } from 'react';
import { PlusCircle, FolderHeart, Trash2, Copy, Edit, AlertCircle, ArrowRight } from 'lucide-react';
import type { ProjectSummary, WeddingProject } from '../types/wedding';
import { LocalStorageService } from '../services/localStorageService';
import { createDefaultProject } from '../utils/sampleData';

interface ProjectDashboardProps {
  projects: ProjectSummary[];
  activeProjectId: string;
  onOpenProject: (projectId: string) => void;
  onRefreshProjects: () => void;
  onNavigateToCreate?: () => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projects,
  activeProjectId,
  onOpenProject,
  onRefreshProjects,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState<string>('');

  const handleCreateNew = async () => {
    const newProj = createDefaultProject(`shaadi_${Date.now()}`);
    newProj.name = `New Wedding Invitation (${projects.length + 1})`;
    await LocalStorageService.saveProject(newProj);
    onRefreshProjects();
    onOpenProject(newProj.id);
  };

  const handleDuplicate = async (projectId: string) => {
    const orig = await LocalStorageService.loadProject(projectId);
    if (!orig) return;

    const dup: WeddingProject = {
      ...orig,
      id: `shaadi_${Date.now()}`,
      name: `${orig.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await LocalStorageService.saveProject(dup);
    onRefreshProjects();
  };

  const handleDelete = async (projectId: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`)) {
      await LocalStorageService.deleteProject(projectId);
      onRefreshProjects();
    }
  };

  const startRenaming = (id: string, currentName: string) => {
    setEditingId(id);
    setRenameText(currentName);
  };

  const saveRename = async (id: string) => {
    if (!renameText.trim()) return;
    const proj = await LocalStorageService.loadProject(id);
    if (proj) {
      proj.name = renameText.trim();
      await LocalStorageService.saveProject(proj);
      onRefreshProjects();
    }
    setEditingId(null);
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            background: 'var(--grad-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 6,
          }}>
            My Saved Wedding Projects
          </h2>
          <p style={{ color: '#C4B5A5', fontSize: '0.92rem' }}>
            Manage all your personalized invitations. Projects are saved privately on your device.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="btn btn-gold"
          style={{ padding: '10px 20px', fontSize: '0.95rem' }}
        >
          <PlusCircle size={18} /> Create New Invitation
        </button>
      </div>

      {/* Local Storage Disclaimer */}
      <div style={{
        background: 'rgba(212, 175, 55, 0.08)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: 12,
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: '#FDE68A',
        fontSize: '0.84rem',
        lineHeight: 1.5,
      }}>
        <AlertCircle size={24} style={{ flexShrink: 0, color: '#D4AF37' }} />
        <div>
          <strong>Local Device Storage:</strong> All your projects, photos, and configurations remain 100% on your device (browser localStorage &amp; IndexedDB). If you clear your browser data or switch devices, projects may be lost.
        </div>
      </div>

      {/* Projects List Grid */}
      {projects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 60,
          background: 'rgba(26, 23, 31, 0.6)',
          borderRadius: 16,
          border: '1px dashed rgba(212, 175, 55, 0.3)',
        }}>
          <FolderHeart size={48} color="#D4AF37" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.4rem', color: '#FFFDF9', marginBottom: 8 }}>No Projects Found</h3>
          <p style={{ color: '#9CA3AF', marginBottom: 20 }}>
            Start creating your first Indian wedding invitation video now!
          </p>
          <button onClick={handleCreateNew} className="btn btn-gold">
            <PlusCircle size={18} /> Create Your First Project
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {projects.map((proj) => {
            const isActive = proj.id === activeProjectId;
            const dateStr = new Date(proj.updatedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={proj.id}
                className="glass-card"
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  border: isActive ? '2px solid var(--gold-primary)' : '1px solid rgba(212, 175, 55, 0.25)',
                  boxShadow: isActive ? 'var(--shadow-gold-md)' : 'var(--shadow-card)',
                }}
              >
                {/* Title & Active indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {editingId === proj.id ? (
                    <div style={{ display: 'flex', gap: 6, width: '100%' }}>
                      <input
                        type="text"
                        value={renameText}
                        onChange={(e) => setRenameText(e.target.value)}
                        className="form-input"
                        style={{ padding: '4px 8px', fontSize: '0.9rem' }}
                        autoFocus
                      />
                      <button onClick={() => saveRename(proj.id)} className="btn btn-gold" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        color: '#FFFDF9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                        {proj.name}
                        <button
                          onClick={() => startRenaming(proj.id, proj.name)}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
                          title="Rename"
                        >
                          <Edit size={14} />
                        </button>
                      </h4>
                      <div style={{ fontSize: '0.82rem', color: '#FFE494', fontWeight: 600 }}>
                        {proj.coupleTitle}
                      </div>
                    </div>
                  )}

                  {isActive && (
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#4ADE80',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                    }}>
                      OPEN
                    </span>
                  )}
                </div>

                {/* Details */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  fontSize: '0.78rem',
                  color: '#9CA3AF',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 10,
                }}>
                  <div>Template: <strong style={{ color: '#E0D5BE' }}>{proj.templateId.toUpperCase()}</strong></div>
                  <div>Ceremonies: <strong style={{ color: '#E0D5BE' }}>{proj.ceremoniesCount} events</strong></div>
                  <div>Last Edited: <strong style={{ color: '#E0D5BE' }}>{dateStr}</strong></div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                  paddingTop: 10,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleDuplicate(proj.id)}
                      className="btn btn-ghost"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      title="Duplicate project"
                    >
                      <Copy size={14} /> Duplicate
                    </button>

                    <button
                      onClick={() => handleDelete(proj.id, proj.name)}
                      className="btn btn-ghost"
                      style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#F87171' }}
                      title="Delete project"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenProject(proj.id)}
                    className={isActive ? 'btn btn-gold' : 'btn btn-outline-gold'}
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    Open <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
