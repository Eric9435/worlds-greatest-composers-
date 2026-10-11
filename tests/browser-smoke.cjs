"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
const files=new Set(["index.html","app.js","reader.js","portraits.js","composer-portraits.webp","history.js","chapters-eras.js","chapters-composers-1.js","chapters-composers-2.js","chapters-composers-3.js","chapters-composers-4.js","sw.js","manifest.webmanifest","icon.svg"]);
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
  const bachTile=page.getByRole("button",{name:"Read about Johann Sebastian Bach"});
  assert.ok(await bachTile.count());
  assert.ok(await bachTile.locator('img.composer-portrait-sprite').count());
  await bachTile.click();
  assert.ok(await page.getByRole("heading",{name:"Johann Sebastian Bach"}).count());
  await page.getByRole("button",{name:"Back to library"}).click();
  await page.getByRole("button",{name:"Read full chapter"}).first().click();
  assert.ok(await page.getByRole("heading",{name:"Sources and the limits of evidence"}).count());
  assert.ok(await page.getByText("Music existed long before surviving musical notation.",{exact:false}).count());
  await page.getByRole("button",{name:"မြန်မာ"}).click();
  assert.equal(await page.locator("html").getAttribute("lang"),"my");
  assert.ok(await page.getByRole("heading",{name:"အထောက်အထားနှင့် သမိုင်းလေ့လာမှုကန့်သတ်ချက်"}).count());
  await page.getByRole("button",{name:"EN",exact:true}).click();
  await page.getByRole("button",{name:"Back to library"}).click();
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
  await page.getByRole("button",{name:"Read profile"}).click();
  assert.ok(await page.getByRole("img",{name:/Wolfgang Amadeus Mozart.*AI-generated artistic illustration/}).count());

  assert.ok(await page.getByText("Piano Concerto No. 21").count());
  await page.getByRole("button",{name:"မြန်မာ"}).click();
  assert.equal(await page.locator("html").getAttribute("lang"),"my");
  await page.getByRole("button",{name:"ကိုးကားချက်"}).click();
  assert.ok(await page.getByText("Open Music Theory (Viva Pressbooks)").count());
  assert.deepEqual(errors,[]);
  console.log("Chromium mobile smoke test passed");
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
