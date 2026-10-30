/* 1960 Labs website behaviour. Motion follows the brand system: mechanical, quick, then still. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- intro: the mark builds, then the cover wipes away (once per session) ---------- */
  const intro = $('.intro');
  if (intro) {
    if (reduce || store.get('1960-intro')) intro.classList.add('gone');
    else {
      store.set('1960-intro', '1');
      const end = () => intro.classList.add('gone');
      intro.addEventListener('animationend', e => { if (e.animationName === 'intro-wipe') end(); });
      intro.addEventListener('click', end);
      setTimeout(end, 2600);
    }
  }

  /* ---------- header ---------- */
  const hdr = $('.hdr');
  const onScroll = () => hdr && hdr.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menuBtn = $('.menu-btn'), sheet = $('.sheet');
  if (menuBtn && sheet) {
    const label = $('.menu-btn span');
    const set = open => {
      sheet.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close' : 'Menu';
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => set(sheet.hidden));
    sheet.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { set(false); menuBtn.focus(); } });
    matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) set(false); });
  }

  /* ---------- reveal helpers: content is visible at rest; motion starts just before it enters ---------- */
  const onEnter = (els, fn, margin = '0px 0px 8% 0px') => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } }), { rootMargin: margin });
    els.forEach(el => io.observe(el));
  };
  const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  // word rise on headings
  const riseEls = $$('[data-rise]');
  riseEls.forEach(h => {
    let i = 0;
    const split = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) f.append(t);
          else { const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = t; f.append(s); }
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1 && !c.classList.contains('stop')) split(c);
    });
    split(h);
  });
  if (!reduce) {
    const first = riseEls.filter(h => h.getBoundingClientRect().top < innerHeight);
    const delay = intro && !intro.classList.contains('gone') ? 1500 : 0;
    first.forEach(h => setTimeout(() => h.classList.add('rise-go'), delay));
    onEnter(riseEls.filter(h => !first.includes(h)), h => h.classList.add('rise-go'));
    onEnter($$('[data-slot]'), el => el.classList.add('slot-go'), '0px 0px -10% 0px');
    const fm = $('.f-mark');
    if (fm) onEnter([fm], el => el.classList.add('go'), '0px 0px -5% 0px');
  }

  /* ---------- schematics: hairline process drawings with a travelling blue unit ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const el = (p, t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
  const SCHEMES = {
    /* hero tiles, 320 x 220 */
    't-finance': { vb: [320, 220], items: [
      { d: 'M40 120H280', main: true },
      { d: 'M120 120V70H200V120', manual: true },
      { n: [40, 120, 'APPLY', 0, 0, 1] }, { n: [120, 120, 'RULES', 0, 0, 1] }, { n: [160, 70, 'EMAIL', 1] }, { n: [200, 120, 'DECIDE', 0, 0, 1] }, { n: [280, 120, 'AUDIT', 0, 1, 1] }
    ] },
    't-telecoms': { vb: [320, 220], items: [
      { box: [20, 96, 70, 32, 'PROBE'] },
      { d: 'M90 112H120V72H170', main: true }, { d: 'M90 112H170', main: true }, { d: 'M90 112H120V152H170', main: true },
      { d: 'M170 72H220V112H270', main: true }, { d: 'M170 112H270', main: true }, { d: 'M170 152H220V112H270', main: true },
      { n: [170, 72, 'OP A'] }, { n: [170, 112, 'OP B'] }, { n: [170, 152, 'OP C', 0, 0, 1] }, { n: [270, 112, 'COMPARE', 0, 1] }
    ] },
    't-logistics': { vb: [320, 220], items: [
      { d: 'M40 90H280V150', main: true },
      { d: 'M120 90V150H200V90', manual: true },
      { n: [40, 90, 'DISPATCH'] }, { n: [120, 90, 'PICKUP'] }, { n: [200, 90, 'TRANSIT'] }, { n: [280, 90, 'POD'] },
      { n: [160, 150, 'CALLS', 1, 0, 1] }, { n: [280, 150, 'INVOICE', 0, 1, 1] }
    ] },
    't-marketing': { vb: [320, 220], items: [
      { d: 'M40 62H90V112H150', main: true }, { d: 'M40 112H150', main: true }, { d: 'M40 162H90V112H150', main: true },
      { d: 'M150 112H280', main: true },
      { d: 'M150 112V172H230V112', manual: true },
      { n: [40, 62, 'FORM'] }, { n: [40, 112, 'ADS'] }, { n: [40, 162, 'EVENT', 0, 0, 1] },
      { n: [150, 112, 'ROUTE'] }, { n: [230, 112, 'CRM'] }, { n: [280, 112, 'REPORT', 0, 1] }, { n: [190, 172, 'SHEETS', 1, 0, 1] }
    ] },
    /* large drawings, 640 x 300 */
    diagnose: { vb: [640, 300], items: [
      { t: [60, 36, 'ORDER INTAKE · AS IT REALLY RUNS', 'start'] },
      { d: 'M60 170H560', main: true },
      { d: 'M200 170V100H280V170', manual: true }, { d: 'M440 170V100H520V170', manual: true },
      { n: [60, 170, '01 REQUEST', 0, 0, 1] }, { n: [180, 170, '02 CHECK', 0, 0, 1] }, { n: [300, 170, '03 APPROVE', 0, 0, 1] }, { n: [420, 170, '04 SYNC', 0, 0, 1] }, { n: [560, 170, '05 DONE', 0, 1, 1] },
      { n: [240, 100, 'SPREADSHEET', 1] }, { n: [480, 100, 'RE-KEYED BY HAND', 1] },
      { t: [60, 262, '── MAIN PATH', 'start'] }, { t: [200, 262, '- - WORKAROUND WE REMOVE', 'start'] }
    ] },
    redesign: { vb: [640, 300], items: [
      { t: [60, 58, 'BEFORE · 7 STEPS', 'start'] },
      { d: 'M60 100H580', manual: true },
      { n: [60, 100, ''] }, { n: [147, 100, '', 1] }, { n: [233, 100, '', 1] }, { n: [320, 100, '', 1] }, { n: [407, 100, '', 1] }, { n: [493, 100, '', 1] }, { n: [580, 100, ''] },
      { t: [60, 186, 'AFTER · 3 STEPS', 'start'] },
      { d: 'M60 226H300L320 246H580', main: true },
      { n: [60, 226, 'IN'] }, { n: [300, 226, 'CHECK'] }, { n: [580, 246, 'DONE', 0, 1, 1] }
    ] },
    build: { vb: [640, 300], items: [
      { box: [40, 60, 150, 44, 'YOUR SYSTEMS'] }, { box: [40, 128, 150, 44, 'YOUR DATA'] }, { box: [40, 196, 150, 44, 'YOUR RULES'] },
      { d: 'M190 82H240L260 102V150H320', main: true }, { d: 'M190 150H320', main: true }, { d: 'M190 218H240L260 198V150H320', main: true },
      { box: [320, 124, 160, 52, 'CUSTOM BUILD', 1] },
      { d: 'M480 150H580', main: true }, { n: [580, 150, 'LIVE', 0, 1] }
    ] },
    credithub: { vb: [640, 300], items: [
      { box: [20, 125, 120, 50, 'MERCHANTS'] }, { box: [180, 125, 120, 50, 'PLATFORM'] }, { box: [340, 125, 130, 50, 'CREDITHUB', 1] },
      { d: 'M140 150H180', main: true }, { d: 'M300 150H340', main: true },
      { d: 'M470 150H510V80H580', main: true }, { d: 'M470 150H580', main: true }, { d: 'M470 150H510V220H580', main: true },
      { n: [580, 80, 'LENDER'] }, { n: [580, 150, 'LENDER'] }, { n: [580, 220, 'LENDER', 0, 0, 1] },
      { t: [80, 210, 'APPLY IN-APP', 'middle'] }, { t: [405, 210, 'SDK · APIs', 'middle'] }
    ] },
    'credithub-paths': { vb: [640, 300], items: [
      { box: [20, 125, 120, 50, 'OPERATOR'] },
      { d: 'M140 150H200V90H280', main: true }, { d: 'M140 150H200V210H280', main: true },
      { box: [280, 65, 130, 50, 'SDK'] }, { box: [280, 185, 130, 50, 'APIs'] },
      { d: 'M410 90H480V150H580', main: true }, { d: 'M410 210H480V150H580', main: true },
      { n: [580, 150, 'CREDIT LIVE', 0, 1] },
      { t: [345, 52, 'LAUNCH QUICKLY', 'middle'] }, { t: [345, 260, 'BUILD YOUR OWN PRODUCT', 'middle'] }
    ] },
    network: { vb: [640, 300], items: [
      { box: [30, 125, 120, 50, 'PROBE'] },
      { d: 'M150 150H200V70H260', main: true }, { d: 'M150 150H260', main: true }, { d: 'M150 150H200V230H260', main: true },
      { d: 'M260 70H340V150H420', main: true }, { d: 'M260 150H420', main: true }, { d: 'M260 230H340V150H420', main: true },
      { n: [260, 70, 'OPERATOR A'] }, { n: [260, 150, 'OPERATOR B'] }, { n: [260, 230, 'OPERATOR C', 0, 0, 1] },
      { box: [420, 125, 170, 50, '1960 NETWORK', 1] }
    ] }
  };
  const flows = [];
  const drawSchem = svg => {
    const sc = SCHEMES[svg.dataset.kind]; if (!sc) return;
    const [W, H] = sc.vb;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    if (!svg.hasAttribute('preserveAspectRatio')) svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    const night = svg.dataset.tone === 'night';
    const ink = night ? '#F7F7F5' : '#0B0B0C', muted = '#8F8E88', faint = night ? '#1C1C1F' : '#EFEEEA', bg = night ? '#0B0B0C' : '#FFFFFF';
    const ns = { 'vector-effect': 'non-scaling-stroke', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    if (svg.dataset.grid !== 'off') {
      const g = el(svg, 'g', {});
      for (let x = 20; x < W; x += 20) el(g, 'line', { x1: x, y1: 0, x2: x, y2: H, stroke: faint, 'stroke-width': .5, 'vector-effect': 'non-scaling-stroke' });
      for (let y = 20; y < H; y += 20) el(g, 'line', { x1: 0, y1: y, x2: W, y2: y, stroke: faint, 'stroke-width': .5, 'vector-effect': 'non-scaling-stroke' });
    }
    const paths = [], nodes = [];
    const label = (x, y, s, c, anchor = 'middle') => { const t = el(svg, 'text', { x, y, fill: c, 'text-anchor': anchor }); t.textContent = s; };
    sc.items.forEach(o => {
      if (o.d) paths.push({ el: el(svg, 'path', { ...ns, d: o.d, stroke: o.manual ? muted : ink, 'stroke-width': o.manual ? .75 : 1, ...(o.manual ? { 'stroke-dasharray': '3 3' } : {}) }), manual: !!o.manual });
    });
    sc.items.forEach(o => {
      if (o.n) {
        const [x, y, s, man, done, below] = o.n;
        const r = el(svg, 'rect', { ...ns, class: 'node', x: x - 5, y: y - 5, width: 10, height: 10, stroke: done ? '#221FC3' : man ? muted : ink, 'stroke-width': 1, fill: done ? '#221FC3' : bg });
        nodes.push({ x, y, r });
        if (s) label(x, below ? y + 24 : y - 14, s, done ? ink : muted);
      }
      if (o.box) {
        const [x, y, w, h, s, hi] = o.box;
        el(svg, 'rect', { ...ns, x, y, width: w, height: h, stroke: hi ? '#221FC3' : ink, 'stroke-width': 1, fill: bg });
        if (hi) el(svg, 'rect', { x: x + w - 7, y, width: 7, height: 7, fill: '#221FC3' });
        label(x + w / 2, y + h / 2 + 4, s, hi ? (night ? '#F7F7F5' : '#221FC3') : ink);
      }
      if (o.t) label(o.t[0], o.t[1], o.t[2], muted, o.t[3] || 'middle');
    });
    // keep labels near 11px on screen, whatever the drawing's size
    const fit = () => { const w = svg.getBoundingClientRect().width; if (!w) return; const k = w / W; svg.style.fontSize = Math.max(6, Math.min(W / 36, 11 / k)) + 'px'; };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(svg);
    if (reduce) return;
    const layer = el(svg, 'g', {});
    let offset = 0;
    const runners = paths.map(p => {
      const len = p.el.getTotalLength(), speed = p.manual ? 55 : 160;
      const dur = len / speed * 1000, color = p.manual ? muted : '#221FC3';
      const sq = [1, .45, .2].map(() => el(layer, 'rect', { width: 7, height: 7, x: -3.5, y: -3.5, fill: color, opacity: 0 }));
      const r = { p: p.el, len, dur, start: p.manual ? 0 : offset, sq, base: [1, .45, .2], manual: p.manual };
      offset += p.manual ? 0 : dur * .55;
      return r;
    });
    const mainCycle = Math.max(1, ...runners.filter(r => !r.manual).map(r => r.start + r.dur)) + 900;
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const hits = new Map();
    flows.push({ svg, tick: now => {
      runners.forEach(r => {
        const t = now % (r.manual ? r.dur + 900 : mainCycle);
        const k = (t - r.start) / r.dur, live = k >= 0 && k <= 1;
        const fade = live ? Math.min(1, k * 8, (1 - k) * 8) : 0;
        r.sq.forEach((q, i) => {
          const kk = Math.max(0, ease(Math.min(1, Math.max(0, k))) - i * .025);
          const pt = r.p.getPointAtLength(kk * r.len);
          q.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
          q.setAttribute('opacity', (r.base[i] * fade).toFixed(3));
          if (i === 0 && live && !r.manual) nodes.forEach(n => { if (Math.abs(n.x - pt.x) < 6 && Math.abs(n.y - pt.y) < 6) hits.set(n, now); });
        });
      });
      nodes.forEach(n => n.r.classList.toggle('hit', now - (hits.get(n) || -1e9) < 520));
    } });
  };
  $$('svg.schem').forEach(drawSchem);
  if (!reduce && flows.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const vio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    flows.forEach(f => vio.observe(f.svg));
    const loop = now => { flows.forEach(f => { if (visible.has(f.svg) && f.svg.getClientRects().length) f.tick(now); }); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  /* ---------- method player (How we work) ---------- */
  $$('[data-method]').forEach(m => {
    const tabs = $$('.m-tab', m), slides = $$('.m-slide', m);
    let cur = 0, timer = null, inView = false, hold = false;
    const DUR = 6500;
    m.style.setProperty('--m-dur', DUR + 'ms');
    const show = (i, focus) => {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(j === cur)); t.tabIndex = j === cur ? 0 : -1; });
      slides.forEach((s, j) => s.classList.toggle('on', j === cur));
      const prog = tabs[cur].nextElementSibling;
      if (prog) { prog.style.animation = 'none'; void prog.offsetWidth; prog.style.animation = ''; }
      if (focus) tabs[cur].focus();
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (reduce) { m.classList.add('static'); return; }
      if (inView && !hold) timer = setTimeout(() => show(cur + 1), DUR);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => { show(i); });
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, true); }
      });
    });
    const pause = v => { hold = v; m.classList.toggle('paused', v); if (v) clearTimeout(timer); else schedule(); };
    m.addEventListener('mouseenter', () => pause(true));
    m.addEventListener('mouseleave', () => pause(false));
    m.addEventListener('focusin', () => pause(true));
    m.addEventListener('focusout', e => { if (!m.contains(e.relatedTarget)) pause(false); });
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { inView = e.isIntersecting; m.classList.toggle('paused', !inView || hold); schedule(); }), { threshold: .35 }).observe(m);
    show(0);
  });

  /* ---------- work band carousel ---------- */
  $$('[data-work]').forEach(w => {
    const tabs = $$('.wb-tabs button', w), slides = $$('.wb-slide', w), vis = $$('.wb-vis > div', w), names = $$('.wb-name span', w);
    const num = $('.wb-idx .n', w);
    let cur = 0;
    const show = (i, focus) => {
      cur = (i + slides.length) % slides.length;
      tabs.forEach(t => { const on = +t.dataset.i === cur; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on && focus && t.offsetParent) t.focus(); });
      slides.forEach((s, j) => s.classList.toggle('on', j === cur));
      names.forEach((s, j) => s.classList.toggle('on', j === cur));
      vis.forEach((v, j) => { v.classList.toggle('on', j === cur); if (j === cur && !reduce) restart(v, 'slot-go'); });
      if (num) num.textContent = String(cur + 1).padStart(2, '0');
    };
    tabs.forEach(t => {
      t.addEventListener('click', () => show(+t.dataset.i));
      t.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, true); } if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, true); } });
    });
    $('[data-prev]', w)?.addEventListener('click', () => show(cur - 1));
    $('[data-next]', w)?.addEventListener('click', () => show(cur + 1));
    show(0);
  });

  /* ---------- network dashboard (example data) ---------- */
  const NET = { voice: [-71, -84, -97], data: [-78, -92, -104], sms: [-69, -80, -93] };
  $$('[data-dash]').forEach(d => {
    const rows = $$('.dash-row', d), btns = $$('.dash-tabs button', d);
    const set = k => {
      btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
      NET[k].forEach((v, i) => {
        const pct = Math.round((v + 120) / 70 * 100);
        $('.fill', rows[i]).style.width = pct + '%';
        $('.v', rows[i]).textContent = v + ' dBm';
        rows[i].classList.toggle('low', v <= -100);
      });
    };
    btns.forEach(b => b.addEventListener('click', () => set(b.dataset.k)));
    set('voice');
  });
  $$('[data-heat]').forEach(h => {
    // a fixed 12 x 6 example coverage grid; one weak spot flagged
    const v = [9,8,8,7,9,8,6,7,8,9,8,7, 8,7,6,6,7,5,4,6,7,8,7,6, 7,6,5,4,3,2,3,5,6,7,6,5, 8,6,5,4,3,3,4,5,6,6,5,4, 9,7,6,5,5,4,5,6,7,7,6,5, 9,8,7,7,6,6,7,7,8,8,7,6];
    v.forEach((n, i) => { const c = document.createElement('i'); if (i === 29) c.className = 'flag'; else c.style.opacity = (n / 10).toFixed(2); h.append(c); });
  });

  /* ---------- copy email ---------- */
  $$('.copy[data-copy]').forEach(b => b.addEventListener('click', () => {
    const t = b.dataset.copy, addr = b.previousElementSibling;
    const done = () => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1600); };
    const sel = () => { if (!addr) return; const r = document.createRange(); r.selectNodeContents(addr); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected'; setTimeout(() => b.textContent = 'Copy', 1600); };
    try { navigator.clipboard.writeText(t).then(done, sel); } catch (e) { sel(); }
  }));

  /* ---------- diagnostic form ---------- */
  const form = $('#book-form');
  if (form) {
    const done = $('#book-done');
    const rules = {
      'f-name': v => v.trim() ? '' : 'Tell us your name.',
      'f-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a work email, like ada@company.com.',
      'f-company': v => v.trim() ? '' : 'Tell us where you work.',
      'f-process': v => v.trim().length >= 12 ? '' : 'Describe the process in a sentence or two.'
    };
    const check = id => {
      const f = $('#' + id), wrap = f.closest('.field'), hint = $('.hint', wrap), msg = rules[id](f.value);
      if (!hint.dataset.base) hint.dataset.base = hint.textContent;
      wrap.classList.toggle('err', !!msg); hint.textContent = msg || hint.dataset.base;
      f.setAttribute('aria-invalid', String(!!msg));
      return !msg;
    };
    Object.keys(rules).forEach(id => $('#' + id).addEventListener('blur', () => { if ($('#' + id).value) check(id); }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = Object.keys(rules).filter(id => !check(id));
      if (bad.length) { $('#' + bad[0]).focus(); return; }
      // Not wired to a backend yet. Connect form.dataset.endpoint before launch.
      const name = $('#f-name').value.trim().split(' ')[0];
      $('#done-name').textContent = name;
      form.hidden = true; done.hidden = false; done.focus();
    });
    $('#book-again')?.addEventListener('click', () => { form.reset(); done.hidden = true; form.hidden = false; $('#f-name').focus(); });
  }
})();
