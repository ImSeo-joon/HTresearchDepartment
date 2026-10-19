# 高桌科研发展司 · High Table Research Department

一个纯静态、无需构建的工科科研全链路工坊站点。默认英文，支持 **English / 中文 / Français** 三语切换。所有文件都在本目录内，可直接作为 GitHub Pages 仓库根目录上传。

> 当前本地目录：`D:\HighTableProgram\HighTableresearchDepartment`

## 本地预览

在本目录运行任意静态服务器：

```bash
python -m http.server 4173 --bind 127.0.0.1
```

然后打开 <http://127.0.0.1:4173>。

直接双击 `index.html` 也能看到大部分内容，但建议用本地服务器，尤其是测试语言切换、锚点跳转与浏览器本地存储时。

## 推到 GitHub Pages

1. 在 GitHub 新建一个仓库。
2. 把**本目录里的全部内容**上传到仓库根目录，确保 `index.html` 在根目录，而不是再套一层文件夹。
3. 打开仓库的 **Settings → Pages**。
4. **Build and deployment** 选择 **Deploy from a branch**。
5. 分支选 `main`，目录选 `/ (root)`，保存。
6. 等一两分钟，GitHub 会给出站点地址。

`.nojekyll` 已包含，避免 GitHub Pages 对静态资源做额外处理。

## 站点内容

- **首页**：以「L'ATELIER」窗景为背景的品牌首页、十阶段科研全链路、可交互方法匹配器，以及最新论文精选。
- **Research Studio**：按学科、意图、证据、情境、周期、团队与风险偏好，生成研究章程、问题阶梯、推荐设计、伦理提示、时间线、可行性评分、风险登记与未来七天行动；可下载 Markdown 或打印。
- **Paper Index**：
  - 81 篇经 arXiv / Crossref / OpenAlex 元数据核验的论文，覆盖 28 个工科细分方向。
  - 默认按精确日期倒序，优先展示 2024–2026 年论文；可筛选 2024–2026、2020–2023、2020 年以前。
  - 按「数字与信息 / 智能与控制 / 电子与通信 / 材料与制造 / 土木与环境 / 生命与能源 / 交叉工科」分组。
  - 每篇含中英法注释、标签、引用与原文链接，可直接加入文献矩阵或导出 CSV。
- **Toolkit**：
  - 文献矩阵：添加、搜索、筛选、删除、导出 CSV；数据保存在浏览器本地。
  - 样本量计算器：单一比例、置信水平、误差范围、有限总体校正、设计效应与无应答调整。
  - 摘要锻造台：背景、缺口、方法、发现、启示五段式摘要；草稿保存在浏览器本地。
  - 阅览室：八本/篇研究技艺书目。
- **Field Notes**：四篇长文随笔，以及十二个研究术语的工作定义。
- **Defence Room**：八个答辩问题，可展开教练提示并标记“准备好了 / 还需练习”。
- **404**：自定义错误页。

## 文件结构

```text
.
├─ index.html
├─ studio.html
├─ toolkit.html
├─ papers.html
├─ notes.html
├─ 404.html
├─ manifest.webmanifest
├─ sw.js
├─ .nojekyll
├─ README.md
├─ tools/
│  └─ build-icons.ps1        从 app-icon-source.jpg 重新生成圆角/透明 PWA 图标
└─ assets/
   ├─ css/
   │  └─ style.css
   ├─ fonts/                 Cormorant Garamond、Noto Serif SC、Noto Sans SC（SIL OFL，中文子集）
   ├─ img/brand/             首页/模块背景、圆角透明 PWA 图标、favicon、社交分享封面
   └─ js/
      ├─ i18n-en.js          英文全站文案与数据
      ├─ i18n-zh.js          中文全站文案与数据
      ├─ i18n-fr.js          法文全站文案与数据
      ├─ field-data.js       28 个工科细分方向的单一数据源（三语标签与分组）
      ├─ site.js             语言切换、导航、动效、下载与本地存储工具
      ├─ home.js             全链路与方法匹配器
      ├─ studio.js           研究章程模拟器与答辩练习
      ├─ toolkit.js          文献矩阵、样本量、摘要与书目
      ├─ paper-data.js       论文索引数据、三语注释与论文页文案
      ├─ papers.js           论文筛选、排序、详情、引用与矩阵导入
      └─ notes.js            随笔弹窗与术语表
```

## 修改方式

- 改文案或内容：编辑 `assets/js/i18n-en.js`、`i18n-zh.js`、`i18n-fr.js`。三份文件结构一致，新增键时请三语同步。
- 改工科细分方向：编辑 `assets/js/field-data.js`；它会同时注入三语的研究工作室选项与论文筛选分组。
- 加论文：编辑 `assets/js/paper-data.js`，字段值使用 `field-data.js` 中的 `value`；默认按 `date` 倒序。
- 改配色与排版：编辑 `assets/css/style.css` 顶部的 CSS 变量。
- 改页面结构：编辑对应的 `.html` 文件。
- 没有打包步骤，也没有外部依赖；字体已自托管，断网也能保持版式。

## PWA 与图标

- `manifest.webmanifest` 已注册 48–512px 图标、maskable 图标、Apple Touch Icon 和论文索引/研究工作室/工具箱快捷方式。
- `icon-192.png`、`icon-512.png` 由 `app-icon-source.jpg` 裁切为圆角方图，四角为透明通道；`icon-maskable-512.png` 为全出血版本，避免 Android 遮罩露底。
- 访客在 Chrome / Edge 中可通过地址栏安装，或点击页面中的「安装应用 / Install app」按钮，把站点作为桌面快捷方式打开。
- 图标可重新生成：

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\build-icons.ps1
```

## 中文字体

站点自托管 **Noto Serif SC**（正文与标题）和 **Noto Sans SC**（界面标签）的可变字重子集，体积约 0.45 MB / 0.34 MB。字体遵循 SIL Open Font License 1.1；授权说明见 `assets/fonts/LICENSE-NOTO.txt`。

## 隐私与边界

- 无账号、无追踪、无分析脚本。
- 文献矩阵与摘要草稿只写入当前浏览器的 `localStorage`，不会上传。
- 站点是教育性工作坊，不替代导师指导、伦理审查或专业咨询。

© 2026 High Table Research Department
