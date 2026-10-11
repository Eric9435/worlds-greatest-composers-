"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.join(__dirname,"..");
const read=name=>fs.readFileSync(path.join(root,name),"utf8");
function startApp(){
 const ids=["en","my","subtitle","heroTitle","heroText","eraCount","composerCount","eraLabel","composerLabel","copyright","tabs","content"];
 const els=Object.fromEntries(ids.map(id=>[id,{innerHTML:"",textContent:"",classList:{toggle(){}},setAttribute(){}}]));
 const storage=new Map();
 const document={documentElement:{lang:"en"},activeElement:null,getElementById:id=>els[id]||null,querySelector:()=>({focus(){},setSelectionRange(){}})};
 const ctx=vm.createContext({document,localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},console});
 vm.runInContext(read("chapters-eras.js"),ctx,{filename:"chapters-eras.js"});
 vm.runInContext(read("chapters-composers-1.js"),ctx,{filename:"chapters-composers-1.js"});
 vm.runInContext(read("chapters-composers-2.js"),ctx,{filename:"chapters-composers-2.js"});
 vm.runInContext(read("chapters-composers-3.js"),ctx,{filename:"chapters-composers-3.js"});
 vm.runInContext(read("chapters-composers-4.js"),ctx,{filename:"chapters-composers-4.js"});
 vm.runInContext(read("reader.js"),ctx,{filename:"reader.js"});
 vm.runInContext(read("app.js"),ctx,{filename:"app.js"});
 vm.runInContext(read("history.js"),ctx,{filename:"history.js"});
 return {ctx,els,storage,document};
}
test("startup renders a complete history view with 8 eras and 52 composers",()=>{
 const {ctx,els}=startApp();
 assert.equal(els.eraCount.textContent,8);
 assert.equal(els.composerCount.textContent,52);
 assert.match(els.content.innerHTML,/Ancient &amp; Early Traditions/);
 assert.equal(vm.runInContext("composers.length",ctx),52);
});
test("English and Myanmar switching works and saves language",()=>{
 const {ctx,els,document,storage}=startApp();
 vm.runInContext('setLang("my")',ctx);
 assert.equal(document.documentElement.lang,"my");
 assert.equal(storage.get("pfa-lang"),"my");
 assert.match(els.heroTitle.textContent,/ဂီတသမိုင်း/);
 vm.runInContext('setLang("en")',ctx);
 assert.equal(document.documentElement.lang,"en");
});
test("composer search and era filtering operate on complete dataset",()=>{
 const {ctx,els}=startApp();
 vm.runInContext('setTab("composers")',ctx);
 assert.match(els.content.innerHTML,/Johann Sebastian Bach/);
 vm.runInContext('setSearch("Mozart")',ctx);
 assert.match(els.content.innerHTML,/Wolfgang Amadeus Mozart/);
 assert.doesNotMatch(els.content.innerHTML,/Johann Sebastian Bach/);
 vm.runInContext('setSearch("");setEra("baroque")',ctx);
 assert.match(els.content.innerHTML,/Johann Sebastian Bach/);
 assert.doesNotMatch(els.content.innerHTML,/Wolfgang Amadeus Mozart/);
});
test("composer profile opens and references remain separate",()=>{
 const {ctx,els}=startApp();
 vm.runInContext('setTab("composers")',ctx);
 const bach=vm.runInContext('composers.find(c=>c.name==="Johann Sebastian Bach").id',ctx);
 vm.runInContext("selectItem("+bach+")",ctx);
 assert.match(els.content.innerHTML,/The Well-Tempered Clavier/);
 vm.runInContext('setTab("references")',ctx);
 assert.match(els.content.innerHTML,/Open Music Theory/);
 assert.match(els.content.innerHTML,/noopener noreferrer/);
});
test("history-only build has no reachable theory or quiz navigation",()=>{
 const {els}=startApp();
 assert.doesNotMatch(els.tabs.innerHTML,/Theory|Quiz/);
 assert.doesNotMatch(read("app.js"),/lessonLabel|if\(tab==="theory"\)|if\(tab==="quiz"\)/);
 const html=read("index.html"),sw=read("sw.js"),manifest=JSON.parse(read("manifest.webmanifest"));
 for(const asset of ["app.js","history.js","manifest.webmanifest"]){
   assert.ok(html.includes(asset),"HTML missing "+asset);
   assert.ok(sw.includes(asset),"cache missing "+asset);
 }
 assert.match(manifest.description,/music history/i);
});

test("every historical era has long English and Myanmar sections",()=>{
 const {ctx}=startApp();
 const stats=vm.runInContext('Object.values(eraChapters).map(x=>x.sections.map(s=>[s[2].length,s[3].length]))',ctx);
 assert.equal(stats.length,8);
 for(const sections of stats){
  assert.ok(sections.length>=4);
  assert.ok(sections.reduce((n,x)=>n+x[0],0)>1400);
  assert.ok(sections.reduce((n,x)=>n+x[1],0)>1000);
 }
});
test("all 52 distinct composers have genuinely expanded bilingual profiles",()=>{
 const {ctx}=startApp();
 const cover=vm.runInContext('composers.map(c=>({name:c.name,study:composerChapters[c.name]}))',ctx);
 assert.equal(cover.length,52);
 const unique=new Set();
 for(const item of cover){
  unique.add(item.name);
  assert.ok(item.study,item.name+" missing full study");
  assert.equal(item.study.sections.length,3,item.name);
  const en=item.study.sections.map(s=>s[2]).join(" ");
  const my=item.study.sections.map(s=>s[3]).join(" ");
  assert.ok(en.length>850,item.name+" English chapter too short");
  assert.ok(my.length>500,item.name+" Myanmar chapter too short");
 }
 assert.equal(unique.size,52);
});
test("read a complete era chapter and return to timeline",()=>{
 const {ctx,els}=startApp();
 vm.runInContext('showEra("baroque")',ctx);
 assert.match(els.content.innerHTML,/Basso continuo and tonal direction/);
 assert.match(els.content.innerHTML,/Academic reading and verification/);
 assert.match(els.content.innerHTML,/Return to chapter library/);
 vm.runInContext('closeReading()',ctx);
 assert.match(els.content.innerHTML,/Music through history/);
});
test("read a full composer chapter in both languages",()=>{
 const {ctx,els}=startApp();
 const id=vm.runInContext('composers.find(x=>x.name==="Ludwig van Beethoven").id',ctx);
 vm.runInContext("showComposer("+id+")",ctx);
 assert.match(els.content.innerHTML,/32 numbered piano sonatas/);
 assert.match(els.content.innerHTML,/Major works and listening analysis/);
 vm.runInContext('setLang("my")',ctx);
 assert.match(els.content.innerHTML,/ဘဝနှင့် သမိုင်းနောက်ခံ/);
 assert.match(els.content.innerHTML,/Symphony No. 5/);
});
