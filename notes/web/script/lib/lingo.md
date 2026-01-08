---
title: lingo.dev
---

# lingo.dev

- [lingodotdev/lingo.dev](https://github.com/lingodotdev/lingo.dev)
  - AI 本地化平台 for product teams
- [lingo.dev](https://lingo.dev/)
  - 使用 LLM 翻译 App、网站、数据库
  - Features:
    - CI/CD Integration
    - Git Native UI Localization
    - Context-aware
    - Idiom Handling
    - Tech Terminology Handling

```bash
# 初始化
npx lingo.dev init -s zh -t 'zh-Hant,en,es,fr,ja' -b yaml
```

- .lingo/metadata.json
- .lingo/cache
- `__LINGO_DEV_WS_URL__`
  -  `__SERVER_URL__`
- @lingo.dev/compiler/virtual/locale/client
  - locale-resolver.client.ts
- metadata-dev.json
