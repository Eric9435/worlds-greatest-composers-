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
const composerPortraitPath="./composer-portraits.webp";
function composerPortrait(name,kind="card"){
  const position=composerPortraitPositions[name];
  const shortLabel=t("AI-generated artistic illustration","AI ဖြင့်ဖန်တီးထားသော သရုပ်ဖော်ပုံ");
  if(position){
    const [x,y]=position;
    const posX=x*25; const posY=y*100;
    return '<div class="composer-visual '+(kind==="hero"?"composer-visual-hero":"")+'">'+
      '<div role="img" aria-label="'+esc(name+" — "+shortLabel)+'" class="composer-portrait" style="background-position:'+posX+'% '+posY+'%"></div>'+
      (kind==="hero"?'<span class="portrait-disclaimer">'+shortLabel+'</span>':'')+
      '</div>';
  }
  const initial=name.split(" ").filter(Boolean).map(s=>s.charAt(0)).slice(0,2).join("");
  return '<div class="composer-visual '+(kind==="hero"?"composer-visual-hero":"")+'">'+
    '<div class="composer-portrait composer-portrait-placeholder" aria-label="'+esc(t("Portrait not yet available","ဓာတ်ပုံမရှိသေးပါ"))+'">'+esc(initial)+'</div>'+
    (kind==="hero"?'<span class="portrait-disclaimer">'+t("Portrait coming later","နောက်ပိုင်း ပုံထည့်မည်")+'</span>':'')+
    '</div>';
}
