import { useState } from 'react';
import { Heart, Calendar, MessageSquare, Camera, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import type { Ceremony, CoupleDetails, InvitationMessage, LanguageOption, PhotoOffsets, WeddingProject } from '../types/wedding';
import { CeremonyManager } from './CeremonyManager';
import { PhotoUploader } from './PhotoUploader';
import { INVITATION_MESSAGE_PRESETS } from '../utils/sampleData';

interface WeddingDetailsFormProps {
  project: WeddingProject;
  onUpdateProject: (updater: (prev: WeddingProject) => WeddingProject) => void;
  onNavigateToPreview: () => void;
}

export const WeddingDetailsForm: React.FC<WeddingDetailsFormProps> = ({
  project,
  onUpdateProject,
  onNavigateToPreview,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const updateCouple = (field: keyof CoupleDetails, value: string) => {
    onUpdateProject((prev) => ({
      ...prev,
      couple: { ...prev.couple, [field]: value },
    }));
  };

  const updateCeremonies = (ceremonies: Ceremony[]) => {
    onUpdateProject((prev) => ({
      ...prev,
      ceremonies,
    }));
  };

  const updateMessage = (field: keyof InvitationMessage, value: string | LanguageOption) => {
    onUpdateProject((prev) => ({
      ...prev,
      message: { ...prev.message, [field]: value },
    }));
  };

  const applyMessagePreset = (lang: LanguageOption) => {
    const preset = INVITATION_MESSAGE_PRESETS[lang];
    if (preset) {
      onUpdateProject((prev) => ({
        ...prev,
        message: { ...preset },
      }));
    }
  };

  const handlePhotoChanged = (slotKey: 'bride' | 'groom' | 'couple' | 'family', dataUrl?: string) => {
    onUpdateProject((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [`${slotKey}Photo`]: dataUrl,
      },
    }));
  };

  const handleOffsetsChanged = (slotKey: 'bride' | 'groom' | 'couple' | 'family', offsets: PhotoOffsets) => {
    onUpdateProject((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        offsets: {
          ...prev.photos.offsets,
          [slotKey]: offsets,
        },
      },
    }));
  };

  const steps = [
    { num: 1, label: 'Couple Details', icon: Heart },
    { num: 2, label: 'Ceremonies', icon: Calendar },
    { num: 3, label: 'Invitation Message', icon: MessageSquare },
    { num: 4, label: 'Photos Upload', icon: Camera },
  ];

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      padding: '24px 16px',
    }}>
      {/* Title & Introduction */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2rem',
          background: 'var(--grad-gold)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>
          Customize Your Wedding Invitation
        </h2>
        <p style={{ color: '#C4B5A5', fontSize: '0.95rem' }}>
          Personalize the names, ceremony timings, message in Hindi or English, and couple photos.
        </p>
      </div>

      {/* Stepper Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(26, 23, 31, 0.9)',
        padding: '12px 20px',
        borderRadius: 14,
        border: '1px solid rgba(212, 175, 55, 0.25)',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.num;
          const isPassed = activeStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: isActive ? 'var(--grad-royal-maroon)' : 'transparent',
                border: isActive ? '1px solid var(--gold-primary)' : '1px solid transparent',
                borderRadius: 8,
                padding: '8px 14px',
                cursor: 'pointer',
                color: isActive ? '#FFE494' : isPassed ? '#4ADE80' : '#8A857D',
                fontWeight: 600,
                fontSize: '0.88rem',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: isActive ? 'var(--gold-primary)' : isPassed ? '#16A34A' : 'rgba(255,255,255,0.1)',
                color: isActive ? '#2D050D' : '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
              }}>
                {isPassed ? <Check size={14} /> : <Icon size={14} />}
              </div>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: Couple Details */}
      {activeStep === 1 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Heart size={22} color="#D4AF37" />
            <h3 style={{ fontSize: '1.3rem' }}>Step 1: The Bride & Groom Details</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Groom&apos;s Full Name (English)</label>
                <input
                  type="text"
                  value={project.couple.groomName}
                  onChange={(e) => updateCouple('groomName', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div className="form-group">
                <label className="form-label">वर का नाम (Groom Hindi Name)</label>
                <input
                  type="text"
                  value={project.couple.groomHindiName || ''}
                  onChange={(e) => updateCouple('groomHindiName', e.target.value)}
                  className="form-input font-hindi"
                  placeholder="e.g. आरव शर्मा"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Bride&apos;s Full Name (English)</label>
                <input
                  type="text"
                  value={project.couple.brideName}
                  onChange={(e) => updateCouple('brideName', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Ananya Patel"
                />
              </div>

              <div className="form-group">
                <label className="form-label">वधू का नाम (Bride Hindi Name)</label>
                <input
                  type="text"
                  value={project.couple.brideHindiName || ''}
                  onChange={(e) => updateCouple('brideHindiName', e.target.value)}
                  className="form-input font-hindi"
                  placeholder="e.g. अनन्या पटेल"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Groom Nickname (Optional)</label>
                <input
                  type="text"
                  value={project.couple.groomNickname || ''}
                  onChange={(e) => updateCouple('groomNickname', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Avi"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bride Nickname (Optional)</label>
                <input
                  type="text"
                  value={project.couple.brideNickname || ''}
                  onChange={(e) => updateCouple('brideNickname', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Anu"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Groom&apos;s Parents&apos; Names</label>
                <input
                  type="text"
                  value={project.couple.groomParents}
                  onChange={(e) => updateCouple('groomParents', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Mr. Mahendra & Mrs. Rekha Sharma"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bride&apos;s Parents&apos; Names</label>
                <input
                  type="text"
                  value={project.couple.brideParents}
                  onChange={(e) => updateCouple('brideParents', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Mr. Rajesh & Mrs. Sunita Patel"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Groom&apos;s Family Name / Lineage</label>
                <input
                  type="text"
                  value={project.couple.groomFamily}
                  onChange={(e) => updateCouple('groomFamily', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Sharma Family"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bride&apos;s Family Name / Lineage</label>
                <input
                  type="text"
                  value={project.couple.brideFamily}
                  onChange={(e) => updateCouple('brideFamily', e.target.value)}
                  className="form-input"
                  placeholder="e.g. Patel Family"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Wedding Ceremonies */}
      {activeStep === 2 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Calendar size={22} color="#D4AF37" />
            <h3 style={{ fontSize: '1.3rem' }}>Step 2: Wedding Ceremonies Schedule</h3>
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '0.88rem', marginBottom: 20 }}>
            Add, reorder, or remove any ceremony (Haldi, Mehndi, Sangeet, Shubh Vivah, Reception, Engagement, etc.). You don&apos;t have to include every ceremony!
          </p>

          <CeremonyManager ceremonies={project.ceremonies} onChange={updateCeremonies} />
        </div>
      )}

      {/* STEP 3: Invitation Message */}
      {activeStep === 3 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <MessageSquare size={22} color="#D4AF37" />
            <h3 style={{ fontSize: '1.3rem' }}>Step 3: Invitation Message & Blessings</h3>
          </div>

          {/* Language Toggle & Presets */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 20,
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 10,
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFE494' }}>
              Choose Invitation Language:
            </span>

            <div style={{ display: 'flex', gap: 8 }}>
              {(['hindi', 'english', 'bilingual'] as LanguageOption[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    updateMessage('language', lang);
                    applyMessagePreset(lang);
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    border: '1px solid',
                    borderColor: project.message.language === lang ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)',
                    background: project.message.language === lang ? 'var(--grad-royal-maroon)' : 'transparent',
                    color: project.message.language === lang ? '#FFE494' : '#C4B5A5',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {lang === 'hindi' ? 'हिंदी (Hindi)' : lang === 'english' ? 'English' : 'Hindi + English'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Auspicious Heading / Shloka</label>
              <input
                type="text"
                value={project.message.shlokaHeading}
                onChange={(e) => updateMessage('shlokaHeading', e.target.value)}
                className="form-input font-hindi"
                placeholder="e.g. ॥ श्री गणेशाय नमः ॥"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Heartfelt Invitation Letter (Body Text)</label>
              <textarea
                rows={5}
                value={project.message.bodyText}
                onChange={(e) => updateMessage('bodyText', e.target.value)}
                className="form-textarea font-hindi"
                placeholder="Enter customized invitation message..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Closing Salutation / Family Warm Welcome</label>
              <input
                type="text"
                value={project.message.closingSalutation}
                onChange={(e) => updateMessage('closingSalutation', e.target.value)}
                className="form-input font-hindi"
                placeholder="e.g. सादर आमंत्रित: समस्त परिवार"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Love Quote / Sanskrit Shloka</label>
              <input
                type="text"
                value={project.message.quote || ''}
                onChange={(e) => updateMessage('quote', e.target.value)}
                className="form-input"
                placeholder="e.g. Two souls with but a single thought, two hearts that beat as one."
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Photo Uploads */}
      {activeStep === 4 && (
        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Camera size={22} color="#D4AF37" />
            <h3 style={{ fontSize: '1.3rem' }}>Step 4: Couple Photo Uploads</h3>
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '0.88rem', marginBottom: 20 }}>
            Upload high-resolution photos for the bride, groom, and couple. Photos are stored safely on your device in IndexedDB. Use the zoom and pan controls to adjust position without distorting facial proportions.
          </p>

          <div className="grid-2">
            <PhotoUploader
              projectId={project.id}
              slotKey="couple"
              title="Couple Photo"
              hindiTitle="वर-वधू युगल तस्वीर"
              description="Primary photo used in romantic scene & finale"
              currentPhotoUrl={project.photos.couplePhoto}
              offsets={project.photos.offsets?.couple}
              onPhotoChanged={handlePhotoChanged}
              onOffsetsChanged={handleOffsetsChanged}
            />

            <PhotoUploader
              projectId={project.id}
              slotKey="bride"
              title="Bride's Photo"
              hindiTitle="दुल्हन की तस्वीर"
              description="Solo bridal portrait with traditional jewelry"
              currentPhotoUrl={project.photos.bridePhoto}
              offsets={project.photos.offsets?.bride}
              onPhotoChanged={handlePhotoChanged}
              onOffsetsChanged={handleOffsetsChanged}
            />

            <PhotoUploader
              projectId={project.id}
              slotKey="groom"
              title="Groom's Photo"
              hindiTitle="दूल्हे की तस्वीर"
              description="Solo groom portrait in royal sherwani"
              currentPhotoUrl={project.photos.groomPhoto}
              offsets={project.photos.offsets?.groom}
              onPhotoChanged={handlePhotoChanged}
              onOffsetsChanged={handleOffsetsChanged}
            />

            <PhotoUploader
              projectId={project.id}
              slotKey="family"
              title="Family Photo (Optional)"
              hindiTitle="परिवार की तस्वीर"
              description="Optional family group portrait"
              currentPhotoUrl={project.photos.familyPhoto}
              offsets={project.photos.offsets?.family}
              onPhotoChanged={handlePhotoChanged}
              onOffsetsChanged={handleOffsetsChanged}
            />
          </div>
        </div>
      )}

      {/* Stepper Navigation Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
      }}>
        <button
          disabled={activeStep === 1}
          onClick={() => setActiveStep((prev: number) => Math.max(1, prev - 1))}
          className="btn btn-outline-gold"
          style={{ visibility: activeStep === 1 ? 'hidden' : 'visible' }}
        >
          <ArrowLeft size={16} /> Previous Step
        </button>

        {activeStep < 4 ? (
          <button
            onClick={() => setActiveStep((prev: number) => Math.min(4, prev + 1))}
            className="btn btn-gold"
          >
            Next Step <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={onNavigateToPreview}
            className="btn btn-gold"
            style={{ padding: '12px 28px', fontSize: '1rem' }}
          >
            <Sparkles size={18} /> View Video Preview & Templates
          </button>
        )}
      </div>
    </div>
  );
};
