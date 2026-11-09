import React from 'react';
import {C} from '../theme';

/** Line icons (64×64 grid). Each path draws itself on via stroke-dashoffset. */
export const ICONS: Record<string, string[]> = {
  panel: ['M14 7h36v50H14z', 'M21 17h9M34 17h9M21 26h9M34 26h9M21 35h9M34 35h9', 'M33 42l-5 8h8l-5 8'],
  wrench: ['M41 9a13 13 0 0 0-12 17L11 44a5 5 0 0 0 8 8l18-18a13 13 0 0 0 17-12l-8 7-7-2-2-7z'],
  remodel: ['M8 31L32 11l24 20', 'M15 26v29h34V26', 'M27 55V40h10v15', 'M42 9v10'],
  recessed: ['M10 18h44', 'M18 18a14 9 0 0 0 28 0', 'M32 34v8', 'M21 31l-5 7', 'M43 31l5 7', 'M26 46h12M23 53h18'],
  fan: ['M32 6v12', 'M27 18h10v7H27z', 'M27 23L8 30l3 4 17-5', 'M37 23l19 7-3 4-17-5', 'M28 30a4 4 0 0 0 8 0', 'M32 34v6', 'M26 44a6 5 0 0 0 12 0z'],
  outlet: ['M17 7h30a7 7 0 0 1 7 7v36a7 7 0 0 1-7 7H17a7 7 0 0 1-7-7V14a7 7 0 0 1 7-7z', 'M25 21v9M39 21v9', 'M28 46v-4a4 4 0 0 1 8 0v4z'],
  surge: ['M32 5l21 8v17c0 14-9 24-21 29C20 54 11 44 11 30V13z', 'M35 16l-10 16h9l-5 13 12-18h-9l5-11z'],
  circuit: ['M4 32h10', 'M14 32l5-11 6 22 6-22 6 22 6-22 5 11', 'M48 32h12', 'M10 14h44M10 50h44'],
  ev: ['M9 41l6-15h34l6 15v11H9z', 'M15 52v5M49 52v5', 'M16 42h6M42 42h6', 'M35 6l-7 10h9l-7 10'],
  generator: ['M9 19h46v32H9z', 'M9 27h46', 'M17 51v6M47 51v6', 'M35 31l-7 9h9l-7 9', 'M15 23h4'],
  inspection: ['M17 10h30v47H17z', 'M25 6h14v8H25z', 'M23 31l6 6 12-12', 'M23 47h18'],
  office: ['M13 57V9h26v48', 'M39 23h14v34', 'M7 57h52', 'M19 17h5M28 17h5M19 26h5M28 26h5M19 35h5M28 35h5M19 44h5M28 44h5', 'M44 32h4M44 41h4'],
  home: ['M8 31L32 11l24 20', 'M15 26v29h34V26', 'M27 55V40h10v15'],
  newbuild: ['M14 57V9h5v48', 'M10 57h14', 'M19 11h36', 'M19 18l9-7M28 11l-9 7', 'M48 11v14', 'M43 25h10v8H43z'],
  shield: ['M32 5l21 8v17c0 14-9 24-21 29C20 54 11 44 11 30V13z', 'M22 32l7 7 13-14'],
  medal: ['M22 6l10 16 10-16', 'M32 22a15 15 0 1 1 0 30 15 15 0 0 1 0-30z', 'M32 30l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z'],
  phone: ['M20 8l7 13-5 5c3 6 8 11 14 14l5-5 13 7-3 10c-22 0-42-20-42-42z'],
  chat: ['M10 14h44v28H30l-12 10v-10h-8z', 'M20 25h24M20 32h14'],
};

export const Icon: React.FC<{name: string; p?: number; size?: number; color?: string; width?: number}> = ({
  name,
  p = 1,
  size = 80,
  color = C.green,
  width = 3.6,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{overflow: 'visible'}}>
    {ICONS[name].map((d, i) => {
      const n = ICONS[name].length;
      const local = Math.max(0, Math.min(1, p * n * 0.75 - i * 0.6));
      return (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 1"
          strokeDashoffset={1 - local}
        />
      );
    })}
  </svg>
);

export const Star: React.FC<{size: number; color?: string; style?: React.CSSProperties}> = ({size, color = C.orange, style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill={color} />
  </svg>
);
