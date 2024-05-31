---
title: puck
---

# puck

- [measuredco/puck](https://github.com/measuredco/puck)
  - MIT, React
  - npm:@measured/puck
  - drag and drop editor for React
- 参考
  - https://demo.puckeditor.com/edit
  - [measuredco/awesome-puck](https://github.com/measuredco/awesome-puck)

```ts
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

// 组件配置
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};

// 初始数据
const initialData = {
  content: [],
  root: {},
};

// 保存数据
const save = (data) => {};

// 渲染编辑器
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}

import { Render } from "@measured/puck";

// 渲染内容
export function Page() {
  return <Render config={config} data={data} />;
}
```

- https://github.com/measuredco/puck/blob/main/packages/core/types/Config.tsx
