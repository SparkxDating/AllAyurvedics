import type { Locale } from "@/i18n/config";

/**
 * Copy for the Himalayan Shilajit ad landing page (/shilajit, /en|hi/lp/shilajit).
 * Keep claims traditional and general: no disease, sexual-health or guaranteed-result claims.
 * How-to-use, precautions and FAQs come from the product entry in src/content/products.ts.
 */
export const shilajitLandingSlug = "shilajit";
export const shilajitProductSlug = "himalayan-shilajit-resin-10g";
export const shilajitLandingMaxQty = 5;

export type ShilajitLandingText = {
  metaTitle: string;
  metaDescription: string;
  ogAlt: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  off: string;
  mrp: string;
  chips: string[];
  ctaWhatsapp: string;
  ctaUpi: string;
  whatsappMessage: string;
  ctaNote: string;
  videoTitle: string;
  videoLabel: string;
  pointsTitle: string;
  points: string[];
  pointsNote: string;
  howToUseTitle: string;
  orderTitle: string;
  orderSteps: { title: string; text: string }[];
  payTitle: string;
  payIntro: string;
  deliveryNote: string;
  precautionsTitle: string;
  faqTitle: string;
  contactTitle: string;
  contactLine: string;
  stickyWhatsapp: string;
  stickyUpi: string;
  fullDetails: string;
  switchLanguage: string;
  imageAlt: string;
  guidesTitle: string;
};

export const shilajitLanding: Record<Locale, ShilajitLandingText> = {
  en: {
    metaTitle: "Buy Himalayan Shilajit Resin 10g Online – ₹499 (38% OFF)",
    metaDescription:
      "100% Himalayan shilajit resin by Adamya Herbals, 10 g jar at ₹499 (MRP ₹799). Traditionally used for strength, stamina and energy. Order on WhatsApp or pay by UPI.",
    ogAlt: "Himalayan Shilajit Resin 10 g – ₹499, MRP ₹799, 38% off",
    eyebrow: "Ayurvedic rasayana · Adamya Herbals",
    headline: "100% Himalayan Shilajit Resin – Strength, Stamina & Energy",
    subhead:
      "Pure, semi-solid shilajit resin in a 10 g glass jar. A pea-sized amount a day in warm water or milk — a traditional Ayurvedic rasayana for your daily routine.",
    off: "38% OFF",
    mrp: "MRP",
    chips: ["Ayurvedic", "Licensed manufacturer · Lic. A-4750/19", "10 g resin", "UPI payment"],
    ctaWhatsapp: "Order on WhatsApp",
    ctaUpi: "Pay ₹499 via UPI",
    whatsappMessage: "Hello All Ayurvedics, I want to order Himalayan Shilajit Resin 10 g (₹499).",
    ctaNote: "Pay by any UPI app (Google Pay, PhonePe, Paytm, BHIM) or chat with us first on WhatsApp.",
    videoTitle: "See the jar",
    videoLabel: "Product video: Himalayan shilajit resin jar",
    pointsTitle: "Himalayan shilajit benefits: traditional Ayurvedic uses",
    points: [
      "Traditionally used in Ayurveda to support strength and stamina",
      "Supports everyday energy and vitality as part of a daily routine",
      "Valued as a rasayana — a classical rejuvenating substance in Ayurveda",
      "Pure resin: the least processed form of shilajit",
      "Naturally contains fulvic acid and minerals",
      "Made by a licensed Ayurvedic manufacturer (Lic. A-4750/19)",
    ],
    pointsNote:
      "Shilajit is a traditional supplement, not a medicine. It is not intended to diagnose, treat or cure any disease, and results vary from person to person.",
    howToUseTitle: "How to take shilajit resin",
    orderTitle: "How to order",
    orderSteps: [
      { title: "Pay by UPI", text: "Scan the QR code or tap “Pay with UPI app” below and pay the amount shown." },
      { title: "Fill in your details", text: "Enter your delivery address and the 12-digit UTR (transaction ID) from your UPI app." },
      { title: "Send on WhatsApp", text: "Tap “Send order on WhatsApp” and attach your payment screenshot. We confirm your order there." },
    ],
    payTitle: "Pay & place your order",
    payIntro: "Choose the quantity, pay by UPI, then send us your details.",
    deliveryNote: "Delivery details and charges are confirmed on WhatsApp after you order.",
    precautionsTitle: "Precautions",
    faqTitle: "Shilajit FAQs",
    contactTitle: "Need help?",
    contactLine: "Questions? WhatsApp us at {number}",
    stickyWhatsapp: "WhatsApp",
    stickyUpi: "Pay via UPI",
    fullDetails: "Full product details",
    switchLanguage: "हिंदी में पढ़ें",
    imageAlt: "Adamya Herbals Himalayan shilajit resin 10 g – pure shilajit resin in an amber glass jar with gold lid",
    guidesTitle: "Learn more about shilajit",
  },
  hi: {
    metaTitle: "हिमालयन शिलाजीत रेज़िन 10g ऑनलाइन ख़रीदें – ₹499 (38% छूट)",
    metaDescription:
      "अदम्य हर्बल्स का 100% हिमालयन शिलाजीत रेज़िन, 10 ग्राम जार सिर्फ़ ₹499 (MRP ₹799)। परंपरा से ताक़त, स्टैमिना और ऊर्जा के लिए। WhatsApp पर ऑर्डर करें या UPI से भुगतान करें।",
    ogAlt: "हिमालयन शिलाजीत रेज़िन 10 ग्राम – ₹499, MRP ₹799, 38% छूट",
    eyebrow: "आयुर्वेदिक रसायन · अदम्य हर्बल्स",
    headline: "100% हिमालयन शिलाजीत रेज़िन – ताक़त, स्टैमिना और ऊर्जा",
    subhead:
      "10 ग्राम काँच के जार में शुद्ध, अर्ध-ठोस शिलाजीत रेज़िन। रोज़ मटर के दाने जितनी मात्रा गुनगुने पानी या दूध में — दिनचर्या के लिए पारंपरिक आयुर्वेदिक रसायन।",
    off: "38% छूट",
    mrp: "MRP",
    chips: ["आयुर्वेदिक", "लाइसेंसधारी निर्माता · Lic. A-4750/19", "10 ग्राम रेज़िन", "UPI भुगतान"],
    ctaWhatsapp: "WhatsApp पर ऑर्डर करें",
    ctaUpi: "₹499 UPI से भरें",
    whatsappMessage: "नमस्ते All Ayurvedics, मुझे हिमालयन शिलाजीत रेज़िन 10 ग्राम (₹499) ऑर्डर करना है।",
    ctaNote: "किसी भी UPI ऐप (Google Pay, PhonePe, Paytm, BHIM) से भुगतान करें या पहले WhatsApp पर हमसे बात करें।",
    videoTitle: "जार देखें",
    videoLabel: "उत्पाद वीडियो: हिमालयन शिलाजीत रेज़िन जार",
    pointsTitle: "हिमालयन शिलाजीत के फायदे: आयुर्वेद में पारंपरिक उपयोग",
    points: [
      "आयुर्वेद में परंपरा से ताक़त और स्टैमिना को सहारा देने के लिए लिया जाता है",
      "दिनचर्या के हिस्से के रूप में रोज़ की ऊर्जा और स्फूर्ति में सहायक",
      "रसायन के रूप में मूल्यवान — आयुर्वेद का शास्त्रीय कायाकल्प पदार्थ",
      "शुद्ध रेज़िन: शिलाजीत का सबसे कम प्रोसेस्ड रूप",
      "प्राकृतिक रूप से फ़ल्विक एसिड और खनिज",
      "लाइसेंसधारी आयुर्वेदिक निर्माता द्वारा निर्मित (Lic. A-4750/19)",
    ],
    pointsNote:
      "शिलाजीत एक पारंपरिक सप्लीमेंट है, दवा नहीं। यह किसी बीमारी की पहचान, इलाज या रोकथाम के लिए नहीं है, और असर हर व्यक्ति में अलग हो सकता है।",
    howToUseTitle: "शिलाजीत खाने का तरीका",
    orderTitle: "ऑर्डर कैसे करें",
    orderSteps: [
      { title: "UPI से भुगतान करें", text: "नीचे QR कोड स्कैन करें या “UPI ऐप से भुगतान करें” दबाएँ और दिखाई गई राशि भरें।" },
      { title: "अपनी जानकारी भरें", text: "अपना डिलीवरी पता और UPI ऐप से 12 अंकों का UTR (ट्रांज़ैक्शन ID) डालें।" },
      { title: "WhatsApp पर भेजें", text: "“ऑर्डर WhatsApp पर भेजें” दबाएँ और भुगतान का स्क्रीनशॉट भेजें। ऑर्डर की पुष्टि हम वहीं करेंगे।" },
    ],
    payTitle: "भुगतान करें और ऑर्डर दें",
    payIntro: "मात्रा चुनें, UPI से भुगतान करें, फिर अपनी जानकारी भेजें।",
    deliveryNote: "डिलीवरी की जानकारी और शुल्क ऑर्डर के बाद WhatsApp पर बताए जाते हैं।",
    precautionsTitle: "सावधानियाँ",
    faqTitle: "शिलाजीत: अक्सर पूछे जाने वाले सवाल",
    contactTitle: "मदद चाहिए?",
    contactLine: "कोई सवाल? हमें WhatsApp करें: {number}",
    stickyWhatsapp: "WhatsApp",
    stickyUpi: "UPI से भरें",
    fullDetails: "उत्पाद की पूरी जानकारी",
    switchLanguage: "Read in English",
    imageAlt: "अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन 10 ग्राम – शुद्ध शिलाजीत, सुनहरे ढक्कन वाला एम्बर काँच का जार",
    guidesTitle: "शिलाजीत के बारे में और जानें",
  },
};
