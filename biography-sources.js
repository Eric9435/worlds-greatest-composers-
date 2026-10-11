"use strict";
/* Verified publisher, institutional and catalogue landing pages.
   Links are further reading, not a claim that every sentence has a page citation. */
const composerSpecialistReading={
"Johann Sebastian Bach":[["The Cambridge Companion to Bach (Cambridge University Press)","https://www.cambridge.org/core/books/cambridge-companion-to-bach/BB71E9799CBE6751307BE0ECBC24C132"]],
"George Frideric Handel":[["The Cambridge Companion to Handel, ed. Donald Burrows","https://www.cambridge.org/core/books/cambridge-companion-to-handel/2A375CDDFD16A5ED1816655E05A06182"]],
"Joseph Haydn":[["The Cambridge Companion to Haydn, ed. Caryl Clark","https://www.cambridge.org/core/books/the-cambridge-companion-to-haydn/CBC5CE1F766D6FF9CB2B204FF637EB7F"]],
"Wolfgang Amadeus Mozart":[["The Cambridge Companion to Mozart, ed. Simon P. Keefe","https://www.cambridge.org/core/books/the-cambridge-companion-to-mozart/DE05DD0786DC2E28F6FF6BE46CD9E99D"]],
"Ludwig van Beethoven":[["The Cambridge Companion to Beethoven, ed. Glenn Stanley","https://www.cambridge.org/core/books/the-cambridge-companion-to-beethoven/F82EB4588B7BC42FAF3F270383CF2592"],["Beethoven's Lives by Lewis Lockwood (Cambridge University Press)","https://www.cambridge.org/core/books/beethovens-lives/exploring-beethovens-life-and-work-three-sample-years/170F7668D67828398C53AA9CA611F6FA"]],
"Frédéric Chopin":[["The Cambridge Companion to Chopin, ed. Jim Samson","https://www.cambridge.org/core/books/cambridge-companion-to-chopin/C69DCE19622F4FE179777DC8634F966F"]],
"Claude Debussy":[["The Cambridge Companion to Debussy, ed. Simon Trezise","https://www.cambridge.org/core/books/cambridge-companion-to-debussy/E3A1915027340795EEDB97D211804D05"]],
"Igor Stravinsky":[["The Cambridge Companion to Stravinsky, ed. Jonathan Cross","https://www.cambridge.org/core/books/the-cambridge-companion-to-stravinsky/04E4A6B5ED2E9E22F232848C8A337632"]],
"Florence Price":[["Florence Price Papers — University of Arkansas Digital Collections","https://digitalcollections.uark.edu/digital/collection/p17212coll3"],["Florence Price biographical study by Michael J. Cooper","https://florenceprice.com/biography/"]],
"Kaija Saariaho":[["IRCAM Composer Resource — Saariaho Biography","https://resources.ircam.fr/en/composer/kaija-saariaho/biography"],["Kaija Saariaho Estate — Biography","https://saariaho.org/about"]],
"Unsuk Chin":[["Unsuk Chin — Publisher Biography (Boosey & Hawkes)","https://www.boosey.com/pages/cr/composer/composer_main?composerid=2754&langid=1&site-lang=en&ttype=biography"]]
};
/* Verified Oxford Academic publisher catalogue entries, accessed October 2026.
   These provide era-level further reading, not sentence-by-sentence citations. */
const oxfordVolumes={
 medieval:["Richard Taruskin — The Oxford History of Western Music, Vol. 1: Earliest Notations to the Sixteenth Century","https://academic.oup.com/book/60817"],
 renaissance:["Richard Taruskin — The Oxford History of Western Music, Vol. 1: Earliest Notations to the Sixteenth Century","https://academic.oup.com/book/60817"],
 baroque:["Richard Taruskin — The Oxford History of Western Music, Vol. 2: Seventeenth and Eighteenth Centuries","https://academic.oup.com/book/60818"],
 classical:["Richard Taruskin — The Oxford History of Western Music, Vol. 2: Seventeenth and Eighteenth Centuries","https://academic.oup.com/book/60818"],
 romantic:["Richard Taruskin — The Oxford History of Western Music, Vol. 3: Nineteenth Century","https://academic.oup.com/book/60831"],
 modern:["Richard Taruskin — The Oxford History of Western Music, Vol. 4: Early Twentieth Century","https://academic.oup.com/book/60829"],
 contemporary:["Richard Taruskin — The Oxford History of Western Music, Vol. 5: Late Twentieth Century","https://academic.oup.com/book/60819"],
 ancient:["N. A. Clark et al. — Understanding Music: Past and Present (open textbook)","https://oer.galileo.usg.edu/arts-textbooks/1/"]
};
const verifiedComposerArchives={
 "Johann Sebastian Bach":[["Bach-Archiv Leipzig — research collections and Bach digital","https://www.bacharchivleipzig.de/en/bach-archiv"]],
 "Wolfgang Amadeus Mozart":[["Mozarteum Salzburg — Digital Mozart Edition, scores and letters","https://mozarteum.at/en/digital-mozart-edition"]],
 "Ludwig van Beethoven":[["Beethoven-Haus Bonn — digital manuscripts, letters and portraits","https://www.beethoven.de/en/archive"]],
 "Frédéric Chopin":[["Chopin Online — annotated catalogue of Chopin's first editions","https://chopinonline.ac.uk/aco/catalogue/"]],
 "Felix Mendelssohn":[["The Cambridge Companion to Mendelssohn (ed. Peter Mercer-Taylor) — publisher front matter","https://assets.cambridge.org/052182/6039/frontmatter/0521826039_frontmatter.htm"]]
};
function additionalResearchLinks(record){
 const volume=oxfordVolumes[record.era];
 const archive=verifiedComposerArchives[record.name]||[];
 const sources=(volume?[volume]:[]).concat(archive);
 return sources.map(item=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(item[1])+'">'+esc(item[0])+' ↗</a></li>').join("");
}
function composerSourceLinks(name){
 const extras=composerSpecialistReading[name]||[];
 const reading=extras.concat([["Grove Music Online (Oxford University Press) — institutional access may be needed","https://www.oxfordmusiconline.com/"]]);
 return reading.map(r=>'<li><a href="'+esc(r[1])+'" target="_blank" rel="noopener noreferrer">'+esc(r[0])+' ↗</a></li>').join("");
}
