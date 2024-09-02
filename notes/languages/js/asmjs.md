---
title: asm.js
tags:
  - Compiler
---

# asm.js

- since 2013-03
- source-to-source compiler
- 由 WebAssembly 替代 - 2017+
- asm.js-specific optimizations
  - Chrome 28+
  - Firefox 22+
- limiting language features to improve performance
- `"use asm"`
- 参考
  - https://en.wikipedia.org/wiki/Asm.js
  - http://asmjs.org/spec/latest/

```c
int f(int i) {
  return i + 1;
}
```

```js
function f(i) {
  i = i | 0;
  return (i + 1) | 0;
}
```

```js
const HEAP8 = new Int8Array(e);
const HEAP16 = new Int16Array(e);
const HEAP32 = new Int32Array(e);
const HEAPU8 = new Uint8Array(e);
const HEAPU16 = new Uint16Array(e);
const HEAPU32 = new Uint32Array(e);
const HEAPF32 = new Float32Array(e);
const HEAPF64 = new Float64Array(e);
```
