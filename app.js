/* ============ app.js — sections, navigation, interactions ============ */
(function () {
  const view = document.getElementById('view');
  const sheet = document.getElementById('sheet');
  const sheetBody = document.getElementById('sheetBody');
  const D = window.DATA;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem('fc26.' + k)) ?? d; } catch { return d; } },
    set(k, v) { localStorage.setItem('fc26.' + k, JSON.stringify(v)); }
  };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // PS chips — user scheme: pass ✕ · shot ▢ · cross ⭕ · through △ · sprint R1 · finesse/driven R2 · run trigger L1
  const PSMAP = { X: 'ps-x', O: 'ps-o', SQ: 'ps-sq', TR: 'ps-tr' };
  // Attack: [X] pass, [SQ] shot, [O] cross, [TR] through.
  // Defend: [SQ] stand tackle, [O] slide, [X] fight for the ball. Same buttons, different jobs.
  const padHTML = (s) => s.replace(/\[(X|O|SQ|TR|R1|R2|L1|L2)\]/g, (m, k) =>
    PSMAP[k] ? `<i class="psbtn ${PSMAP[k]}" aria-hidden="true"></i>`
             : `<i class="psbtn ps-sh">${k}</i>`);
  const fmt = (s) => padHTML(esc(s));
  let activePlayers = [];

  /* ---------- sheet ---------- */
  function openSheet(html) {
    sheetBody.innerHTML = html;
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeSheet() { sheet.hidden = true; document.body.style.overflow = ''; }
  sheet.addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) closeSheet(); });

  /* ---------- animation widget ---------- */
  function playWidget(host, scene, viewMode) {
    const wrap = document.createElement('div');
    wrap.className = 'pitch-wrap';
    const stage = document.createElement('div');
    const caption = document.createElement('div');
    caption.className = 'pitch-caption';
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
      <button class="btn small" data-a="play"><span class="eicon" data-icon="play"></span><span class="lbl">Play</span></button>
      <button class="btn small ghost" data-a="restart" aria-label="Replay"><span class="eicon" data-icon="enso"></span></button>
      <button class="btn small ghost" data-a="speed"><span class="lbl">1×</span></button>
      <input class="scrub" type="range" min="0" max="${scene.dur}" value="0" step="10" aria-label="Timeline">`;
    wrap.append(stage, controls, caption);
    host.appendChild(wrap);

    const playBtn = controls.querySelector('[data-a="play"]');
    const playLbl = playBtn.querySelector('.lbl');
    const spdBtn = controls.querySelector('[data-a="speed"]');
    const spdLbl = spdBtn.querySelector('.lbl');
    const scrub = controls.querySelector('.scrub');
    let spd = 1;

    const player = PITCH.scenePlayer(stage, scene, {
      view: viewMode || scene.view || 'top',
      onTick(t, playing) {
        scrub.value = t;
        playLbl.textContent = playing ? 'Pause' : 'Play';
        setCaption(t);
      },
      onEnd() { playLbl.textContent = 'Replay'; }
    });
    let capIdx = -1;
    function setCaption(t) {
      let cur = null, idx = -1;
      (scene.coach || []).forEach((c, i) => { if (c[0] <= t) { cur = c; idx = i; } });
      if (cur && idx !== capIdx) {
        capIdx = idx;
        caption.innerHTML = padHTML(cur[1]);
        caption.classList.remove('tick');
        void caption.offsetWidth;
        caption.classList.add('tick');
      }
    }
    setCaption(0);

    controls.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-a]');
      if (!btn) return;
      const a = btn.getAttribute('data-a');
      if (a === 'play') {
        if (player.playing) { player.pause(); playLbl.textContent = 'Play'; }
        else { player.play(); playLbl.textContent = 'Pause'; }
      }
      if (a === 'restart') { player.restart(); playLbl.textContent = 'Pause'; }
      if (a === 'speed') { spd = spd === 1 ? .5 : 1; player.setSpeed(spd); spdLbl.textContent = spd + '×'; }
    });
    scrub.addEventListener('input', () => { player.pause(); player.seek(+scrub.value); playLbl.textContent = 'Play'; });
    activePlayers.push(player);
    return player;
  }

  /* ---------- checklist helper ---------- */
  function checklist(host, storeKey, items, renderItem) {
    const saved = store.get(storeKey, []);
    const ul = document.createElement('ul');
    ul.className = 'checklist';
    const band = document.createElement('div');
    band.className = 'progress-band';
    band.innerHTML = '<i></i>';
    const update = () => {
      const n = ul.querySelectorAll('li.done').length;
      band.firstChild.style.width = (n / items.length * 100) + '%';
    };
    items.forEach((it, i) => {
      const li = document.createElement('li');
      if (saved.includes(i)) li.classList.add('done');
      li.innerHTML = `<span class="box"><span class="eicon" data-icon="check"></span></span><span class="txt">${renderItem(it)}</span>`;
      li.addEventListener('click', () => {
        li.classList.toggle('done');
        const now = [...ul.querySelectorAll('li')].map((el, j) => el.classList.contains('done') ? j : -1).filter((j) => j >= 0);
        store.set(storeKey, now);
        update();
      });
      ul.appendChild(li);
    });
    host.append(band, ul);
    update();
  }

  /* ============ sections ============ */
  const SECTIONS = {};

  SECTIONS.laws = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="book"></span>The Five Laws</h2>
      <p class="section-sub">Read before every session. These outrank everything else in the book.</p>`;
    D.laws.forEach((l, i) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<h3><span class="num">${i + 1}</span>${esc(l.t)}</h3><p class="why">${esc(l.d)}</p>`;
      view.appendChild(c);
    });
    const note = document.createElement('p');
    note.className = 'footer-note';
    note.textContent = 'Change one habit at a time. Jockey-first defending alone wins you more games this week than everything else combined.';
    view.appendChild(note);
  };

  SECTIONS.fixes = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="target"></span>Fix List</h2>
      <p class="section-sub">Six things you named. Each one gets the mechanic behind it, the rules that change it, a drill with a pass mark, and an animation of the fix.</p>`;
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.innerHTML = `<button data-k="defence" class="on">Defence · 3</button><button data-k="attack">Attack · 3</button><button data-k="binds">Bindings</button>`;
    const host = document.createElement('div');
    view.append(seg, host);

    const render = (k) => {
      activePlayers.forEach((p) => p.pause());
      activePlayers = [];
      host.innerHTML = '';

      if (k === 'binds') {
        const intro = document.createElement('div');
        intro.className = 'card';
        intro.innerHTML = `<span class="tag red"><span class="eicon" data-icon="lightning"></span><span>Do this first</span></span>
          <h3>Ten minutes that make everything else exact</h3><p class="why">${esc(D.bindingsNote)}</p>`;
        host.appendChild(intro);
        D.bindings.forEach((b, i) => {
          const c = document.createElement('div');
          c.className = 'card';
          c.innerHTML = `<h3><span class="num">${i + 1}</span>${esc(b.q)}</h3>
            <div class="kv"><b>How to check</b><span>${fmt(b.how)}</span></div>
            <div class="kv"><b>Why it matters</b><span>${fmt(b.why)}</span></div>`;
          host.appendChild(c);
        });
        return;
      }

      D.fixes.filter((f) => f.side === k).forEach((f) => {
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<span class="tag ${k === 'defence' ? 'red' : 'gold'}"><span class="eicon" data-icon="${k === 'defence' ? 'wall' : 'sword'}"></span><span>Fix ${f.n} · ${k}</span></span>
          <h3>${esc(f.title)}</h3>
          <p class="why"><b style="color:var(--red)">What happens:</b> ${fmt(f.symptom)}</p>
          <p class="why" style="margin-top:8px"><b style="color:var(--cyan)">Why it happens:</b> ${fmt(f.rootCause)}</p>
          ${f.modelNote ? `<p class="why" style="margin-top:8px;font-size:12.5px;opacity:.85"><b>Note:</b> ${fmt(f.modelNote)}</p>` : ''}`;
        host.appendChild(c);

        playWidget(c, D.fixScenes[f.id], D.fixScenes[f.id].view);

        const pr = document.createElement('div');
        pr.className = 'card';
        pr.innerHTML = `<h3>The rules</h3>` + f.principles.map((p, i) =>
          `<div class="mech"><span class="num">${i + 1}</span><div><b>${esc(p.t)}</b><p class="why">${fmt(p.d)}</p></div></div>`).join('');
        host.appendChild(pr);

        const dr = document.createElement('div');
        dr.className = 'card';
        dr.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="weight"></span><span>Drill</span></span>
          <h3>${esc(f.drill.name)}</h3>
          <div class="kv"><b>Where</b><span>${fmt(f.drill.where)}</span></div>
          <div class="kv"><b>Setup</b><span>${fmt(f.drill.setup)}</span></div>
          <div class="kv"><b>Reps</b><span>${fmt(f.drill.reps)}</span></div>
          <div class="kv"><b>Pass mark</b><span>${fmt(f.drill.success)}</span></div>
          ${f.countNote ? `<p class="why" style="margin-top:9px"><b style="color:var(--cyan)">Honest caveat:</b> ${fmt(f.countNote)}</p>` : ''}`;
        host.appendChild(dr);

        const cu = document.createElement('div');
        cu.className = 'card';
        cu.innerHTML = `<h3>In-match cues</h3><div>${f.cues.map((x) => `<span class="chip">${fmt(x)}</span>`).join('')}</div>`;
        host.appendChild(cu);

        const mi = document.createElement('div');
        mi.className = 'card';
        mi.innerHTML = `<span class="tag red"><span class="eicon" data-icon="cross-x"></span><span>Habits to kill</span></span><h3>Tap for the fix</h3>`;
        f.mistakes.forEach((m, i) => {
          const d = document.createElement('div');
          d.className = 'mistake';
          d.innerHTML = `<div class="head"><span class="num" style="background:var(--red);color:#fff">${i + 1}</span>${fmt(m.m)}</div><div class="fix">✔ ${fmt(m.f)}</div>`;
          d.addEventListener('click', () => d.classList.toggle('open'));
          mi.appendChild(d);
        });
        host.appendChild(mi);
      });
    };
    render('defence');
    seg.addEventListener('click', (e) => {
      const k = e.target.getAttribute('data-k');
      if (!k) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      render(k);
    });
  };

  SECTIONS.setup = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="chart"></span>Your Setup</h2>
      <p class="section-sub">Tap any player for their role card. Switch shape to preview the Plan B preset.</p>`;
    const segWrap = document.createElement('div');
    segWrap.className = 'seg';
    segWrap.innerHTML = `<button data-f="433" class="on">4-3-3 · Your shape</button><button data-f="4231">4-2-3-1 · Plan B</button>`;
    view.appendChild(segWrap);

    const boardHost = document.createElement('div');
    boardHost.className = 'pitch-wrap';
    const desc = document.createElement('p');
    desc.className = 'pitch-caption';
    view.append(boardHost, desc);

    const board = PITCH.formationBoard(boardHost, (id) => {
      const p = D.players[id];
      openSheet(`<span class="tag gold"><span class="eicon" data-icon="target"></span><span>${esc(p.pos)}${p.ovr ? ' · ' + p.ovr : ''}</span></span><h2>${esc(p.name)}</h2>
        <h4>Role</h4><p>${esc(p.role)}</p>
        <h4>Job in your system</h4><p>${esc(p.note)}</p>`);
    });
    const setF = (fid) => {
      board.setFormation(fid);
      desc.innerHTML = `<b>${esc(D.formations[fid].label)}</b> — ${esc(D.formations[fid].desc)}`;
    };
    board.setFormation('433', true);
    desc.innerHTML = `<b>${esc(D.formations['433'].label)}</b> — ${esc(D.formations['433'].desc)}`;
    segWrap.addEventListener('click', (e) => {
      const f = e.target.getAttribute('data-f');
      if (!f) return;
      segWrap.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      setF(f);
    });

    const tac = document.createElement('div');
    tac.className = 'card';
    tac.innerHTML = `<h3>Team tactics</h3>` + D.tactics.map((t) =>
      `<div class="kv"><b>${esc(t.k)}: ${esc(t.v)}</b><span>${esc(t.why)}</span></div>`).join('');
    view.appendChild(tac);

    const ctrl = document.createElement('div');
    ctrl.className = 'card';
    ctrl.innerHTML = `<span class="tag ok"><span class="eicon" data-icon="target"></span><span>Your custom scheme</span></span>
      <h3>Controls</h3>
      <div class="ctrl-grid">
        <div class="ctrl-cell">${padHTML('[X]')}<b>Pass</b></div>
        <div class="ctrl-cell">${padHTML('[SQ]')}<b>Shot</b></div>
        <div class="ctrl-cell">${padHTML('[R2]')}${padHTML('[SQ]')}<b>Finesse</b></div>
        <div class="ctrl-cell">${padHTML('[O]')}<b>Cross</b></div>
        <div class="ctrl-cell">${padHTML('[TR]')}<b>Through</b></div>
        <div class="ctrl-cell">${padHTML('[R1]')}<b>Sprint</b></div>
        <div class="ctrl-cell">${padHTML('[R2]')}<b>Driven mod</b></div>
        <div class="ctrl-cell">${padHTML('[L1]')}<b>Trigger run</b></div>
        <div class="ctrl-cell">${padHTML('[L2]')}<b>Jockey / shield</b></div>
        <div class="ctrl-cell">${padHTML('[R2]')}<b>2nd-man press</b></div>
      </div>
      <h4 style="font-size:11px;color:var(--cyan);letter-spacing:.2em;text-transform:uppercase;margin:14px 0 7px">Same buttons, defending</h4>
      <div class="ctrl-grid">
        <div class="ctrl-cell">${padHTML('[SQ]')}<b>Stand tackle</b></div>
        <div class="ctrl-cell">${padHTML('[O]')}<b>Slide</b></div>
        <div class="ctrl-cell">${padHTML('[X]')}<b>Fight for ball</b></div>
        <div class="ctrl-cell">${padHTML('[L2]')}<b>Jockey</b></div>
      </div>
      <p class="why" style="margin-top:9px">Face buttons carry two jobs. ${padHTML('[SQ]')} shoots in attack and stand-tackles in defence; ${padHTML('[O]')} crosses in attack and slides in defence. Every page in this app follows that.</p>`;
    view.appendChild(ctrl);

    const gaps = document.createElement('div');
    gaps.className = 'card';
    gaps.innerHTML = `<span class="tag ok"><span class="eicon" data-icon="sparkle"></span><span>Squad identity</span></span>
      <h3>A combination side, not a crossing side</h3>
      <p class="why">${fmt(D.identity)}</p>
      <h4 style="font-size:11px;color:var(--cyan);letter-spacing:.2em;text-transform:uppercase;margin:14px 0 6px">What you are good at</h4>
      ${D.strengths.map((x) => `<p class="why" style="margin:5px 0">• ${fmt(x)}</p>`).join('')}
      <h4 style="font-size:11px;color:#ff7d9d;letter-spacing:.2em;text-transform:uppercase;margin:14px 0 6px">What you cannot do</h4>
      ${D.weaknesses.map((x) => `<p class="why" style="margin:5px 0">• ${fmt(x)}</p>`).join('')}`;
    view.appendChild(gaps);

    const roster = document.createElement('div');
    roster.className = 'card';
    roster.innerHTML = '<h3>Squad &amp; roles</h3><p class="why" style="margin-bottom:9px">Tap a player for the role card and their specific job.</p>';
    const grid = document.createElement('div');
    grid.className = 'roster';
    ['SUZ', 'LUB', 'BARESI', 'CALETA', 'CAFU', 'BECK', 'ABILY', 'PARK', 'NEY', 'WISSA', 'ATH',
     'RONNIE', 'MASTA', 'PELE', 'FACC'].forEach((id) => {
      const p = D.players[id];
      const b = document.createElement('button');
      b.innerHTML = `<div class="pos">${esc(p.pos)}${p.ovr ? ' · ' + p.ovr : ''}</div><div class="nm">${esc(p.name)}</div><div class="rl">${esc(p.role)}</div>`;
      b.addEventListener('click', () => openSheet(`<span class="tag gold"><span class="eicon" data-icon="target"></span><span>${esc(p.pos)}</span></span><h2>${esc(p.name)}</h2>
        <h4>Role</h4><p>${esc(p.role)}</p><h4>Job in your system</h4><p>${esc(p.note)}</p>`));
      grid.appendChild(b);
    });
    roster.appendChild(grid);
    view.appendChild(roster);
  };

  SECTIONS.defend = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="wall"></span>Defending: The System</h2>
      <p class="section-sub">Work the five steps in order, every opponent attack. The sequence is the whole skill.</p>`;
    D.defendSteps.forEach((s, i) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<h3><span class="num">${i + 1}</span>${esc(s.t)} <span class="pad" style="margin-left:auto">${fmt(s.pad)}</span></h3><p class="why">${fmt(s.d)}</p>`;
      view.appendChild(c);
    });

    D.defDemos.forEach((demo) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="eye"></span><span>Watch it</span></span><h3>${esc(demo.name)} <span class="pad" style="margin-left:auto">${fmt(demo.pad)}</span></h3>`;
      view.appendChild(c);
      playWidget(c, demo, 'bottom');
    });

    const box = document.createElement('div');
    box.className = 'card';
    box.innerHTML = `<span class="tag red"><span class="eicon" data-icon="drop"></span><span>Where you bleed goals</span></span><h3>Box defending</h3>
      <ul style="padding-left:18px">${D.boxRules.map((r) => `<li style="margin:6px 0">${esc(r)}</li>`).join('')}</ul>`;
    view.appendChild(box);
  };

  SECTIONS.press = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="lightning"></span>Winning the Ball Back</h2>
      <p class="section-sub">You don’t win the ball by running at it. You win it by pressing at the right moments.</p>`;
    const trig = document.createElement('div');
    trig.className = 'card';
    trig.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="fist"></span><span>Press hard the instant you see…</span></span>`;
    D.pressTriggers.forEach((t, i) => {
      const row = document.createElement('div');
      row.className = 'kv';
      row.innerHTML = `<b>${i + 1}. ${esc(t.t)}</b><span>${esc(t.d)}</span>`;
      trig.appendChild(row);
    });
    const noT = document.createElement('p');
    noT.className = 'why';
    noT.style.marginTop = '8px';
    noT.textContent = 'No trigger showing? Stay in shape, cut lanes, wait.';
    trig.appendChild(noT);
    view.appendChild(trig);

    D.pressRules.forEach((r) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<h3>${esc(r.t)} <span class="pad" style="margin-left:auto">${fmt(r.pad)}</span></h3><p class="why">${fmt(r.d)}</p>`;
      view.appendChild(c);
    });

    // counter-press window visual
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="lightning"></span><span>Feel the window</span></span><h3>The 5-second counter-press</h3>
      <p class="why">Tap start when you "lose the ball". Green = hunt. Red = stop, retreat, reform.</p>
      <div style="display:flex;align-items:center;gap:14px;margin-top:12px">
        <button class="btn" id="cpBtn">Lose the ball</button>
        <div style="flex:1"><div class="progress-band" style="height:14px"><i id="cpBar" style="width:0%"></i></div>
        <div id="cpLbl" style="font-size:13px;color:var(--muted);margin-top:6px">Window closed.</div></div>
      </div>`;
    view.appendChild(c);
    let cpRaf = null;
    c.querySelector('#cpBtn').addEventListener('click', () => {
      const bar = c.querySelector('#cpBar'), lbl = c.querySelector('#cpLbl');
      if (cpRaf) cancelAnimationFrame(cpRaf);
      const t0 = performance.now();
      (function step(now) {
        const s = (now - t0) / 1000;
        if (s <= 5) {
          bar.style.width = (s / 5 * 100) + '%';
          bar.style.background = 'linear-gradient(90deg,var(--ok),var(--gold))';
          lbl.innerHTML = `<b style="color:var(--ok)">HUNT — ${(5 - s).toFixed(1)}s.</b> Nearest attacker + short [R2] burst. Beckenbauer never joins.`;
          cpRaf = requestAnimationFrame(step);
        } else {
          bar.style.width = '100%';
          bar.style.background = 'var(--red)';
          lbl.innerHTML = `<b style="color:#f08a85">STOP.</b> Retreat, reform two banks of four.`;
        }
      })(t0);
    });
  };

  SECTIONS.build = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="sprout"></span>Build-Up: Back to Front</h2>
      <p class="section-sub">Your build-up problem is structure, not skill. Three phases.</p>`;
    const demoCard = document.createElement('div');
    demoCard.className = 'card';
    demoCard.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="eye"></span><span>Watch it</span></span><h3>${esc(D.buildDemo.name)}</h3>`;
    view.appendChild(demoCard);
    playWidget(demoCard, D.buildDemo, 'bottom');

    D.buildPhases.forEach((p) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<h3>${esc(p.t)}</h3><ul style="padding-left:18px">${p.items.map((i) => `<li style="margin:6px 0">${fmt(i)}</li>`).join('')}</ul>`;
      view.appendChild(c);
    });
    const tri = document.createElement('div');
    tri.className = 'card';
    tri.innerHTML = `<h3>Key passes &amp; finishes</h3>
      <div class="kv"><b>Driven pass</b><span>${padHTML('[R2]+[X]')} — into Park’s feet</span></div>
      <div class="kv"><b>Through ball</b><span>${padHTML('[TR]')} — into Wissa’s run</span></div>
      <div class="kv"><b>Driven through</b><span>${padHTML('[R2]+[TR]')} — flat and fast in behind</span></div>
      <div class="kv"><b>Driven cross</b><span>${padHTML('[R2]+[O]')} — far post for Park</span></div>
      <div class="kv"><b>Shot</b><span>${padHTML('[SQ]')} — low, near post</span></div>
      <div class="kv"><b>Finesse</b><span>${padHTML('[R2]+[SQ]')} — curled far corner</span></div>`;
    view.appendChild(tri);
  };

  SECTIONS.routes = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="sword"></span>Attack Routes</h2>
      <p class="section-sub">Every attack targets one of these. Core routes are your foundation; elite routes are what beats a Div 1 defender who reads the core ones.</p>`;
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.innerHTML = `<button data-r="core" class="on">Core · 5</button><button data-r="elite">Elite · 8</button>`;
    const host = document.createElement('div');
    view.append(seg, host);

    const renderRoutes = (kind) => {
      activePlayers.forEach((p) => p.pause());
      activePlayers = [];
      host.innerHTML = '';
      const list = kind === 'elite' ? D.eliteRoutes : D.routes;
      if (kind === 'elite') {
        const intro = document.createElement('div');
        intro.className = 'card';
        intro.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="sparkle"></span><span>Elite tier</span></span>
          <h3>Why these are different</h3>
          <p class="why">Core routes beat a defensive shape. These beat a <b>person</b> — they attack what a good opponent is actively reading: your body shape, your cross timing, your first touch after winning the ball. Learn two properly rather than all eight badly.</p>`;
        host.appendChild(intro);
      }
      list.forEach((r) => {
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="star"></span><span>${kind === 'elite' ? 'Elite' : 'Route'} ${r.n} · ${esc(r.tag)}</span></span>
          <h3>${esc(r.name)} <span class="pad" style="margin-left:auto">${fmt(r.pad)}</span></h3>
          <p class="why">${fmt(r.desc)}</p>
          ${r.why ? `<p class="why" style="margin-top:7px"><b style="color:var(--cyan)">Why it works:</b> ${fmt(r.why)}</p>` : ''}`;
        host.appendChild(c);
        playWidget(c, r, r.view);
      });
    };
    renderRoutes('core');
    seg.addEventListener('click', (e) => {
      const k = e.target.getAttribute('data-r');
      if (!k) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      renderRoutes(k);
    });
  };

  SECTIONS.setpieces = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="target"></span>Set Pieces</h2>
      <p class="section-sub">Free goals against opponents who defend open play better than you attack it. At Elite level, set pieces decide more games than build-up does.</p>`;
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.innerHTML = `<button data-s="corners" class="on">Corners</button><button data-s="freeKicks">Free kicks</button><button data-s="dead">Pens &amp; throws</button>`;
    const host = document.createElement('div');
    view.append(seg, host);

    const render = (k) => {
      activePlayers.forEach((p) => p.pause());
      activePlayers = [];
      host.innerHTML = '';
      if (k === 'dead') {
        const pens = document.createElement('div');
        pens.className = 'card';
        pens.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="target"></span><span>Penalties</span></span><h3>Five rules</h3>` +
          D.setPieces.penalties.map((p) => `<div class="kv"><b>${esc(p.t)}</b><span>${fmt(p.d)}</span></div>`).join('');
        const thr = document.createElement('div');
        thr.className = 'card';
        thr.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="run"></span><span>Throw-ins</span></span><h3>Quiet possession leaks</h3>` +
          D.setPieces.throwIns.map((p) => `<div class="kv"><b>${esc(p.t)}</b><span>${fmt(p.d)}</span></div>`).join('');
        host.append(pens, thr);
        return;
      }
      D.setPieces[k].forEach((sp) => {
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="star"></span><span>${esc(sp.tag)}</span></span>
          <h3>${esc(sp.name)} <span class="pad" style="margin-left:auto">${fmt(sp.pad)}</span></h3>
          <p class="why">${fmt(sp.desc)}</p>
          <p class="why" style="margin-top:7px"><b style="color:var(--cyan)">Why it works:</b> ${fmt(sp.why)}</p>`;
        host.appendChild(c);
        playWidget(c, sp, sp.view);
      });
      const note = document.createElement('p');
      note.className = 'footer-note';
      note.textContent = D.setPieceNote;
      host.appendChild(note);
    };
    render('corners');
    seg.addEventListener('click', (e) => {
      const k = e.target.getAttribute('data-s');
      if (!k) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      render(k);
    });
  };

  SECTIONS.shapes = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="eye"></span>Attacking Shapes</h2>
      <p class="section-sub">Read their formation in the first two minutes, then run the plan that shape concedes. Red is them — the glowing zones are where their structure leaks.</p>`;
    const seg = document.createElement('div');
    seg.className = 'seg seg-wrap';
    seg.innerHTML = D.shapes.map((s, i) =>
      `<button data-i="${i}"${i === 0 ? ' class="on"' : ''}>${esc(s.name)}</button>`).join('');
    const host = document.createElement('div');
    view.append(seg, host);

    const render = (i) => {
      const s = D.shapes[i];
      host.innerHTML = '';
      const head = document.createElement('div');
      head.className = 'card';
      head.innerHTML = `<span class="tag red"><span class="eicon" data-icon="eye"></span><span>${esc(s.freq)}</span></span>
        <h3>${esc(s.name)}</h3><p class="why">${fmt(s.read)}</p>`;
      host.appendChild(head);
      const boardHost = document.createElement('div');
      boardHost.className = 'pitch-wrap';
      host.appendChild(boardHost);
      PITCH.shapeBoard(boardHost, s);
      const plan = document.createElement('div');
      plan.className = 'card';
      plan.innerHTML = `<h3>The plan</h3>
        <div class="kv"><b>Where the space is</b><span>${fmt(s.space)}</span></div>
        <div class="kv"><b>How to attack it</b><span>${fmt(s.attack)}</span></div>
        <div class="kv"><b>What hurts you</b><span>${fmt(s.defend)}</span></div>
        <div style="margin-top:10px">${s.routes.map((r) => `<span class="chip">${esc(r)}</span>`).join('')}</div>`;
      host.appendChild(plan);
    };
    render(0);
    seg.addEventListener('click', (e) => {
      const i = e.target.getAttribute('data-i');
      if (i === null) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      render(+i);
    });
  };

  SECTIONS.mechanics = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="spiral"></span>Mechanics</h2>
      <p class="section-sub">Every input mapped to your custom scheme, with the reason each one exists. If a button is not in here, you probably do not need it.</p>`;
    const note = document.createElement('div');
    note.className = 'card';
    note.innerHTML = `<span class="tag red"><span class="eicon" data-icon="lightning"></span><span>Read this first</span></span>
      <h3>Competitive settings</h3><p class="why">${esc(D.competitiveNote)}</p>`;
    view.appendChild(note);
    D.mechanics.forEach((g) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<h3>${esc(g.group)}</h3>` + g.items.map((it) =>
        `<div class="mech"><span class="pad">${fmt(it.pad)}</span><div><b>${esc(it.n)}</b><p class="why">${fmt(it.d)}</p></div></div>`).join('');
      view.appendChild(c);
    });
  };

  SECTIONS.adjust = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="yinyang"></span>Match Management</h2>
      <p class="section-sub">Games at this level are won between the goals. Tap any row.</p>`;
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.innerHTML = `<button data-m="script" class="on">Game script</button><button data-m="reads">Reads</button><button data-m="fix">Quick fixes</button>`;
    const host = document.createElement('div');
    view.append(seg, host);

    const render = (m) => {
      host.innerHTML = '';
      if (m === 'script') {
        D.matchScripts.forEach((s) => {
          const c = document.createElement('div');
          c.className = 'card';
          c.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="target"></span><span>${esc(s.phase)}</span></span>
            <h3>${esc(s.title)}</h3>
            <ul style="padding-left:18px">${s.bullets.map((b) => `<li style="margin:6px 0">${fmt(b)}</li>`).join('')}</ul>`;
          host.appendChild(c);
        });
        const subs = document.createElement('div');
        subs.className = 'card';
        subs.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="run"></span><span>Substitutions</span></span><h3>When to use them</h3>` +
          D.subPlan.map((s) => `<div class="kv"><b>${esc(s.min)}</b><span>${fmt(s.d)}</span></div>`).join('');
        host.appendChild(subs);
        return;
      }
      if (m === 'reads') {
        const intro = document.createElement('p');
        intro.className = 'section-sub';
        intro.textContent = 'What they are doing, and the counter. Diagnose in the first fifteen minutes.';
        host.appendChild(intro);
        D.reads.forEach((r) => {
          const b = document.createElement('button');
          b.className = 'situation';
          b.innerHTML = `<div class="card"><h3>${esc(r.tell)}<span class="arrow">▸</span></h3><div class="body">${fmt(r.fix)}</div></div>`;
          b.addEventListener('click', () => b.classList.toggle('open'));
          host.appendChild(b);
        });
        return;
      }
      D.adjust.forEach((a) => {
        const b = document.createElement('button');
        b.className = 'situation';
        b.innerHTML = `<div class="card"><h3>${esc(a.s)}<span class="arrow">▸</span></h3><div class="body">${fmt(a.c)}</div></div>`;
        b.addEventListener('click', () => b.classList.toggle('open'));
        host.appendChild(b);
      });
    };
    render('script');
    seg.addEventListener('click', (e) => {
      const m = e.target.getAttribute('data-m');
      if (!m) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.target));
      render(m);
    });
  };

  SECTIONS.train = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="weight"></span>One-Week Training Plan</h2>
      <p class="section-sub">Grade the habit, not the scoreline. Check off days as you go — progress is saved on this device.</p>`;
    const plan = document.createElement('div');
    plan.className = 'card';
    checklist(plan, 'train', D.training, (t) => `<b>${esc(t.day)} — ${esc(t.t)}.</b> ${esc(t.d)}`);
    view.appendChild(plan);

    const warm = document.createElement('div');
    warm.className = 'card';
    warm.innerHTML = '<h3>10-minute arena warm-up</h3>';
    checklist(warm, 'warmup', D.warmup, (w) => esc(w));
    view.appendChild(warm);

    const elite = document.createElement('div');
    elite.className = 'card';
    elite.innerHTML = `<span class="tag blue"><span class="eicon" data-icon="sparkle"></span><span>Elite reps</span></span>
      <h3>The Div 1 drill set</h3>
      <p class="why" style="margin-bottom:8px">Run these on competitive assistance, not default. Check them off as they become automatic.</p>`;
    checklist(elite, 'elitedrills', D.eliteDrills, (d) => `<b>${esc(d.t)}.</b> ${fmt(d.d)}`);
    view.appendChild(elite);

    const set = document.createElement('div');
    set.className = 'card';
    set.innerHTML = `<h3>Settings worth changing</h3>` + D.settings.map((s) => `<p class="why" style="margin:6px 0">• ${esc(s)}</p>`).join('');
    view.appendChild(set);

    const mist = document.createElement('div');
    mist.className = 'card';
    mist.innerHTML = `<span class="tag red"><span class="eicon" data-icon="cross-x"></span><span>Stop today</span></span><h3>Ten mistakes</h3>
      <p class="why" style="margin-bottom:10px">Tap one to see the fix.</p>`;
    D.mistakes.forEach((m, i) => {
      const d = document.createElement('div');
      d.className = 'mistake';
      d.innerHTML = `<div class="head"><span class="num" style="background:var(--red);color:#fff">${i + 1}</span>${esc(m.m)}</div><div class="fix">✔ ${fmt(m.f)}</div>`;
      d.addEventListener('click', () => d.classList.toggle('open'));
      mist.appendChild(d);
    });
    view.appendChild(mist);

    const reset = document.createElement('button');
    reset.className = 'btn ghost small';
    reset.style.margin = '4px auto 0';
    reset.style.display = 'block';
    reset.textContent = 'Reset week progress';
    reset.addEventListener('click', () => { store.set('train', []); store.set('warmup', []); store.set('elitedrills', []); SECTIONS.train(); });
    view.appendChild(reset);
  };

  /* ---------- navigation ---------- */
  const tabs = document.querySelectorAll('.tab');
  function go(id, push) {
    activePlayers.forEach((p) => p.pause());
    activePlayers = [];
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on);
    });
    view.classList.remove('view-anim');
    void view.offsetWidth;
    view.classList.add('view-anim');
    SECTIONS[id]();
    window.scrollTo({ top: 0 });
    if (push !== false) history.replaceState(null, '', '#' + id);
  }
  tabs.forEach((t) => t.addEventListener('click', () => go(t.dataset.tab)));
  document.getElementById('squadBadge').addEventListener('click', () => go('setup'));

  const start = location.hash.replace('#', '');
  go(SECTIONS[start] ? start : 'laws', false);

  /* ---------- PWA ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
