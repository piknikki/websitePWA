self.addEventListener('install', function(event) {
    console.log('[service worker] Installing service worker . . . ', event);
});

self.addEventListener('activate', function(event) {
    console.log('[service worker] Activating service worker . . . ', event);
    return self.clients.claim();
});

// fetch works as a network proxy, assures that it always has data
self.addEventListener('fetch', function(event) {
    console.log('[service worker] Fetching something . . . ', event);
    event.respondWith(fetch(event.request));
})

// console.log('this is another  new service worker');