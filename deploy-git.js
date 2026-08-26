/**
 * RENOVATE Serious Game - Automatic GitHub Pages Deploy Engine
 * Executed when user says "Carregar Git" or runs `node deploy-git.js`
 */

const { execSync } = require('child_process');

console.log('🚀 [Carregar Git] A iniciar o protocolo de deploy automatizado...\n');

try {
  // 1. Verificação sintática de código
  console.log('🔍 1/4 A verificar sintaxe dos ficheiros JavaScript...');
  execSync('node -c app.js', { stdio: 'inherit' });
  execSync('node -c server.js', { stdio: 'inherit' });
  execSync('node -c sw.js', { stdio: 'inherit' });
  console.log('✓ Sintaxe validada com sucesso!\n');

  // 2. Adicionar todos os ficheiros alterados
  console.log('📦 2/4 A preparar ficheiros para commit (git add .)...');
  execSync('git add .', { stdio: 'inherit' });
  console.log('✓ Ficheiros adicionados!\n');

  // 3. Criar commit automatizado
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
  const commitMsg = `deploy: Release v2.1.3 - GitHub Pages Sync (${timestamp})`;
  
  console.log(`📝 3/4 A criar commit: "${commitMsg}"...`);
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('ℹ Sem novas alterações para commit.');
  }
  console.log('✓ Commit concluído!\n');

  // 4. Enviar para a branch main do GitHub
  console.log('🌐 4/4 A sincronizar com o GitHub (git push origin main)...');
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
