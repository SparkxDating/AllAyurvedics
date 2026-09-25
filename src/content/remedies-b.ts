import type { Remedy } from "./types";

export const remediesB: Remedy[] = [
  {
    slug: "golden-turmeric-milk",
    category: "immunity",
    time: 10,
    featured: true,
    en: {
      title: "Golden turmeric milk (haldi doodh)",
      summary:
        "Warm milk simmered with turmeric, a pinch of black pepper and a little ghee is India's best-known bedtime comfort drink, traditionally taken when the seasons change.",
      ingredients: [
        "1 cup milk (or a plant milk such as almond or oat)",
        "¼ teaspoon turmeric powder",
        "A small pinch of black pepper",
        "A small piece of cinnamon or a crushed cardamom pod (optional)",
        "½ teaspoon ghee (optional); jaggery or honey to taste",
      ],
      preparation: [
        "Add turmeric, pepper and spices to the milk in a pan.",
        "Simmer gently for 3–4 minutes, stirring so it does not stick.",
        "Take off the heat, stir in the ghee. If using honey, add it only once the milk is warm, not hot.",
      ],
      usage: [
        "Sip one cup in the evening, about an hour before bed.",
      ],
      precautions: [
        "Check with your doctor if you take blood thinners, diabetes medicine, or have gallstones — turmeric in medicinal amounts may interact.",
        "Never cook or boil honey; Ayurveda considers heated honey harmful. Do not give honey to babies under 1 year.",
        "People with diabetes should skip the sweetener.",
      ],
    },
    hi: {
      title: "हल्दी वाला दूध",
      summary:
        "हल्दी, चुटकी भर काली मिर्च और थोड़े घी के साथ पकाया गरम दूध भारत का सबसे जाना-माना रात का पेय है, जिसे ख़ासकर मौसम बदलने पर पिया जाता है।",
      ingredients: [
        "1 कप दूध (या बादाम/ओट जैसा पौधों से बना दूध)",
        "¼ छोटा चम्मच हल्दी पाउडर",
        "एक छोटी चुटकी काली मिर्च",
        "दालचीनी का छोटा टुकड़ा या एक कुटी इलायची (वैकल्पिक)",
        "½ छोटा चम्मच घी (वैकल्पिक); स्वादानुसार गुड़ या शहद",
      ],
      preparation: [
        "बर्तन में दूध लें और हल्दी, काली मिर्च व मसाले डालें।",
        "चलाते हुए धीमी आँच पर 3–4 मिनट पकाएँ ताकि तले में न लगे।",
        "आँच से उतारकर घी मिलाएँ। शहद डालना हो तो दूध के गुनगुना होने पर ही डालें, गरम में नहीं।",
      ],
      usage: [
        "शाम को, सोने से लगभग एक घंटा पहले एक कप धीरे-धीरे पिएँ।",
      ],
      precautions: [
        "खून पतला करने की दवा, डायबिटीज़ की दवा या पित्त की पथरी हो तो डॉक्टर से पूछें — दवा जितनी मात्रा में हल्दी असर डाल सकती है।",
        "शहद को कभी पकाएँ या उबालें नहीं; आयुर्वेद में गरम शहद को हानिकारक माना गया है। 1 साल से छोटे बच्चे को शहद न दें।",
        "डायबिटीज़ हो तो मीठा न मिलाएँ।",
      ],
    },
  },
  {
    slug: "amla-honey-morning",
    category: "immunity",
    time: 5,
    en: {
      title: "Fresh amla with honey in the morning",
      summary:
        "Indian gooseberry (amla) is one of Ayurveda's most respected rasayanas (rejuvenating foods) and a rich natural source of vitamin C. Eating it fresh in season is the simplest way to enjoy it.",
      ingredients: [
        "1 fresh amla (Indian gooseberry)",
        "½ teaspoon honey, or a pinch of rock salt",
      ],
      preparation: [
        "Wash the amla, cut it into segments and remove the seed.",
        "Drizzle with honey or sprinkle a little rock salt.",
      ],
      usage: [
        "Eat in the morning, a little while after breakfast, during the winter amla season.",
        "Out of season, a spoon of good-quality amla murabba or dried amla pieces can be used instead.",
      ],
      precautions: [
        "Amla is sour; people with sensitive teeth or very acidic stomachs may prefer it with food.",
        "Murabba is high in sugar — people with diabetes should avoid it and eat fresh amla without honey.",
        "Check with your doctor if you take blood thinners, as large amounts of amla may add to their effect.",
      ],
    },
    hi: {
      title: "सुबह शहद के साथ ताज़ा आँवला",
      summary:
        "आँवला आयुर्वेद के सबसे सम्मानित रसायनों में से एक है और विटामिन C का भरपूर प्राकृतिक स्रोत है। मौसम में ताज़ा आँवला खाना इसका सबसे आसान तरीका है।",
      ingredients: [
        "1 ताज़ा आँवला",
        "½ छोटा चम्मच शहद, या एक चुटकी सेंधा नमक",
      ],
      preparation: [
        "आँवला धोकर फाँकें काट लें और गुठली निकाल दें।",
        "ऊपर से शहद डालें या थोड़ा सेंधा नमक छिड़कें।",
      ],
      usage: [
        "सर्दियों में आँवले के मौसम में, नाश्ते के थोड़ी देर बाद खाएँ।",
        "बेमौसम में अच्छी गुणवत्ता का एक चम्मच आँवला मुरब्बा या सूखे आँवले के टुकड़े ले सकते हैं।",
      ],
      precautions: [
        "आँवला खट्टा होता है; दाँत संवेदनशील हों या पेट में ज़्यादा एसिडिटी रहती हो तो इसे भोजन के साथ लें।",
        "मुरब्बे में चीनी बहुत होती है — डायबिटीज़ में मुरब्बा न लें और ताज़ा आँवला बिना शहद के खाएँ।",
        "खून पतला करने की दवा लेते हों तो डॉक्टर से पूछें, क्योंकि ज़्यादा आँवला उसका असर बढ़ा सकता है।",
      ],
    },
  },
  {
    slug: "soaked-almonds-raisins",
    category: "immunity",
    time: 2,
    en: {
      title: "Soaked almonds and raisins for morning energy",
      summary:
        "Soaking makes almonds and raisins easier to digest. A small handful in the morning is a traditional, nourishing start to the day, especially for students and the elderly.",
      ingredients: [
        "5–6 almonds",
        "8–10 black or golden raisins",
        "Water for soaking",
      ],
      preparation: [
        "Soak the almonds and raisins separately in water overnight.",
        "In the morning, peel the almonds (the skin slips off easily).",
      ],
      usage: [
        "Eat them slowly on an empty stomach or with breakfast. The raisin soaking water can be sipped too.",
      ],
      precautions: [
        "Avoid if you have a nut allergy.",
        "People with diabetes should limit raisins and discuss dried fruit with their doctor or dietitian.",
        "Do not give whole nuts to small children because of the choking risk.",
      ],
    },
    hi: {
      title: "सुबह की ऊर्जा के लिए भीगे बादाम और किशमिश",
      summary:
        "भिगोने से बादाम और किशमिश आसानी से पचते हैं। सुबह इनकी छोटी-सी मुट्ठी दिन की पौष्टिक और पारंपरिक शुरुआत है, ख़ासकर विद्यार्थियों और बुज़ुर्गों के लिए।",
      ingredients: [
        "5–6 बादाम",
        "8–10 काली या सुनहरी किशमिश",
        "भिगोने के लिए पानी",
      ],
      preparation: [
        "बादाम और किशमिश को अलग-अलग पानी में रात भर भिगो दें।",
        "सुबह बादाम का छिलका उतार लें (यह आसानी से उतर जाता है)।",
      ],
      usage: [
        "ख़ाली पेट या नाश्ते के साथ धीरे-धीरे चबाकर खाएँ। किशमिश का पानी भी पी सकते हैं।",
      ],
      precautions: [
        "मेवों से एलर्जी हो तो न खाएँ।",
        "डायबिटीज़ में किशमिश कम लें और सूखे मेवों के बारे में डॉक्टर या डाइटीशियन से बात करें।",
        "छोटे बच्चों को गले में अटकने के ख़तरे के कारण साबुत मेवे न दें।",
      ],
    },
  },
  {
    slug: "tulsi-ginger-kadha",
    category: "cold-cough",
    time: 15,
    featured: true,
    en: {
      title: "Tulsi–ginger kadha for seasonal colds",
      summary:
        "A warming herbal decoction made in countless Indian homes at the first sign of a sniffle. Tulsi, ginger, black pepper and cinnamon make it aromatic and comforting.",
      ingredients: [
        "8–10 fresh tulsi (holy basil) leaves",
        "A 1-inch piece of ginger, crushed",
        "3–4 black peppercorns, crushed",
        "A small piece of cinnamon and 2 cloves",
        "2 cups water; jaggery to taste (optional)",
      ],
      preparation: [
        "Put everything except the jaggery into the water.",
        "Boil, then simmer until the liquid reduces to about 1 cup (10–12 minutes).",
        "Strain, add a little jaggery if you like, and drink warm.",
      ],
      usage: [
        "Sip half a cup, warm, once or twice a day for a few days during a cold.",
      ],
      precautions: [
        "Kadha is heating — reduce the pepper and ginger if you get acidity.",
        "Pregnant women and people on blood thinners or diabetes medicine should check with their doctor first.",
        "See a doctor for high fever, breathing difficulty, chest pain, or symptoms lasting more than 3–4 days.",
      ],
    },
    hi: {
      title: "मौसमी सर्दी-ज़ुकाम में तुलसी–अदरक का काढ़ा",
      summary:
        "नाक बहनी शुरू होते ही अनगिनत भारतीय घरों में बनने वाला गरम काढ़ा। तुलसी, अदरक, काली मिर्च और दालचीनी इसे ख़ुशबूदार और राहत भरा बनाते हैं।",
      ingredients: [
        "8–10 ताज़ी तुलसी की पत्तियाँ",
        "1 इंच अदरक, कुटा हुआ",
        "3–4 काली मिर्च, कुटी हुई",
        "दालचीनी का छोटा टुकड़ा और 2 लौंग",
        "2 कप पानी; स्वादानुसार गुड़ (वैकल्पिक)",
      ],
      preparation: [
        "गुड़ को छोड़कर सब कुछ पानी में डाल दें।",
        "उबाल आने के बाद धीमी आँच पर तब तक पकाएँ जब तक पानी लगभग 1 कप न रह जाए (10–12 मिनट)।",
        "छान लें, चाहें तो थोड़ा गुड़ मिलाएँ और गुनगुना पिएँ।",
      ],
      usage: [
        "सर्दी-ज़ुकाम में कुछ दिन तक दिन में एक या दो बार आधा कप गुनगुना पिएँ।",
      ],
      precautions: [
        "काढ़े की तासीर गर्म है — एसिडिटी हो तो काली मिर्च और अदरक कम कर दें।",
        "गर्भवती महिलाएँ, और खून पतला करने या डायबिटीज़ की दवा लेने वाले पहले डॉक्टर से पूछें।",
        "तेज़ बुखार, साँस लेने में तकलीफ़, सीने में दर्द या 3–4 दिन से ज़्यादा लक्षण रहें तो डॉक्टर को दिखाएँ।",
      ],
    },
  },
  {
    slug: "ginger-honey-cough-spoon",
    category: "cold-cough",
    time: 5,
    en: {
      title: "Ginger juice and honey for a tickly cough",
      summary:
        "A spoonful of fresh ginger juice mixed with honey is a time-honoured way to soothe an irritated throat and a dry, tickly cough.",
      ingredients: [
        "1 teaspoon fresh ginger juice (grate ginger and squeeze through a cloth)",
        "1 teaspoon honey",
        "A tiny pinch of black pepper or turmeric (optional)",
      ],
      preparation: [
        "Grate fresh ginger and squeeze out the juice.",
        "Mix the juice with honey (and pepper or turmeric, if using) at room temperature.",
      ],
      usage: [
        "Lick slowly from the spoon 2–3 times a day, not immediately followed by water.",
      ],
      precautions: [
        "Never give honey to babies under 1 year old.",
        "People with diabetes should check with their doctor before taking honey regularly.",
        "A cough lasting more than 2 weeks, cough with blood, high fever, wheezing or breathlessness needs medical attention.",
      ],
    },
    hi: {
      title: "खराश वाली खाँसी में अदरक का रस और शहद",
      summary:
        "एक चम्मच ताज़े अदरक के रस में शहद मिलाकर लेना गले की ख़राश और सूखी खाँसी में राहत का पुराना और आज़माया हुआ तरीका है।",
      ingredients: [
        "1 छोटा चम्मच ताज़ा अदरक का रस (अदरक कद्दूकस करके कपड़े से निचोड़ें)",
        "1 छोटा चम्मच शहद",
        "एक बहुत छोटी चुटकी काली मिर्च या हल्दी (वैकल्पिक)",
      ],
      preparation: [
        "ताज़ा अदरक कद्दूकस करके रस निचोड़ लें।",
        "कमरे के तापमान पर रस में शहद (और चाहें तो काली मिर्च या हल्दी) मिलाएँ।",
      ],
      usage: [
        "दिन में 2–3 बार चम्मच से धीरे-धीरे चाटें, तुरंत बाद पानी न पिएँ।",
      ],
      precautions: [
        "1 साल से छोटे बच्चों को शहद कभी न दें।",
        "डायबिटीज़ हो तो नियमित रूप से शहद लेने से पहले डॉक्टर से पूछें।",
        "2 हफ़्ते से ज़्यादा खाँसी, खाँसी में ख़ून, तेज़ बुखार, घरघराहट या साँस फूलने पर डॉक्टर को ज़रूर दिखाएँ।",
      ],
    },
  },
  {
    slug: "ajwain-steam-inhalation",
    category: "cold-cough",
    time: 10,
    en: {
      title: "Ajwain steam for a blocked nose",
      summary:
        "Breathing in warm steam infused with carom seeds is a simple way to ease a stuffy nose and a heavy head during a cold.",
      ingredients: [
        "1 teaspoon ajwain (carom seeds)",
        "A large bowl of hot (not boiling) water",
        "A towel",
      ],
      preparation: [
        "Boil water, let it cool for a minute or two, and pour it into a wide, stable bowl on a table.",
        "Add the ajwain to the water.",
      ],
      usage: [
        "Sit with your face about 30 cm above the bowl, drape a towel over your head, close your eyes and breathe gently for 5–7 minutes.",
        "Once or twice a day while you are congested.",
      ],
      precautions: [
        "Steam can scald. Keep a safe distance and never do this with boiling water on the stove.",
        "Not suitable for young children — the risk of burns is high.",
        "People with asthma should check with their doctor, as steam can sometimes trigger symptoms.",
      ],
    },
    hi: {
      title: "बंद नाक में अजवाइन की भाप",
      summary:
        "सर्दी-ज़ुकाम में बंद नाक और भारी सिर से राहत के लिए अजवाइन डली गरम भाप लेना एक आसान उपाय है।",
      ingredients: [
        "1 छोटा चम्मच अजवाइन",
        "एक बड़े कटोरे में गरम (खौलता नहीं) पानी",
        "एक तौलिया",
      ],
      preparation: [
        "पानी उबालें, एक-दो मिनट ठंडा होने दें और मेज़ पर रखे चौड़े, स्थिर कटोरे में डालें।",
        "पानी में अजवाइन डाल दें।",
      ],
      usage: [
        "चेहरा कटोरे से लगभग 30 सेमी ऊपर रखें, सिर पर तौलिया डालें, आँखें बंद करें और 5–7 मिनट धीरे-धीरे साँस लें।",
        "नाक बंद रहने तक दिन में एक या दो बार करें।",
      ],
      precautions: [
        "भाप से जल सकते हैं। सुरक्षित दूरी रखें और चूल्हे पर खौलते पानी से कभी भाप न लें।",
        "छोटे बच्चों के लिए ठीक नहीं — जलने का ख़तरा ज़्यादा है।",
        "अस्थमा हो तो डॉक्टर से पूछें, क्योंकि भाप से कभी-कभी तकलीफ़ बढ़ सकती है।",
      ],
    },
  },
  {
    slug: "turmeric-salt-gargle",
    category: "cold-cough",
    time: 3,
    en: {
      title: "Warm salt and turmeric gargle for a sore throat",
      summary:
        "Gargling with warm salt water, with a pinch of turmeric, is one of the simplest and most widely recommended home measures for a scratchy throat.",
      ingredients: [
        "1 glass warm water",
        "½ teaspoon salt",
        "A pinch of turmeric powder",
      ],
      preparation: [
        "Dissolve the salt and turmeric in the warm water.",
      ],
      usage: [
        "Gargle a mouthful for 20–30 seconds and spit it out. Repeat until the glass is finished.",
        "Do this 2–3 times a day, especially in the morning and before bed.",
      ],
      precautions: [
        "Do not swallow the gargle water.",
        "Not for young children who cannot gargle safely.",
        "See a doctor if the sore throat is severe, lasts more than a week, or comes with high fever, difficulty swallowing, or white patches.",
      ],
    },
    hi: {
      title: "गले की ख़राश में गुनगुने पानी, नमक और हल्दी से गरारे",
      summary:
        "गुनगुने नमक-पानी में चुटकी भर हल्दी मिलाकर गरारे करना गले की ख़राश के लिए सबसे आसान और सबसे ज़्यादा सुझाए जाने वाले घरेलू उपायों में से एक है।",
      ingredients: [
        "1 गिलास गुनगुना पानी",
        "½ छोटा चम्मच नमक",
        "एक चुटकी हल्दी",
      ],
      preparation: [
        "गुनगुने पानी में नमक और हल्दी घोल लें।",
      ],
      usage: [
        "एक घूँट मुँह में लेकर 20–30 सेकंड गरारे करें और थूक दें। गिलास ख़त्म होने तक दोहराएँ।",
        "दिन में 2–3 बार, ख़ासकर सुबह और सोने से पहले करें।",
      ],
      precautions: [
        "गरारे का पानी निगलें नहीं।",
        "जो छोटे बच्चे ठीक से गरारे नहीं कर पाते, उनके लिए नहीं।",
        "गले में तेज़ दर्द हो, एक हफ़्ते से ज़्यादा रहे, या साथ में तेज़ बुखार, निगलने में दिक्कत या सफ़ेद धब्बे हों तो डॉक्टर को दिखाएँ।",
      ],
    },
  },
  {
    slug: "black-pepper-honey-congestion",
    category: "cold-cough",
    time: 2,
    en: {
      title: "Black pepper and honey for chest heaviness",
      summary:
        "In Ayurveda, black pepper (maricha) is valued for its pungent, kapha-reducing quality. A pinch with honey is a traditional support when a cold settles on the chest as heaviness and mucus.",
      ingredients: [
        "A small pinch (about ⅛ teaspoon) freshly ground black pepper",
        "1 teaspoon honey",
      ],
      preparation: [
        "Mix the ground pepper into the honey at room temperature.",
      ],
      usage: [
        "Lick slowly once or twice a day, after food, for 2–3 days.",
      ],
      precautions: [
        "Pepper is hot — avoid if you have acidity, ulcers or piles that bleed.",
        "No honey for babies under 1 year; people with diabetes should check with their doctor.",
        "Chest pain, breathlessness, a cough with coloured phlegm and fever, or wheezing need medical assessment.",
      ],
    },
    hi: {
      title: "सीने की जकड़न में काली मिर्च और शहद",
      summary:
        "आयुर्वेद में काली मिर्च (मरिच) को उसके तीखे, कफ घटाने वाले गुण के लिए महत्व दिया गया है। जब ज़ुकाम सीने में भारीपन और बलगम के रूप में बैठ जाए, तब चुटकी भर काली मिर्च शहद के साथ लेना पारंपरिक सहारा है।",
      ingredients: [
        "एक छोटी चुटकी (लगभग ⅛ छोटा चम्मच) ताज़ी पिसी काली मिर्च",
        "1 छोटा चम्मच शहद",
      ],
      preparation: [
        "कमरे के तापमान पर शहद में पिसी काली मिर्च मिला लें।",
      ],
      usage: [
        "भोजन के बाद दिन में एक या दो बार, 2–3 दिन तक धीरे-धीरे चाटें।",
      ],
      precautions: [
        "काली मिर्च गर्म है — एसिडिटी, अल्सर या ख़ूनी बवासीर हो तो न लें।",
        "1 साल से छोटे बच्चों को शहद न दें; डायबिटीज़ हो तो डॉक्टर से पूछें।",
        "सीने में दर्द, साँस फूलना, बुखार के साथ रंगीन बलगम या घरघराहट हो तो डॉक्टर से जाँच करवाएँ।",
      ],
    },
  },
  {
    slug: "nutmeg-bedtime-milk",
    category: "sleep-stress",
    time: 5,
    featured: true,
    en: {
      title: "Warm milk with a pinch of nutmeg for sleep",
      summary:
        "A cup of warm milk with a tiny pinch of nutmeg (jaiphal) and cardamom is a gentle, traditional wind-down drink for restless evenings.",
      ingredients: [
        "1 cup milk (or plant milk)",
        "A very small pinch of freshly grated nutmeg — no more",
        "1 crushed cardamom pod",
      ],
      preparation: [
        "Warm the milk with the cardamom.",
        "Take off the heat and stir in the tiny pinch of nutmeg.",
      ],
      usage: [
        "Drink slowly about 30–45 minutes before bed, ideally with screens switched off.",
      ],
      precautions: [
        "Use only a tiny pinch. Nutmeg in larger amounts is toxic and can cause serious side effects.",
        "Avoid nutmeg during pregnancy and do not give it to children.",
        "Long-term sleep problems, loud snoring with breathing pauses, or low mood deserve a proper medical check.",
      ],
    },
    hi: {
      title: "नींद के लिए चुटकी भर जायफल वाला गरम दूध",
      summary:
        "बेचैन शामों में एक कप गरम दूध में ज़रा-सा जायफल और इलायची — मन को शांत करने वाला सौम्य, पारंपरिक पेय।",
      ingredients: [
        "1 कप दूध (या पौधों से बना दूध)",
        "ताज़ा कसा हुआ जायफल — बस एक बहुत छोटी चुटकी, इससे ज़्यादा नहीं",
        "1 कुटी इलायची",
      ],
      preparation: [
        "इलायची डालकर दूध गरम करें।",
        "आँच से उतारकर ज़रा-सा जायफल मिलाएँ।",
      ],
      usage: [
        "सोने से 30–45 मिनट पहले धीरे-धीरे पिएँ, और हो सके तो स्क्रीन बंद रखें।",
      ],
      precautions: [
        "बस एक छोटी चुटकी ही डालें। ज़्यादा मात्रा में जायफल ज़हरीला होता है और गंभीर नुक़सान कर सकता है।",
        "गर्भावस्था में जायफल न लें और बच्चों को न दें।",
        "लंबे समय से नींद न आना, साँस रुकने के साथ तेज़ ख़र्राटे या उदासी बनी रहे तो डॉक्टर से ठीक से जाँच करवाएँ।",
      ],
    },
  },
  {
    slug: "padabhyanga-foot-massage",
    category: "sleep-stress",
    time: 10,
    en: {
      title: "Padabhyanga: warm oil foot massage before bed",
      summary:
        "Massaging the soles of the feet with warm oil is a small nightly ritual that Ayurveda recommends for calming vata, easing tired feet and settling the mind for sleep.",
      ingredients: [
        "1–2 teaspoons sesame oil, coconut oil or ghee",
        "An old pair of cotton socks",
      ],
      preparation: [
        "Warm the oil slightly by placing the bottle in a cup of hot water for a few minutes.",
        "Test the temperature on your wrist — it should feel pleasantly warm, not hot.",
      ],
      usage: [
        "Sitting comfortably, rub the oil into each sole, heel, toes and ankle for 3–5 minutes per foot.",
        "Wipe off any excess and wear socks to protect your sheets.",
      ],
      precautions: [
        "Avoid on cuts, infections or cracked skin that is bleeding.",
        "People with diabetes should check their feet daily and ask their doctor before massage if they have numbness or wounds.",
        "Oily feet are slippery — be careful walking on hard floors.",
      ],
    },
    hi: {
      title: "पादाभ्यंग: सोने से पहले पैरों के तलवों की गुनगुने तेल से मालिश",
      summary:
        "गुनगुने तेल से पैरों के तलवों की मालिश एक छोटी-सी रात की आदत है, जिसे आयुर्वेद वात को शांत करने, थके पैरों को आराम देने और मन को नींद के लिए तैयार करने के लिए सुझाता है।",
      ingredients: [
        "1–2 छोटे चम्मच तिल का तेल, नारियल तेल या घी",
        "पुराने सूती मोज़ों की एक जोड़ी",
      ],
      preparation: [
        "तेल की शीशी को कुछ मिनट गरम पानी के कप में रखकर हल्का गुनगुना कर लें।",
        "कलाई पर तापमान जाँच लें — अच्छा गुनगुना लगे, गरम नहीं।",
      ],
      usage: [
        "आराम से बैठकर हर पैर के तलवे, एड़ी, उँगलियों और टखने पर 3–5 मिनट तेल मलें।",
        "अतिरिक्त तेल पोंछ लें और चादर बचाने के लिए मोज़े पहन लें।",
      ],
      precautions: [
        "कटे, संक्रमित या फटकर ख़ून निकलती त्वचा पर न करें।",
        "डायबिटीज़ में रोज़ पैरों की जाँच करें, और सुन्नपन या घाव हो तो मालिश से पहले डॉक्टर से पूछें।",
        "तेल लगे पैर फिसलते हैं — पक्के फ़र्श पर संभलकर चलें।",
      ],
    },
  },
  {
    slug: "ashwagandha-bedtime-milk",
    category: "sleep-stress",
    time: 5,
    en: {
      title: "Ashwagandha milk for stressful days",
      summary:
        "Ashwagandha is Ayurveda's best-known adaptogenic herb, traditionally used to support strength and a calm mind. It is classically taken in warm milk at night.",
      ingredients: [
        "¼–½ teaspoon ashwagandha root powder from a trusted, tested brand",
        "1 cup warm milk (or plant milk)",
        "A pinch of cardamom; a little jaggery (optional)",
      ],
      preparation: [
        "Stir the ashwagandha powder into warm milk and simmer for 2 minutes.",
        "Add cardamom and a little jaggery if you like.",
      ],
      usage: [
        "Drink in the evening, for a few weeks at a time.",
        "Start with the smaller amount and speak to an Ayurvedic practitioner before longer use.",
      ],
      precautions: [
        "Avoid during pregnancy and breastfeeding.",
        "Not advised if you have thyroid disorders, autoimmune conditions, liver problems, or are taking sedatives, thyroid, BP or diabetes medicine — unless your doctor agrees.",
        "Stop and seek advice if you notice stomach upset, drowsiness during the day, or any unusual symptoms.",
      ],
    },
    hi: {
      title: "तनाव भरे दिनों में अश्वगंधा वाला दूध",
      summary:
        "अश्वगंधा आयुर्वेद की सबसे प्रसिद्ध जड़ी-बूटियों में से है, जिसे परंपरा से ताक़त और शांत मन के लिए इस्तेमाल किया जाता है। शास्त्रीय रूप से इसे रात में गरम दूध के साथ लिया जाता है।",
      ingredients: [
        "किसी भरोसेमंद, जाँचे-परखे ब्रांड का ¼–½ छोटा चम्मच अश्वगंधा जड़ का चूर्ण",
        "1 कप गरम दूध (या पौधों से बना दूध)",
        "एक चुटकी इलायची; थोड़ा गुड़ (वैकल्पिक)",
      ],
      preparation: [
        "गरम दूध में अश्वगंधा चूर्ण घोलकर 2 मिनट हल्का पकाएँ।",
        "चाहें तो इलायची और थोड़ा गुड़ मिला लें।",
      ],
      usage: [
        "शाम को लें, एक बार में कुछ हफ़्तों तक।",
        "कम मात्रा से शुरू करें और लंबे समय तक लेने से पहले किसी आयुर्वेदिक वैद्य से सलाह लें।",
      ],
      precautions: [
        "गर्भावस्था और स्तनपान के दौरान न लें।",
        "थायरॉइड की समस्या, ऑटोइम्यून बीमारी, लिवर की तकलीफ़ हो, या नींद, थायरॉइड, बीपी अथवा डायबिटीज़ की दवा ले रहे हों तो डॉक्टर की सहमति के बिना न लें।",
        "पेट ख़राब होना, दिन में सुस्ती या कोई असामान्य लक्षण दिखे तो बंद करके सलाह लें।",
      ],
    },
  },
];
