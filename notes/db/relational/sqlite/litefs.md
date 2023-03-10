---
title: litefs
---

# litefs

- [superfly/litefs](https://github.com/superfly/litefs)
  - 基于 fuse 的 [litestream](./litestream.md) - 批量同步
  - 可作为临时节点的持久化存储 - 例如 为 Kubernetes 的 Pod 提供 DB 持久化能力
  - 异步复制 - 主节点 crash 可能丢失 亚秒 级事务
  - Rolling checksum
- FUSE 拦截 syscall
- 基于 Consul 的主节点选举
- 提供 HTTP 服务接收变更
- Lite Transaction Files (LTX)
- [superfly/ltx](https://github.com/superfly/ltx)

:::tip

- 只支持 linux
- macOS [#119](https://github.com/superfly/litefs/issues/119)
  - 不可能会被支持
  - OSXFUSE 闭源、问题很多

:::


:::caution

- 在 Pod 内使用 FUSE 需要 privileged, CAP_SYS_ADMIN
  - https://gitlab.com/arm-research/smarter/smarter-device-manager
    可避免
    - 共享 device 给 container
- [kubernetes#7890](https://github.com/kubernetes/kubernetes/issues/7890)
  FUSE volumes

:::

## litefs.yml

```yaml
mount-dir: "/path/to/mnt"
# 可选
data-dir: "/path/to/data"

exec: "myapp -addr :8080"

candidate: false # 不参加主节点选举
debug: true

# LTX
retention:
  duration: "60s"
  monitor-interval: "60s"

http:
  addr: ":20202"

consul:
  url: "http://localhost:8500"
  advertise-url: "http://localhost:20202"
  hostname: "localhost"
  key: "litefs/primary"
  ttl: "10s"
  lock-delay: "5s"

# 如果不用 Consul 则可以配置静态信息
static:
  primary: true
  hostname: "localhost"
  advertise-url: "http://localhost:20202"
```
