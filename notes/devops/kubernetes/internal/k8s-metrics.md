---
title: Metrics
---

# Metrics

```
# 排查 Namespace 流量
sum(rate(container_network_transmit_bytes_total{}[5m])) by (namespace)

# 节点网络
sum(rate(node_network_transmit_bytes_total{}[$__rate_interval]))

sum(rate(container_cpu_usage_seconds_total{container="apisix"}[$__rate_interval]))

sum(container_memory_working_set_bytes{namespace="haproxy-controller",container="haproxytech-ingress-controller"})
```

|                                           metric | for                 |
| -----------------------------------------------: | ------------------- |
|                                          **CPU** |
|                 container_cpu_user_seconds_total | cpu user            |
|               container_cpu_system_seconds_total | cpu sys             |
|                container_cpu_usage_seconds_total | cpu total           |
|                                       **Memory** |
|                           container_memory_cache | mem cache           |
|                             container_memory_rss | mem rss             |
|                            container_memory_swap | mem swap            |
|                     container_memory_usage_bytes | mem usage           |
|               container_memory_working_set_bytes | mem working set     |
|                 container_memory_max_usage_bytes | mem max usage       |
|                         container_memory_failcnt | mem failed          |
|                  container_memory_failures_total | allocation failures |
|  kube_pod_container_resource_limits_memory_bytes | mem limit           |
|                                           **IO** |
|               container_fs_io_time_seconds_total |
|      container_fs_io_time_weighted_seconds_total |
|                  container_fs_writes_bytes_total |
|                   container_fs_reads_bytes_total |
|                                      **Network** |
|            container_network_receive_bytes_total |
|           container_network_transmit_bytes_total |
|  container_network_receive_packets_dropped_total |
| container_network_transmit_packets_dropped_total |
|           container_network_receive_errors_total |
|          container_network_transmit_errors_total |

- https://blog.freshtracks.io/a-deep-dive-into-kubernetes-metrics-part-3-container-resource-metrics-361c5ee46e66
- [google/cadvisor](https://github.com/google/cadvisor)
- https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/
- https://kubernetes.io/docs/reference/instrumentation/metrics/
- [kubernetes/kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)
- https://github.com/lensapp/lens/blob/4ab97d2372874d053f1eb607432d21e8e632095f/packages/technical-features/prometheus/src/operator-provider.injectable.ts.ts
