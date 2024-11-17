---
tags:
  - Supervisor
---

# Supervisor

- Supervisor/Controller/Scheduler
  - 监控、管理、自动回复、生命周期
- Lifecycle 管理
  - 进程、资源、数据、系统组件
- K8S PodStatus - https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.31/#podstatus-v1-core
  - Pod.status(PodStatus).phase: string
    - Pending
    - Running
    - Succeeded
    - Failed
    - Unknown
  - ContainerStatus.state: ContainerState
    - Waiting
    - Running
    - Terminated
