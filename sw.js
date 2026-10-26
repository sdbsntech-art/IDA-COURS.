const CACHE_PREFIX = "sdbsn-codes-shell";
const CACHE_NAME = `${CACHE_PREFIX}-v1`;
const PRECACHE_FILES = [
    "./",
    "./index.html",
    "./index.htm",
    "./root-redirect.js",
    "./offline.html",
    "./manifest.webmanifest",
    "./pwa.js",
    "./pwa.css",
    "./legal-pages.css",
    "./style.css",
    "./style.js",
    "./mention_legale.html",
    "./condiotion.htm",
    "./plitiquedeconfi.html",
    "./assettes/sdbsn.png",
    "./assettes/app-icon-192.png",
    "./assettes/app-icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok && response.type === "basic") {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(async () => {
                    const cachedPage = await caches.match(request, { ignoreSearch: true });
                    return cachedPage || caches.match("./offline.html");
                })
        );
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => cachedResponse || fetch(request).then((response) => {
                if (response.ok && response.type === "basic") {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            }))
    );
});
