---
title: JNLP (Java Network Launching Protocol)
---

# JNLP (Java Network Launching Protocol)

- **Status**: Deprecated in Java 9, Removed in Java 11.
- **Replacement**: OpenWebStart / IcedTea-Web (Community driven).

## Overview

JNLP (Java Network Launching Protocol) 是一种允许客户端通过网络启动应用程序的协议。它是 Java Web Start (JWS) 技术的核心，允许用户通过点击 Web 浏览器中的链接来下载和运行 Java 应用程序。

JNLP 文件是一个 XML 文件，描述了应用程序的启动信息，包括：

- 代码库位置 (Codebase)
- 依赖的 Jar 包 (Resources)
- 主类 (Main-Class)
- 安全权限 (Security)
- JVM 参数

## Example Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- codebase 属性指定了相对 URL 的基准地址 -->
<jnlp spec="1.0+" codebase="http://example.com/app/" href="myapp.jnlp">

    <information>
        <title>My Application</title>
        <vendor>My Company</vendor>
        <homepage href="http://example.com/"/>
        <description>A simple JNLP application</description>
        <!-- 允许离线运行 -->
        <offline-allowed/>

        <!-- 图标和启动画面 -->
        <icon href="icon.png"/>
        <icon kind="splash" href="splash.png"/>
    </information>

    <security>
        <!-- 请求所有权限，通常需要 Jar 包签名 -->
        <all-permissions/>
    </security>

    <resources>
        <!-- 指定需要的 JRE 版本 -->
        <j2se version="1.8+" href="http://java.sun.com/products/autodl/j2se"/>

        <!-- 应用程序 Jar 包 -->
        <jar href="myapp.jar" main="true"/>
        <jar href="lib/dependency.jar"/>

        <!-- 根据操作系统加载原生库 -->
        <nativelib href="lib/native-libs.jar"/>
    </resources>

    <application-desc main-class="com.example.MyApp">
        <!-- 传递给主类的参数 -->
        <argument>arg1</argument>
        <argument>arg2</argument>
    </application-desc>

</jnlp>
```

## Migration

由于 JNLP 已被移除，建议迁移到以下替代方案：

1.  **jlink / jpackage**: 使用 Java 模块化工具构建包含自定义 JRE 的独立安装包。
2.  **OpenWebStart**: 一个开源的 JWS 实现，致力于长期支持 JNLP。
3.  **Getdown / install4j**: 其他 Java 应用分发和更新工具。
