---
title: Dev FAQ
tags:
  - FAQ
---

# Dev FAQ

## 为什么枚举 **名字** 要用中文？

:::tip

推荐 **支持中文的语言** 且 **业务性强的场景** 尽量用中文定义枚举名字。

- 支持的语言: Java, C#
- 不支持的语言: Golang

:::

- 通用的，公共的可以用英文
- 业务域的含义往往很专业
- 为了方便阅读
  - 代码是给人读的
  - 是可以加注释，但是多一个步骤，打断阅读逻辑
- 不存在编码问题 - UTF8 编码都支持
- 没多少人能读对
  - 过代码的时候就尴尬了 😅
- 没多少人能写对英文
  - 可能产生莫名其妙的英文
  - 放弃写英文后会直接写“拼音”
- 没多少人能理解英文
  - Pending ？ ChinaResidentIdentityCard？
  - gender ? sex ?

## 为什么枚举 **值** 要用英文？

:::tip

推荐 **业务场景** 里尽量用 字符串/英文 作为枚举值

:::

- 推荐 `PascalCase`
  - vs. `snake-case` 可以直接作为名字
  - vs. `camelCase` 区别于变量
  - vs. `UPPER_CASE` 更好看，更好写
- 数字没有含义 - 必然要找定义
- 可能记错
- 不一定写的准确，但别人能猜个大概

## Framework vs. Library

- Framework
  - 框架 - 蓝图 - 结构 - 按照给定的方式达成目标
  - 不易替换 - 替换等于是新的结构
    - React -> Angular
  - 写代码 **被** 调用
- Library
  - 库 - 工具 - 辅助辅助完成目标
  - 可替代
    - React -> Preact
  - 写代码 **去** 调用

## Private Cloud vs. On-Premise

- Private Cloud
  - 基础设施
  - 强调物理设施本地化
- On-Premise
  - 服务、软件
  - 强调服务功能本地化
  - 公有云上也可以 On-Premise

## health vs. healthz

- 类似的 readyz, varz, statusz, rpcz, livez
- 来自于谷歌内部实践 - z-pages
- z 是为了避免和现有 endpoint 冲突
- 大多用带 z 的名字，系统常用，类似 /metrics，与业务无关
- 参考
  - https://stackoverflow.com/a/43381061/1870054
- 其他
  - /health/live
  - /health/ready

## 什么是边缘计算

个人简单理解，Edge 就是 DataCenter 的反义词。

---

- 早期计算：集中式应用程序，仅在一台孤立的计算机上运行
- 个人计算：本地运行的去中心化应用程序
- 云计算：在数据中心运行的集中式应用程序
- 边缘计算：在靠近用户的地方——设备本身或者网络边缘——运行的集中式应用程序

---

- https://www.cloudflare.com/zh-cn/learning/serverless/glossary/what-is-edge-computing/

## API URL

- ods.opinsights.azure.com/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/otherResourceGroup/providers/Microsoft.Storage/storageAccounts/examplestorage
  - Azure Monitor Logs
- Datadog - https://docs.datadoghq.com/logs/log_collection/
  - http-intake.logs.datadoghq.com
- GCP - googleapis.com
  - `https://<region>-<svc>.googleapis.com`
  - https://appengine.googleapis.com/$discovery/rest?version=v1
  - https://run.googleapis.com
    - 服务发现 https://run.googleapis.com/$discovery/rest?version=v1

## Orchestration vs Choreography

- Orchestration
  - 编排 - 可同步、可异步
  - 可总览服务流程
  - 中心服务可能会重、复杂
  - temporal 这样的服务让异步复杂编排变得简单
- Choreography
  - 事件总线 - 异步
  - 相对更解偶
  - 失去业务全局观

## 开发缓存

| dir                 | macOS                      | for                 | clean              |
| ------------------- | -------------------------- | ------------------- | ------------------ |
| ~/.m2/repository/   |                            | Maven               |
| ~/.npm/             |                            | NPM                 |
| ~/.cache/zig/       |
| ~/.cache/prisma/    |
| ~/.cache/buf/       |
| ~/go/pkg/mod        |                            | `go env GOMODCACHE` |
| - ~/.cache/go-build | ~/Library/Caches/go-build/ | `go env GOCACHE`    | `go clean --cache` |
|                     | ~/Library/Caches/Homebrew  | `brew --cache`      |
| ~/.pnpm-store       |

- ~/Library/Caches/JetBrains
- ~/Library/Caches/Yarn
- ~/Library/Caches/electron
- ~/Library/Caches/esbuild
- ~/Library/Caches/golangci-lint
- ~/Library/Caches/hardhat-nodejs
- ~/Library/Caches/helm
- ~/Library/Caches/pip
- ~/Library/Caches/pnpm
- ~/Library/Caches/typescript
- ~/Library/Caches/turbo

```bash
# Maven
mvn dependency:purge-local-repository -DactTransitively=false -DreResolve=false --fail-at-end

# Maven Dir
mvn help:evaluate -Dexpression=settings.localRepository -q -DforceStdout
```

## How to ask

- https://stackoverflow.com/help/minimal-reproducible-example

## 127.0.0.1 vs localhost

尽量使用 127.0.0.1

- https://datatracker.ietf.org/doc/html/rfc8252#section-7.3

## CRLF

- 换行符 - new line - ␤ - line ending, end of line (EOL), next line (NEL), line break
  - ⏎ - enter 符号
- carriage return (CR) - ␍ - `\r`
  - 以前的 Mac OS
- line feed (LF) - ␊ - `\n`
  - unix, macOS
- crlf - `\r\n`
  - Windows
  - HTTP 头部的换行符

## 常见问题

1. 未掌握 std 库
1. 未掌握 core 库
1. 不考虑扩展性
1. 技术名词拼写不规范
1. 提交不规范
1. 书写时中英文混排不规范
1. 写复杂冗长的函数
1. 不会写文档
1. 不看官方文档，只看垃圾博客
1. 宣扬内功无用论
1. 乐于炫技
1. 不接受质疑
1. 接口协议不规范
1. 遇到问题自己死磕
1. 一说就会，一写就废
1. 表达没有逻辑，不站在对方角度看问题
1. 不主动思考，伸手党
1. 经常犯重复的错误
1. 接口不自测，出问题不打日志
1. 直接写代码
1. 重要设计不写文档

## Magic Number

- 1048576
  - Excel 行限制
- 16,384
  - Excel 列限制

## 关于服务重启导致服务中断问题的说明

- 部署使用 startProbe 等到 health 才切换，避免新版本出现问题导致服务启动失败，旧版本服务下线问题
- Java 通常较慢，启动可能 1m 左右

---

**问题**

1. 用到了 nacos 导致服务注册更新延迟

- 新版本服务启动后会重新注册到 nacos，旧版本服务下线
- 客户端不一定来得及更新 - 因此下线后可能出现还未更新的客户端部分异常

1. 现在 cloud native 一般基于 service/dns 访问，这种问题不会出现

---

**解决办法**

1. 部署多副本，避免单点问题，使用滚动升级
1. 延长启动时间，避免服务注册更新延迟
1. 使用 sts，确保相同的 hostname - 不确定注册逻辑，是否能避免中断问题 - 使用 sts 至少 2 副本
1. 减少发布频度
1. 配置自动更新窗口避免热点时间自动更新

## API & 合约 & 协同

当我们把 API 比作合约时，意味着它为开发者定义了一系列规则、约定和协议，这些规则描述了如何访问和使用这些功能。遵循这些规则可以确保软件组件之间的顺畅交互。API 合约包括以下几个方面：

1. 数据格式：API 规定了开发者应该如何向其发送数据（如 JSON、XML 等）以及如何接收返回的数据。
2. 资源和操作：API 提供了一组可用的资源（如数据对象、功能等）以及可以对这些资源执行的操作（如创建、查询、更新和删除等）。
3. 调用约定：API 定义了如何构建请求（如 HTTP 请求方法、URL 结构等）以及接收和处理响应（如状态代码、响应头等）。

遵守 API "合约"的好处包括：

1. 易于集成：开发者只需遵循约定，即可轻松地将软件组件集成到自己的项目中。
2. 可重用性：遵循 API 合约的代码在多个项目中都可以重复使用，提高了开发效率。
3. 可扩展性：API 可以独立于底层实现进行版本控制和演进，从而确保系统的可扩展性和长期稳定性。

因此，API 被称为合约，主要是因为它为开发者提供了一种标准化、可靠的方式来互动和访问其他软件组件的功能。

---

合约和协同是两个相关但不同的概念。合约通常是指一种约定，规定了各方如何进行交互，从而实现共同目标。协同则是指多个实体（如人、团队、组织或系统）共同努力以实现共同目标的过程。

合约和协同之间的关系：

1. 合约作为基础：合约为协同创造了条件，确保各方遵循相同的规则和约定，以便更高效地协同工作。例如，在软件开发中，API 合约规定了如何访问和使用特定功能，使得不同软件组件可以无缝地协同工作。
2. 协同促进合约执行：在实际应用中，协同可以帮助各方更好地理解和执行合约。当各方共同努力实现目标时，合约可以确保双方以一种可预测和可靠的方式互动，从而促进有效的协同。
3. 互相调整和改进：在实际协同过程中，可能会发现合约中的某些规定不适用或需要调整。这种情况下，各方可以通过沟通和协商来修改合约，以满足实际需求。同样，成功的协同也可能导致新的合约产生，以满足不断发展的需求。

综上所述，合约和协同之间存在密切关系。合约为协同提供了基础和规则，协同则依赖于合约来实现各方之间的有效合作。在实际应用中，合约和协同需要不断调整和改进，以适应不断变化的需求。
