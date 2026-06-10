import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const htmlPath = path.join(root, '..', '提示词工程技术文档.html');
const outPath = path.join(root, 'src/content/blog/zh/prompt-engineering.md');

const html = fs.readFileSync(htmlPath, 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

// Convert mermaid blocks to fenced code before turndown
doc.querySelectorAll('.mermaid').forEach((el) => {
  const code = el.textContent?.trim() ?? '';
  const pre = doc.createElement('pre');
  pre.textContent = `\`\`\`mermaid\n${code}\n\`\`\``;
  el.closest('.mermaid-container')?.replaceWith(pre);
});

// Remove hero image and decorative controls
doc.querySelectorAll('.mermaid-controls, nav.toc-fixed, script, style').forEach((el) => el.remove());

const main = doc.querySelector('main');
if (!main) throw new Error('main not found');

// Drop hero grid image section - keep text intro from #introduction onward
const intro = main.querySelector('#introduction');
if (intro) {
  const hero = main.querySelector('section.bg-white.shadow-sm');
  hero?.remove();
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
});

turndown.addRule('preCode', {
  filter: (node) => node.nodeName === 'PRE' && node.textContent?.startsWith('```mermaid'),
  replacement: (content) => `${content.trim()}\n\n`,
});

turndown.addRule('codeBlock', {
  filter: (node) => node.nodeName === 'PRE' && node.classList.contains('code-block'),
  replacement: (_content, node) => {
    const code = node.textContent ?? '';
    return `\n\`\`\`python\n${code.trim()}\n\`\`\`\n\n`;
  },
});

let body = turndown.turndown(main.innerHTML);

// Cleanup artifacts
body = body
  .replace(/&#34;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\n{3,}/g, '\n\n')
  .replace(/^\s+|\s+$/g, '');

const frontmatter = `---
title: 提示工程技术文档
description: 深入解释提示工程的核心原理，详细探讨思维链、少样本学习、RAG 等关键技术方法
date: 2025-09-17
category: ai
tags:
  - LLM
  - Prompt Engineering
  - RAG
  - Agent
featured: true
draft: false
translationKey: prompt-engineering
originalSource: https://blog.csdn.net/Xu_youyaxianshen
---

> 本文由原 HTML 技术文档转换而来，首发于 [CSDN（Xu_youyaxianshen）](https://blog.csdn.net/Xu_youyaxianshen?type=blog)。

`;

fs.writeFileSync(outPath, frontmatter + body + '\n', 'utf8');
console.log(`Written ${outPath} (${(frontmatter + body).length} chars)`);
