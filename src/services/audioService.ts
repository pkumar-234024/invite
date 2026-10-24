/**
 * Audio Service using Web Audio API
 * Generates beautiful, authentic royalty-free traditional Indian wedding instrumental soundscapes
 * (Shehnai, Sitar, Tanpura harmonics, Temple bells) fully client-side without external dependencies.
 * Also supports custom uploaded audio files.
 */

export interface AudioTrack {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  tempo: number;
}

export const WEDDING_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'mangal-shehnai',
    title: 'Mangal Shehnai & Tanpura',
    hindiTitle: 'मंगल शहनाई एवं तानपुरा',
    description: 'Auspicious traditional wedding Shehnai melody with sacred Tanpura resonance.',
    tempo: 72,
  },
  {
    id: 'rajasthani-sitar',
    title: 'Royal Rajasthani Sitar Raga',
    hindiTitle: 'शाही सितार राग',
    description: 'Majestic palace chords with resonant sitar meend and meditative golden bells.',
    tempo: 84,
  },
  {
    id: 'jashn-shaadi',
    title: 'Jashn-e-Shaadi Festive Harmony',
    hindiTitle: 'जश्न-ए-शादी बांसुरी एवं घुंघरू',
    description: 'Celebratory sweet bansuri flute notes, temple ghunghroo chimes, and joy.',
    tempo: 96,
  },
];

class AudioService {
  private audioCtx: AudioContext | null = null;
  private previewSource: AudioBufferSourceNode | null = null;
  private previewGain: GainNode | null = null;
  private customAudioBuffer: AudioBuffer | null = null;
  private customAudioUrl: string | null = null;
  private isPlayingPreview: boolean = false;

  private getContext(): AudioContext {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Set custom uploaded audio (from file upload)
   */
  async setCustomAudio(file: File): Promise<string> {
    const ctx = this.getContext();
    const arrayBuffer = await file.arrayBuffer();
    this.customAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
    this.customAudioUrl = URL.createObjectURL(file);
    return file.name;
  }

  getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }

  /**
   * Generates a synthesized Indian wedding melody AudioBuffer of given duration
   */
  createIndianMelodyBuffer(ctx: BaseAudioContext, trackId: string, durationSeconds: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const numFrames = Math.ceil(sampleRate * durationSeconds);
    const audioBuffer = ctx.createBuffer(2, numFrames, sampleRate);
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.getChannelData(1);

    // Authentic Indian Raga Bilawal / Yaman notes (Hz)
    // Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa'
    const notesShehnai = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const notesSitar = [220.00, 246.94, 277.18, 329.63, 369.99, 440.00, 493.88, 554.37];
    const notesFlute = [329.63, 369.99, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];

    let activeNotes = notesShehnai;
    let noteDuration = 1.2;
    if (trackId === 'rajasthani-sitar') {
      activeNotes = notesSitar;
      noteDuration = 0.9;
    } else if (trackId === 'jashn-shaadi') {
      activeNotes = notesFlute;
      noteDuration = 0.75;
    }

    // Tanpura Drone frequencies (Sa + Pa + Sa_octave)
    const droneFreq1 = 130.81; // C3
    const droneFreq2 = 196.00; // G3
    const droneFreq3 = 261.63; // C4

    for (let i = 0; i < numFrames; i++) {
      const t = i / sampleRate;

      // 1. Tanpura Drone & rich harmonics
      const tanpura1 = Math.sin(2 * Math.PI * droneFreq1 * t) * 0.12;
      const tanpura2 = Math.sin(2 * Math.PI * droneFreq2 * t * 1.002) * 0.08;
      const tanpura3 = Math.sin(2 * Math.PI * droneFreq3 * t * 0.998) * 0.05;
      const tanpuraShimmer = Math.sin(2 * Math.PI * (droneFreq1 * 3) * t) * 0.03 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.4 * t));
      const drone = tanpura1 + tanpura2 + tanpura3 + tanpuraShimmer;

      // 2. Lead melody generator with traditional ornamentation & vibrato
      // Melody pattern progression: loop through poetic steps
      const melodicStep = (Math.floor(t / noteDuration) * 3 + (Math.floor(t / (noteDuration * 4)) % 2)) % activeNotes.length;
      const baseFreq = activeNotes[melodicStep];

      // Vibrato & meend (portamento slide)
      const notePhase = (t % noteDuration) / noteDuration;
      const vibrato = Math.sin(2 * Math.PI * 5.5 * t) * (notePhase > 0.3 ? 4.0 : 1.0);
      const meend = Math.sin(Math.PI * notePhase) * (notePhase < 0.2 ? -15 : 0);
      const leadFreq = baseFreq + vibrato + meend;

      // Envelope: gentle attack, sustained resonance, soft release
      let envelope = 0;
      if (notePhase < 0.15) {
        envelope = notePhase / 0.15;
      } else if (notePhase < 0.8) {
        envelope = 1.0 - (notePhase - 0.15) * 0.3;
      } else {
        envelope = Math.max(0, 0.8 - (notePhase - 0.8) * 4);
      }

      // Timbre synthesis based on instrument
      let lead = 0;
      if (trackId === 'mangal-shehnai') {
        // Shehnai (reed instrument with rich odd and even harmonics)
        const h1 = Math.sin(2 * Math.PI * leadFreq * t);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t) * 0.55;
        const h3 = Math.sin(2 * Math.PI * leadFreq * 3 * t) * 0.4;
        const h4 = Math.sin(2 * Math.PI * leadFreq * 4 * t) * 0.25;
        const h5 = Math.sin(2 * Math.PI * leadFreq * 5 * t) * 0.15;
        lead = (h1 + h2 + h3 + h4 + h5) * 0.18 * envelope;
      } else if (trackId === 'rajasthani-sitar') {
        // Sitar (jawari buzzing bridge harmonics)
        const sitarDecay = Math.exp(-notePhase * 3.5);
        const h1 = Math.sin(2 * Math.PI * leadFreq * t);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t) * 0.7;
        const h3 = Math.sin(2 * Math.PI * leadFreq * 4 * t) * 0.4;
        const buzz = (Math.random() - 0.5) * 0.05 * sitarDecay;
        lead = (h1 + h2 + h3 + buzz) * 0.22 * sitarDecay;
      } else {
        // Bansuri flute (warm fundamental + breath shimmer)
        const h1 = Math.sin(2 * Math.PI * leadFreq * t);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t) * 0.25;
        const breath = (Math.random() - 0.5) * 0.04;
        lead = (h1 + h2 + breath) * 0.24 * envelope;
      }

      // 3. Temple bells / Ghunghroo chimes on accent beats (every 2.4s)
      const bellBeat = (t % 2.4);
      let bell = 0;
      if (bellBeat < 0.8) {
        const bellEnv = Math.exp(-bellBeat * 4);
        bell = (Math.sin(2 * Math.PI * 1864 * t) + Math.sin(2 * Math.PI * 2795 * t) * 0.6) * 0.04 * bellEnv;
      }

      // Combine channels with stereo panning
      const panL = 0.5 + 0.2 * Math.sin(t * 0.5);
      const panR = 1.0 - panL;

      const mixed = (drone + lead + bell) * 0.85;

      left[i] = mixed * panL;
      right[i] = mixed * panR;
    }

    return audioBuffer;
  }

  /**
   * Start preview audio in browser
   */
  /**
   * Get total duration in seconds of current track
   */
  getTrackDuration(trackId: string): number {
    if (trackId === 'custom' && this.customAudioBuffer) {
      return this.customAudioBuffer.duration;
    }
    return 90; // Default preset duration
  }

  /**
   * Start preview audio in browser with trim offset and optional fade-in
   */
  async startPreview(
    trackId: string,
    volume: number = 0.8,
    startTime: number = 0,
    fadeIn: boolean = true
  ): Promise<void> {
    try {
      this.stopPreview();
      const ctx = this.getContext();

      let buffer: AudioBuffer;
      if (trackId === 'custom' && this.customAudioBuffer) {
        buffer = this.customAudioBuffer;
      } else {
        buffer = this.createIndianMelodyBuffer(ctx, trackId, 120);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const gain = ctx.createGain();
      const targetVol = Math.max(0.001, Math.min(1, volume));

      if (fadeIn) {
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 1.5);
      } else {
        gain.gain.setValueAtTime(targetVol, ctx.currentTime);
      }

      source.connect(gain);
      gain.connect(ctx.destination);

      const offset = Math.max(0, Math.min(startTime, Math.max(0, buffer.duration - 5)));
      source.start(ctx.currentTime, offset);

      this.previewSource = source;
      this.previewGain = gain;
      this.isPlayingPreview = true;
    } catch (e) {
      console.warn('Audio preview error:', e);
    }
  }

  /**
   * Adjust preview volume live
   */
  setPreviewVolume(volume: number): void {
    if (this.previewGain && this.audioCtx) {
      this.previewGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.audioCtx.currentTime);
    }
  }

  /**
   * Stop preview audio
   */
  stopPreview(): void {
    if (this.previewSource) {
      try {
        this.previewSource.stop();
        this.previewSource.disconnect();
      } catch {
        // ignore
      }
      this.previewSource = null;
    }
    this.isPlayingPreview = false;
  }

  getIsPlaying(): boolean {
    return this.isPlayingPreview;
  }


  /**
   * Get an audio stream node connected for MediaRecorder during video export
   * with trim offset, fade-in, and fade-out
   */
  createExportAudioTrack(
    trackId: string,
    volume: number,
    durationSeconds: number,
    startTime: number = 0,
    fadeIn: boolean = true,
    fadeOut: boolean = true
  ): { destination: MediaStreamAudioDestinationNode; stop: () => void; ctx: AudioContext } {
    const ctx = this.getContext();
    const destination = ctx.createMediaStreamDestination();

    let buffer: AudioBuffer;
    if (trackId === 'custom' && this.customAudioBuffer) {
      buffer = this.customAudioBuffer;
    } else {
      buffer = this.createIndianMelodyBuffer(ctx, trackId, startTime + durationSeconds + 5);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    const targetVol = Math.max(0.001, Math.min(1, volume));

    if (fadeIn) {
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 1.5);
    } else {
      gain.gain.setValueAtTime(targetVol, ctx.currentTime);
    }

    if (fadeOut && durationSeconds > 3) {
      gain.gain.setValueAtTime(targetVol, ctx.currentTime + durationSeconds - 2.5);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + durationSeconds);
    }

    source.connect(gain);
    gain.connect(destination);

    const offset = Math.max(0, Math.min(startTime, Math.max(0, buffer.duration - 2)));
    source.start(ctx.currentTime, offset, durationSeconds + 0.5);

    return {
      destination,
      ctx,
      stop: () => {
        try {
          source.stop();
          source.disconnect();
        } catch {
          // ignore
        }
      },
    };
  }
}

export const audioService = new AudioService();
