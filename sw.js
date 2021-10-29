const staticCacheName = "site-static";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/js/main.js",
  "/js/pwa.js",
  "/css/style.css",
  "/assets/img/about.png",
  "/assets/img/design.png",
  "/assets/img/hero-img.png",
  "/assets/img/logo.png",
  "/assets/img/logo-2.png",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
  "https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css",
  "/Pages/notfound.html",
];

self.addEventListener("install", (evt) => {
  //   console.log('helo');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("done cache");
      cache.addAll(assets);
    })
  );
});

//Activate servie worker
self.addEventListener("activate", (evt) => {
  //   console.log('ddd');
});

//Fetch Event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      console.log("nono");
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
