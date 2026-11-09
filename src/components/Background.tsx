import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SCENES} from '../theme';
import {ease} from '../lib';

/** Global green radial-gradient background with drifting glow blobs (parallax). */
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const [bestFrom, bestDur] = SCENES.best;
  // Lighter "flash" during "The best part?"
  const light = ease(f, [bestFrom - 2, bestFrom + 8]) * (1 - ease(f, [bestFrom + bestDur - 4, bestFrom + bestDur + 4]));
  const blob = (i: number, color: string, size: number, op: number) => {
    const x = width * (0.5 + 0.38 * Math.sin(f / (70 + i * 23) + i * 2.1));
    const y = height * (0.5 + 0.34 * Math.cos(f / (90 + i * 17) + i * 1.3));
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
          opacity: op,
        }}
      />
    );
  };
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse 80% 65% at 50% 46%, ${C.green} 0%, #253c39 45%, ${C.dark} 100%)`}}>
      {blob(0, '#4f8072', 1100, 0.55)}
      {blob(1, '#3d6b5e', 900, 0.5)}
      {blob(2, C.bronze, 700, 0.18)}
      {blob(3, '#5d917f', 600, 0.3)}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 60% at 50% 45%, #6f9c84 0%, #44705f 45%, #2b4a42 100%)`,
          opacity: light,
        }}
      />
      {/* vignette */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(8,14,13,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Very subtle film grain. */
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 50;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: 0.07, mixBlendMode: 'overlay'}}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
