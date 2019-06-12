self.addEventListener('install', function(event) {
    // console.log('[service worker] Installing service worker . . . ', event);

    // open the cache
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
              // console.log('[service worker] precaching app shell');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/css/style2.css'
                ])
            }))
});

self.addEventListener('activate', function(event) {
    // console.log('[service worker] Activating service worker . . . ', event);
    return self.clients.claim();
});

// fetch works as a network proxy, assures that it always has data
self.addEventListener('fetch', function(event) {
    // console.log('[service worker] Fetching something . . . ', event);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response; // return value from cache
                } else {
                    return fetch(event.request); // if not in cache, get it.
                }
            })
    );
});

// using fetch because ajax doesn't work in service workers

// // using httpbin to test out fetch promises (get requests)
// fetch('https://httpbin.org/ip')
//     .then(function(response) {
//         console.log(response);
//         return response.json(); // need to parse data before it can be used later
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(err) {
//         console.log(err);
//     });


// // using httpbin to test out fetch promises (post requests)
// // putting options into parameters
// fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify({message: 'does this work?'})
// })
//     .then(function(response) {
//         console.log(response);
//         return response.json(); // need to parse data before it can be used later
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(err) {
//         console.log(err);
//     });


// console.log('this is another  new service worker');