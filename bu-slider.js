<script>
// autoplay
setInterval(()=>{
  document.querySelectorAll(".bu-slider[data-auto='true']").forEach(slider=>{
    let slides=slider.querySelectorAll(".bu-slide");
    let active=[...slides].findIndex(s=>s.classList.contains("active"));
    slides[active].classList.remove("active");
    slides[(active+1)%slides.length].classList.add("active");
  });
},4000);

// thumb gallery
document.addEventListener("click",e=>{
  if(!e.target.classList.contains("bu-thumb"))return;
  let viewer=e.target.closest(".bu-viewer");
  viewer.querySelector(".bu-main").src=e.target.src;
});

// manual navigation
document.addEventListener("click",e=>{
  if(!e.target.classList.contains("bu-prev") && !e.target.classList.contains("bu-next"))return;
  let slider=e.target.closest(".bu-slider");
  let slides=slider.querySelectorAll(".bu-slide");
  let index=[...slides].findIndex(s=>s.classList.contains("active"));
  slides[index].classList.remove("active");
  if(e.target.classList.contains("bu-next")) index=(index+1)%slides.length;
  else index=(index-1+slides.length)%slides.length;
  slides[index].classList.add("active");
});
</script>
