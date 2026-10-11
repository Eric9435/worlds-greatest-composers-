"use strict";
/* Original biographies are educational syntheses, not reproduced books.
   The bibliography provides research leads, not per-sentence proof. */
const composerSpecialistSources={
"Johann Sebastian Bach":[
["Bach-Archiv Leipzig — documented chronological biography","https://www.bacharchivleipzig.de/en/neutral/johann-sebastian-bach-%E2%94%80-chronology"],
["The Cambridge Companion to Bach (ed. John Butt)","https://www.cambridge.org/core/books/cambridge-companion-to-bach/BB71E9799CBE6751307BE0ECBC24C132"]],
"Ludwig van Beethoven":[
["Beethoven-Haus Bonn — primary source collections and biography","https://www.beethoven.de/en/beethoven"],
["The Cambridge Companion to Beethoven (ed. Glenn Stanley)","https://www.cambridge.org/core/books/the-cambridge-companion-to-beethoven/F82EB4588B7BC42FAF3F270383CF2592"]],
"Frédéric Chopin":[
["The Fryderyk Chopin Institute — biography and manuscripts","https://chopin.nifc.pl/en/chopin/osoba/1_chopin_fryderyk"],
["The Cambridge Companion to Chopin (ed. Jim Samson)","https://www.cambridge.org/core/books/cambridge-companion-to-chopin/C69DCE19622F4FE179777DC8634F966F"]],
"Wolfgang Amadeus Mozart":[
["The Cambridge Companion to Mozart (ed. Simon P. Keefe)","https://www.cambridge.org/core/books/cambridge-companion-to-mozart/DE05DD0786DC2E28F6FF6BE46CD9E99D"]],
"Joseph Haydn":[
["The Cambridge Companion to Haydn (ed. Caryl Clark)","https://www.cambridge.org/core/books/the-cambridge-companion-to-haydn/CBC5CE1F766D6FF9CB2B204FF637EB7F"]],
"Johannes Brahms":[
["The Cambridge Companion to Brahms (ed. Michael Musgrave)","https://www.cambridge.org/core/books/cambridge-companion-to-brahms/44EE577A82C5366B8D9769FB836493E8"]]
};
function composerBiographicalSections(record){
 const info=composerBiographicalStudies[record.name];
 if(!info)return [];
 return [
 ["Detailed life, career and historical circumstances","ဘဝသမိုင်း၊ အသက်မွေးဝမ်းကျောင်းနှင့် ခေတ်နောက်ခံ အသေးစိတ်",info[0],info[1]],
 ["Major compositions, interpretation and analytical listening","ထင်ရှားသောလက်ရာများ၊ တီးခတ်ဖော်ပြမှုနှင့် နားထောင်သုံးသပ်ချက်",info[2],info[3]]
 ];
}
function composerSourceMarkup(record){
 const specific=composerSpecialistSources[record.name]||[];
 const general=[
 ["Grove Music Online (Oxford) — musicological reference biographies","https://www.oxfordmusiconline.com/"],
 ["Richard Taruskin, The Oxford History of Western Music, Vol. 3 (Oxford University Press)","https://academic.oup.com/book/60831/chapter-abstract/531542491"]
 ];
 return specific.concat(general).map(x=>
 '<li><a target="_blank" rel="noopener noreferrer" href="'+esc(x[1])+'">'+esc(x[0])+' ↗</a></li>'
 ).join("");
}
