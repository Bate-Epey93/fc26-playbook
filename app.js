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
      view: viewMode || 'top',
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

  SECTIONS.setup = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="chart"></span>Your Setup</h2>
      <p class="section-sub">Tap any player for their role card. Switch shape to preview the Plan B preset.</p>`;
    const segWrap = document.createElement('div');
    segWrap.className = 'seg';
    segWrap.innerHTML = `<button data-f="4231" class="on">4-2-3-1 · Fortress</button><button data-f="3421">3-4-2-1 · Plan B</button>`;
    view.appendChild(segWrap);

    const boardHost = document.createElement('div');
    boardHost.className = 'pitch-wrap';
    const desc = document.createElement('p');
    desc.className = 'pitch-caption';
    view.append(boardHost, desc);

    const board = PITCH.formationBoard(boardHost, (id) => {
      const p = D.players[id];
      openSheet(`<span class="tag gold"><span class="eicon" data-icon="target"></span><span>${esc(p.pos)}</span></span><h2>${esc(p.name)}</h2>
        <h4>Role</h4><p>${esc(p.role)}</p>
        <h4>Job in your system</h4><p>${esc(p.note)}</p>`);
    });
    const setF = (fid) => {
      board.setFormation(fid);
      desc.innerHTML = `<b>${esc(D.formations[fid].label)}</b> — ${esc(D.formations[fid].desc)}`;
    };
    board.setFormation('4231', true);
    desc.innerHTML = `<b>${esc(D.formations['4231'].label)}</b> — ${esc(D.formations['4231'].desc)}`;
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
      <p class="why" style="margin-top:9px">Every button in this app matches this scheme — sprint on ${padHTML('[R1]')}, all finesse/driven balls on ${padHTML('[R2]')}, shot on ${padHTML('[SQ]')}, cross on ${padHTML('[O]')}.</p>`;
    view.appendChild(ctrl);

    const gaps = document.createElement('div');
    gaps.className = 'card';
    gaps.innerHTML = `<h3>Two gaps to fill</h3>
      <p>• <b>LB:</b> any cheap one with 80+ pace, nothing fancy.<br>• <b>GK:</b> prioritize reflexes and positioning.</p>
      <p class="why" style="margin-top:6px">Upgrade later, not now: once cheap goals stop, Marquinhos → Ball-Playing Defender (Build-Up), Line Height 55–60.</p>`;
    view.appendChild(gaps);

    const roster = document.createElement('div');
    roster.className = 'card';
    roster.innerHTML = '<h3>Squad & roles</h3>';
    const grid = document.createElement('div');
    grid.className = 'roster';
    ['GK', 'LB', 'ACE', 'MARQ', 'TIM', 'RICE', 'MCK', 'CAH', 'SAN', 'AZK', 'R9'].forEach((id) => {
      const p = D.players[id];
      const b = document.createElement('button');
      b.innerHTML = `<div class="pos">${esc(p.pos)}</div><div class="nm">${esc(p.name)}</div><div class="rl">${esc(p.role)}</div>`;
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
          lbl.innerHTML = `<b style="color:var(--ok)">HUNT — ${(5 - s).toFixed(1)}s.</b> Nearest attacker + short [R2] burst. Rice never joins.`;
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
      <div class="kv"><b>Driven pass</b><span>${padHTML('[R2]+[X]')} — into Cahill’s feet</span></div>
      <div class="kv"><b>Through ball</b><span>${padHTML('[TR]')} — into R9’s run</span></div>
      <div class="kv"><b>Driven through</b><span>${padHTML('[R2]+[TR]')} — flat and fast in behind</span></div>
      <div class="kv"><b>Driven cross</b><span>${padHTML('[R2]+[O]')} — far post for Cahill</span></div>
      <div class="kv"><b>Shot</b><span>${padHTML('[SQ]')} — low, near post</span></div>
      <div class="kv"><b>Finesse</b><span>${padHTML('[R2]+[SQ]')} — curled far corner</span></div>`;
    view.appendChild(tri);
  };

  SECTIONS.routes = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="sword"></span>Five Attack Routes</h2>
      <p class="section-sub">Your playbook. Every attack targets one of these. Press play — gold trails are passes, orange is the shot.</p>`;
    D.routes.forEach((r) => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `<span class="tag gold"><span class="eicon" data-icon="star"></span><span>Route ${r.n} · ${esc(r.tag)}</span></span>
        <h3>${esc(r.name)} <span class="pad" style="margin-left:auto">${fmt(r.pad)}</span></h3>
        <p class="why">${fmt(r.desc)}</p>`;
      view.appendChild(c);
      playWidget(c, r, 'top');
    });
  };

  SECTIONS.adjust = () => {
    view.innerHTML = `<h2 class="section-title"><span class="eicon" data-icon="yinyang"></span>In-Game Adjustments</h2>
      <p class="section-sub">Mid-match cheat sheet. Tap a situation. Use the D-pad — never ride out a bad game unchanged.</p>`;
    D.adjust.forEach((a) => {
      const b = document.createElement('button');
      b.className = 'situation';
      b.innerHTML = `<div class="card"><h3>${esc(a.s)}<span class="arrow">▸</span></h3><div class="body">${fmt(a.c)}</div></div>`;
      b.addEventListener('click', () => b.classList.toggle('open'));
      view.appendChild(b);
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
    reset.addEventListener('click', () => { store.set('train', []); store.set('warmup', []); SECTIONS.train(); });
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
