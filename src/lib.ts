import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './theme';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Snappy spring used across the video. */
export const pop = (frame: number, delay = 0, cfg: Partial<{damping: number; stiffness: number; mass: number}> = {}) =>
  spring({frame: frame - delay, fps: FPS, config: {damping: 13, stiffness: 190, mass: 0.75, ...cfg}});

/** Smooth spring without overshoot. */
export const glide = (frame: number, delay = 0, durationInFrames?: number) =>
  spring({frame: frame - delay, fps: FPS, config: {damping: 200}, durationInFrames});

const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const inCubic = Easing.bezier(0.55, 0, 1, 0.45);

export const ease = (frame: number, range: [number, number], out: [number, number] = [0, 1], kind: 'out' | 'inOut' | 'in' = 'out') =>
  interpolate(frame, range, out, {...clamp, easing: kind === 'out' ? outExpo : kind === 'in' ? inCubic : inOut});

/** Deterministic pseudo-random in [0,1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
