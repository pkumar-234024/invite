/**
 * Browser Capabilities Service
 * Honest inspection of MediaRecorder supported MIME types, Web Audio API, Canvas rendering, and storage.
 */

export interface CodecInfo {
  mimeType: string;
  extension: 'mp4' | 'webm';
  label: string;
  isMp4: boolean;
  supported: boolean;
}

export interface SystemCapabilities {
  supportsMediaRecorder: boolean;
  supportsWebAudio: boolean;
  supportsIndexedDB: boolean;
  preferredMimeType: string;
  preferredExtension: 'mp4' | 'webm';
  availableCodecs: CodecInfo[];
  hardwareNote?: string;
  supports1080p: boolean;
}

const CANDIDATE_MIME_TYPES: { mimeType: string; extension: 'mp4' | 'webm'; label: string; isMp4: boolean }[] = [
  // MP4 Candidates (Native H.264 video with AAC/Opus audio)
  { mimeType: 'video/mp4;codecs=avc1,mp4a.40.2', extension: 'mp4', label: 'H.264 / AAC (MP4 High Profile)', isMp4: true },
  { mimeType: 'video/mp4;codecs=avc1', extension: 'mp4', label: 'H.264 (MP4 Standard)', isMp4: true },
  { mimeType: 'video/mp4', extension: 'mp4', label: 'MP4 (Standard Video Container)', isMp4: true },
  { mimeType: 'video/mp4;codecs=avc1.42E01E,mp4a.40.2', extension: 'mp4', label: 'H.264 / AAC (MP4 Baseline)', isMp4: true },
  
  // WebM Candidates (High quality VP9 / VP8 with Opus)
  { mimeType: 'video/webm;codecs=vp9,opus', extension: 'webm', label: 'VP9 / Opus (WebM Modern)', isMp4: false },
  { mimeType: 'video/webm;codecs=vp8,opus', extension: 'webm', label: 'VP8 / Opus (WebM Standard)', isMp4: false },
  { mimeType: 'video/webm;codecs=h264', extension: 'webm', label: 'H.264 in WebM', isMp4: false },
  { mimeType: 'video/webm', extension: 'webm', label: 'WebM Standard Container', isMp4: false },
];

export function getBrowserCapabilities(): SystemCapabilities {
  if (typeof window === 'undefined') {
    return {
      supportsMediaRecorder: false,
      supportsWebAudio: false,
      supportsIndexedDB: false,
      preferredMimeType: 'video/webm',
      preferredExtension: 'webm',
      availableCodecs: [],
      supports1080p: true,
    };
  }

  const hasMediaRecorder = typeof window.MediaRecorder !== 'undefined';
  const hasWebAudio = typeof window.AudioContext !== 'undefined' || typeof (window as unknown as { webkitAudioContext: unknown }).webkitAudioContext !== 'undefined';
  const hasIDB = typeof window.indexedDB !== 'undefined';

  const availableCodecs: CodecInfo[] = CANDIDATE_MIME_TYPES.map((cand) => {
    const supported = hasMediaRecorder && typeof MediaRecorder.isTypeSupported === 'function' ? MediaRecorder.isTypeSupported(cand.mimeType) : false;
    return {
      ...cand,
      supported,
    };
  });

  // Pick first supported MP4, or if none, first supported WebM
  const supportedMp4 = availableCodecs.find((c) => c.supported && c.isMp4);
  const supportedWebM = availableCodecs.find((c) => c.supported && !c.isMp4);

  const bestCodec = supportedMp4 || supportedWebM || {
    mimeType: 'video/webm',
    extension: 'webm' as const,
    label: 'Default WebM',
    isMp4: false,
    supported: hasMediaRecorder,
  };

  let hardwareNote: string | undefined;
  if (!supportedMp4) {
    hardwareNote = 'Your current browser does not offer direct in-browser H.264 MP4 hardware encoding via MediaRecorder. Video will be exported in high-definition WebM (VP9/VP8 with Opus audio), which plays smoothly in all modern browsers, VLC, WhatsApp Web, and media editors.';
  }

  return {
    supportsMediaRecorder: hasMediaRecorder,
    supportsWebAudio: hasWebAudio,
    supportsIndexedDB: hasIDB,
    preferredMimeType: bestCodec.mimeType,
    preferredExtension: bestCodec.extension,
    availableCodecs,
    hardwareNote,
    supports1080p: true,
  };
}
