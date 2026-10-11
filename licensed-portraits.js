"use strict";
/* Online, license-checked portrait enhancement.
   Wikidata P18 identifies an image for a specific composer; Commons imageinfo
   supplies a high-resolution thumbnail, author and licensing information.
   No Wikimedia imagery is assumed public domain. Offline fallback always remains.
   Only data from known Wikimedia HTTPS hosts is displayed. */
(function(){
 if(typeof window==="undefined"||typeof document==="undefined"||typeof fetch!=="function")return;
 const wikiNames={
  "Hildegard von Bingen":"Hildegard of Bingen",
  "Guillaume Dufay":"Guillaume Du Fay",
  "C. P. E. Bach":"Carl Philipp Emanuel Bach"
 };
 const photos=new Map();
 const normalizeFile=s=>String(s||"").replace(/_/g," ").replace(/^File:/i,"").trim();
 const validWikiImage=url=>{
  try{
   const u=new URL(url);
   return u.protocol==="https:"&&u.hostname==="upload.wikimedia.org";
  }catch(_){return false}
 };
 const validPage=url=>{
  try{const u=new URL(url);return u.protocol==="https:"&&u.hostname==="commons.wikimedia.org"}catch(_){return false}
 };
 function textOnly(raw){
  try{const d=new DOMParser().parseFromString(String(raw||""),"text/html");return(d.body.textContent||"").replace(/\s+/g," ").trim().slice(0,130)}catch(_){return""}
 }
 function approvedLicense(name){
  return /^(?:CC BY(?:-SA)?(?:\s|\-|$)|CC0(?:\s|$)|Public domain(?:\s|$)|PD(?:\-|\s|$))/i.test(String(name||""));
 }
 const chunks=(arr,n)=>{const output=[];for(let i=0;i<arr.length;i+=n)output.push(arr.slice(i,i+n));return output};
 async function mediaWikiJson(url){
  const response=await fetch(url,{mode:"cors",credentials:"omit",referrerPolicy:"no-referrer"});
  if(!response.ok)throw Error("Wikimedia service "+response.status);
  return response.json();
 }
 async function loadLicensedPortraits(){
  const records=typeof composers!=="undefined"?composers.map(c=>c.name):[];
  const requested=new Map(records.map(name=>[wikiNames[name]||name,name]));
  const commonsFiles=new Map();
  for(const titles of chunks([...requested.keys()],25)){
   const args=new URLSearchParams({action:"wbgetentities",sites:"enwiki",titles:titles.join("|"),props:"claims|sitelinks",sitefilter:"enwiki",format:"json",origin:"*"});
   const result=await mediaWikiJson("https://www.wikidata.org/w/api.php?"+args);
   for(const entity of Object.values(result.entities||{})){
    const wikiTitle=entity?.sitelinks?.enwiki?.title;
    const composerName=requested.get(wikiTitle);
    const file=entity?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
    if(composerName&&typeof file==="string"&&file.length<300)commonsFiles.set(normalizeFile(file),composerName);
   }
  }
  /* Wikidata P18 is absent for some biographies. English Wikipedia pageimages
     can supply another *filename*; it still must pass Commons license checks. */
  const alreadyCovered=new Set(commonsFiles.values());
  const missingPages=[...requested.entries()].filter(([,composer])=>!alreadyCovered.has(composer));
  for(const batch of chunks(missingPages,20)){
   try{
    const args=new URLSearchParams({action:"query",prop:"pageimages",piprop:"name",titles:batch.map(e=>e[0]).join("|"),format:"json",origin:"*"});
    const result=await mediaWikiJson("https://en.wikipedia.org/w/api.php?"+args);
    for(const page of Object.values(result.query?.pages||{})){
     const composer=requested.get(page.title);
     const file=page.pageimage;
     if(composer&&typeof file==="string"&&file.length<300){
      const normalized=normalizeFile(file);
      if(!commonsFiles.has(normalized))commonsFiles.set(normalized,composer);
     }
    }
   }catch(_){/* A blocked Wikipedia request never prevents P18 portraits. */}
  }
  for(const names of chunks([...commonsFiles.keys()],12)){
   const args=new URLSearchParams({action:"query",prop:"imageinfo",titles:names.map(n=>"File:"+n).join("|"),iiprop:"url|extmetadata",iiurlwidth:"1000",format:"json",origin:"*"});
   const result=await mediaWikiJson("https://commons.wikimedia.org/w/api.php?"+args);
   for(const page of Object.values(result.query?.pages||{})){
    const composerName=commonsFiles.get(normalizeFile(page.title));
    const info=page.imageinfo?.[0]; if(!composerName||!info)continue;
    const imageUrl=info.thumburl||info.url;
    const imagePage=info.descriptionurl;
    const license=info.extmetadata?.LicenseShortName?.value||"";
    const artist=textOnly(info.extmetadata?.Artist?.value);
    const licenseUrl=info.extmetadata?.LicenseUrl?.value||"";
    if(!validWikiImage(imageUrl)||!validPage(imagePage)||!approvedLicense(license))continue;
    if(/^CC BY/i.test(license)&&!artist)continue;
    const safeLicenseUrl=licenseUrl&&/^https:\/\/(?:creativecommons\.org|www\.creativecommons\.org|commons\.wikimedia\.org)\//i.test(licenseUrl)?licenseUrl:imagePage;
    photos.set(composerName,{imageUrl,imagePage,artist:artist||"Creator unknown",license,licenseUrl:safeLicenseUrl});
   }
  }
  return photos;
 }
 const enriched=new WeakSet();
 function enhanceVisiblePortraits(){
  for(const visual of document.querySelectorAll(".composer-visual[data-composer]")){
   if(enriched.has(visual))continue;
   const metadata=photos.get(visual.getAttribute("data-composer"));
   if(!metadata)continue;
   const portrait=visual.querySelector(".composer-portrait");
   if(!portrait)continue;
   enriched.add(visual);
   const img=document.createElement("img");
   img.className="commons-portrait";
   img.alt=visual.getAttribute("data-composer")+" — Wikimedia Commons artwork or portrait";
   img.loading=visual.closest(".reading-window")?"eager":"lazy";
   img.decoding="async";
   img.referrerPolicy="no-referrer";
   img.onload=()=>{
    portrait.classList.add("commons-photo-loaded");
    // Accessible image and credit replace the stale low-resolution illustration.
    const original=portrait.querySelector(".composer-portrait-sprite");
    if(original)original.setAttribute("aria-hidden","true");
    const oldDisclaimer=visual.querySelector(".portrait-disclaimer");
    if(oldDisclaimer)oldDisclaimer.textContent="Wikimedia Commons · "+metadata.license;
    const label=document.createElement("span");
    label.className="commons-portrait-credit";
    label.textContent=(metadata.artist+" · "+metadata.license).slice(0,170);
    label.title=metadata.imagePage;
    visual.appendChild(label);
    // Composer chapter artwork is not inside a button and supports linked attribution.
    if(!visual.closest("button")){
     const link=document.createElement("a");
     link.className="commons-portrait-source";
     link.href=metadata.imagePage;
     link.target="_blank";link.rel="noopener noreferrer";
     link.textContent="Wikimedia Commons · "+metadata.license;
     visual.appendChild(link);
     const terms=document.createElement("a");
     terms.className="commons-portrait-license";
     terms.href=metadata.licenseUrl;
     terms.target="_blank";terms.rel="noopener noreferrer";
     terms.textContent="License terms ↗";
     visual.appendChild(terms);
    }
   };
   img.onerror=()=>{img.remove();enriched.delete(visual)};
   portrait.appendChild(img);
   img.src=metadata.imageUrl;
  }
 }
 let framePending=false;
 function scheduleUpdate(){
  if(framePending)return;framePending=true;
  window.requestAnimationFrame(()=>{framePending=false;enhanceVisiblePortraits()});
 }
 // Catch navigation without making requests on every render.
 const observer=new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes){
   if(node.nodeType===1&&(node.matches?.(".composer-visual")||node.querySelector?.(".composer-visual"))){
    scheduleUpdate();return;
   }
  }
 });
 observer.observe(document.body,{childList:true,subtree:true});
 loadLicensedPortraits().then(()=>scheduleUpdate()).catch(err=>{console.info("Wikimedia portrait enhancement unavailable; local artwork retained.")});
})();
