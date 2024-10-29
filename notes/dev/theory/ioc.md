---
title: IoC
---

# IoC

- IoC - Inverson of Control - 控制反转
- DI - Dependency Injection - 依赖注入
  - 构造函数
  - Setter
  - Interface
  - Annotation
  - XML
- Dependency Lookup - 依赖查找

---

- 提供上下文容器 - Container/ApplicationContext
  - 不管是否使用，应用都存在潜在的上下文
  - 不使用容器，则可能是直接污染全局 或者 维护局部上下文
- 级联容器 - Parent/Child Container
  - 全局、请求、模块
- 动态装配 - Dynamic Assembly
  - 实现模块的动态加载、可替换、插件
- 生命周期管理 - Lifecycle
- 避免循环依赖 - Circular Dependency

---

- 大型一点的应用很难不使用 IoC


---

- 好处
  - 依赖管理
  - 模块化
  - 解耦
  - 动态装配/插件
  - 方便测试

---

- 后端
  - JVM Spring, Guice, Dagger
  - Node Nest.js
  - Golang fix, wire, dig
- 前端
  - Angular
    - 内置 IoC
  - React
    - Context
  - Vue.js
    - vue3 - provide/inject
  - Inversify
  - Awilix
