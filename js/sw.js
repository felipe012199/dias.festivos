// Nombre del caché
const CACHE_NAME = 'dias-festivos-cache-v1';

// Archivos que vamos a almacenar en la caché
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png',
    '/styles.css', // Si tienes un archivo de estilos
    '/app.js'      // Si tienes un archivo de JavaScript
];

// Instalar el Service Worker y almacenar en caché los archivos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos cacheados durante la instalación');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar las solicitudes y servir los archivos desde la caché (modo offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Si la respuesta está en caché, devolverla
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si no está en caché, hacer la solicitud a la red
                return fetch(event.request);
            })
    );
});
