---
tags:
  - Awesome
---

# Forge Awesome

- [Git](./git/README.md)
- [theonedev/onedev](./onedev.md)
  - MIT, Java
  - CI/CD
  - Symbol Search, Navigation - 类似 IDE 体验
  - Static Analysis
  - Kanban
  - SLOC trend
  - https://code.onedev.io/
- [gitlab](./gitlab/README.md)
  - 非常重
- [gitea](./gitea.md)
  - 轻量级
  - 内置 package
  - 无 CI/CD - 可外置 drone
- [github](./github.md)
- gogs

## CI/CD Pipeline

- earthly.build
- drone
- [gitlab runner](./gitlab/gitlab-runner.md)
- [argocd](../../devops/kubernetes/app/argocd.md)
- [argo workflow](../../devops/kubernetes/app/argo-workflow.md)
- [dagger/dagger](https://github.com/dagger/dagger)
  - Apache-2.0, Go, CUE
  - 可在本地使用
  - 使用 CUE 定义
  - 使用 BuildKit 构建
  - https://docs.dagger.io/1222/core-actions-reference/

```bash
brew install dagger/tap/dagger
```
