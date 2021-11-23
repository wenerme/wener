---
title: Kubernates 面板
---

# Kubernates 面板

- [kubernetes/dashboard](https://github.com/kubernetes/dashboard)
  - 非常简洁的 UI 面板
- [Web UI (Dashboard)](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)


```bash
# HELM 安装参考
# ==========
# https://hub.helm.sh/charts/k8s-dashboard/kubernetes-dashboard
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
# 默认不会安装 metric scraper
helm install kubernetes-dashboard/kubernetes-dashboard --name kubernetes-dashboard --namespace kubernetes-dashboard

# 手动安装
# ==========
# 安装最新发布版
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/$(curl -Ls https://api.github.com/repos/kubernetes/dashboard/releases/latest | jq -r .tag_name)/aio/deploy/recommended.yaml

# 创建管理员级别账号
cat <<YAML | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
YAML

# 获取 Token
kubectl -n kubernetes-dashboard describe secret admin-user-token |grep ^token
# 如果是 macos 则可以安装 yq 然后直接复制
# kubectl -n kubernetes-dashboard describe secret admin-user-token |grep ^token | yq r - 'token' | pbcopy

# 开启代理
kubectl proxy
# 访问
# http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:https/proxy/
```

## TLS

- [Certificate management](https://github.com/kubernetes/dashboard/blob/master/docs/user/certificate-management.md)

* '--tls-cert-file=/tls.crt'
* '--tls-key-file=/tls.key'
* '--auto-generate-certificates'
* '--namespace=kubernetes-dashboard'
