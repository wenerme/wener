---
title: Dev FAQ
tags:
  - FAQ
---

# Dev FAQ

## health vs healthz

- 类似的 readyz, varz, statusz, rpcz, livez
- 来自于谷歌内部实践 - z-pages
- z 是为了避免和现有 endpoint 冲突
- 大多用带 z 的名字，系统常用，类似 /metrics，与业务无关
- 参考
  - https://stackoverflow.com/a/43381061/1870054
- 其他
  - /health/live
  - /health/ready

## 什么是边缘计算

个人简单理解，Edge 就是 DataCenter 的反义词。

----

- 早期计算：集中式应用程序，仅在一台孤立的计算机上运行
- 个人计算：本地运行的去中心化应用程序
- 云计算：在数据中心运行的集中式应用程序
- 边缘计算：在靠近用户的地方——设备本身或者网络边缘——运行的集中式应用程序

---

- https://www.cloudflare.com/zh-cn/learning/serverless/glossary/what-is-edge-computing/


## API URL

- ods.opinsights.azure.com/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/otherResourceGroup/providers/Microsoft.Storage/storageAccounts/examplestorage
  - Azure Monitor Logs
- Datadog - https://docs.datadoghq.com/logs/log_collection/
  - http-intake.logs.datadoghq.com
- GCP - googleapis.com
  - `https://<region>-<svc>.googleapis.com`
  - https://appengine.googleapis.com/$discovery/rest?version=v1
  - https://run.googleapis.com
    - 服务发现 https://run.googleapis.com/$discovery/rest?version=v1
