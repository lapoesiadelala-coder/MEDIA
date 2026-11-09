import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Emoji, Words} from '../components/Words';
import {C} from '../theme';
import {pop, rand} from '../lib';

const EMOJI = ['26a1', '1f4a1', '1f60e', '1f525', '1f64c'];
const BURST_AT = 20;

export const BestPart: React.FC = () => {
  const f = useCurrentFrame();
  const shake = f >= BURST_AT && f < BURST_AT + 6 ? (rand(f) - 0.5) * 22 : 0;
  return (
    <Scene dur={60} exit={0} push={0.06}>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
        <At x={540} y={380} z={10}>
          <Words size={88} segs={[{t: 'The'}, {t: 'best'}, {t: 'part?'}]} start={1} stagger={4} />
        </At>
        <At x={540} y={700} z={10}>
          <Words size={230} segs={[{t: 'FREE', hl: true}]} start={BURST_AT - 2} hlAt={BURST_AT + 4} lineHeight={1} />
        </At>
        <At x={540} y={900} z={10}>
          <Words size={118} segs={[{t: 'estimates!!'}]} start={BURST_AT + 4} />
        </At>
        {/* Emoji burst */}
        {Array.from({length: 22}).map((_, i) => {
          const t = f - BURST_AT - (i % 4);
          if (t < 0) return null;
          const a = rand(i + 1) * Math.PI * 2;
          const v = 40 + rand(i + 40) * 34;
          const drag = (1 - Math.pow(0.9, t)) / 0.1;
          const x = 540 + Math.cos(a) * v * drag;
          const y = 720 + Math.sin(a) * v * drag * 1.25 + 0.12 * t * t;
          const s = 70 + rand(i + 80) * 70;
          const sc = pop(t, 0, {damping: 9, stiffness: 220});
          return (
            <At key={i} x={x} y={y} z={1} style={{transform: `translate(-50%,-50%) scale(${sc}) rotate(${(rand(i + 7) - 0.5) * 60 + t * (rand(i) - 0.5) * 6}deg)`, opacity: interpolate(t, [30, 40], [1, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
              <Emoji code={EMOJI[i % EMOJI.length]} size={s} />
            </At>
          );
        })}
      </div>
      {/* subtle cream ring flash on impact */}
      {f >= BURST_AT && f < BURST_AT + 14 && (
        <At x={540} y={760}>
          <div style={{width: (f - BURST_AT) * 90, height: (f - BURST_AT) * 90, borderRadius: '50%', border: `6px solid ${C.cream}`, opacity: 1 - (f - BURST_AT) / 14}} />
        </At>
      )}
    </Scene>
  );
};
