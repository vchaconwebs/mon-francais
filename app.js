/* Mon Français — motor de la web */
(function(){
if(window.MF_BLOCK) return;
const C = window.COURSE;
const $ = s => document.querySelector(s);
const main = $('#main');
const LEVELS = ['A1','A2','B1','B2'];

/* ---------- estado ---------- */
let S = {xp:0, done:{}, notes:{}, exam:{}, level:'A1'};
const KEY = window.MF_KEY || 'monfr';
try{ Object.assign(S, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){}
/* fechas locales (no UTC) */
const dkey=d=>{ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const wkey=()=>{ const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); return dkey(d); }; /* lunes de la semana */
S.days=S.days||[]; S.bonus=S.bonus||{}; S.friends=S.friends||[]; S.done=S.done||{}; S.notes=S.notes||{}; S.exam=S.exam||{};
for(const k in S.done) if(k.startsWith('exam')) delete S.done[k]; /* el examen ya no cuenta como ejercicio */
/* ---------- nube: no se sube nada hasta haber fusionado con lo que hay guardado ---------- */
let synced=!(window.mfPull&&window.MF_CLOUD_ON), pushT;
function profile(){ const us=units('A1'); return {name:window.MF_USER||'', xp:S.xp||0, streak:streak(), done:Object.keys(S.done||{}).filter(k=>S.done[k]).length, week:wkey(), week_xp:(S.wk&&S.wk.id===wkey())?S.wk.xp:0}; }
function pushNow(){ clearTimeout(pushT); if(synced&&window.mfPush) return window.mfPush(S,profile()); }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} drawXP(); clearTimeout(pushT); pushT=setTimeout(()=>{ if(synced) pushNow(); else sync(); },1500); }
function merge(R){ if(!R||typeof R!=='object') return false; const before=JSON.stringify(S);
  S.done=Object.assign({},R.done||{},S.done||{}); for(const k in S.done) if(!S.done[k]||k.startsWith('exam')) delete S.done[k];
  S.xp=Math.max(S.xp||0,R.xp||0); S.days=[...new Set([...(R.days||[]),...(S.days||[])])].sort().slice(-400);
  S.exam=S.exam||{}; for(const k in (R.exam||{})) S.exam[k]=Math.max(S.exam[k]||0,R.exam[k]||0);
  S.notes=S.notes||{}; for(const k in (R.notes||{})) if(S.notes[k]===undefined||S.notes[k]==='') S.notes[k]=R.notes[k];
  S.bonus=Object.assign({},R.bonus||{},S.bonus||{}); S.friends=[...new Set([...(R.friends||[]),...(S.friends||[])])];
  if(R.wk&&(!S.wk||S.wk.id<R.wk.id||(S.wk.id===R.wk.id&&S.wk.xp<R.wk.xp))) S.wk=R.wk;
  if(R.px&&(!S.px||S.px.d<R.px.d||(S.px.d===R.px.d&&S.px.n<R.px.n))) S.px=R.px;
  if(!S.theme&&R.theme) S.theme=R.theme; if(R.level&&!S.level) S.level=R.level;
  return JSON.stringify(S)!==before; }
let syncing=false;
async function sync(){ if(synced||syncing||!window.mfPull) return; syncing=true;
  try{ const R=await window.mfPull(); const changed=merge(R); synced=true; try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} drawXP(); pushNow(); if(changed&&!document.querySelector('.ex input:focus, textarea:focus')) route(); }
  catch(e){ console.warn('sync',e); } syncing=false; }
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden'&&pushT){ pushNow(); } });
window.mfCloudFail=function(){ if(window._cf) return; window._cf=1; toast('⚠️ No se pudo guardar en la nube. Pulsa «Salir» y vuelve a entrar.'); };

/* ---------- puntos (⭐) ----------
   +10 por ejercicio nuevo acertado · +10 primer acierto del día · +50 al completar una unidad
   práctica (test, dictado, parejas, verbos): máximo 60 ⭐ al día · examen: tu mejor nota (0-100) */
const RANKS=[[0,'Touriste','🧳'],[200,'Apprenti','📗'],[600,'Voyageur','🚲'],[1200,'Habitué','☕'],[2000,'Parisien','🗼'],[3200,'Maître','👑']];
function rank(xp){ let r=RANKS[0]; for(const x of RANKS) if(xp>=x[0]) r=x; return r; }
function addXP(n,practice){ n=Math.round(n); if(!n) return 0;
  if(practice){ const d=dkey(); if(!S.px||S.px.d!==d) S.px={d,n:0}; n=Math.min(n,60-S.px.n); if(n<=0){ if(!window._capT){ window._capT=1; toast('Límite diario de práctica alcanzado (60 ⭐). ¡Sigue practicando igual!'); } return 0; } S.px.n+=n; }
  const before=rank(S.xp||0)[1];
  S.xp=Math.max(0,(S.xp||0)+n); const w=wkey(); if(!S.wk||S.wk.id!==w) S.wk={id:w,xp:0}; S.wk.xp=Math.max(0,S.wk.xp+n);
  const after=rank(S.xp); if(n>0&&after[1]!==before){ setTimeout(()=>{ confetti(90); toast(after[2]+' ¡Nuevo rango: '+after[1]+'!'); },700); }
  return n; }
function touchDay(){ const k=dkey(); if(!S.days.includes(k)){ S.days.push(k); S.days=S.days.slice(-400); return true; } return false; }
function drawXP(){ const r=rank(S.xp||0); $('#xpBox').innerHTML = '⭐ ' + (S.xp||0) + ' <small>'+r[2]+'</small>'; $('#xpBox').title='Rango: '+r[1]; }
function mark(key){ if(S.done[key]) return; S.done[key]=1; let msg='+10 ⭐', n=10;
  if(S.lastXpDay!==dkey()){ S.lastXpDay=dkey(); n+=10; msg='+20 ⭐ (bonus diario 🔥)'; }
  touchDay(); addXP(n);
  const u=units(S.level).find(x=>key.startsWith(x.id+':'));
  if(u&&pct(u)===100&&!S.bonus[u.id]){ S.bonus[u.id]=1; addXP(50); confetti(120); setTimeout(()=>toast('🎉 ¡Unidad '+u.n+' completada! +50 ⭐'),500); }
  save(); toast(msg); drawSide(); drawTop(); if(u) refreshUnit(u); }
function refreshUnit(u){ const r=document.querySelector('.ub-ring'), t=document.querySelector('.toc-prog'); if(r) r.innerHTML=ring(pct(u),110,'#fff');
  if(t) t.innerHTML=ring(pct(u),64,u.color)+'<div><b>Tu progreso</b><small class="muted">'+exKeys(u).filter(k=>S.done[k]).length+'/'+(u.ex||[]).length+' ejercicios</small></div>'; }

/* ---------- voz ---------- */
let frVoice=null;
function pickVoice(){ const v=speechSynthesis.getVoices().filter(x=>/^fr/i.test(x.lang)); const sc=x=>(/fr[-_]FR/i.test(x.lang)?10:0)+(/natural|neural|online/i.test(x.name)?20:0)+(/google/i.test(x.name)?8:0)+(/denise|henri|eloise|vivienne|remy|amelie|thomas/i.test(x.name)?3:0); frVoice=v.sort((a,b)=>sc(b)-sc(a))[0]||null; }
if('speechSynthesis' in window){ pickVoice(); speechSynthesis.onvoiceschanged=pickVoice; }
window.say = function(t, rate){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t.replace(/\(.*?\)/g,'')); u.lang='fr-FR'; u.rate=rate||0.9; if(frVoice) u.voice=frVoice;
  speechSynthesis.speak(u);
};
document.addEventListener('click', e=>{
  const el=e.target.closest('[data-say]'); if(el){ say(el.dataset.say, el.dataset.rate?+el.dataset.rate:undefined); }
});

/* ---------- utilidades ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];} return a; };
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’']/g,"'").replace(/[.!?¿¡,;:]/g,'').replace(/\s+/g,' ').trim();
const normA = s => String(s).toLowerCase().replace(/[’']/g,"'").replace(/[.!?¿¡,;:]/g,'').replace(/\s+/g,' ').trim();
function parseVocab(str){ return str.split(';').map(x=>x.trim()).filter(Boolean).map(x=>{const [fr,es]=x.split('|');return {fr:fr.trim(),es:(es||'').trim()};}); }
function vocabOf(u){ const out=[]; for(const cat in (u.vocab||{})) parseVocab(u.vocab[cat]).forEach(w=>out.push(Object.assign({cat},w))); return out; }
function units(lv){ return (C[lv]&&C[lv].units)||[]; }
function exKeys(u){ return (u.ex||[]).map((_,i)=>u.id+':'+i); }
function pct(u){ const k=exKeys(u); if(!k.length) return 0; return Math.round(100*k.filter(x=>S.done[x]).length/k.length); }
const sp = t => `<button class="say" data-say="${esc(t)}" title="Escuchar">🔊</button>`;

/* ---------- menú lateral ---------- */
function drawLevels(){
  $('#levelPick').innerHTML = LEVELS.map(l=>`<button class="${l===S.level?'on':''} ${C[l]?'':'lock'}" data-l="${l}">${l}</button>`).join('');
  $('#levelPick').onclick = e=>{ const b=e.target.closest('button'); if(!b) return; S.level=b.dataset.l; save(); drawLevels(); location.hash = C[S.level]?'#/':'#/next'; route(); };
}
function drawSide(){
  const h=location.hash||'#/';
  const L=S.level, us=units(L);
  let s=`<div class="grp">General</div>
  <a href="#/" class="${h==='#/'?'on':''}">🏠 Inicio</a>
  <a href="#/guia" class="${h==='#/guia'?'on':''}">🧭 Cómo estudiar</a>
  <a href="#/ranking" class="${h==='#/ranking'?'on':''}">🏆 Ranking y amigos</a>`;
  if(us.length){
    s+=`<div class="grp">Unidades ${L}</div>`;
    s+=us.map(u=>`<a href="#/u/${u.id}" class="${h.startsWith('#/u/'+u.id)?'on':''}"><span class="num">${ICON[u.id]||u.n}</span>${esc(u.title)}<span class="pc">${pct(u)}%</span></a>`).join('');
  }
  s+=`<div class="grp">Herramientas</div>
  <a href="#/gramatica" class="${h==='#/gramatica'?'on':''}">📘 Gramática completa</a>
  <a href="#/verbos" class="${h==='#/verbos'?'on':''}">🔁 Conjugaciones</a>
  <a href="#/dico" class="${h==='#/dico'?'on':''}">📖 Diccionario</a>
  <a href="#/repaso" class="${h==='#/repaso'?'on':''}">🎯 Repaso aleatorio</a>
  <a href="#/fonetica" class="${h==='#/fonetica'?'on':''}">👄 Pronunciación</a>
  <div class="grp">Examen</div>
  <a href="#/delf" class="${h==='#/delf'?'on':''}">🎓 DELF ${L}: cómo es</a>
  <a href="#/simulacro" class="${h==='#/simulacro'?'on':''}">📝 Simulacro de examen</a>
  <a href="#/next" class="${h==='#/next'?'on':''}">🚀 Siguiente nivel</a>`;
  $('#side').innerHTML=s;
}
function sideOpen(o){ $('#side').classList.toggle('open',o); $('#scrim').classList.toggle('on',o); }
$('#menuBtn').onclick=()=>sideOpen(!$('#side').classList.contains('open'));
$('#scrim').onclick=()=>sideOpen(false);
$('#side').addEventListener('click',e=>{ if(e.target.closest('a')) sideOpen(false); });
function drawTop(){
  const h=(location.hash||'#/').slice(2).split('/')[0];
  document.querySelectorAll('#topnav a').forEach(a=>a.classList.toggle('on',a.dataset.r===h));
  $('#topnav .dd-btn').classList.toggle('on',h==='u');
  $('#ddUnits').innerHTML=units(S.level).map(u=>`<a href="#/u/${u.id}" style="--uc:${u.color}"><span class="dd-ico">${ICON[u.id]||'📘'}</span><span><small>Unidad ${u.n} · ${pct(u)}%</small><b>${esc(u.title)}</b></span></a>`).join('');
}
document.addEventListener('click',e=>{ const dd=e.target.closest('.dd'); document.querySelectorAll('.dd').forEach(d=>d.classList.toggle('open', d===dd && !d.classList.contains('open') && !!e.target.closest('.dd-btn'))); });
window.addEventListener('scroll',()=>document.querySelector('.top').classList.toggle('scrolled',scrollY>10),{passive:true});

/* ---------- ejercicios ---------- */
function exHTML(e,i,key){
  const id='ex_'+key.replace(/\W/g,'_');
  const done=S.done[key]?' <span class="pill g">✓</span>':'';
  let q=`<div class="ex${S.done[key]?' solved':''}" id="${id}" data-key="${key}">`;
  q+=`<div class="q"><span class="muted">${i+1}.</span> ${e.q}${done}</div>`;
  if(e.t==='qcm'){
    q+=`<div class="opts">`+shuffle([e.a].concat(e.w)).map(o=>`<button data-o="${esc(o)}">${esc(o)}</button>`).join('')+`</div>`;
  } else {
    q+=`<div class="row"><input autocomplete="off" spellcheck="false" placeholder="${e.t==='trans'?'Escribe en francés…':'Respuesta…'}"><button class="btn alt" data-chk>Comprobar</button><button class="btn alt" data-sol>Ver solución</button></div>`;
  }
  q+=`<div class="fb"></div></div>`;
  return q;
}
/* qué decir en voz alta al acertar: la frase francesa completa si se puede, nunca texto en español */
function spoken(e){ const a=String(e.a).split('/')[0].trim(); if(e.full) return e.full; if(e.t==='trans') return a;
  const q=String(e.q).replace(/<[^>]+>/g,''); const blanks=(q.match(/___/g)||[]).length;
  if(blanks===1&&!/=\s*___/.test(q)){ let s=q.split(/[:→]/).pop(); if(s.includes('___')){ s=s.replace(/\s*\([^)]*\)/g,'').replace('___',a).replace(/’ /g,'’').replace(/' /g,"'").trim(); if(!ESX.test(s)) return s; } }
  if(/^[\d\s.,€%]+$/.test(a)) return ''; if(e.t==='qcm'&&!(blanks||isFr(a))) return ''; if(ESX.test(a)) return ''; return a.replace(/…/g,' '); }
function bindEx(root, list, keys){
  root.querySelectorAll('.ex').forEach(box=>{
    const key=box.dataset.key, e=list[keys.indexOf(key)]; if(!e) return;
    const fb=box.querySelector('.fb');
    const good=()=>{ mark(key); box.classList.add('solved'); fb.className='fb ok'; fb.innerHTML='✔ ¡Correcto! '+(e.x?'— '+e.x:''); const t=spoken(e); if(t) say(t); };
    if(e.t==='qcm'){
      box.querySelector('.opts').onclick=ev=>{
        const b=ev.target.closest('button'); if(!b) return;
        if(b.dataset.o===e.a){ b.classList.add('ok'); good(); }
        else { b.classList.add('ko'); fb.className='fb ko'; fb.innerHTML='✘ No es esa. Inténtalo otra vez.'; }
      };
    } else {
      const inp=box.querySelector('input');
      const check=()=>{
        const v=inp.value; if(!v.trim()) return;
        const alts=String(e.a).split('/');
        if(alts.some(a=>normA(a)===normA(v))){ inp.className='ok'; good(); }
        else if(alts.some(a=>norm(a)===norm(v))){ inp.className='ok'; mark(key); box.classList.add('solved'); fb.className='fb ok'; fb.innerHTML='✔ Casi perfecto: revisa los acentos → <b>'+esc(alts[0])+'</b>'; }
        else { inp.className='ko'; fb.className='fb ko'; fb.innerHTML='✘ Todavía no. Pista: empieza por «'+esc(alts[0].slice(0,2))+'…»'; }
      };
      box.querySelector('[data-chk]').onclick=check;
      inp.onkeydown=ev=>{ if(ev.key==='Enter') check(); };
      box.querySelector('[data-sol]').onclick=()=>{ fb.className='fb'; fb.innerHTML='Solución: <b>'+esc(String(e.a).split('/').join(' / '))+'</b>'+(e.x?' — '+e.x:'')+' '+sp(String(e.a).split('/')[0]); };
    }
  });
}

/* ---------- juegos de vocabulario ---------- */
function flashcards(el, words){
  let i=0, ws=shuffle(words), dirFr=true;
  function draw(){
    const w=ws[i];
    el.innerHTML=`<div class="row" style="justify-content:center"><button class="btn alt" data-dir>${dirFr?'Francés → Español':'Español → Francés'}</button><span class="muted">${i+1} / ${ws.length}</span></div>
    <div class="flash"><div class="in"><div class="f">${esc(dirFr?w.fr:w.es)}<small>toca para girar</small></div><div class="b">${esc(dirFr?w.es:w.fr)}<small>${esc(w.cat)}</small></div></div></div>
    <div class="row" style="justify-content:center"><button class="btn alt" data-p>← Anterior</button><button class="btn alt" data-s>🔊</button><button class="btn" data-n>Siguiente →</button></div>`;
    el.querySelector('.flash').onclick=function(){ this.classList.toggle('flip'); };
    el.querySelector('[data-n]').onclick=()=>{ i=(i+1)%ws.length; draw(); };
    el.querySelector('[data-p]').onclick=()=>{ i=(i-1+ws.length)%ws.length; draw(); };
    el.querySelector('[data-s]').onclick=()=>say(w.fr);
    el.querySelector('[data-dir]').onclick=()=>{ dirFr=!dirFr; draw(); };
  }
  if(ws.length) draw();
}
function matchGame(el, words){
  function round(){
    const ws=shuffle(words).slice(0,6); let sel=null, left=ws.length, errors=0;
    const L=shuffle(ws.map((w,k)=>({k,t:w.fr,s:'fr'}))), R=shuffle(ws.map((w,k)=>({k,t:w.es,s:'es'})));
    let h='<div class="match">';
    for(let j=0;j<ws.length;j++) h+=`<button data-k="${L[j].k}" data-s="fr">${esc(L[j].t)}</button><button data-k="${R[j].k}" data-s="es">${esc(R[j].t)}</button>`;
    h+='</div><div class="fb"></div><div class="row" style="margin-top:10px"><button class="btn alt" data-r>Nueva ronda</button></div>';
    el.innerHTML=h;
    el.querySelector('[data-r]').onclick=round;
    el.querySelector('.match').onclick=ev=>{
      const b=ev.target.closest('button'); if(!b) return;
      if(b.dataset.s==='fr') say(b.textContent);
      if(!sel){ sel=b; b.classList.add('sel'); return; }
      if(sel===b){ b.classList.remove('sel'); sel=null; return; }
      if(sel.dataset.s===b.dataset.s){ sel.classList.remove('sel'); sel=b; b.classList.add('sel'); return; }
      if(sel.dataset.k===b.dataset.k){ sel.classList.add('done'); b.classList.add('done'); left--; if(!left){ el.querySelector('.fb').className='fb ok'; const g=addXP(errors<=1?5:3,true); touchDay(); save(); el.querySelector('.fb').textContent='🎉 ¡Completado con '+errors+' error'+(errors===1?'':'es')+'!'+(g?' +'+g+' ⭐':''); } }
      else { errors++; const a=sel; a.classList.add('bad'); b.classList.add('bad'); setTimeout(()=>{a.classList.remove('bad');b.classList.remove('bad');},500); }
      sel.classList.remove('sel'); sel=null;
    };
  }
  round();
}
function vocabQuiz(el, words){
  let n=0, ok=0, bag=[]; const total=Math.min(10,words.length);
  function next(){
    if(n>=total){ el.innerHTML=`<div class="card" style="text-align:center"><div class="score">${ok}/${total}</div><p>${ok>=8?'¡Excelente! 🎉':ok>=5?'¡Bien! Sigue repasando.':'Repasa las tarjetas y vuelve a intentarlo.'}</p><button class="btn">Otra vez</button></div>`; const g=addXP(ok,true); touchDay(); save(); if(g) toast('+'+g+' ⭐'); el.querySelector('.btn').onclick=()=>{n=0;ok=0;next();}; return; }
    if(!bag.length) bag=shuffle(words); const w=bag.pop(), toFr=Math.random()<.5;
    const pool=shuffle(words.filter(x=>x!==w&&x.es!==w.es&&x.fr!==w.fr)).filter((x,i,a)=>a.findIndex(y=>y.es===x.es)===i).slice(0,3);
    const opts=shuffle([w].concat(pool));
    el.innerHTML=`<div class="ex"><div class="q">${n+1}/${total} · ¿Cómo se dice <b>${esc(toFr?w.es:w.fr)}</b> en ${toFr?'francés':'español'}? ${toFr?'':sp(w.fr)}</div><div class="opts">${opts.map(o=>`<button data-c="${o===w?1:0}">${esc(toFr?o.fr:o.es)}</button>`).join('')}</div></div>`;
    el.querySelector('.opts').onclick=ev=>{ const b=ev.target.closest('button'); if(!b||el.dataset.lock) return; el.dataset.lock=1;
      if(b.dataset.c==='1'){b.classList.add('ok');ok++;} else {b.classList.add('ko'); el.querySelector('[data-c="1"]').classList.add('ok');}
      say(w.fr); setTimeout(()=>{delete el.dataset.lock;n++;next();},1100); };
  }
  next();
}
function dictation(el, words){
  let w, bag=[], got=false;
  function next(){
    if(!bag.length) bag=shuffle(words); w=bag.pop(); got=false;
    el.innerHTML=`<div class="ex"><div class="q">Escucha y escribe la palabra en francés <button class="btn alt" data-p>🔊 Escuchar</button> <button class="btn alt" data-slow>🐢 Lento</button></div><div class="row"><input autocomplete="off" spellcheck="false"><button class="btn" data-c>Comprobar</button><button class="btn alt" data-n>Otra</button></div><div class="fb"></div></div>`;
    const inp=el.querySelector('input'), fb=el.querySelector('.fb');
    el.querySelector('[data-p]').onclick=()=>say(w.fr);
    el.querySelector('[data-slow]').onclick=()=>say(w.fr,.55);
    el.querySelector('[data-n]').onclick=next;
    const chk=()=>{ if(normA(inp.value)===normA(w.fr)){fb.className='fb ok';fb.innerHTML='✔ ¡Perfecto! <b>'+esc(w.fr)+'</b> = '+esc(w.es); if(!got){ got=true; addXP(2,true); touchDay(); save(); } }
      else if(norm(inp.value)===norm(w.fr)){fb.className='fb ok';fb.innerHTML='Casi: ojo a los acentos → <b>'+esc(w.fr)+'</b> ('+esc(w.es)+')';}
      else {got=true;fb.className='fb ko';fb.innerHTML='Era: <b>'+esc(w.fr)+'</b> ('+esc(w.es)+')';} };
    el.querySelector('[data-c]').onclick=chk; inp.onkeydown=e=>{if(e.key==='Enter')chk();};
    setTimeout(()=>say(w.fr),300);
  }
  next();
}

/* ---------- páginas ---------- */
const ICON={u0:'👋',u1:'🗼',u2:'🌍',u3:'👨‍👩‍👧',u4:'🏠',u5:'⏰',u6:'🏖️',u7:'🛍️',u8:'🥖'};
function ring(p,size,col){ const r=size/2-5,c=2*Math.PI*r; return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".15" stroke-width="7"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col||'var(--green)'}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 ${size/2} ${size/2})" style="transition:stroke-dashoffset 1s"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="${size/4.4}" font-weight="800" fill="currentColor">${p}%</text></svg>`; }
function streak(){ const d=S.days||[]; const day=i=>{ const t=new Date(); t.setDate(t.getDate()-i); return dkey(t); }; let i=d.includes(day(0))?0:1, n=0; while(d.includes(day(i))){ n++; i++; } return n; }
function wordOfDay(){ const all=[]; units(S.level).forEach(u=>vocabOf(u).forEach(w=>all.push(w))); if(!all.length) return null; const day=Math.floor(Date.now()/864e5); return all[(day*7919)%all.length]; }
function home(){
  const L=S.level, us=units(L);
  const all=us.reduce((a,u)=>a+exKeys(u).length,0), ok=us.reduce((a,u)=>a+exKeys(u).filter(k=>S.done[k]).length,0);
  const g=all?Math.round(100*ok/all):0, w=wordOfDay(), st=streak();
  const nWords=us.reduce((a,u)=>a+vocabOf(u).length,0);
  const cur=us.find(u=>pct(u)<100)||us[0];
  const hour=new Date().getHours(), hi=hour>=6&&hour<19?'Bonjour':'Bonsoir';
  main.innerHTML=`<div class="hero2">
   <div class="hero-txt"><span class="eyebrow">Nivel ${L} · Découverte</span><h1>${hi} ! <span class="grad">Aprende francés</span> desde cero.</h1>
   <p class="big">Gramática explicada en español, vocabulario con audio, diálogos, cultura francófona, cientos de ejercicios y un simulacro del examen oficial DELF.</p>
   <div class="row"><a class="btn big-btn" href="#/u/${cur.id}">${ok?'Continuar':'Empezar'}: ${ICON[cur.id]||''} ${esc(cur.title)} →</a><a class="btn alt" href="#/guia">Cómo estudiar</a></div></div>
   <div class="hero-ring">${ring(g,170,'url(#gr)')}<svg width="0" height="0"><defs><linearGradient id="gr"><stop offset="0" stop-color="#2346c8"/><stop offset="1" stop-color="#e0313f"/></linearGradient></defs></svg><div class="muted" style="text-align:center;font-weight:600">progreso ${L}</div></div>
  </div>
  <div class="stats">
   <div class="stat"><span>🔥</span><b>${st}</b><small>día${st===1?'':'s'} seguidos</small></div>
   <a class="stat" href="#/ranking" style="text-decoration:none;color:inherit"><span>${rank(S.xp||0)[2]}</span><b>${S.xp||0} ⭐</b><small>rango ${rank(S.xp||0)[1]}</small></a>
   <div class="stat"><span>✅</span><b>${ok}<i>/${all}</i></b><small>ejercicios</small></div>
   <div class="stat"><span>📚</span><b>${nWords}</b><small>palabras</small></div>
  </div>
  ${w?`<div class="wod"><div><span class="eyebrow">Mot du jour</span><div class="wod-fr fr" data-say="${esc(w.fr)}">${esc(w.fr)}</div><div class="muted">${esc(w.es)} · <i>${esc(w.cat)}</i></div></div><button class="btn alt" data-say="${esc(w.fr)}">🔊 Escuchar</button></div>`:''}
  <h2>Tu ruta de aprendizaje</h2><div class="path">${us.map((u,i)=>{const p=pct(u);return `<a class="unit-card u2" href="#/u/${u.id}" style="--uc:${u.color};animation-delay:${i*40}ms"><div class="uc-top"><span class="uc-ico">${ICON[u.id]||'📘'}</span>${ring(p,54,u.color)}</div><div class="n">${u.n}</div><b>${esc(u.title)}</b><div class="muted uc-es">${esc(u.es)}</div>${p===100?'<span class="pill g">Completada ✓</span>':p?'<span class="pill">En curso</span>':''}</a>`}).join('')}</div>
  <h2>Herramientas</h2><div class="grid tools">
  ${[['#/gramatica','📘','Gramática completa','Toda la teoría en una página'],['#/verbos','🔁','Conjugaciones','36 verbos + práctica'],['#/dico','📖','Diccionario','Busca en '+nWords+' palabras'],['#/repaso','🎯','Repaso aleatorio','15 ejercicios mezclados'],['#/fonetica','👄','Pronunciación','Sonidos y pares mínimos'],['#/ranking','🏆','Ranking y amigos','Compite cada semana'],['#/simulacro','📝','Simulacro DELF','¿Tienes ya el nivel?'],['#/next','🚀','Siguiente nivel','A2, B1, B2…']].map(t=>`<a class="tool" href="${t[0]}"><span>${t[1]}</span><div><b>${t[2]}</b><small>${t[3]}</small></div></a>`).join('')}</div>
  <section class="band"><span class="eyebrow">Método</span><h2>Cómo funciona cada unidad</h2><div class="steps">
  ${[['📘','Aprende','Lee la gramática explicada en español y escucha cada ejemplo.'],['🗂️','Memoriza','Tarjetas, parejas, test y dictado con el vocabulario.'],['💬','Escucha','Diálogos de la vida real en formato chat, con y sin traducción.'],['✏️','Practica','Ejercicios autocorregidos hasta llegar al 100 %.'],['🎤','Produce','Escribe y habla con modelos y lista de autoevaluación.']].map((s,k)=>`<div class="step"><div class="step-n">${k+1}</div><div class="step-i">${s[0]}</div><b>${s[1]}</b><p class="muted">${s[2]}</p></div>`).join('')}</div></section>
  <section class="journey"><div><span class="eyebrow">Tu objetivo</span><h2>De cero al DELF, nivel a nivel</h2><p class="muted">Termina las 9 unidades, aprueba el simulacro y desbloquea el siguiente nivel.</p><a class="btn" href="#/next">Ver el plan completo →</a></div>
  <div class="levels">${[['A1','Découverte','Ahora'],['A2','Survie','Próximo'],['B1','Seuil','Después'],['B2','Avancé','Meta']].map((l,k)=>`<div class="lv ${k===0?'cur':''}"><b>${l[0]}</b><span>${l[1]}</span><small>${l[2]}</small></div>`).join('')}</div></section>`;
}
/* confeti */
window.confetti=function(n){ const c=document.createElement('div'); c.className='confetti'; const cols=['#2346c8','#e0313f','#f5c04d','#138a5c','#5b3fd6','#fff'];
  for(let i=0;i<(n||60);i++){ const p=document.createElement('i'); p.style.left=Math.random()*100+'vw'; p.style.background=cols[i%cols.length]; p.style.animationDelay=Math.random()*.4+'s'; p.style.setProperty('--x',(Math.random()*200-100)+'px'); p.style.setProperty('--r',(Math.random()*720)+'deg'); c.appendChild(p); }
  document.body.appendChild(c); setTimeout(()=>c.remove(),2600); };
function toast(t){ const d=document.createElement('div'); d.className='toast'; d.innerHTML=t; document.body.appendChild(d); setTimeout(()=>d.classList.add('out'),1600); setTimeout(()=>d.remove(),2100); }
function guide(){
  main.innerHTML=`<h1>🧭 Cómo estudiar con esta web</h1>
  <div class="card"><h3>Un ritmo realista</h3><p>El nivel A1 necesita entre <b>60 y 100 horas</b> de estudio. Con 30–45 minutos al día lo terminarás en 3–4 meses. Mejor poco cada día que mucho un solo día.</p></div>
  <div class="card"><h3>Ruta de cada unidad</h3><ol>
  <li><b>Lección</b>: lee los objetivos y la gramática. Pulsa 🔊 en cada frase y repítela en voz alta.</li>
  <li><b>Vocabulario</b>: lee la lista, luego tarjetas → parejas → test → dictado.</li>
  <li><b>Diálogos</b>: escucha primero sin traducción, después con ella. Léelos imitando la entonación (técnica <i>shadowing</i>).</li>
  <li><b>Cultura</b>: lee y descubre el mundo francófono.</li>
  <li><b>Ejercicios</b>: haz todos hasta llegar al 100 %. Si fallas, vuelve a la gramática.</li>
  <li><b>Producción</b>: escribe el texto propuesto y grábate hablando. Usa la lista de control.</li></ol></div>
  <div class="card"><h3>Consejos</h3><ul class="clean">
  <li>Haz un <b>repaso aleatorio</b> cada 2–3 días: mezcla todas las unidades.</li>
  <li>Aprende las palabras <b>con su artículo</b> (<i>la</i> maison, <i>le</i> livre): el género no se adivina.</li>
  <li>Escucha francés real: canciones, series con subtítulos en francés, podcasts para principiantes, la radio RFI «Journal en français facile».</li>
  <li>Cuando tengas más del 80 % en todas las unidades, haz el <b>simulacro DELF</b>.</li></ul></div>
  <div class="card"><h3>⭐ Cómo se ganan los puntos</h3><ul class="clean"><li><b>+10 ⭐</b> por cada ejercicio nuevo que aciertas (cada ejercicio puntúa una sola vez).</li><li><b>+10 ⭐ de bonus diario</b> con tu primer acierto del día: mantiene tu racha 🔥.</li><li><b>+50 ⭐</b> al completar una unidad al 100 %.</li><li><b>Práctica</b> (test de vocabulario, dictado, parejas y verbos): hasta <b>60 ⭐ al día</b>.</li><li><b>Simulacro DELF</b>: tu mejor nota (de 0 a 100) se suma como puntos.</li><li>Con los puntos subes de <b>rango</b>: ${RANKS.map(r=>r[2]+' '+r[1]+' ('+r[0]+')').join(' → ')}.</li><li>Los puntos de la semana cuentan para el <a href="#/ranking">ranking semanal</a>, que se reinicia cada lunes.</li></ul></div>
  <div class="note">El audio usa la voz francesa de tu navegador/sistema. Si suena en español, instala una voz «Français (France)» en la configuración de voz de Windows.</div>`;
}
function unitPage(id, tab){
  const L=S.level, u=units(L).find(x=>x.id===id); if(!u){ home(); return; }
  const target=tab;
  const tabs=[['leccion','📘','Lección'],['vocab','🗂️','Vocabulario'],['dialogos','💬','Diálogos'],['cultura','🌍','Cultura'],['ejercicios','✏️','Ejercicios'],['produccion','🎤','Producción']];
  const vw=vocabOf(u).length;
  const i=units(L).indexOf(u), prev=units(L)[i-1], next=units(L)[i+1];
  let h=`<div class="ubanner full" style="--uc:${u.color}"><div class="ub-in"><div class="ub-txt"><div class="crumbs"><a href="#/">Inicio</a> / Unidades / <b>${u.n}</b></div><span class="eyebrow">Unidad ${u.n} · Nivel ${L}</span><h1>${esc(u.title)}</h1><p>${esc(u.es)}</p>
  <div class="ub-meta"><span>🎯 ${(u.goals||[]).length} objetivos</span><span>📘 ${(u.lessons||[]).length} lecciones</span><span>🗂️ ${vw} palabras</span><span>✏️ ${(u.ex||[]).length} ejercicios</span></div></div>
  <div class="ub-ico">${ICON[u.id]||'📘'}</div><div class="ub-ring">${ring(pct(u),110,'#fff')}</div></div></div>
  <div class="chapter"><aside class="toc"><div class="toc-in"><div class="toc-h">En esta unidad</div>
  ${tabs.map((t,k)=>`<a href="#/u/${id}/${t[0]}" data-sec="${t[0]}"><span class="toc-n">${k+1}</span><span>${t[1]} ${t[2]}</span></a>`+(t[0]==='leccion'?`<div class="toc-sub">${(u.lessons||[]).map((s,j)=>`<a href="#/u/${id}/leccion" data-jump="l_${j}">${s.t.replace(/<[^>]+>/g,'')}</a>`).join('')}</div>`:'')).join('')}
  <div class="toc-prog">${ring(pct(u),64,u.color)}<div><b>Tu progreso</b><small class="muted">${exKeys(u).filter(k=>S.done[k]).length}/${(u.ex||[]).length} ejercicios</small></div></div></div></aside>
  <div class="chap-body">${tabs.map((t,k)=>`<section class="sec" id="sec_${t[0]}"><div class="sec-h"><span class="sec-n">${String(k+1).padStart(2,'0')}</span><h2>${t[2]}</h2></div><div class="sec-c" id="c_${t[0]}"></div></section>`).join('')}
  <div class="pager">${prev?`<a href="#/u/${prev.id}"><small>← Anterior</small><b>${ICON[prev.id]||''} ${esc(prev.title)}</b></a>`:'<span></span>'}${next?`<a class="nx" href="#/u/${next.id}"><small>Siguiente →</small><b>${ICON[next.id]||''} ${esc(next.title)}</b></a>`:'<a class="nx" href="#/simulacro"><small>Siguiente →</small><b>📝 Simulacro DELF</b></a>'}</div></div></div>`;
  main.innerHTML=h;
  main.querySelectorAll('.toc a').forEach(a=>a.onclick=e=>{ e.preventDefault(); const el=a.dataset.jump?document.getElementById(a.dataset.jump):document.getElementById('sec_'+a.dataset.sec); if(el){ history.replaceState(null,'',a.getAttribute('href')); window.scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'smooth'}); } });
  const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ main.querySelectorAll('.toc a[data-sec]').forEach(a=>a.classList.toggle('on',a.dataset.sec===en.target.id.slice(4))); } }),{rootMargin:'-30% 0px -60% 0px'});
  main.querySelectorAll('.sec').forEach(s=>io.observe(s));
  for(const [tab] of tabs){
  const c=$('#c_'+tab);
  if(tab==='leccion'){
    c.innerHTML=`<div class="card"><h3>🎯 Al final de esta unidad sabrás…</h3><ul class="clean">${(u.goals||[]).map(g=>`<li>${g}</li>`).join('')}</ul></div>`+
    (u.lessons||[]).map((s,j)=>{ const t=s.t.replace(/<[^>]+>/g,''); const p=`Soy hispanohablante y estoy aprendiendo francés desde cero (nivel A1). Explícame en español, con mucho detalle y paso a paso, este tema de gramática/vocabulario: «${t}» (unidad «${u.title}»). Incluye: para qué sirve, cómo se forma, reglas y excepciones, comparación con el español, errores típicos de hispanohablantes, 10 ejemplos en francés con traducción y pronunciación aproximada, y al final 5 ejercicios cortos con sus soluciones.`; return `<div class="card" id="l_${j}"><h2 style="margin-top:0">${s.t}</h2>${s.h}<div class="more"><a class="btn alt" href="https://chatgpt.com/?q=${encodeURIComponent(p)}" target="_blank" rel="noopener">🧑‍🏫 Explícamelo más a fondo</a><span class="muted">Abre ChatGPT con una explicación detallada de este tema, ejemplos y ejercicios.</span></div></div>`; }).join('')+
    (u.phon?`<div class="card"><h2 style="margin-top:0">👄 Pronunciación</h2>${u.phon}</div>`:'');
  }
  if(tab==='vocab'){
    const ws=vocabOf(u);
    c.innerHTML=`<div class="tabs" id="vt"><button class="on" data-v="lista">Lista (${ws.length})</button><button data-v="flash">Tarjetas</button><button data-v="match">Parejas</button><button data-v="quiz">Test</button><button data-v="dict">Dictado</button></div><div id="vc"></div>`;
    const vc=$('#vc');
    const lista=()=>{ let o=''; for(const cat in u.vocab){ o+=`<div class="card"><h3>${esc(cat)}</h3><div class="tw"><table>${parseVocab(u.vocab[cat]).map(w=>`<tr><td><span class="fr" data-say="${esc(w.fr)}">${esc(w.fr)}</span></td><td>${esc(w.es)}</td></tr>`).join('')}</table></div><button class="btn alt" data-say="${esc(parseVocab(u.vocab[cat]).map(w=>w.fr).join('. '))}">🔊 Escuchar todo</button></div>`; } vc.innerHTML='<p class="muted">Pulsa cualquier palabra azul para oírla.</p>'+o; };
    lista();
    $('#vt').onclick=e=>{ const b=e.target.closest('button'); if(!b) return; $('#vt').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
      ({lista, flash:()=>flashcards(vc,ws), match:()=>matchGame(vc,ws), quiz:()=>vocabQuiz(vc,ws), dict:()=>dictation(vc,ws)})[b.dataset.v](); };
  }
  if(tab==='dialogos'){
    c.innerHTML=`<div class="row"><label><input type="checkbox" id="hideEs"> Ocultar traducción</label></div>`+(u.dialogs||[]).map((d,k)=>`<div class="card dlg"><h3>${esc(d.t)} <button class="btn alt" data-say="${esc(d.l.map(x=>x[1]).join(' '))}">▶ Escuchar todo</button></h3>${d.ctx?`<p class="muted">${d.ctx}</p>`:''}${d.l.map(x=>`<p><b>${esc(x[0])}</b> <span class="fr" data-say="${esc(x[1])}">${esc(x[1])}</span><span class="es">${esc(x[2])}</span></p>`).join('')}${d.q?`<div class="note"><b>Comprensión:</b><ul class="clean">${d.q.map(q=>`<li>${q[0]} <details style="display:inline"><summary class="muted" style="display:inline;cursor:pointer">ver</summary> <b>${q[1]}</b></details></li>`).join('')}</ul></div>`:''}</div>`).join('');
    $('#hideEs').onchange=e=>c.classList.toggle('hide-es',e.target.checked);
  }
  if(tab==='cultura'){ c.innerHTML=(u.culture||[]).map(x=>`<div class="card"><h3>${x.t}</h3>${x.h}</div>`).join(''); }
  if(tab==='ejercicios'){
    const keys=exKeys(u);
    c.innerHTML=`<p class="muted">Las respuestas escritas aceptan errores de acentos, pero te avisan. Pulsa Intro para comprobar.</p>`+(u.ex||[]).map((e,k)=>(e.sec?`<h3>${e.sec}</h3>`:'')+exHTML(e,k,keys[k])).join('')+`<div class="row"><button class="btn alt" id="resetU">Reiniciar ejercicios de esta unidad</button></div>`;
    bindEx(c,u.ex,keys);
    $('#resetU').onclick=()=>{ if(confirm('¿Borrar el progreso de esta unidad? También se restan los ⭐ ganados en ella.')){ let back=0; keys.forEach(k=>{ if(S.done[k]){ back+=10; delete S.done[k]; } }); if(S.bonus[u.id]){ back+=50; delete S.bonus[u.id]; } addXP(-back); save(); unitPage(id,'ejercicios'); drawSide(); drawTop(); } };
  }
  if(tab==='produccion'){
    const k=u.id;
    const aiP=`Agis comme mon professeur de français. Je suis débutant (niveau A1) et je parle espagnol. Nous allons pratiquer une conversation orale sur ce thème : ${u.title} (${u.es}). Mes objectifs (en espagnol) : ${(u.goals||[]).join(" ; ")}. Fais-moi pratiquer ces objectifs un par un. Parle lentement, avec des phrases très simples. Pose-moi une question à la fois et attends ma réponse. Si je fais une erreur, corrige-moi gentiment en une phrase, puis continue. Si je ne comprends pas, répète plus simplement. Commence par me saluer.`;
    const aiCard=`<div class="card ai"><h3>🤖 Conversación real con una IA</h3><p>Practica hablando en voz alta con una IA que responde con voz natural. Pulsa el botón: el mensaje para tu «profesor» se copia solo. Después activa el <b>modo voz</b> (icono de ondas 🎙️) y habla.</p><div class="row"><a class="btn" data-ai href="https://chatgpt.com/?q=${encodeURIComponent(aiP)}" target="_blank" rel="noopener">💬 Abrir ChatGPT</a></div><details><summary style="cursor:pointer;color:var(--blue)">Ver el mensaje</summary><div class="note">${esc(aiP)}</div></details></div>`;
    c.innerHTML=aiCard+(u.prod||[]).map((p,j)=>`<div class="card"><h3>${p.t}</h3><p>${p.h}</p>${p.model?`<details><summary style="cursor:pointer;color:var(--blue)">Ver un modelo</summary><div class="note fr" data-say="${esc(p.model)}">${esc(p.model)}</div></details>`:''}${p.oral?'':`<textarea data-n="${k}_${j}" placeholder="Escribe aquí en francés… (se guarda solo)">${esc(S.notes[k+'_'+j]||'')}</textarea><button class="btn alt" data-read="${k}_${j}">🔊 Leer mi texto</button>`}</div>`).join('')+
    `<div class="card"><h3>✅ Autoevaluación de la unidad</h3>${(u.goals||[]).map((g,j)=>`<label class="check"><input type="checkbox" data-c="${k}_g${j}" ${(S.notes[k+'_g'+j]||goalAuto(u,j))?'checked':''}> Puedo ${g.charAt(0).toLowerCase()+g.slice(1)} ${goalAuto(u,j)?'<span class="pill g">✓ conseguido con los ejercicios</span>':''}</label>`).join('')}</div>`;
    c.querySelectorAll('textarea').forEach(t=>t.oninput=()=>{S.notes[t.dataset.n]=t.value;save();});
    c.querySelectorAll('[data-ai]').forEach(a=>a.addEventListener('click',()=>{ try{navigator.clipboard.writeText(aiP);}catch(e){} toast('📋 Mensaje copiado: pégalo si no aparece');}));
    c.querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>say(S.notes[b.dataset.read]||''));
    c.querySelectorAll('[data-c]').forEach(b=>b.onchange=()=>{S.notes[b.dataset.c]=b.checked;save();});
  }
  }
  if(target&&target!=='leccion'){ const el=$('#sec_'+target); if(el) setTimeout(()=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'instant'}),30); }
}
function goalAuto(u,j){ const k=exKeys(u), G=(u.goals||[]).length; if(!k.length||!G) return false; const a=Math.floor(j*k.length/G), b=Math.max(a+1,Math.floor((j+1)*k.length/G)); const r=k.slice(a,b); return r.filter(x=>S.done[x]).length/r.length>=0.8; }
function grammarAll(){
  const us=units(S.level);
  main.innerHTML=`<h1>📘 Gramática completa ${S.level}</h1><p class="muted">Todas las explicaciones del curso en una sola página, para consultar.</p>
  <div class="card"><b>Índice:</b><ul class="clean">${us.map(u=>(u.lessons||[]).map((s,j)=>`<li><a href="#g_${u.id}_${j}" data-jump>${u.n} · ${s.t}</a></li>`).join('')).join('')}${(C.grammarExtra||[]).map((s,j)=>`<li><a href="#gx_${j}" data-jump>★ ${s.t}</a></li>`).join('')}</ul></div>`+
  us.map(u=>(u.lessons||[]).map((s,j)=>`<div class="card" id="g_${u.id}_${j}"><div class="muted">Unidad ${u.n}</div><h2 style="margin-top:0">${s.t}</h2>${s.h}</div>`).join('')).join('')+
  (C.grammarExtra||[]).map((s,j)=>`<div class="card" id="gx_${j}"><div class="muted">Resumen</div><h2 style="margin-top:0">${s.t}</h2>${s.h}</div>`).join('');
  main.querySelectorAll('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault(); document.getElementById(a.getAttribute('href').slice(1)).scrollIntoView({behavior:'smooth'});});
}
function verbs(){
  const V=C.verbs||[]; const P=['je','tu','il/elle/on','nous','vous','ils/elles'];
  main.innerHTML=`<h1>🔁 Conjugaciones</h1><p class="muted">Presente, passé composé, futuro próximo e imperativo de los verbos del nivel. Pulsa una forma para oírla.</p><input class="search" id="vs" placeholder="Buscar verbo… (être, aller, manger…)"><div id="vl"></div>
  <h2>Practica</h2><div id="vp"></div>`;
  const draw=f=>{ $('#vl').innerHTML=V.filter(v=>!f||norm(v.inf+' '+v.es).includes(norm(f))).map(v=>`<div class="card"><h3><span class="fr" data-say="${v.inf}">${v.inf}</span> <span class="muted">— ${v.es}</span> <span class="pill ${v.g==='irregular'?'r':''}">${v.g}</span></h3><div class="tw"><table><tr><th></th><th>Presente</th><th>Passé composé</th><th>Futur proche</th></tr>${P.map((p,k)=>`<tr><td class="muted">${p}</td><td class="fr" data-say="${esc(pron(p,v.pr[k]))}">${esc(pron(p,v.pr[k]))}</td><td>${esc(pc(p,v,k))}</td><td>${esc(fp(p,v,k))}</td></tr>`).join('')}</table></div><p><b>Imperativo:</b> ${v.imp||'—'}</p></div>`).join(''); };
  function pron(p,f){ const s=p.split('/')[0]; if(s==='je'&&/^[aeiouhéèêy]/i.test(f)) return "j'"+f; return s+' '+f; }
  const AV=['ai','as','a','avons','avez','ont'], ET=['suis','es','est','sommes','êtes','sont'], AL=['vais','vas','va','allons','allez','vont'];
  function pc(p,v,k){ const aux=v.aux==='être'?ET[k]:AV[k]; let pp=v.pp; if(v.aux==='être'&&k>=3) pp+='s'; const pre=(v.refl?(['me','te','se','nous','vous','se'][k]+' '):''); const s=p.split('/')[0]; let a=(v.refl?pre:'')+aux; a=a.replace(/^me ([aeiouéêè])/,"m'$1").replace(/^te ([aeiouéêè])/,"t'$1").replace(/^se ([aeiouéêè])/,"s'$1"); return (s==='je'&&/^[aeiou]/.test(a)?"j'":s+' ')+a+' '+pp+(v.aux==='être'&&k<3?'(e)':v.aux==='être'?'':''); }
  function fp(p,v,k){ const s=p.split('/')[0]; const r=v.refl?(['me','te','se','nous','vous','se'][k]+' '):''; let inf=v.refl?v.inf.replace(/^se |^s['’]/,''):v.inf; let rr=r; if(r&&/^[aeiouhéè]/.test(inf)) rr=r.trim().replace(/e$/,"'"); return s+' '+AL[k]+' '+rr+inf; }
  draw(); $('#vs').oninput=e=>draw(e.target.value);
  // práctica
  const vp=$('#vp');
  function q(){ const v=V[Math.random()*V.length|0], k=Math.random()*6|0; const ans=v.pr[k];
    vp.innerHTML=`<div class="ex"><div class="q">Presente de <b>${v.inf}</b> (${v.es}) con <b>${P[k]}</b></div><div class="row"><input autocomplete="off"><button class="btn">Comprobar</button><button class="btn alt" data-n>Otro</button></div><div class="fb"></div></div>`;
    const inp=vp.querySelector('input'),fb=vp.querySelector('.fb');
    let got=false; const c=()=>{ const raw=inp.value.trim(); if(!raw) return; const val=raw.replace(/^(j['’]\s*|(je|tu|ils|elles|il|elle|on|nous|vous)\s+)/i,''); if([raw,val].some(x=>normA(x)===normA(ans))){fb.className='fb ok';fb.innerHTML='✔ '+esc(pron(P[k],ans)); if(!got){ got=true; addXP(2,true); touchDay(); save(); } say(pron(P[k],ans));} else {got=true;fb.className='fb ko';fb.innerHTML='✘ Es: <b>'+esc(pron(P[k],ans))+'</b>';} };
    vp.querySelector('.btn').onclick=c; inp.onkeydown=e=>{if(e.key==='Enter')c();}; vp.querySelector('[data-n]').onclick=()=>{q();vp.querySelector('input').focus({preventScroll:true});}; }
  q();
}
function dico(){
  const all=[]; units(S.level).forEach(u=>vocabOf(u).forEach(w=>all.push(Object.assign({u},w))));
  main.innerHTML=`<h1>📖 Diccionario ${S.level}</h1><p class="muted">${all.length} palabras y expresiones del curso. Busca en francés o en español.</p><input class="search" id="ds" placeholder="Buscar…"><div class="card tw"><table id="dt"></table></div>`;
  const draw=f=>{ const r=all.filter(w=>!f||norm(w.fr+' '+w.es).includes(norm(f))).slice(0,400); $('#dt').innerHTML='<tr><th>Francés</th><th>Español</th><th>Unidad</th></tr>'+r.map(w=>`<tr><td><span class="fr" data-say="${esc(w.fr)}">${esc(w.fr)}</span></td><td>${esc(w.es)}</td><td><a href="#/u/${w.u.id}/vocab">${w.u.n}</a> <span class="muted">${esc(w.cat)}</span></td></tr>`).join(''); };
  draw(); $('#ds').oninput=e=>draw(e.target.value);
}
function review(){
  const us=units(S.level), pool=[]; us.forEach(u=>(u.ex||[]).forEach((e,i)=>pool.push({e,key:u.id+':'+i,u})));
  const pick=shuffle(pool).slice(0,15);
  main.innerHTML=`<h1>🎯 Repaso aleatorio</h1><p class="muted">15 ejercicios mezclados de todas las unidades. Recarga para otra tanda.</p><div class="row"><button class="btn" id="again">Nueva tanda</button></div><div id="rv"></div>`;
  $('#rv').innerHTML=pick.map((p,i)=>`<div class="muted" style="margin-top:12px;font-size:.8rem">Unidad ${p.u.n}</div>`+exHTML(p.e,i,p.key)).join('');
  bindEx($('#rv'), pick.map(p=>p.e), pick.map(p=>p.key));
  $('#again').onclick=review;
}
function phonetics(){ main.innerHTML=`<h1>👄 Pronunciación del francés</h1>`+(C.phonetics||'')+units(S.level).filter(u=>u.phon).map(u=>`<div class="card"><div class="muted">Unidad ${u.n}</div>${u.phon}</div>`).join(''); }
function delf(){ main.innerHTML=(C.delfInfo&&C.delfInfo[S.level])||'<h1>Próximamente</h1>'; }
function simulacro(){
  const X=C.exam&&C.exam[S.level]; if(!X){ main.innerHTML='<h1>Próximamente</h1>'; return; }
  let h=`<h1>📝 Simulacro DELF ${S.level}</h1><p class="muted">Formato parecido al examen real. Comprensión oral y escrita se corrigen automáticamente; la expresión escrita y oral te las evalúas tú con la tabla de criterios.</p>
  <div class="row"><span class="timer" id="tm">00:00</span><button class="btn alt" id="tgo">▶ Cronómetro</button></div>`;
  let n=0; const keys=[], list=[];
  X.parts.forEach((p,pi)=>{
    h+=`<div class="card"><h2 style="margin-top:0">${p.t}</h2><p class="muted">${p.info}</p>`;
    (p.docs||[]).forEach(d=>{
      h+=`<div class="note">${d.audio?`<button class="btn" data-say="${esc(d.audio)}" data-rate="0.85">🔊 Escuchar el documento</button> <span class="muted">(puedes escucharlo 2 veces, como en el examen)</span>`:''}${d.text?`<div style="white-space:pre-wrap">${d.text}</div>`:''}</div>`;
      d.qs.forEach(e=>{ const k='exam'+S.level+':'+(n++); keys.push(k); list.push(e); h+=exHTML(e,list.length-1,k); });
    });
    if(p.write) h+=p.write.map((w,j)=>`<div class="ex"><div class="q">${w}</div><textarea data-n="exam_w${pi}_${j}">${esc(S.notes['exam_w'+pi+'_'+j]||'')}</textarea><div class="muted" data-wc></div></div>`).join('');
    if(p.oral) h+=p.oral;
    h+='</div>';
  });
  h+=`<div class="card"><h2 style="margin-top:0">Resultado de la parte autocorregida</h2><button class="btn g" id="res">Calcular nota</button><div id="resout"></div></div>`;
  main.innerHTML=h;
  /* modo examen: un solo intento por pregunta, sin pistas */
  const res={};
  main.querySelectorAll('.ex[data-key]').forEach(box=>{ const key=box.dataset.key, e=list[keys.indexOf(key)]; if(!e) return; box.classList.remove('solved'); const pill=box.querySelector('.q .pill'); if(pill) pill.remove();
    const fb=box.querySelector('.fb'); const end=ok=>{ res[key]=ok; fb.className='fb '+(ok?'ok':'ko'); fb.innerHTML=ok?'✔ Correcto':'✘ Incorrecto. Respuesta: <b>'+esc(String(e.a).split('/')[0])+'</b>'; };
    if(e.t==='qcm'){ box.querySelector('.opts').onclick=ev=>{ const b=ev.target.closest('button'); if(!b||key in res) return; const ok=b.dataset.o===e.a; b.classList.add(ok?'ok':'ko'); if(!ok) box.querySelectorAll('.opts button').forEach(x=>{ if(x.dataset.o===e.a) x.classList.add('ok'); }); end(ok); }; }
    else { const inp=box.querySelector('input'); const sol=box.querySelector('[data-sol]'); if(sol) sol.remove(); const chk=()=>{ if(key in res||!inp.value.trim()) return; const ok=String(e.a).split('/').some(a=>norm(a)===norm(inp.value)); inp.className=ok?'ok':'ko'; inp.disabled=true; end(ok); }; box.querySelector('[data-chk]').onclick=chk; inp.onkeydown=ev=>{ if(ev.key==='Enter') chk(); }; } });
  main.querySelectorAll('textarea').forEach(t=>{ const wc=t.nextElementSibling; const f=()=>{wc.textContent=(t.value.trim()?t.value.trim().split(/\s+/).length:0)+' palabras';}; f(); t.oninput=()=>{S.notes[t.dataset.n]=t.value;save();f();}; });
  let sec=0,iv=null; $('#tgo').onclick=()=>{ if(iv){clearInterval(iv);iv=null;$('#tgo').textContent='▶ Cronómetro';} else {iv=setInterval(()=>{sec++;$('#tm').textContent=String(sec/60|0).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');},1000);$('#tgo').textContent='⏸ Pausa';} };
  $('#res').onclick=()=>{ const ok=keys.filter(k=>res[k]).length, ans=Object.keys(res).length; const p=Math.round(50*ok/keys.length);
    if(ans<keys.length&&!confirm('Te quedan '+(keys.length-ans)+' preguntas sin responder (cuentan como fallo). ¿Calcular la nota igualmente?')) return;
    const sc=Math.round(100*ok/keys.length), old=S.exam[S.level]||0; S.exam=S.exam||{};
    if(sc>old){ S.exam[S.level]=sc; const g=addXP(sc-old); touchDay(); if(g) toast('+'+g+' ⭐ por mejorar tu nota'); if(sc>=70) confetti(100); } save();
    $('#resout').innerHTML=`<div class="score">${ok}/${keys.length}</div><p class="muted">Mejor nota: ${S.exam[S.level]||0} % · <a href="#/simulacro" id="again2">Repetir el simulacro</a></p><p>Comprensión oral + escrita ≈ <b>${p}/50</b> puntos. Para aprobar el DELF necesitas 50/100 en total y al menos 5/25 en cada parte. ${p>=40?'🎉 ¡Muy buen nivel de comprensión!':p>=25?'Vas bien, repasa las unidades donde más fallas.':'Repasa las unidades y vuelve a intentarlo.'}</p>`; $('#again2').onclick=ev=>{ ev.preventDefault(); simulacro(); window.scrollTo({top:0,behavior:'instant'}); }; };
}
function nextLevel(){ main.innerHTML=C.nextInfo||''; const us=units('A1'); const box=document.getElementById('readiness'); if(box){ const ok=us.every(u=>pct(u)>=80), ex=(S.exam.A1||0)>=70; box.innerHTML=`<label class="check"><input type="checkbox" disabled ${ok?'checked':''}> Todas las unidades A1 al 80 % o más</label><label class="check"><input type="checkbox" disabled ${ex?'checked':''}> Simulacro DELF A1 con 70 % o más en la parte autocorregida (mejor nota: ${S.exam.A1||0} %)</label><p class="big">${ok&&ex?'🎉 <b>¡Estás listo para el A2!</b>':'Todavía no: sigue con el A1.'}</p>`; } }

/* ---------- social: ranking y amigos ---------- */
function ranking(tab){
  tab=tab||'semana';
  main.innerHTML=`<h1>🏆 Ranking</h1><p class="muted">Compite con otros estudiantes. La clasificación semanal se reinicia cada lunes.</p>
  <div class="tabs" id="rkt"><button data-t="semana" class="${tab==='semana'?'on':''}">🔥 Esta semana</button><button data-t="global" class="${tab==='global'?'on':''}">🌍 Siempre</button><button data-t="amigos" class="${tab==='amigos'?'on':''}">👥 Amigos</button></div>
  <div id="rkadd"></div><div id="rk"><div class="card muted">Cargando…</div></div>
  <div class="card"><h3>Rangos</h3><div class="ranks">${RANKS.map(r=>`<div class="rk-r ${rank(S.xp||0)[1]===r[1]?'cur':''}"><span>${r[2]}</span><b>${r[1]}</b><small>${r[0]} ⭐</small></div>`).join('')}</div></div>`;
  $('#rkt').onclick=e=>{ const b=e.target.closest('button'); if(b) ranking(b.dataset.t); };
  const box=$('#rk');
  if(!window.mfQuery||!window.MF_CLOUD_ON){ box.innerHTML='<div class="card">El ranking necesita una cuenta en la nube. Entra con tu usuario para participar.</div>'; return; }
  const me=window.mfUid(), w=wkey();
  if(tab==='amigos'){
    $('#rkadd').innerHTML=`<div class="card"><h3>Añadir un amigo</h3><div class="row"><input class="search" id="fr_in" style="flex:1;min-width:160px;margin:0" placeholder="Nombre de usuario exacto…" maxlength="30"><button class="btn" id="fr_add">Añadir</button></div><div class="fb" id="fr_fb"></div>${S.friends.length?`<div class="chips" style="margin-top:10px">${S.friends.map(f=>`<span class="chip">${esc(f)} <a href="#" data-rm="${esc(f)}" title="Quitar" style="text-decoration:none">✕</a></span>`).join('')}</div>`:''}</div>`;
    const add=async()=>{ const v=$('#fr_in').value.trim(), fb=$('#fr_fb'); if(!v) return; if(norm(v)===norm(window.MF_USER||'')){ fb.className='fb ko'; fb.textContent='Ese eres tú 🙂'; return; }
      fb.className='fb'; fb.textContent='Buscando…';
      try{ const r=await window.mfQuery('profiles?select=name&name=ilike.'+encodeURIComponent(v.replace(/[%_*(),]/g,''))+'&limit=1'); if(!r.length){ fb.className='fb ko'; fb.textContent='No existe ningún usuario con ese nombre (tiene que haber entrado al menos una vez).'; return; }
        if(!S.friends.some(f=>norm(f)===norm(r[0].name))){ S.friends.push(r[0].name); save(); } ranking('amigos'); }
      catch(e){ fb.className='fb ko'; fb.textContent='No se pudo buscar: '+e.message; } };
    $('#fr_add').onclick=add; $('#fr_in').onkeydown=e=>{ if(e.key==='Enter') add(); };
    $('#rkadd').querySelectorAll('[data-rm]').forEach(a=>a.onclick=e=>{ e.preventDefault(); S.friends=S.friends.filter(f=>f!==a.dataset.rm); save(); ranking('amigos'); });
  }
  const sel='profiles?select=user_id,name,xp,streak,done,week,week_xp';
  const q= tab==='semana' ? sel+'&week=eq.'+w+'&week_xp=gt.0&order=week_xp.desc&limit=50'
       : tab==='global' ? sel+'&order=xp.desc&limit=50'
       : sel+'&name=in.('+[window.MF_USER].concat(S.friends).map(n=>encodeURIComponent('"'+String(n).replace(/["\\]/g,'')+'"')).join(',')+')&order=xp.desc&limit=100';
  Promise.resolve().then(()=>pushNow()).catch(()=>{}).then(()=>window.mfQuery(q)).then(rows=>{
    if(!document.getElementById('rk')) return;
    if(!rows.length){ box.innerHTML=`<div class="card">${tab==='semana'?'Nadie ha sumado puntos esta semana todavía. ¡Sé el primero: haz un ejercicio!':tab==='amigos'?'Añade amigos por su nombre de usuario para competir con ellos.':'Todavía no hay nadie en el ranking.'}</div>`; return; }
    const val=r=>tab==='semana'?r.week_xp:r.xp;
    box.innerHTML=`<div class="card rk-list">${rows.map((r,i)=>{ const rk=rank(r.xp||0); return `<div class="rk-row ${r.user_id===me?'me':''}"><span class="rk-pos">${i<3?['🥇','🥈','🥉'][i]:i+1}</span><span class="rk-av" style="--h:${[...String(r.name)].reduce((a,c)=>a+c.charCodeAt(0),0)%360}">${esc(String(r.name).charAt(0).toUpperCase())}</span><span class="rk-name"><b>${esc(r.name)}${r.user_id===me?' <span class="pill">tú</span>':''}</b><small>${rk[2]} ${rk[1]} · 🔥 ${r.streak||0} · ✅ ${r.done||0}</small></span><span class="rk-xp">${val(r)||0} ⭐</span></div>`; }).join('')}</div>`+
      (rows.some(r=>r.user_id===me)?'':`<p class="muted">${tab==='semana'?'Aún no apareces: suma puntos esta semana.':'Aún no apareces en el top 50. ¡Sigue sumando!'}</p>`);
  }).catch(e=>{ box.innerHTML=`<div class="card">El ranking todavía no está activado en la base de datos.<br><small class="muted">${esc(e.message)}</small></div>`; });
}

/* ---------- router ---------- */
function route(){
  const h=(location.hash||'#/').slice(2).split('/');
  if(!C[S.level] && !['next','guia'].includes(h[0])) { S.level='A1'; drawLevels(); }
  drawSide(); drawTop(); window.scrollTo({top:0,left:0,behavior:'instant'}); document.body.dataset.page=h[0]||'home';
  const R={'':home,guia:guide,gramatica:grammarAll,verbos:verbs,dico,repaso:review,fonetica:phonetics,delf,simulacro,next:nextLevel,ranking:()=>ranking()};
  const go=()=>{ if(R[h[0]]) R[h[0]](); else if(h[0]==='u') unitPage(h[1],h[2]); else home(); window.scrollTo({top:0,left:0,behavior:'instant'}); if(h[0]==='u'&&h[2]&&h[2]!=='leccion'){ const el=document.getElementById('sec_'+h[2]); if(el) window.scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'instant'}); } };
  if(window._routed&&document.startViewTransition&&document.visibilityState==='visible'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){ let ran=false; const g=()=>{ran=true;go();}; try{ const vt=document.startViewTransition(g); vt.finished.catch(()=>{}); vt.ready.catch(()=>{ if(!ran) g(); }); }catch(e){ if(!ran) g(); } } else go(); window._routed=1;
}
const FRW=/\b(je|j'|tu|il|elle|on|nous|vous|ils|elles|le|la|les|l'|un|une|des|du|au|aux|de|d'|est|sont|suis|ai|as|avons|avez|ont|ne|pas|c'est|qu'|et|ou|mais|avec|pour|dans|sur|très|bien|mon|ma|mes|ton|ta|tes|son|sa|ses|ce|cette|ces|quel|quelle|oui|non|merci|bonjour)\b|[çèêëœîôûù]|[a-z](ez|ons|ent|eau|aux|oi|ou)\b/gi;
const ESW=/\b(el|los|las|es|y|que|del|una|uno|por|para|con|sin|como|cuando|también|muy|hay|soy|eres|tengo|estoy|se usa|ejemplo)\b|[ñáíóú¿¡]/gi;
function isFr(t){ t=t.trim(); if(t.length<2||t.length>220||/^[\d\s.,:;()\-–→+=×/%€]+$/.test(t)) return false; const f=(t.match(FRW)||[]).length, e=(t.match(ESW)||[]).length; return f>e || (f===e && /^[a-zàâçéèêëîïôûùüÿœ' \-]+$/i.test(t) && !/[ñáíóú]/i.test(t) && f>0); }
const ESX=/[ñáíóú¿¡]|\b(el|los|las|y|que|del|por|para|con|sin|como|muy|hay|ser|estar|tener|ir|hacer|poder|deber|singular|plural|masculino|femenino|delante|vocal|regla|igual|presente|todo|siempre|nunca|cuando|uno|unos|de vez|solo|nada|mucho|poco|yo|usted|sois|somos|eres|soy|tengo|tienes|tiene|tenemos|tienen|vengo|voy|vamos|hago|puedo|debo|quiero|definido|indefinido|partitivo|posesivo|demostrativo|interrogativo|ciudad|imperativo|futuro|pasado|proponer|aceptar|rechazar|quedar|ordinal|adverbios)\b/i;
function frCell(t){ t=t.trim(); return t.length>1 && t.length<220 && !ESX.test(t) && !/^[\d\s.,:;()\-–→+=×/%€]+$/.test(t) && !/^[-–]/.test(t); }
function audioTables(root){ root.querySelectorAll('table').forEach(tb=>{ const hs=[...tb.querySelectorAll('tr:first-child th')].map(h=>h.textContent.toLowerCase());
  tb.querySelectorAll('tr').forEach(tr=>[...tr.children].forEach((td,ci)=>{ if(td.tagName!=='TD'||td.dataset.say||td.querySelector('[data-say]')) return; const h=hs[ci]||'';
    if(/español|significa|uso|cuándo|nota|lógica|sonido|contraste|qué |^qué|horas|diploma|duración|puntos|tienes|nivel|tiempo|formación|categor|unidad|^tipo|regla|función|registro|ser \/ estar|^tener$|^ir$/.test(h)||(ci===0&&h==='')) return;
    const t=td.textContent.replace(/\s*\(.*?\)\s*/g,' ').trim(); if(frCell(t)||isFr(t)){ td.dataset.say=t; td.classList.add('fr'); } })); }); }
function audioAll(root){ audioTables(root); root.querySelectorAll('li i, p i, li b, p b, td i, td b, .chip, .note i, .tip i, .warn i').forEach(el=>{ if(el.closest('[data-say],button,a,.ex,.dlg,.fr')||el.querySelector('[data-say]')) return; const t=el.textContent.replace(/\s*\(.*?\)\s*/g,' ').trim(); if(el.tagName==='TD'&&el.children.length) return; if(isFr(t)||(el.tagName==='I'&&frCell(t))){ el.dataset.say=t; el.classList.add('fr'); } }); }
new MutationObserver(()=>{ clearTimeout(window._aa); window._aa=setTimeout(()=>audioAll(main),60); }).observe(main,{childList:true,subtree:true});
/* seleccionar cualquier texto para oírlo */
const sb=document.createElement('button'); sb.className='selsay'; sb.textContent='🔊 Escuchar'; sb.hidden=true; document.body.appendChild(sb);
document.addEventListener('selectionchange',()=>{ const sel=getSelection(), t=sel.toString().trim(); if(!t||t.length>400||!main.contains(sel.anchorNode)){ sb.hidden=true; return; } const r=sel.getRangeAt(0).getBoundingClientRect(); sb.style.top=(r.top+scrollY-42)+'px'; sb.style.left=Math.max(8,Math.min(innerWidth-120,r.left+scrollX+r.width/2-50))+'px'; sb.hidden=false; sb.dataset.t=t; });
sb.addEventListener('mousedown',e=>e.preventDefault()); sb.onclick=()=>{ say(sb.dataset.t); };
window.addEventListener('hashchange',route);
/* tema claro/oscuro */
function applyTheme(){ if(S.theme) document.documentElement.dataset.theme=S.theme; else delete document.documentElement.dataset.theme;
  const dark=S.theme? S.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; $('#themeBtn').textContent=dark?'☀️':'🌙'; }
$('#themeBtn').onclick=()=>{ const dark=S.theme? S.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; S.theme=dark?'light':'dark'; save(); applyTheme(); };
applyTheme(); save();
if(window.MF_USER){ const ub=$('#userBtn'); ub.hidden=false; ub.querySelector('b').textContent=window.MF_USER; ub.querySelector('i').textContent=window.MF_USER.charAt(0).toUpperCase();
  ub.onclick=async()=>{ if(confirm('¿Cerrar la sesión de '+window.MF_USER+'? Tu progreso queda guardado.')){ try{ await pushNow(); }catch(e){} window.mfLogout(); } }; }
drawLevels(); drawXP(); route(); sync();
})();
