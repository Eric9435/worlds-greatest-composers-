"use strict";
const CACHE="pfa-history-v25";
const ASSETS=["./","./index.html","./app-theme.css","./pfa-brand-theme.css","./ios-mobile-polish.css","./pfa-brand-mark.svg","./pfa-brand-original.webp","./pfa-home-poster.webp","./chapters-eras.js","./chapters-composers-1.js","./chapters-composers-2.js","./chapters-composers-3.js","./chapters-composers-4.js","./extended-context.js","./composer-expansion.js","./advanced-musicology.js","./biographies-a.js","./biographies-b.js","./biographies-c.js","./biographies-d.js","./biography-sources.js","./composer-atlas-1.js","./composer-atlas-2.js","./composer-atlas-3.js","./composer-atlas-4.js","./composer-chronology.js","./reader.js","./licensed-portraits.js","./works-catalogue.js","./portraits.js","./composer-portraits.webp?v=9","./composer-portraits-42.svg?v=1","./app.js","./history.js","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("pfa-history-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(response=>{
  if(response.ok){
   const copy=response.clone();
   event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));
  }
  return response;
 }).catch(()=>caches.match(event.request)));
});
