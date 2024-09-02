---
title: knip
---

# knip

- [webpro-nl/knip](https://github.com/webpro-nl/knip)
  - Find unused

```bash
# npm init @knip/config

knip --config knip.jsonc
```

```
unused files = project files - (entry files + resolved files)
```

## 配置

- knip.json
- knip.jsonc
- .knip.json
- .knip.jsonc
- knip.ts
- knip.js
- knip.config.ts
- knip.config.js
- package.json#knip

**默认配置**

```json
{
  "entry": ["index.{js,ts}", "src/index.{js,ts}"],
  "project": ["**/*.{js,ts}"]
}
```

- `suffix!` for production

```json
{
  "$schema": "https://unpkg.com/knip@5/schema.json",
  "entry": ["src/index.ts", "scripts/{build,create}.js"],
  "project": ["src/**/*.ts", "scripts/**/*.js"]
}
```
