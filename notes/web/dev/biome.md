---
title: biome
---

# biome

- [biomejs/biome](https://github.com/biomejs/biome)
  - MIT, Rust
  - linter, formatter
  - roma -> biome
- 参考
  - [支持的语言](https://biomejs.dev/internals/language-support/)
    - 不支持格式化 HTML, CSS, Yaml, Markdown, GQL
      - prettier 支持所有这些
  - https://biomejs.dev/blog/biome-wins-prettier-challenge/
  - IntellJ
    - [biomejs/biome-intellij](https://github.com/biomejs/biome-intellij)
      - https://plugins.jetbrains.com/plugin/22761-biome
    - youtrack [WEB-46895](https://youtrack.jetbrains.com/issue/WEB-46895)

```bash
brew install biome          # by macOS Brew
pnpm add -Dw @biomejs/biome # add to Project

# check=lint+format
npx biome check ./src # 如果安装了 @biomejs/biome

npx biome start                         # daemon
time npx biome check ./src --use-server # 一般项目 user 快 0.2s

# 如果没安装 @biomejs/biome
npx @biomejs/biome check ./src
npx @biomejs/biome check ./src --apply

biome format --write ./src package.json

# 单个规则 v1.7.4+
# https://biomejs.dev/linter/rules/
biome lint --only=style/useNamingConvention --apply ./src
npx -y @biomejs/biome lint --only=style/useImportType ./src --write
npx -y @biomejs/biome lint --only=lint/correctness/noUnusedImports ./src --write
# warn `export * from './mod` in index.ts
npx -y @biomejs/biome lint --only=lint/performance/noReExportAll ./src/**/index.ts
```

**biome.json**

```json
{
  "javascript": {
    "parser": {
      "unsafeParameterDecoratorsEnabled": true
    }
  },
  "formatter": {
    "enabled": false
  },
  "organizeImports": {
    "enabled": false
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "off",
        "noShadowRestrictedNames": "off",
        "noAssignInExpressions": "off"
      },
      "style": {
        "useConst": "off",
        "noNonNullAssertion": "warn",
        "noUnusedTemplateLiteral": "off",
        "noParameterAssign": "off"
      },
      "complexity": {
        "noBannedTypes": "off",
        "noStaticOnlyClass": "off"
      }
    }
  }
}
```

## prettier

- https://biomejs.dev/formatter/differences-with-prettier/
