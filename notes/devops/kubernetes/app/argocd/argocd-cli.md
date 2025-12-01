---
tags:
  - CLI
---

# argocd-cli

```bash
# argocd 命令行工具
# https://argo-cd.readthedocs.io/en/latest/user-guide/commands/argocd/
brew install argocd
# 登陆
argocd login localhost:8080

# 如果配置了 ingress 需要 grpc-web 访问
# 除非开启 ssl-paththrough - nginx 开启对性能影响很大
argocd login argocd.my.lan:443 --grpc-web
argocd login argocd.example.com --sso --grpc-web

argocd context #
argocd relogin #
argocd logout  #
argocd app list
argocd get argocd/gitea
argocd app actions list argocd/gitea
argocd app actions run argocd/gitea restart --kind Rollout
```
