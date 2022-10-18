---
title: kubectl FAQ
tags:
  - FAQ
---

# kubectl FAQ

## 删除 Evicted 的 Pod

- status.phase=Fialed & state.reason=Evicted
- Terminating -> Pending

```bash
kubectl get pods | grep Evicted | awk '{print $1}' | xargs kubectl delete pod

# 筛选查看
# reason Evicted
kubectl get pods --all-namespaces --field-selector="status.phase=Failed"
# 确认删除
kubectl delete pods --all-namespaces --field-selector="status.phase=Failed"

# kubectl get pods --all-namespaces --field-selector="status.phase=Pending" | awk '{print "-n " $1 " " $2}' | tail -n+2 | xargs kubectl delete pod --force
```

## 当前集群名字

```bash
kubectl config view --minify -o=jsonpath='{.contexts[0].context.cluster}'
```

## 端口转发超时/端口转发重联

- 默认 5 分钟 超时

```bash
# 关闭超时
kubectl port-forward -n postgres-operator svc/postgres-operator-ui 8080:80 --request-timeout 0
```

Shell 循环

```bash
while :;do kubectl port-forward -n postgres-operator svc/postgres-operator-ui 8080:80; done
```

Windows BAT 循环

```bat
:1
oc port-forward PODNAME 8003:8080
goto 1
```

## Kubernetes configuration file is group/world-readable

```bash
chmod go-r ~/.kube/config
# or
chmod 600 ~/.kube/config
```
