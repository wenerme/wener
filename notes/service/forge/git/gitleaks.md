---
tags:
  - Security
  - CLI
---

# gitleaks

- [gitleaks/gitleaks](https://github.com/gitleaks/gitleaks)
  - MIT, Go
  - 检测 git 仓库中的敏感信息

```bash
brew install gitleaks # macOS
apk add gitleaks      # Alpine
# docker pull zricethezav/gitleaks:latest

gitleaks git .
GITLEAKS_CONFIG=$PWD/gitleaks.toml gitleaks git .

# 也可以
GITLEAKS_CONFIG_TOML=`cat customgitleaks.toml`
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.2
    hooks:
      - id: gitleaks
```

- `SKIP=gitleaks` to skip gitleaks check
- [pre-commit](./pre-commit.md)
- .gitleaksignore
  - 配置 fingurepint 来 ignore
- gitleaks.toml
  - 配置 allowlists
