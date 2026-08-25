/* 
  RENOVATE Serious Game - Service Worker Engine (v1.0.9)
  Full Offline Pre-Caching & Standalone Native App Execution on iOS & Android
*/

const CACHE_NAME = 'renovate-serious-game-v1.0.9';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=1.0.9',
  './app.js?v=1.0.9',
  './manifest.json',
  './public/images/RENOVATE-logo.svg',
  './public/images/RENOVATE-logo.png',
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
  './public/images/pwa-icon-192.png',
  './public/images/pwa-icon-512.png',
  './public/locales/cs-CZ.json',
  './public/locales/de-DE.json',
  './public/locales/el-CY.json',
  './public/locales/el-GR.json',
  './public/locales/en-GB.json',
  './public/locales/es-ES.json',
  './public/locales/fr-FR.json',
  './public/locales/it-IT.json',
  './public/locales/nl-BE.json',
  './public/locales/nl-NL.json',
  './public/locales/pl-PL.json',
  './public/locales/pt-PT.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('SW Cache item skipped:', err));
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
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
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
