import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-afinador',
  templateUrl: './afinador.page.html',
  styleUrls: ['./afinador.page.scss'],
})
export class AfinadorPage {
  audioContext: AudioContext | null = null;
  analyser: AnalyserNode | null = null;
  frequency: number = 0;
  detectedNote: string = '';
  message: string = '';
  tuning: boolean = false;

  // Notas con sus respectivas frecuencias en Hz
  private notes = [
    { note: 'C', frequency: 261.63 },
    { note: 'C#', frequency: 277.18 },
    { note: 'D', frequency: 293.66 },
    { note: 'D#', frequency: 311.13 },
    { note: 'E', frequency: 329.63 },
    { note: 'F', frequency: 349.23 },
    { note: 'F#', frequency: 369.99 },
    { note: 'G', frequency: 392.00 },
    { note: 'G#', frequency: 415.30 },
    { note: 'A', frequency: 440.00 },
    { note: 'A#', frequency: 466.16 },
    { note: 'B', frequency: 493.88 },
  ];

  async checkMicrophonePermissions(): Promise<boolean> {
    if (Capacitor.getPlatform() === 'web') {
      try {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        return result.state === 'granted';
      } catch (error) {
        console.error('Error checking web permissions:', error);
        return false;
      }
    } else {
      return true;
    }
  }

  async startTuning() {
    try {
      const hasPermission = await this.checkMicrophonePermissions();
      if (!hasPermission) {
        this.message = 'Se requieren permisos de micrófono para usar el afinador';
        return;
      }

      const platformInfo = await Device.getInfo();
      if (platformInfo.platform === 'android') {
        this.message = 'Solicitando acceso al micrófono...';
      }

      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      source.connect(this.analyser);

      this.analyser.fftSize = 2048;
      const dataArray = new Float32Array(this.analyser.fftSize);

      const detectPitch = () => {
        if (this.tuning && this.analyser) {
          this.analyser.getFloatTimeDomainData(dataArray);
          const pitch = this.autoCorrelate(dataArray, this.audioContext!.sampleRate);
          if (pitch !== -1) {
            this.frequency = Math.round(pitch * 100) / 100;
            this.detectedNote = this.getNearestNote(pitch);
            this.message = `Nota detectada: ${this.detectedNote} (${this.frequency} Hz)`;
          } else {
            this.detectedNote = '';
            this.message = 'No se detecta ninguna nota';
          }
          requestAnimationFrame(detectPitch);
        }
      };

      this.tuning = true;
      detectPitch();
    } catch (err: any) {
      console.error('Error al acceder al micrófono:', err);
      this.message = `Error al acceder al micrófono: ${err.message}`;
    }
  }

  stopTuning() {
    this.tuning = false;
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.frequency = 0;
    this.detectedNote = '';
    this.message = 'Afinador detenido';
  }

  autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0,
      r2 = SIZE - 1,
      thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < thres) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1,
      maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    return sampleRate / T0;
  }

  getNearestNote(frequency: number): string {
    let minDiff = Infinity;
    let closestNote = '';

    for (const { note, frequency: noteFrequency } of this.notes) {
      const diff = Math.abs(noteFrequency - frequency);
      if (diff < minDiff) {
        minDiff = diff;
        closestNote = note;
      }
    }

    return closestNote;
  }
}