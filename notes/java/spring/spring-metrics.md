---
title: metrics
---

# metrics

- /actuator/prometheus

```
# -Xms 申请内存
jvm_memory_committed_bytes
# -Xmx 最大内存
jvm_memory_max_bytes
# 实际使用的内存
# area: heap, nonheap
jvm_memory_used_bytes
# NIO Direct Memory
jvm_buffer_memory_used_bytes
```

```
jvm_memory_max_bytes > container_memory_working_set_bytes > jvm_memory_committed_bytes > jvm_memory_used_bytes
```

- container_memory_working_set_bytes - 容器内存使用
