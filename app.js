/* ═══════════════════════════════════════════
   EFTERPLAN — App Logic
   MVP v1.0
════════════════════════════════════════════ */

// ─── STATE ───────────────────────────────────
const state = {
  relation:    null,
  testamente:  false,
  fastighet:   false,
  foretag:     false,
  skulder:     false,
  utland:      false,
  minderarig:  false,
  fordon:      false,
  husdjur:     false,
  hyresratt:   false,
  ansvar:       null,
  name:         '',
  personnr:     '',
  participants: [],
  tasks:        [],
};

// ─── SCREENS ─────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goToLanding() { showScreen('screen-landing'); }

function startOnboarding() {
  obCurrentStep = 1;
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active', 'exit'));
  document.getElementById('ob-step-1').classList.add('active');
  document.getElementById('ob-back-btn').style.visibility = 'hidden';
  obInitDots();
  showScreen('screen-onboarding');
}

function editAnswers() {
  const confirmed = window.confirm('Vill du ändra dina svar? Planen uppdateras när du är klar — dina anteckningar och markeringar behålls.');
  if (!confirmed) return;
  startOnboarding();
  obPrefillAnswers();
}

function obPrefillAnswers() {
  // Step 1 — relation
  document.querySelectorAll('#ob-step-1 .ob-choice').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.val === state.relation);
  });
  if (state.relation) {
    const nb = document.querySelector('#ob-step-1 .ob-next-btn');
    if (nb) nb.disabled = false;
  }
  // Step 2 — checkboxes
  document.querySelectorAll('#ob-step-2 input[type="checkbox"]').forEach(cb => {
    cb.checked = !!state[cb.dataset.key];
  });
  // Step 3 — ansvar
  document.querySelectorAll('#ob-step-3 .ob-choice').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.val === state.ansvar);
  });
  if (state.ansvar) {
    const nb = document.querySelector('#ob-step-3 .ob-next-btn');
    if (nb) nb.disabled = false;
  }
  // Step 3b — participants
  _refreshParticipantList();
  // Step 5 — name
  const nameEl = document.getElementById('deceased-name');
  if (nameEl) nameEl.value = state.name || '';
  // Step 6 — personnr
  const pnrEl = document.getElementById('deceased-personnr');
  if (pnrEl) pnrEl.value = state.personnr || '';
}

// ─── ONBOARDING (conversational) ─────────────
const OB_TOTAL = 5;
let obCurrentStep = 1;

function obInitDots() {
  const container = document.getElementById('ob-dots');
  container.innerHTML = '';
  for (let i = 1; i <= OB_TOTAL; i++) {
    const dot = document.createElement('div');
    dot.className = 'ob-dot' + (i === 1 ? ' active' : '');
    dot.id = `ob-dot-${i}`;
    container.appendChild(dot);
  }
}

function obUpdateDots(step) {
  const numStep = (step === '3b') ? 3 : step;
  for (let i = 1; i <= OB_TOTAL; i++) {
    const dot = document.getElementById(`ob-dot-${i}`);
    if (!dot) continue;
    dot.className = 'ob-dot';
    if (i < numStep)   dot.classList.add('done');
    if (i === numStep) dot.classList.add('active');
  }
}

function obChoose(btn) {
  const key = btn.dataset.key;
  const val = btn.dataset.val;
  state[key] = val;

  btn.closest('.ob-choices').querySelectorAll('.ob-choice').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Enable the Nästa button for this step
  const step = btn.closest('.ob-step');
  const nextBtn = step?.querySelector('.ob-next-btn');
  if (nextBtn) nextBtn.disabled = false;
}

function obGoTo(step) {
  const current = document.querySelector('.ob-step.active');
  if (current) {
    current.classList.add('exit');
    setTimeout(() => {
      current.classList.remove('active', 'exit');
      obShowStep(step);
    }, 200);
  } else {
    obShowStep(step);
  }
}

const OB_FOCUS_IDS = { 4: 'deceased-name' };  /* steg 6 auto-fokuserar ej — tangentbordet ska inte öppnas automatiskt */

function obShowStep(step) {
  const el = document.getElementById(`ob-step-${step}`);
  if (!el) return;
  el.classList.add('active');
  obCurrentStep = step;
  obUpdateDots(step);
  document.getElementById('ob-back-btn').style.visibility = step === 1 ? 'hidden' : 'visible';
  if (OB_FOCUS_IDS[step]) {
    setTimeout(() => document.getElementById(OB_FOCUS_IDS[step])?.focus(), 350);
  }
}

function obBack() {
  if (obCurrentStep === 1) { goToLanding(); return; }
  if (obCurrentStep === '3b') { obGoTo(3); return; }
  if (obCurrentStep === 4 && state.ansvar === 'flera') { obGoTo('3b'); return; }
  obGoTo(obCurrentStep - 1);
}

function obAfterAnsvar() {
  if (state.ansvar === 'flera') {
    obGoTo('3b');
  } else {
    obGoTo(4);
  }
}

function updateCheckboxState() {
  document.querySelectorAll('#ob-step-2 input[type="checkbox"]').forEach(cb => {
    state[cb.dataset.key] = cb.checked;
  });
}

function generatePlan() {
  state.name     = document.getElementById('deceased-name').value.trim();
  state.personnr = document.getElementById('deceased-personnr').value.trim();
  buildTasks();
  renderPlan();
  saveState();
  showScreen('screen-plan');
}

// ─── RULE ENGINE ─────────────────────────────
// Each task: id, title, desc, urgency, time, link, phone?, triggers, hasDoc?, notesPlaceholder?
const TASK_LIBRARY = [

  // ── ALWAYS ─────────────────────────────────
  {
    id: 'narmaste_anhörig',
    title: 'Meddela närstående',
    desc: 'Det här sker i etapper — du behöver inte nå alla på en gång. Börja med de allra närmaste: familj och nära vänner. Övriga kan meddelas under de kommande dagarna. Det är okej att be någon annan hjälpa till.',
    urgency: 'today',
    time: 'Din tid',
    link: null,
    triggers: [],
    notesPlaceholder: 'Vem har meddelats, vem återstår…',
  },
  {
    id: 'begravningsbyra',
    title: 'Kontakta en begravningsbyrå',
    desc: 'Begravningsbyrån tar hand om kroppen, sköter registreringen hos Skatteverket och hjälper dig planera ceremonin. Du behöver inte ha alla svar klara när du ringer — de guidar dig. Några alternativ:',
    urgency: 'today',
    time: 'ca 30 min',
    link: null,
    triggers: [],
    resources: [
      { label: 'Fonus — Sveriges största, hitta byrå nära dig', url: 'https://www.fonus.se' },
      { label: 'Memorial — rikstäckande kedja', url: 'https://www.memorial.se' },
      { label: 'SBF — branschförbundets byråsök', url: 'https://www.sbf.se' },
    ],
  },
  {
    id: 'dodsbevis',
    title: 'Beställ dödsfallsintyg',
    desc: 'Dödsbeviset utfärdas automatiskt av läkaren. Det du behöver beställa är <strong>dödsfallsintyg med släktutredning</strong> från Skatteverket — det är detta dokument som banker, försäkringsbolag och myndigheter kräver för att du ska få företräda dödsboet. Ha den <em>avlidnas</em> personnummer tillgängligt.',
    urgency: 'today',
    time: 'ca 15 min',
    link: 'https://www.skatteverket.se/privat/folkbokforing/dodsfall.html',
    phone: '0771-567 567',
    triggers: [],
  },
  {
    id: 'nycklar_post',
    title: 'Säkra nycklar och eftersänd post',
    desc: 'Ta hand om bostadsnycklar och gör en adressändring för den avlidnes post via adressändring.se. Viktiga brev kan annars gå förlorade.',
    urgency: 'today',
    time: 'ca 20 min',
    link: 'https://www.adressandring.se',
    triggers: [],
  },

  // ── WEEK ───────────────────────────────────
  {
    id: 'begravningsceremoni',
    title: 'Planera begravningsceremonin',
    desc: 'Bestäm vem i familjen som ansvarar för vad — och se till att någon förmedlar era önskemål till begravningsbyrån.<br><br>Vem ansvarar för musik? Vem håller tal? Vem ordnar minnesstunden? Vem samlar in den avlidnas eventuella önskemål?',
    urgency: 'week',
    time: 'ca 30 min med familjen',
    link: null,
    triggers: [],
    notesPlaceholder: 'Vem ansvarar för vad — musik, tal, minnesstund, önskemål…',
  },
  {
    id: 'fullmakt_dodsbo',
    title: 'Upprätta fullmakt för dödsboet',
    urgency: 'week',
    time: 'ca 30 min',
    desc: 'När ni är flera som ärver måste normalt alla godkänna varje åtgärd — vilket snabbt blir tungrott. Lösningen är att alla skriver en fullmakt till en person som får agera för er gemensamt: betala räkningar, kontakta banker och hantera löpande ärenden. Fullmakten måste visas upp i original vid bankbesök.',
    link: null,
    triggers: ['flera_delägare'],
    hasDoc: 'fullmakt',
    assigneeLabel: 'Vem får fullmakten?',
  },
  {
    id: 'bouppteckning',
    title: 'Planera bouppteckningen',
    desc: 'En bouppteckning är en förteckning över den avlidnes tillgångar och skulder. Den ska vara klar inom 3 månader och skickas till Skatteverket inom 4 månader.<br><br><strong>Göra själv:</strong> Möjligt om boet är enkelt (bara bankmedel och lösöre). Kräver två utomstående vittnen som inte är arvingar. Sparar 6 500–15 000 kr.<br><strong>Anlita jurist:</strong> Rekommenderas vid fastighet, företag, testamente eller om arvingarna inte är överens.',
    urgency: 'week',
    time: 'Kontakta jurist inom veckan',
    link: null,
    triggers: [],
    resources: [
      { label: 'Familjens Jurist — rikstäckande, specialiserade på dödsbon', url: 'https://www.familjens-jurist.se' },
      { label: 'Advokatsamfundet — hitta advokat nära dig', url: 'https://www.advokatsamfundet.se/hitta-advokat' },
    ],
  },
  {
    id: 'bank_kontakt',
    title: 'Kontakta banken',
    desc: 'Meddela banken om dödsfallet så att kontona hanteras korrekt. Ha dödsbevis och personnummer redo. Skriv ned vilka banker du känner till nedan — du kan fylla på efterhand.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: [],
    hasDoc: 'bank',
    notesPlaceholder: 'Vet du vilka banker? Skriv de du känner till — det är okej att börja med en. (t.ex. Swedbank, SEB, Nordea…)',
    resources: [
      { label: 'Swedbank — dödsbo & efterlevande', url: 'https://www.swedbank.se/privat/mer-fran-swedbank/dodsfall.html' },
      { label: 'SEB — när någon gått bort', url: 'https://seb.se/privat/dodsfall' },
      { label: 'Nordea — dödsfall och dödsbo', url: 'https://www.nordea.se/privat/livshändelser/dodsfall/' },
      { label: 'Handelsbanken — dödsfall', url: 'https://www.handelsbanken.se/sv/privat/livet/dodsfall' },
      { label: 'Länsförsäkringar Bank — dödsfall', url: 'https://www.lansforsakringar.se/privat/bank/dodsfall/' },
      { label: 'Skandiabanken — dödsfall', url: 'https://www.skandia.se/bank/dodsfall/' },
    ],
  },
  {
    id: 'forsakringar',
    title: 'Gå igenom försäkringar',
    desc: `Försäkringar kan ge stora belopp som riskerar att aldrig sökas — gör en systematisk genomgång.<br><br>
<strong>TGL (Tjänstegrupplivförsäkring)</strong> — De flesta anställda med kollektivavtal har detta. Begravningshjälp: ~29 400 kr till dödsboet. Grundbelopp till partner/barn: upp till ~350 000 kr. Måste sökas manuellt hos t.ex. Afa, Folksam eller KPA.<br><br>
<strong>Hitta dolda försäkringar:</strong> Gå igenom bankutdrag efter premiebetalningar. Kontakta arbetsgivare och fackförbund. Ring de fyra stora (Folksam, If, Länsförsäkringar, Trygg-Hansa) och fråga om den avlidne hade engagemang.`,
    urgency: 'week',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: [],
    hasDoc: 'forsakring',
    notesPlaceholder: 'Vet du något försäkringsbolag? Skriv det du hittar — ett i taget är bra nog. (t.ex. Folksam, If, Skandia, Afa…)',
    resources: [
      { label: 'Afa Försäkring — TGL och dödsfall', url: 'https://www.afaforsakring.se/privatperson/dodsfall/' },
      { label: 'Folksam — anmälan vid dödsfall', url: 'https://www.folksam.se/liv-halsa/nar-nagon-dor' },
    ],
  },
  {
    id: 'arbetsgivare',
    title: 'Kontakta arbetsgivaren och fackförbundet',
    desc: 'Meddela arbetsgivaren om dödsfallet. Be dem bekräfta om den avlidne haft TGL (Tjänstegrupplivförsäkring) via kollektivavtal — detta är en livförsäkring som ger skattefritt engångsbelopp och måste sökas aktivt. Kontakta även fackförbundet, många har egna dödsfallsförsäkringar via t.ex. Bliwa eller Folksam.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: [],
  },

  // ── LATER ──────────────────────────────────
  {
    id: 'abonnemang',
    title: 'Avsluta abonnemang och prenumerationer',
    desc: 'Mobil, streaming, tidningar, el, gym — säg upp tjänster en efter en. Använd dokumentgeneratorn för att skapa uppsägningsbrev. Skriv ned det du vet eller hittar nedan.',
    urgency: 'later',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: [],
    hasDoc: 'bulk',
    notesPlaceholder: 'Vet du några abonnemang eller tjänster? Notera dem här — du kan fylla på. (t.ex. Telia, Spotify, Netflix, el, gym…)',
  },
  {
    id: 'arvskifte',
    title: 'Fördela arvet',
    desc: 'När bouppteckningen är klar och godkänd av Skatteverket delas tillgångarna upp mellan arvingarna — enligt testamente eller enligt lag om inget testamente finns. Görs ofta med hjälp av jurist och kan ta tid om ni är oense.',
    urgency: 'later',
    time: 'Månader efter dödsfallet',
    link: null,
    triggers: [],
  },
  {
    id: 'avsluta_konton',
    title: 'Avsluta digitala konton',
    desc: `Spara viktiga foton och dokument innan du stänger konton. Varje plattform har egna rutiner:<br><br>
<strong>Facebook/Instagram:</strong> Kan minnesmärkas eller raderas. Kräver dödsfallsintyg till supporten.<br>
<strong>Google:</strong> Kontrollera "Hantering av inaktiva konton" — utan förinställningar kan anhöriga begära data via supporten.<br>
<strong>Apple/iCloud:</strong> Utan en förutbestämd "digital arvskontakt" krävs ofta domstolsbeslut för att få ut foton och filer.<br><br>
Säg även upp betaltjänster som Klarna, PayPal, spelkonton — logga aldrig in med den avlidnes lösenord, använd de officiella vägarna.`,
    urgency: 'later',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: [],
    notesPlaceholder: 'Personlig anteckning — skriv de konton du hittar. Inget skickas vidare automatiskt. (t.ex. Facebook, Google, iCloud, email…)',
  },
  {
    id: 'skattedeklaration',
    title: 'Dödsboets skattedeklaration',
    desc: 'Dödsboet är skattskyldigt och kan behöva lämna in en deklaration. Kontakta Skatteverket eller en revisor.',
    urgency: 'later',
    time: 'Senast 2 maj efter dödsåret',
    link: 'https://www.skatteverket.se',
    triggers: [],
  },

  // ── CONDITIONAL: Fastighet ─────────────────
  {
    id: 'fastighet_boende',
    title: 'Besluta om bostadens framtid',
    desc: 'Ska bostaden säljas, övertas av anhörig, eller hyras ut? Ta detta beslut med alla delägare i boet.',
    urgency: 'week',
    time: 'Diskussion med familjen',
    link: null,
    triggers: ['fastighet'],
  },
  {
    id: 'bostadsratt_brf',
    title: 'Kontakta bostadsrättsföreningen',
    desc: 'Meddela föreningen om dödsfallet och fråga vad som gäller för överlåtelse av bostadsrätten till arvinge eller försäljning. BRF:en behöver godkänna en ny ägare och har egna rutiner för detta.',
    urgency: 'week',
    time: 'ca 20 min',
    link: null,
    triggers: ['fastighet'],
  },

  // ── CONDITIONAL: Hyresrätt ────────────────
  {
    id: 'hyresratt_uppsagning',
    title: 'Säg upp hyreskontrakt',
    urgency: 'today',
    time: 'Gör inom 1 månad — annars löper kontraktet vidare',
    desc: 'Hyreskontrakt upphör inte automatiskt vid dödsfall. Säg upp direkt till hyresvärden skriftligen — om det görs inom en månad från dödsfallet är uppsägningstiden normalt en månad. Väntar du längre löper vanlig uppsägningstid (ofta 3 månader). Ha dödsbevis redo.',
    link: null,
    triggers: ['hyresratt'],
    hasDoc: 'letter',
  },

  // ── CONDITIONAL: Företag ───────────────────
  {
    id: 'foretag_bolagsverket',
    title: 'Meddela Bolagsverket om dödsfall',
    desc: 'Om den avlidne hade ett aktiebolag eller enskild firma behöver styrelse/dödsbo meddela Bolagsverket.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: 'https://www.bolagsverket.se',
    phone: '0771-670 670',
    triggers: ['foretag'],
  },
  {
    id: 'foretag_avveckling',
    title: 'Planera avveckling eller överlåtelse av företaget',
    desc: 'Ska bolaget avvecklas, säljas, eller tas över av en arvinge? Detta är komplext och tidskänsligt — anlita revisor och jurist tidigt.<br><br><strong>Om det finns aktiva kunder eller uppdrag:</strong> Dödsboet tar automatiskt över ägarens rättigheter och skyldigheter. Kontakta kunderna och informera om dödsfallet — var transparent om vad som händer. Kan pågående avtal inte fullföljas, meddela motparten snarast och diskutera avslut i god anda.<br><br><strong>Praktiska steg nu:</strong><br>1. Kontakta företagets revisor och redovisningskonsult direkt.<br>2. Säkerställ att löpande räkningar, löner och moms hanteras — betalstopp sker inte automatiskt.<br>3. Meddela Bolagsverket om dödsfallet (se uppgiften ovan).<br>4. Använd <em>Dokument → Skatteverket</em> härifrån för att begära avregistrering av F-skatt.',
    urgency: 'week',
    time: 'Kontakta revisor',
    link: null,
    triggers: ['foretag'],
  },

  // ── CONDITIONAL: Skulder ──────────────────
  {
    id: 'skulder_inventering',
    title: 'Inventera skulder noggrant',
    desc: 'Samla en komplett bild av lån, krediter och obetalda räkningar. Skulder betalas av dödsboet innan arv utbetalas.<br><br><strong>Viktigt:</strong> Begravnings- och bouppteckningskostnader prioriteras före alla andra skulder. Om boet inte räcker till kontaktar du borgenärerna och begär anstånd tills bouppteckningen är klar. Du som anhörig är <em>inte</em> personligt betalningsansvarig för den avlidnes skulder.',
    urgency: 'week',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: ['skulder'],
  },
  {
    id: 'skulder_kronofogden',
    title: 'Kontrollera skulder hos Kronofogden',
    desc: 'Du kan begära ett skuldsaldo direkt hos Kronofogden för att se om det finns registrerade skulder.',
    urgency: 'week',
    time: 'ca 15 min',
    link: 'https://www.kronofogden.se',
    phone: '0771-73 73 00',
    triggers: ['skulder'],
  },

  // ── CONDITIONAL: Utland ───────────────────
  {
    id: 'utland_juridik',
    title: 'Hämta juridisk rådgivning för utlandstillgångar',
    desc: 'Tillgångar i annat land — bankkonto, bostad, pension — lyder under det landets lagar och kräver separat utredning. EU:s arvsförordning (nr 650/2012) gäller om den hemmahörande i Sverige dog inom EU, men utanför EU gäller det ländets egna regler.<br><br><strong>Börja med dessa steg:</strong><br>1. Kontakta banken i det andra landet och meddela dödsfallet.<br>2. Anlita en jurist specialiserad på internationell arvsrätt — fråga begravningsbyrån eller Advokatsamfundet.<br>3. Hör med Utrikesdepartementet om konsulär hjälp vid bostad eller tillgångar utanför EU.<br>4. Se till att bouppteckningen täcker utlandstillgångarna — en svensk bouppteckning räcker ofta inom EU, men ibland krävs en lokal kopia.',
    urgency: 'week',
    time: 'Kontakta jurist',
    link: null,
    triggers: ['utland'],
    resources: [
      { label: 'Advokatsamfundet — hitta specialist i internationell arvsrätt', url: 'https://www.advokatsamfundet.se/hitta-advokat' },
      { label: 'UD — konsulär hjälp vid dödsfall utomlands', url: 'https://www.swedenabroad.se/sv/om-utlandet-for-svenska-medborgare/konsulart-bistand/' },
    ],
  },

  // ── CONDITIONAL: Minderårigt barn ─────────
  {
    id: 'minderarig_goman',
    title: 'Utred om god man behövs för minderårigt barn',
    desc: 'Om ett minderårigt barn är delägare i dödsboet kan en god man behöva utses för att representera barnet. En förälder kan inte ensam företräda sitt barn i ett dödsbo där de själva är delägare — det uppstår en intressekonflikt.<br><br>Kontakta <strong>överförmyndaren i din kommun</strong> — det är de som hanterar detta. Du hittar dem via din kommuns hemsida (sök "överförmyndare [kommunens namn]"). Be om en handläggningstid direkt — processen kan ta några veckor.',
    urgency: 'today',
    time: 'Kontakta överförmyndaren',
    link: null,
    triggers: ['minderarig'],
    resources: [
      { label: 'Sveriges Kommuner och Regioner — hitta din överförmyndare', url: 'https://skr.se/skr/demokratiledningstyrning/valmaktfordelning/overformyndare.html' },
    ],
  },

  // ── CONDITIONAL: Make/maka ────────────────
  {
    id: 'make_pension',
    title: 'Kontrollera efterlevandepension',
    desc: 'Som make/maka kan du ha rätt till efterlevandepension. Kontakta Pensionsmyndigheten och eventuella tjänstepensionsbolag.',
    urgency: 'week',
    time: 'ca 30 min',
    link: 'https://www.pensionsmyndigheten.se',
    phone: '0771-776 776',
    triggers: ['make'],
  },
  {
    id: 'make_bostadsratt',
    title: 'Kontrollera bostadsrättens framtid',
    desc: 'Om ni bodde i bostadsrätt ihop — kontakta bostadsrättsföreningen om hur överlåtelse eller fortsatt boende hanteras.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: ['make'],
  },

  // ── CONDITIONAL: Testamente ───────────────
  {
    id: 'testamente_oppna',
    title: 'Öppna och bevittna testamentet',
    desc: 'Testamentet ska delges alla arvingar. Ta hjälp av en jurist om du är osäker på hur detta görs korrekt.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: null,
    triggers: ['testamente'],
  },

  // ── CONDITIONAL: Inget testamente ─────────
  {
    id: 'inget_testamente_koll',
    title: 'Kontrollera om testamente kan finnas',
    desc: 'Kolla i den avlidnes papper, bankfack och hos jurister. Det är vanligare än man tror att testamenten hittas senare.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: null,
    triggers: ['inget_testamente'],
  },

  // ── CONDITIONAL: Fordon ───────────────────
  {
    id: 'fordon_transport',
    title: 'Byt ägare på fordon',
    urgency: 'later',
    time: 'ca 30 min + posthantering',
    desc: 'Fordon i ett dödsbo kräver en manuell process — de digitala tjänsterna hos Transportstyrelsen fungerar inte när säljaren är avliden. Använd registreringsbevisets gula del (Del 2) i original. En dödsboföreträdare skriver under i nuvarande ägares ställe. Den nye ägaren måste teckna trafikförsäkring från ägarbytesdagen.',
    link: 'https://www.transportstyrelsen.se/sv/vagtrafik/fordon/agarbyte/',
    triggers: ['fordon'],
  },

  // ── CONDITIONAL: Husdjur ──────────────────
  {
    id: 'husdjur_omplacering',
    title: 'Ordna omsorg för husdjur',
    urgency: 'week',
    time: 'Din tid',
    desc: 'Husdjur är juridiskt lös egendom och hanteras i bouppteckning och testamente. Om den avlidne hade hund måste ägarbyte registreras i Jordbruksverkets hundregister av den nya ägaren. Behöver djuret omplaceras finns djurhem och uppfödare som kan hjälpa till.',
    link: 'https://www.jordbruksverket.se/djur/hundar-katter-och-harliga-djur/hundar/registrera-din-hund',
    triggers: ['husdjur'],
  },

  // ── ALWAYS: Hjälpmedel och mediciner ──────
  {
    id: 'hjalpmedel_mediciner',
    title: 'Återlämna hjälpmedel och mediciner',
    urgency: 'week',
    time: 'ca 30 min',
    desc: 'Rullstol, säng, lyft och andra medicintekniska produkter är ofta lån från regionen och ska återlämnas rengjorda. Större hjälpmedel hämtas ofta kostnadsfritt — ring regionen eller kommunen. Överblivna mediciner (tabletter, sprutor, krämer) lämnas till närmaste apotek för säker destruktion.',
    triggers: [],
  },

  // ── ALWAYS: Bostadsavveckling ──────────────
  {
    id: 'bostadsavveckling',
    title: 'Töm och städa bostaden',
    urgency: 'later',
    time: 'Dagar–veckor',
    desc: 'Samordna med övriga arvingar vad som sparas, säljas eller skänks bort. Gör det i god tid — en tom bostad säljs snabbare och minskar löpande hyra eller avgift som annars belastar dödsboet.<br><br><strong>Donera / sälja:</strong> Stadsmissionen, Myrorna och Erikshjälpen hämtar möbler och kläder kostnadsfritt. Blocket och Facebook Marketplace fungerar bra för lösa föremål. Begravningsbyrån kan rekommendera lokala aktörer.<br><br><strong>Anlita städhjälp:</strong> Specialiserade dödsboföretag hanterar hel tömning och städ. Typisk kostnad: 5 000–20 000 kr beroende på bostadens storlek. Betalas ur dödsboets tillgångar.<br><br><strong>RUT-avdraget gäller inte dödsbo</strong> — dödsboet är en juridisk person och Skatteverket medger inte skattereduktion.',
    triggers: [],
    notesPlaceholder: 'Vem ansvarar för tömningen? Vad ska sparas, säljas, skänkas?',
  },
];

function buildTasks() {
  const triggers = new Set();
  if (state.fastighet)   triggers.add('fastighet');
  if (state.foretag)     triggers.add('foretag');
  if (state.skulder)     triggers.add('skulder');
  if (state.utland)      triggers.add('utland');
  if (state.minderarig)  triggers.add('minderarig');
  if (state.testamente)  triggers.add('testamente');
  if (!state.testamente) triggers.add('inget_testamente');
  if (state.relation === 'make') triggers.add('make');
  if (state.ansvar === 'flera') triggers.add('flera_delägare');
  if (state.fordon)      triggers.add('fordon');
  if (state.husdjur)     triggers.add('husdjur');
  if (state.hyresratt)   triggers.add('hyresratt');

  state.tasks = TASK_LIBRARY.filter(task =>
    task.triggers.length === 0 || task.triggers.some(t => triggers.has(t))
  ).map(task => ({ ...task, done: false, started: false }));

  loadTaskState();
}

// ─── NOTES (cached) ──────────────────────────
let _notesCache = null;

function _getNotes() {
  if (_notesCache) return _notesCache;
  try { _notesCache = JSON.parse(localStorage.getItem('efterplan_notes') || '{}'); }
  catch(e) { _notesCache = {}; }
  return _notesCache;
}

function _debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

const saveTaskNote = _debounce(function(taskId, value) {
  const notes = _getNotes();
  notes[taskId] = value;
  try { localStorage.setItem('efterplan_notes', JSON.stringify(notes)); } catch(e) {}
}, 400);

function getTaskNote(taskId) {
  return _getNotes()[taskId] || '';
}

function saveTaskState() {
  const saved = {};
  state.tasks.forEach(t => { saved[t.id] = { done: t.done, started: t.started, assignee: t.assignee || null }; });
  try { localStorage.setItem('efterplan_tasks', JSON.stringify(saved)); } catch(e) {}
}

function loadTaskState() {
  try {
    const saved = JSON.parse(localStorage.getItem('efterplan_tasks') || '{}');
    state.tasks = state.tasks.map(t => {
      const s = saved[t.id];
      if (!s) return t;
      // Backward-compat: old format stored a boolean
      if (typeof s === 'boolean') return { ...t, done: s, started: false };
      return { ...t, done: s.done || false, started: s.started || false, assignee: s.assignee || null };
    });
  } catch(e) {}
}

// ─── RENDER PLAN ─────────────────────────────
function renderPlan() {
  const name = state.name;
  document.getElementById('plan-title').textContent =
    name ? `Plan för ${name}s dödsbo` : 'Din plan';
  document.getElementById('plan-sub').textContent =
    'Uppdateras allteftersom du går vidare. Det finns inget fel sätt att börja.';

  const defEl = document.getElementById('plan-dodsbo-def');
  if (defEl) {
    const n = state.name || 'den som gick bort';
    defEl.textContent = `Dödsboet är ett tillfälligt begrepp för allt ${n} lämnade efter sig — tillgångar och skulder. Det upphör när allt är fördelat.`;
  }

  const today  = state.tasks.filter(t => t.urgency === 'today');
  const week   = state.tasks.filter(t => t.urgency === 'week');
  const later  = state.tasks.filter(t => t.urgency === 'later');

  // ── Börja här-kort ──────────────────────────
  const firstTask = state.tasks.find(t => !t.done);
  const startEl   = document.getElementById('start-here');
  if (startEl) {
    if (firstTask) {
      startEl.innerHTML = `
        <div>
          <div class="start-here-label">Börja här</div>
          <div class="start-here-title">${firstTask.title}</div>
        </div>
        <div class="start-here-arrow">›</div>`;
      startEl.classList.remove('hidden');
      startEl.onclick = () => {
        // Make sure we're on plan tab, open the task
        switchTab('plan');
        toggleTask(firstTask.id);
        setTimeout(() => {
          document.getElementById(`task-card-${firstTask.id}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      };
    } else {
      startEl.classList.add('hidden');
    }
  }

  const nextTaskId = firstTask?.id;
  renderTaskList('tasks-today', today,  nextTaskId);
  renderTaskList('tasks-week',  week,   nextTaskId);
  renderTaskList('tasks-later', later,  nextTaskId);

  // Show Skatteverket doc button only if deceased had a company (F-skatt relevant)
  const skvBtn = document.getElementById('doc-btn-skatteverket');
  if (skvBtn) skvBtn.classList.toggle('hidden', !state.foretag);
  const fullmaktBtn = document.getElementById('doc-btn-fullmakt');
  if (fullmaktBtn) fullmaktBtn.classList.toggle('hidden', state.ansvar !== 'flera');

  document.getElementById('count-today').textContent = `${today.length} uppgifter`;
  document.getElementById('count-week').textContent  = `${week.length} uppgifter`;
  document.getElementById('count-later').textContent = `${later.length} uppgifter`;

  updateProgress();
}

let expandedTaskId = null;

function renderTaskList(containerId, tasks, nextTaskId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  tasks.forEach((task, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'task-wrap';
    wrap.id = `task-wrap-${task.id}`;

    const linkHtml = task.link
      ? `<a class="task-expand-link" href="${task.link}" target="_blank" rel="noopener">Öppna ${task.link.replace('https://www.', '')} ↗</a>`
      : '';

    const phoneHtml = task.phone
      ? `<a class="task-expand-phone" href="tel:${task.phone.replace(/\s|-/g,'')}">Ring ${task.phone}</a>`
      : '';

    const resourcesHtml = task.resources?.length
      ? `<div class="task-resources">${task.resources.map(r =>
          `<a class="task-resource-link" href="${r.url}" target="_blank" rel="noopener">${r.label} ↗</a>`
        ).join('')}</div>`
      : '';

    const notesHtml = task.notesPlaceholder && !task.done
      ? `<textarea class="task-notes" id="notes-${task.id}" placeholder="${task.notesPlaceholder}" rows="2"
           oninput="autoStartOnNote('${task.id}'); saveTaskNote('${task.id}', this.value)">${getTaskNote(task.id)}</textarea>`
      : '';

    const notifyHtml = task.id === 'narmaste_anhörig' ? renderNotifyList() : '';

    const docHtml = task.hasDoc && !task.done
      ? `<button class="task-expand-doc" onclick="event.stopPropagation();switchTab('docs');showDocForm('${task.hasDoc}')">Generera dokument →</button>`
      : '';

    const doneHtml = task.done
      ? `<span class="task-expand-done">Klar ✓</span>
         <button class="task-expand-undo-btn" onclick="event.stopPropagation();undoTaskDoneManual('${task.id}')">Markera som ej klar</button>`
      : task.started
      ? `<button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`
      : `<button class="task-expand-start-btn" onclick="event.stopPropagation();markTaskStarted('${task.id}')">Påbörjad</button>
         <button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`;

    const isNext = !task.done && task.id === nextTaskId;
    const cardClass = task.done ? ' done' : task.started ? ' started' : (isNext ? ' task-card--next' : '');
    const checkClass = task.done ? ' checked' : task.started ? ' started' : '';
    const nextBadge = isNext ? `<span class="task-next-badge">Nästa steg</span>` : '';
    const startedBadge = task.started && !task.done
      ? `<span class="task-started-badge">Påbörjad</span>`
      : '';
    const assigneeBadge = task.assignee
      ? `<span class="task-assignee-badge" id="assignee-badge-${task.id}">${task.assignee}</span>`
      : `<span class="task-assignee-badge hidden" id="assignee-badge-${task.id}"></span>`;

    wrap.innerHTML = `
      <div class="task-card${cardClass}" id="task-card-${task.id}">
        <div class="task-check${checkClass}" id="check-${task.id}"></div>
        <div class="task-body">
          <div class="task-title">${task.title}${nextBadge}</div>
          <div class="task-time">${task.time}${startedBadge}${assigneeBadge}</div>
        </div>
        <div class="task-chevron" id="chevron-${task.id}" aria-hidden="true">›</div>
      </div>
      <div class="task-expand hidden" id="expand-${task.id}">
        <div class="task-expand-desc">${task.desc}</div>
        ${linkHtml}
        ${phoneHtml}
        ${resourcesHtml}
        ${(task.id === 'begravningsceremoni' && state.ansvar !== 'flera') ? '' : renderAssigneePicker(task.id)}
        ${notifyHtml}
        ${notesHtml}
        <div class="task-expand-actions">
          ${doneHtml}
          ${docHtml}
        </div>
      </div>
    `;

    const cardEl = wrap.querySelector('.task-card');
    cardEl.setAttribute('tabindex', '0');
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('aria-expanded', 'false');
    cardEl.setAttribute('aria-controls', `expand-${task.id}`);
    cardEl.addEventListener('click', () => toggleTask(task.id));
    cardEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(task.id); }
    });

    // staggered entrance animation
    wrap.style.animationDelay = `${i * 35}ms`;
    wrap.classList.add('task-anim-in');

    container.appendChild(wrap);
  });
}

function toggleTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);

  const isOpen = expandedTaskId === taskId;

  if (expandedTaskId) {
    const prev     = document.getElementById(`expand-${expandedTaskId}`);
    const prevChev = document.getElementById(`chevron-${expandedTaskId}`);
    const prevCard = document.getElementById(`task-card-${expandedTaskId}`);
    if (prev)     prev.classList.add('hidden');
    if (prevChev) prevChev.classList.remove('open');
    if (prevCard) { prevCard.classList.remove('expanded'); prevCard.setAttribute('aria-expanded', 'false'); }
  }

  if (isOpen) { expandedTaskId = null; return; }

  expandedTaskId = taskId;
  const el   = document.getElementById(`expand-${taskId}`);
  const chev = document.getElementById(`chevron-${taskId}`);
  const card = document.getElementById(`task-card-${taskId}`);
  if (el)   el.classList.remove('hidden');
  if (chev) chev.classList.add('open');
  if (card) { card.classList.add('expanded'); card.setAttribute('aria-expanded', 'true'); }
}

function updateProgress() {
  const total = state.tasks.length;
  const done  = state.tasks.filter(t => t.done).length;
  if (total === 0) return;

  const pct       = Math.round((done / total) * 100);
  const summaryEl = document.getElementById('progress-summary');
  const fillEl    = document.getElementById('progress-bar-fill');
  const completionEl = document.getElementById('completion-message');

  if (fillEl) fillEl.style.width = pct + '%';

  if (done === total) {
    summaryEl.innerHTML = `<strong>${total} av ${total}</strong> uppgifter klara`;
    if (completionEl) completionEl.classList.add('visible');
    document.getElementById('plan-sub').textContent = 'Du har gått igenom allt. Ta en djup andetag.';
  } else {
    summaryEl.innerHTML = `<strong>${done} av ${total}</strong> uppgifter klara`;
    if (completionEl) completionEl.classList.remove('visible');
  }
}

function autoStartOnNote(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task && !task.done && !task.started) markTaskStarted(taskId);
}

function markTaskStarted(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task || task.done || task.started) return;
  task.started = true;
  saveTaskState();

  const card  = document.getElementById(`task-card-${taskId}`);
  const check = document.getElementById(`check-${taskId}`);
  if (card)  card.classList.add('started');
  if (check) check.classList.add('started');

  // Update the time row badge without full re-render
  const timeEl = card?.querySelector('.task-time');
  if (timeEl && !timeEl.querySelector('.task-started-badge')) {
    const badge = document.createElement('span');
    badge.className = 'task-started-badge';
    badge.textContent = 'Påbörjad';
    timeEl.appendChild(badge);
  }

  // Swap start button → only "Markera som klar" remains
  const actionsEl = document.querySelector(`#expand-${taskId} .task-expand-actions`);
  if (actionsEl) {
    const docBtn = actionsEl.querySelector('.task-expand-doc');
    actionsEl.innerHTML = `<button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${taskId}')">Markera som klar</button>`;
    if (docBtn) actionsEl.appendChild(docBtn);
  }
}

function markTaskDone(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done = true;
  saveTaskState();

  const card  = document.getElementById(`task-card-${taskId}`);
  const check = document.getElementById(`check-${taskId}`);
  const expnd = document.getElementById(`expand-${taskId}`);
  const chev  = document.getElementById(`chevron-${taskId}`);
  if (card)  card.classList.add('done');
  if (check) check.classList.add('checked');
  if (expnd) expnd.classList.add('hidden');
  if (chev)  chev.classList.remove('open');
  if (expandedTaskId === taskId) expandedTaskId = null;

  updateProgress();
  showUndoToast(taskId);
}

// ─── ASSIGNEES ────────────────────────────────
function _getAssignees() {
  try { return JSON.parse(localStorage.getItem('efterplan_assignees') || '[]'); } catch(e) { return []; }
}
function _saveAssignees(list) {
  try { localStorage.setItem('efterplan_assignees', JSON.stringify(list)); } catch(e) {}
}
function getTaskAssignee(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  return task ? (task.assignee || null) : null;
}
function setTaskAssignee(taskId, name) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.assignee = (task.assignee === name) ? null : name;
  saveTaskState();
  _refreshAssigneePicker(taskId);
  _refreshAssigneeBadge(taskId);
}
function addNewAssignee(taskId) {
  const input = document.getElementById(`assignee-input-${taskId}`);
  const name = input ? input.value.trim() : '';
  if (!name) return;
  const list = _getAssignees();
  if (!list.includes(name)) { list.push(name); _saveAssignees(list); }
  setTaskAssignee(taskId, name);
  if (input) { input.value = ''; input.classList.add('hidden'); }
}
function toggleAssigneeInput(taskId) {
  const input = document.getElementById(`assignee-input-${taskId}`);
  if (!input) return;
  input.classList.toggle('hidden');
  if (!input.classList.contains('hidden')) input.focus();
}
function _refreshAssigneePicker(taskId) {
  const picker = document.getElementById(`assignee-picker-${taskId}`);
  if (picker) picker.innerHTML = _buildAssigneePickerInner(taskId);
}
function _refreshAssigneeBadge(taskId) {
  const badge = document.getElementById(`assignee-badge-${taskId}`);
  const task = state.tasks.find(t => t.id === taskId);
  if (!badge || !task) return;
  if (task.assignee) {
    badge.textContent = task.assignee;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}
function _buildAssigneePickerInner(taskId) {
  const assignees = _getAssignees();
  const current = getTaskAssignee(taskId);
  const chips = assignees.map(n =>
    `<button class="assignee-chip${n === current ? ' selected' : ''}"
             onclick="event.stopPropagation();setTaskAssignee('${taskId}','${n.replace(/'/g,"\\'")}')">
       ${n}
     </button>`
  ).join('');
  return `${chips}
    <button class="assignee-add-btn" title="Lägg till person" onclick="event.stopPropagation();toggleAssigneeInput('${taskId}')">+</button>
    <input class="assignee-new-input hidden" id="assignee-input-${taskId}"
           placeholder="Namn…"
           onkeydown="if(event.key==='Enter'){event.preventDefault();addNewAssignee('${taskId}')}"
           onclick="event.stopPropagation()" />`;
}
function renderAssigneePicker(taskId) {
  const taskDef = TASK_LIBRARY.find(t => t.id === taskId);
  const label = (taskDef && taskDef.assigneeLabel) || 'Ansvarig';
  return `<div class="task-assignee-section">
    <span class="task-assignee-label">${label}</span>
    <div class="assignee-picker" id="assignee-picker-${taskId}">
      ${_buildAssigneePickerInner(taskId)}
    </div>
  </div>`;
}

// ─── PARTICIPANTS ──────────────────────────────
function _getParticipants() {
  return state.participants || [];
}
function addParticipant() {
  const input = document.getElementById('ob-participant-input');
  const name = input?.value.trim();
  if (!name) return;
  if (!state.participants) state.participants = [];
  if (!state.participants.includes(name)) {
    state.participants.push(name);
    saveState();
  }
  input.value = '';
  _refreshParticipantList();
}
function removeParticipant(name) {
  state.participants = (state.participants || []).filter(n => n !== name);
  saveState();
  _refreshParticipantList();
}
function _refreshParticipantList() {
  const container = document.getElementById('ob-participant-list');
  if (!container) return;
  container.innerHTML = (state.participants || []).map(name =>
    `<div class="ob-participant-chip">
      <span>${name}</span>
      <button onclick="removeParticipant('${name.replace(/'/g, "\\'")}')" aria-label="Ta bort ${name}">×</button>
    </div>`
  ).join('');
}

// ─── NOTIFY LIST ──────────────────────────────
function _getNotifyList() {
  try { return JSON.parse(localStorage.getItem('efterplan_notify_list') || '[]'); } catch(e) { return []; }
}
function _saveNotifyList(list) {
  try { localStorage.setItem('efterplan_notify_list', JSON.stringify(list)); } catch(e) {}
}
function _genNotifyId() {
  return Math.random().toString(36).slice(2, 10);
}

function addNotifyPerson() {
  const input = document.getElementById('notify-new-input');
  const name = input?.value.trim();
  if (!name) return;
  const list = _getNotifyList();
  list.push({ id: _genNotifyId(), name, notified: false, notifier: '' });
  _saveNotifyList(list);
  input.value = '';
  _refreshNotifyList();
}

function toggleNotified(personId) {
  const list = _getNotifyList();
  const person = list.find(p => p.id === personId);
  if (person) { person.notified = !person.notified; _saveNotifyList(list); }
  _refreshNotifyList();
}

function removeNotifyPerson(personId) {
  const list = _getNotifyList().filter(p => p.id !== personId);
  _saveNotifyList(list);
  _refreshNotifyList();
}

function setNotifyNotifier(personId, notifier) {
  const list = _getNotifyList();
  const person = list.find(p => p.id === personId);
  if (person) { person.notifier = notifier; _saveNotifyList(list); }
}

function _refreshNotifyList() {
  const container = document.getElementById('notify-list-container');
  if (!container) return;
  container.innerHTML = _buildNotifyListInner();
  const list = _getNotifyList();
  const done = list.filter(p => p.notified).length;
  const el = document.getElementById('notify-counter');
  if (el) el.textContent = list.length ? `${done} av ${list.length} meddelade` : '';
}

function _buildNotifyListInner() {
  const list = _getNotifyList();
  const participants = _getParticipants();
  if (!list.length) return '<p class="notify-empty">Inga tillagda än</p>';
  return list.map(p => {
    const safeId = p.id;
    const notifierSelect = participants.length > 0
      ? `<select class="notify-notifier-select" onclick="event.stopPropagation()"
           onchange="event.stopPropagation();setNotifyNotifier('${safeId}',this.value)">
           <option value="">Vem ringer?</option>
           ${participants.map(n => `<option value="${n}"${p.notifier === n ? ' selected' : ''}>${n}</option>`).join('')}
         </select>`
      : '';
    return `
      <div class="notify-person${p.notified ? ' notified' : ''}">
        <button class="notify-check${p.notified ? ' checked' : ''}"
          onclick="event.stopPropagation();toggleNotified('${safeId}')"
          aria-label="Markera ${p.name} som meddelad">${p.notified ? '✓' : ''}</button>
        <span class="notify-name">${p.name}</span>
        ${notifierSelect}
        <button class="notify-remove"
          onclick="event.stopPropagation();removeNotifyPerson('${safeId}')"
          aria-label="Ta bort ${p.name}">×</button>
      </div>`;
  }).join('');
}

function renderNotifyList() {
  const list = _getNotifyList();
  const done = list.filter(p => p.notified).length;
  const counterText = list.length ? `${done} av ${list.length} meddelade` : '';
  return `<div class="notify-list-section">
    <div class="notify-list-header">
      <span class="notify-list-label">Att underrätta</span>
      <span class="notify-counter" id="notify-counter">${counterText}</span>
    </div>
    <div class="notify-list-items" id="notify-list-container">
      ${_buildNotifyListInner()}
    </div>
    <div class="notify-add-row">
      <input class="notify-new-input" id="notify-new-input" type="text"
        placeholder="Lägg till person…"
        onclick="event.stopPropagation()"
        onkeydown="if(event.key==='Enter'){event.stopPropagation();addNotifyPerson();}" />
      <button class="notify-add-btn" onclick="event.stopPropagation();addNotifyPerson()">Lägg till</button>
    </div>
  </div>`;
}

// ─── UNDO TOAST ───────────────────────────────
let _undoTaskId  = null;
let _undoTimer   = null;

function showUndoToast(taskId) {
  _undoTaskId = taskId;
  clearTimeout(_undoTimer);
  const toast = document.getElementById('undo-toast');
  toast.classList.remove('hidden');
  _undoTimer = setTimeout(() => {
    toast.classList.add('hidden');
    _undoTaskId = null;
  }, 4000);
}

function undoTaskDone() {
  if (!_undoTaskId) return;
  clearTimeout(_undoTimer);
  document.getElementById('undo-toast').classList.add('hidden');

  const taskId = _undoTaskId;
  _undoTaskId = null;

  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done    = false;
  task.started = false;
  saveTaskState();
  renderPlan();   // full re-render restores accordion, buttons, notes
}

function undoTaskDoneManual(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done    = false;
  task.started = false;
  saveTaskState();
  renderPlan();
}

// ─── MODALS ───────────────────────────────────
let _modalPrevFocus = null;
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function openModal(id) {
  _modalPrevFocus = document.activeElement;
  const overlay = document.getElementById(id);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Focus first focusable element inside
  const first = overlay.querySelector(FOCUSABLE);
  if (first) setTimeout(() => first.focus(), 50);
  // Focus trap
  overlay.addEventListener('keydown', _trapFocus);
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('hidden');
  overlay.removeEventListener('keydown', _trapFocus);
  document.body.style.overflow = '';
  if (_modalPrevFocus) { _modalPrevFocus.focus(); _modalPrevFocus = null; }
}

function closeModalIfOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}

function _trapFocus(e) {
  if (e.key !== 'Tab') {
    if (e.key === 'Escape') closeModal(e.currentTarget.id);
    return;
  }
  const focusable = [...e.currentTarget.querySelectorAll(FOCUSABLE)].filter(el => !el.disabled);
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

// ─── TABS ────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.plan-tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.getElementById(`tabcontent-${name}`).classList.add('active');
  window.scrollTo(0, 0);
}

// ─── SENDER INFO PERSISTENCE ─────────────────
function saveSenderInfo(name, email) {
  try {
    if (name)  localStorage.setItem('efterplan_sender_name',  name);
    if (email) localStorage.setItem('efterplan_sender_email', email);
  } catch(e) {}
}
function getSenderInfo() {
  return {
    name:  localStorage.getItem('efterplan_sender_name')  || '',
    email: localStorage.getItem('efterplan_sender_email') || ''
  };
}
function getRelationLabel() {
  const map = { partner: 'Make/Maka', foralder: 'Barn', syskon: 'Syskon', barn: 'Förälder', annan: '' };
  return map[state.relation] || '';
}

// ─── DOCUMENT GENERATOR ──────────────────────
function getDocContext() {
  return {
    deceased: state.name     || '[NAMN PÅ AVLIDEN]',
    personnr: state.personnr || '[PERSONNUMMER]',
    today:    formatDate(new Date()),
  };
}

function showDocForm(type) {
  document.getElementById('doc-chooser').classList.add('hidden');
  document.querySelectorAll('.doc-form').forEach(f => f.classList.add('hidden'));

  const sender = getSenderInfo();
  const relation = getRelationLabel();

  if (type === 'annons') {
    const el = document.getElementById('annons-name');
    if (el && !el.value && state.name) el.value = state.name;
  }
  if (type === 'forsakring') {
    const saved = getTaskNote('forsakringar');
    const el = document.getElementById('fors-bolag');
    if (el && !el.value && saved) el.value = saved.split('\n')[0];
    const sEl = document.getElementById('fors-sender');
    if (sEl && !sEl.value && sender.name) sEl.value = sender.name;
    const eEl = document.getElementById('fors-email');
    if (eEl && !eEl.value && sender.email) eEl.value = sender.email;
    const rEl = document.getElementById('fors-relation');
    if (rEl && !rEl.value && relation) rEl.value = relation;
  }
  if (type === 'bank') {
    const saved = getTaskNote('banker');
    const el = document.getElementById('bank-name');
    if (el && !el.value && saved) el.value = saved.split('\n')[0];
    const sEl = document.getElementById('bank-sender');
    if (sEl && !sEl.value && sender.name) sEl.value = sender.name;
    const eEl = document.getElementById('bank-email');
    if (eEl && !eEl.value && sender.email) eEl.value = sender.email;
    const rEl = document.getElementById('bank-relation');
    if (rEl && !rEl.value && relation) rEl.value = relation;
  }
  if (type === 'letter') {
    const sEl = document.getElementById('letter-sender');
    if (sEl && !sEl.value && sender.name) sEl.value = sender.name;
    const eEl = document.getElementById('letter-email');
    if (eEl && !eEl.value && sender.email) eEl.value = sender.email;
  }
  if (type === 'bulk') {
    initBulkForm();
    const abNotes = getTaskNote('abonnemang');
    if (abNotes) {
      const services = abNotes.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
      if (services.length > 0) {
        document.getElementById('bulk-rows').innerHTML = '';
        _bulkRowId = 0;
        services.forEach(svc => {
          addBulkRow();
          const rows = document.querySelectorAll('#bulk-rows .bulk-row');
          const lastRow = rows[rows.length - 1];
          const input = lastRow?.querySelector('.bulk-name');
          if (input) input.value = svc;
        });
        addBulkRow(); // one empty row at end
      }
    }
    const sEl = document.getElementById('bulk-sender');
    if (sEl && !sEl.value && sender.name) sEl.value = sender.name;
    const eEl = document.getElementById('bulk-email');
    if (eEl && !eEl.value && sender.email) eEl.value = sender.email;
  }

  document.getElementById(`doc-form-${type}`).classList.remove('hidden');
  window.scrollTo(0, 0);
}

function backToDocChooser() {
  document.querySelectorAll('.doc-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('doc-result-bulk').classList.add('hidden');
  document.getElementById('doc-chooser').classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ─── BULK UPPSÄGNING ──────────────────────────
let _bulkRowId = 0;

function initBulkForm() {
  _bulkRowId = 0;
  document.getElementById('bulk-rows').innerHTML = '';
  addBulkRow();
  addBulkRow();
  addBulkRow();
}

function addBulkRow() {
  _bulkRowId++;
  const id = _bulkRowId;
  const row = document.createElement('div');
  row.className = 'bulk-row';
  row.id = `brow-${id}`;
  row.innerHTML = `
    <input type="text" class="text-input bulk-name" placeholder="Tjänst (t.ex. Spotify, Telia, Netflix…)" />
    <input type="text" class="text-input bulk-custnr" placeholder="Kundnr (valfritt)" />
    <button class="bulk-remove" onclick="removeBulkRow(${id})" aria-label="Ta bort">✕</button>`;
  document.getElementById('bulk-rows').appendChild(row);
}

function removeBulkRow(id) {
  const rows = document.querySelectorAll('.bulk-row');
  if (rows.length > 1) document.getElementById(`brow-${id}`)?.remove();
}

function generateBulkLetters() {
  const sender = document.getElementById('bulk-sender').value.trim();
  const email  = document.getElementById('bulk-email').value.trim();
  clearFormError('err-bulk');
  if (!sender || !email) { showFormError('err-bulk', 'Fyll i ditt namn och din e-post.'); return; }
  saveSenderInfo(sender, email);

  const services = [];
  document.querySelectorAll('.bulk-row').forEach(row => {
    const name   = row.querySelector('.bulk-name').value.trim();
    const custnr = row.querySelector('.bulk-custnr').value.trim();
    if (name) services.push({ name, custnr });
  });
  if (services.length === 0) { showFormError('err-bulk', 'Lägg till minst en tjänst med namn.'); return; }

  const { deceased, personnr, today } = getDocContext();

  const letters = services.map(({ name, custnr }) => ({
    service: name,
    text: `${sender}\n${email}\n\n${today}\n\nTill: ${name}\nÄrende: Avslutning av abonnemang — dödsfall${custnr ? '\nKundnummer: ' + custnr : ''}\n\nHej,\n\nJag kontaktar er angående abonnemanget som tillhörde ${deceased} (personnr ${personnr}), som tyvärr har gått bort.\n\nJag ber er härmed avsluta abonnemanget snarast möjligt och begär återbetalning för eventuell förbetald period efter avslutsdatum.\n\nJag bifogar dödsbevis och är tillgänglig för frågor via e-post.\n\nVänligen bekräfta avslut skriftligen.\n\nMed vänliga hälsningar,\n\n${sender}\n${email}`,
  }));

  const container = document.getElementById('bulk-letters-list');
  container.innerHTML = '';
  letters.forEach((letter, i) => {
    const div = document.createElement('div');
    div.className = 'bulk-letter';
    div.innerHTML = `
      <div class="bulk-letter-head">
        <span class="bulk-letter-name">${letter.service}</span>
        <button class="btn-primary btn-sm" onclick="copyBulkLetter(${i})">Kopiera</button>
      </div>
      <div class="doc-output" id="bletter-${i}">${letter.text}</div>
      <p class="copied-msg hidden" id="bcopied-${i}">Kopierat!</p>`;
    container.appendChild(div);
  });

  document.getElementById('doc-chooser').classList.add('hidden');
  document.querySelectorAll('.doc-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('doc-result-bulk').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function copyBulkLetter(i) {
  const text = document.getElementById(`bletter-${i}`).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById(`bcopied-${i}`);
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2000);
  });
}

function generateLetter() {
  const service = document.getElementById('letter-service').value.trim();
  const custnr  = document.getElementById('letter-custnr').value.trim();
  const sender  = document.getElementById('letter-sender').value.trim();
  const email   = document.getElementById('letter-email').value.trim();
  clearFormError('err-letter');
  if (!service || !sender || !email) { showFormError('err-letter', 'Fyll i de obligatoriska fälten (märkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();
  const custnrLine = custnr ? `\nKundnummer: ${custnr}` : '';

  showDocResult('Uppsägningsbrev — ' + service, `${sender}
${email}

${today}

Till: ${service}
Ärende: Avslutning av abonnemang — dödsfall${custnrLine}

Hej,

Jag kontaktar er angående abonnemanget som tillhörde ${deceased} (personnr ${personnr}), som tyvärr har gått bort.

Jag ber er härmed avsluta abonnemanget snarast möjligt och begär återbetalning för eventuell förbetald period efter avslutsdatum.

Jag bifogar dödsbevis och är tillgänglig för eventuella frågor via e-post.

Vänligen bekräfta avslut skriftligen.

Med vänliga hälsningar,

${sender}
${email}`);
}

function generateBank() {
  const bank     = document.getElementById('bank-name').value.trim();
  const sender   = document.getElementById('bank-sender').value.trim();
  const relation = document.getElementById('bank-relation').value.trim();
  const email    = document.getElementById('bank-email').value.trim();
  clearFormError('err-bank');
  if (!bank || !sender || !relation || !email) { showFormError('err-bank', 'Fyll i de obligatoriska fälten (märkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Brev till ' + bank, `${sender}
${email}

${today}

Till: ${bank}
Ärende: Dödsfallsnotifiering — begäran om kontospärr och tillgångsinformation

Hej,

Jag skriver till er med anledning av att ${deceased} (personnr ${personnr}) har gått bort. Jag är ${relation} och representerar dödsboet.

Jag begär härmed att:

1. Samtliga konton tillhörande ${deceased} spärras tills bouppteckning är genomförd.
2. En förteckning över befintliga konton och tillgångar skickas till mig.
3. Ni bekräftar skriftligen att ni tagit emot detta meddelande.

Dödsbevis bifogas detta brev. Ytterligare dokumentation (bouppteckning, fullmakt) skickas så snart det är tillgängligt.

För frågor, kontakta mig på angiven e-postadress.

Med vänliga hälsningar,

${sender}
${relation} till ${deceased}
${email}`);
}

function generateForsakring() {
  const bolag    = document.getElementById('fors-bolag').value.trim();
  const sender   = document.getElementById('fors-sender').value.trim();
  const relation = document.getElementById('fors-relation').value.trim();
  const email    = document.getElementById('fors-email').value.trim();
  clearFormError('err-forsakring');
  if (!bolag || !sender || !relation || !email) { showFormError('err-forsakring', 'Fyll i de obligatoriska fälten (märkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Brev till ' + bolag, `${sender}
${email}

${today}

Till: ${bolag}
Ärende: Dödsfallsanmälan — begäran om utredning av försäkringar

Hej,

Jag kontaktar er för att anmäla att ${deceased} (personnr ${personnr}) har gått bort.

Jag är ${relation} och ber er:

1. Bekräfta vilka försäkringar som fanns hos er på den avlidnes namn.
2. Informera om eventuell utbetalning av livförsäkring eller begravningsförsäkring.
3. Avsluta löpande försäkringar från och med dödsdatum.

Dödsbevis bifogas. Kontakta mig för ytterligare dokumentation.

Med vänliga hälsningar,

${sender}
${relation} till ${deceased}
${email}`);
}

function generateAnnons() {
  const name      = document.getElementById('annons-name').value.trim();
  const born      = document.getElementById('annons-born').value.trim();
  const died      = document.getElementById('annons-died').value.trim();
  const survivors = document.getElementById('annons-survivors').value.trim();
  const memory    = document.getElementById('annons-memory').value.trim();
  const funeral   = document.getElementById('annons-funeral').value.trim();
  const ovrigt    = document.getElementById('annons-ovrigt').value.trim();

  clearFormError('err-annons');
  if (!name) { showFormError('err-annons', 'Ange den avlidnes namn.'); return; }

  const lifeSpan  = (born && died) ? `${born} – ${died}` : (died ? `Avled ${died}` : '');
  const memLine   = memory ? `\n${memory}\n` : '';
  const survLine  = survivors ? `\nEfterlämnas av ${survivors}.` : '';
  const funLine   = funeral ? `\nBegravning: ${funeral}.` : '\nBegravning meddelas i god tid.';
  const ovrigtLine = ovrigt ? `\n\n${ovrigt}` : '';

  showDocResult('Dödsannons — ' + name, `${name}
${lifeSpan}
${memLine}${survLine}
${funLine}

Sörjd och saknad.${ovrigtLine}`.trim());
}

function showDocResult(title, text, emailSubject) {
  document.querySelectorAll('.doc-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('doc-chooser').classList.add('hidden');
  document.getElementById('result-title').textContent = title;
  document.getElementById('doc-output-text').textContent = text;
  document.getElementById('doc-result').classList.remove('hidden');
  document.getElementById('copied-msg').classList.add('hidden');
  const mailtoBtn = document.getElementById('result-mailto');
  if (mailtoBtn) {
    const subj = encodeURIComponent(emailSubject || title);
    const body = encodeURIComponent(text);
    mailtoBtn.href = `mailto:?subject=${subj}&body=${body}`;
  }
}

function generateSkatteverket() {
  const arende   = document.getElementById('skv-arende').value;
  const sender   = document.getElementById('skv-sender').value.trim();
  const relation = document.getElementById('skv-relation').value.trim();
  const email    = document.getElementById('skv-email').value.trim();
  clearFormError('err-skatteverket');
  if (!sender || !relation || !email) { showFormError('err-skatteverket', 'Fyll i de obligatoriska fälten (märkta med *).'); return; }

  const { deceased, personnr, today } = getDocContext();

  const arendeTexts = {
    intyg:    { subject: 'Begäran om dödsfallsintyg och personbevis för dödsbo', body: `Jag kontaktar er för att begära dödsfallsintyg och personbevis avseende dödsboet efter ${deceased} (personnr ${personnr}), som gick bort nyligen.\n\nDokumenten behövs för dödsboets räkning i samband med bouppteckning och kontakt med banker och myndigheter.\n\nJag är ${relation} och dödsbodelägare. Vänligen skicka handlingarna till angiven e-postadress, eller meddela hur ansökan görs via er e-tjänst.` },
    fskatt:   { subject: 'Begäran om avslut av F-skatt — dödsfall', body: `Jag kontaktar er med anledning av att ${deceased} (personnr ${personnr}) har gått bort och att den av hen bedrivna enskilda näringsverksamheten därmed ska avslutas.\n\nJag ber er avregistrera F-skatten och eventuell mervärdesskatt (moms) med dödsdatum som slutdatum.\n\nJag är ${relation} och företräder dödsboet. Dödsbevis bifogas. Kontakta mig för ytterligare dokumentation.` },
    slutskatt: { subject: 'Begäran om information om slutlig skatt — dödsfall', body: `Jag kontaktar er angående slutlig skatt för ${deceased} (personnr ${personnr}), som har gått bort.\n\nJag ber er bekräfta om det finns kvarsstående skattefordringar eller skatteåterbäring att reglera, samt hur dödsboet ska gå till väga.\n\nJag är ${relation} och dödsbodelägare. Vänligen kontakta mig på angiven e-postadress.` },
  };

  const { subject, body } = arendeTexts[arende];

  showDocResult(`Skatteverket — ${subject}`, `${sender}\n${email}\n\n${today}\n\nTill: Skatteverket\nÄrende: ${subject}\n\nHej,\n\n${body}\n\nMed vänliga hälsningar,\n\n${sender}\n${relation} till ${deceased}\n${email}`, subject);
}


function generateFullmakt() {
  const grantor1 = document.getElementById('fullmakt-grantor1').value.trim();
  const grantor2 = document.getElementById('fullmakt-grantor2').value.trim();
  const agent    = document.getElementById('fullmakt-agent').value.trim();
  const relation = document.getElementById('fullmakt-relation').value.trim();
  clearFormError('err-fullmakt');
  if (!grantor1 || !agent) { showFormError('err-fullmakt', 'Fyll i de obligatoriska fälten (märkta med *).'); return; }

  const { deceased, personnr, today } = getDocContext();
  const grantors = grantor2 ? `${grantor1} och ${grantor2}` : grantor1;
  const agentLine = relation ? `${agent} (${relation})` : agent;

  showDocResult('Fullmakt — dödsbo', `FULLMAKT
Utfärdad: ${today}

Vi, undertecknade dödsbodelägare efter ${deceased} (personnr ${personnr}), ger härmed

  ${agentLine}

fullmakt att för dödsboets räkning:

• Kontakta och företräda dödsboet gentemot banker och finansinstitut
• Begära kontoinformation och genomföra betalningar ur dödsboets medel
• Teckna dödsboets namn i löpande ärenden
• Kontakta myndigheter (Skatteverket, Kronofogden m.fl.) å dödsboets vägnar
• Säga upp avtal och abonnemang tillhörande ${deceased}

Fullmakten gäller tills dödsboet är avslutat och ska uppvisas i original vid bankbesök.


______________________________    ______________________________
${grantors}
Dödsbodelägare                    Datum och ort`);
}


function printBulkLetters() {
  const letters = [];
  document.querySelectorAll('[id^="bletter-"]').forEach(el => {
    letters.push(el.innerText);
  });
  if (!letters.length) return;
  const pages = letters.map((letter, i) =>
    `<div style="page-break-after:${i < letters.length - 1 ? 'always' : 'auto'};white-space:pre-wrap;font-family:Georgia,serif;font-size:11pt;line-height:1.8;padding:40px 50px;">${letter}</div>`
  ).join('');
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><title>Brev — dödsbo</title></head><body>${pages}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
}

function copyDocument() {
  const text = document.getElementById('doc-output-text').textContent;
  copyToClipboard(text, () => {
    const msg = document.getElementById('copied-msg');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  });
}

// ─── SHARE MODAL ─────────────────────────────
function getShareableState() {
  return {
    relation:   state.relation,
    testamente: state.testamente,
    fastighet:  state.fastighet,
    foretag:    state.foretag,
    skulder:    state.skulder,
    utland:     state.utland,
    minderarig: state.minderarig,
    ansvar:       state.ansvar,
    name:         state.name,
    participants: state.participants || [],
    // personnr intentionally excluded from share links (privacy)
  };
}

function generateShareURL() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(getShareableState()))));
  return `${location.origin}${location.pathname}#plan=${encoded}`;
}

function openShareModal() {
  const url = generateShareURL();
  if (navigator.share) {
    navigator.share({
      title: 'Efterplan — ' + (state.name ? state.name + 's plan' : 'min plan'),
      text: 'Här är min plan för dödsboet.',
      url
    }).catch(() => {}); // user cancelled
    return;
  }
  document.getElementById('share-url-box').textContent = url;
  document.getElementById('share-confirm').classList.add('hidden');
  openModal('modal-share');
}

function toggleMemoryPhrase(btn) {
  btn.classList.toggle('selected');
  const selected = [...document.querySelectorAll('#memory-chips .phrase-chip.selected')]
    .map(b => b.textContent).join('. ');
  const ta = document.getElementById('annons-memory');
  if (ta && !ta.dataset.manual) ta.value = selected ? selected + '.' : '';
}


function copyShareLink() {
  const url = document.getElementById('share-url-box').textContent;
  copyToClipboard(url, () => {
    const msg = document.getElementById('share-confirm');
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 2500);
  });
}

// ─── FORM VALIDATION ─────────────────────────
function showFormError(errId, msg) {
  const el = document.getElementById(errId);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function clearFormError(errId) {
  const el = document.getElementById(errId);
  if (el) el.classList.add('hidden');
}

// ─── UTILS ────────────────────────────────────
function formatDate(date) {
  return date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
}

function copyToClipboard(text, onDone) {
  navigator.clipboard.writeText(text).then(onDone).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    onDone();
  });
}

// ─── PERSIST ─────────────────────────────────
function saveState() {
  // Save locally with personnr (own device only — never shared)
  const toSave = { ...getShareableState(), personnr: state.personnr };
  try { localStorage.setItem('efterplan_state', JSON.stringify(toSave)); } catch(e) {}
}

// ─── INIT ─────────────────────────────────────
(function init() {
  // 1. Check for shared plan in URL hash
  const hash = location.hash;
  if (hash.startsWith('#plan=')) {
    try {
      Object.assign(state, JSON.parse(decodeURIComponent(escape(atob(hash.slice(6))))));
      buildTasks();
      renderPlan();
      showScreen('screen-plan');
      const banner = document.getElementById('shared-banner');
      if (banner) {
        banner.classList.remove('hidden');
        const nameEl = document.getElementById('shared-banner-name');
        if (nameEl) nameEl.textContent = state.name ? state.name + 's plan' : 'planen';
      }
      return;
    } catch(e) {}
  }

  // 2. Restore own plan from localStorage
  try {
    const saved = localStorage.getItem('efterplan_state') || localStorage.getItem('efterplan_state');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
      buildTasks();
      loadTaskState();
      renderPlan();
      showScreen('screen-plan');
    }
  } catch(e) {}
})();
