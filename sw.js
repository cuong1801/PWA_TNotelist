const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
    '/',
    '/main.html',
    '/app.js',
    '/assets/img',
    '/assets/js/PWA-NotesList-calendar.js',
    'https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600',
    'https://fonts.googleapis.com/css?family=PT+Serif&display=swap',
    'https://fonts.googleapis.com/css?family=Indie+Flower|PT+Serif&display=swap',
    'https://fonts.googleapis.com/css?family=Indie+Flower|PT+Serif|Shadows+Into+Light&display=swap',
    'https://fonts.googleapis.com/css?family=Indie+Flower|PT+Serif|Satisfy|Shadows+Into+Light&display=swap',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Lato',
    '/assets/css/PWA-NotesList-calendar.css',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
    '/assets/css/index1.css',
    '/assets/js/index1.js',
  ];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          })
        });
      })
    );
  });