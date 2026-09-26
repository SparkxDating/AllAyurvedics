import { CircleHelp, ListChecks, Mountain } from "lucide-react";
import { siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { shilajitArticles } from "@/content/articles-shilajit";
import { getRemedy } from "@/content/remedies";
import type { FaqItem, Remedy } from "@/content/types";
import { RemedyCard } from "@/components/cards";
import { Breadcrumbs, Container, DisclaimerNote, JsonLd } from "@/components/page-bits";
import { ShilajitBuyBox, ShilajitGuides, shilajitUrls } from "@/components/shilajit-bits";
import { Markdown } from "@/lib/markdown";

type HubText = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  h1: string;
  intro: string;
  whatTitle: string;
  what: string;
  guidesTitle: string;
  factsTitle: string;
  facts: [string, string][];
  faqTitle: string;
  faq: FaqItem[];
  relatedTitle: string;
};

const RELATED = ["low-energy-fatigue", "ashwagandha-benefits-uses", "benefits-of-chyawanprash"];

const T: Record<"en" | "hi", HubText> = {
  en: {
    metaTitle: "Shilajit: Benefits, How to Take, Pure vs Fake & Price",
    metaDescription:
      "Everything about shilajit in one place: what it is, traditional Ayurvedic benefits, how to take shilajit resin, how to identify pure shilajit, side effects and price.",
    crumb: "Shilajit guide",
    h1: "Shilajit guide: benefits, how to take it and how to buy pure shilajit",
    intro:
      "Plain-language guides on Himalayan shilajit — what Ayurveda traditionally uses it for, the right way to take it, how to spot pure resin, who should avoid it and how to compare prices.",
    whatTitle: "What is shilajit?",
    what: `Shilajit (Sanskrit: **shilajatu**) is a dark, sticky, mineral-rich resin that seeps from rock crevices high in the Himalayas. It forms over a very long time from plant matter breaking down under the rocks, so it naturally contains **fulvic acid** and minerals.

Classical Ayurveda counts shilajit among the most valued **rasayanas** — taken in small amounts to support strength, stamina, energy and vitality. It is a traditional supplement, not a medicine. Start with [shilajit benefits](/en/articles/shilajit-benefits) and [how to take shilajit resin](/en/articles/how-to-take-shilajit-resin).`,
    guidesTitle: "Shilajit guides",
    factsTitle: "Shilajit quick facts",
    facts: [
      ["Sanskrit name", "Shilajatu"],
      ["Forms", "Resin (least processed), capsules, powder, gummies"],
      ["Traditional use", "Rasayana for strength, stamina, energy and vitality"],
      ["Usual label dose", "250–500 mg a day (rice-grain to pea-sized piece of resin)"],
      ["How to take", "Dissolved in warm water or milk, once a day, usually in the morning"],
      ["Check with a doctor", "Children under 12, pregnancy, breastfeeding, heart conditions, gout, iron overload, chronic illness, regular medicines"],
    ],
    faqTitle: "Shilajit FAQs",
    faq: [
      {
        q: "What is shilajit?",
        a: "Shilajit is a mineral-rich resin that seeps from Himalayan rocks. It naturally contains fulvic acid and minerals, and Ayurveda has used it for centuries as a rasayana.",
      },
      {
        q: "What are the benefits of shilajit?",
        a: "Ayurveda traditionally uses shilajit to support strength, stamina, energy and overall vitality. It is a supplement, not a treatment for any disease.",
      },
      {
        q: "How should I take shilajit resin?",
        a: "Dissolve a rice-grain to pea-sized piece (about 250–500 mg) in warm water or milk and drink it once a day, preferably in the morning, or as your healthcare professional advises.",
      },
      {
        q: "How can I tell if shilajit is original?",
        a: "Check the label first: manufacturer's name, address, licence number, batch and dates. Genuine resin is glossy, softens with finger warmth and dissolves almost completely in warm water. Home tests are only rough guides.",
      },
      {
        q: "Who should not take shilajit?",
        a: "Children under 12 and pregnant or breastfeeding women should avoid it unless a doctor advises. People with heart conditions, gout or high uric acid, iron overload, chronic illness or on regular medicines should consult a doctor first.",
      },
      {
        q: "What is the price of shilajit?",
        a: "Prices vary by brand, form and pack size, so compare the price per gram. Our Adamya Herbals Himalayan shilajit resin 10 g is ₹499 (MRP ₹799).",
      },
    ],
    relatedTitle: "Related energy and strength remedies",
  },
  hi: {
    metaTitle: "शिलाजीत: फायदे, खाने का तरीका, असली की पहचान और कीमत",
    metaDescription:
      "शिलाजीत की पूरी जानकारी एक जगह: शिलाजीत क्या है, आयुर्वेद में पारंपरिक फायदे, शिलाजीत खाने का तरीका, ओरिजिनल शिलाजीत की पहचान, नुकसान और कीमत।",
    crumb: "शिलाजीत गाइड",
    h1: "शिलाजीत गाइड: फायदे, खाने का तरीका और असली शिलाजीत कैसे ख़रीदें",
    intro:
      "हिमालयन शिलाजीत पर आसान भाषा में गाइड — आयुर्वेद में इसका पारंपरिक उपयोग, सही तरीके से कैसे खाएँ, असली रेज़िन की पहचान, किसे नहीं खाना चाहिए और कीमत की तुलना कैसे करें।",
    whatTitle: "शिलाजीत क्या है?",
    what: `शिलाजीत (संस्कृत में **शिलाजतु**) एक गहरे रंग का, चिपचिपा, खनिजों से भरपूर रेज़िन है, जो हिमालय की ऊँची चट्टानों की दरारों से रिसता है। चट्टानों के नीचे पौधों के अवशेष बहुत लंबे समय में टूटकर इसे बनाते हैं, इसलिए इसमें प्राकृतिक रूप से **फ़ल्विक एसिड** और खनिज होते हैं।

आयुर्वेद में शिलाजीत को सबसे मूल्यवान **रसायनों** में गिना गया है — जिसे थोड़ी मात्रा में ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति के लिए लिया जाता है। यह पारंपरिक सप्लीमेंट है, दवा नहीं। शुरुआत करें: [शिलाजीत के फायदे](/hi/articles/shilajit-benefits) और [शिलाजीत खाने का तरीका](/hi/articles/how-to-take-shilajit-resin)।`,
    guidesTitle: "शिलाजीत गाइड",
    factsTitle: "शिलाजीत: मुख्य बातें",
    facts: [
      ["संस्कृत नाम", "शिलाजतु"],
      ["रूप", "रेज़िन (सबसे कम प्रोसेस्ड), कैप्सूल, पाउडर, गमीज़"],
      ["पारंपरिक उपयोग", "ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति के लिए रसायन"],
      ["सामान्य लेबल मात्रा", "रोज़ 250–500 मिलीग्राम (चावल से मटर के दाने जितना रेज़िन)"],
      ["कैसे लें", "गुनगुने पानी या दूध में घोलकर, दिन में एक बार, आमतौर पर सुबह"],
      ["डॉक्टर से पूछें", "12 साल से कम उम्र के बच्चे, गर्भावस्था, स्तनपान, दिल की बीमारी, गाउट, आयरन की अधिकता, पुरानी बीमारी, नियमित दवा"],
    ],
    faqTitle: "शिलाजीत: अक्सर पूछे जाने वाले सवाल",
    faq: [
      {
        q: "शिलाजीत क्या है?",
        a: "शिलाजीत हिमालय की चट्टानों से रिसने वाला खनिजों से भरपूर रेज़िन है। इसमें प्राकृतिक रूप से फ़ल्विक एसिड और खनिज होते हैं, और आयुर्वेद में सदियों से इसे रसायन के रूप में लिया जाता है।",
      },
      {
        q: "शिलाजीत के फायदे क्या हैं?",
        a: "आयुर्वेद में शिलाजीत को परंपरा से ताक़त, स्टैमिना, ऊर्जा और स्फूर्ति को सहारा देने के लिए लिया जाता है। यह सप्लीमेंट है, किसी बीमारी का इलाज नहीं।",
      },
      {
        q: "शिलाजीत रेज़िन कैसे खाएँ?",
        a: "चावल से मटर के दाने जितनी मात्रा (लगभग 250–500 मिलीग्राम) गुनगुने पानी या दूध में घोलकर दिन में एक बार, हो सके तो सुबह पिएँ, या स्वास्थ्य विशेषज्ञ की सलाह अनुसार।",
      },
      {
        q: "ओरिजिनल शिलाजीत कैसे पहचानें?",
        a: "पहले लेबल देखें: निर्माता का नाम, पता, लाइसेंस नंबर, बैच और तिथियाँ। असली रेज़िन चमकदार होता है, उँगलियों की गर्मी से नरम होता है और गुनगुने पानी में लगभग पूरा घुल जाता है। घरेलू जाँच सिर्फ़ मोटा अंदाज़ा है।",
      },
      {
        q: "किसे शिलाजीत नहीं खाना चाहिए?",
        a: "12 साल से कम उम्र के बच्चे और गर्भवती या स्तनपान कराने वाली महिलाएँ डॉक्टर की सलाह के बिना न लें। दिल की बीमारी, गाउट या हाई यूरिक एसिड, आयरन की अधिकता, पुरानी बीमारी वाले या नियमित दवा लेने वाले पहले डॉक्टर से पूछें।",
      },
      {
        q: "शिलाजीत की कीमत क्या है?",
        a: "कीमत ब्रांड, रूप और पैक साइज़ के अनुसार अलग होती है, इसलिए प्रति ग्राम कीमत की तुलना करें। हमारा अदम्य हर्बल्स हिमालयन शिलाजीत रेज़िन 10 ग्राम ₹499 (MRP ₹799) में है।",
      },
    ],
    relatedTitle: "ऊर्जा और ताक़त से जुड़े घरेलू उपाय",
  },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/shilajit">) {
  const locale = await resolveLocale(params);
  const t = T[locale];
  return buildMetadata({
    locale,
    path: "/shilajit",
    title: t.metaTitle,
    absoluteTitle: true,
    description: t.metaDescription,
    image: { url: "/lp/shilajit-og.jpg", width: 1200, height: 630, alt: t.h1 },
  });
}

export default async function ShilajitHubPage({ params }: PageProps<"/[locale]/shilajit">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const t = T[locale];
  const u = shilajitUrls(locale);
  const pageUrl = `${siteUrl}${u.hub}`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";
  const crumbs = [{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: t.crumb }];
  const related = RELATED.map((s) => getRemedy(s)).filter((r): r is Remedy => Boolean(r));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: c.href ? `${siteUrl}${c.href}` : pageUrl,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.h1,
          description: t.metaDescription,
          inLanguage,
          url: pageUrl,
          about: { "@type": "Thing", name: locale === "hi" ? "शिलाजीत" : "Shilajit" },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: shilajitArticles.length + 1,
            itemListElement: [
              ...shilajitArticles.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${siteUrl}/${locale}/articles/${a.slug}`,
                name: a[locale].title,
              })),
              { "@type": "ListItem", position: shilajitArticles.length + 1, url: `${siteUrl}${u.product}`, name: locale === "hi" ? "हिमालयन शिलाजीत रेज़िन 10 ग्राम" : "Himalayan Shilajit Resin 10 g" },
            ],
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage,
          mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <section className="leaf-pattern border-b border-border bg-secondary/50">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={crumbs} />
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-sm font-medium text-clay">
            <Mountain className="size-4" aria-hidden="true" />
            {locale === "hi" ? "हिमालयन शिलाजीत" : "Himalayan shilajit"}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-primary sm:text-4xl">{t.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t.intro}</p>
        </Container>
      </section>

      <Container className="grid max-w-5xl gap-8 py-10">
        <section aria-labelledby="sec-what">
          <h2 id="sec-what" className="text-2xl font-semibold text-primary">
            {t.whatTitle}
          </h2>
          <div className="mt-2">
            <Markdown body={t.what} />
          </div>
        </section>

        <ShilajitBuyBox locale={locale} dict={dict} />

        <ShilajitGuides locale={locale} heading={t.guidesTitle} showHubLink={false} />

        <section aria-labelledby="sec-facts" className="rounded-2xl border border-border bg-card p-6">
          <h2 id="sec-facts" className="flex items-center gap-2 text-xl font-semibold text-primary">
            <ListChecks className="size-5 text-leaf" aria-hidden="true" />
            {t.factsTitle}
          </h2>
          <dl className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border text-sm">
            {t.facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[34%_1fr] sm:gap-3">
                <dt className="font-medium text-muted-foreground">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="sec-faq" className="rounded-2xl border border-border bg-card p-6">
          <h2 id="sec-faq" className="flex items-center gap-2 text-xl font-semibold text-primary">
            <CircleHelp className="size-5 text-leaf" aria-hidden="true" />
            {t.faqTitle}
          </h2>
          <dl className="mt-4 divide-y divide-border">
            {t.faq.map((f, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <dt>
                  <h3 className="text-[1.05rem] font-semibold text-foreground">{f.q}</h3>
                </dt>
                <dd className="mt-2 text-[1.02rem] leading-relaxed text-foreground/85">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="sec-related">
            <h2 id="sec-related" className="mb-6 text-2xl font-semibold text-primary">
              {t.relatedTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RemedyCard key={r.slug} remedy={r} locale={locale} dict={dict} />
              ))}
            </div>
          </section>
        )}

        <DisclaimerNote locale={locale} dict={dict} />
      </Container>
    </>
  );
}
