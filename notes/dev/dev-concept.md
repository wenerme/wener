---
title: 开发相关概念
tags:
  - 概念
---

# 开发相关概念

- [](./theory/12factor.md)
- https://bootstrappable.org/projects.html
- thoughtworks [search](https://www.thoughtworks.com/zh-cn/radar/search)

## CD Four key metrics

- 更改前置时间
- 部署频率
- 平均修复时间 - MTTR
- 变更失败率

---

- 交付核心四指标

## Core Web Vitals

| abbr. | stand for                | mean         | test for   |
| ----- | ------------------------ | ------------ | ---------- |
| LCP   | Largest Contentful Paint | 最大内容绘制 | 加载性能   |
| FID   | First Input Delay        | 首次输入延迟 | 交互性     |
| CLS   | Cumulative Layout Shift  | 累积布局偏移 | 视觉稳定性 |
| TTFB  | Time to First Byte       | 首字节时间   | LCP        |
| FCP   | First Contentful Paint   | 首次内容绘制 | LCP        |
| TBT   | Total Blocking Time      | 总阻塞时间   | FID        |
| TTI   | Time to Interactive      | 可交互时间   | FID        |

| metric | from | to   |
| ------ | ---- | ---- |
| LCP    | 2.5s | 4.0s |
| FID    | 100m | 300m |
| CLS    | 0.1  | 0.25 |

- https://web.dev/vitals/
- https://github.com/GoogleChrome/web-vitals
- https://web.dev/vitals-tools/
- https://web.dev/measure/
- http://linter.structured-data.org/

## SRE Golden Signals

- Latency - 延迟
- Traffic - 带宽
- Errors - 错误率
- Saturation - 饱和度
- https://sre.google/sre-book/monitoring-distributed-systems

## Zero trust architecture

- ZTA
- 企业网络
- 例如 Tailscale、 Hashicorp 的 Boundry
- https://csrc.nist.gov/publications/detail/sp/800-207/final

## Software Bill of Materials

- 软件物料清单 - SBOM
- 致力于提高软件供应链的安全性
- 交付的组件+工具和框架说明
