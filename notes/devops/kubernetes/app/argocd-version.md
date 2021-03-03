# ArgoCD 版本

* 镜像 argoproj/argocd:v1.8.4
  * 可以考虑提前拉好

```bash
# 安装和升级是一样的 - 仓库的 stable tag 总是指向最新 stable 版本
# 普通
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# HA
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml
```

## 1.8
* mono-repository 处理效率增强
  * 相同 commit 并行处理 - 之前是每个都要处理一遍
* `argocd.argoproj.io/manifest-generate-paths`
* argocd-application-controller 组件支持水平扩容
  * 更好管理多集群
  * ⚠️ depolyment -> statuefulset
    * 升级后需要手动删除 `kubectl -n argocd delete deploy argocd-application-controller`
* 子应用健康状态不影响父应用
* 全局 Project
* [v1.7 to 1.8](https://argoproj.github.io/argo-cd/operator-manual/upgrading/1.7-1.8/)
