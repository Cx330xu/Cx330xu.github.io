# Cx330xu · Personal Tech Hub

中英双语个人技术站点，基于 [Astro](https://astro.build) 构建，部署于 [GitHub Pages](https://Cx330xu.github.io/)。

## 功能

- 中英双语（`/zh/` · `/en/`）
- 项目展示 + 技术栈筛选
- 技术博客（分类 / 标签）
- Notes 短笔记
- RSS · 归档 · 暗色模式 · Giscus 评论

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

## 发布内容

| 类型 | 路径 |
|------|------|
| 项目 | `src/content/projects/{zh\|en}/` |
| 博客 | `src/content/blog/{zh\|en}/` |
| 笔记 | `src/content/notes/{zh\|en}/` |
| 关于 | `src/content/pages/{zh\|en}/about.md` |
| 站点信息 | `src/data/site.ts` |

新建 Markdown 后 `git push` 到 `main`，GitHub Actions 自动部署。

## Giscus 评论配置

1. 在 GitHub 仓库 **Settings → General → Features** 开启 **Discussions**
2. 访问 [giscus.app](https://giscus.app)，选择仓库 `Cx330xu/Cx330xu.github.io`，分类 **General**
3. 配置已写入 `src/data/site.ts` 的 `giscus` 字段（如需更换分类，修改 `category` / `categoryId`）

## 部署

1. 创建仓库 `Cx330xu/Cx330xu.github.io`
2. 推送本目录到 `main` 分支
3. **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**（⚠️ 不要选 Deploy from a branch）
4. 在 Actions 页确认运行的是 **Deploy to GitHub Pages**（Astro 构建），而不是 **pages build and deployment**（Jekyll）
5. 首次 push 后等待 Actions 完成，访问 https://Cx330xu.github.io/

### 部署报错排查

| 现象 | 原因 | 处理 |
|------|------|------|
| 日志出现 `jekyll v3.10.0` | Pages 源设成了分支部署，GitHub 用 Jekyll 构建 | Settings → Pages → Source 改为 **GitHub Actions** |
| 运行的是 `pages build and deployment` | 同上，内置 Jekyll 工作流 | 改 Source 后，手动运行 **Deploy to GitHub Pages** |
| 运行的是 `Deploy to GitHub Pages` 但失败 | Astro 构建问题 | 查看 build 步骤日志，本地 `npm run build` 复现 |

## 隐私

本站不公开学校、学历、电话、微信。公开联系方式：GitHub + cx330xu@qq.com
