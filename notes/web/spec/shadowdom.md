---
title: ShadowDOM
---

# ShadowDOM

- mdn [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)
- [construct-stylesheets](https://wicg.github.io/construct-stylesheets/)

:::caution

- vite css https://github.com/vitejs/vite/issues/11855
  - https://github.com/web-widget/vite-plugin-shadow-dom-css
- HeadlessUI Portal
  - https://github.com/tailwindlabs/headlessui/discussions/874
- AntD style & portal
  - https://github.com/ant-design/ant-design/issues/38911
- react-hot-toast inject style
  - https://github.com/timolins/react-hot-toast/issues/189

:::

- :host
- :root

**AntD**

```ts
import React from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs';
import enUS from 'antd/es/locale/en_US';

const container = myShadowRootHere;

const App = () => {
  return (
    <AntdStyleProvider container={container}>
      <AntdConfigProvider
        locale={enUS}
        theme={{
          token: {
            colorPrimary: '#000',
          },
        }}
      >
        {/* Rest of the code */}
      </AntdConfigProvider>
    </AntdStyleProvider>
  );
};
```

```ts
function patchHeadlessUiPortalRoot(host) {
  const portal = document.getElementById('headlessui-portal-root');
  const _shadow = host.shadowRoot?.children[0];
  if (_shadow && portal) {
    _shadow.appendChild(portal);
    return true;
  }
  return false;
}
```

# FAQ

## Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.

## open vs closed

决定了外部脚本能否通过宿主元素访问 shadowRoot

```js
el.attachShadow({ mode: 'open' })
```

- open
  - 外部可以通过 el.shadowRoot 访问到 shadow root
  - 可以用 document.querySelector 等手段找到并操作内部 DOM、样式、adoptedStyleSheets 等。
  - 适用场景：需要与宿主页面或第三方库交互（注入样式、portal、测试、调试）时优先使用。
- closed
  - el.shadowRoot 将返回 null，常规 API 无法直接访问内部 shadow DOM（即对外封装更严格）
  - 注意浏览器的开发者工具可能仍能显示内部树，但脚本访问受限。
  - 适用场景：追求更强封装、避免外部意外篡改内部实现时使用。但会给集成第三方库、样式注入和调试带来额外难度。

```
Shadow root cannot be created on a host which already hosts a shadow tree.
```

- 使用 shadowRoot.adoptedStyleSheets 注入样式
  - closed 无法获取 shadowRoot， 也无法注入样式
