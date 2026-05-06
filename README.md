# Lumi Landing / Product Demo

这是「拾光 AI / Lumi」的前端项目，目前分成两条清晰的工作线：

- **Landing Page**：产品官网主页，用来讲定位、故事、品牌气质和转化。
- **Product Demo**：HTML 交互样机，用来展示 Lumi App 的页面、状态流和核心产品机制。

核心原则：官网负责“讲清楚 Lumi 是什么”，Demo 负责“让人点着体验 Lumi 怎么工作”。

## 路由

| 路由 | 页面 | 用途 |
| --- | --- | --- |
| `/` | Landing Page | 产品官网主页 |
| `/demo` | Product Demo | 可点击的产品 demo 样机 |
| `/404` | Not Found | 兜底页面 |

## 目录说明

```text
lumi-landing/
  client/                  前端源码和前端静态资源
    src/
      pages/
        landing/           官网主页代码
        demo/              产品 demo 样机代码
      components/          通用 React 组件
      components/ui/       UI 基础组件
      contexts/            React context
      hooks/               通用 hooks
      lib/                 工具函数
    public/
      assets/lumi/         Lumi 正式页面素材

  server/                  Express 静态服务
  shared/                  前后端共享常量
  patches/                 pnpm 依赖补丁
  docs/                    项目文档、结构说明、产品策略
    strategy/              产品定位、竞品、demo 方向、早期想法
    screenshots/           视觉迭代截图和检查截图
  dist/                    构建产物，不手动编辑
  node_modules/            依赖包，不手动编辑

  package.json             脚本和依赖声明
  pnpm-lock.yaml           依赖锁文件
  vite.config.ts           Vite 配置
  tsconfig*.json           TypeScript 配置
  PROJECT_RULES.md         项目特殊规则
```

## 关键文件

| 文件 | 作用 |
| --- | --- |
| `client/src/App.tsx` | 路由入口，决定 `/` 和 `/demo` 分别渲染什么 |
| `client/src/pages/landing/LandingPage.tsx` | 当前官网主页 |
| `client/src/pages/demo/LumiDemo.tsx` | 当前产品 demo 样机入口 |
| `client/src/pages/demo/demoFlow.ts` | demo 的 mock 数据和流程节点 |
| `client/src/index.css` | 全局样式和 landing 视觉系统 |
| `docs/PROJECT_STRUCTURE.md` | 项目结构和 demo 原则说明 |
| `docs/strategy/ideas.md` | 早期设计想法归档 |

## 工作边界

### Landing Page

放在：

```text
client/src/pages/landing/
```

适合做：

- 品牌叙事
- 产品定位
- 情绪表达
- 官网首屏、场景页、CTA
- 面向外部用户的介绍页面

不适合放：

- App 内部状态流
- mock 产品数据
- demo 交互逻辑
- 类后台或类 App 的复杂界面

### Product Demo

放在：

```text
client/src/pages/demo/
```

适合做：

- 可点击 HTML demo
- App 页面样机
- mock 收藏数据
- Lumi 主动出现的状态流
- 轻量行动卡生成流程
- 手机端 / 桌面端产品交互展示

Demo 的核心闭环是：

```text
跨 App 收藏 -> 意图识别 -> 主动唤醒卡 -> 轻量行动 -> 记忆更新
```

注意：Demo 不要做成知识库后台。它要展示 Lumi 的主动性，而不是让用户进入一个资料库里搜索和整理。

## 常用命令

```bash
pnpm run dev
```

启动 Vite 开发服务器。

```bash
pnpm run check
```

运行 TypeScript 检查。

```bash
pnpm run build
```

构建前端和服务端产物。

如果 `pnpm run build` 因为本地环境权限失败，可以按 `PROJECT_RULES.md` 使用本地 Vite 二进制：

```bash
node_modules/.bin/vite.CMD build
```

## 本地预览注意事项

项目里有一个重要规则：`http://127.0.0.1:3000/` 可能服务的是 `dist/public` 里的生产构建，而不是 Vite dev server 的源码。

所以视觉改动后，确认页面是否生效时要注意：

1. 先改 `client/src` 下的源码。
2. 运行构建。
3. 检查 `dist/public/index.html` 是否引用了新的 `assets/index-*.css` 和 `assets/index-*.js`。
4. 再刷新浏览器验证。

详细规则见：

```text
PROJECT_RULES.md
```

## 文件管理规则

### 可以经常编辑

- `client/src/pages/landing/`
- `client/src/pages/demo/`
- `client/src/index.css`
- `docs/`
- `PROJECT_RULES.md`
- `README.md`

### 谨慎编辑

- `vite.config.ts`
- `package.json`
- `tsconfig*.json`
- `server/`
- `shared/`

### 不要手动编辑

- `dist/`
- `node_modules/`
- `pnpm-lock.yaml`，除非依赖变化

## 资产管理建议

正式被页面使用的图片放在：

```text
client/public/assets/lumi/
```

设计迭代截图、视觉检查截图、临时稿建议放在：

```text
docs/screenshots/
```

当前截图归档：

```text
docs/screenshots/definition-landing/   官网定义区迭代截图
docs/screenshots/final-candidates/     最后一屏 / demo 候选截图
docs/screenshots/visual-checks/        视觉检查截图
```

根目录尽量只保留配置文件和项目说明，不长期堆放截图、草稿和临时文件。

## 当前产品定位

Lumi 不是传统知识库，也不是简单的收藏整理工具。

更准确的方向是：

```text
个人收藏/记忆的主动型 Agent
```

核心体验：

```text
用户在别的 App 里随手收藏
-> Lumi 理解他想成为谁
-> 在合适时机主动出现
-> 用轻量展示唤醒他
-> 推他完成一个小行动
```

一句话表达：

> Lumi 会从你随手收藏的内容里，读出你正在靠近的方向，并在合适的时候主动出现，帮你完成下一步。

## 后续建议

优先把 `/demo` 做成一条完整、可点击的样机路径：

```text
开始体验
-> 展示最近收藏
-> Lumi 识别 AI Agent 方向
-> 主动唤醒卡出现
-> 生成 AI Agent 学习路线卡
-> 完成今天一步
-> 更新成长线索
```

第一版可以全部使用 mock 数据。目标不是先接真实后端，而是验证这个交互闭环是否成立。
