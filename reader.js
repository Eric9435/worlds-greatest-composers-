"use strict";
/* Reader layout shared by historical-period chapters and composer studies. */
function chapterMarkup(kind,record,study) {
  const isEra=kind==="era";
  const title=esc(isEra?t(record.en,record.my):t(record.name,record.my));
  const metadata=esc(isEra?record.dates:record.years+" · "+t((eras.find(e=>e.id===record.era)||{}).en||"", (eras.find(e=>e.id===record.era)||{}).my||""));
  const enrichedSections=(kind==="composer"?composerBiographicalSections(record).concat(composerChronologySections(record)):[])
    .concat(study.sections,kind==="composer"?composerStudyExpansion(record,study).concat(advancedComposerLaboratory(record)):[]);
  const outline=enrichedSections.map((section,i)=>
    '<button type="button" class="reader-topic-link" data-topic-index="'+i+'" aria-pressed="'+String(i===0)+'" onclick="selectReadingTopic('+i+')">'+
     (i+1)+'. '+esc(t(section[0],section[1]))+'</button>'
  ).join("");
  const sections=enrichedSections.map((section,i)=>
    '<section class="chapter-section reader-topic-section '+(i===0?'':'is-inactive-topic')+'" data-topic-index="'+i+'" id="chapter-section-'+i+'">'+
    '<span class="section-number">'+String(i+1).padStart(2,"0")+'</span>'+
    '<h3>'+esc(t(section[0],section[1]))+'</h3>'+
    '<p class="'+(section[4]?"composer-atlas-paragraph":"")+'">'+esc(t(section[2],section[3]))+'</p></section>'
  ).join("");
  const pickerOptions=enrichedSections.map((section,i)=>'<option value="'+i+'">'+(i+1)+'. '+esc(t(section[0],section[1]))+'</option>').join("");
  const related=isEra?composers.filter(c=>c.era===record.id).slice(0,18):[];
  const relatedMarkup=!isEra?"":'<section class="chapter-related"><h3>'+t("Composers in this period","ဤခေတ်မှ တေးရေးဆရာများ")+'</h3>'+
    (related.length?'<div class="related-list">'+related.map(c=>
      '<button class="secondary" type="button" onclick="showComposer('+c.id+')">'+esc(t(c.name,c.my))+' →</button>'
    ).join("")+'</div>':'<p>'+t("Surviving named-composer evidence is limited for this survey period. Explore the wider historical discussion above.","ဤခေတ်အတွက် အမည်သိတေးရေးဆရာ အထောက်အထားများကို စာရင်းမသွင်းထားပါ။ အထက်ရှိ သမိုင်းအကြောင်းအရာကို ဆက်လက်လေ့လာပါ။")+'</p>')+'</section>';
  const sourceLinks=(study.refs||[1,4]).map(index=>refs[index]).filter(Boolean).map(r=>
    '<li><a href="'+esc(r[1])+'" target="_blank" rel="noopener noreferrer">'+esc(r[0])+' ↗</a></li>'
  ).join("");
  return '<article id="detail" class="reading-article" tabindex="-1">'+
    '<div class="reader-tools"><button type="button" class="secondary" onclick="closeReading()">← '+t("Back to library","စာရင်းသို့ပြန်ရန်")+'</button>'+
    '<span class="muted">'+t("Long-form study","အသေးစိတ်သင်ခန်းစာ")+'</span></div>'+
    '<header class="reading-header '+(isEra?'':'composer-reading-header')+'">'+(isEra?'':composerPortrait(record.name,'hero'))+'<div class="reading-heading"><span class="eyebrow">'+t(isEra?"HISTORICAL CHAPTER":"COMPOSER CHAPTER",isEra?"သမိုင်းခေတ် သင်ခန်းစာ":"တေးရေးဆရာ သင်ခန်းစာ")+'</span>'+
    '<h2>'+title+'</h2><p>'+metadata+'</p>'+
    '<p class="reading-intro">'+esc(isEra?t(record.descEn,record.descMy):t(record.en,record.descMy))+'</p>'+
    '<div class="reading-meta">'+enrichedSections.length+' '+t("study sections","အပိုင်း")+' · '+t("English / Myanmar","အင်္ဂလိပ် / မြန်မာ")+'</div></div></header>'+
    (isEra?'':'<div class="works-catalogue-launch"><button type="button" class="works-launch-btn" onclick="openWorksCatalogue('+record.id+')">♫ '+t("Works Catalogue · Op. / BWV / K. / D.","လက်ရာစာရင်း · Op. / BWV / K. / D.")+' →</button><small>'+t("Numbered works, individual pieces and available movement details","နံပါတ်အလိုက် လက်ရာများ၊ Piece များနှင့် Movement အသေးစိတ်")+'</small></div>')+
    '<div class="reader-topic-picker"><label for="readerTopicSelect">'+t("Choose topic — opens here without scrolling","ခေါင်းစဉ်ရွေးပါ — ဆွဲချစရာမလိုဘဲ ဤနေရာတွင်ဖွင့်မည်")+'</label><select id="readerTopicSelect" onchange="selectReadingTopic(Number(this.value))">'+pickerOptions+'</select></div>'+
    '<div class="reader-columns"><aside class="reader-outline" aria-label="Chapter contents"><h3>'+t("In this chapter","ဤသင်ခန်းစာတွင်")+'</h3><input type="search" class="reader-section-search" aria-label="'+t("Search chapter topics","သင်ခန်းစာအကြောင်းအရာရှာရန်")+'" placeholder="'+t("Find a topic…","အကြောင်းအရာရှာရန်…")+'" oninput="filterReadingOutline(this.value)">'+outline+'</aside>'+
    '<div class="reader-main">'+sections+extendedContextMarkup(kind,record)+(isEra?'':composerStudySupplement(record))+relatedMarkup+
    '<section class="chapter-sources"><h3>'+t("Academic reading and verification","ပညာရပ်ဆိုင်ရာ ကိုးကားရင်းမြစ်များ")+'</h3>'+
    '<p>'+t("Original educational synthesis. These external resources provide historical context and further reading; they are not page-level citations for every statement.","ဤအကြောင်းအရာသည် ကိုယ်ပိုင်ရေးသားထားသော ပညာရေးရှင်းလင်းချက်ဖြစ်သည်။ အောက်ပါရင်းမြစ်များသည် ဆက်လက်လေ့လာရန်ဖြစ်ပြီး စာကြောင်းတိုင်းအတွက် တိုက်ရိုက်စာမျက်နှာကိုးကားချက် မဟုတ်ပါ။")+'</p>'+
    '<ul>'+sourceLinks+(isEra?'':composerSourceLinks(record.name))+additionalResearchLinks(isEra?{era:record.id,name:''}:record)+'</ul></section>'+
    '<button type="button" class="primary return-button" onclick="closeReading()">← '+t("Return to chapter library","သင်ခန်းစာစာရင်းသို့ပြန်ရန်")+'</button>'+
    '</div></div></article>';
}
/* Immersive, accessible in-app reading window with route restoration. */
let readingReturnFocus=null,readingReturnRoute=null,selectedReadingTopic=0;
function rememberReadingOrigin(){
 if(document.getElementById("readingWindow"))return;
 if(!readingReturnRoute)readingReturnRoute={tab,eraFilter,query};
 if(!readingReturnFocus)readingReturnFocus=document.activeElement;
}
function openReadingWindow(){
 const detail=document.getElementById("detail");
 if(!detail||typeof document.createElement!=="function")return;
 let modal=document.getElementById("readingWindow");
 if(!modal){
  modal=document.createElement("div");
  modal.id="readingWindow";
  modal.className="reading-window";
  modal.setAttribute("role","dialog");
  modal.setAttribute("aria-modal","true");
  modal.setAttribute("aria-label",t("Music history reader","ဂီတသမိုင်းဖတ်ရှုရန်"));
  modal.innerHTML='<div class="reading-window-backdrop"></div><div class="reading-window-panel"><div class="reading-window-top">'+
   '<button type="button" class="secondary reading-window-close" onclick="closeReading()" aria-label="'+t("Close reader","စာဖတ်ဝင်းဒိုးပိတ်ရန်")+'">← '+t("Back","ပြန်ရန်")+'</button>'+
   '<span class="reader-window-brand">Piano For ALL · '+t("History Library","သမိုင်းစာကြည့်တိုက်")+'</span>'+
   '<div class="reading-window-lang" role="group" aria-label="Reading language">'+
   '<button type="button" data-lang="en" onclick="switchReadingLanguage(\'en\')">EN</button>'+
   '<button type="button" data-lang="my" onclick="switchReadingLanguage(\'my\')">မြန်မာ</button>'+
   '</div></div><div class="reading-window-body" id="readingWindowBody" tabindex="-1"></div></div>';
  document.body.appendChild(modal);
 }
 modal.querySelector("#readingWindowBody").replaceChildren(detail);
 document.body.classList.add("reader-window-open");
 document.querySelector?.("main")?.setAttribute?.("inert","");
 modal.querySelector("#readingWindowBody").scrollTop=0;
 updateReadingWindowLanguageButtons();
 selectReadingTopic(selectedReadingTopic);
 modal.querySelector(".reading-window-close").focus();
}
function updateReadingWindowLanguageButtons(){
 const modal=document.getElementById("readingWindow");
 if(!modal)return;
 modal.querySelectorAll(".reading-window-lang button").forEach(b=>{
  const active=b.dataset.lang===lang;
  b.classList.toggle("active",active);
  b.setAttribute("aria-pressed",String(active));
 });
}
function switchReadingLanguage(next){
 if(!["en","my"].includes(next))return;
 const modal=document.getElementById("readingWindow");
 if(!modal){setLang(next);return}
 const area=modal.querySelector("#readingWindowBody"),scroll=area.scrollTop;
 setLang(next);
 const replacement=document.getElementById("detail");
 if(replacement)area.replaceChildren(replacement);
 selectReadingTopic(selectedReadingTopic);
 area.scrollTop=scroll;
 modal.setAttribute("aria-label",t("Music history reader","ဂီတသမိုင်းဖတ်ရှုရန်"));
 modal.querySelector(".reading-window-close").textContent="← "+t("Back","ပြန်ရန်");
 modal.querySelector(".reading-window-close").setAttribute("aria-label",t("Close reader","စာဖတ်ဝင်းဒိုးပိတ်ရန်"));
 updateReadingWindowLanguageButtons();
}
function showEra(id){
 if(!eraChapters[id])return;
 rememberReadingOrigin();
 selectedReadingTopic=0;
 tab="eras";selectedEra=id;selected=null;
 renderContent();
 openReadingWindow();
}
function showComposer(id){
 const found=composers.find(c=>c.id===Number(id));
 if(!found)return;
 rememberReadingOrigin();
 selectedReadingTopic=0;
 tab="composers";selected=found.id;selectedEra=null;
 render();
 openReadingWindow();
}
function closeReading(){
 if(typeof closeWorksCatalogue==="function"&&document.getElementById("worksCatalogueWindow"))closeWorksCatalogue();
 const modal=document.getElementById("readingWindow");
 if(modal)modal.remove();
 document.body?.classList?.remove("reader-window-open");
 document.querySelector?.("main")?.removeAttribute?.("inert");
 selected=null;selectedEra=null;selectedReadingTopic=0;
 const previous=readingReturnRoute;
 readingReturnRoute=null;
 if(previous){tab=previous.tab;eraFilter=previous.eraFilter;query=previous.query;render();}
 else renderContent();
 if(readingReturnFocus&&readingReturnFocus.isConnected)readingReturnFocus.focus();
 else document.querySelector?.(".tabs button.active")?.focus?.();
 readingReturnFocus=null;
}
function selectReadingTopic(index){
 const modal=document.getElementById("readingWindow");
 if(!modal)return;
 const reading=modal.querySelector("#readingWindowBody");
 const sections=Array.from(reading.querySelectorAll(".reader-topic-section"));
 if(!Number.isInteger(index)||index<0||index>=sections.length)return;
 selectedReadingTopic=index;
 sections.forEach((section,i)=>section.classList.toggle("is-inactive-topic",i!==index));
 reading.querySelectorAll(".reader-topic-link").forEach(link=>{
  link.setAttribute("aria-pressed",String(Number(link.dataset.topicIndex)===index));
 });
 const selector=reading.querySelector("#readerTopicSelect");
 if(selector)selector.value=String(index);
 const article=reading.querySelector(".reading-article");
 if(article)article.classList.add("has-selected-topic");
 reading.scrollTop=0;
}
function filterReadingOutline(term){
 const modal=document.getElementById("readingWindow");
 if(!modal)return;
 const q=String(term).trim().toLocaleLowerCase();
 modal.querySelectorAll(".reader-topic-link").forEach(a=>{a.hidden=!!q&&!a.textContent.toLocaleLowerCase().includes(q)});
}
if(typeof document!=="undefined"&&typeof document.addEventListener==="function")document.addEventListener("keydown",event=>{
 const modal=document.getElementById("readingWindow");
 if(!modal)return;
 if(event.key==="Escape"){event.preventDefault();if(document.getElementById("worksCatalogueWindow"))closeWorksCatalogue();else closeReading();return}
 if(event.key!=="Tab")return;
 const focusable=Array.from(modal.querySelectorAll('button:not([disabled]),a[href]:not([hidden]),input:not([disabled]),select:not([disabled]),[tabindex="0"]')).filter(el=>el.getClientRects().length);
 if(!focusable.length)return;
 const first=focusable[0],last=focusable[focusable.length-1];
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
