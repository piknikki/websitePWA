var CACHE_STATIC_NAME = 'static-v5';
var CACHE_DYNAMIC_NAME = 'dynamic-v5';


self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
                console.log('[Service Worker] Precaching App Shell');

                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/js/app.js',
                    '/src/css/style2.css',
                    '/src/images/burgers.png',
                    '/src/images/clickgame.png',
                    '/src/images/crystal.png',
                    '/src/images/curve-doubleLeft.png',
                    '/src/images/curve-singleRightLight.png',
                    '/src/images/eventsearch.png',
                    '/src/images/nikkinnorway.png',
                    '/src/images/sociallyawkward.png',
                    '/src/images/trains.png',
                    'https://fonts.googleapis.com/css?family=Open+Sans|Patrick+Hand&display=swap',
                    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
                ]);
            })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[service worker] Activating service worker . . . ', event);
    console.log('works up to this point');
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (key !== CACHE_STATIC_NAME) {
                        console.log("[service worker] removing old cache.", key);
                        return caches.delete(key);
                    }
                }));
            })
    )
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
                    return fetch(event.request) // if not in cache, get it.
                        .then(function(res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone()); // use clone bc it's used up on response
                                    return res;
                                })
                        })
                        .catch(function(err) {

                        });
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