---
title: pkgx
tags:
  - package manager
---

# pkgx

- https://github.com/pkgxdev/pkgx
  - Apache-2.0, Rust
- 参考
  - 包列表 https://github.com/pkgxdev/pantry
    - https://pkgx.dev/pkgs/
- 对包的定义非常宽松
  - tarball 即可
  - https://github.com/pkgxdev/pantry/blob/main/projects/nodejs.org/package.yml

```bash
brew install pkgx || curl https://pkgx.sh | sh

pkgx install huggingface-cli
pkgx huggingface-cli
```
