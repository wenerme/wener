---
title: Ant Design
tags:
  - Design
  - Design System
  - React
---

# Ant Design

- [ant-design/ant-design](https://github.com/ant-design/ant-design)
  - 丰富强大的组件库
  - **不建议产品使用** - 除非是后台管理系统
- 参考
  - 推荐使用 [react-component](./react-component.md)，antd 的基础库

```bash
npm add antd
```

:::tip

- 非常适用于 **快速** 出原型和结果
- 非常适用于 **内部系统** / 后台管理系统

:::

:::warning 选型考虑

- **过于高度封装**
  - 做出来的东西都差不多，一眼能看出来是 AntD 组件
  - 难以深度自定义
  - 想把什么都做掉做好 - 但结果并不理想
- **大量依赖外部组件**
  - 依赖 [rc-components](https://github.com/react-component) 系列
  - 许多 rc-组件 (如 rc-table, rc-form) 功能非常复杂，但单一功能不如专门的库 (如 react-table, react-hook-form)
  - 类型定义有时不完善，排查问题需要翻 rc-xxx 源码
- **Icon 组件限制**
  - 现在不允许使用字符串，必须引入具体组件 (Bundle Size vs Dev Experience)
- **版本变化快**
  - 样式和 API 经常变动，导致自定义样式维护成本极高
  - v3 -> v4, v4 -> v5 都有较大变动

> **个人经验**: v3 -> v4 后曾尝试 [blueprintjs](./blueprint.md)，最终转向 [tailwindcss](../style/tailwindcss.md) + Headless UI 自建。

:::

## Ecosystem

- **Pro Components** ([@ant-design/pro-components](https://procomponents.ant.design/))
  - 高级组件，进一步封装
  - `ProForm`, `ProTable`, `ProLayout`
- **Mobile** ([ant-design-mobile](https://mobile.ant.design/))
  - v5 是一次重写，质量有很大提升

## Versions

| Version            | Release Date | Key Changes                                       |
| :----------------- | :----------- | :------------------------------------------------ |
| **[v6](#antd-v6)** | 2025-11-21   | React 18+, CSS Variables, React Compiler, Masonry |
| **[v5](#antd-v5)** | 2022-11-18   | CSS-in-JS, Design Tokens, React 18 Support        |
| **[v4](#antd-v4)** | 2020-03-28   | Modular, Hooks, Icon on Demand                    |

### Ant Design v6 {#antd-v6}

> 2025-11 发布，全面拥抱现代 Web 标准。

- **Core Changes**
  - **React 18+ Only**: 放弃旧版本 React 支持，兼容 React 19。
  - **Pure CSS Variables**: 默认采用纯 CSS 变量架构，不再依赖 Hash 类名生成样式，实现 0运行时样式生成。
    - 移除 IE 支持。
    - Lighter bundle size.
  - **Performance**: 启用 React Compiler 优化构建。
- **New Features**
  - **New Components**: `Masonry` (瀑布流), `Splitter` (面板分割).
  - **ConfigProvider**: 增强全局配置能力 (Table rowKey, Tooltip arrows, etc.).
  - **Styles**: 更好的暗黑模式和主题切换体验 (Zero-runtime).
- **Migration**
  - 如果已经在使用 v5，升级较为平滑。
  - 需要确保 `@ant-design/icons` >= 6.0.0.

### Ant Design v5 {#antd-v5}

> 2022-11 发布，架构大升级：CSS-in-JS。

- **Architecture**
  - **CSS-in-JS**: 也就是 [ant-design/cssinjs](https://github.com/ant-design/cssinjs)。
    - **不再支持 LESS**。
    - 动态主题能力大幅增强 (Design Tokens)。
    - 按需加载样式，无需 `babel-plugin-import`。
  - **Day.js**: 替换 Moment.js 为默认日期库 (更轻量)。
- **Components**
  - **New**: `Watermark` (水印), `Tour` (漫游引导), `QRCode`, `FloatButton`, `App` (包裹组件用于提供 Context).
  - **Data Driven**: 更多组件支持数据驱动属性 (`items` prop)，如 Menu, Steps 等，不再单纯依赖 JSX children。
- **Migration**
  - [v4 to v5 Migration Guide](https://ant.design/docs/react/migration-v5)
  - 接口同一化 (open/visible -> open, className -> popupClassName 等).

### Ant Design Mobile v5

- 重写版本，体验更好。
- 使用 `use-gesture` 处理手势。
- 使用 `react-spring` 处理动画。
- 使用 CSS Variables。

---

### Ant Design v4 (Legacy) {#antd-v4}

> 2020-03 发布，重写 Form，图标按需加载。

- **Major Changes**
  - **Form**: 重写，不再需要 `Form.create()` 高阶组件，基于 Hooks。
  - **Icons**: 从字体图标改为 SVG 组件，不再全量引入。
- **Legacy Snippets**

**Installation (v4)**:

```bash
# Basic
yarn add antd @ant-design/icons

# Load Less (Legacy)
yarn add --dev babel-plugin-import
```

**Babel Config (v4)**:

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
      }
    ]
  ]
}
```

**Style Import (v4)**:

```javascript
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

**References**:

- [Migration v4](https://ant.design/docs/react/migration-v4)
- [Form v3 Documentation](https://ant.design/components/form/v3) (Legacy)
- [Simple way of modifying Ant Design default theme](https://dev.to/agmm/simple-way-of-modifying-ant-design-default-theme-3g4h)
