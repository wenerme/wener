---
title: 12 factor
---

# 12 factor

1. 基准代码/Codebase
   - 一份基准代码，多份部署
   - CI/CD
2. 依赖/Dependencies
   - 显式声明依赖关系
   - 不同的语言有不同的优势劣势
   - 例如
     - Go - 跨平台 无依赖
     - NodeJS - node_modules 非常庞大
     - 系统依赖 - Linux, Windows
     - 运行环境依赖 - node, nginx, apache
3. 配置/Config
   - 在环境中存储配置
   - 静态配置 - 本地
   - 动态配置 - consul、configmap
   - 运行时 - runtimevar
4. 后端服务/Backing services
   - 把后端服务当作附加资源
   - 服务之间依赖
5. 构建，发布，运行/Build, release, run
   - 严格分离构建和运行
   - CI/CD
6. 进程/Processes
   - 以一个或多个无状态进程运行应用
   - 例如: 单个容器、nginx
   - 无状态确保 灵活、扩容、缩容
7. 端口绑定/Port binding
   - 通过端口绑定提供服务
   - 例如: Ingress, Gateway, 8080
8. 并发/Concurrency
   - 通过进程模型进行扩展
9. 易处理/Disposability
   - 快速启动和优雅终止可最大化健壮性
10. 开发环境与线上环境等价/Dev/prod parity
    - 尽可能的保持开发，预发布，线上环境相同
11. 日志/Logs
    - 把日志当作事件流
12. 管理进程/Admin process
    - 后台管理任务当作一次性进程运行
    - 例如: 数据库初始化、schema 迁移、外部服务配置

---

- https://12factor.net/
- SDLC - Software Development Lifecycle
  - 软件开发生命周期
- 在现代的环境中也都能找到相对应的关系
- 微服务场景下不同的步骤涉及不同的组建
