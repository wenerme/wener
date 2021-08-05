---
title: kubectl FAQ
---

# kubectl FAQ

## 删除 Evicted 的 Pod

```bash
# 筛选查看
kubectl get pod --field-selector="status.phase==Fialed"
# 确认删除
kubectl delete pod --field-selector="status.phase==Fialed"
```
