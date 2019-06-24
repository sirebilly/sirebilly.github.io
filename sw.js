self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app').then(function(cache) {
      return cache.addAll([
          '/index.html',
          '/src/js/app.js',
          '/src/images/icons-192.jpg',
          '/src/images/icons-512.png',
          '/manifest.json',
          '/favicon.ico',
          '/offline.html',
          'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css',
          'https://code.jquery.com/jquery-1.11.1.min.js',
          'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js'
        // etc
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});