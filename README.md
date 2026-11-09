# Eastman Electric · "Our Services" video (Remotion)

## Quick start
```bash
npm install
npm run studio            # live preview in the browser
npm run stills            # review stills → out/stills/   (args: [variant] [composition])
npm run render            # 4 MP4s → exports/
```

Compositions: `Services-Vertical` (1080×1920, Reels/Stories) and `Services-Feed` (1080×1350, 4:5). 30 fps, 33 s.
Prop `variant`: `evergreen` | `yearEnd`.

## Swapping in the real assets
`public/assets/` currently holds **placeholders** with the exact filenames from the brief.
Replace them with the real files (same names) and run `npm run render` again:

- `logo_cream.png`, `logo_green.png` (transparent PNG, square)
- `van_eastman.jpg`
- `jellyfish_red_green.jpg`, `jellyfish_blue_orange.jpg`, `jellyfish_purple_roofline.jpg` (used in the JellyFish scene)

## Music
Drop a royalty-free 120 BPM track at `public/music.mp3`. The render script detects it automatically
(fades out over the last second). Every scene cut sits on the 120 BPM grid (15 frames per beat).

## Editing
- Copy/variants: `src/theme.ts` (`COPY`), scene timing: `SCENES`
- Services list: `src/scenes/Services.tsx` (`SERVICES`)
- Map cities, highways, coverage zone: `src/cities.ts` (add a city → it gets a pin)
- Storyboard: `STORYBOARD.md`
