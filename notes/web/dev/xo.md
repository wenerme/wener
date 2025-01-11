---
title: xo
---

# xo

- [xojs/xo](https://github.com/xojs/xo)
  - MIT, JS
  - JavaScript/TypeScript linter (ESLint wrapper) with great defaults

```bash
npx -y xo@latest --fix
```

```json title="package.json"
{
  "xo": {
    "envs": ["es2022", "node"],
    "rules": {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unsafe-argument": 1,
      "@typescript-eslint/object-curly-spacing": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/restrict-template-expressions": 1,
      "@typescript-eslint/switch-exhaustiveness-check": "off",
      "arrow-parens": "off",
      "capitalized-comments": "off",
      "import/extensions": "off",
      "n/file-extension-in-import": "off",
      "new-cap": "off",
      "no-await-in-loop": "off",
      "prettier/prettier": "off",
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off"
    }
  }
}
```
