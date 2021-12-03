---
title: gitflow
---

# gitflow

- [petervanderdoes/gitflow-avh](https://github.com/petervanderdoes/gitflow-avh)
  - 2019 停止维护
  - a collection of Git extensions to provide high-level repository operations for Vincent Driessen's branching model.
  - adds more functionality to the existing git-flow and several of the internal commands have been rewritten to speed up the software.
- [nvie/gitflow](https://github.com/nvie/gitflow)
  - 2012 停止维护
- [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model)
- [git-flow 工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
- branches
  - bugfix hotfix release feature support
- actions
  - delete finish list publish rename start track
  - rebase

```bash
brew install git-flow-avh

git flow init -d
git checkout develop
git flow release start v2021.1.1
git flow release finish v2021.1.1
git push --tags
```
