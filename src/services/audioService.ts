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
  url?: string;
}

export const WEDDING_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'wedding-shubh-vivah',
    title: 'Shubh Vivah Royal Sitar & Shehnai (Signature)',
    hindiTitle: 'शुभ विवाह शाही संगीत (मुख्य)',
    description: 'Breathtaking authentic studio acoustic wedding score with resonant sitar, flute, and emotional strings.',
    tempo: 78,
    url: '/audio/andriig-wedding-wedding-music-604061.mp3',
  },
  {
    id: 'wedding-celebration',
    title: 'Divine Indian Wedding Symphony',
    hindiTitle: 'दिव्य विवाह उत्सव संगीत',
    description: 'Grand celebratory Indian wedding anthem with joyful rhythm, traditional bells, and melodic grandeur.',
    tempo: 84,
    url: '/audio/andriih-wedding-wedding-music-601619.mp3',
  },
  {
    id: 'wedding-sacred-harmony',
    title: 'Sacred Romance & Vivah Melodies',
    hindiTitle: 'मांगलिक प्रेम एवं फेरे संगीत',
    description: 'Heartfelt emotional acoustic strings and gentle traditional rhythm for auspicious ceremonies.',
    tempo: 74,
    url: '/audio/paulyudin-wedding-wedding-music-574002.mp3',
  },
  {
    id: 'royal-sitar',
    title: 'Divine Royal Sitar Raga (Procedural)',
    hindiTitle: 'शाही सितार राग (यमन व भूपाली)',
    description: 'Classical royal wedding Sitar with authentic Jawari harmonics and sacred Tanpura resonance.',
    tempo: 80,
  },
  {
    id: 'mangal-shehnai',
    title: 'Mangal Shehnai & Tanpura',
    hindiTitle: 'मंगल शहनाई एवं तानपुरा',
    description: 'Auspicious traditional wedding Shehnai melody with sacred Tanpura resonance.',
    tempo: 72,
  },
  {
    id: 'jashn-shaadi',
    title: 'Jashn-e-Shaadi Festive Bansuri',
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
  private audioBufferCache: Map<string, AudioBuffer> = new Map();

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
   * Generates a synthesized Indian wedding melody AudioBuffer of given duration.
   * Includes high-fidelity physical modeling of Royal Wedding Sitar (Jawari harmonics,
   * Meend glissando bends, sympathetic Taraf resonance, Chikari rhythm, and 4-string Tanpura).
   */
  createIndianMelodyBuffer(ctx: BaseAudioContext, trackId: string, durationSeconds: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const numFrames = Math.ceil(sampleRate * durationSeconds);
    const audioBuffer = ctx.createBuffer(2, numFrames, sampleRate);
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.getChannelData(1);

    // Normalize trackId: default to royal-sitar if unspecified or rajasthani-sitar
    const isSitar = trackId === 'royal-sitar' || trackId === 'rajasthani-sitar' || !trackId;
    const isShehnai = trackId === 'mangal-shehnai';

    // Raga Yaman & Bhupali Authentic Wedding Composition Gat (Notes with durations & Meend glissando)
    // Sitar Notes: Ni0=246.94, Sa1=261.63, Re1=293.66, Ga1=329.63, Ma1=369.99, Pa1=392.00, Dha1=440.00, Ni1=493.88, Sa2=523.25, Re2=587.33, Ga2=659.25
    interface NoteEvent {
      startFreq: number;
      endFreq: number;
      duration: number; // in seconds
      hasChikari?: boolean;
    }

    const SITAR_COMPOSITION: NoteEvent[] = [
      // 1. Serene Morning Alap (Ni - Re - Ga meend)
      { startFreq: 246.94, endFreq: 293.66, duration: 1.5 },
      { startFreq: 293.66, endFreq: 329.63, duration: 1.8, hasChikari: true },
      { startFreq: 329.63, endFreq: 369.99, duration: 1.2 },
      { startFreq: 369.99, endFreq: 392.00, duration: 2.0, hasChikari: true },
      
      // 2. Majestic Ascent to Taar Sa (Pa - Dha - Ni - Sa')
      { startFreq: 392.00, endFreq: 440.00, duration: 1.4 },
      { startFreq: 440.00, endFreq: 493.88, duration: 1.2 },
      { startFreq: 493.88, endFreq: 523.25, duration: 2.2, hasChikari: true },
      
      // 3. Graceful Meend Descent (Sa' - Ni - Dha - Pa)
      { startFreq: 523.25, endFreq: 493.88, duration: 1.3 },
      { startFreq: 493.88, endFreq: 440.00, duration: 1.2 },
      { startFreq: 440.00, endFreq: 392.00, duration: 1.6 },
      { startFreq: 392.00, endFreq: 329.63, duration: 2.0, hasChikari: true }, // Long emotional meend from Pa down to Ga!
      
      // 4. Romantic Yaman Turn (Ga - Ma' - Ga - Re - Sa)
      { startFreq: 329.63, endFreq: 369.99, duration: 1.0 },
      { startFreq: 369.99, endFreq: 329.63, duration: 1.1 },
      { startFreq: 329.63, endFreq: 293.66, duration: 1.3 },
      { startFreq: 293.66, endFreq: 261.63, duration: 2.4, hasChikari: true }, // Peaceful resolution on Sa
      
      // 5. Joyous Bhupali Wedding Gat (Celebratory Royal Palace Melody)
      { startFreq: 261.63, endFreq: 293.66, duration: 0.9 },
      { startFreq: 293.66, endFreq: 329.63, duration: 0.9 },
      { startFreq: 329.63, endFreq: 392.00, duration: 1.0, hasChikari: true },
      { startFreq: 392.00, endFreq: 440.00, duration: 0.9 },
      { startFreq: 440.00, endFreq: 523.25, duration: 1.4, hasChikari: true },
      { startFreq: 523.25, endFreq: 587.33, duration: 1.0 },
      { startFreq: 587.33, endFreq: 659.25, duration: 1.6, hasChikari: true }, // Peak high Ga' celebration
      
      // 6. Sparkling Jhala Cascade
      { startFreq: 659.25, endFreq: 587.33, duration: 0.8 },
      { startFreq: 587.33, endFreq: 523.25, duration: 0.9 },
      { startFreq: 523.25, endFreq: 440.00, duration: 1.0 },
      { startFreq: 440.00, endFreq: 392.00, duration: 1.1 },
      { startFreq: 392.00, endFreq: 329.63, duration: 1.2 },
      { startFreq: 329.63, endFreq: 293.66, duration: 1.2 },
      { startFreq: 293.66, endFreq: 261.63, duration: 1.5, hasChikari: true },
      
      // 7. Auspicious Mandra Alap & Grand Cadence
      { startFreq: 261.63, endFreq: 246.94, duration: 1.0 },
      { startFreq: 246.94, endFreq: 220.00, duration: 1.1 },
      { startFreq: 220.00, endFreq: 196.00, duration: 1.3 },
      { startFreq: 196.00, endFreq: 246.94, duration: 1.2 },
      { startFreq: 246.94, endFreq: 261.63, duration: 3.5, hasChikari: true }, // Grand final ringing Sa
    ];

    const sitarTotalCycleDuration = SITAR_COMPOSITION.reduce((acc, n) => acc + n.duration, 0);

    // Fallback notes for Shehnai / Bansuri
    const notesShehnai = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    const notesFlute = [329.63, 369.99, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];

    for (let i = 0; i < numFrames; i++) {
      const t = i / sampleRate;

      // 1. Classical 4-String Acoustic Tanpura (G2, C3, C3 chorus, C2 Kharaj)
      // Plucked in traditional order: 1 (Pa) -> 2 (Sa) -> 3 (Sa) -> 4 (Kharaj)
      const tanpuraCycle = t % 4.8;
      const tanpuraPluckIdx = Math.floor(tanpuraCycle / 1.2);
      const tanpuraStringT = tanpuraCycle % 1.2;
      const tanpuraDecay = Math.exp(-tanpuraStringT * 1.8);

      let tanpuraFreq = 130.81; // Sa
      if (tanpuraPluckIdx === 0) tanpuraFreq = 98.00; // Pa (G2)
      else if (tanpuraPluckIdx === 1) tanpuraFreq = 130.81; // Sa (C3)
      else if (tanpuraPluckIdx === 2) tanpuraFreq = 131.25; // Sa with micro acoustic beat (C3)
      else tanpuraFreq = 65.41; // Kharaj Sa (C2)

      const tanpH1 = Math.sin(2 * Math.PI * tanpuraFreq * t);
      const tanpH2 = Math.sin(2 * Math.PI * tanpuraFreq * 2 * t) * 0.55;
      const tanpH3 = Math.sin(2 * Math.PI * tanpuraFreq * 3 * t) * 0.35;
      const tanpH4 = Math.sin(2 * Math.PI * tanpuraFreq * 4 * t) * 0.18;
      const tanpuraTone = (tanpH1 + tanpH2 + tanpH3 + tanpH4) * tanpuraDecay * 0.09;

      // Ambient warm background drone bed
      const ambientDrone = (
        Math.sin(2 * Math.PI * 130.81 * t) * 0.05 +
        Math.sin(2 * Math.PI * 196.00 * t) * 0.04 +
        Math.sin(2 * Math.PI * 65.41 * t) * 0.03
      );

      const drone = tanpuraTone + ambientDrone;

      // 2. Sitar Lead Synthesis
      let lead = 0;

      if (isSitar) {
        // Find current note in Sitar Composition
        const cycleT = t % sitarTotalCycleDuration;
        let cumulativeT = 0;
        let currentNote = SITAR_COMPOSITION[0];
        let noteOffsetT = 0;

        for (const note of SITAR_COMPOSITION) {
          if (cycleT >= cumulativeT && cycleT < cumulativeT + note.duration) {
            currentNote = note;
            noteOffsetT = cycleT - cumulativeT;
            break;
          }
          cumulativeT += note.duration;
        }

        const noteProgress = noteOffsetT / currentNote.duration;
        // Smooth Meend (pitch bend glide using S-curve cosine interpolation)
        const glide = 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, noteProgress * 1.5));
        const baseFreq = currentNote.startFreq + (currentNote.endFreq - currentNote.startFreq) * glide;

        // Vibrato on sustained portion
        const vibrato = noteProgress > 0.3 ? Math.sin(2 * Math.PI * 5.2 * t) * (baseFreq * 0.0075) : 0;
        const leadFreq = baseFreq + vibrato;

        // Natural plucked string envelope
        const stringDecay = Math.exp(-noteProgress * 2.8);
        const attack = Math.min(1, noteOffsetT * 250);

        // Mizrab metallic pluck transient (< 25 ms)
        const pluck = noteOffsetT < 0.035
          ? Math.sin(2 * Math.PI * (leadFreq * 6.8) * t) * Math.exp(-noteOffsetT * 80) * 0.35
          : 0;

        // Authentic Jawari non-linear bridge resonance (Phase Modulation)
        const jawariFactor = 0.40 * Math.exp(-noteProgress * 2.2);
        const mod = jawariFactor * Math.sin(2 * Math.PI * leadFreq * t);

        const h1 = Math.sin(2 * Math.PI * leadFreq * t + mod);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t + mod * 0.7) * 0.65;
        const h3 = Math.sin(2 * Math.PI * leadFreq * 3 * t + mod * 0.45) * 0.42;
        const h4 = Math.sin(2 * Math.PI * leadFreq * 4 * t) * 0.25;
        const h5 = Math.sin(2 * Math.PI * leadFreq * 5 * t) * 0.14;
        const h6 = Math.sin(2 * Math.PI * leadFreq * 6 * t) * 0.08;

        const sitarString = (h1 + h2 + h3 + h4 + h5 + h6 + pluck) * stringDecay * attack * 0.26;

        // Taraf (Sympathetic resonance strings ringing in sympathy)
        const taraf1 = Math.sin(2 * Math.PI * 261.63 * t) * 0.035;
        const taraf2 = Math.sin(2 * Math.PI * 392.00 * t) * 0.030;
        const taraf3 = Math.sin(2 * Math.PI * 329.63 * t) * 0.025;
        const taraf4 = Math.sin(2 * Math.PI * 523.25 * t) * 0.020;
        const tarafChorus = (taraf1 + taraf2 + taraf3 + taraf4) * (0.6 + 0.4 * Math.sin(2 * Math.PI * 0.25 * t));

        // Chikari Rhythmic Strum on accents
        let chikari = 0;
        if (currentNote.hasChikari && noteOffsetT < 0.4) {
          const cEnv = Math.exp(-noteOffsetT * 12);
          chikari = (Math.sin(2 * Math.PI * 523.25 * t) * 0.6 + Math.sin(2 * Math.PI * 784.00 * t) * 0.35) * cEnv * 0.16;
        }

        lead = sitarString + tarafChorus + chikari;
      } else if (isShehnai) {
        // Shehnai
        const noteDuration = 1.2;
        const melodicStep = (Math.floor(t / noteDuration) * 3) % notesShehnai.length;
        const leadFreq = notesShehnai[melodicStep];
        const notePhase = (t % noteDuration) / noteDuration;
        const env = notePhase < 0.15 ? notePhase / 0.15 : Math.max(0, 1 - (notePhase - 0.15) * 0.7);
        const h1 = Math.sin(2 * Math.PI * leadFreq * t);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t) * 0.55;
        const h3 = Math.sin(2 * Math.PI * leadFreq * 3 * t) * 0.4;
        lead = (h1 + h2 + h3) * 0.20 * env;
      } else {
        // Bansuri flute
        const noteDuration = 0.8;
        const melodicStep = Math.floor(t / noteDuration) % notesFlute.length;
        const leadFreq = notesFlute[melodicStep];
        const notePhase = (t % noteDuration) / noteDuration;
        const env = notePhase < 0.1 ? notePhase / 0.1 : Math.max(0, 1 - (notePhase - 0.1) * 0.6);
        const h1 = Math.sin(2 * Math.PI * leadFreq * t);
        const h2 = Math.sin(2 * Math.PI * leadFreq * 2 * t) * 0.25;
        lead = (h1 + h2) * 0.22 * env;
      }

      // 3. Auspicious Temple Bells / Manjira Chimes (every 4.8s cycle)
      const bellBeat = t % 4.8;
      let bell = 0;
      if (bellBeat < 1.0) {
        const bellEnv = Math.exp(-bellBeat * 3.8);
        bell = (Math.sin(2 * Math.PI * 1864 * t) + Math.sin(2 * Math.PI * 2795 * t) * 0.6) * 0.04 * bellEnv;
      }

      // 4. Stereo Panning & Natural Room Spatialization
      const panL = 0.52 + 0.18 * Math.sin(t * 0.4);
      const panR = 1.0 - panL;

      const mixed = (drone + lead + bell) * 0.88;

      left[i] = mixed * panL;
      right[i] = mixed * panR;
    }

    return audioBuffer;
  }

  /**
   * Start preview audio in browser
   */
  /**
   * Loads an AudioBuffer from cache, public URL or synthesized procedural Indian melody
   */
  async getTrackBuffer(ctx: BaseAudioContext, trackId: string, durationSeconds: number = 90): Promise<AudioBuffer> {
    if (trackId === 'custom' && this.customAudioBuffer) {
      return this.customAudioBuffer;
    }

    // Default to 'wedding-shubh-vivah' if trackId is empty or not found
    const targetId = trackId || 'wedding-shubh-vivah';
    const track = WEDDING_AUDIO_TRACKS.find((t) => t.id === targetId) || WEDDING_AUDIO_TRACKS[0];

    if (track?.url) {
      if (this.audioBufferCache.has(track.url)) {
        return this.audioBufferCache.get(track.url)!;
      }
      try {
        const resp = await fetch(track.url);
        if (resp.ok) {
          const ab = await resp.arrayBuffer();
          const audioCtx = this.getContext();
          const decoded = await audioCtx.decodeAudioData(ab);
          this.audioBufferCache.set(track.url, decoded);
          return decoded;
        }
      } catch (err) {
        console.warn(`Could not load audio file ${track.url}, falling back to synthesized sitar:`, err);
      }
    }

    return this.createIndianMelodyBuffer(ctx, targetId, durationSeconds);
  }

  /**
   * Get total duration in seconds of current track
   */
  getTrackDuration(trackId: string): number {
    if (trackId === 'custom' && this.customAudioBuffer) {
      return this.customAudioBuffer.duration;
    }
    const targetId = trackId || 'wedding-shubh-vivah';
    const track = WEDDING_AUDIO_TRACKS.find((t) => t.id === targetId) || WEDDING_AUDIO_TRACKS[0];
    if (track?.url && this.audioBufferCache.has(track.url)) {
      return this.audioBufferCache.get(track.url)!.duration;
    }
    return 140; // Default duration
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
      const buffer = await this.getTrackBuffer(ctx, trackId, 120);

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
  async createExportAudioTrack(
    trackId: string,
    volume: number,
    durationSeconds: number,
    startTime: number = 0,
    fadeIn: boolean = true,
    fadeOut: boolean = true
  ): Promise<{ destination: MediaStreamAudioDestinationNode; stop: () => void; ctx: AudioContext }> {
    const ctx = this.getContext();
    const destination = ctx.createMediaStreamDestination();
    const buffer = await this.getTrackBuffer(ctx, trackId, startTime + durationSeconds + 5);

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
