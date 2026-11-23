// --- VARIÁVEIS GLOBAIS DE CONTROLE PTP ---

const LINKS_PTP = [
    "https://www.rotate4all.com/ptp/promote-295036",
    "https://adnade.net/ptp/?user=pejotta&subid=blogueiros",
    "https://traffic2bitcoin.com/ptp2.php?ref=pejottatg",
    "https://www.topcliques.com.br/ppl.php?id=TOP498326571",
    "https://ptc.top.app.br/tb.php?id=XFF799FF9",
    "https://www.siteview.com.br/mega.php?id=SVDFA37027",
];

let indiceAtualDoLink = 0;
let countdownInterval; // Variável para gerenciar o contador regressivo

// ------------------------------------------------------------------
// --- FUNÇÃO AUXILIAR DE DIMENSÃO (80% DA TELA EM ESCALA 16:9) ---
// ------------------------------------------------------------------

function aplicarEscalaResponsivaModal() {
    const modalConteudo = document.querySelector("#minhaModal .modal-conteudo");
    const adFrame = document.getElementById("ad-frame");

    // Calcula 80% da largura e altura visíveis da janela
    const larguraAlvo = Math.floor(window.innerWidth * 0.8);
    const alturaMaxima = Math.floor(window.innerHeight * 0.8);

    // Calcula a altura correspondente em proporção 16:9
    let altura16x9 = Math.round((larguraAlvo * 9) / 16);
    let larguraFinal = larguraAlvo;

    // Se a altura 16:9 ultrapassar 80% da altura da tela, ajusta pela altura mantendo 16:9
    if (altura16x9 > alturaMaxima) {
        altura16x9 = alturaMaxima;
        larguraFinal = Math.round((altura16x9 * 16) / 9);
    }

    if (modalConteudo) {
        modalConteudo.style.width = larguraFinal + "px";
        modalConteudo.style.maxWidth = "95vw";
        modalConteudo.style.maxHeight = "90vh";
        modalConteudo.style.overflowY = "auto";
        modalConteudo.style.boxSizing = "border-box";
        modalConteudo.style.display = "flex";
        modalConteudo.style.flexDirection = "column";
    }

    if (adFrame) {
        adFrame.style.width = "100%";
        adFrame.style.flex = "1 1 auto";
        adFrame.style.minHeight = "220px";
        adFrame.style.maxHeight = Math.max(220, altura16x9 - 70) + "px";
        adFrame.style.maxWidth = "100%";
    }
}

// Reajusta automaticamente se o usuário redimensionar a janela enquanto a modal estiver aberta
window.addEventListener("resize", () => {
    const modal = document.getElementById("minhaModal");
    if (modal && modal.style.display !== "none" && modal.style.display !== "") {
        aplicarEscalaResponsivaModal();
    }
});

// ------------------------------------------------------------------
// --- FUNÇÕES DE CONTROLE DE ESTADO (Fechar e Liberar) ---
// ------------------------------------------------------------------

function fecharModal() {
    // 1. Para o contador, caso o usuário feche manualmente
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // 2. Esconde a modal e limpa o iframe
    const modal = document.getElementById("minhaModal");
    const adFrame = document.getElementById("ad-frame");
    const codigoBox = document.getElementById("codigoDaFerramenta");

    if (modal) modal.style.display = "none";
    if (adFrame) {
        adFrame.src = "";
        adFrame.style.display = "block";
    }
    if (codigoBox) codigoBox.style.display = "none";
}

function liberarCodigo() {
    // 1. Limpa o contador
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    // 2. Oculta o iframe e mostra a área de liberação
    const adFrame = document.getElementById("ad-frame");
    const codigoBox = document.getElementById("codigoDaFerramenta");

    if (adFrame) adFrame.style.display = "none";
    if (codigoBox) codigoBox.style.display = "block";

    // 3. Atualiza ou oculta o display do timer após liberar
    const displayElement = document.getElementById("countdownDisplay");
    if (displayElement) {
        displayElement.textContent = "0s";
    }
}

// ------------------------------------------------------------------
// --- FUNÇÃO PRINCIPAL: ABRE MODAL COM CONTADOR E RODÍZIO ---
// ------------------------------------------------------------------

function abrirModal() {
    const modal = document.getElementById("minhaModal");
    const adFrame = document.getElementById("ad-frame");
    const codigoBox = document.getElementById("codigoDaFerramenta");

    if (!modal || !adFrame) return;

    // 1. LÓGICA DE ALTERNÂNCIA (Rodízio de Links)
    const linkParaUsar = LINKS_PTP[indiceAtualDoLink];
    indiceAtualDoLink = (indiceAtualDoLink + 1) % LINKS_PTP.length;

    // 2. PREPARAÇÃO DA MODAL E ESCALA 80% (16:9)
    adFrame.style.display = "block";
    if (codigoBox) codigoBox.style.display = "none";
    modal.style.display = "flex";
    aplicarEscalaResponsivaModal();

    // 3. INICIA O CONTADOR VISUAL
    const displayElement = document.getElementById("countdownDisplay");
    let timer = 15;

    if (displayElement) {
        displayElement.textContent = timer + "s";
        displayElement.style.display = "inline-flex";
    }

    adFrame.src = linkParaUsar;

    // 4. INICIA A CONTAGEM REGRESSIVA (Intervalo)
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        timer--;

        if (displayElement) {
            displayElement.textContent = Math.max(0, timer) + "s";
        }

        if (timer <= 0) {
            clearInterval(countdownInterval);
            liberarCodigo();
        }
    }, 1000);
}

// ------------------------------------------------------------------
// --- FUNÇÃO AUXILIAR: COPIAR CÓDIGO DA CAIXA DE TEXTO ---
// ------------------------------------------------------------------

function copiarCodigoFerramenta(btnElement) {
    const textarea = document.querySelector("#codigoDaFerramenta textarea");
    if (!textarea) return;

    const textoParaCopiar = textarea.value;
    const textoOriginal = btnElement ? btnElement.textContent : "Copiar Código";

    const mostrarFeedback = (mensagem) => {
        if (!btnElement) return;
        btnElement.textContent = mensagem;
        setTimeout(() => {
            btnElement.textContent = textoOriginal;
        }, 1800);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textoParaCopiar)
            .then(() => mostrarFeedback("Copiado!"))
            .catch(() => copiarComFallback(textarea, mostrarFeedback));
    } else {
        copiarComFallback(textarea, mostrarFeedback);
    }
}

function copiarComFallback(textarea, mostrarFeedback) {
    try {
        textarea.focus();
        textarea.select();
        const sucesso = document.execCommand("copy");
        mostrarFeedback(sucesso ? "Copiado!" : "Falhou ao copiar");
    } catch (erro) {
        mostrarFeedback("Selecione e use Ctrl+C");
    }
}
