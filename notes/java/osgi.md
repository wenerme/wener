---
title: OSGi (Open Services Gateway initiative)
---

# OSGi (Open Services Gateway initiative)

- **Core Concepts**: Bundles, Services, Life-cycle, Modules.
- **Implementations**: Eclipse Equinox, Apache Felix, Knopflerfish.

## Overview

OSGi 是 Java 的动态模块化系统。它定义了一个架构，用于以模块化方式开发、部署和管理应用程序。

### Core Layers

1.  **Module Layer (Bundles)**: 定义了模块（Bundle）及其依赖关系（Import/Export Package）。
2.  **Lifecycle Layer**: 管理 Bundle 的生命周期（Installed, Resolved, Starting, Active, Stopping, Uninstalled）。
3.  **Service Layer**: 提供了一种发布、查找和绑定服务的动态模型（Service Registry）。

## MANIFEST.MF Structure

OSGi Bundle 本质上是一个带有特定元数据的 Jar 包，元数据位于 `META-INF/MANIFEST.MF`。

```manifest
Manifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: My OSGi Bundle
Bundle-SymbolicName: com.example.mybundle
Bundle-Version: 1.0.0
Bundle-Activator: com.example.mybundle.Activator
Bundle-Vendor: My Company
# 导出的包，供其他 Bundle 使用
Export-Package: com.example.service;version="1.0.0"
# 导入的包，当前 Bundle 需要的依赖
Import-Package: org.osgi.framework;version="1.3.0",
 javax.servlet;version="2.5.0"
```

## Key Headers

- **Bundle-SymbolicName**: Bundle 的唯一标识符。
- **Bundle-Version**: 版本号 (Major.Minor.Micro.Qualifier)。
- **Import-Package**: 声明依赖的包。OSGi 最强大的特性之一，只导入需要的包而非整个 Jar。
- **Export-Package**: 声明对外暴露的包。未导出的包对其他 Bundle 不可见（实现隐藏）。
- **Bundle-Activator**: 可选。指定一个实现了 `BundleActivator` 接口的类，用于在 Bundle 启动和停止时执行代码。

## Pros & Cons

- **Pros**:
  - **动态性**: 运行时安装、更新、卸载模块而无需重启 JVM。
  - **隔离性**: 严格的类加载隔离，解决 Jar Hell 问题（不同模块可依赖同一库的不同版本）。
  - **服务化**: 面向接口编程，松耦合。

- **Cons**:
  - **复杂性**: 类加载机制复杂，即 "Classloading Hell"。
  - **生态**: 许多现代 Java 框架（如 Spring Boot）转向了 fat-jar 或云原生模式，减少了对 OSGi 的依赖。
  - **侵入性**: 代码可能需要适配 OSGi 环境（尽管 Declarative Services 减轻了这一点）。
