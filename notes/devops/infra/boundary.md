---
title: Boundary
---

# Boundary

- [hashicorp/boundary](https://github.com/hashicorp/boundary) 是什么?
  - MPL-2.0, Go
  - identity-based access management for dynamic infrastructure
  - 基础设施访问控制
  - 支持协议 ssh, postgres, rdp, http, kube
- controller
  - API
  - session 调度
  - http://127.0.0.1:9200
- worker
  - session
  - http://127.0.0.1:9202
- 依赖: SQL 数据库, KMSes
  - Postgres 11+
  - KMS / Vault Transit Secrets Engine
- boundary-desktop
  - 桌面应用 - 目前只支持 macOS
  - [下载](https://releases.hashicorp.com/boundary-desktop/)

```bash
# 开发环境 - 依赖 docker 启动 postgres
# KSM 为内部临时存储
boundary dev

# 命令行授权
boundary authenticate password -auth-method-id ampw_1234567890 -login-name admin -password password
# 连接 target - 映射 22 到本地
boundary connect -target-id ttcp_1234567890
# 连接 ssh
boundary connect ssh -target-id ttcp_1234567890
# 使用 admin 登陆
boundary connect ssh -target-id ttcp_1234567890 -- -l admin

# 端口修改
boundary targets update tcp -default-port 443 -id ttcp_1234567890
# windows 使用 putty
boundary connect ssh -style putty -exec putty.exe -target-id ttcp_1234567890
```
