---
title: CDN
---

# CDN

| cdn        | import                            | github           | cjs -> esm |
| ---------- | --------------------------------- | ---------------- | ---------- |
| Skypack    | https://cdn.skypack.dev/          |                  | ✅         |
| [esm.sh]   | https://esm.sh/                   | [esm-dev/esm.sh] | ✅         |
| [jsDelivr] | https://cdn.jsdelivr.net/npm/     |                  | ❌         |
| [JSPM]     | https://ga.jspm.io/npm:pkg@x.y.z/ | [jspm/project]   | ❌         |
| unpkg      | https://unpkg.com/${PKG}?module   | [mjackson/unpkg] | ❌         |

[jsdelivr]: ./jsdelivr.md
[jspm]: ./jspm.md
[esm.sh]: https://esm.sh/
[esm-dev/esm.sh]: https://github.com/esm-dev/esm.sh
[jspm/project]: https://github.com/jspm/project
[mjackson/unpkg]: https://github.com/mjackson/unpkg

- jsDelivr
  - 商业化、功能多速度快
- JSPM
  - 基于 rollup
  - **支持 systemjs**
- jsdelivr 提供 esm.run 别名
  - https://esm.run/react -> https://cdn.jsdelivr.net/npm/react/+esm
- unpkg
  - 很久没更新维护了
- esm.sh
  - MIT, Golang
  - 基于 esbuild - 不支持 systemjs
- skypack - ESM
- BootstrapCDN
- cdnjs
  - 加入 CDN 需要申请
  - [cdnjs](https://github.com/cdnjs/cdnjs)
  - https://cdnjs.cloudflare.com

## CDN Test

- https://esm.run/react@17 -> https://cdn.jsdelivr.net/npm/react@17/+esm - 依然是 CJS

```bash
for i in $(seq 3); do

  rm bench-*.txt
  for i in $(seq 10); do
    curl -o /dev/null -s -w "%{time_total}\n" https://cdn.skypack.dev/react@17 >> bench-a.txt
    curl -o /dev/null -s -w "%{time_total}\n" https://cdn.jsdelivr.net/npm/react@17/+esm >> bench-b.txt
    curl -o /dev/null -s -w "%{time_total}\n" https://esm.sh/react@17 >> bench-c.txt
  done
  for i in bench-*.txt; do
    echo $i
    awk '{ total += $1; count++ } END { print total/count }' $i
  done

done
```

## esm.sh

- 可以 Selfhosted
- 主服务器在 HK
- 基于 esbuild 构建
- cjs -> esm 使用 swc
- 支持 X-Typescript-Types 头 - demo 类型检测
  - `?no-check` 禁用

```js
import React from 'https://esm.sh/react@17';
// 非模块文件
import 'https://esm.sh/tailwindcss/dist/tailwind.min.css';
// bundle 模式
import {Button} from 'https://esm.sh/antd?bundle';
// 开发模式
import React from 'https://esm.sh/react?dev';
// 依赖控制
import React from 'https://esm.sh/react@16.14.0';
import useSWR from 'https://esm.sh/swr?deps=react@16.14.0';
// 别名
import useSWR from 'https://esm.sh/swr?alias=react:preact/compat&deps=preact@10.5.14';
// 目标版本 - 默认基于 header 判断
import React from 'https://esm.sh/react?target=es2020';
// WebWorker
import editorWorker from '/monaco-editor/esm/vs/editor/editor.worker?worker';
const worker = new editorWorker();
```

# FAQ

## jsdelivr vs. unpkg

- unpkg
- jsdelivr
  - 国内更快，有 ICP 备案
- 参考
  - [unpkg to jsdelivr](https://www.jsdelivr.com/unpkg)
  - [Comparison of the usage statistics of jsDelivr vs. unpkg for websites](https://w3techs.com/technologies/comparison/cd-jsdelivr,cd-unpkg)
  - https://w3techs.com/technologies/reportlist/content_delivery
