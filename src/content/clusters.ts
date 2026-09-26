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
  {
    slug: "joint-pain",
    icon: "joints",
    categories: ["joints"],
    en: {
      name: "Joint, back & muscle pain",
      headTerm: "home remedies for joint pain",
      title: "Home remedies for joint pain, back pain and stiff muscles",
      metaTitle: "Home Remedies for Joint Pain: Ayurvedic Relief Guide",
      metaDescription:
        "Gentle home remedies for joint pain — knee pain, sciatica, cervical, frozen shoulder, sprains and body ache — with oils, compresses and exercise tips.",
      intro:
        "Creaky knees on the stairs, a stiff neck after hours at the laptop, a shoulder that won't lift, or an ache that shoots down the leg — pain in the joints and muscles is one of the most common reasons people look for natural relief. This guide gathers our home remedies for joint pain in one place, organised by where it hurts and why.\n\nAyurveda links most joint and nerve pain with aggravated vata, the dosha of movement and dryness, which rises with age, cold weather, irregular routines and overuse. Traditional care therefore focuses on warmth and lubrication: warm sesame or mahanarayan oil massage, dry and moist compresses (potli), ginger and turmeric in food, and gentle, regular movement. Where there is swelling and heat, as in some types of arthritis, cooling and anti-inflammatory measures are preferred.\n\nThese remedies aim to ease discomfort and support mobility. They do not replace diagnosis. See a doctor for pain after an injury, a hot, red or very swollen joint, fever, numbness or weakness, loss of bladder or bowel control, night pain, unexplained weight loss, or pain that lasts more than a few weeks. If you have rheumatoid arthritis, gout or osteoporosis, continue your prescribed treatment.",
    },
    hi: {
      name: "जोड़, पीठ और मांसपेशियों का दर्द",
      headTerm: "जोड़ों के दर्द के घरेलू उपाय",
      title: "जोड़ों के दर्द, पीठ दर्द और अकड़ी मांसपेशियों के घरेलू उपाय",
      metaTitle: "जोड़ों के दर्द के घरेलू उपाय: आयुर्वेदिक राहत गाइड",
      metaDescription:
        "जोड़ों के दर्द के सौम्य घरेलू उपाय — घुटनों का दर्द, साइटिका, सर्वाइकल, फ्रोज़न शोल्डर, मोच और बदन दर्द — तेल, सिकाई और व्यायाम के सुझावों के साथ।",
      intro:
        "सीढ़ियों पर चरमराते घुटने, लैपटॉप पर घंटों के बाद अकड़ी गर्दन, ऊपर न उठने वाला कंधा, या पैर तक जाता दर्द — जोड़ों और मांसपेशियों का दर्द प्राकृतिक राहत खोजने का सबसे आम कारण है। इस गाइड में हमारे जोड़ों के दर्द के घरेलू उपाय एक जगह हैं, इस हिसाब से कि दर्द कहाँ है और क्यों।\n\nआयुर्वेद ज़्यादातर जोड़ों और नसों के दर्द को बढ़े हुए वात से जोड़ता है — गति और रूखेपन का दोष, जो उम्र, ठंडे मौसम, अनियमित दिनचर्या और ज़्यादा इस्तेमाल से बढ़ता है। इसलिए पारंपरिक देखभाल गर्माहट और चिकनाई पर केंद्रित है: गुनगुने तिल या महानारायण तेल से मालिश, सूखी और गीली सिकाई (पोटली), खाने में अदरक और हल्दी, और हल्की, नियमित गतिविधि। जहाँ सूजन और गर्मी हो, जैसे कुछ तरह के गठिया में, वहाँ ठंडक और सूजन घटाने वाले उपाय बेहतर माने जाते हैं।\n\nये उपाय तकलीफ़ कम करने और चलने-फिरने को सहारा देने के लिए हैं। ये निदान की जगह नहीं लेते। चोट के बाद दर्द, गरम, लाल या बहुत सूजा जोड़, बुखार, सुन्नपन या कमज़ोरी, पेशाब या मल पर नियंत्रण खोना, रात में दर्द, बिना कारण वज़न घटना, या कुछ हफ़्तों से ज़्यादा दर्द हो तो डॉक्टर को दिखाएँ। रूमेटाइड आर्थराइटिस, गाउट या ऑस्टियोपोरोसिस हो तो डॉक्टर का इलाज जारी रखें।",
    },
  },
  {
    slug: "weight-loss",
    icon: "weight",
    categories: ["weight"],
    en: {
      name: "Weight loss",
      headTerm: "home remedies for weight loss",
      title: "Home remedies for weight loss: Indian diet, drinks and daily habits",
      metaTitle: "Home Remedies for Weight Loss: Indian Diet & Habits",
      metaDescription:
        "Realistic home remedies for weight loss — belly fat, Indian diet plans, drinks, walking and metabolism tips — built on Ayurvedic habits. Start small today.",
      intro:
        "There is no magic drink that melts fat overnight, but there are simple, sustainable habits that help many people lose weight and keep it off. This guide brings together our home remedies for weight loss — from Indian breakfast and dinner ideas and homemade drinks to walking plans, craving control and advice for special situations like after delivery, after 40 or with thyroid problems.\n\nAyurveda sees excess weight (sthaulya) mainly as increased kapha and weak digestion, often driven by heavy, sweet, oily food, eating without hunger, daytime sleep and too little movement. Its advice is refreshingly practical: eat your largest meal at lunch, keep dinner light and early, favour warm, freshly cooked food with plenty of vegetables and dals, use spices like ginger, cumin and black pepper, and move every day.\n\nAim for a slow, steady loss of about half to one kilo a week. Crash diets and detox teas often backfire. If you have diabetes, thyroid disease, PCOS, heart or kidney problems, are pregnant or breastfeeding, or take regular medicines, talk to your doctor before making big changes to diet, fasting or exercise, and continue prescribed treatment.",
    },
    hi: {
      name: "वज़न घटाना",
      headTerm: "वज़न घटाने के घरेलू उपाय",
      title: "वज़न घटाने के घरेलू उपाय: भारतीय आहार, ड्रिंक्स और रोज़ की आदतें",
      metaTitle: "वज़न घटाने के घरेलू उपाय: भारतीय डाइट और आदतें",
      metaDescription:
        "वज़न घटाने के व्यावहारिक घरेलू उपाय — पेट की चर्बी, भारतीय डाइट प्लान, ड्रिंक्स, पैदल चलना और मेटाबॉलिज़्म के सुझाव — आयुर्वेदिक आदतों पर आधारित।",
      intro:
        "ऐसा कोई जादुई ड्रिंक नहीं जो रातों-रात चर्बी पिघला दे, पर कुछ आसान, टिकाऊ आदतें हैं जो कई लोगों को वज़न घटाने और बनाए रखने में मदद करती हैं। इस गाइड में हमारे वज़न घटाने के घरेलू उपाय एक जगह हैं — भारतीय नाश्ते और रात के खाने के सुझाव, घर के बने ड्रिंक्स, पैदल चलने की योजना, क्रेविंग पर काबू, और डिलीवरी के बाद, 40 के बाद या थायरॉइड जैसी ख़ास स्थितियों की सलाह।\n\nआयुर्वेद ज़्यादा वज़न (स्थौल्य) को मुख्य रूप से बढ़े कफ और कमज़ोर पाचन के रूप में देखता है, जो अक्सर भारी, मीठे, तैलीय खाने, बिना भूख खाने, दिन में सोने और कम चलने-फिरने से होता है। इसकी सलाह बेहद व्यावहारिक है: सबसे बड़ा भोजन दोपहर में करें, रात का खाना हल्का और जल्दी रखें, ख़ूब सब्ज़ियों और दालों वाला गरम, ताज़ा पका खाना चुनें, अदरक, जीरा और काली मिर्च जैसे मसाले इस्तेमाल करें, और रोज़ शरीर को चलाएँ।\n\nहफ़्ते में लगभग आधा से एक किलो धीमा, स्थिर वज़न घटाने का लक्ष्य रखें। क्रैश डाइट और डिटॉक्स चाय अक्सर उल्टा असर करती हैं। डायबिटीज़, थायरॉइड, पीसीओएस, दिल या किडनी की समस्या हो, गर्भवती या स्तनपान करा रही हों, या नियमित दवा लेते हों, तो आहार, उपवास या व्यायाम में बड़े बदलाव से पहले डॉक्टर से बात करें और डॉक्टर का इलाज जारी रखें।",
    },
  },
  {
    slug: "womens-health",
    icon: "womens-health",
    categories: ["womens-health"],
    en: {
      name: "Women's health",
      headTerm: "home remedies for women's health",
      title: "Home remedies for women's health: periods, pregnancy, postpartum and more",
      metaTitle: "Home Remedies for Women's Health: Ayurvedic Care",
      metaDescription:
        "Gentle home remedies for women's health — irregular periods, PMS, white discharge, morning sickness, breast milk and postpartum recovery. Read with care.",
      intro:
        "From the first period to motherhood and menopause, a woman's body goes through many changes — and many of the questions women search for late at night are about exactly these moments. This guide brings together our home remedies for women's health in one place: irregular and heavy periods, PMS mood swings, white discharge, morning sickness, increasing breast milk, postpartum back pain and recovery, stretch marks, urine leakage and natural fertility support.\n\nAyurveda gives special attention to women's health through the stages of rajaswala (menstruation), garbhini (pregnancy) and sutika (postpartum) care. Its advice is often simple and nurturing: warm, nourishing food, rest at the right times, gentle oil massage, and herbs like shatavari and ginger used thoughtfully. Many of these traditions fit well with modern advice on iron, protein, pelvic floor exercise and emotional well-being.\n\nWomen's health symptoms can also signal conditions like PCOS, thyroid disorders, anaemia, infections or pregnancy complications. Please see a gynaecologist for very heavy or painful bleeding, bleeding after menopause or between periods, foul-smelling discharge, severe vomiting in pregnancy, fever after delivery, or low mood that doesn't lift. During pregnancy and breastfeeding, check with your doctor before any herb or supplement.",
    },
    hi: {
      name: "महिलाओं की सेहत",
      headTerm: "महिलाओं की सेहत के घरेलू उपाय",
      title: "महिलाओं की सेहत के घरेलू उपाय: पीरियड्स, गर्भावस्था, प्रसव के बाद और भी",
      metaTitle: "महिलाओं की सेहत के घरेलू उपाय: आयुर्वेदिक देखभाल",
      metaDescription:
        "महिलाओं की सेहत के सौम्य घरेलू उपाय — अनियमित पीरियड्स, पीएमएस, सफ़ेद पानी, मॉर्निंग सिकनेस, माँ का दूध और प्रसव के बाद की रिकवरी। ध्यान से पढ़ें।",
      intro:
        "पहली माहवारी से मातृत्व और मेनोपॉज़ तक, महिला का शरीर कई बदलावों से गुज़रता है — और देर रात खोजे जाने वाले कई सवाल इन्हीं पलों के बारे में होते हैं। इस गाइड में हमारे महिलाओं की सेहत के घरेलू उपाय एक जगह हैं: अनियमित और ज़्यादा पीरियड्स, पीएमएस में मूड बदलना, सफ़ेद पानी, मॉर्निंग सिकनेस, माँ का दूध बढ़ाना, डिलीवरी के बाद कमर दर्द और रिकवरी, स्ट्रेच मार्क्स, पेशाब लीक होना और प्राकृतिक प्रजनन सहायता।\n\nआयुर्वेद रजस्वला (माहवारी), गर्भिणी (गर्भावस्था) और सूतिका (प्रसव के बाद) चरणों में महिलाओं की सेहत पर विशेष ध्यान देता है। इसकी सलाह अक्सर सरल और पोषण देने वाली है: गरम, पौष्टिक भोजन, सही समय पर आराम, हल्की तेल मालिश, और शतावरी व अदरक जैसी जड़ी-बूटियों का सोच-समझकर इस्तेमाल। इनमें से कई परंपराएँ आयरन, प्रोटीन, पेल्विक फ़्लोर व्यायाम और भावनात्मक सेहत पर आधुनिक सलाह से अच्छी तरह मेल खाती हैं।\n\nमहिलाओं के लक्षण पीसीओएस, थायरॉइड, ख़ून की कमी, संक्रमण या गर्भावस्था की जटिलताओं का संकेत भी हो सकते हैं। बहुत ज़्यादा या दर्द भरी ब्लीडिंग, मेनोपॉज़ के बाद या पीरियड्स के बीच ब्लीडिंग, बदबूदार स्राव, गर्भावस्था में बहुत उल्टी, डिलीवरी के बाद बुखार, या न जाने वाली उदासी हो तो स्त्री रोग विशेषज्ञ को दिखाएँ। गर्भावस्था और स्तनपान में कोई भी जड़ी-बूटी या सप्लीमेंट लेने से पहले डॉक्टर से पूछें।",
    },
  },
  {
    slug: "immunity",
    icon: "immunity",
    categories: ["immunity", "herbs"],
    en: {
      name: "Immunity & kitchen herbs",
      headTerm: "how to boost immunity naturally",
      title: "How to boost immunity naturally: kitchen herbs, foods and daily habits",
      metaTitle: "How to Boost Immunity Naturally: Ayurvedic Guide",
      metaDescription:
        "How to boost immunity naturally with Ayurveda — benefits of chyawanprash, ginger, honey, clove, black pepper, saffron and more, plus daily habits.",
      intro:
        "Every season change seems to bring a new round of coughs, fevers and tummy bugs. While no food or herb can make you immune to infections, the way you eat, sleep and live does shape how well your body copes. This guide explains how to boost immunity naturally with the help of familiar Indian kitchen herbs and foods — chyawanprash, ginger, honey, black pepper, clove, curry leaves, sesame, saffron, sabja, bael, harad and coconut water — along with recovery diets after illnesses like dengue.\n\nAyurveda describes immunity as vyadhikshamatva — the body's capacity to resist and recover from disease — and links it with strong digestion (agni), healthy tissues (ojas), good sleep and a calm mind. Rasayana foods and herbs are traditionally used to nourish and rejuvenate, but always alongside a balanced diet, daily movement, sunlight, hygiene and vaccinations.\n\nEach article covers the traditional uses and what modern research suggests, practical ways to add the ingredient to your day, safe amounts, and who should be careful — for example, people on blood thinners or diabetes medicines, pregnant women and young children. Herbs work best as part of a routine, not as a quick fix.",
    },
    hi: {
      name: "रोग प्रतिरोधक क्षमता और रसोई की जड़ी-बूटियाँ",
      headTerm: "रोग प्रतिरोधक क्षमता बढ़ाने के घरेलू उपाय",
      title: "रोग प्रतिरोधक क्षमता बढ़ाने के घरेलू उपाय: रसोई की जड़ी-बूटियाँ, भोजन और रोज़ की आदतें",
      metaTitle: "रोग प्रतिरोधक क्षमता बढ़ाने के घरेलू उपाय",
      metaDescription:
        "आयुर्वेद से रोग प्रतिरोधक क्षमता बढ़ाने के घरेलू उपाय — च्यवनप्राश, अदरक, शहद, लौंग, काली मिर्च, केसर और भी के फ़ायदे, साथ में रोज़ की आदतें।",
      intro:
        "हर मौसम बदलने पर खांसी, बुखार और पेट की गड़बड़ी का नया दौर आता लगता है। कोई भी भोजन या जड़ी-बूटी आपको संक्रमण से पूरी तरह नहीं बचा सकती, पर आपका खाना, नींद और जीवनशैली तय करते हैं कि शरीर उनसे कितनी अच्छी तरह निपटता है। यह गाइड जानी-पहचानी भारतीय रसोई की जड़ी-बूटियों और खाने — च्यवनप्राश, अदरक, शहद, काली मिर्च, लौंग, करी पत्ता, तिल, केसर, सब्जा, बेल, हरड़ और नारियल पानी — की मदद से रोग प्रतिरोधक क्षमता बढ़ाने के घरेलू उपाय समझाती है, साथ ही डेंगू जैसी बीमारियों के बाद का रिकवरी आहार भी।\n\nआयुर्वेद प्रतिरोधक क्षमता को व्याधिक्षमत्व कहता है — बीमारी से लड़ने और उबरने की शरीर की क्षमता — और इसे मज़बूत पाचन (अग्नि), स्वस्थ धातुओं (ओजस), अच्छी नींद और शांत मन से जोड़ता है। रसायन खाने और जड़ी-बूटियाँ परंपरा से पोषण और कायाकल्प के लिए इस्तेमाल होती हैं, पर हमेशा संतुलित आहार, रोज़ की गतिविधि, धूप, साफ़-सफ़ाई और टीकाकरण के साथ।\n\nहर लेख में पारंपरिक उपयोग और आधुनिक शोध के संकेत, दिनचर्या में शामिल करने के व्यावहारिक तरीके, सुरक्षित मात्रा, और किन्हें सावधान रहना चाहिए — जैसे ख़ून पतला करने या डायबिटीज़ की दवा लेने वाले, गर्भवती महिलाएँ और छोटे बच्चे — बताए गए हैं। जड़ी-बूटियाँ दिनचर्या का हिस्सा बनकर सबसे अच्छा काम करती हैं, झटपट इलाज के रूप में नहीं।",
    },
  },
  {
    slug: "oral-care",
    icon: "oral-care",
    categories: ["oral-care"],
    en: {
      name: "Teeth, gums & mouth care",
      headTerm: "home remedies for teeth and gums",
      title: "Home remedies for teeth, gums and common mouth problems",
      metaTitle: "Home Remedies for Teeth & Gums: Ayurvedic Oral Care",
      metaDescription:
        "Gentle home remedies for tooth sensitivity, swollen gums, yellow teeth, dry mouth and mouth sores, using clove, salt, neem and oil pulling. Know when to see a dentist.",
      intro:
        "Many everyday mouth problems start small: a twinge when you sip cold water, gums that look puffy, a coated tongue or a sore corner of the lip. This hub collects our home remedies for teeth and gums so you can find a simple routine for each of them in one place.\n\nAyurveda gives the mouth its own daily care, called dinacharya: cleaning the teeth with astringent herbs such as neem or babool, scraping the tongue, gargling with warm salt water or sesame oil (gandusha) and oil pulling (kavala). Kitchen ingredients like clove, turmeric, rock salt, fennel and guava leaves are traditionally used to freshen the breath and soothe tender gums. These habits work best as steady care, alongside brushing twice a day with a soft brush and flossing.\n\nHome care has clear limits. A tooth that throbs at night, swelling in the face or jaw, pus, gums that bleed every day, a mouth sore that lasts beyond two weeks or a broken tooth needs a dentist, not a kitchen remedy. Use the ideas below to support your regular dental check-ups, never to replace them.",
    },
    hi: {
      name: "दाँत, मसूड़े और मुँह की देखभाल",
      headTerm: "दाँतों और मसूड़ों के घरेलू उपाय",
      title: "दाँत, मसूड़े और मुँह की आम समस्याओं के घरेलू उपाय",
      metaTitle: "दाँतों और मसूड़ों के घरेलू उपाय: आयुर्वेदिक ओरल केयर",
      metaDescription:
        "दाँतों में झनझनाहट, सूजे मसूड़े, पीले दाँत, मुँह सूखना और छालों के लिए लौंग, नमक, नीम और ऑयल पुलिंग से जुड़े आसान घरेलू उपाय। डेंटिस्ट कब दिखाएँ, यह भी जानें।",
      intro:
        "मुँह की ज़्यादातर परेशानियाँ छोटी शुरुआत से आती हैं: ठंडा पानी पीते ही दाँत में झनझनाहट, फूले हुए मसूड़े, जीभ पर सफ़ेद परत या होंठ के कोने में दरार। इस पेज पर हमने दाँतों और मसूड़ों के घरेलू उपाय एक जगह जमा किए हैं, ताकि हर समस्या के लिए आसान दिनचर्या ढूँढना सरल हो।\n\nआयुर्वेद की दिनचर्या में मुँह की देखभाल का अलग स्थान है: नीम या बबूल की दातुन, जीभ साफ़ करना, गुनगुने नमक-पानी या तिल के तेल से कुल्ला (गंडूष) और ऑयल पुलिंग (कवल)। लौंग, हल्दी, सेंधा नमक, सौंफ़ और अमरूद के पत्ते जैसी रसोई की चीज़ें पारंपरिक रूप से साँस ताज़ा रखने और नाज़ुक मसूड़ों को आराम देने में इस्तेमाल होती रही हैं। ये आदतें तभी अच्छा साथ देती हैं जब आप दिन में दो बार मुलायम ब्रश से ब्रश और फ़्लॉस भी करते रहें।\n\nघरेलू देखभाल की अपनी सीमा है। रात में टीस मारता दाँत, चेहरे या जबड़े में सूजन, मवाद, रोज़ ख़ून आते मसूड़े, दो हफ़्ते से ज़्यादा रहने वाला छाला या टूटा दाँत — इन सब में डेंटिस्ट ही सही जगह है, रसोई का नुस्खा नहीं। नीचे के उपायों को नियमित दंत जाँच के साथ सहारे की तरह अपनाएँ, उसकी जगह नहीं।",
    },
  },
  {
    slug: "sleep-and-stress",
    icon: "sleep-stress",
    categories: ["sleep-stress"],
    en: {
      name: "Sleep & stress",
      headTerm: "home remedies for better sleep",
      title: "Home remedies for better sleep, stress and a calmer mind",
      metaTitle: "Home Remedies for Sleep & Stress: Ayurvedic Calm Guide",
      metaDescription:
        "Simple home remedies for insomnia, snoring, stress, night waking and afternoon sleepiness, with warm drinks, foot massage and wind-down habits from Ayurveda.",
      intro:
        "Poor sleep and constant stress feed each other: a restless night makes the next day harder, and a tense day makes it harder to switch off at night. This hub brings together our home remedies for better sleep and a calmer mind, from bedtime drinks to small evening habits.\n\nAyurveda links light, broken sleep and a racing mind mainly with aggravated vata, the principle of movement and dryness. The traditional answer is warmth, rhythm and oil: a warm milk drink with nutmeg or ashwagandha, foot massage with sesame oil or ghee, an early and light dinner, dim lights and the same bedtime every night. Breathing practices such as slow humming breath (bhramari) and alternate nostril breathing are also commonly used to settle the mind before bed.\n\nThese remedies are gentle support, not treatment. If you have trouble sleeping most nights for weeks, loud snoring with gasping or choking, low mood that does not lift, panic attacks, or thoughts of self-harm, please speak to a doctor or a mental health professional. Reaching out early is a sign of good self-care, not weakness.",
    },
    hi: {
      name: "नींद और तनाव",
      headTerm: "अच्छी नींद के घरेलू उपाय",
      title: "अच्छी नींद, तनाव और शांत मन के घरेलू उपाय",
      metaTitle: "नींद और तनाव के घरेलू उपाय: आयुर्वेदिक गाइड",
      metaDescription:
        "अनिद्रा, खर्राटे, तनाव, रात में नींद टूटना और दोपहर की सुस्ती के लिए गुनगुने पेय, पैरों की मालिश और सोने से पहले की आयुर्वेदिक आदतें।",
      intro:
        "ख़राब नींद और लगातार तनाव एक-दूसरे को बढ़ाते हैं: बेचैन रात के बाद दिन भारी लगता है और तनाव भरे दिन के बाद रात में दिमाग़ शांत नहीं होता। इस पेज पर अच्छी नींद और शांत मन के हमारे घरेलू उपाय एक जगह हैं — सोने से पहले के पेय से लेकर शाम की छोटी-छोटी आदतों तक।\n\nआयुर्वेद कच्ची, टूटी नींद और भागते विचारों को मुख्य रूप से बढ़े हुए वात से जोड़ता है, जो गति और रूखेपन का गुण है। इसका पारंपरिक जवाब है गर्माहट, नियमितता और तेल: जायफल या अश्वगंधा वाला गुनगुना दूध, तिल के तेल या घी से पैरों के तलवों की मालिश, जल्दी और हल्का रात का खाना, धीमी रोशनी और रोज़ एक ही समय पर सोना। भ्रामरी जैसे धीमे प्राणायाम और अनुलोम-विलोम भी सोने से पहले मन को ठहराने के लिए अपनाए जाते हैं।\n\nये उपाय हल्का सहारा हैं, इलाज नहीं। अगर हफ़्तों तक ज़्यादातर रातों में नींद न आए, खर्राटों के साथ साँस रुकती या घुटती लगे, उदासी न जाए, घबराहट के दौरे पड़ें या ख़ुद को नुकसान पहुँचाने के विचार आएँ, तो डॉक्टर या मानसिक स्वास्थ्य विशेषज्ञ से ज़रूर बात करें। समय पर मदद लेना कमज़ोरी नहीं, अपनी अच्छी देखभाल है।",
    },
  },
  {
    slug: "eye-care",
    icon: "eye-care",
    categories: ["eye-care"],
    en: {
      name: "Eye care",
      headTerm: "home remedies for eyes",
      title: "Home remedies for tired, dry and irritated eyes",
      metaTitle: "Home Remedies for Eyes: Ayurvedic Eye Care Tips",
      metaDescription:
        "Gentle home remedies for dry, itchy, burning and watery eyes, eye twitching and screen strain, with cool compresses, rest habits and eye-friendly foods.",
      intro:
        "Long hours on screens, dust, heat, air-conditioning and short sleep leave many of us with eyes that feel dry, gritty, itchy or tired by evening. This hub gathers our home remedies for eyes: soothing compresses, simple rest routines and eye-friendly food habits.\n\nIn Ayurveda the eyes are closely tied to pitta, the principle of heat and light, and to alochaka pitta in particular. Traditional eye care therefore leans on cooling and calming measures: splashing the closed eyes with cool clean water, resting cucumber slices or cold cotton pads on the lids, palming with warm hands, gentle blinking and focusing exercises, foot massage with ghee at night, and a diet with amla, carrots, leafy greens and a spoon of ghee. Nothing should ever be put directly inside the eye unless a doctor has prescribed it.\n\nThe eyes are delicate, so home care is only for mild, short-lived discomfort. Sudden loss or blurring of vision, eye pain, strong redness, light sensitivity, thick discharge, an injury or a chemical splash needs an eye doctor straight away. Please also keep up regular eye check-ups, especially for children and anyone with diabetes.",
    },
    hi: {
      name: "आँखों की देखभाल",
      headTerm: "आँखों के घरेलू उपाय",
      title: "थकी, सूखी और जलन वाली आँखों के घरेलू उपाय",
      metaTitle: "आँखों के घरेलू उपाय: आयुर्वेदिक नेत्र देखभाल",
      metaDescription:
        "सूखी, खुजली वाली, जलन और पानी वाली आँखों, आँख फड़कने और स्क्रीन की थकान के लिए ठंडी सिकाई, आराम की आदतें और आँखों के लिए अच्छा आहार।",
      intro:
        "घंटों स्क्रीन, धूल, गर्मी, एसी और कम नींद — शाम होते-होते बहुत से लोगों की आँखें सूखी, किरकिरी, खुजलीदार या थकी हुई लगने लगती हैं। इस पेज पर आँखों के हमारे घरेलू उपाय एक जगह हैं: ठंडक देने वाली सिकाई, आराम की आसान दिनचर्या और आँखों के लिए अच्छा खान-पान।\n\nआयुर्वेद में आँखों का गहरा संबंध पित्त (गर्मी और रोशनी का गुण), ख़ासकर आलोचक पित्त से माना जाता है। इसलिए पारंपरिक नेत्र देखभाल ठंडक और सुकून देने वाले उपायों पर टिकी है: बंद आँखों पर साफ़ ठंडे पानी के छींटे, पलकों पर खीरे के टुकड़े या ठंडे रुई के फाहे, गर्म हथेलियों से पामिंग, धीरे-धीरे पलकें झपकाना और नज़र का व्यायाम, रात को घी से तलवों की मालिश, और आहार में आँवला, गाजर, हरी सब्ज़ियाँ व एक चम्मच घी। डॉक्टर की सलाह के बिना आँख के अंदर कुछ भी न डालें।\n\nआँखें नाज़ुक होती हैं, इसलिए घरेलू देखभाल सिर्फ़ हल्की और थोड़े समय की परेशानी के लिए है। अचानक धुंधला दिखना या नज़र जाना, आँख में दर्द, तेज़ लालिमा, रोशनी से चुभन, गाढ़ा कीचड़, चोट या कोई केमिकल पड़ जाए तो तुरंत नेत्र चिकित्सक को दिखाएँ। बच्चों और डायबिटीज़ वाले लोगों की नियमित आँखों की जाँच भी ज़रूरी है।",
    },
  },
  {
    slug: "kids-health",
    icon: "kids-health",
    categories: ["kids-health"],
    en: {
      name: "Kids' health",
      headTerm: "home remedies for kids",
      title: "Gentle home remedies for common problems in kids and babies",
      metaTitle: "Home Remedies for Kids: Gentle Care for Common Issues",
      metaDescription:
        "Gentle home care for kids' cough, constipation, teething, diaper rash, colic, poor appetite and more, with clear age cautions and signs to call the doctor.",
      intro:
        "Children catch colds, get tummy upsets and go through teething, rashes and picky phases far more often than adults. This hub collects our gentle home remedies for kids and babies, written with one rule in mind: a child's safety comes before any remedy.\n\nTraditional Indian home care for children is mild by design. Think of ajwain potli warmth for a gassy tummy, a little warm water or soaked raisins for hard stools, coconut oil for dry or rashy skin, steam from a warm shower for a blocked nose and soft home-cooked khichdi when a child is recovering. Ayurveda sees childhood as a kapha-dominant stage of life, so warm, light and freshly cooked food, regular sleep and outdoor play are the base of good health. Doses for children are always smaller than for adults, and many ingredients adults use freely are not suitable for babies.\n\nPlease read the age notes in each remedy. Babies under six months should get only breast milk or formula unless your paediatrician advises otherwise, and honey must never be given to a child under one year. Call your doctor promptly for fever in a baby under three months, fast or difficult breathing, signs of dehydration, unusual drowsiness, a rash that does not fade when pressed, or anything that worries you.",
    },
    hi: {
      name: "बच्चों की सेहत",
      headTerm: "बच्चों के लिए घरेलू उपाय",
      title: "बच्चों और शिशुओं की आम परेशानियों के सौम्य घरेलू उपाय",
      metaTitle: "बच्चों के लिए घरेलू उपाय: आम परेशानियों की सौम्य देखभाल",
      metaDescription:
        "बच्चों की खाँसी, कब्ज़, दाँत निकलना, डायपर रैश, पेट दर्द, भूख न लगना आदि के लिए सौम्य घरेलू देखभाल, उम्र से जुड़ी सावधानियों और डॉक्टर को कब दिखाएँ के साथ।",
      intro:
        "बच्चों को सर्दी-ज़ुकाम, पेट ख़राब, दाँत निकलने की तकलीफ़, रैश और खाने में नख़रे बड़ों से कहीं ज़्यादा होते हैं। इस पेज पर बच्चों और शिशुओं के लिए हमारे सौम्य घरेलू उपाय एक जगह हैं, और इन्हें लिखते समय एक ही नियम रखा गया है: बच्चे की सुरक्षा किसी भी नुस्खे से पहले है।\n\nबच्चों की पारंपरिक घरेलू देखभाल स्वभाव से ही हल्की होती है — गैस वाले पेट पर अजवाइन की पोटली की गर्माहट, सख़्त मल के लिए थोड़ा गुनगुना पानी या भीगी किशमिश, रूखी या रैश वाली त्वचा पर नारियल तेल, बंद नाक के लिए गर्म शावर की भाप, और ठीक होते बच्चे के लिए घर की नरम खिचड़ी। आयुर्वेद बचपन को कफ प्रधान उम्र मानता है, इसलिए गर्म, हल्का और ताज़ा बना खाना, नियमित नींद और बाहर खेलना अच्छी सेहत की नींव है। बच्चों की मात्रा हमेशा बड़ों से कम होती है, और बड़ों के लिए आम कई चीज़ें शिशुओं के लिए ठीक नहीं होतीं।\n\nहर नुस्खे में दी गई उम्र की सावधानी ज़रूर पढ़ें। छह महीने से छोटे शिशु को डॉक्टर की सलाह के बिना माँ के दूध या फ़ॉर्मूला के अलावा कुछ न दें, और एक साल से छोटे बच्चे को शहद कभी न दें। तीन महीने से छोटे शिशु को बुखार, तेज़ या मुश्किल से साँस, पानी की कमी के लक्षण, असामान्य सुस्ती, दबाने पर भी न मिटने वाले दाने, या कोई भी बात जो आपको चिंता में डाले — तुरंत डॉक्टर से संपर्क करें।",
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
