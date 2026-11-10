/* Mon Français — aplicación instalable (PWA): instalación, sin conexión y barra inferior */
(function(){
const $ = s => document.querySelector(s);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/* ---- service worker: solo en https o localhost ---- */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      /* si llega una versión nueva mientras la app está abierta, se usa en la siguiente apertura */
      reg.addEventListener('updatefound', () => { const w = reg.installing; if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) window.MF_UPDATED = true; }); });
    }).catch(() => {});
  });
}

/* ---- sin conexión ---- */
const net = () => document.body.classList.toggle('is-offline', !navigator.onLine);
window.addEventListener('online', net); window.addEventListener('offline', net);
document.addEventListener('DOMContentLoaded', net);

/* ---- instalación ---- */
let deferred = null;
const dismissed = () => { try { return localStorage.getItem('monfr_noinstall') === '1'; } catch (e) { return false; } };
function canInstall(){ return !standalone && (deferred || isIOS); }
async function install(){
  if (deferred) { deferred.prompt(); const r = await deferred.userChoice.catch(() => null); deferred = null; if (r && r.outcome === 'accepted') hideInstall(); return; }
  if (isIOS) alert('Para instalar la app en iPhone o iPad:\n\n1. Pulsa el botón Compartir (el cuadrado con la flecha) en Safari.\n2. Elige «Añadir a pantalla de inicio».\n3. Pulsa «Añadir».');
  else alert('Para instalar la app, abre el menú de tu navegador (⋮) y elige «Instalar aplicación» o «Añadir a pantalla de inicio».');
}
function hideInstall(){ const b = $('#installBtn'); if (b) b.classList.remove('show'); const c = $('.install-card'); if (c) c.remove(); }
function showInstall(){
  if (!canInstall() || window.MF_BLOCK) return;
  const b = $('#installBtn'); if (b) { b.classList.add('show'); b.onclick = install; }
  card();
}
function card(){
  if (!canInstall() || dismissed() || window.MF_BLOCK) return;
  if (document.body.dataset.page !== 'home' || $('.install-card')) return;
  const after = $('#main .stats'); if (!after) return;
  const d = document.createElement('div'); d.className = 'install-card';
  d.innerHTML = '<img src="icons/icon-192.png" alt=""><div><b>Instala Mon Français</b><small>Ábrela como una app desde tu pantalla de inicio, a pantalla completa y también sin conexión.</small></div><button class="btn" data-i>📲 Instalar</button><button class="x" data-x title="Ahora no">✕</button>';
  after.after(d);
  d.querySelector('[data-i]').onclick = install;
  d.querySelector('[data-x]').onclick = () => { try { localStorage.setItem('monfr_noinstall', '1'); } catch (e) {} d.remove(); };
}
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; showInstall(); });
window.addEventListener('appinstalled', () => { deferred = null; hideInstall(); });

/* ---- barra inferior ---- */
function tabs(){
  const bar = $('#tabbar'); if (!bar) return;
  if (window.MF_BLOCK) { bar.remove(); return; }
  const h = (location.hash || '#/').slice(2).split('/')[0];
  bar.querySelectorAll('[data-r]').forEach(a => a.classList.toggle('on', a.dataset.r === h));
}
document.addEventListener('DOMContentLoaded', () => {
  const u = $('#tabUnits'); if (u) u.onclick = () => { const m = $('#menuBtn'); if (m) m.click(); };
  tabs(); if (isIOS) showInstall();
  const main = $('#main'); if (main) new MutationObserver(() => { clearTimeout(window._pc); window._pc = setTimeout(card, 120); }).observe(main, { childList: true });
});
window.addEventListener('hashchange', tabs);
})();
