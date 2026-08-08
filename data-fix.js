/* ============ data-fix.js — the six named weaknesses, with drill scenes ============
   Pitch space 680 x 1050, attacking toward y=0. Defensive scenes use the 'bottom'
   camera (our own half); attacking scenes use 'box', 'top' or 'full'. */

/* ---------------------------------------------------------------- *
 * 0. BINDINGS CHECK — the one page five modules depend on
 * ---------------------------------------------------------------- */

DATA.bindingsNote = 'You swapped the shoulder buttons. In the default layout every shoulder button carries a separate attacking and defending job, and a remap moves some of those and not others. Rather than hedge this on six different pages, resolve it once. Ten minutes in the practice arena, write the answers down, and every drill in this app becomes exact.';

DATA.bindings = [
  { q: 'Which button is second-man press?', how: 'Defend in the arena and hold [R2], then hold [R1]. One of them sends a teammate at the ball carrier.', why: 'Default is the same physical button as the finesse modifier. Your swap probably moved it to [R2], but the app assumes that rather than knowing it.' },
  { q: 'Which button cycles the selected defender?', how: 'Press [L1] with no ball near you and watch whether selection steps to another player.', why: 'Default cycle switching is [L1], the same button you use to trigger runs in attack. Confirm it survived the remap.' },
  { q: 'Does the low driven shot still work?', how: 'Try [L1]+[R2]+[SQ] and [L1]+[R1]+[SQ] from the edge of the box. One produces a flat, low strike.', why: 'The driven shot is a stacked shoulder modifier, so it is the input most likely to have moved. Until you confirm it, this app does not teach it.' },
  { q: 'Right-stick switching reference', how: 'Settings, search for right-stick switching. Set it to Player Relative.', why: 'Player Relative keeps the origin on your current player so the same flick returns the same defender. Anything ball-weighted makes switching a lottery exactly when the box fills up.' },
  { q: 'Auto switching', how: 'A separate setting from the one above. Set it to Off, or the least aggressive option offered.', why: 'This is the setting that takes a player off you mid-cross. Fixing the switching reference alone does not fix this.' },
  { q: 'Defending face buttons (already confirmed)', how: 'Yours are set: [SQ] stand tackle, [O] slide, [X] fight for the ball. Every defending page in this app uses those.', why: 'Face buttons carry separate attacking and defending jobs, so the same [SQ] that shoots is the button that tackles. Worth re-checking only after a title update.' }
];

/* ---------------------------------------------------------------- *
 * 1. THE SIX MODULES
 * ---------------------------------------------------------------- */

DATA.fixes = [
  /* ================= DEFENCE ================= */
  {
    id: 'w-switch', side: 'defence', n: 1,
    title: 'Own the Switch Before the Ball Lands',
    symptom: 'You sprint the wrong defender across the pitch while the man who actually had to deal with the run jogs back into a shape that no longer matters, and by the time you fix it the receiver has already turned.',
    rootCause: 'A right-stick switch is not a click on a player. It behaves like a cone test: the game looks along the direction you flicked and picks a candidate inside it. On Player Relative the origin stays on your current player and angle dominates, so the same flick from the same shape returns the same man. On anything ball-weighted, an identical flick returns a different defender depending on where the ball happens to be, which is why switching feels random exactly when the box fills up. Two more things bite. The player you receive has to exit whatever animation he was already in, and online you pay network delay on top, so a switch requested on the receiver’s first touch lands a beat late. And the man you leave does not freeze — he reverts to AI and drifts back toward his tactical slot, so the lane you were plugging quietly reopens.',
    modelNote: 'The cone description is a model that predicts what you see, not published behaviour. The testable part is the part that matters: on Player Relative the same flick is repeatable, on ball-weighted settings it is not.',
    principles: [
      { t: 'Two settings, not one', d: 'Set the right-stick switching reference to Player Relative, and separately set auto switching to Off or the least aggressive option. These are different menu entries. Fixing only the first still leaves the game taking players off you during a cross. EA renames and moves both between titles, so search the settings for the words rather than following a menu path.' },
      { t: 'Flick at the player you want, not at the danger', d: 'Draw the line in your head from your current player’s boots to the boots of the man you want, then push the right stick along that exact line to full deflection and release. Your instinct is to flick toward the ball, which is precisely why you keep getting whoever is nearest the ball instead of whoever you named. When two defenders sit close together along that line, the tie-break is not yours — flick cleanly or do not switch at all.' },
      { t: 'Switch during flight, never on the touch', d: 'A fifteen-yard ground pass gives you about half a second, and input lag, animation exit and online delay eat a real chunk of it. A flick timed to the receiver’s first touch hands you control a beat late, which is the exact beat he uses to turn. The rule is absolute: the flick happens while the ball is between two opponents. Miss that window and you do not switch — you defend with the man you already have. A committed wrong defender beats a correct defender who arrives after the turn.' },
      { t: 'Take the cover, not the closest', d: 'The nearest defender is usually already committed, and the AI holds a committed line acceptably well. The player who decides the outcome is the one behind the play: the one covering the run or the far post. The AI is competent at holding shape and poor at tracking a runner into space, so give yourself the job it fails at. In your 4-3-3 that usually means taking Caleta-Car or Baresi as the covering centre-back and leaving Cafu or Lubhbrer on the wide man.' },
      { t: 'Frozen right thumb during any committed action', d: 'Once you press [SQ] to tackle or [O] to slide, a switch either gets eaten or queues and lands while your old defender is still recovering with nobody covering behind him. Jockey on [L2] is a held state, not an event — switching away drops the hold, the abandoned defender exits jockey and re-runs his positional routine, and the lane you were physically sealing opens. Practical rule: if your left thumb or left trigger is holding something, the right thumb does not move until it resolves. This is the cheapest goal you are currently conceding.' },
      { t: 'Price in the man you are abandoning', d: 'Every switch is a trade, not a free upgrade. Before you flick, ask whether the body you are leaving was the only thing plugging a half-space. He starts drifting back to his slot the moment you leave him, so that lane is open by the time the next pass arrives. Beckenbauer sitting in front of the centre-backs is the most expensive player on your team to abandon.' },
      { t: 'Cycle switching is a correction tool', d: 'Cycle switching steps through candidates in the game’s own proximity-biased order, which is exactly the logic you rejected. Use it only to fix a switch that landed on the wrong man while the ball is still travelling, never as a first choice, and never inside your own box where it will hand you the keeper. Confirm where it lives on your layout first — see the bindings check.' }
    ],
    drill: {
      name: 'Flight Window Only',
      where: 'Squad Battles on Legendary against a possession side, then one Rivals half with the same rule',
      setup: 'Confirm Player Relative first. Play your normal 4-3-3, no tactical changes. One rule for the whole half: the right stick may only be touched while the ball is travelling between two opponents. Not while an opponent is dribbling, not on the receiver’s touch, not while you are holding [L2] or in a tackle. Say every violation out loud so you actually count them.',
      reps: 'Two halves per session, three sessions in a week, then carry the rule into a Rivals half.',
      success: 'Under three late switches per half, and zero goals conceded in a sequence containing one. Hold that for two halves, then drop the counting and keep the timing.'
    },
    cues: [
      'Ball in flight, thumb moves. Ball on a foot, thumb is still.',
      'Flick at the man, not at the ball.',
      'Who is marking the receiver? Take him.',
      'One flick, one beat. Never two in a row.',
      'Holding [L2] or tackling? Right thumb is frozen.'
    ],
    mistakes: [
      { m: 'Flicking toward the ball or toward the danger', f: 'Flick along the line from your player’s boots to the target’s boots. Full deflection, clean release.' },
      { m: 'Starting the switch on the receiver’s first touch', f: 'Start it while the ball is still travelling. Missed the window? Do not switch.' },
      { m: 'Double-flicking to correct a bad switch', f: 'The second flick measures from the new player, so you jump two players away. One flick, wait a beat, then cycle if you still need to fix it.' },
      { m: 'Switching out of a held jockey to chase the ball', f: 'Finish the jockey. The abandoned man exits the hold and reopens the lane — which is where the cutback goes.' },
      { m: 'On crosses, taking whichever defender is nearest the ball', f: 'Take the defender with body position on the flight, normally your far-side centre-back, and let the AI keep the near post.' }
    ]
  },

  {
    id: 'w-close', side: 'defence', n: 2,
    title: 'Arrive Slow: Closing the Last Two Yards',
    symptom: 'You get near the ball carrier constantly but never actually get to him. He takes one touch across your body and you are behind him, or you bounce off the duel and chase from a worse position than you started.',
    rootCause: 'Sprint is a movement state, not a speed slider. While [R1] is held your defender is in a long-stride animation with a wide turn arc, and coming out of it costs a deceleration and a stance change. A defender still holding [R1] when the attacker touches the ball sideways cannot answer that touch, which the game renders as being skipped past. The gap feels uncloseable because you keep arriving in the one state that cannot cover the final two yards. The fix is not more speed. It is arriving with your control already back.',
    principles: [
      { t: 'Sprint most of the way, arrive on jockey', d: 'Hold [R1] to eat the bulk of the distance, then release and hold [L2] for the rest. Release while you can still see a full stride of gap — earlier than feels right, because the stance change lags your input. You do not stop when you let go, you keep your momentum and get your turn radius back. This is the one rule the other five modules all lean on: sprint is a state you have to exit early, and each module only differs on where its release point sits.' },
      { t: 'Aim the stick behind him, not at him', d: 'Point the left stick at the grass behind and inside the carrier rather than at his body. That bends your run into a curve, so you finish the approach already turned toward your own goal with your body on his inside shoulder. A square approach leaves your momentum perpendicular to his path, so recovering means a full turn. The curved approach makes it a small adjustment you can actually complete in jockey.' },
      { t: 'Fighting for the ball only works on the same line', d: 'The physical challenge on [X] resolves as a legal shoulder-to-shoulder duel only when your body is roughly parallel to the carrier and within a body width, with both of you moving. From behind it reads as a push and gives up a free kick. From square it reads as a collision and bounces you off. Get level first, then challenge. EA retunes contact strength between patches, so recheck the feel after a big update.' },
      { t: 'Press once, then steer with the stick', d: 'Physical duels resolve on strength, balance, body position and the direction of both players’ momentum, not on input volume. Mashing [X] queues repeat animations and locks you out of answering his next touch. Press once when you are level, then hold the left stick into his hip and keep walking your body across his running line. Beckenbauer and Caleta-Car win these from that position. Wissa or Park chasing back will not.' },
      { t: 'Use jockey contact to unbalance, not to tackle', d: 'Holding [L2] and walking into the carrier applies contact without committing to a tackle animation. You never extend a leg, so you cannot be beaten by the touch you were reaching for, and the contact still disturbs his touch. This is your default tool against a player shielding with his back to you: lean, ride the shield, and wait, rather than reaching in with [SQ] or [O].' },
      { t: 'Win it on the second contact', d: 'First contact almost never takes the ball. It makes his next touch heavy or knocks his body off its line, and the ball comes free a beat later. Plan the approach as two events: arrive under control and make contact, then hold [L2] through the recovery and collect the loose touch. Players who lunge on first contact are trying to compress a two-beat mechanic into one, which is why they end up on the floor.' },
      { t: 'Know when not to close at all', d: 'Do not press when you are the last man behind the ball, when they have you outnumbered in the box, or while the pass is still in flight. Hold [L2], retreat at his speed, keep your body between him and goal, and delay until cover arrives. Never drag Baresi or Caleta-Car out of the line to press — that is Beckenbauer’s job, with Park counter-pressing and a fullback stepping wide, because they have the recovery pace to afford it.' }
    ],
    drill: {
      name: 'Two-Speed Press, twenty reps',
      where: 'Kick Off against a top CPU side on Legendary, then the same self-rule in your next two Rivals games',
      setup: 'Your own 4-3-3. Turn off anything that moves your defender for you — search the settings for defending and for auto switching and set both to the most manual option offered, since the names move between titles. Ban [O] slide entirely for the session and ban holding the tackle button as a contain. Say three words out loud in time with your thumbs on every approach: sprint, release, jockey.',
      reps: '20 pressing approaches per session, roughly two matches.',
      success: 'At least 18 of 20 approaches end with you still between the carrier and your goal, zero slides used, and no more than 2 where you overrun the ball.'
    },
    cues: [
      'Let go of [R1] before you get there, not when you get there',
      'Run at the grass behind his inside shoulder, not at him',
      'One [X] when level, then steer with the stick',
      'Last man means mirror on [L2], not press',
      'Second contact wins it. The first one just makes it heavy'
    ],
    mistakes: [
      { m: 'Holding [R1] all the way into contact', f: 'Release while a stride of gap is still visible and let momentum carry you in on [L2].' },
      { m: 'Mashing [X] through the physical duel', f: 'One press when level, then hold the stick into his hip and let body position resolve it.' },
      { m: 'Approaching square, straight at the carrier', f: 'Curve the run so you arrive already goal-side on his inside shoulder.' },
      { m: 'Pulling Baresi or Caleta-Car out to press', f: 'Press with Beckenbauer or Park and let the centre-backs hold the line.' },
      { m: 'Starting the press while the pass is still travelling', f: 'Time your arrival to land on his first touch, not before it.' }
    ]
  },

  {
    id: 'w-1v1', side: 'defence', n: 3,
    title: 'Show Them the Line: Winning the Wing 1v1',
    symptom: 'You mirror the winger for two touches, then one cut inside puts him past your fullback for a shot or a cutback, and it always feels like your defender reacted half a second late.',
    rootCause: 'If you are answering his touch instead of pre-empting it, you lose this duel more often than you win it. A dribble touch is a cheap, quick action; your re-plant after a direction change is not, and it gets more expensive the faster you were already moving. Squaring up turns every duel into a reaction duel, because both lanes are live and you can only answer after the touch. Elite wing defending is not faster reacting. It is removing one lane before the touch happens, so his only cheap option is the one your body is already pointing at.',
    principles: [
      { t: 'Sit on the ball-to-near-post line, not on the man', d: 'Goal-side is not level with the attacker, it is standing on the straight line from the ball to your near post. From there the shortest route to your goal runs through your body, and everything else costs him time and touches. While you hold [L2], read your position against the post, not against his feet. If you can see daylight between yourself and the near post, you are already beaten and just have not been punished yet.' },
      { t: 'Lead with your inside shoulder, never square up', d: 'Angle your defender so his goal-side shoulder is half a step ahead of the attacker’s, feet pointing down the touchline rather than straight at the ball. Squared up, you are offering a coin flip that resolves in his favour because your answer is one action behind. Angled, the inside cut has to travel through your standing hip, so the only cheap lane left is the one heading toward the chalk. You are not guessing which way he goes — you are choosing it for him.' },
      { t: 'The touchline is your second centre-back', d: 'A winger on the chalk has lost half his options and can only go backwards, inside through you, or into a cross you can see coming. Set your jockey angle to push him toward your own corner flag rather than the byline, so his momentum points away from goal. Out of play is a turnover with zero tackle risk and zero foul risk — treat a throw-in as a completed defensive action, not a failure.' },
      { t: 'Match his velocity, never change yours in contact', d: 'Retreat at exactly his pace so relative speed stays near zero. When he knocks it past you, you are already travelling that way and gain nothing by reversing. Hold [L2] and feather the left stick: small deflections give you shuffle speed and a tight turn, full tilt commits your weight. Add [R1] only in a straight line to recover ground, and release it before you enter his touch radius, because sprint jockey turns on an arc too wide to mirror a cut.' },
      { t: 'Never tackle a facing attacker with the ball at his feet', d: 'A tackle input starts an animation with recovery frames and forward momentum, which is exactly what every skill move is built to punish. On your layout that is [SQ] for the standing tackle and [O] for the slide. Press only when the ball leaves his foot on a heavy touch, when he turns his back, or when a second man has already forced the touch. Otherwise your right thumb does nothing at all in this duel.' },
      { t: 'Patience beats skill moves, with one honest exception', d: 'Most skill moves buy a small lateral displacement that a good jockey angle covers easily, as long as your momentum is not already going the wrong way. So the counter to skill spam is not a read, it is patience: keep retreating, keep the angle, keep the thumb off the face buttons. The exception matters though — a small number of moves each cycle genuinely do beat a passive jockey. If the same move beats you twice in one game, stop mirroring: force him into traffic, bring the second man, or take the foul.' },
      { t: 'Outpaced? Defend the corner flag, not the ball', d: 'If the winger has real pace on Cafu or Lubhbrer and help is far away, mirroring is not on the menu. Start deeper and wider, and start retreating on the pass rather than on his first touch. Concede the outside deliberately and angle so his fastest lane runs to the corner flag instead of the byline, then defend the cross rather than gambling inside. Hold second-man press in a short burst so Beckenbauer or Park seals the inside lane while you hold the outside, and release as soon as help arrives — a press held too long overruns the ball and opens the exact lane you were protecting. A throw-in twenty-five yards from your goal is a full win here.' }
    ],
    drill: {
      name: 'The Chalk Funnel',
      where: 'Practice arena defending, or the advanced defending skill game, then carried into Rivals as a live self-rule',
      setup: 'Start your fullback about thirty yards from your own goal line, wide, with the attacker receiving on the wing. Rule for the whole session: your right thumb stays completely off the tackle buttons — no [SQ], no [O], at any point. [L2] is held from the first touch to the end of every rep.',
      reps: '10 duels down the right, 10 down the left. Feather the left stick for all steering, use [R1] only in straight lines and release it before contact. One short second-man-press burst per rep. A rep is void the instant you press a tackle button or hold sprint into contact.',
      success: '7 of 10 reps end in a throw-in, a backwards pass, or the attacker still outside the box after six seconds, with zero reps where he gets goal-side of you on the inside.'
    },
    cues: [
      'Inside shoulder first. Never face him.',
      'Feather the stick. [R1] only in straight lines.',
      'Thumb off the tackle buttons. Let him run out of pitch.',
      'Same speed, backwards. Zero relative pace.',
      'Short press burst, then let go.'
    ],
    mistakes: [
      { m: 'Holding [R1] all the way into contact to keep up', f: 'Release before contact and finish the duel on [L2] alone.' },
      { m: 'Holding contain on the wing', f: 'Contain walks your defender at the ball and squares him up for you. Steer manually with [L2] and tiny stick inputs.' },
      { m: 'Cycling players mid-duel', f: 'You inherit a defender with the wrong momentum and no angle. Stay on the man who has body position and call help instead.' },
      { m: 'Standing still and waiting for the winger to arrive', f: 'Start retreating on the pass, before his first touch, so you never defend a runner from zero velocity.' },
      { m: 'Tracking the ball instead of the near post', f: 'Hold the ball-to-near-post line. If daylight opens between you and the post, reset before you worry about the ball.' }
    ]
  },

  /* ================= ATTACK ================= */
  {
    id: 'w-composure', side: 'attack', n: 4,
    title: 'Two Touches, One Decision',
    symptom: 'You arrive in the box in a good position and the ball just evaporates: a heavy touch, a blocked shot from a silly angle, or a tackle you never saw. Three seconds later you are chasing a counter with both fullbacks upfield.',
    rootCause: 'Touch length scales with your speed and with the dribble animation set you are in. Holding [R1] puts you in the sprint set, which takes fewer, longer touches and a wider turn arc, so inside the box the ball routinely travels outside your control radius and into a tackle before you can react. The second half is the receiving animation: a trap you have not pre-inputted commits you for a beat, and that beat is exactly what the second-man press is built to arrive in. A first-time input made before the ball arrives replaces the trap rather than interrupting it, which is why the pre-input is the whole fix. Panic is not a mood. It is you starting your decision after that window has already opened.',
    principles: [
      { t: 'Come off [R1] before you cross the 18', d: 'Release as your player crosses the eighteen-yard line, not when you already feel crowded — by then the heavy touch is committed. If you still need to cover ground, hold [L2] with the left stick pointed where you are going. You lose top speed, but the touches come shorter and more often and the ball stays inside your body shape.' },
      { t: 'Decide while the ball is still travelling', d: 'The scan happens while the pass is in the air, not when it arrives. As you release the ball into the box, glance at the radar, count the shirts around your target, and name the outcome in your head: near post, cutback, or layoff. When the ball lands you are executing a decision you already made, and that is the entire difference between looking calm and looking frantic. No scan? Your outcome is [L2] shield until you get one.' },
      { t: 'Point your first touch at grass', d: 'First-touch direction is set by where the left stick points as the ball reaches you, which makes it an input you commit to before you have the ball. Hold the stick toward the open channel so the touch carries you away from the nearest body. A neutral stick gives you a dead trap under your feet, which is the worst outcome in traffic because you then need a second touch just to move. Feed weight matters too: a driven pass [R2]+[X] arrives harder and bounces further off the first touch, so do not drive it into a crowded pocket.' },
      { t: 'Three legal outcomes, and how to pick', d: 'Near-post shot when the defender is behind you rather than across you and there is a gap between keeper and post — a normal [SQ] at low power. Cutback when you are level with the six-yard box or wider on the byline and a runner is arriving — ground cross [L1]+[O], aimed behind the last defender rather than at your runner’s feet. Layoff [X] to the edge whenever neither is clean, which will be most of the time. Which of the near-post shot and the finesse is stronger moves between patches: take ten of each in the arena at the start of a title or after a gameplay update and use whichever is actually going in.' },
      { t: 'One-touch it, do not dribble it', d: 'Pre-input [X] while the ball is still travelling; the pass leaves in the direction the stick points at the moment of contact, so set the stick before you press. With Abily, Neymar and Ronaldinho on the pitch you have the quality to run one-touch triangles inside the eighteen. The give-and-go is the cleanest way in: hold [L1] through the [X] — that stack is the give-and-go — then release immediately, and only re-tap after the return has arrived. Dribbling in the box asks you to beat contact animations; one-touch play asks defenders to beat pass speed, and pass speed wins.' },
      { t: 'Shield and reset is a completed action', d: '[L2] with the left stick held away from the nearest defender protects the ball and buys you close to a second while your midfield arrives. You are not stuck there: shield, let the second defender commit, then release and lay it back with [X]. Judge the choice by what you hand the opponent, not by whether it looked ambitious. A shielded reset gives them nothing. A forced shot into a shin gives them the ball facing the right way with your defence split.' },
      { t: 'A recycled attack beats a lost ball', d: 'When you lose it in the box, Lubhbrer and Cafu are high and Beckenbauer is your only cover. When you recycle to the edge, the worst case is you go sideways and re-enter three seconds later against a defence that has collapsed narrow and static. Second and third entries into the same box are where cutbacks actually land, because the block has pulled toward the ball and the penalty spot is empty. Track box entries per possession rather than shots per game and the composure follows the metric.' }
    ],
    drill: {
      name: 'Two-Touch Box',
      where: 'Kick Off versus Legendary CPU, then the same self-rule live in Rivals',
      setup: 'Your 4-3-3 against a top defensive side with quick centre-backs, six-minute halves. Keep your exact Rivals controller settings and camera — switch to assisted for the drill and nothing transfers. Two rules: [R1] is banned inside the eighteen-yard box, and every player gets a maximum of two touches in there. Break either and the possession scores as a fail even if you score.',
      reps: '20 box entries per session, three sessions across three days, then one Rivals match under the same rules.',
      success: '16 of 20 box entries end in a shot on target, a cutback that reaches a teammate, or a completed layoff to the edge, with zero possessions lost to a dribble attempt inside the eighteen.'
    },
    cues: [
      '[R1] off at the 18. Every time, not just when it looks tight.',
      'Decide while the ball is in the air, not when it is at your feet.',
      'First touch into grass, not into a shirt.',
      'Two touches, then it leaves: shot, cutback, or layoff.',
      'No clear option means [L2] and reset, not a shot.'
    ],
    mistakes: [
      { m: 'Holding [R1] into the box because you are still trying to beat the last man', f: 'Beat him before the eighteen or not at all. Carry with [L2] and the left stick if you need to keep moving.' },
      { m: 'Taking one extra touch to line the shot up properly', f: 'That extra touch is where the block comes from. Shoot on touch one or two, or hand it to someone who can.' },
      { m: 'Reaching for finesse from a tight angle near the byline', f: 'The curl brings the ball back into the keeper’s reach. Normal [SQ] at low power into the near-post gap, or cut it back.' },
      { m: 'Trying to turn and face goal after receiving with your back to it', f: 'Turning in traffic is a long animation you will not survive with three bodies around you. [L2], shield, lay it back.' },
      { m: 'Treating a layoff to the edge as a wasted attack', f: 'Score it as a success. Abily on the edge against a collapsed block is a better next ball than a coin-flip shot through two defenders.' }
    ]
  },

  {
    id: 'w-wing', side: 'attack', n: 5,
    title: 'Win the Touchline',
    symptom: 'You get Neymar or Athenea the ball in a good wide position, take a touch inside, feel a defender arrive on your back, hold [L2], and either get bumped off it anyway or recycle backwards to your own centre-back.',
    rootCause: 'Shielding is a contact state the game grants you, not an effect the button applies. Shield resolution depends on your speed and on which side the contact arrives, and EA retunes contact strength between updates. What reliably holds is killing your momentum for a beat before you ask for it. Above a jog you get a shielded dribble instead, where the ball still sits ahead of your hip and the first real contact takes it. The wing makes this worse because you almost always receive while already drifting inside and half facing your own half, so you enter contact at pace and pointed the wrong way. The panic backpass, the heavy touch into their covering midfielder, the 1v2 — all downstream of arriving in the wrong body position.',
    principles: [
      { t: 'Shield is a speed state, not a button', d: 'Kill your momentum for one beat before you ask for the shield. Let the left stick go neutral or feather it, then hold [L2], and you will see the animation change: hips square to the defender, arms out, ball moved to the far foot. Hold [L2] while still carrying speed and you get a shielded dribble with the ball in front of your hip, which any contact strips.' },
      { t: 'Stick away shields, stick at him jockeys', d: 'The same [L2] does two different jobs depending on where the left stick points relative to the pressing defender. Point it away from him — toward the corner flag or back toward your own goal — and you get the shield. Point it at him and you get a face-up jockey, which on the wing means containing a man who is already behind you while the ball sits exposed. Decide which one you want before you press.' },
      { t: 'Roll him out, never walk out', d: 'Once he leans into your back, that lean is committed and he owes a re-plant before he can move again. Half-circle the left stick around your own body, from pointing away from goal to pointing up the pitch, release [L2] the instant you clear his hip, then [R1] out of it. Keep [L2] held while trying to walk away and you stay locked in the contact state while he recovers for free. Neymar and Athenea have the agility to turn that re-plant window into two or three yards. A big striker would not.' },
      { t: 'First touch to the touchline, body half open', d: 'Release [R1] one beat before the ball arrives and push the stick toward the line, so the touch lands in the channel their holding midfielder cannot reach. Touch inside and you are feeding the ball straight into their cover. Get there by drifting toward the corner flag as the pass is played rather than standing still, so you receive moving outward and already half turned. This is the wing-specific version of the first-touch rule in the composure module — same mechanic, different target.' },
      { t: 'Escape a 1v2 backwards and outside', d: 'When the fullback jumps and their midfielder tucks across, the space in front of you is gone and no skill move solves it. Retreat with [L2] pointed back toward your own corner, then release into a short [X] and immediately take the give-and-go so you get it back facing forward. That triangle beats the double team because the ball moves faster than two defenders can rotate. On the right the out-ball is Cafu, who genuinely overlaps. On the left it is Abily or a manual switch, because Lubhbrer is a Falseback and tucks inside by design — if you want a left overlap you have to do it manually and accept the rest-defence cost.' },
      { t: 'Make him commit before you pick a side', d: 'Defenders read your sprint and your hip angle, so a winger arriving at full speed has already told them where he is going. Come in at a jog with [R1] off, strafe with [L2] toward the line, and only accelerate once his plant foot goes outside. Once he sells outside, cut in for [R2]+[SQ] across goal or slide a driven ball into the far-post run. If he refuses to bite and sits inside, stay outside and hit the ground cross [L1]+[O] to the near post instead of forcing the cut. Check which foot your specific Neymar and Athenea cards are, because versions differ.' },
      { t: 'Use the corner flag, and know when not to shield', d: 'With a lead, driving into the corner and holding [L2] with your back to the field is a real weapon: the defender can only wait or foul, and either outcome is yours. But shielding is wrong in three situations. When a second defender is arriving, because the shield only protects one axis and the second man takes it from the open side — release early with [X]. When the defender is jockeying patiently instead of lunging, because you are handing their shape time to reset. And when there is space in front of you, since a shield throws away a face-up dribble you had already won.' }
    ],
    drill: {
      name: 'Touchline Lab: receive, hold, release',
      where: 'Squad Battles on Legendary as the lab, then Rivals as a live self-rule',
      setup: '4-3-3, Neymar left. Start every possession from Baresi and go through the left channel only for the first fifteen minutes. Ban first-time passes inside from the wing so you are forced to actually receive and hold.',
      reps: '20 wide receptions per session, each running the same sequence: release [R1] before the ball arrives, first touch toward the line, then pick one of three exits within a second. Exit A: roll out of the shield with a half-circle stick and [R1]. Exit B: lay it back with [X] to Abily and immediately take the give-and-go. Exit C: on the right side only, send Cafu outside you and cut inside once the defender commits — check who actually starts moving before you commit the pass, because the trigger picks the nearest supporting player and it may take Park instead.',
      success: 'On 15 of 20 you still have the ball three seconds later and it has not travelled back past your own halfway line. Count out loud during the session, do not grade it on feel afterwards.'
    },
    cues: [
      'Slow down first, then [L2]. Speed kills the shield.',
      'Stick to the corner flag, not into his chest.',
      'One second of shield, then leave. Never two.',
      'Touch to the line. Inside is where their cover lives.',
      'Wait for his plant foot, then go the other way.'
    ],
    mistakes: [
      { m: 'Holding [L2] at full speed and wondering why you get bumped off it', f: 'Kill momentum for a beat with the stick neutral, then hold [L2] and let the shield lock in before you do anything else.' },
      { m: 'Shielding with the left stick pointed at the defender', f: 'Point it away from him. Stick at him is a jockey, which on the wing leaves the ball exposed to a man already behind you.' },
      { m: 'Parking in the shield while their whole shape recovers', f: 'Treat it as a pause button worth about a second. Freeze his feet, then roll out or lay it back.' },
      { m: 'Taking the first touch inside because you already decided to shoot', f: 'Touch to the line every time, then cut in only after the defender bites.' },
      { m: 'Trying to out-muscle a 90-rated centre-back with Neymar or Athenea', f: 'These are agility cards, not strength cards. Use the shield to draw the lunge or buy the yard for the roll-out, never to win a leaning contest.' }
    ]
  },

  {
    id: 'w-runs', side: 'attack', n: 6,
    title: 'Trigger Early, Pass Late',
    symptom: 'Your runners arrive after the passing lane has already closed, the ones who do arrive get flagged offside, and you end up recycling sideways to Beckenbauer instead of playing forward.',
    rootCause: 'A triggered run is a request handed to the AI, not an instant change of state. The runner needs time to reach full speed and then to bend past the last defender, while offside is judged at the frame the ball leaves your foot, not when it arrives. So a run triggered at the moment you want to pass is either too slow to beat the covering defender, or — if you wait for it to develop — already beyond the line. On top of that, [L1] is also a pass modifier, so the button that starts the run rewrites [TR], [O] and [X] for as long as you hold it. That is why the pass at the end of a held run so often leaves your foot as something you never chose.',
    principles: [
      { t: 'Trigger before the lane exists, not when you see it', d: 'The run is what opens the lane, so it has to be moving before the lane is there. Tap [L1] while the ball is still travelling to your carrier, or on the first touch, so the run is at speed as your second touch sets up the pass. Trigger only once you have identified the gap and the covering defender has already recovered by the time your winger arrives.' },
      { t: 'Point the stick at the man you want, then tap', d: 'Point the left stick at the player you want before you tap [L1], then confirm who actually started moving before you commit the pass. With Wissa on a False 9 role he is often the deepest forward rather than the furthest forward, so the straight-up-the-pitch trigger frequently picks somebody else — which in this system is a feature, not a bug. Some titles let you steer a live run with the right stick while [L1] is held; that binding has moved between releases, so test it rather than trusting any guide.' },
      { t: 'Tap and re-tap, never hold through the pass', d: 'Every pass button changes meaning while [L1] is down: [L1]+[TR] is a lobbed through, [L1]+[O] a ground cross, [L1]+[X] a give-and-go. Intend a threaded ground ball, hold the trigger, and you chip it to the keeper. Tap, release, re-tap about every second to refresh the run, and make sure the trigger is up before [TR] leaves your thumb. The one exception is the give-and-go, where holding through the [X] is the point — release immediately after, and re-tap only once the return has arrived.' },
      { t: 'Read the last defender before you trigger', d: 'Check the radar, not the camera. If your winger is already level with the second-last defender, a straight run is offside before the ball leaves your foot and no amount of pass timing fixes it. Trigger when he is at least a body behind the line, or when their line is stepping up and he can time his own start into it. Against a high flat line, trigger from wide so the run crosses the line diagonally — a diagonal run crosses later than a vertical one from the same start.' },
      { t: 'Role is half your run timing, and you set it before kickoff', d: 'Winger holds the touchline and runs outside the fullback. Inside Forward starts wide and attacks the channel between centre-back and fullback. Advanced Forward runs the shoulder of the last man. A playmaker role checks to feet and gives you a short, half-committed run even when you trigger it. Decide the shape first: in this system Neymar on Winger gives you the isolated touchline, Athenea on Inside Forward gives you the right channel, and no button gets you both from the same player in the same phase. Keep Abily on a come-to-feet role so you always have an outlet when the run is covered.' },
      { t: 'Know whether you want a run in behind or a run to receive', d: '[L1] only makes the first kind. The run to receive comes from role and from leaving a player alone, which is why triggering everyone leaves you with nobody to pass to. The elite version is the decoy: trigger Neymar to drag the fullback and centre-back backwards, then drive [R2]+[X] into Park arriving in the half-space Neymar just emptied. The run that never receives the ball is often the one that created the goal.' },
      { t: 'Break the fullback with two threats and pass to the grass', d: 'Carry with Abily at the inside shoulder of their right-back while a triggered run goes outside him. The fullback has to pick, and whichever he picks is the ball. If he steps to the dribble, release [TR] with a short power tap into the grass outside the covering centre-back, in front of the runner and never at him. If he drops with the run, the pocket is yours for [R2]+[SQ] or a driven ball to Park. Save [R2]+[TR] for when there is clear grass and your runner already has the shoulder, because the driven through arrives fast and flat and runs away from anyone still turning.' }
    ],
    drill: {
      name: 'Trigger, Count, Pass',
      where: 'Practice arena with defenders enabled for the mechanics, then Squad Battles on Legendary as the live test',
      setup: 'Your 4-3-3 with the roles you actually play: Neymar Winger, Athenea Inside Forward, Wissa False 9, Abily coming to feet. Start every rep with Abily receiving in the left half-space around halfway, defenders on.',
      reps: '20 reps a session. Reps 1–10: tap [L1] as your first touch lands, say “one, two” out loud while you carry diagonally at the fullback, release [TR] on “two”. Reps 11–15: deliberately hold [L1] through the pass so you feel the lob and learn the mistake by hand. Reps 16–20: deliberately wait until “three” so you see how far past the line the runner has gone. Then five Legendary matches with one rule: no forward pass to a runner you did not trigger clearly earlier.',
      success: 'Across the five live matches: two or fewer offsides per match, at least three triggered runs per match that receive facing forward, and zero accidental lobbed through balls. An accidental lob means [L1] was still down.'
    },
    countNote: 'The count is a metronome, not physics. Its job is to stop you passing on the trigger. The real cue is that the runner is at full stride and still behind the last defender — a False 9 drop and a standing winger do not share a timing.',
    cues: [
      'Trigger on the first touch, pass on the second.',
      'Point the stick at him, then tap [L1].',
      'Let go of [L1] before [TR] or you chip it.',
      'Check the last dot on the radar before you trigger.',
      'One, two, pass. If you reach three, release and reset him.'
    ],
    mistakes: [
      { m: 'Tapping [L1] the instant you spot the gap', f: 'Trigger a beat before the gap exists. The run is what makes the gap, so it has to be at speed already.' },
      { m: 'Holding [L1] all the way through the pass and lobbing it to the keeper', f: 'Release [L1], then press [TR]. Re-tap every second or so to keep the run alive between passes.' },
      { m: 'Triggering with the stick pointed straight up the pitch', f: 'Angle the stick at the player you actually want, then check who started moving before you commit.' },
      { m: 'Spamming a second trigger when the first run is already beyond the line', f: 'Release and let him check back. Offside is judged when the ball leaves your foot, so a reset buys a legal yard.' },
      { m: 'Putting every forward on a run-in-behind role, then finding nobody shows for the ball', f: 'Keep Abily coming to feet. One outlet who never runs in behind is what makes the runs playable.' }
    ]
  }
];

/* ---------------------------------------------------------------- *
 * 2. DRILL SCENES
 * ---------------------------------------------------------------- */

DATA.fixScenes = {};

/* ---------- D1 · right-stick switching ---------- */
DATA.fixScenes['w-switch'] = {
  id: 'fx-switch', name: 'Pre-switch to the receiver', view: 'bottom',
  coach: [
    [0,    'They have the ball centrally. You are controlling <b>Beckenbauer</b>, and your instinct is to run at the ball.'],
    [700,  'Wrong question. Ask instead: <b>where is the pass going?</b> Their winger is the only free man.'],
    [1300, 'Flick the right stick <b>toward Cafu</b> while the ball is still at their feet. Switch early, not on arrival.'],
    [2100, 'The pass is now travelling toward a player whose marker you already control.'],
    [2900, 'Cafu steps across and takes it. <b>You were there before the ball was.</b>'],
    [3700, 'That is the whole skill: switch to the man marking the receiver, never to the man nearest the ball.']
  ],
  actors: [
    { id: 'BECK',   x: 330, y: 700 }, { id: 'CAFU', x: 596, y: 660 },
    { id: 'CALETA', x: 420, y: 830 }, { id: 'BARESI', x: 258, y: 830 },
    { id: 'LUB',    x: 96,  y: 690 }, { id: 'PARK', x: 250, y: 590 },
    { id: 'D1', x: 336, y: 600 }, { id: 'D2', x: 600, y: 500 }, { id: 'D3', x: 200, y: 520 },
    { id: 'D4', x: 430, y: 480 }
  ],
  ball: { holder: 'D1' },
  steps: [
    { type: 'flash', t0: 1300, at: { x: 596, y: 640 }, label: 'SWITCH' },
    { type: 'run',  actor: 'CAFU', t0: 1500, t1: 2800, to: { x: 598, y: 540 } },
    { type: 'pass', from: 'D1', t0: 2100, t1: 2900, to: { x: 600, y: 512 } },
    { type: 'steal', actor: 'CAFU', t0: 2900 },
    { type: 'flash', t0: 2900, at: { x: 598, y: 528 }, label: 'WON' },
    { type: 'pass', from: 'CAFU', t0: 3400, t1: 4100, to: 'PARK', driven: true }
  ],
  dur: 4900
};

/* ---------- D2 · closing down under control ---------- */
DATA.fixScenes['w-close'] = {
  id: 'fx-close', name: 'Two-speed closedown', view: 'bottom',
  coach: [
    [0,    'They are carrying at you with grass ahead. Standing off invites the shot; charging in gets you skipped.'],
    [600,  '<b>[R1] sprint</b> — but only to eat the bulk of the gap. This part is pure travel.'],
    [1700, '<b>Release the sprint now</b>, while a stride of gap is still visible. A defender arriving at full speed cannot change direction, and that is what they are counting on.'],
    [2300, 'Arrive on <b>[L2]</b>, about a metre off, body angled to show them the outside.'],
    [3100, 'They take a touch too heavy. That is the trigger.'],
    [3600, '<b>[X] to fight for it</b>, running alongside on the same line. Not a lunge — a lean.']
  ],
  actors: [
    { id: 'BECK', x: 330, y: 780 }, { id: 'CALETA', x: 430, y: 880 },
    { id: 'BARESI', x: 240, y: 880 }, { id: 'CAFU', x: 590, y: 800 },
    { id: 'D1', x: 330, y: 560 }, { id: 'D2', x: 500, y: 520 }, { id: 'D3', x: 180, y: 540 }
  ],
  ball: { holder: 'D1' },
  steps: [
    { type: 'flash', t0: 600,  at: { x: 330, y: 720 }, label: 'R1' },
    { type: 'run',  actor: 'BECK', t0: 600,  t1: 1700, to: { x: 332, y: 640 } },
    { type: 'carry', actor: 'D1', t0: 500, t1: 2400, to: { x: 348, y: 620 }, withBall: true },
    { type: 'flash', t0: 1700, at: { x: 332, y: 640 }, label: 'RELEASE' },
    { type: 'run',  actor: 'BECK', t0: 1800, t1: 2600, to: { x: 344, y: 660 } },
    { type: 'flash', t0: 2300, at: { x: 344, y: 668 }, label: 'L2' },
    { type: 'carry', actor: 'D1', t0: 2400, t1: 3400, to: { x: 424, y: 636 }, withBall: true },
    { type: 'run',  actor: 'BECK', t0: 2600, t1: 3500, to: { x: 412, y: 664 } },
    { type: 'flash', t0: 3100, at: { x: 440, y: 620 }, label: 'HEAVY' },
    { type: 'steal', actor: 'BECK', t0: 3700 },
    { type: 'flash', t0: 3700, at: { x: 420, y: 656 }, label: 'X' }
  ],
  dur: 4600
};

/* ---------- D3 · 1v1 on the wing ---------- */
DATA.fixScenes['w-1v1'] = {
  id: 'fx-1v1', name: 'Hold the wing 1v1', view: 'bottom',
  coach: [
    [0,    'Their winger runs at Cafu with space. You will lose this every time if you square up to him.'],
    [700,  'Take the <b>inside shoulder</b>. Stand on the ball-to-near-post line, so the only door open is the touchline.'],
    [1600, 'Retreat at <b>his</b> pace, not yours. Small stick inputs on <b>[L2]</b>, no lunge, no tackle button.'],
    [2500, 'He is drifting wide because you gave him nothing else. The touchline is now a second defender.'],
    [3300, 'Short second-man burst — Beckenbauer seals the inside lane. Release it as soon as he arrives.'],
    [4100, 'Trapped, facing his own corner flag. <b>Now</b> you take it.']
  ],
  actors: [
    { id: 'CAFU', x: 566, y: 700 }, { id: 'BECK', x: 400, y: 760 },
    { id: 'CALETA', x: 430, y: 880 }, { id: 'BARESI', x: 268, y: 880 },
    { id: 'D1', x: 580, y: 520 }, { id: 'D2', x: 430, y: 560 }, { id: 'D3', x: 300, y: 500 }
  ],
  ball: { holder: 'D1' },
  steps: [
    { type: 'run',  actor: 'CAFU', t0: 700,  t1: 1600, to: { x: 548, y: 640 } },
    { type: 'flash', t0: 900,  at: { x: 520, y: 626 }, label: 'INSIDE SHOULDER' },
    { type: 'carry', actor: 'D1', t0: 600, t1: 2500, to: { x: 606, y: 640 }, withBall: true },
    { type: 'run',  actor: 'CAFU', t0: 1700, t1: 2700, to: { x: 578, y: 690 } },
    { type: 'flash', t0: 2500, at: { x: 642, y: 660 }, label: 'TOUCHLINE' },
    { type: 'carry', actor: 'D1', t0: 2600, t1: 3900, to: { x: 630, y: 748 }, withBall: true },
    { type: 'run',  actor: 'BECK', t0: 3300, t1: 4200, to: { x: 566, y: 760 } },
    { type: 'flash', t0: 3300, at: { x: 500, y: 764 }, label: 'SECOND MAN' },
    { type: 'run',  actor: 'CAFU', t0: 2800, t1: 4100, to: { x: 606, y: 786 } },
    { type: 'steal', actor: 'CAFU', t0: 4300 },
    { type: 'flash', t0: 4300, at: { x: 618, y: 770 }, label: 'TRAPPED' }
  ],
  dur: 5300
};

/* ---------- A1 · composure in the box ---------- */
DATA.fixScenes['w-composure'] = {
  id: 'fx-composure', name: 'Three outcomes, decided early', view: 'box',
  coach: [
    [0,    'Ball is coming to Neymar in a crowded box. Four defenders, no clean shot.'],
    [600,  '<b>Let go of [R1] before you receive.</b> Sprint lengthens the touch and widens the turn — this is the single fix.'],
    [1400, 'You should already know your answer. In a crowded box there are only three: near-post shot, cutback, or lay it back.'],
    [2100, 'Nothing is on. Do not force it — <b>[L2]</b>, shield, one small touch to buy the angle.'],
    [2900, '<b>Lay it back to the edge.</b> Park is arriving with the whole picture in front of him.'],
    [3600, 'First time, low, through the traffic. A recycled attack beats a lost ball every time.']
  ],
  actors: [
    { id: 'NEY', x: 250, y: 190 }, { id: 'WISSA', x: 340, y: 110 },
    { id: 'PARK', x: 372, y: 330 }, { id: 'ATH', x: 540, y: 180 },
    { id: 'ABILY', x: 200, y: 330 },
    { id: 'D1', x: 300, y: 130 }, { id: 'D2', x: 372, y: 96 }, { id: 'D3', x: 244, y: 120 },
    { id: 'D4', x: 420, y: 180 }, { id: 'D5', x: 340, y: 28 }
  ],
  ball: { holder: 'NEY' },
  steps: [
    { type: 'flash', t0: 600,  at: { x: 250, y: 178 }, label: 'RELEASE R1' },
    { type: 'flash', t0: 1400, at: { x: 340, y: 258 }, label: '3 OPTIONS' },
    { type: 'run',  actor: 'D3', t0: 1600, t1: 2600, to: { x: 268, y: 168 } },
    { type: 'carry', actor: 'NEY', t0: 2100, t1: 2800, to: { x: 226, y: 216 }, withBall: true },
    { type: 'flash', t0: 2200, at: { x: 214, y: 216 }, label: 'L2' },
    { type: 'run',  actor: 'PARK', t0: 1800, t1: 3400, to: { x: 336, y: 214 } },
    { type: 'pass', from: 'NEY', t0: 2900, t1: 3400, to: { x: 334, y: 212 } },
    { type: 'shot', from: 'PARK', t0: 3600, t1: 4050, to: { x: 302, y: 10 }, driven: true },
    { type: 'goal', t0: 4050 }
  ],
  dur: 4900
};

/* ---------- A2 · wing play and shielding ---------- */
DATA.fixScenes['w-wing'] = {
  id: 'fx-wing', name: 'Receive, shield, release', view: 'top',
  coach: [
    [0,    'Athenea is about to receive on the right with a defender already tight behind.'],
    [700,  'First touch goes <b>toward the touchline</b>, never inside. Inside is where their cover is standing.'],
    [1500, '<b>[L2]</b> with the stick pointed away from him. Kill your momentum first — shielding does not hold at sprint.'],
    [2400, 'Now you are not trapped, you are <b>waiting</b>. Cafu is already coming outside you.'],
    [3100, 'Lay it into the overlap and spin off. Two players, one defender, done.'],
    [4000, 'Byline, then the low pull-back. This is what wide play looks like when you cannot out-sprint anyone.']
  ],
  actors: [
    { id: 'ATH', x: 596, y: 430 }, { id: 'CAFU', x: 570, y: 610 },
    { id: 'PARK', x: 400, y: 330 }, { id: 'WISSA', x: 330, y: 180 }, { id: 'NEY', x: 130, y: 300 },
    { id: 'D1', x: 604, y: 356 }, { id: 'D2', x: 430, y: 220 }, { id: 'D3', x: 300, y: 200 },
    { id: 'D4', x: 480, y: 400 }
  ],
  ball: { holder: 'ATH' },
  steps: [
    { type: 'flash', t0: 700,  at: { x: 640, y: 424 }, label: 'TOUCH WIDE' },
    { type: 'carry', actor: 'ATH', t0: 900, t1: 1600, to: { x: 628, y: 438 }, withBall: true },
    { type: 'run',  actor: 'D1', t0: 900, t1: 1900, to: { x: 616, y: 400 } },
    { type: 'flash', t0: 1500, at: { x: 632, y: 472 }, label: 'L2 SHIELD' },
    { type: 'run',  actor: 'CAFU', t0: 2400, t1: 3600, to: { x: 618, y: 336 } },
    { type: 'flash', t0: 2500, at: { x: 568, y: 540 }, label: 'OVERLAP' },
    { type: 'pass', from: 'ATH', t0: 3100, t1: 3600, to: { x: 620, y: 332 } },
    { type: 'carry', actor: 'CAFU', t0: 3600, t1: 4600, to: { x: 604, y: 132 }, withBall: true },
    { type: 'run',  actor: 'PARK', t0: 3400, t1: 4800, to: { x: 352, y: 178 } },
    { type: 'run',  actor: 'WISSA', t0: 3600, t1: 4700, to: { x: 300, y: 96 } },
    { type: 'pass', from: 'CAFU', t0: 4700, t1: 5300, to: { x: 350, y: 176 }, driven: true },
    { type: 'shot', from: 'PARK', t0: 5400, t1: 5750, to: { x: 306, y: 8 } },
    { type: 'goal', t0: 5750 }
  ],
  dur: 6500
};

/* ---------- A3 · triggering and timing runs ---------- */
DATA.fixScenes['w-runs'] = {
  id: 'fx-runs', name: 'Trigger, count, release', view: 'full',
  coach: [
    [0,    'Abily has the ball and time. Their back line is high and flat — that line is the whole target.'],
    [600,  'Point the stick at Athenea, then tap <b>[L1]</b> now, while you are not ready to pass. A run needs time to become a threat.'],
    [1400, 'Do not pass yet. <b>Count one.</b> She has to reach the shoulder of the last defender, not be past it.'],
    [2300, 'Now — and make sure <b>[L1] is up</b> first, or [TR] becomes a lob. Into the space ahead of the run, never at her feet.'],
    [3400, 'She arrives at full stride with the defender turning. That gap only exists because you waited.'],
    [4400, 'Low pull-back into the middle. Park is late into the box exactly on time.']
  ],
  actors: [
    { id: 'ABILY', x: 330, y: 600 }, { id: 'ATH', x: 600, y: 500 },
    { id: 'WISSA', x: 340, y: 400 }, { id: 'PARK', x: 250, y: 620 }, { id: 'NEY', x: 96, y: 440 },
    { id: 'BECK', x: 330, y: 740 },
    { id: 'D1', x: 240, y: 330 }, { id: 'D2', x: 400, y: 330 }, { id: 'D3', x: 560, y: 340 },
    { id: 'D4', x: 110, y: 340 }, { id: 'D5', x: 330, y: 500 }
  ],
  ball: { holder: 'ABILY' },
  steps: [
    { type: 'flash', t0: 600,  at: { x: 600, y: 466 }, label: 'L1' },
    { type: 'run',  actor: 'ATH', t0: 800, t1: 3200, to: { x: 520, y: 170 }, curve: .1 },
    { type: 'flash', t0: 1400, at: { x: 400, y: 306 }, label: 'COUNT ONE' },
    { type: 'run',  actor: 'WISSA', t0: 1600, t1: 3400, to: { x: 300, y: 190 } },
    { type: 'run',  actor: 'D3', t0: 2400, t1: 3400, to: { x: 528, y: 234 } },
    { type: 'pass', from: 'ABILY', t0: 2300, t1: 3300, to: { x: 528, y: 244 }, driven: true },
    { type: 'flash', t0: 2300, at: { x: 430, y: 420 }, label: 'NOW' },
    { type: 'run',  actor: 'PARK', t0: 2600, t1: 4600, to: { x: 350, y: 200 } },
    { type: 'carry', actor: 'ATH', t0: 3300, t1: 4400, to: { x: 546, y: 106 }, withBall: true },
    { type: 'pass', from: 'ATH', t0: 4500, t1: 5100, to: { x: 348, y: 198 }, driven: true },
    { type: 'shot', from: 'PARK', t0: 5200, t1: 5550, to: { x: 380, y: 8 } },
    { type: 'goal', t0: 5550 }
  ],
  dur: 6300
};
