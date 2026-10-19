const CACHE_NAME = "htrd-static-v6";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./studio.html",
  "./toolkit.html",
  "./notes.html",
  "./papers.html",
  "./404.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/js/i18n-en.js",
  "./assets/js/i18n-zh.js",
  "./assets/js/i18n-fr.js",
  "./assets/js/field-data.js",
  "./assets/js/paper-data.js",
  "./assets/js/site.js",
  "./assets/js/home.js",
  "./assets/js/studio.js",
  "./assets/js/toolkit.js",
  "./assets/js/notes.js",
  "./assets/js/papers.js",
  "./assets/fonts/cormorant-garamond-latin-400-normal.woff2",
  "./assets/fonts/cormorant-garamond-latin-400-italic.woff2",
  "./assets/fonts/cormorant-garamond-latin-600-normal.woff2",
  "./assets/fonts/cormorant-garamond-latin-700-normal.woff2",
  "./assets/fonts/noto-serif-sc-subset.woff2",
  "./assets/fonts/noto-sans-sc-subset.woff2",
  "./assets/img/brand/home-hero.jpg",
  "./assets/img/brand/module-hero.jpg",
  "./assets/img/brand/icon-48.png",
  "./assets/img/brand/icon-72.png",
  "./assets/img/brand/icon-96.png",
  "./assets/img/brand/icon-128.png",
  "./assets/img/brand/icon-144.png",
  "./assets/img/brand/icon-152.png",
  "./assets/img/brand/icon-192.png",
  "./assets/img/brand/icon-256.png",
  "./assets/img/brand/icon-384.png",
  "./assets/img/brand/icon-512.png",
  "./assets/img/brand/icon-maskable-512.png",
  "./assets/img/brand/apple-touch-icon.png",
  "./assets/img/brand/favicon-64.png",
  "./assets/img/brand/favicon-32.png",
  "./assets/img/brand/favicon-16.png",
  "./assets/img/brand/logo-mark.svg",
  "./assets/img/brand/og-cover.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
