/* 
  RENOVATE Serious Game - Service Worker (v1.0.8)
  Enables Standalone PWA, Offline Caching & Instant Loading on iOS & Android
*/

const CACHE_NAME = 'renovate-serious-game-v1.0.8';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=1.0.8',
  './app.js?v=1.0.8',
  './manifest.json',
  './public/images/RENOVATE-logo.svg',
  './public/images/SeriousGame_tela-Simples.jpg',
  './public/images/SeriousGame_tela1.jpg',
  './public/images/SeriousGame_tela2.jpg',
  './public/images/SeriousGame_tela3.jpg',
  './public/images/SeriousGame_tela4.jpg',
  './public/images/SeriousGame_tela5.jpg',
  './public/images/SeriousGame_tela8.jpg',
  './public/images/SeriousGame_tela9.jpg',
  './public/images/SeriousGame_tela10.jpg',
  './public/images/SeriousGame_tela23.jpg',
  './public/images/s10_param1_tractor.png',
  './public/images/s10_param2_pressure.png',
  './public/images/s10_param3_nozzles.png',
  './public/images/s10_param4_activenozzles.png',
  './public/locales/pt-PT.json',
  './public/locales/en-GB.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('SW cache item skipped:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first strategy for API requests, cache first for static assets
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch update in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
