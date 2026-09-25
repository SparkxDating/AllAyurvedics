import type { Article } from "./types";

export const articles2: Article[] = [
  {
    slug: "ritucharya-seasonal-eating",
    date: "2026-09-05",
    tags: ["seasons", "diet"],
    featured: true,
    en: {
      title: "Ritucharya: how to eat and live with India's six seasons",
      excerpt:
        "Ayurveda divides the year into six seasons and adjusts food and habits for each. Here is a practical guide to seasonal living in the Indian climate.",
      body: `Our grandparents rarely needed a nutrition chart. They ate sesame and jaggery in winter, cooling buttermilk and sattu in summer, and light, warm food when the rains arrived. This instinctive way of living with the seasons has a name in Ayurveda: **ritucharya**, the seasonal regimen.

The idea is that the qualities of each season — hot or cold, dry or damp — build up in the body. By adjusting food and habits in time, we stop small imbalances from turning into seasonal complaints.

## The six Indian seasons

Ayurveda follows the traditional Indian calendar of six seasons, each roughly two months long. Exact timing varies with region — the hills, the coast and the plains all differ — so use the descriptions rather than the dates as your guide.

## Shishira (late winter, roughly mid-January to mid-March)

The coldest, driest part of the year. Digestion is naturally strong, and the body needs warmth and nourishment.

- Favour warm, well-cooked and slightly oily food: soups, dals, root vegetables, whole grains, ghee.
- Sesame, jaggery, dry ginger and seasonal greens such as sarson and bathua are traditional favourites.
- Oil massage before a warm bath is especially valuable.
- Avoid cold drinks and very light, dry meals that leave you hungry.

## Vasanta (spring, mid-March to mid-May)

As the sun warms up, the kapha that accumulated in winter begins to "melt". This is why coughs, colds, allergies and a heavy, sleepy feeling are common in spring.

- Eat lighter, warm meals with less oil, sugar and dairy.
- Add pungent and bitter tastes: ginger, black pepper, turmeric, fenugreek, neem flowers, bitter gourd.
- Old grains like barley and millets, and honey in small amounts, suit this season.
- Exercise more briskly and avoid sleeping during the day.

## Grishma (summer, mid-May to mid-July)

Strong heat dries the body and weakens digestion. Energy dips and dehydration is common.

- Keep meals light and cooling: rice, moong dal, seasonal vegetables such as lauki, tori and cucumber, sweet juicy fruits.
- Drink plenty of water, buttermilk, coconut water, and traditional coolers such as aam panna or sattu drink.
- Reduce very spicy, salty, sour and fried foods, and alcohol.
- Stay out of the midday sun and rest in the hottest hours. A short afternoon rest is acceptable in this season only.

## Varsha (monsoon, mid-July to mid-September)

The rains bring relief, but also dampness, weak digestion and a higher risk of infections from food and water.

- Eat freshly cooked, warm, easily digestible food. Khichdi, soups and steamed dishes are ideal.
- Use digestive spices generously: ginger, cumin, ajwain, asafoetida (hing), black pepper.
- Drink boiled or filtered water, and avoid street food, raw salads and leafy greens that are hard to clean.
- Keep the body dry and warm, and avoid sleeping in damp clothes.

## Sharad (autumn, mid-September to mid-November)

After the monsoon, the sudden heat of sharad tends to aggravate pitta. Acidity, skin rashes and irritability become more common.

- Choose sweet, bitter and astringent tastes: ghee, rice, wheat, moong, pomegranate, amla, gourds, coriander.
- Reduce sour, spicy, fermented and deep-fried food.
- Traditions such as enjoying moonlight on Sharad Purnima reflect the cooling needs of this season.

## Hemanta (early winter, mid-November to mid-January)

Cold returns, and digestive fire becomes strong again. It is a season for building strength.

- Enjoy nourishing food: whole grains, urad dal, milk, ghee, nuts, sesame and jaggery.
- Regular oil massage, exercise and exposure to morning sun are recommended.
- Avoid fasting for long periods or eating too little, which can aggravate vata.

## The junctions between seasons

Ayurveda pays special attention to **ritu sandhi** — the two weeks at the end of one season and the start of the next. Change your diet and routine gradually during this period rather than overnight. It is also the time when many people catch colds, so be gentle with your body.

## Local, seasonal and simple

The easiest way to follow ritucharya is to shop at your local vegetable market and cook what is abundant. Seasonal produce is fresher, cheaper and naturally suited to the needs of that time of year.

## Keep it safe

Seasonal eating is about everyday food, not medicine. People with diabetes, kidney disease, heart conditions, food allergies or special diets should follow their doctor's advice first and adapt seasonal ideas within those limits. Pregnant and nursing women should check before adding herbs or making major changes.`,
    },
    hi: {
      title: "ऋतुचर्या: भारत की छह ऋतुओं के साथ कैसे खाएँ और जिएँ",
      excerpt:
        "आयुर्वेद साल को छह ऋतुओं में बाँटता है और हर ऋतु के लिए भोजन व आदतें बदलता है। भारतीय मौसम में ऋतु के अनुसार जीने की एक व्यावहारिक गाइड।",
      body: `हमारे दादा-दादी को शायद ही कभी पोषण चार्ट की ज़रूरत पड़ी। वे सर्दियों में तिल-गुड़, गर्मियों में ठंडी छाछ और सत्तू, और बारिश आने पर हल्का, गरम खाना खाते थे। ऋतुओं के साथ जीने के इस सहज तरीके का आयुर्वेद में एक नाम है: **ऋतुचर्या**, यानी मौसम के अनुसार आचरण।

विचार यह है कि हर मौसम के गुण — गर्म या ठंडा, सूखा या नम — शरीर में जमा होते हैं। समय रहते भोजन और आदतें बदलकर हम छोटे असंतुलनों को मौसमी बीमारियों में बदलने से रोक सकते हैं।

## भारत की छह ऋतुएँ

आयुर्वेद पारंपरिक भारतीय पंचांग की छह ऋतुओं का पालन करता है, हर ऋतु लगभग दो महीने की। सटीक समय क्षेत्र के हिसाब से बदलता है — पहाड़, तट और मैदान सब अलग हैं — इसलिए तारीख़ों के बजाय मौसम के वर्णन को अपना आधार बनाएँ।

## शिशिर (देर सर्दी, लगभग मध्य जनवरी से मध्य मार्च)

साल का सबसे ठंडा और सूखा समय। पाचन स्वाभाविक रूप से मज़बूत होता है और शरीर को गर्माहट व पोषण चाहिए।

- गरम, अच्छी तरह पका और थोड़ा चिकनाई वाला भोजन लें: सूप, दालें, कंद-मूल, साबुत अनाज, घी।
- तिल, गुड़, सोंठ और सरसों व बथुआ जैसे मौसमी साग पारंपरिक पसंद हैं।
- गुनगुने स्नान से पहले तेल मालिश इस समय ख़ास फ़ायदेमंद है।
- ठंडे पेय और बहुत हल्के, सूखे भोजन से बचें जिसके बाद भूख बनी रहे।

## वसंत (मध्य मार्च से मध्य मई)

सूरज के गर्म होते ही सर्दियों में जमा कफ "पिघलने" लगता है। इसीलिए वसंत में खाँसी, ज़ुकाम, एलर्जी और भारीपन व नींद जैसा एहसास आम है।

- कम तेल, कम मीठा और कम दूध वाला हल्का, गरम भोजन लें।
- तीखा और कड़वा स्वाद बढ़ाएँ: अदरक, काली मिर्च, हल्दी, मेथी, नीम के फूल, करेला।
- जौ और मोटे अनाज जैसे पुराने अनाज, और थोड़ी मात्रा में शहद इस ऋतु के अनुकूल हैं।
- ज़्यादा फुर्ती से व्यायाम करें और दिन में सोने से बचें।

## ग्रीष्म (मध्य मई से मध्य जुलाई)

तेज़ गर्मी शरीर को सुखाती है और पाचन कमज़ोर करती है। ऊर्जा घटती है और पानी की कमी आम है।

- भोजन हल्का और ठंडक देने वाला रखें: चावल, मूँग दाल, लौकी, तोरई और खीरे जैसी मौसमी सब्ज़ियाँ, मीठे रसीले फल।
- ख़ूब पानी, छाछ, नारियल पानी और आम पना या सत्तू जैसे पारंपरिक ठंडे पेय पिएँ।
- बहुत तीखा, नमकीन, खट्टा, तला खाना और शराब कम करें।
- दोपहर की धूप से बचें और सबसे गर्म घंटों में आराम करें। दोपहर की छोटी झपकी केवल इसी ऋतु में ठीक मानी गई है।

## वर्षा (मध्य जुलाई से मध्य सितंबर)

बारिश राहत लाती है, पर साथ में नमी, कमज़ोर पाचन और खाने-पानी से संक्रमण का ख़तरा भी बढ़ता है।

- ताज़ा पका, गरम और आसानी से पचने वाला भोजन लें। खिचड़ी, सूप और भाप में बने व्यंजन सबसे अच्छे हैं।
- पाचक मसाले भरपूर डालें: अदरक, जीरा, अजवाइन, हींग, काली मिर्च।
- उबला या फ़िल्टर किया पानी पिएँ, और बाहर का खाना, कच्चा सलाद और ठीक से साफ़ न होने वाले पत्तेदार साग से बचें।
- शरीर को सूखा और गर्म रखें, और गीले कपड़ों में न सोएँ।

## शरद (मध्य सितंबर से मध्य नवंबर)

बारिश के बाद शरद की अचानक तेज़ धूप पित्त को बढ़ाती है। एसिडिटी, त्वचा पर चकत्ते और चिड़चिड़ापन आम हो जाते हैं।

- मीठा, कड़वा और कसैला स्वाद चुनें: घी, चावल, गेहूँ, मूँग, अनार, आँवला, लौकी-तोरई जैसी सब्ज़ियाँ, हरा धनिया।
- खट्टा, तीखा, ख़मीर वाला और ज़्यादा तला भोजन कम करें।
- शरद पूर्णिमा की चाँदनी का आनंद लेने जैसी परंपराएँ इस ऋतु में ठंडक की ज़रूरत को दर्शाती हैं।

## हेमंत (शुरुआती सर्दी, मध्य नवंबर से मध्य जनवरी)

ठंड लौटती है और पाचन की अग्नि फिर से प्रबल हो जाती है। यह ताक़त बढ़ाने की ऋतु है।

- पौष्टिक भोजन का आनंद लें: साबुत अनाज, उड़द दाल, दूध, घी, मेवे, तिल और गुड़।
- नियमित तेल मालिश, व्यायाम और सुबह की धूप लेने की सलाह दी जाती है।
- लंबे उपवास या बहुत कम खाने से बचें, इससे वात बढ़ सकता है।

## दो ऋतुओं के बीच का समय

आयुर्वेद **ऋतु संधि** पर ख़ास ध्यान देता है — एक ऋतु के अंत और अगली की शुरुआत के दो हफ़्ते। इस दौरान भोजन और दिनचर्या एक रात में नहीं, धीरे-धीरे बदलें। यही वह समय है जब बहुत लोगों को ज़ुकाम होता है, इसलिए शरीर के साथ नरमी बरतें।

## स्थानीय, मौसमी और सरल

ऋतुचर्या अपनाने का सबसे आसान तरीका है अपनी स्थानीय सब्ज़ी मंडी से ख़रीदारी करना और जो भरपूर मिल रहा हो वही पकाना। मौसमी उपज ताज़ी, सस्ती और उस समय की ज़रूरतों के स्वाभाविक रूप से अनुकूल होती है।

## सुरक्षा का ध्यान रखें

मौसमी खान-पान रोज़ के भोजन की बात है, दवा की नहीं। डायबिटीज़, किडनी रोग, दिल की बीमारी, खाद्य एलर्जी या विशेष डाइट वाले लोग पहले अपने डॉक्टर की सलाह मानें और उसी सीमा में मौसमी सुझाव अपनाएँ। गर्भवती और स्तनपान कराने वाली महिलाएँ जड़ी-बूटियाँ जोड़ने या बड़े बदलाव से पहले सलाह ज़रूर लें।`,
    },
  },
  {
    slug: "ayurvedic-diet-basics",
    date: "2026-08-28",
    tags: ["diet", "basics"],
    en: {
      title: "Ayurvedic diet basics: six tastes, simple rules and a balanced plate",
      excerpt:
        "You don't need exotic superfoods to eat the Ayurvedic way. Learn the six tastes, the most useful eating habits and how to build a balanced Indian thali.",
      body: `Ayurveda treats food as the first medicine. The classical texts spend as much time on how, when and where to eat as on what to eat. The good news is that a traditional Indian home kitchen already follows many of these principles. This guide pulls them together.

## The six tastes (shad rasa)

Ayurveda recognises six tastes, each built from particular elements and each with its own effect on the doshas:

- **Sweet (madhura)** — grains, milk, ghee, dates, sweet fruits. Nourishing and grounding. Calms vata and pitta; increases kapha in excess.
- **Sour (amla)** — lemon, amla, curd, tamarind. Stimulates appetite. Calms vata; can aggravate pitta and kapha.
- **Salty (lavana)** — rock salt, sea salt. Improves taste and digestion. Calms vata; too much increases pitta and kapha.
- **Pungent (katu)** — ginger, black pepper, chilli, garlic. Heating and clearing. Reduces kapha; can aggravate pitta and vata.
- **Bitter (tikta)** — bitter gourd, fenugreek, neem, leafy greens. Light and detoxifying. Reduces pitta and kapha; can increase vata.
- **Astringent (kashaya)** — lentils, pomegranate, unripe banana, green tea. Drying and firming. Reduces pitta and kapha; can increase vata.

A balanced meal includes all six tastes in some measure. That is exactly what a traditional thali does: rice or roti (sweet), dal (astringent), a squeeze of lemon or pickle (sour), a pinch of salt, a spiced sabzi (pungent) and a bitter vegetable or methi.

## Principles of how to eat

Ayurveda's eating guidelines are simple and surprisingly modern:

- **Eat when you are hungry**, and when the previous meal has been digested. Constant grazing is discouraged.
- **Make lunch the main meal**, when digestion is strongest. Keep dinner lighter and earlier.
- **Eat freshly cooked, warm food** where possible. Leftovers that have been refrigerated for days are considered heavy and less nourishing.
- **Sit down and eat calmly.** Eating while walking, arguing or scrolling on a phone is thought to weaken digestion.
- **Chew well and eat at a moderate pace.** Stop when you are about three-quarters full, leaving room for digestion.
- **Sip warm water with meals** rather than large amounts of iced drinks.

## Food combinations to be careful with

Ayurveda describes certain combinations as **viruddha ahara** — incompatible foods that can be hard to digest together. Commonly mentioned examples include:

- Milk with sour fruits, fish, or salty foods.
- Honey heated or cooked, or mixed with an equal amount of ghee.
- Curd at night, or heated curd.
- Fruit eaten immediately after a heavy meal.

Modern science has not studied all of these in detail, but many people notice they feel lighter when they follow them.

## Building an Ayurvedic plate

A simple way to plan meals:

- Half the plate: seasonal vegetables, cooked with digestive spices.
- A quarter: whole grains — rice, wheat, millets such as jowar, bajra and ragi.
- A quarter: protein — dal, beans, paneer, curd at lunch, or eggs and fish if you eat them.
- A teaspoon of ghee or cold-pressed oil, a little fresh chutney, and warm water.

## Spices as everyday support

The Indian masala box is a small pharmacy of digestive support. Cumin, coriander, fennel, turmeric, ginger, black pepper, ajwain and hing are used to make food easier to digest and to balance the heaviness of pulses and grains. Use them in cooking amounts; you don't need supplements to benefit.

## Eating for your constitution

Once you understand the doshas, you can fine-tune your diet:

- **Vata-predominant** people do well with warm, moist, slightly oily foods and regular mealtimes.
- **Pitta-predominant** people benefit from cooling, less spicy food and not skipping meals.
- **Kapha-predominant** people thrive on lighter, warm, well-spiced meals and fewer sweets and dairy.

## Keep it realistic

Ayurvedic eating is not about perfection. A home-cooked dal-chawal with a spoon of ghee and some vegetables, eaten calmly at the right time, is more Ayurvedic than an expensive "superfood" smoothie gulped at the desk.

If you have diabetes, high blood pressure, kidney disease, food allergies or are pregnant, your diet needs to be planned with your doctor or a registered dietitian. Ayurvedic principles can usually be adapted to fit within that advice.`,
    },
    hi: {
      title: "आयुर्वेदिक आहार की बुनियाद: छह रस, आसान नियम और संतुलित थाली",
      excerpt:
        "आयुर्वेदिक तरीके से खाने के लिए महँगे सुपरफ़ूड की ज़रूरत नहीं। जानिए छह रस, खाने की सबसे काम की आदतें और संतुलित भारतीय थाली कैसे बनाएँ।",
      body: `आयुर्वेद भोजन को पहली औषधि मानता है। शास्त्रों में क्या खाएँ के साथ-साथ कैसे, कब और कहाँ खाएँ, इस पर भी उतना ही ध्यान दिया गया है। अच्छी बात यह है कि पारंपरिक भारतीय रसोई पहले से इनमें से कई सिद्धांतों का पालन करती है। यह लेख उन्हें एक साथ सामने रखता है।

## छह रस (षड्रस)

आयुर्वेद छह स्वाद यानी रस मानता है, हर एक ख़ास तत्वों से बना और दोषों पर अपना असर रखने वाला:

- **मधुर (मीठा)** — अनाज, दूध, घी, खजूर, मीठे फल। पोषण और स्थिरता देने वाला। वात और पित्त को शांत करता है; ज़्यादा होने पर कफ बढ़ाता है।
- **अम्ल (खट्टा)** — नींबू, आँवला, दही, इमली। भूख जगाता है। वात को शांत करता है; पित्त और कफ बढ़ा सकता है।
- **लवण (नमकीन)** — सेंधा नमक, समुद्री नमक। स्वाद और पाचन सुधारता है। वात को शांत करता है; ज़्यादा होने पर पित्त और कफ बढ़ाता है।
- **कटु (तीखा)** — अदरक, काली मिर्च, मिर्च, लहसुन। गर्म और साफ़ करने वाला। कफ घटाता है; पित्त और वात बढ़ा सकता है।
- **तिक्त (कड़वा)** — करेला, मेथी, नीम, हरी पत्तेदार सब्ज़ियाँ। हल्का और शोधक। पित्त और कफ घटाता है; वात बढ़ा सकता है।
- **कषाय (कसैला)** — दालें, अनार, कच्चा केला, ग्रीन टी। सुखाने और कसाव देने वाला। पित्त और कफ घटाता है; वात बढ़ा सकता है।

संतुलित भोजन में थोड़ी-थोड़ी मात्रा में छहों रस होते हैं। पारंपरिक थाली ठीक यही करती है: चावल या रोटी (मीठा), दाल (कसैला), नींबू या अचार (खट्टा), चुटकी भर नमक, मसालेदार सब्ज़ी (तीखा) और कोई कड़वी सब्ज़ी या मेथी।

## कैसे खाएँ — इसके सिद्धांत

आयुर्वेद के भोजन संबंधी नियम सरल हैं और आश्चर्यजनक रूप से आधुनिक भी:

- **भूख लगने पर खाएँ**, और तब जब पिछला भोजन पच चुका हो। बार-बार कुछ न कुछ खाते रहना ठीक नहीं माना गया।
- **दोपहर का भोजन मुख्य रखें**, जब पाचन सबसे मज़बूत होता है। रात का भोजन हल्का और जल्दी करें।
- **जहाँ तक हो सके ताज़ा पका, गरम खाना खाएँ।** कई दिनों तक फ्रिज में रखा बचा खाना भारी और कम पौष्टिक माना जाता है।
- **बैठकर, शांति से खाएँ।** चलते-फिरते, बहस करते या फ़ोन चलाते हुए खाने से पाचन कमज़ोर होता है।
- **अच्छी तरह चबाएँ और मध्यम गति से खाएँ।** लगभग तीन-चौथाई पेट भरने पर रुक जाएँ, पाचन के लिए जगह छोड़ें।
- **भोजन के साथ बहुत ठंडे पेय के बजाय घूँट-घूँट गुनगुना पानी पिएँ।**

## किन मेलों से सावधान रहें

आयुर्वेद कुछ मेलों को **विरुद्ध आहार** कहता है — ऐसे खाद्य जो साथ में पचाने में कठिन होते हैं। आम तौर पर बताए जाने वाले उदाहरण:

- दूध के साथ खट्टे फल, मछली या नमकीन चीज़ें।
- गरम किया या पकाया हुआ शहद, या बराबर मात्रा में घी के साथ शहद।
- रात में दही, या गरम किया हुआ दही।
- भारी भोजन के तुरंत बाद फल।

आधुनिक विज्ञान ने इन सभी का विस्तार से अध्ययन नहीं किया है, लेकिन बहुत से लोग इनका पालन करने पर हल्कापन महसूस करते हैं।

## आयुर्वेदिक थाली कैसे बनाएँ

भोजन की योजना का एक आसान तरीका:

- आधी थाली: पाचक मसालों के साथ पकी मौसमी सब्ज़ियाँ।
- एक-चौथाई: साबुत अनाज — चावल, गेहूँ, और ज्वार, बाजरा, रागी जैसे मोटे अनाज।
- एक-चौथाई: प्रोटीन — दाल, राजमा-छोले, पनीर, दोपहर में दही, या अगर आप खाते हैं तो अंडे और मछली।
- एक छोटा चम्मच घी या कोल्ड-प्रेस्ड तेल, थोड़ी ताज़ी चटनी और गुनगुना पानी।

## रोज़ के सहायक मसाले

भारतीय मसालदानी पाचन के लिए एक छोटी-सी दवा की दुकान है। जीरा, धनिया, सौंफ, हल्दी, अदरक, काली मिर्च, अजवाइन और हींग खाने को सुपाच्य बनाने और दाल-अनाज के भारीपन को संतुलित करने में इस्तेमाल होते हैं। इन्हें खाना पकाने जितनी मात्रा में ही लें; फ़ायदे के लिए सप्लीमेंट की ज़रूरत नहीं।

## अपनी प्रकृति के अनुसार भोजन

दोषों को समझ लेने के बाद आप अपने आहार को और बारीकी से ढाल सकते हैं:

- **वात-प्रधान** लोगों के लिए गरम, नम, थोड़ा चिकनाई वाला भोजन और नियमित भोजन-समय अच्छा रहता है।
- **पित्त-प्रधान** लोगों को ठंडक देने वाले, कम तीखे भोजन और भोजन न छोड़ने से लाभ होता है।
- **कफ-प्रधान** लोग हल्के, गरम, अच्छे मसालों वाले भोजन और कम मिठाई व दूध से फलते-फूलते हैं।

## व्यावहारिक रहें

आयुर्वेदिक भोजन पूर्णता का नाम नहीं है। एक चम्मच घी और थोड़ी सब्ज़ी के साथ घर का बना दाल-चावल, सही समय पर शांति से खाया गया, डेस्क पर जल्दी-जल्दी गटके गए महँगे "सुपरफ़ूड" स्मूदी से कहीं ज़्यादा आयुर्वेदिक है।

अगर आपको डायबिटीज़, हाई बीपी, किडनी रोग, खाद्य एलर्जी है या आप गर्भवती हैं, तो आपका आहार डॉक्टर या पंजीकृत डाइटीशियन के साथ तय होना चाहिए। आयुर्वेदिक सिद्धांतों को आम तौर पर उस सलाह के दायरे में ढाला जा सकता है।`,
    },
  },
];
