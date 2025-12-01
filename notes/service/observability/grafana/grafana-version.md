---
title: Grafana Version
---

# Grafana Version

- 2021年4月20日
  - Grafana, Loki, Tempo relicensed to AGPLv3
- [What’s new Grafana](https://grafana.com/docs/grafana/latest/whatsnew/)

| Version | Release Date |
| ------- | ------------ |
| 12.0    | 2025-05-05   |
| 11.0    | 2024-05-14   |
| 10.0    | 2023-06-13   |
| 9.0     | 2022-06-14   |
| 8.0     | 2021-06-09   |
| 7.0     | 2020-05-18   |

## Grafana v12.0

- 可观测性即代码 (Observability as Code): 进一步强化 IaC 能力，支持使用 Terraform 和 API 管理 Grafana 配置。
- 动态仪表盘 (Dynamic Dashboards): 通过 Scenes API 和其他功能实现更高级的动态仪表盘。
- 智能日志分析: 改进日志面板，支持更深入、更快速地洞察日志，并可能利用 AI 检测日志异常模式。

## Grafana v11.0

- Scenes 驱动的仪表盘 (公共预览/GA): 引入 Scenes 架构，提供更现代、更具编程性的方式来构建动态和交互式仪表盘。
- Explore Metrics (无查询体验): 允许用户在不编写查询的情况下探索 Prometheus 指标。
- AI 辅助功能: 引入由 LLM 驱动的仪表盘标题和描述自动生成功能，提高效率。
- 告警故障排除改进: 增强告警规则细节的概览，并增加“保持最后状态” (Keep last state) 功能以帮助调试。

## Grafana v10.0

- 动态仪表盘和新面板: 引入趋势面板 (Trend panel) 和数据网格面板 (Datagrid panel) (实验性)，支持创建更具动态性和定制化的仪表盘。
- Grafana as Code (IaC) 更新: 增强了通过配置文件或 Terraform 自动配置 Grafana 资源的能力。
- 改进的入门体验: 简化了新用户的安装、数据源设置和创建第一个仪表盘的流程。
- Canvas 面板正式发布 (GA): 允许用户使用拖放组件创建完全自定义的可视化。

## Grafana v9.0

- 默认信封加密 (Envelope Encryption): 默认启用数据库秘密信息的信封加密，增强安全性，并支持快速轮转加密密钥。
- 基于角色的访问控制 (RBAC) GA: 基于角色的访问控制正式普遍可用，支持跨仪表盘、数据源等功能进行细粒度权限管理。
- 日志探索改进: 重新设计的日志面板和新的字段选择器组件，使日志探索更快、更直观。
- Grafana OnCall 开源: 将 OnCall 管理功能开源，使用户能够将告警管理集成到现有的 Grafana 部署中

## Grafana v8.0

- Unified Alerting - 统一告警
  - 将 Prometheus 告警和 Grafana 告警统一到一个界面中，提供一致的管理体验。
- Live Streaming - 实时流
  - 引入低延迟、高频率的数据流传输能力。
- 新增可视化面板
  - 状态时间线 (State timeline)
  - 状态历史 (Status history)
  - 条形图 (Bar chart)
  - 直方图 (Histogram)
- Library panels - 可复用面板
  - 允许跨多个仪表盘保存和重用面板。
- Real-time streaming
  - MQTT
  - /api/live/push endpoint
- Prometheus metrics browser
- PieChart GA
- Plugin catalog
- JWT Auth
- Generic OAuth

## Grafana v7.5

- Pie chart panel beta
- Alerting for Loki
- Loki label browser
- Tempo as a backend data source

## Grafana v7.4

- 更改协议为 **AGPL**
- Time series panel beta
  - 插值模式 Linear, Smooth, Step before, Step after/之前的 staircase
  - Soft min max
  - 多 Y 轴
  - 自定义线段、填充
  - 值映射
  - 实时
- Node graph panel beta
- Transformation - Sort By, Filter by value
- 支持 Prometheus exemplars
  - Prometheus 2.25+
- Trace to logs
- Server-side expressions
- 配置
  - hidden_users - 隐藏部分用户 - 例如系统自动化用户
  - content_security_policy - CSP

## Grafana v7.3

- Table 支持导出 CSV

## Grafana v7.2

- 时间日期支持格式化
- Table 列支持过滤
- 新增 group-by 转换 - 支持多个字段 - 可计算生成新字段
- 转换支持排序 - 方便调整添加新的转换
- Prometheus
  - 新增 `$__rate_interval` 变量
- [v7-2-x](https://community.grafana.com/t/release-notes-v7-2-x/36321)
