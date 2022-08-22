---
title: Intellij IDEA
---

# Intellij IDEA

:::info

- GRPC HTTP 客户端支持 Metadata [IDEA-287369](https://youtrack.jetbrains.com/issue/IDEA-287369)

:::

:::caution WebStorm

- NPM 工作空间补全有问题 [WEB-50806](https://youtrack.jetbrains.com/issue/WEB-50806)
- c8 Coverage [WEB-45069](https://youtrack.jetbrains.com/issue/WEB-45069)
- [AVA Test Run Configuration Generator](https://plugins.jetbrains.com/plugin/13835-ava-test-run-configuration-generator)

:::

:::tip 插件

- [devkanro/intellij-protobuf-plugin](https://github.com/devkanro/intellij-protobuf-plugin)
  比官方 pb 插件功能更多
- 官方 gRPC 插件 [16889-grpc](https://plugins.jetbrains.com/plugin/16889-grpc)
- [JetBrains/intellij-plugins](https://github.com/JetBrains/intellij-plugins)
  - 官方内置插件源码

:::

**特殊正则替换语法**

| syntax | for                     |
| ------ | ----------------------- |
| \l     | 小写下一个字符          |
| \u     | 大写下一个字符          |
| \L     | 小写直到 \E 或 替换结束 |
| \U     | 大写直到 \E 或 替换结束 |
| \E     | \U, \L 结束标志         |

- https://www.jetbrains.com/help/idea/regular-expression-syntax-reference.html

## 实现自定义语言插件

- [Custom Language Support Tutorial](http://www.jetbrains.org/intellij/sdk/docs/tutorials/custom_language_support_tutorial.html)
- Language and File Type
- Syntax Highlighter and Color Settings Page
- Annotator
- Line Marker Provider
- Completion Contributor
- Reference Contributor
- Find Usages Provider
- Folding Builder
- Go To Symbol Contributor
- Structure View Factory
- Formatter
- Code Style Settings
- Commenter
- Quick Fix

## Grammar-Kit

- [JetBrains/Grammar-Kit](https://github.com/JetBrains/Grammar-Kit)
- BNF 基于 PEG
- 使用 JFlex 做词法解析
- Antlr 生成 Psi
  - [antlr/jetbrains](https://github.com/antlr/jetbrains)
    - 提供 Antlr 到 Psi 的适配
  - [antlr/intellij-plugin-v4](https://github.com/antlr/intellij-plugin-v4)
    - Antlr 的插件是基于 Antlr 实现的

## Diff

```bash
idea diff path1 path2 path3
```
