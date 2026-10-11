"use strict";
/* Original bilingual practical musicology laboratory. This is an educational
   study guide, not a claim of individual historical verification. */
const advancedTopics=[
["Manuscript, edition and provenance","စာမူ၊ edition နှင့် မူရင်းအထောက်အထား",
"Establish which version of the work is being studied. Record the edition, editor, publication date and available manuscript or early print sources. Compare editorial additions such as dynamics, articulation, fingering and accidentals against the source where possible. Treat dates, titles and attribution as research questions whenever evidence conflicts.",
"လေ့လာမည့်လက်ရာ၏ version ကို အတိအကျ သတ်မှတ်ပါ။ Edition၊ editor၊ ထုတ်ဝေနှစ်နှင့် မူရင်းစာမူအထောက်အထားကို မှတ်တမ်းတင်ပါ။ Dynamics၊ articulation၊ fingering နှင့် accidental များသည် မူရင်းစာမူမှလား၊ editor ထည့်ထားတာလား ခွဲခြားပါ။ ရက်စွဲနှင့် တေးရေးသူအမည် မသေချာလျှင် ထပ်မံစစ်ဆေးပါ။"],
["Form and motivic architecture","ဖွဲ့စည်းပုံနှင့် motive ဖွံ့ဖြိုးမှု",
"Draw a structural map using actual measure numbers or time stamps. Identify recurring motives, phrase boundaries, repetition, sequence, contrast, transition and return. Test whether the work follows a named form or adapts it. Describe evidence rather than imposing a familiar formal label.",
"Measure number သို့မဟုတ် time stamp ဖြင့် form map ဆွဲပါ။ ထပ်ကျော့သော motive၊ phrase boundary၊ sequence၊ contrast၊ transition နှင့် return တို့ကို ရှာပါ။ ရင်းနှီးသော form နာမည်ကို အတင်းမတပ်ဘဲ score အထောက်အထားဖြင့် ရှင်းပြပါ။"],
["Harmony, voice-leading and tonal function","Harmony၊ voice-leading နှင့် tonal function",
"Identify stable points and areas of tension. Where tonal analysis is appropriate, mark tonic, predominant and dominant functions, tonicizations, cadences, pedals and chromatic voice-leading. For modal, post-tonal or non-Western repertories, select an analytical framework appropriate to the work instead of forcing common-practice Roman numerals.",
"တည်ငြိမ်သောနေရာနှင့် tension ရှိသောနေရာကို ခွဲပါ။ Tonal music ဖြစ်လျှင် tonic၊ predominant၊ dominant၊ cadence၊ pedal နှင့် chromatic voice-leading ကို လေ့လာပါ။ Modal သို့မဟုတ် post-tonal music တွင် Roman numeral analysis ကို အတင်းမသုံးဘဲ သင့်လျော်သောနည်းလမ်း ရွေးပါ။"],
["Rhythm, meter and temporal design","Rhythm၊ meter နှင့် အချိန်ဖွဲ့စည်းမှု",
"Distinguish the notated beat from perceived pulse, phrase rhythm and harmonic rhythm. Mark syncopation, hemiola, ostinato, augmentation, diminution and irregular groupings where present. Explain how timing shapes expectation and large-scale tension; do not confuse a performer’s rubato with the written rhythmic structure.",
"ရေးသားထားသော beat၊ ခံစားရသော pulse၊ phrase rhythm နှင့် harmonic rhythm တို့ကို ခွဲခြားပါ။ Syncopation၊ hemiola၊ ostinato နှင့် rhythm ပြောင်းလဲမှုများကို ရှာပါ။ Performer ၏ rubato နှင့် မူရင်း rhythm ဖွဲ့စည်းပုံကို မရောထွေးပါနှင့်။"],
["Texture, orchestration and acoustics","Texture၊ တူရိယာဖွဲ့စည်းမှုနှင့် အသံပညာ",
"Track the distribution of melody, bass, accompaniment and inner voices. Note contrapuntal density, register, timbre, articulation and instrumental doubling. Ask how room acoustics, historical instruments and ensemble size affect what listeners hear. Describe an observed texture before interpreting its expressive role.",
"Melody၊ bass၊ accompaniment နှင့် inner voice တို့ကို ခွဲခြားနားထောင်ပါ။ Counterpoint density၊ register၊ timbre၊ articulation နှင့် instrument doubling ကို မှတ်ပါ။ ခန်းမအသံ၊ ခေတ်ကာလတူရိယာနှင့် ensemble အရွယ်အစား၏ သက်ရောက်မှုကို စဉ်းစားပါ။"],
["Keyboard technique and pedagogy","Keyboard technique နှင့် သင်ကြားရေး",
"For keyboard works, examine hand distribution, voicing, leaps, fingering alternatives, pedaling, ornament execution and physical tension. Separate historical keyboard mechanisms from modern piano capabilities. Plan slow practice, rhythmic variants and isolated voice work only where they support the score; do not invent a keyboard part for a vocal or orchestral composition.",
"Keyboard လက်ရာများတွင် လက်နှစ်ဖက်ခွဲဝေမှု၊ voicing၊ leap၊ fingering၊ pedal၊ ornament နှင့် လက်ကြောတင်းမာမှုကို စစ်ပါ။ ခေတ်ဟောင်း keyboard နှင့် modern piano ၏ စက်ပိုင်းဆိုင်ရာကွာခြားမှုကို ခွဲခြားပါ။ Vocal သို့မဟုတ် orchestral work တွင် မရှိသော piano part ကို မဖန်တီးပါနှင့်။"],
["Performance-practice comparison","သမိုင်းအခြေပြု တီးခတ်ပုံနှိုင်းယှဉ်မှု",
"Compare two named recordings, noting the performers, instrument types and recording years. Time-stamp differences in tempo, ornamentation, phrasing, balance, repeats and expressive freedom. Check contemporary treatises and scholarly editions before calling one choice historically authentic. Separate preference from verifiable practice.",
"Recording နှစ်ခု၏ performer၊ instrument နှင့် recording year ကို မှတ်ပါ။ Tempo၊ ornamentation၊ phrasing၊ balance၊ repeat နှင့် expressive freedom ကွာခြားချက်ကို time stamp ဖြင့် မှတ်တမ်းတင်ပါ။ ကိုယ်ကြိုက်နှစ်သက်မှုနှင့် သမိုင်းအရ အတည်ပြုနိုင်မှုကို ခွဲခြားပါ။"],
["Reception, influence and historiography","လက်ခံမှု၊ သက်ရောက်မှုနှင့် သမိုင်းရေးသားပုံ",
"Distinguish how the work was understood during the composer's lifetime from later critical and concert traditions. Ask which institutions preserved, published and programmed the music, and whose voices were excluded. Trace influence only when documented by letters, quotations, teaching lineages or demonstrable musical relationships.",
"Composer အသက်ရှင်စဉ် လက်ခံမှုနှင့် နောက်ပိုင်းဝေဖန်မှုကို ခွဲခြားပါ။ ဘယ်အဖွဲ့အစည်းများက ဂီတကို ထိန်းသိမ်း၊ ထုတ်ဝေ၊ ဖျော်ဖြေခဲ့သလဲ စစ်ပါ။ သက်ရောက်မှုရှိကြောင်း ပြောဆိုရာတွင် စာများ၊ ကိုးကားချက်များ၊ သင်ကြားရေးအစဉ်အလာနှင့် ဂီတအထောက်အထားကို အသုံးပြုပါ။"],
["Scholarly writing and source evaluation","ပညာရပ်ဆိုင်ရာ စာရေးနည်းနှင့် ရင်းမြစ်စစ်ဆေးမှု",
"Write a concise claim, support it with a score excerpt or documented historical fact, and identify a counterargument. Separate primary sources, critical editions, peer-reviewed research, encyclopedias and popular websites. Include full bibliographic details and page or measure numbers when available; general reading links alone are not claim-level citations.",
"အဓိကအဆိုတစ်ခုရေးပြီး score excerpt သို့မဟုတ် အတည်ပြုထားသော သမိုင်းအချက်အလက်ဖြင့် ထောက်ခံပါ။ Primary source၊ critical edition၊ သုတေသနစာတမ်းနှင့် အထွေထွေ website ကို ခွဲခြားပါ။ ရနိုင်လျှင် စာမျက်နှာနှင့် measure number ပါအောင် ကိုးကားပါ။"]
];
function advancedComposerLaboratory(c){
 const focus=c.work||"a representative composition";
 return advancedTopics.map((x,i)=>[
 x[0]+" — "+focus,x[1]+" — "+focus,
 "Advanced research and analysis for "+c.name+" ("+c.years+"), with a practical focus on "+focus+". "+x[2]+" Complete a short annotated example and explicitly state any information that remains unverified.",
 c.my+" ("+c.years+") ၏ "+focus+" ကို အဓိကထား၍ လေ့လာပါ။ "+x[3]+" နမူနာအပိုင်းတစ်ခုကို မှတ်ချက်ရေးသားပြီး မအတည်ပြုနိုင်သေးသော အချက်အလက်များကို သီးခြားဖော်ပြပါ။"
 ]);
}
