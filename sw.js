/* Mon Français — funcionamiento sin conexión.
   Estrategia: red primero (siempre la última versión); si no hay red, lo guardado. */
const CACHE = 'monfr-v40';
const CORE = [
  './', 'index.html', 'style.css', 'style2.css', 'style3.css', 'style4.css', 'style5.css', 'style6.css',
  'config.js', 'auth.js', 'pwa.js', 'app.js', 'manifest.webmanifest',
  'data/a1-u0.js', 'data/a1-u1.js', 'data/a1-u2.js', 'data/a1-u3.js', 'data/a1-u4.js',
  'data/a1-u5.js', 'data/a1-u6.js', 'data/a1-u7.js', 'data/a1-u8.js', 'data/a1-extra.js',
  'data/a2-u1.js', 'data/a2-u2.js', 'data/a2-u3.js', 'data/a2-u4.js', 'data/a2-u5.js', 'data/a2-u6.js', 'data/a2-u7.js', 'data/a2-u8.js', 'data/a2-extra.js',
  'icons/icon-192.png', 'icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  /* la nube (Supabase) nunca se guarda en caché */
  if (url.hostname.endsWith('supabase.co')) return;
  /* tipografías: caché primero */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
