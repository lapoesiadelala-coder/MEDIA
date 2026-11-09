export const C = {
  green: '#2E4A47',
  dark: '#16211F',
  cream: '#F8EECF',
  orange: '#D94F2B',
  bronze: '#A68451',
  ink: '#1E302D',
};

export const FONT = "'Poppins', sans-serif";
export const FPS = 30;
/** 120 BPM → one beat every 15 frames. Every scene starts on a beat. */
export const BEAT = 15;
export const DURATION = 990;

/** [from, durationInFrames] for each scene, in global frames. */
export const SCENES = {
  hookAnswer: [0, 165],
  services: [165, 315],
  jelly: [480, 75],
  map: [555, 165],
  trust: [720, 90],
  best: [810, 60],
  cta: [870, 120],
} as const;

export type Variant = 'evergreen' | 'yearEnd';

export type VideoProps = {
  variant: Variant;
  /** true when public/music.mp3 exists (set by the render scripts). */
  music: boolean;
};

export const COPY = {
  evergreen: {
    answer: [{t: 'Get'}, {t: 'it'}, {t: 'done', hl: true}, {t: 'with', line: 1}, {t: 'Eastman.', line: 1}],
    ctaLead: null as string | null,
  },
  yearEnd: {
    answer: [{t: "Don't"}, {t: 'take'}, {t: 'it'}, {t: 'into', line: 1}, {t: '2027.', hl: true, line: 1}],
    ctaLead: 'Start 2027 with everything working.' as string | null,
  },
};

/**
 * Safe stage: every scene is laid out in a 1080 × 1330 box.
 * Vertical (1080×1920): the box sits at y = 250 → 1580 (Instagram safe zone).
 * Feed (1080×1350): the box is scaled to fit and centered.
 */
export const STAGE = {w: 1080, h: 1330};
