# 🎨 RENOVATE Serious Game: Estudo de Cor, Design de Interface (UI/UX) e Diretrizes de Usabilidade PWA

Este documento serve como o **Guia de Design de Interface (UI/UX)**, **Estudo de Cores** e **Diretrizes Técnicas de Acessibilidade** para o videojogo pedagógico do projeto europeu **RENOVATE**. O seu objetivo é orientar o agente de IA do **Google Antigravity** e os programadores na replicação exata e otimizada do mockup físico (`Calibration_Serious-Game_v-final.pdf`) num formato de aplicação web progressiva (PWA) de alta fidelidade, moderna, minimalista e adaptada para dispositivos móveis.

---

## 🎨 1. Estudo Cromático e Acessibilidade (WCAG 2.1 AAA)

Para garantir uma interface inovadora e limpa, que possa ser facilmente lida no campo sob luz solar direta (uso real de operadores agrícolas), a paleta cromática foi estruturada com base num alto rácio de contraste e no ADN estético do projeto:

### A. Paleta de Cores Oficial

*   **Amarelo-Ouro RENOVATE (`#FFCC66`):**
    *   *Função:* Identidade e Destaque.
    *   *Uso:* Preenchimento da barra de topo (Top Bar), botões de ação críticos e realce de parâmetros ativos. Garante um excelente apelo tátil e destaque visual imediato.
*   **Verde Primário Floresta (`#1E4222`):**
    *   *Função:* Estruturação e Elementos de Marcação.
    *   *Uso:* Preenchimento da barra inferior (Bottom Bar), títulos mestre em caixa alta, contornos finos de cartões (1.5px) e detalhes nos ícones. Transmite o foco ecológico e agrícola do projeto.
*   **Creme Mate Opaco (`#F7F7F2`):**
    *   *Função:* Contentores de Conteúdo e Diálogos.
    *   *Uso:* Fundo de todos os cartões flutuantes (`.cream-card`) e balões de fala. Por ser totalmente opaco (100% de preenchimento, sem glassmorphism), previne a fadiga visual e garante que o texto escrito não se mistura com a vinha desfocada em segundo plano.
*   **Cinzento-Antracite (`#1A1A1A`):**
    *   *Função:* Tipografia Principal.
    *   *Uso:* Texto de corpo, diálogos e descrições técnicas. Garante conformidade com a norma WCAG AAA de contraste sobre o creme mate, evitando o aspeto agressivo do preto puro (`#000000`).

### B. Cores de Feedback Dinâmico (Quizzes)

*   **Sucesso (Resposta Correta):** Fundo Verde Suave (`#E8F5E9`) com texto em Verde Sólido (`#166534`) e ícone de visto (✔️).
*   **Erro (Resposta Incorreta/Conserto):** Fundo Vermelho Suave (`#FEF2F2`) com texto em Vermelho Sólido (`#991B1B`) e ícone de visto ou cruz (❌).

---

## 🔤 2. Tipografia Otimizada para Ecrãs Pequenos

O videojogo suporta 12 idiomas, o que exige fontes que ocupem pouco espaço físico (evitando quebras de linha que empurrem elementos para fora do ecrã) e que sejam instantaneamente legíveis:

*   **Fonte de Títulos e Botões:** **Montserrat** (ou Sans-Serif equivalente de alta legibilidade). Utilizada em maiúsculas (`text-transform: uppercase`), em negrito (`font-weight: 700`), proporcionando clareza e autoridade.
*   **Fonte de Corpo e Listas:** **Roboto** (ou Sans-Serif neutra compacta). Sendo uma fonte geométrica com largura de caractere condensada, ela otimiza o espaço horizontal nas telas verticais de smartphones e mantém excelente inteligibilidade mesmo em tamanhos pequenos.
*   **Escala Dinâmica (`--scale-factor`):** Injeção de escala responsiva via CSS baseada na largura do ecrã, garantindo que em dispositivos muito pequenos (<360px) as fontes encolham proporcionalmente para salvaguardar a legibilidade e o alinhamento.

---

## 📐 3. Arquitetura das Barras (Top Bar & Bottom Bar) de Produção

As barras do topo e de rodapé servem como moldura física do videojogo, fornecendo controlo de contexto e navegação estável. Toda a instrumentação do modo "Designer" é completamente purgada nesta versão.

```
+-------------------------------------------------------------+
| [RENOVATE Logo]  Serious Game  v1.0.4        [PT/EN]  [🔊] | <-- TOP BAR (Ouro)
+-------------------------------------------------------------+
|                                                             |
|                      ÁREA DE JOGO (9:16)                    |
|                (Cards Creme Mate sobre Vinha)               |
|                                                             |
+-------------------------------------------------------------+
| [◀ BACK]             Screen X of 157               [NEXT ▶] | <-- BOTTOM BAR (Verde)
+-------------------------------------------------------------+
```

### A. Barra Superior (Top Bar) — A Barra de Marca e Definições
*   **Estilo:** Fundo sólido a **Amarelo-Ouro (`#FFCC66`)** com uma linha de contorno inferior fina de 1.5px em **Verde-Floresta (`#1E4222`)**.
*   **Elementos Esquerda:** Logótipo oficial vetorial do RENOVATE (`RENOVATE-logo.svg`), seguido do título do jogo *"Serious Game RENOVATE"* e do badge discreto de versão (`v1.0.4`).
*   **Elementos Direita:**
    *   **Dropdown de Idiomas (`#lang-select`):** Caixa de seleção minimalista com fundo branco e cantos ligeiramente arredondados (3px).
    *   **Botão de Áudio Mute/Unmute (`#nav-mute`):** Botão circular flutuante que exibe os ícones Lucide `volume-2` (som ativo) ou `volume-x` (som mutado). Permite mutar síncronamente os efeitos sonoros procedurais gerados pelo motor Web Audio API.

### B. Barra Inferior (Bottom Bar) — O Centro de Navegação e Progresso
*   **Estilo:** Fundo sólido a **Verde-Floresta (`#1E4222`)** com contorno superior em **Amarelo-Ouro (`#FFCC66`)**.
*   **Elementos de Navegação Uniformizados (Instintivos e Claros):**
    *   **Botão BACK (`#nav-back`):** Alinhado à esquerda. Estilo retangular elegante com preenchimento a Amarelo-Ouro, cantos arredondados (`border-radius: 8px`) e o texto explícito: **`◀ BACK`**.
    *   **Botão NEXT (`#nav-next`):** Alinhado à direita. Idêntico em estilo e dimensões ao BACK, exibindo o texto explícito: **`NEXT ▶`**.
    *   **Ergonomia Tátil (Norma WCAG 2.1 AAA):** Área de clique de ambos os botões trancada com altura mínima de **48px** e espaçamento generoso para cliques sem fricção no telemóvel de campo.
*   **Elemento Central de Progresso:**
    *   Exibe no topo o contador digital de telas: **`Screen X of 157`** (em Montserrat, cor creme).
    *   Exibe logo abaixo, em tipo mais pequeno e dourado, o nome do capítulo ou etapa pedagógica ativa.
*   **Regra dos Quizzes (Estado Visível mas Desativado):**
    *   Durante as telas de Quiz ativas, os botões **BACK** e **NEXT** permanecem **sempre visíveis** para manter a estabilidade da moldura.
    *   Contudo, ambos os botões adquirem o estado `disabled` via JS, aplicando uma opacidade de **35%**, desativação do cursor (`pointer-events: none`) e escala de cinzentos total (`filter: grayscale(1)`). O botão NEXT só recupera a opacidade e reatividade normais quando o utilizador selecionar e submeter a sua resposta.

---

## 📱 4. Regras de Posicionamento Absoluto e Responsividade

Para erradicar de vez as anomalias visuais onde os balões e caixas caem desordenadamente no fundo do ecrã, o motor de renderização adota as seguintes regras de engenharia:

1.  **Posicionamento Absoluto Estrito:** Todos os cartões flutuantes, balões da Mia e da Laura, e caixas de alerta utilizam `position: absolute` em relação ao contentor principal `#game-container`.
2.  **Dicionário de Coordenadas Único (`INITIAL_UI_COORDINATES_MAP`):**
    *   O dicionário estático no próprio ficheiro `app.js` é a única e irrevogável fonte de verdade para o posicionamento.
    *   Todas as coordenadas são declaradas em **percentagem (`%`)** para garantir consistência perfeita em qualquer rácio de ecrã (ex: `left: 8%; top: 15%; width: 44%;`).
    *   Qualquer leitura ou escrita no `localStorage` para coordenadas personalizadas é removida, garantindo que o videojogo corre de forma leve e estática.
3.  **Teto Máximo para Desktop:** Para evitar que o smartphone virtual apareça "gigante" num monitor panorâmico de PC, o `#game-container` aplica um teto físico de altura máxima de **820px** e largura proporcional baseada em `9/16`, centrando-se no ecrã com uma sombra 3D profunda. Em smartphones reais, estende-se de forma fluida a 100%.

---

## 🌾 5. Especificações Especiais do Ecrã 24 (Transição para o Módulo 2)

O Ecrã 24 marca o arranque prático do videojogo e deve ser renderizado com as seguintes especificações de usabilidade:

*   **Título:** *"Why calibration matters"* (Montserrat All-Caps, Verde).
*   **Layout de Scroll Vertical Suave (Móvel):** Devido ao espaço vertical limitado do rácio 9:16 nos smartphones, as listas de **Benefícios** e de **Consequências** serão organizadas verticalmente. O utilizador pode fazer um scroll vertical suave e ergonómico dentro do contentor para ler os tópicos sem que o texto se sobreponha.
*   **Os Conteúdos Oficiais (Dicionário de Tradução):**
    *   *Benefícios (Esquerda/Topo):* "Effective pest control", "Cost savings", "Environmental protection" com os respetivos ícones e descrições do Excel.
    *   *Consequências (Direita/Fundo):* "Poor efficacy", "Wastage of resources", "Environmental harm" com os ícones de perigo correspondentes.
    *   *Dica de Rodapé (Mia's Tip):* Cartão de realce amarelo no fundo incentivando à calibração prática.

---

## 🕵️‍♂️ 6. Diretivas de Limpeza para a IDE Google Antigravity

Para libertar a aplicação de código legado e otimizar o PWA offline, a IDE deve expurgar:
1.  **No `app.js`:** As funções `setupDesignerModeControls`, `saveCustomCoordinatesLocally`, `loadCustomCoordinates`, `showDesignerToast` e `initDebugHUD`.
2.  **No `styles.css`:** Todas as regras da toolbar do Designer, botões de toggle e o contorno a tracejado `.designer-element-active`.
3.  **No HTML de Marcação:** A classe `designer-target` e quaisquer referências locais à porta 3000 de sincronização.
