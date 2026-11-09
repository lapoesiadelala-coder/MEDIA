import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {CheckBox} from '../components/Check';
import {C, COPY, FONT, Variant} from '../theme';
import {clamp, ease, pop} from '../lib';

const TODOS = ['Fix the outlet that doesn’t work', 'Stop the breaker from tripping', 'Wire the kitchen remodel', 'Add a charger for the new EV'];
const ROT = [-6, 5, -4, 7];
const DX = [-34, 40, -22, 30];
// Where each card flies away to (scene 2)
const AWAY = [
  [-1.2, -1],
  [1.3, -0.6],
  [-1.3, 0.7],
  [1.1, 1.1],
];

// Scene 1 (0–105) + Scene 2 (105–165)
export const HookAnswer: React.FC<{variant: Variant}> = ({variant}) => {
  const f = useCurrentFrame();

  // Headline moves up to make room for the cards
  const up = ease(f, [40, 58]);
  const headOut = ease(f, [116, 126], [0, 1], 'in');
  const headY = interpolate(up, [0, 1], [560, 200]);
  const headS = interpolate(up, [0, 1], [1, 0.82]);

  const TICK = [98, 103, 108, 113];
  const away = ease(f, [117, 130], [0, 1], 'in');

  const logoP = pop(f, 119, {damping: 11, stiffness: 160});
  return (
    <Scene dur={165} exit={7}>
      {/* HOOK headline */}
      <At x={540} y={headY} style={{transform: `translate(-50%,-50%) scale(${headS})`, opacity: 1 - headOut, filter: headOut ? `blur(${headOut * 16}px)` : undefined}}>
        <Words
          size={96}
          segs={[
            {t: 'Still', line: 0},
            {t: 'putting off', line: 0},
            {t: 'that electrical', line: 1},
            {t: 'to-do list?', line: 2, hl: true},
          ]}
          start={0}
          delays={[-5, 6, 14, 22]}
          hlAt={29}
        />
      </At>

      {/* Checklist cards */}
      {TODOS.map((t, i) => {
        const d = 46 + i * 8;
        const p = pop(f, d, {damping: 12, stiffness: 150});
        const y = 520 + i * 172;
        const bob = Math.sin((f + i * 20) / 14) * 6;
        const [ax, ay] = AWAY[i];
        const a = Math.max(0, away - i * 0.04);
        return (
          <At
            key={i}
            x={540 + DX[i] + ax * a * 1300}
            y={interpolate(p, [0, 1], [y - 1100, y]) + bob + ay * a * 1200}
            style={{
              transform: `translate(-50%,-50%) rotate(${ROT[i] * (0.4 + 0.6 * Math.min(p, 1.2)) + a * ax * 40}deg)`,
              opacity: f < d ? 0 : 1,
              filter: a > 0.02 ? `blur(${a * 18}px)` : undefined,
            }}
          >
            <div
              style={{
                width: 860,
                height: 136,
                background: C.cream,
                borderRadius: 30,
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                padding: '0 40px',
                boxSizing: 'border-box',
                boxShadow: '0 30px 60px rgba(0,0,0,0.35), 0 6px 14px rgba(0,0,0,0.2)',
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 40,
                color: C.ink,
                letterSpacing: '-0.01em',
              }}
            >
              <CheckBox at={TICK[i]} size={58} />
              <span style={{textDecoration: 'none', opacity: f > TICK[i] + 4 ? 0.75 : 1}}>{t}</span>
            </div>
          </At>
        );
      })}

      {/* ANSWER: logo + line */}
      {f >= 117 && (
        <>
          <At x={540} y={470}>
            <div style={{position: 'relative', width: 400, height: 400, transform: `scale(${logoP}) rotate(${(1 - Math.min(logoP, 1)) * -18}deg)`}}>
              <div style={{position: 'absolute', inset: -120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,238,207,0.28), transparent 65%)'}} />
              <Img src={staticFile('assets/logo_cream.png')} style={{width: 400, height: 400, position: 'relative'}} />
            </div>
          </At>
          <At x={540} y={860} style={{opacity: interpolate(f, [117, 120], [0, 1], clamp)}}>
            <Words size={100} segs={COPY[variant].answer} start={123} stagger={3} hlAt={135} />
          </At>
        </>
      )}
    </Scene>
  );
};
