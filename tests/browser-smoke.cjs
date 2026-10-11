"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
const files=new Set(["index.html","app.js","extended-context.js","composer-expansion.js","advanced-musicology.js","biographies-a.js","biographies-b.js","biographies-c.js","biographies-d.js","biography-sources.js","composer-atlas-1.js","composer-atlas-2.js","composer-atlas-3.js","composer-atlas-4.js","composer-chronology.js","reader.js","works-catalogue.js","portraits.js","licensed-portraits.js","composer-portraits.webp","history.js","chapters-eras.js","chapters-composers-1.js","chapters-composers-2.js","chapters-composers-3.js","chapters-composers-4.js","sw.js","manifest.webmanifest","icon.svg"]);
const server=http.createServer((req,res)=>{
 const file=req.url==="/"?"index.html":decodeURIComponent(req.url.slice(1).split("?")[0]);
 if(!files.has(file)){res.writeHead(404);return res.end();}
 fs.readFile(path.join(root,file),(err,bytes)=>{
  if(err){res.writeHead(404);return res.end();}
  res.writeHead(200,{"content-type":file.endsWith(".html")?"text/html; charset=utf-8":file.endsWith(".js")?"text/javascript; charset=utf-8":file.endsWith(".svg")?"image/svg+xml":file.endsWith(".webp")?"image/webp":"application/manifest+json"});
  res.end(bytes);
 });
});
(async()=>{
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];
  page.on("pageerror",err=>errors.push(err.message));
  await page.goto("http://127.0.0.1:"+server.address().port,{waitUntil:"networkidle"});
  assert.equal(await page.locator("#composerCount").textContent(),"52");
  assert.equal(await page.locator("#eraCount").textContent(),"8");
  assert.ok(await page.locator('.era-composer-tile').count()>15);
  assert.ok(await page.locator('.composer-visual[data-composer]').count()>30);
  const bachTile=page.getByRole("button",{name:"Read about Johann Sebastian Bach"});
  assert.ok(await bachTile.count());
  assert.ok(await bachTile.locator('img.composer-portrait-sprite').count());
  await bachTile.click();
  assert.ok(await page.getByRole("heading",{name:"Johann Sebastian Bach"}).count(),"Bach visible debug: "+JSON.stringify(await page.evaluate(()=>{const h=document.querySelector("#readingWindow .reading-header h2"),a=h?.closest(".reading-article"),header=h?.closest(".reading-header"),p=document.querySelector(".reading-window-panel");return{html:h?.outerHTML,articleClass:a?.className,articleDisplay:getComputedStyle(a).display,headingDisplay:getComputedStyle(h).display,headerDisplay:getComputedStyle(header).display,headerVisibility:getComputedStyle(header).visibility,headingRect:h?.getBoundingClientRect().toJSON(),panelRect:p?.getBoundingClientRect().toJSON(),ariaHidden:h?.closest("[aria-hidden]")?.outerHTML?.slice(0,80)}}))+" errors="+JSON.stringify(errors));
  assert.equal(await page.locator("#readingWindow[role=dialog]").count(),1);
  assert.equal(await page.evaluate(()=>document.body.classList.contains("reader-window-open")),true);
  await page.locator("#readingWindow .reading-window-close").click();
  await page.getByRole("button",{name:"Timeline"}).click();
  await page.getByRole("button",{name:"Read full chapter"}).first().click();
  assert.ok(await page.getByRole("heading",{name:"Sources and the limits of evidence"}).count());
  assert.ok(await page.getByText("Music existed long before surviving musical notation.",{exact:false}).count());
  assert.equal(await page.locator("#readingWindow #readerTopicSelect").count(),1);
  await page.locator("#readingWindow #readerTopicSelect").selectOption("1");
  assert.equal(await page.locator("#readingWindow .reader-topic-section:not(.is-inactive-topic)").count(),1);
  assert.equal(await page.locator("#readingWindow .reader-topic-section[data-topic-index='1'].is-inactive-topic").count(),0);
  await page.locator("#readingWindow .reading-window-lang button").nth(1).click();
  assert.equal(await page.locator("html").getAttribute("lang"),"my");
  assert.equal(await page.locator("#readingWindow #readerTopicSelect").inputValue(),"1");
  assert.equal(await page.locator("#readingWindow .reader-topic-section:not(.is-inactive-topic)").count(),1);
  await page.locator("#readingWindow .reading-window-close").click();
  await page.getByRole("button",{name:"EN",exact:true}).click();
  await page.getByRole("button",{name:"Composers",exact:true}).click();
  await page.getByRole("textbox",{name:"Search composers"}).fill("Mozart");
  assert.equal(await page.getByText("Johann Sebastian Bach").count(),0);
  assert.ok(await page.getByText("Wolfgang Amadeus Mozart").count());

  assert.equal(await page.locator('.composer-gallery-card .composer-portrait-sprite').count(),1);
  const portrait=page.locator('.composer-gallery-card .composer-portrait-sprite');
  assert.match(await portrait.getAttribute("src"),/composer-portraits\.webp\?v=9/);
  assert.match(await portrait.getAttribute("style"),/translate\(-60%,-0%\)/);
  const decoded=await portrait.evaluate(async image=>{
    try{await image.decode()}catch(err){return {error:String(err),src:image.currentSrc}}
    const rectangle=image.parentElement.getBoundingClientRect();
    return {complete:image.complete,width:image.naturalWidth,height:image.naturalHeight,rectWidth:rectangle.width,rectHeight:rectangle.height};
  });
  assert.deepEqual(decoded.error,undefined,"Image decode failed: "+JSON.stringify(decoded));
  assert.equal(decoded.complete,true);
  assert.ok(decoded.width>=500 && decoded.height>=200,"Invalid portrait dimensions: "+JSON.stringify(decoded));
  assert.ok(decoded.rectWidth>90 && decoded.rectHeight>90,"Invisible portrait frame: "+JSON.stringify(decoded));
  const assetResponse=await page.request.get("http://127.0.0.1:"+server.address().port+"/composer-portraits.webp");
  assert.equal(assetResponse.status(),200);
  assert.match(assetResponse.headers()["content-type"],/image\/webp/);
  assert.equal((await assetResponse.body()).subarray(8,12).toString(),"WEBP");
  await page.getByRole("button",{name:/^Biography/}).click();
  assert.ok(await page.getByRole("img",{name:/Wolfgang Amadeus Mozart.*AI-generated artistic illustration/}).count());

  assert.ok(await page.getByText("Piano Concerto No. 21").count());
  const mozartAtlas=page.locator("#readingWindow #readerTopicSelect option").filter({hasText:"Life chronology"});
  assert.equal(await mozartAtlas.count(),1);
  await page.locator("#readingWindow #readerTopicSelect").selectOption("2");
  assert.ok(await page.locator("#readingWindow .reader-topic-section:not(.is-inactive-topic)").textContent().then(x=>x.includes("1781")));
  await page.locator("#readingWindow #readerTopicSelect").selectOption("3");
  assert.ok(await page.locator("#readingWindow .reader-topic-section:not(.is-inactive-topic)").textContent().then(x=>x.includes("The Marriage of Figaro")));

  await page.locator("#readingWindow .reading-window-lang button[data-lang='my']").click();
  assert.equal(await page.locator("html").getAttribute("lang"),"my");
  await page.locator("#readingWindow .reading-window-close").click();
  await page.getByRole("button",{name:"ကိုးကားချက်"}).click();
  assert.ok(await page.getByText("Open Music Theory (Viva Pressbooks)").count());
  assert.deepEqual(errors,[]);
  // Exercise online high-resolution portrait enrichment without depending on Wikimedia uptime.
  const portraitPage=await browser.newPage({viewport:{width:390,height:844}});
  await portraitPage.route("https://www.wikidata.org/w/api.php?**",async route=>{
   await route.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},
    body:JSON.stringify({entities:{Q1339:{sitelinks:{enwiki:{title:"Johann Sebastian Bach"}},
     claims:{P18:[{mainsnak:{datavalue:{value:"Bach-test.png"}}}]}}}})});
  });
  await portraitPage.route("https://commons.wikimedia.org/w/api.php?**",async route=>{
   await route.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},
    body:JSON.stringify({query:{pages:{12:{title:"File:Bach-test.png",imageinfo:[{
      thumburl:"https://upload.wikimedia.org/mock/Bach-test.png",
      descriptionurl:"https://commons.wikimedia.org/wiki/File:Bach-test.png",
      extmetadata:{
       LicenseShortName:{value:"CC BY-SA 4.0"},
       Artist:{value:"Example Artist"},
       LicenseUrl:{value:"https://creativecommons.org/licenses/by-sa/4.0/"}
      }
     }]}}}})});
  });
  await portraitPage.route("https://upload.wikimedia.org/**",async route=>{
   await route.fulfill({status:200,contentType:"image/svg+xml",body:fs.readFileSync(path.join(root,"icon.svg"))});
  });
  await portraitPage.goto("http://127.0.0.1:"+server.address().port,{waitUntil:"networkidle"});
  await portraitPage.getByRole("button",{name:"Read about Johann Sebastian Bach"}).scrollIntoViewIfNeeded();
  await portraitPage.waitForFunction(()=>!!document.querySelector('.composer-visual[data-composer="Johann Sebastian Bach"] .commons-photo-loaded'),null,{timeout:12000});
  const credited=portraitPage.locator('.composer-visual[data-composer="Johann Sebastian Bach"] .commons-portrait-credit');
  assert.ok(await credited.count(),"Wikimedia image credit should be present");
  assert.match(await credited.first().textContent(),/Example Artist/);
  await portraitPage.getByRole("button",{name:"Read about Johann Sebastian Bach"}).click();
  await portraitPage.locator("#readingWindow .commons-portrait-source").first().waitFor({timeout:10000});
  assert.match(await portraitPage.locator("#readingWindow .commons-portrait-license").first().getAttribute("href"),/creativecommons.org\/licenses\/by-sa\/4.0/);
  await portraitPage.close();
  console.log("Attribution and remote-image fallback integration passed");

  // Deterministic Open Opus integration: an opus number opens its numbered works,
  // then a selected work opens its movement details without scrolling the page.
  const worksPage=await browser.newPage({viewport:{width:390,height:844}});
  await worksPage.route("https://api.openopus.org/**",async route=>{
   const u=route.request().url();
   let data={};
   if(u.includes("/composer/list/search/beethoven.json")){
    data={composers:[{id:"145",complete_name:"Ludwig van Beethoven"}]};
   }else if(u.includes("/work/list/composer/145/genre/all.json")){
    data={composer:{id:"145",complete_name:"Ludwig van Beethoven"},works:[
     {id:"16001",title:"Piano Sonata no. 13 in E flat major, op. 27, no. 1",genre:"Keyboard"},
     {id:"16002",title:"Piano Sonata no. 14 in C sharp minor, op. 27, no. 2",genre:"Keyboard"},
     {id:"16003",title:"Piano Sonata no. 8 in C minor, op. 13",genre:"Keyboard"}
    ]};
   }else if(u.includes("/work/detail/")){
    data={work:{id:"16002",subtitle:"Sonata quasi una fantasia"}};
   }
   await route.fulfill({status:200,contentType:"application/json",headers:{"access-control-allow-origin":"*"},body:JSON.stringify(data)});
  });
  await worksPage.goto("http://127.0.0.1:"+server.address().port,{waitUntil:"networkidle"});
  await worksPage.getByRole("button",{name:"Composers",exact:true}).click();
  await worksPage.getByRole("textbox",{name:"Search composers"}).fill("Beethoven");
  await worksPage.getByRole("button",{name:/Works · Op/}).click();
  assert.equal(await worksPage.locator("#worksCatalogueWindow[role=dialog]").count(),1);
  await worksPage.getByText("3 Open Opus entries").first().waitFor();
  await worksPage.locator(".works-family-card").filter({hasText:"Op."}).first().click();
  await worksPage.locator(".works-group-card").filter({hasText:"Op. 27"}).first().click();
  assert.ok(await worksPage.locator(".works-work-card").count()>=2);
  await worksPage.locator(".works-work-card").filter({hasText:"Moonlight"}).click();
  assert.ok(await worksPage.locator(".works-detail").getByText("I. Adagio sostenuto").count());
  assert.ok(await worksPage.locator(".works-detail").getByText("III. Presto agitato").count());
  assert.equal(await worksPage.evaluate(()=>document.body.classList.contains("reader-window-open")),true);
  await worksPage.locator(".works-window-done").click();
  assert.equal(await worksPage.locator("#worksCatalogueWindow").count(),0);
  assert.ok(await worksPage.locator("#readingWindow").count());
  await worksPage.locator("#readingWindow .reading-window-close").click();
  assert.ok(await worksPage.getByRole("textbox",{name:"Search composers"}).count());
  await worksPage.close();
  console.log("Opus hierarchy and nested iPhone window browser test passed");
  console.log("Chromium mobile smoke test passed");
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
