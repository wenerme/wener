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
- ~/.pkgx
- ~/.cache/pkgx
- ~/Library/Caches/pkgx
- ~/.local/share/pkgx
- ~/Library/Application Support/pkgx
- ~/.local/bin

```bash
brew install pkgx || curl https://pkgx.sh | sh

pkgx install huggingface-cli
pkgx huggingface-cli

# 卸载
sudo rm /usr/local/bin/pkg[xm]
rm -rf ~/.pkgx

# macOS
rm -rf ~/Library/Caches/pkgx
rm -rf ~/Library/Application\ Support/pkgx

# etc
rm -rf "${XDG_CACHE_HOME:-$HOME/.cache}/pkgx"
rm -rf "${XDG_DATA_HOME:-$HOME/.local/share}"/pkgx
```
