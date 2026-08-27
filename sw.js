/* 
  RENOVATE Serious Game - Official Service Worker Engine (v2.1.4 PWA Hotfix)
  Network-First Strategy for Core App Logic, Automatic Cache Purge & Instant Client Claim
*/

const CACHE_NAME = 'renovate-serious-game-v2.1.4.047';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=2.1.4.047',
  './app.js?v=2.1.4.047',
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

// 1. Service Worker Installation Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS_TO_CACHE.map((asset) => {
          return cache.add(asset).catch((err) => {
            console.warn(`[SW] Optional asset skipped during pre-cache: ${asset}`, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// 2. Service Worker Activation Event (Obsolete Cache Cleanup & Immediate Control Claim)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`[SW] Purging obsolete cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Service Worker Fetch Interception: Network-First for HTML/JS/CSS, Cache-First for static media
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Localhost Development Bypass
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.pathname.includes('/api/')) {
    return event.respondWith(fetch(event.request));
  }

  const isCoreAsset = url.pathname.endsWith('/') || 
                      url.pathname.endsWith('/index.html') || 
                      url.pathname.endsWith('.js') || 
                      url.pathname.endsWith('.css') || 
                      url.pathname.endsWith('.json');

  if (isCoreAsset) {
    // NETWORK-FIRST STRATEGY: Fetch latest from GitHub Pages first, update cache, fallback to cache if offline
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // CACHE-FIRST STRATEGY for Static Media / Images
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
  }
});
