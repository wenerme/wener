---
title: Grafana Version
---

# Grafana Version

- [What’s new Grafana](https://grafana.com/docs/grafana/latest/whatsnew/)

## 8.0

- PieChart GA

## 7.5

- Pie chart panel beta
- Alerting for Loki
- Loki label browser
- Tempo as a backend data source

## 7.4

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

## 7.3

- Table 支持导出 CSV

## 7.2

- 时间日期支持格式化
- Table 列支持过滤
- 新增 group-by 转换 - 支持多个字段 - 可计算生成新字段
- 转换支持排序 - 方便调整添加新的转换
- Prometheus
  - 新增 `$__rate_interval` 变量
- [v7-2-x](https://community.grafana.com/t/release-notes-v7-2-x/36321)
