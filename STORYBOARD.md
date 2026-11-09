# Eastman Electric · "Our Services" · Storyboard v1

30 fps · 990 frames (33.0 s) · 120 BPM grid → **1 beat = 15 frames**, 1 bar = 60 frames.
Every scene starts on a beat. Accents (pops, ticks, pin drops) land on beats or half-beats.

Compositions: `Services-Vertical` (1080×1920) and `Services-Feed` (1080×1350). Same timing for both. Each takes a `variant` prop: `evergreen` | `yearEnd`.
Vertical safe zone: key content stays between y = 250 and y = 1580. The feed layout uses the same scenes, scaled to fit the shorter canvas.

Palette: bg radial `#2E4A47` center → `#16211F` edges + soft glow blobs · cream cards `#F8EECF` · orange accent/highlighter `#D94F2B` · bronze details `#A68451`.
Global layers: slow-drifting glow blobs (parallax), a very subtle animated grain overlay, a slight camera push-in on every scene (scale 1.00 → 1.04).

---

## 1 · HOOK — f 0–105 (0–3.5 s, 7 beats)
| Frames | Action |
|---|---|
| 0–8 | Background is already on screen at f0 (no black frame). Glow blob blooms. |
| 0 / 8 / 15 / 23 | Word-by-word slam-in (scale 1.3→1, blur→sharp, spring): **"Still"** · **"putting off"** · **"that electrical"** · **"to-do list?"** |
| 30–40 | Orange highlighter swipes left→right behind **"to-do list?"** (slightly tilted, rough marker edge) |
| 45–90 | 4 cream checklist cards drop in from the top at playful angles (−8°, 6°, −4°, 9°), 8 f apart, spring overshoot, drop shadow + depth blur on the back ones: ☐ Fix the outlet that doesn't work · ☐ Stop the breaker from tripping · ☐ Wire the kitchen remodel · ☐ Add a charger for the new EV. Headline shrinks and moves up to make room. |
| 90–105 | Cards idle-float (parallax bob) |

Scroll-stopper: big type starts moving on frame 0, and the first card lands by 1.5 s.

## 2 · ANSWER — f 105–165 (3.5–5.5 s, 4 beats)
| Frames | Action |
|---|---|
| 105 / 113 / 120 / 128 | Orange check mark draws into each box (stroke-dash), pop scale + tiny 6-ray spark |
| 135–145 | Cards whip off-screen (each flies in a different direction, motion blur) |
| 138–155 | Cream logo springs in (scale 0→1, overshoot, rotate −15°→0) |
| 145–165 | **"Get it done with Eastman."** word stagger; highlighter swipes behind **"done"** |
| yearEnd | Text becomes **"Don't take it into 2027."** with the highlighter on "2027" |

## 3 · SERVICES — f 165–480 (5.5–16 s, 21 beats)
The headline **"One team for everything electrical"** mask-reveals at the top (f 165–180) and stays pinned.
Cards are cream rounded rectangles with 3D tilt (rotateY/X ±12°), arriving every **22 f** (~0.73 s). On arrival, the icon draws on with an SVG stroke, then the label's checkbox ticks itself orange.
Cards come in 3 waves of 4 floating cards. Between waves, the previous cards drift back (blur + scale down, parallax) and the new wave arrives in front.

| Frames | Content |
|---|---|
| 180–268 | Wave A: 1 Panel & meter upgrades · 2 Repairs & troubleshooting · 3 Remodels & renovations · 4 Recessed, track & landscape lighting |
| 270–330 | **Van hero card**: `van_eastman.jpg` in a big floating photo card, tilted, with a slow Ken Burns move and parallax, between the two depth layers |
| 330–418 | Wave B: 5 Ceiling fans · 6 Switches, outlets & GFCI · 7 Whole-home surge protection · 8 Dedicated circuits |
| 390–478 | Wave C: 9 EV chargers · 10 Generators · 11 Electrical inspections · 12 Commercial & office lighting |
| 465–480 | Whip-pan transition (horizontal motion blur) |

Icons (custom line SVGs, 3 px stroke, bronze/green): panel, wrench, hammer, recessed light, fan, outlet, shield-bolt, circuit, EV plug, generator, clipboard-check, office building.

## 4 · JELLYFISH — f 480–555 (16–18.5 s, 5 beats)
| Frames | Action |
|---|---|
| 480–495 | Big floating photo card flies in with 3D tilt and glow (colored lights bleed into the glow behind it) |
| 480–555 | Photos crossfade: red/green → blue/orange (f 510) → purple roofline (f 535) |
| 490–510 | **"Permanent JellyFish lighting ✨"** word stagger; sparkle emojis twinkle |

## 5 · SERVICE AREA MAP — f 555–720 (18.5–24 s, 11 beats)
Stylized SVG map in an equirectangular projection: dark-green land, cream highway lines (I-25, I-70, I-225, E-470), soft bronze mountain silhouettes to the west, subtle grid. Cities come from a `cities` config array.
| Frames | Action |
|---|---|
| 555–720 | Camera starts close on Aurora (scale ≈ 3.2) and eases out to the full Front Range view (scale 1) |
| 560–580 | Orange **home-base pin** drops on Aurora (bounce) with a repeating pulse ring; label "Aurora · Home base" |
| 585–660 | City pins drop one per half-beat (7–8 f apart) with label pills: Denver, Lakewood, Arvada, Westminster, Thornton, Centennial, Littleton, Castle Rock, Colorado Springs |
| 620–700 | Soft orange coverage zone (blurred blob path) grows from the metro down to Colorado Springs and west into the mountains; the label **"Mountain Communities"** fades in over the peaks |
| 600–630 | Title mask-reveals: **"Proudly serving the Denver Metro Area, Colorado Springs & Mountain Communities"** |

Review stills: f 575 (close on Aurora), f 640 (mid zoom, pins dropping), f 710 (full coverage).

## 6 · TRUST — f 720–810 (24–27 s, 6 beats)
| Frames | Action |
|---|---|
| 720–735 | **"Built for"** pops in center |
| 728–790 | 4 circles orbit on a dashed ellipse, labeled Homes · Businesses · Remodels · New builds, with small icons |
| 765–810 | Badges slide in (8 f apart) as cream pill cards: ★★★★★ 5.0 on Google · 2,000+ homes serviced · Licensed & insured · 50+ years of combined experience |

## 7 · THE BEST PART — f 810–870 (27–29 s, 4 beats)
| Frames | Action |
|---|---|
| 810–825 | Background flashes to a lighter green glow. **"The best part?"** word stagger |
| 830–840 | Big **"FREE estimates!!"** slams in (scale 2→1, screen shake 3 frames) with the orange highlighter behind "FREE" |
| 832–870 | Emoji burst ⚡💡😎🔥🙌 radiates out with physics (velocity, gravity, spin) |

## 8 · CTA — f 870–990 (29–33 s, 8 beats)
| Frames | Action |
|---|---|
| 870–880 | Cream wipe transition (circle reveal from center) |
| 875–915 | Green logo draws itself on: a hand-drawn stroke mask traces the circular badge, then the fill wipes in, then a small bronze shine sweep (like reference 2) |
| yearEnd 895–910 | **"Start 2027 with everything working."** (green, word stagger) |
| 905–920 | **"Get your FREE estimate"** big, orange highlighter swipe |
| 915–930 | Phone icon + **(720) 536-0300**, **CallEastman.com**, **"Message us today"** (staggered mask reveals; small "Licensed & insured" line) |
| 930–990 | **Final hold, 2 s.** Only a very slow glow breath, so the frame reads as still. |

---

## Audio
`public/music.mp3` is an optional slot. If the file is present it plays with a fade-out over the last 1 s; if not, the video renders silent. Every cut above sits on the 120 BPM grid, so any 120 BPM track will line up.

## Notes and things I need from you
1. **Assets are missing.** Only the brief and the two reference videos came through, not `assets/` or `references/`. Please add `logo_cream.png`, `logo_green.png`, `van_eastman.jpg` and the 5 `jellyfish_*.jpg` files to `assets/` in this repo. Until then I'll build with placeholders that have the same filenames, so dropping the real files in is all it takes.
2. **Logo draw-on.** The logo is a PNG, so I'll fake the handwritten stroke with an animated brush-stroke mask over the badge, then a wipe. If you have an **SVG** of the logo, I can trace its real strokes, which looks closer to reference 2.
3. **Emoji.** Emoji will be rendered from bundled Twemoji-style SVG images, so they look identical on every machine and in the cloud render.
4. **The JellyFish accent/holiday/gameday photo** isn't in the brief's crossfade order. I'd add it as a 4th crossfade frame unless you'd rather leave it out.
