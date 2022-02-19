---
title: kube-router
---

# kube-router

- [cloudnativelabs/kube-router](https://github.com/cloudnativelabs/kube-router)
  - LVS/IPVS service proxy - IPVS+IPTables
  - Pod Networking - Router Controller - GoBGP+routing
  - Network Policy Controller - IPTables+IPSet
  - BGP
- --run-firewall
- --run-router
- --run-service-proxy

:::caution

- 不支持 DualStack - 不支持 IPv6
- 不支持 Windows

:::

```bash
# 替代 kube-proxy
kube-router --master=http://192.168.1.99:8080/ --run-service-proxy=true --run-firewall=false --run-router=false
```

| annotation                       | values      | note           |
| -------------------------------- | ----------- | -------------- |
| kube-router.io/service.scheduler | lc,rr,sh,dh | 调度算法       |
| kube-router.io/service.skiplbips |             | 不广播 lb 地址 |

- [IPVS 调度算法](http://kb.linuxvirtualserver.org/wiki/IPVS#Job_Scheduling_Algorithms)
