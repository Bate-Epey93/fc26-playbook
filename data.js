/* ============ FC 26 Playbook — content + coordinates ============ */
/* Pitch space: 680 x 1050, attacking toward y=0 (top). */

const DATA = {};

/* ---------- squad & formations ---------- */
DATA.players = {
  GK:   { name: 'GK (buy)',    pos: 'GK',  role: 'Goalkeeper · Defend',            note: 'Stays home; pairs with your deeper line. Buy for reflexes and positioning.' },
  LB:   { name: 'LB (buy)',    pos: 'LB',  role: 'Fullback · Defend',              note: 'Buy any cheap LB with 80+ pace. Never caught upfield.' },
  ACE:  { name: 'Acerbi',      pos: 'CB',  role: 'Defender · Defend',              note: 'Wins physical duels, sweeps up crosses.' },
  MARQ: { name: 'Marquinhos',  pos: 'CB',  role: 'Defender · Defend',              note: 'Your recovery-pace anchor. Keep him honest. Later: Ball-Playing Defender (Build-Up) for an extra passing outlet.' },
  TIM:  { name: 'Timber',      pos: 'RB',  role: 'Fullback · Defend',              note: 'Never caught upfield; covers Azkona’s wing. Pace and versatility wasted less here than as a third CB.' },
  MCK:  { name: 'McKennie',    pos: 'CDM', role: 'Deep-Lying Playmaker · Build-Up', note: 'Drops between the lines to receive from your CBs. This role alone fixes half your build-up problem.' },
  RICE: { name: 'Rice',        pos: 'CDM', role: 'Holding · Defend',               note: 'Your shield. Sits in front of the CBs and eats counters. Never joins the press.' },
  CAH:  { name: 'Cahill',      pos: 'CAM', role: 'Shadow Striker · Attack',        note: 'Ghosts into the box late. Your far-post and cutback finisher. No fullback beats him in the air.' },
  SAN:  { name: 'Sanchez',     pos: 'LM',  role: 'Inside Forward · Balanced',      note: 'Cuts into the half-space, links with Ronaldo, arrives for cutbacks.' },
  AZK:  { name: 'Azkona',      pos: 'RM',  role: 'Winger · Balanced',              note: 'Holds width, delivers the crosses Cahill lives on. If better cutting inside: flip to Inside Forward, let Timber overlap.' },
  R9:   { name: 'R9',          pos: 'ST',  role: 'Advanced Forward · Complete Fwd', note: 'Constantly threatens the last line. Your through-ball magnet.' },
  LWB:  { name: 'LWB (buy)',   pos: 'LWB', role: 'Wingback',                        note: 'Cheap buy for the 3-4-2-1. Defend wide areas manually.' },
  RWB:  { name: 'RWB (buy)',   pos: 'RWB', role: 'Wingback',                        note: 'Cheap buy for the 3-4-2-1. Defend wide areas manually.' }
};

DATA.formations = {
  '4231': {
    label: '4-2-3-1 · Your fortress',
    desc: 'Two CDMs in front of a back four — the most forgiving shape for fixing a defense. Clogs the middle, protects against through balls, still fields four attackers.',
    spots: [
      { id: 'GK',   x: 340, y: 985 },
      { id: 'LB',   x: 95,  y: 845 },
      { id: 'ACE',  x: 250, y: 868 },
      { id: 'MARQ', x: 430, y: 868 },
      { id: 'TIM',  x: 585, y: 845 },
      { id: 'MCK',  x: 250, y: 700 },
      { id: 'RICE', x: 430, y: 700 },
      { id: 'SAN',  x: 105, y: 515 },
      { id: 'CAH',  x: 340, y: 545 },
      { id: 'AZK',  x: 575, y: 515 },
      { id: 'R9',   x: 340, y: 360 }
    ]
  },
  '3421': {
    label: '3-4-2-1 · Plan B (D-pad preset)',
    desc: 'Three natural CBs make this legit: use it chasing a game when you need bodies in the middle. Expect to defend wide areas manually. Not your default until fundamentals are solid.',
    spots: [
      { id: 'GK',   x: 340, y: 985 },
      { id: 'MARQ', x: 195, y: 862 },
      { id: 'ACE',  x: 340, y: 875 },
      { id: 'TIM',  x: 485, y: 862 },
      { id: 'LWB',  x: 75,  y: 675 },
      { id: 'RICE', x: 258, y: 705 },
      { id: 'MCK',  x: 422, y: 705 },
      { id: 'RWB',  x: 605, y: 675 },
      { id: 'SAN',  x: 235, y: 480 },
      { id: 'CAH',  x: 445, y: 480 },
      { id: 'R9',   x: 340, y: 340 }
    ]
  }
};

DATA.tactics = [
  { k: 'Build-Up Style', v: 'Balanced', why: 'Short Passing invites pressure you can’t handle yet; Counter leaves you thin in possession.' },
  { k: 'Defensive Approach', v: 'Balanced', why: 'Aggressive drains stamina and pulls players out of your block.' },
  { k: 'Line Height', v: '50', why: 'Kills the through ball over the top. Raise only when you track runs better.' }
];

/* ---------- laws ---------- */
DATA.laws = [
  { t: 'Delay beats tackle', d: 'Slow the attack until help arrives — don’t try to steal instantly. Most goals you concede start with a lunge you didn’t need to make.' },
  { t: 'Defend with midfielders', d: 'Rice and McKennie chase. Marquinhos, Acerbi and Timber hold the line. Pulling a CB out of the back line is the #1 cause of conceding.' },
  { t: 'The ball is faster than any player', d: 'Pass out of pressure, pass into space. Sprint dribbling into traffic loses the ball; a two-pass combination doesn’t.' },
  { t: 'Every attack has a target', d: 'Three targets: R9’s run in behind, Cahill’s head at the far post, the cutback to the penalty spot. None on? Recycle and go again.' },
  { t: 'Stamina is a tactic', d: 'Bursts of press, not constant press. Bursts of sprint, not held sprint. The player with legs in minute 80 wins minute 85.' }
];

/* ---------- defending steps ---------- */
DATA.defendSteps = [
  { t: 'Pick the right player', pad: 'R-stick flick', d: 'Flick the right stick toward the ball to switch. Take Rice or McKennie — never a center back. CBs are AI walls; move one manually and the wall has a hole.' },
  { t: 'Cut the lane, don’t chase', pad: 'position', d: 'Put your controlled midfielder between the ball and the most dangerous pass (into their striker’s feet, or in behind). Attacks die when the pass they wanted isn’t there.' },
  { t: 'Jockey when you engage', pad: '[L2] hold · [R1] burst', d: 'Hold [L2] about a meter off the attacker. Add [R1] sprint-jockey if they’re quick. Angle your body — show them to the sideline or weak foot, away from the middle. Herd, don’t tackle.' },
  { t: 'Tackle only on a trigger', pad: 'wait for it', d: 'Heavy touch. Back or side turned to you. They enter your jockey radius at speed. NEVER tackle an attacker facing you square with the ball close — that’s how you get skilled past.' },
  { t: 'Choose the right tackle', pad: '[X] · [O] · [SQ]', d: 'Shoulder challenge ([X] side-by-side): bread and butter, almost never a foul. Stand tackle ([O]): short tap from the jockey when a trigger appears — release the left stick so you don’t lunge. Slide ([SQ]): emergencies only, never in your own box.' }
];

DATA.boxRules = [
  'Stop sprinting the moment play enters your box. Walk, jockey, stay goal-side.',
  'Cutbacks are the meta chance: ball goes to their winger at the byline? Grab a midfielder and stand on the penalty spot. This one habit erases the most common goal in the game.',
  'Against crosses: switch early to the defender nearest the landing zone, get in front of the runner. Attacking the ball late from behind loses every header.',
  'Let your keeper have anything played across the six-yard box. Wild swings there become own goals.'
];

/* ---------- winning the ball ---------- */
DATA.pressTriggers = [
  { t: 'Bad first touch', d: 'Ball leaves their control — pounce now.' },
  { t: 'Back to your goal', d: 'Receiver can’t see you coming and can’t play forward.' },
  { t: 'Ball near the sideline', d: 'The touchline is a free extra defender.' },
  { t: 'Backward / slow sideways pass', d: 'Ball in transit toward their own goal — step up on the receiver.' }
];

DATA.pressRules = [
  { t: 'Second-man press: the 2-second rule', pad: '[R2]', d: 'Hold [R2] in short 1–2 s bursts to force a decision, then release. Held constantly it drags Rice or a CB out and gift-wraps your middle. Best use: pin them at the sideline while you cut the escape pass.' },
  { t: 'The counter-press window', pad: '5 s', d: 'The 5 s after losing the ball in their half are golden — they’re in attack shape, not build shape. Press with your nearest attacker + a short [R2] burst. Not won in ~5 s? Stop. Retreat. Reform two banks of four. Sanchez, Cahill, McKennie counter-press. Rice never joins.' },
  { t: 'After you win it', pad: '3 s', d: 'First 3 s after winning: they’re most exposed. Check the R9 Runway — on? Go. Not on? One safe pass to Rice or a CB, breathe.' }
];

/* ---------- build-up ---------- */
DATA.buildPhases = [
  {
    t: 'Phase 1 — Out of the back',
    items: [
      'First pass from the GK goes to a CB, never up the middle.',
      'McKennie (DLP) drops toward your CBs — he is the first look, every time. CB → McKennie beats the first line.',
      'Pressed at CB? Never dribble sideways along your own box; the keeper is a legal reset. Pass back, switch sides, restart.',
      'Walk with the ball. Sprint only into visibly open grass.'
    ]
  },
  {
    t: 'Phase 2 — Through the middle',
    items: [
      'Play triangles: every pass should leave two short options. Left: LB–Sanchez–McKennie. Right: Timber–Azkona–Rice.',
      'Up-back-through is the line-breaker: driven pass ([R2]+[X]) into Cahill, first-time layoff to McKennie, McKennie through-ball with the pitch open.',
      'Side crowded? Lofted switch to the far winger — your pressure-release valve.'
    ]
  },
  {
    t: 'Phase 3 — Final third',
    items: [
      'Pick one of the five routes. Nothing on within a few seconds? Back to Rice, restart.',
      'Possession recycled is not progress lost.'
    ]
  }
];

/* ---------- adjustments ---------- */
DATA.adjust = [
  { s: 'Protecting a 1-goal lead (final 10 min)', c: 'Line Height 40, Defensive Approach Deep. Keep the ball in their corner, pass backward freely, no hero balls.' },
  { s: 'Chasing a goal', c: 'Line Height 60–65. McKennie DLP → Box Crasher. Or flip to the 3-4-2-1 preset.' },
  { s: 'They spam wing crosses', c: 'Fullbacks strictly Defend; camp a midfielder on the penalty spot for every cross.' },
  { s: 'They spam through balls', c: 'Line Height down 10, Rice glued to Holding/Defend, cut the central lane with your controlled player.' },
  { s: 'They park the bus', c: 'Patience + Routes 4 and 5. Never force balls into a packed middle; cutbacks and far-post crosses beat low blocks.' },
  { s: 'You’re getting counter-attacked', c: 'You’re over-pressing. Stop holding [R2], concede their half, reform your shape.' }
];

/* ---------- training ---------- */
DATA.training = [
  { day: 'Day 1–2', t: 'Defense only', d: 'Rivals or Squad Battles, graded purely on goals conceded. No slides, no controlling CBs, jockey before every engagement. Losing 1-0 while conceding one is a win this week.' },
  { day: 'Day 3', t: 'Ball recovery', d: 'Count possessions won inside their half. Four press triggers + the 5-second counter-press.' },
  { day: 'Day 4', t: 'Build-up', d: 'Target: zero possession lost in your own third all match. GK reset is your friend.' },
  { day: 'Day 5–6', t: 'Routes', d: 'Pick two routes per match; score only from them. Forcing patterns turns them into reflexes.' },
  { day: 'Day 7', t: 'Full game', d: 'Put it together. Whichever habit collapses under pressure is next week’s Day 1.' }
];

DATA.warmup = [
  '20 driven through balls to a runner',
  '20 far-post driven crosses',
  'One skill move drilled until boring: the ball roll (hold right stick sideways) — enough to shift the ball for a shot or pass'
];

DATA.settings = [
  'Right-stick switching → Player Relative: you choose who you switch to; the game stops choosing badly for you.',
  'Trainer overlay ON for a week if you’re still fumbling buttons.'
];

/* ---------- mistakes ---------- */
DATA.mistakes = [
  { m: 'Holding sprint everywhere', f: 'Turns dribbling and defending to concrete. Sprint only into open grass, in bursts.' },
  { m: 'Tackling attackers who are facing you', f: 'That’s how you get skilled past. Jockey and wait for a trigger: heavy touch, turned back, speed into your radius.' },
  { m: 'Manually controlling center backs', f: 'CBs are AI walls. Control Rice or McKennie instead; the wall stays whole.' },
  { m: 'Holding second-man press 10+ seconds', f: '[R2] in 2-second bursts. Held press drags Rice or a CB out and opens your middle.' },
  { m: 'Sliding inside your own box', f: 'Emergencies on the wing only. In the box it’s a penalty waiting to happen.' },
  { m: 'Forcing through balls into a crowded middle', f: 'Switch play instead. The lofted switch is your pressure-release valve.' },
  { m: 'Floating crosses', f: 'Drive them far post ([R2]+[O]). Cahill deserves better.' },
  { m: 'Dribbling out of defense with Marquinhos', f: 'Pass out. CB → McKennie is the route. Keeper is the reset.' },
  { m: 'Refusing the back pass when the attack dies', f: 'Recycling is not failure. Back to Rice, restart, go again.' },
  { m: 'Never changing tactics mid-match', f: 'The Adjust tab exists. Use the D-pad.' }
];

/* ============ route animations ============ */
/* Actors: id (player key), from {x,y}. Steps: run / pass / carry / flash.
   t in ms on a shared timeline. Red = opponents (id starts with 'D'). */

DATA.routes = [
  {
    id: 'r1', n: 1, name: 'The R9 Runway', tag: 'vs high lines',
    pad: '[L1] run · [TR] or [R2]+[TR]',
    desc: 'Your kill shot against high lines. Trigger R9’s run, then hit a (driven) through ball into the channel between CB and fullback. One touch, finish. If they keep a high line all match, run this until they drop — then switch routes.',
    coach: [
      [0,    'McKennie on the ball. Opponent holds a <b>high line</b> — the grass behind them is the runway.'],
      [900,  'Trigger the run: <b>[L1]</b>. R9 attacks the CB–fullback channel.'],
      [1800, 'Through ball <b>[TR]</b> (driven: [R2]+[TR]) into the channel — weight it into space, not feet.'],
      [3300, 'One touch out of the run…'],
      [4100, '<b>Finish.</b> [SQ] low near post — or curl the far corner with <b>[R2]+[SQ]</b> finesse.']
    ],
    actors: [
      { id: 'MCK',  x: 300, y: 640 }, { id: 'R9', x: 360, y: 400 },
      { id: 'CAH',  x: 200, y: 520 }, { id: 'AZK', x: 590, y: 470 },
      { id: 'D1', x: 250, y: 330 }, { id: 'D2', x: 430, y: 330 }, { id: 'D3', x: 580, y: 350 }, { id: 'D4', x: 110, y: 350 }
    ],
    ball: { holder: 'MCK' },
    steps: [
      { type: 'run',  actor: 'R9',  t0: 900,  t1: 2600, to: { x: 470, y: 150 }, curve: .18 },
      { type: 'run',  actor: 'D2',  t0: 1900, t1: 3000, to: { x: 470, y: 220 } },
      { type: 'pass', from: 'MCK', t0: 1800, t1: 2700, to: { x: 468, y: 210 }, driven: true },
      { type: 'carry', actor: 'R9', t0: 2700, t1: 3900, to: { x: 420, y: 60 }, withBall: true },
      { type: 'shot', from: 'R9', t0: 4000, t1: 4350, to: { x: 310, y: 8 } },
      { type: 'goal', t0: 4350 }
    ],
    dur: 5000
  },
  {
    id: 'r2', n: 2, name: 'The Cahill Air Raid', tag: 'far post',
    pad: '[R2]+[O] early driven cross',
    desc: 'Azkona (or overlapping Timber) wide past midfield, early driven cross to the far post. Cahill’s Shadow Striker run arrives exactly there — no fullback in the game beats him in the air. Corner routine: beyond the far post, powered, Cahill head.',
    coach: [
      [0,    'Azkona wide right, past their midfield. Width is the whole point.'],
      [1000, 'Don’t wait — <b>early driven cross</b> ([R2]+[O]) aimed <b>beyond the far post</b>.'],
      [2100, 'Cahill ghosts in late from the CAM slot — watch the far-post run.'],
      [3400, '<b>Header.</b> No fullback beats him in the air. Goal.']
    ],
    actors: [
      { id: 'AZK', x: 600, y: 430 }, { id: 'CAH', x: 330, y: 430 },
      { id: 'R9',  x: 300, y: 250 }, { id: 'SAN', x: 140, y: 380 },
      { id: 'D1', x: 260, y: 200 }, { id: 'D2', x: 420, y: 210 }, { id: 'D3', x: 555, y: 260 }
    ],
    ball: { holder: 'AZK' },
    steps: [
      { type: 'carry', actor: 'AZK', t0: 200, t1: 1200, to: { x: 620, y: 300 }, withBall: true },
      { type: 'run',  actor: 'CAH', t0: 1100, t1: 3100, to: { x: 205, y: 105 }, curve: -.15 },
      { type: 'run',  actor: 'R9',  t0: 1300, t1: 2900, to: { x: 330, y: 120 } },
      { type: 'run',  actor: 'D1',  t0: 1500, t1: 3000, to: { x: 300, y: 130 } },
      { type: 'pass', from: 'AZK', t0: 1900, t1: 3200, to: { x: 215, y: 115 }, cross: true },
      { type: 'shot', from: 'CAH', t0: 3350, t1: 3700, to: { x: 350, y: 8 } },
      { type: 'goal', t0: 3700 }
    ],
    dur: 4400
  },
  {
    id: 'r3', n: 3, name: 'Up-Back-and-Through', tag: 'line-breaker',
    pad: '[R2]+[X] · layoff · [TR]',
    desc: 'Driven pass into Cahill’s feet in the pocket (shield with [L2] if pressed), first-time layoff back to onrushing McKennie, first-time through ball to the other forward’s run. Abuses defenders who step out to follow the first pass.',
    coach: [
      [0,    '<b>UP:</b> driven pass ([R2]+[X]) into Cahill’s feet in the pocket. Shield with [L2] if pressed.'],
      [1300, 'The CB steps out to follow Cahill — that’s the trap springing.'],
      [1900, '<b>BACK:</b> first-time layoff to onrushing McKennie.'],
      [2900, '<b>THROUGH:</b> first-time ball ([TR]) into R9’s run through the vacated space.'],
      [4300, '<b>Finish.</b> The stepping CB never recovers.']
    ],
    actors: [
      { id: 'MCK', x: 300, y: 660 }, { id: 'CAH', x: 340, y: 400 },
      { id: 'R9', x: 430, y: 300 }, { id: 'SAN', x: 130, y: 420 },
      { id: 'D1', x: 330, y: 270 }, { id: 'D2', x: 480, y: 260 }, { id: 'D3', x: 180, y: 270 }
    ],
    ball: { holder: 'MCK' },
    steps: [
      { type: 'pass', from: 'MCK', t0: 300, t1: 1150, to: 'CAH', driven: true },
      { type: 'run',  actor: 'D1', t0: 1200, t1: 2100, to: { x: 345, y: 350 } },
      { type: 'run',  actor: 'MCK', t0: 1300, t1: 2800, to: { x: 320, y: 520 } },
      { type: 'pass', from: 'CAH', t0: 1950, t1: 2750, to: { x: 322, y: 528 } },
      { type: 'run',  actor: 'R9', t0: 2500, t1: 4200, to: { x: 400, y: 110 }, curve: .12 },
      { type: 'pass', from: 'MCK', t0: 2950, t1: 3950, to: { x: 395, y: 145 }, driven: true },
      { type: 'shot', from: 'R9', t0: 4300, t1: 4650, to: { x: 330, y: 8 } },
      { type: 'goal', t0: 4650 }
    ],
    dur: 5400
  },
  {
    id: 'r4', n: 4, name: 'Overload to Isolate', tag: 'vs packed sides',
    pad: 'triangle left · lofted switch',
    desc: 'Build deliberately down the left with the Sanchez–LB–McKennie triangle until three or four defenders drag over. Then one switch to Azkona: 1v1 in acres. He beats his man to the byline (feeds Route 5) or draws the CB (opens Route 2’s far post).',
    coach: [
      [0,    'Cycle the left triangle: <b>LB → Sanchez → McKennie</b>. Patience is the weapon.'],
      [2500, 'Watch the red shirts <b>drag left</b> — three, four defenders overloading the ball side.'],
      [4200, 'Now: one <b>lofted switch</b> to Azkona on the far touchline.'],
      [5600, '<b>1v1 in acres.</b> Byline feeds Route 5; drawing the CB opens Route 2’s far post.']
    ],
    actors: [
      { id: 'LB', x: 110, y: 620 }, { id: 'SAN', x: 150, y: 450 }, { id: 'MCK', x: 260, y: 560 },
      { id: 'AZK', x: 615, y: 430 }, { id: 'R9', x: 360, y: 280 },
      { id: 'D1', x: 250, y: 420 }, { id: 'D2', x: 360, y: 430 }, { id: 'D3', x: 470, y: 420 }, { id: 'D4', x: 300, y: 300 }
    ],
    ball: { holder: 'LB' },
    steps: [
      { type: 'pass', from: 'LB', t0: 300, t1: 1000, to: 'SAN' },
      { type: 'run', actor: 'D1', t0: 700, t1: 1900, to: { x: 200, y: 430 } },
      { type: 'run', actor: 'D2', t0: 900, t1: 2200, to: { x: 280, y: 460 } },
      { type: 'pass', from: 'SAN', t0: 1500, t1: 2200, to: 'MCK' },
      { type: 'run', actor: 'D3', t0: 1900, t1: 3300, to: { x: 340, y: 440 } },
      { type: 'pass', from: 'MCK', t0: 2700, t1: 3400, to: 'LB' },
      { type: 'run', actor: 'D4', t0: 2900, t1: 4100, to: { x: 250, y: 330 } },
      { type: 'pass', from: 'LB', t0: 3800, t1: 4300, to: 'MCK' },
      { type: 'pass', from: 'MCK', t0: 4400, t1: 5700, to: 'AZK', cross: true },
      { type: 'carry', actor: 'AZK', t0: 5800, t1: 7000, to: { x: 640, y: 200 }, withBall: true },
      { type: 'flash', t0: 6900, at: { x: 610, y: 250 }, label: '1v1' }
    ],
    dur: 7600
  },
  {
    id: 'r5', n: 5, name: 'Cutback Cash', tag: 'highest %',
    pad: 'byline · low pull-back',
    desc: 'Reach the byline with any wide player. Don’t shoot the tight angle — pull it back low to the penalty spot. Cahill, Sanchez and McKennie all attack that zone. The highest-percentage chance in the game; in doubt near the byline, this is the answer.',
    coach: [
      [0,    'Azkona drives to the <b>byline</b>. The tight-angle shot is a donation — don’t.'],
      [1600, 'Cahill, Sanchez, McKennie flood the <b>penalty-spot zone</b>.'],
      [2600, '<b>Low cutback</b> to the spot — away from the keeper, into the runners.'],
      [3800, 'Cahill arrives first. <b>[SQ] side-foot. Goal.</b> Highest-percentage chance in the game.']
    ],
    actors: [
      { id: 'AZK', x: 590, y: 300 }, { id: 'CAH', x: 360, y: 350 },
      { id: 'SAN', x: 210, y: 330 }, { id: 'MCK', x: 330, y: 480 },
      { id: 'D1', x: 300, y: 190 }, { id: 'D2', x: 430, y: 200 }, { id: 'D3', x: 540, y: 230 }
    ],
    ball: { holder: 'AZK' },
    steps: [
      { type: 'carry', actor: 'AZK', t0: 200, t1: 2400, to: { x: 640, y: 45 }, withBall: true, curve: .1 },
      { type: 'run', actor: 'CAH', t0: 1500, t1: 3400, to: { x: 340, y: 155 } },
      { type: 'run', actor: 'SAN', t0: 1700, t1: 3500, to: { x: 250, y: 175 } },
      { type: 'run', actor: 'MCK', t0: 1800, t1: 3600, to: { x: 380, y: 230 } },
      { type: 'run', actor: 'D3', t0: 1500, t1: 2600, to: { x: 600, y: 90 } },
      { type: 'pass', from: 'AZK', t0: 2700, t1: 3600, to: { x: 345, y: 160 } },
      { type: 'shot', from: 'CAH', t0: 3750, t1: 4050, to: { x: 355, y: 8 } },
      { type: 'goal', t0: 4050 }
    ],
    dur: 4800
  }
];

/* ---------- defend demo animations (half pitch reuse) ---------- */
DATA.defDemos = [
  {
    id: 'jockey', name: 'Jockey & herd to the sideline', pad: '[L2] + [R1]',
    coach: [
      [0, 'Attacker (red) on the ball. You control Rice — <b>not a CB</b>.'],
      [800, 'Hold <b>[L2]</b>: stay a meter off, goal-side. Angle your body to show him the <b>sideline</b>.'],
      [2600, 'He takes the bait wide. Keep herding — no tackle yet.'],
      [4200, 'Heavy touch near the line — <b>trigger!</b> Shoulder challenge ([X]). Ball won.']
    ],
    actors: [
      { id: 'RICE', x: 380, y: 560 }, { id: 'MARQ', x: 430, y: 830 }, { id: 'ACE', x: 250, y: 830 },
      { id: 'D1', x: 420, y: 430 }
    ],
    ball: { holder: 'D1' },
    steps: [
      { type: 'run', actor: 'RICE', t0: 400, t1: 1400, to: { x: 440, y: 500 } },
      { type: 'carry', actor: 'D1', t0: 1500, t1: 3400, to: { x: 590, y: 560 }, withBall: true, curve: -.12 },
      { type: 'run', actor: 'RICE', t0: 1500, t1: 3400, to: { x: 560, y: 640 } },
      { type: 'carry', actor: 'D1', t0: 3500, t1: 4400, to: { x: 640, y: 640 }, withBall: true },
      { type: 'run', actor: 'RICE', t0: 3500, t1: 4600, to: { x: 625, y: 665 } },
      { type: 'flash', t0: 4400, at: { x: 645, y: 620 }, label: '✕' },
      { type: 'steal', t0: 4650, actor: 'RICE' }
    ],
    dur: 5400
  },
  {
    id: 'cutback', name: 'Kill the cutback', pad: 'switch + penalty spot',
    coach: [
      [0, 'Their winger reaches the <b>byline</b>. The cutback to the spot is coming — it’s the meta goal.'],
      [1200, 'Don’t chase the ball. <b>Switch to McKennie</b> and stand him on the <b>penalty spot</b>.'],
      [2800, 'Cutback comes… and dies. Your body is on the pass line.'],
      [4000, '<b>Intercepted.</b> One habit, most common goal in the game erased.']
    ],
    actors: [
      { id: 'MCK', x: 300, y: 520 }, { id: 'RICE', x: 430, y: 560 },
      { id: 'MARQ', x: 400, y: 800 }, { id: 'ACE', x: 260, y: 800 },
      { id: 'D1', x: 600, y: 870 }, { id: 'D2', x: 340, y: 700 }
    ],
    ball: { holder: 'D1' },
    steps: [
      { type: 'carry', actor: 'D1', t0: 300, t1: 1500, to: { x: 645, y: 990 }, withBall: true },
      { type: 'run', actor: 'MCK', t0: 1300, t1: 2700, to: { x: 340, y: 880 }, curve: .1 },
      { type: 'run', actor: 'D2', t0: 1600, t1: 2900, to: { x: 330, y: 850 } },
      { type: 'pass', from: 'D1', t0: 2900, t1: 3800, to: { x: 345, y: 872 } },
      { type: 'steal', t0: 3850, actor: 'MCK' },
      { type: 'flash', t0: 3850, at: { x: 340, y: 830 }, label: 'CUT!' }
    ],
    dur: 4800
  }
];

/* ---------- build-up demo ---------- */
DATA.buildDemo = {
  id: 'firstline', name: 'Phase 1: GK → CB → McKennie', pad: 'the first look',
  coach: [
    [0, 'GK has it. First pass to a <b>CB</b> — never up the middle.'],
    [1300, 'McKennie’s DLP role pulls him <b>toward the CBs</b>, between their strikers.'],
    [2600, 'CB → McKennie. <b>First line beaten.</b> Two red pressers now behind the ball.'],
    [4000, 'Pressed instead? <b>Keeper is the reset.</b> Back, switch sides, restart. A back pass that keeps the ball beats a forward pass that loses it.']
  ],
  actors: [
    { id: 'GK', x: 340, y: 985 }, { id: 'MARQ', x: 440, y: 850 }, { id: 'ACE', x: 240, y: 850 },
    { id: 'MCK', x: 280, y: 640 }, { id: 'RICE', x: 430, y: 680 },
    { id: 'D1', x: 300, y: 760 }, { id: 'D2', x: 420, y: 770 }
  ],
  ball: { holder: 'GK' },
  steps: [
    { type: 'pass', from: 'GK', t0: 400, t1: 1200, to: 'ACE' },
    { type: 'run', actor: 'MCK', t0: 1300, t1: 2500, to: { x: 250, y: 730 } },
    { type: 'run', actor: 'D1', t0: 1500, t1: 2500, to: { x: 275, y: 800 } },
    { type: 'pass', from: 'ACE', t0: 2600, t1: 3400, to: { x: 252, y: 738 } },
    { type: 'run', actor: 'MCK', t0: 3500, t1: 4600, to: { x: 320, y: 620 }, withBall: true },
    { type: 'flash', t0: 3450, at: { x: 250, y: 690 }, label: 'LINE 1 ✓' }
  ],
  dur: 5200
};

window.DATA = DATA;
