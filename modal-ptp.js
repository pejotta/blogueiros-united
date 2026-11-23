// --- VARIÁVEIS GLOBAIS DE CONTROLE PTP ---

const TEMPO_TIMER_SEGUNDOS = 600; // <-- MUDE AQUI O TEMPO DO CONTADOR (em segundos)

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
// --- FUNÇÃO AUXILIAR: COPIAR CÓDIGO DA CAIXA DE TEXTO (NO TOPO) ---
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

window.copiarCodigoFerramenta = copiarCodigoFerramenta;

// ------------------------------------------------------------------
// --- FUNÇÃO AUXILIAR DE DIMENSÃO (MODAL 90% TELA | PTP 80% MODAL) ---
// ------------------------------------------------------------------

function aplicarEscalaResponsivaModal() {
    const modalConteudo = document.querySelector("#minhaModal .modal-conteudo");
    const adFrame = document.getElementById("ad-frame");
    const codigoTextarea = document.querySelector("#codigoDaFerramenta textarea");

    const larguraModal = Math.floor(window.innerWidth * 0.9);
    const alturaModal = Math.floor(window.innerHeight * 0.9);

    if (modalConteudo) {
        modalConteudo.style.width = larguraModal + "px";
        modalConteudo.style.height = alturaModal + "px";
        modalConteudo.style.maxWidth = "90vw";
        modalConteudo.style.maxHeight = "90vh";
        modalConteudo.style.boxSizing = "border-box";
        modalConteudo.style.display = "flex";
        modalConteudo.style.flexDirection = "column";
        modalConteudo.style.justifyContent = "space-between";
    }

    if (adFrame) {
        const alturaPtp = Math.max(200, Math.floor(alturaModal * 0.8));
        adFrame.style.width = "100%";
        adFrame.style.height = alturaPtp + "px";
        adFrame.style.maxHeight = alturaPtp + "px";
        adFrame.style.minHeight = "200px";
        adFrame.style.flex = "0 0 " + alturaPtp + "px";
    }

    if (codigoTextarea) {
        const alturaCaixaCodigo = Math.max(180, Math.floor(alturaModal * 0.72));
        codigoTextarea.style.height = alturaCaixaCodigo + "px";
        codigoTextarea.style.maxHeight = alturaCaixaCodigo + "px";
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
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

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
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const adFrame = document.getElementById("ad-frame");
    const codigoBox = document.getElementById("codigoDaFerramenta");

    if (adFrame) adFrame.style.display = "none";
    if (codigoBox) codigoBox.style.display = "flex";

    const displayElement = document.getElementById("countdownDisplay");
    if (displayElement) {
        displayElement.textContent = "0s";
    }

    aplicarEscalaResponsivaModal();
}

// ------------------------------------------------------------------
// --- FUNÇÃO PRINCIPAL: ABRE MODAL COM CONTADOR E RODÍZIO ---
// ------------------------------------------------------------------

function abrirModal() {
    const modal = document.getElementById("minhaModal");
    const adFrame = document.getElementById("ad-frame");
    const codigoBox = document.getElementById("codigoDaFerramenta");

    if (!modal || !adFrame) return;

    // Garante que o tempo configurado seja um número válido maior ou igual a 1
    const tempoInicial = Number.isFinite(Number(TEMPO_TIMER_SEGUNDOS)) && Number(TEMPO_TIMER_SEGUNDOS) >= 1
        ? Math.floor(Number(TEMPO_TIMER_SEGUNDOS))
        : 15;

    // 1. LÓGICA DE ALTERNÂNCIA (Rodízio de Links)
    const linkParaUsar = LINKS_PTP[indiceAtualDoLink];
    indiceAtualDoLink = (indiceAtualDoLink + 1) % LINKS_PTP.length;

    // 2. PREPARAÇÃO DA MODAL (90% TELA) E PTP (80% MODAL)
    adFrame.style.display = "block";
    if (codigoBox) codigoBox.style.display = "none";
    modal.style.display = "flex";
    aplicarEscalaResponsivaModal();

    // 3. INICIA O CONTADOR VISUAL
    const displayElement = document.getElementById("countdownDisplay");
    let timer = tempoInicial;

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

window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.liberarCodigo = liberarCodigo;
window.copiarCodigoFerramenta = copiarCodigoFerramenta;

function bindBotaoCopiarModal() {
    const btnCopiar = document.querySelector("#codigoDaFerramenta .btn-copiar-codigo, #codigoDaFerramenta button[onclick*='copiarCodigoFerramenta']");
    if (btnCopiar) {
        btnCopiar.onclick = function(event) {
            event.preventDefault();
            copiarCodigoFerramenta(this);
        };
    }
}

document.addEventListener("click", function(event) {
    const target = event.target.closest("#codigoDaFerramenta .btn-copiar-codigo, #codigoDaFerramenta button[onclick*='copiarCodigoFerramenta']");
    if (target) {
        event.preventDefault();
        copiarCodigoFerramenta(target);
    }
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindBotaoCopiarModal);
} else {
    bindBotaoCopiarModal();
}
