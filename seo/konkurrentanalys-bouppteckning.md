# Konkurrentanalys — sökterm "bouppteckning"

**Datum:** 2026-05-17
**Vår sida:** /bouppteckning-guide.html
**Mål:** identifiera gap mot top-rankande sidor och utforma offensiv för position 1–3.

> Det här dokumentet är en **mall + analysram** — siffrorna för SERP-positioner, ordantal, internlänkprofiler och FAQ-räkningar för konkurrenter är **inte ifyllda**. De måste hämtas genom faktisk SERP-koll och Ahrefs/Semrush eller manuell observation innan analysen är fullständig.

---

## Steg 1 — Identifiera top 5 SERP (att fylla i)

Gör en mobil sökning på "bouppteckning" från Sverige, ej inloggad, inkognitoläge. Notera de 5 första organiska resultaten:

| Pos | Domän | URL | Format (informativ/transaktionell) | Anteckning |
|-----|-------|-----|------------------------------------|------------|
| 1 | _att fylla i_ | | | |
| 2 | _att fylla i_ | | | |
| 3 | _att fylla i_ | | | |
| 4 | _att fylla i_ | | | |
| 5 | _att fylla i_ | | | |

Sannolika kandidater att kontrollera: skatteverket.se, fonus.se, lavendla.se, familjensjurist.se, juridiskdokument.se, advokatbyra.se, lawline.se, 1177.se. Verifiera vilka som faktiskt rankar.

## Steg 2 — Innehållsdjup (att fylla i)

För varje top-5 sida, mät:

| Element | Skatteverket | Fonus | Lavendla | Familjens Jurist | Annan | **Efterplan** |
|---------|--------------|-------|----------|------------------|-------|---------------|
| Ord på sidan | | | | | | _kör wc-w på vår HTML_ |
| FAQ-schema (antal frågor) | | | | | | 6 |
| Article-schema | | | | | | Ja |
| HowTo-schema | | | | | | Nej |
| Kostnadstabell | | | | | | Ja |
| Tidslinje | | | | | | Egen sida |
| Lokalt fokus | | | | | | Stadsidor (T118) |
| Video/visuell | | | | | | Nej |
| Internlänkar ut | | | | | | _räkna_ |
| Internlänkar in (från egen domän) | | | | | | _räkna med Ahrefs_ |

Verktyg att fylla i tabellen:
- Manuell ord-räkning (kopiera huvudtext till word-counter)
- View source → räkna FAQPage entries
- Ahrefs Site Explorer för internlänk-profil (kräver betalkonto)
- Eller: enkel `curl + grep` för utgående länkar

## Hypoteser om gap (att verifiera mot faktiska konkurrentsidor)

### Hypotes 1 — Emotionellt ingångsmoment

**Antagande att verifiera:** konkurrenter öppnar med torr juridisk definition. Om det stämmer kan vi differentiera med emotionellt hook.

**Vår vinkel (förslag):** öppna med en mening som validerar känslan, INTE byråkratin.

> "Bouppteckning är ett av de svåraste pappersarbete du gör — inte för att det är komplicerat, utan för att det kräver att du går igenom allt din mamma, pappa eller partner hade kvar i livet. Den här guiden tar dig igenom det, steg för steg, i din egen takt."

**Hur testas:** kolla openings på top 5. Om 3+ av 5 börjar med "En bouppteckning är..." är hypotesen bekräftad.

### Hypotes 2 — Digital administration

**Antagande att verifiera:** ingen av top 5 nämner att bouppteckning idag innebär att man också måste hantera digitala konton (Mobilt BankID, Swish, Spotify, Facebook, etc.).

**Vår vinkel:** dedikerat H2 "Bouppteckning i en digital ålder — kontona och tillgångarna som inte syns" + länk till befintliga /digital-dodsbo.html.

**Hur testas:** ctrl+F "digital", "konton", "Spotify", "Facebook" på top 5-sidor. Om 0 träffar är hypotesen bekräftad.

### Hypotes 3 — Saknade FAQ-frågor

Frågor som **kan** ha sökvolym och **kan** saknas i konkurrenters FAQ-schema (verifiera i GSC + faktiska sidor):

1. Måste alla dödsbodelägare vara med på bouppteckningen?
2. Vad händer om man inte gör bouppteckning i tid?
3. Kan man göra bouppteckning utan jurist?
4. Vad kostar en bouppteckning hos olika aktörer? (jämförelse-vinkel)
5. Hur lång tid tar en bouppteckning i praktiken?
6. Vem ärver om det inte finns testamente?
7. Måste bouppteckningen registreras hos Skatteverket?
8. Vad är en dödsboanmälan och när räcker det istället för bouppteckning?

Om de visar sig sakna hos konkurrenter och ha sökvolym → lägg till alla 8 i vår FAQPage-schema.

### Hypotes 4 — Komparativ jämförelse (jurist vs. egen)

**Antagande att verifiera:** Lavendla och Familjens Jurist tonar ner "gör själv"-alternativet eftersom de säljer juristtjänst.

**Vår vinkel (vi är neutrala):**

```
Tre vägar att göra bouppteckning — vilken passar dig?

| Väg              | Tidsåtgång  | Risk för fel | Lämplig när                          |
|------------------|-------------|--------------|--------------------------------------|
| Helt själv       | 15–30 h     | Hög          | Litet bo, få delägare, du har tid    |
| Med mall + jurist på avstämning | 8–15 h | Låg-medium | Mellanstort bo, vill ha trygghet     |
| Helt via byrå    | 1–3 h       | Mycket låg   | Stort bo, fastighet, konflikter      |
```

Kostnadskolumner är medvetet utelämnade — fyll i bara om du har aktuella, verifierade prisuppgifter från offerter, annars riskerar tabellen att åldras snabbt och förvränga.

### Hypotes 5 — Internlänkprofil

**Antagande att verifiera:** Vår sida har för få inkommande internlänkar med variation av anchor text. Kontrollera med:

```
grep -l 'bouppteckning-guide.html' *.html
grep -l 'bouppteckning' *.html | xargs grep 'bouppteckning-guide'
```

Sidor som **bör** länka till /bouppteckning-guide.html (verifiera om de redan gör det):
- /vad-gora-nar-nagon-dor.html
- /checklista-dodsbo.html
- /dodsbo-checklista-7-dagar.html
- /arvskifte-guide.html
- /dodsbo-fastighet.html
- /sambo-arv.html
- /sarkullbarn.html
- /laglott.html
- /boutredningsman.html
- Alla 20 stadsidor `/bouppteckning-[stad].html` ✔ (T118)
- /hjalp-med-dodsbo.html ✔ (T119)

Mål: minst 10 inkommande internlänkar med varierad anchor text.

---

## Konkret arbetslista för faktisk analys

1. Sök "bouppteckning" på Google.se (mobil, inkognito) — notera top 5 organiska
2. För varje top-5: räkna ord, ctrl+F för "digital"/"konton", räkna FAQ-entries i source
3. Sätt ihop tabellen i Steg 1 + Steg 2 ovan med faktisk data
4. Bekräfta eller falsifiera Hypotes 1–5
5. Skriv om denna fil med datum "Verifierad YYYY-MM-DD" och faktiska siffror
6. Producera 7-punkts åtgärdslista med effort/effekt-bedömning baserat på verklig data

Steg 1–5 tar uppskattningsvis 2–3 timmars fokustid.

---

## Vad ska INTE finnas i den färdiga analysen

- Påhittade sökvolymer från träningskännedom
- Påhittade ordräkningar för konkurrenter
- Påhittade SERP-positioner
- Statistik om "den genomsnittlige svensken" utan citerbar källa
- Prisuppgifter utan ursprung/datum

Allt sådant raderades 2026-05-17 efter att första versionen visat sig innehålla fabricerad data.
