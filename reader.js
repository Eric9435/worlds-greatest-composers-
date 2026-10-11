"use strict";
/* Reader layout shared by historical-period chapters and composer studies. */
function chapterMarkup(kind,record,study) {
  const isEra=kind==="era";
  const title=esc(isEra?t(record.en,record.my):t(record.name,record.my));
  const metadata=esc(isEra?record.dates:record.years+" · "+t((eras.find(e=>e.id===record.era)||{}).en||"", (eras.find(e=>e.id===record.era)||{}).my||""));
  const outline=study.sections.map((section,i)=>
    '<a href="#chapter-section-'+i+'">'+(i+1)+'. '+esc(t(section[0],section[1]))+'</a>'
  ).join("");
  const sections=study.sections.map((section,i)=>
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
    '<div class="reading-meta">'+study.sections.length+' '+t("study sections","အပိုင်း")+' · '+t("English / Myanmar","အင်္ဂလိပ် / မြန်မာ")+'</div></div></header>'+
    '<div class="reader-columns"><aside class="reader-outline" aria-label="Chapter contents"><h3>'+t("In this chapter","ဤသင်ခန်းစာတွင်")+'</h3>'+outline+'</aside>'+
    '<div class="reader-main">'+sections+relatedMarkup+
    '<section class="chapter-sources"><h3>'+t("Academic reading and verification","ပညာရပ်ဆိုင်ရာ ကိုးကားရင်းမြစ်များ")+'</h3>'+
    '<p>'+t("Original educational synthesis. These external resources provide historical context and further reading; they are not page-level citations for every statement.","ဤအကြောင်းအရာသည် ကိုယ်ပိုင်ရေးသားထားသော ပညာရေးရှင်းလင်းချက်ဖြစ်သည်။ အောက်ပါရင်းမြစ်များသည် ဆက်လက်လေ့လာရန်ဖြစ်ပြီး စာကြောင်းတိုင်းအတွက် တိုက်ရိုက်စာမျက်နှာကိုးကားချက် မဟုတ်ပါ။")+'</p>'+
    '<ul>'+sourceLinks+'</ul></section>'+
    '<button type="button" class="primary return-button" onclick="closeReading()">← '+t("Return to chapter library","သင်ခန်းစာစာရင်းသို့ပြန်ရန်")+'</button>'+
    '</div></div></article>';
}
function showEra(id){
  if(!eraChapters[id])return;
  tab="eras";selectedEra=id;selected=null;
  renderContent();
  document.getElementById("detail")?.scrollIntoView?.({behavior:"smooth",block:"start"});
}
function showComposer(id){
  const found=composers.find(c=>c.id===Number(id));
  if(!found)return;
  tab="composers";selected=found.id;selectedEra=null;query="";eraFilter="all";
  render();
  document.getElementById("detail")?.scrollIntoView?.({behavior:"smooth",block:"start"});
}
function closeReading(){
  selected=null;selectedEra=null;
  renderContent();
  document.getElementById("content")?.scrollIntoView?.({behavior:"smooth",block:"start"});
}
