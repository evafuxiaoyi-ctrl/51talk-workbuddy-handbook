const businessScenarios = [
  [
    "数据分析",
    "业务表格、字段说明、统计口径",
    "先查重复与缺失 → 算两条样例 → 汇总比较",
    "分析表＋有依据的结论",
    "数字能回到原始记录；缺失不补零，相关不当因果。",
    "仅分析我指定的表格和规则，先报告实际读取范围、重复与缺失。先计算两条样例，展示分子、分母和口径，等我核对后再汇总。输出分析表、结论与待确认事项。重新打开产物核对数字，不改原文件。"
  ],
  [
    "信息研究与本地化",
    "来源资料、日期、目标受众与语言",
    "核对来源有效性 → 提炼结论 → 本地化表达",
    "带来源的简报＋本地化文案",
    "事实有来源；建议和推断标明；不编造政策与效果承诺。",
    "根据我指定的资料，先列来源、日期、有效性和证据局限，再总结受众需求。等我确认事实后，改写为适合目标语言和受众的文案，附中文回译与措辞说明。未提供的时间、价格和政策保留待确认，逐句核对事实，不发送。"
  ],
  [
    "会议与任务",
    "获准的会议记录、会议日期",
    "分清讨论与决定 → 提取明确承诺 → 列出待确认项",
    "行动清单＋待确认问题",
    "负责人、日期和行动有原文依据；讨论不等于执行授权。",
    "只读取指定会议记录，说明能访问的证据范围。区分讨论、决定和明确行动，先展示两条样例。每条保留事项、负责人、截止日期、来源与待确认问题；缺失不猜。核对后整理完整清单，只生成草稿，不创建待办或发消息。"
  ],
  [
    "客户录音分析",
    "获准的录音或转写、分析目的",
    "按原话提取需求 → 区分疑问与意愿 → 准备跟进建议",
    "证据分析表＋跟进草稿",
    "询价不等于报名意愿；只有转写时不推断音色或情绪。",
    "分析我指定的客户沟通材料，先说明是录音还是仅转写。提取需求、限制、异议与明确意愿，每项附原文或时间位置，并区分事实与推断。先做样例，核对后输出分析表、跟进草稿和待核实问题。不编造产品政策，不报名，不发送。"
  ],
  [
    "知识库搭建",
    "获准资料、版本、负责人及适用范围",
    "盘点来源 → 整理主题 → 引用问答 → 修订复测",
    "知识目录＋主题页＋问答核验记录",
    "旧版不覆盖现行规则；资料不足时明确说明。",
    "先盘点指定资料的来源、版本、有效性和缺口。检查是否有可用且获准的LLM Wiki Skill；有则用于指定练习目录，无则用Markdown整理并明确说明。保留原文，生成索引和带来源的主题页，再用已知、未知和冲突问题测试。修订并复测，不声称已发布企业知识库。"
  ],
  [
    "智能体搭建",
    "明确岗位任务、知识材料、角色与边界",
    "写配置 → 创建个人专家 → 四类测试 → 修订复测",
    "个人专家＋真实测试记录",
    "创建与测试有实际证据；未知会停止，越权不执行。",
    "先为我的岗位任务设计个人专家配置：角色、范围、知识来源、输出、禁止事项与停止条件。给出可复制的配置，并说明实际可用的创建与知识调用方式；不能直接创建时让我手动操作。待我确认创建后，提供已知、未知、冲突、越权四类测试，依据我提供的真实回答修订并复测，不编造创建或测试成功。"
  ]
];
const businessScenarioContent = `
  <div class="business-note"><b>先选场景，再拆提示词：</b>每次只推进一轮，检查结果后再继续。下面是方法提示，完整分轮指令与虚构材料可下载。</div>
  <div class="business-actions"><a class="pixel-btn" href="./assets/practice/ai-driver-six-scenarios.zip" download>下载六场景提示词包 ↓</a></div>
  <div class="scenario-methods">${businessScenarios.map(([name,input,method,output,check,prompt],i)=>`<details class="scenario-method"><summary><span>${String(i+1).padStart(2,'0')}</span><strong>${name}</strong><small>展开拆解</small></summary><div class="scenario-method-body"><dl><dt>准备材料</dt><dd>${input}</dd><dt>怎么处理</dt><dd>${method}</dd><dt>交付什么</dt><dd>${output}</dd><dt>怎么验收</dt><dd>${check}</dd></dl><label for="scenario-prompt-${i}">可以这样说</label><textarea id="scenario-prompt-${i}" readonly rows="6">${prompt}</textarea><button type="button" class="secondary" data-copy-scenario="${i}">复制这个场景的提示词</button><span class="scenario-copy-status" role="status"></span></div></details>`).join('')}</div>
  <div class="business-note">仅提供获准材料；缺少信息先确认。发送、发布、创建待办等外部动作须先核准，未执行就保留草稿状态。</div>
  <div class="business-actions"><button class="pixel-btn" data-route="business-solo">选一个场景，练自己的任务 →</button></div>`;
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-copy-scenario]');if(!button)return;
  const prompt=businessScenarios[Number(button.dataset.copyScenario)][5];
  const status=button.nextElementSibling;
  try{await navigator.clipboard.writeText(prompt);status.textContent='已复制，可以粘贴到 WorkBuddy';}
  catch{status.textContent='未能自动复制，请选中文本框中的提示词复制。';}
});

document.addEventListener('toggle',event=>{if(event.target.matches('.scenario-method'))event.target.querySelector('summary small').textContent=event.target.open?'收起拆解':'展开拆解';},true);
