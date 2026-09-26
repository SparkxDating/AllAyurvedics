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
