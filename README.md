# World's Greatest Composers — Piano For ALL

A responsive English/Myanmar music history and theory learning web application, built without third-party runtime dependencies.

## Features

- **History:** 8 historical periods (Ancient, Medieval, Renaissance, Baroque, Classical, Romantic, Modern, Contemporary)
- **Composers:** 52 concise bilingual composer profiles, representative works, searchable and filterable by era
- **Theory:** 34 bilingual introductory and intermediate topic summaries
- **Assessment:** 34 multiple-choice theory questions with immediate feedback and locally stored learned flags
- **Piano studio:** 13-key playable synthesizer, volume slider, C-major scale and chord demos
- **Ear training:** note identification with immediate feedback and session score
- **Dashboard:** completion percentage and JSON progress export/import
- **Localization:** English/Myanmar switch; Myanmar is an original instructional translation, not a professionally certified translation
- **Web app:** mobile-first interface, manifest, service worker for repeat-visit offline caching

## Run locally

Use a local web server (needed for service-worker behavior):

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Browser audio must be activated by a tap. For a hosted installation, use HTTPS.

## Publish to GitHub Pages

In the GitHub repository, open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **main / (root)**, and save. The eventual URL follows `https://eric9435.github.io/worlds-greatest-composers-/` after Pages finishes deployment. This deployment has **not** been verified.

## Data and privacy

No authentication, analytics, or external API calls are included. Lesson progress is kept in localStorage; ear-training session score is not persisted. Users can export and reimport their progress. Browser storage can be cleared, so export is recommended.

## Academic background and rights

This project's explanatory text is original and is **not** a reproduction of copyrighted textbooks or sheet music. References for further reading:

- Gotham, M., Gullings, K., Hamm, C., Hughes, B., Jarvis, B., Lavengood, M., & Peterson, J. *Open Music Theory*, version 2. VIVA Pressbooks: https://viva.pressbooks.pub/openmusictheory/ (CC BY-SA 4.0 except where noted)
- *Understanding Music: Past and Present*. University of North Georgia: https://oer.galileo.usg.edu/arts-textbooks/1/
- Yale Open Courses, *Listening to Music*: https://oyc.yale.edu/music/musi-112
- *Grove Music Online*. Oxford Music: https://www.oxfordmusiconline.com/ (subscription may be required)
- *Encyclopaedia Britannica*, classical music: https://www.britannica.com/art/classical-music
- *IMSLP*: https://imslp.org/ (check local rights for individual editions)

The app links to sources for additional study; composer summaries have **not** received exhaustive line-by-line scholarly fact checking.

## Project status

**Functional expanded web edition, not a complete university conservatory curriculum or a released native iOS app.** Missing elements include long-form scholarly chapters, full notation engraving and score-following, licensed performance recordings, systematic graded assessments, professional translation review, cloud sync, cross-device accessibility QA, and independent browser/device acceptance testing.

Maintained as a separate repository; it does not modify WortWeg 370.
