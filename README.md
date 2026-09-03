# Academic CV Website

这是一个可以直接挂到 GitHub Pages 的静态 CV 网页。

## 文件

- `index.html`: 页面内容、CV 信息、链接占位。
- `styles.css`: 页面视觉和响应式布局。
- `script.js`: 年份更新、占位链接防跳转、图片 fallback。
- `Curriculum Vita.pdf`: PDF 简历下载文件，页面已经链接到它。
- `cv.html` / `cv.css`: 生成 `Curriculum Vita.pdf` 的源文件，内容取自 `index.html`。
- `scripts/build-cv.sh`: 用无头 Chromium 把 `cv.html` 渲染成 `Curriculum Vita.pdf` 的脚本。
- `assets/mkid-camera-visual.png`: 网页里的科研视觉图。

## 重新生成 CV PDF

`Curriculum Vita.pdf` 由 `cv.html`（配合 `cv.css`）渲染而成，不建议手动编辑 PDF 本身。修改简历内容后，按以下步骤重新生成：

1. 编辑 `cv.html` / `cv.css` 中的简历内容或样式。
2. 确保本机安装了 Chromium/Chrome（`chromium`、`chromium-browser` 或 `google-chrome` 之一）。
3. 在仓库根目录运行：

   ```bash
   ./scripts/build-cv.sh
   ```

   脚本会用无头浏览器把 `cv.html` 打印为 PDF，并覆盖写入仓库根目录下的 `Curriculum Vita.pdf`，页面和页脚的下载链接（`./Curriculum%20Vita.pdf`）无需改动。

## 需要你替换的位置

在 `index.html` 里搜索 `TODO`，可以快速找到所有占位：

- `assets/profile.jpg`: 放你的头像，或修改对应 `src`。
- `assets/mkid-camera-visual.png`: 可以替换成实验室、仪器或项目图片。
- `href="#"`: 替换成 Google Scholar、ORCID、GitHub/LinkedIn、论文 DOI 等链接。

## GitHub Pages

把这些文件推到仓库根目录后，在 GitHub 仓库里打开：

`Settings` -> `Pages` -> `Build and deployment` -> `Deploy from a branch`

选择主分支和 `/root`，保存后等待部署完成即可。
