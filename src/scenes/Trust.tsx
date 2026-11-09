import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {Icon, Star} from '../components/Icons';
import {C, FONT} from '../theme';
import {ease, pop} from '../lib';

const ORBIT = [
  {label: 'Homes', icon: 'home'},
  {label: 'Businesses', icon: 'office'},
  {label: 'Remodels', icon: 'remodel'},
  {label: 'New builds', icon: 'newbuild'},
];

const BADGES: {text: string; icon: string | null}[] = [
  {text: '5.0 on Google', icon: null},
  {text: '2,000+ homes serviced', icon: 'home'},
  {text: 'Licensed & insured', icon: 'shield'},
  {text: '50+ years of combined experience', icon: 'medal'},
];

export const Trust: React.FC = () => {
  const f = useCurrentFrame();
  const shrink = ease(f, [40, 56], [0, 1], 'inOut');
  const oy = interpolate(shrink, [0, 1], [560, 330]);
  const os = interpolate(shrink, [0, 1], [1, 0.72]);
  const RX = 400;
  const RY = 250;
  const ring = ease(f, [4, 22]);
  return (
    <Scene dur={90} exit={7}>
      <At x={540} y={oy} style={{transform: `translate(-50%,-50%) scale(${os})`}}>
        <div style={{position: 'relative', width: 1080, height: 700}}>
          <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 0}}>
            <ellipse cx={540} cy={350} rx={RX} ry={RY} fill="none" stroke={C.cream} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="4 14" strokeLinecap="round" pathLength={1000} strokeDashoffset={(1 - ring) * 1000} />
            <ellipse cx={540} cy={350} rx={RX * 0.62} ry={RY * 0.62} fill="none" stroke={C.cream} strokeOpacity={0.15} strokeWidth={2} />
          </svg>
          {ORBIT.map((o, i) => {
            const a = (i / 4) * Math.PI * 2 + f * 0.022 - 0.6;
            const depth = (Math.sin(a) + 1) / 2; // 0 back → 1 front
            const p = pop(f, 8 + i * 6);
            const x = 540 + Math.cos(a) * RX;
            const y = 350 + Math.sin(a) * RY;
            const sc = Math.min(p, 1.2) * interpolate(depth, [0, 1], [0.72, 1.05]);
            return (
              <div
                key={o.label}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: `translate(-50%,-50%) scale(${sc})`,
                  zIndex: depth > 0.5 ? 5 : 1,
                  filter: depth < 0.35 ? `blur(${(0.35 - depth) * 8}px)` : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div style={{width: 150, height: 150, borderRadius: '50%', background: C.cream, display: 'grid', placeItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.35), 0 0 0 8px rgba(248,238,207,0.15)'}}>
                  <Icon name={o.icon} size={78} p={ease(f, [12 + i * 6, 28 + i * 6])} />
                </div>
                <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 32, color: C.cream, background: 'rgba(22,33,31,0.7)', padding: '4px 18px', borderRadius: 999}}>{o.label}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 540, top: 350, transform: 'translate(-50%,-50%)', zIndex: 3}}>
            <Words size={124} segs={[{t: 'Built'}, {t: 'for', hl: true}]} start={0} stagger={4} hlAt={8} />
          </div>
        </div>
      </At>

      {BADGES.map((b, i) => {
        const d = 46 + i * 7;
        const p = pop(f, d, {damping: 15, stiffness: 160});
        const side = i % 2 ? 1 : -1;
        return (
          <At key={i} x={540 + (1 - Math.min(p, 1)) * side * 1100} y={720 + i * 140} style={{transform: `translate(-50%,-50%) rotate(${side * (1 - Math.min(p, 1)) * 8}deg)`}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                minWidth: 760,
                height: 112,
                boxSizing: 'border-box',
                padding: '0 36px',
                background: C.cream,
                borderRadius: 999,
                boxShadow: '0 24px 50px rgba(0,0,0,0.35)',
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 38,
                color: C.ink,
                whiteSpace: 'nowrap',
              }}
            >
              {b.icon ? (
                <div style={{width: 68, height: 68, borderRadius: '50%', background: C.orange, display: 'grid', placeItems: 'center', flexShrink: 0}}>
                  <Icon name={b.icon} size={42} color={C.cream} width={4.5} p={ease(f, [d + 2, d + 16])} />
                </div>
              ) : (
                <div style={{display: 'flex', gap: 2}}>
                  {Array.from({length: 5}).map((_, s) => (
                    <Star key={s} size={44} style={{transform: `scale(${pop(f, d + 3 + s * 2)})`}} />
                  ))}
                </div>
              )}
              {b.text}
            </div>
          </At>
        );
      })}
    </Scene>
  );
};
