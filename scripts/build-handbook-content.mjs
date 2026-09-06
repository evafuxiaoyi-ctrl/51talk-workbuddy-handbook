import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..', '..');
const sourcePath = path.join(projectDir, 'AI 培训和认证', 'AI-Driver初级培训手册内容底稿.md');
const outputPath = path.join(scriptDir, '..', 'assets', 'handbook-content.js');

const source = fs.readFileSync(sourcePath, 'utf8');
const lines = source.split(/\r?\n/);
const pages = [];
let area = '全局开场';
let moduleName = '';
let current = null;

function finishPage() {
  if (!current) return;
  current.markdown = current.body.join('\n').trim();
  delete current.body;
  pages.push(current);
  current = null;
}

for (const line of lines) {
  if (/^# 6\. 各模块学习成果与考点/.test(line)) {
    finishPage();
    break;
  }

  const areaMatch = line.match(/^## (全局开场|区域 \d+｜.+|训练完成)$/);
  if (areaMatch) {
    area = areaMatch[1];
    moduleName = '';
    continue;
  }

  const moduleMatch = line.match(/^### 模块 [^｜]+｜(.+)$/);
  if (moduleMatch) {
    moduleName = moduleMatch[1];
    continue;
  }

  const pageMatch = line.match(/^### 页面 (\d{2}) · ([^｜]+)｜(.+)$/);
  if (pageMatch) {
    finishPage();
    current = {
      number: Number(pageMatch[1]),
      numberLabel: pageMatch[1],
      code: pageMatch[2],
      title: pageMatch[3],
      area,
      module: moduleName,
      body: [],
    };
    continue;
  }

  if (current) current.body.push(line);
}

finishPage();

if (pages.length !== 76) {
  throw new Error(`Expected 76 pages, found ${pages.length}`);
}

pages.forEach((page, index) => {
  if (page.number !== index + 1) {
    throw new Error(`Page sequence mismatch at ${index + 1}: ${page.number}`);
  }
});

const areaMeta = {
  '全局开场': { short: '启程', en: 'Start', accent: '#ffeb3c' },
  '区域 0｜入场装备': { short: '入场装备', en: 'Setup', accent: '#21c2ff' },
  '区域 1｜新手启航村': { short: '新手启航', en: 'First mission', accent: '#35cc83' },
  '区域 2｜装备工坊': { short: '装备工坊', en: 'Toolkit', accent: '#ff8a34' },
  '区域 3｜AI 员工召唤工坊': { short: '召唤工坊', en: 'Personal Expert', accent: '#f45d93' },
  '区域 4｜业务任务训练场': { short: '业务训练', en: 'Business task', accent: '#7b5cff' },
  '区域 5｜品质安全守护堡': { short: '品质安全', en: 'Quality & safety', accent: '#ff715f' },
  '训练完成': { short: '训练完成', en: 'Training complete', accent: '#35cc83' },
  '区域 6｜D1 模拟考场': { short: 'D1 模拟考', en: 'D1 mock exam', accent: '#ffc400' },
};

const titleEn = {
  1: 'AI Driver Level 1 Playbook', 2: 'Your goal: complete a real work task', 3: 'AI Driver upgrade map',
  4: 'Set up your AI workspace', 5: 'Install WorkBuddy Enterprise', 6: 'Sign in to the 51Talk workspace',
  7: 'Meet WorkBuddy', 8: 'Find where a task begins', 9: 'Where sources and instructions belong',
  10: 'Find Experts, Skills, and Connectors', 11: 'Create your first blank task', 12: 'Create a daily report with Mike',
  13: 'Get today’s work records', 14: 'Read the six-part task card', 15: 'Create the report in WorkBuddy',
  16: '60-second daily report check', 17: 'Upgrade from daily to weekly reporting', 18: 'Prepare one week of work materials',
  19: 'Write the six-part weekly report card', 20: 'Save your first weekly report', 21: 'Give your report a repeatable method',
  22: 'Do you need a connection or a method?', 23: 'Install the DingTalk Connector', 24: 'What work should become a Skill?',
  25: 'What a qualified Skill must define', 26: 'Create a verifiable weekly report Skill', 27: 'Test the Skill with two inputs',
  28: 'Revise it and decide when to use it', 29: 'Add trusted knowledge to your report', 30: 'Task context is not a knowledge base',
  31: 'What deserves long-term knowledge', 32: 'Install the LLM Wiki Skill', 33: 'How LLM Wiki organizes knowledge',
  34: 'Organize reporting rules and project context', 35: 'Find knowledge issues and test retrieval', 36: 'Create your reporting Personal Expert',
  37: 'Skill or Personal Expert?', 38: 'Write the Personal Expert role card', 39: 'Create a Personal Expert in WorkBuddy',
  40: 'Configure role, task, and boundaries', 41: 'Let the expert use the LLM Wiki Skill', 42: 'Run four pressure tests',
  43: 'Revise, retest, and complete the area', 44: 'Break any business task into one workflow', 45: 'Source, rules, output, and delivery',
  46: 'Find your own task or use an example', 47: 'What sources do you read repeatedly?', 48: 'What rules do you apply repeatedly?',
  49: 'What result do you need to deliver?', 50: 'Where should the result go?', 51: 'Generate your real scenario card',
  52: 'Which capabilities does this task need?', 53: 'Read sources and process by the rules', 54: 'Create an output preview first',
  55: 'Confirm, deliver, and read back', 56: 'Submit the result and run evidence', 57: 'Plausible does not mean true',
  58: 'Find unsupported claims and wrong numbers', 59: 'Completed, in progress, planned, or unconfirmed?', 60: 'Verify against the original sources',
  61: 'Which sources may be used?', 62: 'Pause before external action', 63: 'Submit the final revised result',
  64: 'Review your D1 training assets', 65: 'Training complete; mock exam available', 66: 'Enter the D1 mock exam',
  67: 'Training, mock exam, and formal exam', 68: 'Independent judgment rules', 69: 'What you may use in the practical section',
  70: 'How to ask for process support', 71: 'Identity, language, and environment check', 72: 'Receive a new task B',
  73: 'Answer independently and lock', 74: 'Complete the timed WorkBuddy task', 75: 'Submit evidence and finish',
  76: 'View your mock exam result',
};

const chapterPages = new Set([4, 12, 17, 21, 29, 36, 57, 66]);
const completionPages = new Set([16, 28, 35, 43, 56, 63, 64, 65, 76]);
const examPages = new Set([66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76]);
const actionPages = new Set([5, 6, 8, 10, 11, 15, 18, 19, 20, 23, 26, 27, 28, 32, 34, 35, 38, 39, 40, 41, 42, 43, 44, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 60, 61, 62, 63, 71, 72, 73, 74, 75]);

for (const page of pages) {
  page.titleEn = titleEn[page.number] || page.title;
  page.areaMeta = areaMeta[page.area] || areaMeta['全局开场'];
  page.type = page.number === 1 ? 'cover'
    : page.number === 2 ? 'mission'
      : page.number === 3 ? 'map'
        : examPages.has(page.number) ? 'exam'
          : completionPages.has(page.number) ? 'completion'
            : chapterPages.has(page.number) ? 'chapter'
              : actionPages.has(page.number) ? 'action'
                : 'lesson';
}

const payload = {
  generatedAt: new Date().toISOString(),
  source: path.relative(path.dirname(outputPath), sourcePath),
  pages,
  areas: Object.entries(areaMeta).map(([name, meta]) => ({ name, ...meta })),
};

const output = `/* Generated from AI-Driver初级培训手册内容底稿.md. Do not edit by hand. */\nwindow.HANDBOOK_DATA = ${JSON.stringify(payload, null, 2)};\n`;
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Generated ${pages.length} pages -> ${outputPath}`);
