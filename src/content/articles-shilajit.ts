import type { Article } from "./types";

/**
 * Shilajit guides (EN + HI). Traditional-use wording only: no disease-cure, sexual or performance claims,
 * no invented statistics or testimonials. Product facts: Adamya Herbals Himalayan Shilajit resin 10 g,
 * ₹499 (MRP ₹799), label dose 250–500 mg a day, Mfg. Lic. A-4750/19.
 */
const P_EN = "/en/products/himalayan-shilajit-resin-10g";
const P_HI = "/hi/products/himalayan-shilajit-resin-10g";
const LP_EN = "/en/lp/shilajit";
const LP_HI = "/hi/lp/shilajit";
const HUB_EN = "/en/shilajit";
const HUB_HI = "/hi/shilajit";
const A_EN = (s: string) => `/en/articles/${s}`;
const A_HI = (s: string) => `/hi/articles/${s}`;

export const SHILAJIT_ARTICLE_SLUGS = [
  "shilajit-benefits",
  "how-to-take-shilajit-resin",
  "how-to-identify-original-shilajit",
  "shilajit-resin-vs-capsule-vs-powder",
  "shilajit-side-effects",
  "shilajit-price-guide",
] as const;

const IMG = "/lp/shilajit-og.jpg";

export const shilajitArticles: Article[] = [
  // 1. Benefits
  {
    slug: "shilajit-benefits",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "shilajit benefits",
      metaTitle: "Shilajit Benefits: Traditional Uses in Ayurveda",
      metaDescription:
        "Shilajit benefits explained simply: how Ayurveda traditionally uses shilajit as a rasayana for strength, stamina and energy, who it suits and who should avoid it.",
      title: "Shilajit benefits: what Ayurveda traditionally uses it for",
      excerpt:
        "What shilajit is, the benefits Ayurveda traditionally describes — strength, stamina, energy and vitality — and the honest limits of what a supplement can do.",
      body: `Search for "shilajit benefits" and you will find big promises. This guide takes a calmer look: what shilajit actually is, how classical Ayurveda describes it, what it is traditionally used for, and where the evidence is still thin.

## What is shilajit?

Shilajit (Sanskrit: **shilajatu**, "conqueror of rock") is a dark, sticky, mineral-rich resin that seeps out of rock crevices high in the Himalayas during warm months. It forms over a very long time as plant matter breaks down under the rocks. That is why it naturally contains **fulvic acid** along with a range of minerals.

It is sold as a soft resin, as capsules and tablets, and as powder. The resin is the least processed form.

## Shilajit in classical Ayurveda

Classical texts such as the Charaka Samhita count shilajatu among the most valued **rasayanas** — substances taken in small amounts to support strength, vitality and healthy ageing. It is also described as **yogavahi**, meaning it is traditionally combined with other herbs to support their action.

In Ayurvedic terms, shilajit is generally considered warming and is used thoughtfully, in small doses, as part of a daily routine rather than as a quick fix.

## Traditional shilajit benefits

These are the uses Ayurveda traditionally describes. They are not medical claims:

- **Strength and stamina** — shilajit is best known as a rasayana for physical strength (bala).
- **Everyday energy and vitality** — taken in the morning, it is part of many people's daily routine for feeling active.
- **Healthy ageing** — as a rasayana it is traditionally used to support vitality with age.
- **Supporting other herbs** — it is often taken with ashwagandha, milk or honey in traditional preparations.

Shilajit is used by both men and women. Searches like "shilajit benefits for men" are common, but shilajit is a general rasayana and **not a treatment for any sexual or medical condition**.

## What does modern research say?

Researchers have studied shilajit and fulvic acid in laboratories and in a few small human studies, but good-quality evidence in people is still limited. It is fair to call shilajit a traditional supplement with a long history, not a proven medicine. Results, if any, vary from person to person and depend on food, sleep and activity too.

## How to get the most from shilajit

- Choose a **labelled resin from a licensed manufacturer**. Raw or unlabelled shilajit may contain impurities. See [how to identify original shilajit](${A_EN("how-to-identify-original-shilajit")}).
- Take a small amount: the usual label dose is **250–500 mg a day** (a rice-grain to pea-sized piece). See [how to take shilajit resin](${A_EN("how-to-take-shilajit-resin")}).
- Pair it with the basics: regular meals, sleep, movement and less stress.

## Our shilajit

We sell [Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) for ₹499 (MRP ₹799). It carries manufacturing licence number A-4750/19 on the label. You can [order it on WhatsApp or pay by UPI](${LP_EN}).

## Doctor's note

Shilajit is not suitable for everyone. Children under 12, pregnant and breastfeeding women, and anyone with a heart condition, gout or high uric acid, iron overload, a chronic illness or on regular medicines should speak to a doctor first. Read [shilajit side effects and who should avoid it](${A_EN("shilajit-side-effects")}) before you start. For the full topic, see our [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "What are the main benefits of shilajit?",
          a: "In Ayurveda, shilajit is traditionally used as a rasayana to support strength, stamina, energy and overall vitality. It is a supplement, not a treatment for any disease.",
        },
        {
          q: "Is shilajit good for women too?",
          a: "Yes, shilajit is traditionally used by both men and women as a general rasayana. Pregnant and breastfeeding women should not take it without a doctor's advice.",
        },
        {
          q: "How long does shilajit take to show benefits?",
          a: "There is no fixed timeline. As a traditional supplement, any effect is gradual and varies from person to person. Take it regularly at the label dose alongside good food and sleep, and stop if it does not suit you.",
        },
        {
          q: "Does shilajit contain fulvic acid?",
          a: "Yes. Shilajit forms from plant matter breaking down over a long time, so it naturally contains fulvic acid and a range of minerals. The exact amount varies by source and product.",
        },
      ],
    },
    hi: {
      keyword: "शिलाजीत के फायदे",
      metaTitle: "शिलाजीत के फायदे: आयुर्वेद में पारंपरिक उपयोग",
      metaDescription:
        "शिलाजीत के फायदे आसान भाषा में: आयुर्वेद में रसायन के रूप में ताक़त, स्टैमिना और ऊर्जा के लिए पारंपरिक उपयोग, किसके लिए ठीक है और किसे बचना चाहिए।",
      title: "शिलाजीत के फायदे: आयुर्वेद में इसका पारंपरिक उपयोग",
      excerpt:
        "शिलाजीत क्या है, आयुर्वेद में बताए गए पारंपरिक फायदे — ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति — और यह भी कि एक सप्लीमेंट की सीमाएँ क्या हैं।",
      body: `"शिलाजीत के फायदे" खोजने पर बड़े-बड़े दावे मिलते हैं। यह गाइड शांति से समझाती है कि शिलाजीत असल में क्या है, आयुर्वेद के शास्त्र इसके बारे में क्या कहते हैं, परंपरा से इसे किसलिए लिया जाता है और कहाँ अभी प्रमाण कम हैं।

## शिलाजीत क्या है?

शिलाजीत (संस्कृत में **शिलाजतु**, यानी "चट्टान को जीतने वाला") एक गहरे रंग का, चिपचिपा, खनिजों से भरपूर रेज़िन है, जो गर्मियों में हिमालय की ऊँची चट्टानों की दरारों से रिसकर निकलता है। चट्टानों के नीचे पौधों के अवशेष बहुत लंबे समय में टूटकर इसे बनाते हैं, इसीलिए इसमें प्राकृतिक रूप से **फ़ल्विक एसिड** और कई खनिज होते हैं।

यह बाज़ार में रेज़िन, कैप्सूल/टैबलेट और पाउडर के रूप में मिलता है। रेज़िन सबसे कम प्रोसेस्ड रूप है।

## आयुर्वेद के शास्त्रों में शिलाजीत

चरक संहिता जैसे शास्त्रीय ग्रंथों में शिलाजतु को सबसे मूल्यवान **रसायनों** में गिना गया है — यानी ऐसे पदार्थ जिन्हें थोड़ी मात्रा में ताक़त, स्फूर्ति और स्वस्थ बढ़ती उम्र के लिए लिया जाता है। इसे **योगवाही** भी कहा गया है, यानी परंपरा से इसे दूसरी जड़ी-बूटियों के साथ मिलाकर लिया जाता है।

आयुर्वेद में शिलाजीत को आमतौर पर गर्म तासीर वाला माना जाता है, इसलिए इसे जल्दबाज़ी के उपाय की तरह नहीं, बल्कि दिनचर्या के हिस्से के रूप में थोड़ी मात्रा में लिया जाता है।

## शिलाजीत के पारंपरिक फायदे

ये आयुर्वेद में बताए गए पारंपरिक उपयोग हैं, कोई मेडिकल दावा नहीं:

- **ताक़त और स्टैमिना** — शिलाजीत सबसे ज़्यादा शारीरिक बल (बल) के रसायन के रूप में जाना जाता है।
- **रोज़ की ऊर्जा और स्फूर्ति** — सुबह लेने पर यह कई लोगों की दिनचर्या का हिस्सा है।
- **स्वस्थ बढ़ती उम्र** — रसायन के रूप में उम्र के साथ स्फूर्ति बनाए रखने के लिए इसका पारंपरिक उपयोग है।
- **दूसरी जड़ी-बूटियों के साथ** — पारंपरिक नुस्खों में इसे अक्सर अश्वगंधा, दूध या शहद के साथ लिया जाता है।

शिलाजीत पुरुष और महिलाएँ दोनों लेते हैं। "पुरुषों के लिए शिलाजीत के फायदे" जैसी खोज आम है, लेकिन शिलाजीत एक सामान्य रसायन है, **किसी यौन या मेडिकल समस्या का इलाज नहीं**।

## आधुनिक शोध क्या कहता है?

शिलाजीत और फ़ल्विक एसिड पर प्रयोगशाला में और कुछ छोटे मानव अध्ययनों में शोध हुआ है, लेकिन इंसानों पर अच्छे स्तर के प्रमाण अभी सीमित हैं। इसलिए शिलाजीत को लंबे इतिहास वाला पारंपरिक सप्लीमेंट कहना ठीक है, साबित दवा नहीं। असर, अगर हो, तो हर व्यक्ति में अलग होता है और भोजन, नींद व गतिविधि पर भी निर्भर करता है।

## शिलाजीत से सबसे अच्छा लाभ कैसे लें

- **लाइसेंसधारी निर्माता का लेबल वाला रेज़िन** चुनें। कच्चे या बिना लेबल वाले शिलाजीत में अशुद्धियाँ हो सकती हैं। देखें: [ओरिजिनल शिलाजीत की पहचान कैसे करें](${A_HI("how-to-identify-original-shilajit")})।
- थोड़ी मात्रा लें: लेबल पर सामान्य मात्रा **रोज़ 250–500 मिलीग्राम** है (चावल के दाने से मटर के दाने जितना)। देखें: [शिलाजीत खाने का सही तरीका](${A_HI("how-to-take-shilajit-resin")})।
- बुनियादी आदतों के साथ लें: समय पर भोजन, नींद, व्यायाम और कम तनाव।

## हमारा शिलाजीत

हम [अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) ₹499 (MRP ₹799) में देते हैं। इसके लेबल पर निर्माण लाइसेंस नंबर A-4750/19 लिखा है। आप इसे [WhatsApp पर ऑर्डर या UPI से भुगतान](${LP_HI}) करके मँगा सकते हैं।

## डॉक्टर की सलाह

शिलाजीत हर किसी के लिए नहीं है। 12 साल से कम उम्र के बच्चे, गर्भवती और स्तनपान कराने वाली महिलाएँ, और दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, किसी पुरानी बीमारी वाले या नियमित दवा लेने वाले लोग पहले डॉक्टर से बात करें। शुरू करने से पहले [शिलाजीत के नुकसान और किसे नहीं खाना चाहिए](${A_HI("shilajit-side-effects")}) ज़रूर पढ़ें। पूरी जानकारी के लिए हमारी [शिलाजीत गाइड](${HUB_HI}) देखें।`,
      faq: [
        {
          q: "शिलाजीत के मुख्य फायदे क्या हैं?",
          a: "आयुर्वेद में शिलाजीत को रसायन के रूप में परंपरा से ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति को सहारा देने के लिए लिया जाता है। यह एक सप्लीमेंट है, किसी बीमारी का इलाज नहीं।",
        },
        {
          q: "क्या महिलाएँ भी शिलाजीत ले सकती हैं?",
          a: "हाँ, शिलाजीत को परंपरा से पुरुष और महिलाएँ दोनों सामान्य रसायन के रूप में लेते हैं। गर्भवती और स्तनपान कराने वाली महिलाएँ डॉक्टर की सलाह के बिना इसे न लें।",
        },
        {
          q: "शिलाजीत का असर कितने दिन में दिखता है?",
          a: "कोई तय समय नहीं है। पारंपरिक सप्लीमेंट होने के कारण असर धीरे-धीरे और हर व्यक्ति में अलग होता है। अच्छे भोजन और नींद के साथ लेबल पर दी गई मात्रा नियमित लें, और सूट न करे तो बंद कर दें।",
        },
        {
          q: "क्या शिलाजीत में फ़ल्विक एसिड होता है?",
          a: "हाँ। शिलाजीत पौधों के अवशेषों के लंबे समय में टूटने से बनता है, इसलिए इसमें प्राकृतिक रूप से फ़ल्विक एसिड और कई खनिज होते हैं। सही मात्रा स्रोत और उत्पाद के अनुसार अलग होती है।",
        },
      ],
    },
  },
  // 2. How to take
  {
    slug: "how-to-take-shilajit-resin",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "how to take shilajit resin",
      metaTitle: "How to Take Shilajit Resin: Dose, Time & With Milk",
      metaDescription:
        "How to take shilajit resin the right way: label dose 250–500 mg, how to measure it, warm water or milk, best time of day, how many days, and mistakes to avoid.",
      title: "How to take shilajit resin: dose, timing and the right way",
      excerpt:
        "A step-by-step guide to taking shilajit resin — how much, when, with water or milk, how long to continue, and the common mistakes to avoid.",
      body: `Shilajit resin is simple to use once you know the basics. The key is a **small amount, taken regularly**, not a big spoonful. Here is the method most labels and Ayurvedic practitioners follow.

## How much shilajit to take (dose)

The usual label dose for shilajit resin is **250–500 mg a day**, or as directed by your healthcare professional. You don't need a scale:

- **About 250 mg** is roughly the size of a grain of rice.
- **About 500 mg** is roughly the size of a pea.

Start with the rice-grain size for the first week and see how you feel. Never go above the dose on your label.

## Step by step: how to take shilajit resin

- Take the resin out with a **clean, dry spoon** or the spatula in the pack. Moisture spoils the resin.
- Add it to a cup of **warm (not boiling) water or milk**.
- Stir for a minute until it dissolves completely. The drink turns golden-brown to dark brown.
- Drink it **once a day**.

If the resin is too hard (common in winter), warm the closed jar in your hands for a minute. If it is too soft (in summer), keep it in a cooler spot.

## Shilajit with milk or water?

Both are traditional. **Warm milk** is the classic Ayurvedic pairing for rasayanas and softens the strong, earthy taste. **Warm water** is lighter and suits people who avoid dairy. You can add a little honey once the drink has cooled to warm, not hot. Choose whatever you will stick with.

## When to take shilajit: best time of day

Most people take shilajit **in the morning**, with or after a light breakfast. Many find this fits a daily routine best. If shilajit makes your stomach uneasy on an empty stomach, take it after food.

## How many days should you take shilajit?

Ayurvedic practitioners usually suggest rasayanas as a **course with breaks**, not endlessly. There is no single rule. Ask your practitioner how long is right for you, and stop if it does not suit you. A 10 g jar lasts roughly **3 to 6 weeks** at 250–500 mg a day.

## Mistakes to avoid

- **Taking too much.** More is not better. Stay within 250–500 mg.
- **Using a wet spoon.** Water gets into the jar and spoils the resin.
- **Dissolving in boiling liquid.** Warm is enough.
- **Mixing with many other supplements** without advice.
- **Buying unlabelled resin.** See [how to identify original shilajit](${A_EN("how-to-identify-original-shilajit")}).

## Our resin

[Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) is ₹499 (MRP ₹799), with the label dose of 250–500 mg a day printed on the jar. [Order it here](${LP_EN}) with UPI or WhatsApp.

## Doctor's note

Do not give shilajit to children under 12. Pregnant or breastfeeding women should not take it without medical advice. If you have a heart condition, gout or high uric acid, iron overload or a chronic illness, or take regular medicines, check with your doctor first. Stop if you notice stomach upset, rash or anything unusual. See [shilajit side effects](${A_EN("shilajit-side-effects")}) and our full [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "How much shilajit resin should I take per day?",
          a: "The usual label dose is 250–500 mg a day — about a rice-grain to pea-sized piece — or as directed by your healthcare professional. Start with the smaller amount.",
        },
        {
          q: "Can I take shilajit with milk?",
          a: "Yes. Dissolving shilajit in warm milk is a traditional Ayurvedic way to take it. Warm water works too if you avoid dairy.",
        },
        {
          q: "What is the best time to take shilajit?",
          a: "Most people take it once a day in the morning, with or after a light breakfast. Take it after food if it upsets your stomach.",
        },
        {
          q: "How many days should I take shilajit?",
          a: "Ayurveda usually uses rasayanas as a course with breaks. There is no fixed rule, so ask your practitioner how long suits you. A 10 g jar lasts about 3–6 weeks at the label dose.",
        },
        {
          q: "Can I chew shilajit resin directly?",
          a: "It is traditionally dissolved in a warm drink, which is easier to measure and gentler on taste. Follow the method on your label.",
        },
      ],
    },
    hi: {
      keyword: "शिलाजीत खाने का तरीका",
      metaTitle: "शिलाजीत खाने का सही तरीका: मात्रा, समय और दूध के साथ",
      metaDescription:
        "शिलाजीत कैसे खाएँ: लेबल पर मात्रा 250–500 मिलीग्राम, कैसे नापें, दूध या पानी में, कब खाएँ, कितने दिन खाएँ और किन गलतियों से बचें — आसान गाइड।",
      title: "शिलाजीत खाने का सही तरीका: कितना, कब और कैसे",
      excerpt:
        "शिलाजीत रेज़िन कैसे खाएँ — कितनी मात्रा, कब, दूध या पानी में, कितने दिन तक, और किन आम गलतियों से बचें। आसान स्टेप-बाय-स्टेप गाइड।",
      body: `शिलाजीत रेज़िन इस्तेमाल करना आसान है, बस बुनियादी बातें पता हों। सबसे ज़रूरी है **थोड़ी मात्रा, नियमित रूप से** — बड़ा चम्मच भरकर नहीं। ज़्यादातर लेबल और आयुर्वेदिक वैद्य यही तरीका बताते हैं।

## शिलाजीत कितना खाएँ (मात्रा)

शिलाजीत रेज़िन की सामान्य लेबल मात्रा **रोज़ 250–500 मिलीग्राम** है, या स्वास्थ्य विशेषज्ञ की सलाह अनुसार। तराज़ू की ज़रूरत नहीं:

- **लगभग 250 मिलीग्राम** — चावल के एक दाने जितना।
- **लगभग 500 मिलीग्राम** — मटर के एक दाने जितना।

पहले हफ़्ते चावल के दाने जितनी मात्रा से शुरू करें और देखें कि शरीर कैसा महसूस करता है। लेबल पर लिखी मात्रा से ज़्यादा कभी न लें।

## स्टेप बाय स्टेप: शिलाजीत कैसे खाएँ

- **साफ़, सूखे चम्मच** या पैक के स्पैचुला से रेज़िन निकालें। नमी से रेज़िन ख़राब होता है।
- इसे एक कप **गुनगुने (उबलते नहीं) पानी या दूध** में डालें।
- एक मिनट तक चलाएँ जब तक पूरा घुल न जाए। पेय सुनहरा-भूरा से गहरा भूरा हो जाएगा।
- इसे **दिन में एक बार** पिएँ।

अगर रेज़िन बहुत सख़्त हो (सर्दियों में आम है), तो बंद जार को एक मिनट हथेलियों में गरम करें। बहुत नरम हो (गर्मियों में), तो ठंडी जगह रखें।

## शिलाजीत दूध में कैसे पिएँ या पानी में?

दोनों पारंपरिक तरीके हैं। **गुनगुना दूध** रसायनों के साथ आयुर्वेद की पुरानी जोड़ी है और शिलाजीत का तेज़, मिट्टी जैसा स्वाद हल्का कर देता है। **गुनगुना पानी** हल्का रहता है और दूध न लेने वालों के लिए ठीक है। पेय गुनगुना होने पर थोड़ा शहद मिला सकते हैं (गरम में नहीं)। जो तरीका आप रोज़ निभा सकें, वही चुनें।

## शिलाजीत कब खाना चाहिए: सही समय

ज़्यादातर लोग शिलाजीत **सुबह** हल्के नाश्ते के साथ या बाद में लेते हैं, क्योंकि यह दिनचर्या में आसानी से बैठ जाता है। अगर ख़ाली पेट लेने से पेट में बेचैनी हो, तो खाने के बाद लें।

## शिलाजीत कितने दिन खाना चाहिए?

आयुर्वेदिक वैद्य आमतौर पर रसायन को **बीच-बीच में ब्रेक के साथ एक कोर्स** की तरह लेने की सलाह देते हैं, लगातार हमेशा नहीं। कोई एक नियम नहीं है — अपने वैद्य से पूछें कि आपके लिए कितने दिन ठीक है, और सूट न करे तो बंद कर दें। रोज़ 250–500 मिलीग्राम लेने पर 10 ग्राम का जार लगभग **3 से 6 हफ़्ते** चलता है।

## इन गलतियों से बचें

- **ज़्यादा मात्रा लेना।** ज़्यादा का मतलब बेहतर नहीं। 250–500 मिलीग्राम में ही रहें।
- **गीला चम्मच डालना।** जार में पानी जाने से रेज़िन ख़राब होता है।
- **उबलते पेय में घोलना।** गुनगुना काफ़ी है।
- **बिना सलाह कई सप्लीमेंट साथ लेना।**
- **बिना लेबल वाला रेज़िन ख़रीदना।** देखें: [ओरिजिनल शिलाजीत की पहचान](${A_HI("how-to-identify-original-shilajit")})।

## हमारा रेज़िन

[अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) ₹499 (MRP ₹799) में, जार पर रोज़ 250–500 मिलीग्राम की मात्रा छपी है। UPI या WhatsApp से [यहाँ ऑर्डर करें](${LP_HI})।

## डॉक्टर की सलाह

12 साल से कम उम्र के बच्चों को शिलाजीत न दें। गर्भवती या स्तनपान कराने वाली महिलाएँ डॉक्टर की सलाह के बिना न लें। दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता या कोई पुरानी बीमारी हो, या नियमित दवा लेते हों, तो पहले डॉक्टर से पूछें। पेट ख़राब होने, दाने या कुछ भी असामान्य लगने पर बंद करें। देखें: [शिलाजीत के नुकसान](${A_HI("shilajit-side-effects")}) और हमारी पूरी [शिलाजीत गाइड](${HUB_HI})।`,
      faq: [
        {
          q: "रोज़ कितना शिलाजीत खाना चाहिए?",
          a: "सामान्य लेबल मात्रा रोज़ 250–500 मिलीग्राम है — चावल के दाने से मटर के दाने जितना — या स्वास्थ्य विशेषज्ञ की सलाह अनुसार। कम मात्रा से शुरू करें।",
        },
        {
          q: "क्या शिलाजीत दूध के साथ ले सकते हैं?",
          a: "हाँ। गुनगुने दूध में शिलाजीत घोलकर पीना आयुर्वेद का पारंपरिक तरीका है। दूध न लेते हों तो गुनगुना पानी भी ठीक है।",
        },
        {
          q: "शिलाजीत कब खाना चाहिए?",
          a: "ज़्यादातर लोग इसे दिन में एक बार सुबह, हल्के नाश्ते के साथ या बाद में लेते हैं। पेट में बेचैनी हो तो खाने के बाद लें।",
        },
        {
          q: "शिलाजीत कितने दिन तक खाना चाहिए?",
          a: "आयुर्वेद में रसायन आमतौर पर ब्रेक के साथ कोर्स की तरह लिए जाते हैं। कोई तय नियम नहीं, इसलिए अपने वैद्य से पूछें। लेबल मात्रा पर 10 ग्राम का जार लगभग 3–6 हफ़्ते चलता है।",
        },
        {
          q: "क्या शिलाजीत रेज़िन सीधे चबा सकते हैं?",
          a: "परंपरा से इसे गुनगुने पेय में घोलकर लिया जाता है, जिससे मात्रा नापना आसान होता है और स्वाद भी हल्का रहता है। अपने लेबल पर दिया तरीका अपनाएँ।",
        },
      ],
    },
  },
  // 3. Identify original
  {
    slug: "how-to-identify-original-shilajit",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "how to identify original shilajit",
      metaTitle: "How to Identify Original Shilajit: Pure vs Fake Tests",
      metaDescription:
        "How to identify original shilajit: simple home checks (texture, warmth, dissolving) and the label details that matter more — licence number, batch, maker.",
      title: "How to identify original (pure) shilajit: home checks and label checks",
      excerpt:
        "Simple home checks for pure shilajit resin, why they are only rough guides, and the label and seller checks that matter most.",
      body: `Because shilajit is valuable, the market has many low-quality and mixed products. People often search "original shilajit kaise pehchane" or "asli shilajit ki pehchan". Home tests can help you spot obvious problems, but **no home test can prove purity**. Here is what to check, in order of importance.

## 1. Check the label first (most important)

A genuine, legally sold Ayurvedic product in India should clearly show:

- **Manufacturer's name and full address**
- **Manufacturing licence number** (for example, our jar shows Mfg. Lic. No. A-4750/19)
- **Batch number, manufacturing date and expiry / best-before date**
- **Net quantity** (for example 10 g) and **MRP**
- **Dose and cautions**

If a product has no licence number, no batch details or no address, avoid it. This matters far more than any home test.

## 2. Buy from a trusted seller

Loose "Himalayan shilajit" sold by weight without a label, or through anonymous ads, is risky. **Raw or unpurified shilajit may contain impurities**, including heavy metals, which is why purified, labelled products from licensed makers are recommended.

## 3. Simple home checks for shilajit resin

These are rough guides only:

- **Look:** genuine resin is dark brown to black and has a glossy surface.
- **Warmth test:** it is firm or even hard when cool, and turns soft and stretchy with the warmth of your fingers. It should not stay runny like syrup at room temperature, or stay rock-hard in your hand.
- **Water test:** a small piece dissolves almost completely in warm water within a few minutes. The water turns golden-brown to dark brown, with **little or no gritty residue** at the bottom.
- **Smell and taste:** strong, earthy and slightly bitter. It should not smell sweet or of chemicals.

## Tests that are not reliable

You may see advice to burn shilajit with a flame or drop it into cold water and watch for "threads". These tests are unreliable and burning a product can be unsafe. A lab report from the manufacturer (if available) and a proper label tell you much more.

## Resin, capsule or powder — which is easiest to check?

Resin is the least processed form and the easiest to inspect at home. With capsules and powders you cannot see or test the shilajit itself, so the label and brand become even more important. See [shilajit resin vs capsule vs powder](${A_EN("shilajit-resin-vs-capsule-vs-powder")}).

## Our product

[Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) comes in a sealed amber glass jar with the manufacturer's licence number (A-4750/19), dose and cautions on the label. The price is ₹499 (MRP ₹799). [Order here](${LP_EN}).

## Doctor's note

Even genuine shilajit is not for everyone. Children under 12, pregnant and breastfeeding women, and people with a heart condition, gout or high uric acid, iron overload, a chronic illness or on regular medicines should consult a doctor first. See [shilajit side effects](${A_EN("shilajit-side-effects")}) and our [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "How can I check if shilajit is original at home?",
          a: "Genuine resin is dark and glossy, firm when cool and soft with finger warmth, and dissolves almost completely in warm water with little residue. These are rough guides only — a proper label with a licence number matters more.",
        },
        {
          q: "Does pure shilajit dissolve completely in water?",
          a: "Good-quality resin dissolves almost completely in warm water within a few minutes, turning it golden-brown to dark brown, with little or no gritty residue.",
        },
        {
          q: "Is the flame (burn) test for shilajit reliable?",
          a: "No. Burn tests are not reliable and can be unsafe. Check the label, licence number and seller instead.",
        },
        {
          q: "What should an original shilajit label show?",
          a: "The manufacturer's name and address, manufacturing licence number, batch number, manufacturing and expiry dates, net quantity, MRP, dose and cautions.",
        },
      ],
    },
    hi: {
      keyword: "ओरिजिनल शिलाजीत की पहचान",
      metaTitle: "ओरिजिनल शिलाजीत की पहचान कैसे करें: असली बनाम नकली",
      metaDescription:
        "असली शिलाजीत की पहचान कैसे करें: घर पर आसान जाँच (बनावट, गर्माहट, पानी में घुलना) और उससे ज़्यादा ज़रूरी लेबल की बातें — लाइसेंस नंबर, बैच, निर्माता।",
      title: "ओरिजिनल (असली) शिलाजीत की पहचान कैसे करें: घरेलू और लेबल जाँच",
      excerpt:
        "शुद्ध शिलाजीत रेज़िन की घर पर आसान जाँच, ये सिर्फ़ मोटा अंदाज़ा क्यों हैं, और लेबल व विक्रेता की कौन-सी बातें सबसे ज़्यादा मायने रखती हैं।",
      body: `शिलाजीत कीमती होने के कारण बाज़ार में कई घटिया और मिलावटी उत्पाद भी हैं। लोग अक्सर "ओरिजिनल शिलाजीत कैसे पहचाने" या "असली शिलाजीत की पहचान" खोजते हैं। घरेलू जाँच से साफ़ गड़बड़ी पकड़ी जा सकती है, लेकिन **कोई भी घरेलू जाँच शुद्धता साबित नहीं कर सकती**। ज़रूरी बातें, महत्व के क्रम में:

## 1. सबसे पहले लेबल देखें (सबसे ज़रूरी)

भारत में क़ानूनी रूप से बिकने वाले असली आयुर्वेदिक उत्पाद पर साफ़ लिखा होना चाहिए:

- **निर्माता का नाम और पूरा पता**
- **निर्माण लाइसेंस नंबर** (जैसे हमारे जार पर Mfg. Lic. No. A-4750/19)
- **बैच नंबर, निर्माण तिथि और एक्सपायरी / बेस्ट-बिफ़ोर तिथि**
- **शुद्ध मात्रा** (जैसे 10 ग्राम) और **MRP**
- **मात्रा और सावधानियाँ**

जिस उत्पाद पर लाइसेंस नंबर, बैच विवरण या पता न हो, उससे बचें। यह किसी भी घरेलू जाँच से कहीं ज़्यादा मायने रखता है।

## 2. भरोसेमंद विक्रेता से ख़रीदें

बिना लेबल के तौलकर बिकने वाला खुला "हिमालयन शिलाजीत" या अनजान विज्ञापनों से ख़रीदना जोखिम भरा है। **कच्चे या बिना शुद्ध किए शिलाजीत में भारी धातुओं समेत अशुद्धियाँ हो सकती हैं**, इसीलिए लाइसेंसधारी निर्माता का शुद्ध किया हुआ, लेबल वाला उत्पाद लेने की सलाह दी जाती है।

## 3. शिलाजीत रेज़िन की घरेलू जाँच

ये सिर्फ़ मोटा अंदाज़ा हैं:

- **रंग-रूप:** असली रेज़िन गहरा भूरा से काला और सतह चमकदार होती है।
- **गर्माहट जाँच:** ठंडा होने पर सख़्त रहता है और उँगलियों की गर्मी से नरम व खिंचने वाला हो जाता है। कमरे के तापमान पर शरबत की तरह बहना या हाथ में भी पत्थर जैसा सख़्त रहना ठीक संकेत नहीं।
- **पानी जाँच:** छोटा टुकड़ा गुनगुने पानी में कुछ मिनट में लगभग पूरा घुल जाता है। पानी सुनहरा-भूरा से गहरा भूरा होता है और तली में **बहुत कम या कोई किरकिरा अवशेष नहीं** बचता।
- **गंध और स्वाद:** तेज़, मिट्टी जैसी गंध और हल्का कड़वा स्वाद। मीठी या केमिकल जैसी गंध नहीं होनी चाहिए।

## कौन-सी जाँच भरोसेमंद नहीं

कई जगह शिलाजीत को आग में जलाने या ठंडे पानी में डालकर "धागे" देखने की सलाह मिलती है। ये जाँच भरोसेमंद नहीं हैं और जलाना असुरक्षित भी हो सकता है। निर्माता की लैब रिपोर्ट (अगर उपलब्ध हो) और सही लेबल कहीं ज़्यादा बताते हैं।

## रेज़िन, कैप्सूल या पाउडर — किसे जाँचना आसान?

रेज़िन सबसे कम प्रोसेस्ड रूप है और घर पर देखना-परखना सबसे आसान। कैप्सूल और पाउडर में आप शिलाजीत को देख या परख नहीं सकते, इसलिए वहाँ लेबल और ब्रांड और भी ज़रूरी हो जाते हैं। देखें: [शिलाजीत रेज़िन बनाम कैप्सूल बनाम पाउडर](${A_HI("shilajit-resin-vs-capsule-vs-powder")})।

## हमारा उत्पाद

[अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) सील बंद एम्बर काँच के जार में आता है, जिसके लेबल पर निर्माता का लाइसेंस नंबर (A-4750/19), मात्रा और सावधानियाँ लिखी हैं। कीमत ₹499 (MRP ₹799)। [यहाँ ऑर्डर करें](${LP_HI})।

## डॉक्टर की सलाह

असली शिलाजीत भी हर किसी के लिए नहीं है। 12 साल से कम उम्र के बच्चे, गर्भवती और स्तनपान कराने वाली महिलाएँ, और दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, पुरानी बीमारी वाले या नियमित दवा लेने वाले लोग पहले डॉक्टर से सलाह लें। देखें: [शिलाजीत के नुकसान](${A_HI("shilajit-side-effects")}) और हमारी [शिलाजीत गाइड](${HUB_HI})।`,
      faq: [
        {
          q: "घर पर असली शिलाजीत की पहचान कैसे करें?",
          a: "असली रेज़िन गहरा और चमकदार होता है, ठंडा होने पर सख़्त और उँगलियों की गर्मी से नरम होता है, और गुनगुने पानी में बहुत कम अवशेष के साथ लगभग पूरा घुल जाता है। ये सिर्फ़ मोटा अंदाज़ा है — लाइसेंस नंबर वाला सही लेबल ज़्यादा ज़रूरी है।",
        },
        {
          q: "क्या शुद्ध शिलाजीत पानी में पूरा घुल जाता है?",
          a: "अच्छी गुणवत्ता का रेज़िन गुनगुने पानी में कुछ मिनट में लगभग पूरा घुल जाता है, पानी सुनहरा-भूरा से गहरा भूरा हो जाता है और बहुत कम या कोई किरकिरा अवशेष नहीं बचता।",
        },
        {
          q: "क्या शिलाजीत को जलाकर जाँचना सही है?",
          a: "नहीं। जलाकर जाँच भरोसेमंद नहीं है और असुरक्षित हो सकती है। इसकी जगह लेबल, लाइसेंस नंबर और विक्रेता की जाँच करें।",
        },
        {
          q: "ओरिजिनल शिलाजीत के लेबल पर क्या लिखा होना चाहिए?",
          a: "निर्माता का नाम और पता, निर्माण लाइसेंस नंबर, बैच नंबर, निर्माण और एक्सपायरी तिथि, शुद्ध मात्रा, MRP, मात्रा और सावधानियाँ।",
        },
      ],
    },
  },
  // 4. Resin vs capsule vs powder
  {
    slug: "shilajit-resin-vs-capsule-vs-powder",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "shilajit resin vs capsule",
      metaTitle: "Shilajit Resin vs Capsule vs Powder: Which to Choose?",
      metaDescription:
        "Shilajit resin vs capsules vs powder (and gummies): how each form differs in processing, dosing, convenience, what to check on the label and who each suits.",
      title: "Shilajit resin vs capsule vs powder: which form should you choose?",
      excerpt:
        "An honest comparison of shilajit resin, capsules, powder and gummies — processing, dosing, convenience and what to check on each label.",
      body: `Shilajit is sold in several forms: **resin**, **capsules or tablets**, **powder** and, more recently, **gummies**. None of them is "best" for everyone. The right choice depends on what matters to you: how processed it is, how convenient it is, and how easy it is to check.

## Shilajit resin

Resin is purified shilajit in its semi-solid form, and the **least processed** option.

- **Pros:** closest to the traditional form; easy to inspect at home (texture, dissolving); flexible dose; usually just one ingredient.
- **Cons:** sticky; you measure by eye (rice-grain to pea-sized); strong earthy taste; texture changes with the weather.
- **Suits:** people who want the traditional form and don't mind a 1-minute routine.

## Shilajit capsules and tablets

These usually contain a dried shilajit extract, sometimes mixed with other herbs and fillers.

- **Pros:** convenient and portable; fixed dose; no taste.
- **Cons:** you can't see or test the shilajit inside; strength and other ingredients vary by brand; more processing.
- **Suits:** people who travel a lot or dislike the taste. Check the **amount of shilajit per capsule** and the full ingredient list.

## Shilajit powder

Powder is dried and ground shilajit extract.

- **Pros:** easy to mix into drinks.
- **Cons:** absorbs moisture and clumps; easier to mix with other powders, so the label matters even more.
- **Suits:** people who prefer mixing with drinks, and trust the brand.

## Shilajit gummies

Gummies are a newer, sweetened form.

- **Pros:** pleasant taste, easy to take.
- **Cons:** added sugar and other ingredients; shilajit content varies; not a traditional form.
- **Suits:** only if the label clearly shows the amount of shilajit and you are fine with the sugar.

## Quick comparison

- **Least processed:** resin
- **Most convenient:** capsules
- **Easiest to check at home:** resin
- **Fixed dose:** capsules and gummies
- **Fewest extra ingredients:** usually resin — always read the label

## What to check whatever form you buy

Whatever the form, look for the manufacturer's **licence number, address, batch number, dates, net quantity, dose and cautions**. See [how to identify original shilajit](${A_EN("how-to-identify-original-shilajit")}).

## Why we chose resin

We sell [Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) because resin is the traditional, least processed form and is easy for customers to inspect. It costs ₹499 (MRP ₹799) and the label dose is 250–500 mg a day. See [how to take shilajit resin](${A_EN("how-to-take-shilajit-resin")}) or [order here](${LP_EN}).

## Doctor's note

The form does not change who should be careful. Children under 12, pregnant and breastfeeding women, and anyone with a heart condition, gout or high uric acid, iron overload, a chronic illness or on regular medicines should consult a doctor first. Don't combine several shilajit products at once. More in our [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "Which is better: shilajit resin or capsules?",
          a: "Neither is best for everyone. Resin is the least processed and easiest to check at home; capsules are more convenient with a fixed dose. Choose a labelled product from a licensed maker either way.",
        },
        {
          q: "Is shilajit powder as good as resin?",
          a: "Powder is a dried extract. It is easy to mix but harder to verify and can clump with moisture. Resin is closer to the traditional form. Read the label carefully for either.",
        },
        {
          q: "Are shilajit gummies a good option?",
          a: "Gummies contain added sugar and other ingredients, and shilajit content varies. Check how much shilajit each gummy contains before buying.",
        },
        {
          q: "Can I take shilajit resin and capsules together?",
          a: "It is best not to combine several shilajit products, as it becomes easy to exceed the dose. Stick to one product at its label dose.",
        },
      ],
    },
    hi: {
      keyword: "शिलाजीत रेज़िन या कैप्सूल",
      metaTitle: "शिलाजीत रेज़िन vs कैप्सूल vs पाउडर: कौन-सा बेहतर?",
      metaDescription:
        "शिलाजीत रेज़िन, कैप्सूल, पाउडर और गमीज़ में क्या फ़र्क है: प्रोसेसिंग, मात्रा, सुविधा, लेबल पर क्या देखें और कौन-सा रूप किसके लिए ठीक है।",
      title: "शिलाजीत रेज़िन vs कैप्सूल vs पाउडर: कौन-सा रूप चुनें?",
      excerpt:
        "शिलाजीत रेज़िन, कैप्सूल, पाउडर और गमीज़ की ईमानदार तुलना — प्रोसेसिंग, मात्रा, सुविधा और हर लेबल पर क्या जाँचें।",
      body: `शिलाजीत कई रूपों में मिलता है: **रेज़िन**, **कैप्सूल या टैबलेट**, **पाउडर** और अब **गमीज़** भी। इनमें से कोई एक सबके लिए "सबसे अच्छा" नहीं है। सही चुनाव इस पर निर्भर है कि आपके लिए क्या ज़रूरी है: कितना प्रोसेस्ड है, कितना सुविधाजनक है और जाँचना कितना आसान है।

## शिलाजीत रेज़िन

रेज़िन शुद्ध किया हुआ शिलाजीत है, अर्ध-ठोस रूप में — और **सबसे कम प्रोसेस्ड** विकल्प।

- **फ़ायदे:** पारंपरिक रूप के सबसे क़रीब; घर पर परखना आसान (बनावट, घुलना); मात्रा अपने हिसाब से; आमतौर पर एक ही सामग्री।
- **कमियाँ:** चिपचिपा; मात्रा अंदाज़े से (चावल से मटर के दाने जितनी); तेज़ मिट्टी जैसा स्वाद; मौसम के साथ बनावट बदलती है।
- **किसके लिए:** जो पारंपरिक रूप चाहते हैं और एक मिनट की दिनचर्या से परेशानी नहीं।

## शिलाजीत कैप्सूल और टैबलेट

इनमें आमतौर पर सूखा शिलाजीत एक्सट्रैक्ट होता है, कभी-कभी दूसरी जड़ी-बूटियों और फ़िलर के साथ।

- **फ़ायदे:** सुविधाजनक, साथ ले जाना आसान; तय मात्रा; स्वाद नहीं।
- **कमियाँ:** अंदर का शिलाजीत देख या परख नहीं सकते; ताक़त और बाक़ी सामग्री ब्रांड के अनुसार अलग; ज़्यादा प्रोसेसिंग।
- **किसके लिए:** जो बहुत यात्रा करते हैं या स्वाद पसंद नहीं। **हर कैप्सूल में शिलाजीत की मात्रा** और पूरी सामग्री सूची ज़रूर देखें।

## शिलाजीत पाउडर

पाउडर सूखा और पिसा हुआ शिलाजीत एक्सट्रैक्ट है।

- **फ़ायदे:** पेय में मिलाना आसान।
- **कमियाँ:** नमी सोखकर गाँठें बनती हैं; दूसरे पाउडर मिलाना आसान, इसलिए लेबल और भी ज़रूरी।
- **किसके लिए:** जो पेय में मिलाना पसंद करते हैं और ब्रांड पर भरोसा है।

## शिलाजीत गमीज़

गमीज़ नया, मीठा रूप है।

- **फ़ायदे:** स्वाद अच्छा, लेना आसान।
- **कमियाँ:** अतिरिक्त चीनी और दूसरी सामग्री; शिलाजीत की मात्रा अलग-अलग; पारंपरिक रूप नहीं।
- **किसके लिए:** तभी, जब लेबल पर शिलाजीत की मात्रा साफ़ लिखी हो और चीनी से परहेज़ न हो।

## एक नज़र में तुलना

- **सबसे कम प्रोसेस्ड:** रेज़िन
- **सबसे सुविधाजनक:** कैप्सूल
- **घर पर परखना सबसे आसान:** रेज़िन
- **तय मात्रा:** कैप्सूल और गमीज़
- **सबसे कम अतिरिक्त सामग्री:** आमतौर पर रेज़िन — लेबल हमेशा पढ़ें

## कोई भी रूप लें, ये ज़रूर जाँचें

रूप कोई भी हो, निर्माता का **लाइसेंस नंबर, पता, बैच नंबर, तिथियाँ, शुद्ध मात्रा, मात्रा और सावधानियाँ** देखें। देखें: [ओरिजिनल शिलाजीत की पहचान](${A_HI("how-to-identify-original-shilajit")})।

## हमने रेज़िन क्यों चुना

हम [अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) देते हैं क्योंकि रेज़िन पारंपरिक, सबसे कम प्रोसेस्ड रूप है और ग्राहक इसे आसानी से परख सकते हैं। कीमत ₹499 (MRP ₹799), लेबल मात्रा रोज़ 250–500 मिलीग्राम। देखें: [शिलाजीत खाने का तरीका](${A_HI("how-to-take-shilajit-resin")}) या [यहाँ ऑर्डर करें](${LP_HI})।

## डॉक्टर की सलाह

रूप बदलने से सावधानी नहीं बदलती। 12 साल से कम उम्र के बच्चे, गर्भवती और स्तनपान कराने वाली महिलाएँ, और दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, पुरानी बीमारी वाले या नियमित दवा लेने वाले लोग पहले डॉक्टर से सलाह लें। एक साथ कई शिलाजीत उत्पाद न लें। और जानकारी हमारी [शिलाजीत गाइड](${HUB_HI}) में।`,
      faq: [
        {
          q: "शिलाजीत रेज़िन बेहतर है या कैप्सूल?",
          a: "कोई एक सबके लिए बेहतर नहीं। रेज़िन सबसे कम प्रोसेस्ड है और घर पर परखना आसान है; कैप्सूल ज़्यादा सुविधाजनक हैं और मात्रा तय होती है। दोनों में लाइसेंसधारी निर्माता का लेबल वाला उत्पाद चुनें।",
        },
        {
          q: "क्या शिलाजीत पाउडर रेज़िन जितना अच्छा है?",
          a: "पाउडर सूखा एक्सट्रैक्ट है। मिलाना आसान है, पर परखना मुश्किल और नमी से गाँठें बनती हैं। रेज़िन पारंपरिक रूप के ज़्यादा क़रीब है। दोनों में लेबल ध्यान से पढ़ें।",
        },
        {
          q: "क्या शिलाजीत गमीज़ अच्छा विकल्प है?",
          a: "गमीज़ में अतिरिक्त चीनी और दूसरी सामग्री होती है और शिलाजीत की मात्रा अलग-अलग होती है। ख़रीदने से पहले देखें कि हर गमी में कितना शिलाजीत है।",
        },
        {
          q: "क्या रेज़िन और कैप्सूल साथ में ले सकते हैं?",
          a: "कई शिलाजीत उत्पाद साथ न लें, इससे मात्रा आसानी से ज़्यादा हो जाती है। एक ही उत्पाद उसकी लेबल मात्रा में लें।",
        },
      ],
    },
  },
  // 5. Side effects
  {
    slug: "shilajit-side-effects",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "shilajit side effects",
      metaTitle: "Shilajit Side Effects & Who Should Not Take It",
      metaDescription:
        "Shilajit side effects and precautions: possible stomach upset, rash or feeling too warm, who should avoid shilajit (children, pregnancy, gout, heart, iron overload) and when to stop.",
      title: "Shilajit side effects: precautions and who should avoid it",
      excerpt:
        "Possible side effects of shilajit, who should not take it or should check with a doctor first, and simple ways to use it more safely.",
      body: `Shilajit is a traditional supplement, and like anything you take regularly it is **not suitable for everyone**. Most problems come from taking too much, using impure products, or taking it when you have a condition that needs medical advice. Here is what to know before you start.

## Possible side effects of shilajit

Some people may notice:

- **Stomach upset**, nausea or loose stools, especially on an empty stomach or at a higher dose
- **Rash, itching** or other signs of allergy
- **Feeling too warm** — Ayurveda considers shilajit warming, so some people feel uncomfortable in hot weather or at higher amounts
- Headache or feeling unwell

If you notice any of these, **stop taking it**. Seek medical help straight away for swelling of the face or lips, breathing difficulty or a severe rash.

## Who should not take shilajit (or should see a doctor first)

- **Children under 12** — do not give shilajit to children unless a doctor advises it.
- **Pregnant and breastfeeding women** — avoid unless your doctor says otherwise.
- **Heart conditions** or blood pressure problems
- **Gout or high uric acid**
- **Iron overload (haemochromatosis)** — shilajit contains minerals including iron
- **Kidney or liver disease**, or any other **chronic illness**
- Anyone taking **regular medicines** (for example for blood pressure, blood sugar or thyroid)
- Anyone with a **scheduled surgery** — tell your doctor about every supplement you take

## Side effects from impure shilajit

**Raw or unpurified shilajit may contain impurities**, including heavy metals and fungal contamination. This is one of the biggest risks and is avoidable. Buy only labelled products from licensed manufacturers. See [how to identify original shilajit](${A_EN("how-to-identify-original-shilajit")}).

## When should you not take shilajit?

- When you are unwell with a fever or an acute illness
- Together with several other shilajit or mineral supplements
- Above the dose on your label (usually **250–500 mg a day**)

## How to use shilajit more safely

- Start with the smaller amount (rice-grain size) for the first week.
- Take it once a day, dissolved in warm water or milk, preferably after a light breakfast. See [how to take shilajit resin](${A_EN("how-to-take-shilajit-resin")}).
- Take it as a course with breaks, as advised by your practitioner.
- Keep the jar out of reach of children.

## Our product

[Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) (₹499, MRP ₹799) carries its dose and cautions — including for children under 12 and pregnant or breastfeeding women — on the label. [Order here](${LP_EN}).

## Doctor's note

This page is general information, not medical advice. If you have any health condition, take regular medicines, or are unsure, talk to a qualified doctor or Ayurvedic practitioner before taking shilajit. Stop and seek help if anything feels wrong. More in our [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "What are the side effects of shilajit?",
          a: "Some people may get stomach upset, nausea, a rash or itching, or feel too warm, especially at higher doses. Stop taking it if you notice these, and seek medical help for any severe reaction.",
        },
        {
          q: "Who should not take shilajit?",
          a: "Children under 12 and pregnant or breastfeeding women should avoid it unless a doctor advises otherwise. People with heart conditions, gout or high uric acid, iron overload, kidney or liver disease, other chronic illnesses or on regular medicines should consult a doctor first.",
        },
        {
          q: "Does shilajit cause heat in the body?",
          a: "Ayurveda considers shilajit warming. Some people feel too warm in hot weather or at higher amounts. Keep to the label dose, take it with milk, and stop if it doesn't suit you.",
        },
        {
          q: "Is shilajit safe for the kidneys?",
          a: "People with kidney disease should not take shilajit or any mineral supplement without their doctor's advice. Healthy adults should stay within the label dose and use purified, labelled products.",
        },
      ],
    },
    hi: {
      keyword: "शिलाजीत के नुकसान",
      metaTitle: "शिलाजीत के नुकसान और किसे नहीं खाना चाहिए",
      metaDescription:
        "शिलाजीत के नुकसान और सावधानियाँ: पेट ख़राब, दाने या ज़्यादा गर्मी लगना, किसे शिलाजीत नहीं खाना चाहिए (बच्चे, गर्भावस्था, गाउट, दिल, आयरन) और कब बंद करें।",
      title: "शिलाजीत के नुकसान: सावधानियाँ और किसे नहीं खाना चाहिए",
      excerpt:
        "शिलाजीत के संभावित नुकसान, किसे इसे नहीं लेना चाहिए या पहले डॉक्टर से पूछना चाहिए, और सुरक्षित इस्तेमाल के आसान तरीके।",
      body: `शिलाजीत एक पारंपरिक सप्लीमेंट है, और रोज़ ली जाने वाली किसी भी चीज़ की तरह यह **हर किसी के लिए ठीक नहीं**। ज़्यादातर परेशानियाँ ज़्यादा मात्रा लेने, अशुद्ध उत्पाद इस्तेमाल करने, या ऐसी स्थिति में लेने से होती हैं जिसमें डॉक्टर की सलाह ज़रूरी है। शुरू करने से पहले ये जान लें।

## शिलाजीत के संभावित नुकसान

कुछ लोगों को ये हो सकता है:

- **पेट ख़राब**, जी मिचलाना या पतला मल, ख़ासकर ख़ाली पेट या ज़्यादा मात्रा में
- **दाने, खुजली** या एलर्जी के दूसरे लक्षण
- **ज़्यादा गर्मी लगना** — आयुर्वेद शिलाजीत को गर्म तासीर वाला मानता है, इसलिए गर्म मौसम या ज़्यादा मात्रा में कुछ लोगों को असहज लग सकता है
- सिरदर्द या तबीयत ठीक न लगना

इनमें से कुछ भी हो तो **लेना बंद करें**। चेहरे या होंठों पर सूजन, साँस लेने में दिक़्क़त या गंभीर दाने हों तो तुरंत डॉक्टर के पास जाएँ।

## किसे शिलाजीत नहीं खाना चाहिए (या पहले डॉक्टर से पूछें)

- **12 साल से कम उम्र के बच्चे** — डॉक्टर की सलाह के बिना बच्चों को शिलाजीत न दें।
- **गर्भवती और स्तनपान कराने वाली महिलाएँ** — डॉक्टर न कहें तो न लें।
- **दिल की बीमारी** या ब्लड प्रेशर की समस्या
- **गाउट या हाई यूरिक एसिड**
- **शरीर में आयरन की अधिकता (हीमोक्रोमैटोसिस)** — शिलाजीत में आयरन समेत कई खनिज होते हैं
- **किडनी या लिवर की बीमारी**, या कोई दूसरी **पुरानी बीमारी**
- **नियमित दवा** लेने वाले (जैसे ब्लड प्रेशर, शुगर या थायरॉइड की)
- जिनकी **सर्जरी होनी है** — डॉक्टर को अपने हर सप्लीमेंट के बारे में बताएँ

## अशुद्ध शिलाजीत से नुकसान

**कच्चे या बिना शुद्ध किए शिलाजीत में भारी धातुओं और फफूँद जैसी अशुद्धियाँ हो सकती हैं।** यह सबसे बड़े जोखिमों में से एक है और इससे बचा जा सकता है — सिर्फ़ लाइसेंसधारी निर्माता का लेबल वाला उत्पाद लें। देखें: [ओरिजिनल शिलाजीत की पहचान](${A_HI("how-to-identify-original-shilajit")})।

## शिलाजीत कब नहीं खाना चाहिए?

- बुख़ार या किसी अचानक बीमारी के दौरान
- कई दूसरे शिलाजीत या खनिज सप्लीमेंट के साथ
- लेबल पर दी मात्रा (आमतौर पर **रोज़ 250–500 मिलीग्राम**) से ज़्यादा

## शिलाजीत का सुरक्षित इस्तेमाल

- पहले हफ़्ते छोटी मात्रा (चावल के दाने जितनी) से शुरू करें।
- दिन में एक बार, गुनगुने पानी या दूध में घोलकर, हो सके तो हल्के नाश्ते के बाद लें। देखें: [शिलाजीत खाने का तरीका](${A_HI("how-to-take-shilajit-resin")})।
- वैद्य की सलाह अनुसार ब्रेक के साथ कोर्स की तरह लें।
- जार बच्चों की पहुँच से दूर रखें।

## हमारा उत्पाद

[अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) (₹499, MRP ₹799) के लेबल पर मात्रा और सावधानियाँ — 12 साल से कम उम्र के बच्चों और गर्भवती/स्तनपान कराने वाली महिलाओं के लिए भी — लिखी हैं। [यहाँ ऑर्डर करें](${LP_HI})।

## डॉक्टर की सलाह

यह पेज सामान्य जानकारी है, मेडिकल सलाह नहीं। कोई स्वास्थ्य समस्या हो, नियमित दवा लेते हों या कोई शंका हो, तो शिलाजीत लेने से पहले योग्य डॉक्टर या आयुर्वेदिक वैद्य से बात करें। कुछ भी ग़लत लगे तो बंद करें और मदद लें। और जानकारी हमारी [शिलाजीत गाइड](${HUB_HI}) में।`,
      faq: [
        {
          q: "शिलाजीत के नुकसान क्या हैं?",
          a: "कुछ लोगों को पेट ख़राब, जी मिचलाना, दाने या खुजली, या ज़्यादा गर्मी लग सकती है, ख़ासकर ज़्यादा मात्रा में। ऐसा हो तो बंद करें और गंभीर प्रतिक्रिया पर डॉक्टर के पास जाएँ।",
        },
        {
          q: "किसे शिलाजीत नहीं खाना चाहिए?",
          a: "12 साल से कम उम्र के बच्चे और गर्भवती या स्तनपान कराने वाली महिलाएँ डॉक्टर की सलाह के बिना न लें। दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, किडनी या लिवर की बीमारी, दूसरी पुरानी बीमारी वाले या नियमित दवा लेने वाले पहले डॉक्टर से पूछें।",
        },
        {
          q: "क्या शिलाजीत शरीर में गर्मी करता है?",
          a: "आयुर्वेद शिलाजीत को गर्म तासीर वाला मानता है। गर्म मौसम या ज़्यादा मात्रा में कुछ लोगों को ज़्यादा गर्मी लग सकती है। लेबल मात्रा में रहें, दूध के साथ लें और सूट न करे तो बंद करें।",
        },
        {
          q: "क्या शिलाजीत किडनी के लिए सुरक्षित है?",
          a: "किडनी की बीमारी वाले लोग डॉक्टर की सलाह के बिना शिलाजीत या कोई खनिज सप्लीमेंट न लें। स्वस्थ वयस्क लेबल मात्रा में रहें और शुद्ध, लेबल वाला उत्पाद ही लें।",
        },
      ],
    },
  },
  // 6. Price guide
  {
    slug: "shilajit-price-guide",
    date: "2026-09-26",
    tags: ["shilajit", "herbs"],
    topic: "shilajit",
    image: IMG,
    en: {
      keyword: "shilajit price",
      metaTitle: "Shilajit Price in India: 10 Gram Price & Buying Guide",
      metaDescription:
        "Shilajit price guide: how to compare shilajit prices per gram and per day, what a fair 10 gram price includes, and the label checks that matter more than a low price.",
      title: "Shilajit price in India: how to compare and what to look for",
      excerpt:
        "How to compare shilajit prices fairly — per gram and per day — why very cheap shilajit is a warning sign, and what our 10 g resin costs.",
      body: `"Shilajit price" is one of the most searched shilajit questions. Prices vary widely between brands, forms and pack sizes, so a price tag alone tells you little. This guide shows how to compare fairly and what to check before you pay.

## Compare shilajit price per gram, not per pack

Pack sizes differ (10 g, 15 g, 20 g, 50 g), so always work out the **price per gram**:

- **Price per gram = pack price ÷ grams in the pack**

For example, our 10 g jar at ₹499 works out to about **₹50 per gram**.

## Then compare cost per day

What you actually spend depends on your daily dose. At the usual label dose of **250–500 mg a day**:

- A 10 g jar lasts about **20 to 40 days** (roughly 3 to 6 weeks).
- At ₹499, that is about **₹12.50 to ₹25 per day**.

For capsules, compare the **amount of shilajit per capsule**, not just the number of capsules.

## Shilajit 10 gram price: what a fair price should include

A fair price should come with:

- A **licensed manufacturer** (licence number on the label)
- **Purified** shilajit, not raw rock resin
- **Batch number, manufacturing and expiry dates**
- **Net quantity, MRP**, dose and cautions
- A seller you can contact

## Why very cheap shilajit is a warning sign

Proper collection, purification and packing cost money. Shilajit that is sold loose by the kilo without a label, or at a price far below other licensed brands, may be **raw, mixed or impure**. Raw shilajit can contain impurities, including heavy metals. Saving a little is not worth that risk. See [how to identify original shilajit](${A_EN("how-to-identify-original-shilajit")}).

## Does a higher price mean better shilajit?

Not necessarily. Fancy packaging, gold flakes or celebrity endorsements add cost without telling you anything about quality. Judge by the **label, the form and the seller**, then compare the price per gram.

## Resin, capsule or gummy — does the form change the price?

Yes. Capsules and gummies include processing and other ingredients, so compare the shilajit content, not the pack price. See [shilajit resin vs capsule vs powder](${A_EN("shilajit-resin-vs-capsule-vs-powder")}).

## Our price

[Adamya Herbals Himalayan Shilajit Resin, 10 g](${P_EN}) is **₹499** against an MRP of **₹799** (38% off). Pay by UPI or order on WhatsApp from our [shilajit order page](${LP_EN}).

## Doctor's note

Price aside, shilajit is not for everyone. Children under 12, pregnant and breastfeeding women, and anyone with a heart condition, gout or high uric acid, iron overload, a chronic illness or on regular medicines should consult a doctor before buying. See [shilajit side effects](${A_EN("shilajit-side-effects")}) and our [shilajit guide](${HUB_EN}).`,
      faq: [
        {
          q: "What is the price of 10 gram shilajit?",
          a: "Prices vary by brand and form. Our Adamya Herbals Himalayan shilajit resin 10 g jar is ₹499 (MRP ₹799). Compare products by price per gram and check the label, not just the pack price.",
        },
        {
          q: "How long does 10 g of shilajit last?",
          a: "At the usual label dose of 250–500 mg a day, a 10 g jar lasts about 20 to 40 days (roughly 3 to 6 weeks).",
        },
        {
          q: "Why is some shilajit very cheap?",
          a: "Very cheap or loose shilajit may be raw, mixed or unpurified, and raw shilajit can contain impurities. Choose labelled products from licensed manufacturers.",
        },
        {
          q: "How do I compare shilajit prices?",
          a: "Divide the pack price by the grams to get price per gram, then work out the cost per day at your dose. For capsules, compare the amount of shilajit per capsule.",
        },
      ],
    },
    hi: {
      keyword: "शिलाजीत की कीमत",
      metaTitle: "शिलाजीत की कीमत: 10 ग्राम प्राइस और ख़रीदने की गाइड",
      metaDescription:
        "शिलाजीत की कीमत कैसे तुलना करें: प्रति ग्राम और प्रति दिन ख़र्च, 10 ग्राम की सही कीमत में क्या शामिल हो, और कम कीमत से ज़्यादा ज़रूरी लेबल की जाँच।",
      title: "शिलाजीत की कीमत: सही तुलना कैसे करें और क्या देखें",
      excerpt:
        "शिलाजीत की कीमत की सही तुलना — प्रति ग्राम और प्रति दिन — बहुत सस्ता शिलाजीत चेतावनी क्यों है, और हमारे 10 ग्राम रेज़िन की कीमत।",
      body: `"शिलाजीत की कीमत" या "shilajit price" सबसे ज़्यादा खोजे जाने वाले सवालों में है। ब्रांड, रूप और पैक साइज़ के हिसाब से कीमतें बहुत अलग होती हैं, इसलिए सिर्फ़ प्राइस टैग से कुछ पता नहीं चलता। यह गाइड बताती है कि सही तुलना कैसे करें और पैसे देने से पहले क्या जाँचें।

## पैक नहीं, प्रति ग्राम कीमत की तुलना करें

पैक साइज़ अलग होते हैं (10 ग्राम, 15 ग्राम, 20 ग्राम, 50 ग्राम), इसलिए हमेशा **प्रति ग्राम कीमत** निकालें:

- **प्रति ग्राम कीमत = पैक की कीमत ÷ पैक में ग्राम**

जैसे, हमारा 10 ग्राम जार ₹499 में है, यानी लगभग **₹50 प्रति ग्राम**।

## फिर प्रति दिन का ख़र्च देखें

असली ख़र्च आपकी रोज़ की मात्रा पर निर्भर है। सामान्य लेबल मात्रा **रोज़ 250–500 मिलीग्राम** पर:

- 10 ग्राम का जार लगभग **20 से 40 दिन** (लगभग 3 से 6 हफ़्ते) चलता है।
- ₹499 में यह लगभग **₹12.50 से ₹25 प्रति दिन** बैठता है।

कैप्सूल में सिर्फ़ कैप्सूल की गिनती नहीं, **हर कैप्सूल में शिलाजीत की मात्रा** की तुलना करें।

## शिलाजीत 10 ग्राम प्राइस: सही कीमत में क्या शामिल हो

सही कीमत के साथ ये मिलना चाहिए:

- **लाइसेंसधारी निर्माता** (लेबल पर लाइसेंस नंबर)
- **शुद्ध किया हुआ** शिलाजीत, कच्चा चट्टानी रेज़िन नहीं
- **बैच नंबर, निर्माण और एक्सपायरी तिथि**
- **शुद्ध मात्रा, MRP**, मात्रा और सावधानियाँ
- ऐसा विक्रेता जिससे संपर्क हो सके

## बहुत सस्ता शिलाजीत चेतावनी क्यों है

सही संग्रह, शुद्धिकरण और पैकिंग में ख़र्च आता है। बिना लेबल के किलो के हिसाब से खुला बिकने वाला या दूसरे लाइसेंसधारी ब्रांड से बहुत कम कीमत वाला शिलाजीत **कच्चा, मिलावटी या अशुद्ध** हो सकता है। कच्चे शिलाजीत में भारी धातुओं समेत अशुद्धियाँ हो सकती हैं — थोड़ी बचत के लिए यह जोखिम ठीक नहीं। देखें: [ओरिजिनल शिलाजीत की पहचान](${A_HI("how-to-identify-original-shilajit")})।

## क्या महँगा शिलाजीत बेहतर होता है?

ज़रूरी नहीं। फ़ैंसी पैकिंग, सोने के वर्क या सेलेब्रिटी विज्ञापन कीमत बढ़ाते हैं, गुणवत्ता के बारे में कुछ नहीं बताते। **लेबल, रूप और विक्रेता** से परखें, फिर प्रति ग्राम कीमत की तुलना करें।

## रेज़िन, कैप्सूल या गमी — क्या रूप से कीमत बदलती है?

हाँ। कैप्सूल और गमीज़ में प्रोसेसिंग और दूसरी सामग्री शामिल होती है, इसलिए पैक की कीमत नहीं, शिलाजीत की मात्रा की तुलना करें। देखें: [शिलाजीत रेज़िन vs कैप्सूल vs पाउडर](${A_HI("shilajit-resin-vs-capsule-vs-powder")})।

## हमारी कीमत

[अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन, 10 ग्राम](${P_HI}) **₹499** में, जबकि MRP **₹799** है (38% छूट)। हमारे [शिलाजीत ऑर्डर पेज](${LP_HI}) से UPI से भुगतान करें या WhatsApp पर ऑर्डर करें।

## डॉक्टर की सलाह

कीमत अपनी जगह, शिलाजीत हर किसी के लिए नहीं है। 12 साल से कम उम्र के बच्चे, गर्भवती और स्तनपान कराने वाली महिलाएँ, और दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, पुरानी बीमारी वाले या नियमित दवा लेने वाले ख़रीदने से पहले डॉक्टर से सलाह लें। देखें: [शिलाजीत के नुकसान](${A_HI("shilajit-side-effects")}) और हमारी [शिलाजीत गाइड](${HUB_HI})।`,
      faq: [
        {
          q: "10 ग्राम शिलाजीत की कीमत क्या है?",
          a: "कीमत ब्रांड और रूप के अनुसार अलग होती है। हमारा अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन 10 ग्राम जार ₹499 (MRP ₹799) में है। प्रति ग्राम कीमत से तुलना करें और सिर्फ़ पैक की कीमत नहीं, लेबल भी देखें।",
        },
        {
          q: "10 ग्राम शिलाजीत कितने दिन चलता है?",
          a: "सामान्य लेबल मात्रा रोज़ 250–500 मिलीग्राम पर 10 ग्राम का जार लगभग 20 से 40 दिन (लगभग 3 से 6 हफ़्ते) चलता है।",
        },
        {
          q: "कुछ शिलाजीत बहुत सस्ता क्यों होता है?",
          a: "बहुत सस्ता या खुला शिलाजीत कच्चा, मिलावटी या बिना शुद्ध किया हो सकता है, और कच्चे शिलाजीत में अशुद्धियाँ हो सकती हैं। लाइसेंसधारी निर्माता का लेबल वाला उत्पाद चुनें।",
        },
        {
          q: "शिलाजीत की कीमतों की तुलना कैसे करें?",
          a: "पैक की कीमत को ग्राम से भाग देकर प्रति ग्राम कीमत निकालें, फिर अपनी मात्रा पर प्रति दिन ख़र्च देखें। कैप्सूल में हर कैप्सूल में शिलाजीत की मात्रा की तुलना करें।",
        },
      ],
    },
  },
];

export function isShilajitArticle(slug: string): boolean {
  return (SHILAJIT_ARTICLE_SLUGS as readonly string[]).includes(slug);
}
