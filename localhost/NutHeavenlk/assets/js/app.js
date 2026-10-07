
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));

  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  let current = 0, timer;
  function showSlide(n){
    if(!slides.length) return;
    current=(n+slides.length)%slides.length;
    slides.forEach((s,i)=>s.classList.toggle('active',i===current));
    dots.forEach((d,i)=>d.classList.toggle('active',i===current));
  }
  function start(){ clearInterval(timer); if(slides.length>1) timer=setInterval(()=>showSlide(current+1),6000); }
  function reset(){clearInterval(timer);start();}
  document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{showSlide(current+1);reset()}));
  document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>{showSlide(current-1);reset()}));
  dots.forEach((d,i)=>d.addEventListener('click',()=>{showSlide(i);reset()}));
  showSlide(0); start();

  document.querySelectorAll('[data-add-cart]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const id=btn.dataset.addCart;
      const original=btn.textContent;
      btn.disabled=true; btn.textContent='Adding...';
      try{
        const r=await fetch('cart.html?action=add&id='+encodeURIComponent(id),{headers:{'X-Requested-With':'XMLHttpRequest'}});
        const data=await r.json();
        if(data.ok){
          const badge=document.querySelector('.cart-link span');
          if(badge) badge.textContent=data.count;
          btn.textContent='Added ✓';
          setTimeout(()=>btn.textContent=original,1200);
        }else btn.textContent='Try again';
      }catch(e){btn.textContent='Try again'}
      setTimeout(()=>btn.disabled=false,700);
    });
  });
});
