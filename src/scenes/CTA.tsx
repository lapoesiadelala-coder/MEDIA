import React from 'react';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Scene} from '../components/Stage';
import {Words} from '../components/Words';
import {Icon} from '../components/Icons';
import {C, COPY, FONT, Variant} from '../theme';
import {clamp, ease, pop} from '../lib';

// Logo geometry (logo PNG is 2429×1994 → 1000×821 viewBox). Badge circle centre/radius measured from the artwork.
const LW = 1000;
const LH = 821;
const CX = 529;
const CY = 410;
const R = 402;
const circle = (r: number) => `M${CX} ${CY - r} A${r} ${r} 0 1 1 ${CX - 0.5} ${CY - r}`;

const LogoDraw: React.FC<{size: number}> = ({size}) => {
  const f = useCurrentFrame();
  const ring = ease(f, [6, 30], [0, 1], 'inOut');
  const script = ease(f, [18, 38], [0, 1], 'inOut');
  const inner = ease(f, [28, 44], [0, 1], 'inOut');
  const settle = ease(f, [40, 52]);
  const shine = interpolate(f, [44, 62], [-0.6, 1.6], clamp);
  // pen tip position on the ring
  const a = -Math.PI / 2 + ring * Math.PI * 2;
  const tipX = CX + Math.cos(a) * R;
  const tipY = CY + Math.sin(a) * R;
  // pen tip on the script stroke
  const sX = script * LW;
  const href = staticFile('assets/logo_green.png');
  return (
    <div style={{position: 'relative', width: size, height: (size * LH) / LW, transform: `scale(${0.94 + settle * 0.06})`}}>
      <svg width={size} height={(size * LH) / LW} viewBox={`0 0 ${LW} ${LH}`} style={{overflow: 'visible'}}>
        <defs>
          <mask id="logoMask">
            <path d={circle(R)} fill="none" stroke="#fff" strokeWidth={70} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ring} />
            <path d={`M-40 395 L${LW + 40} 395`} fill="none" stroke="#fff" strokeWidth={360} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - script} />
            <path d={circle(285)} fill="none" stroke="#fff" strokeWidth={250} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - inner} />
            <rect width={LW} height={LH} fill="#fff" opacity={settle} />
          </mask>
        </defs>
        <image href={href} width={LW} height={LH} mask="url(#logoMask)" />
        {ring > 0 && ring < 1 && <circle cx={tipX} cy={tipY} r={20} fill={C.orange} opacity={0.9} />}
        {script > 0 && script < 1 && <circle cx={sX} cy={430} r={20} fill={C.orange} opacity={0.9} />}
      </svg>
      {/* shine sweep, clipped to the logo's alpha */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: `url(${href})`,
          WebkitMaskSize: '100% 100%',
          maskImage: `url(${href})`,
          maskSize: '100% 100%',
          background: `linear-gradient(115deg, transparent ${shine * 100 - 12}%, rgba(255,240,200,0.9) ${shine * 100}%, transparent ${shine * 100 + 12}%)`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

const Row: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => {
  const f = useCurrentFrame();
  const p = ease(f, [at, at + 12]);
  return (
    <div style={{overflow: 'hidden', padding: '6px 10px'}}>
      <div style={{transform: `translateY(${(1 - p) * 110}%)`, opacity: f < at ? 0 : 1}}>{children}</div>
    </div>
  );
};

export const CTA: React.FC<{variant: Variant}> = ({variant}) => {
  const f = useCurrentFrame();
  const wipe = ease(f, [0, 13], [0, 1], 'inOut');
  const lead = COPY[variant].ctaLead;
  const breathe = 0.5 + 0.5 * Math.sin(f / 18);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `circle(${wipe * 120}% at 50% 50%)`,
          background: `radial-gradient(ellipse 80% 60% at 50% 42%, #fffaf0 0%, ${C.cream} 55%, #eadcb4 100%)`,
        }}
      >
        <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, rgba(217,79,43,0.10), transparent 55%)', opacity: 0.6 + breathe * 0.4}} />
        <Scene dur={120} exit={0} push={0.02}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: lead ? 18 : 26, paddingBottom: 20}}>
            <LogoDraw size={lead ? 480 : 540} />
            {lead && (
              <div style={{marginTop: 16}}>
                <Words mode="mask" size={50} weight={700} color={C.green} segs={lead.split(' ').map((t, i) => ({t, line: i < 3 ? 0 : 1}))} start={34} stagger={2} />
              </div>
            )}
            <div style={{marginTop: lead ? 8 : 20}}>
              <Words
                size={98}
                color={C.green}
                segs={[{t: 'Get'}, {t: 'your'}, {t: 'FREE', line: 1, hl: true}, {t: 'estimate', line: 1, hl: true}]}
                start={lead ? 44 : 38}
                stagger={3}
                hlAt={lead ? 52 : 46}
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 18}}>
              <Row at={52}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  <div style={{width: 76, height: 76, borderRadius: '50%', background: C.orange, display: 'grid', placeItems: 'center', transform: `scale(${pop(f, 54)})`}}>
                    <Icon name="phone" size={44} color={C.cream} width={4.5} p={ease(f, [56, 66])} />
                  </div>
                  <span style={{fontFamily: FONT, fontWeight: 800, fontSize: 74, color: C.green, letterSpacing: '-0.01em'}}>(720) 536-0300</span>
                </div>
              </Row>
              <Row at={57}>
                <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 54, color: C.green}}>CallEastman.com</span>
              </Row>
              <div style={{marginTop: 18, transform: `scale(${pop(f, 62)})`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, color: C.cream, fontFamily: FONT, fontWeight: 700, fontSize: 38, padding: '18px 38px', borderRadius: 999, boxShadow: '0 16px 30px rgba(22,33,31,0.3)'}}>
                  <Icon name="chat" size={44} color={C.cream} width={4.5} p={ease(f, [64, 74])} />
                  Message us today
                </div>
              </div>
              <Row at={66}>
                <span style={{fontFamily: FONT, fontWeight: 600, fontSize: 26, color: C.bronze, letterSpacing: '0.04em'}}>Licensed &amp; insured · Denver Metro · Colorado Springs · Mountains</span>
              </Row>
            </div>
          </div>
        </Scene>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
