# Academic CV Website

Wei-Tao Lyu 的个人学术 CV 网页，可直接部署到 GitHub Pages。
线上地址：https://weitaolyu.github.io/CV/

## 文件结构

```
.
├── index.html            # 页面结构与内容：Hero、研究专长、论文、经历、项目、技能、联系方式
├── styles.css            # 视觉设计系统：配色、卡片、时间轴、响应式布局、打印样式
├── script.js             # 滚动入场动画、页脚年份自动更新、图片加载失败兜底
├── WeiTaoLyu_CV.pdf      # PDF 版简历（含照片），首页 "View CV PDF" 链接指向它
├── cv_print.html         # PDF 版简历的 HTML 源文件，修改后重新导出即可更新 PDF
├── assets/
│   ├── lwt.jpg           # 头像照片
│   └── config2.png       # 科研视觉图（MKID 阵列与低温光路）
└── README.md
```

## 本地预览

直接用浏览器打开 `index.html` 即可，无需构建工具或本地服务器。

## 修改内容

### 更新网页信息

所有文字内容都在 `index.html` 中，按 section 分块，直接编辑对应区块即可：

- `#expertise` — 研究专长卡片
- `#publications` — 代表论文列表
- `#experience` — 教育与任职时间轴
- `#skills` — 技术技能
- `#contact` — 联系方式（邮箱、电话、ORCID）

在 `index.html` 中搜索 `TODO` 可以找到剩余的占位项（如 GitHub / LinkedIn 链接）。

### 更换图片

- 头像：替换 `assets/lwt.jpg`（或修改 `index.html` 中对应的 `src`）
- 科研视觉图：替换 `assets/config2.png`

### 调整配色

主色调定义在 `styles.css` 顶部的 CSS 变量中：

```css
:root {
  --accent: #2563eb;        /* 主色（学术蓝） */
  --accent-deep: #1e40af;   /* 深蓝 */
  --accent-warm: #d97706;   /* 点缀暖色 */
}
```

### 更新 PDF 简历

1. 编辑 `cv_print.html`
2. 用 Chrome / Edge 打开，打印 → 另存为 PDF（A4、无边距、勾选背景图形），覆盖 `WeiTaoLyu_CV.pdf`

## GitHub Pages 部署

把以上文件推到仓库根目录后，在 GitHub 仓库中打开：

`Settings` → `Pages` → `Build and deployment` → `Deploy from a branch`

选择主分支和 `/ (root)`，保存后等待部署完成即可访问
`https://<用户名>.github.io/<仓库名>/`。
