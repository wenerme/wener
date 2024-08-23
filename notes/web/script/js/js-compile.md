---
tags:
  - Compile
---

# JS Compile

- minification
  - commma
- obfuscation
- helper functions
  - `__extends`
  - `__decorate`
  - `__awaiter`, `__generator`
- 参考
  - https://unminify.io/
  - https://beautifier.io/
  - ~~https://unminify.com/~~

```js
// funcName 的 this 为 module
(0, import_module.funcName)(); // -> funcName()
```

```bash
prettier --no-config --write ./a.min.js
```
