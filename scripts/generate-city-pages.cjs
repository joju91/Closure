#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const cities = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo', 'cities.json'), 'utf8'));

const TODAY = '2026-05-17';

function bouppteckningPage(c) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bouppteckning ${c.name} — så går det till, kostnad och hjälp 2026 | Efterplan</title>
  <meta name="description" content="Bouppteckning i ${c.name}: steg, tidsgränser och vilken hjälp som finns för dödsbon i ${c.lan}. Komplett guide från Efterplan.">
  <link rel="canonical" href="https://efterplan.se/bouppteckning-${c.slug}.html">
  <meta property="og:title" content="Bouppteckning ${c.name} — guide 2026">
  <meta property="og:description" content="Praktisk guide för bouppteckning i ${c.name}. Tidsgränser och var du får hjälp.">
  <meta property="og:url" content="https://efterplan.se/bouppteckning-${c.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://efterplan.se/og.png">
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="style-tokens.css?v=5">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T1T40TYPQB"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T1T40TYPQB');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bouppteckning ${c.name} — guide 2026",
    "inLanguage": "sv",
    "datePublished": "${TODAY}",
    "dateModified": "${TODAY}",
    "author": { "@type": "Organization", "name": "Efterplan", "url": "https://efterplan.se" },
    "publisher": { "@type": "Organization", "name": "Efterplan", "url": "https://efterplan.se" },
    "image": "https://efterplan.se/og.png",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://efterplan.se/bouppteckning-${c.slug}.html" },
    "about": { "@type": "Place", "name": "${c.name}, ${c.lan}" }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Måste bouppteckningen göras i ${c.name}?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nej. Bouppteckningen kan upprättas var som helst i Sverige och lämnas in till Skatteverket digitalt eller via post. Det praktiska är att hålla förrättningsmötet där delägarna lättast kan samlas." }
      },
      {
        "@type": "Question",
        "name": "Var lämnar man in bouppteckning?",
        "acceptedAnswer": { "@type": "Answer", "text": "Bouppteckningar handläggs centralt av Skatteverket — inte lokalt i ${c.name}. Skicka bouppteckningen till Skatteverket eller lämna in den digitalt via Mina sidor på skatteverket.se." }
      },
      {
        "@type": "Question",
        "name": "Vilken tingsrätt gäller om delägare inte är överens?",
        "acceptedAnswer": { "@type": "Answer", "text": "Behörig tingsrätt är den där den avlidne var folkbokförd. Vilken tingsrätt det är för ${c.name} hittar du på domstol.se — det är dit ni vänder er om boutredningsman behöver utses eller om tvist uppstår." }
      },
      {
        "@type": "Question",
        "name": "Hur ser tidsgränserna ut?",
        "acceptedAnswer": { "@type": "Answer", "text": "Förrättningen ska hållas inom 3 månader från dödsfallet. Bouppteckningen ska lämnas in till Skatteverket inom 1 månad efter förrättningen." }
      },
      {
        "@type": "Question",
        "name": "Behöver man jurist för bouppteckning?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nej, det finns inget krav på jurist. Skatteverkets blankett SKV 4600 är gratis och du kan göra bouppteckningen själv. Är boet komplicerat (fastighet, flera särkullbarn, konflikt eller utländska tillgångar) är jurist eller begravningsbyrå att rekommendera." }
      }
    ]
  }
  </script>
</head>
<body>
  <nav class="seo-nav">
    <span class="logo-text">Efterplan</span>
    <a href="/" class="btn-primary">Skapa din plan →</a>
  </nav>

  <main class="seo-main">
    <article class="seo-article">
      <h1>Bouppteckning i ${c.name}</h1>

      <p>Bouppteckning är inte annorlunda i ${c.name} än någon annanstans i Sverige — samma blankett, samma tidsgränser, samma centrala handläggning hos Skatteverket. Den här sidan samlar vad som gäller om dödsfallet skedde i ${c.name} eller om dödsboet finns här.</p>

      <h2>Det viktigaste först</h2>
      <ul>
        <li><strong>Tidsgräns för förrättning:</strong> inom 3 månader från dödsfallet.</li>
        <li><strong>Tidsgräns för inlämning:</strong> inom 1 månad efter förrättningen.</li>
        <li><strong>Inlämning:</strong> centralt till Skatteverket — inte i ${c.name}. Digitalt via Mina sidor på skatteverket.se eller via post.</li>
        <li><strong>Blankett:</strong> SKV 4600 (gratis från Skatteverket).</li>
        <li><strong>Lokal tingsrätt:</strong> slå upp behörig tingsrätt för ${c.name} på <a href="https://www.domstol.se" rel="noopener">domstol.se</a>.</li>
      </ul>

      <h2>Tre vägar att göra bouppteckning</h2>

      <h3>1. Helt själv</h3>
      <p>Ladda ner Skatteverkets blankett SKV 4600, samla in tillgångar och skulder per dödsdagen, kalla delägare och förrätta mötet. Lämna in själv via Mina sidor eller post. Bra för: små bo, få delägare, inga konflikter, ingen fastighet.</p>

      <h3>2. Mall + avstämning med jurist</h3>
      <p>Använd en bouppteckningsmall, gör grovjobbet själv, och låt en jurist granska innan inlämning. Många jurister i ${c.name} erbjuder fast pris för granskning utan att göra hela bouppteckningen. Bra för: mellanstort bo, trygghet utan att betala fullpris.</p>

      <h3>3. Helt via begravningsbyrå eller jurist</h3>
      <p>I ${c.name} finns både rikstäckande aktörer (Fonus, Memorial, Familjens Jurist, Lavendla) och lokala alternativ. Be om offert från flera — priserna varierar kraftigt beroende på dödsboets komplexitet. Bra för: stort bo, fastighet, sammansatta familjeförhållanden.</p>

      <h2>Vad du behöver samla ihop</h2>
      <ul>
        <li>Personbevis och dödsfallsintyg med släktutredning (Skatteverket)</li>
        <li>Saldobesked från alla banker per dödsdagen</li>
        <li>Värdering av fastighet, bostadsrätt, bil och andra större tillgångar</li>
        <li>Sammanställning av skulder (lån, oreglerade räkningar)</li>
        <li>Försäkringsbesked (livförsäkring, TGL)</li>
        <li>Eventuellt testamente och äktenskapsförord</li>
      </ul>
      <p>Bankerna har särskilda dödsboenheter som hanterar de här ärendena. Kontaktnumret är samma 020-nummer oavsett vilket kontor som ligger närmast i ${c.name}.</p>

      <h2>Dödsboanmälan istället för bouppteckning?</h2>
      <p>Om dödsboet är litet — tillgångarna räcker bara till begravningen och eventuell hyresskuld — kan socialkontoret i ${c.name} kommun göra en dödsboanmälan istället. Det är gratis och betydligt enklare. Kontakta socialkontoret i ${c.name} kommun för bedömning.</p>

      <h2>Om delägarna inte är överens</h2>
      <p>Om dödsbodelägarna inte kan enas kan man ansöka hos behörig tingsrätt om att en boutredningsman utses. Det är en jurist som tar över förvaltningen tills bouppteckning och arvskifte är klara. Kostnaden betalas av dödsboet. Vilken tingsrätt som är behörig för ${c.name} ser du på <a href="https://www.domstol.se" rel="noopener">domstol.se</a>.</p>

      <h2>Vanliga frågor — ${c.name}</h2>

      <h3>Måste bouppteckningen göras i ${c.name}?</h3>
      <p>Nej. Bouppteckningen kan upprättas var som helst i Sverige. Den lämnas in centralt till Skatteverket. Det praktiska är dock att hålla förrättningsmötet där delägarna lättast kan samlas — för många i ${c.name} blir det hemma, hos byrå, eller hos jurist.</p>

      <h3>Behöver man jurist?</h3>
      <p>Nej. Det är fullt möjligt att göra bouppteckning själv med Skatteverkets blankett. Jurist eller begravningsbyrå rekommenderas vid komplicerade bo (fastighet, flera särkullbarn, utländska tillgångar, konflikt).</p>

      <h3>Vad kostar det?</h3>
      <p>Att göra själv: gratis (förutom din tid). Att låta jurist eller byrå göra hela bouppteckningen: priserna varierar kraftigt beroende på dödsboets omfattning — be om offert från flera aktörer i ${c.name}.</p>

      <h2>Nästa steg</h2>
      <p>Med Efterplan får du en personlig checklista som håller koll på alla deadlines och dokument — så du inte behöver komma ihåg när bouppteckningen ska vara klar eller vad du har skickat in.</p>

      <div class="seo-cta">
        <p>Få en personlig dödsbo-plan anpassad för din situation</p>
        <a href="/" class="btn-primary">Skapa din Efterplan →</a>
      </div>

      <h2>Läs vidare</h2>
      <ul>
        <li><a href="/bouppteckning-guide.html">Bouppteckning — komplett guide</a></li>
        <li><a href="/bouppteckning-tidslinje.html">Bouppteckning — tidslinje och deadlines</a></li>
        <li><a href="/boutredningsman.html">Boutredningsman — när och varför</a></li>
        <li><a href="/vad-gora-nar-nagon-dor.html">Vad gör man när någon dör?</a></li>
        <li><a href="/dodsfallsintyg-${c.slug}.html">Dödsfallsintyg i ${c.name}</a></li>
      </ul>
    </article>
  </main>

  <footer class="seo-footer">
    <p>© 2026 Efterplan · <a href="/">Tillbaka till appen</a> · <a href="/om.html">Om</a> · Ej juridisk rådgivning</p>
    <p class="seo-footer-links">
      <a href="./bouppteckning-guide.html">Bouppteckning guide</a> &nbsp;·&nbsp;
      <a href="./checklista-dodsbo.html">Checklista dödsbo</a> &nbsp;·&nbsp;
      <a href="./arvskifte-guide.html">Arvskifte</a> &nbsp;·&nbsp;
      <a href="./hjalp-med-dodsbo.html">Hjälp med dödsbo</a>
    </p>
  </footer>
</body>
</html>
`;
}

function dodsfallsintygPage(c) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dödsfallsintyg ${c.name} — så beställer du från Skatteverket 2026 | Efterplan</title>
  <meta name="description" content="Dödsfallsintyg i ${c.name}: hur du beställer från Skatteverket, vad det innehåller och när du behöver släktutredning. Steg-för-steg från Efterplan.">
  <link rel="canonical" href="https://efterplan.se/dodsfallsintyg-${c.slug}.html">
  <meta property="og:title" content="Dödsfallsintyg ${c.name} — beställa 2026">
  <meta property="og:description" content="Praktisk guide för dödsfallsintyg i ${c.name}: beställning och vad du behöver.">
  <meta property="og:url" content="https://efterplan.se/dodsfallsintyg-${c.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://efterplan.se/og.png">
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="style-tokens.css?v=5">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-T1T40TYPQB"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-T1T40TYPQB');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Dödsfallsintyg ${c.name} — beställa 2026",
    "inLanguage": "sv",
    "datePublished": "${TODAY}",
    "dateModified": "${TODAY}",
    "author": { "@type": "Organization", "name": "Efterplan", "url": "https://efterplan.se" },
    "publisher": { "@type": "Organization", "name": "Efterplan", "url": "https://efterplan.se" },
    "image": "https://efterplan.se/og.png",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://efterplan.se/dodsfallsintyg-${c.slug}.html" },
    "about": { "@type": "Place", "name": "${c.name}, ${c.lan}" }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Var beställer man dödsfallsintyg i ${c.name}?",
        "acceptedAnswer": { "@type": "Answer", "text": "Dödsfallsintyg beställs från Skatteverket — antingen via Mina sidor på skatteverket.se med BankID, via telefon till Skatteverkets servicecenter, eller via post. Det skickas hem till dig, så du behöver inte besöka ett kontor i ${c.name}." }
      },
      {
        "@type": "Question",
        "name": "Vad kostar ett dödsfallsintyg?",
        "acceptedAnswer": { "@type": "Answer", "text": "Dödsfallsintyget är gratis från Skatteverket. Var skeptisk mot tredjepartstjänster som tar betalt för att hjälpa dig beställa." }
      },
      {
        "@type": "Question",
        "name": "Behöver jag dödsfallsintyg med släktutredning?",
        "acceptedAnswer": { "@type": "Answer", "text": "Ja, för bouppteckning och kontakt med banker och försäkringsbolag behöver du varianten med släktutredning. Be uttryckligen om den när du beställer." }
      },
      {
        "@type": "Question",
        "name": "Vem får beställa dödsfallsintyg?",
        "acceptedAnswer": { "@type": "Answer", "text": "Dödsbodelägare (efterlevande make/maka, barn, syskon eller andra arvingar) får beställa. Begravningsbyrån som anlitats kan också beställa å dödsboets vägnar. Fråga byrån innan du beställer själv så det inte blir dubbelt." }
      },
      {
        "@type": "Question",
        "name": "Vad är skillnaden mot dödsbevis?",
        "acceptedAnswer": { "@type": "Answer", "text": "Dödsbeviset utfärdas av läkaren som konstaterar dödsfallet och används mellan vård och Skatteverket. Dödsfallsintyget är det du visar för banker, försäkringsbolag och andra som behöver bevis för att kunna agera å dödsboets vägnar." }
      }
    ]
  }
  </script>
</head>
<body>
  <nav class="seo-nav">
    <span class="logo-text">Efterplan</span>
    <a href="/" class="btn-primary">Skapa din plan →</a>
  </nav>

  <main class="seo-main">
    <article class="seo-article">
      <h1>Dödsfallsintyg i ${c.name}</h1>

      <p>Dödsfallsintyg med släktutredning är det grundläggande dokumentet du behöver för att kunna agera å dödsboets vägnar — banker, försäkringsbolag och Skatteverket kräver det. Här är vad som gäller om dödsfallet skedde i ${c.name} eller om dödsboet finns här.</p>

      <h2>Tre sätt att beställa</h2>
      <ol>
        <li><strong>Digitalt med BankID</strong> — logga in på Mina sidor på skatteverket.se → "Beställ intyg" → välj "Dödsfallsintyg med släktutredning". Snabbast.</li>
        <li><strong>Telefon</strong> — ring Skatteverkets servicecenter. Säg att du behöver dödsfallsintyg med släktutredning, ha personnummer på den avlidne redo.</li>
        <li><strong>Via begravningsbyrå</strong> — i ${c.name} hanterar de flesta byråer beställningen som standard. Fråga innan du beställer själv så det inte blir dubbelt.</li>
      </ol>

      <h2>Vad står det i intyget?</h2>
      <ul>
        <li>Personuppgifter om den avlidne (namn, personnummer, dödsdatum)</li>
        <li>Civilstånd vid dödsfallet</li>
        <li>Släktutredning: alla efterlevande arvingar enligt folkbokföringen</li>
        <li>Eventuell make/maka och deras barn (för att kontrollera särkullbarn)</li>
      </ul>

      <h2>Vilka behöver kopia av intyget?</h2>
      <p>Räkna med att behöva flera kopior. Vanliga mottagare:</p>
      <ul>
        <li>Banker där den avlidne hade konto</li>
        <li>Försäkringsbolag (livförsäkring, hemförsäkring, pensionsförsäkring)</li>
        <li>Pensionsmyndigheten (om pension utbetalades)</li>
        <li>Försäkringskassan (om bidrag utbetalades)</li>
        <li>Arbetsgivaren (för TGL och slutlön)</li>
        <li>Hyresvärd eller bostadsrättsförening i ${c.name}</li>
        <li>Begravningsbyrå</li>
        <li>Jurist eller revisor som anlitas för bouppteckning</li>
      </ul>
      <p>Du kan beställa flera kopior samtidigt — det kostar inget extra.</p>

      <h2>Kostnad — alltid gratis</h2>
      <p>Skatteverkets dödsfallsintyg är kostnadsfritt. Inga avgifter för intyget, släktutredningen eller leveransen. Var skeptisk mot tredjepartstjänster som tar betalt för att "hjälpa" dig beställa — det är inget komplicerat och inget du behöver betala för i ${c.name}.</p>

      <h2>Skillnaden mot dödsbevis</h2>
      <p>Dödsbeviset utfärdas av läkaren som konstaterar dödsfallet och används internt mellan vård och Skatteverket. Det är inte samma sak som dödsfallsintyget. När du i ${c.name} behöver visa upp papper för banken eller försäkringsbolag — det är dödsfallsintyget med släktutredning som efterfrågas.</p>

      <h2>Vanliga frågor — ${c.name}</h2>

      <h3>Måste jag ha BankID?</h3>
      <p>Nej. Du kan ringa Skatteverket och beställa muntligt. BankID är snabbare och fungerar dygnet runt, men inte ett krav.</p>

      <h3>Får jag intyget om jag inte är dödsbodelägare?</h3>
      <p>Endast dödsbodelägare och de med fullmakt får beställa. Är du inte direkt arvinge men hjälper familjen i ${c.name}, be en delägare beställa eller skriva fullmakt till dig.</p>

      <h3>Vad gör jag om något är fel i släktutredningen?</h3>
      <p>Kontakta Skatteverket direkt — släktutredningen baseras på folkbokföringen. Om någon arvinge saknas eller står fel, behöver det rättas innan bouppteckning kan göras.</p>

      <h2>Nästa steg</h2>
      <p>När dödsfallsintyget kommit börjar arbetet på riktigt. Med Efterplan får du en personlig checklista som håller ordning på vad som skickats vart, vilka som ska kontaktas, och när bouppteckningen behöver vara klar.</p>

      <div class="seo-cta">
        <p>Få en personlig dödsbo-plan med påminnelser och deadline-koll</p>
        <a href="/" class="btn-primary">Skapa din Efterplan →</a>
      </div>

      <h2>Läs vidare</h2>
      <ul>
        <li><a href="/dodsfallsintyg.html">Dödsfallsintyg — komplett guide</a></li>
        <li><a href="/vad-gora-nar-nagon-dor.html">Vad gör man när någon dör?</a></li>
        <li><a href="/bouppteckning-${c.slug}.html">Bouppteckning i ${c.name}</a></li>
        <li><a href="/bankkonto-dodsfall.html">Bankkonto vid dödsfall</a></li>
        <li><a href="/hjalp-med-dodsbo.html">Hjälp med dödsbo</a></li>
      </ul>
    </article>
  </main>

  <footer class="seo-footer">
    <p>© 2026 Efterplan · <a href="/">Tillbaka till appen</a> · <a href="/om.html">Om</a> · Ej juridisk rådgivning</p>
    <p class="seo-footer-links">
      <a href="./dodsfallsintyg.html">Dödsfallsintyg guide</a> &nbsp;·&nbsp;
      <a href="./checklista-dodsbo.html">Checklista dödsbo</a> &nbsp;·&nbsp;
      <a href="./bouppteckning-guide.html">Bouppteckning</a> &nbsp;·&nbsp;
      <a href="./hjalp-med-dodsbo.html">Hjälp med dödsbo</a>
    </p>
  </footer>
</body>
</html>
`;
}

let written = 0;
for (const c of cities) {
  const bp = path.join(ROOT, `bouppteckning-${c.slug}.html`);
  const dp = path.join(ROOT, `dodsfallsintyg-${c.slug}.html`);
  fs.writeFileSync(bp, bouppteckningPage(c));
  fs.writeFileSync(dp, dodsfallsintygPage(c));
  written += 2;
}
console.log(`Wrote ${written} pages for ${cities.length} cities.`);
