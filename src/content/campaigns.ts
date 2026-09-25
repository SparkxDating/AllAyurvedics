import type { Locale } from "@/i18n/config";

export type CampaignText = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  formTitle: string;
  formNote: string;
  cta: string;
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  outlineTitle: string;
  outline: { day: string; title: string; text: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  successMessage: string;
};

export type Campaign = {
  slug: string;
  /** tag stored with the subscriber so you can segment email lists */
  listTag: string;
  content: Record<Locale, CampaignText>;
};

export const campaigns: Campaign[] = [
  {
    slug: "7-day-morning-routine",
    listTag: "lp-7-day-morning-routine",
    content: {
      en: {
        metaTitle: "Free guide: 7-Day Ayurvedic Morning Routine",
        metaDescription:
          "Build a calmer, more energetic morning in one week. Get our free, step-by-step Ayurvedic morning routine guide in English or Hindi.",
        eyebrow: "Free email guide",
        title: "The 7-Day Ayurvedic Morning Routine",
        subtitle:
          "One small habit a day for a week. By day seven you'll have a simple, grounding morning ritual that fits into 20 minutes.",
        formTitle: "Send me the free guide",
        formNote: "Delivered by email in English or Hindi. Unsubscribe any time.",
        cta: "Get the free guide",
        benefitsTitle: "Why an Ayurvedic morning?",
        benefits: [
          { title: "Steadier energy", text: "A regular rhythm helps digestion and energy settle into a natural pattern." },
          { title: "A calmer mind", text: "A few quiet minutes before the day begins changes how the whole day feels." },
          { title: "Realistic and simple", text: "No special equipment, no expensive products — just your kitchen and a few minutes." },
        ],
        outlineTitle: "What you'll build, day by day",
        outline: [
          { day: "Day 1", title: "Wake at a steady time", text: "Choose your wake-up time and why consistency matters more than waking early." },
          { day: "Day 2", title: "Tongue scraping & oral care", text: "A ten-second habit for a fresher mouth." },
          { day: "Day 3", title: "Warm water ritual", text: "Rehydrate gently and support morning digestion." },
          { day: "Day 4", title: "Five minutes of movement", text: "Easy stretches and a gentle introduction to sun salutations." },
          { day: "Day 5", title: "Abhyanga made easy", text: "A quick oil massage for the scalp and feet on busy days." },
          { day: "Day 6", title: "Breath and stillness", text: "A beginner-friendly breathing practice to steady the mind." },
          { day: "Day 7", title: "Put it all together", text: "Your personal 20-minute routine — and how to keep it going." },
        ],
        faqTitle: "Questions",
        faq: [
          { q: "Is it really free?", a: "Yes. You'll receive the guide by email and occasional Ayurveda tips. You can unsubscribe with one click." },
          { q: "Do I need any special products?", a: "No. Everything uses common household items. We never require you to buy anything." },
          { q: "Is this medical advice?", a: "No. The guide shares general lifestyle information. If you have a medical condition, are pregnant or take medication, check with your doctor before making changes." },
        ],
        successMessage: "Thank you! Check your inbox — your guide is on its way.",
      },
      hi: {
        metaTitle: "मुफ़्त गाइड: 7 दिन की आयुर्वेदिक सुबह की दिनचर्या",
        metaDescription:
          "एक हफ़्ते में ज़्यादा शांत और ऊर्जावान सुबह बनाएँ। हमारी मुफ़्त, क़दम-दर-क़दम आयुर्वेदिक सुबह की दिनचर्या गाइड हिन्दी या अंग्रेज़ी में पाएँ।",
        eyebrow: "मुफ़्त ईमेल गाइड",
        title: "7 दिन की आयुर्वेदिक सुबह की दिनचर्या",
        subtitle:
          "एक हफ़्ते तक रोज़ एक छोटी आदत। सातवें दिन तक आपके पास एक सरल, सुकून भरी सुबह की दिनचर्या होगी, जो 20 मिनट में पूरी हो जाती है।",
        formTitle: "मुझे मुफ़्त गाइड भेजें",
        formNote: "हिन्दी या अंग्रेज़ी में ईमेल से भेजी जाएगी। जब चाहें सदस्यता छोड़ें।",
        cta: "मुफ़्त गाइड पाएँ",
        benefitsTitle: "आयुर्वेदिक सुबह क्यों?",
        benefits: [
          { title: "स्थिर ऊर्जा", text: "नियमित लय से पाचन और ऊर्जा एक स्वाभाविक ढर्रे पर आ जाते हैं।" },
          { title: "शांत मन", text: "दिन शुरू होने से पहले कुछ शांत पल पूरे दिन का एहसास बदल देते हैं।" },
          { title: "व्यावहारिक और सरल", text: "कोई ख़ास सामान नहीं, कोई महँगा उत्पाद नहीं — बस आपकी रसोई और कुछ मिनट।" },
        ],
        outlineTitle: "दिन-ब-दिन आप क्या बनाएँगे",
        outline: [
          { day: "दिन 1", title: "एक तय समय पर उठना", text: "अपने उठने का समय चुनें, और जानें कि जल्दी उठने से ज़्यादा नियमितता क्यों ज़रूरी है।" },
          { day: "दिन 2", title: "जीभ की सफ़ाई और मुँह की देखभाल", text: "ताज़े मुँह के लिए दस सेकंड की आदत।" },
          { day: "दिन 3", title: "गुनगुने पानी की आदत", text: "शरीर में पानी की कमी पूरी करें और सुबह के पाचन को सहारा दें।" },
          { day: "दिन 4", title: "पाँच मिनट की गतिविधि", text: "आसान स्ट्रेचिंग और सूर्य नमस्कार की सौम्य शुरुआत।" },
          { day: "दिन 5", title: "आसान अभ्यंग", text: "व्यस्त दिनों के लिए सिर और पैरों की झटपट तेल मालिश।" },
          { day: "दिन 6", title: "श्वास और स्थिरता", text: "मन को स्थिर करने के लिए शुरुआती लोगों के लिए आसान प्राणायाम।" },
          { day: "दिन 7", title: "सब कुछ एक साथ", text: "आपकी अपनी 20 मिनट की दिनचर्या — और इसे जारी कैसे रखें।" },
        ],
        faqTitle: "सवाल",
        faq: [
          { q: "क्या यह सच में मुफ़्त है?", a: "हाँ। आपको गाइड ईमेल से मिलेगी और कभी-कभार आयुर्वेद से जुड़े सुझाव। एक क्लिक में सदस्यता छोड़ सकते हैं।" },
          { q: "क्या कोई ख़ास उत्पाद चाहिए?", a: "नहीं। सब कुछ घर में मिलने वाली आम चीज़ों से होता है। हम कभी कुछ ख़रीदने को मजबूर नहीं करते।" },
          { q: "क्या यह चिकित्सा सलाह है?", a: "नहीं। गाइड जीवनशैली से जुड़ी सामान्य जानकारी देती है। कोई बीमारी हो, आप गर्भवती हों या दवा लेते हों, तो बदलाव से पहले डॉक्टर से पूछें।" },
        ],
        successMessage: "धन्यवाद! अपना इनबॉक्स देखें — आपकी गाइड रास्ते में है।",
      },
    },
  },
];

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}
