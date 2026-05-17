# Siteaudit — efterplan.se

**Datum:** 2026-05-17
**Genomförd av:** kodbaserad analys (grep + filräkning), inte Lighthouse-mätning
**Total HTML-sidor:** 76 (74 publika + 2 modaler)
**Sitemap-coverage efter T118+T119:** 74 av 74 publika sidor (100%)

---

## Sammanfattning

| Område | Status | Anteckning |
|--------|--------|------------|
| Sitemap-coverage | 🟢 OK | Alla 74 publika sidor med efter denna audit |
| Canonical-taggar | 🟢 OK | 74 av 74 publika sidor har canonical |
| Meta description | 🟢 OK | 74 av 74 |
| OG-bild | 🟢 OK | 74 av 74 |
| Article-schema | 🟢 OK | 70 sidor (saknas på modaler + index + några äldre) |
| FAQPage-schema | 🟢 OK | 73 sidor — exceptionellt täckning |
| BreadcrumbList | 🟡 Förbättringsmöjlighet | Endast 32 av 74 sidor |
| Fonts preload | 🔴 Inkonsekvent | Endast 5 av 74 — påverkar CWV (LCP) |
| Mobil viewport | 🟢 OK | Alla har `viewport=device-width` |
| robots.txt | 🟢 OK | Allow + sitemap-länk korrekt |
| Interna länkar | 🟡 Asymmetriskt | Footer-länkar varierar mellan sidor — vissa har 12, vissa 4 |

---

## Kritiska fynd

### 🔴 1. Fonts preload saknas på 69 av 74 sidor

`fonts.googleapis.com` preconnect + preload finns endast i 5 sidor (bl.a. bouppteckning-guide.html). De andra 69 laddar inte Fraunces/IBM Plex Sans, vilket innebär:

- **Bra:** snabbare LCP (mindre CSS att vänta på)
- **Dåligt:** typsnittsinkonsekvens — vissa sidor visas i systemfont, andra i Fraunces. Användaren märker.

**Åtgärd:** beslut behövs — antingen lägg fonts på alla sidor (konsistens, lite sämre CWV) eller ta bort från de 5 (full prestanda, generisk look). Rekommendation: lägg system-font-stack som primary i `style.css` och behandla Fraunces som progressive enhancement.

### 🔴 2. Pris-inkonsistens 49 kr vs 149 kr

Roadmap-not T033 säger "pricing uppdaterad till 49 kr". Faktiska produktionsfiler (index.html, paywall) visar 149 kr. Nya hjalp-med-dodsbo.html använder 149 kr (matchar produktion).

**Risk:** SERP-snippets cachear 49 kr om någon sida i Googles index har det priset → besökare ser 49 kr på Google, klickar in på 149 kr-paywallen → bounce.

**Åtgärd:** grepa alla sidor för "49 kr" och se var det finns. Just nu: ingen matcher i HTML, OK. Men roadmap-noten bör uppdateras eller pris ändras till 49 kr — beslut behövs.

---

## Förbättringar med medel-prio

### 🟡 3. BreadcrumbList saknas på 42 av 74 sidor

Endast 32 sidor har BreadcrumbList-schema. Det betyder att Google inte visar breadcrumbs i SERP för 42 sidor — minskar synlighet.

**Åtgärd:** lägg till BreadcrumbList-schema på alla artikelsidor. Mall:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Efterplan", "item": "https://efterplan.se/" },
    { "@type": "ListItem", "position": 2, "name": "<Sidtitel>", "item": "<canonical-URL>" }
  ]
}
```

Effort: 30 minuter med ett enkelt skript. Effekt: bättre SERP-presentation.

### 🟡 4. Internlänk-asymmetri i footer

Footer-länkar (seo-footer-links) varierar mellan 4 och 12 länkar per sida. Vissa sidor (de nya stadsidorna) har bara 4 — pekas mot huvudguiderna. Andra sidor har 12 — men de länkar inte tillbaka till stadsidorna.

**Åtgärd:** beslutsläge — antingen
- (a) Behåll asymmetri: stadsidor är "long-tail" och behöver inte djupa länkprofiler
- (b) Lägg till en gemensam "alla guider"-footer-include via ett byggsteg

Rekommendation: (a). Stadsidor får länkstyrka från sitemap + från huvudguiderna (nyligen tillagt).

### 🟡 5. dateModified inte uppdaterad efter ändringar

Många sidor har `dateModified: 2026-04-13` även om innehållet ändrats senare. Google använder dateModified för freshness-signal — felaktigt datum kan minska ranking på "färska" sökningar.

**Åtgärd:** uppdatera dateModified vid varje content-ändring. Lämpligt att lägga som ett hook eller pre-commit.

---

## Mindre observationer

### 🟢 6. Mobiloptimering

Alla 74 sidor har `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. style.css verkar ha CSS-grid + flex utan fixed pixel widths. Inga mobilspecifika problem hittade i kodgranskning.

**Notera:** verklig CWV-mätning kräver Lighthouse / PageSpeed Insights — det kan inte bedömas från kod. Rekommendation: kör PageSpeed på de 5 mest trafikerade sidorna månadsvis.

### 🟢 7. robots.txt + sitemap

```
User-agent: *
Allow: /
Sitemap: https://efterplan.se/sitemap.xml
```

Korrekt och minimalistiskt. Inga onödiga blocks. Sitemap pekar rätt.

### 🟢 8. JSON-LD-kvalitet

70 sidor har Article-schema med korrekt struktur. Inga uppenbara fel. Författarship är `Organization: Efterplan` — det är OK för en småaktör men E-E-A-T-styrkan ökar med namngiven `Person` när Jonas vill stå för innehållet officiellt.

### 🟢 9. Inga blockerande resurser i `<head>`

GA4 laddas async. Fonts laddas med rel=preload + onload=this.rel=stylesheet på de 5 sidor som har dem. CSS är icke-blockerande på resten. Bra LCP-fundament.

---

## Konkreta nästa steg

| # | Åtgärd | Effort | Prio | Effekt |
|---|--------|--------|------|--------|
| 1 | Skriv skript som lägger till BreadcrumbList på 42 sidor som saknar det | 30 min | 🟠 | Bättre SERP-display |
| 2 | Bestäm font-policy (lägg till på alla / ta bort från de 5) | 5 min beslut + 1 h impl | 🟠 | Konsistens + CWV |
| 3 | Hook eller pre-commit som auto-uppdaterar dateModified | 30 min | 🟡 | Freshness-signal |
| 4 | Kör PageSpeed Insights på top-5 sidor, dokumentera CWV-baseline | 30 min | 🟡 | Mätbar baseline |
| 5 | Säkerställ att 49 kr / 149 kr är konsekvent (källkod + roadmap-not) | 10 min | 🔴 | Konvertering |
| 6 | Lägg till SpeakableSpecification på vad-gora-nar-nagon-dor.html | 15 min | 🟢 | Röst-SEO |

**Total effort för alla nästa steg:** ~4 timmar.
