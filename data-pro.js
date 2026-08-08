/* ============ data-pro.js — elite tier: set pieces, advanced routes,
   counter-formation plans, match scripts, mechanics reference ============ */
/* Same pitch space as data.js: 680 x 1050, attacking toward y=0.
   Landmarks — goal line y=8, posts x=296/384, six-yard box y 8–60 (x 270–410),
   18-yard box y 8–158 (x 175–505), penalty spot (340,108), corner flags (16,16)/(664,16),
   halfway y=525. 1 unit ≈ 0.1 m, so 10 units ≈ 1 yard. */

/* ---------------------------------------------------------------- *
 * 1. SET PIECES
 * ---------------------------------------------------------------- */

DATA.setPieceNote = 'Button prompts follow your custom scheme. Aiming reticles and runner-cycling binds shift between patches — spend one practice-arena session confirming them, then these routines hold all season.';

DATA.setPieces = {
  corners: [
    {
      id: 'sp1', name: 'Near-post flick, far-post kill', tag: 'primary corner',
      pad: 'aim near post · ~2 bars · [O]',
      desc: 'The highest-return corner in the game and the one Top-50 players still concede. You attack the near post with your tallest body, flick it across the six-yard box, and Park arrives unmarked at the back post because every defender has already stepped toward the first contact.',
      why: 'Keepers cannot come for a near-post flick, and man-marking systems drag defenders toward the first runner. The far post is the only truly unguarded strip of grass at a corner.',
      coach: [
        [0,    'Aim the reticle at the <b>near post</b>, not the spot. Power around <b>two bars</b> — enough to beat the first man, low enough that the keeper cannot claim.'],
        [500,  'Baresi attacks the near post <b>early</b>. He is not scoring — he is a deflector.'],
        [1500, 'Contact. <b>Flick it across</b> the six-yard box — a glance, not a smash.'],
        [2100, 'Park has held his run at the edge of the six and now steps in <b>behind</b> the far-post defender.'],
        [2600, '<b>Header, goal.</b> Nobody picked him up because everybody followed the first ball.']
      ],
      actors: [
        { id: 'ATH', x: 38,  y: 34 },
        { id: 'BARESI', x: 250, y: 130 }, { id: 'PARK', x: 445, y: 130 },
        { id: 'WISSA',  x: 340, y: 105 }, { id: 'ABILY', x: 340, y: 215 },
        { id: 'D1', x: 306, y: 60 }, { id: 'D2', x: 352, y: 92 }, { id: 'D3', x: 400, y: 96 },
        { id: 'D4', x: 268, y: 108 }, { id: 'D5', x: 340, y: 26 }
      ],
      ball: { holder: 'ATH' },
      steps: [
        { type: 'run',  actor: 'BARESI', t0: 500,  t1: 1500, to: { x: 300, y: 52 } },
        { type: 'run',  actor: 'D1',  t0: 700,  t1: 1500, to: { x: 288, y: 44 } },
        { type: 'run',  actor: 'WISSA',  t0: 700,  t1: 1600, to: { x: 320, y: 72 } },
        { type: 'pass', from: 'ATH',  t0: 700,  t1: 1550, to: { x: 302, y: 50 }, cross: true },
        { type: 'flash', t0: 1500, at: { x: 302, y: 50 }, label: 'FLICK' },
        { type: 'run',  actor: 'PARK', t0: 1400, t1: 2400, to: { x: 396, y: 54 } },
        { type: 'run',  actor: 'D3',  t0: 1700, t1: 2400, to: { x: 372, y: 74 } },
        { type: 'pass', from: 'BARESI',  t0: 1600, t1: 2350, to: { x: 394, y: 52 }, cross: true },
        { type: 'shot', from: 'PARK',  t0: 2500, t1: 2800, to: { x: 336, y: 8 } },
        { type: 'goal', t0: 2800 }
      ],
      dur: 3600, view: 'box'
    },
    {
      id: 'sp2', name: 'Short corner, drag and cut back', tag: 'vs packed box',
      pad: '[X] short · overlap · low pull-back',
      desc: 'When they load nine bodies in the box, stop crossing into it. A short corner forces two defenders out of the box to deal with the 2v1, which thins the exact zone you want to cross into, and gives you a byline cutback instead of an aerial coin flip.',
      why: 'Aerial duels are close to 50/50 even with Park. A cutback from the byline is the single highest expected-goals action in the game. Short corners convert one into the other.',
      coach: [
        [0,    'Nine defenders in the box. A floated ball here is a lottery ticket. <b>[X] short</b> instead.'],
        [700,  'Cafu steps to receive. Now it is <b>2v1</b> in the corner and two defenders must leave the box.'],
        [1500, 'Return pass, Athenea faces the byline with the man beaten.'],
        [2400, 'Not a cross — <b>low cutback</b> to the penalty spot. The two who came out cannot get back.'],
        [3000, 'Park arrives late onto the pull-back. <b>[SQ] first time.</b>']
      ],
      actors: [
        { id: 'ATH', x: 38,  y: 36 }, { id: 'CAFU', x: 104, y: 112 },
        { id: 'PARK', x: 400, y: 215 }, { id: 'WISSA', x: 330, y: 96 }, { id: 'NEY', x: 470, y: 175 },
        { id: 'D1', x: 300, y: 56 }, { id: 'D2', x: 352, y: 62 }, { id: 'D3', x: 396, y: 100 },
        { id: 'D4', x: 262, y: 104 }, { id: 'D5', x: 340, y: 26 }
      ],
      ball: { holder: 'ATH' },
      steps: [
        { type: 'pass', from: 'ATH', t0: 500, t1: 1000, to: 'CAFU' },
        { type: 'run',  actor: 'D4', t0: 900, t1: 2000, to: { x: 150, y: 118 } },
        { type: 'run',  actor: 'D1', t0: 1100, t1: 2100, to: { x: 216, y: 96 } },
        { type: 'run',  actor: 'ATH', t0: 1000, t1: 1900, to: { x: 94, y: 54 } },
        { type: 'pass', from: 'CAFU', t0: 1500, t1: 2000, to: 'ATH' },
        { type: 'carry', actor: 'ATH', t0: 2000, t1: 2600, to: { x: 136, y: 42 }, withBall: true },
        { type: 'flash', t0: 2200, at: { x: 190, y: 108 }, label: '2 OUT' },
        { type: 'run',  actor: 'PARK', t0: 2100, t1: 3200, to: { x: 336, y: 112 } },
        { type: 'pass', from: 'ATH', t0: 2600, t1: 3200, to: { x: 334, y: 110 }, driven: true },
        { type: 'shot', from: 'PARK', t0: 3300, t1: 3600, to: { x: 372, y: 8 } },
        { type: 'goal', t0: 3600 }
      ],
      dur: 4400, view: 'box'
    },
    {
      id: 'sp3', name: 'Defending the corner', tag: 'concede nothing, counter',
      pad: 'manual runner · [TR] outlet',
      desc: 'Most goals conceded from corners are conceded before the ball is struck. Set your shape, take manual control of the one player who covers the danger zone, and leave Wissa on the halfway line so every clearance is a counter-attack rather than a second corner.',
      why: 'The AI marks the box adequately but never covers the edge and never tracks the second ball. That is where elite opponents score and where they lose the ball if you are set up to punish it.',
      coach: [
        [0,    'Before the kick: control <b>Beckenbauer</b> and stand him at the <b>edge of the box</b>. That is the rebound and cutback zone the AI abandons.'],
        [800,  'Leave <b>Wissa on the halfway line</b>. One man up costs you nothing in the box and gives you an outlet.'],
        [1600, 'Delivery comes in. Do not swing early — let Baresi and the keeper attack the first ball.'],
        [2400, 'Cleared to the edge. Beckenbauer is <b>already there</b>. That is the whole trick.'],
        [3000, 'Head up immediately: <b>[TR] to Wissa</b>. They committed eight players. You are 3v2 going the other way.']
      ],
      actors: [
        { id: 'BARESI',  x: 306, y: 56 }, { id: 'CALETA', x: 356, y: 62 },
        { id: 'CAFU',  x: 272, y: 42 }, { id: 'PARK', x: 400, y: 74 },
        { id: 'BECK', x: 340, y: 176 }, { id: 'WISSA', x: 380, y: 520 },
        { id: 'D1', x: 38,  y: 36 }, { id: 'D2', x: 316, y: 96 }, { id: 'D3', x: 384, y: 104 },
        { id: 'D4', x: 268, y: 118 }, { id: 'D5', x: 440, y: 150 }
      ],
      ball: { holder: 'D1' },
      steps: [
        { type: 'flash', t0: 300,  at: { x: 340, y: 176 }, label: 'YOU' },
        { type: 'flash', t0: 1000, at: { x: 380, y: 520 }, label: 'OUTLET' },
        { type: 'pass', from: 'D1', t0: 1600, t1: 2350, to: { x: 330, y: 74 }, cross: true },
        { type: 'run',  actor: 'BARESI', t0: 1700, t1: 2300, to: { x: 328, y: 68 } },
        { type: 'pass', from: 'BARESI', t0: 2400, t1: 2950, to: { x: 340, y: 172 }, cross: true },
        { type: 'run',  actor: 'WISSA', t0: 2900, t1: 4200, to: { x: 420, y: 330 } },
        { type: 'pass', from: 'BECK', t0: 3100, t1: 4000, to: { x: 418, y: 336 }, driven: true },
        { type: 'flash', t0: 4000, at: { x: 418, y: 336 }, label: '3v2' }
      ],
      dur: 4800, view: 'full'
    }
  ],

  freeKicks: [
    {
      id: 'fk1', name: 'Central, 20–24 yards: curl over the wall', tag: 'the money band',
      pad: 'aim inside post · high curl · [SQ]',
      desc: 'From roughly 20 to 24 yards, dead centre, the wall is close enough that the keeper cheats toward the side he is protecting. Lift it over the wall and curl it back down inside the far upright.',
      why: 'At this range the ball has enough flight time to dip but not enough for the keeper to recover across. Aim inside the post, not at the corner — the curl carries it the rest of the way.',
      coach: [
        [0,    'Roughly <b>22 yards, central</b>. This is the band worth shooting from — closer and the wall smothers it, further and the keeper reads it.'],
        [700,  'Reticle <b>just inside the far post</b>, raised slightly above the crossbar. The curl brings it back down and in.'],
        [1400, 'Power around <b>three quarters</b>. Full power kills the spin.'],
        [2000, 'Over the wall…'],
        [2700, '<b>Down and in.</b> Off the inside of the post is the target, not the middle of the net.']
      ],
      actors: [
        { id: 'NEY', x: 316, y: 236 }, { id: 'PARK', x: 372, y: 240 },
        { id: 'D1', x: 298, y: 148 }, { id: 'D2', x: 322, y: 146 }, { id: 'D3', x: 346, y: 146 },
        { id: 'D4', x: 370, y: 148 }, { id: 'D5', x: 348, y: 30 }
      ],
      ball: { holder: 'NEY' },
      steps: [
        { type: 'flash', t0: 600, at: { x: 305, y: 20 }, label: 'AIM' },
        { type: 'shot', from: 'NEY', t0: 2000, t1: 2900, to: { x: 304, y: 12 }, cross: true },
        { type: 'goal', t0: 2900 }
      ],
      dur: 3800, view: 'box'
    },
    {
      id: 'fk2', name: 'Central, 26–32 yards: low and hard', tag: 'punish the jump',
      pad: 'aim under wall · low power · [SQ]',
      desc: 'From distance the wall jumps almost every time. Stop trying to beat it over the top — drive the ball flat and low under the jump, toward the corner the keeper has weighted away from.',
      why: 'At 30 yards a curled effort gives the keeper close to a full second of flight time. A flat driven ball under a jumping wall arrives before he has reset his feet.',
      coach: [
        [0,    'Around <b>30 yards</b>. A curler from here is a comfortable save.'],
        [700,  'Aim <b>low, under the wall</b>, toward the side the keeper is not covering.'],
        [1500, 'Near-maximum power, minimal lift. You want it flat and mean.'],
        [2100, 'The wall jumps — and the ball goes <b>under it</b>.'],
        [2700, 'Low to the corner. Keepers dive late on these.']
      ],
      actors: [
        { id: 'NEY', x: 330, y: 320 }, { id: 'ABILY', x: 384, y: 322 },
        { id: 'D1', x: 306, y: 230 }, { id: 'D2', x: 330, y: 228 }, { id: 'D3', x: 354, y: 228 },
        { id: 'D4', x: 378, y: 230 }, { id: 'D5', x: 344, y: 30 }
      ],
      ball: { holder: 'NEY' },
      steps: [
        { type: 'flash', t0: 700, at: { x: 330, y: 228 }, label: 'UNDER' },
        { type: 'shot', from: 'NEY', t0: 2100, t1: 2850, to: { x: 380, y: 14 }, driven: true },
        { type: 'goal', t0: 2850 }
      ],
      dur: 3700, view: 'box'
    },
    {
      id: 'fk3', name: 'Wide free kick: whip the far post', tag: 'not a shot, a weapon',
      pad: 'far post · driven whip · [O]',
      desc: 'A wide free kick is a corner you get to take with a running start and no crowd on the ball. Whip it hard beyond the far post so it moves away from the keeper, and let Park run onto it.',
      why: 'Balls whipped away from the keeper cannot be claimed and cannot be punched clean. The far post is where your aerial advantage lives.',
      coach: [
        [0,    'Wide, roughly level with the box. Do not shoot from here — <b>deliver</b>.'],
        [700,  'Target <b>beyond the far post</b>, whipped and hard. Away from the keeper, always.'],
        [1500, 'Park starts from <b>outside</b> the six and attacks the ball moving forward. Never wait in the zone.'],
        [2400, 'Caleta-Car occupies the near post and takes his marker with him.'],
        [3000, '<b>Header down and in.</b>']
      ],
      actors: [
        { id: 'ATH',  x: 128, y: 268 },
        { id: 'PARK',  x: 424, y: 168 }, { id: 'CALETA', x: 300, y: 120 }, { id: 'WISSA', x: 350, y: 130 },
        { id: 'D1', x: 292, y: 88 }, { id: 'D2', x: 344, y: 92 }, { id: 'D3', x: 396, y: 116 },
        { id: 'D4', x: 258, y: 116 }, { id: 'D5', x: 340, y: 28 }
      ],
      ball: { holder: 'ATH' },
      steps: [
        { type: 'run',  actor: 'CALETA', t0: 1400, t1: 2400, to: { x: 296, y: 60 } },
        { type: 'run',  actor: 'D1',   t0: 1600, t1: 2400, to: { x: 288, y: 52 } },
        { type: 'run',  actor: 'PARK',  t0: 1500, t1: 2900, to: { x: 400, y: 62 } },
        { type: 'pass', from: 'ATH',   t0: 1600, t1: 2900, to: { x: 402, y: 60 }, cross: true },
        { type: 'shot', from: 'PARK',   t0: 3000, t1: 3350, to: { x: 340, y: 8 } },
        { type: 'goal', t0: 3350 }
      ],
      dur: 4200, view: 'box'
    },
    {
      id: 'fk4', name: 'The rolled routine', tag: 'when the wall is set',
      pad: 'roll [X] · strike [SQ]',
      desc: 'Add a second player over the ball, roll it square a couple of yards, and strike from the new angle. The wall is set for the original position and the keeper has set his feet for it too.',
      why: 'Walls do not shuffle in time. Two yards sideways turns a blocked lane into an open one, and the keeper is now guarding the wrong half of his goal.',
      coach: [
        [0,    'Wall is set and the direct lane is dead. Add a <b>second player</b> over the ball.'],
        [900,  '<b>Roll it square</b> — two or three yards is plenty.'],
        [1700, 'The wall does not shift. The lane past its outside edge is now open.'],
        [2300, 'Strike from the <b>new angle</b>, low and hard, across the keeper.'],
        [3000, 'Goal. The keeper had weighted himself for a ball that no longer existed.']
      ],
      actors: [
        { id: 'NEY', x: 340, y: 252 }, { id: 'ABILY', x: 392, y: 258 },
        { id: 'D1', x: 316, y: 160 }, { id: 'D2', x: 340, y: 158 }, { id: 'D3', x: 364, y: 158 },
        { id: 'D4', x: 388, y: 160 }, { id: 'D5', x: 336, y: 30 }
      ],
      ball: { holder: 'NEY' },
      steps: [
        { type: 'pass', from: 'NEY', t0: 900, t1: 1500, to: { x: 424, y: 256 } },
        { type: 'run',  actor: 'ABILY', t0: 1000, t1: 1700, to: { x: 428, y: 258 } },
        { type: 'flash', t0: 1800, at: { x: 428, y: 200 }, label: 'LANE' },
        { type: 'shot', from: 'ABILY', t0: 2300, t1: 3050, to: { x: 300, y: 14 }, driven: true },
        { type: 'goal', t0: 3050 }
      ],
      dur: 3900, view: 'box'
    }
  ],

  penalties: [
    { t: 'Aim before the run-up, not during', d: 'Set your direction early and leave it alone. Late stick input is the single biggest cause of dragging it wide.' },
    { t: 'Two thirds power, side netting', d: 'Full power costs accuracy for nothing. Aim for the join between post and net at mid height — unsaveable, and still well inside the frame.' },
    { t: 'Stop the composure ring in the green', d: 'Green is placement. Anywhere else adds spread you cannot afford at 1-1 in the 88th.' },
    { t: 'Alternate sides across a shootout', d: 'Elite opponents read patterns fast. Do not send three in a row to the same corner, and do not let your first two be your best two.' },
    { t: 'As keeper: move late', d: 'Commit after the striker plants, not before. Early dives are what good penalty takers are aiming at.' }
  ],

  throwIns: [
    { t: 'Quick throw, first time back', d: 'Throw into your winger with a defender tight and take the return immediately. The thrower is the only unmarked player on the pitch for about a second.' },
    { t: 'Never throw into a corner-trapped man', d: 'A throw into pressure on your own touchline is how counters against you start. If nobody is free, throw back to the CB and rebuild.' },
    { t: 'Attacking third: throw to feet, drag the marker, cut back', d: 'Same principle as the short corner — pull one defender out of the box, then get to the byline.' }
  ]
};

/* ---------------------------------------------------------------- *
 * 2. ELITE ROUTES
 * ---------------------------------------------------------------- */

DATA.eliteRoutes = [
  {
    id: 'e1', n: 1, name: 'The Trivela Channel Ball', tag: 'beats the read',
    pad: '[L2]+[TR] outside-foot through',
    desc: 'Elite opponents defend by reading your body shape — they watch which way your passer is facing and step into that lane. The outside-of-the-foot pass leaves on a different line than your body advertises, so the defender steps into a lane the ball never uses.',
    why: 'Against Div 1 opposition your standard through ball is intercepted because it is predictable. The trivela bends around the covering defender from a body position that says you are about to pass square.',
    coach: [
      [0,    'Abily on the right half-space. Their CDM is <b>reading your hips</b> and shading the central lane.'],
      [800,  'Your body shape says square ball. Do not turn — that is the tell they are waiting for.'],
      [1600, '<b>[L2] + [TR]</b>: outside of the foot. The ball leaves on a curve the covering man cannot step into.'],
      [2700, 'It bends <b>around</b> the CB into Wissa stride.'],
      [3800, 'Clean through. <b>[SQ]</b> across the keeper.']
    ],
    actors: [
      { id: 'ABILY', x: 440, y: 610 }, { id: 'WISSA', x: 400, y: 400 },
      { id: 'PARK', x: 250, y: 500 }, { id: 'ATH', x: 600, y: 480 },
      { id: 'D1', x: 300, y: 320 }, { id: 'D2', x: 430, y: 330 }, { id: 'D3', x: 560, y: 350 },
      { id: 'D4', x: 400, y: 500 }
    ],
    ball: { holder: 'ABILY' },
    steps: [
      { type: 'run',  actor: 'D4', t0: 900,  t1: 1900, to: { x: 452, y: 540 } },
      { type: 'run',  actor: 'WISSA', t0: 1400, t1: 3200, to: { x: 300, y: 170 }, curve: -.16 },
      { type: 'run',  actor: 'D2', t0: 1900, t1: 3000, to: { x: 380, y: 250 } },
      { type: 'pass', from: 'ABILY', t0: 1600, t1: 3100, to: { x: 306, y: 186 }, cross: true },
      { type: 'flash', t0: 2400, at: { x: 400, y: 300 }, label: 'BEND' },
      { type: 'carry', actor: 'WISSA', t0: 3200, t1: 4100, to: { x: 286, y: 74 }, withBall: true },
      { type: 'shot', from: 'WISSA', t0: 4200, t1: 4550, to: { x: 372, y: 8 } },
      { type: 'goal', t0: 4550 }
    ],
    dur: 5300
  },
  {
    id: 'e2', n: 2, name: 'Fake-Shot Cutback', tag: 'freezes the last man',
    pad: '[SQ] then [X] · low pull-back',
    desc: 'At the byline the defender is bracing for a cross or a near-post shot. Sell the shot, cancel it, and the animation buys you the half-yard you need to pull the ball back cleanly instead of hitting a blocked cross.',
    why: 'Blocked crosses are the most common way an attack in the corner dies against good defenders. The fake shot removes the block by making the defender plant his feet for something that never happens.',
    coach: [
      [0,    'Athenea reaches the byline with the fullback goal-side and square to him.'],
      [700,  '<b>[SQ] then [X]</b> — sell the shot, cancel it. He plants his feet to block.'],
      [1500, 'That is your half-yard. Do not shoot from the angle — <b>the angle is a trap</b>.'],
      [2200, '<b>Low cutback</b> to the penalty spot, away from the keeper.'],
      [2900, 'Park is arriving from deep with no marker. <b>First time.</b>']
    ],
    actors: [
      { id: 'ATH', x: 580, y: 130 }, { id: 'PARK', x: 430, y: 330 },
      { id: 'WISSA',  x: 360, y: 90 },  { id: 'NEY', x: 250, y: 250 },
      { id: 'D1', x: 320, y: 60 }, { id: 'D2', x: 400, y: 70 }, { id: 'D3', x: 560, y: 90 },
      { id: 'D4', x: 300, y: 170 }, { id: 'D5', x: 340, y: 26 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'flash', t0: 800, at: { x: 566, y: 104 }, label: 'FAKE' },
      { type: 'carry', actor: 'ATH', t0: 1400, t1: 2200, to: { x: 604, y: 62 }, withBall: true },
      { type: 'run',  actor: 'PARK', t0: 1500, t1: 3000, to: { x: 344, y: 116 } },
      { type: 'run',  actor: 'D4',  t0: 2000, t1: 2900, to: { x: 292, y: 108 } },
      { type: 'pass', from: 'ATH', t0: 2300, t1: 2950, to: { x: 342, y: 112 }, driven: true },
      { type: 'shot', from: 'PARK', t0: 3050, t1: 3400, to: { x: 300, y: 8 } },
      { type: 'goal', t0: 3400 }
    ],
    dur: 4200, view: 'box'
  },
  {
    id: 'e3', n: 3, name: 'Wall Pass Through the Half-Space', tag: 'give-and-go',
    pad: '[L1]+[X] · first-time return',
    desc: 'Hold the run-trigger as you pass into feet and the passer bursts past his marker automatically. The receiver returns it first time into the space the passer is already running into. Two touches, one defensive line broken.',
    why: 'Manual runs are what separate elite build-up from Division 5 build-up. A defender can track the ball or the runner, not both, and this pattern makes him choose in half a second.',
    coach: [
      [0,    'Neymar has the ball in the left channel with a defender tight to Park.'],
      [800,  '<b>[L1] + [X]</b>: pass into Park feet and hold the trigger. Neymar keeps running.'],
      [1700, 'The marker steps to Park — he has to, the ball is there.'],
      [2400, '<b>First-time return</b> into the space Neymar already occupies. Never control it, never turn.'],
      [3200, 'Through the line, into the box, <b>[SQ] across the keeper</b>.']
    ],
    actors: [
      { id: 'NEY', x: 180, y: 560 }, { id: 'PARK', x: 300, y: 430 },
      { id: 'WISSA',  x: 420, y: 300 }, { id: 'ABILY', x: 300, y: 660 },
      { id: 'D1', x: 240, y: 300 }, { id: 'D2', x: 400, y: 300 }, { id: 'D3', x: 300, y: 390 },
      { id: 'D4', x: 130, y: 350 }
    ],
    ball: { holder: 'NEY' },
    steps: [
      { type: 'pass', from: 'NEY', t0: 800, t1: 1500, to: 'PARK' },
      { type: 'run',  actor: 'NEY', t0: 900, t1: 2600, to: { x: 228, y: 330 } },
      { type: 'run',  actor: 'D3',  t0: 1200, t1: 2200, to: { x: 300, y: 410 } },
      { type: 'flash', t0: 1800, at: { x: 300, y: 420 }, label: 'HE STEPS' },
      { type: 'pass', from: 'PARK', t0: 2400, t1: 3000, to: { x: 232, y: 300 } },
      { type: 'carry', actor: 'NEY', t0: 3000, t1: 4000, to: { x: 268, y: 120 }, withBall: true },
      { type: 'shot', from: 'NEY', t0: 4100, t1: 4450, to: { x: 376, y: 8 } },
      { type: 'goal', t0: 4450 }
    ],
    dur: 5200
  },
  {
    id: 'e4', n: 4, name: 'Near-Post Low Driven', tag: 'vs deep blocks',
    pad: '[L1]+[O] ground · or [R2]+[O] low',
    desc: 'Everybody defends the far post because everybody crosses to it. Against a deep block, drive it low and hard to the near post instead and attack it with Wissa running across his marker.',
    why: 'A low near-post ball takes the keeper out of the equation and turns the CB into a potential own-goal risk. Deep blocks are set up to win height, not to deal with pace across the six-yard box.',
    coach: [
      [0,    'They are camped. Ten behind the ball, everyone ball-watching the far post.'],
      [800,  'Athenea has a yard. Do not float it — <b>ground/low driven</b> to the near post.'],
      [1700, 'Wissa attacks <b>across the front</b> of his marker toward the near post.'],
      [2500, 'The CB is turned and facing his own goal. The keeper cannot come.'],
      [3100, 'Any contact scores. <b>Toe it in.</b>']
    ],
    actors: [
      { id: 'ATH', x: 560, y: 200 }, { id: 'WISSA', x: 400, y: 170 },
      { id: 'PARK', x: 330, y: 250 }, { id: 'NEY', x: 200, y: 190 },
      { id: 'D1', x: 300, y: 90 }, { id: 'D2', x: 366, y: 96 }, { id: 'D3', x: 430, y: 120 },
      { id: 'D4', x: 250, y: 130 }, { id: 'D5', x: 348, y: 28 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'run',  actor: 'WISSA', t0: 1300, t1: 2600, to: { x: 306, y: 62 } },
      { type: 'run',  actor: 'D3', t0: 1600, t1: 2600, to: { x: 352, y: 84 } },
      { type: 'pass', from: 'ATH', t0: 1700, t1: 2700, to: { x: 304, y: 58 }, driven: true },
      { type: 'flash', t0: 2500, at: { x: 304, y: 58 }, label: 'NEAR POST' },
      { type: 'shot', from: 'WISSA', t0: 3100, t1: 3400, to: { x: 330, y: 8 } },
      { type: 'goal', t0: 3400 }
    ],
    dur: 4200, view: 'box'
  },
  {
    id: 'e5', n: 5, name: 'Corner-Flag Hold, Switch, Isolate', tag: 'breaks a low block',
    pad: '[L2] shield · lofted switch',
    desc: 'Take the ball to the corner flag and shield it. Impatient opponents send two or three players to win it back, which pulls their entire block toward one touchline. Then switch it and your far winger is in an acre of space.',
    why: 'A deep block only has one weakness: it has to move. This forces it to move, then punishes the move. It also drains their stamina and their patience, both of which matter in the 80th minute.',
    coach: [
      [0,    'They will not come out. Fine — <b>make them come out</b>.'],
      [700,  'Wissa takes it to the corner flag and shields with <b>[L2]</b>. Back to goal, body between ball and man.'],
      [1600, 'One presses. Then a second. Then the fullback slides over. <b>Their block is now lopsided.</b>'],
      [2600, '<b>Lofted switch</b> to Neymar. One pass covers what took them ten seconds to shift.'],
      [3600, 'He has the whole flank. Drive at the byline and this becomes a cutback.']
    ],
    actors: [
      { id: 'WISSA',  x: 620, y: 120 }, { id: 'NEY', x: 90, y: 320 },
      { id: 'PARK', x: 380, y: 260 }, { id: 'ABILY', x: 420, y: 430 },
      { id: 'D1', x: 560, y: 150 }, { id: 'D2', x: 470, y: 200 }, { id: 'D3', x: 380, y: 140 },
      { id: 'D4', x: 300, y: 180 }, { id: 'D5', x: 200, y: 230 }
    ],
    ball: { holder: 'WISSA' },
    steps: [
      { type: 'run',  actor: 'D1', t0: 700,  t1: 1500, to: { x: 596, y: 132 } },
      { type: 'run',  actor: 'D2', t0: 1100, t1: 2100, to: { x: 552, y: 176 } },
      { type: 'run',  actor: 'D5', t0: 1500, t1: 2500, to: { x: 330, y: 230 } },
      { type: 'flash', t0: 2200, at: { x: 560, y: 160 }, label: 'THEY SHIFT' },
      { type: 'run',  actor: 'NEY', t0: 2400, t1: 3600, to: { x: 120, y: 230 } },
      { type: 'pass', from: 'WISSA', t0: 2600, t1: 3600, to: { x: 122, y: 232 }, cross: true },
      { type: 'carry', actor: 'NEY', t0: 3600, t1: 4600, to: { x: 150, y: 70 }, withBall: true },
      { type: 'flash', t0: 4400, at: { x: 150, y: 70 }, label: 'ISOLATED' }
    ],
    dur: 5200, view: 'top'
  },
  {
    id: 'e6', n: 6, name: 'The Three-Second Transition', tag: 'the real kill shot',
    pad: '[R2]+[X] forward, now',
    desc: 'The instant you win the ball, their defensive shape does not exist — their fullbacks are high and their CBs are split. You have about three seconds before the game resets them. Your first pass must go forward.',
    why: 'This is where the majority of goals against elite opponents come from. Not from breaking down a set defence, but from refusing to take a safe touch in the window where there is no defence to break down.',
    coach: [
      [0,    'Beckenbauer steps in and wins it. <b>Clock starts now.</b>'],
      [500,  'Do not take a settling touch. Do not look for Caleta-Car. <b>Head up, forward.</b>'],
      [1100, '<b>[R2]+[X]</b> driven into Park dropping into the vacated middle.'],
      [2100, 'One touch — he never turns, he <b>releases</b>. Their CBs are still recovering.'],
      [2900, 'Wissa through the gap the fullback left. Three passes, four seconds, one goal.']
    ],
    actors: [
      { id: 'BECK', x: 330, y: 720 }, { id: 'PARK', x: 350, y: 540 },
      { id: 'WISSA',   x: 430, y: 420 }, { id: 'NEY', x: 150, y: 500 },
      { id: 'D1', x: 300, y: 300 }, { id: 'D2', x: 450, y: 320 }, { id: 'D3', x: 340, y: 740 },
      { id: 'D4', x: 600, y: 470 }
    ],
    ball: { holder: 'BECK' },
    steps: [
      { type: 'flash', t0: 200, at: { x: 330, y: 720 }, label: '3s' },
      { type: 'pass', from: 'BECK', t0: 1100, t1: 1900, to: 'PARK', driven: true },
      { type: 'run',  actor: 'WISSA', t0: 1300, t1: 3200, to: { x: 520, y: 180 }, curve: .12 },
      { type: 'run',  actor: 'D2', t0: 2000, t1: 3100, to: { x: 486, y: 244 } },
      { type: 'pass', from: 'PARK', t0: 2100, t1: 3100, to: { x: 522, y: 196 } },
      { type: 'carry', actor: 'WISSA', t0: 3200, t1: 4100, to: { x: 448, y: 74 }, withBall: true },
      { type: 'shot', from: 'WISSA', t0: 4200, t1: 4550, to: { x: 316, y: 8 } },
      { type: 'goal', t0: 4550 }
    ],
    dur: 5300, view: 'full'
  },
  {
    id: 'e7', n: 7, name: 'Second-Ball Crash', tag: 'the goal nobody defends',
    pad: 'cross · [SQ] first time from the edge',
    desc: 'Send the cross knowing it may be cleared, and have Abily already arriving at the edge of the box. Defences collapse toward the ball on every cross and nobody in the game picks up the man attacking the rebound zone.',
    why: 'Roughly half of all crosses are cleared to the top of the box. Every opponent defends the first ball. Almost nobody defends the second, and a first-time strike from the D is a genuine chance.',
    coach: [
      [0,    'Athenea is going to cross. Before it leaves his foot, <b>send Abily to the edge of the box</b>.'],
      [900,  'Cross in. Everyone — theirs and yours — converges on the six-yard box.'],
      [1900, 'Headed clear, as expected. That is not a failure, <b>that is the plan</b>.'],
      [2600, 'It drops to the edge. Abily is arriving at speed, unmarked.'],
      [3200, '<b>First time, [SQ], low through the crowd.</b> Keepers are unsighted on these.']
    ],
    actors: [
      { id: 'ATH', x: 570, y: 180 }, { id: 'PARK', x: 400, y: 130 }, { id: 'WISSA', x: 330, y: 110 },
      { id: 'ABILY', x: 340, y: 330 },
      { id: 'D1', x: 310, y: 70 }, { id: 'D2', x: 372, y: 78 }, { id: 'D3', x: 430, y: 110 },
      { id: 'D4', x: 260, y: 120 }, { id: 'D5', x: 344, y: 28 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'run',  actor: 'ABILY', t0: 700, t1: 2600, to: { x: 336, y: 186 } },
      { type: 'pass', from: 'ATH', t0: 900, t1: 1900, to: { x: 372, y: 70 }, cross: true },
      { type: 'run',  actor: 'D2',  t0: 1200, t1: 1900, to: { x: 374, y: 68 } },
      { type: 'pass', from: 'D2', t0: 1950, t1: 2800, to: { x: 340, y: 190 }, cross: true },
      { type: 'flash', t0: 2700, at: { x: 340, y: 190 }, label: 'SECOND BALL' },
      { type: 'shot', from: 'ABILY', t0: 3200, t1: 3650, to: { x: 296, y: 10 }, driven: true },
      { type: 'goal', t0: 3650 }
    ],
    dur: 4500, view: 'box'
  },
  {
    id: 'e8', n: 8, name: 'Underlap Split', tag: 'breaks a disciplined fullback',
    pad: '[L1] run inside · pass outside',
    desc: 'Athenea holds the touchline while Cafu runs inside him rather than around him. The fullback has to pick one, and whichever he picks the other one is free — inside for the shot, outside for the byline.',
    why: 'Overlaps are read instantly at this level because everybody uses them. Underlaps attack the fullback from the blind side and pull the CB across, which opens the cutback lane at the same time.',
    coach: [
      [0,    'Athenea wide right, fullback square to him and comfortable.'],
      [800,  'Cafu does not overlap — he runs <b>inside</b>. Trigger it with <b>[L1]</b>.'],
      [1700, 'Now the fullback has a decision, and the CB has to shift across to cover the inside run.'],
      [2500, 'The CB steps. That opens the <b>cutback lane behind him</b>.'],
      [3100, 'Slide it into Cafu, byline, pull back. Park finishes.']
    ],
    actors: [
      { id: 'ATH', x: 600, y: 330 }, { id: 'CAFU', x: 590, y: 480 },
      { id: 'PARK', x: 330, y: 300 }, { id: 'WISSA', x: 380, y: 190 },
      { id: 'D1', x: 300, y: 180 }, { id: 'D2', x: 420, y: 190 }, { id: 'D3', x: 560, y: 250 },
      { id: 'D4', x: 200, y: 210 }
    ],
    ball: { holder: 'ATH' },
    steps: [
      { type: 'run',  actor: 'CAFU', t0: 800, t1: 2600, to: { x: 480, y: 200 }, curve: .1 },
      { type: 'run',  actor: 'D2',  t0: 1800, t1: 2700, to: { x: 470, y: 210 } },
      { type: 'flash', t0: 2400, at: { x: 470, y: 216 }, label: 'CB STEPS' },
      { type: 'pass', from: 'ATH', t0: 2500, t1: 3200, to: { x: 500, y: 130 }, driven: true },
      { type: 'run',  actor: 'CAFU', t0: 2600, t1: 3600, to: { x: 520, y: 80 } },
      { type: 'run',  actor: 'PARK', t0: 2400, t1: 3900, to: { x: 344, y: 112 } },
      { type: 'pass', from: 'CAFU', t0: 3700, t1: 4300, to: { x: 342, y: 112 }, driven: true },
      { type: 'shot', from: 'PARK', t0: 4400, t1: 4750, to: { x: 386, y: 8 } },
      { type: 'goal', t0: 4750 }
    ],
    dur: 5500, view: 'top'
  }
];

/* ---------------------------------------------------------------- *
 * 3. ATTACKING SPECIFIC SHAPES
 *    Opponent tokens sit in the top half — they defend the top goal.
 * ---------------------------------------------------------------- */

DATA.shapes = [
  {
    id: 's4231', name: '4-2-3-1', freq: 'the mirror match',
    read: 'Two holding midfielders screen the middle and the CAM presses your deepest passer. Solid centrally, slow to shift laterally.',
    space: 'The half-spaces outside their double pivot, and the flank they have just shifted away from.',
    attack: 'Switch play early and often — their pivot cannot slide twice in one move. Attack the seam between their CDM and fullback with an underlap, then cut back. Do not run at the two CDMs.',
    defend: 'Their CAM is the danger. Beckenbauer stays glued to him, and never step both CDMs at once.',
    routes: ['Underlap Split', 'Overload to Isolate', 'Cutback Cash'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'LB', x: 110, y: 235 }, { p: 'CB', x: 262, y: 215 },
      { p: 'CB', x: 418, y: 215 }, { p: 'RB', x: 570, y: 235 },
      { p: 'CDM', x: 265, y: 375 }, { p: 'CDM', x: 415, y: 375 },
      { p: 'LM', x: 130, y: 500 }, { p: 'CAM', x: 340, y: 495 }, { p: 'RM', x: 550, y: 500 },
      { p: 'ST', x: 340, y: 640 }
    ],
    zones: [
      { x: 150, y: 250, w: 110, h: 130, label: 'HALF-SPACE' },
      { x: 420, y: 250, w: 110, h: 130, label: 'HALF-SPACE' }
    ]
  },
  {
    id: 's442', name: '4-4-2', freq: 'common in Elite',
    read: 'Two banks of four, two strikers pressing your CBs. Compact horizontally, but only two central midfielders to cover the entire middle.',
    space: 'The pocket between their midfield line and back four — exactly where Park lives.',
    attack: 'Park in the pocket is the whole game plan. Up-back-through repeatedly: their CM has to step to him, and the moment he does the through ball is on. Their two strikers do not track back, so Abily is free.',
    defend: 'Two strikers means you keep both CBs home always. Do not let Cafu get caught upfield.',
    routes: ['Up-Back-and-Through', 'Wall Pass', 'The Wissa Runway'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'LB', x: 110, y: 240 }, { p: 'CB', x: 262, y: 220 },
      { p: 'CB', x: 418, y: 220 }, { p: 'RB', x: 570, y: 240 },
      { p: 'LM', x: 120, y: 450 }, { p: 'CM', x: 268, y: 445 }, { p: 'CM', x: 412, y: 445 },
      { p: 'RM', x: 560, y: 450 },
      { p: 'ST', x: 280, y: 640 }, { p: 'ST', x: 400, y: 640 }
    ],
    zones: [
      { x: 210, y: 285, w: 260, h: 125, label: 'THE POCKET' }
    ]
  },
  {
    id: 's4141', name: '4-1-2-1-2 narrow', freq: 'the press meta',
    read: 'Extremely narrow, heavy central press, two strikers. Designed to suffocate you through the middle and force turnovers high.',
    space: 'Both entire flanks. They have no wide midfielders at all.',
    attack: 'Never play through the middle — that is the trap. Beat the first press with one pass, then switch immediately. Your wingers face fullbacks with zero cover. Byline, cutback, repeat. If they keep pressing, bait them with a CB and split it with Abily.',
    defend: 'Their striker pair splits your CBs. Beckenbauer screens, line at 45, and never send both CDMs to press.',
    routes: ['Overload to Isolate', 'Corner-Flag Hold', 'Cutback Cash'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'LB', x: 130, y: 245 }, { p: 'CB', x: 268, y: 218 },
      { p: 'CB', x: 412, y: 218 }, { p: 'RB', x: 550, y: 245 },
      { p: 'CDM', x: 340, y: 370 }, { p: 'CM', x: 258, y: 470 }, { p: 'CM', x: 422, y: 470 },
      { p: 'CAM', x: 340, y: 560 }, { p: 'ST', x: 288, y: 665 }, { p: 'ST', x: 392, y: 665 }
    ],
    zones: [
      { x: 20,  y: 250, w: 105, h: 300, label: 'EMPTY FLANK' },
      { x: 555, y: 250, w: 105, h: 300, label: 'EMPTY FLANK' }
    ]
  },
  {
    id: 's5212', name: '5-2-1-2 / 5-4-1 bus', freq: 'you will meet this at 1-0 down',
    read: 'Five at the back, everything behind the ball, no interest in possession. They are waiting for one counter and one set piece.',
    space: 'Nothing centrally. Everything comes from the byline and from the edge of the box.',
    attack: 'Forget through balls. Three tools only: wide 2v1 to the byline for cutbacks, far-post whipped crosses to Park, and the second-ball crash at the edge of the box. Use the corner-flag hold to drag them out. Take your corners short.',
    defend: 'Do not over-commit. Beckenbauer never goes past halfway and one CB stays central at all times, because their entire game is the one long ball into the channel.',
    routes: ['Cutback Cash', 'Second-Ball Crash', 'Corner-Flag Hold', 'Short corner'],
    spots: [
      { p: 'GK', x: 340, y: 65 }, { p: 'LWB', x: 95, y: 215 }, { p: 'CB', x: 218, y: 190 },
      { p: 'CB', x: 340, y: 180 }, { p: 'CB', x: 462, y: 190 }, { p: 'RWB', x: 585, y: 215 },
      { p: 'CM', x: 262, y: 330 }, { p: 'CM', x: 418, y: 330 },
      { p: 'CAM', x: 340, y: 425 }, { p: 'ST', x: 292, y: 530 }, { p: 'ST', x: 392, y: 530 }
    ],
    zones: [
      { x: 30,  y: 90,  w: 130, h: 110, label: 'BYLINE' },
      { x: 520, y: 90,  w: 130, h: 110, label: 'BYLINE' },
      { x: 230, y: 250, w: 220, h: 90,  label: 'SECOND BALL' }
    ]
  },
  {
    id: 's433', name: '4-3-3 holding', freq: 'possession sides',
    read: 'One holding midfielder behind two eights, wingers holding width, fullbacks pushed high. Strong in possession, structurally exposed in transition.',
    space: 'Behind their fullbacks. Both of them are above the halfway line most of the time.',
    attack: 'This is a transition match. Win it and go immediately — the three-second rule is worth more than any pattern here. Wissa diagonally into the space their fullback vacated, every single time. In settled play, drag their single CDM one way and play through the other side.',
    defend: 'Their wingers stay wide and high — your fullbacks must not follow them inside. Beckenbauer picks up the eight who runs beyond.',
    routes: ['Three-Second Transition', 'The Wissa Runway', 'Trivela Channel Ball'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'LB', x: 105, y: 300 }, { p: 'CB', x: 265, y: 210 },
      { p: 'CB', x: 415, y: 210 }, { p: 'RB', x: 575, y: 300 },
      { p: 'CDM', x: 340, y: 380 }, { p: 'CM', x: 245, y: 470 }, { p: 'CM', x: 435, y: 470 },
      { p: 'LW', x: 115, y: 600 }, { p: 'ST', x: 340, y: 645 }, { p: 'RW', x: 565, y: 600 }
    ],
    zones: [
      { x: 25,  y: 190, w: 120, h: 150, label: 'BEHIND LB' },
      { x: 535, y: 190, w: 120, h: 150, label: 'BEHIND RB' }
    ]
  },
  {
    id: 's352', name: '3-5-2 / 3-4-2-1', freq: 'wingback systems',
    read: 'Three centre-backs, wingbacks providing all the width, packed middle. Very strong centrally, and completely dependent on the wingbacks recovering.',
    space: 'The channel outside their widest CB, behind the advanced wingback.',
    attack: 'Pin the wingback by keeping Athenea high and wide, then attack the space behind him. Their widest CB has to come across, which drags the back three apart. Trivela or driven through into that channel, then a cutback into the gap the third CB left.',
    defend: 'Their wingbacks are the outlet. Your winger must track — this is the one shape where your LM and RM are the defensive priority.',
    routes: ['Trivela Channel Ball', 'Underlap Split', 'Overload to Isolate'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'CB', x: 220, y: 205 }, { p: 'CB', x: 340, y: 195 },
      { p: 'CB', x: 460, y: 205 },
      { p: 'LWB', x: 90, y: 400 }, { p: 'CM', x: 262, y: 390 }, { p: 'CM', x: 418, y: 390 },
      { p: 'RWB', x: 590, y: 400 },
      { p: 'CAM', x: 340, y: 520 }, { p: 'ST', x: 288, y: 640 }, { p: 'ST', x: 392, y: 640 }
    ],
    zones: [
      { x: 25,  y: 210, w: 130, h: 160, label: 'BEHIND WB' },
      { x: 525, y: 210, w: 130, h: 160, label: 'BEHIND WB' }
    ]
  },
  {
    id: 's4222', name: '4-2-2-2', freq: 'transition specialists',
    read: 'Two CDMs, two narrow attacking midfielders, two strikers. Built to counter — they concede the ball happily and hit you in transition.',
    space: 'Both flanks again, and behind their fullbacks when they push on.',
    attack: 'Play wide and be patient, but the real discipline is defensive: never leave both fullbacks high. Build with three at the back by keeping one fullback home, isolate wide, cut back.',
    defend: 'Their two strikers plus two narrow attackers is a four-man counter. Beckenbauer never leaves, and you accept slower build-up in exchange for never being 4v3 the other way.',
    routes: ['Overload to Isolate', 'Cutback Cash', 'Near-Post Low Driven'],
    spots: [
      { p: 'GK', x: 340, y: 70 }, { p: 'LB', x: 115, y: 240 }, { p: 'CB', x: 265, y: 215 },
      { p: 'CB', x: 415, y: 215 }, { p: 'RB', x: 565, y: 240 },
      { p: 'CDM', x: 268, y: 395 }, { p: 'CDM', x: 412, y: 395 },
      { p: 'CAM', x: 250, y: 530 }, { p: 'CAM', x: 430, y: 530 },
      { p: 'ST', x: 290, y: 655 }, { p: 'ST', x: 390, y: 655 }
    ],
    zones: [
      { x: 25,  y: 260, w: 110, h: 260, label: 'WIDE' },
      { x: 545, y: 260, w: 110, h: 260, label: 'WIDE' }
    ]
  },
  {
    id: 's41212', name: '4-3-2-1 / high-press custom', freq: 'the aggressive Div 1 build',
    read: 'Heavy press from the front, high line, aggressive interceptions. They want you to panic in your own third.',
    space: 'Directly behind the high line, and in the middle once the press is beaten.',
    attack: 'Bait it. Walk the ball with a CB until two players commit, then break the line with one driven pass into Abily or straight over the top for Wissa. Use the keeper as a reset button without shame. Every press they lose costs them stamina you get to spend in the 80th minute.',
    defend: 'When they win it high they attack instantly. Beckenbauer stays home and you do not counter-press with more than one man.',
    routes: ['The Wissa Runway', 'Three-Second Transition', 'Wall Pass'],
    spots: [
      { p: 'GK', x: 340, y: 90 }, { p: 'LB', x: 120, y: 300 }, { p: 'CB', x: 268, y: 265 },
      { p: 'CB', x: 412, y: 265 }, { p: 'RB', x: 560, y: 300 },
      { p: 'CM', x: 235, y: 445 }, { p: 'CDM', x: 340, y: 420 }, { p: 'CM', x: 445, y: 445 },
      { p: 'CAM', x: 262, y: 580 }, { p: 'CAM', x: 418, y: 580 }, { p: 'ST', x: 340, y: 690 }
    ],
    zones: [
      { x: 150, y: 105, w: 380, h: 130, label: 'OVER THE TOP' }
    ]
  }
];

/* ---------------------------------------------------------------- *
 * 4. MATCH MANAGEMENT
 * ---------------------------------------------------------------- */

DATA.matchScripts = [
  {
    phase: 'Minutes 1–15', title: 'Scout, do not gamble',
    bullets: [
      'Play safe, keep possession, and find out three things: do they press or drop, do they cross or cut back, and which flank do they attack.',
      'Test the high line once with an early Wissa runway. Their reaction tells you whether Route 1 is live all game.',
      'Do not force anything. A goal in minute 8 against a Top-50 player buys you 82 minutes of being counter-attacked.'
    ]
  },
  {
    phase: 'Minutes 15–45', title: 'Run the pattern that worked',
    bullets: [
      'You should now know which of your routes their shape concedes. Run it until they adjust, then switch to its partner route.',
      'Track their stamina. If one fullback is already amber, that flank is your target for the rest of the half.',
      'Bank a clean sheet first. Going in 0-0 against elite opposition is a fine result at half-time.'
    ]
  },
  {
    phase: 'Leading, minutes 70+', title: 'Kill the game',
    bullets: [
      'Line Height to 40, defensive approach deep. Concede possession, concede their half, concede everything except the box.',
      'Corner-flag hold when you get the chance, and pass backward without hesitation. There is no such thing as a wasteful back pass at 1-0 in the 84th.',
      'Make your subs at natural stoppages — it costs them momentum and burns clock.',
      'Do not counter with four players. Two is enough and keeps your shape intact.'
    ]
  },
  {
    phase: 'Chasing, minutes 70+', title: 'Structured urgency',
    bullets: [
      'Line Height 60–65, Abily from Deep-Lying Playmaker to Box Crasher, or switch to the 3-4-2-1 preset.',
      'Go wide, not through the middle — a chasing team that forces central passes gets countered and loses 2-0.',
      'Corners and wide free kicks are worth more now than open play. Take them seriously, not quickly.',
      'Set a hard limit: if you are still chasing at 85, go route one and crash the box. Before 85, stay patient.'
    ]
  },
  {
    phase: 'Just conceded', title: 'The two-minute reset',
    bullets: [
      'The two minutes after conceding are when most players concede again. Slow it down deliberately.',
      'Keep the ball among your CBs and CDMs, no forward passes, no pressing. Let the momentum swing pass.',
      'Check what beat you and fix the specific hole before you attack again — same goal twice is a losing habit.'
    ]
  }
];

DATA.reads = [
  { tell: 'They hold second-man press constantly', fix: 'Bait it with a CB, then split the two committed players with one driven pass into Abily. Their shape will be broken every time they do it.' },
  { tell: 'They drop deep and never press', fix: 'Corner-flag hold, wide 2v1, cutbacks and far-post whips. Do not force central passes into a low block.' },
  { tell: 'They spam pace on one wing', fix: 'Line Height down to 40, keep Cafu strictly Fullback/Defend, and let Caleta-Car shade that side. Give them the touchline, take away the diagonal.' },
  { tell: 'They cross on every attack', fix: 'Camp a midfielder on the penalty spot on every delivery and switch early to the defender nearest the landing zone. Ignore the ball, mark the runner.' },
  { tell: 'They only shoot finesse from the right side', fix: 'Show them the outside with your jockey angle and stand a defender in the near-post lane. Force the weak foot and the low percentage shot.' },
  { tell: 'Their fullbacks are permanently high', fix: 'The three-second transition is your entire game plan. Win it, go immediately, Wissa diagonal into the vacated channel.' },
  { tell: 'They skill-move constantly in your third', fix: 'Stop tackling entirely. Jockey, retreat, delay, and let the second defender arrive. Skill moves only beat committed defenders.' },
  { tell: 'They time-waste at the corner flag', fix: 'Send one player, not three. Cut the pass back into midfield with your controlled player and let the touchline do the rest.' }
];

DATA.subPlan = [
  { min: '60’', d: 'First stamina check. Any starter below roughly two thirds comes off — especially a winger, since your wide play is where the game is won late.' },
  { min: '70–75’', d: 'Pace onto the flanks. Fresh legs against tired fullbacks is the cheapest advantage in the game.' },
  { min: '80’+', d: 'If leading, use the third sub purely to burn clock at a stoppage. If chasing, the third sub is a box presence, not a midfielder.' }
];

DATA.competitiveNote = 'Rivals from Division 3 upward and all of Elite run competitive settings: reduced pass and shot assistance, faster defensive reactions. Drills that feel easy in Squad Battles will not transfer. Do your practice-arena reps with the same assistance you compete on, or you are training a different game.';

/* ---------------------------------------------------------------- *
 * 5. MECHANICS REFERENCE (mapped to the custom scheme)
 * ---------------------------------------------------------------- */

DATA.mechanics = [
  {
    group: 'Passing', items: [
      { n: 'Driven pass',        pad: '[R2]+[X]',   d: 'Your default forward pass. Faster, harder to intercept. Use it for every line-breaking ball into feet.' },
      { n: 'Through ball',       pad: '[TR]',       d: 'Weighted into space. Aim ahead of the runner, never at him.' },
      { n: 'Driven through',     pad: '[R2]+[TR]',  d: 'Flat and fast. The correct ball when the channel is open but the covering CB has recovery pace.' },
      { n: 'Lobbed through',     pad: '[L1]+[TR]',  d: 'Over the top of a high line. The one pass a compact low block cannot intercept.' },
      { n: 'Trivela',            pad: '[L2]+pass',  d: 'Outside of the foot. Leaves on a different line than your body shape advertises — the elite anti-read pass.' },
      { n: 'Give-and-go',        pad: '[L1]+[X]',   d: 'Hold the trigger as you pass and the passer runs. The core of every wall-pass pattern.' }
    ]
  },
  {
    group: 'Crossing', items: [
      { n: 'Driven cross',   pad: '[R2]+[O]', d: 'Whipped and hard. Aim beyond the far post so it moves away from the keeper.' },
      { n: 'Ground cross',   pad: '[L1]+[O]', d: 'Along the deck. The cutback and the near-post drive both live here.' },
      { n: 'Low / whipped',  pad: '[O] [O]',  d: 'Double tap. Flatter than a standard cross, quicker than a driven one.' },
      { n: 'Never float it', pad: 'rule',     d: 'A high floated cross gives the keeper and the CB time to set. Every cross you hit should be hard, low, or beyond the far post.' }
    ]
  },
  {
    group: 'Finishing', items: [
      { n: 'Standard shot', pad: '[SQ]',        d: 'Low, near post, from inside the box. Boring and high percentage.' },
      { n: 'Finesse',       pad: '[R2]+[SQ]',   d: 'Far corner from the edge of the box or a tight angle. Do not use it from close range.' },
      { n: 'Chip',          pad: '[L1]+[SQ]',   d: 'Only when the keeper has committed and come out. One touch, no hesitation.' },
      { n: 'Fake shot',     pad: '[SQ] then [X]', d: 'Freezes the defender and buys the half-yard for a cutback or a change of angle at the byline.' },
      { n: 'Aim, then power', pad: 'rule',      d: 'Set the direction before the power bar, not during. Rushed aim is why chances get dragged wide.' }
    ]
  },
  {
    group: 'Dribbling', items: [
      { n: 'Sprint',            pad: '[R1]',       d: 'Bursts only. Held sprint turns your first touch to concrete and makes you predictable.' },
      { n: 'Shield / protect',  pad: '[L2]',       d: 'Back to goal, body between ball and man. The corner-flag hold and every hold-up play starts here.' },
      { n: 'Ball roll',         pad: 'right stick sideways', d: 'The only skill move you actually need. Shifts the ball a yard to open a shot or a pass.' },
      { n: 'Drag back',         pad: 'right stick back + hold', d: 'Kills momentum and turns a dead byline run into a cutback lane.' },
      { n: 'Pause dribble',     pad: 'release sprint', d: 'Stopping is a move. AI defenders keep stepping — let them, then go past the shoulder they gave you.' }
    ]
  },
  {
    group: 'Defending', items: [
      { n: 'Jockey',            pad: '[L2]',        d: 'The whole skill. A meter off, goal-side, body angled to show them the sideline.' },
      { n: 'Sprint jockey',     pad: '[L2]+[R1]',   d: 'For quick attackers only. You lose turning ability, so use it to recover distance, not to engage.' },
      { n: 'Fight for the ball',  pad: '[X]',        d: 'Running alongside on the same line. Almost never a foul, and body position decides it rather than input volume.' },
      { n: 'Stand tackle',      pad: '[SQ]',        d: 'Tap out of the jockey stance on a trigger. Release the left stick as you press so you do not lunge through. Attacking, this same button is your shot — defending, it is the tackle.' },
      { n: 'Slide',             pad: '[O]',         d: 'Emergencies only. Never inside your own box. Attacking, this same button is your cross.' },
      { n: 'Second-man press',  pad: '[R2]',        d: 'One to two second bursts. Held, it drags Beckenbauer out and gift-wraps your middle.' },
      { n: 'Switch player',     pad: 'right stick flick', d: 'Set switching to Player Relative. You choose the defender — the game stops choosing badly for you.' }
    ]
  }
];

DATA.eliteDrills = [
  { t: 'Manual runs, 20 reps', d: 'Practice arena: trigger a run with [L1] and hit the through ball while the run is still developing. Most players trigger too late, when the defender has already recovered.' },
  { t: 'Trivela through, 20 reps', d: 'From the right half-space with [L2]+[TR]. Get comfortable with the curve before you need it at 1-1 in Elite.' },
  { t: 'Far-post driven crosses, 20 reps', d: 'From both flanks, aimed beyond the far post. Park wins those and no fullback in the game beats him in the air.' },
  { t: 'Free kicks, 10 each band', d: '22 yards central curled, 30 yards driven low, wide whipped. Learn your three distances rather than every distance.' },
  { t: 'Corners, both routines', d: 'Near-post flick and short corner. Ten each until the runner assignment is muscle memory.' },
  { t: 'Jockey-only defending', d: 'One full match with no tackle button at all. Delay, angle, and let help arrive. This drill fixes more goals conceded than any other.' }
];
