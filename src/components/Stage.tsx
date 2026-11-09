import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {STAGE} from '../theme';
import {ease} from '../lib';

/** Positions the 1080×1330 safe stage inside the current canvas. */
export const useStageTransform = () => {
  const {width, height} = useVideoConfig();
  const scale = height >= STAGE.h + 400 ? 1 : Math.min(width / STAGE.w, (height - 40) / STAGE.h);
  const top = height >= 1900 ? 250 : (height - STAGE.h * scale) / 2;
  const left = (width - STAGE.w * scale) / 2;
  return {scale, top, left};
};

type ShellProps = {
  children: React.ReactNode;
  dur: number;
  /** Whip-pan exit over the last N frames (0 = none). */
  exit?: number;
  exitDir?: 1 | -1;
  push?: number;
};

/**
 * Wraps a scene: slight camera push-in for the whole scene + a whip exit
 * (horizontal slide with motion blur) at the end.
 */
export const Scene: React.FC<ShellProps> = ({children, dur, exit = 8, exitDir = -1, push = 0.045}) => {
  const frame = useCurrentFrame();
  const {scale, top, left} = useStageTransform();
  const p = exit ? ease(frame, [dur - exit, dur], [0, 1], 'in') : 0;
  const zoom = 1 + push * (frame / dur);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translateX(${p * 900 * exitDir}px) scale(${zoom})`,
          filter: p > 0.01 ? `blur(${p * 26}px)` : undefined,
          opacity: 1 - p * 0.6,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left,
            top,
            width: 1080,
            height: 1330,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Absolutely positioned element centered on (x, y) in stage coordinates. */
export const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties; z?: number}> = ({
  x,
  y,
  children,
  style,
  z,
}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', zIndex: z, ...style}}>{children}</div>
);
