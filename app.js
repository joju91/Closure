/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   EFTERPLAN Ã¢â‚¬â€ App Logic
   MVP v1.0
Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FEATURE FLAGS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const PAYWALL_ENABLED = false; // set true when Stripe is wired up

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ STATE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const state = {
  relation:            null,
  testamente:          false,
  fastighet:           false,
  foretag:             false,
  skulder:             false,
  utland:              false,
  minderarig:          false,
  fordon:              false,
  husdjur:             false,
  hyresratt:           false,
  ansvar:              null,
  name:                '',
  personnr:            '',
  participants:        [],
  participantPersonnr: {}, // name Ã¢â€ â€™ personnr
  taskChecklists:      {}, // taskId Ã¢â€ â€™ {key: bool}
  tasks:               [],
  bills:               [],
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SCREENS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goToLanding() { showScreen('screen-landing'); }

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ANALYTICS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Plausible custom events Ã¢â‚¬â€ safe noop if script hasn't loaded
function track(event, props) {
  if (typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }

  if (typeof window.gtag === 'function') {
    const gaEvent = String(event || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40) || 'custom_event';
    window.gtag('event', gaEvent, props || {});
  }
}

function startOnboarding() {
  track('Onboarding Start');
  obCurrentStep = 1;
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active', 'exit'));
  document.getElementById('ob-step-1').classList.add('active');
  document.getElementById('ob-back-btn').style.visibility = 'hidden';
  obInitDots();
  showScreen('screen-onboarding');
}

function editAnswers() {
  const confirmed = window.confirm('Vill du ÃƒÂ¤ndra dina svar? Planen uppdateras nÃƒÂ¤r du ÃƒÂ¤r klar Ã¢â‚¬â€ dina anteckningar och markeringar behÃƒÂ¥lls.');
  if (!confirmed) return;
  startOnboarding();
  obPrefillAnswers();
}

function obPrefillAnswers() {
  // Step 1 Ã¢â‚¬â€ relation
  document.querySelectorAll('#ob-step-1 .ob-choice').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.val === state.relation);
  });
  if (state.relation) {
    const nb = document.querySelector('#ob-step-1 .ob-next-btn');
    if (nb) nb.disabled = false;
  }
  // Step 2 Ã¢â‚¬â€ checkboxes
  document.querySelectorAll('#ob-step-2 input[type="checkbox"]').forEach(cb => {
    cb.checked = !!state[cb.dataset.key];
  });
  // Step 3 Ã¢â‚¬â€ ansvar
  document.querySelectorAll('#ob-step-3 .ob-choice').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.val === state.ansvar);
  });
  if (state.ansvar) {
    const nb = document.querySelector('#ob-step-3 .ob-next-btn');
    if (nb) nb.disabled = false;
  }
  // Step 4 Ã¢â‚¬â€ participants (if returning to edit)
  const selfInput = document.getElementById('ob-self-name');
  if (selfInput) selfInput.value = state.participants?.[0] || '';
  // Render others (index 1+) as chips
  const _allP = state.participants || [];
  const _others = _allP.slice(1);
  const _savedP = state.participants;
  state.participants = _others;
  renderObParticipantList();
  state.participants = _savedP;
  // Step 5 Ã¢â‚¬â€ name
  const nameEl = document.getElementById('deceased-name');
  if (nameEl) nameEl.value = state.name || '';
  // Step 6 Ã¢â‚¬â€ personnr
  const pnrEl = document.getElementById('deceased-personnr');
  if (pnrEl) pnrEl.value = state.personnr || '';
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ONBOARDING (conversational) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
let OB_TOTAL = 5;
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
  const numStep = step;
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

  // Enable the NÃƒÂ¤sta button for this step
  const step = btn.closest('.ob-step');
  const nextBtn = step?.querySelector('.ob-next-btn');
  if (nextBtn) nextBtn.disabled = false;
}

function obGoTo(step) {
  track('Onboarding Step', { step });
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

const OB_FOCUS_IDS = { 4: 'ob-self-name', 5: 'deceased-name' };  /* tangentbordet ska inte ÃƒÂ¶ppnas automatiskt pÃƒÂ¥ personnr-steget */

function obShowStep(step) {
  const el = document.getElementById(`ob-step-${step}`);
  if (!el) return;
  el.classList.add('active');
  obCurrentStep = step;
  obUpdateDots(step);
  document.getElementById('ob-back-btn').style.visibility = step === 1 ? 'hidden' : 'visible';
  // Update label dynamically to reflect logical step number
  const labelEl = el.querySelector('.ob-label');
  if (labelEl) {
    const logicalStep = (OB_TOTAL === 5 && step >= 5) ? step - 1 : step;
    const suffix = step === 6 ? ' Ã¢â‚¬â€ helt frivilligt' : '';
    labelEl.textContent = `Steg ${logicalStep} av ${OB_TOTAL}${suffix}`;
  }
  if (OB_FOCUS_IDS[step]) {
    setTimeout(() => document.getElementById(OB_FOCUS_IDS[step])?.focus(), 350);
  }
  // Update visual progress bar
  const fillEl = document.getElementById('ob-progress-bar-fill');
  if (fillEl) {
    const logicalStep = (OB_TOTAL === 5 && step >= 5) ? step - 1 : step;
    fillEl.style.width = `${Math.round((logicalStep / OB_TOTAL) * 100)}%`;
  }
}

function obBack() {
  if (obCurrentStep === 1) { goToLanding(); return; }
  // When ensam: step 5 (name) goes back to step 3, skipping participants step 4
  if (obCurrentStep === 5 && state.ansvar === 'ensam') { obGoTo(3); return; }
  obGoTo(obCurrentStep - 1);
}

function obAfterAnsvar() {
  if (state.ansvar === 'flera') {
    OB_TOTAL = 6;
    obInitDots();
    obGoTo(4); // participants step
  } else {
    OB_TOTAL = 5;
    obInitDots();
    obGoTo(5); // skip participants, go straight to name
  }
}

function obSaveParticipantsAndContinue() {
  const selfName = document.getElementById('ob-self-name')?.value.trim() || '';
  // others = chips already added
  const others = state.participants || [];
  // Build final list: self first, then others (deduped)
  const all = selfName ? [selfName, ...others.filter(n => n !== selfName)] : others;
  state.participants = all;
  obGoTo(5);
}

function obAddParticipant() {
  const input = document.getElementById('ob-participant-name');
  const name = input ? input.value.trim() : '';
  if (!name) return;
  if (!state.participants) state.participants = [];
  if (!state.participants.includes(name)) state.participants.push(name);
  if (input) input.value = '';
  renderObParticipantList();
  renderParticipants();
}

function obRemoveParticipant(i) {
  if (!state.participants) return;
  state.participants.splice(i, 1);
  renderObParticipantList();
  renderParticipants();
}

function renderObParticipantList() {
  const list = document.getElementById('ob-participant-list');
  if (!list) return;
  list.innerHTML = (state.participants || []).map((name, i) =>
    `<span class="ob-participant-chip">${name} <button class="ob-participant-remove" type="button" onclick="obRemoveParticipant(${i})" aria-label="Ta bort ${name}">Ãƒâ€”</button></span>`
  ).join('');
}

function updateCheckboxState(key) {
  document.querySelectorAll('#ob-step-2 input[type="checkbox"]').forEach(cb => {
    state[cb.dataset.key] = cb.checked;
  });
  if (key) track('Checkbox Toggle', { key });
}

function generatePlan() {
  state.name     = document.getElementById('deceased-name').value.trim();
  state.personnr = document.getElementById('deceased-personnr').value.trim();
  buildTasks();
  loadTaskState(); // bevara progress/assignees vid "Ãƒâ€žndra svar"
  // Auto-tilldela person1 till uppgifter som saknar ansvarig
  if (state.participants.length > 0) {
    state.tasks.forEach(t => { if (!t.assignee) t.assignee = state.participants[0]; });
  }
  loadBills();
  renderPlan();
  saveState();
  saveTaskState(); // spara default-tilldelningar
  track('Plan Generated', { relation: state.relation || 'okÃƒÂ¤nd', ansvar: state.ansvar || 'okÃƒÂ¤nd' });
  showScreen('screen-plan');
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ RULE ENGINE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Each task: id, title, desc, urgency, time, link, phone?, triggers, hasDoc?, notesPlaceholder?
const TASK_LIBRARY = [

  // Ã¢â€â‚¬Ã¢â€â‚¬ ALWAYS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'konstatera_dodsfall',
    title: 'Konstatera dÃƒÂ¶dsfallet',
    desc: '<strong>Om dÃƒÂ¶dsfallet var ovÃƒÂ¤ntat eller plÃƒÂ¶tsligt Ã¢â‚¬â€ ring 112 omedelbart.</strong><br><br>Om personen avled hemma efter en lÃƒÂ¤ngre tids sjukdom ringer du jourhavande lÃƒÂ¤kare via 1177 Ã¢â‚¬â€ de skickar en lÃƒÂ¤kare som utfÃƒÂ¤rdar dÃƒÂ¶dsbeviset. Utan ett utfÃƒÂ¤rdat dÃƒÂ¶dsbevis kan inget annat steg pÃƒÂ¥bÃƒÂ¶rjas.',
    urgency: 'today',
    time: 'Direkt',
    phone: '112',
    phone2: '1177',
    triggers: [],
    notesPlaceholder: 'Noterat klockslag, vem som kontaktadesÃ¢â‚¬Â¦',
  },
  {
    id: 'narmaste_anhÃƒÂ¶rig',
    title: 'Meddela nÃƒÂ¤rstÃƒÂ¥ende',
    desc: 'Det hÃƒÂ¤r sker i etapper Ã¢â‚¬â€ du behÃƒÂ¶ver inte nÃƒÂ¥ alla pÃƒÂ¥ en gÃƒÂ¥ng. BÃƒÂ¶rja med de allra nÃƒÂ¤rmaste: familj och nÃƒÂ¤ra vÃƒÂ¤nner. Ãƒâ€“vriga kan meddelas under de kommande dagarna. Det ÃƒÂ¤r okej att be nÃƒÂ¥gon annan hjÃƒÂ¤lpa till.',
    urgency: 'today',
    time: 'Din tid',
    link: null,
    triggers: [],
    notesPlaceholder: 'Vem har meddelats, vem ÃƒÂ¥terstÃƒÂ¥rÃ¢â‚¬Â¦',
  },
  {
    id: 'begravningsbyra',
    title: 'Kontakta en begravningsbyrÃƒÂ¥',
    desc: 'BegravningsbyrÃƒÂ¥n tar hand om kroppen, skÃƒÂ¶ter registreringen hos Skatteverket och hjÃƒÂ¤lper dig planera ceremonin. Du behÃƒÂ¶ver inte ha alla svar klara nÃƒÂ¤r du ringer Ã¢â‚¬â€ de guidar dig. NÃƒÂ¥gra alternativ:',
    urgency: 'today',
    time: 'ca 30 min',
    link: null,
    triggers: [],
    resources: [
      { label: 'Fonus Ã¢â‚¬â€ Sveriges stÃƒÂ¶rsta, hitta byrÃƒÂ¥ nÃƒÂ¤ra dig', url: 'https://www.fonus.se' },
      { label: 'Memorial Ã¢â‚¬â€ rikstÃƒÂ¤ckande kedja', url: 'https://www.memorial.se' },
      { label: 'SBF Ã¢â‚¬â€ branschfÃƒÂ¶rbundets byrÃƒÂ¥sÃƒÂ¶k', url: 'https://www.sbf.se' },
    ],
    notesPlaceholder: 'ByrÃƒÂ¥ kontaktad, kontaktperson, datum och tid fÃƒÂ¶r mÃƒÂ¶teÃ¢â‚¬Â¦',
  },
  {
    id: 'dodsbevis',
    title: 'BestÃƒÂ¤ll dÃƒÂ¶dsfallsintyg',
    desc: 'DÃƒÂ¶dsbeviset utfÃƒÂ¤rdas automatiskt av lÃƒÂ¤karen. Det du behÃƒÂ¶ver bestÃƒÂ¤lla ÃƒÂ¤r <strong>dÃƒÂ¶dsfallsintyg med slÃƒÂ¤ktutredning</strong> frÃƒÂ¥n Skatteverket Ã¢â‚¬â€ det ÃƒÂ¤r detta dokument som banker, fÃƒÂ¶rsÃƒÂ¤kringsbolag och myndigheter krÃƒÂ¤ver fÃƒÂ¶r att du ska fÃƒÂ¥ fÃƒÂ¶retrÃƒÂ¤da dÃƒÂ¶dsboet. Ha den <em>avlidnas</em> personnummer tillgÃƒÂ¤ngligt.',
    urgency: 'today',
    time: 'ca 15 min',
    link: 'https://www.skatteverket.se/privat/folkbokforing/dodsfall.html',
    phone: '0771-567 567',
    triggers: [],
    notesPlaceholder: 'Ãƒâ€žrendenummer, vem som bestÃƒÂ¤llde, fÃƒÂ¶rvÃƒÂ¤ntat datumÃ¢â‚¬Â¦',
  },
  {
    id: 'nycklar_post',
    title: 'SÃƒÂ¤kra nycklar och eftersÃƒÂ¤nd post',
    desc: 'Ta hand om bostadsnycklar och gÃƒÂ¶r en adressÃƒÂ¤ndring fÃƒÂ¶r den avlidnes post via adressÃƒÂ¤ndring.se. Viktiga brev kan annars gÃƒÂ¥ fÃƒÂ¶rlorade.',
    urgency: 'today',
    time: 'ca 20 min',
    link: 'https://www.adressandring.se',
    triggers: [],
    notesPlaceholder: 'Var finns nycklarna? AdressÃƒÂ¤ndring gjord hos Postnord?',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ WEEK Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'begravningsceremoni',
    title: 'Planera begravningsceremonin',
    desc: 'BestÃƒÂ¤m vem i familjen som ansvarar fÃƒÂ¶r vad Ã¢â‚¬â€ och se till att nÃƒÂ¥gon fÃƒÂ¶rmedlar era ÃƒÂ¶nskemÃƒÂ¥l till begravningsbyrÃƒÂ¥n.<br><br>Vem ansvarar fÃƒÂ¶r musik? Vem hÃƒÂ¥ller tal? Vem ordnar minnesstunden? Vem samlar in den avlidnas eventuella ÃƒÂ¶nskemÃƒÂ¥l?',
    urgency: 'week',
    time: 'ca 30 min med familjen',
    link: null,
    triggers: [],
    notesPlaceholder: 'Vem ansvarar fÃƒÂ¶r vad Ã¢â‚¬â€ musik, tal, minnesstund, ÃƒÂ¶nskemÃƒÂ¥lÃ¢â‚¬Â¦',
  },
  {
    id: 'fullmakt_dodsbo',
    title: 'UpprÃƒÂ¤tta fullmakt fÃƒÂ¶r dÃƒÂ¶dsboet',
    urgency: 'week',
    time: 'ca 30 min',
    desc: 'NÃƒÂ¤r ni ÃƒÂ¤r flera som ÃƒÂ¤rver mÃƒÂ¥ste normalt alla godkÃƒÂ¤nna varje ÃƒÂ¥tgÃƒÂ¤rd Ã¢â‚¬â€ vilket snabbt blir tungrott. LÃƒÂ¶sningen ÃƒÂ¤r att alla skriver en fullmakt till en person som fÃƒÂ¥r agera fÃƒÂ¶r er gemensamt: betala rÃƒÂ¤kningar, kontakta banker och hantera lÃƒÂ¶pande ÃƒÂ¤renden. Fullmakten mÃƒÂ¥ste visas upp i original vid bankbesÃƒÂ¶k.',
    link: null,
    triggers: ['flera_delÃƒÂ¤gare'],
    hasDoc: 'fullmakt',
    assigneeLabel: 'Vem fÃƒÂ¥r fullmakten?',
  },
  {
    id: 'bouppteckning',
    title: 'Planera bouppteckningen',
    desc: 'En bouppteckning ÃƒÂ¤r en fÃƒÂ¶rteckning ÃƒÂ¶ver den avlidnes tillgÃƒÂ¥ngar och skulder. Den ska vara klar inom 3 mÃƒÂ¥nader och skickas till Skatteverket inom 4 mÃƒÂ¥nader.<br><br><strong>Ãƒâ€žr boet litet?</strong> Om tillgÃƒÂ¥ngarna knappt tÃƒÂ¤cker begravnings- och bouppteckningskostnaderna kan du istÃƒÂ¤llet gÃƒÂ¶ra en <em>dÃƒÂ¶dsboanmÃƒÂ¤lan</em> hos kommunens socialtjÃƒÂ¤nst Ã¢â‚¬â€ det ÃƒÂ¤r gratis och enklare. Kontakta socialtjÃƒÂ¤nsten fÃƒÂ¶r att se om det gÃƒÂ¤ller dig.<br><br><strong>GÃƒÂ¶ra sjÃƒÂ¤lv:</strong> MÃƒÂ¶jligt om boet ÃƒÂ¤r enkelt (bara bankmedel och lÃƒÂ¶sÃƒÂ¶re). KrÃƒÂ¤ver tvÃƒÂ¥ utomstÃƒÂ¥ende vittnen som inte ÃƒÂ¤r arvingar. Sparar 6 500Ã¢â‚¬â€œ15 000 kr.<br><strong>Anlita jurist:</strong> Rekommenderas vid fastighet, fÃƒÂ¶retag, testamente eller om arvingarna inte ÃƒÂ¤r ÃƒÂ¶verens.',
    urgency: 'week',
    time: 'Kontakta jurist inom veckan',
    link: null,
    triggers: [],
    resources: [
      { label: 'Familjens Jurist Ã¢â‚¬â€ rikstÃƒÂ¤ckande, specialiserade pÃƒÂ¥ dÃƒÂ¶dsbon', url: 'https://www.familjens-jurist.se' },
      { label: 'Advokatsamfundet Ã¢â‚¬â€ hitta advokat nÃƒÂ¤ra dig', url: 'https://www.advokatsamfundet.se/hitta-advokat' },
    ],
    notesPlaceholder: 'Jurist kontaktad, offert, datum fÃƒÂ¶r fÃƒÂ¶rrÃƒÂ¤ttningÃ¢â‚¬Â¦',
  },
  {
    id: 'bank_kontakt',
    title: 'Kontakta banken',
    desc: 'Meddela banken om dÃƒÂ¶dsfallet sÃƒÂ¥ att kontona hanteras korrekt. Ha dÃƒÂ¶dsbevis och personnummer redo. Skriv ned vilka banker du kÃƒÂ¤nner till nedan Ã¢â‚¬â€ du kan fylla pÃƒÂ¥ efterhand.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: [],
    hasDoc: 'bank',
    notesPlaceholder: 'Vet du vilka banker? Skriv de du kÃƒÂ¤nner till Ã¢â‚¬â€ det ÃƒÂ¤r okej att bÃƒÂ¶rja med en. (t.ex. Swedbank, SEB, NordeaÃ¢â‚¬Â¦)',
    resources: [
      { label: 'Swedbank Ã¢â‚¬â€ dÃƒÂ¶dsbo & efterlevande', url: 'https://www.swedbank.se/privat/mer-fran-swedbank/dodsfall.html' },
      { label: 'SEB Ã¢â‚¬â€ nÃƒÂ¤r nÃƒÂ¥gon gÃƒÂ¥tt bort', url: 'https://seb.se/privat/dodsfall' },
      { label: 'Nordea Ã¢â‚¬â€ dÃƒÂ¶dsfall och dÃƒÂ¶dsbo', url: 'https://www.nordea.se/privat/livshÃƒÂ¤ndelser/dodsfall/' },
      { label: 'Handelsbanken Ã¢â‚¬â€ dÃƒÂ¶dsfall', url: 'https://www.handelsbanken.se/sv/privat/livet/dodsfall' },
      { label: 'LÃƒÂ¤nsfÃƒÂ¶rsÃƒÂ¤kringar Bank Ã¢â‚¬â€ dÃƒÂ¶dsfall', url: 'https://www.lansforsakringar.se/privat/bank/dodsfall/' },
      { label: 'Skandiabanken Ã¢â‚¬â€ dÃƒÂ¶dsfall', url: 'https://www.skandia.se/bank/dodsfall/' },
    ],
  },
  {
    id: 'forsakringar',
    title: 'GÃƒÂ¥ igenom fÃƒÂ¶rsÃƒÂ¤kringar',
    desc: `FÃƒÂ¶rsÃƒÂ¤kringar kan ge stora belopp som riskerar att aldrig sÃƒÂ¶kas Ã¢â‚¬â€ gÃƒÂ¶r en systematisk genomgÃƒÂ¥ng.<br><br>
<strong>TGL (TjÃƒÂ¤nstegrupplivfÃƒÂ¶rsÃƒÂ¤kring)</strong> Ã¢â‚¬â€ De flesta anstÃƒÂ¤llda med kollektivavtal har detta. BegravningshjÃƒÂ¤lp: ~29 400 kr till dÃƒÂ¶dsboet. Grundbelopp till partner/barn: upp till ~350 000 kr. MÃƒÂ¥ste sÃƒÂ¶kas manuellt hos t.ex. Afa, Folksam eller KPA.<br><br>
<strong>Hitta dolda fÃƒÂ¶rsÃƒÂ¤kringar:</strong> GÃƒÂ¥ igenom bankutdrag efter premiebetalningar. Kontakta arbetsgivare och fackfÃƒÂ¶rbund. Ring de fyra stora (Folksam, If, LÃƒÂ¤nsfÃƒÂ¶rsÃƒÂ¤kringar, Trygg-Hansa) och frÃƒÂ¥ga om den avlidne hade engagemang.`,
    urgency: 'week',
    time: 'ca 1Ã¢â‚¬â€œ2 timmar',
    link: null,
    triggers: [],
    hasDoc: 'forsakring',
    notesPlaceholder: 'Vet du nÃƒÂ¥got fÃƒÂ¶rsÃƒÂ¤kringsbolag? Skriv det du hittar Ã¢â‚¬â€ ett i taget ÃƒÂ¤r bra nog. (t.ex. Folksam, If, Skandia, AfaÃ¢â‚¬Â¦)',
    resources: [
      { label: 'Afa FÃƒÂ¶rsÃƒÂ¤kring Ã¢â‚¬â€ TGL och dÃƒÂ¶dsfall', url: 'https://www.afaforsakring.se/privatperson/dodsfall/' },
      { label: 'Folksam Ã¢â‚¬â€ anmÃƒÂ¤lan vid dÃƒÂ¶dsfall', url: 'https://www.folksam.se/liv-halsa/nar-nagon-dor' },
    ],
  },
  {
    id: 'arbetsgivare',
    title: 'Kontakta arbetsgivaren och fackfÃƒÂ¶rbundet',
    desc: 'Meddela arbetsgivaren om dÃƒÂ¶dsfallet. Be dem bekrÃƒÂ¤fta om den avlidne haft TGL (TjÃƒÂ¤nstegrupplivfÃƒÂ¶rsÃƒÂ¤kring) via kollektivavtal Ã¢â‚¬â€ detta ÃƒÂ¤r en livfÃƒÂ¶rsÃƒÂ¤kring som ger skattefritt engÃƒÂ¥ngsbelopp och mÃƒÂ¥ste sÃƒÂ¶kas aktivt. Kontakta ÃƒÂ¤ven fackfÃƒÂ¶rbundet, mÃƒÂ¥nga har egna dÃƒÂ¶dsfallsfÃƒÂ¶rsÃƒÂ¤kringar via t.ex. Bliwa eller Folksam.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: [],
    notesPlaceholder: 'Arbetsgivare meddelad, TGL bekrÃƒÂ¤ftat, fackfÃƒÂ¶rbund kontaktatÃ¢â‚¬Â¦',
  },

  {
    id: 'forsakringskassan',
    title: 'Kontakta FÃƒÂ¶rsÃƒÂ¤kringskassan',
    desc: `FÃƒÂ¶rsÃƒÂ¤kringskassan behÃƒÂ¶ver meddelas om dÃƒÂ¶dsfallet fÃƒÂ¶r att stoppa lÃƒÂ¶pande utbetalningar och fÃƒÂ¶r att du ska kunna ansÃƒÂ¶ka om fÃƒÂ¶rmÃƒÂ¥ner du kan ha rÃƒÂ¤tt till.<br><br>
<strong>Stoppa automatiskt:</strong> Barnbidrag, bostadsbidrag, sjukpenning och andra bidrag avslutas inte alltid automatiskt Ã¢â‚¬â€ kontakta FK fÃƒÂ¶r att undvika ÃƒÂ¥terkrav.<br><br>
<strong>AnsÃƒÂ¶k om:</strong><br>
Ã¢â‚¬â€ <em>Barnpension</em>: Barn under 20 ÃƒÂ¥r kan ha rÃƒÂ¤tt till barnpension om en fÃƒÂ¶rÃƒÂ¤lder dÃƒÂ¶r.<br>
Ã¢â‚¬â€ <em>EfterlevandestÃƒÂ¶d</em>: Om barnpensionen inte rÃƒÂ¤cker fÃƒÂ¥r barnet efterlevandestÃƒÂ¶d upp till 18 ÃƒÂ¥r.<br>
Ã¢â‚¬â€ <em>OmstÃƒÂ¤llningspension</em>: Efterlevande make/registrerad partner kan ansÃƒÂ¶ka om omstÃƒÂ¤llningspension i upp till 12 mÃƒÂ¥nader.<br><br>
Kontakta FK pÃƒÂ¥ telefon eller logga in pÃƒÂ¥ Mina sidor pÃƒÂ¥ forsakringskassan.se.`,
    urgency: 'week',
    time: 'ca 30 min',
    phone: '0771-524 524',
    link: 'https://www.forsakringskassan.se/privatperson/nar-nagon-dor',
    triggers: [],
    notesPlaceholder: 'Ãƒâ€žrenden ÃƒÂ¶ppnade, ÃƒÂ¤rendenummer, beviljade fÃƒÂ¶rmÃƒÂ¥nerÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ LATER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'abonnemang',
    title: 'Avsluta abonnemang och prenumerationer',
    desc: 'Mobil, streaming, tidningar, el, gym Ã¢â‚¬â€ sÃƒÂ¤g upp tjÃƒÂ¤nster en efter en. AnvÃƒÂ¤nd dokumentgeneratorn fÃƒÂ¶r att skapa uppsÃƒÂ¤gningsbrev. Skriv ned det du vet eller hittar nedan.',
    urgency: 'later',
    time: 'ca 1Ã¢â‚¬â€œ2 timmar',
    link: null,
    triggers: [],
    hasDoc: 'bulk',
    notesPlaceholder: 'Vet du nÃƒÂ¥gra abonnemang eller tjÃƒÂ¤nster? Notera dem hÃƒÂ¤r Ã¢â‚¬â€ du kan fylla pÃƒÂ¥. (t.ex. Telia, Spotify, Netflix, el, gymÃ¢â‚¬Â¦)',
  },
  {
    id: 'arvskifte',
    title: 'FÃƒÂ¶rdela arvet',
    desc: 'NÃƒÂ¤r bouppteckningen ÃƒÂ¤r klar och godkÃƒÂ¤nd av Skatteverket delas tillgÃƒÂ¥ngarna upp mellan arvingarna Ã¢â‚¬â€ enligt testamente eller enligt lag om inget testamente finns. GÃƒÂ¶rs ofta med hjÃƒÂ¤lp av jurist och kan ta tid om ni ÃƒÂ¤r oense.',
    urgency: 'later',
    time: 'MÃƒÂ¥nader efter dÃƒÂ¶dsfallet',
    link: null,
    triggers: [],
    notesPlaceholder: 'Jurist anlitad, arvingar ÃƒÂ¶verens, datum fÃƒÂ¶r skifteÃ¢â‚¬Â¦',
  },
  {
    id: 'avsluta_konton',
    title: 'Avsluta digitala konton',
    desc: `Spara viktiga foton och dokument innan du stÃƒÂ¤nger konton. Varje plattform har egna rutiner:<br><br>
<strong>Facebook/Instagram:</strong> Kan minnesmÃƒÂ¤rkas eller raderas. KrÃƒÂ¤ver dÃƒÂ¶dsfallsintyg till supporten.<br>
<strong>Google:</strong> Kontrollera "Hantering av inaktiva konton" Ã¢â‚¬â€ utan fÃƒÂ¶rinstÃƒÂ¤llningar kan anhÃƒÂ¶riga begÃƒÂ¤ra data via supporten.<br>
<strong>Apple/iCloud:</strong> Utan en fÃƒÂ¶rutbestÃƒÂ¤md "digital arvskontakt" krÃƒÂ¤vs ofta domstolsbeslut fÃƒÂ¶r att fÃƒÂ¥ ut foton och filer.<br><br>
SÃƒÂ¤g ÃƒÂ¤ven upp betaltjÃƒÂ¤nster som Klarna, PayPal, spelkonton Ã¢â‚¬â€ logga aldrig in med den avlidnes lÃƒÂ¶senord, anvÃƒÂ¤nd de officiella vÃƒÂ¤garna.`,
    urgency: 'later',
    time: 'ca 1Ã¢â‚¬â€œ2 timmar',
    link: null,
    triggers: [],
    checklist: [
      { key: 'facebook',  label: 'Facebook / Instagram' },
      { key: 'google',    label: 'Google-konto (Gmail, Drive, Foton)' },
      { key: 'apple',     label: 'Apple / iCloud' },
      { key: 'email',     label: 'Ãƒâ€“vrig e-post' },
      { key: 'klarna',    label: 'Klarna' },
      { key: 'paypal',    label: 'PayPal' },
      { key: 'streaming', label: 'Streaming (Spotify, Netflix m.fl.)' },
      { key: 'gaming',    label: 'Spelkonton' },
    ],
    notesPlaceholder: 'Ãƒâ€“vriga konton att avslutaÃ¢â‚¬Â¦',
  },
  {
    id: 'skattedeklaration',
    title: 'DÃƒÂ¶dsboets skattedeklaration',
    desc: 'DÃƒÂ¶dsboet ÃƒÂ¤r skattskyldigt och kan behÃƒÂ¶va lÃƒÂ¤mna in en deklaration. Kontakta Skatteverket eller en revisor.',
    urgency: 'later',
    time: 'Senast 2 maj efter dÃƒÂ¶dsÃƒÂ¥ret',
    link: 'https://www.skatteverket.se',
    triggers: [],
    notesPlaceholder: 'Deklaration inlÃƒÂ¤mnad, revisor anlitad, datumÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Fastighet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'fastighet_boende',
    title: 'Besluta om bostadens framtid',
    desc: 'Ska bostaden sÃƒÂ¤ljas, ÃƒÂ¶vertas av anhÃƒÂ¶rig, eller hyras ut? Ta detta beslut med alla delÃƒÂ¤gare i boet.',
    urgency: 'week',
    time: 'Diskussion med familjen',
    link: null,
    triggers: ['fastighet'],
    notesPlaceholder: 'Beslut om bostaden, kontaktad mÃƒÂ¤klare eller arvingeÃ¢â‚¬Â¦',
  },
  {
    id: 'bostadsratt_brf',
    title: 'Kontakta bostadsrÃƒÂ¤ttsfÃƒÂ¶reningen',
    desc: 'Meddela fÃƒÂ¶reningen om dÃƒÂ¶dsfallet och frÃƒÂ¥ga vad som gÃƒÂ¤ller fÃƒÂ¶r ÃƒÂ¶verlÃƒÂ¥telse av bostadsrÃƒÂ¤tten till arvinge eller fÃƒÂ¶rsÃƒÂ¤ljning. BRF:en behÃƒÂ¶ver godkÃƒÂ¤nna en ny ÃƒÂ¤gare och har egna rutiner fÃƒÂ¶r detta.',
    urgency: 'week',
    time: 'ca 20 min',
    link: null,
    triggers: ['fastighet'],
    notesPlaceholder: 'BRF kontaktad, kontaktperson, beslut om ÃƒÂ¶verlÃƒÂ¥telseÃ¢â‚¬Â¦',
  },
  {
    id: 'lagfart',
    title: 'AnsÃƒÂ¶k om lagfart',
    desc: 'NÃƒÂ¤r en fastighet ÃƒÂ¤rvs mÃƒÂ¥ste den nya ÃƒÂ¤garen ansÃƒÂ¶ka om lagfart hos LantmÃƒÂ¤teriet. AnsÃƒÂ¶kan ska gÃƒÂ¶ras inom 3 mÃƒÂ¥nader frÃƒÂ¥n att bouppteckningen registrerats hos Skatteverket. StÃƒÂ¤mpelskatten ÃƒÂ¤r 1,5 % av fastighetens taxeringsvÃƒÂ¤rde, plus en expeditionsavgift pÃƒÂ¥ 825 kr.',
    urgency: 'later',
    time: 'ca 30 min online',
    link: 'https://www.lantmateriet.se/sv/fastigheter/agande-och-rattigheter/lagfart/',
    triggers: ['fastighet'],
    notesPlaceholder: 'AnsÃƒÂ¶kan skickad, datum, stÃƒÂ¤mpelskatt berÃƒÂ¤knadÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: HyresrÃƒÂ¤tt Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'hyresratt_uppsagning',
    title: 'SÃƒÂ¤g upp hyreskontrakt',
    urgency: 'today',
    time: 'GÃƒÂ¶r inom 1 mÃƒÂ¥nad Ã¢â‚¬â€ annars lÃƒÂ¶per kontraktet vidare',
    desc: 'Hyreskontrakt upphÃƒÂ¶r inte automatiskt vid dÃƒÂ¶dsfall. SÃƒÂ¤g upp direkt till hyresvÃƒÂ¤rden skriftligen Ã¢â‚¬â€ om det gÃƒÂ¶rs inom en mÃƒÂ¥nad frÃƒÂ¥n dÃƒÂ¶dsfallet ÃƒÂ¤r uppsÃƒÂ¤gningstiden normalt en mÃƒÂ¥nad. VÃƒÂ¤ntar du lÃƒÂ¤ngre lÃƒÂ¶per vanlig uppsÃƒÂ¤gningstid (ofta 3 mÃƒÂ¥nader). Ha dÃƒÂ¶dsbevis redo.',
    link: null,
    triggers: ['hyresratt'],
    hasDoc: 'letter',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: FÃƒÂ¶retag Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'foretag_bolagsverket',
    title: 'Meddela Bolagsverket om dÃƒÂ¶dsfall',
    desc: 'Om den avlidne hade ett aktiebolag eller enskild firma behÃƒÂ¶ver styrelse/dÃƒÂ¶dsbo meddela Bolagsverket.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: 'https://www.bolagsverket.se',
    phone: '0771-670 670',
    triggers: ['foretag'],
    notesPlaceholder: 'AnmÃƒÂ¤lan skickad, ÃƒÂ¤rendenummer, datumÃ¢â‚¬Â¦',
  },
  {
    id: 'foretag_avveckling',
    title: 'Planera avveckling eller ÃƒÂ¶verlÃƒÂ¥telse av fÃƒÂ¶retaget',
    desc: 'Ska bolaget avvecklas, sÃƒÂ¤ljas, eller tas ÃƒÂ¶ver av en arvinge? Detta ÃƒÂ¤r komplext och tidskÃƒÂ¤nsligt Ã¢â‚¬â€ anlita revisor och jurist tidigt.<br><br><strong>Om det finns aktiva kunder eller uppdrag:</strong> DÃƒÂ¶dsboet tar automatiskt ÃƒÂ¶ver ÃƒÂ¤garens rÃƒÂ¤ttigheter och skyldigheter. Kontakta kunderna och informera om dÃƒÂ¶dsfallet Ã¢â‚¬â€ var transparent om vad som hÃƒÂ¤nder. Kan pÃƒÂ¥gÃƒÂ¥ende avtal inte fullfÃƒÂ¶ljas, meddela motparten snarast och diskutera avslut i god anda.<br><br><strong>Praktiska steg nu:</strong><br>1. Kontakta fÃƒÂ¶retagets revisor och redovisningskonsult direkt.<br>2. SÃƒÂ¤kerstÃƒÂ¤ll att lÃƒÂ¶pande rÃƒÂ¤kningar, lÃƒÂ¶ner och moms hanteras Ã¢â‚¬â€ betalstopp sker inte automatiskt.<br>3. Meddela Bolagsverket om dÃƒÂ¶dsfallet (se uppgiften ovan).<br>4. AnvÃƒÂ¤nd <em>Dokument Ã¢â€ â€™ Skatteverket</em> hÃƒÂ¤rifrÃƒÂ¥n fÃƒÂ¶r att begÃƒÂ¤ra avregistrering av F-skatt.',
    urgency: 'week',
    time: 'Kontakta revisor',
    link: null,
    triggers: ['foretag'],
    notesPlaceholder: 'Revisor kontaktad, pÃƒÂ¥gÃƒÂ¥ende avtal identifierade, ÃƒÂ¥tgÃƒÂ¤rderÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Skulder Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'skulder_inventering',
    title: 'Inventera skulder noggrant',
    desc: 'Samla en komplett bild av lÃƒÂ¥n, krediter och obetalda rÃƒÂ¤kningar. Skulder betalas av dÃƒÂ¶dsboet innan arv utbetalas.<br><br><strong>Viktigt:</strong> Begravnings- och bouppteckningskostnader prioriteras fÃƒÂ¶re alla andra skulder. Om boet inte rÃƒÂ¤cker till kontaktar du borgenÃƒÂ¤rerna och begÃƒÂ¤r anstÃƒÂ¥nd tills bouppteckningen ÃƒÂ¤r klar. Du som anhÃƒÂ¶rig ÃƒÂ¤r <em>inte</em> personligt betalningsansvarig fÃƒÂ¶r den avlidnes skulder.',
    urgency: 'week',
    time: 'ca 1Ã¢â‚¬â€œ2 timmar',
    link: null,
    triggers: ['skulder'],
    notesPlaceholder: 'Skulder listade, kontakter till borgenÃƒÂ¤rer, beloppÃ¢â‚¬Â¦',
  },
  {
    id: 'skulder_kronofogden',
    title: 'Kontrollera skulder hos Kronofogden',
    desc: 'Du kan begÃƒÂ¤ra ett skuldsaldo direkt hos Kronofogden fÃƒÂ¶r att se om det finns registrerade skulder.',
    urgency: 'week',
    time: 'ca 15 min',
    link: 'https://www.kronofogden.se',
    phone: '0771-73 73 00',
    triggers: ['skulder'],
    notesPlaceholder: 'Kontroll utfÃƒÂ¶rd, datum, eventuella skulder noteradeÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Utland Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'utland_juridik',
    title: 'HÃƒÂ¤mta juridisk rÃƒÂ¥dgivning fÃƒÂ¶r utlandstillgÃƒÂ¥ngar',
    desc: 'TillgÃƒÂ¥ngar i annat land Ã¢â‚¬â€ bankkonto, bostad, pension Ã¢â‚¬â€ lyder under det landets lagar och krÃƒÂ¤ver separat utredning. EU:s arvsfÃƒÂ¶rordning (nr 650/2012) gÃƒÂ¤ller om den hemmahÃƒÂ¶rande i Sverige dog inom EU, men utanfÃƒÂ¶r EU gÃƒÂ¤ller det lÃƒÂ¤ndets egna regler.<br><br><strong>BÃƒÂ¶rja med dessa steg:</strong><br>1. Kontakta banken i det andra landet och meddela dÃƒÂ¶dsfallet.<br>2. Anlita en jurist specialiserad pÃƒÂ¥ internationell arvsrÃƒÂ¤tt Ã¢â‚¬â€ frÃƒÂ¥ga begravningsbyrÃƒÂ¥n eller Advokatsamfundet.<br>3. HÃƒÂ¶r med Utrikesdepartementet om konsulÃƒÂ¤r hjÃƒÂ¤lp vid bostad eller tillgÃƒÂ¥ngar utanfÃƒÂ¶r EU.<br>4. Se till att bouppteckningen tÃƒÂ¤cker utlandstillgÃƒÂ¥ngarna Ã¢â‚¬â€ en svensk bouppteckning rÃƒÂ¤cker ofta inom EU, men ibland krÃƒÂ¤vs en lokal kopia.',
    urgency: 'week',
    time: 'Kontakta jurist',
    link: null,
    triggers: ['utland'],
    resources: [
      { label: 'Advokatsamfundet Ã¢â‚¬â€ hitta specialist i internationell arvsrÃƒÂ¤tt', url: 'https://www.advokatsamfundet.se/hitta-advokat' },
      { label: 'UD Ã¢â‚¬â€ konsulÃƒÂ¤r hjÃƒÂ¤lp vid dÃƒÂ¶dsfall utomlands', url: 'https://www.swedenabroad.se/sv/om-utlandet-for-svenska-medborgare/konsulart-bistand/' },
    ],
    notesPlaceholder: 'Land och tillgÃƒÂ¥ng, jurist kontaktad, datumÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: MinderÃƒÂ¥rigt barn Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'minderarig_goman',
    title: 'Utred om god man behÃƒÂ¶vs fÃƒÂ¶r minderÃƒÂ¥rigt barn',
    desc: 'Om ett minderÃƒÂ¥rigt barn ÃƒÂ¤r delÃƒÂ¤gare i dÃƒÂ¶dsboet kan en god man behÃƒÂ¶va utses fÃƒÂ¶r att representera barnet. En fÃƒÂ¶rÃƒÂ¤lder kan inte ensam fÃƒÂ¶retrÃƒÂ¤da sitt barn i ett dÃƒÂ¶dsbo dÃƒÂ¤r de sjÃƒÂ¤lva ÃƒÂ¤r delÃƒÂ¤gare Ã¢â‚¬â€ det uppstÃƒÂ¥r en intressekonflikt.<br><br>Kontakta <strong>ÃƒÂ¶verfÃƒÂ¶rmyndaren i din kommun</strong> Ã¢â‚¬â€ det ÃƒÂ¤r de som hanterar detta. Du hittar dem via din kommuns hemsida (sÃƒÂ¶k "ÃƒÂ¶verfÃƒÂ¶rmyndare [kommunens namn]"). Be om en handlÃƒÂ¤ggningstid direkt Ã¢â‚¬â€ processen kan ta nÃƒÂ¥gra veckor.',
    urgency: 'today',
    time: 'Kontakta ÃƒÂ¶verfÃƒÂ¶rmyndaren',
    link: null,
    triggers: ['minderarig'],
    resources: [
      { label: 'Sveriges Kommuner och Regioner Ã¢â‚¬â€ hitta din ÃƒÂ¶verfÃƒÂ¶rmyndare', url: 'https://skr.se/skr/demokratiledningstyrning/valmaktfordelning/overformyndare.html' },
    ],
    notesPlaceholder: 'Ãƒâ€“verfÃƒÂ¶rmyndare kontaktad, kommun, handlÃƒÂ¤ggare, datumÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Make/maka Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'make_pension',
    title: 'Kontrollera efterlevandepension',
    desc: 'Som make/maka kan du ha rÃƒÂ¤tt till efterlevandepension. Kontakta Pensionsmyndigheten och eventuella tjÃƒÂ¤nstepensionsbolag.',
    urgency: 'week',
    time: 'ca 30 min',
    link: 'https://www.pensionsmyndigheten.se',
    phone: '0771-776 776',
    triggers: ['make'],
    notesPlaceholder: 'Kontaktad Pensionsmyndigheten, ÃƒÂ¤rendenummer, tjÃƒÂ¤nstepensionsbolagÃ¢â‚¬Â¦',
  },
  {
    id: 'make_bostadsratt',
    title: 'Kontrollera bostadsrÃƒÂ¤ttens framtid',
    desc: 'Om ni bodde i bostadsrÃƒÂ¤tt ihop Ã¢â‚¬â€ kontakta bostadsrÃƒÂ¤ttsfÃƒÂ¶reningen om hur ÃƒÂ¶verlÃƒÂ¥telse eller fortsatt boende hanteras.',
    urgency: 'week',
    time: 'ca 30 min',
    link: null,
    triggers: ['make'],
    notesPlaceholder: 'BRF kontaktad, beslut om boende eller ÃƒÂ¶verlÃƒÂ¥telseÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Testamente Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'testamente_oppna',
    title: 'Ãƒâ€“ppna och bevittna testamentet',
    desc: 'Testamentet ska delges alla arvingar. Ta hjÃƒÂ¤lp av en jurist om du ÃƒÂ¤r osÃƒÂ¤ker pÃƒÂ¥ hur detta gÃƒÂ¶rs korrekt.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: null,
    triggers: ['testamente'],
    notesPlaceholder: 'Testamente delgivet, datum, eventuell jurist anlitadÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Inget testamente Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'inget_testamente_koll',
    title: 'Kontrollera om testamente kan finnas',
    desc: 'Kolla i den avlidnes papper, bankfack och hos jurister. Det ÃƒÂ¤r vanligare ÃƒÂ¤n man tror att testamenten hittas senare.',
    urgency: 'week',
    time: 'ca 1 timme',
    link: null,
    triggers: ['inget_testamente'],
    notesPlaceholder: 'Kontrollerat papper, bankfack, jurister Ã¢â‚¬â€ resultatÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Fordon Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'fordon_transport',
    title: 'Byt ÃƒÂ¤gare pÃƒÂ¥ fordon',
    urgency: 'later',
    time: 'ca 30 min + posthantering',
    desc: 'Fordon i ett dÃƒÂ¶dsbo krÃƒÂ¤ver en manuell process Ã¢â‚¬â€ de digitala tjÃƒÂ¤nsterna hos Transportstyrelsen fungerar inte nÃƒÂ¤r sÃƒÂ¤ljaren ÃƒÂ¤r avliden. AnvÃƒÂ¤nd registreringsbevisets gula del (Del 2) i original. En dÃƒÂ¶dsbofÃƒÂ¶retrÃƒÂ¤dare skriver under i nuvarande ÃƒÂ¤gares stÃƒÂ¤lle. Den nye ÃƒÂ¤garen mÃƒÂ¥ste teckna trafikfÃƒÂ¶rsÃƒÂ¤kring frÃƒÂ¥n ÃƒÂ¤garbytesdagen.',
    link: 'https://www.transportstyrelsen.se/sv/vagtrafik/fordon/agarbyte/',
    triggers: ['fordon'],
    notesPlaceholder: 'Fordon, ny ÃƒÂ¤gare, registreringsbevis del 2 skickatÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ CONDITIONAL: Husdjur Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'husdjur_omplacering',
    title: 'Ordna omsorg fÃƒÂ¶r husdjur',
    urgency: 'week',
    time: 'Din tid',
    desc: 'Husdjur ÃƒÂ¤r juridiskt lÃƒÂ¶s egendom och hanteras i bouppteckning och testamente. Om den avlidne hade hund mÃƒÂ¥ste ÃƒÂ¤garbyte registreras i Jordbruksverkets hundregister av den nya ÃƒÂ¤garen. BehÃƒÂ¶ver djuret omplaceras finns djurhem och uppfÃƒÂ¶dare som kan hjÃƒÂ¤lpa till.',
    link: 'https://www.jordbruksverket.se/djur/hundar-katter-och-harliga-djur/hundar/registrera-din-hund',
    triggers: ['husdjur'],
    notesPlaceholder: 'Djurets namn, ny ÃƒÂ¤gare kontaktad, ÃƒÂ¤garbyte registreratÃ¢â‚¬Â¦',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ ALWAYS: HjÃƒÂ¤lpmedel och mediciner Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'hjalpmedel_mediciner',
    title: 'Ãƒâ€¦terlÃƒÂ¤mna hjÃƒÂ¤lpmedel och mediciner',
    urgency: 'week',
    time: 'ca 30 min',
    desc: 'Rullstol, sÃƒÂ¤ng, lyft och andra medicintekniska produkter ÃƒÂ¤r ofta lÃƒÂ¥n frÃƒÂ¥n regionen och ska ÃƒÂ¥terlÃƒÂ¤mnas rengjorda. StÃƒÂ¶rre hjÃƒÂ¤lpmedel hÃƒÂ¤mtas ofta kostnadsfritt Ã¢â‚¬â€ ring regionen eller kommunen. Ãƒâ€“verblivna mediciner (tabletter, sprutor, krÃƒÂ¤mer) lÃƒÂ¤mnas till nÃƒÂ¤rmaste apotek fÃƒÂ¶r sÃƒÂ¤ker destruktion.',
    triggers: [],
    notesPlaceholder: 'HjÃƒÂ¤lpmedel ÃƒÂ¥terlÃƒÂ¤mnade, mediciner till apoteket, datumÃ¢â‚¬Â¦',
  },

  {
    id: 'sorgstod',
    title: 'Ta hand om dig sjÃƒÂ¤lv',
    desc: `Det praktiska tar tid och energi Ã¢â‚¬â€ men sorgen krÃƒÂ¤ver sin egen plats.<br><br>
Du behÃƒÂ¶ver inte ha allt under kontroll. Det ÃƒÂ¤r normalt att kÃƒÂ¤nna sig utmattad, arg, lÃƒÂ¤ttad, tom eller allt pÃƒÂ¥ en gÃƒÂ¥ng.<br><br>
<strong>Prata med nÃƒÂ¥gon:</strong><br>
Ã¢â‚¬â€ <em>1177 Sorgelinjen</em>: Ring 1177 och be om att bli kopplad till sorgestÃƒÂ¶d.<br>
Ã¢â‚¬â€ <em>SPES</em> (Suicidprevention och efterlevandestÃƒÂ¶d): spes.se, fÃƒÂ¶r dig som fÃƒÂ¶rlorat nÃƒÂ¥gon till sjÃƒÂ¤lvmord.<br>
Ã¢â‚¬â€ <em>Kyrkans stÃƒÂ¶d</em>: Oavsett tro erbjuder Svenska kyrkan samtalsstÃƒÂ¶d Ã¢â‚¬â€ kontakta nÃƒÂ¤rmaste kyrka.<br><br>
Det finns ingen tidsgrÃƒÂ¤ns fÃƒÂ¶r sorg, och du behÃƒÂ¶ver inte vara klar.`,
    urgency: 'later',
    time: 'Din tid',
    link: 'https://www.1177.se/liv-halsa/psykisk-halsa/sorg/',
    triggers: [],
    notesPlaceholder: 'Vad hjÃƒÂ¤lper dig just nu? Ãƒâ€žr det nÃƒÂ¥gon du vill ringa?',
  },

  // Ã¢â€â‚¬Ã¢â€â‚¬ ALWAYS: Bostadsavveckling Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  {
    id: 'bostadsavveckling',
    title: 'TÃƒÂ¶m och stÃƒÂ¤da bostaden',
    urgency: 'later',
    time: 'DagarÃ¢â‚¬â€œveckor',
    desc: 'Samordna med ÃƒÂ¶vriga arvingar vad som sparas, sÃƒÂ¤ljas eller skÃƒÂ¤nks bort. GÃƒÂ¶r det i god tid Ã¢â‚¬â€ en tom bostad sÃƒÂ¤ljs snabbare och minskar lÃƒÂ¶pande hyra eller avgift som annars belastar dÃƒÂ¶dsboet.<br><br><strong>Donera / sÃƒÂ¤lja:</strong> Stadsmissionen, Myrorna och ErikshjÃƒÂ¤lpen hÃƒÂ¤mtar mÃƒÂ¶bler och klÃƒÂ¤der kostnadsfritt. Blocket och Facebook Marketplace fungerar bra fÃƒÂ¶r lÃƒÂ¶sa fÃƒÂ¶remÃƒÂ¥l. BegravningsbyrÃƒÂ¥n kan rekommendera lokala aktÃƒÂ¶rer.<br><br><strong>Anlita stÃƒÂ¤dhjÃƒÂ¤lp:</strong> Specialiserade dÃƒÂ¶dsbofÃƒÂ¶retag hanterar hel tÃƒÂ¶mning och stÃƒÂ¤d. Typisk kostnad: 5 000Ã¢â‚¬â€œ20 000 kr beroende pÃƒÂ¥ bostadens storlek. Betalas ur dÃƒÂ¶dsboets tillgÃƒÂ¥ngar.<br><br><strong>RUT-avdraget gÃƒÂ¤ller inte dÃƒÂ¶dsbo</strong> Ã¢â‚¬â€ dÃƒÂ¶dsboet ÃƒÂ¤r en juridisk person och Skatteverket medger inte skattereduktion.',
    triggers: [],
    notesPlaceholder: 'Vad ska sparas, sÃƒÂ¤ljas, skÃƒÂ¤nkas? Kontakter till stÃƒÂ¤dfirmaÃ¢â‚¬Â¦',
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
  if (state.ansvar === 'flera') triggers.add('flera_delÃƒÂ¤gare');
  if (state.fordon)      triggers.add('fordon');
  if (state.husdjur)     triggers.add('husdjur');
  if (state.hyresratt)   triggers.add('hyresratt');

  state.tasks = TASK_LIBRARY.filter(task =>
    task.triggers.length === 0 || task.triggers.some(t => triggers.has(t))
  ).map(task => ({ ...task, done: false, started: false }));

  loadTaskState();
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ NOTES (cached) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
  if (value.length > 0) track('Note Saved', { task: taskId });
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PARTICIPANTS NAV Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderParticipants() {
  const container = document.getElementById('plan-participants');
  if (!container) return;
  const participants = state.participants || [];
  const deceased = state.name ? state.name.trim() : '';

  // Deceased first (different style Ã¢â‚¬â€ primary chip)
  const deceasedChip = deceased
    ? `<span class="plan-participant-chip plan-participant-chip--deceased"
         title="${deceased}">${deceased.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase()}</span>`
    : '';

  const chips = participants.map(name => {
    const initials = name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<span class="plan-participant-chip" title="${name}">${initials}</span>`;
  }).join('');

  container.innerHTML = deceasedChip + chips +
    `<button class="plan-participant-add-btn" onclick="openModal('modal-participants')" title="LÃƒÂ¤gg till deltagare" aria-label="LÃƒÂ¤gg till deltagare">+</button>`;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ RENDER PLAN Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderPlan() {
  renderParticipants();
  const name = state.name;
  document.getElementById('plan-title').textContent =
    name ? `${name}s efterplan` : 'Din efterplan';
  document.getElementById('plan-sub').textContent =
    'Uppdateras allteftersom du gÃƒÂ¥r vidare. Det finns inget fel sÃƒÂ¤tt att bÃƒÂ¶rja.';

  const defEl = document.getElementById('plan-dodsbo-def');
  if (defEl) {
    const n = state.name || 'den som gick bort';
    defEl.textContent = `DÃƒÂ¶dsboet ÃƒÂ¤r ett tillfÃƒÂ¤lligt begrepp fÃƒÂ¶r allt ${n} lÃƒÂ¤mnade efter sig Ã¢â‚¬â€ tillgÃƒÂ¥ngar och skulder. Det upphÃƒÂ¶r nÃƒÂ¤r allt ÃƒÂ¤r fÃƒÂ¶rdelat.`;
  }

  const today  = state.tasks.filter(t => t.urgency === 'today');
  const week   = state.tasks.filter(t => t.urgency === 'week');
  const later  = state.tasks.filter(t => t.urgency === 'later');

  // Ã¢â€â‚¬Ã¢â€â‚¬ BÃƒÂ¶rja hÃƒÂ¤r-kort Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const firstTask = state.tasks.find(t => !t.done);
  const startEl   = document.getElementById('start-here');
  if (startEl) {
    if (firstTask) {
      startEl.innerHTML = `
        <div>
          <div class="start-here-label">BÃƒÂ¶rja hÃƒÂ¤r</div>
          <div class="start-here-title">${firstTask.title}</div>
        </div>
        <div class="start-here-arrow">Ã¢â‚¬Âº</div>`;
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
  renderBills();
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
      ? `<a class="task-expand-link" href="${task.link}" target="_blank" rel="noopener">Ãƒâ€“ppna ${task.link.replace('https://www.', '')} Ã¢â€ â€”</a>`
      : '';

    const phoneHtml = task.phone
      ? `<a class="task-expand-phone" href="tel:${task.phone.replace(/\s|-/g,'')}">Ring ${task.phone}</a>`
      : '';

    const phone2Html = task.phone2
      ? `<a class="task-expand-phone task-expand-phone--secondary" href="tel:${task.phone2.replace(/\s|-/g,'')}">Ring ${task.phone2}</a>`
      : '';

    const resourcesHtml = task.resources?.length
      ? `<div class="task-resources">${task.resources.map(r =>
          `<a class="task-resource-link" href="${r.url}" target="_blank" rel="noopener">${r.label} Ã¢â€ â€”</a>`
        ).join('')}</div>`
      : '';

    const notesHtml = task.notesPlaceholder && !task.done
      ? `<textarea class="task-notes" id="notes-${task.id}" placeholder="${task.notesPlaceholder}" rows="2"
           oninput="autoStartOnNote('${task.id}'); saveTaskNote('${task.id}', this.value)">${getTaskNote(task.id)}</textarea>`
      : '';

    const checklistHtml = task.checklist?.length ? renderTaskChecklist(task) : '';

    const notifyHtml = task.id === 'narmaste_anhÃƒÂ¶rig' ? renderNotifyList() : '';

    const docHtml = task.hasDoc && !task.done
      ? `<button class="task-expand-doc" onclick="event.stopPropagation();switchTab('docs');showDocForm('${task.hasDoc}')">Generera dokument Ã¢â€ â€™</button>`
      : '';

    const doneHtml = task.done
      ? `<span class="task-expand-done">Klar Ã¢Å“â€œ</span>
         <button class="task-expand-undo-btn" onclick="event.stopPropagation();undoTaskDoneManual('${task.id}')">Markera som ej klar</button>`
      : task.started
      ? `<button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`
      : `<button class="task-expand-start-btn" onclick="event.stopPropagation();markTaskStarted('${task.id}')">PÃƒÂ¥bÃƒÂ¶rjad</button>
         <button class="task-expand-btn" onclick="event.stopPropagation();markTaskDone('${task.id}')">Markera som klar</button>`;

    const isNext = !task.done && task.id === nextTaskId;
    const cardClass = task.done ? ' done' : task.started ? ' started' : (isNext ? ' task-card--next' : '');
    const checkClass = task.done ? ' checked' : task.started ? ' started' : '';
    const nextBadge = isNext ? `<span class="task-next-badge">NÃƒÂ¤sta steg</span>` : '';
    const startedBadge = task.started && !task.done
      ? `<span class="task-started-badge">PÃƒÂ¥bÃƒÂ¶rjad</span>`
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
        <div class="task-chevron" id="chevron-${task.id}" aria-hidden="true">Ã¢â‚¬Âº</div>
      </div>
      <div class="task-expand hidden" id="expand-${task.id}">
        <div class="task-expand-desc">${task.desc}</div>
        ${linkHtml}
        ${phoneHtml}
        ${phone2Html}
        ${resourcesHtml}
        ${(task.id === 'begravningsceremoni' && state.ansvar !== 'flera') ? '' : renderAssigneePicker(task.id)}
        ${notifyHtml}
        ${checklistHtml}
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
    cardEl.setAttribute('aria-label', task.title);
    cardEl.addEventListener('click', () => toggleTask(task.id));
    cardEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(task.id); }
    });

    const checkEl = wrap.querySelector('.task-check');
    checkEl.setAttribute('role', 'checkbox');
    checkEl.setAttribute('aria-checked', task.done ? 'true' : 'false');
    checkEl.setAttribute('aria-label', `Markera "${task.title}" som klar`);

    if (task.notesPlaceholder && !task.done) {
      const notesEl = wrap.querySelector(`#notes-${task.id}`);
      if (notesEl) notesEl.setAttribute('aria-label', `Anteckningar fÃƒÂ¶r ${task.title}`);
    }

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
    // Ãƒâ€¦terstÃƒÂ¤ll badge fÃƒÂ¶r tidigare ÃƒÂ¶ppnad uppgift
    const prevTask = state.tasks.find(t => t.id === expandedTaskId);
    const prevBadge = document.getElementById(`assignee-badge-${expandedTaskId}`);
    if (prevBadge && prevTask?.assignee) prevBadge.classList.remove('hidden');
  }

  if (isOpen) { expandedTaskId = null; return; }

  expandedTaskId = taskId;
  const el   = document.getElementById(`expand-${taskId}`);
  const chev = document.getElementById(`chevron-${taskId}`);
  const card = document.getElementById(`task-card-${taskId}`);
  if (el)   el.classList.remove('hidden');
  if (chev) chev.classList.add('open');
  if (card) { card.classList.add('expanded'); card.setAttribute('aria-expanded', 'true'); }
  // DÃƒÂ¶lj badge nÃƒÂ¤r uppgiften ÃƒÂ¤r expanderad (syns i pickern istÃƒÂ¤llet)
  document.getElementById(`assignee-badge-${taskId}`)?.classList.add('hidden');
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
    document.getElementById('plan-sub').textContent = 'Du har gÃƒÂ¥tt igenom allt. Ta ett djupt andetag.';
    setTimeout(showCompletionOverlay, 600);
  } else {
    summaryEl.innerHTML = `<strong>${done} av ${total}</strong> uppgifter klara`;
    if (completionEl) completionEl.classList.remove('visible');
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ Plan-done footer Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  const doneFooter = document.getElementById('plan-done-footer');
  if (doneFooter) doneFooter.classList.toggle('hidden', done !== total);

  // Ã¢â€â‚¬Ã¢â€â‚¬ Section-done badges Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  ['today', 'week', 'later'].forEach(section => {
    const urgencyMap = { today: 'today', week: 'week', later: 'later' };
    const sectionTasks = state.tasks.filter(t => t.urgency === urgencyMap[section]);
    if (sectionTasks.length === 0) return;
    const allDone = sectionTasks.every(t => t.done);
    const badge = document.getElementById(`badge-${section}`);
    if (badge) badge.classList.toggle('hidden', !allDone);
  });
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ TASK CHECKLIST Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderTaskChecklist(task) {
  const saved = (state.taskChecklists || {})[task.id] || {};
  const items = task.checklist.map(item => {
    const checked = !!saved[item.key];
    return `<label class="task-checklist-item${checked ? ' done' : ''}">
      <input type="checkbox" id="checklist-${task.id}-${item.key}" ${checked ? 'checked' : ''}
             onchange="toggleChecklistItem('${task.id}', '${item.key}')">
      <span>${item.label}</span>
    </label>`;
  }).join('');
  return `<div class="task-checklist">
    <div class="task-checklist-label">Bocka av vartefter:</div>
    ${items}
  </div>`;
}

function toggleChecklistItem(taskId, key) {
  if (!state.taskChecklists) state.taskChecklists = {};
  if (!state.taskChecklists[taskId]) state.taskChecklists[taskId] = {};
  state.taskChecklists[taskId][key] = !state.taskChecklists[taskId][key];
  saveState();
  const cb = document.getElementById(`checklist-${taskId}-${key}`);
  if (cb) {
    const item = cb.closest('.task-checklist-item');
    if (item) item.classList.toggle('done', state.taskChecklists[taskId][key]);
  }
}

function autoStartOnNote(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (task && !task.done && !task.started) markTaskStarted(taskId);
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ BILLS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function loadBills() {
  try { state.bills = JSON.parse(localStorage.getItem('efterplan_bills')) || []; } catch(e) { state.bills = []; }
}
function saveBills() {
  try { localStorage.setItem('efterplan_bills', JSON.stringify(state.bills)); } catch(e) {}
}
function renderBills() {
  const list = document.getElementById('bills-list');
  const empty = document.getElementById('bills-empty');
  if (!list) return;
  if (state.bills.length === 0) {
    list.innerHTML = '';
    empty && empty.classList.remove('hidden');
    return;
  }
  empty && empty.classList.add('hidden');
  list.innerHTML = state.bills.map(b => `
    <li class="bill-item${b.paid ? ' paid' : ''}" id="bill-${b.id}">
      <button class="bill-check" onclick="toggleBillPaid('${b.id}')" aria-label="${b.paid ? 'Markera som obetald' : 'Markera som betald'}"></button>
      <div class="bill-info">
        <span class="bill-desc">${b.desc}</span>
        ${b.amount ? `<span class="bill-amount">${b.amount} kr</span>` : ''}
      </div>
      <button class="bill-delete" onclick="deleteBill('${b.id}')" aria-label="Ta bort">Ãƒâ€”</button>
    </li>`).join('');
}
function showBillForm() {
  document.getElementById('bill-form').classList.remove('hidden');
  document.getElementById('bill-desc-input').focus();
}
function hideBillForm() {
  document.getElementById('bill-form').classList.add('hidden');
  document.getElementById('bill-desc-input').value = '';
  document.getElementById('bill-amount-input').value = '';
}
function submitBill() {
  const desc = document.getElementById('bill-desc-input').value.trim();
  const errEl = document.getElementById('err-bills');
  if (!desc) {
    if (errEl) { errEl.textContent = 'Ange en beskrivning.'; errEl.classList.remove('hidden'); }
    document.getElementById('bill-desc-input').focus();
    return;
  }
  if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
  const amount = document.getElementById('bill-amount-input').value.trim();
  state.bills.push({ id: Date.now().toString(), desc, amount: amount || '', paid: false });
  saveBills();
  renderBills();
  hideBillForm();
  track('Bill Added');
}
function toggleBillPaid(id) {
  const b = state.bills.find(b => b.id === id);
  if (b) { b.paid = !b.paid; saveBills(); renderBills(); }
}
function deleteBill(id) {
  state.bills = state.bills.filter(b => b.id !== id);
  saveBills();
  renderBills();
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
    badge.textContent = 'PÃƒÂ¥bÃƒÂ¶rjad';
    timeEl.appendChild(badge);
  }

  // Swap start button Ã¢â€ â€™ only "Markera som klar" remains
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
  track('Task Complete', { task: taskId, urgency: task.urgency || 'unknown' });

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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ ASSIGNEES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Single source of truth: state.participants Ã¢â‚¬â€ same list used for task
// assignment and notify notifier. Add people via the + button in the nav.
function _getAssignees() {
  return state.participants || [];
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
  if (!assignees.length) {
    return `<button class="assignee-add-hint"
              onclick="event.stopPropagation();openModal('modal-participants')"
              title="LÃƒÂ¤gg till deltagare">+ LÃƒÂ¤gg till deltagare</button>`;
  }
  return assignees.map(n =>
    `<button class="assignee-chip${n === current ? ' selected' : ''}"
             onclick="event.stopPropagation();setTaskAssignee('${taskId}','${n.replace(/'/g,"\\'")}')">
       ${n}
     </button>`
  ).join('');
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PARTICIPANTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
  renderParticipants();
  _refreshAllAssigneePickers();
}

function _refreshAllAssigneePickers() {
  state.tasks.forEach(t => _refreshAssigneePicker(t.id));
}
function removeParticipant(name) {
  state.participants = (state.participants || []).filter(n => n !== name);
  saveState();
  _refreshParticipantList();
  _refreshAllAssigneePickers();
}
function _refreshParticipantList() {
  // Onboarding list Ã¢â‚¬â€ simple chips
  const obList = document.getElementById('ob-participant-list');
  if (obList) {
    obList.innerHTML = (state.participants || []).map(name =>
      `<div class="ob-participant-chip">
        <span>${name}</span>
        <button onclick="removeParticipant('${name.replace(/'/g, "\\'")}')" aria-label="Ta bort ${name}">Ãƒâ€”</button>
      </div>`
    ).join('');
  }
  // Modal list Ã¢â‚¬â€ with optional personnr input
  const modalList = document.getElementById('modal-participant-list');
  if (modalList) {
    if (!(state.participants || []).length) {
      modalList.innerHTML = '<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">Inga deltagare tillagda ÃƒÂ¤nnu.</p>';
      return;
    }
    modalList.innerHTML = (state.participants || []).map(name => {
      const safeN = name.replace(/'/g, "\\'");
      const personnr = (state.participantPersonnr || {})[name] || '';
      return `<div class="modal-participant-item">
        <div class="modal-participant-row">
          <span class="modal-participant-name">${name}</span>
          <button class="modal-participant-remove" onclick="removeParticipant('${safeN}')" aria-label="Ta bort ${name}">Ãƒâ€”</button>
        </div>
        <input type="text" class="participant-personnr-input"
               placeholder="Personnummer (valfritt Ã¢â‚¬â€ fÃƒÂ¶r fullmakter)"
               value="${personnr}"
               onchange="saveParticipantPersonnr('${safeN}', this.value)" />
      </div>`;
    }).join('');
  }
}

function saveParticipantPersonnr(name, val) {
  if (!state.participantPersonnr) state.participantPersonnr = {};
  state.participantPersonnr[name] = val.trim();
  saveState();
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ NOTIFY LIST Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
  if (!list.length) return '<p class="notify-empty">Inga tillagda ÃƒÂ¤n</p>';
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
          aria-label="Markera ${p.name} som meddelad">${p.notified ? 'Ã¢Å“â€œ' : ''}</button>
        <span class="notify-name">${p.name}</span>
        ${notifierSelect}
        <button class="notify-remove"
          onclick="event.stopPropagation();removeNotifyPerson('${safeId}')"
          aria-label="Ta bort ${p.name}">Ãƒâ€”</button>
      </div>`;
  }).join('');
}

function renderNotifyList() {
  const list = _getNotifyList();
  const done = list.filter(p => p.notified).length;
  const counterText = list.length ? `${done} av ${list.length} meddelade` : '';
  return `<div class="notify-list-section">
    <div class="notify-list-header">
      <span class="notify-list-label">Att underrÃƒÂ¤tta</span>
      <span class="notify-counter" id="notify-counter">${counterText}</span>
    </div>
    <div class="notify-list-items" id="notify-list-container">
      ${_buildNotifyListInner()}
    </div>
    <div class="notify-add-row">
      <input class="notify-new-input" id="notify-new-input" type="text"
        placeholder="LÃƒÂ¤gg till personÃ¢â‚¬Â¦"
        onclick="event.stopPropagation()"
        onkeydown="if(event.key==='Enter'){event.stopPropagation();addNotifyPerson();}" />
      <button class="notify-add-btn" onclick="event.stopPropagation();addNotifyPerson()">LÃƒÂ¤gg till</button>
    </div>
  </div>`;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ UNDO TOAST Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ MODALS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
let _modalPrevFocus = null;
let _completionPrevFocus = null;
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function openModal(id) {
  _modalPrevFocus = document.activeElement;
  const overlay = document.getElementById(id);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (id === 'modal-participants') _refreshParticipantList();
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

function _coEscHandler(e) {
  if (e.key === 'Escape') closeCompletionOverlay();
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ TABS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function switchTab(name) {
  document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.plan-tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.getElementById(`tabcontent-${name}`).classList.add('active');
  window.scrollTo(0, 0);
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SENDER INFO PERSISTENCE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
  const map = { partner: 'Make/Maka', foralder: 'Barn', syskon: 'Syskon', barn: 'FÃƒÂ¶rÃƒÂ¤lder', annan: '' };
  return map[state.relation] || '';
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ DOCUMENT GENERATOR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function getDocContext() {
  return {
    deceased: state.name     || '[NAMN PÃƒâ€¦ AVLIDEN]',
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ BULK UPPSÃƒâ€žGNING Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
    <input type="text" class="text-input bulk-name" placeholder="TjÃƒÂ¤nst (t.ex. Spotify, Telia, NetflixÃ¢â‚¬Â¦)" />
    <input type="text" class="text-input bulk-custnr" placeholder="Kundnr (valfritt)" />
    <button class="bulk-remove" onclick="removeBulkRow(${id})" aria-label="Ta bort">Ã¢Å“â€¢</button>`;
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

  // Show loading state Ã¢â‚¬â€ lets browser repaint before synchronous work
  const genBtn = document.querySelector('#doc-form-bulk .btn-primary');
  if (genBtn) { genBtn.disabled = true; genBtn.textContent = 'FÃƒÂ¶rbereder brevÃ¢â‚¬Â¦'; }
  requestAnimationFrame(() => setTimeout(() => _doGenerateBulk(sender, email, genBtn), 0));
}

function _doGenerateBulk(sender, email, genBtn) {
  saveSenderInfo(sender, email);

  const services = [];
  document.querySelectorAll('.bulk-row').forEach(row => {
    const name   = row.querySelector('.bulk-name').value.trim();
    const custnr = row.querySelector('.bulk-custnr').value.trim();
    if (name) services.push({ name, custnr });
  });
  if (services.length === 0) { showFormError('err-bulk', 'LÃƒÂ¤gg till minst en tjÃƒÂ¤nst med namn.'); return; }

  const { deceased, personnr, today } = getDocContext();

  const letters = services.map(({ name, custnr }) => ({
    service: name,
    text: `${sender}\n${email}\n\n${today}\n\nTill: ${name}\nÃƒâ€žrende: Avslutning av abonnemang Ã¢â‚¬â€ dÃƒÂ¶dsfall${custnr ? '\nKundnummer: ' + custnr : ''}\n\nHej,\n\nJag kontaktar er angÃƒÂ¥ende abonnemanget som tillhÃƒÂ¶rde ${deceased} (personnr ${personnr}), som tyvÃƒÂ¤rr har gÃƒÂ¥tt bort.\n\nJag ber er hÃƒÂ¤rmed avsluta abonnemanget snarast mÃƒÂ¶jligt och begÃƒÂ¤r ÃƒÂ¥terbetalning fÃƒÂ¶r eventuell fÃƒÂ¶rbetald period efter avslutsdatum.\n\nJag bifogar dÃƒÂ¶dsbevis och ÃƒÂ¤r tillgÃƒÂ¤nglig fÃƒÂ¶r frÃƒÂ¥gor via e-post.\n\nVÃƒÂ¤nligen bekrÃƒÂ¤fta avslut skriftligen.\n\nMed vÃƒÂ¤nliga hÃƒÂ¤lsningar,\n\n${sender}\n${email}`,
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
  if (genBtn) { genBtn.disabled = false; genBtn.textContent = 'Skapa alla brev Ã¢â€ â€™'; }
  track('Doc Generated', { title: 'Bulk uppsÃƒÂ¤gning', count: String(services.length) });
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
  if (!service || !sender || !email) { showFormError('err-letter', 'Fyll i de obligatoriska fÃƒÂ¤lten (mÃƒÂ¤rkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();
  const custnrLine = custnr ? `\nKundnummer: ${custnr}` : '';

  showDocResult('UppsÃƒÂ¤gningsbrev Ã¢â‚¬â€ ' + service, `${sender}
${email}

${today}

Till: ${service}
Ãƒâ€žrende: Avslutning av abonnemang Ã¢â‚¬â€ dÃƒÂ¶dsfall${custnrLine}

Hej,

Jag kontaktar er angÃƒÂ¥ende abonnemanget som tillhÃƒÂ¶rde ${deceased} (personnr ${personnr}), som tyvÃƒÂ¤rr har gÃƒÂ¥tt bort.

Jag ber er hÃƒÂ¤rmed avsluta abonnemanget snarast mÃƒÂ¶jligt och begÃƒÂ¤r ÃƒÂ¥terbetalning fÃƒÂ¶r eventuell fÃƒÂ¶rbetald period efter avslutsdatum.

Jag bifogar dÃƒÂ¶dsbevis och ÃƒÂ¤r tillgÃƒÂ¤nglig fÃƒÂ¶r eventuella frÃƒÂ¥gor via e-post.

VÃƒÂ¤nligen bekrÃƒÂ¤fta avslut skriftligen.

Med vÃƒÂ¤nliga hÃƒÂ¤lsningar,

${sender}
${email}`);
}

function generateBank() {
  const bank     = document.getElementById('bank-name').value.trim();
  const sender   = document.getElementById('bank-sender').value.trim();
  const relation = document.getElementById('bank-relation').value.trim();
  const email    = document.getElementById('bank-email').value.trim();
  clearFormError('err-bank');
  if (!bank || !sender || !relation || !email) { showFormError('err-bank', 'Fyll i de obligatoriska fÃƒÂ¤lten (mÃƒÂ¤rkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Brev till ' + bank, `${sender}
${email}

${today}

Till: ${bank}
Ãƒâ€žrende: DÃƒÂ¶dsfallsnotifiering Ã¢â‚¬â€ begÃƒÂ¤ran om kontospÃƒÂ¤rr och tillgÃƒÂ¥ngsinformation

Hej,

Jag skriver till er med anledning av att ${deceased} (personnr ${personnr}) har gÃƒÂ¥tt bort. Jag ÃƒÂ¤r ${relation} och representerar dÃƒÂ¶dsboet.

Jag begÃƒÂ¤r hÃƒÂ¤rmed att:

1. Samtliga konton tillhÃƒÂ¶rande ${deceased} spÃƒÂ¤rras tills bouppteckning ÃƒÂ¤r genomfÃƒÂ¶rd.
2. En fÃƒÂ¶rteckning ÃƒÂ¶ver befintliga konton och tillgÃƒÂ¥ngar skickas till mig.
3. Ni bekrÃƒÂ¤ftar skriftligen att ni tagit emot detta meddelande.

DÃƒÂ¶dsbevis bifogas detta brev. Ytterligare dokumentation (bouppteckning, fullmakt) skickas sÃƒÂ¥ snart det ÃƒÂ¤r tillgÃƒÂ¤ngligt.

FÃƒÂ¶r frÃƒÂ¥gor, kontakta mig pÃƒÂ¥ angiven e-postadress.

Med vÃƒÂ¤nliga hÃƒÂ¤lsningar,

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
  if (!bolag || !sender || !relation || !email) { showFormError('err-forsakring', 'Fyll i de obligatoriska fÃƒÂ¤lten (mÃƒÂ¤rkta med *).'); return; }
  saveSenderInfo(sender, email);

  const { deceased, personnr, today } = getDocContext();

  showDocResult('Brev till ' + bolag, `${sender}
${email}

${today}

Till: ${bolag}
Ãƒâ€žrende: DÃƒÂ¶dsfallsanmÃƒÂ¤lan Ã¢â‚¬â€ begÃƒÂ¤ran om utredning av fÃƒÂ¶rsÃƒÂ¤kringar

Hej,

Jag kontaktar er fÃƒÂ¶r att anmÃƒÂ¤la att ${deceased} (personnr ${personnr}) har gÃƒÂ¥tt bort.

Jag ÃƒÂ¤r ${relation} och ber er:

1. BekrÃƒÂ¤fta vilka fÃƒÂ¶rsÃƒÂ¤kringar som fanns hos er pÃƒÂ¥ den avlidnes namn.
2. Informera om eventuell utbetalning av livfÃƒÂ¶rsÃƒÂ¤kring eller begravningsfÃƒÂ¶rsÃƒÂ¤kring.
3. Avsluta lÃƒÂ¶pande fÃƒÂ¶rsÃƒÂ¤kringar frÃƒÂ¥n och med dÃƒÂ¶dsdatum.

DÃƒÂ¶dsbevis bifogas. Kontakta mig fÃƒÂ¶r ytterligare dokumentation.

Med vÃƒÂ¤nliga hÃƒÂ¤lsningar,

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

  const lifeSpan  = (born && died) ? `${born} Ã¢â‚¬â€œ ${died}` : (died ? `Avled ${died}` : '');
  const memLine   = memory ? `\n${memory}\n` : '';
  const survLine  = survivors ? `\nEfterlÃƒÂ¤mnas av ${survivors}.` : '';
  const funLine   = funeral ? `\nBegravning: ${funeral}.` : '\nBegravning meddelas i god tid.';
  const ovrigtLine = ovrigt ? `\n\n${ovrigt}` : '';

  showDocResult('DÃƒÂ¶dsannons Ã¢â‚¬â€ ' + name, `${name}
${lifeSpan}
${memLine}${survLine}
${funLine}

SÃƒÂ¶rjd och saknad.${ovrigtLine}`.trim());
}

function showDocResult(title, text, emailSubject) {
  track('Doc Generated', { title: title.split(' Ã¢â‚¬â€ ')[0] });
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
  if (!sender || !relation || !email) { showFormError('err-skatteverket', 'Fyll i de obligatoriska fÃƒÂ¤lten (mÃƒÂ¤rkta med *).'); return; }

  const { deceased, personnr, today } = getDocContext();

  const arendeTexts = {
    intyg:    { subject: 'BegÃƒÂ¤ran om dÃƒÂ¶dsfallsintyg och personbevis fÃƒÂ¶r dÃƒÂ¶dsbo', body: `Jag kontaktar er fÃƒÂ¶r att begÃƒÂ¤ra dÃƒÂ¶dsfallsintyg och personbevis avseende dÃƒÂ¶dsboet efter ${deceased} (personnr ${personnr}), som gick bort nyligen.\n\nDokumenten behÃƒÂ¶vs fÃƒÂ¶r dÃƒÂ¶dsboets rÃƒÂ¤kning i samband med bouppteckning och kontakt med banker och myndigheter.\n\nJag ÃƒÂ¤r ${relation} och dÃƒÂ¶dsbodelÃƒÂ¤gare. VÃƒÂ¤nligen skicka handlingarna till angiven e-postadress, eller meddela hur ansÃƒÂ¶kan gÃƒÂ¶rs via er e-tjÃƒÂ¤nst.` },
    fskatt:   { subject: 'BegÃƒÂ¤ran om avslut av F-skatt Ã¢â‚¬â€ dÃƒÂ¶dsfall', body: `Jag kontaktar er med anledning av att ${deceased} (personnr ${personnr}) har gÃƒÂ¥tt bort och att den av hen bedrivna enskilda nÃƒÂ¤ringsverksamheten dÃƒÂ¤rmed ska avslutas.\n\nJag ber er avregistrera F-skatten och eventuell mervÃƒÂ¤rdesskatt (moms) med dÃƒÂ¶dsdatum som slutdatum.\n\nJag ÃƒÂ¤r ${relation} och fÃƒÂ¶retrÃƒÂ¤der dÃƒÂ¶dsboet. DÃƒÂ¶dsbevis bifogas. Kontakta mig fÃƒÂ¶r ytterligare dokumentation.` },
    slutskatt: { subject: 'BegÃƒÂ¤ran om information om slutlig skatt Ã¢â‚¬â€ dÃƒÂ¶dsfall', body: `Jag kontaktar er angÃƒÂ¥ende slutlig skatt fÃƒÂ¶r ${deceased} (personnr ${personnr}), som har gÃƒÂ¥tt bort.\n\nJag ber er bekrÃƒÂ¤fta om det finns kvarsstÃƒÂ¥ende skattefordringar eller skatteÃƒÂ¥terbÃƒÂ¤ring att reglera, samt hur dÃƒÂ¶dsboet ska gÃƒÂ¥ till vÃƒÂ¤ga.\n\nJag ÃƒÂ¤r ${relation} och dÃƒÂ¶dsbodelÃƒÂ¤gare. VÃƒÂ¤nligen kontakta mig pÃƒÂ¥ angiven e-postadress.` },
  };

  const { subject, body } = arendeTexts[arende];

  showDocResult(`Skatteverket Ã¢â‚¬â€ ${subject}`, `${sender}\n${email}\n\n${today}\n\nTill: Skatteverket\nÃƒâ€žrende: ${subject}\n\nHej,\n\n${body}\n\nMed vÃƒÂ¤nliga hÃƒÂ¤lsningar,\n\n${sender}\n${relation} till ${deceased}\n${email}`, subject);
}


function generateFullmakt() {
  const grantor1 = document.getElementById('fullmakt-grantor1').value.trim();
  const grantor2 = document.getElementById('fullmakt-grantor2').value.trim();
  const agent    = document.getElementById('fullmakt-agent').value.trim();
  const relation = document.getElementById('fullmakt-relation').value.trim();
  clearFormError('err-fullmakt');
  if (!grantor1 || !agent) { showFormError('err-fullmakt', 'Fyll i de obligatoriska fÃƒÂ¤lten (mÃƒÂ¤rkta med *).'); return; }

  const { deceased, personnr, today } = getDocContext();
  const grantors = grantor2 ? `${grantor1} och ${grantor2}` : grantor1;
  const agentLine = relation ? `${agent} (${relation})` : agent;

  showDocResult('Fullmakt Ã¢â‚¬â€ dÃƒÂ¶dsbo', `FULLMAKT
UtfÃƒÂ¤rdad: ${today}

Vi, undertecknade dÃƒÂ¶dsbodelÃƒÂ¤gare efter ${deceased} (personnr ${personnr}), ger hÃƒÂ¤rmed

  ${agentLine}

fullmakt att fÃƒÂ¶r dÃƒÂ¶dsboets rÃƒÂ¤kning:

Ã¢â‚¬Â¢ Kontakta och fÃƒÂ¶retrÃƒÂ¤da dÃƒÂ¶dsboet gentemot banker och finansinstitut
Ã¢â‚¬Â¢ BegÃƒÂ¤ra kontoinformation och genomfÃƒÂ¶ra betalningar ur dÃƒÂ¶dsboets medel
Ã¢â‚¬Â¢ Teckna dÃƒÂ¶dsboets namn i lÃƒÂ¶pande ÃƒÂ¤renden
Ã¢â‚¬Â¢ Kontakta myndigheter (Skatteverket, Kronofogden m.fl.) ÃƒÂ¥ dÃƒÂ¶dsboets vÃƒÂ¤gnar
Ã¢â‚¬Â¢ SÃƒÂ¤ga upp avtal och abonnemang tillhÃƒÂ¶rande ${deceased}

Fullmakten gÃƒÂ¤ller tills dÃƒÂ¶dsboet ÃƒÂ¤r avslutat och ska uppvisas i original vid bankbesÃƒÂ¶k.


______________________________    ______________________________
${grantors}
DÃƒÂ¶dsbodelÃƒÂ¤gare                    Datum och ort`);
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
  win.document.write(`<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><title>Brev Ã¢â‚¬â€ dÃƒÂ¶dsbo</title></head><body>${pages}</body></html>`);
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ STATE SNAPSHOT (for localStorage) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
    // personnr intentionally excluded (privacy)
  };
}

function toggleMemoryPhrase(btn) {
  btn.classList.toggle('selected');
  const selected = [...document.querySelectorAll('#memory-chips .phrase-chip.selected')]
    .map(b => b.textContent).join('. ');
  const ta = document.getElementById('annons-memory');
  if (ta && !ta.dataset.manual) ta.value = selected ? selected + '.' : '';
}


// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ FORM VALIDATION Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ UTILS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PERSIST Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function saveState() {
  // Save locally with personnr (own device only Ã¢â‚¬â€ never shared)
  const toSave = { ...getShareableState(), personnr: state.personnr };
  try { localStorage.setItem('efterplan_state', JSON.stringify(toSave)); } catch(e) {}
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ INIT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ OFFLINE DETECTION Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
(function initOfflineBanner() {
  const banner = document.getElementById('offline-banner');
  if (!banner) return;
  const show = () => banner.classList.add('is-offline');
  const hide = () => banner.classList.remove('is-offline');
  window.addEventListener('offline', show);
  window.addEventListener('online',  hide);
  if (!navigator.onLine) show();
})();

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ COMPLETION OVERLAY Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function showCompletionOverlay() {
  const overlay = document.getElementById('completion-overlay');
  if (!overlay || overlay.dataset.shown === '1') return;
  overlay.dataset.shown = '1';
  _completionPrevFocus = document.activeElement;
  const nameEl = document.getElementById('co-name');
  if (nameEl && state.name) {
    nameEl.textContent = 'Du har tagit dig igenom allt fÃƒÂ¶r ' + state.name + '.';
  }
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const first = overlay.querySelector(FOCUSABLE);
  if (first) setTimeout(() => first.focus(), 50);
  overlay.addEventListener('keydown', _coEscHandler);
  track('Plan Completed');
}

function closeCompletionOverlay() {
  const overlay = document.getElementById('completion-overlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
  overlay.removeEventListener('keydown', _coEscHandler);
  document.body.style.overflow = '';
  if (_completionPrevFocus) { _completionPrevFocus.focus(); _completionPrevFocus = null; }
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PDF / PRINT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function printPlan() {
  track('Plan Printed');
  window.print();
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PAYWALL Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
(function initPaywall() {
  const card = document.getElementById('paywall-card');
  if (!card) return;
  if (PAYWALL_ENABLED) card.classList.remove('hidden');
})();

function handlePaywallCTA() {
  // Placeholder Ã¢â‚¬â€ wire Stripe Checkout URL here when ready
  track('Paywall CTA Clicked');
  alert('Betalning ÃƒÂ¤r inte aktiverat ÃƒÂ¤nnu Ã¢â‚¬â€ kom tillbaka snart!');
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ INIT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
(function init() {
  // Restore own plan from localStorage
  try {
    const saved = localStorage.getItem('efterplan_state');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
      buildTasks();
      loadTaskState();
      loadBills();
      renderPlan();
      showScreen('screen-plan');
      return;
    }
  } catch(e) {}

  // PWA shortcut: ./#start forces onboarding even on revisit
  if (window.location.hash === '#start') {
    history.replaceState(null, '', window.location.pathname);
    startOnboarding();
  }
})();
