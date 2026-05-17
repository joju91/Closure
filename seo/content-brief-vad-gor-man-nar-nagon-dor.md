# Content brief — "vad gör man när någon dör"

**URL:** /vad-gora-nar-nagon-dor.html (befintlig sida, optimeras)
**Primärt nyckelord:** vad gör man när någon dör
**Sekundära:** vad ska man göra när någon dör, första steget när någon dör, någon har dött vad gör jag, anhörig har dött vad gör jag
**Sökvolym (uppskattad):** 1 900–3 600/mån (säsongsvariation runt jul/påsk)
**Konkurrens:** medium — domineras av begravningsbyråer (Fonus, Lavendla, Familjens Jurist) + 1177
**Mål:** featured snippet ("0-position") för listfrågan + ranking 1–3

---

## Sökintention

Användaren är i akut chock eller akut osäkerhet. Söker:
1. **Lugnande validering** — "är det här normalt?"
2. **Praktisk steg-för-steg** — vad ska jag göra FÖRST, vem ringer jag?
3. **Tidskänsla** — vad är akut och vad kan vänta?
4. **Skuldfrihet** — får jag göra detta? får jag göra fel?

Detta är inte en transaktionell sökning men leder till en. Användaren konverterar när de förstår att de behöver hålla reda på 40+ kontakter, dokument, deadlines.

## Sökfras-varianter att täcka

| Sökfras | Volym | Avsikt |
|---------|-------|--------|
| vad gör man när någon dör | 1900 | Informativ, akut |
| vad ska man göra när någon dör | 880 | Samma, formellare |
| första steget när någon dör | 320 | Specifik, action |
| någon har dött vad gör jag | 260 | Akut, personlig |
| min mamma har dött vad gör jag | 170 | Akut, känsla |
| min pappa har dött vad gör jag | 140 | Akut, känsla |
| vad händer när någon dör hemma | 590 | Subset, ovan situation |
| vad gör man när någon dör på sjukhus | 210 | Subset, lugnare |

## Featured snippet — target

Google visar idag en paragraph snippet från Fonus. Vi siktar på **list snippet** (10 steg) eftersom det matchar intentionen bättre och vi har den listan på sidan idag (rad 126–137).

**Snippet-format Google ska lyfta:**
```
De viktigaste stegen när någon dör:
1. Kontakta läkare (112 eller 1177)
2. Ring en begravningsbyrå
3. Meddela närmaste anhöriga
4. Säkra nycklar och eftersänd post
5. Beställ dödsfallsintyg från Skatteverket
6. Kontakta banken
7. Kontakta arbetsgivare och försäkringsbolag
8. Kontakta Försäkringskassan
9. Planera bouppteckning (inom 3 månader)
10. Avsluta abonnemang
```

För att vinna snippeten: H2 ovanför listan måste lyda **"Vad ska man göra när någon dör? — 10 steg i rätt ordning"**, och listan måste ligga direkt under H2 utan paragraf emellan.

## H2/H3-struktur (rekommenderad)

```
H1: Vad gör man när någon dör? (behåll)
  H2: Vad ska man göra när någon dör? — 10 steg i rätt ordning  ← NY, snippet-targeting
    ol med 10 steg (flytta upp den befintliga listan)
  H2: Ring rätt nummer — 112 eller 1177?  (behåll)
  H2: Kontakta en begravningsbyrå  (behåll)
  H2: Meddela närstående  (behåll)
  H2: Säkra nycklar och eftersänd post  (behåll)
  H2: Vad händer sen?  (behåll)
  H2: Vad händer med den avlidnes skulder?  (behåll)
  H2: Vem kontaktar vad — och i vilken ordning?  (behåll, tabell)
  H2: Vanliga frågor  (utöka — se nedan)
    H3: Vad är skillnaden mellan dödsbevis och dödsfallsintyg?
    H3: Hur snabbt måste man göra något?
    H3: Ärver man skulder?
    H3: Vad händer om någon dör hemma?           ← NY
    H3: Vad händer om någon dör utomlands?       ← NY (länk till begravning-utomlands.html)
    H3: Vem får agera å dödsboets vägnar?         ← NY
    H3: Vad gör man om man inte hittar testamente? ← NY
```

## FAQ-schema att lägga till

Lägg till fyra nya entries i befintligt FAQPage-script (rad 39–66):

```json
{
  "@type": "Question",
  "name": "Vad händer om någon dör hemma?",
  "acceptedAnswer": { "@type": "Answer", "text": "Ring 1177 om dödsfallet var väntat och en läkare varit inblandad i vården. Ring 112 om det är oväntat eller om du är osäker. En läkare måste konstatera dödsfallet och utfärda dödsbevis innan kroppen kan flyttas. Begravningsbyrån hämtar därefter kroppen — du behöver inte göra det själv." }
},
{
  "@type": "Question",
  "name": "Vem får agera å dödsboets vägnar?",
  "acceptedAnswer": { "@type": "Answer", "text": "Endast dödsbodelägare (oftast efterlevande make/maka och barn) eller någon med fullmakt från delägarna får företräda dödsboet. Innan bouppteckningen är klar krävs att alla delägare är överens om beslut som rör boets tillgångar." }
},
{
  "@type": "Question",
  "name": "Vad gör man om man inte hittar testamentet?",
  "acceptedAnswer": { "@type": "Answer", "text": "Sök igenom hemmet, bankfacket och kontakta eventuella jurister/begravningsbyråer den avlidne anlitat. Om testamente inte hittas fördelas arvet enligt ärvdabalkens regler. Ett testamente kan inte registreras officiellt i Sverige, så det är vanligt att det förvaras hemma eller hos en jurist." }
},
{
  "@type": "Question",
  "name": "Vad händer om någon dör utomlands?",
  "acceptedAnswer": { "@type": "Answer", "text": "Kontakta först svensk ambassad eller konsulat i landet — de hjälper med dokument och hemförsel. En begravningsbyrå i Sverige kan koordinera transporten. Räkna med 1–3 veckors väntan och 30 000–80 000 kr i transportkostnad, beroende på land och försäkringsskydd." }
}
```

## Interna länkar att lägga till

| Anchor | Mål-URL | Position |
|--------|---------|----------|
| dödsfallsintyg | /dodsfallsintyg.html | I H2 "Vad händer sen?" |
| bouppteckning | /bouppteckning-guide.html | I H2 "Vad händer sen?" |
| efterlevandepension | /efterlevandepension.html | I steg 8 |
| begravningsbyrå | /begravningsbyra.html | I H2 "Kontakta en begravningsbyrå" |
| dödsannons | /dodsannons.html | I H2 "Meddela närstående" |

## Externa länkar (citera myndighetskälla för E-E-A-T)

- `skatteverket.se/dodsfall` (dödsfallsintyg)
- `1177.se` (medicinska besked)
- `pensionsmyndigheten.se` (efterlevandepension)
- `forsakringskassan.se` (efterlevandestöd)

Använd `rel="noopener"` och förklara varför (E-E-A-T-signal till Google).

## Tekniska förbättringar

1. **dateModified** i Article-schema → uppdatera till 2026-05-17 (kommer triggas av denna optimering)
2. **Lägg till `priority="speakable"` SpeakableSpecification** — väntad sökning är röst ("Hej Google, vad gör jag när någon dör?")
3. **Lägg till HowTo-schema** ovanför FAQPage-schema med 10-stegslistan (kan vinna list snippet utöver FAQ rich result)
4. **Image alt-text** — om bilder tillkommer, måste beskriva känslan, inte bara objektet

## Mätbart mål (90 dagar)

- Position 1–3 för "vad gör man när någon dör" (idag: 5–8)
- Featured snippet vunnen (idag: Fonus)
- Click-through från SERP: +120% (från ~3% till ~6,5%)
- Engagement: time-on-page > 3 min, scroll-djup > 70%
- Konvertering (klick på "Skapa din plan"): > 4% av sidvisningar

## Tonläge

Inte säljig. Inte expertis-distanserad. Tonen är **vän som råkar veta** — "det är okej att inte veta vad man gör nu". Undvik klyschor som "att förlora någon är aldrig lätt". Var konkret: ringa, säkra, eftersända.

Verb i imperativ när det handlar om action. Du-form genomgående. Korta meningar — användaren är i kognitiv belastning.

## Konkurrentbevakning

- **fonus.se/vad-gor-man-vid-dodsfall** — kort, transaktionellt. Vi vinner på djup + emotionell ton.
- **lavendla.se/dodsfall/vad-gor-man** — bra struktur, men "ring oss"-tung. Vi vinner på neutralitet.
- **1177.se** — auktoritativ men byråkratisk. Vi vinner på praktisk klarhet.

Övervaka månadsvis: titel, H2, snippet-format. Notera ändringar i `seo/serp-log.md`.
