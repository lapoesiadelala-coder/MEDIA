// Renders the 4 MP4s into exports/.
import fs from 'node:fs';
import os from 'node:os';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {browserExecutable, hasMusic, makeBundle} from './common.mjs';

const JOBS = [
  ['evergreen', 'Services-Vertical', '9x16'],
  ['evergreen', 'Services-Feed', '4x5'],
  ['yearEnd', 'Services-Vertical', '9x16'],
  ['yearEnd', 'Services-Feed', '4x5'],
];
const filter = process.argv[2];
fs.mkdirSync('exports', {recursive: true});
const serveUrl = await makeBundle();
for (const [variant, id, ratio] of JOBS) {
  if (filter && !`${variant}_${ratio}`.includes(filter)) continue;
  const inputProps = {variant, music: hasMusic};
  const composition = await selectComposition({serveUrl, id, inputProps, browserExecutable});
  const outputLocation = `exports/EastmanElectric_OurServices_${variant}_${ratio}.mp4`;
  const t0 = Date.now();
  await renderMedia({
    serveUrl,
    composition,
    codec: 'h264',
    crf: 17,
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    jpegQuality: 92,
    inputProps,
    outputLocation,
    browserExecutable,
    concurrency: Math.max(1, os.cpus().length),
    muted: !hasMusic,
    onProgress: ({progress}) => {
      if (Math.round(progress * 100) % 10 === 0) process.stdout.write(`\r${outputLocation} ${Math.round(progress * 100)}%`);
    },
  });
  console.log(`\n✓ ${outputLocation} in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
