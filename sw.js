/* ============================================
   Reborn Infinity - sw.js
   Service Worker（オフラインキャッシュ）
   ============================================ */

const CACHE_NAME = 'reborn-infinity-v1';

const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/reset.css',
  './css/variables.css',
  './css/fonts.css',
  './css/layout.css',
  './css/header.css',
  './css/sidebar.css',
  './css/tabs.css',
  './css/buttons.css',
  './css/cards.css',
  './css/panels.css',
  './css/progressBars.css',
  './css/tooltips.css',
  './css/animations.css',
  './css/effects.css',
  './css/themes/default.css',
];

// インストール時：キャッシュ登録
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

// アクティベート時：古いキャッシュ削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// フェッチ時：キャッシュ優先
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
