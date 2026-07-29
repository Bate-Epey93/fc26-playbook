# FC 26 Playbook — Novice to Solid

An interactive, installable PWA of a personal FC 26 tactical playbook. Built around a specific squad (R9, Sanchez, Azkona, Cahill, McKennie, Rice, Marquinhos, Acerbi, Timber) and targeted at three leaks: defending, winning the ball back, and build-up.

**Live:** https://bate-epey93.github.io/fc26-playbook/

## What's in it

- **Laws** — the five rules that outrank everything else.
- **Setup** — animated 4-2-3-1 / 3-4-2-1 formation board with tappable player role cards, team tactics, and a controls reference.
- **Defend** — the five-step defending sequence plus animated jockey, cutback-cover, and cross-defending drills.
- **Win Ball** — press triggers, the second-man press rule, and an interactive 5-second counter-press timer.
- **Build-Up** — three phases from the keeper to the final third, with an animated up-back-through line-breaker.
- **Routes** — five animated attack routes, each scrubbable frame by frame with coach commentary.
- **Adjust** — in-game situation cheat sheet.
- **Train** — a one-week plan and a ten-mistakes checklist, both with saved progress.

## Controls

The playbook is written for a custom PlayStation scheme:

| Action | Button |
|---|---|
| Pass | ✕ |
| Shot | ▢ |
| Cross | ⭕ |
| Through ball | △ |
| Sprint | R1 |
| Finesse and all driven balls | R2 |
| Trigger run | L1 |
| Jockey / shield | L2 |

## Tech

Vanilla HTML, CSS, and JavaScript — no build step, no dependencies. Animations are a hand-rolled SVG timeline engine (`pitch.js`) that interpolates player runs, ball flights, and celebration effects from declarative scene data (`data.js`). Icons are brush glyphs from [EnsoKit](https://github.com/Bate-Epey93), applied as CSS masks so they recolor with the theme.

Offline support and installability come from `sw.js` (cache-first service worker) and `manifest.json`.

## Running locally

```bash
python3 -m http.server 8642
```

Then open http://localhost:8642.
