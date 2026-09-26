import type { ClusterSlug, Remedy, RemedyCategory } from "./types";
import { remedies } from "./remedies";

export type ClusterText = {
  /** Short label for chips, nav and breadcrumbs */
  name: string;
  /** Head search term the hub targets */
  headTerm: string;
  /** H1 */
  title: string;
  /** <title>, max 60 chars */
  metaTitle: string;
  /** max 155 chars */
  metaDescription: string;
  /** 150–250 words; blank line = new paragraph */
  intro: string;
};

export type Cluster = {
  slug: ClusterSlug;
  /** Category used for the icon */
  icon: RemedyCategory;
  /** Older remedies from these categories are listed as "more related remedies" */
  categories: RemedyCategory[];
  en: ClusterText;
  hi: ClusterText;
};

export const clusters: Cluster[] = [
  {
    slug: "hair-care",
    icon: "hair",
    categories: ["hair"],
    en: {
      name: "Hair fall & hair care",
      headTerm: "home remedies for hair fall",
      title: "Home remedies for hair fall and everyday hair problems",
      metaTitle: "Home Remedies for Hair Fall: Ayurvedic Hair Care Guide",
      metaDescription:
        "Natural home remedies for hair fall, itchy scalp, split ends and thinning hair, with Ayurvedic oils, packs and diet tips. Explore safe, simple routines.",
      intro:
        "Looking for home remedies for hair fall that actually fit into a busy Indian routine? This guide brings together our Ayurvedic hair care remedies in one place — from oiling and herbal rinses to the food and sleep habits that quietly decide how strong your hair grows.\n\nIn Ayurveda, hair (kesha) is considered a by-product of bone tissue, and hair fall is often linked with excess pitta (heat, stress, spicy food, late nights) and vata (dryness, irregular meals). That is why the remedies here combine what you put on your scalp with what you eat and how you live. Onion juice, rice water, rosemary, bhringraj, amla and methi each have their place, but none works overnight; most people need eight to twelve weeks of steady care to judge results.\n\nNormal shedding is about 50–100 strands a day. Sudden, patchy or heavy hair loss can point to thyroid problems, anaemia, hormonal changes, recent illness or medicines, so please see a doctor or dermatologist if your hair fall is unusual. Use the remedies below as supportive care, patch test anything new, and pick one or two routines you can keep up.",
    },
    hi: {
      name: "बाल झड़ना और बालों की देखभाल",
      headTerm: "बाल झड़ने के घरेलू उपाय",
      title: "बाल झड़ने के घरेलू उपाय और बालों की रोज़मर्रा की समस्याएँ",
      metaTitle: "बाल झड़ने के घरेलू उपाय: आयुर्वेदिक हेयर केयर गाइड",
      metaDescription:
        "बाल झड़ना, सिर में खुजली, दोमुँहे बाल और पतले बालों के लिए आयुर्वेदिक तेल, हेयर पैक और आहार से जुड़े आसान घरेलू उपाय। सुरक्षित दिनचर्या जानें।",
      intro:
        "क्या आप ऐसे बाल झड़ने के घरेलू उपाय खोज रहे हैं जो व्यस्त दिनचर्या में भी निभ सकें? इस गाइड में हमारे सभी आयुर्वेदिक हेयर केयर नुस्खे एक जगह हैं — तेल मालिश और हर्बल रिंस से लेकर उस खान-पान और नींद तक, जो चुपचाप तय करते हैं कि बाल कितने मज़बूत होंगे।\n\nआयुर्वेद में बाल (केश) अस्थि धातु का उपधातु माने जाते हैं, और बाल झड़ने को अक्सर बढ़े हुए पित्त (गर्मी, तनाव, तीखा खाना, देर रात तक जागना) और वात (रूखापन, अनियमित भोजन) से जोड़ा जाता है। इसीलिए यहाँ के नुस्खे सिर पर लगाने वाली चीज़ों को आहार और जीवनशैली के साथ जोड़ते हैं। प्याज़ का रस, चावल का पानी, रोज़मेरी, भृंगराज, आँवला और मेथी — सबकी अपनी जगह है, पर कोई भी रातों-रात असर नहीं करता; नतीजे परखने के लिए आमतौर पर आठ से बारह हफ़्ते की नियमित देखभाल चाहिए।\n\nरोज़ 50–100 बाल गिरना सामान्य है। अचानक, पैच में या बहुत ज़्यादा बाल झड़ना थायरॉइड, ख़ून की कमी, हार्मोनल बदलाव, हाल की बीमारी या दवाओं का संकेत हो सकता है, इसलिए असामान्य लगे तो डॉक्टर या त्वचा रोग विशेषज्ञ को ज़रूर दिखाएँ। नीचे दिए नुस्खों को सहायक देखभाल की तरह अपनाएँ, हर नई चीज़ का पैच टेस्ट करें और एक-दो ऐसी आदतें चुनें जिन्हें आप निभा सकें।",
    },
  },
  {
    slug: "skin-care",
    icon: "skin",
    categories: ["skin"],
    en: {
      name: "Skin & face care",
      headTerm: "home remedies for skin care",
      title: "Home remedies for skin care: natural fixes for common face and skin problems",
      metaTitle: "Home Remedies for Skin Care: Natural Face & Skin Tips",
      metaDescription:
        "Ayurvedic home remedies for skin care — pimple marks, pigmentation, dark neck, open pores and dull skin — with gentle kitchen packs. Find your routine.",
      intro:
        "Our home remedies for skin care are built around gentle kitchen ingredients — besan, curd, turmeric, aloe vera, honey, sandalwood, multani mitti — and the everyday habits that make the biggest difference to how skin looks: sleep, water, sun protection and not picking at it.\n\nAyurveda sees the skin as a mirror of digestion and blood (rakta dhatu). Heat and inflammation (pitta) show up as pimples, redness and pigmentation; dryness (vata) as rough, flaky or early-wrinkled skin; and heaviness (kapha) as oiliness, open pores and whiteheads. So alongside each face pack you'll find a word on food, routine and what to avoid.\n\nBrowse the guides below for pimple marks, pigmentation, dark neck and underarms, open pores, whiteheads, puffy eyes, dark lips, body odour and more. A few ground rules apply to all of them: patch test on the inner arm first, don't use lemon or raw spices on broken or sensitive skin, use sunscreen daily, and be patient — skin renews roughly every four to six weeks.\n\nSee a dermatologist for rashes that spread, painful cystic acne, moles that change, or any skin problem that doesn't improve.",
    },
    hi: {
      name: "त्वचा और चेहरे की देखभाल",
      headTerm: "त्वचा की देखभाल के घरेलू उपाय",
      title: "त्वचा की देखभाल के घरेलू उपाय: चेहरे और त्वचा की आम समस्याओं के प्राकृतिक हल",
      metaTitle: "त्वचा की देखभाल के घरेलू उपाय: चेहरे के लिए नुस्खे",
      metaDescription:
        "मुँहासों के दाग़, झाइयाँ, काली गर्दन, खुले रोमछिद्र और बेजान त्वचा के लिए आयुर्वेदिक घरेलू उपाय और रसोई के आसान फ़ेस पैक। अपनी दिनचर्या चुनें।",
      intro:
        "हमारे त्वचा की देखभाल के घरेलू उपाय रसोई की सौम्य चीज़ों — बेसन, दही, हल्दी, एलोवेरा, शहद, चंदन, मुल्तानी मिट्टी — और उन रोज़ की आदतों पर आधारित हैं जो त्वचा पर सबसे ज़्यादा असर डालती हैं: नींद, पानी, धूप से बचाव और त्वचा को न नोचना।\n\nआयुर्वेद त्वचा को पाचन और रक्त धातु का आईना मानता है। गर्मी और सूजन (पित्त) मुँहासे, लाली और झाइयों के रूप में दिखती है; रूखापन (वात) खुरदुरी, पपड़ीदार या समय से पहले झुर्रियों वाली त्वचा के रूप में; और भारीपन (कफ) तैलीय त्वचा, खुले रोमछिद्र और व्हाइटहेड्स के रूप में। इसलिए हर फ़ेस पैक के साथ आपको आहार, दिनचर्या और परहेज़ की बात भी मिलेगी।\n\nनीचे मुँहासों के दाग़, झाइयाँ, काली गर्दन और अंडरआर्म्स, खुले रोमछिद्र, व्हाइटहेड्स, आँखों की सूजन, काले होंठ, शरीर की दुर्गंध और बहुत कुछ के लिए गाइड हैं। सब पर कुछ नियम लागू होते हैं: पहले कलाई के अंदर पैच टेस्ट करें, कटी-फटी या संवेदनशील त्वचा पर नींबू या कच्चे मसाले न लगाएँ, रोज़ सनस्क्रीन लगाएँ, और धैर्य रखें — त्वचा लगभग चार से छह हफ़्ते में नई होती है।\n\nफैलते दाने, दर्द वाले गहरे मुँहासे, बदलते तिल या न सुधरने वाली कोई भी समस्या हो तो त्वचा रोग विशेषज्ञ को दिखाएँ।",
    },
  },
  {
    slug: "stomach-problems",
    icon: "digestion",
    categories: ["digestion"],
    en: {
      name: "Stomach & digestion",
      headTerm: "home remedies for stomach problems",
      title: "Home remedies for stomach problems: gas, acidity, indigestion and more",
      metaTitle: "Home Remedies for Stomach Problems: Ayurvedic Guide",
      metaDescription:
        "Simple home remedies for stomach problems like gas, sour burps, heartburn, constipation and IBS, with Ayurvedic diet tips. Find what suits your gut.",
      intro:
        "Almost every Indian household has a favourite fix for an upset tummy — ajwain after a heavy meal, jeera water in the morning, buttermilk at lunch. This guide collects our home remedies for stomach problems in one place, so you can find gentle, kitchen-based support for gas, sour burps, heartburn at night, indigestion, constipation, IBS and recovery after an illness.\n\nAyurveda places agni, the digestive fire, at the centre of health. When agni is weak, food turns into ama — a heavy, sticky residue linked with bloating, coating on the tongue and sluggishness. When it is too sharp, you may feel burning and acidity. The remedies here aim to bring agni back into balance with warm, simple meals at regular times, digestive spices such as ginger, cumin, fennel and ajwain, and habits like not lying down straight after eating.\n\nStomach symptoms can also signal conditions that need medical care. Please see a doctor quickly for blood in stool or vomit, black stools, severe or constant pain, weight loss without trying, trouble swallowing, persistent vomiting, dehydration, or yellow eyes. Children, older adults and pregnant women should get advice early. Use these remedies alongside, never instead of, prescribed treatment.",
    },
    hi: {
      name: "पेट और पाचन",
      headTerm: "पेट की समस्याओं के घरेलू उपाय",
      title: "पेट की समस्याओं के घरेलू उपाय: गैस, एसिडिटी, अपच और बहुत कुछ",
      metaTitle: "पेट की समस्याओं के घरेलू उपाय: आयुर्वेदिक गाइड",
      metaDescription:
        "गैस, खट्टी डकार, सीने में जलन, कब्ज़ और आईबीएस जैसी पेट की समस्याओं के आसान घरेलू उपाय और आयुर्वेदिक आहार सुझाव। अपने पेट के लिए सही नुस्खा चुनें।",
      intro:
        "लगभग हर भारतीय घर में पेट ख़राब होने का कोई पसंदीदा नुस्खा होता है — भारी खाने के बाद अजवाइन, सुबह जीरा पानी, दोपहर में छाछ। इस गाइड में हमारे पेट की समस्याओं के घरेलू उपाय एक जगह हैं, ताकि आप गैस, खट्टी डकार, रात में सीने की जलन, अपच, कब्ज़, आईबीएस और बीमारी के बाद की रिकवरी के लिए रसोई से जुड़ी सौम्य मदद पा सकें।\n\nआयुर्वेद में अग्नि यानी पाचन शक्ति को सेहत का केंद्र माना गया है। अग्नि कमज़ोर हो तो भोजन आम में बदल जाता है — एक भारी, चिपचिपा अवशेष, जिसे पेट फूलने, जीभ पर परत और सुस्ती से जोड़ा जाता है। अग्नि बहुत तेज़ हो तो जलन और एसिडिटी महसूस हो सकती है। यहाँ के नुस्खे तय समय पर गरम, सादे भोजन, अदरक, जीरा, सौंफ और अजवाइन जैसे पाचक मसालों और खाने के तुरंत बाद न लेटने जैसी आदतों से अग्नि को संतुलित करने पर ध्यान देते हैं।\n\nपेट के लक्षण ऐसी बीमारियों का संकेत भी हो सकते हैं जिन्हें इलाज चाहिए। मल या उल्टी में ख़ून, काला मल, तेज़ या लगातार दर्द, बिना कोशिश वज़न घटना, निगलने में दिक़्क़त, बार-बार उल्टी, पानी की कमी या आँखें पीली हों तो तुरंत डॉक्टर को दिखाएँ। बच्चे, बुज़ुर्ग और गर्भवती महिलाएँ जल्दी सलाह लें। इन नुस्खों को डॉक्टर के इलाज के साथ अपनाएँ, उसकी जगह नहीं।",
    },
  },
  {
    slug: "cold-and-cough",
    icon: "cold-cough",
    categories: ["cold-cough"],
    en: {
      name: "Cold, cough & throat",
      headTerm: "home remedies for cold and cough",
      title: "Home remedies for cold and cough: night cough, sore throat, kids and more",
      metaTitle: "Home Remedies for Cold and Cough: Ayurvedic Relief",
      metaDescription:
        "Trusted home remedies for cold and cough — dry cough at night, tonsils, mucus, kids' colds and pollution cough — with safety tips. Find gentle relief.",
      intro:
        "A blocked nose, scratchy throat and a cough that keeps you up at night can drain your energy for days. This guide gathers our home remedies for cold and cough — from honey-based spoons and steam to warm soups and gargles — organised by the problem you are facing: dry cough at night, mucus in the throat, tonsils, colds in children, cough during pregnancy, pollution cough and more.\n\nIn Ayurveda, most colds are seen as kapha building up in the chest and head, often after cold, heavy or oily food, damp weather or poor sleep. Warm fluids, ginger, tulsi, black pepper, turmeric and mulethi are traditionally used to thin mucus and soothe the throat, while rest gives the body time to recover. Most common colds settle in seven to ten days; the remedies here aim to make those days more comfortable.\n\nPlease see a doctor for breathing difficulty, wheezing, chest pain, high or persistent fever, a cough lasting more than three weeks, coughing up blood, or any worrying symptoms in babies, older adults or people with asthma, heart or lung disease. Never give honey to children under one year old. Continue any prescribed inhalers or medicines.",
    },
    hi: {
      name: "सर्दी, खांसी और गला",
      headTerm: "सर्दी-खांसी के घरेलू उपाय",
      title: "सर्दी-खांसी के घरेलू उपाय: रात की खांसी, गले की ख़राश, बच्चे और बहुत कुछ",
      metaTitle: "सर्दी-खांसी के घरेलू उपाय: आयुर्वेदिक राहत",
      metaDescription:
        "सर्दी-खांसी के भरोसेमंद घरेलू उपाय — रात की सूखी खांसी, टॉन्सिल, बलगम, बच्चों की सर्दी और प्रदूषण वाली खांसी — सावधानियों के साथ। सौम्य राहत पाएँ।",
      intro:
        "बंद नाक, गले में ख़राश और रात भर जगाने वाली खांसी कई दिनों तक थका देती है। इस गाइड में हमारे सर्दी-खांसी के घरेलू उपाय एक जगह हैं — शहद वाले नुस्खों और भाप से लेकर गरम सूप और गरारों तक — और इन्हें समस्या के हिसाब से रखा गया है: रात की सूखी खांसी, गले में बलगम, टॉन्सिल, बच्चों की सर्दी, गर्भावस्था में खांसी, प्रदूषण वाली खांसी और भी बहुत कुछ।\n\nआयुर्वेद में ज़्यादातर सर्दी को छाती और सिर में कफ बढ़ने के रूप में देखा जाता है, जो अक्सर ठंडे, भारी या तैलीय खाने, नम मौसम या कम नींद के बाद होता है। गरम तरल, अदरक, तुलसी, काली मिर्च, हल्दी और मुलेठी परंपरा से बलगम पतला करने और गले को आराम देने के लिए इस्तेमाल होते हैं, और आराम से शरीर को ठीक होने का समय मिलता है। आम सर्दी सात से दस दिन में ठीक हो जाती है; ये नुस्खे उन दिनों को आरामदायक बनाने के लिए हैं।\n\nसाँस लेने में तकलीफ़, घरघराहट, सीने में दर्द, तेज़ या लगातार बुखार, तीन हफ़्ते से ज़्यादा खांसी, खांसी में ख़ून, या शिशुओं, बुज़ुर्गों और अस्थमा, दिल या फेफड़ों के मरीज़ों में कोई भी चिंताजनक लक्षण हो तो डॉक्टर को दिखाएँ। एक साल से छोटे बच्चे को शहद कभी न दें। डॉक्टर के दिए इनहेलर या दवाएँ जारी रखें।",
    },
  },
];

export function getCluster(slug: string): Cluster | undefined {
  return clusters.find((c) => c.slug === slug);
}

/** New keyword-focused remedies that belong to this cluster */
export function getClusterRemedies(slug: string): Remedy[] {
  return remedies.filter((r) => r.cluster === slug);
}

/** Older remedies from the cluster's categories (not tagged with a cluster) */
export function getClusterMoreRemedies(cluster: Cluster): Remedy[] {
  return remedies.filter((r) => !r.cluster && cluster.categories.includes(r.category));
}

/** Clusters that have at least one remedy (only these get hub pages) */
export const activeClusters: Cluster[] = clusters.filter((c) => getClusterRemedies(c.slug).length > 0);
