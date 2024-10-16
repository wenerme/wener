---
title: Dev FAQ
tags:
  - FAQ
---

# Dev FAQ

- Optimize
  - PGO - Profile Guided Optimization
    - GCC, Clang, MSVC, Golang
  - LTO - Link Time Optimization
    - 使得 Link 能全局优化而非局限于单个模块
  - AutoFDO - Auto Feedback Directed Optimization
    - by Google
    - 通过运行时采集数据，优化编译
  - ThinLTO - Thin Link Time Optimization
    - 一种 LTO 的变种，用更少的内存和时间
  - BOLT - Binary Optimization and Layout Tool
    - by Facebook/Meta
    - GCC, LLVM
    - 一种 PLO 技术
    - 重新布局代码块，减少分支预测错误，提高 CPU 缓存命中率
  - PLO - Post Link Optimization
  - XRay - XRay Instrumentation
    - LLVM 的性能分析工具
  - Intel VTune Profiler
  - Binary Instrumentation
    - Pin
    - DynamoRIO
    - Valgrind
- https://www.joelonsoftware.com/
- https://www.martinfowler.com/
- https://web.stanford.edu/~ouster/cgi-bin/decisions.php

## 常见命名格式 {#case}

| case                            | demo                    | for                          |
| ------------------------------- | ----------------------- | ---------------------------- |
| `SNAKE_CASE`,`UPPER_SNAKE_CASE` | `MY_CONSTANT_VALUE`     | 常量值、宏定义               |
| `camelCase`                     | `myVariableName`        | 变量名、函数名               |
| `PascalCase`                    | `MyClassName`           | 类名、构造函数名             |
| `kebab-case`,`dash-case`        | `my-variable-name`      | 文件名、URL 路径             |
| `Title Case`                    | `Title Case Example`    | 标题、文章标题               |
| `lower_snake_case`              | `my_variable_name`      | 文件名、数据库列名           |
| `Train-Case`                    | `Train-Case`            | API 名称、某些特定语言的类名 |
| `dot.case`                      | `my.variable.name`      | 配置项、文件路径             |
| `Sentence case`                 | `Sentence case example` | 标题、段落开头               |
| `path/case`                     | `path/case/example`     | 文件路径、URL 路径           |
| `UPPERCASE`                     | `UPPERCASE`             | 缩写、某些特定语言的常量     |
| `lowercase`                     | `lowercase`             | 某些特定文件名或变量名       |
| `namespace:identifier`          | `system:admin`          | 命名空间、标识符、OIDC Scope |

- golang 里特殊的名词会做大写
  - 例如 `UserID` 而不是 `UserId`
  - MixedCaps
  - Initialisms https://go.dev/wiki/CodeReviewComments#initialisms
  - Another convention is that acronyms should be capitalized:
    - ServeHTTP <- ServeHttp
    - XMLHTTPRequest <- XmlHttpRequest

## keycode

- https://keycode.info/
  - https://www.toptal.com/developers/keycode/table

## Roles

- 管理岗
- 专业岗

| role     | for      |
| -------- | -------- |
| 项目经理 | 项目管理 |
| 运营     | 价值变现 |
| 产品经理 | 交付价值 |
| 开发     | 满足需求 |
| 测试     | 质量     |
| 运维     | 稳定     |
| 安全     | 安全     |

- 需求分析
  - 角色 -> 用例 -> 功能 -> 任务

## 中式管理

- 中式管理
  - 管人 - 人情
  - 管事 - 美式管理、流程制度化
- 美式管理 - 契约
- 日式管理

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

## Framework vs. Business Logic

| Framework            | Business Logic       |
| -------------------- | -------------------- |
| 提供骨架、流程       | 实现接口、契约       |
| 核心流程的调度和装配 | 被调用，注入具体实现 |
| 运行容器             | 特定需求定制开发     |
| 通用流程             | 个性化实现           |
| 负责谁调用谁         | 负责怎么调用         |
| 可重用的模版和工具   | 接口规范的具体实现   |

- functionality - 功能
- Business Logic - 业务逻辑
- Application logic - 应用层逻辑
- Domain logic - 领域层逻辑

---

1. 不要过早锁定框架,保持开放和可替换性。使用适配器、接口等方式解耦。
1. 与利益相关方充分讨论,了解真实业务需求。不要为框架增加非必要的复杂性。
1. 先实现核心业务流程的简单可行版本,然后再逐步完善。不要一开始就追求架构完美。
1. 采用增量引入新技术的策略,先保证核心业务,再扩展架构。
1. 做好框架和业务逻辑的负责划分,各司其职,但要加强沟通协作。
1. 不断优化和重构代码,保证业务需求变更可以轻松适配。
1. 更多考虑业务价值,而非技术本身。业务获益才是成功的关键。
1. 避免流于“敏捷 Architecture astronauts”,保持与业务的密切联系。
1. 业务范围清晰后,再构建匹配的架构。

## Agile Architecture astronauts

1. 过于狂热追求完美架构的倾向。
1. 偏重技术本身,而非业务需求。
1. 设计非常复杂和“完美”的架构,但实际不可用。
1. 自说自话,没有与团队真正合作。
1. 做出太多不必要的假设。
1. 一味追求新技术,不考虑学习成本。
1. 架构只存在白皮书,没有落地。
1. 缺少快速迭代和用户反馈。
1. 更看重架构的“完美程度”,而非实际价值。
1. 像“宇航员”那样与实际业务脱节。

> build your system out of small tools, that do only one thing well, and that communicate through a standard protocol. Systems built that way can be re-written one piece at a time.

- https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/
- https://www.jamesshore.com/v2/books/aoad1/incremental_design
- https://www.martinfowler.com/ieeeSoftware/continuousDesign.pdf
- https://www.martinfowler.com/articles/designDead.html
- https://philippe.bourgau.net/incremental-architecture-a-cure-against-architecture-astronauts/

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

---

- /ready, /readyz
  - 是否准备好接受请求
- /livez, /live
  - alive/up and running
- /health, /ping
  - 通用的健康检查
- /statusz
  - 服务状态信息
- /varz
  - 内部变量和 metrics
- /rpcz
  - 一般是 RPC 统计

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

## clean

```bash
brew cleanup
go clean -modcache

mvn dependency:purge-local-repository -DactTransitively=false -DreResolve=false --fail-at-end
gradle clean

ls ~/.nvm/versions/node/v{12,14,16}* -d 2> /dev/null | xargs -n1 basename
# for s in $(  ls ~/.nvm/versions/node/v{12,14,16}* -d 2>/dev/null | xargs -n1 basename );do echo nvm uninstall $s; done
rm -rf ~/.nvm/versions/node/v{12,14,16}*

nvm cache clear
yarn cache clean
npm cache clean --force
pnpm store prune

pip cache purge
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

## 新手常见问题 {#newbie}

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
- 16384
  - Excel 列限制

## 关于 K8S 服务重启导致服务中断问题的说明

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

## 北向接口

- Northbound API
- 服务组件对外提供的 API 接口
- 对外暴露的 API
- 抽象和封装内部逻辑
- 服务组合和编排
- 实现多渠道服务
- 保证系统安全

## Data is code, code is data

- code is data
  - Relfectin
  - Enum
  - Annotation
  - AOP
  - Model - ORM
  - Meta Programming
  - Macro
  - 生成器
  - DSL
- data is code
  - Code=Engine, Data=Fuel
  - Data 定义了逻辑规则 = Code

## schema vs validator

- Schema-First - 模式优先
  - 数据类型定义
  - 通常和类型能一一对应
  - 可以用来做验证，还可以用来生成代码
  - e.g. typebox, typia, jsonschema, ajv
- Validate-First - 验证优先
  - 业务逻辑定义
  - 通常包含额外的处理逻辑 - 功能更多，能自定义处理
  - 通常能生成 Schema - 但是会丢失一些信息且不一定准确
  - e.g. zod

## monorepo

- Monorepo: please do
  - https://news.ycombinator.com/item?id=18820258

## 链接超时 {#idle-connections}

- 云平台会主动切断 idle 的链接，这个和局域网的链接不同 - 云平台 nat 资源
- 应用需要主动 ping/keepalive 保持链接，否则从链接池里拿出来链接可能已经 timeout
- 操作系统层面可以配置 tcp keepalive 进行保活
- 大多链接池都支持
  - IdleTimeout
    - 建议小于 10 分钟
    - idle 时长，如果配置的比 平台/系统 层 idle 短，也能避免取到无效链接的问题
  - TestOnBorrow - 有一定性能影响
  - TestOnReturn
  - TestWhileIdle - 影响小，但会浪费一定链接数量
    - 需要慎重考虑配置的 idle 数量
- 链接池
  - apache commons-pool [GenericObjectPool](https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/GenericObjectPool.html)
    - 支持 IdleTime, TestWhileIdle, TestOnCreate, TestOnBorrow, TestOnReturn
  - HikariCP [HikariConfig](https://javadoc.io/doc/com.zaxxer/HikariCP/latest/com/zaxxer/hikari/HikariConfig.html)
    - IdleTimeout, KeepaliveTime
    - KeepaliveTime 检测 idle 的周期

**系统 TCP KeepAlive**

- tcp_keepalive_time
  - 上次数据包发送后，多久开始发送 keepalive
  - 开始发送 keepalive 后，该值不在重要
  - TCP_KEEPIDLE
- tcp_keepalive_intvl
  - 发送 keepalive 的间隔
  - TCP_KEEPINTVL
- tcp_keepalive_probes
  - 多少次 unack 后认为链接已经断开，通知应用层
  - TCP_KEEPCNT

```bash
# Linux
# 默认 7200，75，9
# 2小时, 75s, 9次
sysctl net.ipv4.tcp_keepalive_time net.ipv4.tcp_keepalive_intvl net.ipv4.tcp_keepalive_probes

# 1分钟, 1分钟, 5次
sysctl -w \
  net.ipv4.tcp_keepalive_time=60 \
  net.ipv4.tcp_keepalive_intvl=60 \
  net.ipv4.tcp_keepalive_probes=5

cat << EOF | sudo tee /etc/sysctl.d/99-tcp_keepalive.conf
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 60
net.ipv4.tcp_keepalive_probes = 5
EOF
sudo sysctl -p /etc/sysctl.d/99-tcp_keepalive.conf

# macOS
sysctl net.inet.tcp.always_keepalive net.inet.tcp.keepidle net.inet.tcp.keepinit net.inet.tcp.keepintvl
```

- GCP 是 10 分钟
  - https://cloud.google.com/compute/docs/troubleshooting/general-tips?hl=zh-cn#idle-connections
- AWS ELB 默认是 1 分钟
  - 可修改为 1 - 4000
  - [Configure the idle connection timeout for your Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/config-idle-timeout.html)
- AWS API Gateway 默认 10 分钟
  - [Amazon API Gateway quotas and important notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)
- https://tldp.org/HOWTO/html_single/TCP-Keepalive-HOWTO/

## 重构的价值 {#refactor}

1. 提高 可维护性
1. 提高 质量
1. 提高 开发效率
1. 提高 系统的灵活性和可扩展性
1. 技术债务管理
1. 提高 系统性能
1. 提高 团队士气
1. 改善 系统安全性

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.
>
> 任何傻瓜都能写出计算机能理解的代码，而优秀的程序员会写出人类能理解的代码
>
> -- Martin Fowler

## 技术债务 {#tech-debt}

> 技术债务（Technical Debt）

- 类型
  - 设计
  - 代码
  - 测试
  - 文档
  - 流程
- 成因
  - 时间
  - 不充分的设计
  - 技能不足
  - 不良的开发习惯
  - 业务需求变化
- 影响
  - 维护成本
  - 系统稳定性
  - 开发效率
  - 团队士气
- 管理
  - 识别评估
  - 制定计划
  - 优先级排序
  - 重构优化
  - 改进流程

## endian

> endian, endianness, byte-order

- big / big-endian / bigEndian / BE / 大端序
  - 反序
  - network byte order
  - 网络通信、文件格式
    - 因此大多时候操作数据都是大端序
  - RISC, IBM PowerPC, Solaris, SPARC
  - `0x12345678` -> `0x12 0x34 0x56 0x78`
- little / little-endian / littleEndian / LE
  - 处理器, 内存, 计算
    - 因此大多时候实现模拟器、虚拟机都是小端序
  - Intel x86, x86-64
  - Windows
  - 和内存地址对齐
  - `0x12345678` -> `0x78 0x56 0x34 0x12`

```bash
# Byte Order: Little Endian
lscpu | grep Endian

# 0 for Big Endian, 1 for Little Endian
echo -n I | od -to2 | head -n1 | cut -f2 -d" " | cut -c6
```

---

- https://en.wikipedia.org/wiki/Endianness / 小端序
- https://developer.mozilla.org/en-US/docs/Glossary/Endianness
