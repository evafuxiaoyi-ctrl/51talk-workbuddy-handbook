/* Non-lesson pages can scroll too; the hint lives below the reading area. */
(() => {
  const book=document.querySelector('.book'),main=book.querySelector('main');
  const hint=document.createElement('button');
  hint.type='button';hint.className='reading-scroll-hint';hint.hidden=true;
  book.append(hint);
  let queued=false;
  function update(){
    queued=false;
    const page=main.querySelector('.slide.active');
    if(!page||page.classList.contains('business-slide')||page.scrollHeight<=page.clientHeight+2){hint.hidden=true;return;}
    hint.hidden=false;
    hint.setAttribute('aria-controls',page.id);
    const bottom=page.scrollTop+page.clientHeight>=page.scrollHeight-3;
    hint.disabled=bottom;
    hint.textContent=bottom?'已到本页底部 · 可翻到下一页 →':'向下滚动，查看剩余内容 ↓';
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
  hint.addEventListener('click',()=>main.querySelector('.slide.active')?.scrollBy({top:main.clientHeight*.75,behavior:'smooth'}));
  main.addEventListener('scroll',schedule,true);
  new MutationObserver(schedule).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  const observer=new ResizeObserver(schedule);observer.observe(main);
  main.querySelectorAll('.slide,.slide>*').forEach(element=>observer.observe(element));
  window.addEventListener('resize',schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
