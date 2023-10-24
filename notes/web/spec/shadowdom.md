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

## Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.
