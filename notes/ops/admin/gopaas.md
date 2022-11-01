---
title: gopaas
---

# gopaas

- [gopasspw/gopass](https://github.com/gopasspw/gopass)
  - MIT, Go
  - unix password manager for teams
- [codecentric/gopass-ui](https://github.com/codecentric/gopass-ui)
- [gopasspw/gopassbridge](https://github.com/gopasspw/gopassbridge)
  - web extension
- `gopass --crypto age` 兼容 passage

```bash
go install github.com/gopasspw/gopass@latest

# bash 补全
source <(gopass completion bash)

# ~/.password-store/
# ~/.local/share/gopass/stores/root
gopass setup
```
