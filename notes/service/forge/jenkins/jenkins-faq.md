---
tags:
  - FAQ
---

# Jenkins FAQ

## Git 分支

```bash
# 默认无法通过 git 获取分支
CI_COMMIT_BRANCH=${GIT_BRANCH} make ci
```
