/* ============ pitch.js — holo pitch + broadcast play animation engine ============ */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const W = 680, H = 1050;

  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  const easeIO = (t) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOutBack = (t) => 1 + 2.3 * Math.pow(t - 1, 3) + 1.3 * Math.pow(t - 1, 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  // deterministic pseudo-random (scrub-safe particles)
  const rnd = (i, salt) => { const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453; return x - Math.floor(x); };

  function pointOnSeg(from, to, t, curve) {
    if (!curve) return { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
    const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
    const dx = to.x - from.x, dy = to.y - from.y;
    const cx = mx - dy * curve, cy = my + dx * curve;
    const u = 1 - t;
    return { x: u * u * from.x + 2 * u * t * cx + t * t * to.x,
             y: u * u * from.y + 2 * u * t * cy + t * t * to.y };
  }

  /* ---------- defs (gradients + glow filters) ---------- */
  let uid = 0;
  function makeDefs(svg) {
    const id = 'd' + (uid++);
    const defs = el('defs', {}, svg);
    const turf = el('linearGradient', { id: id + '-turf', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: '0%', 'stop-color': '#0a2440' }, turf);
    el('stop', { offset: '55%', 'stop-color': '#071a30' }, turf);
    el('stop', { offset: '100%', 'stop-color': '#0a2440' }, turf);
    const vig = el('radialGradient', { id: id + '-vig', cx: '50%', cy: '46%', r: '75%' }, defs);
    el('stop', { offset: '62%', 'stop-color': 'rgba(3,7,20,0)' }, vig);
    el('stop', { offset: '100%', 'stop-color': 'rgba(2,5,16,.55)' }, vig);
    const mkTok = (name, c1, c2) => {
      const g = el('radialGradient', { id: id + '-' + name, cx: '36%', cy: '30%', r: '80%' }, defs);
      el('stop', { offset: '0%', 'stop-color': c1 }, g);
      el('stop', { offset: '100%', 'stop-color': c2 }, g);
    };
    mkTok('us', '#7dffc0', '#00d975');
    mkTok('them', '#ff7d9d', '#e0164b');
    mkTok('gk', '#8df3ff', '#02b9d9');
    const glow = el('filter', { id: id + '-glow', x: '-80%', y: '-80%', width: '260%', height: '260%' }, defs);
    el('feGaussianBlur', { stdDeviation: 4.5, result: 'b' }, glow);
    const m = el('feMerge', {}, glow);
    el('feMergeNode', { in: 'b' }, m);
    el('feMergeNode', { in: 'SourceGraphic' }, m);
    const glowBig = el('filter', { id: id + '-glowbig', x: '-120%', y: '-120%', width: '340%', height: '340%' }, defs);
    el('feGaussianBlur', { stdDeviation: 10, result: 'b' }, glowBig);
    const m2 = el('feMerge', {}, glowBig);
    el('feMergeNode', { in: 'b' }, m2);
    el('feMergeNode', { in: 'SourceGraphic' }, m2);
    return id;
  }

  /* ---------- holo pitch ---------- */
  function drawPitch(svg, did) {
    const g = el('g', {}, svg);
    el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${did}-turf)` }, g);
    // mow stripes
    for (let i = 0; i < 10; i++) {
      if (i % 2) el('rect', { x: 0, y: i * (H / 10), width: W, height: H / 10, fill: 'rgba(120,200,255,.03)' }, g);
    }
    // manga halftone texture
    const pat = el('pattern', { id: did + '-dots', width: 14, height: 14, patternUnits: 'userSpaceOnUse',
                                patternTransform: 'rotate(20)' }, svg.querySelector('defs'));
    el('circle', { cx: 2, cy: 2, r: 1.1, fill: 'rgba(140,200,255,.05)' }, pat);
    el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${did}-dots)` }, g);
    // floodlight beams
    el('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${did}-vig)` }, g);
    const C = 'rgba(80,220,255,.55)';
    const L = { stroke: C, 'stroke-width': 2.6, fill: 'none', filter: `url(#${did}-glow)` };
    const line = (a) => el('path', Object.assign({}, L, a), g);
    el('rect', Object.assign({}, L, { x: 8, y: 8, width: W - 16, height: H - 16, rx: 6 }), g);
    line({ d: `M8 ${H / 2} H${W - 8}` });
    el('circle', Object.assign({}, L, { cx: W / 2, cy: H / 2, r: 82 }), g);
    el('circle', { cx: W / 2, cy: H / 2, r: 4, fill: C, filter: `url(#${did}-glow)` }, g);
    for (const top of [true, false]) {
      const y0 = top ? 8 : H - 8, dir = top ? 1 : -1;
      el('rect', Object.assign({}, L, { x: W / 2 - 165, y: top ? y0 : y0 - 150, width: 330, height: 150 }), g);
      el('rect', Object.assign({}, L, { x: W / 2 - 70, y: top ? y0 : y0 - 52, width: 140, height: 52 }), g);
      el('circle', { cx: W / 2, cy: y0 + dir * 100, r: 3.4, fill: C }, g);
      const ay = y0 + dir * 150;
      line({ d: `M${W / 2 - 62} ${ay} A 70 70 0 0 ${top ? 0 : 1} ${W / 2 + 62} ${ay}` });
      // goal mouth
      el('rect', { x: W / 2 - 44, y: top ? 0 : H - 9, width: 88, height: 9, fill: '#eafcff',
                   opacity: .95, rx: 2, filter: `url(#${did}-glow)` }, g);
    }
    return g;
  }

  /* ---------- tokens ---------- */
  function teamOf(id) {
    if (/^D\d/.test(id)) return 'them';
    if (id === 'GK') return 'gk';
    return 'us';
  }
  const RING = { us: 'rgba(0,255,135,.9)', them: 'rgba(255,46,99,.85)', gk: 'rgba(4,245,255,.9)' };

  function shortName(id) {
    const p = window.DATA.players[id];
    if (!p) return '';
    return p.name.replace(/\s*\(buy\)/, '').split(' ')[0];
  }

  function makeToken(layer, id, x, y, r, did) {
    r = r || 23;
    const team = teamOf(id);
    const g = el('g', { transform: `translate(${x},${y})`, 'data-id': id, cursor: 'pointer' }, layer);
    el('ellipse', { cy: r * .82, rx: r * .95, ry: r * .38, fill: 'rgba(0,0,0,.5)' }, g);
    // holder pulse ring (hidden by default)
    el('circle', { r: r + 7, fill: 'none', stroke: RING[team], 'stroke-width': 2.5,
                   opacity: 0, class: 'pulse-ring', filter: `url(#${did}-glow)` }, g);
    el('circle', { r, fill: `url(#${did}-${team})`,
                   stroke: team === 'them' ? '#5e0b22' : '#03301c', 'stroke-width': 2.4 }, g);
    el('path', { d: `M ${-r * .72} ${-r * .30} A ${r} ${r} 0 0 1 ${r * .72} ${-r * .30}`,
                 stroke: 'rgba(255,255,255,.55)', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }, g);
    const p = window.DATA.players[id];
    const lbl = team === 'them' ? '' : (p ? p.pos : id);
    if (lbl) el('text', { 'text-anchor': 'middle', dy: 5, class: 'tok-label' }, g).textContent = lbl;
    if (team !== 'them') {
      el('text', { 'text-anchor': 'middle', y: r + 18, class: 'tok-name' }, g).textContent = shortName(id);
    }
    return g;
  }
  function moveToken(tok, x, y) { tok.setAttribute('transform', `translate(${x},${y})`); }

  /* ---------- static formation board ---------- */
  function formationBoard(container, onTap) {
    container.innerHTML = '';
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'pitch-svg', role: 'img',
                            'aria-label': 'Formation board' });
    container.appendChild(svg);
    const did = makeDefs(svg);
    drawPitch(svg, did);
    const layer = el('g', {}, svg);
    const toks = {};
    let cur = {}, anim = null;

    function setFormation(fid, instant) {
      const f = window.DATA.formations[fid];
      const targets = {};
      f.spots.forEach((s) => { targets[s.id] = s; });
      for (const id in toks) {
        if (!targets[id]) { toks[id].remove(); delete toks[id]; delete cur[id]; }
      }
      const starts = {};
      for (const id in targets) {
        if (!toks[id]) {
          toks[id] = makeToken(layer, id, targets[id].x, instant ? targets[id].y : H + 40, null, did);
          toks[id].addEventListener('click', () => onTap && onTap(id));
          cur[id] = { x: targets[id].x, y: instant ? targets[id].y : H + 40 };
        }
        starts[id] = Object.assign({}, cur[id]);
      }
      if (instant) {
        for (const id in targets) { cur[id] = { x: targets[id].x, y: targets[id].y }; moveToken(toks[id], cur[id].x, cur[id].y); }
        return;
      }
      if (anim) cancelAnimationFrame(anim);
      const t0 = performance.now(), dur = 750;
      (function step(now) {
        const t = Math.min(1, (now - t0) / dur), e = easeIO(t);
        for (const id in targets) {
          cur[id] = { x: lerp(starts[id].x, targets[id].x, e), y: lerp(starts[id].y, targets[id].y, e) };
          moveToken(toks[id], cur[id].x, cur[id].y);
        }
        if (t < 1) anim = requestAnimationFrame(step);
      })(t0);
    }
    return { setFormation };
  }

  /* ---------- timelines ---------- */
  function buildTimelines(scene) {
    const initial = {};
    scene.actors.forEach((a) => { initial[a.id] = { x: a.x, y: a.y }; });
    const segs = {};
    scene.actors.forEach((a) => { segs[a.id] = []; });
    const moves = scene.steps.filter((s) => s.type === 'run' || s.type === 'carry');
    moves.sort((a, b) => a.t0 - b.t0);
    const lastPos = {};
    scene.actors.forEach((a) => { lastPos[a.id] = { x: a.x, y: a.y }; });
    moves.forEach((s) => {
      segs[s.actor].push({ t0: s.t0, t1: s.t1, from: Object.assign({}, lastPos[s.actor]), to: s.to, curve: s.curve || 0 });
      lastPos[s.actor] = Object.assign({}, s.to);
    });
    function posOf(id, t) {
      const list = segs[id];
      let p = initial[id];
      for (const s of list) {
        if (t >= s.t1) { p = s.to; continue; }
        if (t >= s.t0) return pointOnSeg(s.from, s.to, easeIO((t - s.t0) / (s.t1 - s.t0)), s.curve);
        break;
      }
      return p;
    }
    function movingAt(id, t) {
      for (const s of segs[id]) if (t >= s.t0 && t < s.t1) return true;
      return false;
    }
    const flights = [];
    const holds = [{ t: 0, holder: scene.ball.holder }];
    scene.steps.filter((s) => ['pass', 'shot', 'steal'].includes(s.type)).sort((a, b) => a.t0 - b.t0).forEach((s) => {
      if (s.type === 'steal') { holds.push({ t: s.t0, holder: s.actor }); return; }
      const from = { ref: s.from, t: s.t0 };
      const to = typeof s.to === 'string' ? { ref: s.to, t: s.t1 } : { pt: s.to };
      flights.push({ t0: s.t0, t1: s.t1, from, to, arc: !!(s.cross), driven: !!s.driven, shot: s.type === 'shot' });
      holds.push({ t: s.t1, holder: typeof s.to === 'string' ? s.to : null, rest: typeof s.to === 'string' ? null : s.to });
    });
    scene.steps.filter((s) => (s.type === 'carry' || s.type === 'run') && s.withBall).forEach((s) => {
      holds.push({ t: s.t0, holder: s.actor });
    });
    holds.sort((a, b) => a.t - b.t);
    function ballAt(t) {
      for (const f of flights) {
        if (t >= f.t0 && t <= f.t1) {
          const a = posOf(f.from.ref, f.t0);
          const b = f.to.ref ? posOf(f.to.ref, f.t1) : f.to.pt;
          const k = easeIO((t - f.t0) / (f.t1 - f.t0));
          const p = pointOnSeg(a, b, k, f.arc ? .16 : 0);
          const scale = f.arc ? 1 + Math.sin(k * Math.PI) * .8 : 1;
          return { x: p.x, y: p.y, scale, flight: f, k, from: a, to: b, holder: null };
        }
      }
      let st = holds[0];
      for (const h of holds) { if (h.t <= t) st = h; else break; }
      if (st.holder) { const p = posOf(st.holder, t); return { x: p.x + 16, y: p.y + 10, scale: 1, holder: st.holder }; }
      if (st.rest) return { x: st.rest.x, y: st.rest.y, scale: 1, holder: null };
      return { x: W / 2, y: H / 2, scale: 1, holder: null };
    }
    return { posOf, ballAt, movingAt };
  }

  /* ---------- scene player ---------- */
  function scenePlayer(container, scene, opts) {
    opts = opts || {};
    container.innerHTML = '';
    const view = opts.view || 'top';
    const VH = 700;
    const vb = view === 'full' ? `0 0 ${W} ${H}` : view === 'bottom' ? `0 ${H - VH} ${W} ${VH}` : `0 0 ${W} ${VH}`;
    const svg = el('svg', { viewBox: vb, class: 'pitch-svg', role: 'img', 'aria-label': scene.name || 'Play animation' });
    container.appendChild(svg);
    const did = makeDefs(svg);
    drawPitch(svg, did);
    const fxLayer = el('g', {}, svg);
    const tokLayer = el('g', {}, svg);
    const topLayer = el('g', {}, svg);

    const tl = buildTimelines(scene);
    const toks = {};
    scene.actors.forEach((a) => { toks[a.id] = makeToken(tokLayer, a.id, a.x, a.y, /^D\d/.test(a.id) ? 19 : 23, did); });

    // Blue Lock speed streaks (pool: 3 per actor, drawn behind tokens)
    const streaks = {};
    scene.actors.forEach((a) => {
      streaks[a.id] = [0, 1, 2].map(() =>
        el('line', { stroke: '#eaf6ff', 'stroke-width': 2.6, 'stroke-linecap': 'round', opacity: 0 }, fxLayer));
    });

    // ball with glow + afterimages
    const ghost1 = el('circle', { r: 7, fill: 'rgba(220,250,255,.28)', opacity: 0 }, topLayer);
    const ghost2 = el('circle', { r: 5.5, fill: 'rgba(220,250,255,.16)', opacity: 0 }, topLayer);
    const ballG = el('g', {}, topLayer);
    el('circle', { r: 12, fill: 'rgba(160,240,255,.25)', filter: `url(#${did}-glowbig)` }, ballG);
    el('circle', { r: 8.5, fill: '#f6fdff', stroke: '#0a2038', 'stroke-width': 1.8 }, ballG);
    el('path', { d: 'M-3.4,-1.8 L0,-4.2 L3.4,-1.8 L2.1,2.2 L-2.1,2.2 Z', fill: '#0a2038' }, ballG);

    // pass trail: glow underlay + core
    const trailGlow = el('path', { stroke: 'rgba(0,255,135,.5)', 'stroke-width': 9, fill: 'none',
                                   'stroke-linecap': 'round', opacity: 0, filter: `url(#${did}-glowbig)` }, fxLayer);
    const trail = el('path', { stroke: '#00ff87', 'stroke-width': 3.5, fill: 'none',
                               'stroke-dasharray': '11 10', 'stroke-linecap': 'round', opacity: 0 }, fxLayer);

    // flash ring
    const flashG = el('g', { opacity: 0 }, topLayer);
    const flashRing = el('circle', { r: 30, fill: 'none', stroke: '#04f5ff', 'stroke-width': 4, filter: `url(#${did}-glow)` }, flashG);
    const flashTxt = el('text', { 'text-anchor': 'middle', dy: -44, fill: '#04f5ff', 'font-size': 25,
                                  'font-weight': 900, 'font-style': 'italic',
                                  style: 'paint-order:stroke;stroke:rgba(2,6,20,.75);stroke-width:5px;letter-spacing:.05em' }, flashG);

    /* ----- GOAL fx: flash + slash + concentration lines + rays + rings + confetti + text ----- */
    const goalCY = view === 'bottom' ? H - 330 : 330;
    const viewY0 = view === 'bottom' ? H - VH : 0;
    // full-view white/blue impact flash
    const flashRect = el('rect', { x: 0, y: viewY0, width: W, height: view === 'full' ? H : VH,
                                   fill: '#ffffff', opacity: 0, 'pointer-events': 'none' }, topLayer);
    // anime slash sweep (parallelogram)
    const slashG = el('g', { opacity: 0 }, topLayer);
    el('polygon', { points: '-70,-600 20,-600 -30,600 -120,600', fill: 'rgba(255,255,255,.65)',
                    filter: `url(#${did}-glowbig)` }, slashG);
    el('polygon', { points: '40,-600 66,-600 16,600 -10,600', fill: 'rgba(47,123,255,.55)' }, slashG);
    const goalFx = el('g', { opacity: 0 }, topLayer);
    // manga concentration lines (radial burst)
    const concG = el('g', {}, goalFx);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      el('line', { x1: Math.cos(a) * 70, y1: Math.sin(a) * 70,
                   x2: Math.cos(a) * (190 + rnd(i, 9) * 90), y2: Math.sin(a) * (190 + rnd(i, 9) * 90),
                   stroke: i % 3 ? 'rgba(234,246,255,.7)' : 'rgba(47,123,255,.75)',
                   'stroke-width': 1.6 + rnd(i, 4) * 1.6, 'stroke-linecap': 'round' }, concG);
    }
    const raysG = el('g', {}, goalFx);
    for (let i = 0; i < 12; i++) {
      el('path', { d: 'M0,-34 L7,-92 L-7,-92 Z', fill: i % 2 ? 'rgba(0,255,135,.8)' : 'rgba(4,245,255,.8)',
                   transform: `rotate(${i * 30})` }, raysG);
    }
    const ring1 = el('circle', { r: 40, fill: 'none', stroke: '#00ff87', 'stroke-width': 3 }, goalFx);
    const ring2 = el('circle', { r: 40, fill: 'none', stroke: '#04f5ff', 'stroke-width': 2 }, goalFx);
    const confG = el('g', {}, goalFx);
    const CONF_N = 34;
    const confetti = [];
    const CONF_COLORS = ['#00ff87', '#04f5ff', '#ffd257', '#ffffff', '#ff2e63'];
    for (let i = 0; i < CONF_N; i++) {
      confetti.push(el('rect', { x: -4, y: -2.5, width: 8, height: 5, rx: 1,
                                 fill: CONF_COLORS[i % CONF_COLORS.length] }, confG));
    }
    const goalTxtG = el('g', { opacity: 0 }, topLayer);
    const goalTxt = el('text', { x: W / 2, y: goalCY + 14, 'text-anchor': 'middle',
                                 fill: '#ffffff', 'font-size': 78, 'font-weight': 900, 'font-style': 'italic',
                                 style: 'paint-order:stroke;stroke:rgba(2,8,26,.85);stroke-width:12px;letter-spacing:.08em' }, goalTxtG);
    goalTxt.textContent = 'GOAL!';
    const goalSub = el('text', { x: W / 2, y: goalCY + 46, 'text-anchor': 'middle',
                                 fill: '#00ff87', 'font-size': 17, 'font-weight': 800, 'font-style': 'italic',
                                 style: 'paint-order:stroke;stroke:rgba(2,8,26,.8);stroke-width:5px;letter-spacing:.5em' }, goalTxtG);
    goalSub.textContent = 'WHAT A FINISH';

    const flashes = scene.steps.filter((s) => s.type === 'flash');
    const goals = scene.steps.filter((s) => s.type === 'goal');

    let time = 0, playing = false, speed = 1, raf = null, last = 0;

    function render(t) {
      scene.actors.forEach((a) => {
        const p = tl.posOf(a.id, t);
        moveToken(toks[a.id], p.x, p.y);
        // speed streaks while moving (Blue Lock trail)
        const pool = streaks[a.id];
        if (tl.movingAt(a.id, t) && t > 60) {
          const prev = tl.posOf(a.id, t - 60);
          let dx = p.x - prev.x, dy = p.y - prev.y;
          const len = Math.hypot(dx, dy);
          if (len > 2.5) {
            dx /= len; dy /= len;
            const px = -dy, py = dx; // perpendicular offset
            pool.forEach((ln, i) => {
              const back = 16 + i * 11, off = (i - 1) * 7.5, sl = 9 + (2 - i) * 5;
              const bx = p.x - dx * back + px * off, by = p.y - dy * back + py * off;
              ln.setAttribute('x1', bx); ln.setAttribute('y1', by);
              ln.setAttribute('x2', bx - dx * sl); ln.setAttribute('y2', by - dy * sl);
              ln.setAttribute('opacity', .34 - i * .1);
            });
          } else pool.forEach((ln) => ln.setAttribute('opacity', 0));
        } else pool.forEach((ln) => ln.setAttribute('opacity', 0));
      });
      const b = tl.ballAt(t);
      ballG.setAttribute('transform', `translate(${b.x},${b.y}) scale(${b.scale}) rotate(${t * .25})`);
      // holder pulse rings
      scene.actors.forEach((a) => {
        const ring = toks[a.id].querySelector('.pulse-ring');
        if (a.id === b.holder) {
          ring.setAttribute('opacity', .5 + Math.sin(t / 180) * .3);
          ring.setAttribute('r', 29 + Math.sin(t / 180) * 2.5);
        } else ring.setAttribute('opacity', 0);
      });
      // afterimages during flights
      if (b.flight) {
        const f = b.flight;
        for (const [ghost, dt] of [[ghost1, 60], [ghost2, 120]]) {
          const tt = t - dt;
          if (tt > f.t0) {
            const k = easeIO((tt - f.t0) / (f.t1 - f.t0));
            const p = pointOnSeg(b.from, b.to, k, f.arc ? .16 : 0);
            ghost.setAttribute('cx', p.x); ghost.setAttribute('cy', p.y);
            ghost.setAttribute('opacity', 1);
          } else ghost.setAttribute('opacity', 0);
        }
        const c = f.arc ? .16 : 0;
        const mid = pointOnSeg(b.from, b.to, .5, c * 2);
        const d = c ? `M${b.from.x} ${b.from.y} Q ${mid.x} ${mid.y} ${b.to.x} ${b.to.y}`
                    : `M${b.from.x} ${b.from.y} L ${b.to.x} ${b.to.y}`;
        trail.setAttribute('d', d); trailGlow.setAttribute('d', d);
        trail.setAttribute('opacity', .95); trailGlow.setAttribute('opacity', .6);
        const col = f.shot ? '#ff8a5c' : f.driven ? '#00ff87' : '#8fe8ff';
        trail.setAttribute('stroke', col);
        trailGlow.setAttribute('stroke', col === '#8fe8ff' ? 'rgba(4,245,255,.55)' : col);
        trail.setAttribute('stroke-dashoffset', -t * .09);
      } else {
        trail.setAttribute('opacity', 0); trailGlow.setAttribute('opacity', 0);
        ghost1.setAttribute('opacity', 0); ghost2.setAttribute('opacity', 0);
      }
      // flash rings
      let fOn = false;
      for (const f of flashes) {
        if (t >= f.t0 && t <= f.t0 + 1000) {
          fOn = true;
          const k = (t - f.t0) / 1000;
          flashG.setAttribute('transform', `translate(${f.at.x},${f.at.y})`);
          flashG.setAttribute('opacity', 1 - k * .6);
          flashRing.setAttribute('r', 26 + k * 30);
          flashTxt.textContent = f.label || '';
        }
      }
      if (!fOn) flashG.setAttribute('opacity', 0);
      // goal celebration
      let gOn = false;
      for (const g of goals) {
        if (t >= g.t0) {
          gOn = true;
          const e = t - g.t0;
          const b2 = tl.ballAt(g.t0 - 30);
          const gx = b2.to ? b2.to.x : W / 2, gy = b2.to ? b2.to.y : (view === 'bottom' ? H - 20 : 20);
          // impact flash: white spike then blue after-glow
          const fw = e < 110 ? .8 * (1 - e / 110) : 0;
          const fb = e >= 60 && e < 300 ? .3 * (1 - (e - 60) / 240) : 0;
          flashRect.setAttribute('fill', fw > fb ? '#ffffff' : '#2f7bff');
          flashRect.setAttribute('opacity', Math.max(fw, fb));
          // anime slash sweep across the view
          if (e < 420) {
            const ks = e / 420;
            slashG.setAttribute('opacity', .9 * (1 - ks * ks));
            slashG.setAttribute('transform',
              `translate(${lerp(-160, W + 200, ks)},${viewY0 + (view === 'full' ? H : VH) / 2}) rotate(16)`);
          } else slashG.setAttribute('opacity', 0);
          // concentration lines: snap out then fade
          const kc0 = Math.min(1, e / 260);
          concG.setAttribute('transform', `scale(${.5 + easeOutBack(kc0) * .5})`);
          concG.setAttribute('opacity', Math.max(0, 1 - e / 800));
          const k1 = Math.min(1, e / 600);
          goalFx.setAttribute('opacity', String(Math.max(0, 1 - Math.max(0, e - 1500) / 900)));
          goalFx.setAttribute('transform', `translate(${gx},${gy})`);
          raysG.setAttribute('transform', `scale(${easeOutBack(k1)}) rotate(${e * .02})`);
          ring1.setAttribute('r', 20 + k1 * 150); ring1.setAttribute('opacity', 1 - k1);
          const k2 = Math.min(1, Math.max(0, e - 150) / 700);
          ring2.setAttribute('r', 20 + k2 * 210); ring2.setAttribute('opacity', 1 - k2);
          const kc = Math.min(1, e / 1600);
          for (let i = 0; i < CONF_N; i++) {
            const ang = rnd(i, 1) * Math.PI * 2, spd = 90 + rnd(i, 2) * 190;
            const px = Math.cos(ang) * spd * kc;
            const py = Math.sin(ang) * spd * kc * .8 + 130 * kc * kc;
            confetti[i].setAttribute('transform',
              `translate(${px},${py}) rotate(${(rnd(i, 3) - .5) * 900 * kc}) scale(${1 - kc * .5})`);
            confetti[i].setAttribute('opacity', String(1 - kc));
          }
          const kt = Math.min(1, e / 450);
          goalTxtG.setAttribute('opacity', kt);
          goalTxtG.setAttribute('transform', `translate(0 ${(1 - easeOutBack(kt)) * 40})`);
        }
      }
      if (!gOn) {
        goalFx.setAttribute('opacity', 0); goalTxtG.setAttribute('opacity', 0);
        flashRect.setAttribute('opacity', 0); slashG.setAttribute('opacity', 0);
      }
      if (opts.onTime) opts.onTime(t);
    }

    function tick(now) {
      if (!playing) return;
      const dt = Math.min(60, now - last); last = now;
      time += dt * speed;
      if (time >= scene.dur) { time = scene.dur; playing = false; if (opts.onEnd) opts.onEnd(); }
      render(time);
      if (opts.onTick) opts.onTick(time, playing);
      if (playing) raf = requestAnimationFrame(tick);
    }

    const api = {
      play() {
        if (time >= scene.dur) time = 0;
        playing = true; last = performance.now();
        raf = requestAnimationFrame(tick);
      },
      pause() { playing = false; if (raf) cancelAnimationFrame(raf); },
      seek(t) { time = Math.max(0, Math.min(scene.dur, t)); render(time); if (opts.onTick) opts.onTick(time, playing); },
      restart() { api.pause(); time = 0; render(0); api.play(); },
      setSpeed(s) { speed = s; },
      get playing() { return playing; },
      get time() { return time; },
      dur: scene.dur
    };
    render(0);
    return api;
  }

  window.PITCH = { formationBoard, scenePlayer };
})();
