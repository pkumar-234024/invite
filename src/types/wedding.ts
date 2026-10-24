export type LanguageOption = 'hindi' | 'english' | 'bilingual';

export interface Ceremony {
  id: string;
  key: string; // e.g. 'haldi', 'mehndi', 'sangeet', 'wedding', 'reception', 'engagement', 'tilak', 'roka', 'baraat', 'jaimala', 'vidaai'
  name: string;
  hindiName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "07:00 PM"
  venueName: string;
  venueAddress: string;
  description?: string;
}

export interface CoupleDetails {
  brideName: string;
  brideHindiName?: string;
  groomName: string;
  groomHindiName?: string;
  brideNickname?: string;
  groomNickname?: string;
  brideFamily: string;
  groomFamily: string;
  brideParents: string;
  groomParents: string;
}

export interface InvitationMessage {
  language: LanguageOption;
  shlokaHeading: string; // e.g. "|| श्री गणेशाय नमः ||" or "ॐ श्री गणेशाय नमः"
  bodyText: string;
  closingSalutation: string; // e.g. "सादर आमंत्रित: समस्त परिवार"
  quote?: string;
}

export type PhotoFilter = 'none' | 'royal-gold' | 'festive-vibrant' | 'vintage-sepia' | 'romantic-soft';

export type PhotoFrameShape = 'default' | 'royal-arch' | 'oval-kundan' | 'heritage-square' | 'floral-wreath' | 'modern-card';

export interface PhotoOffsets {
  zoom: number; // 1 to 2.5
  offsetX: number; // -50 to 50 percentage
  offsetY: number; // -50 to 50 percentage
  rotation?: number; // 0, 90, 180, 270
  filter?: PhotoFilter;
  frameShape?: PhotoFrameShape;
}

export interface ProjectPhotos {
  bridePhoto?: string; // Data URL or object URL
  groomPhoto?: string;
  couplePhoto?: string;
  familyPhoto?: string;
  additionalPhotos?: string[];
  offsets?: {
    bride?: PhotoOffsets;
    groom?: PhotoOffsets;
    couple?: PhotoOffsets;
    family?: PhotoOffsets;
  };
}

export type TransitionType =
  | 'auto'
  | 'gold-stardust'
  | 'light-leak'
  | 'royal-curtain'
  | 'mandala-bloom'
  | 'zoom-push';

export type TemplateId =
  | 'sampoorna-kashi'
  | 'divine-temple'
  | 'sampoorna-hindi'
  | 'sampoorna-sarvajan'
  | 'royal-cream-palace'
  | 'royal-maharaja'
  | 'shubh-vivah'
  | 'royal-rajasthani'
  | 'floral-dreams'
  | 'modern-love'
  | 'golden-celebration'
  | 'traditional-indian'
  | 'cinematic-wedding'
  | 'floral-mandap'
  | 'classic-indian';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  colorTheme: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  category: 'Royal' | 'Traditional' | 'Romantic' | 'Modern' | 'Cinematic';
  previewBadge: string;
  features: string[];
}

export interface AudioSettings {
  enabled: boolean;
  trackId: string; // 'royal-sitar' | 'mangal-shehnai' | 'rajasthani-sitar' | 'jashn-shaadi' | 'custom'
  volume: number; // 0 to 1
  customTrackName?: string;
  customAudioBlobKey?: string;
  startTime: number; // in seconds (trim start)
  endTime?: number; // in seconds
  fadeIn: boolean;
  fadeOut: boolean;
}

export interface VideoExportSettings {
  resolution: '1080p' | '720p';
  width: number;
  height: number;
  fps: number;
  durationSeconds: number;
  format: 'mp4' | 'webm';
  transition: TransitionType;
}

export interface WeddingProject {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  couple: CoupleDetails;
  ceremonies: Ceremony[];
  message: InvitationMessage;
  photos: ProjectPhotos;
  templateId: TemplateId;
  audio: AudioSettings;
  videoSettings: VideoExportSettings;
}

export interface ProjectSummary {
  id: string;
  name: string;
  coupleTitle: string;
  templateId: TemplateId;
  updatedAt: number;
  ceremoniesCount: number;
  hasCouplePhoto: boolean;
}
