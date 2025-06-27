---
title: Storybook
---

# Storybook

- [nextjs/examples/with-storybook](https://github.com/zeit/next.js/tree/canary/examples/with-storybook)
- 插件 - [addons](https://github.com/storybookjs/storybook/tree/next/addons)
  - actions - 纪录事件
  - links - 内部跳转
  - storysource - 查看源码
  - viewport - 不同设备视图
  - toolbars - 工具栏、上下文参数
  - docs - 生成文档
    - 不支持外部库 [#10034](https://github.com/storybookjs/storybook/issues/10034)
    - [reactjs/react-docgen#416](https://github.com/reactjs/react-docgen/issues/416)
  - essentials - actions, backgrounds, controls, docs, measure, outline, toolbars, viewport
- 问题
  - bundle 过大 - [#6391](https://github.com/storybookjs/storybook/issues/6391#issuecomment-530262331)
    - webpack 拆分
  - npm 7+react 17 兼容问题 [#14065](https://github.com/storybookjs/storybook/issues/14065)
- Component Story Format (CSF) - Storybook
  - https://storybook.js.org/docs/react/api/csf

```bash
# 初始化
npx sb init

# 手动安装
npm add -D @storybook/{react,addons,testing-library,builder-vite,react-vite}
# knob
npm add -D @storybook/addon-{actions,links,essential,interactions}
```

## 配置 {#configuration}

- .storybook/manager.js - 控制 StoryBook UI

```tsx title=".storybook/preview.js"
// 全局样式
import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  // 全局参数
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
    ],
  },
};

import React from 'react';

export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];

export const globalTypes = {};
```

## docs

- 所有 stories 都会生成 DocsPage

```tsx
import { Meta } from '@storybook/addon-docs';
import Changelog from '../CHANGELOG.md';

<Meta title="Changelog" />

<Changelog />
```

**隐藏 Docs**

```ts
export default {
  title: 'YourTitle',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'canvas',
  },
};
```

**默认 Docs**

```ts
export default {
  title: 'YourTitle',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
};
```


## Meta

```tsx
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
```

# Version

# FAQ

## Invariant failed: No matching indexer found for Loaders.stories.mdx

- `Loaders.stories.mdx` -> `Loaders.mdx`
