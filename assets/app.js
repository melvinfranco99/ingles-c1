/* ===== C1 Advanced – configuración del nivel ===== */
const SITE = {
 "level": "C1",
 "key": "c1a",
 "name": "C1 Advanced",
 "logo": "C1 <span>Advanced</span>",
 "footer": "Preparación C1 Advanced (Cambridge)",
 "exams": 50,
 "rate": 1,
 "kwtMin": 3,
 "kwtMax": 6,
 "nav": [
  [
   "index.html",
   "Inicio"
  ],
  [
   "guia.html",
   "El examen"
  ],
  [
   "gramatica.html",
   "Gramática"
  ],
  [
   "vocabulario.html",
   "Vocabulario"
  ],
  [
   "use-of-english.html",
   "Use of English"
  ],
  [
   "reading.html",
   "Reading"
  ],
  [
   "writing.html",
   "Writing"
  ],
  [
   "listening.html",
   "Listening"
  ],
  [
   "speaking.html",
   "Speaking"
  ],
  [
   "plan.html",
   "Plan 50 días"
  ],
  [
   "examenes.html",
   "50 Exámenes"
  ]
 ],
 "scale": [
  [
   0,
   122
  ],
  [
   0.4,
   160
  ],
  [
   0.6,
   180
  ],
  [
   0.8,
   200
  ],
  [
   1,
   210
  ]
 ],
 "grades": [
  [
   200,
   "Grade A · nivel C2",
   "good"
  ],
  [
   193,
   "Grade B · C1 aprobado",
   "good"
  ],
  [
   180,
   "Grade C · C1 aprobado",
   "good"
  ],
  [
   160,
   "Nivel B2 · aún no aprobado",
   "mid"
  ],
  [
   0,
   "Por debajo de B2",
   "low"
  ]
 ]
};

/* ===== Motor común: navegación, audio (TTS), ejercicios, puntuación ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const L = 'ABCDEFGHIJ';

/* ---------- Navegación ---------- */
const LEVELS = [['A2', 'ingles-a2'], ['B1', 'ingles-b1'], ['B2', 'ingles-b2'], ['C1', 'ingles-c1'], ['C2', 'ingles-c2']];
function renderNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const bar = document.createElement('header');
  bar.className = 'topbar';
  bar.innerHTML = `<div class="in"><a class="logo" href="index.html">${SITE.logo}</a>
    <button class="btn ghost sm menu-btn" aria-label="Menú">☰ Menú</button>
    <nav class="nav">${SITE.nav.map(([h, t]) => `<a href="${h}" class="${here === h || (here === 'examen.html' && h === 'examenes.html') ? 'on' : ''}">${t}</a>`).join('')}
    <a href="#" id="themeBtn" title="Cambiar tema">◐</a></nav></div>`;
  document.body.prepend(bar);
  $('.menu-btn', bar).onclick = () => $('.nav', bar).classList.toggle('open');
  const saved = store.get('theme');
  if (saved) document.documentElement.dataset.theme = saved;
  $('#themeBtn').onclick = e => {
    e.preventDefault();
    const cur = document.documentElement.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nx = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nx; store.set('theme', nx);
  };
  const f = document.createElement('footer');
  f.innerHTML = `${SITE.footer} · Material original de práctica, no oficial · Tu progreso se guarda solo en este navegador.<br>Otros niveles: ${LEVELS.map(([n, r]) => n === SITE.level ? `<b>${n}</b>` : `<a href="https://melvinfranco99.github.io/${r}/">${n}</a>`).join(' · ')}`;
  document.body.append(f);
}

/* ---------- Almacenamiento seguro ---------- */
const store = {
  get(k, d = null) { try { const v = localStorage.getItem(SITE.key + '.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(SITE.key + '.' + k, JSON.stringify(v)); } catch { } },
};

/* ---------- Utilidades ---------- */
const norm = s => (s || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
const paras = t => t.split(/\n\s*\n/).map(p => `<p>${p.trim()}</p>`).join('');
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const ident = n => [...Array(n).keys()];

/* ---------- Audio con síntesis de voz ---------- */
const TTS = {
  voices: [], rate: null, token: 0,
  init() {
    this.rate = store.get('rate', SITE.rate || 0.95);
    if (!('speechSynthesis' in window)) return;
    const load = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang)); };
    load(); speechSynthesis.onvoiceschanged = load;
  },
  pools() {
    const male = /male(?!.*female)|daniel|george|ryan|guy|david|arthur|oliver|thomas|alex|fred|james|brian|eric|mark|rishi/i;
    const female = /female|hazel|susan|libby|sonia|zira|samantha|serena|kate|karen|moira|tessa|emma|aria|jenny|amy|fiona|victoria|martha/i;
    const sort = a => a.sort((x, y) => (/GB/i.test(y.lang) - /GB/i.test(x.lang)));
    const v = this.voices;
    return { m: sort(v.filter(x => male.test(x.name) && !/female/i.test(x.name))), f: sort(v.filter(x => female.test(x.name))), all: sort([...v]) };
  },
  voiceFor(who) {
    const p = this.pools(); const g = (who || 'N')[0]; const second = /2$/.test(who || '');
    if (g === 'M') { const v = p.m[second ? 1 : 0] || p.m[0]; return { voice: v || p.all[second ? 1 : 0] || null, pitch: v ? (second ? 0.95 : 1) : (second ? 0.85 : 0.7) }; }
    if (g === 'W') { const v = p.f[second ? 1 : 0] || p.f[0]; return { voice: v || p.all[second ? 1 : 0] || null, pitch: v ? (second ? 1.08 : 1) : (second ? 1.35 : 1.2) }; }
    return { voice: p.f[0] || p.all[0] || null, pitch: 1 };
  },
  play(lines, onDone) {
    if (!('speechSynthesis' in window)) { alertBox('Tu navegador no tiene síntesis de voz. Usa Chrome, Edge o Safari, o lee la transcripción.'); return; }
    speechSynthesis.cancel();
    const my = ++this.token;
    const queue = [];
    lines.forEach(([who, text]) => text.split(/(?<=[.!?])\s+(?=[A-Z"'‘])/).forEach(s => s.trim() && queue.push([who, s])));
    let i = 0, prev = null;
    const next = () => {
      if (my !== this.token) return;
      if (i >= queue.length) { onDone && onDone(); return; }
      const [who, text] = queue[i++];
      const u = new SpeechSynthesisUtterance(text);
      const v = this.voiceFor(who);
      if (v.voice) { u.voice = v.voice; u.lang = v.voice.lang; } else u.lang = 'en-GB';
      u.pitch = v.pitch; u.rate = this.rate;
      u.onend = () => setTimeout(next, prev !== null && prev !== who ? 250 : 120);
      u.onerror = () => setTimeout(next, 50);
      prev = who;
      speechSynthesis.speak(u);
    };
    setTimeout(next, 150);
  },
  stop() { this.token++; if ('speechSynthesis' in window) speechSynthesis.cancel(); },
};
TTS.init();
function alertBox(msg) { const d = document.createElement('div'); d.className = 'warn'; d.textContent = msg; document.querySelector('.wrap')?.prepend(d); }

/* Barra de audio: lines = [[voz, texto],...]; maxPlays: null = ilimitado */
function audioBar(lines, maxPlays = null, label = 'Escuchar') {
  const bar = document.createElement('div');
  bar.className = 'audio-bar';
  let plays = 0;
  bar.innerHTML = `<button class="btn sm play">▶ ${label}</button><button class="btn ghost sm stop">■ Parar</button>
   <span class="plays">${maxPlays ? `Escuchas: 0/${maxPlays}` : ''}</span>
   <label class="small muted">Velocidad <select class="rate"><option value="0.75">muy lenta</option><option value="0.85">lenta</option><option value="0.95">normal</option><option value="1.05">rápida</option></select></label>`;
  $('.rate', bar).value = String(TTS.rate);
  $('.rate', bar).onchange = e => { TTS.rate = +e.target.value; store.set('rate', TTS.rate); };
  $('.play', bar).onclick = () => {
    if (maxPlays && plays >= maxPlays) return;
    plays++;
    if (maxPlays) $('.plays', bar).textContent = `Escuchas: ${plays}/${maxPlays}` + (plays >= maxPlays ? ' (como en el examen: solo 2)' : '');
    if (maxPlays && plays >= maxPlays) $('.play', bar).disabled = true;
    TTS.play(lines);
  };
  $('.stop', bar).onclick = () => TTS.stop();
  bar.unlock = () => { $('.play', bar).disabled = false; maxPlays = null; $('.plays', bar).textContent = 'Corregido: puedes volver a escucharlo libremente'; };
  return bar;
}
const VNAME = { M: 'Man', W: 'Woman', M2: 'Man 2', W2: 'Woman 2', N: 'Narrator' };
function transcriptHTML(lines, names = {}) {
  return `<details class="transcript"><summary>📄 Transcripción</summary>${lines.map(([w, t]) => `<p><b>${names[w] || VNAME[w] || w}:</b> ${esc(t)}</p>`).join('')}</details>`;
}

/* ---------- Marcado de respuestas ---------- */
function markEl(el, ok, correct, onAccept, explain) {
  el.classList.add(ok ? 'is-ok' : 'is-bad');
  if (el.matches('input,select,textarea')) el.disabled = true;
  if (!ok && correct != null) {
    const s = document.createElement('span'); s.className = 'fix'; s.textContent = '→ ' + correct;
    el.after(s);
    if (onAccept) {
      const b = document.createElement('button'); b.className = 'accept'; b.textContent = 'mi respuesta también vale';
      b.title = 'Si tu respuesta es equivalente y correcta, márcala como buena';
      b.onclick = () => { onAccept(); b.remove(); el.classList.remove('is-bad'); el.classList.add('is-ok'); s.textContent = '(aceptada) ' + s.textContent; };
      s.after(b);
    }
  }
  if (explain) {
    const x = document.createElement('span'); x.className = 'explain'; x.innerHTML = '💡 ' + explain;
    (el.closest('.gap') ? el.closest('.gap') : el).after(x);
  }
}
const okAny = (val, list) => list.some(a => norm(a) === norm(val));

/* ---------- Orden de opciones ----------
   Las opciones, frases y secciones se barajan de forma fija
   (siempre igual para el mismo examen), así la respuesta correcta no está siempre en la misma letra. */
function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function order(n, key, force = false) {
  const a = ident(n); if (window.SHUFFLE === false && !force) return a;
  let h = hashStr(key);
  for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ---------- Renderizadores (cada uno devuelve {check(), score()}) ---------- */
const R = {};

/* Opción múltiple en texto con huecos. d = {text con [n], opts:[[3-4]], ans?:[idx] (por defecto 0), exp?:[]} */
R.p1 = (el, d, pts = 1) => { let k = 0; const ans = d.ans || d.opts.map(() => 0);
  const ords = d.opts.map((o, i) => order(o.length, o.join('|') + i));
  el.innerHTML = `<div class="ex-text">${d.title ? `<h3 style="margin-top:0">${d.title}</h3>` : ''}${paras(d.text.replace(/\[(\d+)\]/g, (m, n) =>
    `<span class="gap"><b>${n}</b><select data-i="${k}"><option value="">—</option>${ords[k].map((j, pos) => `<option value="${j}">${L[pos]} · ${d.opts[k][j]}</option>`).join('')}</select></span>${(k++, '')}`))}</div>`;
  let s = 0;
  return {
    check() { s = 0; $$('select[data-i]', el).forEach(x => { const i = +x.dataset.i, ok = x.value !== '' && +x.value === ans[i]; if (ok) s += pts; markEl(x, ok, `${L[ords[i].indexOf(ans[i])]} ${d.opts[i][ans[i]]}`, null, d.exp && d.exp[i]); }); },
    score: () => ({ score: s, max: ans.length * pts }),
  };
};

/* Huecos abiertos (open cloze, word formation). d = {text, ans:[[...]], stems?:[], exp?:[]} */
R.open = (el, d, pts = 1) => { let k = 0;
  el.innerHTML = `<div class="ex-text">${d.title ? `<h3 style="margin-top:0">${d.title}</h3>` : ''}${paras(d.text.replace(/\[(\d+)\]/g, (m, n) =>
    `<span class="gap"><b>${n}</b><input type="text" data-i="${k}" autocomplete="off" autocapitalize="off" spellcheck="false">${d.stems ? `<span class="stem">(${d.stems[k]})</span>` : ''}</span>${(k++, '')}`))}</div>`;
  let s = 0;
  return {
    check() { s = 0; $$('input', el).forEach(x => { const i = +x.dataset.i, ok = okAny(x.value, d.ans[i]); if (ok) s += pts; markEl(x, ok, d.ans[i].join(' / '), () => { s += pts; rescore(); }, d.exp && d.exp[i]); }); },
    score: () => ({ score: s, max: d.ans.length * pts }),
  };
};
R.p2 = R.open;
R.p3 = R.open;

/* Key word transformations. d = [{s1, key, s2 (con ___), ans:[...], exp?}] */
R.p4 = (el, d, pts = 2, start = 1, maxW = SITE.kwtMax || 5, minW = SITE.kwtMin || 2) => {
  el.innerHTML = `<div class="p4">${d.map((t, i) => `<div class="p4item"><div><b>${start + i}.</b> ${t.s1}</div>
    <div style="margin:.3rem 0"><span class="kw">${t.key}</span></div>
    <div>${t.s2.replace('___', `<input type="text" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${minW}–${maxW} palabras">`)}</div></div>`).join('')}</div>`;
  let s = 0;
  return {
    check() {
      s = 0; $$('input', el).forEach(x => {
        const i = +x.dataset.i, t = d[i], v = x.value; let ok = okAny(v, t.ans);
        const words = norm(v).split(' ').filter(Boolean).length;
        let note = t.exp || '';
        if (words > maxW) note = `⚠ Has usado más de ${maxW} palabras (las contracciones cuentan como 2). ` + note;
        if (v && !norm(v).split(' ').includes(norm(t.key))) note = '⚠ No has usado la palabra clave sin cambiarla. ' + note;
        if (ok) s += pts;
        markEl(x, ok, t.ans[0], () => { s += pts; rescore(); }, note);
      });
    },
    score: () => ({ score: s, max: d.length * pts }),
  };
};

/* Preguntas de opción múltiple genéricas. qs=[{q, o:[...], a? (por defecto 0), exp?}] */
const ansOf = q => q.a ?? 0;
function mcqHTML(qs, base, start = 1) {
  return qs.map((q, i) => `<div class="q" data-i="${i}"><div class="qt">${start + i}. ${q.q}</div>${optsHTML(q, `${base}-${i}`)}</div>`).join('');
}
function optsHTML(q, name) {
  return order(q.o.length, q.q + '|' + q.o.join('|')).map((j, pos) =>
    `<label class="opt"><input type="radio" name="${name}" value="${j}"><span><b>${L[pos]}</b> ${q.o[j]}</span></label>`).join('');
}
function mcqCheck(el, qs, pts, sel = '.q') {
  let s = 0;
  $$(sel, el).forEach(qd => {
    const i = +qd.dataset.i, q = qs[i], a = ansOf(q);
    const chk = $('input:checked', qd); const v = chk ? +chk.value : -1;
    $$('input', qd).forEach(x => x.disabled = true);
    const lab = j => $$('.opt', qd).find(l => +$('input', l).value === j);
    lab(a).classList.add('is-ok');
    if (v === a) s += pts; else if (v >= 0) lab(v).classList.add('is-bad');
    if (v < 0) { const n = document.createElement('div'); n.className = 'fix'; n.textContent = 'Sin responder → ' + $('b', lab(a)).textContent; qd.append(n); }
    if (q.exp) { const x = document.createElement('div'); x.className = 'explain'; x.innerHTML = '💡 ' + q.exp; qd.append(x); }
  });
  return s;
}
let uid = 0;

/* Textos cortos (avisos, mensajes) con una pregunta cada uno. qs = [{t, q?, o:[3], a?, exp?}] */
R.mcq = (el, qs, pts = 1, start = 1) => {
  const b = 'm' + (++uid);
  el.innerHTML = qs.map((q, i) => `<div class="q" data-i="${i}"><div class="qt">${start + i}.</div>${q.t ? `<div class="notice">${q.t.replace(/\n/g, '<br>')}</div>` : ''}${q.q ? `<div class="qt">${q.q}</div>` : ''}${optsHTML(q, `${b}-${i}`)}</div>`).join('');
  let s = 0;
  return { check() { s = mcqCheck(el, qs, pts); }, score: () => ({ score: s, max: qs.length * pts }) };
};

/* Texto largo + preguntas. d = {title, text, q:[...]} */
R.p5 = (el, d, pts = 2, start = 1) => {
  const b = 'q' + (++uid);
  el.innerHTML = `<div class="two-col"><div class="ex-text sticky" style="line-height:1.7"><h3 style="margin-top:0">${d.title || ''}</h3>${d.sub ? `<p class="muted">${d.sub}</p>` : ''}${paras(d.text)}</div><div>${mcqHTML(d.q, b, start)}</div></div>`;
  let s = 0;
  return { check() { s = mcqCheck(el, d.q, pts); }, score: () => ({ score: s, max: d.q.length * pts }) };
};

/* Gapped text. d = {title, text con [n], sents:[...], ans?:[idx de sents] (por defecto 0,1,2…), exp?}
   Las frases se muestran barajadas en los exámenes. */
R.p6 = (el, d, pts = 2) => { let k = 0;
  const nG = (d.text.match(/\[\d+\]/g) || []).length; const ans = d.ans || ident(nG);
  const ord = order(d.sents.length, d.sents.join('|')); // ord[pos] = índice original
  const letter = j => L[ord.indexOf(j)];
  el.innerHTML = `<div class="two-col"><div class="ex-text" style="line-height:1.7"><h3 style="margin-top:0">${d.title || ''}</h3>${d.sub ? `<p class="muted">${d.sub}</p>` : ''}${paras(d.text.replace(/\[(\d+)\]/g, (m, n) =>
    `<span class="gapline gap"><b>${n}</b><select data-i="${k++}"><option value="">—</option>${ord.map((j, pos) => `<option value="${j}">${L[pos]}</option>`).join('')}</select></span>`))}</div>
    <div class="card sticky"><b>${d.paras ? 'Párrafos eliminados' : 'Frases eliminadas'}</b> <span class="small muted">(${d.sents.length - ans.length === 1 ? 'sobra una' : `sobran ${d.sents.length - ans.length}`})</span><ol type="A" class="sents">${ord.map(j => `<li>${d.sents[j]}</li>`).join('')}</ol></div></div>`;
  let s = 0;
  return {
    check() { s = 0; $$('select[data-i]', el).forEach(x => { const i = +x.dataset.i, ok = x.value !== '' && +x.value === ans[i]; if (ok) s += pts; markEl(x, ok, letter(ans[i]), null, d.exp && d.exp[i]); }); },
    score: () => ({ score: s, max: ans.length * pts }),
  };
};

/* Multiple matching. d = {title, intro, sections:[{h,t}], q:[...], ans?:[idx] (por defecto 0,1,2…), mix?:bool}
   En los exámenes las preguntas se barajan; con mix también las secciones. */
R.p7 = (el, d, pts = 1, start = 1) => {
  const ans = d.ans || ident(d.q.length);
  const sOrd = d.mix ? order(d.sections.length, d.sections.map(s => s.h).join('|')) : ident(d.sections.length);
  const qOrd = order(d.q.length, d.q.join('|'));
  const letter = j => L[sOrd.indexOf(j)];
  el.innerHTML = `<div class="two-col"><div class="ex-text sticky" style="line-height:1.7"><h3 style="margin-top:0">${d.title || ''}</h3>${d.intro ? `<p class="muted">${d.intro}</p>` : ''}
    ${sOrd.map((j, pos) => `<p><span class="sec-h">${L[pos]}</span> <b>${d.sections[j].h}</b></p>${paras(d.sections[j].t)}`).join('')}</div>
    <div>${qOrd.map((i, pos) => `<div class="q"><div class="qt">${start + pos}. ${d.q[i]}</div><span class="gap"><select data-i="${i}"><option value="">—</option>${sOrd.map((j, p) => `<option value="${j}">${L[p]} · ${d.sections[j].h.replace(/<[^>]+>/g, '').slice(0, 40)}</option>`).join('')}</select></span></div>`).join('')}</div></div>`;
  let s = 0;
  return {
    check() { s = 0; $$('select[data-i]', el).forEach(x => { const i = +x.dataset.i, ok = x.value !== '' && +x.value === ans[i]; if (ok) s += pts; markEl(x, ok, `${letter(ans[i])} (${d.sections[ans[i]].h})`, null, d.exp && d.exp[i]); }); },
    score: () => ({ score: s, max: ans.length * pts }),
  };
};

/* Listening: fragmentos cortos con 1 pregunta. d = [{ctx?, q, o:[3], a?, script:[[voz,txt]]}] */
R.l1 = (el, d, maxPlays = 2, start = 1) => {
  const b = 'l' + (++uid); const bars = [];
  el.innerHTML = d.map((x, i) => `<div class="q" data-i="${i}"><div class="qt">${start + i}. ${x.ctx ? `<span class="muted">${x.ctx}</span><br>` : ''}${x.q}</div><div class="slot"></div>${optsHTML(x, `${b}-${i}`)}<div class="tr"></div></div>`).join('');
  $$('.q', el).forEach((qd, i) => { const ab = audioBar([...(d[i].ctx ? [['N', d[i].ctx]] : []), ...d[i].script], maxPlays); bars.push(ab); $('.slot', qd).append(ab); });
  let s = 0;
  return {
    check() { s = mcqCheck(el, d, 1); $$('.q', el).forEach((qd, i) => { bars[i].unlock(); $('.tr', qd).innerHTML = transcriptHTML(d[i].script, d[i].names || {}); }); },
    score: () => ({ score: s, max: d.length }),
  };
};

/* Listening: fragmentos con varias preguntas. d = [{ctx, script, names?, q:[{q,o,a?}]}] */
R.lx = (el, d, maxPlays = 2, start = 1) => {
  const b = 'lx' + (++uid); const bars = []; let n = start;
  el.innerHTML = d.map((x, i) => `<div class="card extract" data-e="${i}"><p class="instr"><b>Extract ${i + 1}.</b> ${x.ctx}</p><div class="slot"></div>${x.q.map((q, j) => `<div class="q" data-i="${j}"><div class="qt">${n++}. ${q.q}</div>${optsHTML(q, `${b}-${i}-${j}`)}</div>`).join('')}<div class="tr"></div></div>`).join('');
  $$('.extract', el).forEach((ex, i) => { const ab = audioBar([['N', d[i].ctx], ...d[i].script], maxPlays); bars.push(ab); $('.slot', ex).append(ab); });
  let s = 0;
  const max = d.reduce((a, x) => a + x.q.length, 0);
  return {
    check() { s = 0; $$('.extract', el).forEach((ex, i) => { s += mcqCheck(ex, d[i].q, 1); bars[i].unlock(); $('.tr', ex).innerHTML = transcriptHTML(d[i].script, d[i].names || {}); }); },
    score: () => ({ score: s, max }),
  };
};

/* Listening: completar frases/notas. d = {intro, g:'M'|'W', script (texto o [[voz,txt]]), sents:["... ___ ..."], ans:[[...]], names?} */
R.l2 = (el, d, maxPlays = 2, start = 1) => {
  const sc = Array.isArray(d.script) ? d.script : [[d.g || 'W', d.script]];
  const lines = [['N', d.intro], ...sc];
  el.innerHTML = `<p class="instr">${d.intro}</p><div class="slot"></div>${d.head ? `<div class="notice"><b>${d.head}</b></div>` : ''}<div class="l2">${d.sents.map((t, i) =>
    `<div class="q"><b>${start + i}.</b> ${t.replace('___', `<span class="gap"><input type="text" data-i="${i}" autocomplete="off" spellcheck="false"></span>`)}</div>`).join('')}</div><div class="tr"></div>`;
  const ab = audioBar(lines, maxPlays); $('.slot', el).append(ab);
  let s = 0;
  return {
    check() { s = 0; $$('input', el).forEach(x => { const i = +x.dataset.i, ok = okAny(x.value, d.ans[i]); if (ok) s++; markEl(x, ok, d.ans[i].join(' / '), () => { s++; rescore(); }); }); ab.unlock(); $('.tr', el).innerHTML = transcriptHTML(sc, d.names || { M: 'Speaker', W: 'Speaker' }); },
    score: () => ({ score: s, max: d.ans.length }),
  };
};

/* Listening: 5 hablantes, una tarea de emparejar. d = {intro, opts:[8], speakers:[{g, t}], ans?:[idx]} */
R.l3 = (el, d, maxPlays = 2, start = 1) => {
  const ans = d.ans || ident(d.speakers.length);
  const lines = [['N', d.intro]];
  d.speakers.forEach((sp, i) => { lines.push(['N', 'Speaker ' + (i + 1) + '.']); lines.push([sp.g, sp.t]); });
  const ord = order(d.opts.length, d.opts.join('|')); const letter = j => L[ord.indexOf(j)];
  el.innerHTML = `<p class="instr">${d.intro}</p><div class="slot"></div>
   <div class="card"><ol type="A" class="sents">${ord.map(j => `<li>${d.opts[j]}</li>`).join('')}</ol></div>
   ${d.speakers.map((sp, i) => `<div class="q"><b>${start + i}. Speaker ${i + 1}</b> <span class="gap"><select data-i="${i}"><option value="">—</option>${ord.map((j, p) => `<option value="${j}">${L[p]}</option>`).join('')}</select></span></div>`).join('')}<div class="tr"></div>`;
  const ab = audioBar(lines, maxPlays); $('.slot', el).append(ab);
  let s = 0;
  return {
    check() {
      s = 0; $$('select[data-i]', el).forEach(x => { const i = +x.dataset.i, ok = x.value !== '' && +x.value === ans[i]; if (ok) s++; markEl(x, ok, `${letter(ans[i])} ${d.opts[ans[i]]}`, null, d.exp && d.exp[i]); });
      ab.unlock(); $('.tr', el).innerHTML = transcriptHTML(d.speakers.map((sp, i) => ['Speaker ' + (i + 1), sp.t]));
    },
    score: () => ({ score: s, max: ans.length }),
  };
};

/* Listening: 5 hablantes, DOS tareas (C1/C2 Part 4). d = {intro, speakers:[{g,t}], tasks:[{instr, opts:[8], ans?:[5]}]} */
R.l3x = (el, d, maxPlays = 2, start = 1) => {
  const lines = [['N', d.intro]];
  d.speakers.forEach((sp, i) => { lines.push(['N', 'Speaker ' + (i + 1) + '.']); lines.push([sp.g, sp.t]); });
  const tk = d.tasks.map((t, ti) => { const ord = order(t.opts.length, t.opts.join('|')); return { ...t, ans: t.ans || ident(d.speakers.length), ord, letter: j => L[ord.indexOf(j)] }; });
  const n = d.speakers.length;
  el.innerHTML = `<p class="instr">${d.intro}</p><div class="slot"></div><div class="two-col">${tk.map((t, ti) => `<div><p class="instr"><b>Task ${ti + 1}.</b> ${t.instr}</p>
   <div class="card"><ol type="A" class="sents">${t.ord.map(j => `<li>${t.opts[j]}</li>`).join('')}</ol></div>
   ${d.speakers.map((sp, i) => `<div class="q"><b>${start + ti * n + i}. Speaker ${i + 1}</b> <span class="gap"><select data-t="${ti}" data-i="${i}"><option value="">—</option>${t.ord.map((j, p) => `<option value="${j}">${L[p]}</option>`).join('')}</select></span></div>`).join('')}</div>`).join('')}</div><div class="tr"></div>`;
  const ab = audioBar(lines, maxPlays); $('.slot', el).append(ab);
  let s = 0;
  return {
    check() {
      s = 0; $$('select[data-i]', el).forEach(x => { const t = tk[+x.dataset.t], i = +x.dataset.i, ok = x.value !== '' && +x.value === t.ans[i]; if (ok) s++; markEl(x, ok, `${t.letter(t.ans[i])} ${t.opts[t.ans[i]]}`); });
      ab.unlock(); $('.tr', el).innerHTML = transcriptHTML(d.speakers.map((sp, i) => ['Speaker ' + (i + 1), sp.t]));
    },
    score: () => ({ score: s, max: n * tk.length }),
  };
};

/* Listening: una conversación, emparejar personas/días con opciones (A2 Part 5). d = {intro, script, names?, items:[5], opts:[8], ans?:[5]} */
R.lmatch = (el, d, maxPlays = 2, start = 1) => {
  const ans = d.ans || ident(d.items.length);
  const ord = order(d.opts.length, d.opts.join('|')); const letter = j => L[ord.indexOf(j)];
  el.innerHTML = `<p class="instr">${d.intro}</p><div class="slot"></div><div class="two-col"><div>${d.items.map((it, i) => `<div class="q"><b>${start + i}. ${it}</b> <span class="gap"><select data-i="${i}"><option value="">—</option>${ord.map((j, p) => `<option value="${j}">${L[p]}</option>`).join('')}</select></span></div>`).join('')}</div>
   <div class="card"><ol type="A" class="sents">${ord.map(j => `<li>${d.opts[j]}</li>`).join('')}</ol></div></div><div class="tr"></div>`;
  const ab = audioBar([['N', d.intro], ...d.script], maxPlays); $('.slot', el).append(ab);
  let s = 0;
  return {
    check() { s = 0; $$('select[data-i]', el).forEach(x => { const i = +x.dataset.i, ok = x.value !== '' && +x.value === ans[i]; if (ok) s++; markEl(x, ok, `${letter(ans[i])} ${d.opts[ans[i]]}`); }); ab.unlock(); $('.tr', el).innerHTML = transcriptHTML(d.script, d.names || {}); },
    score: () => ({ score: s, max: ans.length }),
  };
};

/* Listening: conversación/entrevista larga con preguntas. d = {intro, names:{M:'Interviewer',...}, script:[[voz,txt]], q:[...]} */
R.l4 = (el, d, maxPlays = 2, start = 1) => {
  const b = 'l4' + (++uid);
  el.innerHTML = `<p class="instr">${d.intro}</p><div class="slot"></div>${mcqHTML(d.q, b, start)}<div class="tr"></div>`;
  const ab = audioBar([['N', d.intro], ...d.script], maxPlays); $('.slot', el).append(ab);
  let s = 0;
  return { check() { s = mcqCheck(el, d.q, 1); ab.unlock(); $('.tr', el).innerHTML = transcriptHTML(d.script, d.names || {}); }, score: () => ({ score: s, max: d.q.length }) };
};

/* ---------- Writing: área de texto con contador ---------- */
function writingBox(key, min = 140, max = 190) {
  const w = document.createElement('div');
  const saved = store.get('w.' + key, '');
  const rng = max ? `${min}–${max} palabras` : `${min} palabras o más`;
  w.innerHTML = `<textarea placeholder="Escribe aquí tu respuesta (${rng})…"></textarea><div class="wc"></div>`;
  const ta = $('textarea', w), wc = $('.wc', w);
  ta.value = saved;
  const upd = () => { const n = (ta.value.match(/\b[\w'’-]+\b/g) || []).length; wc.textContent = `${n} palabras` + (n < min ? ` · faltan ${min - n} para el mínimo` : max && n > max ? ` · te pasas ${n - max}: recorta` : ' · ✓ longitud correcta'); store.set('w.' + key, ta.value); };
  ta.oninput = upd; upd();
  return w;
}

/* ---------- Grabadora (Speaking) ---------- */
function recorder() {
  const d = document.createElement('div'); d.className = 'rec';
  d.innerHTML = `<button class="btn sm ghost">🎙 Grabarme</button><span class="small muted"></span><audio controls style="display:none;max-width:100%"></audio>`;
  const btn = $('button', d), info = $('span', d), au = $('audio', d);
  let mr = null, chunks = [];
  btn.onclick = async () => {
    if (mr && mr.state === 'recording') { mr.stop(); return; }
    try {
      const st = await navigator.mediaDevices.getUserMedia({ audio: true });
      mr = new MediaRecorder(st); chunks = [];
      mr.ondataavailable = e => chunks.push(e.data);
      mr.onstop = () => { st.getTracks().forEach(t => t.stop()); au.src = URL.createObjectURL(new Blob(chunks)); au.style.display = ''; btn.textContent = '🎙 Grabar de nuevo'; info.textContent = 'Escúchate: ¿fluidez, pausas, errores?'; };
      mr.start(); btn.textContent = '⏹ Parar grabación'; info.textContent = 'Grabando…';
    } catch { info.textContent = 'No hay acceso al micrófono (da permiso en el navegador).'; }
  };
  return d;
}

/* ---------- Temporizador ---------- */
function timer(seconds, label = '') {
  const d = document.createElement('span'); d.className = 'row';
  d.innerHTML = `<button class="btn sm ghost">⏱ ${label || fmt(seconds)}</button><span class="timer">${fmt(seconds)}</span>`;
  let left = seconds, iv = null;
  const t = $('.timer', d);
  $('button', d).onclick = () => {
    if (iv) { clearInterval(iv); iv = null; return; }
    left = seconds; t.classList.remove('late');
    iv = setInterval(() => { left--; t.textContent = fmt(Math.abs(left)); if (left <= 0) { t.classList.add('late'); t.textContent = '-' + fmt(-left); } }, 1000);
  };
  return d;
}
function fmt(s) { s = Math.max(0, s); const m = Math.floor(s / 60), x = s % 60; return (m >= 60 ? Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0'); }

/* ---------- Escala Cambridge (aproximada) ---------- */
function toScale(pct) {
  const pts = SITE.scale;
  for (let i = 1; i < pts.length; i++) if (pct <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return Math.round(y0 + (y1 - y0) * (pct - x0) / (x1 - x0)); }
  return pts[pts.length - 1][1];
}
function grade(sc) {
  for (const [min, label, cls] of SITE.grades) if (sc >= min) return [label, cls];
  const g = SITE.grades[SITE.grades.length - 1]; return [g[1], g[2]];
}

/* Recalcular puntuaciones visibles (cuando aceptas respuestas) */
const scoreHooks = [];
function rescore() { scoreHooks.forEach(f => f()); }

/* Montar un ejercicio de práctica con botón de corregir */
function practice(container, type, data, opts = {}) {
  const box = document.createElement('div');
  const body = document.createElement('div');
  const foot = document.createElement('div');
  foot.className = 'row'; foot.style.marginTop = '.6rem';
  foot.innerHTML = `<button class="btn">Corregir</button><button class="btn ghost">Reiniciar</button><span class="sc"></span>`;
  box.append(body, foot); container.append(box);
  let r = R[type](body, data, ...(opts.args || []));
  const show = () => { const { score, max } = r.score(); $('.sc', foot).innerHTML = `<b>${score}/${max}</b>`; };
  const [c, x] = $$('button', foot);
  c.onclick = () => { r.check(); c.disabled = true; show(); };
  x.onclick = () => { TTS.stop(); r = R[type](body, data, ...(opts.args || [])); c.disabled = false; $('.sc', foot).textContent = ''; };
  scoreHooks.push(() => c.disabled && show());
}

/* ---------- Pestañas ---------- */
function tabs(root) {
  const btns = $$('.tabs button', root), panels = $$('.tabpanel', root);
  btns.forEach((b, i) => b.onclick = () => { btns.forEach(x => x.classList.remove('on')); panels.forEach(x => x.classList.remove('on')); b.classList.add('on'); panels[i].classList.add('on'); TTS.stop(); if (root.id) store.set('tab.' + root.id, i); });
  const s = root.id ? store.get('tab.' + root.id, 0) : 0;
  (btns[s] || btns[0])?.click();
}

/* ---------- Flashcards ---------- */
function flashcards(el, cards) {
  let i = 0, order = cards.map((c, j) => j);
  el.innerHTML = `<div class="card flash"><div class="front"></div><div class="back"></div></div>
   <div class="row"><button class="btn ghost sm prev">◀</button><span class="small muted pos"></span><button class="btn ghost sm next">▶</button><button class="btn ghost sm shuf">🔀 Mezclar</button><button class="btn ghost sm say">🔊</button></div>`;
  const show = (flip = false) => { const c = cards[order[i]]; $('.front', el).innerHTML = c[0]; $('.back', el).innerHTML = flip ? c[1] : '<span class="small">(toca para ver)</span>'; $('.pos', el).textContent = `${i + 1}/${cards.length}`; };
  let flipped = false;
  $('.flash', el).onclick = () => { flipped = !flipped; show(flipped); };
  $('.next', el).onclick = () => { i = (i + 1) % cards.length; flipped = false; show(); };
  $('.prev', el).onclick = () => { i = (i - 1 + cards.length) % cards.length; flipped = false; show(); };
  $('.shuf', el).onclick = () => { order.sort(() => Math.random() - .5); i = 0; flipped = false; show(); };
  $('.say', el).onclick = () => TTS.play([['W', cards[order[i]][0].replace(/<[^>]+>/g, '')]]);
  show();
}

/* Tabla de vocabulario: rows = [[en, es, ejemplo?]] */
function vocabTable(el, rows, heads = ['Inglés', 'Español', 'Ejemplo']) {
  el.innerHTML = `<div class="table-wrap"><table><tr>${heads.slice(0, rows[0].length).map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<b>${c}</b>` : c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

/* Botón 🔊 para leer en voz alta cualquier elemento con data-say */
function speakables(root = document) {
  $$('[data-say]', root).forEach(e => { if (e.dataset.sayDone) return; e.dataset.sayDone = 1; const txt = e.dataset.say || e.textContent; const b = document.createElement('button'); b.className = 'accept'; b.textContent = '🔊'; b.title = 'Escuchar'; b.onclick = () => TTS.play([['W', txt]]); e.append(b); });
}

document.addEventListener('DOMContentLoaded', () => { renderNav(); speakables(); $$('.tabs-root').forEach(tabs); });
