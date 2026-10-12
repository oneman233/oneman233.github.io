# FG-TIDA 宣传介绍页

一套可直接部署到 GitHub Pages 的静态网页。默认中文，右上角可切换英文。无需 Node.js、npm、数据库或构建流程，也不依赖在线字体、CDN 或第三方图片。

## 文件

- `index.html`：页面内容、双语文案和概念图。
- `styles.css`：布局、手机适配、动效、打印和减少动态效果的支持。
- `script.js`：语言切换、手机导航和授权规则演示。
- `favicon.svg`：自绘站点图标。
- `.nojekyll`：空文件，让 GitHub Pages 直接发布静态资源。
- `README.md`：本说明。

请保持这些文件的相对位置；上传的是解压后的文件，不是 ZIP 文件本身。

## 本地查看

直接双击 `index.html` 即可。没有 JavaScript 时，主要内容与议题展开仍可阅读；动态演示会显示文字说明。

如习惯本地服务器，可在文件所在目录运行：

```bash
python -m http.server 8000
```

打开 http://localhost:8000 。这只是本地预览，GitHub Pages 部署不需要服务器。

## 方式一：新建一个 GitHub Pages 仓库

1. 在 GitHub 新建仓库，例如 `fg-tida`。使用免费账户时，可采用公开仓库。
2. 解压文件包。在仓库选择 **Add file → Upload files**，将 `index.html`、`styles.css`、`script.js`、`favicon.svg`、`.nojekyll` 与 `README.md` 放到仓库根目录，然后提交到 `main`。
3. 打开 **Settings → Pages**。
4. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
5. 选择 **main** 分支和 **/(root)**，点击 **Save**。
6. 等待部署任务完成；在 Pages 设置页查看生成的站点链接。通常是：

   `https://你的GitHub用户名.github.io/fg-tida/`

若你的 GitHub 用户名仍为 `oneman233`，且仓库名采用 `fg-tida`，对应地址将是：

https://oneman233.github.io/fg-tida/

此处是地址示例，文件交付时尚未部署。

如果本地文件管理器没有显示 `.nojekyll`，可以在 GitHub 中新建这个名字的空文件。对于这套没有下划线资源目录的简单页面，它不是必需文件，但建议保留。

## 方式二：放到现有 GitHub Pages 网站的子目录

如果现有站点已正常发布，可以新建 `tida/` 文件夹，将本套网页文件放进去：

- `tida/index.html`
- `tida/styles.css`
- `tida/script.js`
- `tida/favicon.svg`

保留原网站首页，将新的介绍页通过链接接入。示例：

```html
<a href="./tida/">FG-TIDA：人类与 AI 代理的信任与身份</a>
```

例如，现有站点为 `https://oneman233.github.io/sg17/`，文件放在该站点发布目录的 `tida/` 下，那么访问地址为：

https://oneman233.github.io/sg17/tida/

如果现有 Pages 发布的是 `/docs`，需要放进 `docs/tida/`；如果采用 GitHub Actions 构建，则需要确保 `tida/` 被复制到实际部署产物中。本套 CSS 和 JS 使用相对路径，因此无需针对仓库名称改路径。

## 修改内容

双语内容使用 `data-zh` 与 `data-en` 保存。修改时，请同步修改这两个属性和元素中的默认中文文字。例如：

```html
<span data-zh="参与协作" data-en="Get involved">参与协作</span>
```

- 配色：修改 `styles.css` 顶部的 `:root` 变量。
- 外部入口：修改 `index.html` 对应链接。
- 演示文案与规则：修改 `script.js` 中的 `copy`、`price` 和 `updateDecision()`。
- 页脚核对日期：更新内容后同步修改中英文日期。

语言偏好仅保存在访问者自己的浏览器中。页面没有统计脚本，没有远程数据请求，也不提交机票或支付操作。

## 内容依据与页面定位

这是独立宣传介绍页，未使用 ITU 官方徽标，不代表 ITU 或 FG-TIDA 的官方立场。页面中的信任概念图是自绘示意，授权演示是教学用规则示例，不能用于实际安全校验，也不是正式标准实现。

公开信息核对日期：2026-10-12。正式名称采用目前官方网页的 **Trust and Identity for Humans and Agentic AI**。页面围绕身份、授权、信任判断和行动证据展开；四个议题是解释视角，不声称是四个正式工作组。草案、技术报告和技术规范也不等同于已批准的 ITU-T 建议书。

信息与参与入口：

- [ITU 官方介绍](https://www.itu.int/en/ITU-T/focusgroups/tida/Pages/default.aspx)
- [Terms of Reference](https://www.itu.int/en/ITU-T/focusgroups/tida/Pages/ToR.aspx)
- [FG-TIDA GitHub](https://github.com/FG-TIDA)
- [研究主题](https://github.com/FG-TIDA/themes)
- [用例提交](https://github.com/FG-TIDA/use-cases)
- [AI 代理远程证明分析](https://github.com/FG-TIDA/wg1-ra-aai)
- [议程与纪要](https://github.com/FG-TIDA/meetings)
- [TIDA 社区](https://tida.community/)
- [GitHub Pages 部署说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

会议日期、参与条件和贡献流程可能变化，请从对应官方入口查阅最新安排。

## 验证范围

交付前检查 JavaScript 语法、页面内部锚点、本地资源引用、中英文文案属性，以及 DOM 环境中的语言切换、授权判断、预算边界、预设情形和手机菜单交互。当前环境未提供浏览器预览能力，因此未完成真实浏览器的视觉验收。部署前可自行在桌面与手机浏览器查看页面。
