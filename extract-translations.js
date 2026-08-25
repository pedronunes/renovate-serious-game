const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.join(__dirname, 'docs', 'Calibration_Serious-Game_Text.xlsx');
const outputDir = path.join(__dirname, 'public', 'locales');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Reading Excel file: ${excelPath}`);
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

// Language mappings: Column header name -> locale code & label
const langColumns = [
  { col: 'Text _ en-GB', code: 'en-GB', name: 'en-GB English' },
  { col: 'Text _ es-ES', code: 'es-ES', name: 'es-ES Español' },
  { col: 'Text _ fr-FR', code: 'fr-FR', name: 'fr-FR Français' },
  { col: 'Text _ it-IT', code: 'it-IT', name: 'it-IT Italiano' },
  { col: 'Text _ nl-BE', code: 'nl-BE', name: 'nl-BE Nederlands (BE)' },
  { col: 'Text _ cs-CZ', code: 'cs-CZ', name: 'cs-CZ Čeština' },
  { col: 'Text _ pt-PT', code: 'pt-PT', name: 'pt-PT Português' },
  { col: 'Text _ pl-PL', code: 'pl-PL', name: 'pl-PL Polski' },
  { col: 'Text _ el-CY', code: 'el-CY', name: 'el-CY Ελληνικά (CY)' },
  { col: 'Text _ de-DE', code: 'de-DE', name: 'de-DE Deutsch' },
  { col: 'Text _ nl-NL', code: 'nl-NL', name: 'nl-NL Nederlands (NL)' },
  { col: 'Text _ el-GR', code: 'el-GR', name: 'el-GR Ελληνικά (GR)' }
];

// System UI label translations for all 12 languages
const systemUiTranslations = {
  'en-GB': {
    ui_back: 'BACK',
    ui_next: 'NEXT',
    ui_screen: 'Screen',
    ui_of: 'of',
    ui_select_language: 'Language',
    ui_start_challenge: 'Start Challenge',
    ui_resume_session: 'Resume Session',
    ui_start_over: 'Start Over',
    ui_resume_prompt: 'Do you want to resume your saved session from Screen {X}?',
    ui_meet_laura: 'MEET LAURA',
    ui_meet_mia: 'MEET MIA',
    ui_correct: 'CORRECT!',
    ui_incorrect: 'INCORRECT',
    ui_retry: 'RETRY'
  },
  'es-ES': {
    ui_back: 'ANTERIOR',
    ui_next: 'SIGUIENTE',
    ui_screen: 'Pantalla',
    ui_of: 'de',
    ui_select_language: 'Idioma',
    ui_start_challenge: 'Iniciar desafío',
    ui_resume_session: 'Reanudar sesión',
    ui_start_over: 'Empezar de nuevo',
    ui_resume_prompt: '¿Desea reanudar su sesión guardada en la pantalla {X}?',
    ui_meet_laura: 'CONOCE A LAURA',
    ui_meet_mia: 'CONOCE A MIA',
    ui_correct: '¡CORRECTO!',
    ui_incorrect: 'INCORRECTO',
    ui_retry: 'REINTENTAR'
  },
  'fr-FR': {
    ui_back: 'RETOUR',
    ui_next: 'SUIVANT',
    ui_screen: 'Écran',
    ui_of: 'sur',
    ui_select_language: 'Langue',
    ui_start_challenge: 'Commencer le défi',
    ui_resume_session: 'Reprendre la session',
    ui_start_over: 'Recommencer',
    ui_resume_prompt: 'Voulez-vous reprendre votre session enregistrée à l\'écran {X} ?',
    ui_meet_laura: 'RENCONTREZ LAURA',
    ui_meet_mia: 'RENCONTREZ MIA',
    ui_correct: 'CORRECT !',
    ui_incorrect: 'INCORRECT',
    ui_retry: 'RÉESSAYER'
  },
  'it-IT': {
    ui_back: 'INDIETRO',
    ui_next: 'AVANTI',
    ui_screen: 'Schermata',
    ui_of: 'di',
    ui_select_language: 'Lingua',
    ui_start_challenge: 'Inizia sfida',
    ui_resume_session: 'Riprendi sessione',
    ui_start_over: 'Ricomincia',
    ui_resume_prompt: 'Vuoi riprendere la sessione salvata dallo schermo {X}?',
    ui_meet_laura: 'CONOSCI LAURA',
    ui_meet_mia: 'CONOSCI MIA',
    ui_correct: 'CORRETTO!',
    ui_incorrect: 'ERRATO',
    ui_retry: 'RIPROVA'
  },
  'nl-BE': {
    ui_back: 'TERUG',
    ui_next: 'VOLGENDE',
    ui_screen: 'Scherm',
    ui_of: 'van',
    ui_select_language: 'Taal',
    ui_start_challenge: 'Start uitdaging',
    ui_resume_session: 'Sessie hervatten',
    ui_start_over: 'Opnieuw beginnen',
    ui_resume_prompt: 'Wilt u uw opgeslagen sessie hervatten vanaf scherm {X}?',
    ui_meet_laura: 'MAAK KENNIS MET LAURA',
    ui_meet_mia: 'MAAK KENNIS MET MIA',
    ui_correct: 'JUIST!',
    ui_incorrect: 'FOUT',
    ui_retry: 'OPNIEUW PROBEREN'
  },
  'cs-CZ': {
    ui_back: 'ZPĚT',
    ui_next: 'DÁLE',
    ui_screen: 'Obrazovka',
    ui_of: 'z',
    ui_select_language: 'Jazyk',
    ui_start_challenge: 'Zahájit výzvu',
    ui_resume_session: 'Obnovit relaci',
    ui_start_over: 'Začít znovu',
    ui_resume_prompt: 'Chcete obnovit uloženou relaci na obrazovce {X}?',
    ui_meet_laura: 'SEZNAMTE SE S LAUROU',
    ui_meet_mia: 'SEZNAMTE SE S MIOU',
    ui_correct: 'SPRÁVNĚ!',
    ui_incorrect: 'NESPRÁVNĚ',
    ui_retry: 'OPAKOVAT'
  },
  'pt-PT': {
    ui_back: 'VOLTAR',
    ui_next: 'SEGUINTE',
    ui_screen: 'Ecrã',
    ui_of: 'de',
    ui_select_language: 'Idioma',
    ui_start_challenge: 'Iniciar desafio',
    ui_resume_session: 'Retomar sessão',
    ui_start_over: 'Recomeçar',
    ui_resume_prompt: 'Pretende retomar a sua sessão guardada no ecrã {X}?',
    ui_meet_laura: 'CONHEÇA A LAURA',
    ui_meet_mia: 'CONHEÇA A MIA',
    ui_correct: 'CORRETO!',
    ui_incorrect: 'INCORRETO',
    ui_retry: 'TENTAR NOVAMENTE'
  },
  'pl-PL': {
    ui_back: 'WSTECZ',
    ui_next: 'DALEJ',
    ui_screen: 'Ekran',
    ui_of: 'z',
    ui_select_language: 'Język',
    ui_start_challenge: 'Rozpocznij wyzwanie',
    ui_resume_session: 'Wznów sesję',
    ui_start_over: 'Zacznij od nowa',
    ui_resume_prompt: 'Czy chcesz wznowić zapisaną sesję na ekranie {X}?',
    ui_meet_laura: 'POZNAJ LAURĘ',
    ui_meet_mia: 'POZNAJ MIĘ',
    ui_correct: 'PRAWIDŁOWO!',
    ui_incorrect: 'NIEPRAWIDŁOWO',
    ui_retry: 'SPRÓBUJ PONOWNIE'
  },
  'el-CY': {
    ui_back: 'ΠΙΣΩ',
    ui_next: 'ΕΠΟΜΕΝΟ',
    ui_screen: 'Οθόνη',
    ui_of: 'από',
    ui_select_language: 'Γλώσσα',
    ui_start_challenge: 'Έναρξη πρόκλησης',
    ui_resume_session: 'Συνέχιση συνεδρίας',
    ui_start_over: 'Ξανά από την αρχή',
    ui_resume_prompt: 'Θέλετε να συνεχίσετε τη συνεδρία από την οθόνη {X};',
    ui_meet_laura: 'ΓΝΩΡΙΣΤΕ ΤΗ LAURA',
    ui_meet_mia: 'ΓΝΩΡΙΣΤΕ ΤΗ MIA',
    ui_correct: 'ΣΩΣΤΟ!',
    ui_incorrect: 'ΛΑΘΟΣ',
    ui_retry: 'ΔΟΚΙΜΑΣΤΕ ΞΑΝΑ'
  },
  'de-DE': {
    ui_back: 'ZURÜCK',
    ui_next: 'WEITER',
    ui_screen: 'Bildschirm',
    ui_of: 'von',
    ui_select_language: 'Sprache',
    ui_start_challenge: 'Challenge starten',
    ui_resume_session: 'Sitzung fortsetzen',
    ui_start_over: 'Neu starten',
    ui_resume_prompt: 'Möchten Sie Ihre gespeicherte Sitzung von Bildschirm {X} fortsetzen?',
    ui_meet_laura: 'TREFFEN SIE LAURA',
    ui_meet_mia: 'TREFFEN SIE MIA',
    ui_correct: 'RICHTIG!',
    ui_incorrect: 'FALSCH',
    ui_retry: 'ERNEUT VERSUCHEN'
  },
  'nl-NL': {
    ui_back: 'TERUG',
    ui_next: 'VOLGENDE',
    ui_screen: 'Scherm',
    ui_of: 'van',
    ui_select_language: 'Taal',
    ui_start_challenge: 'Start uitdaging',
    ui_resume_session: 'Sessie hervatten',
    ui_start_over: 'Opnieuw beginnen',
    ui_resume_prompt: 'Wilt u uw opgeslagen sessie hervatten vanaf scherm {X}?',
    ui_meet_laura: 'MAAK KENNIS MET LAURA',
    ui_meet_mia: 'MAAK KENNIS MET MIA',
    ui_correct: 'JUIST!',
    ui_incorrect: 'FOUT',
    ui_retry: 'OPNIEUW PROBEREN'
  },
  'el-GR': {
    ui_back: 'ΠΙΣΩ',
    ui_next: 'ΕΠΟΜΕΝΟ',
    ui_screen: 'Οθόνη',
    ui_of: 'από',
    ui_select_language: 'Γλώσσα',
    ui_start_challenge: 'Έναρξη πρόκλησης',
    ui_resume_session: 'Συνέχιση συνεδρίας',
    ui_start_over: 'Ξανά από την αρχή',
    ui_resume_prompt: 'Θέλετε να συνεχίσετε τη συνεδρία από την οθόνη {X};',
    ui_meet_laura: 'ΓΝΩΡΙΣΤΕ ΤΗ LAURA',
    ui_meet_mia: 'ΓΝΩΡΙΣΤΕ ΤΗ MIA',
    ui_correct: 'ΣΩΣΤΟ!',
    ui_incorrect: 'ΛΑΘΟΣ',
    ui_retry: 'ΔΟΚΙΜΑΣΤΕ ΞΑΝΑ'
  }
};

const localesData = {};
langColumns.forEach(lang => {
  localesData[lang.code] = {
    _meta: {
      code: lang.code,
      name: lang.name
    },
    ...systemUiTranslations[lang.code]
  };
});

rows.forEach((row, index) => {
  const elementId = (row['Element ID'] || '').toString().trim();
  if (!elementId || elementId === 'Element ID') return;

  const screenSlide = row['Screen\r\nSlide'] || row['Screen/Slide'] || row['Screen Slide'] || '';
  
  langColumns.forEach(lang => {
    let textVal = row[lang.col];
    if (textVal !== undefined && textVal !== null) {
      textVal = String(textVal).trim();
    } else {
      textVal = '';
    }

    localesData[lang.code][elementId] = textVal;

    if (screenSlide) {
      const combinedKey = `s${String(screenSlide).padStart(2, '0')}_${elementId}`;
      if (!localesData[lang.code][combinedKey]) {
        localesData[lang.code][combinedKey] = textVal;
      }
    }
  });
});

// Patch s01_body_text Excel cell misalignment across de-DE, nl-NL, el-GR
localesData['de-DE']['s01_body_text'] = 'Hilf Laura ihr Spritzgerät zu kalibrieren, bevor sie ihren Weinberg behandelt.';
localesData['de-DE']['s01_s01_body_text'] = 'Hilf Laura ihr Spritzgerät zu kalibrieren, bevor sie ihren Weinberg behandelt.';

localesData['nl-NL']['s01_body_text'] = 'Help Laura haar spuitmachine te kalibreren voordat ze haar wijngaard behandelt.';
localesData['nl-NL']['s01_s01_body_text'] = 'Help Laura haar spuitmachine te kalibreren voordat ze haar wijngaard behandelt.';

localesData['el-GR']['s01_body_text'] = 'Βοηθήστε τη Laura να βαθμονομήσει τον ψεκαστήρα της πριν ψεκάσει το αμπέλι της.';
localesData['el-GR']['s01_s01_body_text'] = 'Βοηθήστε τη Laura να βαθμονομήσει τον ψεκαστήρα της πριν ψεκάσει το αμπέλι της.';

langColumns.forEach(lang => {
  const filePath = path.join(outputDir, `${lang.code}.json`);
  fs.writeFileSync(filePath, JSON.stringify(localesData[lang.code], null, 2), 'utf8');
  console.log(`Saved: public/locales/${lang.code}.json (${Object.keys(localesData[lang.code]).length} keys)`);
});

const manifestPath = path.join(outputDir, 'languages.json');
const manifestData = langColumns.map(l => ({ code: l.code, name: l.name }));
fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
console.log(`Saved: public/locales/languages.json`);

console.log('✅ All translations and UI system labels extracted successfully!');
