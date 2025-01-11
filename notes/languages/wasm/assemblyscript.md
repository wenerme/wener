---
title: AssemblyScript
---

# AssemblyScript

- [AssemblyScript/assemblyscript](https://github.com/AssemblyScript/assemblyscript)
  - Apache-2.0
  - TypeScript-like language for WebAssembly
- 参考
  - https://www.assemblyscript.org/status.html
  - https://www.assemblyscript.org/built-with-assemblyscript.html

```ts
export function fib(n: i32): i32 {
  var a = 0,
    b = 1;
  if (n > 0) {
    while (--n) {
      let t = a + b;
      a = b;
      b = t;
    }
    return b;
  }
  return a;
}
```

```bash
asc fib.ts --outFile fib.wasm --optimize
```
