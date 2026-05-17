# Content brief — "vad gör man när någon dör"

**URL:** /vad-gora-nar-nagon-dor.html (befintlig sida, optimeras)
**Primärt nyckelord:** vad gör man när någon dör
**Sekundära:** vad ska man göra när någon dör, första steget när någon dör, någon har dött vad gör jag, anhörig har dött vad gör jag

> Sökvolym och konkurrens kräver Ahrefs/Semrush eller GSC-data för att kvantifieras. Den här briefen tar inte ställning till volymer — verifiera mot egen data innan prioritering.

**Mål:** featured snippet ("0-position") för listfrågan + ranking 1–3.

---

## Sökintention (hypotes)

Användaren är i akut chock eller akut osäkerhet. Söker:
1. **Lugnande validering** — "är det här normalt?"
2. **Praktisk steg-för-steg** — vad ska jag göra FÖRST, vem ringer jag?
3. **Tidskänsla** — vad är akut och vad kan vänta?
4. **Skuldfrihet** — får jag göra detta? får jag göra fel?

Detta är inte en transaktionell sökning men leder till en. Användaren konverterar när de förstår att de behöver hålla reda på 40+ kontakter, dokument, deadlines. Hypotesen bör testas med GSC-data (CTR + impressions för relaterade frågor).

## Sökfraser att täcka (intentionsmappning)

| Sökfras | Avsikt |
|---------|--------|
| vad gör man när någon dör | Informativ, akut |
| vad ska man göra när någon dör | Samma, formellare |
| första steget när någon dör | Specifik, action |
| någon har dött vad gör jag | Akut, personlig |
| min mamma har dött vad gör jag | Akut, känsla |
| min pappa har dött vad gör jag | Akut, känsla |
| vad händer när någon dör hemma | Subset, ovan situation |
| vad gör man när någon dör på sjukhus | Subset, lugnare |

Prioritetsordning sätts utifrån GSC impressions + clicks när data finns.

## Featured snippet — target

Vi siktar på **list snippet** (10 steg) eftersom det matchar intentionen. Verifiera först vilken snippet-typ Google visar idag genom faktisk SERP-koll.

**Snippet-format att eftersträva:**
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

Lägg till fyra nya entries i befintligt FAQPage-script:

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
  "acceptedAnswer": { "@type": "Answer", "text": "Kontakta först svensk ambassad eller konsulat i landet — de hjälper med dokument och hemförsel. En begravningsbyrå i Sverige kan koordinera transporten. Kostnaden för hemförsel kan vara betydande och varierar kraftigt — kontrollera reseförsäkring och tjänstereseförsäkring först." }
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

Använd `rel="noopener"` på externa länkar.

## Tekniska förbättringar

1. **dateModified** i Article-schema → uppdatera vid varje content-ändring
2. **HowTo-schema** ovanför FAQPage-schema med 10-stegslistan (möjlig rich result)
3. **SpeakableSpecification** — för röstsökning (om Google fortfarande stödjer det när det implementeras)
4. **Image alt-text** — om bilder tillkommer, måste beskriva känslan, inte bara objektet

## Mätbart mål (90 dagar)

Mål bör formuleras mot GSC-baseline. Definiera baseline FÖRST genom att kolla:
- Genomsnittlig position för primärt nyckelord (idag)
- CTR från SERP
- Impressions/månad

Sedan sätt mål: position +3, CTR +50%, impressions +X%. Utan baseline är målen meningslösa.

## Tonläge

Inte säljig. Inte expertis-distanserad. Tonen är **vän som råkar veta** — "det är okej att inte veta vad man gör nu". Undvik klyschor som "att förlora någon är aldrig lätt". Var konkret: ringa, säkra, eftersända.

Verb i imperativ när det handlar om action. Du-form genomgående. Korta meningar — användaren är i kognitiv belastning.

## Konkurrentbevakning

Aktörer som troligen rankar för termen (bör verifieras manuellt via Google):

- **fonus.se** — begravningsbyrå-kedja
- **lavendla.se** — begravningsbyrå + jurist
- **familjensjurist.se** — juristbyrå
- **1177.se** — myndighetssajt (vårdguide)
- **skatteverket.se** — myndighet

Övervaka månadsvis: titel, H2, snippet-format. Notera ändringar i `seo/serp-log.md` när den filen skapas.
