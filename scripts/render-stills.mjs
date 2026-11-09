// Renders review stills (one per scene, 3 for the map) into out/stills/.
import fs from 'node:fs';
import {renderStill, selectComposition} from '@remotion/renderer';
import {browserExecutable, makeBundle} from './common.mjs';

const FRAMES = {
  '1-hook': 92,
  '2-answer': 152,
  '3-services': 255,
  '3b-van': 285,
  '3c-services': 470,
  '4-jellyfish': 530,
  '5a-map-close': 575,
  '5b-map-mid': 640,
  '5c-map-full': 712,
  '6-trust': 800,
  '7-best-part': 855,
  '8-cta': 960,
};
const variant = process.argv[2] ?? 'evergreen';
const compId = process.argv[3] ?? 'Services-Vertical';
const only = process.argv[4]?.split(',');
fs.mkdirSync('out/stills', {recursive: true});
const serveUrl = await makeBundle();
const inputProps = {variant, music: false};
const composition = await selectComposition({serveUrl, id: compId, inputProps, browserExecutable});
for (const [name, frame] of Object.entries(FRAMES)) {
  if (only && !only.includes(name)) continue;
  const output = `out/stills/${compId}_${variant}_${name}.jpg`;
  await renderStill({serveUrl, composition, frame, output, inputProps, browserExecutable, imageFormat: 'jpeg', jpegQuality: 90});
  console.log('still', output);
}
