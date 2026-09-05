# 部署到 oneman233.github.io

这个页面设计为现有 Jekyll 博客中的独立栏目。部署后地址为：

`https://oneman233.github.io/sg17/`

## 推荐方式：使用分支和 Pull Request

在本地克隆仓库并进入仓库目录：

```bash
git clone https://github.com/oneman233/oneman233.github.io.git
cd oneman233.github.io
```

创建功能分支：

```bash
git switch -c feature/sg17-explainer
```

把本文件夹中的 `index.html`、`styles.css`、`script.js` 放入仓库的 `sg17/` 目录，并在 `_config.yml` 的 `navigation` 下添加：

```yaml
  - name: SG17科普
    url: /sg17/
```

提交并推送：

```bash
git add sg17 _config.yml
git commit -m "Add bilingual SG17 outreach explainer"
git push -u origin feature/sg17-explainer
```

然后在 GitHub 创建 Pull Request，检查文件变化后合并到 `master`。如果仓库的 Pages 设置仍使用 `master` 分支根目录，合并后 GitHub Pages 会自动构建。

## 检查 GitHub Pages 设置

打开仓库：`Settings → Pages`。

- Source 选择 `Deploy from a branch`。
- Branch 选择 `master`。
- Folder 选择 `/ (root)`。

保存后，在仓库的 `Actions` 页面查看 `pages build and deployment`。构建成功后访问：

`https://oneman233.github.io/sg17/`

## 更新网页

以后只需要修改 `sg17/index.html`、`sg17/styles.css` 或 `sg17/script.js`，再次提交并推送到发布分支。网页中的工作项状态容易变化，更新时应优先核对：

- SG17 官方主页；
- SG17 Work Programme；
- 最近一次 SG17 meeting summary；
- FG-TIDA 官方主页。

## 发布前的安全检查

当前公开仓库的 `_config.yml` 中包含 Gitalk 使用的 OAuth `clientSecret`。在继续部署前，建议在 GitHub 的 `Settings → Developer settings → OAuth Apps` 中撤销或轮换相关凭据，并避免继续把可用密钥提交到公开仓库。网页前端无法安全保存真正的客户端密钥。

## 常见问题

- **页面返回 404：** 确认文件名是小写的 `sg17/index.html`，并检查 Pages 构建是否成功。
- **导航栏没有更新：** `_config.yml` 的修改会触发完整 Jekyll 构建；等待构建完成后再强制刷新浏览器。
- **样式没有更新：** 使用 `Ctrl+F5`，或等待 GitHub Pages/CDN 缓存刷新。
- **不想修改博客导航：** 只提交 `sg17/` 目录即可，宣传页仍可通过完整网址访问。
