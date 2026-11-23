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

const LARGURA_MINIMA = 1400; // Largura mínima para visualização do anúncio
const ALTURA_MINIMA = 650;  // Altura mínima para visualização do anúncio

// ------------------------------------------------------------------
// --- FUNÇÕES DE CONTROLE DE ESTADO (Fechar e Liberar) ---
// ------------------------------------------------------------------

function fecharModal() {
    // 1. Para o contador, caso o usuário feche manualmente
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // 2. Esconde a modal e limpa o iframe
    document.getElementById("minhaModal").style.display = "none";
    document.getElementById("ad-frame").src = ""; 
    
    // 3. Reseta o estado visual para a próxima abertura
    document.getElementById("ad-frame").style.display = "block";
    document.getElementById("codigoDaFerramenta").style.display = "none";
}

function liberarCodigo() {
    // 1. Limpa o contador
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // 2. Oculta o iframe e mostra a área de liberação
    document.getElementById("ad-frame").style.display = "none";
    document.getElementById("codigoDaFerramenta").style.display = "block";
    
    // 3. Opcional: Você pode querer ocultar o display do timer após liberar
    const displayElement = document.getElementById('countdownDisplay');
    if (displayElement) {
        displayElement.style.display = 'none';
    }
}

// ------------------------------------------------------------------
// --- FUNÇÃO PRINCIPAL: ABRE MODAL COM CONTADOR E RODÍZIO ---
// ------------------------------------------------------------------

function abrirModal() {
    // 1. VERIFICAÇÃO DO TAMANHO DA JANELA
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;
    
    if (larguraJanela < LARGURA_MINIMA || alturaJanela < ALTURA_MINIMA) {
        alert("Desculpe, a visualização do anúncio requer uma janela de navegador maior (mínimo de " + LARGURA_MINIMA + "x" + ALTURA_MINIMA + " pixels) para validar o crédito. Por favor, maximize sua janela ou use um desktop.");
        return; 
    }

    // 2. LÓGICA DE ALTERNÂNCIA (Rodízio de Links)
    const linkParaUsar = LINKS_PTP[indiceAtualDoLink];
    // Usa o operador módulo (%) para garantir que o índice sempre volte ao 0
    indiceAtualDoLink = (indiceAtualDoLink + 1) % LINKS_PTP.length; 
    
    // 3. PREPARAÇÃO DA MODAL
    document.getElementById("ad-frame").style.display = "block";
    document.getElementById("codigoDaFerramenta").style.display = "none";
    document.getElementById("minhaModal").style.display = "flex"; 
    
    // 4. INICIA O CONTADOR VISUAL
    const displayElement = document.getElementById('countdownDisplay');
    let timer = 15;
    
    // Inicializa o display e carrega o PTP
    if (displayElement) {
        displayElement.textContent = timer; 
        displayElement.style.display = 'block'; // Garante que o contador está visível
    }
    
    document.getElementById("ad-frame").src = linkParaUsar; // Carrega o PTP

    // 5. INICIA A CONTAGEM REGRESSIVA (Intervalo)
    
    // Limpa qualquer intervalo anterior (segurança crítica!)
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        timer--;
        
        // Atualiza o display visual
        if (displayElement) {
            displayElement.textContent = timer; 
        }

        if (timer <= 0) {
            // Fim da contagem!
            clearInterval(countdownInterval); 
            if (displayElement) {
                displayElement.style.display = 'none'; 
            }
            liberarCodigo(); // Chama a função para liberar o conteúdo
        }
    }, 1000); // Roda a cada 1 segundo (1000ms)
}
