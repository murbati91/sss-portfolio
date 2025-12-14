const CACHE_NAME = 'sss-bahrain-ai-v1.4.0';
const STATIC_CACHE = 'sss-static-v1.4.0';

const staticAssets = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install
self.addEventListener('install', event => {
  console.log('SSS PWA: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', event => {
  console.log('SSS PWA: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>SSS - Offline</title>
                  <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #0F172A; color: white; }
                    .logo { font-size: 2em; color: #3B82F6; margin-bottom: 20px; }
                  </style>
                </head>
                <body>
                  <div class="logo">SSS</div>
                  <h2>You're currently offline</h2>
                  <p>Please check your internet connection.</p>
                  <button onclick="window.location.reload()">Retry</button>
                </body>
                </html>
              `, { headers: { 'Content-Type': 'text/html' } });
            }
            return new Response('Service unavailable', { status: 503 });
          });
      })
  );
});
