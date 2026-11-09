import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {CheckBox} from '../components/Check';
import {Icon} from '../components/Icons';
import {C, FONT} from '../theme';
import {ease, pop} from '../lib';

export const SERVICES: {label: string; icon: string}[] = [
  {label: 'Panel & meter upgrades', icon: 'panel'},
  {label: 'Repairs & troubleshooting', icon: 'wrench'},
  {label: 'Remodels & renovations', icon: 'remodel'},
  {label: 'Recessed, track & landscape lighting', icon: 'recessed'},
  {label: 'Ceiling fans', icon: 'fan'},
  {label: 'Switches, outlets & GFCI', icon: 'outlet'},
  {label: 'Whole-home surge protection', icon: 'surge'},
  {label: 'Dedicated circuits', icon: 'circuit'},
  {label: 'EV chargers', icon: 'ev'},
  {label: 'Generators', icon: 'generator'},
  {label: 'Electrical inspections', icon: 'inspection'},
  {label: 'Commercial & office lighting', icon: 'office'},
];

const STEP = 18; // frames between cards (≈0.6 s)
// Each wave: [first card lands, wave recedes]
const WAVES = [
  [15, 96],
  [150, 222],
  [225, 999],
];
const SLOTS = [
  [290, 520, -1],
  [790, 560, 1],
  [290, 880, -1],
  [790, 920, 1],
];

const ServiceCard: React.FC<{i: number; t: number; out: number}> = ({i, t, out}) => {
  const f = useCurrentFrame();
  const s = SERVICES[i];
  const slot = SLOTS[i % 4];
  const p = pop(f, t, {damping: 14, stiffness: 120});
  const pin = Math.min(p, 1);
  const recede = ease(f, [out, out + 16], [0, 1], 'inOut');
  const float = Math.sin((f + i * 17) / 16);
  const side = slot[2];
  if (f < t || recede >= 1) return null;
  const depthBlur = (1 - pin) * 16 + recede * 14;
  return (
    <At
      x={slot[0] + (1 - pin) * side * 260 - recede * side * 120}
      y={slot[1] + (1 - pin) * 380 + float * 8 - recede * 200}
      z={10 + i}
      style={{
        transform: `translate(-50%,-50%) perspective(1600px) rotateX(${(1 - p) * 38 + recede * 18}deg) rotateY(${side * ((1 - p) * -30 + 7 + float * 4)}deg) rotateZ(${side * -2.5}deg) scale(${interpolate(pin, [0, 1], [0.45, 1]) * (1 - recede * 0.35)})`,
        opacity: Math.min(1, p * 2.5) * (1 - recede),
        filter: depthBlur > 0.3 ? `blur(${depthBlur}px)` : undefined,
      }}
    >
      <div
        style={{
          width: 450,
          height: 320,
          background: `linear-gradient(160deg, #fffaf0 0%, ${C.cream} 55%, #efe2bd 100%)`,
          borderRadius: 34,
          boxShadow: '0 40px 70px rgba(0,0,0,0.38), 0 8px 18px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.7)',
          padding: '34px 34px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{width: 110, height: 110, borderRadius: 28, background: 'rgba(46,74,71,0.09)', display: 'grid', placeItems: 'center'}}>
            <Icon name={s.icon} p={ease(f, [t + 4, t + 20])} size={78} />
          </div>
          <CheckBox at={t + 16} size={50} />
        </div>
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 36, lineHeight: 1.12, color: C.ink, letterSpacing: '-0.015em'}}>{s.label}</div>
      </div>
    </At>
  );
};

export const Services: React.FC = () => {
  const f = useCurrentFrame();
  // Van hero card
  const vanIn = pop(f, 92, {damping: 15, stiffness: 110});
  const vanOut = ease(f, [138, 150], [0, 1], 'in');
  const vp = Math.min(vanIn, 1);
  return (
    <Scene dur={315} exit={8}>
      <At x={540} y={150} z={50}>
        <Words
          mode="mask"
          size={74}
          segs={[
            {t: 'One'},
            {t: 'team'},
            {t: 'for'},
            {t: 'everything', line: 1, hl: true},
            {t: 'electrical', line: 1},
          ]}
          start={0}
          stagger={3}
          hlAt={14}
        />
      </At>

      {SERVICES.map((_, i) => {
        const w = Math.floor(i / 4);
        return <ServiceCard key={i} i={i} t={WAVES[w][0] + (i % 4) * STEP} out={WAVES[w][1]} />;
      })}

      {f >= 92 && vanOut < 1 && (
        <At
          x={540 - vanOut * 1300}
          y={interpolate(vp, [0, 1], [1300, 720]) + Math.sin(f / 14) * 8}
          z={40}
          style={{
            transform: `translate(-50%,-50%) perspective(1800px) rotateY(${interpolate(f, [92, 140], [22, -8])}deg) rotateX(${(1 - vp) * 25}deg) rotateZ(${-3 - vanOut * 12}deg) scale(${interpolate(vp, [0, 1], [0.6, 1])})`,
            filter: vanOut > 0.02 || vp < 0.95 ? `blur(${vanOut * 24 + (1 - vp) * 10}px)` : undefined,
          }}
        >
          <div
            style={{
              width: 940,
              height: 640,
              borderRadius: 40,
              overflow: 'hidden',
              border: `12px solid ${C.cream}`,
              boxShadow: '0 50px 90px rgba(0,0,0,0.45), 0 10px 24px rgba(0,0,0,0.25)',
              position: 'relative',
              background: C.dark,
            }}
          >
            <Img
              src={staticFile('assets/van_eastman.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(f, [92, 150], [1.08, 1.2])}) translateX(${interpolate(f, [92, 150], [10, -20])}px)`}}
            />
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(22,33,31,0.55))'}} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 40,
              bottom: -36,
              background: C.orange,
              color: C.cream,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 36,
              padding: '16px 30px',
              borderRadius: 999,
              boxShadow: '0 16px 30px rgba(0,0,0,0.3)',
              transform: `scale(${pop(f, 104)}) rotate(-3deg)`,
            }}
          >
            On our way to you
          </div>
        </At>
      )}
    </Scene>
  );
};
