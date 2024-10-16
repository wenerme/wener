---
title: lingui
tags:
  - i18n
---

# lingui

- [lingui/js-lingui](https://github.com/lingui/js-lingui)
  - 支持 macro
  - 支持 语义
  - 支持 自动提取
  - 支持 PO 格式
  - https://lingui.dev/

```bash
pnpm add @lingui/macro @lingui/react
pnpm add -D @lingui/cli
# for SWC, NextJS
# 注意选择版本 https://github.com/lingui/swc-plugin#compatibility
pnpm add -D @lingui/swc-plugin

# ./src/locale/{local}/messages.po
pnpm lingui extract --clean
# ./src/locale/{local}/messages.po -> ./src/locale/{local}/messages.js
pnpm lingui compile
```

```js title="lingui.config.js"
/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'zh'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
};
```

**NextJS**

```js title="next.config.js"
/** @type {import('next').NextConfig} */
module.exports = {
  // to use Lingui macros
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
};
```

```tsx
import { Trans, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

export function SomeComponent() {
  const { i18n } = useLingui();
  return (
    <div>
      <p>
        <Trans>Some Item</Trans>
      </p>
      <p>{t(i18n)`Other Item`}</p>
    </div>
  );
}
```

## Notes

- CatalogFormat - https://lingui.dev/ref/catalog-formats
  - lingui
  - minimal
  - po
    - 推荐，默认
    - 支持注释、元数据（origin, flags），上下文
    - i10n 标准格式
    - ICU plural syntax
  - csv
  - po-gettext
    - PO with gettext Plurals

```json title="minimal"
{
  "messageId": "translation"
}
```

```json title="Lingui"
{
  "messageId": {
    "translation": "Translated message",
    "message": "Default message",
    "description": "Comment for translators",
    "origin": [["src/App.js", 3]]
  },
  "obsoleteId": {
    "translation": "Obsolete message",
    "origin": [["src/App.js", 3]],
    "obsolete": true
  }
}
```
