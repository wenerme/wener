---
title: Prometheus Agent Mode
---

# Prometheus Agent Mode

- Agent Mode
  - 用于转发的 Prometheus Agent - 针对 RemoteWrite 优化
  - 禁用 query、alert、tsdb、索引 - 节省资源
    - ⚠️ **alter** 和 **rules** 都不能使用
  - 保留 抓取、转发
  - 更高效的 Agent TSDB WAL
  - 如果 Remote Write 异常，默认持久化 2H
- v2.32.0+
- --enable-feature=agent
- https://prometheus.io/blog/2021/11/16/agent/
- [prometheus-operator/Documentation/designs/prometheus-agent.md](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/designs/prometheus-agent.md)
