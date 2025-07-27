---
tags:
  - Compiler
---

# transpile

## helper

- tslib
  - 12kB/4kB
- @swc/helpers
  - 23kB/6kB + tslib

```json title="tsconfig.json"
{
  "compilerOptions": {
    "importHelpers": true
  }
}
```

```json title=".swcrc"
{
  "jsc": {
    "externalHelpers": true
  }
}
```

```bash
# 1041179 bytes -> 573325 bytes reduced 45.00%
find ./lib -type f -name "*.js" -exec stat -c %s {} + | awk '{total += $1} END {print total " bytes"}'
```

## prefix

```ts
var require, __filename, __dirname;
{
  const { createRequire } = await import('node:module');
  require ||= createRequire(import.meta.url);
}
{
  const { fileURLToPath } = await import('node:url');
  const { dirname } = await import('node:path');
  __filename ||= fileURLToPath(import.meta.url);
  __dirname ||= dirname(__filename);
}
```

```ts
const __dirname = path.dirname(import.meta.url).replace('file://', '');
```

## import type

```ts
import file from './file.txt?raw' with { type: 'text' }
import file from './file.md?raw' with { type: 'text' }
```

- Vite - https://vite.dev/guide/assets
  - `?url`
  - `?no-inline`
  - `?inline`
  - `?raw`
  - `?worker`
  - `?sharedworker`
- Esbuild - https://esbuild.github.io/content-types/
