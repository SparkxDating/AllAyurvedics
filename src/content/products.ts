import type { Product } from "./types";
import { getUpiConfig, type UpiConfig } from "@/config/site";
import { assertProducts } from "./schema";

/**
 * Product catalogue.
 * - Real products: `sample` unset/false. Add `price`, `mrp`, `media` and (optionally) `paymentLink`.
 * - The old placeholder items are kept below with `hidden: true` so they are not listed,
 *   have no page and are not in the sitemap. Delete them whenever you like.
 */
const shilajit: Product = {
  slug: "himalayan-shilajit-resin-10g",
  category: "resin",
  featured: true,
  tone: "clay",
  brand: "Adamya Herbals",
  price: 499,
  mrp: 799,
  inStock: true,
  // paymentLink: "https://rzp.io/l/your-link", // or set PAYMENT_LINK_HIMALAYAN_SHILAJIT_RESIN_10G in Vercel
  // UPI checkout uses the UPI ID in src/config/site.ts unless you override it here with upiId / upiPayeeName.
  orderName: "Himalayan Shilajit 10g",
  media: {
    images: [
      { src: "/products/himalayan-shilajit/shilajit-front.webp", width: 1200, height: 1222 },
      { src: "/products/himalayan-shilajit/shilajit-back.webp", width: 1200, height: 1259 },
    ],
    video: {
      src: "/products/himalayan-shilajit/shilajit-video.mp4",
      poster: "/products/himalayan-shilajit/shilajit-video-poster.webp",
      width: 720,
      height: 1280,
    },
    ogImage: "/products/himalayan-shilajit/shilajit-og.jpg",
  },
  relatedRemedies: ["low-energy-fatigue", "ashwagandha-benefits-uses", "benefits-of-chyawanprash"],
  promoteOn: ["benefits-of-chyawanprash", "home-remedies-for-body-pain-and-weakness", "hub:immunity", "low-energy-fatigue"],
  en: {
    name: "Himalayan Shilajit Resin (Adamya Herbals)",
    keyword: "himalayan shilajit resin",
    metaTitle: "Himalayan Shilajit Resin 10g – Price ₹499 | Adamya Herbals",
    metaDescription:
      "Buy Himalayan shilajit resin by Adamya Herbals: 10 g jar at ₹499 (MRP ₹799). A traditional rasayana for strength and energy. How to use, pure check, FAQs.",
    short: "Mineral-rich Himalayan shilajit resin, traditionally used to support strength, stamina and energy.",
    description:
      "Adamya Herbals Himalayan shilajit resin comes as a soft, semi-solid resin in a 10 g amber glass jar with a gold lid. A tiny daily amount, dissolved in warm water or milk, fits easily into a morning routine. In Ayurveda, shilajit is valued as a rasayana — a rejuvenating substance traditionally used to support strength, stamina, energy and overall vitality.",
    aboutTitle: "What is Himalayan shilajit resin?",
    about:
      "Shilajit is a dark, sticky, mineral-rich resin that seeps out of rock crevices high in the Himalayas during warm months. It forms over a very long time as plant matter breaks down under the rocks, which is why it naturally contains fulvic acid along with a range of minerals.\n\nClassical Ayurvedic texts describe shilajatu as one of the most prized rasayanas and recommend it in small amounts as part of a daily routine for strength and vitality. Today it is most commonly used as a resin, which is the least processed form, dissolved in a warm drink. Shilajit is a traditional supplement, not a medicine, and works best alongside good food, sleep and regular activity.",
    benefitsTitle: "Himalayan shilajit resin: traditional uses",
    howToUseTitle: "How to take Himalayan shilajit resin",
    benefits: [
      "Supporting strength and stamina",
      "Everyday energy and vitality",
      "A traditional Ayurvedic rasayana for the daily routine",
    ],
    howToUse: [
      "Label dose: 250–500 mg a day, or as directed by a healthcare professional.",
      "In practice: take a rice-grain to pea-sized amount on a clean, dry spoon. Start with the smaller (rice-grain) size for the first week.",
      "Dissolve it in a cup of warm (not boiling) water or milk, stir until fully dissolved and drink.",
      "Take once a day, preferably in the morning. Don't exceed the label dose.",
    ],
    ingredients: ["Himalayan shilajit (resin)"],
    size: "10 g jar",
    genuineCheck: [
      "Genuine resin is dark brown to black and glossy, firm when cool and soft and stretchy with the warmth of your fingers.",
      "It should dissolve almost completely in warm water, giving a golden-brown to dark brown colour, with little or no gritty residue.",
      "Home tests are only rough guides. The most reliable check is buying a labelled product from a licensed manufacturer through a trusted seller.",
    ],
    storage: [
      "Store in a cool, dry place away from direct sunlight, with the lid tightly closed.",
      "Always use a dry spoon; moisture can spoil the resin.",
      "It hardens in cold weather and softens in heat. This is normal: warm the jar in your hands or soften a portion in warm water.",
      "Keep out of reach of children. For shelf life, see the batch details on the pack.",
    ],
    precautions: [
      "Children below 12 years, and pregnant and breastfeeding women, should consult a physician before use.",
      "Consult a doctor first if you have a heart condition, high uric acid or gout, iron overload (haemochromatosis) or any chronic condition, or if you take regular medicines.",
      "Start with a low amount and stop if you notice stomach upset, rashes or any unusual symptoms.",
      "Don't exceed the recommended dose. Keep out of reach of children.",
      "Buy only from trusted sources: raw or unlabelled shilajit may contain impurities.",
    ],
    faq: [
      {
        q: "What are the benefits of shilajit?",
        a: "In Ayurveda, shilajit is traditionally used as a rasayana to support strength, stamina, energy and overall vitality. It is a supplement, not a treatment for any disease.",
      },
      {
        q: "How do I take shilajit resin?",
        a: "Dissolve a rice-grain to pea-sized amount (about 250–500 mg) in warm water or milk and drink it once a day, preferably in the morning, or as directed by your healthcare professional.",
      },
      {
        q: "What is the price of this Himalayan shilajit resin?",
        a: "The Adamya Herbals Himalayan shilajit resin 10 g jar is ₹499 against an MRP of ₹799 (38% off).",
      },
      {
        q: "How long does a 10 g jar last?",
        a: "At 250–500 mg a day, a 10 g jar lasts roughly 3 to 6 weeks, depending on your daily amount.",
      },
      {
        q: "Who should avoid shilajit or check with a doctor first?",
        a: "Children under 12, pregnant and breastfeeding women, and anyone with a heart condition, gout or high uric acid, iron overload, a chronic illness or on regular medicines should consult a doctor before using it.",
      },
      {
        q: "How can I check that this shilajit is original?",
        a: "The jar carries the manufacturer's details and licence number (Mfg. Lic. No. A-4750/19). Genuine resin is glossy, softens with the warmth of your fingers and dissolves almost completely in warm water. Home tests are only rough guides.",
      },
      {
        q: "Is shilajit resin better than capsules?",
        a: "Neither suits everyone. Resin is the least processed, traditional form and easy to inspect at home; capsules are more convenient with a fixed dose. We chose resin for its traditional form.",
      },
      {
        q: "Can women take shilajit, and when is the best time?",
        a: "Shilajit is traditionally used by both men and women, usually once a day in the morning. Pregnant and breastfeeding women should not use it without a doctor's advice.",
      },
    ],
    specs: [
      ["Brand", "Adamya Herbals"],
      ["Product", "AHC Himalayan Shilajit"],
      ["Form", "Resin (semi-solid)"],
      ["Net quantity", "10 g"],
      ["Pack", "Amber glass jar with gold lid"],
      ["Label dose", "250–500 mg a day, or as directed by a healthcare professional"],
      ["Mfg. Lic. No.", "A-4750/19"],
      ["Shelf life", "See the pack"],
    ],
    imageAlt: [
      "Adamya Herbals Himalayan shilajit resin 10 g – pure shilajit resin in an amber glass jar with gold lid, front label",
      "Back label of the Himalayan shilajit resin jar showing traditional benefits, dose (250–500 mg), caution and licence number",
    ],
    videoLabel: "Product video: Himalayan shilajit jar",
  },
  hi: {
    name: "हिमालयन शिलाजीत रेज़िन (अदम्य हर्बल्स)",
    keyword: "हिमालयन शिलाजीत रेज़िन 10 ग्राम कीमत",
    metaTitle: "हिमालयन शिलाजीत रेज़िन 10 ग्राम – कीमत ₹499 | अदम्य हर्बल्स",
    metaDescription:
      "अदम्य हर्बल्स का हिमालयन शिलाजीत रेज़िन 10 ग्राम ₹499 (MRP ₹799) में ख़रीदें। ताक़त और ऊर्जा के लिए पारंपरिक रसायन। सेवन विधि, असली की पहचान और FAQ।",
    short: "खनिजों से भरपूर हिमालयन शिलाजीत रेज़िन, जिसे परंपरा से ताक़त, स्टैमिना और ऊर्जा के लिए लिया जाता है।",
    description:
      "अदम्य हर्बल्स का हिमालयन शिलाजीत नरम, अर्ध-ठोस रेज़िन के रूप में 10 ग्राम के एम्बर काँच के जार में आता है, जिस पर सुनहरा ढक्कन है। रोज़ की बहुत थोड़ी मात्रा गुनगुने पानी या दूध में घोलकर आसानी से सुबह की दिनचर्या में शामिल की जा सकती है। शिलाजीत के फायदे आयुर्वेद में रसायन के रूप में बताए गए हैं — यानी ऐसा पदार्थ जिसे परंपरा से ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति को सहारा देने के लिए लिया जाता है।",
    aboutTitle: "हिमालयन शिलाजीत रेज़िन क्या है?",
    about:
      "शिलाजीत एक गहरे रंग का, चिपचिपा, खनिजों से भरपूर रेज़िन है, जो गर्मियों में हिमालय की ऊँची चट्टानों की दरारों से रिसकर निकलता है। चट्टानों के नीचे पौधों के अवशेष बहुत लंबे समय में टूटकर इसे बनाते हैं, इसीलिए इसमें प्राकृतिक रूप से फ़ल्विक एसिड और कई खनिज होते हैं।\n\nआयुर्वेद के शास्त्रीय ग्रंथों में शिलाजतु को सबसे मूल्यवान रसायनों में गिना गया है और ताक़त व स्फूर्ति के लिए इसे दिनचर्या में थोड़ी मात्रा में लेने की सलाह दी गई है। आज यह ज़्यादातर रेज़िन के रूप में इस्तेमाल होता है, जो सबसे कम प्रोसेस्ड रूप है और गुनगुने पेय में घोलकर लिया जाता है। शिलाजीत एक पारंपरिक सप्लीमेंट है, दवा नहीं, और अच्छे भोजन, नींद और नियमित गतिविधि के साथ सबसे अच्छा रहता है।",
    benefitsTitle: "शिलाजीत के फायदे: पारंपरिक उपयोग",
    howToUseTitle: "शिलाजीत रेज़िन कैसे खाएँ (सेवन विधि)",
    benefits: [
      "ताक़त और स्टैमिना में सहायक",
      "रोज़ की ऊर्जा और स्फूर्ति",
      "दिनचर्या के लिए पारंपरिक आयुर्वेदिक रसायन",
    ],
    howToUse: [
      "लेबल पर मात्रा: रोज़ 250–500 मिलीग्राम, या स्वास्थ्य विशेषज्ञ की सलाह अनुसार।",
      "व्यवहार में: साफ़, सूखे चम्मच से चावल के दाने से मटर के दाने जितनी मात्रा लें। पहले हफ़्ते छोटी (चावल के दाने जितनी) मात्रा से शुरू करें।",
      "इसे एक कप गुनगुने (उबलते नहीं) पानी या दूध में पूरी तरह घोलकर पिएँ।",
      "दिन में एक बार लें, हो सके तो सुबह। लेबल पर दी गई मात्रा से ज़्यादा न लें।",
    ],
    ingredients: ["हिमालयन शिलाजीत (रेज़िन)"],
    size: "10 ग्राम जार",
    genuineCheck: [
      "असली रेज़िन गहरा भूरा से काला और चमकदार होता है; ठंडा होने पर सख़्त और उँगलियों की गर्मी से नरम व खिंचने वाला हो जाता है।",
      "यह गुनगुने पानी में लगभग पूरा घुल जाना चाहिए और पानी सुनहरा-भूरा से गहरा भूरा हो जाता है, बिना या बहुत कम किरकिरे अवशेष के।",
      "घरेलू जाँच केवल मोटा अंदाज़ा देती है। सबसे भरोसेमंद तरीका है लाइसेंसधारी निर्माता का लेबल वाला उत्पाद भरोसेमंद विक्रेता से ख़रीदना।",
    ],
    storage: [
      "ठंडी, सूखी जगह पर, सीधी धूप से दूर और ढक्कन कसकर बंद करके रखें।",
      "हमेशा सूखा चम्मच इस्तेमाल करें; नमी से रेज़िन ख़राब हो सकता है।",
      "ठंड में यह सख़्त और गर्मी में नरम हो जाता है। यह सामान्य है — जार को हथेलियों में गरम करें या थोड़ा हिस्सा गुनगुने पानी में नरम करें।",
      "बच्चों की पहुँच से दूर रखें। शेल्फ़ लाइफ़ के लिए पैक पर बैच विवरण देखें।",
    ],
    precautions: [
      "12 साल से कम उम्र के बच्चे, और गर्भवती व स्तनपान कराने वाली महिलाएँ इस्तेमाल से पहले डॉक्टर से सलाह लें।",
      "दिल की बीमारी, हाई यूरिक एसिड या गठिया (गाउट), शरीर में आयरन की अधिकता (हीमोक्रोमैटोसिस) या कोई भी पुरानी बीमारी हो, या आप नियमित दवाएँ लेते हों, तो पहले डॉक्टर से सलाह लें।",
      "कम मात्रा से शुरू करें और पेट ख़राब होने, दाने या कोई असामान्य लक्षण होने पर बंद कर दें।",
      "बताई गई मात्रा से ज़्यादा न लें। बच्चों की पहुँच से दूर रखें।",
      "सिर्फ़ भरोसेमंद स्रोत से ख़रीदें: कच्चे या बिना लेबल वाले शिलाजीत में अशुद्धियाँ हो सकती हैं।",
    ],
    faq: [
      {
        q: "शिलाजीत के फायदे क्या हैं?",
        a: "आयुर्वेद में शिलाजीत को रसायन के रूप में परंपरा से ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति को सहारा देने के लिए लिया जाता है। यह एक सप्लीमेंट है, किसी बीमारी का इलाज नहीं।",
      },
      {
        q: "शिलाजीत रेज़िन कैसे लें?",
        a: "चावल के दाने से मटर के दाने जितनी मात्रा (लगभग 250–500 मिलीग्राम) गुनगुने पानी या दूध में घोलकर दिन में एक बार, हो सके तो सुबह लें, या स्वास्थ्य विशेषज्ञ की सलाह अनुसार।",
      },
      {
        q: "इस हिमालयन शिलाजीत रेज़िन की कीमत क्या है?",
        a: "अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन का 10 ग्राम जार ₹499 में है, जबकि MRP ₹799 है (38% छूट)।",
      },
      {
        q: "10 ग्राम का जार कितने दिन चलता है?",
        a: "रोज़ 250–500 मिलीग्राम लेने पर 10 ग्राम का जार लगभग 3 से 6 हफ़्ते चलता है, आपकी रोज़ की मात्रा पर निर्भर करता है।",
      },
      {
        q: "किन लोगों को शिलाजीत से बचना चाहिए या पहले डॉक्टर से पूछना चाहिए?",
        a: "12 साल से कम उम्र के बच्चे, गर्भवती और स्तनपान कराने वाली महिलाएँ, और दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, किसी पुरानी बीमारी वाले या नियमित दवा लेने वाले लोग इस्तेमाल से पहले डॉक्टर से सलाह लें।",
      },
      {
        q: "कैसे पता करें कि यह शिलाजीत ओरिजिनल है?",
        a: "जार पर निर्माता का विवरण और लाइसेंस नंबर (Mfg. Lic. No. A-4750/19) लिखा है। असली रेज़िन चमकदार होता है, उँगलियों की गर्मी से नरम होता है और गुनगुने पानी में लगभग पूरा घुल जाता है। घरेलू जाँच सिर्फ़ मोटा अंदाज़ा है।",
      },
      {
        q: "शिलाजीत रेज़िन बेहतर है या कैप्सूल?",
        a: "कोई एक सबके लिए ठीक नहीं। रेज़िन सबसे कम प्रोसेस्ड, पारंपरिक रूप है और घर पर परखना आसान है; कैप्सूल ज़्यादा सुविधाजनक हैं और मात्रा तय होती है। हमने पारंपरिक रूप होने के कारण रेज़िन चुना।",
      },
      {
        q: "क्या महिलाएँ शिलाजीत ले सकती हैं, और सही समय क्या है?",
        a: "शिलाजीत परंपरा से पुरुष और महिलाएँ दोनों लेते हैं, आमतौर पर दिन में एक बार सुबह। गर्भवती और स्तनपान कराने वाली महिलाएँ डॉक्टर की सलाह के बिना न लें।",
      },
    ],
    specs: [
      ["ब्रांड", "अदम्य हर्बल्स (Adamya Herbals)"],
      ["उत्पाद", "AHC हिमालयन शिलाजीत"],
      ["रूप", "रेज़िन (अर्ध-ठोस)"],
      ["शुद्ध मात्रा", "10 ग्राम"],
      ["पैकिंग", "सुनहरे ढक्कन वाला एम्बर काँच का जार"],
      ["लेबल पर मात्रा", "रोज़ 250–500 मिलीग्राम, या स्वास्थ्य विशेषज्ञ की सलाह अनुसार"],
      ["निर्माण लाइसेंस नं. (Mfg. Lic. No.)", "A-4750/19"],
      ["शेल्फ़ लाइफ़", "पैक पर देखें"],
    ],
    imageAlt: [
      "अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन 10 ग्राम – शुद्ध शिलाजीत, सुनहरे ढक्कन वाला एम्बर काँच का जार, सामने का लेबल",
      "हिमालयन शिलाजीत रेज़िन जार का पीछे का लेबल: शिलाजीत के फायदे, मात्रा (250–500 मिलीग्राम), सावधानी और लाइसेंस नंबर",
    ],
    videoLabel: "उत्पाद वीडियो: हिमालयन शिलाजीत जार",
  },
};

const sampleProducts: Product[] = [
  {
    slug: "sample-triphala-churna",
    sample: true,
    hidden: true,
    category: "churna",
    featured: true,
    tone: "clay",
    en: {
      name: "Triphala Churna (sample)",
      short: "Classic three-fruit powder for everyday digestive care.",
      description:
        "A placeholder listing showing how a churna product page will look. A traditional blend of amla, haritaki and bibhitaki, packed in a resealable pouch.",
      benefits: ["Supporting regular digestion", "A traditional evening routine"],
      howToUse: ["½ teaspoon in warm water at bedtime, or as advised by your practitioner."],
      ingredients: ["Amalaki (amla)", "Haritaki", "Bibhitaki"],
      size: "100 g pouch",
    },
    hi: {
      name: "त्रिफला चूर्ण (नमूना)",
      short: "रोज़ के पाचन की देखभाल के लिए तीन फलों का पारंपरिक चूर्ण।",
      description:
        "यह एक नमूना लिस्टिंग है, जो दिखाती है कि चूर्ण का उत्पाद पेज कैसा दिखेगा। आँवला, हरड़ और बहेड़ा का पारंपरिक मिश्रण, दोबारा बंद होने वाले पाउच में।",
      benefits: ["नियमित पाचन में सहायक", "शाम की पारंपरिक दिनचर्या"],
      howToUse: ["सोने से पहले ½ छोटा चम्मच गुनगुने पानी में, या वैद्य की सलाह अनुसार।"],
      ingredients: ["आमलकी (आँवला)", "हरीतकी (हरड़)", "बिभीतकी (बहेड़ा)"],
      size: "100 ग्राम पाउच",
    },
  },
  {
    slug: "sample-ashwagandha-capsules",
    sample: true,
    hidden: true,
    category: "capsule",
    featured: true,
    tone: "turmeric",
    en: {
      name: "Ashwagandha Root Capsules (sample)",
      short: "Adaptogenic root traditionally used for strength and calm.",
      description:
        "A placeholder listing for a capsule product. Real listings should include the exact strength per capsule, batch testing details and licence information.",
      benefits: ["Supporting a calm mind", "Traditional rasayana for strength and stamina"],
      howToUse: ["Follow the label or your practitioner's advice. Not for use in pregnancy or breastfeeding."],
      ingredients: ["Ashwagandha (Withania somnifera) root"],
      size: "60 capsules",
    },
    hi: {
      name: "अश्वगंधा जड़ कैप्सूल (नमूना)",
      short: "ताक़त और शांत मन के लिए परंपरा से इस्तेमाल होने वाली जड़।",
      description:
        "कैप्सूल उत्पाद के लिए एक नमूना लिस्टिंग। असली लिस्टिंग में हर कैप्सूल की सटीक मात्रा, बैच जाँच की जानकारी और लाइसेंस विवरण होना चाहिए।",
      benefits: ["शांत मन में सहायक", "ताक़त और सहनशक्ति के लिए पारंपरिक रसायन"],
      howToUse: ["लेबल या वैद्य की सलाह के अनुसार लें। गर्भावस्था या स्तनपान में उपयोग न करें।"],
      ingredients: ["अश्वगंधा (Withania somnifera) जड़"],
      size: "60 कैप्सूल",
    },
  },
  {
    slug: "sample-tulsi-ginger-tea",
    sample: true,
    hidden: true,
    category: "tea",
    featured: true,
    tone: "leaf",
    en: {
      name: "Tulsi Ginger Herbal Tea (sample)",
      short: "A warming, caffeine-free blend for everyday wellbeing.",
      description:
        "A placeholder listing for a loose-leaf tea. Tulsi, ginger and a touch of black pepper — the flavours of a home-made kadha in a convenient blend.",
      benefits: ["A comforting drink in cold weather", "Supporting seasonal wellbeing"],
      howToUse: ["Steep 1 teaspoon in a cup of hot water for 4–5 minutes. Strain and enjoy."],
      ingredients: ["Tulsi (holy basil) leaves", "Dried ginger", "Black pepper", "Cinnamon"],
      size: "50 g tin",
    },
    hi: {
      name: "तुलसी अदरक हर्बल चाय (नमूना)",
      short: "रोज़ की सेहत के लिए गर्माहट देने वाला, बिना कैफ़ीन का मिश्रण।",
      description:
        "खुली पत्ती वाली चाय के लिए एक नमूना लिस्टिंग। तुलसी, अदरक और थोड़ी काली मिर्च — घर के काढ़े का स्वाद, एक आसान मिश्रण में।",
      benefits: ["ठंडे मौसम में सुकून देने वाला पेय", "मौसमी सेहत में सहायक"],
      howToUse: ["एक कप गरम पानी में 1 छोटा चम्मच 4–5 मिनट भिगोएँ। छानकर पिएँ।"],
      ingredients: ["तुलसी की पत्तियाँ", "सोंठ", "काली मिर्च", "दालचीनी"],
      size: "50 ग्राम डिब्बा",
    },
  },
  {
    slug: "sample-bhringraj-hair-oil",
    sample: true,
    hidden: true,
    category: "oil",
    tone: "sage",
    en: {
      name: "Bhringraj Hair Oil (sample)",
      short: "Herb-infused oil for a relaxing weekly scalp massage.",
      description:
        "A placeholder listing for a hair oil. Bhringraj, amla and curry leaves slow-infused in coconut and sesame oils, in the traditional taila method.",
      benefits: ["Nourishing scalp massage (shiro abhyanga)", "Soft, manageable hair"],
      howToUse: ["Massage into the scalp, leave for an hour or overnight, then wash. Patch test first."],
      ingredients: ["Bhringraj", "Amla", "Curry leaves", "Coconut oil", "Sesame oil"],
      size: "200 ml bottle",
    },
    hi: {
      name: "भृंगराज हेयर ऑयल (नमूना)",
      short: "हफ़्ते में एक बार सुकून भरी सिर की मालिश के लिए जड़ी-बूटियों वाला तेल।",
      description:
        "बालों के तेल के लिए एक नमूना लिस्टिंग। भृंगराज, आँवला और करी पत्ते, पारंपरिक तैल विधि से नारियल और तिल के तेल में धीमी आँच पर पकाए गए।",
      benefits: ["पोषण देने वाली सिर की मालिश (शिरो अभ्यंग)", "मुलायम, सँभलने लायक बाल"],
      howToUse: ["सिर की त्वचा पर मालिश करें, एक घंटा या रात भर छोड़ें, फिर धो लें। पहले पैच टेस्ट करें।"],
      ingredients: ["भृंगराज", "आँवला", "करी पत्ता", "नारियल तेल", "तिल का तेल"],
      size: "200 मिली बोतल",
    },
  },
  {
    slug: "sample-chyawanprash",
    sample: true,
    hidden: true,
    category: "rasayana",
    tone: "clay",
    en: {
      name: "Classic Chyawanprash (sample)",
      short: "The traditional amla-based herbal jam, loved by all ages.",
      description:
        "A placeholder listing for a rasayana. A classical recipe built around amla with dozens of herbs and spices, cooked with ghee, honey and sugar.",
      benefits: ["A traditional winter rasayana", "Supporting everyday vitality"],
      howToUse: ["1 teaspoon with warm milk or water in the morning. Contains sugar — not suitable for people with diabetes unless a sugar-free version is advised."],
      ingredients: ["Amla", "Ghee", "Honey", "Pippali", "Cardamom", "Cinnamon", "Other classical herbs"],
      size: "500 g jar",
    },
    hi: {
      name: "क्लासिक च्यवनप्राश (नमूना)",
      short: "आँवले पर आधारित पारंपरिक हर्बल अवलेह, हर उम्र की पसंद।",
      description:
        "रसायन के लिए एक नमूना लिस्टिंग। आँवले पर आधारित शास्त्रीय विधि, जिसमें दर्जनों जड़ी-बूटियाँ और मसाले घी, शहद और चीनी के साथ पकाए जाते हैं।",
      benefits: ["सर्दियों का पारंपरिक रसायन", "रोज़ की स्फूर्ति में सहायक"],
      howToUse: ["सुबह गरम दूध या पानी के साथ 1 छोटा चम्मच। इसमें चीनी है — डायबिटीज़ में तभी लें जब शुगर-फ़्री संस्करण की सलाह दी गई हो।"],
      ingredients: ["आँवला", "घी", "शहद", "पिप्पली", "इलायची", "दालचीनी", "अन्य शास्त्रीय जड़ी-बूटियाँ"],
      size: "500 ग्राम जार",
    },
  },
  {
    slug: "sample-kumkumadi-face-oil",
    sample: true,
    hidden: true,
    category: "skincare",
    tone: "turmeric",
    en: {
      name: "Kumkumadi Face Oil (sample)",
      short: "A saffron-infused facial oil inspired by a classical formula.",
      description:
        "A placeholder listing for a skincare product. Kumkumadi tailam is a classical Ayurvedic facial oil traditionally used for radiant, even-looking skin.",
      benefits: ["A nourishing night-time facial massage", "Soft, radiant-looking skin"],
      howToUse: ["Warm 2–3 drops between the fingertips and massage gently into clean skin at night. Patch test first."],
      ingredients: ["Saffron (kumkuma)", "Manjistha", "Sandalwood", "Sesame oil base"],
      size: "15 ml dropper bottle",
    },
    hi: {
      name: "कुमकुमादि फ़ेस ऑयल (नमूना)",
      short: "शास्त्रीय योग से प्रेरित केसर युक्त फ़ेस ऑयल।",
      description:
        "स्किनकेयर उत्पाद के लिए एक नमूना लिस्टिंग। कुमकुमादि तैल एक शास्त्रीय आयुर्वेदिक फ़ेस ऑयल है, जिसे परंपरा से निखरी, एक-सी दिखने वाली त्वचा के लिए इस्तेमाल किया जाता है।",
      benefits: ["रात में पोषण देने वाली चेहरे की मालिश", "मुलायम, निखरी दिखने वाली त्वचा"],
      howToUse: ["रात को 2–3 बूँदें उँगलियों के पोरों पर गरम करके साफ़ त्वचा पर हल्के हाथ से मालिश करें। पहले पैच टेस्ट करें।"],
      ingredients: ["केसर (कुमकुम)", "मंजिष्ठा", "चंदन", "तिल तेल आधार"],
      size: "15 मिली ड्रॉपर बोतल",
    },
  },
];

/** Every product, including hidden samples (not used for listings) */
export const allProducts: Product[] = [shilajit, ...sampleProducts];

if (typeof window === "undefined") {
  assertProducts(allProducts);
}

/** Visible catalogue: listings, product pages, sitemap and enquiry form */
export const products: Product[] = allProducts.filter((p) => !p.hidden);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Hosted payment link from the product entry or PAYMENT_LINK_<SLUG> env var (read at build time) */
export function getPaymentLink(product: Product): string | undefined {
  const envKey = `PAYMENT_LINK_${product.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`;
  const link = product.paymentLink || process.env[envKey] || undefined;
  return link && /^https:\/\//.test(link) ? link : undefined;
}

/** How "Buy now" works for a product: hosted payment link (priority), UPI checkout, or not available */
export function getBuyMode(product: Product): { kind: "link"; href: string } | { kind: "upi"; upi: UpiConfig } | { kind: "none" } {
  if (!product.price || product.sample) return { kind: "none" };
  const link = getPaymentLink(product);
  if (link) return { kind: "link", href: link };
  const upi = getUpiConfig({ upiId: product.upiId, upiPayeeName: product.upiPayeeName });
  if (upi) return { kind: "upi", upi };
  return { kind: "none" };
}

export function discountPercent(product: Product): number | undefined {
  if (!product.price || !product.mrp || product.mrp <= product.price) return undefined;
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

/** Products that should show a "From our shop" block on a remedy page or hub ("hub:<cluster>") */
export function getPromotedProducts(key: string): Product[] {
  return products.filter((p) => p.promoteOn?.includes(key));
}
