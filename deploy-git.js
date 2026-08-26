/**
 * RENOVATE Serious Game - Automatic GitHub Pages Deploy Engine (Dual Root + Docs Sync)
 * Executed when user says "Carregar Git" or runs `node deploy-git.js`
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 [Carregar Git] A iniciar o protocolo de deploy automatizado...\n');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  // 1. Verificação sintática de código
  console.log('🔍 1/5 A verificar sintaxe dos ficheiros JavaScript...');
  execSync('node -c app.js', { stdio: 'inherit' });
  execSync('node -c server.js', { stdio: 'inherit' });
  execSync('node -c sw.js', { stdio: 'inherit' });
  console.log('✓ Sintaxe validada com sucesso!\n');

  // 2. Sincronização Dual para a pasta /docs (Garante compatibilidade total com GitHub Pages)
  console.log('📂 2/5 A sincronizar ficheiros de produção com a pasta /docs...');
  const docsDir = path.join(__dirname, 'docs');
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  
  fs.copyFileSync('index.html', path.join(docsDir, 'index.html'));
  fs.copyFileSync('styles.css', path.join(docsDir, 'styles.css'));
  fs.copyFileSync('app.js', path.join(docsDir, 'app.js'));
  fs.copyFileSync('sw.js', path.join(docsDir, 'sw.js'));
  fs.copyFileSync('manifest.json', path.join(docsDir, 'manifest.json'));
  if (fs.existsSync('.nojekyll')) fs.copyFileSync('.nojekyll', path.join(docsDir, '.nojekyll'));
  
  if (fs.existsSync('public')) {
    copyRecursiveSync('public', path.join(docsDir, 'public'));
  }
  console.log('✓ Pasta /docs sincronizada com v2.1.3!\n');

  // 3. Adicionar todos os ficheiros alterados
  console.log('📦 3/5 A preparar ficheiros para commit (git add .)...');
  execSync('git add .', { stdio: 'inherit' });
  console.log('✓ Ficheiros adicionados!\n');

  // 4. Criar commit automatizado
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
  const commitMsg = `deploy: Full v2.1.3 Dual Sync (Root + Docs) (${timestamp})`;
  
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
  console.log('\n======================================================');
  console.log('🎉 PUBLICAÇÃO CONCLUÍDA COM SUCESSO NO GITHUB PAGES!');
  console.log('======================================================');
  console.log('👉 URL Oficial: https://pedronunes.github.io/renovate-serious-game/\n');
  console.log('⏱ TEMPO DE ESPERA ESTIMADO:');
  console.log('   - O GitHub Pages demora cerca de 45 a 60 segundos a processar a atualização no servidor.');
  console.log('   - Aguarde cerca de 1 minuto antes de abrir a ligação.');
  console.log('   - Se já tiver a página aberta, prima [Ctrl + F5] no PC ou feche e reabra a app no telemóvel para limpar a cache!\n');

} catch (error) {
  console.error('❌ Erro durante o processo de deploy:', error.message);
  process.exit(1);
}
