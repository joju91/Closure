import os, json, requests, feedparser, anthropic
from datetime import datetime, timezone, timedelta

KEYWORDS = [
    "dödsbo", "bouppteckning", "arvskifte", "anhörig dog",
    "någon har dött", "efterlevande", "dödsfall praktiskt",
    "arv fördela", "dödsboförvaltning"
]

EXCLUDE = [
    "begravningsbyrå", "begravning", "jurist", "advokat",
    "reklam", "annons", "köp", "sälj"
]

MAX_AGE_DAYS = 21
leads = []

# --- Reddit ---
def reddit_search():
    auth = requests.auth.HTTPBasicAuth(
        os.environ["REDDIT_CLIENT_ID"],
        os.environ["REDDIT_CLIENT_SECRET"]
    )
    headers = {"User-Agent": "efterplan-scanner/1.0"}
    token_res = requests.post(
        "https://www.reddit.com/api/v1/access_token",
        auth=auth, headers=headers,
        data={"grant_type": "client_credentials"}
    )
    token = token_res.json().get("access_token")
    if not token:
        print("Reddit auth failed")
        return

    headers["Authorization"] = f"bearer {token}"
    subreddits = ["sweden", "privatekonomi", "juridik", "svenska"]

    for sub in subreddits:
        for kw in KEYWORDS[:4]:  # Begränsa API-anrop
            res = requests.get(
                f"https://oauth.reddit.com/r/{sub}/search",
                headers=headers,
                params={"q": kw, "sort": "new", "limit": 5, "restrict_sr": True}
            )
            if res.status_code != 200:
                continue
            for post in res.json().get("data", {}).get("children", []):
                p = post["data"]
                age = datetime.now(timezone.utc) - datetime.fromtimestamp(p["created_utc"], timezone.utc)
                if age.days > MAX_AGE_DAYS:
                    continue
                title = p.get("title", "").lower()
                text = p.get("selftext", "").lower()
                if any(e in title + text for e in EXCLUDE):
                    continue
                leads.append({
                    "source": f"Reddit r/{sub}",
                    "title": p["title"],
                    "url": f"https://reddit.com{p['permalink']}",
                    "age_days": age.days,
                    "score": p.get("score", 0),
                    "comments": p.get("num_comments", 0)
                })

# --- Google Alerts via RSS ---
def google_alerts_rss():
    alert_feeds = [
        "https://www.google.com/alerts/feeds/06159563957449160594/16955408637772928369",
        # Lägg till fler Alert RSS-URLer här när du skapar alerts för dödsbo, bouppteckning etc.
        # Skapa alerts på: google.com/alerts → sök på nyckelord → "Visa alternativ" → Leverans: RSS-flöde
    ]
    for feed_url in alert_feeds:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:10]:
                published = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
                age = datetime.now(timezone.utc) - published
                if age.days > MAX_AGE_DAYS:
                    continue
                title = entry.get("title", "").lower()
                link = entry.get("link", "")
                if any(e in title for e in EXCLUDE):
                    continue
                if "flashback" in link or "reddit" in link or "familjeliv" in link or "sweclockers" in link:
                    leads.append({
                        "source": "Google Alerts",
                        "title": entry.get("title", ""),
                        "url": link,
                        "age_days": age.days,
                        "score": None,
                        "comments": None
                    })
        except Exception as e:
            print(f"RSS error: {e}")

# Kör scanners
reddit_search()
google_alerts_rss()

if not leads:
    print("No leads found.")
    exit(0)

# Deduplicera
seen = set()
unique_leads = []
for l in leads:
    if l["url"] not in seen:
        seen.add(l["url"])
        unique_leads.append(l)

# Skicka till Claude för bedömning och svarsutkast
claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

prompt = f"""Du hjälper Jonas som driver efterplan.se — ett gratis verktyg för praktiska uppgifter efter dödsfall (bouppteckning, arvskifte, etc). Ingen reklam, ingen registrering.

Här är forumtrådar och artiklar som hittats den här veckan:
{json.dumps(unique_leads, ensure_ascii=False, indent=2)}

För varje lead:
1. Bedöm om det är lämpligt att svara (skala 1-3: 3=mycket lämplig, 1=tveksam)
2. Om betyg 2-3: skriv ett kort, hjälpsamt svar på svenska (max 4 meningar) som en privatperson som vill hjälpa — inte som marknadsföring. Nämn efterplan.se naturligt om det passar, men tvinga det inte.
3. Om betyg 1: skriv "Skippa"

Returnera endast JSON i detta format:
[
  {{
    "url": "...",
    "title": "...",
    "source": "...",
    "rating": 3,
    "draft": "Svarsutkast här..."
  }}
]"""

response = claude.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=2000,
    messages=[{"role": "user", "content": prompt}]
)

try:
    text = response.content[0].text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    scored = json.loads(text.strip())
except Exception as e:
    print(f"Parse error: {e}\n{response.content[0].text}")
    exit(1)

# Filtrera bort betyg 1
actionable = [l for l in scored if l.get("rating", 0) >= 2]

if not actionable:
    print("No actionable leads after scoring.")
    exit(0)

# Bygg GitHub Issue
lines = ["Veckans promotionmöjligheter. Godkänn de du vill agera på.\n"]
for i, l in enumerate(actionable, 1):
    rating_emoji = "🟢" if l["rating"] == 3 else "🟡"
    lines.append(f"## {i}. {rating_emoji} {l['title']}")
    lines.append(f"**Källa:** {l['source']}  ")
    lines.append(f"**URL:** {l['url']}  \n")
    lines.append(f"**Svarsutkast:**")
    lines.append(f"> {l['draft']}\n")
    lines.append(f"- [ ] Posta detta svar\n")

with open("promo_leads.md", "w") as f:
    f.write("\n".join(lines))

print(f"Found {len(actionable)} actionable leads.")
