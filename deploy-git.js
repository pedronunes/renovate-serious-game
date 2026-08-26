/**
 * RENOVATE Serious Game - Automatic GitHub Pages Deploy Engine v3.0
 * Features: Automatic Version Bumping (vx.x.x.xxx), Cache-Busting, Clean Root Repository Deployment & Real-Time GitHub Actions API Status Verification
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🚀 [Carregar Git] A iniciar o protocolo de deploy automatizado v3.0...\n');

// -------------------------------------------------------------
// 1. Version Bumper (vx.x.x.xxx) & Timestamp Generator
// -------------------------------------------------------------
function bumpAndSyncVersion() {
  const pkgPath = path.join(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  let versionStr = pkg.version || '2.1.4.000';
  const versionParts = versionStr.split('.');
  
  if (versionParts.length >= 4) {
    const buildNum = parseInt(versionParts[3], 10) + 1;
    versionParts[3] = String(buildNum).padStart(3, '0');
  } else {
    versionParts.push('001');
  }

  const newVersion = versionParts.join('.');
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

  // Generate Date & Time String (DD.MM.YYYY HH:mm)
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
  const dateTimeStr = `${dateStr} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  console.log(`📌 Nova versão gerada: v${newVersion} (${dateTimeStr})`);

  // Update app.js (Version Badge String & Version text)
  let appJsContent = fs.readFileSync('app.js', 'utf8');
  appJsContent = appJsContent.replace(/v2\.1\.\d+(\.\d+)?/g, `v${newVersion}`);
  appJsContent = appJsContent.replace(/\d{2}\.\d{2}\.\d{4}/g, dateStr);
  fs.writeFileSync('app.js', appJsContent, 'utf8');

  // Update index.html (Asset Query Strings styles.css?v=..., app.js?v=..., sw.js?v=...)
  let indexHtmlContent = fs.readFileSync('index.html', 'utf8');
  indexHtmlContent = indexHtmlContent.replace(/styles\.css\?v=[^"'\s>]+/g, `styles.css?v=${newVersion}`);
  indexHtmlContent = indexHtmlContent.replace(/app\.js\?v=[^"'\s>]+/g, `app.js?v=${newVersion}`);
  indexHtmlContent = indexHtmlContent.replace(/sw\.js\?v=[^"'\s>]+/g, `sw.js?v=${newVersion}`);
  fs.writeFileSync('index.html', indexHtmlContent, 'utf8');

  // Update sw.js (CACHE_NAME & Asset Pre-Cache list)
  let swJsContent = fs.readFileSync('sw.js', 'utf8');
  swJsContent = swJsContent.replace(/CACHE_NAME = ['"][^'"]+['"]/g, `CACHE_NAME = 'renovate-serious-game-v${newVersion}'`);
  swJsContent = swJsContent.replace(/styles\.css\?v=[^"'\s>]+/g, `styles.css?v=${newVersion}`);
  swJsContent = swJsContent.replace(/app\.js\?v=[^"'\s>]+/g, `app.js?v=${newVersion}`);
  fs.writeFileSync('sw.js', swJsContent, 'utf8');

  return { newVersion, dateTimeStr };
}

// -------------------------------------------------------------
// 2. GitHub Actions Status Verification Poller via REST API
// -------------------------------------------------------------
function verifyGitHubStatus(callback) {
  const options = {
    hostname: 'api.github.com',
    path: '/repos/pedronunes/renovate-serious-game/actions/runs?branch=main&per_page=3',
    headers: {
      'User-Agent': 'RENOVATE-Deploy-Engine',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const req = https.get(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json && json.workflow_runs && json.workflow_runs.length > 0) {
          const latestRun = json.workflow_runs[0];
          callback(null, latestRun);
        } else {
          callback(null, null);
        }
      } catch (err) {
        callback(err, null);
      }
    });
  });

  req.on('error', (err) => callback(err, null));
}

function pollGitHubDeployment(maxWaitSeconds = 60) {
  console.log('\n⏳ A estabelecer ligação com a API do GitHub Actions para monitorizar a compilação em tempo real...');
  
  let elapsed = 0;
  const interval = 8; // poll every 8 seconds

  const timer = setInterval(() => {
    elapsed += interval;
    verifyGitHubStatus((err, run) => {
      if (err) {
        console.log(`   [API GitHub] A aguardar resposta... (${elapsed}s/${maxWaitSeconds}s)`);
      } else if (run) {
        const status = run.status; // 'queued', 'in_progress', 'completed'
        const conclusion = run.conclusion; // 'success', 'failure', 'cancelled'

        if (status === 'completed') {
          clearInterval(timer);
          console.log('\n======================================================');
          if (conclusion === 'success') {
            console.log('✅ STATUS GITHUB ACTIONS: SUCESSO COMPLETO!');
            console.log('🎉 O seu videojogo foi compilado e publicado no servidor do GitHub Pages com 0 erros.');
          } else {
            console.log(`❌ ALERTA GITHUB ACTIONS: Compilação terminada com estado "${conclusion}".`);
            console.log(`ℹ Detalhes da Execução: ${run.html_url}`);
          }
          console.log('======================================================');
          console.log('👉 URL Oficial: https://pedronunes.github.io/renovate-serious-game/');
          console.log('🔄 Dica de Cache: No PC prima [Ctrl + F5]. No iPhone PWA feche e reabra a aplicação.\n');
        } else {
          console.log(`   [GitHub Actions] Estado atual: "${status}"... (${elapsed}s/${maxWaitSeconds}s)`);
        }
      } else {
        console.log(`   [GitHub Actions] A processar nova compilação... (${elapsed}s/${maxWaitSeconds}s)`);
      }

      if (elapsed >= maxWaitSeconds) {
        clearInterval(timer);
        console.log('\n======================================================');
        console.log('⏳ A compilação no GitHub Actions continua a ser processada em segundo plano.');
        console.log('👉 URL Oficial: https://pedronunes.github.io/renovate-serious-game/\n');
      }
    });
  }, interval * 1000);
}

// -------------------------------------------------------------
// Main Execution Pipeline
// -------------------------------------------------------------
try {
  // 1. Verificação sintática de código
  console.log('🔍 1/5 A verificar sintaxe dos ficheiros JavaScript...');
  execSync('node -c app.js', { stdio: 'inherit' });
  execSync('node -c server.js', { stdio: 'inherit' });
  execSync('node -c sw.js', { stdio: 'inherit' });
  console.log('✓ Sintaxe validada com sucesso!\n');

  // 2. Incremento Automático de Versão (vx.x.x.xxx)
  console.log('🏷 2/5 A incrementar versão do projeto...');
  const { newVersion, dateTimeStr } = bumpAndSyncVersion();
  console.log('✓ Ficheiros de código atualizados para a nova versão!\n');

  // 3. Adicionar todos os ficheiros alterados (sem pasta /docs)
  console.log('📦 3/5 A preparar ficheiros para commit (git add .)...');
  execSync('git add .', { stdio: 'inherit' });
  console.log('✓ Ficheiros adicionados!\n');

  // 4. Criar commit automatizado
  const commitMsg = `deploy: Release v${newVersion} - Root Clean Deployment (${dateTimeStr})`;
  console.log(`📝 4/5 A criar commit: "${commitMsg}"...`);
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('ℹ Sem novas alterações para commit.');
  }
  console.log('✓ Commit concluído!\n');

  // 5. Enviar para a branch main do GitHub
  console.log('🌐 5/5 A sincronizar com o GitHub (git push origin main)...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✓ Envio concluído com sucesso!');

  // Polling em tempo real da API do GitHub Actions
  pollGitHubDeployment(48);

} catch (error) {
  console.error('❌ Erro durante o processo de deploy:', error.message);
  process.exit(1);
}
