/* ============ FC 26 Playbook — content + coordinates ============ */
/* Pitch space: 680 x 1050, attacking toward y=0 (top). */

const DATA = {};

/* ---------- squad & formations ---------- */
DATA.players = {
  SUZ:    { name: 'Suzuki',      short: 'Suzuki',  ovr: 96, pos: 'GK',  role: 'Sweeper Keeper · Balanced',  note: 'Your back four cannot run, so the keeper is your recovery pace. He steps out to kill anything played into the channel behind Baresi. Accept the occasional chip — it costs less than the footraces you would otherwise lose.' },
  LUB:    { name: 'Lubhbrer',    short: 'Lubhbrer',ovr: 95, pos: 'LB',  role: 'Falseback · Defend',         note: 'Tucks inside next to Beckenbauer in possession, which leaves the whole left touchline to Neymar and gives you a 3-2 rest defence. Not an overlapping fullback: if you want a left overlap you do it manually and accept the exposure.' },
  BARESI: { name: 'Baresi',      short: 'Baresi',  ovr: 94, pos: 'CB',  role: 'Defender · Defend',          note: 'Pure cover. Holds the line behind Caleta-Car and reads the through ball instead of stepping into duels. Never send him out on a second-man press.' },
  CALETA: { name: 'Caleta-Car',  short: 'Caleta',  ovr: 95, pos: 'CB',  role: 'Stopper · Defend',           note: 'The only aerial body you own, so he is the one who steps into their striker and contests first contact. Switch to him manually before every long ball and every corner in your box.' },
  CAFU:   { name: 'Cafu',        short: 'Cafu',    ovr: 94, pos: 'RB',  role: 'Wingback · Balanced',        note: 'Supplies all the width on the right because Athenea comes inside. His job ends at the byline with a ground cross or a pull-back. He should never hit a high cross for this front line.' },
  BECK:   { name: 'Beckenbauer', short: 'Beckenb', ovr: 94, pos: 'CDM', role: 'Holding · Defend',           note: 'Screens both centre-backs and does not leave the lane in front of them. Against a low block that refuses to come out, switch him to Deep-Lying Playmaker · Defend so he steps in to circulate. Against pace up front, leave him Holding.' },
  ABILY:  { name: 'Abily',       short: 'Abily',   ovr: 98, pos: 'CM',  role: 'Playmaker · Attack',         note: 'The fulcrum. Starts left of centre and lives between the lines, so everything either comes off Abily or comes back to Abily after the up-back. Also your first arrival at the top of the D on every cutback, so never drag this role into the six-yard box.' },
  PARK:   { name: 'Park',        short: 'Park',    ovr: 96, pos: 'CM',  role: 'Box To Box · Balanced',      note: 'The runner and the second-ball collector. Makes the late arrival into the box that a Players in Box setting of 3 depends on, and underlaps inside Athenea when Cafu goes outside.' },
  NEY:    { name: 'Neymar',      short: 'Neymar',  ovr: 97, pos: 'LW',  role: 'Winger · Attack',            note: 'Permanent isolation. Holds the touchline, receives the switch with the fullback alone in front, then goes inside for the finesse or to the byline for the pull-back. Do not overlap him — the empty space is the whole point.' },
  WISSA:  { name: 'Wissa',       short: 'Wissa',   ovr: 93, pos: 'ST',  role: 'False 9 · Balanced',         note: 'Drops off the last line to pull a centre-back out and open the channel for the wingers and Park. Swap to Advanced Forward · Attack only against a high line, where mobility in behind is worth more than presence in front.' },
  ATH:    { name: 'Athenea',     short: 'Athenea', ovr: 95, pos: 'RW',  role: 'Inside Forward · Balanced',  note: 'Attacks the right half-space and the back post on the ground while Cafu takes the outside lane. The finishes are the near-post arrival and the first-time shot off a cutback, never a header.' },
  RONNIE: { name: 'Ronaldinho',  short: 'Ronaldinho', ovr: 95, pos: 'SUB', role: 'Inside Forward',          note: 'Bench. On for Neymar or Athenea when you need someone who can beat a tired fullback alone and hold the ball in the corner.' },
  MASTA:  { name: 'Mastantuono', short: 'Mastantuono', ovr: 95, pos: 'SUB', role: 'Winger',                 note: 'Bench. Fresh legs wide around the 70th minute, against a fullback already in the amber.' },
  PELE:   { name: 'Pele',        short: 'Pele',    ovr: 95, pos: 'SUB', role: 'Forward',                    note: 'Bench. Chasing a game, he plays alongside Wissa rather than instead of him.' },
  FACC:   { name: 'Jacinto',     short: 'Jacinto', ovr: 94, pos: 'SUB', role: 'Fullback',                   note: 'Bench. Defensive cover for either flank, and the sub that closes out a one-goal lead.' }
};

DATA.formations = {
  '433': {
    label: '4-3-3 (CDM) · Your shape',
    desc: 'One holding midfielder behind two eights, with three forwards stretching the pitch. Beckenbauer screens the back four alone, Abily creates between the lines, Park runs beyond. Everything about this squad is technical, so the shape exists to create passing triangles rather than crossing positions.',
    spots: [
      { id: 'SUZ',    x: 340, y: 985 },
      { id: 'LUB',    x: 92,  y: 845 },
      { id: 'BARESI', x: 252, y: 868 },
      { id: 'CALETA', x: 428, y: 868 },
      { id: 'CAFU',   x: 588, y: 845 },
      { id: 'BECK',   x: 340, y: 715 },
      { id: 'ABILY',  x: 222, y: 580 },
      { id: 'PARK',   x: 458, y: 580 },
      { id: 'NEY',    x: 92,  y: 395 },
      { id: 'WISSA',  x: 340, y: 330 },
      { id: 'ATH',    x: 588, y: 395 }
    ]
  },
  '4231': {
    label: '4-2-3-1 · Plan B (D-pad preset)',
    desc: 'Same eleven, different balance. Beckenbauer and Park form a double pivot, Abily moves up behind Wissa. Use it when you are being overrun in midfield or when you want Abily closer to the box while chasing a game.',
    spots: [
      { id: 'SUZ',    x: 340, y: 985 },
      { id: 'LUB',    x: 92,  y: 845 },
      { id: 'BARESI', x: 252, y: 868 },
      { id: 'CALETA', x: 428, y: 868 },
      { id: 'CAFU',   x: 588, y: 845 },
      { id: 'BECK',   x: 252, y: 700 },
      { id: 'PARK',   x: 428, y: 700 },
      { id: 'NEY',    x: 105, y: 515 },
      { id: 'ABILY',  x: 340, y: 545 },
      { id: 'ATH',    x: 575, y: 515 },
      { id: 'WISSA',  x: 340, y: 360 }
    ]
  }
};

DATA.identity = 'This is a combination side, not a crossing side. Every attacker you own is quick over three yards, receives cleanly with a defender on his back, and loses every contested header, so the ball has to enter the box on the ground and through a third man. Play third-man football in the half-spaces: pass past the block instead of over it, and finish from the cutback and the top of the D.';

DATA.strengths = [
  'Nobody presses you into a mistake. Abily, Neymar, Athenea, Park and Ronaldinho all receive facing their own goal and turn out of contact, so the Top-50 habit of second-man press plus a jumping fullback just feeds your give-and-go [L1]+[X].',
  'You defend by reading, not chasing. Baresi and Beckenbauer win first contact standing still. Hold [L2] and stay in the passing lane instead of lunging and you take the ball without ever needing recovery pace.',
  'Two different attacking sides inside one shape. Cafu plus Athenea plus Park is a real three-man overload on the right, while Neymar plus an empty touchline is a permanent isolation on the left, so one switch changes the problem the opponent is solving.',
  'The bench extends the same idea instead of changing it. Ronaldinho and Mastantuono come on at minute 70 to keep the ball in tight areas without you touching a single instruction.'
];

DATA.weaknesses = [
  'Aerial presence is one man. Caleta-Car wins headers, nobody else in the eleven does. Every contested ball in either box is a coin flip you lose.',
  'No hold-up play. Wissa cannot pin a centre-back and wait, so anything you clear long comes straight back onto a back four that cannot run.',
  'The back four loses every straight footrace. Baresi and Beckenbauer read the pass but cannot chase the runner, which caps your line height and your press.',
  'One channel of the pitch is dead. You will not score from a whipped cross, so an opponent who defends the box narrowly and sits off forces you to be perfect in the half-spaces.'
];

DATA.tactics = [
  { k: 'Build-Up Style', v: 'Short Passing', why: 'Pulls Park and the near winger inside ten yards of the ball, so the wall pass and the third-man ball are always on. Long Ball feeds a mobile 93 forward into two centre-backs who out-jump him — a turnover every time.' },
  { k: 'Defensive Approach', v: 'Balanced, never Aggressive Press', why: 'Aggressive Press drags Baresi and Caleta-Car out of the back line, and you have nothing behind them that survives it. Press manually with the front three and Park, and leave the shape intact behind the ball.' },
  { k: 'Line Height', v: '50–55 (drop to 40 with a late lead)', why: 'High enough to keep their build-up honest, low enough that a lobbed ball over the top is a covered pass rather than a footrace Baresi loses. Every point above 60 is a goal conceded in behind.' },
  { k: 'Width', v: '60', why: 'Keeps Neymar and Athenea on the touchline before they receive, so they attack the fullback facing goal instead of starting in the crowded middle. Narrower and your whole attack ends up in the twelve yards you are worst at.' },
  { k: 'Players in Box', v: '3', why: 'You win nothing that arrives in the air, so extra bodies in the six-yard box are wasted and they cost you the counter. Three inside, everyone else at the top of the D for cutbacks and second balls.' },
  { k: 'Corners / Free Kicks', v: '2 and 2', why: 'You do not win a contested header, so sending four forward only buys the opponent a counter into two centre-backs who cannot run.' },
  { k: 'Second saved preset', v: 'Counter · Depth 40 · Box 2', why: 'Swap to it at the pause menu once you go a goal up. You protect a lead better by keeping Neymar high as a counter outlet than by adding another body to a box you cannot defend in the air.' }
];

/* ---------- laws ---------- */
DATA.laws = [
  { t: 'Delay beats tackle', d: 'Slow the attack until help arrives — don’t try to steal instantly. Most goals you concede start with a lunge you didn’t need to make.' },
  { t: 'Defend with midfielders', d: 'Beckenbauer and Abily chase. Caleta-Car, Baresi and Cafu hold the line. Pulling a CB out of the back line is the #1 cause of conceding.' },
  { t: 'The ball is faster than any player', d: 'Pass out of pressure, pass into space. Sprint dribbling into traffic loses the ball; a two-pass combination doesn’t.' },
  { t: 'Every attack has a target', d: 'Three targets: the winger’s run into the channel Wissa just vacated, the cutback to the penalty spot, and the ball laid back to the top of the D. Nothing in the air. None on? Recycle and go again.' },
  { t: 'Stamina is a tactic', d: 'Bursts of press, not constant press. Bursts of sprint, not held sprint. The player with legs in minute 80 wins minute 85.' }
];

/* ---------- defending steps ---------- */
DATA.defendSteps = [
  { t: 'Pick the right player', pad: 'R-stick flick', d: 'Flick the right stick toward the ball to switch. Take Beckenbauer or Abily — never a center back. CBs are AI walls; move one manually and the wall has a hole.' },
  { t: 'Cut the lane, don’t chase', pad: 'position', d: 'Put your controlled midfielder between the ball and the most dangerous pass (into their striker’s feet, or in behind). Attacks die when the pass they wanted isn’t there.' },
  { t: 'Jockey when you engage', pad: '[L2] hold · [R1] burst', d: 'Hold [L2] about a meter off the attacker. Add [R1] sprint-jockey if they’re quick. Angle your body — show them to the sideline or weak foot, away from the middle. Herd, don’t tackle.' },
  { t: 'Tackle only on a trigger', pad: 'wait for it', d: 'Heavy touch. Back or side turned to you. They enter your jockey radius at speed. NEVER tackle an attacker facing you square with the ball close — that’s how you get skilled past.' },
  { t: 'Choose the right tackle', pad: '[X] · [SQ] · [O]', d: 'Fight for the ball ([X] side-by-side): bread and butter, almost never a foul. Stand tackle ([SQ]): short tap from the jockey when a trigger appears — release the left stick so you don’t lunge. Slide ([O]): emergencies only, never in your own box.' }
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
  { t: 'Second-man press: the 2-second rule', pad: '[R2]', d: 'Hold [R2] in short 1–2 s bursts to force a decision, then release. Held constantly it drags Beckenbauer or a CB out and gift-wraps your middle. Best use: pin them at the sideline while you cut the escape pass.' },
  { t: 'The counter-press window', pad: '5 s', d: 'The 5 s after losing the ball in their half are golden — they’re in attack shape, not build shape. Press with your nearest attacker + a short [R2] burst. Not won in ~5 s? Stop. Retreat. Reform two banks of four. Neymar, Park, Abily counter-press. Beckenbauer never joins.' },
  { t: 'After you win it', pad: '3 s', d: 'First 3 s after winning: they’re most exposed. Check the Wissa Runway — on? Go. Not on? One safe pass to Beckenbauer or a CB, breathe.' }
];

/* ---------- build-up ---------- */
DATA.buildPhases = [
  {
    t: 'Phase 1 — Out of the back',
    items: [
      'First pass from the GK goes to a CB, never up the middle.',
      'Abily (DLP) drops toward your CBs — he is the first look, every time. CB → Abily beats the first line.',
      'Pressed at CB? Never dribble sideways along your own box; the keeper is a legal reset. Pass back, switch sides, restart.',
      'Walk with the ball. Sprint only into visibly open grass.'
    ]
  },
  {
    t: 'Phase 2 — Through the middle',
    items: [
      'Play triangles: every pass should leave two short options. Left: LB–Neymar–Abily. Right: Cafu–Athenea–Beckenbauer.',
      'Up-back-through is the line-breaker: driven pass ([R2]+[X]) into Park, first-time layoff to Abily, Abily through-ball with the pitch open.',
      'Side crowded? Lofted switch to the far winger — your pressure-release valve.'
    ]
  },
  {
    t: 'Phase 3 — Final third',
    items: [
      'Pick one of the five routes. Nothing on within a few seconds? Back to Beckenbauer, restart.',
      'Possession recycled is not progress lost.'
    ]
  }
];

/* ---------- adjustments ---------- */
DATA.adjust = [
  { s: 'Protecting a 1-goal lead (final 10 min)', c: 'Line Height 40, Defensive Approach Deep. Keep the ball in their corner, pass backward freely, no hero balls.' },
  { s: 'Chasing a goal', c: 'Line Height 60–65. Abily DLP → Box Crasher. Or flip to the 3-4-2-1 preset.' },
  { s: 'They spam wing crosses', c: 'Fullbacks strictly Defend; camp a midfielder on the penalty spot for every cross.' },
  { s: 'They spam through balls', c: 'Line Height down 10, Beckenbauer glued to Holding/Defend, cut the central lane with your controlled player.' },
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
  { m: 'Manually controlling center backs', f: 'CBs are AI walls. Control Beckenbauer or Abily instead; the wall stays whole.' },
  { m: 'Holding second-man press 10+ seconds', f: '[R2] in 2-second bursts. Held press drags Beckenbauer or a CB out and opens your middle.' },
  { m: 'Sliding inside your own box', f: 'Emergencies on the wing only. In the box it’s a penalty waiting to happen.' },
  { m: 'Forcing through balls into a crowded middle', f: 'Switch play instead. The lofted switch is your pressure-release valve.' },
  { m: 'Crossing to the far post at all', f: 'Nobody in this front line wins a header. Ground cross ([L1]+[O]) across the six, or pull it back to the penalty spot.' },
  { m: 'Dribbling out of defense with Caleta-Car', f: 'Pass out. CB → Abily is the route. Keeper is the reset.' },
  { m: 'Refusing the back pass when the attack dies', f: 'Recycling is not failure. Back to Beckenbauer, restart, go again.' },
  { m: 'Never changing tactics mid-match', f: 'The Adjust tab exists. Use the D-pad.' }
];

/* ============ route animations ============ */
/* Actors: id (player key), from {x,y}. Steps: run / pass / carry / flash.
   t in ms on a shared timeline. Red = opponents (id starts with 'D'). */

DATA.routes = [
  {
    id: 'r1', n: 1, name: 'The Blindside Runway', tag: 'vs high lines',
    pad: '[L1] run · [TR] or [R2]+[TR]',
    desc: 'Wissa drops off the last line as a False 9 and takes a centre-back with him. The gap he leaves is not for him — it is for the far winger arriving from the blindside. Trigger that run and drive the through ball into the channel. Your winger is running at a fullback rather than a centre-back, and arrives facing goal.',
    coach: [
      [0,    'Abily on the ball. Opponent holds a <b>high line</b> — the grass behind them is the runway.'],
      [900,  'Wissa drops in and drags a centre-back with him. Now trigger the <b>far winger</b> with <b>[L1]</b> into the gap he just opened.'],
      [1800, '<b>[L1] up first</b>, then <b>[TR]</b> — driven [R2]+[TR] if the covering centre-back has pace. Into the space, never at his feet.'],
      [3300, 'One touch out of the run…'],
      [4100, '<b>Finish.</b> [SQ] low near post — or curl the far corner with <b>[R2]+[SQ]</b> finesse.']
    ],
    actors: [
      { id: 'ABILY',  x: 300, y: 640 }, { id: 'WISSA', x: 360, y: 400 },
      { id: 'PARK',  x: 200, y: 520 }, { id: 'ATH', x: 590, y: 470 },
      { id: 'D1', x: 250, y: 330 }, { id: 'D2', x: 430, y: 330 }, { id: 'D3', x: 580, y: 350 }, { id: 'D4', x: 110, y: 350 }
    ],
    ball: { holder: 'ABILY' },
    steps: [
      { type: 'run',  actor: 'WISSA', t0: 500,  t1: 1900, to: { x: 372, y: 520 } },
      { type: 'run',  actor: 'D2',    t0: 800,  t1: 2100, to: { x: 424, y: 452 } },
      { type: 'flash', t0: 1500, at: { x: 470, y: 330 }, label: 'GAP' },
      { type: 'run',  actor: 'ATH',   t0: 900,  t1: 3000, to: { x: 468, y: 150 }, curve: .16 },
      { type: 'run',  actor: 'D3',    t0: 2100, t1: 3100, to: { x: 496, y: 244 } },
      { type: 'pass', from: 'ABILY',  t0: 1800, t1: 2900, to: { x: 470, y: 206 }, driven: true },
      { type: 'carry', actor: 'ATH',  t0: 3000, t1: 4000, to: { x: 424, y: 62 }, withBall: true },
      { type: 'shot', from: 'ATH',    t0: 4100, t1: 4450, to: { x: 312, y: 8 } },
      { type: 'goal', t0: 4450 }
    ],
    dur: 5200
  },
  {
    id: 'r2', n: 2, name: 'Far-Post Ground Raid', tag: 'the cross that suits you',
    pad: '[L1]+[O] ground cross',
    desc: 'You have no aerial threat, so stop crossing into the air — a floated ball at the far post is a turnover followed by a counter into two centre-backs who cannot run. Get to the byline instead and roll it hard across the face of the six-yard box. The ball runs past the near defender and past the keeper to Athenea or Park arriving at the back post on the floor.',
    why: 'Keepers cannot claim a ball travelling across them on the ground, and a defender facing his own goal cannot clear it safely. This is the aerial route rebuilt for a squad that wins nothing in the air.',
    coach: [
      [0,    'Athenea wide right, past their midfield. Do not cross from here — <b>get to the byline first</b>.'],
      [1200, 'Byline reached. The keeper is now committed to his near post and cannot come across.'],
      [2000, '<b>Ground cross [L1]+[O]</b>, hard, across the face of the six. Not lifted — never lifted.'],
      [3100, 'It runs past the near defender, past the keeper, and Park is arriving at the <b>back post</b>.'],
      [3800, 'Tap it in. Every contact on that ball is a goal.']
    ],
    actors: [
      { id: 'ATH', x: 600, y: 430 }, { id: 'PARK', x: 330, y: 430 },
      { id: 'WISSA',  x: 300, y: 250 }, { id: 'NEY', x: 140, y: 380 },
      { id: 'D1', x: 260, y: 200 }, { id: 'D2', x: 420, y: 210 }, { id: 'D3', x: 555, y: 260 },
      { id: 'D5', x: 340, y: 28 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'carry', actor: 'ATH', t0: 200, t1: 1900, to: { x: 612, y: 96 }, withBall: true },
      { type: 'run',  actor: 'D3',  t0: 400, t1: 1900, to: { x: 580, y: 140 } },
      { type: 'run',  actor: 'WISSA', t0: 1400, t1: 3000, to: { x: 316, y: 70 } },
      { type: 'run',  actor: 'D1',  t0: 1600, t1: 3000, to: { x: 296, y: 84 } },
      { type: 'run',  actor: 'PARK', t0: 1700, t1: 3600, to: { x: 236, y: 96 } },
      { type: 'pass', from: 'ATH', t0: 2000, t1: 3400, to: { x: 234, y: 92 }, driven: true },
      { type: 'flash', t0: 3100, at: { x: 300, y: 60 }, label: 'ON THE FLOOR' },
      { type: 'shot', from: 'PARK', t0: 3800, t1: 4100, to: { x: 320, y: 8 } },
      { type: 'goal', t0: 4100 }
    ],
    dur: 4900
  },
  {
    id: 'r3', n: 3, name: 'Up-Back-and-Through', tag: 'line-breaker',
    pad: '[R2]+[X] · layoff · [TR]',
    desc: 'Driven pass into Park’s feet in the pocket (shield with [L2] if pressed), first-time layoff back to onrushing Abily, first-time through ball to the other forward’s run. Abuses defenders who step out to follow the first pass.',
    coach: [
      [0,    '<b>UP:</b> driven pass ([R2]+[X]) into Park’s feet in the pocket. Shield with [L2] if pressed.'],
      [1300, 'The CB steps out to follow Park — that’s the trap springing.'],
      [1900, '<b>BACK:</b> first-time layoff to onrushing Abily.'],
      [2900, '<b>THROUGH:</b> first-time ball ([TR]) into Wissa’s run through the vacated space.'],
      [4300, '<b>Finish.</b> The stepping CB never recovers.']
    ],
    actors: [
      { id: 'ABILY', x: 300, y: 660 }, { id: 'PARK', x: 340, y: 400 },
      { id: 'WISSA', x: 430, y: 300 }, { id: 'NEY', x: 130, y: 420 },
      { id: 'D1', x: 330, y: 270 }, { id: 'D2', x: 480, y: 260 }, { id: 'D3', x: 180, y: 270 }
    ],
    ball: { holder: 'ABILY' },
    steps: [
      { type: 'pass', from: 'ABILY', t0: 300, t1: 1150, to: 'PARK', driven: true },
      { type: 'run',  actor: 'D1', t0: 1200, t1: 2100, to: { x: 345, y: 350 } },
      { type: 'run',  actor: 'ABILY', t0: 1300, t1: 2800, to: { x: 320, y: 520 } },
      { type: 'pass', from: 'PARK', t0: 1950, t1: 2750, to: { x: 322, y: 528 } },
      { type: 'run',  actor: 'WISSA', t0: 2500, t1: 4200, to: { x: 400, y: 110 }, curve: .12 },
      { type: 'pass', from: 'ABILY', t0: 2950, t1: 3950, to: { x: 395, y: 145 }, driven: true },
      { type: 'shot', from: 'WISSA', t0: 4300, t1: 4650, to: { x: 330, y: 8 } },
      { type: 'goal', t0: 4650 }
    ],
    dur: 5400
  },
  {
    id: 'r4', n: 4, name: 'Overload to Isolate', tag: 'vs packed sides',
    pad: 'triangle left · lofted switch',
    desc: 'Build deliberately down the left with the Neymar–LB–Abily triangle until three or four defenders drag over. Then one switch to Athenea: 1v1 in acres. He beats his man to the byline (feeds Route 5) or draws the CB (opens Route 2’s far post).',
    coach: [
      [0,    'Cycle the left triangle: <b>LB → Neymar → Abily</b>. Patience is the weapon.'],
      [2500, 'Watch the red shirts <b>drag left</b> — three, four defenders overloading the ball side.'],
      [4200, 'Now: one <b>lofted switch</b> to Athenea on the far touchline.'],
      [5600, '<b>1v1 in acres.</b> Byline feeds Route 5; drawing the CB opens Route 2’s far post.']
    ],
    actors: [
      { id: 'LUB', x: 110, y: 620 }, { id: 'NEY', x: 150, y: 450 }, { id: 'ABILY', x: 260, y: 560 },
      { id: 'ATH', x: 615, y: 430 }, { id: 'WISSA', x: 360, y: 280 },
      { id: 'D1', x: 250, y: 420 }, { id: 'D2', x: 360, y: 430 }, { id: 'D3', x: 470, y: 420 }, { id: 'D4', x: 300, y: 300 }
    ],
    ball: { holder: 'LUB' },
    steps: [
      { type: 'pass', from: 'LUB', t0: 300, t1: 1000, to: 'NEY' },
      { type: 'run', actor: 'D1', t0: 700, t1: 1900, to: { x: 200, y: 430 } },
      { type: 'run', actor: 'D2', t0: 900, t1: 2200, to: { x: 280, y: 460 } },
      { type: 'pass', from: 'NEY', t0: 1500, t1: 2200, to: 'ABILY' },
      { type: 'run', actor: 'D3', t0: 1900, t1: 3300, to: { x: 340, y: 440 } },
      { type: 'pass', from: 'ABILY', t0: 2700, t1: 3400, to: 'LUB' },
      { type: 'run', actor: 'D4', t0: 2900, t1: 4100, to: { x: 250, y: 330 } },
      { type: 'pass', from: 'LUB', t0: 3800, t1: 4300, to: 'ABILY' },
      { type: 'pass', from: 'ABILY', t0: 4400, t1: 5700, to: 'ATH', cross: true },
      { type: 'carry', actor: 'ATH', t0: 5800, t1: 7000, to: { x: 640, y: 200 }, withBall: true },
      { type: 'flash', t0: 6900, at: { x: 610, y: 250 }, label: '1v1' }
    ],
    dur: 7600
  },
  {
    id: 'r5', n: 5, name: 'Cutback Cash', tag: 'highest %',
    pad: 'byline · low pull-back',
    desc: 'Reach the byline with any wide player. Don’t shoot the tight angle — pull it back low to the penalty spot. Park, Neymar and Abily all attack that zone. The highest-percentage chance in the game; in doubt near the byline, this is the answer.',
    coach: [
      [0,    'Athenea drives to the <b>byline</b>. The tight-angle shot is a donation — don’t.'],
      [1600, 'Park, Neymar, Abily flood the <b>penalty-spot zone</b>.'],
      [2600, '<b>Low cutback</b> to the spot — away from the keeper, into the runners.'],
      [3800, 'Park arrives first. <b>[SQ] side-foot. Goal.</b> Highest-percentage chance in the game.']
    ],
    actors: [
      { id: 'ATH', x: 590, y: 300 }, { id: 'PARK', x: 360, y: 350 },
      { id: 'NEY', x: 210, y: 330 }, { id: 'ABILY', x: 330, y: 480 },
      { id: 'D1', x: 300, y: 190 }, { id: 'D2', x: 430, y: 200 }, { id: 'D3', x: 540, y: 230 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'carry', actor: 'ATH', t0: 200, t1: 2400, to: { x: 640, y: 45 }, withBall: true, curve: .1 },
      { type: 'run', actor: 'PARK', t0: 1500, t1: 3400, to: { x: 340, y: 155 } },
      { type: 'run', actor: 'NEY', t0: 1700, t1: 3500, to: { x: 250, y: 175 } },
      { type: 'run', actor: 'ABILY', t0: 1800, t1: 3600, to: { x: 380, y: 230 } },
      { type: 'run', actor: 'D3', t0: 1500, t1: 2600, to: { x: 600, y: 90 } },
      { type: 'pass', from: 'ATH', t0: 2700, t1: 3600, to: { x: 345, y: 160 } },
      { type: 'shot', from: 'PARK', t0: 3750, t1: 4050, to: { x: 355, y: 8 } },
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
      [0, 'Attacker (red) on the ball. You control Beckenbauer — <b>not a CB</b>.'],
      [800, 'Hold <b>[L2]</b>: stay a meter off, goal-side. Angle your body to show him the <b>sideline</b>.'],
      [2600, 'He takes the bait wide. Keep herding — no tackle yet.'],
      [4200, 'Heavy touch near the line — <b>trigger!</b> Fight for it with [X], alongside him. Ball won.']
    ],
    actors: [
      { id: 'BECK', x: 380, y: 560 }, { id: 'CALETA', x: 430, y: 830 }, { id: 'BARESI', x: 250, y: 830 },
      { id: 'D1', x: 420, y: 430 }
    ],
    ball: { holder: 'D1' },
    steps: [
      { type: 'run', actor: 'BECK', t0: 400, t1: 1400, to: { x: 440, y: 500 } },
      { type: 'carry', actor: 'D1', t0: 1500, t1: 3400, to: { x: 590, y: 560 }, withBall: true, curve: -.12 },
      { type: 'run', actor: 'BECK', t0: 1500, t1: 3400, to: { x: 560, y: 640 } },
      { type: 'carry', actor: 'D1', t0: 3500, t1: 4400, to: { x: 640, y: 640 }, withBall: true },
      { type: 'run', actor: 'BECK', t0: 3500, t1: 4600, to: { x: 625, y: 665 } },
      { type: 'flash', t0: 4400, at: { x: 645, y: 620 }, label: '✕' },
      { type: 'steal', t0: 4650, actor: 'BECK' }
    ],
    dur: 5400
  },
  {
    id: 'cutback', name: 'Kill the cutback', pad: 'switch + penalty spot',
    coach: [
      [0, 'Their winger reaches the <b>byline</b>. The cutback to the spot is coming — it’s the meta goal.'],
      [1200, 'Don’t chase the ball. <b>Switch to Abily</b> and stand him on the <b>penalty spot</b>.'],
      [2800, 'Cutback comes… and dies. Your body is on the pass line.'],
      [4000, '<b>Intercepted.</b> One habit, most common goal in the game erased.']
    ],
    actors: [
      { id: 'ABILY', x: 300, y: 520 }, { id: 'BECK', x: 430, y: 560 },
      { id: 'CALETA', x: 400, y: 800 }, { id: 'BARESI', x: 260, y: 800 },
      { id: 'D1', x: 600, y: 870 }, { id: 'D2', x: 340, y: 700 }
    ],
    ball: { holder: 'D1' },
    steps: [
      { type: 'carry', actor: 'D1', t0: 300, t1: 1500, to: { x: 645, y: 990 }, withBall: true },
      { type: 'run', actor: 'ABILY', t0: 1300, t1: 2700, to: { x: 340, y: 880 }, curve: .1 },
      { type: 'run', actor: 'D2', t0: 1600, t1: 2900, to: { x: 330, y: 850 } },
      { type: 'pass', from: 'D1', t0: 2900, t1: 3800, to: { x: 345, y: 872 } },
      { type: 'steal', t0: 3850, actor: 'ABILY' },
      { type: 'flash', t0: 3850, at: { x: 340, y: 830 }, label: 'CUT!' }
    ],
    dur: 4800
  }
];

/* ---------- build-up demo ---------- */
DATA.buildDemo = {
  id: 'firstline', name: 'Phase 1: GK → CB → Abily', pad: 'the first look',
  coach: [
    [0, 'GK has it. First pass to a <b>CB</b> — never up the middle.'],
    [1300, 'Abily’s DLP role pulls him <b>toward the CBs</b>, between their strikers.'],
    [2600, 'CB → Abily. <b>First line beaten.</b> Two red pressers now behind the ball.'],
    [4000, 'Pressed instead? <b>Keeper is the reset.</b> Back, switch sides, restart. A back pass that keeps the ball beats a forward pass that loses it.']
  ],
  actors: [
    { id: 'SUZ', x: 340, y: 985 }, { id: 'CALETA', x: 440, y: 850 }, { id: 'BARESI', x: 240, y: 850 },
    { id: 'ABILY', x: 280, y: 640 }, { id: 'BECK', x: 430, y: 680 },
    { id: 'D1', x: 300, y: 760 }, { id: 'D2', x: 420, y: 770 }
  ],
  ball: { holder: 'SUZ' },
  steps: [
    { type: 'pass', from: 'SUZ', t0: 400, t1: 1200, to: 'BARESI' },
    { type: 'run', actor: 'ABILY', t0: 1300, t1: 2500, to: { x: 250, y: 730 } },
    { type: 'run', actor: 'D1', t0: 1500, t1: 2500, to: { x: 275, y: 800 } },
    { type: 'pass', from: 'BARESI', t0: 2600, t1: 3400, to: { x: 252, y: 738 } },
    { type: 'run', actor: 'ABILY', t0: 3500, t1: 4600, to: { x: 320, y: 620 }, withBall: true },
    { type: 'flash', t0: 3450, at: { x: 250, y: 690 }, label: 'LINE 1 ✓' }
  ],
  dur: 5200
};

window.DATA = DATA;
