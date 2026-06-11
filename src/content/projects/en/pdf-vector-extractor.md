---
title: PDF Vector Extractor
description: High-precision PDF vector region extractor supporting 10+ PDF structures, outputting scalable vector PDFs for RAG document preprocessing pipelines
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

## Background

Raster PDF screenshots lose selectable text and clarity when zoomed. This tool exports cropped regions as vector PDFs.

## Architecture

- Client-side Web app (`index矢量截取.html` as main entry)
- No server upload — privacy-first processing
- IndexedDB / SessionStorage for session persistence

## Key decisions

- Vector PDF output instead of PNG/JPG
- Batch capture, axis locking, and keyboard shortcuts for productivity

## Outcome

- Useful for academic excerpts and document archiving
- MIT licensed — see repo README
