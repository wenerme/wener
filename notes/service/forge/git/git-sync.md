---
title: Sync
---

# Git Sync

```bash
git clone --mirror https://primary_repo_url/primary_repo.git
cd primary_repo.git
git remote add --mirror=fetch secondary https://secondary_repo_url/secondary_repo.git
git fetch origin
git push secondary --all # 同步

# 周期同步流程
git fetch origin
git push secondary --all

# 反向同步
git fetch secondary
git push origin
```

- https://www.opentechguides.com/how-to/article/git/177/git-sync-repos.html
- [kubernetes/git-sync](https://github.com/kubernetes/git-sync)
  - 定时同步到本地
  - 单仓库，单 branch
