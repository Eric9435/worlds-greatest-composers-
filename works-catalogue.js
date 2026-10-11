"use strict";
/*
 * Piano For ALL — Works Catalogue.
 * Open Opus: https://github.com/openopus-org/openopus_api (public domain data).
 * Its database is curated, NOT the complete scholarly thematic catalogue of every
 * composer. Local biographies and 104 curated work studies remain available offline.
 * A nested screen is used instead of scrolling the entire parent page.
 */
const catalogueAliases={
 "C. P. E. Bach":["Carl Philipp Emanuel Bach"],
 "George Frideric Handel":["George Frideric Handel","Georg Friedrich Handel"],
 "Pyotr Ilyich Tchaikovsky":["Pyotr Ilyich Tchaikovsky","Peter Ilyich Tchaikovsky"],
 "Orlando di Lasso":["Orlando di Lasso","Orlande de Lassus","Orlando di Lassus"],
 "Guillaume Dufay":["Guillaume Dufay","Guillaume Du Fay"],
 "Hildegard von Bingen":["Hildegard von Bingen","Hildegard of Bingen"],
 "Frédéric Chopin":["Frédéric Chopin","Frederic Chopin"],
 "Josquin des Prez":["Josquin des Prez","Josquin Desprez"],
 "Jean-Baptiste Lully":["Jean-Baptiste Lully","Jean Baptiste Lully"]
};
const catalogueSupplement={
 "Ludwig van Beethoven":[
  {title:"Piano Sonata No. 13 in E-flat major, Op. 27 No. 1",genre:"Keyboard",parts:["I. Andante – Allegro – Andante","II. Allegro molto e vivace","III. Adagio con espressione","IV. Allegro vivace"]},
  {title:"Piano Sonata No. 14 in C-sharp minor, Op. 27 No. 2 (Moonlight)",genre:"Keyboard",parts:["I. Adagio sostenuto","II. Allegretto","III. Presto agitato"]}
 ],
 "Frédéric Chopin":[
  {title:"Nocturne in B-flat minor, Op. 9 No. 1",genre:"Keyboard"},
  {title:"Nocturne in E-flat major, Op. 9 No. 2",genre:"Keyboard"},
  {title:"Nocturne in B major, Op. 9 No. 3",genre:"Keyboard"}
 ]
};

/* Authenticated-looking numbering must never be auto-filled from an implied count.
 * Only explicitly listed titles and numbers below are offered while offline.
 * These are additional selected pieces, not exhaustive series/catalogues. */
(function addDocumentedNumberedPieces(){
 const add=(name,titles,genre="Keyboard")=>{
  const entries=catalogueSupplement[name]||(catalogueSupplement[name]=[]);
  for(const title of titles){
   if(!entries.some(w=>catalogueIdentitySafe(w.title)===catalogueIdentitySafe(title))){
    entries.push({title,genre});
   }
  }
 };
 const catalogueIdentitySafe=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
 add("Ludwig van Beethoven",[
  "Piano Sonata No. 1 in F minor, Op. 2 No. 1","Piano Sonata No. 2 in A major, Op. 2 No. 2",
  "Piano Sonata No. 3 in C major, Op. 2 No. 3","Piano Sonata No. 5 in C minor, Op. 10 No. 1",
  "Piano Sonata No. 6 in F major, Op. 10 No. 2","Piano Sonata No. 7 in D major, Op. 10 No. 3",
  "Piano Sonata No. 16 in G major, Op. 31 No. 1","Piano Sonata No. 17 in D minor, Op. 31 No. 2 (Tempest)",
  "Piano Sonata No. 18 in E-flat major, Op. 31 No. 3",
  "Piano Sonata No. 19 in G minor, Op. 49 No. 1","Piano Sonata No. 20 in G major, Op. 49 No. 2"
 ]);
 const etude10=["C major","A minor","E major","C-sharp minor","G-flat major","E-flat minor","C major","F major","F minor","A-flat major","E-flat major","C minor"];
 const etude25=["A-flat major","F minor","F major","A minor","E minor","G-sharp minor","C-sharp minor","D-flat major","G-flat major","B minor","A minor","C minor"];
 const preludes28=["C major","A minor","G major","E minor","D major","B minor","A major","F-sharp minor","E major","C-sharp minor","B major","G-sharp minor","F-sharp major","E-flat minor","D-flat major","B-flat minor","A-flat major","F minor","E-flat major","C minor","B-flat major","G minor","F major","D minor"];
 add("Frédéric Chopin",[
 ...etude10.map((key,i)=>"Étude in "+key+", Op. 10 No. "+(i+1)),
 ...etude25.map((key,i)=>"Étude in "+key+", Op. 25 No. "+(i+1)),
 ...preludes28.map((key,i)=>"Prelude in "+key+", Op. 28 No. "+(i+1))
 ]);
 const kinderszenen=["Von fremden Ländern und Menschen","Kuriose Geschichte","Hasche-Mann","Bittendes Kind","Glückes genug","Wichtige Begebenheit","Träumerei","Am Kamin","Ritter vom Steckenpferd","Fast zu ernst","Fürchtenmachen","Kind im Einschlummern","Der Dichter spricht"];
 add("Robert Schumann",kinderszenen.map((title,i)=>title+", Kinderszenen, Op. 15 No. "+(i+1)));
 const liszt=["Preludio","Molto vivace","Paysage","Mazeppa","Feux follets","Vision","Eroica","Wilde Jagd","Ricordanza","Allegro agitato molto","Harmonies du soir","Chasse-neige"];
 add("Franz Liszt",liszt.map((title,i)=>title+", Transcendental Études, S. 139 No. "+(i+1)));
 add("Johannes Brahms",[
  "Intermezzo in A minor, Op. 118 No. 1","Intermezzo in A major, Op. 118 No. 2",
  "Ballade in G minor, Op. 118 No. 3","Intermezzo in F minor, Op. 118 No. 4",
  "Romanze in F major, Op. 118 No. 5","Intermezzo in E-flat minor, Op. 118 No. 6"
 ]);
 add("Johann Sebastian Bach",[
 "Prelude and Fugue in C major, BWV 846","Prelude and Fugue in C minor, BWV 847",
 "Goldberg Variations, BWV 988"]);
 add("Johann Sebastian Bach",["Mass in B minor, BWV 232"],"Vocal");
 add("Johann Sebastian Bach",[
 "Brandenburg Concerto No. 1, BWV 1046","Brandenburg Concerto No. 2, BWV 1047",
 "Brandenburg Concerto No. 3, BWV 1048","Brandenburg Concerto No. 4, BWV 1049",
 "Brandenburg Concerto No. 5, BWV 1050","Brandenburg Concerto No. 6, BWV 1051"
 ],"Orchestral");
 add("Wolfgang Amadeus Mozart",["Piano Sonata No. 11 in A major, K. 331","Piano Sonata No. 16 in C major, K. 545"]);
 add("Wolfgang Amadeus Mozart",["Piano Concerto No. 21 in C major, K. 467","Piano Concerto No. 23 in A major, K. 488","Symphony No. 40 in G minor, K. 550","Symphony No. 41 in C major, K. 551"],"Orchestral");
 add("George Frideric Handel",["Messiah, HWV 56"],"Vocal");
 add("George Frideric Handel",["Water Music Suite No. 1, HWV 348","Water Music Suite No. 2, HWV 349","Water Music Suite No. 3, HWV 350","Music for the Royal Fireworks, HWV 351"],"Orchestral");
 add("Antonio Vivaldi",[
  "La primavera (Spring), RV 269, Op. 8 No. 1",
  "L'estate (Summer), RV 315, Op. 8 No. 2",
  "L'autunno (Autumn), RV 293, Op. 8 No. 3",
  "L'inverno (Winter), RV 297, Op. 8 No. 4"
 ],"Orchestral");
 add("Franz Schubert",["Winterreise, D. 911"],"Vocal");
 add("Franz Schubert",["Impromptu in C minor, D. 899, Op. 90 No. 1",
 "Impromptu in E-flat major, D. 899, Op. 90 No. 2",
 "Impromptu in G-flat major, D. 899, Op. 90 No. 3",
 "Impromptu in A-flat major, D. 899, Op. 90 No. 4"]);
 add("Joseph Haydn",["Symphony No. 94 in G major, Hob. I:94",
 "Symphony No. 104 in D major, Hob. I:104"],"Orchestral");
 add("Joseph Haydn",["Piano Sonata in E-flat major, Hob. XVI:52"]);
})();
const catalogueMemory=new Map();
const catalogueState={composer:null,works:[],source:"local",view:"families",family:"",group:"",selectedId:"",search:"",genre:"all",busy:false,message:"",requestId:0};
function catalogueIdentity(s){
 return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}
function matchCatalogueComposer(queried,records){
 const aliases=(catalogueAliases[queried]||[queried]).map(catalogueIdentity);
 return (Array.isArray(records)?records:[]).find(c=>
  aliases.includes(catalogueIdentity(c.complete_name||""))&&/^\d+$/.test(String(c.id||""))
 )||null;
}
function catalogueSearchSurname(name){
 return catalogueIdentity(name).split(" ").pop();
}
function parseWorkReference(title){
 const s=String(title||"");
 const patterns=[
  ["Op.",/\b(?:op(?:us)?)[.\s]*([0-9]+[a-z]?)(?!\d)/i],
  ["BWV",/\bBWV\s*([0-9]+[a-z]?)/i],
  ["HWV",/\bHWV\s*([0-9]+[a-z]?)/i],
  ["RV",/\bRV\s*([0-9]+[a-z]?)/i],
  ["K.",/\b(?:K|KV)[.\s]*([0-9]+[a-z]?)/i],
  ["D.",/\bD[.\s]*([0-9]+[a-z]?)/i],
  ["Hob.",/\bHob[.\s]*([IVXLC]+[.:]\s*[0-9]+[a-z]?)/i],
  ["WAB",/\bWAB\s*([0-9]+[a-z]?)/i],
  ["S.",/\bS[.\s]*([0-9]+[a-z]?)/i],
  ["L.",/\bL[.\s]*([0-9]+[a-z]?)/i],
  ["Sz.",/\bSz[.\s]*([0-9]+[a-z]?)/i],
  ["BB",/\bBB\s*([0-9]+[a-z]?)/i],
  ["WWV",/\bWWV\s*([0-9]+[a-z]?)/i],
  ["TWV",/\bTWV\s*([0-9]+[a-z.:]+)/i],
  ["FP",/\bFP[.\s]*([0-9]+[a-z]?)/i],
  ["H.",/\bH[.\s]*([0-9]+[a-z]?)/i],
  ["R.",/\bR[.\s]*([0-9]+[a-z]?)/i],
  ["Catalogue",/\b(?:catalogue|catalog)\s+(\d+)/i]
 ];
 for(const [family,pattern] of patterns){
  const m=s.match(pattern);
  if(!m)continue;
  const end=s.slice(m.index+m[0].length);
  const n=end.match(/^[\s,;:()\-]*(?:no|nr|nº|n°)[.\s]*([0-9]+[a-z]?)/i);
  return {family,number:m[1].replace(/\s+/g,""),subNumber:n?n[1]:null,group:family+" "+m[1].replace(/\s+/g,"")};
 }
 return {family:"Other",number:"",subNumber:null,group:"Without standard number"};
}
function catalogueWork(title,genre,source,id,parts,subtitle){
 const clean=String(title||"").trim().slice(0,260);
 return {id:String(id||"").slice(0,45),title:clean,genre:String(genre||"Other").slice(0,50),
         source,ref:parseWorkReference(clean),parts:Array.isArray(parts)?parts:[],
         subtitle:String(subtitle||"").slice(0,340)};
}
function localCatalogueWorks(composer){
 const atlas=(typeof composerChronologyData!=="undefined"&&composerChronologyData[composer.name])||{works:[]};
 const supplied=catalogueSupplement[composer.name]||[];
 const rows=[
  ...(atlas.works||[]).map((w,i)=>catalogueWork(w[0],"Featured","atlas","a"+i,[],w[1])),
  ...supplied.map((w,i)=>catalogueWork(w.title,w.genre,"supplement","s"+i,w.parts||[])),
 ];
 const distinct=new Map();
 for(const w of rows)distinct.set(catalogueIdentity(w.title),w);
 return [...distinct.values()];
}
function fullCatalogueWorks(remote,local){
 const unique=new Map();
 // Open Opus is the authoritative source for its own listed titles. Keep featured
 // offline notes as supplements; do not artificially inflate the provider count.
 for(const w of remote){
  if(!w||typeof w.title!=="string"||!w.title.trim())continue;
  const key=String(w.id||"").trim();
  if(!/^\d+$/.test(key))continue;
  unique.set("remote:"+key,catalogueWork(w.title,w.genre,"openopus",key,[],w.subtitle));
 }
 for(const w of local){
  if(![...unique.values()].some(x=>catalogueIdentity(x.title)===catalogueIdentity(w.title))){
   unique.set("local:"+w.id,w);
  }
 }
 return [...unique.values()];
}
function escCatalogue(x){
 return String(x===null||x===undefined?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function catalogLabel(en,my){return typeof t==="function"?t(en,my):en}
function familiesFromWorks(works){
 const groups=new Map();
 for(const w of works)groups.set(w.ref.family,(groups.get(w.ref.family)||0)+1);
 const priority=["Op.","BWV","K.","D.","Hob.","RV","HWV","S.","L.","WAB","WWV","TWV","Sz.","BB","FP","H.","R.","Other","Catalogue"];
 return [...groups.entries()].sort((a,b)=>{
  const ai=priority.indexOf(a[0]),bi=priority.indexOf(b[0]);
  return (ai<0?100:ai)-(bi<0?100:bi)||a[0].localeCompare(b[0]);
 });
}
function groupsForFamily(works,family,search="",genre="all"){
 const m=new Map();
 for(const w of works){
  if(w.ref.family!==family)continue;
  if(genre!=="all"&&w.genre!==genre)continue;
  if(search&&!((w.title+" "+w.ref.group).toLocaleLowerCase().includes(search.toLocaleLowerCase())))continue;
  if(!m.has(w.ref.group))m.set(w.ref.group,[]);
  m.get(w.ref.group).push(w);
 }
 return [...m.entries()].sort(([a],[b])=>{
  const k=s=>{const n=(s.match(/\d+/)||[])[0];return n?Number(n):999999};
  return k(a)-k(b)||a.localeCompare(b,undefined,{numeric:true});
 });
}
function wikiComposerWorksUrl(composer){
 return "https://imslp.org/wiki/Special:Search?search="+encodeURIComponent(composer.name);
}
function closeWorksCatalogue(){
 const win=document.getElementById("worksCatalogueWindow");
 if(win){
  const parent=win.parentElement;
  win.remove();
  parent?.querySelector(".reading-window-body")?.removeAttribute("inert");
  parent?.querySelector(".reading-window-top")?.removeAttribute("inert");
 }
 catalogueState.requestId++;
 catalogueState.composer=null;
 const original=document.querySelector("#readingWindow .reading-window-close");
 if(original)original.focus();
}
function openWorksCatalogue(id){
 if(typeof document==="undefined"||typeof document.createElement!=="function")return;
 const composer=(typeof composers!=="undefined"?composers:[]).find(c=>c.id===Number(id));
 if(!composer)return;
 if(!document.getElementById("readingWindow")&&typeof showComposer==="function")showComposer(id);
 const parent=document.querySelector("#readingWindow .reading-window-panel");
 if(!parent)return;
 closeWorksCatalogue();
 catalogueState.composer=composer;
 catalogueState.works=localCatalogueWorks(composer);
 catalogueState.source="local";
 catalogueState.view="families";catalogueState.family="";catalogueState.group="";catalogueState.selectedId="";
 catalogueState.search="";catalogueState.genre="all";catalogueState.busy=false;catalogueState.message="";
 const windowEl=document.createElement("div");
 windowEl.id="worksCatalogueWindow";
 windowEl.className="works-catalogue-window";
 windowEl.setAttribute("role","dialog");
 windowEl.setAttribute("aria-modal","true");
 windowEl.setAttribute("aria-label",composer.name+" Works Catalogue");
 parent.appendChild(windowEl);
 const behind=parent.querySelector(".reading-window-body");
 const toolbar=parent.querySelector(".reading-window-top");
 behind?.setAttribute("inert","");
 toolbar?.setAttribute("inert","");
 drawWorksCatalogue();
 windowEl.querySelector(".works-window-back")?.focus();
 loadOnlineCatalogue(composer);
}
function catalogueChangeView(view,family="",group="",selected=""){
 if(!document.getElementById("worksCatalogueWindow"))return;
 catalogueState.view=view;catalogueState.family=family;catalogueState.group=group;catalogueState.selectedId=String(selected);
 drawWorksCatalogue();
}
function catalogueGoBack(){
 const s=catalogueState;
 if(s.view==="detail")catalogueChangeView("works",s.family,s.group);
 else if(s.view==="works")catalogueChangeView("groups",s.family);
 else if(s.view==="groups"||s.view==="search")catalogueChangeView("families");
 else closeWorksCatalogue();
}
function catalogueChangeSearch(value){
 catalogueState.search=String(value||"").slice(0,90);
 catalogueState.view=catalogueState.search.trim()?"search":"families";
 drawWorksCatalogue(Boolean(catalogueState.search));
}
function catalogueSetGenre(value){
 catalogueState.genre=String(value||"all");
 catalogueState.view=catalogueState.search?"search":"families";
 drawWorksCatalogue();
}
function catalogueChooseWork(index){
 const w=catalogueState.works[Number(index)];
 if(!w)return;
 const f=w.ref.family,g=w.ref.group;
 catalogueChangeView("detail",f,g,index);
 if(w.source==="openopus"&&/^\d+$/.test(w.id))loadWorkDetails(w.id,index);
}
function catalogueSupplementParts(work){
 const named=catalogueSupplement[catalogueState.composer?.name]||[];
 const found=named.find(x=>catalogueIdentity(x.title)===catalogueIdentity(work.title));
 return found?.parts||work.parts||[];
}
function catalogueInfoText(){
 return catalogueState.source==="openopus"?
 catalogLabel("Open Opus catalogued entries + locally annotated works; not an exhaustive scholarly catalogue.",
 "Open Opus တွင် စာရင်းသွင်းထားသည့် လက်ရာများနှင့် လက်ရာရှင်းလင်းချက်များ ဖြစ်ပြီး အပြည့်အစုံ thematic catalogue မဟုတ်ပါ။"):
 catalogLabel("Offline selection: only independently documented featured works. Connect to the internet to load a larger catalogue.",
 "Offline အတွက် အဓိကလက်ရာရွေးချယ်ချက်သာ ပါဝင်သည်။ ပိုမိုကြီးမားသော စာရင်းကို အင်တာနက်ဖြင့် ရယူနိုင်သည်။");
}
function catalogueWorkCard(w,i){
 const no=w.ref.subNumber?"No. "+w.ref.subNumber+" · ":"";
 return '<button type="button" class="works-work-card" onclick="catalogueChooseWork('+i+')">'+
 '<span class="works-work-no">'+escCatalogue(no+w.ref.group)+'</span>'+
 '<strong>'+escCatalogue(w.title)+'</strong><small>'+escCatalogue(w.genre)+'</small><span aria-hidden="true">›</span></button>';
}
function catalogueButtons(works){
 return works.map(w=>catalogueWorkCard(w,catalogueState.works.indexOf(w))).join("");
}
function drawWorksCatalogue(keepFocus=false){
 const el=document.getElementById("worksCatalogueWindow");if(!el||!catalogueState.composer)return;
 const s=catalogueState;
 const n=s.works.length;
 const identified=s.works.filter(w=>w.source==="openopus").length;
 const compose=s.composer;
 const search=s.search.trim().toLocaleLowerCase();
 const visible=s.works.filter(w=>(s.genre==="all"||w.genre===s.genre)&&(!search||(w.title+" "+w.ref.group+" "+w.genre).toLocaleLowerCase().includes(search)));
 const genres=[...new Set(s.works.map(w=>w.genre))].sort();
 const searchOptions='<option value="all">'+catalogLabel("All genres","အမျိုးအစားအားလုံး")+'</option>'+genres.map(g=>'<option value="'+escCatalogue(g)+'"'+(g===s.genre?' selected':'')+'>'+escCatalogue(g)+'</option>').join("");
 let title="",body="";
 if(s.view==="families"){
  title=catalogLabel("Select numbering system","Catalogue နံပါတ်စနစ်ရွေးရန်");
  const families=familiesFromWorks(visible);
  body=families.length?'<div class="works-family-grid">'+families.map(([f,count])=>
   '<button type="button" class="works-family-card" onclick="catalogueChangeView(\'groups\',\''+escCatalogue(f)+'\')"><strong>'+escCatalogue(f==="Other"?"Unnumbered / by title":f)+'</strong><span>'+count+' '+catalogLabel("works","လက်ရာ")+'</span><span aria-hidden="true">→</span></button>'
  ).join("")+'</div>':'<p class="works-empty">'+catalogLabel("No matching titles.","ကိုက်ညီသော လက်ရာမရှိပါ။")+'</p>';
 }else if(s.view==="groups"){
  title=s.family+" · "+catalogLabel("Choose a number","နံပါတ်ရွေးပါ");
  const groups=groupsForFamily(s.works,s.family,search,s.genre);
  body=groups.length?'<div class="works-group-grid">'+groups.map(([g,items])=>
  '<button type="button" class="works-group-card" onclick="catalogueChangeView(\'works\',\''+escCatalogue(s.family)+'\',\''+escCatalogue(g)+'\')"><strong>'+escCatalogue(g)+'</strong><span>'+items.length+' '+catalogLabel("listed entries","စာရင်းဝင်လက်ရာ")+'</span><span aria-hidden="true">→</span></button>'
  ).join("")+'</div>':'<p class="works-empty">'+catalogLabel("No numbers found.","နံပါတ်မတွေ့ပါ။")+'</p>';
 }else if(s.view==="works"){
  title=s.group+" · "+catalogLabel("Pieces / No.","လက်ရာနံပါတ်များ");
  let items=s.works.filter(w=>w.ref.group===s.group&&w.ref.family===s.family&&(s.genre==="all"||w.genre===s.genre)&&(!search||w.title.toLocaleLowerCase().includes(search)));
  items.sort((a,b)=>Number(a.ref.subNumber||9999)-Number(b.ref.subNumber||9999)||a.title.localeCompare(b.title));
  body='<div class="works-entries">'+(catalogueButtons(items)||'<p class="works-empty">'+catalogLabel("No entries in this group.","ဤအစုတွင် လက်ရာမတွေ့ပါ။")+'</p>')+'</div>';
 }else if(s.view==="detail"){
  const selected=s.works[Number(s.selectedId)];
  title=catalogLabel("Work information","လက်ရာအသေးစိတ်");
  const parts=selected?catalogueSupplementParts(selected):[];
  const details=selected?'<div class="works-detail"><span class="works-work-no">'+escCatalogue(selected.ref.group)+'</span>'+
  '<h3>'+escCatalogue(selected.title)+'</h3><p>'+catalogLabel("Type","အမျိုးအစား")+': '+escCatalogue(selected.genre)+'</p>'+
  (selected.subtitle?'<p>'+escCatalogue(selected.subtitle)+'</p>':'')+
  '<p>'+catalogLabel("Catalogue system","Catalogue နံပါတ်စနစ်")+': '+escCatalogue(selected.ref.family)+
  (selected.ref.subNumber?' · No. '+escCatalogue(selected.ref.subNumber):'')+'</p>'+
  (parts.length?'<h4>'+catalogLabel("Movements / parts","Movements / အပိုင်းများ")+'</h4><ol>'+parts.map(part=>'<li>'+escCatalogue(part)+'</li>').join("")+'</ol>':'<p class="works-muted">'+catalogLabel("Movement-by-movement details are not available in this source; they have not been invented.","ဤရင်းမြစ်တွင် Movement အသေးစိတ်မရှိသောကြောင့် ခန့်မှန်းရေးမထားပါ။")+'</p>')+
  '<div class="works-source-actions"><a href="https://imslp.org/wiki/Special:Search?search='+encodeURIComponent(compose.name+" "+selected.title)+'" target="_blank" rel="noopener noreferrer">'+catalogLabel("Find score on IMSLP ↗","IMSLP တွင် Score ရှာရန် ↗")+'</a>'+
  (selected.source==="openopus"?'<a href="https://www.openopus.org/" target="_blank" rel="noopener noreferrer">Open Opus ↗</a>':'')+'</div></div>':'';
  body=details;
 }else{
  title=catalogLabel("Search results","ရှာဖွေမှုရလဒ်များ");
  body='<div class="works-entries">'+(catalogueButtons(visible)||'<p class="works-empty">'+catalogLabel("No matching works.","ကိုက်ညီသောလက်ရာ မတွေ့ပါ။")+'</p>')+'</div>';
 }
 const placeholder=catalogLabel("Search title, Op., BWV, K., D., RV…","ခေါင်းစဉ်၊ Op., BWV, K., D., RV… ရှာရန်");
 const subinfo=catalogueInfoText();
 const top=
 '<div class="works-window-top"><button class="works-window-back" type="button" onclick="catalogueGoBack()" aria-label="'+catalogLabel("Back one level","နောက်တစ်ဆင့်ပြန်ရန်")+'">← '+catalogLabel("Back","ပြန်ရန်")+'</button>'+
 '<span class="works-window-brand">'+catalogLabel("Works Catalogue","လက်ရာစာရင်း")+'</span>'+
 '<button class="works-window-done" type="button" onclick="closeWorksCatalogue()">'+catalogLabel("Biography","ဘဝသမိုင်း")+' ✕</button></div>';
 el.innerHTML=top+'<div class="works-language-toolbar"><span>'+catalogLabel("Language","ဘာသာစကား")+'</span><button type="button" aria-pressed="'+String(typeof lang!=="undefined"&&lang==="en")+'" onclick="switchCatalogueLanguage(\'en\')">EN</button><button type="button" aria-pressed="'+String(typeof lang!=="undefined"&&lang==="my")+'" onclick="switchCatalogueLanguage(\'my\')">မြန်မာ</button></div>'+
 '<div class="works-catalogue-scroll"><div class="works-catalogue-hero"><span class="works-eyebrow">Piano For ALL · '+catalogLabel("Works & Opus numbers","လက်ရာ / Opus နံပါတ်")+'</span><h2>'+escCatalogue(compose.name)+'</h2>'+
 '<p>'+catalogLabel("Select Op., BWV, K., D., etc. → number → individual work.","Op., BWV, K., D. စသည်ကိုရွေးပြီး နံပါတ် → လက်ရာ အသေးစိတ် ဖွင့်ပါ။")+'</p>'+
 '<div class="works-catalogue-stats">'+n+' '+catalogLabel("displayed entries","ပြသထားသောလက်ရာ")+' · '+identified+' '+catalogLabel("Open Opus entries","Open Opus စာရင်းဝင်လက်ရာ")+(s.busy?' · '+catalogLabel("Loading online catalogue…","အွန်လိုင်းစာရင်း ရယူနေသည်…"):'')+'</div>'+
 '<p class="works-disclaimer">'+escCatalogue(subinfo)+'</p>'+
 '</div><div class="works-catalogue-controls"><input id="worksCatalogueSearch" type="search" autocomplete="off" aria-label="'+catalogLabel("Search works and opus numbers","လက်ရာနှင့် Opus နံပါတ်ရှာရန်")+'" placeholder="'+placeholder+'" value="'+escCatalogue(s.search)+'" oninput="catalogueChangeSearch(this.value)"/>'+
 '<select id="worksCatalogueGenre" aria-label="'+catalogLabel("Filter genre","အမျိုးအစားရွေးရန်")+'" onchange="catalogueSetGenre(this.value)">'+searchOptions+'</select></div>'+
 '<div class="works-catalogue-inner"><h3>'+escCatalogue(title)+'</h3>'+body+
 '<div class="works-catalogue-bottom"><p>'+escCatalogue(s.message)+'</p>'+
 '<a target="_blank" rel="noopener noreferrer" href="'+wikiComposerWorksUrl(compose)+'">'+catalogLabel("Search the larger IMSLP score catalogue ↗","ပိုကြီးမားသော IMSLP Score Catalogue တွင် ရှာရန် ↗")+'</a>'+
 '<a target="_blank" rel="noopener noreferrer" href="https://github.com/openopus-org/openopus_api/blob/master/USAGE.md">Open Opus API · '+catalogLabel("database coverage notes","စာရင်းအကျုံးဝင်မှု")+' ↗</a></div></div></div>';
 if(keepFocus){const f=el.querySelector("#worksCatalogueSearch");f?.focus();f?.setSelectionRange(s.search.length,s.search.length);}
}
async function loadOnlineCatalogue(composer){
 const request=++catalogueState.requestId;
 if(catalogueMemory.has(composer.name)){
  const data=catalogueMemory.get(composer.name);
  if(catalogueState.composer?.name!==composer.name)return;
  catalogueState.works=fullCatalogueWorks(data,localCatalogueWorks(composer));
  catalogueState.source="openopus";drawWorksCatalogue();return;
 }
 if(typeof fetch!=="function")return;
 catalogueState.busy=true;drawWorksCatalogue();
 try{
  const surname=catalogueSearchSurname(composer.name);
  const listResp=await fetch("https://api.openopus.org/composer/list/search/"+encodeURIComponent(surname)+".json",{mode:"cors",credentials:"omit"});
  if(!listResp.ok)throw Error("Composer search unavailable");
  const listData=await listResp.json();
  const matched=matchCatalogueComposer(composer.name,listData.composers);
  if(!matched){
   if(request===catalogueState.requestId){catalogueState.message=catalogLabel("Open Opus has no unambiguously matched listing for this composer. Use IMSLP and specialist catalogues for broader research.","ဤတေးရေးဆရာကို Open Opus တွင် အမည်အတိအကျ မတွေ့ပါ။ IMSLP နှင့် သုတေသနစာရင်းများမှ ဆက်လက်ကြည့်ပါ။");}
   return;
  }
  const worksResp=await fetch("https://api.openopus.org/work/list/composer/"+matched.id+"/genre/all.json",{mode:"cors",credentials:"omit"});
  if(!worksResp.ok)throw Error("Works request unavailable");
  const data=await worksResp.json();
  if(!Array.isArray(data.works)||catalogueIdentity(data.composer?.complete_name||"")!==catalogueIdentity(matched.complete_name)){
   throw Error("Catalogue source identity mismatch");
  }
  const works=data.works.slice(0,10000);
  catalogueMemory.set(composer.name,works);
  if(request!==catalogueState.requestId||catalogueState.composer?.name!==composer.name)return;
  catalogueState.works=fullCatalogueWorks(works,localCatalogueWorks(composer));
  catalogueState.source="openopus";catalogueState.message="";
 }catch(_){
  if(request===catalogueState.requestId)catalogueState.message=catalogLabel("Online catalogue unavailable. Showing local verified selections; try again with internet access.","အွန်လိုင်းစာရင်း မရနိုင်ပါ။ Offline လက်ရာများကို ပြထားပြီး အင်တာနက်ရှိချိန် ထပ်စမ်းနိုင်ပါသည်။");
 }finally{
  if(request===catalogueState.requestId&&catalogueState.composer?.name===composer.name){
   catalogueState.busy=false;drawWorksCatalogue();
  }
 }
}
async function loadWorkDetails(id,index){
 // Optional provider detail; never overwrite local structural data with unverified movement names.
 const request=catalogueState.requestId;
 try{
  const response=await fetch("https://api.openopus.org/work/detail/"+id+".json",{mode:"cors",credentials:"omit"});
  if(!response.ok)return;
  const data=await response.json();
  if(request!==catalogueState.requestId||catalogueState.selectedId!==String(index))return;
  const w=catalogueState.works[index];
  if(!w||String(data.work?.id)!==String(id))return;
  if(data.work.subtitle&&!w.subtitle)w.subtitle=String(data.work.subtitle).slice(0,340);
  drawWorksCatalogue();
 }catch(_){}
}
function switchCatalogueLanguage(next){
 if(!["en","my"].includes(next))return;
 if(typeof switchReadingLanguage==="function")switchReadingLanguage(next);
 drawWorksCatalogue();
}
