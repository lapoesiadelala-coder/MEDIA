import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {At, Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {C, FONT} from '../theme';
import {CITIES, COVERAGE, HIGHWAYS} from '../cities';
import {clamp, ease, pop, rand} from '../lib';

// Equirectangular projection: px per degree, origin at the final view centre.
const PX = 900;
const LON0 = -104.95;
const LAT0 = 39.351;
const proj = (lat: number, lon: number): [number, number] => [(lon - LON0) * PX, (LAT0 - lat) * PX];
const path = (pts: [number, number][]) => pts.map(([la, lo], i) => `${i ? 'L' : 'M'}${proj(la, lo).map((n) => n.toFixed(1)).join(' ')}`).join(' ');

const STAGE_C: [number, number] = [540, 830];
const HOME = CITIES.find((c) => c.home)!;

// Peaks for the mountain silhouettes (west of the metro)
const PEAKS = Array.from({length: 70}).map((_, i) => {
  const lon = -106.6 + rand(i * 3.1) * 1.38;
  const lat = 38.4 + rand(i * 7.7) * 2.1;
  const s = 40 + rand(i * 1.9) * 70 * (lon < -105.6 ? 1.3 : 0.8);
  return {lat, lon, s};
}).sort((a, b) => a.lat - b.lat);

const Pin: React.FC<{home?: boolean; p: number}> = ({home, p}) => {
  const s = home ? 96 : 48;
  return (
    <svg width={s} height={s * 1.3} viewBox="0 0 40 52" style={{overflow: 'visible', filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.45))'}}>
      <path d="M20 51C20 51 3 31 3 19a17 17 0 0 1 34 0c0 12-17 32-17 32z" fill={home ? C.orange : C.cream} stroke={home ? C.cream : C.green} strokeWidth={home ? 2.5 : 2} />
      {home ? <path d="M22 8l-8 13h6l-3 11 9-14h-6l2-10z" fill={C.cream} /> : <circle cx="20" cy="19" r="7" fill={C.orange} />}
    </svg>
  );
};

export const MapScene: React.FC = () => {
  const f = useCurrentFrame();
  // Camera: close on Aurora → full Front Range
  const t = ease(f, [0, 135], [0, 1], 'inOut');
  const z = Math.pow(3.3, 1 - t);
  const [hx, hy] = proj(HOME.lat, HOME.lon);
  const cx = interpolate(t, [0, 1], [hx, 0]);
  const cy = interpolate(t, [0, 1], [hy, 0]);
  const toScreen = (lat: number, lon: number): [number, number] => {
    const [x, y] = proj(lat, lon);
    return [STAGE_C[0] + (x - cx) * z, STAGE_C[1] + (y - cy) * z];
  };

  const roadsP = ease(f, [0, 40]);
  const covR = ease(f, [62, 125], [0, 1700], 'inOut');
  const others = CITIES.filter((c) => !c.home)
    .map((c) => ({c, d: Math.hypot(c.lat - HOME.lat, c.lon - HOME.lon)}))
    .sort((a, b) => a.d - b.d);

  const [mx, my] = toScreen(39.42, -105.3);

  return (
    <Scene dur={165} exit={8} push={0.02}>
      {/* Map layer (extends beyond the stage so it fills the frame) */}
      <svg
        width={4000}
        height={4400}
        viewBox="-2000 -2200 4000 4400"
        style={{position: 'absolute', left: STAGE_C[0] - 2000, top: STAGE_C[1] - 2200, overflow: 'visible'}}
      >
        <defs>
          <radialGradient id="land" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#24403b" />
            <stop offset="1" stopColor="#13201d" />
          </radialGradient>
          <linearGradient id="mtn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={C.bronze} stopOpacity="0.32" />
            <stop offset="1" stopColor={C.bronze} stopOpacity="0" />
          </linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="30" /></filter>
          <filter id="glow"><feGaussianBlur stdDeviation="12" /></filter>
          <clipPath id="cov"><circle cx={0} cy={0} r={covR} transform={`translate(${hx} ${hy})`} /></clipPath>
        </defs>
        <g transform={`translate(${(-cx) * z} ${(-cy) * z}) scale(${z})`}>
          <rect x={-3000} y={-3000} width={6000} height={6000} fill="url(#land)" />
          {/* grid */}
          {Array.from({length: 25}).map((_, i) => {
            const v = -3000 + i * 250;
            return (
              <g key={i} stroke={C.cream} strokeOpacity={0.05} strokeWidth={1.2} vectorEffect="non-scaling-stroke">
                <line x1={v} y1={-3000} x2={v} y2={3000} vectorEffect="non-scaling-stroke" />
                <line x1={-3000} y1={v} x2={3000} y2={v} vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
          {/* mountains: tinted band + stylised peaks */}
          <rect x={proj(0, -107)[0]} y={-3000} width={proj(0, -105.15)[0] - proj(0, -107)[0]} height={6000} fill="url(#mtn)" />
          {PEAKS.map((pk, i) => {
            const [x, y] = proj(pk.lat, pk.lon);
            const s = pk.s;
            return (
              <g key={i} opacity={0.85}>
                <path d={`M${x - s} ${y + s * 0.5} L${x} ${y - s * 0.55} L${x + s} ${y + s * 0.5}Z`} fill="#4d6a5c" />
                <path d={`M${x} ${y - s * 0.55} L${x + s} ${y + s * 0.5} L${x + s * 0.1} ${y + s * 0.5}Z`} fill="#2b3f38" />
                <path d={`M${x} ${y - s * 0.55} L${x - s * 0.25} ${y - s * 0.2} L${x - s * 0.05} ${y - s * 0.28} L${x + s * 0.18} ${y - s * 0.16}Z`} fill={C.cream} opacity={0.7} />
              </g>
            );
          })}
          {/* minor streets around the metro */}
          {Array.from({length: 18}).map((_, i) => {
            const lat = 39.5 + i * 0.03;
            const [x1, y] = proj(lat, -105.2);
            const [x2] = proj(lat, -104.7);
            return <line key={`h${i}`} x1={x1} y1={y} x2={x2} y2={y} stroke={C.cream} strokeOpacity={0.08} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />;
          })}
          {Array.from({length: 18}).map((_, i) => {
            const lon = -105.2 + i * 0.03;
            const [x, y1] = proj(40.0, lon);
            const [, y2] = proj(39.48, lon);
            return <line key={`v${i}`} x1={x} y1={y1} x2={x} y2={y2} stroke={C.cream} strokeOpacity={0.08} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />;
          })}
          {/* city light glows */}
          {CITIES.map((c) => {
            const [x, y] = proj(c.lat, c.lon);
            return <circle key={c.name} cx={x} cy={y} r={c.home ? 70 : 45} fill={C.cream} opacity={0.12} filter="url(#glow)" />;
          })}
          {/* coverage zone */}
          <g clipPath="url(#cov)">
            <path d={path(COVERAGE) + 'Z'} fill="#7fb59b" opacity={0.32} filter="url(#soft)" />
            <path d={path(COVERAGE) + 'Z'} fill={C.cream} opacity={0.06} />
            <path d={path(COVERAGE) + 'Z'} fill="none" stroke={C.orange} strokeOpacity={0.8} strokeWidth={3} strokeDasharray="10 9" vectorEffect="non-scaling-stroke" />
          </g>
          {/* highways */}
          {HIGHWAYS.map((h) => (
            <g key={h.name}>
              <path d={path(h.pts)} fill="none" stroke="#0c1513" strokeWidth={h.major ? 11 : 8} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity={0.6} />
              <path
                d={path(h.pts)}
                fill="none"
                stroke={C.cream}
                strokeWidth={h.major ? 5.5 : 3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - roadsP}
                opacity={h.major ? 0.95 : 0.7}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Mountain Communities label */}
      <At x={mx} y={my} z={5} style={{opacity: ease(f, [112, 128]), transform: `translate(-50%,-50%) translateY(${(1 - ease(f, [112, 130])) * 20}px)`}}>
        <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.cream, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.15, textShadow: '0 2px 14px rgba(0,0,0,0.6)'}}>
          Mountain
          <br />
          Communities
        </div>
      </At>

      {/* Pins (screen space so they don't scale with the zoom) */}
      {[{c: HOME, d: 0}, ...others].map(({c}, rank) => {
        const delay = c.home ? 6 : 26 + (rank - 1) * 8;
        const p = pop(f, delay, {damping: 10, stiffness: 170});
        const [x, y] = toScreen(c.lat, c.lon);
        const home = !!c.home;
        const s = home ? 96 : 48;
        const lab = ease(f, [delay + 4, delay + 14]);
        const labelStyle: React.CSSProperties = {
          position: 'absolute',
          whiteSpace: 'nowrap',
          fontFamily: FONT,
          fontWeight: home ? 800 : 600,
          fontSize: home ? 30 : 25,
          color: home ? C.cream : C.ink,
          background: home ? C.orange : C.cream,
          padding: home ? '10px 22px' : '6px 16px',
          borderRadius: 999,
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
          opacity: lab,
          ...(c.label === 'r' && {left: s * 0.62, top: -s * 0.95, transform: `translateX(${(1 - lab) * -14}px)`}),
          ...(c.label === 'l' && {right: s * 0.62, top: -s * 0.95, transform: `translateX(${(1 - lab) * 14}px)`}),
          ...(c.label === 't' && {left: '50%', bottom: s * 1.4, transform: `translateX(-50%) translateY(${(1 - lab) * 10}px)`}),
          ...(c.label === 'b' && {left: '50%', top: s * 0.3, transform: `translateX(-50%)`}),
        };
        if (f < delay) return null;
        const nudge = `translate(${c.dx ?? 0}px, ${c.dy ?? 0}px)`;
        const pulse = home ? ((f - delay) % 36) / 36 : 0;
        return (
          <div key={c.name} style={{position: 'absolute', left: x, top: y, zIndex: home ? 20 : 10}}>
            {home && (
              <>
                <div style={{position: 'absolute', left: -110 * pulse, top: -110 * pulse * 0.6, width: 220 * pulse, height: 132 * pulse, borderRadius: '50%', border: `4px solid ${C.orange}`, opacity: 1 - pulse}} />
                <div style={{position: 'absolute', left: -40, top: -24, width: 80, height: 48, borderRadius: '50%', background: C.orange, opacity: 0.35}} />
              </>
            )}
            <div style={{position: 'absolute', left: -s / 2, top: -s * 1.3 + interpolate(Math.min(p, 1), [0, 1], [-160, 0]), transform: `scale(${interpolate(p, [0, 1], [0.6, 1], clamp)}, ${p})`, transformOrigin: '50% 100%'}}>
              <Pin home={home} p={p} />
            </div>
            <div style={{position: 'absolute', transform: nudge}}><div style={labelStyle}>{home ? 'Aurora · Home base' : c.name}</div></div>
          </div>
        );
      })}

      {/* Title with readability scrim */}
      <AbsoluteFill style={{top: -260, height: 620, background: 'linear-gradient(180deg, rgba(14,22,20,0.92) 45%, rgba(14,22,20,0))', opacity: ease(f, [38, 52]), zIndex: 30}} />
      <At x={540} y={128} z={40}>
        <Words
          mode="mask"
          size={50}
          segs={[
            {t: 'Proudly'},
            {t: 'serving'},
            {t: 'the'},
            {t: 'Denver'},
            {t: 'Metro', line: 1},
            {t: 'Area,', line: 1},
            {t: 'Colorado', line: 1},
            {t: 'Springs', line: 1},
            {t: '&', line: 1},
            {t: 'Mountain', line: 2, hl: true},
            {t: 'Communities', line: 2, hl: true},
          ]}
          start={45}
          stagger={2}
          hlAt={70}
          lineHeight={1.22}
        />
      </At>
    </Scene>
  );
};
