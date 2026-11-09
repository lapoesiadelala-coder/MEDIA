// Generates stand-in images with the exact filenames from the brief.
// Replace any file in public/assets/ with the real asset (same name) and re-render.
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
let chromium;
try { ({chromium} = require('playwright')); } catch { ({chromium} = require(process.env.PLAYWRIGHT_PATH || '/opt/node-tools/node_modules/playwright/index.js')); }
import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('public/assets');
const only = process.argv.slice(2);

const badge = (fg, bg) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
  <defs><path id="ring" d="M500,500 m-370,0 a370,370 0 1,1 740,0 a370,370 0 1,1 -740,0"/></defs>
  <circle cx="500" cy="500" r="470" fill="none" stroke="${fg}" stroke-width="22"/>
  <circle cx="500" cy="500" r="300" fill="none" stroke="${fg}" stroke-width="10"/>
  <text font-family="Poppins" font-weight="700" font-size="70" letter-spacing="9" fill="${fg}">
    <textPath href="#ring" startOffset="0">TRUSTED BY YOUR NEIGHBORS ★ EASTMAN ELECTRIC ★</textPath>
  </text>
  <path d="M530 270 L400 520 L490 520 L455 735 L610 455 L515 455 L560 270 Z" fill="${fg}"/>
</svg>`;

const house = (lights, sky1, sky2, label) => {
  // roofline points for a two-gable house
  const roof = [[180,560],[480,330],[780,560],[780,520],[1060,330],[1420,560]];
  const dots = [];
  for (let s = 0; s < roof.length - 1; s++) {
    const [x1,y1] = roof[s], [x2,y2] = roof[s+1];
    if (s === 2) continue;
    const n = Math.round(Math.hypot(x2-x1,y2-y1) / 34);
    for (let i = 0; i <= n; i++) dots.push([x1 + (x2-x1)*i/n, y1 + (y2-y1)*i/n]);
  }
  const c = dots.map(([x,y],i) => {
    const col = lights[i % lights.length];
    return `<circle cx="${x}" cy="${y}" r="26" fill="${col}" opacity=".35" filter="url(#b)"/><circle cx="${x}" cy="${y}" r="8" fill="${col}"/><circle cx="${x}" cy="${y}" r="3.5" fill="#fff"/>`;
  }).join('');
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient>
    <filter id="b"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="b2"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="1600" height="1100" fill="url(#s)"/>
  ${Array.from({length:60},(_,i)=>`<circle cx="${(i*137)%1600}" cy="${(i*71)%300}" r="${i%3?1.5:2.5}" fill="#fff" opacity=".6"/>`).join('')}
  <path d="M0 640 Q300 600 600 650 T1600 620 V1100 H0Z" fill="#0d1413"/>
  <path d="M180 560 L480 330 L780 560 L780 520 L1060 330 L1420 560 V900 H180Z" fill="#1d2624"/>
  <rect x="300" y="640" width="150" height="110" rx="6" fill="#f2c57c" opacity=".85"/>
  <rect x="560" y="640" width="150" height="110" rx="6" fill="#f2c57c" opacity=".7"/>
  <rect x="900" y="620" width="340" height="280" rx="8" fill="#2a3533"/>
  <rect x="1270" y="640" width="110" height="110" rx="6" fill="#f2c57c" opacity=".75"/>
  <rect x="0" y="900" width="1600" height="200" fill="#121a19"/>
  <ellipse cx="800" cy="980" rx="700" ry="60" fill="${lights[0]}" opacity=".12" filter="url(#b2)"/>
  ${c}
  <text x="1570" y="1070" text-anchor="end" font-family="Poppins" font-size="26" fill="#fff" opacity=".45">PLACEHOLDER · ${label}</text>
</svg>`;
};

const van = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc4d6"/><stop offset="1" stop-color="#e9e2cf"/></linearGradient></defs>
  <rect width="1600" height="1100" fill="url(#s)"/>
  <path d="M0 520 L250 380 L420 470 L640 300 L900 480 L1100 360 L1350 470 L1600 400 V700 H0Z" fill="#7d9aa0" opacity=".55"/>
  <rect y="760" width="1600" height="340" fill="#8a8a86"/>
  <rect y="760" width="1600" height="18" fill="#6e6e6a"/>
  <g transform="translate(170 300)">
    <path d="M40 120 Q40 60 100 60 H900 Q1000 60 1060 160 L1180 300 Q1230 320 1230 380 V470 Q1230 500 1200 500 H40 Q20 500 20 480 Z" fill="#f4f1ea"/>
    <path d="M940 90 Q1010 95 1050 170 L1140 290 H940Z" fill="#2c3b3e"/>
    <rect x="20" y="300" width="1210" height="120" fill="#2E4A47"/>
    <rect x="20" y="420" width="1210" height="16" fill="#D94F2B"/>
    <text x="90" y="250" font-family="Poppins" font-weight="800" font-size="76" fill="#2E4A47">EASTMAN ELECTRIC</text>
    <text x="100" y="385" font-family="Poppins" font-weight="700" font-size="64" fill="#F8EECF">(720) 536-0300 · CallEastman.com</text>
    <circle cx="260" cy="510" r="95" fill="#1c1c1c"/><circle cx="260" cy="510" r="45" fill="#aaa"/>
    <circle cx="1010" cy="510" r="95" fill="#1c1c1c"/><circle cx="1010" cy="510" r="45" fill="#aaa"/>
  </g>
  <text x="1570" y="1070" text-anchor="end" font-family="Poppins" font-size="26" fill="#000" opacity=".4">PLACEHOLDER · van_eastman.jpg</text>
</svg>`;

const jobs = {
  'logo_cream.png': [badge('#F8EECF'), 1000, 1000, true],
  'logo_green.png': [badge('#2E4A47'), 1000, 1000, true],
  'van_eastman.jpg': [van, 1600, 1100],
  'jellyfish_red_green.jpg': [house(['#ff2b2b','#25e05a'], '#0b1630', '#22304f', 'jellyfish_red_green'), 1600, 1100],
  'jellyfish_blue_orange.jpg': [house(['#2b7bff','#ff8a1f'], '#081428', '#1b2a44', 'jellyfish_blue_orange'), 1600, 1100],
  'jellyfish_purple_roofline.jpg': [house(['#b44bff','#d98bff'], '#120a28', '#2a1f48', 'jellyfish_purple_roofline'), 1600, 1100],
  'jellyfish_christmas_house.jpg': [house(['#ff2b2b','#ffffff','#25e05a'], '#0b1630', '#22304f', 'jellyfish_christmas_house'), 1600, 1100],
  'jellyfish_accent_holiday_gameday.jpg': [house(['#f5f1e6'], '#0b1630', '#22304f', 'jellyfish_accent_holiday_gameday'), 1600, 1100],
};

const fontCss = fs.readFileSync(path.resolve('node_modules/@fontsource/poppins/files/poppins-latin-800-normal.woff2')).toString('base64');
const font7 = fs.readFileSync(path.resolve('node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2')).toString('base64');

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, [svg, w, h, transparent]] of Object.entries(jobs)) {
  if (only.length && !only.includes(name)) continue;
  const dest = path.join(out, name);
  if (fs.existsSync(dest) && !only.length) { console.log('keep existing', name); continue; }
  await page.setViewportSize({width: w, height: h});
  await page.setContent(`<html><head><style>
    @font-face{font-family:Poppins;font-weight:800;src:url(data:font/woff2;base64,${fontCss})}
    @font-face{font-family:Poppins;font-weight:400 700;src:url(data:font/woff2;base64,${font7})}
    html,body{margin:0;background:transparent}</style></head><body>${svg}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path: dest, omitBackground: !!transparent, type: name.endsWith('.png') ? 'png' : 'jpeg', quality: name.endsWith('.png') ? undefined : 90});
  console.log('wrote', name);
}
await browser.close();
