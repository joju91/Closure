/* Efterplan - Service Worker */
const CACHE = 'efterplan-v14';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon.svg',
  './favicon.png',
  './og.png',
  './robots.txt',
  './sitemap.xml',
  './checklista-dodsbo.html',
  './bouppteckning-guide.html',
  './vad-gora-nar-nagon-dor.html',
  './vad-kostar-en-begravning.html',
  './arvskifte-guide.html',
  './efterlevandepension.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(e.request).then((cached) => {
          if (cached) return cached;
          return fetch(e.request)
            .then((resp) => {
              cache.put(e.request, resp.clone());
              return resp;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type !== 'CHECKPOINT_NOTIFY') return;

  const day = Number(data.day || 0);
  const title = data.title || `Efterplan checkpoint dag ${day}`;
  const body =
    data.body ||
    'Kort påminnelse: ta nästa steg i planen nar du har ork.';

  self.registration.showNotification(title, {
    body,
    tag: `checkpoint-${day}`,
    renotify: false,
    icon: './favicon.png',
    badge: './icon.svg',
    data: { url: './#screen-plan' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './#screen-plan';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
      return undefined;
    })
  );
});
