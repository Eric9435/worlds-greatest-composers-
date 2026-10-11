"use strict";
/* AI-generated, illustrative composer portraits; not historical photographs or authenticated likenesses.
   One optimized 5-column x 2-row WebP sprite minimizes image requests and offline storage. */
const composerPortraitPositions = Object.freeze({
  "Johann Sebastian Bach":[0,0],
  "George Frideric Handel":[1,0],
  "Joseph Haydn":[2,0],
  "Wolfgang Amadeus Mozart":[3,0],
  "Ludwig van Beethoven":[4,0],
  "Franz Schubert":[0,1],
  "Frédéric Chopin":[1,1],
  "Franz Liszt":[2,1],
  "Johannes Brahms":[3,1],
  "Claude Debussy":[4,1]
});
const composerPortraitPath="./composer-portraits.webp?v=9";
/* Complete offline editorial gallery. Each vector tile is deliberately labelled
   as an original illustration, not an archival photograph or exact likeness.
   Order matches composer-portraits-42.svg, 7 columns × 6 rows. */
const composerIllustrationOrder=Object.freeze([
  "Hildegard von Bingen",
  "Guillaume de Machaut",
  "Josquin des Prez",
  "Giovanni Pierluigi da Palestrina",
  "Claudio Monteverdi",
  "Antonio Vivaldi",
  "Robert Schumann",
  "Sergei Rachmaninoff",
  "Igor Stravinsky",
  "John Cage",
  "Philip Glass",
  "Arvo Pärt",
  "Guillaume Dufay",
  "Orlando di Lasso",
  "Jean-Baptiste Lully",
  "Henry Purcell",
  "Domenico Scarlatti",
  "C. P. E. Bach",
  "Christoph Willibald Gluck",
  "Muzio Clementi",
  "Felix Mendelssohn",
  "Hector Berlioz",
  "Giuseppe Verdi",
  "Richard Wagner",
  "Anton Bruckner",
  "Pyotr Ilyich Tchaikovsky",
  "Antonín Dvořák",
  "Edvard Grieg",
  "Gustav Mahler",
  "Alexander Scriabin",
  "Arnold Schoenberg",
  "Maurice Ravel",
  "Béla Bartók",
  "Florence Price",
  "Sergei Prokofiev",
  "Dmitri Shostakovich",
  "Olivier Messiaen",
  "Benjamin Britten",
  "György Ligeti",
  "Steve Reich",
  "Kaija Saariaho",
  "Unsuk Chin"
]);
const composerIllustrationIndex=new Map(composerIllustrationOrder.map((name,index)=>[name,index]));
const composerIllustrationPath="./composer-portraits-42.svg?v=1";

function composerPortrait(name,kind="card"){
  const position=composerPortraitPositions[name];
  const shortLabel=t("AI-generated artistic illustration","AI ဖြင့်ဖန်တီးထားသော သရုပ်ဖော်ပုံ");
  if(position){
    const [x,y]=position;
    // Render an actual HTML image; CSS-only background sprites were not
    // observable by image-load tests and can be obscured by stale style caches.
    const xOffset=x*20, yOffset=y*50;
    const alternative=esc(name+" — "+shortLabel);
    const loading=kind==="hero"?"eager":"lazy";
    const failedInitial=esc(name.split(" ").filter(Boolean).map(p=>p.charAt(0).toUpperCase()).slice(0,2).join(""));
    return '<div class="composer-visual '+(kind==="hero"?"composer-visual-hero":"")+'" data-composer="'+esc(name)+'">'+
      '<div class="composer-portrait composer-portrait-crop">'+
      '<img class="composer-portrait-sprite" src="'+composerPortraitPath+'" alt="'+alternative+'" '+
      'loading="'+loading+'" decoding="async" width="600" height="240" '+
      'style="transform:translate(-'+xOffset+'%,-'+yOffset+'%)" '+
      'onerror="this.style.display=\'none\';this.parentElement.classList.add(\'composer-portrait-placeholder\');this.parentElement.textContent=\''+failedInitial+'\'">'+
      '</div>'+
      (kind==="hero"?'<span class="portrait-disclaimer">'+shortLabel+'</span>':'')+
      '</div>';
  }
  const illustrationIndex=composerIllustrationIndex.get(name);
  if(Number.isInteger(illustrationIndex)){
    const col=illustrationIndex%7,row=Math.floor(illustrationIndex/7);
    const positionX=(col*100/7).toFixed(6),positionY=(row*100/6).toFixed(6);
    const label=t("Original artistic illustration · not a historical likeness","မူရင်းသရုပ်ဖော်ပုံ · သမိုင်းဝင်ပုံအစစ်မဟုတ်ပါ");
    const initial=name.split(" ").filter(Boolean).map(part=>part.charAt(0).toUpperCase()).slice(0,2).join("");
    const accessible=esc(name+" — "+label);
    return '<div class="composer-visual '+(kind==="hero"?"composer-visual-hero":"")+'" data-composer="'+esc(name)+'" data-portrait-panel="'+illustrationIndex+'">'+
      '<div class="composer-portrait composer-portrait-illustration-frame">'+
      '<img class="composer-portrait-illustration" src="'+composerIllustrationPath+'" alt="'+accessible+'" '+
      'loading="'+(kind==="hero"?"eager":"lazy")+'" decoding="async" width="1792" height="1536" '+
      'style="transform:translate(-'+positionX+'%,-'+positionY+'%)" '+
      'onerror="this.style.display=\'none\';this.parentElement.classList.add(\'composer-portrait-placeholder\');this.parentElement.textContent=\''+esc(initial)+'\'">'+
      '</div>'+
      (kind==="hero"?'<span class="portrait-disclaimer">'+label+'</span>':'')+
      '</div>';
  }
  const initial=name.split(" ").filter(Boolean).map(s=>s.charAt(0).toUpperCase()).slice(0,2).join("");
  return '<div class="composer-visual '+(kind==="hero"?"composer-visual-hero":"")+'" data-composer="'+esc(name)+'">'+
    '<div class="composer-portrait composer-portrait-placeholder" aria-label="'+esc(t("Portrait not yet available","ဓာတ်ပုံမရှိသေးပါ"))+'">'+esc(initial)+'</div>'+
    (kind==="hero"?'<span class="portrait-disclaimer">'+t("Portrait coming later","နောက်ပိုင်း ပုံထည့်မည်")+'</span>':'')+
    '</div>';
}
