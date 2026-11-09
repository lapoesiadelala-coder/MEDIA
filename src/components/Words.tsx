import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {clamp, ease, pop} from '../lib';
import {interpolate} from 'remotion';

export type Seg = {t: string; hl?: boolean; line?: number; emoji?: string; color?: string};

type Props = {
  segs: Seg[];
  start: number;
  stagger?: number;
  delays?: number[];
  size: number;
  color?: string;
  weight?: number;
  mode?: 'pop' | 'mask';
  /** Frame the highlighter starts; defaults to the word's delay + 6. */
  hlAt?: number;
  hlColor?: string;
  hlText?: string;
  lineHeight?: number;
  /** Frame at which words fly out (optional). */
  outAt?: number;
  align?: 'center' | 'flex-start';
};

/** Orange marker swipe behind a word. */
export const Highlight: React.FC<{p: number; color?: string; children: React.ReactNode}> = ({p, color = C.orange, children}) => (
  <span style={{position: 'relative', display: 'inline-block'}}>
    <span
      style={{
        position: 'absolute',
        left: '-0.16em',
        right: '-0.16em',
        top: '0.08em',
        bottom: '0.02em',
        background: color,
        borderRadius: '0.14em 0.34em 0.2em 0.3em',
        transform: `skewX(-7deg) rotate(-1.6deg) scaleX(${p})`,
        transformOrigin: 'left center',
        boxShadow: p > 0 ? `0 0.08em 0.4em rgba(217,79,43,${0.35 * p})` : undefined,
      }}
    />
    <span style={{position: 'relative'}}>{children}</span>
  </span>
);

export const Emoji: React.FC<{code: string; size: number | string; style?: React.CSSProperties}> = ({code, size, style}) => (
  <Img src={staticFile(`emoji/${code}.svg`)} style={{width: size, height: size, display: 'inline-block', verticalAlign: '-0.12em', ...style}} />
);

/** Kinetic word-by-word typography. */
export const Words: React.FC<Props> = ({
  segs,
  start,
  stagger = 4,
  delays,
  size,
  color = C.cream,
  weight = 800,
  mode = 'pop',
  hlAt,
  hlColor,
  hlText,
  lineHeight = 1.08,
  outAt,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const lines: {seg: Seg; i: number}[][] = [];
  segs.forEach((seg, i) => {
    const l = seg.line ?? 0;
    (lines[l] = lines[l] || []).push({seg, i});
  });
  return (
    <div style={{fontFamily: FONT, fontWeight: weight, fontSize: size, color, lineHeight, letterSpacing: '-0.02em', textAlign: 'center'}}>
      {lines.map((line, li) => (
        <div key={li} style={{display: 'flex', justifyContent: align, gap: '0.26em', whiteSpace: 'nowrap'}}>
          {line.map(({seg, i}) => {
            const d = delays?.[i] ?? start + i * stagger;
            const p = pop(frame, d);
            const pin = Math.min(p, 1);
            const o = outAt !== undefined ? ease(frame, [outAt + i * 1.5, outAt + i * 1.5 + 8], [0, 1], 'in') : 0;
            const content = (
              <>
                {seg.t}
                {seg.emoji ? <Emoji code={seg.emoji} size="0.9em" style={{marginLeft: '0.2em'}} /> : null}
              </>
            );
            const hlP = seg.hl ? ease(frame, [hlAt ?? d + 6, (hlAt ?? d + 6) + 9]) : 0;
            const inner = seg.hl ? (
              <Highlight p={hlP} color={hlColor}>
                <span style={{color: hlP > 0.5 ? hlText ?? C.cream : seg.color ?? color}}>{content}</span>
              </Highlight>
            ) : (
              <span style={{color: seg.color ?? color}}>{content}</span>
            );
            if (mode === 'mask') {
              return (
                <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: '0 0.08em 0.1em', margin: '0 -0.08em -0.1em'}}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateY(${(1 - pin) * 110 - o * 110}%)`,
                      opacity: frame < d ? 0 : 1,
                    }}
                  >
                    {inner}
                  </span>
                </span>
              );
            }
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - p) * 0.35 - o * 1.4}em) scale(${interpolate(p, [0, 1], [1.45, 1])})`,
                  opacity: interpolate(p, [0, 0.35], [0, 1], clamp) * (1 - o),
                  filter: pin < 0.98 || o > 0 ? `blur(${(1 - pin) * 14 + o * 12}px)` : undefined,
                }}
              >
                {inner}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
