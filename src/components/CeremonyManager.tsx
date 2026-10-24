import { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import type { Ceremony } from '../types/wedding';
import { ALL_CEREMONY_PRESETS } from '../utils/sampleData';

interface CeremonyManagerProps {
  ceremonies: Ceremony[];
  onChange: (ceremonies: Ceremony[]) => void;
}

export const CeremonyManager: React.FC<CeremonyManagerProps> = ({ ceremonies, onChange }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('haldi');

  const handleAddPreset = () => {
    const preset = ALL_CEREMONY_PRESETS.find((p) => p.key === selectedPreset) || ALL_CEREMONY_PRESETS[0];
    const newCeremony: Ceremony = {
      id: `ceremony_${Date.now()}`,
      key: preset.key,
      name: preset.name,
      hindiName: preset.hindiName,
      date: new Date().toISOString().split('T')[0],
      time: '07:00 PM',
      venueName: 'The Grand Heritage Ballroom',
      venueAddress: 'Civil Lines, New Delhi',
      description: 'Joyous celebrations with family & friends.',
    };
    onChange([...ceremonies, newCeremony]);
  };

  const handleUpdate = (id: string, field: keyof Ceremony, value: string) => {
    const updated = ceremonies.map((c) => (c.id === id ? { ...c, [field]: value } : c));
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(ceremonies.filter((c) => c.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= ceremonies.length) return;
    const clone = [...ceremonies];
    const temp = clone[index];
    clone[index] = clone[targetIdx];
    clone[targetIdx] = temp;
    onChange(clone);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Add New Ceremony Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        padding: '14px 18px',
        background: 'rgba(26, 23, 31, 0.9)',
        borderRadius: 12,
        border: '1px solid rgba(212, 175, 55, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={20} color="#FFE494" />
          <span style={{ fontWeight: 600, color: '#FFE494', fontSize: '0.95rem' }}>
            Add Wedding Ceremony ({ceremonies.length} added)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '8px 14px' }}
          >
            {ALL_CEREMONY_PRESETS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.name} ({p.hindiName})
              </option>
            ))}
          </select>

          <button
            onClick={handleAddPreset}
            className="btn btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.88rem' }}
          >
            <Plus size={16} /> Add Ceremony
          </button>
        </div>
      </div>

      {/* List of ceremonies */}
      {ceremonies.length === 0 ? (
        <div style={{
          padding: 40,
          textAlign: 'center',
          background: 'rgba(26, 23, 31, 0.5)',
          borderRadius: 12,
          border: '1px dashed rgba(212, 175, 55, 0.3)',
          color: '#9CA3AF',
        }}>
          No ceremonies added yet. Choose a ceremony from above and click &quot;Add Ceremony&quot;.
        </div>
      ) : (
        ceremonies.map((c, index) => (
          <div
            key={c.id}
            style={{
              background: 'rgba(26, 23, 31, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: 12,
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {/* Header with order buttons and delete */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  background: 'var(--grad-royal-maroon)',
                  color: '#FFE494',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid var(--gold-primary)',
                }}>
                  #{index + 1}
                </span>
                <span style={{ fontWeight: 700, color: '#FFFDF9', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                  {c.name}
                </span>
                {c.hindiName && (
                  <span style={{ fontFamily: 'var(--font-hindi)', color: '#C4B5A5', fontSize: '0.95rem' }}>
                    ({c.hindiName})
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    color: index === 0 ? '#4B5563' : '#E5E7EB',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    padding: 4,
                  }}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>

                <button
                  disabled={index === ceremonies.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    color: index === ceremonies.length - 1 ? '#4B5563' : '#E5E7EB',
                    cursor: index === ceremonies.length - 1 ? 'not-allowed' : 'pointer',
                    padding: 4,
                  }}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: 6,
                    color: '#F87171',
                    cursor: 'pointer',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.78rem',
                  }}
                  title="Delete Ceremony"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>

            {/* Editable Form Inputs for Ceremony */}
            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Ceremony English Name</label>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => handleUpdate(c.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Sangeet & Mehndi Night"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">हिंदी नाम (Hindi Name)</label>
                <input
                  type="text"
                  value={c.hindiName}
                  onChange={(e) => handleUpdate(c.id, 'hindiName', e.target.value)}
                  className="form-input font-hindi"
                  placeholder="e.g. संगीत संध्या"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={14} /> Date
                </label>
                <input
                  type="date"
                  value={c.date}
                  onChange={(e) => handleUpdate(c.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} /> Start Time
                </label>
                <input
                  type="text"
                  value={c.time}
                  onChange={(e) => handleUpdate(c.id, 'time', e.target.value)}
                  className="form-input"
                  placeholder="e.g. 07:00 PM"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} /> Venue Name
                </label>
                <input
                  type="text"
                  value={c.venueName}
                  onChange={(e) => handleUpdate(c.id, 'venueName', e.target.value)}
                  className="form-input"
                  placeholder="e.g. The Taj Palace Ballroom"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Venue Address / City</label>
                <input
                  type="text"
                  value={c.venueAddress}
                  onChange={(e) => handleUpdate(c.id, 'venueAddress', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Chanakyapuri, New Delhi"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
