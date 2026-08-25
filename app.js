/**
 * RENOVATE Serious Game - Main Application Engine
 * Responsive 9:16 Vertical Viewport System with Advanced Designer Engine & Smart Best Fit Refinement
 */

const STORAGE_KEY_PROGRESS = 'renovate_game_progress';
const STORAGE_KEY_LANG = 'renovate_game_lang';
const STORAGE_KEY_MUTE = 'renovate_game_muted';
const STORAGE_KEY_CUSTOM_COORDS = 'renovate_custom_coordinates_v2';

const SUPPORTED_LANGUAGES = [
  { code: 'en-GB', display: 'en-GB English' },
  { code: 'es-ES', display: 'es-ES Español' },
  { code: 'fr-FR', display: 'fr-FR Français' },
  { code: 'it-IT', display: 'it-IT Italiano' },
  { code: 'nl-BE', display: 'nl-BE Nederlands (BE)' },
  { code: 'cs-CZ', display: 'cs-CZ Čeština' },
  { code: 'pt-PT', display: 'pt-PT Português' },
  { code: 'pl-PL', display: 'pl-PL Polski' },
  { code: 'el-CY', display: 'el-CY Ελληνικά (CY)' },
  { code: 'de-DE', display: 'de-DE Deutsch' },
  { code: 'nl-NL', display: 'nl-NL Nederlands (NL)' },
  { code: 'el-GR', display: 'el-GR Ελληνικά (GR)' }
];

// Factory Default Coordinates Map (Master Blueprint with Hardcoded Polished Positions)
const INITIAL_UI_COORDINATES_MAP = {
  "s01": {
    "titleHeader": {
      "top": "16.5%",
      "left": "5.0%",
      "width": "90.0%",
      "fontSize": "1.05rem"
    },
    "startBtn": {
      "top": "74.5%",
      "left": "10.0%",
      "width": "80.0%",
      "fontSize": "1.05rem"
    },
    "stepperCard": {
      "top": "84.5%",
      "left": "4.0%",
      "width": "92.0%",
      "fontSize": "1.05rem"
    }
  },
  "s02": {
    "textContainer": {
      "top": "10.5%",
      "left": "6%",
      "width": "54%",
      "fontSize": "1.05rem"
    },
    "attributesCard": {
      "top": "76%",
      "left": "4%",
      "width": "92%",
      "fontSize": "0.85rem"
    }
  },
  "s03": {
    "textContainer": {
      "top": "10.5%",
      "left": "40%",
      "width": "54%",
      "fontSize": "1.05rem"
    },
    "attributesCard": {
      "top": "76%",
      "left": "4%",
      "width": "92%",
      "fontSize": "0.85rem"
    }
  },
  "s04": {
    "textContainer": {
      "top": "10.5%",
      "left": "6%",
      "width": "58%",
      "fontSize": "1.05rem"
    }
  },
  "s05": {
    "bubble": {
      "top": "50.1%",
      "right": "5%",
      "width": "58%",
      "pointer": "pointer-top",
      "fontSize": "0.95rem",
      "left": "38.6%"
    }
  },
  "s06": {
    "iconBlock": {
      "top": "14.0%",
      "left": "0.0%",
      "width": "100.0%",
      "fontSize": "1.05rem"
    },
    "card": {
      "top": "36.0%",
      "left": "6.0%",
      "width": "88.0%",
      "fontSize": "1.05rem"
    }
  },
  "s07": {
    "card": {
      "top": "24%",
      "left": "8%",
      "width": "84%",
      "fontSize": "1rem"
    }
  },
  "s08": {
    "bubble": {
      "top": "10.5%",
      "right": "5%",
      "width": "48.0%",
      "pointer": "pointer-left",
      "fontSize": "1.05rem",
      "left": "42.0%"
    },
    "tip": {
      "top": "42.0%",
      "right": "5%",
      "width": "46.0%",
      "fontSize": "1.05rem",
      "left": "47.0%"
    },
    "pillars": {
      "top": "57.0%",
      "right": "5%",
      "width": "86.0%",
      "fontSize": "1.05rem",
      "left": "7.0%"
    }
  },
  "s09": {
    "bubble": {
      "top": "9.0%",
      "right": "5%",
      "width": "46%",
      "pointer": "pointer-left",
      "fontSize": "0.95rem",
      "left": "47.0%"
    },
    "card": {
      "top": "50.0%",
      "right": "5%",
      "width": "88%",
      "fontSize": "0.92rem",
      "left": "7.4%"
    }
  },
  "s10": {
    "bubble": {
      "top": "10.5%",
      "right": "5%",
      "width": "46.0%",
      "pointer": "pointer-left",
      "fontSize": "1.05rem",
      "left": "50.0%"
    },
    "card": {
      "top": "48.5%",
      "right": "5%",
      "width": "90.0%",
      "fontSize": "1.05rem",
      "left": "5.0%"
    }
  }
};

// Active Coordinates Map initialized from deep clone
let UI_COORDINATES_MAP = JSON.parse(JSON.stringify(INITIAL_UI_COORDINATES_MAP));

// Preload all backdrop images for instantaneous 60fps transitions without lag or black screens
function preloadBackdropImages() {
  const imagesToPreload = [
    'public/images/SeriousGame_tela-Simples.jpg',
    'public/images/SeriousGame_tela1.jpg',
    'public/images/SeriousGame_tela2.jpg',
    'public/images/SeriousGame_tela3.jpg',
    'public/images/SeriousGame_tela4.jpg',
    'public/images/SeriousGame_tela5.jpg',
    'public/images/SeriousGame_tela8.jpg',
    'public/images/SeriousGame_tela9.jpg',
    'public/images/SeriousGame_tela10.jpg',
    'public/images/SeriousGame_tela23.jpg',
    'public/images/s10_param1_tractor.png',
    'public/images/s10_param2_pressure.png',
    'public/images/s10_param3_nozzles.png',
    'public/images/s10_param4_activenozzles.png'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Load Saved Custom Coordinates from localStorage & auto-sync to local server
function loadCustomCoordinates() {
  const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_COORDS) || localStorage.getItem('renovate_custom_coordinates');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      UI_COORDINATES_MAP = JSON.parse(JSON.stringify(INITIAL_UI_COORDINATES_MAP));
      Object.keys(parsed).forEach(k => {
        UI_COORDINATES_MAP[k] = { ...UI_COORDINATES_MAP[k], ...parsed[k] };
      });

      // Auto-sync saved designer coordinates to server file app.js on localhost
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        fetch('/api/sync-coords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(UI_COORDINATES_MAP)
        }).catch(e => console.error('Auto-sync error:', e));
      }
    } catch (e) {
      console.error('Error parsing custom coordinates:', e);
    }
  }
}

// Central Game State
const gameState = {
  currentSlide: 1,
  totalSlides: 157,
  activeLanguage: 'pt-PT',
  activeTranslations: {},
  quizAnswers: {},
  maxUnlockedSlide: 1,
  audioMuted: false,
  designerMode: false,
  selectedDesignerElement: null
};

// Web Audio API Synthesizer (Ding & Buzz)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (gameState.audioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'ding') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } else if (type === 'buzz') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// Translation Helper
function t(key, fallback = '') {
  if (gameState.activeTranslations && gameState.activeTranslations[key]) {
    return gameState.activeTranslations[key];
  }
  return fallback || key;
}

// Load Translation Dictionary
async function loadTranslations(langCode) {
  try {
    const response = await fetch(`./public/locales/${langCode}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load locale: ${langCode}`);
    }
    const data = await response.json();
    gameState.activeTranslations = data;
    gameState.activeLanguage = langCode;
    localStorage.setItem(STORAGE_KEY_LANG, langCode);
    
    renderTopBar();
    renderCurrentSlide();
  } catch (err) {
    console.error('Translation error:', err);
  }
}

// Save & Restore Game Progress
function saveProgress() {
  const saveData = {
    slide: gameState.currentSlide,
    maxUnlocked: gameState.maxUnlockedSlide,
    lang: gameState.activeLanguage,
    answers: gameState.quizAnswers
  };
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(saveData));
}

function checkSessionRecovery() {
  const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
  if (savedLang) {
    gameState.activeLanguage = savedLang;
  }

  const savedMute = localStorage.getItem(STORAGE_KEY_MUTE);
  if (savedMute !== null) {
    gameState.audioMuted = savedMute === 'true';
  }

  const savedRaw = localStorage.getItem(STORAGE_KEY_PROGRESS);
  if (!savedRaw) return false;

  try {
    const saved = JSON.parse(savedRaw);
    if (saved && saved.slide && saved.slide > 1) {
      showRecoveryModal(saved);
      return true;
    }
  } catch (e) {
    console.error('Error reading saved session:', e);
  }
  return false;
}

function showRecoveryModal(savedData) {
  const container = document.getElementById('modal-container');
  
  const resumeTitle = t('ui_resume_session', 'Resume Session');
  const restartTitle = t('ui_start_over', 'Start Over');
  const promptTemplate = t('ui_resume_prompt', 'Do you want to resume your saved session from Screen {X}?');
  const promptText = promptTemplate.replace('{X}', savedData.slide);

  container.innerHTML = `
    <div class="modal-backdrop">
      <div class="cream-card modal-content">
        <div class="cream-card-header">RENOVATE Serious Game</div>
        <div class="cream-card-body" style="margin-top:12px;">
          ${promptText}
        </div>
        <div class="modal-actions">
          <button id="btn-resume-session" class="btn-modal btn-modal-primary">${resumeTitle}</button>
          <button id="btn-restart-session" class="btn-modal btn-modal-secondary">${restartTitle}</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-resume-session').addEventListener('click', () => {
    gameState.currentSlide = savedData.slide;
    gameState.maxUnlockedSlide = savedData.maxUnlocked || savedData.slide;
    gameState.quizAnswers = savedData.answers || {};
    if (savedData.lang) gameState.activeLanguage = savedData.lang;
    container.innerHTML = '';
    loadTranslations(gameState.activeLanguage);
  });

  document.getElementById('btn-restart-session').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    container.innerHTML = '';
    loadTranslations(gameState.activeLanguage);
  });
}

// Navigation Engine
function goToSlide(slideNum) {
  if (slideNum < 1 || slideNum > gameState.totalSlides) return;
  gameState.currentSlide = slideNum;
  if (slideNum > gameState.maxUnlockedSlide) {
    gameState.maxUnlockedSlide = slideNum;
  }
  saveProgress();
  renderCurrentSlide();
}

// Render Top Bar (#FFCC66 with Logo, Title, Version/Date Badge, Designer Mode [ONLY ON LOCALHOST] & Language Selector)
function renderTopBar() {
  const topBar = document.getElementById('top-bar');
  if (!topBar) return;

  // Designer Mode is strictly restricted to Localhost (127.0.0.1 or localhost or ?designer=true)
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.search.includes('designer=true');

  topBar.innerHTML = `
    <div class="top-bar-left">
      <img src="public/images/RENOVATE-logo.svg" alt="RENOVATE Logo" class="top-bar-logo" onerror="this.src='public/images/RENOVATE-logo.png'">
      <div class="top-bar-title-wrapper">
        <span class="top-bar-app-title">Serious Game RENOVATE</span>
        <span class="top-bar-version-badge">v1.0.4 • 25.08.2026</span>
      </div>
      ${isLocalhost ? `
        <button id="btn-toggle-designer" class="btn-designer-toggle ${gameState.designerMode ? 'active' : ''}">
          ${gameState.designerMode ? '✓ Designer On' : '✏️ Designer'}
        </button>
      ` : ''}
    </div>
    
    <div class="top-bar-lang-container">
      <select id="lang-select" class="top-bar-lang-select" title="${t('ui_select_language', 'Language')}">
        ${SUPPORTED_LANGUAGES.map(l => `
          <option value="${l.code}" ${l.code === gameState.activeLanguage ? 'selected' : ''}>
            ${l.display}
          </option>
        `).join('')}
      </select>
    </div>
  `;

  document.getElementById('lang-select').addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    loadTranslations(selectedLang);
  });

  if (isLocalhost) {
    document.getElementById('btn-toggle-designer')?.addEventListener('click', () => {
      gameState.designerMode = !gameState.designerMode;
      if (!gameState.designerMode) {
        gameState.selectedDesignerElement = null;
      }
      renderTopBar();
      renderCurrentSlide();
    });
  }
}

// Helper to convert style object to inline CSS string
function styleObjToCss(styleObj = {}) {
  if (gameState.designerMode) {
    return Object.entries(styleObj)
      .filter(([k]) => k !== 'pointer')
      .map(([k, v]) => {
        const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}:${v}`;
      })
      .concat('position:absolute')
      .join(';');
  }

  // Normal Responsive App Mode (Smartphones, Tablets, Laptops)
  const flowStyles = [];
  if (styleObj.width) flowStyles.push(`width:${styleObj.width}`);
  if (styleObj.maxWidth) flowStyles.push(`max-width:${styleObj.maxWidth}`);
  if (styleObj.fontSize) flowStyles.push(`font-size:${styleObj.fontSize}`);
  flowStyles.push('position:relative', 'margin-left:auto', 'margin-right:auto');
  return flowStyles.join(';');
}

// Main Render Dispatcher
function renderCurrentSlide() {
  const slideContainer = document.getElementById('slide-viewport');
  const overlayContainer = document.getElementById('ui-overlay');
  
  overlayContainer.innerHTML = '';

  const slideId = gameState.currentSlide;

  // Determine Backdrop Image (Layer 1) & Background Position
  // Exact Artwork Backdrop for Screens 1, 2, 3, 4, 5, 8, 9, 10, 23
  if ((slideId >= 1 && slideId <= 5) || (slideId >= 8 && slideId <= 10)) {
    slideContainer.style.backgroundImage = `url('public/images/SeriousGame_tela${slideId}.jpg')`;
    slideContainer.style.backgroundPosition = 'center top';
    slideContainer.style.marginTop = '-1px';
  } else if (slideId === 6 || slideId === 7 || (slideId >= 11 && slideId !== 23)) {
    slideContainer.style.backgroundImage = `url('public/images/SeriousGame_tela-Simples.jpg')`;
    slideContainer.style.backgroundPosition = 'center center';
    slideContainer.style.marginTop = '0px';
  } else if (slideId === 23) {
    slideContainer.style.backgroundImage = `url('public/images/SeriousGame_tela23.jpg')`;
    slideContainer.style.backgroundPosition = 'center center';
    slideContainer.style.marginTop = '0px';
  } else {
    slideContainer.style.backgroundImage = `url('public/images/SeriousGame_tela-Simples.jpg')`;
    slideContainer.style.backgroundPosition = 'center center';
    slideContainer.style.marginTop = '0px';
  }

  // Render Overlay (Layer 2)
  if (slideId === 1) renderScreen1(overlayContainer);
  else if (slideId === 2) renderScreen2(overlayContainer);
  else if (slideId === 3) renderScreen3(overlayContainer);
  else if (slideId === 4) renderScreen4(overlayContainer);
  else if (slideId === 5) renderScreen5(overlayContainer);
  else if (slideId === 6) renderScreen6(overlayContainer);
  else if (slideId === 7) renderScreen7(overlayContainer);
  else if (slideId === 8) renderScreen8(overlayContainer);
  else if (slideId === 9) renderScreen9(overlayContainer);
  else if (slideId === 10) renderScreen10(overlayContainer);
  else if (QUIZ_CONFIG_MAP[slideId]) renderQuizScreen(overlayContainer, slideId);
  else if (QUIZ_FEEDBACK_MAP[slideId]) renderQuizFeedbackScreen(overlayContainer, slideId);
  else renderGenericScreenPlaceholder(overlayContainer, slideId);

  // Setup or Cleanup Designer Mode Controls
  if (gameState.designerMode) {
    setupDesignerModeControls(overlayContainer, slideId);
  } else {
    const toolbar = document.getElementById('designer-toolbar');
    if (toolbar) toolbar.remove();

    overlayContainer.querySelectorAll('.designer-target').forEach(el => {
      el.classList.remove('designer-element-active');
      el.style.outline = 'none';
    });
  }

  // Initialize Lucide Icons if loaded
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Update Bottom Navigation Bar
  renderBottomNavBar();
}

// Screen 1: Exact Reproduction of /docs/tela1.png (No circle avatar, large bold title, clear subtitle)
function renderScreen1(container) {
  const coords = UI_COORDINATES_MAP.s01 || INITIAL_UI_COORDINATES_MAP.s01;

  const fullTitle = t('s01_chapter_title', 'CALIBRATION CHALLENGE');
  const body = t('s01_body_text', 'Help Laura calibrate her sprayer before treating her vineyard.');
  const startText = t('s01_primary_button', t('ui_start_challenge', 'START CHALLENGE'));

  const p1 = t('s01_progress_01', '1. Understanding calibration');
  const p2 = t('s01_progress_02', '2. Setting the task');
  const p3 = t('s01_progress_03', '3. Measuring parameters');
  const p4 = t('s01_progress_04', '4. Selecting nozzles');
  const p5 = t('s01_progress_05', '5. Verifying results');

  const cleanStep = (str) => str.replace(/^\d+[\.\s]*/, '');

  let line1 = 'CALIBRATION';
  let line2 = 'CHALLENGE';
  if (fullTitle.includes(' ')) {
    const parts = fullTitle.split(' ');
    if (parts.length >= 2) {
      line1 = parts.slice(0, Math.ceil(parts.length / 2)).join(' ');
      line2 = parts.slice(Math.ceil(parts.length / 2)).join(' ');
    } else {
      line1 = fullTitle;
      line2 = '';
    }
  } else {
    line1 = fullTitle;
    line2 = '';
  }

  container.innerHTML = `
    <!-- Top Header Area directly on sky (No Circle Avatar) -->
    <div id="el-s01-titleHeader" class="s01-header-container designer-target" style="${styleObjToCss(coords.titleHeader)}">
      <div class="s01-title-wrapper">
        <div class="s01-main-title">
          <div>${line1}</div>
          ${line2 ? `<div>${line2}</div>` : ''}
        </div>
      </div>
      <div class="s01-subtitle-text">${body}</div>
    </div>

    <!-- Start Challenge Pill Button (Green Pill with White Border) -->
    <div id="el-s01-startBtn" class="designer-target" style="text-align: center; ${styleObjToCss(coords.startBtn)}">
      <button id="btn-start-game" class="btn-start-challenge-pill">
        ${startText}
      </button>
    </div>

    <!-- Bottom Horizontal Stepper Card (5 Connected Step Circles) -->
    <div id="el-s01-stepperCard" class="stepper-card designer-target" style="${styleObjToCss(coords.stepperCard)}">
      <div class="stepper-pipeline">
        <div class="stepper-rail"></div>

        <div class="stepper-node">
          <div class="stepper-circle">1</div>
          <div class="stepper-label">${cleanStep(p1)}</div>
        </div>

        <div class="stepper-node">
          <div class="stepper-circle">2</div>
          <div class="stepper-label">${cleanStep(p2)}</div>
        </div>

        <div class="stepper-node">
          <div class="stepper-circle">3</div>
          <div class="stepper-label">${cleanStep(p3)}</div>
        </div>

        <div class="stepper-node">
          <div class="stepper-circle">4</div>
          <div class="stepper-label">${cleanStep(p4)}</div>
        </div>

        <div class="stepper-node">
          <div class="stepper-circle">5</div>
          <div class="stepper-label">${cleanStep(p5)}</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-start-game').addEventListener('click', () => {
    getAudioContext();
    goToSlide(2);
  });
}

// Screen 2: Meet Laura (Exact Reproduction of /docs/tela2.png with Lucide Icons: grape, leaf, target)
function renderScreen2(container) {
  const coords = UI_COORDINATES_MAP.s02 || INITIAL_UI_COORDINATES_MAP.s02;
  const title = t('s02_screen_title', t('ui_meet_laura', 'MEET LAURA'));
  
  const fullBody = t('s02_body_text', 'Laura is a passionate vineyard grower. She wants to protect her crops, reduce waste and take care of the environment.');
  let p1 = 'Laura is a passionate vineyard grower.';
  let p2 = 'She wants to protect her crops, reduce waste and take care of the environment.';

  if (fullBody.includes('.')) {
    const parts = fullBody.split('.').filter(p => p.trim());
    if (parts.length >= 2) {
      p1 = parts[0].trim() + '.';
      p2 = parts.slice(1).join('.').trim();
      if (!p2.endsWith('.')) p2 += '.';
    } else {
      p1 = fullBody;
      p2 = '';
    }
  } else {
    p1 = fullBody;
    p2 = '';
  }

  const feat1 = t('s02_feature_01', 'VINEYARD GROWER');
  const feat2 = t('s02_feature_02', 'CARES ABOUT THE ENVIRONMENT');
  const feat3 = t('s02_feature_03', 'SEEKS BEST RESULTS');

  container.innerHTML = `
    <!-- Upper Left Text Container directly on sky (No Card Box!) -->
    <div id="el-s02-textContainer" class="s02-text-container designer-target" style="${styleObjToCss(coords.textContainer)}">
      <div class="s02-title">${title}</div>
      <div class="s02-body-p">${p1}</div>
      ${p2 ? `<div class="s02-body-p">${p2}</div>` : ''}
    </div>

    <!-- Bottom 3-Column Attributes Cream Card with 3D Glowing Icon Badges -->
    <div id="el-s02-attributesCard" class="attributes-card-3col designer-target" style="${styleObjToCss(coords.attributesCard)}">
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="grape" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat1}</div>
      </div>
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="leaf" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat2}</div>
      </div>
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="target" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat3}</div>
      </div>
    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 3: Meet Mia (Exact Reproduction of /docs/tela3.png with Right-Aligned Sky Header and Lucide Icons: graduation-cap, lightbulb, handshake)
function renderScreen3(container) {
  const coords = UI_COORDINATES_MAP.s03 || INITIAL_UI_COORDINATES_MAP.s03;
  const title = t('s03_screen_title', t('ui_meet_mia', 'MEET MIA'));
  
  const fullBody = t('s03_body_text', "Mia is Laura's advisor. She helps her make the right decisions and get the best results with her sprayer.");
  let p1 = "Mia is Laura's advisor.";
  let p2 = "She helps her make the right decisions and get the best results with her sprayer.";

  if (fullBody.includes('.')) {
    const parts = fullBody.split('.').filter(p => p.trim());
    if (parts.length >= 2) {
      p1 = parts[0].trim() + '.';
      p2 = parts.slice(1).join('.').trim();
      if (!p2.endsWith('.')) p2 += '.';
    } else {
      p1 = fullBody;
      p2 = '';
    }
  } else {
    p1 = fullBody;
    p2 = '';
  }

  const feat1 = t('s03_feature_01', 'EXPERT ADVISOR');
  const feat2 = t('s03_feature_02', 'PRACTICAL GUIDANCE');
  const feat3 = t('s03_feature_03', 'ALWAYS BY YOUR SIDE');

  container.innerHTML = `
    <!-- Upper Right Text Container directly on sky (Right-Aligned) -->
    <div id="el-s03-textContainer" class="s02-text-container designer-target" style="text-align: right; ${styleObjToCss(coords.textContainer || { top: '8%', left: '40%', width: '54%' })}">
      <div class="s02-title" style="text-align: right;">${title}</div>
      <div class="s02-body-p" style="text-align: right;">${p1}</div>
      ${p2 ? `<div class="s02-body-p" style="text-align: right;">${p2}</div>` : ''}
    </div>

    <!-- Bottom 3-Column Attributes Cream Card with 3D Glowing Icon Badges -->
    <div id="el-s03-attributesCard" class="attributes-card-3col designer-target" style="${styleObjToCss(coords.attributesCard || { top: '76%', left: '4%', width: '92%' })}">
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="graduation-cap" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat1}</div>
      </div>
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="lightbulb" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat2}</div>
      </div>
      <div class="attr-col">
        <div class="attr-icon-badge-3d">
          <i data-lucide="handshake" class="attr-icon-lucide"></i>
        </div>
        <div class="attr-text">${feat3}</div>
      </div>
    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 4: The Situation (Exact floating text style as Screen 2/3, with enlarged title and body text)
function renderScreen4(container) {
  const coords = UI_COORDINATES_MAP.s04 || INITIAL_UI_COORDINATES_MAP.s04;
  const title = t('s04_screen_title', 'THE SITUATION');
  const fullBody = t('s04_body_text', 'Warm and humid weather favours downy mildew infection. Timely and well-calibrated spraying is essential.');

  let p1 = 'Warm and humid weather favours downy mildew infection.';
  let p2 = 'Timely and well-calibrated spraying is essential.';

  if (fullBody.includes('.')) {
    const parts = fullBody.split('.').filter(p => p.trim());
    if (parts.length >= 2) {
      p1 = parts[0].trim() + '.';
      p2 = parts.slice(1).join('.').trim();
      if (!p2.endsWith('.')) p2 += '.';
    } else {
      p1 = fullBody;
      p2 = '';
    }
  } else {
    p1 = fullBody;
    p2 = '';
  }

  container.innerHTML = `
    <!-- Upper Left Text Container with Translucent Cream Card styling for crisp contrast -->
    <div id="el-s04-textContainer" class="cream-card designer-target" style="background: rgba(247, 247, 242, 0.88); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); ${styleObjToCss(coords.textContainer || coords.card || { top: '9%', left: '6%', width: '58%' })}">
      <div class="cream-card-header" style="font-size: 1.35rem; font-weight: 900; color: #1E4222; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.02em;">${title}</div>
      <div class="cream-card-body" style="font-size: 1.05rem; font-weight: 600; color: #1F2220; line-height: 1.42;">
        <p style="margin-bottom: 8px;">${p1}</p>
        ${p2 ? `<p style="margin-bottom: 0;">${p2}</p>` : ''}
      </div>
    </div>
  `;
}

// Screen 5: Mia Welcome Dialogue (With <break> / newline paragraph breaks across all 12 languages, registered trademark VitiShield®, and expanding height)
function renderScreen5(container) {
  const coords = UI_COORDINATES_MAP.s05 || INITIAL_UI_COORDINATES_MAP.s05;
  const pointerClass = (coords.bubble && coords.bubble.pointer) || 'pointer-left';
  
  const rawSpeech = t('s05_dialogue_mia', "Hi Laura!\r\nWeather conditions are favourable for downy mildew.\r\nI recommend applying VitiShield® today.\r\nBut before entering the vineyard, let's make sure your sprayer is correctly calibrated.\r\nI'll guide you through the whole process.");

  // Split by <break>, \r\n, \n, or fallback sentence boundaries into clean separate paragraphs
  let paragraphs = rawSpeech
    .split(/<break>|\r\n|\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (paragraphs.length <= 1 && (rawSpeech.includes('.') || rawSpeech.includes('!'))) {
    paragraphs = rawSpeech
      .replace(/! /g, '!\n')
      .replace(/\. /g, '.\n')
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  const formattedHtml = paragraphs
    .map(p => `<p class="speech-p" style="margin-bottom: 10px; line-height: 1.38; font-weight: 600;">${p}</p>`)
    .join('');

  container.innerHTML = `
    <div id="el-s05-bubble" class="speech-bubble ${pointerClass} designer-target" style="min-height: max-content; ${styleObjToCss(coords.bubble || { top: '8%', right: '5%', width: '58%' })}">
      <div class="speaker-name" style="font-weight: 900; color: #1E4222; margin-bottom: 8px; font-size: 1.05rem;">MIA</div>
      <div class="speech-text" style="font-size: 1.02rem; color: #1F2220;">
        ${formattedHtml}
      </div>
    </div>
  `;
}

// Screen 6: Sprayer Calibration Info (On SeriousGame_tela-Simples.jpg, 90px Info Icon in a SEPARATE floating block, line-height 1.88, cream blocks with opacity 0.78, 12-language parameter highlights)
function renderScreen6(container) {
  const coords = UI_COORDINATES_MAP.s06 || INITIAL_UI_COORDINATES_MAP.s06;
  
  const rawInfo1 = t('s06_info_01', 'Weather conditions favour downy mildew infection.');
  let rawInfo2 = t('s06_info_02', 'Mia recommends applying VitiShield® Fungicide at 1 L/ha (or 100 cm3 /100 L of water), using 250 L/ha and a medium droplet size (M).');
  const rawInfo3 = t('s06_info_03', 'Before spraying, Laura must calibrate her sprayer correctly.');

  // Universal 12-Language Highlight Pattern for 1 L/ha, 250 L/ha, and medium droplet size (M)
  rawInfo2 = rawInfo2
    .replace(/(1\s*[L|l]\/ha)/g, '<strong class="highlight-param">$1</strong>')
    .replace(/(250\s*[L|l]\/ha)/g, '<strong class="highlight-param">$1</strong>')
    .replace(/(medium droplet size\s*\(M\)|tamanho de gota médio\s*\(M\)|tamaño de gota medio\s*\(M\)|taille de goutte moyenne\s*\(M\)|dimensione media delle gocce\s*\(M\)|mittleren Tropfengröße\s*\(M\)|gemiddelde druppelgrootte\s*\(M\)|střední velikosti kapek\s*\(M\)|średniej wielkości kropel\s*\(M\)|μεσαίο μέγεθος σταγόνας\s*\(M\))/gi, '<strong class="highlight-param">$1</strong>');

  container.innerHTML = `
    <!-- Separate Floating Top Icon Block (Increased Spacing to Text Boxes) -->
    <div id="el-s06-iconBlock" class="designer-target" style="text-align: center; ${styleObjToCss(coords.iconBlock || { top: '6%', left: '0%', width: '100%' })}">
      <i data-lucide="info" class="s06-info-top-icon" style="width: 90px; height: 90px; stroke: #1E4222; stroke-width: 2.2; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.25));"></i>
    </div>

    <!-- Separate Floating Text Cards Container (Opacity 0.78, Increased Line-Height 1.88, Spanning > 50% Screen Height) -->
    <div id="el-s06-card" class="designer-target" style="${styleObjToCss(coords.card || { top: '19%', left: '6%', width: '88%' })}">
      <div class="s06-blocks-container" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="s06-translucent-block" style="background: rgba(247, 247, 242, 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 18px 22px; border-radius: 16px; border: 1.5px solid rgba(35, 73, 38, 0.35); box-shadow: 0 6px 20px rgba(0,0,0,0.12); font-size: 1.25rem; font-weight: 600; line-height: 1.88; color: #1F2220;">
          ${rawInfo1}
        </div>

        <div class="s06-translucent-block" style="background: rgba(247, 247, 242, 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 18px 22px; border-radius: 16px; border: 1.5px solid rgba(35, 73, 38, 0.35); box-shadow: 0 6px 20px rgba(0,0,0,0.12); font-size: 1.25rem; font-weight: 600; line-height: 1.88; color: #1F2220;">
          ${rawInfo2}
        </div>

        <div class="s06-translucent-block" style="background: rgba(247, 247, 242, 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 18px 22px; border-radius: 16px; border: 1.5px solid rgba(35, 73, 38, 0.35); box-shadow: 0 6px 20px rgba(0,0,0,0.12); font-size: 1.25rem; font-weight: 600; line-height: 1.88; color: #1F2220;">
          ${rawInfo3}
        </div>
      </div>
    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 7: Chapter 1 Start (Floating Translucent Card wrapping Round Icon 1 + Chapter Title)
function renderScreen7(container) {
  const coords = UI_COORDINATES_MAP.s07 || INITIAL_UI_COORDINATES_MAP.s07;
  
  const rawChapterTitle = t('s07_chapter_01_title', '1. Understanding the calibration process and its importance');
  // Strip leading number prefix "1. " or "1 " if present
  const cleanTitle = rawChapterTitle.replace(/^1[\.\s]*/, '').trim();

  container.innerHTML = `
    <!-- Translucent Background Layer Card wrapping Icon and Text for Maximum Contrast & Distinction -->
    <div id="el-s07-card" class="designer-target" style="${styleObjToCss(coords.card || { top: '24%', left: '8%', width: '84%' })}">
      <div style="background: rgba(247, 247, 242, 0.82); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 32px 24px; border-radius: 24px; border: 1.5px solid rgba(35, 73, 38, 0.35); box-shadow: 0 8px 28px rgba(0,0,0,0.14); text-align: center;">
        
        <!-- Top Floating Round Badge Icon with Number 1 (Matching Screen 6 Icon Style) -->
        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 90px; height: 90px; border-radius: 50%; background: #F7F7F2; border: 3.5px solid #1E4222; box-shadow: 0 6px 16px rgba(0,0,0,0.18); font-size: 2.8rem; font-weight: 900; color: #1E4222; font-family: 'Outfit', sans-serif;">
            1
          </div>
        </div>

        <!-- Floating Chapter Title Header (Matching Screen 2 & Screen 3 Title Style) -->
        <div class="s02-title" style="text-align: center; font-size: 2.1rem; line-height: 1.35; color: #1E4222; font-weight: 900; text-transform: uppercase; letter-spacing: 0.03em;">
          ${cleanTitle}
        </div>

      </div>
    </div>
  `;
}

// Screen 8: Mia's Tip & 3 Pillars (On SeriousGame_tela8.jpg with Enlarged Titles & Enlarged Lucide Icons)
function renderScreen8(container) {
  const coords = UI_COORDINATES_MAP.s08 || INITIAL_UI_COORDINATES_MAP.s08;
  const pointerClass = (coords.bubble && coords.bubble.pointer) || 'pointer-left';

  const speech = t('s08_dialogue_mia', 'Laura, before we touch the sprayer, we need a clear goal. Do you know what guarantees a successful treatment?');
  const tipTitle = t('s08_tip_title', "Mia's Tip");
  const tipText = t('s08_tip_text', "Too much spray wastes product and harms the environment. Too little won't protect your crops!");

  const secTitle = t('s08_section_title', 'The 3 Pillars of Effectiveness');
  const p1Title = t('s08_pillar_01_title', 'Correct spray volume rate (L/ha)');
  const p1Text = t('s08_pillar_01_text', 'Tailored to the specific area of your vineyard.');
  const p2Title = t('s08_pillar_02_title', 'Exact concentration');
  const p2Text = t('s08_pillar_02_text', 'The right mix of the plant protection product.');
  const p3Title = t('s08_pillar_03_title', 'Precise application');
  const p3Text = t('s08_pillar_03_text', 'Ensuring the exact dose safely reaches the target.');

  container.innerHTML = `
    <!-- Mia Speech Bubble Top Right pointing left at Mia -->
    <div id="el-s08-bubble" class="speech-bubble ${pointerClass} designer-target" style="${styleObjToCss(coords.bubble || { top: '6%', right: '5%', width: '58%' })}">
      <div class="speaker-name" style="font-weight: 900; color: #1E4222; margin-bottom: 6px; font-size: 1.05rem;">MIA</div>
      <div class="speech-text" style="font-size: 1.02rem; line-height: 1.45; font-weight: 600; color: #1F2220;">
        ${speech}
      </div>
    </div>

    <!-- Mia's Tip Box -->
    <div id="el-s08-tip" class="tip-card designer-target" style="${styleObjToCss(coords.tip || { top: '26%', right: '5%', width: '58%' })}">
      <div class="tip-card-header" style="display: flex; align-items: center; gap: 8px; font-weight: 900; color: #855300; font-size: 1.05rem;">
        <i data-lucide="lightbulb" style="width: 24px; height: 24px; stroke: #D97706;"></i>
        <span>${tipTitle}</span>
      </div>
      <div class="tip-card-text" style="font-size: 0.98rem; line-height: 1.45; margin-top: 6px; font-weight: 600; color: #452A00;">
        ${tipText}
      </div>
    </div>

    <!-- 3 Pillars of Effectiveness Translucent Card with Enlarged Header Title, Subtitles and Icons -->
    <div id="el-s08-pillars" class="cream-card designer-target" style="${styleObjToCss(coords.pillars || { top: '48%', right: '5%', width: '58%' })}">
      <div class="cream-card-header" style="font-size: 1.35rem; font-weight: 900; color: #1E4222; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 8px; border-bottom: 2px solid rgba(30, 66, 34, 0.2);">
        ${secTitle}
      </div>
      
      <div class="pillars-list" style="display: flex; flex-direction: column; gap: 14px;">
        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="droplet" style="width: 32px; height: 32px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.15rem; display: block; margin-bottom: 2px;">${p1Title}</span>
            <span class="pillar-item-text" style="font-size: 0.96rem; color: #333333; line-height: 1.4; font-weight: 500;">${p1Text}</span>
          </div>
        </div>

        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="flask-conical" style="width: 32px; height: 32px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.15rem; display: block; margin-bottom: 2px;">${p2Title}</span>
            <span class="pillar-item-text" style="font-size: 0.96rem; color: #333333; line-height: 1.4; font-weight: 500;">${p2Text}</span>
          </div>
        </div>

        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="target" style="width: 32px; height: 32px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.15rem; display: block; margin-bottom: 2px;">${p3Title}</span>
            <span class="pillar-item-text" style="font-size: 0.96rem; color: #333333; line-height: 1.4; font-weight: 500;">${p3Text}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 9: Technical Explanation Part 1 (On SeriousGame_tela9.jpg with Lucide Icons & Matching Screen 8 Style)
function renderScreen9(container) {
  const coords = UI_COORDINATES_MAP.s09 || INITIAL_UI_COORDINATES_MAP.s09;
  const pointerClass = (coords.bubble && coords.bubble.pointer) || 'pointer-left';

  const rawSpeech = t('s09_dialogue_mia', 'Calibration prepares your sprayer for efficient and safe operation. It allows a precise and uniform application of plant protection products at the intended rate.');
  
  let speechParagraphs = rawSpeech.split(/\r\n|\n/).map(p => p.trim()).filter(p => p.length > 0);
  if (speechParagraphs.length <= 1 && rawSpeech.includes('.')) {
    speechParagraphs = rawSpeech.replace(/\. /g, '.\n').split('\n').map(p => p.trim()).filter(p => p.length > 0);
  }
  const formattedSpeech = speechParagraphs.map(p => `<p style="margin-bottom: 6px; line-height: 1.4; font-weight: 600;">${p}</p>`).join('');

  const secTitle = t('s09_section_title', 'What is Calibration?');
  const bodyText = t('s09_body_text', 'Calibration is a procedure that:');
  const f1Title = t('s09_feature_01_title', 'Prepares the sprayer');
  const f1Text = t('s09_feature_01_text', 'for efficient and safe operation.');
  const f2Title = t('s09_feature_02_title', 'Performs a precise');
  const f2Text = t('s09_feature_02_text', 'application of plant protection products.');
  const f3Title = t('s09_feature_03_title', 'Ensures a uniform application');
  const f3Text = t('s09_feature_03_text', 'at the intended application rate.');
  const infoTitle = t('s09_info_title', 'Remember');
  const infoText = t('s09_info_text', 'Calibration is the practical and reliable way to achieve the right spray volume rate in your vineyard or orchard.');

  container.innerHTML = `
    <!-- Mia Speech Bubble Top Right pointing left at Mia -->
    <div id="el-s09-bubble" class="speech-bubble ${pointerClass} designer-target" style="${styleObjToCss(coords.bubble || { top: '6%', right: '5%', width: '58%' })}">
      <div class="speaker-name" style="font-weight: 900; color: #1E4222; margin-bottom: 6px; font-size: 1.05rem;">MIA</div>
      <div class="speech-text" style="font-size: 1.02rem; line-height: 1.45; color: #1F2220;">
        ${formattedSpeech}
      </div>
    </div>

    <!-- What is Calibration Translucent Cream Card -->
    <div id="el-s09-card" class="cream-card designer-target" style="${styleObjToCss(coords.card || { top: '27%', right: '5%', width: '58%' })}">
      <div class="cream-card-header" style="font-size: 1.35rem; font-weight: 900; color: #1E4222; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 6px; border-bottom: 2px solid rgba(30, 66, 34, 0.2);">
        ${secTitle}
      </div>
      <div class="cream-card-body" style="font-size: 1.05rem; font-weight: 700; color: #1F2220; margin-bottom: 12px;">
        ${bodyText}
      </div>
      
      <div class="pillars-list" style="display: flex; flex-direction: column; gap: 12px;">
        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="settings" style="width: 30px; height: 30px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.1rem; display: block; margin-bottom: 2px;">${f1Title}</span>
            <span class="pillar-item-text" style="font-size: 0.95rem; color: #333333; line-height: 1.38; font-weight: 500;">${f1Text}</span>
          </div>
        </div>

        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="target" style="width: 30px; height: 30px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.1rem; display: block; margin-bottom: 2px;">${f2Title}</span>
            <span class="pillar-item-text" style="font-size: 0.95rem; color: #333333; line-height: 1.38; font-weight: 500;">${f2Text}</span>
          </div>
        </div>

        <div class="pillar-item" style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="background: rgba(30, 66, 34, 0.12); padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="bar-chart-3" style="width: 30px; height: 30px; stroke: #1E4222; stroke-width: 2.2;"></i>
          </div>
          <div class="pillar-item-content">
            <span class="pillar-item-title" style="font-weight: 900; color: #1E4222; font-size: 1.1rem; display: block; margin-bottom: 2px;">${f3Title}</span>
            <span class="pillar-item-text" style="font-size: 0.95rem; color: #333333; line-height: 1.38; font-weight: 500;">${f3Text}</span>
          </div>
        </div>
      </div>
      
      <!-- Remember / Lightbulb Info Footer Box -->
      <div style="margin-top: 14px; padding: 10px 14px; background: rgba(255, 204, 102, 0.3); border-radius: 12px; border-left: 4px solid #D97706; display: flex; align-items: flex-start; gap: 8px;">
        <i data-lucide="lightbulb" style="width: 24px; height: 24px; stroke: #D97706; flex-shrink: 0; margin-top: 2px;"></i>
        <div>
          <strong style="color: #855300; font-size: 0.98rem; font-weight: 900; display: block;">${infoTitle}</strong>
          <p style="font-size: 0.9rem; margin-top: 2px; color: #452A00; line-height: 1.38; font-weight: 600;">${infoText}</p>
        </div>
      </div>
    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 10: The 4 Key Parameters (Exact Reproduction of /docs/tela10.png with Enlarged Topic Illustration Images)
function renderScreen10(container) {
  const coords = UI_COORDINATES_MAP.s10 || INITIAL_UI_COORDINATES_MAP.s10;
  const pointerClass = (coords.bubble && coords.bubble.pointer) || 'pointer-left';

  const speech = t('s10_dialogue_mia', 'To set the correct spray volume, we need to adjust four key operational parameters.');
  const secTitle = t('s10_section_title', 'The 4 Key Parameters');
  const bodyText = t('s10_body_text', 'These four parameters work together to determine how much spray reaches the crop.');
  const infoText = t('s10_info_text', 'Changing one parameter affects the others and the final spray volume applied.');

  const p1 = t('s10_param_01', '1. Driving Speed (km/h)');
  const p2 = t('s10_param_02', '2. Spray Pressure (bar)');
  const p3 = t('s10_param_03', '3. Nozzle Size');
  const p4 = t('s10_param_04', '4. Number of Active Nozzles');

  const cleanParamTitle = (str) => str.replace(/^\d+[\.\s]*/, '');

  container.innerHTML = `
    <!-- Mia Speech Bubble Top Right pointing left at Mia (Holding 4 Fingers Up!) -->
    <div id="el-s10-bubble" class="speech-bubble ${pointerClass} designer-target" style="${styleObjToCss(coords.bubble || { top: '6%', right: '5%', width: '58%' })}">
      <div class="speaker-name" style="font-weight: 900; color: #1E4222; margin-bottom: 6px; font-size: 1.05rem;">MIA</div>
      <div class="speech-text" style="font-size: 1.02rem; line-height: 1.45; font-weight: 600; color: #1F2220;">
        ${speech}
      </div>
    </div>

    <!-- The 4 Key Parameters Translucent Cream Card -->
    <div id="el-s10-card" class="cream-card designer-target" style="${styleObjToCss(coords.card || { top: '26%', right: '5%', width: '58%' })}">
      
      <!-- Card Header -->
      <div class="cream-card-header" style="font-size: 1.35rem; font-weight: 900; color: #1E4222; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.02em; text-align: center;">
        ${secTitle}
      </div>
      
      <!-- Card Subtitle -->
      <div class="cream-card-body" style="font-size: 0.95rem; font-weight: 600; color: #333333; margin-bottom: 10px; text-align: center; line-height: 1.35;">
        ${bodyText}
      </div>

      <!-- Tip Warning Banner Box -->
      <div style="margin-bottom: 12px; padding: 8px 12px; background: rgba(235, 245, 235, 0.95); border-radius: 12px; border: 1.5px solid #2E7D32; display: flex; align-items: center; gap: 10px;">
        <div style="background: rgba(46, 125, 50, 0.15); padding: 6px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <i data-lucide="lightbulb" style="width: 22px; height: 22px; stroke: #2E7D32; stroke-width: 2.2;"></i>
        </div>
        <div style="font-size: 0.88rem; font-weight: 600; color: #1E4222; line-height: 1.35;">
          ${infoText}
        </div>
      </div>

      <!-- 2x2 Grid of 4 Key Parameters with ENLARGED Illustration Images -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        
        <!-- Parameter 1: Driving Speed (Green) -->
        <div style="background: rgba(245, 250, 245, 0.95); border: 2px solid #2E7D32; border-radius: 14px; padding: 10px 8px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #2E7D32; color: #FFFFFF; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">1</div>
          <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.92rem; color: #1E4222; text-transform: uppercase; line-height: 1.2; margin-bottom: 8px;">
            ${cleanParamTitle(p1)}
          </div>
          <img src="public/images/s10_param1_tractor.png" alt="Driving Speed Tractor" style="max-width: 100%; height: clamp(52px, calc(72px * var(--scale-factor, 1)), 85px); object-fit: contain;">
        </div>

        <!-- Parameter 2: Spray Pressure (Red) -->
        <div style="background: rgba(255, 245, 245, 0.95); border: 2px solid #C62828; border-radius: 14px; padding: 10px 8px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #C62828; color: #FFFFFF; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">2</div>
          <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.92rem; color: #C62828; text-transform: uppercase; line-height: 1.2; margin-bottom: 8px;">
            ${cleanParamTitle(p2)}
          </div>
          <img src="public/images/s10_param2_pressure.png" alt="Spray Pressure Gauge" style="max-width: 100%; height: clamp(52px, calc(72px * var(--scale-factor, 1)), 85px); object-fit: contain;">
        </div>

        <!-- Parameter 3: Nozzle Size (Blue) -->
        <div style="background: rgba(245, 248, 255, 0.95); border: 2px solid #1565C0; border-radius: 14px; padding: 10px 8px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #1565C0; color: #FFFFFF; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">3</div>
          <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.92rem; color: #1565C0; text-transform: uppercase; line-height: 1.2; margin-bottom: 8px;">
            ${cleanParamTitle(p3)}
          </div>
          <img src="public/images/s10_param3_nozzles.png" alt="Nozzle Size" style="max-width: 100%; height: clamp(52px, calc(72px * var(--scale-factor, 1)), 85px); object-fit: contain;">
        </div>

        <!-- Parameter 4: Number of Active Nozzles (Purple) -->
        <div style="background: rgba(252, 245, 255, 0.95); border: 2px solid #6A1B9A; border-radius: 14px; padding: 10px 8px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #6A1B9A; color: #FFFFFF; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">4</div>
          <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.86rem; color: #6A1B9A; text-transform: uppercase; line-height: 1.2; margin-bottom: 8px;">
            ${cleanParamTitle(p4)}
          </div>
          <img src="public/images/s10_param4_activenozzles.png" alt="Active Nozzles Sprayer" style="max-width: 100%; height: clamp(52px, calc(72px * var(--scale-factor, 1)), 85px); object-fit: contain;">
        </div>

      </div>

    </div>
  `;

  // Trigger Lucide SVG Rendering
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Master Configuration for Interactive Quizzes (Screens 11, 14, 17, 20)
const QUIZ_CONFIG_MAP = {
  11: {
    quizNum: 1,
    correctOption: 'C',
    correctSlide: 12,
    incorrectSlide: 13,
    titleKey: 's11_quiz_title',
    questionKey: 's11_quiz_question',
    options: [
      { key: 'A', textKey: 's11_quiz_option_a' },
      { key: 'B', textKey: 's11_quiz_option_b' },
      { key: 'C', textKey: 's11_quiz_option_c' },
      { key: 'D', textKey: 's11_quiz_option_d' }
    ]
  },
  14: {
    quizNum: 2,
    correctOption: 'D',
    correctSlide: 15,
    incorrectSlide: 16,
    titleKey: 's14_quiz_title',
    questionKey: 's14_quiz_question',
    options: [
      { key: 'A', textKey: 's14_quiz_option_a' },
      { key: 'B', textKey: 's14_quiz_option_b' },
      { key: 'C', textKey: 's14_quiz_option_c' },
      { key: 'D', textKey: 's14_quiz_option_d' }
    ]
  },
  17: {
    quizNum: 3,
    correctOption: 'B',
    correctSlide: 18,
    incorrectSlide: 19,
    titleKey: 's17_quiz_title',
    questionKey: 's17_quiz_question',
    options: [
      { key: 'A', textKey: 's17_quiz_option_a' },
      { key: 'B', textKey: 's17_quiz_option_b' },
      { key: 'C', textKey: 's17_quiz_option_c' },
      { key: 'D', textKey: 's17_quiz_option_d' }
    ]
  },
  20: {
    quizNum: 4,
    correctOption: 'A',
    correctSlide: 21,
    incorrectSlide: 22,
    titleKey: 's20_quiz_title',
    questionKey: 's20_quiz_question',
    options: [
      { key: 'A', textKey: 's20_quiz_option_a' },
      { key: 'B', textKey: 's20_quiz_option_b' },
      { key: 'C', textKey: 's20_quiz_option_c' },
      { key: 'D', textKey: 's20_quiz_option_d' }
    ]
  }
};

// Master Configuration for Quiz Feedback Screens (Screens 12, 13, 15, 16, 18, 19, 21, 22)
const QUIZ_FEEDBACK_MAP = {
  12: { isCorrect: true, quizNum: 1, statusKey: 's12_feedback_status', infoKey: 's12_info_text', optionKey: 's12_quiz_correct_option', nextSlide: 14 },
  13: { isCorrect: false, quizNum: 1, statusKey: 's13_feedback_status', infoKey: 's13_info_text', retrySlide: 11 },
  15: { isCorrect: true, quizNum: 2, statusKey: 's15_feedback_status', infoKey: 's15_info_text', optionKey: 's15_quiz_correct_d', nextSlide: 17 },
  16: { isCorrect: false, quizNum: 2, statusKey: 's16_feedback_status', infoKey: 's16_info_text', retrySlide: 14 },
  18: { isCorrect: true, quizNum: 3, statusKey: 's18_feedback_status', infoKey: 's18_info_text', optionKey: 's18_quiz_correct_b', nextSlide: 20 },
  19: { isCorrect: false, quizNum: 3, statusKey: 's19_feedback_status', infoKey: 's19_info_text', retrySlide: 17 },
  21: { isCorrect: true, quizNum: 4, statusKey: 's21_feedback_status', infoKey: 's21_info_text', optionKey: 's21_quiz_correct_a', nextSlide: 23 },
  22: { isCorrect: false, quizNum: 4, statusKey: 's22_feedback_status', infoKey: 's22_info_text', retrySlide: 20 }
};

// Render Interactive Quiz Question Screen (Screens 11, 14, 17, 20)
function renderQuizScreen(container, slideId) {
  const cfg = QUIZ_CONFIG_MAP[slideId];
  if (!cfg) return;

  const slideKey = 's' + String(slideId).padStart(2, '0');
  const coords = UI_COORDINATES_MAP[slideKey] || {
    card: { top: '8%', left: '5%', width: '90%' }
  };

  const titleText = t(cfg.titleKey, 'Calibration of a Sprayer');
  const questionText = t(cfg.questionKey, 'Quiz Question');
  const submitText = t('ui_confirm_answer', 'CONFIRMAR RESPOSTA');

  // Check if previously selected
  const previous = gameState.quizAnswers[slideId];
  let selectedOption = previous ? previous.selected : null;

  const cleanOptionText = (str) => str.replace(/^[A-D][\.\s]*/, '').trim();

  container.innerHTML = `
    <div id="el-${slideKey}-card" class="quiz-container designer-target" style="${styleObjToCss(coords.card || { top: '8%', left: '5%', width: '90%' })}">
      
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span class="quiz-category-badge">QUIZ #${cfg.quizNum}</span>
          <span style="font-family: 'Outfit', sans-serif; font-size: 0.8rem; font-weight: 700; color: #1E4222;">${titleText}</span>
        </div>

        <div class="quiz-question-title">${questionText}</div>

        <div class="quiz-options-list">
          ${cfg.options.map(opt => {
            const rawOptText = t(opt.textKey, opt.key);
            const isSel = selectedOption === opt.key;
            return `
              <div class="quiz-option-card ${isSel ? 'selected' : ''}" data-key="${opt.key}">
                <div class="quiz-option-badge">${opt.key}</div>
                <div class="quiz-option-text">${cleanOptionText(rawOptText)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div>
        <button id="btn-submit-quiz-${slideId}" class="btn-submit-answer" ${!selectedOption ? 'disabled' : ''}>
          <span>${submitText}</span>
          <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
        </button>
      </div>

    </div>
  `;

  // Bind option selection events
  const optionCards = container.querySelectorAll('.quiz-option-card');
  const submitBtn = document.getElementById(`btn-submit-quiz-${slideId}`);

  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      getAudioContext();
      optionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOption = card.getAttribute('data-key');
      if (submitBtn) submitBtn.disabled = false;
    });
  });

  // Bind submit button event
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!selectedOption) return;

      const isCorrect = selectedOption === cfg.correctOption;
      gameState.quizAnswers[slideId] = { selected: selectedOption, correct: isCorrect };
      saveProgress();

      if (isCorrect) {
        playSound('ding');
        goToSlide(cfg.correctSlide);
      } else {
        playSound('buzz');
        goToSlide(cfg.incorrectSlide);
      }
    });
  }

  // Trigger Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Render Quiz Feedback Screen (Correct / Incorrect - Screens 12, 13, 15, 16, 18, 19, 21, 22)
function renderQuizFeedbackScreen(container, slideId) {
  const fb = QUIZ_FEEDBACK_MAP[slideId];
  if (!fb) return;

  const slideKey = 's' + String(slideId).padStart(2, '0');
  const coords = UI_COORDINATES_MAP[slideKey] || {
    card: { top: '15%', left: '6%', width: '88%' }
  };

  const statusText = t(fb.statusKey, fb.isCorrect ? 'Correto' : 'Incorreto');
  const infoText = t(fb.infoKey, '');
  const optionText = fb.optionKey ? t(fb.optionKey, '') : '';

  const continueText = t('ui_next', 'SEGUINTE');
  const retryText = t('ui_retry', 'TENTAR NOVAMENTE');

  if (fb.isCorrect) {
    container.innerHTML = `
      <div id="el-${slideKey}-card" class="feedback-card-correct designer-target" style="${styleObjToCss(coords.card || { top: '15%', left: '6%', width: '88%' })}">
        <div class="feedback-badge-correct">
          <i data-lucide="check-circle" style="width: 24px; height: 24px;"></i>
          <span>${statusText}!</span>
        </div>

        ${optionText ? `
          <div style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.05rem; color: #1E4222; margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.85); border-radius: 12px; border-left: 4px solid #2E7D32;">
            ${optionText}
          </div>
        ` : ''}

        <div class="feedback-explanation">
          ${infoText}
        </div>

        <button id="btn-feedback-action" class="btn-start-challenge-pill" style="margin-top: 14px; font-size: 1.1rem; padding: 10px 24px;">
          ${continueText} ▶
        </button>
      </div>
    `;

    document.getElementById('btn-feedback-action')?.addEventListener('click', () => {
      goToSlide(fb.nextSlide);
    });
  } else {
    container.innerHTML = `
      <div id="el-${slideKey}-card" class="feedback-card-incorrect designer-target" style="${styleObjToCss(coords.card || { top: '15%', left: '6%', width: '88%' })}">
        <div class="feedback-badge-incorrect">
          <i data-lucide="x-circle" style="width: 24px; height: 24px;"></i>
          <span>${statusText}</span>
        </div>

        <div class="feedback-explanation" style="border-left: 4px solid #C62828;">
          ${infoText}
        </div>

        <button id="btn-feedback-action" class="btn-start-challenge-pill" style="margin-top: 14px; font-size: 1.1rem; padding: 10px 24px; background: linear-gradient(180deg, #D32F2F 0%, #B71C1C 100%);">
          🔄 ${retryText}
        </button>
      </div>
    `;

    document.getElementById('btn-feedback-action')?.addEventListener('click', () => {
      goToSlide(fb.retrySlide);
    });
  }

  // Trigger Lucide Icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Generic Screen Placeholder for slides > 10
function renderGenericScreenPlaceholder(container, slideId) {
  const screenWord = t('ui_screen', 'Screen');
  const ofWord = t('ui_of', 'of');
  const title = t(`s${String(slideId).padStart(2, '0')}_chapter_title`, 'Calibration Challenge');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s${slideId}-generic" style="position: absolute; top: 20%; left: 10%; width: 80%; text-align: center;">
      <div class="cream-card-header">${title}</div>
      <div class="cream-card-body" style="margin-top: 10px;">
        ${screenWord} ${slideId} ${ofWord} ${gameState.totalSlides}
      </div>
    </div>
  `;
}

// Smart Best Fit Algorithm: Refines CURRENT element position to clean, centered, safe layout with Font Scaling
function applySmartBestFit(container, slideId) {
  const targets = container.querySelectorAll('.designer-target');
  const parentRect = container.getBoundingClientRect();
  const slideKey = 's' + String(slideId).padStart(2, '0');

  if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};

  targets.forEach(el => {
    const rect = el.getBoundingClientRect();
    let curTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
    let curLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
    let curWidth = (rect.width / parentRect.width) * 100;

    // 1. Safe Margin Check (keep within 4% - 96%)
    if (curLeft < 4) curLeft = 4;
    if (curLeft + curWidth > 96) curLeft = Math.max(4, 96 - curWidth);

    // 2. Horizontal Centering Check (If element is near center, snap to perfect center)
    const elementCenterX = curLeft + (curWidth / 2);
    if (elementCenterX > 40 && elementCenterX < 60) {
      curLeft = (100 - curWidth) / 2;
    }

    // 3. Round to clean 1-decimal percentage
    const refinedTop = (Math.round(curTop * 2) / 2).toFixed(1) + '%';
    const refinedLeft = (Math.round(curLeft * 2) / 2).toFixed(1) + '%';
    const refinedWidth = (Math.round(curWidth * 2) / 2).toFixed(1) + '%';
    const refinedFontSize = '1.05rem';

    // Apply smoothly
    el.style.transition = 'all 0.25s ease';
    el.style.top = refinedTop;
    el.style.left = refinedLeft;
    el.style.right = 'auto';
    el.style.width = refinedWidth;
    el.style.fontSize = refinedFontSize;

    el.querySelectorAll('.cream-card-body, .speech-text, p, span, div, .s01-subtitle-text, .s02-body-p, .stepper-label, .attr-text').forEach(child => {
      child.style.fontSize = refinedFontSize;
    });

    setTimeout(() => el.style.transition = '', 300);

    const elKey = el.id.replace(`el-${slideKey}-`, '');
    if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
    UI_COORDINATES_MAP[slideKey][elKey].top = refinedTop;
    UI_COORDINATES_MAP[slideKey][elKey].left = refinedLeft;
    UI_COORDINATES_MAP[slideKey][elKey].width = refinedWidth;
    UI_COORDINATES_MAP[slideKey][elKey].fontSize = refinedFontSize;
  });

  localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));

  // Sync with local server file
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    fetch('/api/sync-coords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UI_COORDINATES_MAP)
    }).catch(e => console.error('Sync error:', e));
  }
}

// Display Toast Notification for Designer Mode Actions
function showDesignerToast(message, type = 'success') {
  let toast = document.getElementById('designer-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'designer-toast-notification';
    toast.style.cssText = `
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 18px;
      background: #1E4222;
      color: #FFFFFF;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      border-radius: 30px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.35);
      z-index: 10000;
      border: 2px solid #FFCC66;
      transition: all 0.3s ease;
      text-align: center;
      max-width: 90%;
      pointer-events: none;
    `;
    document.getElementById('game-container').appendChild(toast);
  }

  if (type === 'success') {
    toast.style.background = '#1E4222';
    toast.style.borderColor = '#FFCC66';
  } else if (type === 'warning') {
    toast.style.background = '#C62828';
    toast.style.borderColor = '#FFFFFF';
  }

  toast.innerHTML = message;
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3800);
}

// Setup Interactive Designer Mode Controls (Drag, Arrow Keys, Tail Pointer, Real-time Font Sizes, Auto-Balance, Save & Fixed Reset)
function setupDesignerModeControls(container, slideId) {
  const targets = container.querySelectorAll('.designer-target');
  if (targets.length === 0) return;

  const slideKey = 's' + String(slideId).padStart(2, '0');

  // Add floating designer toolbar
  let toolbar = document.getElementById('designer-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.id = 'designer-toolbar';
    toolbar.className = 'designer-toolbar';
    document.getElementById('game-container').appendChild(toolbar);
  }

  function updateToolbar(activeEl) {
    const elInfo = activeEl ? activeEl.id : 'Clique em qualquer elemento';
    const isBubble = activeEl && activeEl.classList.contains('speech-bubble');

    toolbar.innerHTML = `
      <div class="designer-toolbar-row">
        <span><strong>${slideKey.toUpperCase()}</strong>: <em>${elInfo}</em></span>
        <span style="font-size:0.7rem; color:#FFCC66;">Arrastar / Setas do Teclado</span>
      </div>

      ${isBubble ? `
        <div class="designer-toolbar-row">
          <span>Seta de Fala:</span>
          <div class="designer-btn-group">
            <button class="designer-btn ${activeEl.classList.contains('pointer-left') ? 'active' : ''}" id="btn-tail-left">👈 Esquerda</button>
            <button class="designer-btn ${activeEl.classList.contains('pointer-right') ? 'active' : ''}" id="btn-tail-right">👉 Direita</button>
            <button class="designer-btn ${activeEl.classList.contains('pointer-top') ? 'active' : ''}" id="btn-tail-top">☝️ Topo</button>
            <button class="designer-btn ${activeEl.classList.contains('pointer-bottom') ? 'active' : ''}" id="btn-tail-bottom">👇 Baixo</button>
            <button class="designer-btn ${!activeEl.className.includes('pointer-') ? 'active' : ''}" id="btn-tail-none">🚫 Nenhuma</button>
          </div>
        </div>
      ` : ''}

      <div class="designer-toolbar-row">
        <div class="designer-btn-group">
          <span>Largura:</span>
          <button class="designer-btn" id="btn-width-minus">-</button>
          <button class="designer-btn" id="btn-width-plus">+</button>

          <span style="margin-left:6px;">Fonte:</span>
          <button class="designer-btn" id="btn-font-minus">A-</button>
          <button class="designer-btn" id="btn-font-plus">A+</button>
        </div>

        <div class="designer-btn-group">
          <button id="btn-best-fit" class="designer-btn designer-btn-success">✨ Auto-Ajustar</button>
          <button id="btn-save-coords" class="designer-btn designer-btn-primary">💾 Save</button>
          <button id="btn-reset-coords" class="designer-btn designer-btn-danger" title="Resetar posição desta tela para os padrões">🔄 Reset</button>
        </div>
      </div>
    `;

    // Bind Tail Pointer Controls
    if (isBubble) {
      const setTail = (tailClass) => {
        activeEl.classList.remove('pointer-left', 'pointer-right', 'pointer-top', 'pointer-bottom');
        if (tailClass) activeEl.classList.add(tailClass);

        const elKey = activeEl.id.replace(`el-${slideKey}-`, '');
        if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};
        if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
        UI_COORDINATES_MAP[slideKey][elKey].pointer = tailClass || 'pointer-none';
        localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));
        
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          fetch('/api/sync-coords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UI_COORDINATES_MAP)
          }).catch(e => console.error('Sync error:', e));
        }

        updateToolbar(activeEl);
      };

      document.getElementById('btn-tail-left')?.addEventListener('click', () => setTail('pointer-left'));
      document.getElementById('btn-tail-right')?.addEventListener('click', () => setTail('pointer-right'));
      document.getElementById('btn-tail-top')?.addEventListener('click', () => setTail('pointer-top'));
      document.getElementById('btn-tail-bottom')?.addEventListener('click', () => setTail('pointer-bottom'));
      document.getElementById('btn-tail-none')?.addEventListener('click', () => setTail(''));
    }

    // Bind Width & Real-Time Font Size Adjustments
    document.getElementById('btn-width-minus')?.addEventListener('click', () => adjustWidth(activeEl, -2));
    document.getElementById('btn-width-plus')?.addEventListener('click', () => adjustWidth(activeEl, 2));

    document.getElementById('btn-font-minus')?.addEventListener('click', () => adjustFontSize(activeEl, -0.06));
    document.getElementById('btn-font-plus')?.addEventListener('click', () => adjustFontSize(activeEl, 0.06));

    // Bind Best Fit Button
    document.getElementById('btn-best-fit')?.addEventListener('click', () => {
      applySmartBestFit(container, slideId);
      updateToolbar(gameState.selectedDesignerElement);
      showDesignerToast('✨ Posições alinhadas automaticamente!', 'success');
    });

    // Bind 1-Click Save Button with Instant Server Write & Automatic Git Commit / Push
    const saveBtn = document.getElementById('btn-save-coords');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        saveBtn.innerText = '⏳ Guardando...';
        saveBtn.disabled = true;

        localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          fetch('/api/save-coordinates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UI_COORDINATES_MAP)
          })
          .then(res => res.json())
          .then(data => {
            saveBtn.innerText = '✅ Guardado!';
            setTimeout(() => {
              saveBtn.innerText = '💾 Save';
              saveBtn.disabled = false;
            }, 2000);

            if (data.pushed) {
              showDesignerToast('✅ Posições guardadas em app.js e enviadas para o GitHub com sucesso!', 'success');
            } else {
              showDesignerToast('✅ Posições guardadas com sucesso no ficheiro app.js!', 'success');
            }
          })
          .catch(err => {
            console.error('Save error:', err);
            saveBtn.innerText = '💾 Save';
            saveBtn.disabled = false;
            showDesignerToast('⚠️ Guardado localmente no navegador', 'warning');
          });
        } else {
          saveBtn.innerText = '💾 Save';
          saveBtn.disabled = false;
          showDesignerToast('⚠️ Modo Localhost necessário para atualizar o GitHub', 'warning');
        }
      });
    }

    // Bind Fixed Reset Button
    document.getElementById('btn-reset-coords')?.addEventListener('click', () => {
      if (INITIAL_UI_COORDINATES_MAP[slideKey]) {
        UI_COORDINATES_MAP[slideKey] = JSON.parse(JSON.stringify(INITIAL_UI_COORDINATES_MAP[slideKey]));
      }
      const savedCoords = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_COORDS) || '{}');
      delete savedCoords[slideKey];
      localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(savedCoords));
      
      showDesignerToast('🔄 Posições restauradas para o padrão inicial', 'info');
      renderCurrentSlide();
    });
  }

  function adjustWidth(activeEl, delta) {
    if (!activeEl) return;
    const parentRect = container.getBoundingClientRect();
    const rect = activeEl.getBoundingClientRect();
    let curWidth = (rect.width / parentRect.width) * 100;
    curWidth = Math.max(30, Math.min(96, curWidth + delta)).toFixed(1);

    activeEl.style.width = curWidth + '%';

    const elKey = activeEl.id.replace(`el-${slideKey}-`, '');
    if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};
    if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
    UI_COORDINATES_MAP[slideKey][elKey].width = curWidth + '%';
    localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      fetch('/api/sync-coords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UI_COORDINATES_MAP)
      }).catch(e => console.error('Sync error:', e));
    }

    updateToolbar(activeEl);
  }

  function adjustFontSize(activeEl, delta) {
    if (!activeEl) return;
    const currentSize = parseFloat(window.getComputedStyle(activeEl).fontSize) || 16;
    const newRem = Math.max(0.7, Math.min(1.8, (currentSize / 16) + delta)).toFixed(2) + 'rem';

    // Apply directly in real-time to active element AND its text children
    activeEl.style.fontSize = newRem;
    activeEl.querySelectorAll('.cream-card-body, .speech-text, p, span, div, .s01-subtitle-text, .s02-body-p, .stepper-label, .attr-text').forEach(child => {
      child.style.fontSize = newRem;
    });

    const elKey = activeEl.id.replace(`el-${slideKey}-`, '');
    if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};
    if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
    UI_COORDINATES_MAP[slideKey][elKey].fontSize = newRem;
    localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      fetch('/api/sync-coords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UI_COORDINATES_MAP)
      }).catch(e => console.error('Sync error:', e));
    }

    updateToolbar(activeEl);
  }

  updateToolbar(gameState.selectedDesignerElement);

  targets.forEach(el => {
    el.classList.add('designer-element-active');

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      targets.forEach(t => t.style.outline = '2px dashed #FFCC66');
      el.style.outline = '3px solid #2E7D32';
      gameState.selectedDesignerElement = el;
      updateToolbar(el);
    });

    let isDragging = false;
    let startX, startY, startTop, startLeft;

    el.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = el.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();

      startTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
      startLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;

      targets.forEach(t => t.style.outline = '2px dashed #FFCC66');
      el.style.outline = '3px solid #2E7D32';
      gameState.selectedDesignerElement = el;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || gameState.selectedDesignerElement !== el) return;
      const parentRect = container.getBoundingClientRect();
      const deltaX = ((e.clientX - startX) / parentRect.width) * 100;
      const deltaY = ((e.clientY - startY) / parentRect.height) * 100;

      const newTop = Math.max(0, Math.min(90, (startTop + deltaY))).toFixed(1) + '%';
      const newLeft = Math.max(0, Math.min(90, (startLeft + deltaX))).toFixed(1) + '%';

      el.style.top = newTop;
      el.style.left = newLeft;
      el.style.right = 'auto';

      if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};
      const elKey = el.id.replace(`el-${slideKey}-`, '');
      if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
      UI_COORDINATES_MAP[slideKey][elKey].top = newTop;
      UI_COORDINATES_MAP[slideKey][elKey].left = newLeft;
      UI_COORDINATES_MAP[slideKey][elKey].width = el.style.width || '54%';

      localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));
      updateToolbar(el);
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          fetch('/api/sync-coords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UI_COORDINATES_MAP)
          }).catch(e => console.error('Sync error:', e));
        }
      }
      isDragging = false;
    });
  });

  // Global Arrow Key Nudge Handler
  window.onkeydown = (e) => {
    if (!gameState.designerMode || !gameState.selectedDesignerElement) return;
    const el = gameState.selectedDesignerElement;
    const parentRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    let curTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
    let curLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;

    const step = e.shiftKey ? 2.0 : 0.5;

    if (e.key === 'ArrowUp') curTop -= step;
    else if (e.key === 'ArrowDown') curTop += step;
    else if (e.key === 'ArrowLeft') curLeft -= step;
    else if (e.key === 'ArrowRight') curRight += step;
    else return;

    e.preventDefault();
    const newTop = curTop.toFixed(1) + '%';
    const newLeft = curLeft.toFixed(1) + '%';

    el.style.top = newTop;
    el.style.left = newLeft;
    el.style.right = 'auto';

    if (!UI_COORDINATES_MAP[slideKey]) UI_COORDINATES_MAP[slideKey] = {};
    const elKey = el.id.replace(`el-${slideKey}-`, '');
    if (!UI_COORDINATES_MAP[slideKey][elKey]) UI_COORDINATES_MAP[slideKey][elKey] = {};
    UI_COORDINATES_MAP[slideKey][elKey].top = newTop;
    UI_COORDINATES_MAP[slideKey][elKey].left = newLeft;

    localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(UI_COORDINATES_MAP));

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      fetch('/api/sync-coords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UI_COORDINATES_MAP)
      }).catch(e => console.error('Sync error:', e));
    }

    updateToolbar(el);
  };
}

// Render Integrated Elegant Bottom Navigation Bar (Hide NEXT/BACK on Screen 1)
function renderBottomNavBar() {
  const navContainer = document.getElementById('bottom-nav');
  const slideId = gameState.currentSlide;

  const isScreen1 = slideId === 1;
  const isBackDisabled = slideId <= 1;

  // Lock NEXT button on Quiz screens until answered
  const isQuizScreen = Boolean(QUIZ_CONFIG_MAP[slideId]);
  const isQuizUnanswered = isQuizScreen && !gameState.quizAnswers[slideId];
  const isNextDisabled = slideId >= gameState.totalSlides || isQuizUnanswered;

  const backLabel = t('ui_back', 'BACK');
  const nextLabel = t('ui_next', 'NEXT');
  const screenLabel = t('ui_screen', 'Screen');
  const ofLabel = t('ui_of', 'of');

  const chapterTitle = t(`s${String(slideId).padStart(2, '0')}_chapter_title`, 'Calibration Challenge');

  navContainer.innerHTML = `
    <div style="min-width: 110px;">
      ${!isScreen1 ? `
        <button id="nav-back" class="nav-btn" ${isBackDisabled ? 'disabled' : ''}>
          ◀ ${backLabel}
        </button>
      ` : ''}
    </div>

    <div class="nav-center-info">
      <span class="screen-counter">${screenLabel} ${slideId} ${ofLabel} ${gameState.totalSlides}</span>
      <span class="nav-breadcrumbs">${chapterTitle}</span>
    </div>

    <div style="display: flex; align-items: center; gap: 10px; min-width: 110px; justify-content: flex-end;">
      <button id="nav-mute" class="btn-sound-toggle" title="Sound">
        ${gameState.audioMuted ? '🔇' : '🔊'}
      </button>

      ${!isScreen1 ? `
        <button id="nav-next" class="nav-btn" ${isNextDisabled ? 'disabled' : ''}>
          ${nextLabel} ▶
        </button>
      ` : ''}
    </div>
  `;

  const backBtn = document.getElementById('nav-back');
  const nextBtn = document.getElementById('nav-next');
  const muteBtn = document.getElementById('nav-mute');

  if (backBtn && !isBackDisabled && !isScreen1) {
    backBtn.addEventListener('click', () => goToSlide(gameState.currentSlide - 1));
  }

  if (nextBtn && !isNextDisabled && !isScreen1) {
    nextBtn.addEventListener('click', () => goToSlide(gameState.currentSlide + 1));
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      gameState.audioMuted = !gameState.audioMuted;
      localStorage.setItem(STORAGE_KEY_MUTE, String(gameState.audioMuted));
      renderBottomNavBar();
    });
  }
}

// Calculate Responsive Scale Factor dynamically for smartphones, tablets & laptops
function updateResponsiveScale() {
  const container = document.getElementById('game-container');
  if (!container) return;
  
  // Calculate viewport height (1vh workaround for mobile browsers)
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--real-vh', `${vh}px`);

  const width = container.clientWidth;
  // Reference target width is 420px (standard 9:16 vertical viewport)
  const scale = Math.min(1.25, Math.max(0.68, width / 420));
  container.style.setProperty('--scale-factor', scale.toFixed(3));
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  updateResponsiveScale();
  window.addEventListener('resize', updateResponsiveScale);
  window.addEventListener('orientationchange', updateResponsiveScale);

  preloadBackdropImages();
  loadCustomCoordinates();
  renderTopBar();
  const hasSession = checkSessionRecovery();
  if (!hasSession) {
    await loadTranslations(gameState.activeLanguage);
  }
});
