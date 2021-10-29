const staticCacheName = "site-static";
const dynamicCacheName = "site-dynamic-v1";
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
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.7642348183103!2d75.76031841495913!3d22.5505028851942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x90e60767ffa5196a!2sThe%20Bug%20Community!5e0!3m2!1sen!2sin!4v1635234793517!5m2!1sen!2sin",
];

self.addEventListener("install", (evt) => {
  //   console.log('helo');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//Activate servie worker
self.addEventListener("activate", (evt) => {
  //   console.log('ddd');
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && dynamicCacheNameName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//Fetch Event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1)
          return caches.match("/Pages/notfound.html");
      })
  );
});
