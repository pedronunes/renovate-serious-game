# 🗺️ RENOVATE Serious Game: Master Screens Manifest (Tela 1 a Tela 23)

Este documento é o **Guia Mestre de Telas (Manifesto)** do videojogo do projeto **RENOVATE**. O seu objetivo é servir como a única fonte de verdade para o **Antigravity 2.0** saber exatamente quais os elementos visuais, textos, botões, ícones e comportamentos que deve desenhar e sobrepor em cada ecrã, do slide 1 ao slide 23.

---

## 📐 Diretivas Gerais de Design de Interface (UI/UX)
*   **Camada de Fundo (Layer 1):** Imagem estática correspondente `SeriousGame_tela[id].jpg`.
*   **Camada de Interface (Layer 2):** Elementos HTML absolutos reposicionáveis (coordenadas percentuais `%` no ficheiro `script.js` / `styles.css`).
*   **Contentores de UI:** Caixa Creme Mate (`#F7F7F2`) opaca, com cantos arredondados (`border-radius: 16px`), contorno fino de 1.5px em Verde-Floresta (`#2A5C30`) e sombra projetada suave.
*   **Discurso Direto (Balões de Fala):** Forma retangular arredondada com cauda (ponteiro) CSS aguçada direcionada para a boca da personagem correspondente. **Sem aspas decorativas nos textos de diálogo.**
*   **Barra de Navegação Integrada de Rodapé (Bottom Bar):** Um único elemento unificado que agrupa:
    *   **Botão "BACK" (Esquerda):** Permite retroceder. Fica oculto ou desativado temporariamente em ecrãs de Quiz ativos.
    *   **Barra de Progresso/Breadcrumbs (Centro):** Texto limpo mostrando *"Screen X of 157"* e pontos de progresso discretos.
    *   **Botão "NEXT" (Direita):** Permite avançar. Fica desativado ou oculto em ecrãs de Quiz até que uma opção correta/incorreta seja selecionada.
*   **Controlo de Som (Mute/Unmute):** Um pequeno botão flutuante com ícone de altifalante colocado numa das extremidades do rodapé, permitindo mutar os efeitos sonoros gerados por Web Audio API.

---

## 📋 Mapeamento Detalhado Ecrã por Ecrã (Telas 1 a 23)

### 🚜 Tela 1: Boas-vindas & Seleção de Idioma
*   **Imagem de Fundo:** `public/images/SeriousGame_tela1.jpg` (Apresentação com Laura e Mia lado a lado).
*   **Foco Narrativo:** Ecrã de introdução e configuração inicial do utilizador.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Dropdown de Idiomas (Centro-Inferior):** Dropdown select responsivo para escolher um dos 12 idiomas: `en-GB`, `es-ES`, `fr-FR`, `it-IT`, `nl-BE`, `cs-CZ`, `pt-PT`, `pl-PL`, `el-CY`, `de-DE`, `nl-NL`, `el-GR`. Selecionar o idioma atualiza o estado `gameState.activeLanguage` e carrega o correspondente ficheiro `.json` de tradução.
    *   **Botão "START CHALLENGE" (Centro-Fundo):** Botão grande, com cor de destaque Amarelo-Ouro (`#FFCC66`), para iniciar o jogo e avançar para a Tela 2.
    *   **Barra de Progresso (Breadcrumbs):** Visível no fundo, marcada na etapa 1 "Understanding calibration".
    *   **Modal de Recuperação de Sessão (Condicional):** Se existir progresso guardado no `localStorage`, sobrepor caixa creme mate perguntando: *"Pretende retomar a sua sessão a partir da tela [X]?"* com botões "Sim, Retomar" e "Recomeçar do Início".

### 👩‍🌾 Tela 2: Conheça a Laura (Meet Laura)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela2.jpg` (Laura em primeiro plano no lado direito).
*   **Foco Narrativo:** Introduzir a personagem guia agricultora.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Info Card (Lado Esquerdo):** Caixa Creme Mate flutuante (coordenadas: `top: 15%`, `left: 8%`, `width: 50%`) contendo o texto extraído de `Calibration_Serious-Game_Text.xlsx`:
        *   Título H1 (All-Caps Verde): *"MEET LAURA"*
        *   Texto de Corpo: *"Laura is a passionate vineyard grower. She wants to protect her crops, reduce waste and take care of the environment."*
    *   **Cards de Atributos de Rodapé (Alinhamento em 3 Colunas):** Três pequenos cards creme verticais na base esquerda:
        1.  Ícone: Cacho de uvas verde. Texto: *"VINEYARD GROWER"*
        2.  Ícone: Folha verde. Texto: *"CARES ABOUT THE ENVIRONMENT"*
        3.  Ícone: Alvo com seta. Texto: *"SEEKS BEST RESULTS"*
    *   **Navegação Unificada:** Botões de rodapé ativos (BACK regressa à Tela 1, NEXT avança para a Tela 3).

### 👩‍💼 Tela 3: Conheça a Mia (Meet Mia)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela3.jpg` (Mia em primeiro plano no lado esquerdo com o tablet).
*   **Foco Narrativo:** Introduzir a personagem guia consultora técnica.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Info Card (Lado Direito):** Caixa Creme Mate flutuante (coordenadas: `top: 15%`, `right: 8%`, `width: 50%`) contendo o texto do Excel:
        *   Título H1 (All-Caps Verde): *"MEET MIA"*
        *   Texto de Corpo: *"Mia is Laura's advisor. She helps her make the right decisions and get the best results with her sprayer."*
    *   **Cards de Atributos de Rodapé (Alinhamento em 3 Colunas):** Três pequenos cards creme verticais na base direita:
        1.  Ícone: Chapéu de graduação verde. Texto: *"EXPERT ADVISOR"*
        2.  Ícone: Lâmpada verde. Texto: *"PRACTICAL GUIDANCE"*
        3.  Ícone: Aperto de mão verde. Texto: *"ALWAYS BY YOUR SIDE"*
    *   **Navegação Unificada:** Ativa (BACK para a Tela 2, NEXT para a Tela 4).

### 🍇 Tela 4: A Situação (The Situation)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela4.jpg` (Gráfico de folha de videira doente e clima húmido).
*   **Foco Narrativo:** Contextualizar o perigo biológico na vinha.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Card Informativo (Topo Esquerdo):** Caixa Creme Mate com o texto:
        *   Título H1 (All-Caps Verde): *"THE SITUATION"*
        *   Texto de Corpo: *"Warm and humid weather favours downy mildew infection. Timely and well-calibrated spraying is essential."*
    *   **Elementos Visuais do Fundo (Para suporte apenas, não codificar):** O fundo já exibe de forma estática o desfoque gaussiano, a folha de videira em sharp focus com manchas amarelas de míldio, lente de zoom circular e ícones climáticos.
    *   **Navegação Unificada:** Ativa (BACK para a Tela 3, NEXT para a Tela 5).

### 💬 Tela 5: Boas-vindas e Conselhos de Mia
*   **Imagem de Fundo:** `public/images/SeriousGame_tela5.jpg` (Mia de frente a cumprimentar, sem o tablet).
*   **Foco Narrativo:** Cumprimento da consultora em primeira pessoa.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Balão de Diálogo (Topo / Lado Direito da Mia):** Caixa Creme Mate em formato de balão com ponteiro CSS direcionado para o queixo da Mia. O texto deve estar livre de aspas:
        *   Nome do Orador: *"MIA"* (Negrito Verde)
        *   Texto: *"Hi Laura! Weather conditions are favourable for downy mildew. I recommend applying VitiShield today. But before entering the vineyard, let's make sure your sprayer is correctly calibrated. I'll guide you through the whole process."*
    *   **Navegação Unificada:** Ativa (BACK para a Tela 4, NEXT para a Tela 6).

### ℹ️ Tela 6: Ecrã de Informação e Transição
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg` (Fundo desfocado puro para transição limpa).
*   **Foco Narrativo:** Informações textuais adicionais antes da ação de campo.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Card Informativo Central:** Caixa Creme Mate flutuante de grandes dimensões contendo textos de suporte e tabelas informativas de pré-requisitos lidos do Excel para a etapa.
    *   **Navegação Unificada:** Ativa (BACK para a Tela 5, NEXT para a Tela 7).

### 🚪 Tela 7: Início de Capítulo
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg` (Fundo desfocado genérico).
*   **Foco Narrativo:** Dividir o jogo em marcos pedagógicos.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Card de Transição Central:** Exibe em destaque All-Caps e Green o título do capítulo: *"CHAPTER 1: UNDERSTANDING THE CALIBRATION"* com um sumário dos objetivos de aprendizagem que se seguem.
    *   **Navegação Unificada:** Ativa (BACK para a Tela 6, NEXT para a Tela 8).

### 💡 Tela 8: Os Pilares da Eficácia (Mia's Tip)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela8.jpg` (Mia em pose didática com o dedo indicador erguido).
*   **Foco Narrativo:** Fundamentação teórica dos tratamentos agrícolas.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Balão de Diálogo (Superior):** Balão creme mate apontando para a Mia:
        *   Nome: *"MIA"*
        *   Texto: *"Laura, before we start, let's understand what makes a spray treatment effective."*
    *   **Dica Técnica - Mia's Tip (Médio-Direito):** Card Creme Mate flutuante com um ícone de lâmpada dourada (`#FFCC66`) no canto:
        *   Cabeçalho: *"MIA'S TIP"* (Negrito Verde)
        *   Texto: *"Applying too much wastes product and increase environmental risk. Applying too little may reduce treatment efficacy."*
    *   **Card de Pilares - 3 Pillars (Fundo-Direito):** Card creme mate flutuante de tamanho médio:
        *   Título: *"WHAT MAKES A TREATMENT EFFECTIVE?"* (All-Caps Verde)
        *   Subtítulo: *"An effective and safe plant protection treatment requires the precise application of:"*
        *   Lista de Tópicos (Com ícones de cor correspondente à esquerda):
            1.  💧 (Gota Azul): *"A SPRAY VOLUME RATE (L/ha) selected by the operator per unit area of the orchard."*
            2.  🧪 (Frasco de Ensaio Verde): *"A SPECIFIED CONCENTRATION of the plant protection product."*
            3.  🎯 (Alvo Roxo): *"PRECISE APPLICATION to ensure the right amount reaches the crop."*
    *   **Navegação Unificada:** Ativa (BACK para a Tela 7, NEXT para a Tela 9).

### 💬 Tela 9: Sequência Técnica - Explicação da Mia (Parte 1)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela9.jpg` (Mia em primeiro plano).
*   **Foco Narrativo:** Sequência lógica e detalhamento técnico das variáveis da calibração.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Balão de Fala & Card Creme Mate:** Posição responsiva para continuar as explicações dos pilares de eficácia iniciadas na Tela 8.
    *   **Navegação Unificada:** Ativa (BACK para a Tela 8, NEXT para a Tela 10).

### 💬 Tela 10: Sequência Técnica - Explicação da Mia (Parte 2)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela10.jpg` (Mia em primeiro plano).
*   **Foco Narrativo:** Conclusão teórica e chamada à ação para o primeiro teste.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Balão de Fala & Card Creme Mate:** Posição responsiva para finalizar os conselhos da Mia antes de iniciar o primeiro Quiz do jogo.
    *   **Navegação Unificada:** Ativa (BACK para a Tela 9, NEXT para a Tela 11).

### ❓ Tela 11: Quiz 1 - O que é a Calibração? (Quiz Activo)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg` (Fundo desfocado genérico).
*   **Foco Narrativo:** Desafio de retenção ativa sobre o conceito de calibração.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Painel do Quiz (Creme Mate flutuante ao centro):**
        *   Pergunta: *"What is calibration of a sprayer about?"*
        *   Opções de Escolha (Botões Creme de largura total - Opção A):
            *   Botão Option 1: *"Starting up a newly purchased sprayer."* (Incorreta)
            *   Botão Option 2: *"Inspecting the sprayer for certification purposes."* (Incorreta)
            *   Botão Option 3: *"Setting the sprayer's operating parameters to ensure precise pesticide application."* (CORRETA)
    *   **Comportamento de Navegação (ACTIVE LOCK):**
        *   Os botões BACK e NEXT de rodapé são **escondidos ou completamente desativados** nesta tela.
        *   O utilizador tem de carregar obrigatoriamente numa das 3 opções.
        *   Ao clicar: A opção clicada é verificada. Se correta, avança e regista como resolvida. O jogo muda o estado para desbloquear NEXT.
    *   **Navegação Pós-Resposta:** Botão NEXT fica ativo. Clicar em NEXT redireciona:
        *   Para a **Tela 12** se o utilizador escolheu a Opção 3 (Correta).
        *   Para a **Tela 13** se o utilizador escolheu as Opções 1 ou 2 (Incorretas).

### 🎉 Tela 12: Resposta Correta do Quiz 1 (Ecrã de Sucesso)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Foco Narrativo:** Reforço positivo pedagógico.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Painel de Sucesso Verde (Central):** Caixa flutuante creme mate com cabeçalho na cor Verde Sólido (`#2E7D32`):
        *   Título: *"CORRECT!"* (com ícone grande de visto verde ✔️).
        *   Texto de Feedback explicativo do Excel para a resposta certa.
        *   Efeito de Áudio reativo: Reproduz um som alegre "Ding" (sintetizado via Web Audio API, 880Hz por 0.15s).
    *   **Navegação Unificada:** Desbloqueada (BACK regressa à Tela 11 em estado Read-Only bloqueado, NEXT avança para a Tela 14).

### ❌ Tela 13: Resposta Errada do Quiz 1 (Ecrã de Erro)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Foco Narrativo:** Correção pedagógica e incentivo.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Painel de Erro Vermelho (Central):** Caixa flutuante creme mate com cabeçalho na cor Vermelho Sólido (`#C62828`):
        *   Título: *"INCORRECT"* (com ícone grande de cruz vermelha ❌).
        *   A opção errada clicada aparece marcada a vermelho. A opção correta (Opção 3) aparece realçada a verde.
        *   Texto de Feedback corretivo lido do Excel.
        *   Efeito de Áudio reativo: Reproduz um som dissonante "Buzz" (sintetizado via Web Audio API, 120Hz por 0.3s).
    *   **Botão "RETRY" (Centro-Fundo):** Botão para permitir ao utilizador repetir o Quiz 1 (regressa à Tela 11 com estado limpo para nova tentativa).
    *   **Navegação Unificada:** O NEXT é destrancado apenas para permitir avançar de qualquer forma para a Tela 14, caso o utilizador prefira continuar.

### ❓ Tela 14: Quiz 2 - Benefícios da Calibração (Quiz Activo)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Foco Narrativo:** Quiz sobre as vantagens e benefícios do processo.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Painel de Quiz Central:**
        *   Pergunta: *"What are the main benefits of calibration?"*
        *   Opções (Botões creme de largura total):
            *   Botão Option 1: *"Lower plant protection costs, better repeatability and verified sprayer readiness."* (CORRETA)
            *   Botão Option 2: *"Environmental benefits only."* (Incorreta)
            *   Botão Option 3: *"No benefits."* (Incorreta)
    *   **ACTIVE LOCK:** Botões BACK/NEXT desativados até responder.
    *   **Navegação Pós-Resposta:** NEXT redireciona para a **Tela 15** (se correta) ou **Tela 16** (se errada).

### 🎉 Tela 15: Resposta Correta do Quiz 2 (Ecrã de Sucesso)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Painel de feedback verde com visto ✔️ e explicação. Som "Ding" reativo.
*   **Navegação:** Ativa (BACK para Tela 14 em estado locked, NEXT para Tela 17).

### ❌ Tela 16: Resposta Errada do Quiz 2 (Ecrã de Erro)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Painel de feedback vermelho com cruz ❌, realce da certa e da errada. Som "Buzz" reativo. Botão "RETRY" para voltar à Tela 14.
*   **Navegação:** Ativa (BACK para Tela 14 em estado locked, NEXT para Tela 17).

### ❓ Tela 17: Quiz 3 - Consequências de Não Calibrar (Quiz Activo)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Foco Narrativo:** Quiz de risco ambiental e desperdício.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Painel de Quiz Central:**
        *   Pergunta: *"What are the main consequences of not calibrating?"*
        *   Opções (Botões creme de largura total):
            *   Botão Option 1: *"Increased spray drift, soil contamination and regulatory non-compliance."* (CORRETA)
            *   Botão Option 2: *"More frequent inspections."* (Incorreta)
            *   Botão Option 3: *"No consequences."* (Incorreta)
    *   **ACTIVE LOCK:** Botões BACK/NEXT desativados até responder.
    *   **Navegação Pós-Resposta:** NEXT redireciona para a **Tela 18** (se correta) ou **Tela 19** (se errada).

### 🎉 Tela 18: Resposta Correta do Quiz 3 (Ecrã de Sucesso)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Painel de feedback verde com visto ✔️ e explicação. Som "Ding" reativo.
*   **Navegação:** Ativa (BACK para Tela 17 em estado locked, NEXT para Tela 20).

### ❌ Tela 19: Resposta Errada do Quiz 3 (Ecrã de Erro)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Painel de feedback vermelho com cruz ❌, realce da certa/errada. Som "Buzz" reativo. Botão "RETRY" para voltar à Tela 17.
*   **Navegação:** Ativa (BACK para Tela 17 em estado locked, NEXT para Tela 20).

### ❓🖼️ Tela 20: Quiz 4 + Imagem - Ajuste do Volume do Ar (Quiz Activo)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg` (Fundo desfocado).
*   **Foco Narrativo:** Adicionar complexidade visual aos quizzes (Quiz com Imagem).
*   **Elementos a Sobrepor (Layer 2):**
    *   **Imagem Técnica de Apoio (Centro-Esquerdo):** Imagem sobreposta flutuante que exibe os efeitos do fluxo de ar (exemplo: a imagem `multimodal_3` com o trator a pulverizar de forma incorreta com fluxo excessivo e de forma correta com fluxo ajustado à vegetação).
    *   **Painel do Quiz (Centro-Direito):**
        *   Pergunta: *"What happens if the air flow volume is too high?"*
        *   Opções (Botões de menor dimensão, adaptados para o lado direito):
            *   Botão Option 1: *"Coverage always improves."* (Incorreta)
            *   Botão Option 2: *"Spray may pass through the canopy and reach the next row, increasing losses."* (CORRETA)
            *   Botão Option 3: *"The nozzles stop spraying."* (Incorreta)
    *   **ACTIVE LOCK:** Botões BACK/NEXT desativados até responder.
    *   **Navegação Pós-Resposta:** NEXT redireciona para a **Tela 21** (se correta) ou **Tela 22** (se errada).

### 🎉🖼️ Tela 21: Resposta Correta do Quiz 4 + Imagem (Sucesso)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Imagem técnica mantida no lado esquerdo. Painel de feedback verde com visto ✔️ e explicações no lado direito. Som "Ding" reativo.
*   **Navegação:** Ativa (BACK para Tela 20 em estado locked, NEXT para Tela 23).

### ❌🖼️ Tela 22: Resposta Errada do Quiz 4 + Imagem (Erro)
*   **Imagem de Fundo:** `public/images/SeriousGame_tela-Simples.jpg`.
*   **Elementos a Sobrepor:** Imagem técnica mantida no lado esquerdo. Painel de feedback vermelho com cruz ❌ no lado direito, realçando a certa e errada. Som "Buzz" reativo. Botão "RETRY" para tentar de novo a Tela 20.
*   **Navegação:** Ativa (BACK para Tela 20 em estado locked, NEXT para Tela 23).

### 💬 Tela 23: Encontro Narrativo de Mia e Laura
*   **Imagem de Fundo:** `public/images/SeriousGame_tela23.jpg` (Laura e Mia juntas na vinha, com as fardas oficiais).
*   **Foco Narrativo:** Conclusão da etapa teórica e arranque dos testes práticos de calibração.
*   **Elementos a Sobrepor (Layer 2):**
    *   **Balão de Diálogo Mia (Esquerda):** Balão creme mate apontando para a Mia:
        *   Nome: *"MIA"*
        *   Texto: *"Great job, Laura! Now we understand the basics. Let's move on to the next chapter and adjust the four key parameters."*
    *   **Balão de Diálogo Laura (Direita):** Balão creme mate apontando para a Laura:
        *   Nome: *"LAURA"*
        *   Texto: *"I'm ready! Let's calibrate the speed, pressure, and select the correct nozzles."*
    *   **Navegação Unificada:** Ativa (BACK para Tela 20/21/22, NEXT avança para a Tela 24).

---

## 🛑 Da Tela 24 em Diante: Comportamento Interativo
A partir da **Tela 24**, o Antigravity **não pode presumir ou escrever código de forma automática**. Ele deve pausar imediatamente a compilação, apresentar o checkpoint e questioná-lo sobre:
1.  Qual o texto exato das linhas do Excel correspondentes a essa tela.
2.  Que tipo de template visual utilizar (ex: Tela Simples com Diálogo, Quiz com 4 opções, Tabela com Zoom, etc.).
