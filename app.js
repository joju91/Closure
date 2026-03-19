/* ═══════════════════════════════════════════
   CLOSURE — App Logic
   MVP v1.0
════════════════════════════════════════════ */

// ─── STATE ───────────────────────────────────
const state = {
  relation:    null,
  timing:      null,
  testamente:  false,
  fastighet:   false,
  foretag:     false,
  skulder:     false,
  utland:      false,
  minderarig:  false,
  ansvar:      null,
  name:        '',
  personnr:    '',
  tasks:       [],
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

// ─── ONBOARDING (conversational) ─────────────
const OB_TOTAL = 6;
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
  for (let i = 1; i <= OB_TOTAL; i++) {
    const dot = document.getElementById(`ob-dot-${i}`);
    if (!dot) continue;
    dot.className = 'ob-dot';
    if (i < step)   dot.classList.add('done');
    if (i === step) dot.classList.add('active');
  }
}

function obChoose(btn, nextStep) {
  const key = btn.dataset.key;
  const val = btn.dataset.val;
  state[key] = val;

  btn.closest('.ob-choices').querySelectorAll('.ob-choice').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  setTimeout(() => obGoTo(nextStep), 220);
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

const OB_FOCUS_IDS = { 5: 'deceased-name' };  /* steg 6 auto-fokuserar ej — tangentbordet ska inte öppnas automatiskt */

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
  if (obCurrentStep <= 1) { goToLanding(); return; }
  obGoTo(obCurrentStep - 1);
}

function updateCheckboxState() {
  document.querySelectorAll('#ob-step-3 input[type="checkbox"]').forEach(cb => {
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
    id: 'begravningsbyra',
    title: 'Kontakta en begravningsbyrå',
    desc: 'Begravningsbyrån tar hand om kroppen och hjälper dig med det praktiska kring begravningen. Du behöver inte ha alla svar klara när du ringer — de guidar dig. Några alternativ att börja med:',
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
    id: 'narmaste_anhörig',
    title: 'Meddela närmaste anhöriga',
    desc: 'Om du inte redan gjort det — informera familj och nära vänner om vad som hänt. Det är okej att be någon annan hjälpa till med detta.',
    urgency: 'today',
    time: 'Din tid',
    link: null,
    triggers: [],
  },
  {
    id: 'skatteverket',
    title: 'Skatteverket registrerar dödsfallet automatiskt',
    desc: 'I Sverige registrerar sjukhuset eller begravningsbyrån normalt dödsfallet hos Skatteverket. Du behöver vanligtvis inte göra något — men bekräfta detta med begravningsbyrån.',
    urgency: 'today',
    time: 'ca 5 min',
    link: 'https://www.skatteverket.se',
    phone: '0771-567 567',
    triggers: [],
  },
  {
    id: 'dodsbevis',
    title: 'Beställ dödsbevis',
    desc: 'Du behöver dödsbevis för att hantera banker, försäkringar och myndigheter. Begravningsbyrån hjälper ofta till, annars beställer du det via Skatteverket. Ha personnumret tillgängligt när du ringer.',
    urgency: 'today',
    time: 'ca 15 min',
    link: 'https://www.skatteverket.se',
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
    id: 'bouppteckning',
    title: 'Planera bouppteckningen',
    desc: 'En bouppteckning är en förteckning över den avlidnes tillgångar och skulder. Den ska göras inom 3 månader. Du kan anlita en jurist — det rekommenderas om boet är komplext. Några alternativ:',
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
  },
  {
    id: 'forsakringar',
    title: 'Gå igenom försäkringar',
    desc: 'Kontrollera om det finns livförsäkring, olycksfallsförsäkring, hemförsäkring eller begravningsförsäkring. Ring respektive bolag och uppge personnummer och dödsbevis. Skriv ned vad du hittar nedan.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: null,
    triggers: [],
    hasDoc: 'forsakring',
    notesPlaceholder: 'Vet du något försäkringsbolag? Skriv det du hittar — ett i taget är bra nog. (t.ex. Folksam, If, Skandia…)',
  },
  {
    id: 'abonnemang',
    title: 'Avsluta abonnemang och prenumerationer',
    desc: 'Mobil, streaming, tidningar, el, gym — säg upp tjänster en efter en. Använd dokumentgeneratorn för att skapa uppsägningsbrev. Skriv ned det du vet eller hittar nedan.',
    urgency: 'week',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: [],
    hasDoc: 'letter',
    notesPlaceholder: 'Vet du några abonnemang eller tjänster? Notera dem här — du kan fylla på. (t.ex. Telia, Spotify, Netflix, el, gym…)',
  },
  {
    id: 'dodsannons',
    title: 'Dödsannons (om aktuellt)',
    desc: 'Begravningsbyrån hjälper ofta till med dödsannonsen som en del av sina tjänster — fråga dem om det ingår. Vill ni publicera en egen annons i tidning eller på sociala medier kan Closure hjälpa dig formulera den.',
    urgency: 'week',
    time: 'ca 15 min',
    link: null,
    triggers: [],
    hasDoc: 'annons',
  },
  {
    id: 'arbetsgivare',
    title: 'Kontakta arbetsgivaren (om aktuellt)',
    desc: 'Om den avlidne var anställd: meddela arbetsgivaren om dödsfallet. Det kan finnas tjänstepension eller andra förmåner att ta tillvara.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: [],
  },

  // ── LATER ──────────────────────────────────
  {
    id: 'arvskifte',
    title: 'Genomför arvskifte',
    desc: 'När bouppteckningen är klar delas tillgångarna upp enligt testamente eller lag. Detta kan ta tid och görs ofta med hjälp av jurist.',
    urgency: 'later',
    time: 'Månader efter dödsfallet',
    link: null,
    triggers: [],
  },
  {
    id: 'avsluta_konton',
    title: 'Avsluta digitala konton',
    desc: 'E-post, sociala medier och andra onlinetjänster behöver avslutas eller minnesmärkas. Tänk på att spara viktig information (foton, dokument) innan du stänger konton. Notera vad du hittar nedan.',
    urgency: 'later',
    time: 'ca 1–2 timmar',
    link: null,
    triggers: [],
    notesPlaceholder: 'Vet du några konton? Skriv de du hittar — det är okej att börja tomt. (t.ex. Facebook, Google, iCloud, email…)',
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
    id: 'fastighet_lagfart',
    title: 'Lagfartsutredning — fastighet',
    desc: 'Om den avlidne ägde en fastighet behöver du ansöka om lagfartsändring hos Lantmäteriet. Görs efter avslutad bouppteckning.',
    urgency: 'later',
    time: 'Kontakta jurist',
    link: 'https://www.lantmateriet.se',
    triggers: ['fastighet'],
  },
  {
    id: 'fastighet_boende',
    title: 'Besluta om bostadens framtid',
    desc: 'Ska bostaden säljas, övertas av anhörig, eller hyras ut? Ta detta beslut med alla delägare i boet.',
    urgency: 'week',
    time: 'Diskussion med familjen',
    link: null,
    triggers: ['fastighet'],
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
    desc: 'Ska bolaget avvecklas, säljas, eller tas över av arvinge? Detta är komplext — anlita en revisor och jurist tidigt.',
    urgency: 'week',
    time: 'Kontakta revisor',
    link: null,
    triggers: ['foretag'],
  },

  // ── CONDITIONAL: Skulder ──────────────────
  {
    id: 'skulder_inventering',
    title: 'Inventera skulder noggrant',
    desc: 'Skulder betalas av dödsboet innan arv utbetalas. Se till att ha en komplett bild — lån, krediter, obetalda räkningar.',
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
    desc: 'Tillgångar i annat land lyder under det landets lagar. Du behöver sannolikt lokal hjälp — Closure kan inte hantera detta automatiskt.',
    urgency: 'week',
    time: 'Kontakta jurist',
    link: null,
    triggers: ['utland'],
  },

  // ── CONDITIONAL: Minderårigt barn ─────────
  {
    id: 'minderarig_goman',
    title: 'Utred om god man behövs för minderårigt barn',
    desc: 'Om ett minderårigt barn är delägare i dödsboet kan en god man behöva utses. Kontakta tingsrätten eller socialtjänsten.',
    urgency: 'today',
    time: 'Ring tingsrätten',
    link: null,
    triggers: ['minderarig'],
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

  const addBegravningNote = state.timing === 'veckor';

  state.tasks = TASK_LIBRARY.filter(task =>
    task.triggers.length === 0 || task.triggers.some(t => triggers.has(t))
  ).map(task => {
    const base = { ...task, done: false, started: false };
    if (addBegravningNote && task.id === 'begravningsbyra') {
      return { ...base, desc: base.desc + ' Har begravningsbyrå redan kontaktats? Markera som klar i så fall.' };
    }
    return base;
  });

  loadTaskState();
}

// ─── NOTES (cached) ──────────────────────────
let _notesCache = null;

function _getNotes() {
  if (_notesCache) return _notesCache;
  try { _notesCache = JSON.parse(localStorage.getItem('closure_notes') || '{}'); }
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
  try { localStorage.setItem('closure_notes', JSON.stringify(notes)); } catch(e) {}
}, 400);

function getTaskNote(taskId) {
  return _getNotes()[taskId] || '';
}

function saveTaskState() {
  const saved = {};
  state.tasks.forEach(t => { saved[t.id] = { done: t.done, started: t.started }; });
  try { localStorage.setItem('closure_tasks', JSON.stringify(saved)); } catch(e) {}
}

function loadTaskState() {
  try {
    const saved = JSON.parse(localStorage.getItem('closure_tasks') || '{}');
    state.tasks = state.tasks.map(t => {
      const s = saved[t.id];
      if (!s) return t;
      // Backward-compat: old format stored a boolean
      if (typeof s === 'boolean') return { ...t, done: s, started: false };
      return { ...t, done: s.done || false, started: s.started || false };
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

  renderTaskList('tasks-today', today);
  renderTaskList('tasks-week',  week);
  renderTaskList('tasks-later', later);

  document.getElementById('count-today').textContent = `${today.length} uppgifter`;
  document.getElementById('count-week').textContent  = `${week.length} uppgifter`;
  document.getElementById('count-later').textContent = `${later.length} uppgifter`;

  updateProgress();
}

let expandedTaskId = null;

function renderTaskList(containerId, tasks) {
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
           oninput="saveTaskNote('${task.id}', this.value)">${getTaskNote(task.id)}</textarea>`
      : '';

    const docHtml = task.hasDoc && !task.done
      ? `<button class="task-expand-doc" onclick="event.stopPropagation();switchTab('docs');showDocForm('${task.hasDoc}')">Generera dokument →</button>`
      : '';

    const doneHtml = task.done
      ? `<span class="task-expand-done">Klar ✓</span>`
      : task.started
      ? `<button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`
      : `<button class="task-expand-start-btn" onclick="event.stopPropagation();markTaskStarted('${task.id}')">Påbörjad</button>
         <button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`;

    const cardClass = task.done ? ' done' : task.started ? ' started' : '';
    const checkClass = task.done ? ' checked' : task.started ? ' started' : '';
    const startedBadge = task.started && !task.done
      ? `<span class="task-started-badge">Påbörjad</span>`
      : '';

    wrap.innerHTML = `
      <div class="task-card${cardClass}" id="task-card-${task.id}">
        <div class="task-check${checkClass}" id="check-${task.id}"></div>
        <div class="task-body">
          <div class="task-title">${task.title}</div>
          <div class="task-time">${task.time}${startedBadge}</div>
        </div>
        <div class="task-chevron" id="chevron-${task.id}" aria-hidden="true">›</div>
      </div>
      <div class="task-expand hidden" id="expand-${task.id}">
        <p class="task-expand-desc">${task.desc}</p>
        ${linkHtml}
        ${phoneHtml}
        ${resourcesHtml}
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
  if (task && task.done) return;

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

  if (type === 'annons' && state.name) {
    const el = document.getElementById('annons-name');
    if (el && !el.value) el.value = state.name;
  }
  if (type === 'forsakring') {
    const saved = getTaskNote('forsakringar');
    const el = document.getElementById('fors-bolag');
    if (el && !el.value && saved) el.value = saved.split('\n')[0];
  }

  if (type === 'bulk') {
    initBulkForm();
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

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Banknotifiering — ' + bank, `${sender}
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

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Försäkringsanmälan — ' + bolag, `${sender}
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

  clearFormError('err-annons');
  if (!name) { showFormError('err-annons', 'Ange den avlidnes namn.'); return; }

  const lifeSpan = (born && died) ? `${born} – ${died}` : (died ? `Avled ${died}` : '');
  const memLine  = memory ? `\n${memory}\n` : '';
  const survLine = survivors ? `\nEfterlämnas av ${survivors}.` : '';
  const funLine  = funeral ? `\nBegravning: ${funeral}.` : '\nBegravning meddelas i god tid.';

  showDocResult('Dödsannons — ' + name, `${name}
${lifeSpan}
${memLine}${survLine}
${funLine}

Sörjd och saknad.`.trim());
}

function showDocResult(title, text) {
  document.querySelectorAll('.doc-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('doc-chooser').classList.add('hidden');
  document.getElementById('result-title').textContent = title;
  document.getElementById('doc-output-text').textContent = text;
  document.getElementById('doc-result').classList.remove('hidden');
  document.getElementById('copied-msg').classList.add('hidden');
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
    timing:     state.timing,
    testamente: state.testamente,
    fastighet:  state.fastighet,
    foretag:    state.foretag,
    skulder:    state.skulder,
    utland:     state.utland,
    minderarig: state.minderarig,
    ansvar:     state.ansvar,
    name:       state.name,
    // personnr intentionally excluded from share links (privacy)
  };
}

function generateShareURL() {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(getShareableState()))));
  return `${location.origin}${location.pathname}#plan=${encoded}`;
}

function openShareModal() {
  document.getElementById('share-url-box').textContent = generateShareURL();
  document.getElementById('share-confirm').classList.add('hidden');
  openModal('modal-share');
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
  try { localStorage.setItem('closure_state', JSON.stringify(toSave)); } catch(e) {}
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
    const saved = localStorage.getItem('closure_state');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
      buildTasks();
      renderPlan();
    }
  } catch(e) {}
})();
