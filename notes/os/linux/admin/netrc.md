---
title: netrc
---

# netrc

- ~/.netrc
- 使用场景
  - go mod
  - git
  - curl

```text title="~/.netrc"
machine api.example.com
  login myusername
  password mypassword
```

```bash
chmod 600 ~/.netrc

# 会看到附加了 Authorization: Basic 的请求头
curl -nv https://api.example.com
```
