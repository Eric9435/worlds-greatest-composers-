"use strict";
/* Reader layout shared by historical-period chapters and composer studies. */
function chapterMarkup(kind,record,study) {
  const isEra=kind==="era";
  const title=esc(isEra?t(record.en,record.my):t(record.name,record.my));
  const metadata=esc(isEra?record.dates:record.years+" · "+t((eras.find(e=>e.id===record.era)||{}).en||"", (eras.find(e=>e.id===record.era)||{}).my||""));
  const outline=study.sections.concat(kind==='composer'?composerBiographicalSections(record).concat(composerStudyExpansion(record,study),advancedComposerLaboratory(record)):[]).map((section,i)=>
    '<a href="#chapter-section-'+i+'">'+(i+1)+'. '+esc(t(section[0],section[1]))+'</a>'
  ).join("");
  const enrichedSections=study.sections.concat(kind==='composer'?composerBiographicalSections(record).concat(composerStudyExpansion(record,study),advancedComposerLaboratory(record)):[]);
  const sections=enrichedSections.map((section,i)=>
    '<section class="chapter-section" id="chapter-section-'+i+'">'+
    '<span class="section-number">'+String(i+1).padStart(2,"0")+'</span>'+
    '<h3>'+esc(t(section[0],section[1]))+'</h3>'+
    '<p>'+esc(t(section[2],section[3]))+'</p></section>'
  ).join("");
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
    '<div class="reader-columns"><aside class="reader-outline" aria-label="Chapter contents"><h3>'+t("In this chapter","ဤသင်ခန်းစာတွင်")+'</h3>'+outline+'</aside>'+
    '<div class="reader-main">'+sections+extendedContextMarkup(kind,record)+(isEra?'':composerStudySupplement(record))+relatedMarkup+
    '<section class="chapter-sources"><h3>'+t("Academic reading and verification","ပညာရပ်ဆိုင်ရာ ကိုးကားရင်းမြစ်များ")+'</h3>'+
    '<p>'+t("Original educational synthesis. These external resources provide historical context and further reading; they are not page-level citations for every statement.","ဤအကြောင်းအရာသည် ကိုယ်ပိုင်ရေးသားထားသော ပညာရေးရှင်းလင်းချက်ဖြစ်သည်။ အောက်ပါရင်းမြစ်များသည် ဆက်လက်လေ့လာရန်ဖြစ်ပြီး စာကြောင်းတိုင်းအတွက် တိုက်ရိုက်စာမျက်နှာကိုးကားချက် မဟုတ်ပါ။")+'</p>'+
    '<ul>'+sourceLinks+(isEra?'':composerSourceLinks(record.name))+'</ul></section>'+
    '<button type="button" class="primary return-button" onclick="closeReading()">← '+t("Return to chapter library","သင်ခန်းစာစာရင်းသို့ပြန်ရန်")+'</button>'+
    '</div></div></article>';
}
/* Native-style full-screen reading window: the library never scrolls away. */
let readingReturnFocus=null;
function openReadingWindow(){
 const detail=document.getElementById("detail");
 if(!detail||typeof document.createElement!=="function")return;
 readingReturnFocus=document.activeElement;
 let modal=document.getElementById("readingWindow");
 if(!modal){
   modal=document.createElement("div");
   modal.id="readingWindow";
   modal.className="reading-window";
   modal.setAttribute("role","dialog");
   modal.setAttribute("aria-modal","true");
   modal.setAttribute("aria-label",t("Music history reader","ဂီတသမိုင်းဖတ်ရှုရန်"));
   modal.innerHTML='<div class="reading-window-backdrop"></div><div class="reading-window-panel"><div class="reading-window-top"><button type="button" class="secondary reading-window-close" onclick="closeReading()" aria-label="'+t("Close reader","စာဖတ်ဝင်းဒိုးပိတ်ရန်")+'">← '+t("Back","ပြန်ရန်")+'</button><span>'+t("Piano For ALL · History Library","Piano For ALL · သမိုင်းစာကြည့်တိုက်")+'</span></div><div class="reading-window-body" id="readingWindowBody" tabindex="-1"></div></div>';
   document.body.appendChild(modal);
 }
 modal.querySelector("#readingWindowBody").replaceChildren(detail);
 document.body.classList.add("reader-window-open");
 modal.querySelector("#readingWindowBody").scrollTop=0;
 modal.querySelector(".reading-window-close").focus();
}
function showEra(id){
 if(!eraChapters[id])return;
 selectedEra=id;selected=null;
 renderContent();
 openReadingWindow();
}
function showComposer(id){
 const found=composers.find(c=>c.id===Number(id));
 if(!found)return;
 tab="composers";selected=found.id;selectedEra=null;
 render();
 openReadingWindow();
}
function closeReading(){
 const modal=document.getElementById("readingWindow");
 if(modal)modal.remove();
 document.body?.classList?.remove("reader-window-open");
 selected=null;selectedEra=null;
 renderContent();
 if(readingReturnFocus&&readingReturnFocus.isConnected)readingReturnFocus.focus();
 readingReturnFocus=null;
}
if(typeof document!=="undefined"&&typeof document.addEventListener==="function")document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&document.getElementById("readingWindow")){event.preventDefault();closeReading();}
 if(event.key==="Tab"){
  const modal=document.getElementById("readingWindow");
  if(!modal)return;
  const focusable=Array.from(modal.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')).filter(el=>el.getClientRects().length);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
});
