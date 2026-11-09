import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {C} from '../theme';
import {clamp, pop, rand} from '../lib';

const PHOTOS = [
  {src: 'assets/jellyfish_red_green.jpg', glow: ['#ff3b3b', '#2fe06a']},
  {src: 'assets/jellyfish_blue_orange.jpg', glow: ['#2f7bff', '#ff8a1f']},
  {src: 'assets/jellyfish_purple_roofline.jpg', glow: ['#a24bff', '#e08bff']},
];
const SWITCH = [0, 30, 52];

const Sparkle: React.FC<{x: number; y: number; d: number; s: number}> = ({x, y, d, s}) => {
  const f = useCurrentFrame();
  const t = ((f - d) % 30) / 30;
  if (f < d) return null;
  const k = Math.sin(t * Math.PI);
  return (
    <At x={x} y={y} z={30}>
      <svg width={s} height={s} viewBox="-10 -10 20 20" style={{transform: `scale(${k}) rotate(${t * 90}deg)`, opacity: k}}>
        <path d="M0-10 Q1-1 10 0 Q1 1 0 10 Q-1 1-10 0 Q-1-1 0-10z" fill={C.cream} />
      </svg>
    </At>
  );
};

export const Jelly: React.FC = () => {
  const f = useCurrentFrame();
  const p = pop(f, 0, {damping: 14, stiffness: 120});
  const pin = Math.min(p, 1);
  const op = (i: number) => (i === 0 ? 1 : interpolate(f, [SWITCH[i], SWITCH[i] + 10], [0, 1], clamp));
  return (
    <Scene dur={75} exit={8} exitDir={1}>
      {/* coloured light spill behind the card */}
      {PHOTOS.map((ph, i) => (
        <AbsoluteFill key={i} style={{opacity: op(i) * 0.55}}>
          <div style={{position: 'absolute', left: -100, top: 380, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${ph.glow[0]}, transparent 65%)`}} />
          <div style={{position: 'absolute', left: 380, top: 520, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${ph.glow[1]}, transparent 65%)`}} />
        </AbsoluteFill>
      ))}
      <At x={540} y={190} z={20}>
        <Words
          size={84}
          segs={[{t: 'Permanent'}, {t: 'JellyFish', line: 1, hl: true}, {t: 'lighting', line: 1, emoji: '2728'}]}
          start={6}
          stagger={4}
          hlAt={16}
        />
      </At>
      <At
        x={540}
        y={interpolate(pin, [0, 1], [1400, 760]) + Math.sin(f / 13) * 8}
        z={10}
        style={{
          transform: `translate(-50%,-50%) perspective(1800px) rotateX(${(1 - p) * 40 + 4}deg) rotateY(${interpolate(f, [0, 75], [-10, 8])}deg) scale(${interpolate(pin, [0, 1], [0.6, 1])})`,
        }}
      >
        <div style={{width: 960, height: 680, borderRadius: 44, overflow: 'hidden', border: `12px solid ${C.cream}`, position: 'relative', boxShadow: '0 60px 100px rgba(0,0,0,0.5)'}}>
          {PHOTOS.map((ph, i) => (
            <Img
              key={i}
              src={staticFile(ph.src)}
              style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: op(i), transform: `scale(${1.06 + f * 0.0018})`}}
            />
          ))}
        </div>
      </At>
      {Array.from({length: 8}).map((_, i) => (
        <Sparkle key={i} x={120 + rand(i) * 840} y={420 + rand(i + 9) * 700} d={8 + i * 5} s={30 + rand(i + 3) * 30} />
      ))}
    </Scene>
  );
};
