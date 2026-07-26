---
tags:
  - Question
---

# 一、代码是否基本正确

这是最基础的一层：代码本身能不能被语言和工具正确理解。

## 1. 语法是否合法

问题：

```text
代码能否被解析？
括号、关键字、模块语法是否正确？
配置文件格式是否正确？
```

典型工具：

```text
TypeScript parser
tsc
Biome
Oxlint
ESLint
```

## 2. 类型是否正确

问题：

```text
传入的值类型是否符合函数要求？
返回值是否符合声明？
是否把 undefined 当成确定值使用？
泛型约束是否成立？
接口实现是否完整？
```

例如：

```ts
function getName(user: User): string {
  return user.name;
}
```

但：

```ts
interface User {
  name?: string;
}
```

这里返回值可能是 `undefined`。

工具：

```text
tsc --noEmit
typescript-eslint type-aware rules
Oxlint type-aware rules
```

## 3. Promise 和异步逻辑是否正确

问题：

```text
Promise 是否忘记 await？
异常是否会变成未处理 rejection？
并发操作是否错误地串行执行？
资源关闭前异步任务是否完成？
```

例如：

```ts
saveUser(user);
return { success: true };
```

如果 `saveUser` 返回 Promise，可能已经提前响应。

工具：

```text
TypeScript
typescript-eslint
Oxlint type-aware
测试
```

---

# 二、代码和依赖是否“没人使用”

这就是 Knip 主要回答的问题。

Knip 从项目入口和框架配置出发构造模块图，主要寻找未使用文件、导出和依赖。([Knip][1])

## 4. 是否存在未使用变量

问题：

```text
这个局部变量是否声明后从未使用？
这个函数参数是否完全没用？
这个 import 是否多余？
```

工具：

```text
Oxlint
Biome
ESLint
TypeScript
```

## 5. 是否存在未使用导出

问题：

```text
这个 export 有人 import 吗？
这个公开 API 是否已经废弃但仍然保留？
这个 type、enum、class 是否无人引用？
```

例如：

```ts
export function legacyCreateUser() {}
```

文件还在使用，但这个导出没人使用。

工具：

```text
Knip
ts-prune（功能较窄）
```

## 6. 是否存在完全不可达的文件

问题：

```text
这个文件是否从任何程序入口都无法到达？
旧页面是否已经没有路由？
旧 service 是否已被新实现替代？
```

例如：

```text
src/services/legacy-invoice-service.ts
```

没有任何入口最终 import 它。

工具：

```text
Knip
构建工具的依赖图
```

## 7. package.json 中是否有未使用依赖

问题：

```text
安装的 npm 包是否已经没人使用？
devDependency 是否还需要？
迁移完成后旧 SDK 是否还留着？
```

工具：

```text
Knip
depcheck（较老、对现代框架理解通常较弱）
```

## 8. 是否使用了未声明依赖

问题：

```text
代码 import 了某个包，但当前 workspace 没声明吗？
项目是否依赖 hoisting 恰好让它能运行？
是否错误借用了另一个 package 的依赖？
```

例如：

```ts
import { parse } from 'yaml';
```

但当前 package 的 `package.json` 没有 `yaml`。

工具：

```text
Knip
pnpm strict dependency layout
```

这类问题很重要，因为本地可能正常，独立发布或 CI 环境就会失败。

---

# 三、代码里有没有明显错误模式

这一层是传统 linter、静态规则和 Semgrep 常做的事情。

Semgrep 的核心定位是搜索代码、发现 bug，并强制执行安全规范和编码标准；它既可以匹配语法模式，也支持污点规则。([GitHub][2])

## 9. 是否存在容易出错的写法

问题：

```text
是否写了永远成立的条件？
是否在循环中错误创建闭包？
是否错误比较 NaN？
是否在 switch 中意外 fall-through？
```

例如：

```ts
if (value === NaN) {
}
```

这个判断永远为 false。

工具：

```text
Oxlint
Biome
ESLint
Sonar
```

## 10. 是否使用了过时或禁止 API

问题：

```text
是否使用 deprecated API？
是否仍然使用旧的 SDK？
是否调用了公司禁止的底层接口？
```

例如：

```ts
axios.get(...)
```

团队要求统一使用：

```ts
apiClient.get(...)
```

工具：

```text
Semgrep
ESLint 自定义规则
Oxlint 自定义插件能力
```

## 11. 是否绕过了统一基础设施

问题：

```text
是否直接 fetch，而不是统一 HTTP client？
是否直接连接数据库，而不是 repository？
是否直接读取 process.env，而不是配置层？
是否绕过认证中间件？
是否绕过 tracing 或审计日志？
```

这类问题通常是企业内部质量规则。

工具：

```text
Semgrep
ESLint 自定义规则
dependency-cruiser
```

## 12. 是否存在危险函数调用

问题：

```text
是否使用 eval？
是否调用 child_process.exec？
是否拼接 SQL？
是否使用不安全的反序列化？
是否使用弱随机数生成安全 token？
```

工具：

```text
Semgrep
CodeQL
ESLint security 插件
Sonar
```

## 13. 是否泄露敏感信息

问题：

```text
日志里是否输出 token？
是否把密码写进异常信息？
是否硬编码 API key？
是否把用户隐私字段发送给分析服务？
```

工具：

```text
Semgrep
Gitleaks
TruffleHog
CodeQL
Secret scanner
```

---

# 四、数据能否从不可信来源流到危险位置

这是污点分析、数据流分析的核心。

Semgrep 将这种规则描述成 source、sink、sanitizer；CodeQL 则提供局部数据流、全局数据流和 taint tracking API。([Semgrep][3])

## 14. 用户输入是否进入 SQL

问题：

```text
HTTP 参数是否最终进入 SQL？
中途是否经过参数化查询？
字符串拼接是否可能导致 SQL 注入？
```

```ts
const name = req.query.name;
db.query(`SELECT * FROM users WHERE name = '${name}'`);
```

工具：

```text
Semgrep taint
CodeQL
SAST 工具
```

## 15. 用户输入是否进入 Shell

问题：

```text
用户输入是否进入 exec？
是否只做了表面过滤？
是否经过多个 helper 后仍然危险？
```

```text
request.query.command
        ↓
normalize()
        ↓
buildCommand()
        ↓
exec()
```

工具：

```text
CodeQL
Semgrep taint
```

## 16. 用户输入是否进入 HTML 或 DOM

问题：

```text
不可信内容是否进入 innerHTML？
模板输出是否经过转义？
富文本 sanitizer 是否真正覆盖所有路径？
```

目标漏洞：

```text
XSS
DOM XSS
HTML injection
```

工具：

```text
CodeQL
Semgrep
框架安全规则
```

## 17. 用户输入是否进入文件路径

问题：

```text
文件名是否用于 readFile？
路径是否可能包含 ../？
normalize 后是否仍能逃逸根目录？
```

目标漏洞：

```text
Path traversal
任意文件读取
任意文件覆盖
```

工具：

```text
CodeQL
Semgrep
```

## 18. 用户输入是否控制网络请求目标

问题：

```text
用户提供的 URL 是否进入 fetch？
能否请求内网地址？
能否访问云元数据接口？
```

目标漏洞：

```text
SSRF
```

工具：

```text
CodeQL
Semgrep
运行时网络策略
```

## 19. 敏感数据是否流向不应到达的位置

问题：

```text
密码是否流入日志？
身份证号是否发送给第三方？
访问令牌是否进入错误追踪系统？
数据库字段是否被返回给客户端？
```

这不是传统“输入到危险函数”，而是：

```text
敏感源 → 泄漏目标
```

工具：

```text
CodeQL
Semgrep taint
专门的数据流规则
```

## 20. Sanitizer 是否真的在路径上

问题：

```text
数据是否经过正确验证？
验证是在危险调用之前还是之后？
是否只验证了一条分支？
sanitize 函数是否真的清除了危险内容？
```

例如：

```ts
const input = req.query.path;

if (debug) {
  readFile(input);
}

const safe = sanitizePath(input);
readFile(safe);
```

不能因为项目里出现了 `sanitizePath`，就认为所有路径安全。

工具：

```text
CodeQL
Semgrep taint
```

---

# 五、模块依赖和架构是否健康

这是 dependency-cruiser 主要回答的问题。它会遍历 JS/TS 项目的依赖，并根据自定义规则验证和可视化依赖关系。([GitHub][4])

## 21. 是否存在循环依赖

问题：

```text
A 是否依赖 B，B 又依赖 A？
多个 package 是否形成更大的依赖环？
```

例如：

```text
agent → session → tool → agent
```

工具：

```text
dependency-cruiser
Madge
Nx
```

## 22. 依赖方向是否正确

问题：

```text
domain 是否依赖 UI？
基础层是否反向依赖业务层？
common 是否依赖具体业务模块？
```

合理方向：

```text
UI → Application → Domain
                ↓
          Infrastructure
```

错误方向：

```text
Domain → React
Domain → Next.js
Common → Agent
```

工具：

```text
dependency-cruiser
Nx enforce-module-boundaries
ESLint boundaries
```

## 23. 是否跨越模块公共边界

问题：

```text
其他模块是否直接 import internal 文件？
是否绕过 package 的 index.ts？
是否依赖了未承诺稳定的内部实现？
```

例如不应：

```ts
import { InternalRunner } from '@wode/agent/src/internal/runner';
```

而应：

```ts
import { AgentRunner } from '@wode/agent';
```

工具：

```text
dependency-cruiser
ESLint no-restricted-imports
package.json exports
```

## 24. 模块是否耦合过高

问题：

```text
这个模块依赖了多少其他模块？
多少模块反向依赖它？
修改它会影响多大范围？
common 是否成为垃圾桶？
```

常见指标：

```text
Fan-in：有多少模块依赖我
Fan-out：我依赖多少模块
Coupling：模块耦合程度
```

工具：

```text
dependency-cruiser
Nx graph
自定义依赖图分析
```

## 25. 是否存在不稳定依赖

问题：

```text
核心模块是否依赖频繁变化的模块？
低层稳定 package 是否依赖上层业务代码？
公共库是否依赖具体应用？
```

这是架构级质量问题，不一定会导致当前构建失败，却会持续提高维护成本。

---

# 六、代码是否存在大量重复

## 26. 是否有复制粘贴代码

问题：

```text
多个 handler 是否复制同样的认证逻辑？
多个页面是否复制同样的表格结构？
多个 service 是否复制同一段校验流程？
```

工具：

```text
jscpd
Sonar duplication
PMD CPD
```

## 27. 重复是否值得抽象

这不是纯自动化问题。

需要进一步问：

```text
重复是否代表同一个业务概念？
未来是否会同时变化？
抽象后是否比重复更难理解？
```

错误目标是：

```text
重复率必须等于 0
```

更合理目标是：

```text
避免大块、持续同步变化的复制代码
```

---

# 七、代码是否过于复杂

## 28. 函数是否太复杂

问题：

```text
分支是否太多？
循环和条件是否嵌套过深？
理解函数需要同时记住多少状态？
```

常见指标：

```text
Cyclomatic complexity
Cognitive complexity
最大嵌套深度
函数长度
```

工具：

```text
ESLint complexity
Sonar
Biome/Oxlint 部分规则
Code Climate 类工具
```

## 29. 模块职责是否过多

问题：

```text
一个 service 是否同时负责验证、数据库、缓存和通知？
一个 React 组件是否同时负责请求、状态、布局和业务流程？
```

这是静态指标能提示、但很难完全自动判断的问题。

可能指标：

```text
文件过大
导出过多
依赖过多
变更频率高
测试困难
```

## 30. 参数和状态是否过多

问题：

```text
函数是否有十几个参数？
boolean 参数是否让调用难懂？
状态组合是否出现非法情况？
```

例如：

```ts
runAgent(true, false, undefined, 'fast', 3);
```

工具只能部分发现，最终仍需要设计审查。

---

# 八、程序行为是否符合需求

静态检查只能证明“看起来可能正确”，不能证明业务行为正确。

## 31. 单个函数是否按预期工作

问题：

```text
给定输入，输出是否正确？
边界值是否正确？
异常是否按约定抛出？
```

工具：

```text
Vitest
Jest
Node test
```

## 32. 多个模块组合后是否正确

问题：

```text
service 和 database 集成是否正确？
RPC 序列化是否一致？
事务边界是否生效？
```

工具：

```text
Integration test
Testcontainers
真实数据库测试
```

## 33. 整个用户流程是否正确

问题：

```text
用户是否能完成登录？
创建订单后是否能支付？
权限不足时是否被正确拒绝？
```

工具：

```text
Playwright
Cypress
E2E test
```

## 34. 接口契约是否保持兼容

问题：

```text
API 字段是否被删除？
响应类型是否变化？
事件 schema 是否兼容旧消费者？
数据库迁移是否向前兼容？
```

工具：

```text
OpenAPI diff
GraphQL schema check
Pact
Buf breaking
自定义 schema compatibility
```

---

# 九、测试本身是否可靠

QA 不只是“有没有测试”，还要问测试好不好。

## 35. 哪些代码没有被测试

问题：

```text
哪些行没执行？
哪些分支没覆盖？
异常路径是否覆盖？
```

指标：

```text
Line coverage
Branch coverage
Function coverage
Statement coverage
```

工具：

```text
Vitest coverage
Istanbul
V8 coverage
```

## 36. 测试是否真的能发现错误

问题：

```text
把 > 改成 >=，测试会失败吗？
删除校验逻辑，测试会失败吗？
返回相反结果，测试会发现吗？
```

工具：

```text
StrykerJS
Mutation testing
```

## 37. 测试是否不稳定

问题：

```text
测试是否偶尔失败？
是否依赖时间、随机数、网络或执行顺序？
是否在并发运行时失败？
```

工具：

```text
重复执行测试
flaky test tracking
CI 历史分析
```

## 38. 测试是否过度依赖实现细节

问题：

```text
重构代码但行为不变时，测试是否大量失败？
是否 mock 了太多内部细节？
是否只验证调用次数而不验证结果？
```

这主要依赖测试审查，不容易由工具完全判断。

---

# 十、第三方依赖是否安全健康

这是 SCA，即 Software Composition Analysis。

## 39. 依赖是否存在已知漏洞

问题：

```text
npm 包是否有公开 CVE？
当前版本是否受影响？
修复版本是什么？
```

工具：

```text
OSV-Scanner
pnpm audit
npm audit
Dependabot
Renovate
Trivy
```

## 40. 漏洞依赖是否真的可达

问题：

```text
有漏洞的函数是否实际被你的代码调用？
漏洞代码路径是否能被外部输入触发？
```

这是：

```text
Dependency vulnerability
+
Reachability analysis
```

工具：

```text
Semgrep Supply Chain
部分商业 SCA
CodeQL 与自定义分析
```

## 41. 是否存在依赖投毒风险

问题：

```text
是否出现拼写相似的恶意包？
是否从不可信 registry 安装？
安装脚本是否执行危险命令？
锁文件是否被异常修改？
```

工具：

```text
Socket
依赖审计工具
registry 策略
lockfile review
```

## 42. 许可证是否允许使用

问题：

```text
GPL 依赖是否符合商业分发要求？
依赖许可证是否未知？
是否使用被禁止的许可证？
```

工具：

```text
license-checker
ORT
FOSSA
Syft
自定义 allowlist
```

## 43. 依赖是否陈旧或无人维护

问题：

```text
依赖多久未更新？
是否已归档？
是否有替代方案？
是否过度依赖单一维护者？
```

工具：

```text
Renovate
Dependabot
deps.dev
人工评估
```

---

# 十一、构建产物和供应链是否可信

## 44. 构建是否可重复

问题：

```text
相同源码是否产生相同产物？
构建是否依赖未锁定版本？
是否偷偷下载远程资源？
```

工具：

```text
lockfile
固定容器镜像
reproducible build
Nix/Guix
```

## 45. 构建产物里到底有什么

问题：

```text
镜像里是否含多余工具？
是否包含密钥或源码？
是否混入高危系统包？
```

工具：

```text
Syft
Trivy
Grype
Docker Scout
```

## 46. 产物是否来自可信构建

问题：

```text
镜像是否由正确 CI 构建？
源码、构建和产物能否关联？
产物是否被篡改？
```

工具和标准：

```text
SBOM
SLSA
Sigstore/Cosign
Provenance attestations
```

---

# 十二、运行时是否可靠

静态质量很好，不代表程序运行时不会出问题。

## 47. 是否会发生资源泄漏

问题：

```text
数据库连接是否释放？
文件句柄是否关闭？
timer 和 listener 是否不断累积？
内存是否持续增长？
```

工具：

```text
Profiler
Heap snapshot
运行时监控
负载测试
```

## 48. 是否能承受并发

问题：

```text
两个请求同时更新会怎样？
是否有竞态条件？
重复消费消息是否导致重复执行？
```

工具：

```text
并发测试
race-oriented test
数据库约束
幂等性测试
```

## 49. 是否满足性能目标

问题：

```text
P95/P99 延迟是多少？
吞吐量是多少？
内存和 CPU 是否可接受？
慢查询在哪里？
```

工具：

```text
k6
autocannon
wrk
OpenTelemetry
Profiler
```

## 50. 下游故障时是否能恢复

问题：

```text
数据库超时会怎样？
NATS 断开会怎样？
第三方 API 返回 500 会怎样？
重试会不会造成请求风暴？
```

工具：

```text
Integration test
Fault injection
Chaos testing
Timeout/retry tests
```

---

# 十三、配置和部署是否安全

## 51. 配置是否完整且一致

问题：

```text
生产环境是否缺少必须变量？
变量格式是否正确？
多个服务的配置是否冲突？
```

工具：

```text
Zod/Valibot 配置校验
启动时验证
配置 schema
```

## 52. 基础设施配置是否危险

问题：

```text
S3 是否公开？
容器是否 root 运行？
Kubernetes 是否给了过高权限？
安全组是否开放全部端口？
```

工具：

```text
Checkov
Trivy config
tfsec
KICS
Semgrep
```

## 53. 权限是否最小化

问题：

```text
服务是否拥有不需要的数据库权限？
CI token 是否能写所有仓库？
Agent 是否能访问整个文件系统？
```

工具：

```text
IAM policy scanner
权限测试
人工 threat modeling
```

---

# 十四、变更本身是否安全

这层关注的不是整个仓库，而是“本次修改”。

## 54. 这次改动新增了什么问题

问题：

```text
新增了哪些 lint 错误？
新增了哪些漏洞？
新增代码覆盖率是多少？
新增了多少重复代码？
```

这是 Sonar 的 “new code” 思路，也是现代 CI 门禁更应该关注的对象。

## 55. 这次改动影响了哪些模块

问题：

```text
哪些调用者受影响？
哪些 package 需要重新测试？
公共 API 是否改变？
```

工具：

```text
依赖图
Nx affected
Turborepo
Bazel
自定义 impact analysis
```

## 56. 变更风险是否与测试匹配

问题：

```text
修改认证逻辑却没有安全测试吗？
修改数据库事务却只跑了单元测试吗？
修改公共类型是否测试了所有消费者？
```

这一层常需要规则、变更分类和 AI review 共同判断。

---

# 十五、代码是否容易理解和维护

这是最难自动化、但最重要的一层。

## 57. 命名是否表达真实意图

问题：

```text
名称是否说明业务含义？
是否充斥 data、manager、helper、utils？
布尔变量是否容易理解？
```

工具只能做基础命名规则，真正质量依赖 review。

## 58. 抽象是否合理

问题：

```text
是否过早抽象？
是否把不同业务概念强行合并？
是否为了 DRY 产生难以理解的通用框架？
```

## 59. 边界是否清楚

问题：

```text
谁负责验证？
谁负责事务？
谁负责权限？
谁拥有某份状态？
```

## 60. 代码和文档是否一致

问题：

```text
README 中的示例还能运行吗？
API 文档是否与实现一致？
架构决策是否已经过时？
```

工具：

```text
文档测试
OpenAPI 自动生成
示例编译
链接检查
```

---

# 用“问题类型”理解工具

可以把常见工具重新放进这张地图：

| 核心问题                     | 工具                          |
| ---------------------------- | ----------------------------- |
| 代码能否解析、类型是否正确   | TypeScript                    |
| 单文件是否有错误写法         | Oxlint、Biome、ESLint         |
| 文件、导出、依赖是否没人使用 | Knip                          |
| 模块是否违反架构边界         | dependency-cruiser、Nx        |
| 是否存在复制粘贴             | jscpd                         |
| 是否出现禁止模式             | Semgrep                       |
| 不可信数据是否进入危险位置   | CodeQL、Semgrep taint         |
| 行为是否正确                 | Vitest、Playwright            |
| 测试是否真正有效             | StrykerJS                     |
| 第三方依赖是否有漏洞         | OSV-Scanner、Trivy            |
| 是否泄露密钥                 | Gitleaks、TruffleHog          |
| IaC 是否配置危险             | Checkov、Trivy config         |
| 运行时是否稳定               | k6、OpenTelemetry、Profiler   |
| 质量结果如何集中治理         | SonarQube、GitLab/GitHub 报告 |

---

# 一个更完整的 QA 思维模型

我建议把代码 QA 理解成六个连续问题：

```text
1. 能不能构建？
2. 写法有没有明显错误？
3. 项目结构是否健康？
4. 行为是否符合需求？
5. 是否安全可靠？
6. 修改后是否仍然保持以上性质？
```

进一步可以整理成：

```text
静态质量
├── 语法
├── 类型
├── 死代码
├── 模式
├── 复杂度
├── 重复
└── 架构

动态质量
├── 单元行为
├── 集成行为
├── 用户流程
├── 并发
├── 性能
└── 故障恢复

安全质量
├── 危险模式
├── 数据流
├── 依赖漏洞
├── 密钥
├── 权限
└── 供应链

变更质量
├── 新增问题
├── 影响范围
├── 兼容性
└── 回归风险
```

严格来说，这个领域不只是传统 **QA**。更准确的名称通常是：

```text
Software Quality Engineering
├── Static Analysis
├── Testing
├── Application Security
├── Architecture Governance
├── Supply Chain Security
├── Reliability Engineering
└── Quality Governance
```

最重要的认知是：

> **没有一个工具能回答“代码质量好不好”。每个工具只是在回答某一类具体问题。**

对 TypeScript monorepo，一个较完整而仍然务实的组合可以是：

```text
语言正确性
├── tsc
└── Oxlint

代码清洁度
├── Knip
└── jscpd

架构
└── dependency-cruiser

行为
├── Vitest
└── Playwright

安全
├── Semgrep
├── CodeQL
├── OSV-Scanner
└── Gitleaks

运行时
├── k6
└── OpenTelemetry
```

其中最适合作为总纲的不是“我们要安装哪些工具”，而是：

```text
我们希望持续回答哪些质量问题？
哪些问题必须阻止合并？
哪些问题只做报告？
哪些问题每天检查？
哪些问题只在 nightly 检查？
```
