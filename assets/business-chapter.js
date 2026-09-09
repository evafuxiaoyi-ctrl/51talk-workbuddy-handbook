/* Loaded before the handbook controller so its existing navigation and task cards are reused. */
const businessRoutes = ['journey-business','business-overview','business-demo','business-source','business-sample','business-batch','business-output','business-delivery','business-transfer-demo','business-transfer','business-solo','business-quiz'];
const businessSampleUrl = './assets/practice/business-report-practice.zip';
const businessMainVideoUrl = './assets/videos/workbuddy-full-demo-20260909.mp4';
const businessCard = (title, body, kicker='') => `<article class="business-card">${kicker?`<span class="business-kicker">${kicker}</span>`:''}<h2>${title}</h2>${body}</article>`;
const businessPrompt = text => `<div class="business-prompt">${text}</div>`;
const businessAction = (id, text) => `<div class="business-actions"><button class="pixel-btn" data-quest="${id}">${text}</button></div>`;
const businessVideo = (name, title, caption) => `<figure class="business-video" data-video-slot="${name}"><div class="business-video-frame"><span>实操视频 · 待录制</span><h2>${title}</h2><p>此处为视频占位，暂不可播放<br>可先查看后续练习指引</p></div><figcaption>${caption}</figcaption></figure>`;
const businessSlides = [
  ['journey-business','升级地图 · 进入第四关','下一站，业务任务训练场','前三关准备能力，这一关把能力用到自己的工作里。',`
    <div class="journey-map"><ol class="journey-stops" aria-label="当前学习路线">
      <li class="journey-stop"><span class="stop-num">01</span><div><h3>新手启航村</h3><p>学会布置任务，得到第一次结果。</p></div></li>
      <li class="journey-stop"><span class="stop-num">02</span><div><h3>装备工坊</h3><p>准备连接器、知识、Skill 与自动化。</p></div></li>
      <li class="journey-stop"><span class="stop-num">03</span><div><small>上一站</small><h3>AI 专家召唤工坊</h3><p>配置角色与边界，完成四类测试。</p></div></li>
      <li class="journey-stop current" aria-current="step"><span class="stop-num">04</span><div><small>你在这里 · 即将进入</small><h3>业务任务训练场</h3><p>先看完整示范，再用同材料练习，最后换场景迁移。</p></div></li>
      <li class="journey-stop future"><span class="stop-num">05</span><div><h3>品质安全守护堡</h3><p>下一关：系统核验质量与安全，尚未开放。</p></div></li>
    </ol></div>
    <div class="business-note"><b>带上什么：</b>前面跑通的任务卡、已测试 Skill、知识与专家。换成新业务时，要检查适用范围，不能直接沿用周报口径。</div>
    <p class="business-journey-next">向右翻页，开始第四关 →</p>`],
  ['business-overview','LEVEL 04 · 学习路线','先看我做，再轮到你','看完整示范 → 用同材料练习 → 换场景迁移。',`
    ${businessCard('看我做：先看一遍完整过程','<p>先看老师如何把原始材料变成汇报交付：怎样交代任务、何时检查样例、如何纠偏、怎样确认发送。</p><p><b>这一阶段：</b>看清流程和关键判断，不急着跟着操作。</p>','01 WATCH')}
    ${businessCard('你来练：用同一套材料跑一遍','<p>下载示范使用的虚构材料，按后面的分步指引自己操作，从读取材料做到文件交付。</p><p><b>这一阶段：</b>先独立尝试，遇到问题再回看示范；保留产物与核验记录。</p>','02 PRACTICE')}
    ${businessCard('做迁移：换入口，再换成自己的岗位','<p>先看听记转行动的迁移示范，再用迁移卡练习，最后选择一项自己的工作，替换材料、规则、结果和确认点。</p><p><b>这一阶段：</b>不照搬案例，学会举一反三。最后用选择题验收方法。</p>','03 TRANSFER')}
    <div class="business-note"><b>本关核心：</b>不要只说“帮我做好”。要会分阶段交代、看中间结果、指出具体问题。</div>
    <div class="business-note warning">现有周报专家若只允许生成草稿，不要绕过它直接发送。先明确新任务的角色与边界；交付使用经授权的入口，必要时由本人手动完成。</div>`],
  ['business-source','训练场 · 02 你来练 / 材料','先让它说清：读到了什么','轮到你了：用示范中的同一套材料，自己跑一遍。',`
    ${businessCard('先备齐这三样',`<ol><li><b>材料：</b>三份 CSV，共 7 条记录，全部为虚构教学数据。</li><li><b>规则：</b>按事项编号去重；“已完成”必须有结果依据；未知值不补零。</li><li><b>交付：</b>Excel 明细＋Word 汇报；HTML 为可选迁移格式。</li></ol><div class="business-actions"><a class="pixel-btn" href="${businessSampleUrl}" download>下载主线练习材料</a></div><p>解压后，用 WorkBuddy 引用或上传其中的文件；不要让它遍历整个电脑。</p>`)}
    ${businessPrompt('<strong>你可以这样说 · 第一轮只检查输入</strong>\n请仅检查我指定的练习文件夹，先不要汇总，也不要改动原文件。\n列出实际打开的文件、列名、记录数、日期范围，以及缺失或读不到的内容。说明还需要我确认什么，再等我继续。')}
    <div class="business-note"><b>本步验收：</b>不是“我已了解材料”，而是具体文件名、读取结果和缺口。规则文件与业务记录应分开列出。</div>
    ${businessAction(13,'打开同材料练习任务卡')}
    <div class="business-note warning">只提供获准使用的材料。若本地读取不可用，可手动上传指定文件；两者都不可用时，记录阻塞，不假装读过。</div>`],
  ['business-sample','训练场 · 03 你来练 / 样例','先处理一小份，再决定继续','自己检查两个代表性样例，再决定是否让 Agent 继续。',`
    ${businessCard('先看两个原始记录','<p><b>T01：</b>出现在 A 表和 B 表，内容相同。</p><p><b>T05：</b>状态写“已完成”，但结果人数与依据都为空。</p><p>现在让 Agent 直接把 7 行算成 7 项成果，会出现什么问题？</p><details class="business-answer"><summary>想一想，再展开对照</summary><p>T01 被重复计算；T05 被当成有证据的成果。行数、事项数和已核验成果数，是三个不同概念。</p></details>')}
    ${businessPrompt('<strong>你可以这样说 · 先做两个样例</strong>\n先处理 T01 和 T05，按“编号、事项、核验状态、结果人数、依据、来源位置”输出。\n同一编号且内容相同才去重；冲突单列。结果或依据缺失时标“待核验”，不能补写。展示处理理由，等我确认后再批量。')}
    <div class="business-note"><b>纠偏要具体：</b>“T05 没有结果依据，请从已核验成果中移出；人数保留为空，并说明待确认。”比“再准确一点”更可执行。</div>`],
  ['business-batch','训练场 · 04 你来练 / 批量','让规则跑完整，不让错误放大','你确认样例后再扩展；批量结果仍要抽查。',`
    ${businessPrompt('<strong>你可以这样说 · 第二轮批量处理</strong>\n刚才的样例和规则已确认，请按同一口径处理剩余记录。\n保留每项的来源文件和原始行号，输出去重后的明细、异常清单和汇总。\n不要修改原始文件，不要自行处理来源冲突。完成后列出处理前后数量供我核对。')}
    ${businessCard('对照结果，而不是只看“完成”','<ul><li>7 条原始记录 → 6 个唯一事项。</li><li>3 项有依据的完成事项，2 项进行中，1 项待核验。</li><li>已核验完成事项的参与人次合计 180；不是跨活动去重人数。</li><li>T05 保留在异常清单，不按 0 人或已完成补齐。</li></ul><p>以上是本套虚构材料的参考结果，不是你的真实业务指标。</p>')}
    <div class="business-note"><b>暂停练习：</b>打开 T01 的两个来源和 T05 的缺失字段，核对去重与状态。发现问题时保留“原结果 → 纠正要求 → 修订结果”。</div>
    ${businessAction(13,'再次查看同材料练习卡')}`],
  ['business-output','训练场 · 05 你来练 / 文件','一份核验结果，按用途交付','把你核验过的明细变成文件，再自己打开检查。',`
    ${businessCard('同一内容，三种用途',`<table class="business-table"><thead><tr><th>格式</th><th>给谁 / 看什么</th><th>必须保留</th></tr></thead><tbody><tr><td>Excel 明细</td><td>执行同事查逐项记录</td><td>编号、状态、数据、异常与来源</td></tr><tr><td>Word 汇报</td><td>负责人快速掌握进展</td><td>核心结论、统计口径、待确认项</td></tr><tr><td>HTML（选做）</td><td>浏览器中查看可视化汇报</td><td>结论、证据、需讨论的问题</td></tr></tbody></table>`)}
    ${businessPrompt('<strong>你可以这样说 · 第三轮生成文件</strong>\n请基于刚才核验通过的同一份明细，生成 Excel 明细表和一页 Word 汇报，存入我指定的输出文件夹。\n汇报要写明 6 个事项、3 项已核验完成、2 项进行中、1 项待核验；180 为已核验参与人次。\n两种文件口径一致，保留异常和来源；如果不能生成指定格式，明确说明，不要只改后缀。')}
    <div class="business-note"><b>你来验收：</b>实际打开两个文件；看文字、数字、表格与排版。文件已生成，不等于内容已核验，也不等于已交付。</div>
    <div class="business-note warning">已有同名文件时先问是否另存新版本；不要覆盖原材料。若改成 HTML，先确认受众与页面结构，再生成并用浏览器打开检查。</div>`],
  ['business-delivery','训练场 · 06 你来练 / 交付','发送前，最后一次交接确认','核对你自己的交付清单，确认后再执行一次明确动作。',`
    ${businessCard('先给我看待发送清单','<ol><li><b>发给谁：</b>确切的钉钉对象或邮箱地址，同名人员先核对。</li><li><b>发什么：</b>正文、附件文件名与版本，排除原始敏感材料。</li><li><b>怎么发：</b>选择钉钉或邮箱之一，确认本人有权限。</li><li><b>怎么验：</b>查看实际发送记录、附件及失败提示。</li></ol>')}
    ${businessPrompt('<strong>你可以这样说 · 第四轮只准备，不发送</strong>\n请拟一份交付摘要，列出拟发送对象、渠道、正文和两个附件的实际位置，供我核对。现在先不要发送。\n只有我确认这份清单，并明确要求执行本次发送后，才能使用获准的发送能力。结果不明确时先查发送记录，不要重复发送。')}
    <div class="business-note"><b>练习方式：</b>先用自己的测试收件地址，或获准接收的测试对象。没有发送能力时，保留草稿，由本人手动交付并记录真实状态。</div>
    <div class="business-note warning"><b>三种状态分开：</b>准备好了 ≠ 已发送；已发送 ≠ 对方已收到并理解；接收成功 ≠ 业务已完成。</div>
    <div class="business-note"><b>练习收尾：</b>保存明细、汇报文件和一次核验记录，如实标注交付状态。下一步再换成听记，观察方法怎样迁移。</div>`],
  ['business-demo','训练场 · 01 看我做','先看我做：从材料到交付','先有完整印象，不急着操作；后面再用同一套材料练习。',`
    <figure class="business-video" data-video-slot="business-main"><div class="business-video-frame business-video-player"><video id="business-main-video" controls preload="metadata" playsinline poster="./assets/videos/workbuddy-full-demo-poster.jpg" aria-label="WorkBuddy 完整实操：材料到汇报交付"><source src="${businessMainVideoUrl}" type="video/mp4">你的浏览器不支持视频播放，可通过下方链接下载观看。</video></div><figcaption>完整示范 · 约 6 分 13 秒 · 自带配音与重点标注。材料核验 → 多格式汇报 → 51Talk 品牌版 HTML → 邮件与本人钉钉交付。全部为虚构教学材料，可全屏观看。</figcaption></figure>
    <div class="business-actions"><a class="secondary" href="${businessMainVideoUrl}" download>下载完整实操视频（约 30 MB）</a></div>
    ${businessCard('看老师做时，留意三个判断','<ol><li><b>为什么先列材料：</b>老师怎样确认读取范围与数量？</li><li><b>为什么先做样例：</b>老师怎样判断重复和缺失，怎样给出具体反馈？</li><li><b>为什么发送前停一下：</b>老师怎样核对对象、正文、附件和真实发送记录？</li></ol><p>先完整看一遍，再进入同材料练习；遇到问题可返回这里暂停、拖动进度或全屏回看。</p>')}
    <div class="business-actions"><button class="pixel-btn" data-route="business-source">进入同材料练习 →</button></div>`],
  ['business-transfer','训练场 · 08 做迁移 / 练习','把会议讨论，变成可确认的行动','参照迁移示范，换成一份获准使用的听记，自己试一次。',`
    ${businessCard('哪些不变，哪些要换',`<table class="business-table"><thead><tr><th>环节</th><th>主线</th><th>听记迁移</th></tr></thead><tbody><tr><td>输入范围</td><td>指定本地文件</td><td>指定日期、会议与授权听记</td></tr><tr><td>处理规则</td><td>去重、核验成果</td><td>区分讨论、决定与承诺</td></tr><tr><td>输出结果</td><td>明细、汇报文件</td><td>行动清单、待确认问题</td></tr><tr><td>外部动作</td><td>发送文件</td><td>创建待办或发送摘要</td></tr></tbody></table>`)}
    ${businessPrompt('<strong>你可以这样说 · 先读取，再做行动样例</strong>\n请通过当前已授权的听记能力，读取我指定会议的摘要与可访问逐字稿，先列出实际来源。\n区分“讨论建议、已作决定、明确行动”，为行动保留原文或时间位置。先做两条样例；负责人、日期不明确时列待确认，不自行指派。先不要创建待办或发消息。')}
    <div class="business-note warning">只有摘要时，要标明证据范围，不声称核对过完整逐字稿。权限不足或接口不可用时，可手动提供获准的记录继续练；不能冒充 MCP 读取成功。</div>
    ${businessAction(14,'打开听记迁移练习卡')}`],
  ['business-transfer-demo','训练场 · 07 做迁移 / 示范','换个场景，看方法如何迁移','同材料练习之后，再看老师把听记变成会后行动。',`
    ${businessVideo('business-minutes','迁移实操：听记 → 行动清单','录制内容：定位指定听记 → 读取原文 → 区分讨论与决定 → 补确认项 → 核准后创建待办或发送摘要 → 回读结果。')}
    ${businessCard('先用这段虚构会议记录判断','<p>“小林说：我会在本周五 17:00 前提交名单。”</p><p>“是否发到全员群，下次再讨论。”</p><p>“后续培训要有人跟进，具体人选和时间还没定。”</p><details class="business-answer"><summary>哪些能成为行动？展开对照</summary><p>第一条是明确承诺，但还需核对小林的真实账号和会议日期对应的截止日。第二条不是群发授权；第三条应进入待确认清单，不能擅自指定负责人。</p></details>')}
    <div class="business-actions"><button class="pixel-btn" data-route="business-transfer">进入听记迁移练习 →</button></div>`],
  ['business-solo','训练场 · 09 做迁移 / 岗位','带走一个你下周就能用的场景','看过、练过，再把材料、规则和交付换成你自己的工作。',`
    ${businessCard('先换四个变量',`<table class="business-table"><thead><tr><th>要换什么</th><th>写成你自己的答案</th></tr></thead><tbody><tr><td>材料</td><td>哪份表、哪个文件夹、哪次会议？</td></tr><tr><td>规则</td><td>按什么分类、统计、判断或提取？</td></tr><tr><td>结果</td><td>谁来用？需要什么文件或行动清单？</td></tr><tr><td>确认点</td><td>何时看样例？哪些发送或写入必须确认？</td></tr></tbody></table>`)}
    ${businessCard('选场景的灵感，不是固定作业','<p><b>HR：</b>入职培训记录 → 完成情况表 → 缺项跟进清单。</p><p><b>运营：</b>活动数据 → 按统一口径汇总 → 复盘文档。</p><p><b>项目协作：</b>项目会议 → 决策与行动 → 核准后的待办。</p><p>选一个材料可获得、规则说得清、结果有人用的小任务即可。</p>')}
    <div class="business-note"><b>交三样：</b>自己的任务卡＋实际打开检查过的产物＋一条纠偏或验证记录。没有遇到错误，就记录一次抽查，不编造纠错经历。</div>
    ${businessAction(15,'打开我的岗位任务卡')}
    <p class="business-note">自检只记录你已检查过哪些内容，不代表平台替你验收了真实工作。</p>`],
  ['business-quiz','训练场 · 10 测 / 方法验收','换一个场景，你还会判断吗？','四道选择题，至少答对三道通过知识验收；不锁导航。',`
    <div class="quiz-shell" id="business-quiz-shell"></div>
    <div class="business-note">测验检查方法判断；真实应用仍要看你自己的任务卡、产物和核验记录。下一关“品质安全守护堡”尚未开放。</div>`]
];
businessSlides.sort((a,b)=>businessRoutes.indexOf(a[0])-businessRoutes.indexOf(b[0]));
document.querySelector('.book main').insertAdjacentHTML('beforeend', businessSlides.map(([id,level,title,subtitle,body]) => `<section class="slide business-slide" id="${id}"><span class="level">${level}</span><h1 class="title">${title}</h1><p class="subtitle">${subtitle}</p><div class="business-content" tabindex="0" role="region" aria-label="${title}，内容可滚动">${body}</div><button class="business-scroll-cue" type="button" hidden>向下滚动，查看剩余内容 ↓</button></section>`).join(''));
function updateBusinessScrollCues(){
  document.querySelectorAll('.business-slide.active').forEach(slide=>{
    const area=slide.querySelector('.business-content'),cue=slide.querySelector('.business-scroll-cue');
    cue.hidden=area.scrollHeight<=area.clientHeight+3;
    const atEnd=area.scrollTop+area.clientHeight>=area.scrollHeight-3;
    cue.textContent=atEnd?'已到本页底部 · 向右翻页 →':'向下滚动，查看剩余内容 ↓';
    cue.disabled=atEnd;
  });
}
const businessResizeObserver=new ResizeObserver(updateBusinessScrollCues);
document.querySelectorAll('.business-content').forEach(area=>{
  businessResizeObserver.observe(area);
  [...area.children].forEach(child=>businessResizeObserver.observe(child));
  area.addEventListener('scroll',updateBusinessScrollCues,{passive:true});
  area.addEventListener('toggle',updateBusinessScrollCues,true);
  area.nextElementSibling.onclick=()=>area.scrollBy({top:area.clientHeight*.75,behavior:'smooth'});
});

const businessQuests = [
  {id:13,title:'同材料练习：原始材料到汇报交付',time:'30–40 分钟',level:'★★☆',output:'明细表 + 汇报文件 + 核验与交付记录',where:'看过主线示范后，下载同一套材料 → 在 WorkBuddy 引用指定文件夹或上传文件 → 检查专家/Skill 的任务范围 → 分轮自己操作，遇到问题再回看示范。当前专家只允许草稿时，保留限制；发送由获准入口或本人手动完成。',template:`【先替换】
输入位置：[练习文件夹的实际路径]
输出位置：[独立的输出文件夹]
发送渠道：[钉钉或邮箱，选择一种]
测试收件人：[本人测试地址或获准的确切对象]
以下轮次分开执行；每轮看过结果后再发下一轮。不要一次跨过确认点。

【第一轮：只读材料】
请仅读取指定文件夹中的 README、规则文件和三份 CSV。不要修改、删除原文件，不要发送。
列出实际文件、字段、记录数和范围；检查缺失字段、重复编号和冲突。先把材料清单和待确认问题给我。
若无法读取，请说明能力或权限缺口，等我上传指定材料。

【第二轮：做样例】
先处理 T01 和 T05。按编号去重，完全一致才合并；冲突并列待确认。
仅当状态是已完成且结果人数、依据均齐全时，标为已核验完成。进行中保留；缺失结果或依据的完成记录标为待核验，未知值不补零。
输出编号、事项、核验状态、结果人数、依据和来源文件/行号，解释处理理由，等我确认。

【第三轮：确认后批量】
我确认样例规则后，再对剩余记录应用同一规则。保留来源，不改动原材料。
输出去重明细、异常清单和数量核对。参与人次只合计已核验完成事项，不冒充跨活动去重人数。
参考核对：7 行、6 个唯一事项；3 项已核验完成、2 项进行中、1 项待核验；已核验参与人次 180。不要为了凑参考值而改写输入。

【第四轮：核验后生成文件】
基于同一份核验明细，在指定输出目录生成 Excel 明细表和一页 Word 汇报。保留异常、口径和来源。
已有同名文件先问，不覆盖。不能生成指定格式时说明，不能只改文件后缀。
给出实际文件位置，等我打开文件检查。HTML 为选做，先确认受众和页面结构，生成后用浏览器检查展示效果。

【第五轮：只准备交付】
列出确切收件对象、渠道、正文及两个附件的名称、版本、实际位置。检查是否含不该外发的原始数据。此时不要发送。
等我独立确认这份清单，并明确要求执行这一次发送；若当前专家禁止发送，不绕过限制，改由获准入口或本人手动发送。
执行后核对真实发送记录。状态不明先查记录，不重发。没有发送能力则保留草稿和缺口，不能声称已发送。

【最后保存】
材料清单、明细与汇报、一次纠偏或抽查记录，以及草稿/已发送/失败等真实交付状态。`,checks:['实际读取了指定材料，并保留原文件；没有遍历无关目录','样例已经确认；去重、缺失状态与人次口径均抽查过','明细和汇报文件真实可打开，数据一致，异常与来源保留','保留了至少一次具体纠偏或抽查记录','交付状态如实记录；若发送，已有明确授权和发送记录；未发送则标为草稿']},
  {id:14,title:'迁移练习：听记到会后行动',time:'20–25 分钟',level:'★★☆',output:'行动清单 + 待确认项 + 真实执行状态',where:'WorkBuddy 中检查钉钉听记相关连接器/MCP 的授权和可用入口 → 指定一场获准使用的会议。无法读取时，手动提供获准记录，或用卡内虚构片段练习；明确区分两种输入方式。',template:`【先确定范围】
会议：[确切会议名称/ID或链接]
会议日期与时区：[实际日期，Asia/Shanghai 或实际时区]
输入方式：[已授权听记能力 / 手动提供的记录 / 下方虚构练习片段]
工作目标：生成可核验的会后行动清单，不把讨论建议变成执行承诺。

【第一轮：列来源】
只读取上述范围。列出实际可访问的摘要、逐字稿及定位信息；只有摘要时明确标注，不声称读了全部原文。
权限不足、能力不可用或找不到会议时停止读取并说明缺口，不扩大范围。

【第二轮：两个样例】
区分讨论建议、已作决定和明确行动，先处理两条样例供我检查。
行动项包含：事项、负责人、截止日期、原文依据或时间位置、待确认问题。
相对日期结合会议日期转换；负责人账号需确认。缺少信息不猜，来源冲突并列。

【虚构片段，可在无听记权限时使用】
小林说：“我会在本周五 17:00 前提交名单。”
主持人说：“是否发到全员群，下次再讨论。”
主持人说：“后续培训要有人跟进，具体人选和时间还没定。”
这段没有提供实际会议日期和人员账号；必须待确认，不可创建真实任务。

【第三轮：确认后整理完整清单】
应用确认的规则，输出明确行动与待确认事项两个列表，保留证据。不自动发送或创建待办。

【第四轮：确认外部动作】
先列拟执行清单：选择创建待办或发送摘要，写清账号、日期、内容与范围，等我逐项核准并明确要求执行。
未经确认不执行，不因会议提到一个人就自动指派。能力不支持时，保留草稿供本人手动处理。
执行后回读实际记录；状态不明先查询，不重复创建。记录真实结果，不把创建成功当成任务完成。`,checks:['输入方式和证据范围已明确，未把手动材料冒充 MCP 读取','讨论、决定和行动分开，并保留原文依据','缺少的日期、负责人账号与任务内容已列待确认，没有自行补写','样例已检查；外部动作先确认，未执行的部分保持草稿状态','保留了清单与真实执行状态，未把待办创建当成业务完成']},
  {id:15,title:'自主练习：我的岗位应用任务',time:'25–40 分钟',level:'★★★',output:'岗位任务卡 + 实际产物 + 纠偏/验证记录',where:'在 WorkBuddy 中选择适合这项任务的专家或新建任务 → 引用获准材料 → 填写下方四个变量。先检查既有 Skill/知识是否适合，不沿用不相关的周报或培训口径。',template:`【我的工作场景】
我从事：[岗位]
我希望减少的一项重复工作：[具体工作]
本次目标与使用者：[谁用这份结果，解决什么问题]

【四个变量】
1. 材料：[实际文件/会议/系统范围、日期、权限]
2. 规则：[分类、统计、判断或提取口径；未知和冲突怎么处理]
3. 结果：[格式、栏目、输出位置、成功标准]
4. 确认点：[何时检查样例；哪些发送/写入必须先确认]

【请分轮协作】
先检查任务范围、实际可用能力和输入完整性，有缺口先问。
先处理一个代表性样例，列出结果与依据，等我确认。
我确认后再批量或处理完整任务，不覆盖原材料。
基于核验结果生成约定产物，返回实际位置供我独立打开检查。
外部动作先列确切对象、内容与范围，仅在我明确确认后执行；不支持则如实说明，保留草稿。

【我要提交的证据】
A. 填写后的任务卡。
B. 实际打开并检查过的产物。
C. 一条“原结果—具体反馈—修订结果”，或一次“抽查项—原文依据—核对结论”。
D. 若涉及外部动作，附真实交付状态；不要求为了交作业而发送。

验收：结果用于我自己的工作；规则准确、依据可回溯；未知不补写；只记录真实完成的动作。`,checks:['四个变量已替换成自己的工作，且材料获准使用','已先检查样例，并确认规则适合本岗位','已有实际可打开的产物，关键结论回查过来源','保留真实纠偏或验证记录，没有为交作业而编造问题','外部动作状态真实，未发送的内容明确为草稿']}
];

const businessQuizData = [
  {question:'销售同事给你 30 份同结构记录，统计规则还没跑过。最合适的下一句是？',options:['全部统计完再统一看看。','先列材料，再选代表性样例按规则处理，确认后批量。','先生成 HTML，让负责人判断是否满意。'],answer:1,explanation:'先检查输入、用样例验证规则，再批量扩展。换了岗位，这个顺序仍适用。',route:'business-sample'},
  {question:'同一结果要做成 Excel 和 Word。哪种做法能减少口径漂移？',options:['两份文件分别从原材料独立统计，不用对照。','为了汇报简洁，删去所有待确认项。','从同一份核验明细生成，再打开两份文件核对数字、口径与异常。'],answer:2,explanation:'格式可以变，但事实、统计范围和异常不能随表达形式改变。',route:'business-output'},
  {question:'听记只有“这个问题最好有人跟进”，没说负责人和期限。应该怎么处理？',options:['列为待确认事项，附原文，询问负责人和期限。','给发言人建一个明天到期的待办。','直接忽略，因为不是完整任务。'],answer:0,explanation:'既不能把建议补成承诺，也不该丢掉潜在行动。保留依据，明确待确认，再决定是否执行。',route:'business-transfer'},
  {question:'发送附件后连接超时，Agent 没拿到结果。下一步应该是？',options:['立刻再发一次，保证对方收到。','先查真实发送记录；仍不明确则报告状态未知，避免重复发送。','文件已生成，就记录交付完成。'],answer:1,explanation:'调用超时不等于发送失败。先回读真实状态，必要时请人确认；发送也不代表业务已完成。',route:'business-delivery'}
];
const businessQuizKey='51talk-ai-driver-handbook-v1-business-quiz';
let businessQuizIndex=0,businessQuizScore=0,businessQuizAnswered=false,businessQuizWrong=[];
let businessQuizBest=Number(localStorage.getItem(businessQuizKey)||0);
function renderBusinessQuiz(){
  const shell=document.getElementById('business-quiz-shell');
  if(businessQuizAnswered && businessQuizIndex<businessQuizData.length)return;
  if(businessQuizIndex>=businessQuizData.length){
    businessQuizBest=Math.max(businessQuizBest,businessQuizScore);
    localStorage.setItem(businessQuizKey,String(businessQuizBest));
    const passed=businessQuizScore>=3;
    const review=[...new Set(businessQuizWrong.map(i=>businessQuizData[i].route))];
    shell.innerHTML=`<div class="quiz-result"><strong>${businessQuizScore} / 4</strong><h3>${passed?'业务任务训练场 · 知识验收通过':'再练一次，把判断补扎实'}</h3><p>历史最高 ${businessQuizBest} / 4。${passed?'你已掌握样例确认、格式一致与行动边界。接下来检查自己的岗位产物。':'按下方入口回看错题涉及的方法，再重新作答。'}</p><button class="pixel-btn" id="business-quiz-retry">重新测一次</button><div class="business-review-links">${review.map(route=>`<button class="secondary" data-business-review="${route}">回看${route==='business-sample'?'样例':route==='business-output'?'文件':route==='business-transfer'?'听记':'交付'}方法</button>`).join('')}<button class="secondary" data-business-review="business-solo">查看岗位作业</button><button class="secondary" data-business-review="map">回到升级地图</button></div></div>`;
    document.getElementById('business-quiz-retry').onclick=()=>{businessQuizIndex=0;businessQuizScore=0;businessQuizAnswered=false;businessQuizWrong=[];renderBusinessQuiz()};
    shell.querySelectorAll('[data-business-review]').forEach(b=>b.onclick=()=>go(b.dataset.businessReview));
    return;
  }
  const q=businessQuizData[businessQuizIndex];
  shell.innerHTML=`<div class="quiz-top"><b>QUESTION ${businessQuizIndex+1} / 4</b><span class="quiz-track"><i style="width:${businessQuizIndex/4*100}%"></i></span></div><h2 class="quiz-question">${q.question}</h2><div class="quiz-options">${q.options.map((o,i)=>`<button class="quiz-option" data-business-answer="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div><div class="quiz-feedback" id="business-quiz-feedback" role="status">选择一个答案，再看原因。</div><div class="quiz-actions"><button class="quiz-next" id="business-quiz-next" disabled>${businessQuizIndex===3?'查看结果':'下一题'}</button></div>`;
  shell.querySelectorAll('[data-business-answer]').forEach(b=>b.onclick=()=>{
    if(businessQuizAnswered)return;
    businessQuizAnswered=true;
    const choice=Number(b.dataset.businessAnswer);
    if(choice===q.answer)businessQuizScore++;else businessQuizWrong.push(businessQuizIndex);
    shell.querySelectorAll('[data-business-answer]').forEach((button,i)=>{button.disabled=true;if(i===q.answer)button.classList.add('correct');else if(i===choice)button.classList.add('wrong')});
    document.getElementById('business-quiz-feedback').textContent=(choice===q.answer?'判断正确。':'再留意这个边界。')+q.explanation;
    document.getElementById('business-quiz-next').disabled=false;
  });
  document.getElementById('business-quiz-next').onclick=()=>{if(!businessQuizAnswered)return;businessQuizIndex++;businessQuizAnswered=false;renderBusinessQuiz()};
}
