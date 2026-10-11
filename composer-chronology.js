"use strict";
/* Add life chronology and curated listening to each individually authored biography.
   These are original study summaries, not quotations or a critically edited catalogue. */
function composerChronologySections(composer){
 const entry=composerChronologyData[composer.name];
 if(!entry)return [];
 const timelineEnglish=entry.life.map(item=>item[0]+" — "+item[1]).join("\n\n");
 const timelineMyanmar=entry.life.map(item=>item[0]+" — "+item[2]).join("\n\n");
 const worksEnglish=entry.works.map((item,i)=>(i+1)+". "+item[0]+"\n"+item[1]).join("\n\n");
 const worksMyanmar=entry.works.map((item,i)=>(i+1)+". "+item[0]+"\n"+item[2]).join("\n\n");
 return [
 ["Life chronology: three historical milestones","ဘဝသမိုင်း အချိန်စဉ်မှတ်တိုင် ၃ ခု",timelineEnglish,timelineMyanmar,"chronology"],
 ["Curated works: guided score and listening studies","ရွေးချယ်ထားသောလက်ရာများ — Score နှင့် နားထောင်သုံးသပ်မှု",worksEnglish,worksMyanmar,"works"]
 ];
}
