---
title: kubectl FAQ
---

# kubectl FAQ

## 端口转发超时/端口转发重联
* 默认 5分钟 超时


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
