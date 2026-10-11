"use strict";
const assert=require("node:assert/strict");
const {chromium}=require("playwright");
const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
const files=new Set(["index.html","app.js","history.js","sw.js","manifest.webmanifest","icon.svg"]);
const server=http.createServer((req,res)=>{
 const file=req.url==="/"?"index.html":decodeURIComponent(req.url.slice(1).split("?")[0]);
 if(!files.has(file)){res.writeHead(404);return res.end();}
 fs.readFile(path.join(root,file),(err,bytes)=>{
  if(err){res.writeHead(404);return res.end();}
  res.writeHead(200,{"content-type":file.endsWith(".html")?"text/html; charset=utf-8":file.endsWith(".js")?"text/javascript; charset=utf-8":file.endsWith(".svg")?"image/svg+xml":"application/manifest+json"});
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
  await page.getByRole("button",{name:"Composers",exact:true}).click();
  await page.getByRole("textbox",{name:"Search composers"}).fill("Mozart");
  assert.equal(await page.getByText("Johann Sebastian Bach").count(),0);
  assert.ok(await page.getByText("Wolfgang Amadeus Mozart").count());
  await page.getByRole("button",{name:"Read profile"}).click();
  assert.ok(await page.getByText("Piano Concerto No. 21").count());
  await page.getByRole("button",{name:"မြန်မာ"}).click();
  assert.equal(await page.locator("html").getAttribute("lang"),"my");
  await page.getByRole("button",{name:"ကိုးကားချက်"}).click();
  assert.ok(await page.getByText("Open Music Theory (Viva Pressbooks)").count());
  assert.deepEqual(errors,[]);
  console.log("Chromium mobile smoke test passed");
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
