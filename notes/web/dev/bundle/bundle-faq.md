---
tags:
  - FAQ
---

# Bundle FAQ

```ts
// for tree-shaking

// 只需要在定义时
/* @__NO_SIDE_EFFECTS__ */

// 所有调用都需要标记
/* @__PURE__ */
```

## .js 文件后缀 {#js-extension}

- 有些场景需要 esm import 包含后缀，目前 esbuild 不好添加
- 可以考虑 rollup
- [esbuild#2435](https://github.com/evanw/esbuild/issues/2435)
- SWC - 不支持
  - Output mjs file extension [swc#3067](https://github.com/swc-project/swc/issues/3067)
  - [swc#5346](https://github.com/swc-project/swc/issues/5346)
- [TypeScript#35148](https://github.com/microsoft/TypeScript/pull/35148)
- NextJS [库 import 必须要有 .js 后缀](../../framework/nextjs/nextjs-faq.md#js-extension)
- [GervinFung/ts-add-js-extension](https://github.com/GervinFung/ts-add-js-extension)
  - 添加 js 后缀

```
✘ [ERROR] Could not resolve "server/src/app/app.run"

    dist/out/apps/ve-contract-server/main.js:8:31:
      8 │ import { runApplication } from "server/src/app/app.run";
        ╵                                ~~~~~~~~~~~~~~~~~~~~~~~~

  The module "./dist/out/app/app.run" was not found on the file system:

    node_modules/server/package.json:17:16:
      17 │       "import": "./dist/out/*"
         ╵                 ~~~~~~~~~~~~~~

  Import from "server/src/app/app.run.js" to get the file
  "node_modules/server/dist/out/app/app.run.js":

    dist/out/apps/ve-contract-server/main.js:8:54:
      8 │ import { runApplication } from "server/src/app/app.run";
        │                                                       ^
        ╵                                                       .js

  You can mark the path "server/src/app/app.run" as external to exclude it from the bundle, which
  will remove this error.
```

**解决办法**

1. 可以通过 exports 添加 - 不支持自动 index.ts

```json
{
  "exports": {
    "./src/*": {
      "types": "./src/*",
      "typescript": "./src/*",
      "import": "./dist/out/*.js"
    }
  }
}
```

2. 通过直接 import 加后缀解决

```ts
import { GeneralResponseDto } from 'server/src/common/dto/index.ts';
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "allowImportingTsExtensions": true
  }
}
```

3. sed

```bash
pnpm swc ./src -d ./lib
# for `'` & `"`
sed -E -i -r 's#(\bfrom\s+"\.[^"]+)";#\1.js";#g' ./lib/**/*.js
sed -E -i -r "s#(\bfrom\s+'\.[^']+)';#\1.js';#g" ./lib/**/*.js
```
