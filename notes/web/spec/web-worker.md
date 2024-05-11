---
title: Web Worker
---

# Web Worker

|                   | Chrome    | Safari    |
| ----------------- | --------- | --------- |
| Worker()          | Chrome 4  | Safari 4  |
| SharedWorker()    | Chrome 5  | Safari 16 |
| `{type:'module'}` | Chrome 80 | Safari 15 |

- SharedWorker
  - 可以被多个 上下文 共享 - window, iframe, worker
- Safari 16 -> 2022-09-12
- mdn [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
  - [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker)
- [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
- [importScripts()](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)

:::tip

- NodeJS 不支持 WebWorker [node#43583](https://github.com/nodejs/node/issues/43583)
  - polifyll: [developit/web-worker](https://github.com/developit/web-worker)
- Deno 支持 [WebWorker](https://docs.deno.com/runtime/manual/runtime/workers#workers)
- Bun 支持 [WebWorker](https://bun.sh/docs/api/workers)

:::

## Module scripts don't support importScripts().
