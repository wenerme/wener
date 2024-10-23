---
title: GritQL
---

# GritQL

- [getgrit/gritql](https://github.com/getgrit/gritql)
  - MIT, Rust
  - query language for searching, linting, and modifying code
- 参考
  - https://github.com/getgrit/stdlib

```bash
npm add -g @getgrit/cli

grit init # .grit/
grit list
```

```
/repo
├── .grit
│ └── grit.yaml
├── foobar
| └── baz
├── src
└── etc
```

## React default imports to destructured named imports

```
engine marzano(0.1)
language js(jsx)

`React.$reactImport` where {
    $reactImport <: ensure_import_from(`"react"`),
} => `$reactImport`

```

```bash
grit apply react_named_imports
```
