---
description: Automatically triggers the full GitHub Pages deploy pipeline when the user requests "Carregar Git" and displays estimated deployment time.
---

# Trigger Rule: Carregar Git

Whenever the user submits a prompt containing **"Carregar Git"** (or variations like "carregar no git", "fazer deploy git", "atualizar github"):

1. Instantly execute `node deploy-git.js` using `run_command` in the project root directory.
2. Confirm completion to the user and present the official live link along with GitHub Pages deployment time estimation:
   👉 **[https://pedronunes.github.io/renovate-serious-game/](https://pedronunes.github.io/renovate-serious-game/)**

3. **Always include the build estimation notice**:
   - ⏱ **Tempo de Espera no GitHub Pages**: 30 a 60 segundos (até 1 a 2 minutos máximo).
   - 🔄 **Limpeza de Cache**: Recomendar a utilização de `Ctrl + F5` (no PC) ou fechar e reabrir a aplicação (no smartphone/PWA) para forçar o recarregamento dos ficheiros atualizados.
