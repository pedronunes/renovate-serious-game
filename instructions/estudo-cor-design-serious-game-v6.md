# 🎨 RENOVATE Serious Game: Estudo de Cor, Design de Interface (UI/UX), Diretrizes de Usabilidade PWA, Biblioteca de Templates e Governação de Código

Este documento serve como o **Guia de Design de Interface (UI/UX)**, **Estudo de Cores**, **Directrizes Técnicas de Acessibilidade**, **Biblioteca de Templates de Componentes** e **Protocolo de Governação de Código** para o videojogo pedagógico do projeto europeu **RENOVATE**. O seu objetivo é orientar o agente de IA do **Google Antigravity** e os programadores na replicação exata e otimizada do mockup físico (`Calibration_Serious-Game_v-final.pdf`) num formato de aplicação web progressiva (PWA) de alta fidelidade, moderna, minimalista, responsiva e adaptada para múltiplos dispositivos.

---

## 🎨 1. Estudo Cromático e Acessibilidade (WCAG 2.1 AAA)

Para garantir uma interface inovadora, limpa e que possa ser facilmente lida no campo sob luz solar direta (uso real de operadores agrícolas), a paleta cromática foi estruturada com base num alto rácio de contraste e no ADN estético do projeto:

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
*   **Erro (Resposta Incorreta/Conserto):** Fundo Vermelho Suave (`#FEF2F2`) com texto em Vermelho Sólido (`#991B1B`) e ícone de cruz (❌).

---

## 🔤 2. Tipografia Otimizada para Ecrãs Pequenos

O videojogo suporta 12 idiomas, o que exige fontes que ocupem pouco espaço físico (evitando quebras de linha que empurrem elementos para fora do ecrã) e que sejam instantaneamente legíveis:

*   **Fonte de Títulos e Botões:** **Montserrat** (ou Sans-Serif equivalente de alta legibilidade). Utilizada em maiúsculas (`text-transform: uppercase`), em negrito (`font-weight: 700`), proporcionando clareza e autoridade.
*   **Fonte de Corpo e Listas:** **Roboto** (ou Sans-Serif neutra compacta). Sendo uma fonte geométrica com largura de caractere condensada, ela otimiza o espaço horizontal nas telas verticais de smartphones e mantém excelente inteligibilidade mesmo em tamanhos pequenos.
*   **Escala Dinâmica (`--scale-factor`):** Injeção de escala responsiva via CSS baseada na largura do ecrã, garantindo que em dispositivos muito pequenos (<360px) as fontes encolham proporcionalmente para salvaguardar a legibilidade e o alinhamento.

---

## 📐 3. Condições de Responsividade e Enquadramento Trancadas (v2.3.0)

As regras de layout e viewport foram rigorosamente validadas e estão trancadas para garantir consistência multiplataforma estrita:

```
+-------------------------------------------------------------+
| [RENOVATE Logo]  Serious Game  v2.3.0        [PT/EN]  [🔊] | <-- TOP BAR (Ouro)
+-------------------------------------------------------------+
|                                                             |
|                      ÁREA DE JOGO (9:16)                    |
|                (Cards Creme Mate sobre Vinha)               |
|                                                             |
+-------------------------------------------------------------+
| [◀ BACK]             Screen X of 157               [NEXT ▶] | <-- BOTTOM BAR (Verde)
+-------------------------------------------------------------+
```

### 🖥️ A. Modo Computador / Desktop (Landscape) - Proporção Estrita 9:16
- **Dimensões do Container:** O `#game-container` ocupa exatamente **100% da altura física útil da janela (`100vh`)** para eliminar quaisquer margens pretas de topo ou rodapé, e a largura é travada na proporção vertical estrita de **9:16** (`calc(100vh * 9 / 16)`) para total fidelidade com os ecrais originais de smartphones.
- **Fundo Temático Lateral:** Fora da área útil do jogo, o browser exibe um fundo dinâmico desfocado (`body::before` com `background-image: url('public/images/SeriousGame_tela-Simples.jpg')`, `filter: blur(15px) brightness(0.4)`) que confere uma imersão de alta qualidade visual.
- **Cálculo da Escala (`--scale-factor`):** O JavaScript mede a largura real (`container.clientWidth || 420`) e calcula o fator de escala dinamicamente:
  `scaleFactor = Math.min(1.25, Math.max(0.80, currentWidth / 420));`
  Todas as fontes, preenchimentos, botões e cartões creme respondem fluidamente a esta variável de escala no CSS.
- **Não Distorção de Imagens:** As ilustrações e fotos de fundo usam `background-size: cover; background-position: center; background-repeat: no-repeat;` para preencher o container sem distorcer fardas ou rostos.

### 📱 B. Modo Tablet (Portrait) - Enquadramento Intermédio
- **Dimensões do Container:** Em tablets no modo vertical (largura entre `768px` e `1023px`), o contêiner expande-se a **`100vw` de largura** e a altura ajusta-se dinamicamente com base na variável `--real-vh`.
- **Fator de Escala:** Calcula a proporção baseada na largura dividida por 420 (truncada em `1.25`), garantindo que os cartões e caixas de diálogo tiram proveito da largura acrescida do ecrã sem prejudicar a leitura nítida das fontes.

### 📱 C. Modo Smartphone (Ecrã Estreito / Vertical / PWA)
- **Viewport Real Sem Saltos:** Para contornar a anomalia do Safari móvel (iOS) e Chrome móvel (Android) onde as barras de navegação do browser alteram constantemente a altura da tela, o JS calcula `window.innerHeight * 0.01` e injeta-o na variável CSS `--real-vh`, garantindo que o jogo ocupa sempre 100% da área útil real sem saltar elementos.
- **Ergonomia de Toque (WCAG 2.1 AAA):** Os botões `◀ BACK` e `NEXT ▶` possuem uma área tátil mínima garantida de **48px** e um preenchimento adaptativo de `calc(92px * var(--scale-factor))`. A propriedade `touch-action: manipulation` elimina o delay de toque nativo de 300ms nos smartphones.
- **Seletor de Idiomas Inteligente:** Em ecrãs estreitos (`<= 480px`), as opções de tradução são abreviadas automaticamente para os códigos ISO/BCP-47 compactos (PT, EN, FR, DE, ES, IT) para evitar sobreposições de elementos na barra superior.

---

## 🔒 4. Bloqueio de Orientação de Ecrã (Mobile Landscape Lock)

O videojogo foi projetado estritamente para orientação vertical (retrato). Para prevenir desalinhamentos quando um utilizador de smartphone roda acidentalmente o ecrã para o formato horizontal, o sistema possui um ecrã de bloqueio e advertência estético:

- **Funcionamento:** Se um smartphone ou tablet (ecrã de toque `< 1024px`) detetar que a largura é superior à altura (`w > h`), o jogo é ocultado e uma sobreposição opaca com fundo verde-floresta (`#1E4222`) e uma animação suave de rotação de dispositivo é exibida centralizada, indicando que o formando deve voltar a colocar o dispositivo na vertical.

---

## ✨ 5. Animações e Transições Fluídas e Atraentes

Para elevar o serious game ao patamar de uma aplicação móvel nativa de categoria premium, as transições visuais devem ocorrer de forma suave, natural e apelativa:

*   **Transição de Diálogos e Cartões (Fade-In & Slide-Up):**
    Sempre que o utilizador avança de ecrã ou um novo balão de fala é renderizado, o elemento não aparece bruscamente. Aplica-se uma animação com uma curva de velocidade cúbica (cubic-bezier) de **300ms** que faz o cartão desvanecer do fundo e deslizar ligeiramente para cima (de `opacity: 0; transform: translateY(12px)` para `opacity: 1; transform: translateY(0)`), criando um efeito muito fluido e agradável para a vista.
*   **Transição de feedback nos Quizzes:**
    Quando o utilizador submete uma resposta, a caixa de feedback verde (sucesso) ou vermelha (erro) expande-se suavemente a partir do topo do seu contêiner, utilizando transições de altura e opacidade coordenadas.

---

## 🔊 6. Padrão Estético de Efeitos Sonoros (Web Audio API)

O motor de som do videojogo gera efeitos de forma puramente procedural através da Web Audio API do browser, garantindo que o jogo permaneça leve e funcione offline sem descarregar ficheiros de áudio pesados. Para manter a sofisticação e evitar fadiga acústica no formando, os sons devem seguir rigorosamente estes padrões estéticos:

*   **A. Clique de Botão Normal (Woodblock/Wooden Click):**
    *   *Descrição:* Um som orgânico, seco e rápido, simulando o bater de um bloco de madeira.
    *   *Implementação Teórica:* Uma onda sinusoidal rápida com frequência de **1200Hz**, um envelope de amplitude com ataque imediato (0.002s) e decaimento extremamente curto (**0.05s**), criando um "toque" limpo.
*   **B. Resposta Correta nos Quizzes (Harp Chord / Ascending Arpeggio):**
    *   *Descrição:* Um acorde harmonioso e ascendente, evocando o som de uma harpa, que transmite satisfação e sucesso imediato.
    *   *Implementação Teórica:* Reprodução síncrona ou em arpejo rápido de três notas consonantes em onda triangular (ex: C5 [523.25Hz], E5 [659.25Hz], G5 [783.99Hz] e C6 [1046.50Hz]), com envelope de ataque suave (0.05s) e decaimento de 0.6s.
*   **C. Resposta Incorreta / EPI Incorreto (Dull Metallic Buzz):**
    *   *Descrição:* Um tom mecânico baixo, ligeiramente discordante, que alerta o utilizador para o erro de forma suave, sem ser punitivo ou estridente.
    *   *Implementação Teórica:* Combinação de duas ondas dente de serra em frequências baixas e ligeiramente desafinadas (ex: 150Hz e 153Hz) com decaimento rápido (0.3s) e um filtro passa-baixo aplicado a 400Hz para abafar o tom.
*   **D. Cronómetro e Alertas de Calibração (Metallic Clock Tick):**
    *   *Descrição:* Um tique-taque mecânico, metálico e regular para criar foco no tempo, assemelhando-se ao mecanismo de um cronómetro de precisão.
    *   *Implementação Teórica:* Um impulso de ruído branco filtrado com passa-banda extremamente estreito centrado em **3000Hz**, com decaimento ultra-rápido (**0.01s**), reproduzido a intervalos compassados de 1 segundo.

---

## 🔧 7. Ferramentas de Desenvolvimento (Apenas Localhost)

Para permitir afinações visuais rápidas e precisas sem edição manual de código, o videojogo prevê ferramentas de calibração interativa visíveis unicamente em desenvolvimento (`localhost`):

1.  **Botão "Design" (Proposta de Interface):** Ao clicar no botão "Design" na Top Bar, a aplicação entra em modo de edição visual de ecrãs.
2.  **Painel de Controlo Exterior (DOM Externo):**
    *   Para manter o ecrã do jogo 100% livre de poluição visual, o painel de controlo é injetado diretamente no `<body>`, flutuando na parte exterior do jogo (`position: fixed; right: 20px; width: 330px;`).
    *   O painel exibe uma caixa de texto (`<textarea>`) com o bloco JSON de coordenadas da tela activa atualizado em tempo real à medida que os elementos são arrastados.
    *   **Cópia Rápida:** Botão para copiar instantaneamente o JSON para a área de transferência do programador.
    *   **Gravação Direta no Código (Auto-Save):** Botão que envia um pedido POST para o servidor de desenvolvimento (`/api/save-coordinates`), reescrevendo de forma autónoma o dicionário `INITIAL_UI_COORDINATES_MAP` no ficheiro físico `app.js` no disco rígido.

*(Nota: Esta ferramenta de drag & drop e auto-save local é uma funcionalidade utilitária de desenvolvimento e não faz parte da experiência final do utilizador final na PWA de produção.)*

---

## 🧱 8. Biblioteca de Templates de Componentes (Aprovados e Trancados)

Para otimizar o desenvolvimento futuro e evitar que o Antigravity programe elementos do zero, estabelecemos aqui as especificações estéticas e os padrões de código (HTML/CSS) de cada bloco de construção aprovado. O Antigravity deve ler e replicar estes templates cirurgicamente.

### 💬 Template A: Balão de Diálogo de Personagem (`.speech-bubble`)
Utilizado para Mia ou Laura nas telas narrativas. O balão é perfeitamente opaco, possui contorno fino e cantos arredondados, e uma cauda que aponta para o rosto da respetiva personagem.

```html
<!-- Exemplo de Estrutura HTML -->
<div id="el-dialog-mia" class="speech-bubble dialog-mia" style="position: absolute; left: 8%; top: 15%; width: 44%;">
  <div class="dialog-character-name">Mia</div>
  <div class="dialog-text">Olá! Eu sou a Mia e vou guiar-te na calibração!</div>
</div>
```

```css
/* Especificação de Estilos CSS no styles.css */
.speech-bubble {
  background-color: #F7F7F2 !important; /* Creme Mate Opaco */
  border: 1.5px solid #1E4222 !important; /* Verde Primário */
  border-radius: calc(14px * var(--scale-factor, 1)) !important;
  padding: calc(14px * var(--scale-factor, 1)) !important;
  color: #1A1A1A !important; /* Cinzento-Antracite WCAG AAA */
  font-family: 'Roboto', sans-serif !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important;
  position: absolute;
  z-index: 50;
  box-sizing: border-box;
  
  /* Animação Suave de Entrada */
  opacity: 0;
  transform: translateY(10px);
  animation: slideInDialog 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.dialog-character-name {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: calc(11px * var(--scale-factor, 1)) !important;
  color: #1E4222 !important; /* Verde */
  margin-bottom: calc(4px * var(--scale-factor, 1)) !important;
  letter-spacing: 0.5px;
}

.dialog-text {
  font-size: calc(14px * var(--scale-factor, 1)) !important;
  line-height: 1.35 !important;
}

/* Caudas Direcionais CSS do Balão */
.speech-bubble::after {
  content: "";
  position: absolute;
  border-style: solid;
  display: block;
  width: 0;
  z-index: 51;
}
.speech-bubble::before {
  content: "";
  position: absolute;
  border-style: solid;
  display: block;
  width: 0;
  z-index: 50;
}

/* Cauda Virada à Esquerda (Mia - esquerda do ecrã) */
.dialog-mia::after {
  top: 50%; left: -10px; transform: translateY(-50%);
  border-width: 8px 10px 8px 0;
  border-color: transparent #F7F7F2 transparent transparent;
}
.dialog-mia::before {
  top: 50%; left: -12px; transform: translateY(-50%);
  border-width: 9px 12px 9px 0;
  border-color: transparent #1E4222 transparent transparent;
}

/* Cauda Virada à Direita (Laura - direita do ecrã) */
.dialog-laura::after {
  top: 50%; right: -10px; transform: translateY(-50%);
  border-width: 8px 0 8px 10px;
  border-color: transparent transparent transparent #F7F7F2;
}
.dialog-laura::before {
  top: 50%; right: -12px; transform: translateY(-50%);
  border-width: 9px 0 9px 12px;
  border-color: transparent transparent transparent #1E4222;
}

@keyframes slideInDialog {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 🗂️ Template B: Card de Conteúdo ou Opção de Quiz (`.cream-card` / `.quiz-option-card`)
Utilizado para exibir blocos explicativos ou botões de seleção de resposta do formando nos Quizzes do Módulo 1.

```html
<!-- Exemplo de Card de Opção do Quiz -->
<button id="el-option-A" class="quiz-option-card" style="position: absolute; left: 8%; top: 45%; width: 84%;">
  <span class="option-letter">A</span>
  <span class="option-text">Utilizar Equipamentos de Proteção Individual (EPI) completos.</span>
</button>
```

```css
/* Especificação de Estilos CSS no styles.css */
.cream-card {
  background-color: #F7F7F2 !important;
  border: 1.5px solid #1E4222 !important;
  border-radius: calc(16px * var(--scale-factor, 1)) !important;
  padding: calc(16px * var(--scale-factor, 1)) !important;
  color: #1A1A1A !important;
  font-family: 'Roboto', sans-serif !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
  box-sizing: border-box;
}

.quiz-option-card {
  display: flex !important;
  align-items: center !important;
  background-color: #F7F7F2 !important;
  border: 1.5px solid #1E4222 !important;
  border-radius: calc(12px * var(--scale-factor, 1)) !important;
  padding: calc(12px * var(--scale-factor, 1)) calc(16px * var(--scale-factor, 1)) !important;
  text-align: left !important;
  width: 100% !important;
  box-shadow: 0 3px 8px rgba(0,0,0,0.08) !important;
  cursor: pointer !important;
  transition: transform 0.15s, background-color 0.2s, border-color 0.2s !important;
  box-sizing: border-box;
}

/* Efeito de Toque / Hover Atraente e Suave */
.quiz-option-card:active {
  transform: scale(0.97) !important;
}

.option-letter {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  font-size: calc(14px * var(--scale-factor, 1)) !important;
  background-color: #FFCC66 !important; /* Amarelo-ouro */
  color: #1E4222 !important; /* Verde */
  width: calc(28px * var(--scale-factor, 1)) !important;
  height: calc(28px * var(--scale-factor, 1)) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 50% !important;
  margin-right: calc(12px * var(--scale-factor, 1)) !important;
  flex-shrink: 0 !important;
}

.option-text {
  font-family: 'Roboto', sans-serif !important;
  font-size: calc(13.5px * var(--scale-factor, 1)) !important;
  color: #1A1A1A !important;
  line-height: 1.3 !important;
}
```

### 🚫 Template C: Ecrã de Bloqueio de Orientação Móvel (`#orientation-blocker`)
Injetado dinamicamente no DOM externo da aplicação para alertar e bloquear o jogo quando usado em modo paisagem num smartphone.

```html
<div id="orientation-blocker">
  <div class="blocker-content">
    <div class="rotate-icon">📱🔄</div>
    <h2>Por favor, rode o seu dispositivo</h2>
    <p>O Serious Game RENOVATE corre exclusivamente na orientação vertical para garantir a melhor experiência pedagógica.</p>
  </div>
</div>
```

```css
#orientation-blocker {
  display: none;
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: #1E4222 !important; /* Verde Primário */
  color: #F7F7F2 !important;
  z-index: 100000;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

#orientation-blocker h2 {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FFCC66; /* Amarelo-ouro */
  margin: 16px 0 8px 0;
}

#orientation-blocker p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.05rem;
  line-height: 1.4;
  max-width: 480px;
  opacity: 0.9;
}

.rotate-icon {
  font-size: 4rem;
  animation: spinDevice 2s infinite ease-in-out;
}

/* Regra CSS para Exibir o Bloqueador Apenas em Smartphones e Tablets Horizontais */
@media (orientation: landscape) and (max-width: 1023px) {
  #orientation-blocker {
    display: flex !important;
  }
}

@keyframes spinDevice {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-90deg); }
}
```

---

## 🌾 9. Especificações Especiais do Ecrã 24 (Transição para o Módulo 2)

O Ecrã 24 marca o arranque prático do videojogo e deve ser renderizado com as seguintes especificações de usabilidade:

*   **Título:** *\"Why calibration matters\"* (Montserrat All-Caps, Verde).
*   **Layout de Scroll Vertical Suave (Móvel):** Devido ao espaço vertical limitado do rácio 9:16 nos smartphones, as listas de **Benefícios** e de **Consequências** serão organizadas verticalmente. O utilizador pode fazer um scroll vertical suave e ergonómico dentro do contentor para ler os tópicos sem que o texto se sobreponha.
*   **Os Conteúdos Oficiais (Dicionário de Tradução):**
    *   *Benefícios (Esquerda/Topo):* \"Effective pest control\", \"Cost savings\", \"Environmental protection\" com os respetivos ícones e descrições do Excel.
    *   *Consequências (Direita/Fundo):* \"Poor efficacy\", \"Wastage of resources\", \"Environmental harm\" com os ícones de perigo correspondentes.
    *   *Dica de Rodapé (Mia's Tip):* Cartão de realce amarelo no fundo incentivando à calibração prática.

---

## 🛡️ 10. Protocolo de Alterações Cirúrgicas, Bloqueio e Aprovação (Locking & Quality Gate)

Para assegurar estabilidade a longo prazo e evitar regressões estéticas ou quebras de layout nas dezenas de ecrãs já desenvolvidos, o Google Antigravity e qualquer programador devem seguir estritamente o seguinte protocolo de governação de código:

### A. Princípio do Escopo Cirúrgico Estrito (Surgical Scoping Rule)
*   Sempre que for solicitada uma alteração, correção ou adição de um elemento ou situação, **a alteração do código deve ser restrita única e exclusivamente a essa situação ou elemento em concreto**.
*   Fica terminantemente proibido reescrever funções globais ou modificar layouts de outros ecrãs não relacionados sem autorização explícita.
*   A integridade visual e funcional dos restantes 157 ecrãs do videojogo deve ser mantida a 100%.

### B. Protocolo de Aprovação de Alterações (Approval Flow)
1.  **Fase de Implementação:** O programador ou agente de IA aplica a alteração solicitada estritamente no escopo definido.
2.  **Fase de Demonstração:** No final da implementação, o agente de IA **deve apresentar o relatório e solicitar formalmente a aprovação do utilizador** para a alteração efetuada.
3.  **Fase de Trancamento (Locking):**
    *   Se o utilizador **aprovar** a alteração (ex: *\"Aprovado\"*, *\"Sim, está ótimo\"*), as coordenadas e estilos desse elemento ou situação ficam **estritamente trancados**.
    *   A partir do momento da aprovação, **não são permitidas mais alterações nesse elemento ou situação** em interações futuras.
    *   Caso seja estritamente necessário efctuar uma modificação posterior num elemento já aprovado, o programador ou agente de IA **deve pedir autorização prévia por escrito** ao utilizador no chat.
    *   Mesmo após nova autorização, **a alteração deve produzir exatamente o mesmo resultado estético e visual** que foi anteriormente aprovado, sem desalinhar ou quebrar a proporção ergonómica.

### C. Registo Formal de Elementos Trancados e Validações Pendentes (Registry)
Abaixo encontra-se a tabela mestre de controlo de alterações. **Atualmente, todos os elementos encontram-se em estado de "Pending Validation" (Pendente de Validação)**. O bloqueio oficial ("🔒 Locked") só ocorrerá quando o utilizador validar explicitamente o elemento no localhost e der o seu acordo no chat.

| ID Componente | Descrição do Elemento / Situação | Data de Registo | Estado de Calibração |
| :--- | :--- | :--- | :--- |
| **Top Bar** | Barra Amarelo-Ouro, logótipo 28px, título à esquerda e seletor compacto móvel [Secção 3.A] | 26.08.2026 | ⏳ **Pending Validation** |
| **Bottom Bar** | Barra Verde-Floresta, contador digital \"Screen X of 157\", botões Montserrat 48px [Secção 3.B] | 26.08.2026 | ⏳ **Pending Validation** |
| **Ecrã 23 Balões** | Coordenadas estritas em `%` dos balões de Mia e Laura no ecrã narrativo 23 | 26.08.2026 | ⏳ **Pending Validation** |
| **Ecrã 24 Layout** | Scroll vertical suave, colunas de Benefícios/Consequências e Mia's Tip | 26.08.2026 | ⏳ **Pending Validation** |
| **PC Viewport** | Altura total 100vh com largura proporcional estrita 9:16 e desfoque lateral | 26.08.2026 | ⏳ **Pending Validation** |
| **Mobile Lock** | Bloqueador de orientação horizontal com animação de rotação [Secção 4] | 26.08.2026 | ⏳ **Pending Validation** |
| **Transitions** | Efeito de desvanecimento e subida linear (Fade & Slide-Up 300ms) [Secção 5] | 26.08.2026 | ⏳ **Pending Validation** |
| **Audio Pattern** | Padrão estético de efeitos sonoros procedurais (clicks, harpa, metal) [Secção 6] | 26.08.2026 | ⏳ **Pending Validation** |
| **Módulo 2 Simulator** | Simulador de Velocidade e Calibração Agrícola | -- | ⏳ **Pending Specification** |
