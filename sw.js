const CACHE = 'fc26-playbook-v9';
const ENSO = ['book', 'chart', 'wall', 'lightning', 'sprout', 'sword', 'yinyang', 'weight',
  'play', 'enso', 'enso-dot', 'cross-x', 'check', 'eye', 'drop', 'star', 'sparkle',
  'target', 'run', 'trophy', 'spiral', 'fist'];
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=9',
  './data.js?v=9',
  './data-pro.js?v=9',
  './data-fix.js?v=9',
  './pitch.js?v=9',
  './app.js?v=9',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  ...ENSO.map((n) => `./icons/enso/${n}.svg`)
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
