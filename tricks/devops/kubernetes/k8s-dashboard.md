---
id: k8s-dashboard
title: Kubernates 面板
---

# Kubernates 面板

## Tips

* [kubernetes/dashboard](https://github.com/kubernetes/dashboard)
  * 非常简洁的 UI 面板
* [Web UI (Dashboard)](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
* 参考
  * [其他的 UI](https://kube-web-view.readthedocs.io/en/latest/alternatives.html)
    * https://github.com/vmware-tanzu/octant
      * Highly extensible platform for developers to better understand the complexity of Kubernetes clusters. 
    * https://github.com/weaveworks/scope
      * Monitoring, visualisation & management for Docker & Kubernetes
    * https://github.com/indeedeng/k8dash
    * https://github.com/hjacobs/kube-ops-view
      * Kubernetes Operational View - read-only system dashboard for multiple K8s clusters
    * https://github.com/hjacobs/kube-resource-report/

```bash
# 安装最新发布版
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/$(curl -Ls https://api.github.com/repos/kubernetes/dashboard/releases/latest | jq -r .tag_name)/aio/deploy/recommended.yaml

# 创建账号
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
# http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

