---
title: 开发相关概念
tags:
  - 概念
---

# 开发相关概念

- thoughtworks [search](https://www.thoughtworks.com/zh-cn/radar/search)

## 12 factor

1. 基准代码
   - 一份基准代码，多份部署
   - CI/CD
2. 依赖
   - 显式声明依赖关系
   - 不同的语言有不同的优势劣势
   - 例如
     - Go - 跨平台 无依赖
     - NodeJS - node_modules 非常庞大
     - 系统依赖 - Linux, Windows
     - 运行环境依赖 - node, nginx, apache
3. 配置
   - 在环境中存储配置
   - 静态配置 - 本地
   - 动态配置 - consul、configmap
   - 运行时 - runtimevar
4. 后端服务
   - 把后端服务当作附加资源
   - 服务之间依赖
5. 构建，发布，运行
   - 严格分离构建和运行
   - CI/CD
6. 进程
   - 以一个或多个无状态进程运行应用
   - 例如: 单个容器、nginx
   - 无状态确保 灵活、扩容、缩容
7. 端口绑定
   - 通过端口绑定提供服务
   - 例如: Ingress, Gateway, 8080
8. 并发
   - 通过进程模型进行扩展
9. 易处理
   - 快速启动和优雅终止可最大化健壮性
10. 开发环境与线上环境等价
    - 尽可能的保持开发，预发布，线上环境相同
11. 日志
    - 把日志当作事件流
12. 管理进程
    - 后台管理任务当作一次性进程运行
    - 例如: 数据库初始化、schema 迁移、外部服务配置

---

- SDLC - Software Development Lifecycle
  - 软件开发生命周期
- 在现代的环境中也都能找到相对应的关系
- 微服务场景下不同的步骤涉及不同的组建
- https://12factor.net/

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
