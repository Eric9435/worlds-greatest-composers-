# World's Greatest Composers — Piano For ALL

English–Myanmar music-history web application, optimized for mobile screens and deployed as a static site.

## Current history-only scope

- Eight expanded historical chapters, each with four bilingual sections exploring historical context, musical development, representative genres and critical listening.
- Fifty-two English/Myanmar composer chapters. Each includes distinct career context, compositional language, and substantial major-works/listening analysis.
- Search by composer name or work; filter by period; switch between English and Myanmar; consult a separate reading-reference section.
- Mobile-first design, keyboard focus styling, reduced-motion support and repeat-visit offline caching.
- No sign-in, user database, analytics or third-party production dependencies.

**Academic limitation:** The expanded chapters provide substantial structured introductory reading, but are not an exhaustive university-level textbook or peer-reviewed composer encyclopedia. Individual summaries have not received line-by-line scholarly verification. Myanmar translations have not been professionally certified. Period boundaries are approximate and focus primarily on the Western art-music chronology.

## Academic further-reading references

- Gotham et al., *Open Music Theory*: https://viva.pressbooks.pub/openmusictheory/
- University of North Georgia, *Understanding Music: Past and Present*: https://oer.galileo.usg.edu/arts-textbooks/1/
- Yale Open Courses, *Listening to Music*: https://oyc.yale.edu/music/musi-112
- Oxford Music, *Grove Music Online*: https://www.oxfordmusiconline.com/ (subscription may be needed)
- *Encyclopaedia Britannica*: https://www.britannica.com/art/classical-music
- IMSLP: https://imslp.org/ (check copyright of individual editions)

These links offer additional study and do not establish claim-level citations for all existing composer summaries. Book content and copyrighted musical recordings are not reproduced.

## Local development

Run `python3 -m http.server 8000` from the repository root, then visit http://localhost:8000.

## Checks

Run `node --check app.js && node --check history.js && node --check sw.js` to check JavaScript syntax.
Run `node --test tests/history.test.cjs` for regression tests, including checks that all eight periods and all 52 composers have substantial bilingual sections.
To run real Chromium smoke tests, install `playwright@1.56.0`, install Chromium through Playwright, then run `node tests/browser-smoke.cjs`.

GitHub Actions checks syntax, data-driven behavior and a mobile-sized Chromium browser workflow. Green CI alone is not a substitute for complete physical-device acceptance testing or academic fact checking.

## Deployment

Production: https://piano-for-all-composers.onrender.com
Render is configured as a static site with automatic deployment from branch `main`, publish path `.`.
Versioned service worker cache `pfa-history-v7` allows repeat-visit offline use. A browser may need a reload after upgrades.

## Data and privacy

The site stores the selected language in local browser storage and has no remote user account database. There is no sign-in or data synchronization.

## Future improvements

Scholarly book-length biographies, claim-level citations per composer, reviewed Myanmar translations, additional cultural coverage, performance audio, notation examples, platform-specific raster PWA icons and native iOS distribution are not part of this release.

Project is independent from WortWeg 370.

## Expanded history reader

Open a period in **Timeline → Read full chapter** or a composer in **Composers → Read profile**. Each chapter includes a table of contents, multiple sections in both languages and a separately labelled academic reading list. Readings can be used offline after the relevant cache has downloaded. All 52 composer profiles are checked for a distinct substantial bilingual chapter in automated tests.

The written explanations are original educational syntheses. The linked academic sources support further learning but have **not** been checked as sentence-level citations for each composer; fact-checking and professional language editing are important next editorial stages.
