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
      "fontSize": "1.41rem"
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
      "left": "6.0%",
      "width": "54.0%",
      "fontSize": "1.05rem"
    },
    "attributesCard": {
      "top": "76.0%",
      "left": "4.0%",
      "width": "92.0%",
      "fontSize": "1.05rem"
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
  },
  "s23": {
    "miaBubble": {
      "top": "15.0%",
      "left": "8.0%",
      "width": "44.0%",
      "pointer": "pointer-left"
    },
    "lauraBubble": {
      "top": "48.0%",
      "left": "48.0%",
      "width": "44.0%",
      "pointer": "pointer-right"
    },
    "legalCard": {
      "top": "78.0%",
      "left": "50.0%",
      "transform": "translateX(-50%)",
      "width": "84.0%"
    }
  },
  "s36": {
    "card": {
      "top": "18.0%",
      "left": "6.0%",
      "width": "88.0%"
    }
  },
  "s37": {
    "card": {
      "top": "10.0%",
      "left": "5.0%",
      "width": "90.0%"
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

// Helper to resolve backend server URL (Port 3000) dynamically if frontend runs on another port
function getBackendUrl() {
  const backendPort = '3000';
  return window.location.port === backendPort ? '' : `http://localhost:${backendPort}`;
}

// Save custom designer coordinates to localStorage and sync with local Node server
function saveCustomCoordinatesLocally(coordsMap = UI_COORDINATES_MAP, endpoint = '/api/sync-coords', showToast = false) {
  localStorage.setItem(STORAGE_KEY_CUSTOM_COORDS, JSON.stringify(coordsMap));
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const backendUrl = getBackendUrl();
    return fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coordsMap)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (showToast) showDesignerToast('✓ Coordenadas guardadas e sincronizadas com app.js!', 'success');
      } else {
        if (showToast) showDesignerToast('⚠️ Erro ao sincronizar com app.js no servidor local.', 'warning');
      }
      return data;
    })
    .catch(e => {
      console.error('Sync error:', e);
      if (showToast) showDesignerToast('⚠️ Servidor local na porta 3000 indisponível para gravação.', 'warning');
      return { success: false, error: e.message };
    });
  }
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

      saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);
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

// Web Audio API Central Context & Safe Initialization Engine
let audioCtx = null;

function initAudioEngine() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    const unlockAudio = () => {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
        }).catch(() => {});
      } else {
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      }
    };

    audioCtx.resume().then(() => {
      if (audioCtx.state !== 'suspended') {
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      }
    }).catch(() => {});

    document.addEventListener('click', unlockAudio, { passive: true });
    document.addEventListener('touchstart', unlockAudio, { passive: true });
  }

  return audioCtx;
}

// Aliased for backward compatibility
function getAudioContext() {
  return initAudioEngine();
}

// Procedural Offline Synthesizer for Quiz Feedback Sounds
function playFeedbackSound(type) {
  if (gameState.audioMuted) return;
  const ctx = initAudioEngine();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  if (type === 'correct' || type === 'ding') {
    // "Ding" agudo e brilhante: oscilador sine a 880Hz (Lá5), ganho 0.3 -> 0.01 em 0.15s
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === 'incorrect' || type === 'buzz') {
    // "Buzz" grave e áspero: oscilador sawtooth a 110Hz (Lá2), ganho 0.4 -> 0.01 em 0.3s
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// Backward compatibility helper
function playSound(type) {
  playFeedbackSound(type);
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

  document.getElementById('btn-resume-session').addEventListener('click', async () => {
    gameState.currentSlide = savedData.slide;
    gameState.maxUnlockedSlide = savedData.maxUnlocked || savedData.slide;
    gameState.quizAnswers = savedData.answers || {};
    if (savedData.lang) gameState.activeLanguage = savedData.lang;
    container.innerHTML = '';
    await loadTranslations(gameState.activeLanguage);
    renderCurrentSlide();
  });

  document.getElementById('btn-restart-session').addEventListener('click', async () => {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    container.innerHTML = '';
    gameState.currentSlide = 1;
    await loadTranslations(gameState.activeLanguage);
    renderCurrentSlide();
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
  const cssStyles = [];
  const isAbsolute = styleObj.top !== undefined || styleObj.left !== undefined || styleObj.right !== undefined;

  Object.entries(styleObj).forEach(([k, v]) => {
    if (k === 'pointer') return; // Ignora o ponteiro visual da cauda do balão no CSS inline
    const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
    cssStyles.push(`${cssKey}:${v}`);
  });

  if (isAbsolute) {
    cssStyles.push('position:absolute');
  } else {
    cssStyles.push('position:relative', 'margin-left:auto', 'margin-right:auto');
  }

  return cssStyles.join(';');
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
  else if (slideId === 23) renderScreen23(overlayContainer);
  else if (slideId === 24) renderScreen24(overlayContainer);
  else if (slideId === 25) renderScreen25(overlayContainer);
  else if (slideId === 26) renderScreen26(overlayContainer);
  else if (slideId === 27) renderScreen27(overlayContainer);
  else if (slideId === 28) renderScreen28(overlayContainer);
  else if (slideId === 29) renderScreen29(overlayContainer);
  else if (slideId === 36) renderScreen36(overlayContainer);
  else if (slideId === 37) renderScreen37(overlayContainer);
  else if (slideId === 38) renderScreen38(overlayContainer);
  else if (slideId === 42) renderScreen42(overlayContainer);
  else if (slideId === 46) renderScreen46(overlayContainer);
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

  const startBtn = document.getElementById('btn-start-game');
  if (startBtn) {
    const handleStart = () => {
      initAudioEngine();
      goToSlide(2);
    };
    startBtn.addEventListener('click', handleStart);
    startBtn.addEventListener('touchstart', handleStart, { passive: true });
  }
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
  },
  30: {
    quizNum: 5,
    correctOption: 'A',
    correctSlide: 31,
    incorrectSlide: 32,
    titleKey: 's30_quiz_title',
    questionKey: 's30_quiz_question',
    options: [
      { key: 'A', textKey: 's30_quiz_option_a' },
      { key: 'B', textKey: 's30_quiz_option_b' },
      { key: 'C', textKey: 's30_quiz_option_c' },
      { key: 'D', textKey: 's30_quiz_option_d' }
    ]
  },
  33: {
    quizNum: 6,
    correctOption: 'A',
    correctSlide: 34,
    incorrectSlide: 35,
    titleKey: 's33_quiz_title',
    questionKey: 's33_quiz_question',
    options: [
      { key: 'A', textKey: 's33_quiz_option_a' },
      { key: 'B', textKey: 's33_quiz_option_b' },
      { key: 'C', textKey: 's33_quiz_option_c' },
      { key: 'D', textKey: 's33_quiz_option_d' }
    ]
  },
  39: {
    quizNum: 7,
    correctOption: ['A', 'B', 'C'],
    correctSlide: 40,
    incorrectSlide: 41,
    titleKey: 's39_quiz_title',
    questionKey: 's39_quiz_question',
    options: [
      { key: 'A', textKey: 's39_quiz_option_a' },
      { key: 'B', textKey: 's39_quiz_option_b' },
      { key: 'C', textKey: 's39_quiz_option_c' },
      { key: 'D', textKey: 's39_quiz_option_d' }
    ]
  },
  43: {
    quizNum: 8,
    correctOption: 'A',
    correctSlide: 44,
    incorrectSlide: 45,
    titleKey: 's43_quiz_title',
    questionKey: 's43_quiz_question',
    options: [
      { key: 'A', textKey: 's43_quiz_option_a' },
      { key: 'B', textKey: 's43_quiz_option_b' },
      { key: 'C', textKey: 's43_quiz_option_c' },
      { key: 'D', textKey: 's43_quiz_option_d' }
    ]
  }
};

// Master Configuration for Quiz Feedback Screens (Screens 12, 13, 15, 16, 18, 19, 21, 22, 31, 32, 34, 35, 40, 41, 44, 45, 47, 48)
const QUIZ_FEEDBACK_MAP = {
  12: { isCorrect: true, quizNum: 1, statusKey: 's12_feedback_status', infoKey: 's12_info_text', optionKey: 's12_quiz_correct_option', nextSlide: 14 },
  13: { isCorrect: false, quizNum: 1, statusKey: 's13_feedback_status', infoKey: 's13_info_text', retrySlide: 11 },
  15: { isCorrect: true, quizNum: 2, statusKey: 's15_feedback_status', infoKey: 's15_info_text', optionKey: 's15_quiz_correct_d', nextSlide: 17 },
  16: { isCorrect: false, quizNum: 2, statusKey: 's16_feedback_status', infoKey: 's16_info_text', retrySlide: 14 },
  18: { isCorrect: true, quizNum: 3, statusKey: 's18_feedback_status', infoKey: 's18_info_text', optionKey: 's18_quiz_correct_b', nextSlide: 20 },
  19: { isCorrect: false, quizNum: 3, statusKey: 's19_feedback_status', infoKey: 's19_info_text', retrySlide: 17 },
  21: { isCorrect: true, quizNum: 4, statusKey: 's21_feedback_status', infoKey: 's21_info_text', optionKey: 's21_quiz_correct_a', nextSlide: 23 },
  22: { isCorrect: false, quizNum: 4, statusKey: 's22_feedback_status', infoKey: 's22_info_text', retrySlide: 20 },
  31: { isCorrect: true, quizNum: 5, statusKey: 's31_feedback_status', infoKey: 's31_info_text', optionKey: 's31_quiz_correct_a', nextSlide: 33 },
  32: { isCorrect: false, quizNum: 5, statusKey: 's32_feedback_status', infoKey: 's32_info_text', retrySlide: 30 },
  34: { isCorrect: true, quizNum: 6, statusKey: 's34_feedback_status', infoKey: 's34_info_text', optionKey: 's34_quiz_correct_a', nextSlide: 36 },
  35: { isCorrect: false, quizNum: 6, statusKey: 's35_feedback_status', infoKey: 's35_info_text', retrySlide: 33 },
  40: { isCorrect: true, quizNum: 7, statusKey: 's40_feedback_status', infoKey: 's40_info_text', optionKey: 's40_quiz_correct_a', nextSlide: 42 },
  41: { isCorrect: false, quizNum: 7, statusKey: 's41_feedback_status', infoKey: 's41_info_text', retrySlide: 39 },
  44: { isCorrect: true, quizNum: 8, statusKey: 's44_feedback_status', infoKey: 's44_info_text', optionKey: 's44_quiz_correct_a', nextSlide: 46 },
  45: { isCorrect: false, quizNum: 8, statusKey: 's45_feedback_status', infoKey: 's45_info_text', retrySlide: 43 },
  47: { isCorrect: true, quizNum: 9, statusKey: 's47_feedback_status', infoKey: 's47_info_text', optionKey: 's47_quiz_correct_a', nextSlide: 49 },
  48: { isCorrect: false, quizNum: 9, statusKey: 's48_feedback_status', infoKey: 's48_info_text', retrySlide: 46 }
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
    const handleSelect = () => {
      initAudioEngine();
      optionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedOption = card.getAttribute('data-key');
      if (submitBtn) submitBtn.disabled = false;
    };
    card.addEventListener('click', handleSelect);
  });

  // Bind submit button event
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!selectedOption) return;

      const isCorrect = Array.isArray(cfg.correctOption) ? cfg.correctOption.includes(selectedOption) : selectedOption === cfg.correctOption;
      gameState.quizAnswers[slideId] = { selected: selectedOption, correct: isCorrect };
      saveProgress();

      if (isCorrect) {
        playFeedbackSound('correct');
        goToSlide(cfg.correctSlide);
      } else {
        playFeedbackSound('incorrect');
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

// Screen 23: Narrative Reconciliation (Mia & Laura Dialogue in Vineyard with Legal Alert)
function renderScreen23(container) {
  const coords = UI_COORDINATES_MAP.s23 || INITIAL_UI_COORDINATES_MAP.s23 || {
    miaBubble: { top: '15%', left: '8%', width: '44%' },
    lauraBubble: { top: '48%', left: '48%', width: '44%' },
    legalCard: { top: '78%', left: '50%', transform: 'translateX(-50%)', width: '84%' }
  };

  const miaPointer = 'bubble-tail-left';
  const lauraPointer = 'bubble-tail-right';

  const miaTitle = t('s23_dialogue_title_mia', 'A calibração não é apenas uma boa prática - é um requisito legal.');
  const miaText = t('s23_dialogue_text_mia', 'Surge da regulamentação nacional e é essencial para uma proteção fitossanitária segura e responsável.');
  
  const lauraText = t('s23_dialogue_text_laura', t('s23_body_text_laura', 'Estou pronta! Vamos calibrar a velocidade, a pressão e selecionar os bicos corretos.'));

  const legalTitle = t('s23_section_title', 'É a lei');
  const legalBody = t('s23_body_text', 'Calibre sempre o seu pulverizador de acordo com as regulamentações nacionais.');

  container.innerHTML = `
    <!-- Mia Speech Bubble (Top Left) -->
    <div id="el-s23-miaBubble" class="speech-bubble ${miaPointer} designer-target" style="${styleObjToCss(coords.miaBubble || { top: '15%', left: '8%', width: '44%' })}">
      <span class="speaker-name">MIA</span>
      <div style="font-family: var(--font-header); font-weight: 800; font-size: clamp(0.74rem, calc(0.85rem * var(--scale-factor, 1)), 0.98rem); color: var(--forest-green); margin: 4px 0 6px 0; line-height: 1.25;">
        ${miaTitle}
      </div>
      <div class="speech-text">
        ${miaText}
      </div>
    </div>

    <!-- Laura Speech Bubble (Middle Right) -->
    <div id="el-s23-lauraBubble" class="speech-bubble ${lauraPointer} designer-target" style="${styleObjToCss(coords.lauraBubble || { top: '48%', left: '48%', width: '44%' })}">
      <span class="speaker-name" style="background: var(--forest-green-light);">LAURA</span>
      <div class="speech-text" style="margin-top: 4px;">
        ${lauraText}
      </div>
    </div>

    <!-- Legal Alert Card (Bottom Central) -->
    <div id="el-s23-legalCard" class="cream-card designer-target" style="${styleObjToCss(coords.legalCard || { top: '78%', left: '50%', transform: 'translateX(-50%)', width: '84%' })}">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="scale" style="width: 20px; height: 20px; color: var(--forest-green);"></i>
        <span>${legalTitle}</span>
      </div>
      <div class="cream-card-body" style="font-weight: 700; text-align: center; color: var(--text-dark); margin-top: 6px;">
        ${legalBody}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 24: Module 2 Intro - Setting the Task & Sprayer Inspection
function renderScreen24(container) {
  const title = t('s24_title', 'MÓDULO 2: DEFINIÇÃO DA TAREFA E INSPEÇÃO DO PULVERIZADOR');
  const body = t('s24_body', 'Neste módulo, ajudamos a Laura a definir os parâmetros práticos de trabalho: velocidade do trator, débito pretendido e a escolha correta dos bicos de pulverização.');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s24-card" style="position: absolute; top: 20%; left: 6%; width: 88%;">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="wrench" style="width: 22px; height: 22px; color: var(--forest-green);"></i>
        <span>${title}</span>
      </div>
      <div class="cream-card-body" style="margin-top: 12px; font-weight: 600; line-height: 1.45; text-align: center;">
        ${body}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 25: Speed Verification Setup
function renderScreen25(container) {
  const title = t('s25_title', 'VERIFICAÇÃO DA VELOCIDADE DE AVANÇO');
  const body = t('s25_body', 'A velocidade real do trator na vinha difere frequentemente da leitura do velocímetro. Devemos medir o tempo exato para percorrer uma distância conhecida (ex: 50 m ou 100 m).');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s25-card" style="position: absolute; top: 18%; left: 6%; width: 88%;">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="gauge" style="width: 22px; height: 22px; color: var(--forest-green);"></i>
        <span>${title}</span>
      </div>
      <div class="cream-card-body" style="margin-top: 12px; font-weight: 600; line-height: 1.45; text-align: center;">
        ${body}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 26: Interactive Tractor Speed Chronometer
function renderScreen26(container) {
  let timerInterval = null;
  let startTime = 0;
  let elapsedSec = 0;
  let isRunning = false;
  const distanceM = 50;

  const title = t('s26_title', 'MEDIÇÃO DA VELOCIDADE DE AVANÇO');
  const subtitle = t('s26_subtitle', 'Percorra 50 m na vinha e cronometre o tempo de deslocação.');

  container.innerHTML = `
    <div class="chrono-container designer-target" id="el-s26-chronoCard" style="top: 10%; left: 5%; width: 90%; position: absolute;">
      <div style="font-family: var(--font-header); font-weight: 900; font-size: 1.05rem; color: var(--forest-green); text-transform: uppercase;">
        ${title}
      </div>
      <div style="font-family: var(--font-body); font-weight: 600; font-size: 0.88rem; color: var(--text-dark); text-align: center;">
        ${subtitle}
      </div>

      <div class="chrono-readout" id="chrono-timer-display">
        00.0s
      </div>

      <div class="chrono-speed-badge" id="chrono-speed-display">
        Velocidade: 0.0 km/h
      </div>

      <button id="btn-chrono-action" class="btn-start-challenge-pill" style="margin-top: 8px; width: 85%; font-size: 1rem; padding: 10px 16px;">
        ⏱️ INICIAR CRONÓMETRO
      </button>

      <div id="chrono-hint-box" style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-top: 4px; text-align: center;">
        Alvo: 50 m em 36s (5.0 km/h) ou 30s (6.0 km/h)
      </div>
    </div>
  `;

  const timerDisplay = document.getElementById('chrono-timer-display');
  const speedDisplay = document.getElementById('chrono-speed-display');
  const btnAction = document.getElementById('btn-chrono-action');

  if (btnAction) {
    btnAction.addEventListener('click', () => {
      initAudioEngine();
      if (!isRunning) {
        isRunning = true;
        btnAction.textContent = '⏹️ PARAR CRONÓMETRO';
        btnAction.style.backgroundColor = '#C62828';
        startTime = Date.now() - (elapsedSec * 1000);
        timerInterval = setInterval(() => {
          elapsedSec = (Date.now() - startTime) / 1000;
          if (timerDisplay) timerDisplay.textContent = `${elapsedSec.toFixed(1)}s`;
          const speedKmh = (distanceM * 3.6) / elapsedSec;
          if (speedDisplay) speedDisplay.textContent = `Velocidade: ${speedKmh.toFixed(1)} km/h`;
        }, 100);
      } else {
        isRunning = false;
        clearInterval(timerInterval);
        btnAction.textContent = '🔄 REINICIAR TESTE';
        btnAction.style.backgroundColor = 'var(--forest-green)';
        const speedKmh = (distanceM * 3.6) / elapsedSec;
        if (speedDisplay) {
          speedDisplay.textContent = `Velocidade Final: ${speedKmh.toFixed(1)} km/h`;
        }
      }
    });
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 27: Target Application Rate & Total Flow Calculation
function renderScreen27(container) {
  const title = t('s27_title', 'CÁLCULO DO CAUDAL TOTAL (Q_total)');
  const body = t('s27_body', 'Com um volume de calda de 250 L/ha, velocidade de 5.0 km/h e compasso de 2.8 m, o caudal total necessário é:');
  const formulaText = 'Q_total = (250 × 5.0 × 2.8) / 600 = 5.83 L/min';

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s27-card" style="position: absolute; top: 16%; left: 6%; width: 88%;">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="calculator" style="width: 22px; height: 22px; color: var(--forest-green);"></i>
        <span>${title}</span>
      </div>
      <div class="cream-card-body" style="margin-top: 10px; font-weight: 600; line-height: 1.4; text-align: center;">
        ${body}
      </div>
      <div style="margin-top: 14px; padding: 12px; background: rgba(30, 66, 34, 0.08); border-radius: 12px; border: 2px solid var(--forest-green); font-family: var(--font-header); font-weight: 900; font-size: 1.05rem; color: var(--forest-green); text-align: center;">
        ${formulaText}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 28: Active Nozzles & Individual Flow Rate
function renderScreen28(container) {
  const title = t('s28_title', 'CAUDAL INDIVIDUAL POR BICO (q)');
  const body = t('s28_body', 'Com 6 bicos ativos no pulverizador de turbina da Laura, o caudal exigido por cada bico individual é:');
  const formulaText = 'q = Q_total / 6 = 5.83 / 6 = 0.97 L/min';

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s28-card" style="position: absolute; top: 16%; left: 6%; width: 88%;">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="droplet" style="width: 22px; height: 22px; color: var(--forest-green);"></i>
        <span>${title}</span>
      </div>
      <div class="cream-card-body" style="margin-top: 10px; font-weight: 600; line-height: 1.4; text-align: center;">
        ${body}
      </div>
      <div style="margin-top: 14px; padding: 12px; background: rgba(30, 66, 34, 0.08); border-radius: 12px; border: 2px solid var(--forest-green); font-family: var(--font-header); font-weight: 900; font-size: 1.05rem; color: var(--forest-green); text-align: center;">
        ${formulaText}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 29: Interactive ISO Nozzle & Pressure Selection Table with Zoom Lens
function renderScreen29(container) {
  let selectedNozzleIndex = 1;
  let currentPressureBar = 8.0;

  const ISO_NOZZLES = [
    { code: '01', colorName: 'Laranja', hex: '#FF7F00', q30: 0.40 },
    { code: '015', colorName: 'Verde', hex: '#2E7D32', q30: 0.60 },
    { code: '02', colorName: 'Amarelo', hex: '#D4A017', q30: 0.80 },
    { code: '03', colorName: 'Azul', hex: '#1E88E5', q30: 1.20 },
    { code: '04', colorName: 'Vermelho', hex: '#E53935', q30: 1.60 },
    { code: '05', colorName: 'Castanho', hex: '#6D4C41', q30: 2.00 },
    { code: '06', colorName: 'Cinzento', hex: '#757575', q30: 2.40 },
    { code: '08', colorName: 'Branco', hex: '#EEEEEE', textColor: '#111', q30: 3.20 }
  ];

  function updateZoomLens() {
    const nozzle = ISO_NOZZLES[selectedNozzleIndex];
    const q2 = nozzle.q30 * Math.sqrt(currentPressureBar / 3.0);
    const isPressureOk = currentPressureBar >= 6.0 && currentPressureBar <= 12.0;

    const zoomCard = document.getElementById('zoom-lens-card');
    if (zoomCard) {
      zoomCard.innerHTML = `
        <div style="font-family: var(--font-header); font-weight: 900; font-size: 0.95rem; color: var(--forest-green); display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>BICOS ISO ${nozzle.code} (${nozzle.colorName})</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-around; margin-top: 2px;">
          <div>
            <span style="font-size: 0.74rem; color: var(--text-muted); display: block;">Pressão</span>
            <strong style="font-size: 1.05rem; color: var(--forest-green);">${currentPressureBar.toFixed(1)} bar</strong>
          </div>
          <div style="font-size: 1.3rem;">➔</div>
          <div>
            <span style="font-size: 0.74rem; color: var(--text-muted); display: block;">Caudal Calculado (q)</span>
            <strong style="font-size: 1.15rem; color: #2E7D32;">${q2.toFixed(2)} L/min</strong>
          </div>
        </div>
        <div style="margin-top: 4px; padding: 4px 8px; border-radius: 8px; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; ${isPressureOk ? 'background: #E8F5E9; color: #2E7D32; border: 1px solid #2E7D32;' : 'background: #FFEBEE; color: #C62828; border: 1px solid #C62828;'}">
          ${isPressureOk ? '✓ Janela de Pressão Ideal (6.0 - 12.0 bar)' : '⚠️ Fora da Janela Recomendada (6-12 bar)'}
        </div>
      `;
    }
  }

  const title = t('s29_title', 'TABELA INTERATIVA ISO 10625');
  const subtitle = t('s29_subtitle', 'Selecione a cor do bico e ajuste a pressão de trabalho.');

  container.innerHTML = `
    <div class="iso-table-card designer-target" id="el-s29-isoCard" style="top: 5%; left: 4%; width: 92%; position: absolute;">
      <div style="font-family: var(--font-header); font-weight: 900; font-size: 1rem; color: var(--forest-green); text-transform: uppercase; text-align: center;">
        ${title}
      </div>
      <div style="font-family: var(--font-body); font-weight: 600; font-size: 0.82rem; color: var(--text-dark); text-align: center;">
        ${subtitle}
      </div>

      <!-- ISO Nozzles Grid -->
      <div class="iso-nozzle-grid">
        ${ISO_NOZZLES.map((n, idx) => `
          <div class="iso-nozzle-chip ${idx === selectedNozzleIndex ? 'active' : ''}" data-idx="${idx}" style="background-color: ${n.hex}; color: ${n.textColor || '#FFFFFF'};">
            <span>ISO ${n.code}</span>
            <small style="font-size: 0.65rem; opacity: 0.9;">${n.q30}L</small>
          </div>
        `).join('')}
      </div>

      <!-- Pressure Slider Control -->
      <div style="background: #FFFFFF; padding: 8px 12px; border-radius: 12px; border: 1.5px solid var(--cream-card-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-family: var(--font-header); font-weight: 800; font-size: 0.84rem; color: var(--forest-green);">PRESSÃO DE TRABALHO:</span>
          <strong id="pressure-slider-val" style="font-size: 1.05rem; color: var(--forest-green);">8.0 bar</strong>
        </div>
        <input type="range" id="iso-pressure-slider" min="1.0" max="15.0" step="0.5" value="8.0" style="width: 100%; accent-color: var(--forest-green); cursor: pointer;">
      </div>

      <!-- Zoom Lens Magnifier Card -->
      <div id="zoom-lens-card" class="zoom-lens-card"></div>
    </div>
  `;

  updateZoomLens();

  // Bind Nozzle Chip Clicks
  const chips = container.querySelectorAll('.iso-nozzle-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      initAudioEngine();
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedNozzleIndex = parseInt(chip.getAttribute('data-idx'), 10);
      updateZoomLens();
    });
  });

  // Bind Pressure Slider
  const slider = document.getElementById('iso-pressure-slider');
  const sliderVal = document.getElementById('pressure-slider-val');
  if (slider) {
    slider.addEventListener('input', (e) => {
      currentPressureBar = parseFloat(e.target.value);
      if (sliderVal) sliderVal.textContent = `${currentPressureBar.toFixed(1)} bar`;
      updateZoomLens();
    });
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 36: Start of Chapter 5 - Verification of the Results
function renderScreen36(container) {
  const title = t('s36_title', '5. VERIFICATION OF THE RESULTS');
  const body = t('s36_body', 'Depois de definir os parâmetros teóricos e selecionar os bicos, a Laura deve verificar fisicamente o pulverizador no terreno antes de iniciar a aplicação.');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s36-card" style="position: absolute; top: 18%; left: 6%; width: 88%;">
      <div class="cream-card-header" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i data-lucide="check-square" style="width: 22px; height: 22px; color: var(--forest-green);"></i>
        <span>${title}</span>
      </div>
      <div class="cream-card-body" style="margin-top: 12px; font-weight: 600; line-height: 1.45; text-align: center;">
        ${body}
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 37: 4 Pillars of Sprayer Inspection
function renderScreen37(container) {
  const title = t('s37_title', 'OS 4 PILARES DA INSPEÇÃO DE CAMPO');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s37-card" style="position: absolute; top: 8%; left: 5%; width: 90%;">
      <div class="cream-card-header" style="text-align: center; margin-bottom: 8px;">
        ${title}
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 10px; border-left: 4px solid var(--forest-green); font-size: 0.85rem; font-weight: 700;">
          1. Débito Real do Bico (Copo Graduado)
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 10px; border-left: 4px solid #1E88E5; font-size: 0.85rem; font-weight: 700;">
          2. Direção do Fluxo de Ar (Fitas de Papel)
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 10px; border-left: 4px solid #F57F17; font-size: 0.85rem; font-weight: 700;">
          3. Volume do Fluxo de Ar (Pás / Transmissão)
        </div>
        <div style="background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 10px; border-left: 4px solid #8E24AA; font-size: 0.85rem; font-weight: 700;">
          4. Teste de Cobertura de Gotas (Papel Hidrossensível WSP)
        </div>
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 38: Interactive Graduated Measuring Cup Simulator
function renderScreen38(container) {
  let isMeasuring = false;
  let hasMeasured = false;

  const title = t('s38_title', 'MEDIÇÃO DE DÉBITO COM COPO GRADUADO');
  const subtitle = t('s38_subtitle', 'Recolha a água emitida por 1 bico durante 1 minuto a 8.0 bar.');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s38-cupCard" style="top: 8%; left: 5%; width: 90%; position: absolute; text-align: center;">
      <div style="font-family: var(--font-header); font-weight: 900; font-size: 1rem; color: var(--forest-green); text-transform: uppercase;">
        ${title}
      </div>
      <div style="font-family: var(--font-body); font-weight: 600; font-size: 0.82rem; color: var(--text-dark); margin-top: 2px;">
        ${subtitle}
      </div>

      <div style="display: flex; align-items: center; justify-content: space-around; margin: 12px 0;">
        <div class="measuring-cup">
          <div id="cup-liquid-fill" class="cup-liquid"></div>
        </div>

        <div style="text-align: left; background: #FFFFFF; padding: 10px 12px; border-radius: 12px; border: 1.5px solid var(--cream-card-border);">
          <div style="font-size: 0.78rem; color: var(--text-muted);">Bico: <strong>ISO Verde 015</strong></div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Pressão: <strong>8.0 bar</strong></div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Exigido: <strong style="color: var(--forest-green);">0.97 L/min</strong></div>
          <div id="cup-reading-result" style="font-size: 0.95rem; font-weight: 900; color: #C62828; margin-top: 6px;">
            Medido: -- L/min
          </div>
        </div>
      </div>

      <button id="btn-measure-cup" class="btn-start-challenge-pill" style="width: 85%; font-size: 0.95rem; padding: 10px 16px;">
        🧪 INICIAR MEDIÇÃO (1 MINUTO)
      </button>
    </div>
  `;

  const btn = document.getElementById('btn-measure-cup');
  const liquid = document.getElementById('cup-liquid-fill');
  const reading = document.getElementById('cup-reading-result');

  if (btn) {
    btn.addEventListener('click', () => {
      initAudioEngine();
      if (isMeasuring || hasMeasured) return;
      isMeasuring = true;
      btn.disabled = true;
      btn.textContent = '⏳ A MEDIR (1 MINUTO)...';
      if (liquid) liquid.classList.add('filling');

      setTimeout(() => {
        isMeasuring = false;
        hasMeasured = true;
        btn.disabled = false;
        btn.textContent = '✓ MEDIÇÃO CONCLUÍDA (1.20 L/min)';
        btn.style.backgroundColor = '#2E7D32';
        if (reading) {
          reading.textContent = 'Medido: 1.20 L/min (+23.7% desvio)';
        }
      }, 3000);
    });
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 42: Interactive Air Ribbon Streamer Simulator
function renderScreen42(container) {
  let angleDeg = 35;

  const title = t('s42_title', 'DIREÇÃO DO FLUXO DE AR (FITAS)');
  const subtitle = t('s42_subtitle', 'Ajuste a inclinação do defletor de ar até alinhar as fitas com a copa.');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s42-ribbonCard" style="top: 8%; left: 5%; width: 90%; position: absolute; text-align: center;">
      <div style="font-family: var(--font-header); font-weight: 900; font-size: 1rem; color: var(--forest-green); text-transform: uppercase;">
        ${title}
      </div>
      <div style="font-family: var(--font-body); font-weight: 600; font-size: 0.82rem; color: var(--text-dark); margin-top: 2px;">
        ${subtitle}
      </div>

      <!-- Ribbon Simulation Graphic Box -->
      <div style="position: relative; width: 100%; height: 120px; background: #E8F5E9; border-radius: 12px; border: 1.5px solid #2E7D32; margin: 10px 0; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; left: 10px; font-weight: 900; font-size: 0.75rem; color: #1E4222;">TURBINA DE AR</div>
        <div id="ribbon-element-stream" class="ribbon-streamer" style="position: absolute; left: 110px; transform: rotate(-${angleDeg}deg);"></div>
        <div style="position: absolute; right: 10px; border-right: 3px dashed #2E7D32; height: 100%; width: 40px; background: rgba(46, 125, 50, 0.15); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: #1E4222;">COPA</div>
      </div>

      <!-- Deflector Slider Control -->
      <div style="background: #FFFFFF; padding: 8px 12px; border-radius: 12px; border: 1.5px solid var(--cream-card-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-family: var(--font-header); font-weight: 800; font-size: 0.84rem; color: var(--forest-green);">ÂNGULO DO DEFLETOR:</span>
          <strong id="ribbon-angle-val" style="font-size: 1rem; color: var(--forest-green);">35° (Alto)</strong>
        </div>
        <input type="range" id="ribbon-angle-slider" min="0" max="45" step="5" value="35" style="width: 100%; accent-color: var(--forest-green); cursor: pointer;">
      </div>

      <div id="ribbon-status-box" style="margin-top: 8px; padding: 6px; border-radius: 8px; font-size: 0.8rem; font-weight: 800; background: #FFEBEE; color: #C62828; border: 1px solid #C62828;">
        ⚠️ Alerta: Fitas apontam acima da copa! Risco severo de deriva ambiental.
      </div>
    </div>
  `;

  const slider = document.getElementById('ribbon-angle-slider');
  const angleVal = document.getElementById('ribbon-angle-val');
  const ribbon = document.getElementById('ribbon-element-stream');
  const statusBox = document.getElementById('ribbon-status-box');

  if (slider) {
    slider.addEventListener('input', (e) => {
      angleDeg = parseInt(e.target.value, 10);
      if (ribbon) ribbon.style.transform = `rotate(-${angleDeg}deg)`;
      
      let label = `${angleDeg}°`;
      if (angleDeg > 20) {
        label += ' (Muito Alto)';
        if (statusBox) {
          statusBox.style.background = '#FFEBEE';
          statusBox.style.color = '#C62828';
          statusBox.style.borderColor = '#C62828';
          statusBox.textContent = '⚠️ Alerta: Fitas apontam acima da copa! Risco severo de deriva ambiental.';
        }
      } else if (angleDeg >= 5 && angleDeg <= 20) {
        label += ' (Ideal)';
        if (statusBox) {
          statusBox.style.background = '#E8F5E9';
          statusBox.style.color = '#2E7D32';
          statusBox.style.borderColor = '#2E7D32';
          statusBox.textContent = '✓ Alinhamento Correto: Fluxo de ar direcionado perfeitamente para a copa.';
        }
      } else {
        label += ' (Muito Baixo)';
        if (statusBox) {
          statusBox.style.background = '#FFF3E0';
          statusBox.style.color = '#E65100';
          statusBox.style.borderColor = '#E65100';
          statusBox.textContent = '⚠️ Alerta: Fluxo de ar muito baixo! Perda de penetração no topo da copa.';
        }
      }
      if (angleVal) angleVal.textContent = label;
    });
  }

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Screen 46: Interactive Water-Sensitive Paper (WSP) Diagnostic Simulator
function renderScreen46(container) {
  const samples = {
    ext: { classified: null, target: 'excessive', label: 'Exterior da Copa' },
    mid: { classified: null, target: 'sufficient', label: 'Meio da Copa' },
    int: { classified: null, target: 'weak', label: 'Interior da Copa' }
  };

  let activeSample = 'ext';

  function updateWspUI() {
    const s = samples[activeSample];

    const zoomContainer = document.getElementById('wsp-zoom-container');
    if (zoomContainer) {
      zoomContainer.innerHTML = `
        <div style="font-family: var(--font-header); font-weight: 800; font-size: 0.9rem; color: var(--forest-green); margin-bottom: 4px;">
          AMOSTRA: ${s.label.toUpperCase()}
        </div>
        <div style="width: 100%; height: 60px; background: #FDD835; border: 2px solid #F57F17; border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          ${activeSample === 'ext' ? `
            <div style="width: 80%; height: 70%; background: rgba(30, 136, 229, 0.7); border-radius: 50%; filter: blur(4px);"></div>
            <span style="position: absolute; font-size: 0.72rem; font-weight: 800; color: #0D47A1;">Escorrimento de Gotas</span>
          ` : activeSample === 'mid' ? `
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; width: 80%;">
              ${Array(18).fill(0).map(() => `<div style="width: 6px; height: 6px; background: #1565C0; border-radius: 50%;"></div>`).join('')}
            </div>
            <span style="position: absolute; font-size: 0.72rem; font-weight: 800; color: #0D47A1; background: rgba(255,255,255,0.8); padding: 1px 4px; border-radius: 4px;">Gotas Homogéneas</span>
          ` : `
            <div style="display: flex; gap: 12px;">
              <div style="width: 4px; height: 4px; background: #1565C0; border-radius: 50%;"></div>
              <div style="width: 4px; height: 4px; background: #1565C0; border-radius: 50%;"></div>
            </div>
            <span style="position: absolute; font-size: 0.72rem; font-weight: 800; color: #0D47A1; background: rgba(255,255,255,0.8); padding: 1px 4px; border-radius: 4px;">Pouquíssimas Gotas</span>
          `}
        </div>

        <!-- Classification Buttons -->
        <div style="display: flex; gap: 6px; margin-top: 8px;">
          <button class="wsp-class-btn ${s.classified === 'excessive' ? 'selected' : ''}" data-val="excessive" style="flex: 1; padding: 6px 2px; font-size: 0.72rem; font-weight: 800; border-radius: 6px; border: 1px solid #C62828; background: ${s.classified === 'excessive' ? '#C62828' : '#FFF'}; color: ${s.classified === 'excessive' ? '#FFF' : '#C62828'};">
            EXCESSIVA
          </button>
          <button class="wsp-class-btn ${s.classified === 'sufficient' ? 'selected' : ''}" data-val="sufficient" style="flex: 1; padding: 6px 2px; font-size: 0.72rem; font-weight: 800; border-radius: 6px; border: 1px solid #2E7D32; background: ${s.classified === 'sufficient' ? '#2E7D32' : '#FFF'}; color: ${s.classified === 'sufficient' ? '#FFF' : '#2E7D32'};">
            SUFICIENTE
          </button>
          <button class="wsp-class-btn ${s.classified === 'weak' ? 'selected' : ''}" data-val="weak" style="flex: 1; padding: 6px 2px; font-size: 0.72rem; font-weight: 800; border-radius: 6px; border: 1px solid #E65100; background: ${s.classified === 'weak' ? '#E65100' : '#FFF'}; color: ${s.classified === 'weak' ? '#FFF' : '#E65100'};">
            MUITO FRACA
          </button>
        </div>
      `;

      // Bind classification click events
      zoomContainer.querySelectorAll('.wsp-class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          initAudioEngine();
          s.classified = btn.getAttribute('data-val');
          updateWspUI();

          const allClassified = samples.ext.classified && samples.mid.classified && samples.int.classified;
          const nextNavBtn = document.getElementById('nav-next');
          if (nextNavBtn && allClassified) {
            nextNavBtn.disabled = false;
          }
        });
      });
    }
  }

  const title = t('s46_title', 'DIAGNÓSTICO WSP (PAPEL HIDROSSENSÍVEL)');
  const subtitle = t('s46_subtitle', 'Inspecione e classifique as 3 amostras foliares na vinha.');

  container.innerHTML = `
    <div class="cream-card designer-target" id="el-s46-wspCard" style="top: 5%; left: 4%; width: 92%; position: absolute; text-align: center;">
      <div style="font-family: var(--font-header); font-weight: 900; font-size: 1rem; color: var(--forest-green); text-transform: uppercase;">
        ${title}
      </div>
      <div style="font-family: var(--font-body); font-weight: 600; font-size: 0.82rem; color: var(--text-dark); margin-top: 2px;">
        ${subtitle}
      </div>

      <!-- Sample Selector Chips -->
      <div style="display: flex; gap: 6px; margin: 10px 0;">
        <div class="wsp-sample-card ${activeSample === 'ext' ? 'completed' : ''}" data-key="ext" style="flex: 1;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #111;">EXTERIOR</div>
          <small style="font-size: 0.68rem; color: #555;">${samples.ext.classified ? '✓ Classificado' : 'Clique'}</small>
        </div>
        <div class="wsp-sample-card ${activeSample === 'mid' ? 'completed' : ''}" data-key="mid" style="flex: 1;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #111;">MÉDIO</div>
          <small style="font-size: 0.68rem; color: #555;">${samples.mid.classified ? '✓ Classificado' : 'Clique'}</small>
        </div>
        <div class="wsp-sample-card ${activeSample === 'int' ? 'completed' : ''}" data-key="int" style="flex: 1;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #111;">INTERIOR</div>
          <small style="font-size: 0.68rem; color: #555;">${samples.int.classified ? '✓ Classificado' : 'Clique'}</small>
        </div>
      </div>

      <!-- Zoom Container for active sample -->
      <div id="wsp-zoom-container" style="background: #FFFFFF; padding: 10px; border-radius: 12px; border: 1.5px solid var(--cream-card-border);"></div>
    </div>
  `;

  updateWspUI();

  // Bind sample selector chips
  const chips = container.querySelectorAll('.wsp-sample-card');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      initAudioEngine();
      activeSample = chip.getAttribute('data-key');
      updateWspUI();
    });
  });

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

  saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);
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
        
        saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);

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
          const backendUrl = getBackendUrl();
          fetch(`${backendUrl}/api/save-coordinates`, {
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

    saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);

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
    saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);

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
        saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);
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

    saveCustomCoordinatesLocally(UI_COORDINATES_MAP, '/api/sync-coords', false);

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
    backBtn.addEventListener('click', () => {
      if (gameState.currentSlide === 23) {
        const quiz4Ans = gameState.quizAnswers[20];
        if (quiz4Ans && quiz4Ans.correct === false) {
          goToSlide(22);
        } else {
          goToSlide(21);
        }
      } else {
        goToSlide(gameState.currentSlide - 1);
      }
    });
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

// Synchronous Viewport Height Calculator for Mobile Browsers (1vh Fix)
function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--real-vh', `${vh}px`);
}

// Immediate execution on script load to set --real-vh as early as possible
updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', updateViewportHeight);

// Calculate Responsive Scale Factor dynamically for smartphones, tablets & laptops
function updateResponsiveScale() {
  updateViewportHeight();
  const container = document.getElementById('game-container');
  if (!container) return;

  const width = container.clientWidth;
  // Reference target width is 420px (standard 9:16 vertical viewport)
  const scale = Math.min(1.25, Math.max(0.68, width / 420));
  container.style.setProperty('--scale-factor', scale.toFixed(3));
}

// Dev Debug HUD Tool for Real-Time Coordinates Calibration
function initDebugHUD() {
  if (window.location.hostname !== 'localhost' && !window.location.search.includes('debug=true')) return;

  const container = document.getElementById('game-container');
  if (!container) return;

  let hud = document.getElementById('dev-coords-hud');
  if (!hud) {
    hud = document.createElement('div');
    hud.id = 'dev-coords-hud';
    hud.style.cssText = 'position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.85); color: #fff; padding: 10px; font-family: monospace; font-size: 11px; z-index: 9999; border-radius: 6px; pointer-events: none;';
    hud.innerHTML = 'DEV HUD: Click screen for coords';
    container.appendChild(hud);
  }

  let grid = document.getElementById('dev-coords-grid');
  if (!grid) {
    grid = document.createElement('div');
    grid.id = 'dev-coords-grid';
    grid.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; border: 2px red dashed; box-sizing: border-box; z-index: 9998;';
    container.appendChild(grid);
  }

  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const yPct = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    if (hud) hud.innerHTML = `Coords: left: ${xPct}%; top: ${yPct}%;`;
    console.log(`COORDS: left: ${xPct}%, top: ${yPct}%`);
  });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  updateViewportHeight();
  updateResponsiveScale();
  window.addEventListener('resize', updateResponsiveScale);
  window.addEventListener('orientationchange', updateResponsiveScale);

  preloadBackdropImages();
  loadCustomCoordinates();
  renderTopBar();
  initDebugHUD();

  // 1. Carrega sempre as traduções na inicialização para o modal ficar traduzido
  await loadTranslations(gameState.activeLanguage);

  // 2. Verifica a existência de progresso guardado
  const hasSession = checkSessionRecovery();
  if (!hasSession) {
    // Se não houver sessão anterior, renderiza o ecrã inicial (Tela 1)
    renderCurrentSlide();
  }
});
