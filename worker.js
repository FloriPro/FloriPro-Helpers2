// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = ['/', '/index.html'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    //exclude https://192
    if (event.request.url.startsWith('https://192') || event.request.url.startsWith('http://192')) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            if (event.request.url.startsWith('http:')){
                console.warn("fetching http(!) resource",event.request.url)
                return fetch(event.request);
            }

            var f = fetch(event.request);
            f.catch((error) => {
                console.error("could not fetch!",error)
            });
            return f;
        }),
    );
});