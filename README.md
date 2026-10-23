# Academic CV Website

Wei-Tao Lyu（吕伟涛）的个人学术 CV 网页，可直接部署到 GitHub Pages。
线上地址：https://weitaolyu.github.io/CV/

## 文件结构

```
.
├── index.html            # 页面结构与内容：Hero、研究专长、论文、经历、项目、技能、联系方式
├── styles.css            # 视觉设计系统：配色、卡片、时间轴、响应式布局、打印样式
├── script.js             # 页脚年份、图片加载失败兜底、PDF 导出
├── assets/
│   ├── lwt.jpg           # 头像照片
│   ├── config2.png       # 科研视觉图（MKID 阵列与低温光路）
│   ├── MKID.png          # MKID 器件图
│   └── MKID_setup.png    # 低温测试系统图（附 MKID_setup.pdf）
└── README.md
```

## 本地预览

直接用浏览器打开 `index.html` 即可，无需构建工具或本地服务器。

## 修改内容

### 更新网页信息

所有文字内容都在 `index.html` 中，按 section 分块，直接编辑对应区块即可：

- `#expertise` — 研究专长卡片
- `#publications` — 代表论文列表（每条的年份在最右侧，移动端显示在标题上方）
- `#experience` — 教育与任职时间轴
- `#skills` — 技术技能
- `#contact` — 联系方式（邮箱、电话、ORCID、GitHub）

### 导师与单位链接

时间轴中的导师姓名均已加上个人主页链接，更新时保持同一格式即可：

| 导师 | 单位 | 链接 |
| --- | --- | --- |
| 李华白 教授 | 香港中文大学物理系 | https://wp.phy.cuhk.edu.hk/teaching-staff/li-hua-bai/ |
| 李菂 教授 | 清华大学天文系 | https://astro.tsinghua.edu.cn/info/1040/1044.htm |
| 史生才 教授 | 中科院紫金山天文台 | https://pmo.cas.cn/sourcedb/cn/expert/200907/t20090724_2243737.html |

### 更换图片

- 头像：替换 `assets/lwt.jpg`（或修改 `index.html` 中对应的 `src`）
- 科研视觉图：替换 `assets/config2.png`

### 调整配色

主色调定义在 `styles.css` 顶部的 CSS 变量中：

```css
:root {
  --accent: #245b8f;        /* 主色（学术蓝） */
  --accent-dark: #173e63;   /* 深蓝 */
}
```

## 导出 PDF

点击页面上的 **Export CV as PDF** 按钮（Hero 区或页脚），在浏览器打印对话框中选择
“另存为 PDF”，纸张选 A4 并勾选“背景图形”。打印版式由 `styles.css` 末尾的
`@media print` 规则控制：页眉、导航和按钮会自动隐藏。

## GitHub Pages 部署

把以上文件推到仓库根目录后，在 GitHub 仓库中打开：

`Settings` → `Pages` → `Build and deployment` → `Deploy from a branch`

选择主分支和 `/ (root)`，保存后等待部署完成即可访问
`https://<用户名>.github.io/<仓库名>/`。
