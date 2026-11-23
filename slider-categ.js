(function () {
  function iniciarCarrosselCategorias() {
    const viewport = document.getElementById("catSliderViewport");
    const track = document.getElementById("catSliderTrack");
    if (!viewport || !track || track.dataset.sliderInit === "1") return;

    const itensOriginais = Array.from(track.children);
    if (itensOriginais.length === 0) return;

    track.dataset.sliderInit = "1";

    // Clona os cards para formar um loop infinito contínuo sem buracos
    itensOriginais.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    // Configurações de velocidade e direção (1 = esquerda para a direita | -1 = direita para a esquerda)
    const VELOCIDADE_PX_POR_FRAME = 0.65;
    const DIRECAO = -1;

    let larguraMetade = 0;
    let posicaoAtual = 0;
    let pausadoPorHover = false;
    let arrastando = false;
    let houveArraste = false;
    let inicioX = 0;
    let posicaoInicialArraste = 0;

    function recalcularLargura() {
      // Largura exata do primeiro conjunto original de cards + gaps
      larguraMetade = track.scrollWidth / 2;
      if (larguraMetade > 0 && posicaoAtual === 0 && DIRECAO === 1) {
        posicaoAtual = -larguraMetade;
      }
    }

    function normalizarLoop() {
      if (larguraMetade <= 0) return;
      while (posicaoAtual > 0) {
        posicaoAtual -= larguraMetade;
      }
      while (posicaoAtual <= -larguraMetade) {
        posicaoAtual += larguraMetade;
      }
    }

    function animar() {
      if (!pausadoPorHover && !arrastando && larguraMetade > 0) {
        posicaoAtual += VELOCIDADE_PX_POR_FRAME * DIRECAO;
        normalizarLoop();
        track.style.transform = "translate3d(" + posicaoAtual + "px, 0, 0)";
      }
      requestAnimationFrame(animar);
    }

    // Pausa suave ao passar o mouse
    viewport.addEventListener("mouseenter", () => {
      pausadoPorHover = true;
    });

    viewport.addEventListener("mouseleave", () => {
      pausadoPorHover = false;
      arrastando = false;
      viewport.classList.remove("is-dragging");
    });

    // Arraste com mouse (Desktop)
    viewport.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      arrastando = true;
      houveArraste = false;
      inicioX = e.clientX;
      posicaoInicialArraste = posicaoAtual;
      viewport.classList.add("is-dragging");
    });

    window.addEventListener("mousemove", (e) => {
      if (!arrastando) return;
      const deltaX = e.clientX - inicioX;
      if (Math.abs(deltaX) > 6) {
        houveArraste = true;
      }
      posicaoAtual = posicaoInicialArraste + deltaX;
      normalizarLoop();
      track.style.transform = "translate3d(" + posicaoAtual + "px, 0, 0)";
    });

    window.addEventListener("mouseup", () => {
      if (!arrastando) return;
      arrastando = false;
      viewport.classList.remove("is-dragging");
    });

    // Arraste com o dedo (Mobile / Touch)
    viewport.addEventListener("touchstart", (e) => {
      if (!e.touches || e.touches.length === 0) return;
      arrastando = true;
      houveArraste = false;
      inicioX = e.touches[0].clientX;
      posicaoInicialArraste = posicaoAtual;
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (!arrastando || !e.touches || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - inicioX;
      if (Math.abs(deltaX) > 6) {
        houveArraste = true;
      }
      posicaoAtual = posicaoInicialArraste + deltaX;
      normalizarLoop();
      track.style.transform = "translate3d(" + posicaoAtual + "px, 0, 0)";
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      arrastando = false;
    });

    // Impede que o navegador abra o link se o usuário estava apenas arrastando
    track.addEventListener("click", (e) => {
      if (houveArraste) {
        e.preventDefault();
        e.stopPropagation();
        houveArraste = false;
      }
    }, true);

    window.addEventListener("resize", recalcularLargura);

    recalcularLargura();
    requestAnimationFrame(animar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarCarrosselCategorias);
  } else {
    iniciarCarrosselCategorias();
  }
})();
