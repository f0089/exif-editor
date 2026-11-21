/* Offline-Cache: immer zuerst das Netz fragen (neue Version sofort), ohne Netz aus dem Cache */
const CACHE = 'exif-editor-v4';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-256.png', './icon-180.png', './favicon.ico'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    try { const res = await fetch(r, { cache: 'no-cache' }); if (res.ok) c.put(r, res.clone()); return res; }
    catch (_) { return (await c.match(r, { ignoreSearch: true })) || Response.error(); }
  })());
});
