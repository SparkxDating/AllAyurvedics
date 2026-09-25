import type { Product } from "./types";

/**
 * SAMPLE PRODUCTS — placeholders only.
 * Replace these with the real All Ayurvedics catalogue. Every item has `sample: true`,
 * which shows a "Sample product" badge across the site.
 */
export const products: Product[] = [
  {
    slug: "sample-triphala-churna",
    sample: true,
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

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
