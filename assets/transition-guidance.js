/* The highlighted module follows the page sequence, independent of quiz/self-check state. */
function initTransitionGuidance(routes) {
  const transitions = [
    ['map', '新手启航村'],
    ['journey-workshop', '装备工坊'],
    ['journey-expert', 'AI 专家召唤工坊'],
    ['journey-business', '业务任务训练场'],
    ['journey-safety', '品质安全守护堡']
  ];
  transitions.forEach(([id, name]) => {
    const page = document.getElementById(id);
    const index = routes.indexOf(id);
    const next = routes[index + 1];
    if (!page || index < 0 || !next) return;
    page.dataset.nextModule = name;
    page.dataset.nextRoute = next;
    if (id === 'map') {
      const card = [...page.querySelectorAll('.zone')].find(item => item.dataset.route === next);
      if (!card) return;
      card.classList.add('next-module');
      card.setAttribute('aria-current', 'step');
      card.setAttribute('aria-label', '下一站：' + name + '，点击进入');
      const badge = card.querySelector('.v1') || document.createElement('span');
      badge.className = 'v1';
      badge.textContent = '下一站 · 点击进入 →';
      if (!badge.parentElement) card.prepend(badge);
      const hint = document.createElement('p');
      hint.className = 'map-next-hint';
      hint.textContent = '接下来进入「' + name + '」 · 点击亮黄色模块';
      page.querySelector('.title').after(hint);
    } else {
      const current = page.querySelector('.journey-stop.current');
      if (!current) return;
      current.classList.add('next-module');
      current.setAttribute('aria-current', 'step');
      const body = current.querySelector('div');
      if (body) {
        const label = body.querySelector('small') || document.createElement('small');
        label.textContent = '下一站 · 点击进入 →';
        if (!label.parentElement) body.prepend(label);
      }
      const link = document.createElement('a');
      link.className = 'next-module-link';
      link.href = '#' + next;
      link.dataset.route = next;
      link.setAttribute('aria-label', '进入' + name);
      while (current.firstChild) link.append(current.firstChild);
      current.append(link);
    }
  });
}
