  // B.U. SLIDER - Script principal
// Cole esse código puro dentro do arquivo bu-slider.js no GitHub

(function(){

  // ============================
  //  FUNÇÃO: Próximo slide
  // ============================
  function buNextSlide(slider){
    const slides = slider.querySelectorAll(&#39;.bu-slide&#39;);
    if (!slides.length) return;

    let activeIndex = 0;
    slides.forEach((s, i) =&gt; {
      if (s.classList.contains(&#39;active&#39;)) activeIndex = i;
    });

    slides[activeIndex].classList.remove(&#39;active&#39;);
    const nextIndex = (activeIndex + 1) % slides.length;
    slides[nextIndex].classList.add(&#39;active&#39;);
  }

  // ============================
  //  AUTOPLAY (data-auto=&quot;true&quot;)
  // ============================
  function buSetupAutoplay(){
    setInterval(function(){
      document.querySelectorAll(&#39;.bu-slider[data-auto=&quot;true&quot;]&#39;).forEach(slider =&gt; {
        buNextSlide(slider);
      });
    }, 4000);
  }

  // ============================
  //  NAVEGAÇÃO MANUAL (prev/next)
  // ============================
  document.addEventListener(&#39;click&#39;, function(e){
    const prevBtn = e.target.closest(&#39;.bu-prev&#39;);
    const nextBtn = e.target.closest(&#39;.bu-next&#39;);

    if (!prevBtn &amp;&amp; !nextBtn) return;

    const button = prevBtn || nextBtn;
    const slider = button.closest(&#39;.bu-slider&#39;);
    if (!slider) return;

    const slides = slider.querySelectorAll(&#39;.bu-slide&#39;);
    if (!slides.length) return;

    let activeIndex = 0;
    slides.forEach((s, i) =&gt; {
      if (s.classList.contains(&#39;active&#39;)) activeIndex = i;
    });

    slides[activeIndex].classList.remove(&#39;active&#39;);

    if (nextBtn) {
      activeIndex = (activeIndex + 1) % slides.length;
    } else {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    }

    slides[activeIndex].classList.add(&#39;active&#39;);
  });

  // ============================
  //  MINIATURAS (bu-thumb)
  // ============================
  document.addEventListener(&#39;click&#39;, function(e){
    const thumb = e.target.closest(&#39;.bu-thumb&#39;);
    if (!thumb) return;

    const viewer = thumb.closest(&#39;.bu-viewer&#39;);
    if (!viewer) return;

    const mainImg  = viewer.querySelector(&#39;.bu-main&#39;);
    const mainLink = viewer.querySelector(&#39;.bu-lightbox&#39;);

    if (mainImg) {
      mainImg.src = thumb.src;
    }
    if (mainLink) {
      mainLink.href = thumb.src;
    }

    // marca thumb ativa
    viewer.querySelectorAll(&#39;.bu-thumb&#39;).forEach(t =&gt; t.classList.remove(&#39;bu-thumb-active&#39;));
    thumb.classList.add(&#39;bu-thumb-active&#39;);
  });

  // ============================
  //  INICIAR AUTOPLAY
  // ============================
  function buInit(){
    buSetupAutoplay();
  }

  if (document.readyState === &#39;loading&#39;) {
    document.addEventListener(&#39;DOMContentLoaded&#39;, buInit);
  } else {
    buInit();
  }

})();
