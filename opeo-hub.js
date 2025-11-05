document.addEventListener("DOMContentLoaded", function () {
  const html = `
<div id='opeo-hub'>
  <div class='opeo-logo'>
    <img alt='OPEO Hub - Rede de Blogs' src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM6glU4QiTxviQFMuEFvBc3QPawHbVfr0kM0pwYfwVuzaAIFBIh4Z7x0nNKuhfaKdzXpHhw_TELkrWc3ZzULMDSUUs3sT-EuceRlkGjtjAU_zbALs6kCZz11mOQzFSEXt4HJizEqMxWKa47k7IZVDkLomibCUB9cwF2pBEysedMoPbVyyITC6-NJnr4EQ/s1600/fav%20logo%20opeo.png'/>
  </div>
  <div class='opeo-marquee'>
    <div class='opeo-links'>
      <a href='https://winner-games-blogger.blogspot.com' target='_blank'>Winner Games</a>
      <a href='https://receitasgpt.blogspot.com' target='_blank'>Receitas GPT</a>
      <a href='https://queria-ser-nerd.blogspot.com' target='_blank'>Queria Ser Nerd</a>
      <a href='https://fanaticobol.blogspot.com' target='_blank'>Fanaticobol</a>
      <a href='https://blogueirosunited.blogspot.com/' target='_blank'>Blogueiros United</a>
      <a href='https://cobaiatech.blogspot.com/' target='_blank'>Cobaia Tech</a>
      <a href='https://cupomaniabr.blogspot.com/' target='_blank'>Cupomania BR</a>
      <a href='https://divulgawebbr.blogspot.com/' target='_blank'>Divulga Web BR</a>
      <a href='https://empregaeu.blogspot.com/' target='_blank'>Emprega Eu</a>
      <a href='https://guia-do-profissional.blogspot.com/' target='_blank'>Guia do Profissional</a>
      <a href='https://irmandadeweb.blogspot.com/' target='_blank'>Irmandade Web</a>
      <a href='https://linksdaselva.blogspot.com/' target='_blank'>Links da Selva</a>
      <a href='https://luadehorror.blogspot.com/' target='_blank'>Lua de Horror</a>
      <a href='https://maisgruposbr.blogspot.com/' target='_blank'>Mais Grupos BR</a>
      <a href='https://marketingexceler.blogspot.com/' target='_blank'>Marketing Exceler</a>
      <a href='https://thebestebooksfree.blogspot.com/' target='_blank'>The Best eBooks Free</a>
      <a href='https://smurfchapadao.blogspot.com/' target='_blank'>Smurf Chapadão</a>
      <a href='https://reisdotiro.blogspot.com/' target='_blank'>Reis do Tiro</a>
    </div>
  </div>
</div>
<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
#opeo-hub{background:linear-gradient(180deg,#1000ff,#f100ff);font-family:'Barlow',sans-serif;color:#fff;display:flex;align-items:center;padding:6px 10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.6);border-bottom:2px solid #fff;text-transform:uppercase;z-index:9999;}
.opeo-logo img{height:38px;width:38px;border-radius:50%;box-shadow:0 0 8px rgba(255,255,255,0.8);margin-right:12px;flex-shrink:0;}
.opeo-marquee{flex:1;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;scrollbar-width:none;}
.opeo-marquee::-webkit-scrollbar{display:none;}
.opeo-links{display:inline-flex;align-items:center;gap:12px;animation:scroll-links 50s linear infinite;}
.opeo-links a{color:#fff;text-decoration:none;padding:2px 6px;border-radius:6px;transition:background 0.3s,color 0.3s;text-shadow:0 0 6px rgba(0,0,0,0.6);}
.opeo-links a:hover{color:#000;background:rgba(255,255,255,0.7);}
#opeo-hub:hover .opeo-links{animation-play-state:paused;}
@keyframes scroll-links{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
</style>
`;

  document.body.insertAdjacentHTML("afterbegin", html);
});
