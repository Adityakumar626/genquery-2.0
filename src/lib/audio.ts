'use client';

// A simple utility to play UI sounds using the Web Audio API
// This avoids needing external mp3 files and base64 strings.

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playSendSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Soft, mechanical tick (square wave with ultra-fast pitch drop)
  osc.type = 'square';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.015);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.015);
}

export function playReceiveSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  // Two oscillators for a pleasant, crisp two-tone chime (e.g. perfect fifth or major third)
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  // Crisp sine chime
  osc1.type = 'sine';
  osc2.type = 'sine';
  
  // High pitched, bright chime
  osc1.frequency.setValueAtTime(880, ctx.currentTime);  // A5
  osc2.frequency.setValueAtTime(1108.73, ctx.currentTime); // C#6 (Major third)

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc1.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.3);
  osc2.stop(ctx.currentTime + 0.3);
}
