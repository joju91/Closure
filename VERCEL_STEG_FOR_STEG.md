# Vercel Migration - EXTREMT ENKEL GUIDE

Denna guide är för absoluta nybörjare. Varje steg är detaljerat.

---

## 🟢 DEL 1: SKAPA VERCEL-KONTO

### Steg 1.1 - Öppna webbläsaren
- Öppna en ny flik i din webbläsare
- Gå till: **https://vercel.com**
- Du ser en blå knapp som säger **"Sign Up"** eller **"Get Started"**

### Steg 1.2 - Registrera dig
1. Klicka den blå knappen **"Sign Up"** eller **"Get Started"**
2. Du ser flera alternativ. Klicka på: **"Continue with GitHub"**
   - (Du använder GitHub redan, så detta är enklast)
3. Du får en popup som säger: *"Verify it's you"*
4. Klicka **"Authorize Vercel"** (eller liknande)
5. **Du är nu inloggad på Vercel!**

---

## 🟢 DEL 2: IMPORTERA DITT GITHUB-REPO

### Steg 2.1 - Gå till Dashboard
- Du bör nu se Vercel Dashboard (startsidan)
- Om inte, gå till: **https://vercel.com/dashboard**

### Steg 2.2 - Skapa nytt projekt
1. Klicka på knappen **"Add New..."** (oftast överst)
2. Välj **"Project"**
3. Du ser nu: "Import Git Repository"
4. I sökrutan, skriva: **Closure**
5. Du bör se **"joju91/Closure"** dyka upp
6. Klicka på den

### Steg 2.3 - Importera projektet
1. Du ser nu en sida med projektalternativ
2. Du kan lämna allt som standard (ändra inget!)
3. Klicka på den blå knappen **"Import"** nederst

**NU VÄNTAR DU...**
- Vercel laddar ner ditt GitHub-repo
- Det tar ca 30-60 sekunder
- Du ser några laddningsanimationer

### Steg 2.4 - Projektet är klart
- Du bör se en grön bockmark ✅ och text som säger: *"Deployment Successful"*
- **Bra jobbat! Halvägs klar!**

---

## 🟢 DEL 3: KOPPLA DIN DOMÄN

### Steg 3.1 - Gå till domän-inställningar
1. Du är fortfarande på projektsidan
2. Överst, klicka på fliken **"Settings"**
3. I vänster meny, klicka på **"Domains"**

### Steg 3.2 - Lägg till din domän
1. Du ser en textfält som säger "Add Domain"
2. Skriv: **efterplan.se**
3. Klicka **"Add"**
4. Vercel kan säga något som "This domain is owned by..."
5. Svara **"Yes, I own this domain"** eller liknande

**NU KOMMER SUPERWIKTIGA DNS-INSTRUKTIONER**

### Steg 3.3 - LÄS DNS-INSTRUKTIONERNA
Du ser nu något som säger:
```
Nameserver Configuration (Recommended)

ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

ELLER:

```
CNAME Configuration

Name: efterplan.se
Type: CNAME
Value: cname.vercel.com
```

**KOPIERA DESSA VÄRDEN!**
- Markera texten
- Högerklicka → **"Copy"** (eller Ctrl+C)

---

## 🟢 DEL 4: UPPDATERA DIN DOMÄNREGISTRAR (One.com)

**Vad är detta?**
- Din domänregistrar är där du köpte domänen (exempel: One.com, GoDaddy)
- Där säger du åt internet: "Min domän pekar på Vercel nu"

### Steg 4.1 - Logga in på One.com
1. Öppna en ny webbläsarflik
2. Gå till: **https://one.com**
3. Klicka **"Log In"** (överst till höger)
4. Skriv din email och lösenord
5. Klicka **"Log In"**

### Steg 4.2 - Hitta domäninställningarna
1. Du ser nu One.com Dashboard
2. I vänster meny, klicka på **"Domäner"**
3. Du bör se en lista med dina domäner
4. Klicka på **"efterplan.se"**

### Steg 4.3 - Hantera DNS
1. Du är nu på din domäns sida
2. Sök efter en knapp eller länk som säger **"Hantera DNS"** eller **"DNS Settings"**
3. Klicka på den

**Du ser nu DNS-poster. De kan se komplicerade ut - det är okej!**

### Steg 4.4 - RADERA gamla Netlify-poster

**Innan du lägger in nya poster, måste du radera gamla.**

1. Sök efter poster som innehåller: **"netlify"** eller **"netli"**
2. Om du hittar några:
   - Klicka på dem
   - Klicka **"Radera"** eller **"Delete"**
3. **Spara** ändringarna

### Steg 4.5 - LÄGG IN nya Vercel-poster

**Du har två alternativ:**

#### **ALTERNATIV A: Nameservers (ENKLASTE)**
Om Vercel visar:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

Då gör du såhär:
1. I One.com, sök efter **"Nameservers"**
2. Radera eller ändra de gamla nameservers
3. Lägg in Vercel's fyra nameservers
4. Klicka **"Spara"**

#### **ALTERNATIV B: CNAME (om Vercel visar det)**
Om Vercel visar något om CNAME:
1. I One.com, sök efter **"DNS-poster"** eller **"DNS Records"**
2. Klicka **"Lägg till post"** eller **"Add Record"**
3. Fyll i:
   - **Name:** efterplan.se
   - **Type:** CNAME
   - **Value:** cname.vercel.com
4. Klicka **"Spara"**

---

## 🟢 DEL 5: VÄNTA (VIKTIGT!)

DNS tar tid att uppdatera. Det kan ta:
- **10-30 minuter:** Snabbaste fall
- **1-2 timmar:** Normalt
- **24 timmar:** Långsammaste fall

**Under denna tid:**
- Öppna en ny webbläsarflik
- Gå till: **https://efterplan.se**
- Det kan säga "Site Not Found" eller visa Netlify-sajten
- **DET ÄR OKEJ** - vänta bara

### Kontrollera status i Vercel
1. Gå tillbaka till Vercel Dashboard
2. Gå till ditt projekt
3. Klicka på fliken **"Settings"** → **"Domains"**
4. Du ser `efterplan.se`
5. Status kan säga:
   - ❌ **"Pending Verification"** (DNS uppdateras ännu)
   - ✅ **"Valid"** (DNA är klar - sajten är live!)

**När den säger ✅ "Valid":**
1. Öppna **https://efterplan.se** i en ny flik
2. Du bör se din sajt!
3. Testa några länkar för att se att allt fungerar

---

## 🟢 DEL 6: AVBRYT NETLIFY

Nu när sajten är live på Vercel kan du avbryta Netlify.

### Steg 6.1 - Logga in på Netlify
1. Öppna en ny flik
2. Gå till: **https://app.netlify.com**
3. Logga in med ditt Netlify-konto

### Steg 6.2 - Avbryt
1. Du ser dina webbställen
2. Klicka på **"Closure"**
3. Gå till **"Settings"**
4. Sök efter **"Delete site"** eller **"Danger Zone"**
5. Klicka **"Delete site"** och bekräfta

---

## ✅ NU ÄR DU KLAR!

Din sajt är nu:
- ✅ Hostad på Vercel (GRATIS)
- ✅ Körs på din egen domän (efterplan.se)
- ✅ Befriad från Netlify-betalning

---

## ❓ VANLIGA PROBLEM OCH LÖSNINGAR

### "Jag ser samma sida som innan, inte min nya sajt"
**Lösning:**
- Öppna en helt ny webbläsarflik (inte bara uppdatera)
- Eller stäng webbläsaren helt och öppna igen
- Eller skriv: `https://efterplan.se/?cache-bust=1` för att tvinga en uppdatering

### "Jag ser 'Invalid Domain' i Vercel"
**Lösning:**
- Vänta 30 minuter
- Uppdatera Vercel-sidan med F5
- Kontrollera att DNS är rätt infört i One.com

### "DNS-instruktionerna förvirrar mig"
**Lösning:**
- Skriv här exakt vad Vercel visar
- Jag guidar dig genom One.com steg för steg

### "Jag kan inte logga in på One.com"
**Lösning:**
- Använd "Glömt lösenord?" knappen
- Eller mejla One.com support

---

## 📞 BEHÖVER DU HJÄLP?

Säg vilket steg du är på och vad som står fast. Exempel:
- "Jag är på steg 4.1 och kan inte logga in på One.com"
- "Jag ser 'Pending Verification' i Vercel - hur länge ska jag vänta?"
- "Vilken DNS-post ska jag välja?"

**Jag svarar omedelbar!**
