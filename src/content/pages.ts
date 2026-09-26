import type { Locale } from "@/i18n/config";

export type StaticPageKey = "about" | "privacy" | "terms" | "disclaimer";

type StaticPage = { title: string; description: string; body: string };

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@allayurvedics.in";
const updated = "26 September 2026";
const updatedHi = "26 सितंबर 2026";

export const staticPages: Record<StaticPageKey, Record<Locale, StaticPage>> = {
  about: {
    en: {
      title: "About All Ayurvedics",
      description: "Who we are and why we share everyday Ayurveda in English and Hindi.",
      body: `**All Ayurvedics** is a home for practical, everyday Ayurveda — written in plain English and natural Hindi so that whole families can read it together.

## Why we started

Most of us grew up with a grandmother's remedies: haldi doodh for a cough, ajwain for a stomach ache, oil massage on Sunday mornings. Much of that knowledge is being lost, while the internet is full of exaggerated claims. We want to bring back the simple, useful parts of Ayurveda — and present them honestly.

## What you'll find here

- **Home remedies** made from common kitchen ingredients, each with clear precautions.
- **Articles** on the foundations of Ayurveda: the doshas, daily and seasonal routines, food, sleep, yoga and herbs.
- **Products** — a small, carefully chosen range of Ayurvedic products with clear labels and honest descriptions. We add new products one at a time.

## Our principles

- **Honesty first.** We never claim that a remedy cures a serious disease.
- **Safety always.** Every remedy includes precautions and tells you when to see a doctor.
- **Respect for both traditions.** Ayurveda and modern medicine can work side by side. If you take prescribed medicine, keep taking it.
- **Original content.** Everything on this site is written by our team from general Ayurvedic knowledge.

## Get in touch

Have a question or suggestion? Visit our enquiry page or email us at ${contactEmail}.`,
    },
    hi: {
      title: "ऑल आयुर्वेदिक्स के बारे में",
      description: "हम कौन हैं और हिन्दी व अंग्रेज़ी में रोज़मर्रा का आयुर्वेद क्यों बाँटते हैं।",
      body: `**ऑल आयुर्वेदिक्स** व्यावहारिक, रोज़मर्रा के आयुर्वेद का ठिकाना है — सरल हिन्दी और अंग्रेज़ी में लिखा हुआ, ताकि पूरा परिवार साथ मिलकर पढ़ सके।

## हमने क्यों शुरू किया

हममें से ज़्यादातर लोग दादी-नानी के नुस्खों के साथ बड़े हुए हैं: खाँसी में हल्दी वाला दूध, पेट दर्द में अजवाइन, रविवार की सुबह तेल मालिश। वह ज्ञान धीरे-धीरे खो रहा है, जबकि इंटरनेट बढ़ा-चढ़ाकर किए गए दावों से भरा है। हम आयुर्वेद के सरल, काम के हिस्सों को वापस लाना चाहते हैं — और उन्हें ईमानदारी से सामने रखना चाहते हैं।

## यहाँ आपको क्या मिलेगा

- रसोई की आम चीज़ों से बने **घरेलू नुस्खे**, हर एक के साथ साफ़ सावधानियाँ।
- आयुर्वेद की बुनियाद पर **लेख**: दोष, दिनचर्या और ऋतुचर्या, भोजन, नींद, योग और जड़ी-बूटियाँ।
- **उत्पाद** — साफ़ लेबल और ईमानदार जानकारी के साथ चुनिंदा आयुर्वेदिक उत्पाद। हम एक-एक करके नए उत्पाद जोड़ते हैं।

## हमारे सिद्धांत

- **ईमानदारी सबसे पहले।** हम कभी दावा नहीं करते कि कोई नुस्खा किसी गंभीर बीमारी को ठीक कर देगा।
- **सुरक्षा हमेशा।** हर नुस्खे में सावधानियाँ हैं और यह भी कि कब डॉक्टर को दिखाना है।
- **दोनों परंपराओं का सम्मान।** आयुर्वेद और आधुनिक चिकित्सा साथ-साथ चल सकते हैं। अगर आप डॉक्टर की दवा लेते हैं, तो उसे जारी रखें।
- **मौलिक सामग्री।** इस साइट की हर बात हमारी टीम ने सामान्य आयुर्वेदिक ज्ञान के आधार पर लिखी है।

## संपर्क करें

कोई सवाल या सुझाव? हमारे पूछताछ पेज पर जाएँ या हमें ${contactEmail} पर ईमेल करें।`,
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description: "How All Ayurvedics collects, uses and protects your personal information.",
      body: `*Last updated: ${updated}*

This policy explains how All Ayurvedics ("we", "us") handles personal information when you use allayurvedics.in.

## Information we collect

- **Information you give us:** your name, email address, phone number and message when you send an enquiry; your email address (and optionally your name) when you subscribe to our newsletter or request a free guide; and your name, email and password when customer accounts are available.
- **Technical information:** basic technical data such as browser type and pages visited, collected by our hosting provider for security and performance.

We do not knowingly collect information from children under 13.

## How we use it

- To reply to your enquiries.
- To send newsletters and guides you have asked for. Every email includes an unsubscribe link.
- To operate customer accounts once available.
- To keep the website secure and working well.

We do not sell your personal information.

## Service providers

We may use trusted third-party services to host the website, store form submissions and send emails (for example a hosting platform, a database provider and an email delivery service). They process data only on our behalf.

## How long we keep it

We keep enquiries for as long as needed to respond and for reasonable record-keeping, and newsletter data until you unsubscribe.

## Your choices and rights

You can unsubscribe from emails at any time and ask us to access, correct or delete your personal information by writing to ${contactEmail}. We aim to handle requests in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.

## Changes

We may update this policy from time to time. The date at the top shows the latest version.

## Contact

Questions about privacy? Email ${contactEmail}.`,
    },
    hi: {
      title: "गोपनीयता नीति",
      description: "ऑल आयुर्वेदिक्स आपकी निजी जानकारी कैसे इकट्ठा करता, इस्तेमाल करता और सुरक्षित रखता है।",
      body: `*अंतिम अपडेट: ${updatedHi}*

यह नीति बताती है कि allayurvedics.in का उपयोग करते समय ऑल आयुर्वेदिक्स ("हम") आपकी निजी जानकारी को कैसे संभालता है।

## हम कौन-सी जानकारी लेते हैं

- **जो जानकारी आप देते हैं:** पूछताछ भेजते समय आपका नाम, ईमेल, फ़ोन नंबर और संदेश; न्यूज़लेटर या मुफ़्त गाइड के लिए आपका ईमेल (और चाहें तो नाम); और ग्राहक खाते उपलब्ध होने पर आपका नाम, ईमेल और पासवर्ड।
- **तकनीकी जानकारी:** ब्राउज़र का प्रकार और देखे गए पेज जैसी बुनियादी तकनीकी जानकारी, जो सुरक्षा और प्रदर्शन के लिए हमारी होस्टिंग सेवा इकट्ठा करती है।

हम जानबूझकर 13 साल से कम उम्र के बच्चों की जानकारी नहीं लेते।

## हम इसका उपयोग कैसे करते हैं

- आपकी पूछताछ का जवाब देने के लिए।
- आपके माँगे गए न्यूज़लेटर और गाइड भेजने के लिए। हर ईमेल में सदस्यता छोड़ने का लिंक होता है।
- उपलब्ध होने पर ग्राहक खाते चलाने के लिए।
- वेबसाइट को सुरक्षित और ठीक से चालू रखने के लिए।

हम आपकी निजी जानकारी बेचते नहीं हैं।

## सेवा प्रदाता

वेबसाइट होस्ट करने, फ़ॉर्म की जानकारी सहेजने और ईमेल भेजने के लिए हम भरोसेमंद तृतीय-पक्ष सेवाओं (जैसे होस्टिंग प्लेटफ़ॉर्म, डेटाबेस प्रदाता और ईमेल सेवा) का उपयोग कर सकते हैं। वे केवल हमारी ओर से डेटा संसाधित करते हैं।

## हम कब तक रखते हैं

पूछताछ को हम जवाब देने और उचित रिकॉर्ड के लिए ज़रूरी समय तक रखते हैं, और न्यूज़लेटर की जानकारी तब तक जब तक आप सदस्यता न छोड़ें।

## आपके विकल्प और अधिकार

आप कभी भी ईमेल की सदस्यता छोड़ सकते हैं, और ${contactEmail} पर लिखकर अपनी निजी जानकारी देखने, सुधारने या हटाने का अनुरोध कर सकते हैं। हम डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 सहित लागू भारतीय क़ानून के अनुसार अनुरोधों को निपटाने का प्रयास करते हैं।

## बदलाव

हम समय-समय पर इस नीति को अपडेट कर सकते हैं। ऊपर दी गई तारीख़ नवीनतम संस्करण बताती है।

## संपर्क

गोपनीयता से जुड़े सवाल? ${contactEmail} पर ईमेल करें।`,
    },
  },
  terms: {
    en: {
      title: "Terms of Use",
      description: "The terms that apply when you use the All Ayurvedics website.",
      body: `*Last updated: ${updated}*

By using allayurvedics.in you agree to these terms. If you do not agree, please do not use the site.

## Information only

All content on this website — including remedies, articles and product descriptions — is provided for general information and education. It is not medical advice, diagnosis or treatment. Please read our Medical Disclaimer.

## Products

Product descriptions are based on the manufacturer's label and traditional use, and are not medical claims. Prices are in Indian rupees. You can order by sending an enquiry; where a "Buy now" button is shown, payment is handled securely by a third-party payment provider and we do not store your card or bank details. Availability, delivery charges and timelines, and any return or refund terms are confirmed when you place an order. Always read the label and precautions before use.

## Your use of the site

You agree not to misuse the website, attempt to gain unauthorised access, submit false information, or send spam through our forms.

## Accounts

When customer accounts become available, you are responsible for keeping your login details confidential and for activity under your account.

## Intellectual property

The text, design and graphics on this website belong to All Ayurvedics unless stated otherwise. You may share links and short quotes with attribution, but please do not copy whole pages or republish our content without permission.

## Limitation of liability

We work hard to keep information accurate, but we make no guarantees that it is complete or error-free. To the extent permitted by law, All Ayurvedics is not liable for any loss or harm arising from use of the website or reliance on its content.

## Governing law

These terms are governed by the laws of India.

## Contact

Questions about these terms? Email ${contactEmail}.`,
    },
    hi: {
      title: "उपयोग की शर्तें",
      description: "ऑल आयुर्वेदिक्स वेबसाइट के उपयोग पर लागू होने वाली शर्तें।",
      body: `*अंतिम अपडेट: ${updatedHi}*

allayurvedics.in का उपयोग करके आप इन शर्तों से सहमत होते हैं। अगर आप सहमत नहीं हैं, तो कृपया साइट का उपयोग न करें।

## केवल जानकारी के लिए

इस वेबसाइट की सारी सामग्री — नुस्खे, लेख और उत्पाद विवरण सहित — सामान्य जानकारी और शिक्षा के लिए है। यह चिकित्सा सलाह, निदान या इलाज नहीं है। कृपया हमारा चिकित्सा अस्वीकरण पढ़ें।

## उत्पाद

उत्पादों की जानकारी निर्माता के लेबल और पारंपरिक उपयोग पर आधारित है, यह कोई चिकित्सा दावा नहीं है। कीमतें भारतीय रुपये में हैं। आप पूछताछ भेजकर ऑर्डर कर सकते हैं; जहाँ "अभी ख़रीदें" बटन दिखे, वहाँ भुगतान किसी तृतीय-पक्ष पेमेंट प्रदाता द्वारा सुरक्षित रूप से होता है और हम आपके कार्ड या बैंक की जानकारी नहीं रखते। उपलब्धता, डिलीवरी शुल्क व समय, और वापसी या रिफ़ंड की शर्तें ऑर्डर के समय बताई जाती हैं। इस्तेमाल से पहले हमेशा लेबल और सावधानियाँ पढ़ें।

## साइट का आपका उपयोग

आप सहमत होते हैं कि वेबसाइट का दुरुपयोग नहीं करेंगे, बिना अनुमति पहुँच की कोशिश नहीं करेंगे, ग़लत जानकारी नहीं देंगे और हमारे फ़ॉर्म से स्पैम नहीं भेजेंगे।

## खाते

ग्राहक खाते उपलब्ध होने पर अपने लॉग इन विवरण गोपनीय रखना और अपने खाते से होने वाली गतिविधि की ज़िम्मेदारी आपकी होगी।

## बौद्धिक संपदा

इस वेबसाइट का पाठ, डिज़ाइन और ग्राफ़िक्स ऑल आयुर्वेदिक्स के हैं, जब तक अलग से न बताया गया हो। आप लिंक और श्रेय के साथ छोटे अंश साझा कर सकते हैं, पर बिना अनुमति पूरे पेज कॉपी न करें और हमारी सामग्री दोबारा प्रकाशित न करें।

## दायित्व की सीमा

हम जानकारी को सही रखने की पूरी कोशिश करते हैं, पर इसकी गारंटी नहीं देते कि वह पूर्ण या त्रुटिरहित है। क़ानून द्वारा अनुमत सीमा तक, वेबसाइट के उपयोग या उसकी सामग्री पर भरोसे से होने वाले किसी नुक़सान के लिए ऑल आयुर्वेदिक्स ज़िम्मेदार नहीं है।

## लागू क़ानून

ये शर्तें भारत के क़ानूनों के अधीन हैं।

## संपर्क

इन शर्तों के बारे में सवाल? ${contactEmail} पर ईमेल करें।`,
    },
  },
  disclaimer: {
    en: {
      title: "Medical Disclaimer",
      description: "Important information about the health content on All Ayurvedics.",
      body: `*Last updated: ${updated}*

## For general information only

The content on All Ayurvedics — including home remedies, articles, product descriptions, emails and guides — is for **general information and education only**. It is **not a substitute for professional medical advice, diagnosis or treatment**.

## Always consult a qualified practitioner

Please consult a qualified doctor or registered Ayurvedic practitioner (BAMS) before trying any remedy, herb or lifestyle change, **especially if you are pregnant, nursing, taking any medication, or have a medical condition**. Do not use remedies on babies or young children without professional advice.

## Never stop prescribed medicine

If you have diabetes, high blood pressure, heart disease, thyroid disease or any other condition, **keep taking the medicine your doctor has prescribed**. Home remedies may support a healthy lifestyle, but they must not replace medical treatment. Some herbs and foods can interact with medicines — always tell your doctor what you are taking.

## No cure claims

Nothing on this website is intended to diagnose, treat, cure or prevent any disease. Individual results vary. Traditional use does not guarantee safety or effectiveness for everyone.

## Allergies and sensitivities

Natural does not always mean safe. Always do a patch test before applying anything to your skin, and stop immediately if you notice any reaction.

## In an emergency

If you have chest pain, difficulty breathing, severe bleeding, signs of a stroke, a severe allergic reaction or any other emergency, call your local emergency number (112 in India) or go to the nearest hospital immediately.

## Questions

If you have questions about this disclaimer, email ${contactEmail}.`,
    },
    hi: {
      title: "चिकित्सा अस्वीकरण",
      description: "ऑल आयुर्वेदिक्स पर स्वास्थ्य से जुड़ी सामग्री के बारे में ज़रूरी जानकारी।",
      body: `*अंतिम अपडेट: ${updatedHi}*

## केवल सामान्य जानकारी के लिए

ऑल आयुर्वेदिक्स की सामग्री — घरेलू नुस्खे, लेख, उत्पाद विवरण, ईमेल और गाइड सहित — **केवल सामान्य जानकारी और शिक्षा के लिए** है। यह **पेशेवर चिकित्सा सलाह, निदान या इलाज का विकल्प नहीं है**।

## हमेशा योग्य चिकित्सक से सलाह लें

कोई भी नुस्खा, जड़ी-बूटी या जीवनशैली में बदलाव आज़माने से पहले किसी योग्य डॉक्टर या पंजीकृत आयुर्वेदिक चिकित्सक (BAMS) से सलाह लें, **ख़ासकर यदि आप गर्भवती हैं, स्तनपान करा रही हैं, कोई दवा ले रहे हैं या किसी बीमारी से ग्रस्त हैं**। शिशुओं या छोटे बच्चों पर बिना विशेषज्ञ की सलाह के कोई नुस्खा न आज़माएँ।

## डॉक्टर की दवा कभी बंद न करें

अगर आपको डायबिटीज़, हाई बीपी, दिल की बीमारी, थायरॉइड या कोई और बीमारी है, तो **डॉक्टर की लिखी दवा लेते रहें**। घरेलू नुस्खे स्वस्थ जीवनशैली में सहायक हो सकते हैं, पर वे इलाज की जगह नहीं ले सकते। कुछ जड़ी-बूटियाँ और खाद्य दवाओं पर असर डाल सकते हैं — हमेशा अपने डॉक्टर को बताएँ कि आप क्या ले रहे हैं।

## इलाज का कोई दावा नहीं

इस वेबसाइट की कोई भी बात किसी बीमारी के निदान, इलाज, उपचार या रोकथाम के लिए नहीं है। हर व्यक्ति पर असर अलग हो सकता है। पारंपरिक उपयोग का अर्थ यह नहीं कि कोई चीज़ सबके लिए सुरक्षित या असरदार है।

## एलर्जी और संवेदनशीलता

प्राकृतिक का मतलब हमेशा सुरक्षित नहीं होता। त्वचा पर कुछ भी लगाने से पहले पैच टेस्ट करें, और कोई प्रतिक्रिया दिखे तो तुरंत बंद कर दें।

## आपात स्थिति में

सीने में दर्द, साँस लेने में तकलीफ़, तेज़ रक्तस्राव, लकवे के लक्षण, गंभीर एलर्जी या कोई भी आपात स्थिति हो तो तुरंत आपातकालीन नंबर (भारत में 112) पर कॉल करें या नज़दीकी अस्पताल जाएँ।

## सवाल

इस अस्वीकरण के बारे में कोई सवाल हो तो ${contactEmail} पर ईमेल करें।`,
    },
  },
};
