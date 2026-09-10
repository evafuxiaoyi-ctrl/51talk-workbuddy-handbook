/* Build the page index from the same ordered routes and headings as the handbook. */
function initPageDirectory({routes,getCurrent,navigate,pauseMedia}) {
  const dialog=document.getElementById('page-directory');
  const search=dialog.querySelector('#directory-search');
  const list=dialog.querySelector('#directory-list');
  const count=dialog.querySelector('#directory-count');
  const jump=dialog.querySelector('#directory-page-number');
  const openingTitles={cover:'封面',preface:'Mike 的开篇寄语','driver-standard':'Level 1 AI Driver · 能力要求'};
  const groups=[['toc','快速上手'],['village','新手启航村'],['journey-workshop','装备工坊'],['journey-expert','AI 专家召唤工坊'],['journey-business','业务任务训练场'],['journey-safety','品质安全守护堡']];
  const clean=text=>(text||'').replace(/\s+/g,' ').trim();
  const entries=routes.map((route,index)=>{
    const slide=document.getElementById(route);
    const group=groups.filter(([start])=>index>=routes.indexOf(start)).at(-1);
    return {route,page:index+1,group:group?.[0]||'opening',chapter:group?.[1]||'开篇',title:openingTitles[route]||clean(slide.querySelector('h1')?.textContent)||clean(slide.querySelector('h2')?.textContent)||route,stage:clean(slide.querySelector('.level')?.textContent),content:clean(slide.textContent).toLowerCase()};
  });
  jump.max=String(entries.length);
  jump.setAttribute('aria-label',`跳到页码，1 至 ${entries.length}`);
  const expanded=new Set();
  function render(){
    const query=search.value.trim().toLowerCase();
    const filtered=entries.filter(item=>!query||item.content.includes(query)||item.title.toLowerCase().includes(query)||item.chapter.toLowerCase().includes(query)||String(item.page)===query.replace(/^p\s*/,''));
    count.textContent=query?`找到 ${filtered.length} 页 · 已展开匹配章节`:`${entries.filter(item=>item.group==='opening').length} 个开篇入口 · ${groups.length} 个章节 · ${entries.length} 页`;
    list.replaceChildren();
    filtered.filter(item=>item.group==='opening').forEach(item=>{
      const li=document.createElement('li'),link=document.createElement('a'),number=document.createElement('span'),body=document.createElement('span'),title=document.createElement('strong'),meta=document.createElement('small'),arrow=document.createElement('span');
      link.href='#'+item.route;link.className='directory-item directory-opening';
      number.className='directory-number';number.textContent='P'+item.page;
      title.textContent=item.title;meta.textContent='点击直接进入';
      if(item.route===getCurrent()){link.setAttribute('aria-current','page');meta.textContent+=' · 当前页'}
      arrow.className='directory-chevron';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';
      body.append(title,meta);link.append(number,body,arrow);li.append(link);list.append(li);
      link.addEventListener('click',event=>{event.preventDefault();visit(item.route)});
    });
    groups.forEach(([key,label],index)=>{
      const matches=filtered.filter(item=>item.group===key);
      if(!matches.length)return;
      const all=entries.filter(item=>item.group===key);
      const groupItem=document.createElement('li'),details=document.createElement('details'),summary=document.createElement('summary'),code=document.createElement('span'),heading=document.createElement('span'),name=document.createElement('strong'),range=document.createElement('small'),arrow=document.createElement('span'),children=document.createElement('ol');
      details.className='directory-group';details.dataset.chapter=key;
      details.open=Boolean(query)||expanded.has(key);
      code.className='directory-chapter-number';code.textContent=String(index).padStart(2,'0');
      name.textContent=label;range.textContent=`P${all[0].page}–P${all.at(-1).page} · ${all.length} 页`;
      if(all.some(item=>item.route===getCurrent())){details.classList.add('contains-current');range.textContent+=' · 当前所在章节'}
      heading.append(name,range);arrow.className='directory-chevron';arrow.setAttribute('aria-hidden','true');arrow.textContent='›';summary.append(code,heading,arrow);
      children.className='directory-pages';
      matches.forEach(item=>{
      const li=document.createElement('li'),link=document.createElement('a'),number=document.createElement('span'),body=document.createElement('span'),title=document.createElement('strong'),meta=document.createElement('small');
      link.href='#'+item.route;link.className='directory-item';number.className='directory-number';number.textContent='P'+String(item.page).padStart(2,'0');title.textContent=item.title;
      meta.textContent=item.stage;
      if(item.route===getCurrent()){link.setAttribute('aria-current','page');meta.textContent+=' · 当前页'}
      body.append(title,meta);link.append(number,body);li.append(link);children.append(li);
      link.addEventListener('click',event=>{event.preventDefault();visit(item.route)});
      });
      details.append(summary,children);groupItem.append(details);list.append(groupItem);
      details.addEventListener('toggle',()=>{if(!query){if(details.open)expanded.add(key);else expanded.delete(key)}});
    });
    if(!filtered.length){const empty=document.createElement('li');empty.className='directory-empty';empty.textContent='没有找到匹配页面，试试其他关键词或清空搜索。';list.append(empty)}
    list.parentElement.scrollTop=0;
  }
  function visit(route){dialog.close();navigate(route);const title=document.getElementById(route).querySelector('h1,h2');if(title){title.setAttribute('tabindex','-1');title.focus({preventScroll:true})}}
  function open(){
    search.value='';jump.value='';expanded.clear();
    const here=entries.find(item=>item.route===getCurrent());
    dialog.querySelector('#directory-current').textContent=`当前 P${here.page} · ${here.title}`;
    pauseMedia();render();dialog.showModal();search.focus();
  }
  document.querySelectorAll('[data-page-directory]').forEach(button=>button.addEventListener('click',open));
  search.addEventListener('input',render);
  dialog.querySelector('#directory-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('#directory-map').addEventListener('click',()=>visit('toc'));
  dialog.querySelector('#directory-jump').addEventListener('submit',event=>{event.preventDefault();const page=Number(jump.value);if(Number.isInteger(page)&&page>=1&&page<=entries.length)visit(entries[page-1].route)});
  // Keep arrow keys in inputs and Escape in the dialog, not the slide controller.
  dialog.addEventListener('keydown',event=>event.stopPropagation());
}
