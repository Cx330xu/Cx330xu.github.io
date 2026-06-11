---
title: PDF Vector Extractor
description: 高精度 PDF 矢量区域截取工具，支持 10+ 种 PDF 结构解析，输出可缩放矢量 PDF，服务于 RAG 文档预处理管道
date: 2026-01-15
status: active
featured: true
github: https://github.com/Cx330xu/pdf_vector_extractor
stack:
  - JavaScript
  - HTML
  - Web
tags:
  - Tools
  - PDF
draft: false
translationKey: pdf-vector-extractor
---

## 背景

传统 PDF 截图会栅格化，文本不可选、放大失真。学术与文档场景需要保留矢量格式的区域导出。

## 架构

- 纯前端 Web 应用（`index矢量截取.html` 为主入口）
- 客户端处理，文件不上传服务器
- IndexedDB / SessionStorage 保存工作进度

## 关键决策

- 输出裁剪后的 PDF 而非 PNG/JPG，保留矢量与可选中文本
- 支持批量截取、X 轴锁定、键盘快捷键等效率功能

## 结果

- 适用于论文摘录、专业文档归档等场景
- MIT 开源，详见仓库 README
