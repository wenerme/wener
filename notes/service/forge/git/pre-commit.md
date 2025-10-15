---
tags:
  - CLI
---

# pre-commit

- [pre-commit/pre-commit](https://github.com/pre-commit/pre-commit)
  - MIT, Python
  - 在 commit 前运行检查

```bash
brew install pre-commit # macOS
apk add pre-commit      # Alpine
pip install pre-commit  # by PIP

pre-commit install # 安装 hooks
pre-commit sample-config # 生成配置文件
pre-commit run --all-files # 运行检查 - 用于测试
```

```yaml title=".pre-commit-config.yaml"
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v3.2.0
    hooks:
    -   id: trailing-whitespace
    -   id: end-of-file-fixer
    -   id: check-yaml
    -   id: check-added-large-files
```
