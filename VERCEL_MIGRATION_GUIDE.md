# Migrera från Netlify till Vercel - Steg-för-steg guide

## Steg 1: Skapa Vercel-konto (om du inte har ett)
1. Gå till https://vercel.com
2. Klicka **"Sign Up"**
3. Välj **"Continue with GitHub"** (enklast, då du redan har GitHub)
4. Godkänn åtkomst

## Steg 2: Länka ditt GitHub-repo till Vercel
1. Logga in på https://vercel.com/dashboard
2. Klicka **"New Project"**
3. Under "Import Git Repository", sök efter: **Closure** (eller **joju91/Closure**)
4. Klicka **"Import"**

Vercel läser automatiskt `vercel.json` och är nästan klar!

## Steg 3: Konfigurera domäner i Vercel
1. I Vercel Dashboard, gå till ditt projekt **Closure**
2. Välj fliken **"Settings"** (överst)
3. Välj **"Domains"** i vänster meny
4. Du ser redan `efterplan.se` och `www.efterplan.se` listade (Vercel detekterade dem)
5. Klicka på **`efterplan.se`** → Du ser DNS-instruktioner
6. **Kopiera de DNS-värden som Vercel visar** (du behöver dem i nästa steg)

## Steg 4: Uppdatera DNS-inställningar
DNS är som "telefonbok" för internet - den säger åt internetleverantörer var `efterplan.se` är hosted.

**Var är din domänregistrar?** (Se din email-kvitto när du köpte domänen)
- Namecheap
- GoDaddy
- One.com
- Loopia
- Annan?

**Om du inte vet:** Klicka här och sök `efterplan.se`: https://www.whois.com/

### Exempel: Om du använder **One.com** (vanligt i Sverige):

1. Logga in på https://one.com
2. Gå till **"Domäner"** → **"efterplan.se"**
3. Klicka **"Hantera DNS"**
4. **Radera gamla Netlify-poster** (om de finns):
   - Sök efter poster som säger `netlify` eller `netli`
   - Ta bort dem
5. **Lägg till nya Vercel-poster:**
   - Vercel visar något som: **`76.76.19.0`** (A record) eller **`cname.vercel.com`** (CNAME)
   - Kopiera exakt vad Vercel säger och lägg in i One.com
6. **Spara** och vänta 15-30 minuter (DNS propagerar)

**Om du använder en annan registrar:** Kontakta deras support eller säg till - guiden är likadan, bara gränssnittet är annorlunda.

## Steg 5: Vänta på att domänen kopplas
1. Gå tillbaka till Vercel Dashboard
2. Under **Domains** för `efterplan.se`, vänta på att status ändras från:
   - ❌ "Pending Verification" → ✅ "Valid"
3. Detta tar vanligtvis **10-30 minuter**
4. Du kan uppdatera sidan några gånger för att kolla status

## Steg 6: Verifiera att sajten fungerar
1. Vänta tills `efterplan.se` visar ✅ **Valid** i Vercel
2. Öppna https://efterplan.se i webbläsaren
3. Sajten bör ladda normalt
4. Testa en länk, t.ex. https://efterplan.se/vad-gora-nar-nagon-dor
   - Den bör fungera (thanks till `vercel.json` rewrite-reglerna)

## Steg 7: Avbryt Netlify-prenumerationen
1. Logga in på https://app.netlify.com
2. Gå till ditt webbställe **Closure**
3. Klicka **"Site Settings"** → **"General"** → **"Delete site"** (eller bara ignorera om det är gratis)
4. Eller gå till ditt Netlify-konto **Settings** → **Billing** och avbryt prenumerationen

## Steg 8: Uppdatera sökmotorer (Google, Bing)
Google och Bing behöver veta att sajten är på Vercel nu.

1. Gå till https://search.google.com/search-console
2. Öppna egenskapen för `efterplan.se`
3. Gå till **Settings** → **Change of address**
4. Säg åt Google: "Vi byter från `efterplan.netlify.app` till `efterplan.se`"
5. Google cacheraras automatiskt

## ⚠️ Vanliga problem

### "Domänen visar inte min sajt"
- Har du väntat 30 minuter? DNS tar tid
- Testa: `nslookup efterplan.se` i terminal - det ska visa Vercel's IP

### "Gamla Netlify-DNS poster finns kvar"
- Gå till registraren och radera alla `netlify.app` poster
- Lägg bara in Vercel's poster

### "Vercel säger domänen är redan använd"
- Du har kanske lagt den på två ställen i Vercel eller på Netlify och Vercel
- Radera den från båda, vänta 5 min, lägg bara in på Vercel

## ✅ Du är klar när:
- ✓ Repo är importerat i Vercel
- ✓ `efterplan.se` visar ✅ Valid i Vercel Domains
- ✓ Du kan besöka https://efterplan.se och se sajten
- ✓ Netlify är avslutad
- ✓ Google Search Console är uppdaterad

**Frågor?** Säg till - jag kan guida steg för steg!
