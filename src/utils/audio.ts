// 8-bit Chiptune & Traditional Malay Pentatonic Audio Engine (Zero external dependencies, 100% offline capable)

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private musicTimer: number | null = null;
  private isMusicPlaying = false;
  private musicEnabled = true;
  private sfxEnabled = true;
  private noteIndex = 0;

  // Traditional Malay / Nusantara pentatonic-inspired joyful 8-bit adventure melody (C D E G A C5)
  private melody: Array<{ freq: number; dur: number }> = [
    { freq: 392.0, dur: 0.25 }, // G4
    { freq: 440.0, dur: 0.25 }, // A4
    { freq: 523.25, dur: 0.35 }, // C5
    { freq: 587.33, dur: 0.25 }, // D5
    { freq: 659.25, dur: 0.45 }, // E5
    { freq: 587.33, dur: 0.25 }, // D5
    { freq: 523.25, dur: 0.35 }, // C5
    { freq: 440.0, dur: 0.25 }, // A4
    { freq: 392.0, dur: 0.45 }, // G4
    { freq: 440.0, dur: 0.25 }, // A4
    { freq: 523.25, dur: 0.25 }, // C5
    { freq: 440.0, dur: 0.25 }, // A4
    { freq: 392.0, dur: 0.35 }, // G4
    { freq: 329.63, dur: 0.35 }, // E4
    { freq: 293.66, dur: 0.25 }, // D4
    { freq: 261.63, dur: 0.55 }, // C4
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSettings(music: boolean, sfx: boolean) {
    this.musicEnabled = music;
    this.sfxEnabled = sfx;
    if (!music) {
      this.stopMusic();
    } else if (!this.isMusicPlaying) {
      this.startMusic();
    }
  }

  public unlockAndStartMusic(musicEnabled: boolean) {
    this.musicEnabled = musicEnabled;
    this.ensureContext();
    if (musicEnabled && !this.isMusicPlaying) {
      this.startMusic();
    }
  }

  public startMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.isMusicPlaying = true;
    this.scheduleNextNote();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer !== null) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  private scheduleNextNote() {
    if (!this.isMusicPlaying || !this.musicEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const item = this.melody[this.noteIndex % this.melody.length];
    this.noteIndex++;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.032, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.dur * 0.92);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + item.dur);
    } catch {
      // Ignore audio scheduling errors before user gesture
    }

    this.musicTimer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, item.dur * 1000);
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.07, delay = 0) {
    if (!this.sfxEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  public playClick() {
    this.playTone(620, 0.05, 'square', 0.035);
  }

  public playCoin() {
    this.playTone(987.77, 0.08, 'square', 0.06, 0); // B5
    this.playTone(1318.51, 0.22, 'square', 0.06, 0.07); // E6
  }

  public playCorrect() {
    this.playTone(523.25, 0.09, 'square', 0.055, 0);
    this.playTone(659.25, 0.09, 'square', 0.055, 0.08);
    this.playTone(783.99, 0.18, 'square', 0.06, 0.16);
  }

  public playWrong() {
    this.playTone(260, 0.12, 'triangle', 0.08, 0);
    this.playTone(196, 0.22, 'triangle', 0.07, 0.11);
  }

  public playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, idx === notes.length - 1 ? 0.35 : 0.12, 'square', 0.065, idx * 0.11);
    });
  }
}

export const retroAudio = new RetroAudioEngine();
