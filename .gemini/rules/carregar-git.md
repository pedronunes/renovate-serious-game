---
description: Automatically triggers the full GitHub Pages deploy pipeline when the user requests "Carregar Git".
---

# Trigger Rule: Carregar Git

Whenever the user submits a prompt containing **"Carregar Git"** (or variations like "carregar no git", "fazer deploy git", "atualizar github"):

1. Instantly execute `node deploy-git.js` using `run_command` in the project root directory.
2. Confirm completion to the user and present the official live link:
   👉 **[https://pedronunes.github.io/renovate-serious-game/](https://pedronunes.github.io/renovate-serious-game/)**
