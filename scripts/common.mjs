import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';

/** Use a locally installed headless shell if present (cloud/CI), else let Remotion download one. */
export const browserExecutable = (() => {
  const candidates = [
    process.env.REMOTION_BROWSER,
    '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p)) ?? null;
})();

export const hasMusic = fs.existsSync(path.resolve('public/music.mp3'));

export const makeBundle = () => bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
