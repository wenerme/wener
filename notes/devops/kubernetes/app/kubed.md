---
title: kubed
---

# kubed
* 是什么？
  * 空间、集群之间同步 ConfigMap 和 Secret
  * 在需要同步的资源上定义

```yaml
# 待同步资源通过 annotation 控制同步
annotations:
  # 同步所有空间
  kubed.appscode.com/sync: ""
  # 同步到 labels 匹配空间
  kubed.appscode.com/sync: "app=kubed"
  # 跨集群同步 - 指定 kubeconfig 上下文
  kubed.appscode.com/sync-contexts: "context-1,context-2"

# 被同步资源会包含原始资源信息
labels:
  kubed.appscode.com/origin.name:
  kubed.appscode.com/origin.namespace:
  kubed.appscode.com/origin.cluster:
```
