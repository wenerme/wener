---
tags:
  - Bundle
---

# Angular Package Format

- FESM - Flattened ES Modules
- Module ID = Module Specifier

---

- README.md
- package.json
- core.d.ts
- esm2020/
  - core.mjs
  - index.mjs
  - public_api.mjs
  - testing/ - @angular/core/testing
- fesm2015/
  - core.mjs
  - core.mjs.map
  - testing.mjs
  - testing.mjs.map
- fesm2020/
  - core.mjs
  - core.mjs.map
  - testing.mjs
  - testing.mjs.map
- testing/
  - package.json
  - testing.d.ts
- bundles/ - UMD, ES5
