import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {ease} from '../lib';

/** Little burst of rays (used when a box gets ticked). */
export const Spark: React.FC<{at: number; size?: number; color?: string; rays?: number}> = ({at, size = 90, color = C.orange, rays = 7}) => {
  const f = useCurrentFrame();
  const t = (f - at) / 12;
  if (t < 0 || t > 1) return null;
  return (
    <svg width={size * 2} height={size * 2} viewBox="-50 -50 100 100" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', overflow: 'visible'}}>
      {Array.from({length: rays}).map((_, i) => {
        const a = (i / rays) * Math.PI * 2 + 0.3;
        const r1 = 16 + t * 22;
        const r2 = r1 + 12 * (1 - t);
        return (
          <line
            key={i}
            x1={Math.cos(a) * r1}
            y1={Math.sin(a) * r1}
            x2={Math.cos(a) * r2}
            y2={Math.sin(a) * r2}
            stroke={i % 2 ? C.bronze : color}
            strokeWidth={4.5 * (1 - t) + 1}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

/** Checkbox whose orange check draws on at `at`, with a pop and a spark. */
export const CheckBox: React.FC<{at: number; size?: number; color?: string}> = ({at, size = 56, color = C.green}) => {
  const f = useCurrentFrame();
  const p = ease(f, [at, at + 7]);
  const bump = f >= at ? Math.sin(Math.min(1, (f - at) / 9) * Math.PI) : 0;
  return (
    <div style={{position: 'relative', width: size, height: size, flexShrink: 0, transform: `scale(${1 + bump * 0.28})`}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `${size * 0.075}px solid ${color}`,
          borderRadius: size * 0.22,
          background: p > 0 ? `rgba(217,79,43,${0.12 * p})` : 'transparent',
        }}
      />
      <svg viewBox="0 0 24 24" width={size * 1.15} height={size * 1.15} style={{position: 'absolute', left: size * 0.02, top: -size * 0.2, overflow: 'visible'}}>
        <path d="M4.5 12.5l5 5L21 4" fill="none" stroke={C.orange} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      </svg>
      <Spark at={at + 3} size={size * 1.1} />
    </div>
  );
};
