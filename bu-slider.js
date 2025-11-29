// B.U. SLIDER - Script principal
// Cole esse código puro dentro do arquivo bu-slider.js no GitHub

(function(){

  // ============================
  //  FUNÇÃO: Próximo slide
  // ============================
  function buNextSlide(slider){
    const slides = slider.querySelectorAll('.bu-slide');
    if (!slides.length) return;

    let activeIndex = 0;
    slides.forEach((s, i) => {
      if (s.classList.contains('active')) activeIndex = i;
    });

    slides[activeIndex].classList.remove('active');
    const nextIndex = (activeIndex + 1) % slides.length;
    slides[nextIndex].classList.add('active');
  }

  // ============================
  //  AUTOPLAY (data-auto="true")
  // ============================
  function buSetupAutoplay(){
    setInterval(function(){
      document.querySelectorAll('.bu-slider[data-auto="true"]').forEach(slider => {
        buNextSlide(slider);
      });
    }, 4000);
  }

  // ============================
  //  NAVEGAÇÃO MANUAL (prev/next)
  // ============================
  document.addEventListener('click', function(e){
    const prevBtn = e.target.closest('.bu-prev');
    const nextBtn = e.target.closest('.bu-next');

    if (!prevBtn && !nextBtn) return;

    const button = prevBtn || nextBtn;
    const slider = button.closest('.bu-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.bu-slide');
    if (!slides.length) return;

    let activeIndex = 0;
    slides.forEach((s, i) => {
      if (s.classList.contains('active')) activeIndex = i;
    });

    slides[activeIndex].classList.remove('active');

    if (nextBtn) {
      activeIndex = (activeIndex + 1) % slides.length;
    } else {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    }

    slides[activeIndex].classList.add('active');
  });

  // ============================
  //  MINIATURAS (bu-thumb)
  // ============================
  document.addEventListener('click', function(e){
    const thumb = e.target.closest('.bu-thumb');
    if (!thumb) return;

    const viewer = thumb.closest('.bu-viewer');
    if (!viewer) return;

    const mainImg  = viewer.querySelector('.bu-main');
    const mainLink = viewer.querySelector('.bu-lightbox');

    if (mainImg) {
      mainImg.src = thumb.src;
    }
    if (mainLink) {
      mainLink.href = thumb.src;
    }

    // marca thumb ativa
    viewer.querySelectorAll('.bu-thumb').forEach(t => t.classList.remove('bu-thumb-active'));
    thumb.classList.add('bu-thumb-active');
  });


  // ============================
  //  INICIAR AUTOPLAY
  // ============================
  function buInit(){
    buSetupAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buInit);
  } else {
    buInit();
  }

})();
