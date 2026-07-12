---
title: Design Extension
---

# Design Extension

- Extension / Plugin / Add-on - 扩展、插件、附加组件。
- 目标：在不修改核心产品代码的情况下，让第三方或业务侧扩展能力、集成系统、自动化流程、定制 UI。
- 常见形态：插件、hook、middleware、event、callback、脚本、WASM、module、driver、provider、connector。
- 设计扩展能力的关键不是“让用户执行代码”，而是定义清晰的边界、生命周期、权限、数据模型和兼容策略。

## 扩展能力分类

| 类型 | 说明 | 典型例子 | 适合 |
| --- | --- | --- | --- |
| Plugin / Add-on | 安装到宿主应用内，调用宿主 API | Browser extension、Figma Plugin、VS Code Extension | 产品生态、UI/工作流定制 |
| Hook / Callback | 宿主在关键点调用扩展逻辑 | Git hooks、Quick Look callbacks、Webhook handler | 生命周期插入点、轻量定制 |
| Middleware | 请求/事件经过一组可组合处理器 | HTTP middleware、RPC interceptor、Nginx phases | 认证、日志、限流、转换 |
| Event / PubSub | 宿主发布事件，扩展订阅处理 | Webhook、EventBridge、IDE events | 解耦通知、多消费者 |
| Script | 用户脚本在受控运行时执行 | Figma JS plugin、Lua plugin、SQL UDF | 快速自动化、低门槛扩展 |
| Module / Native Plugin | 编译成宿主可加载模块 | Nginx module、Kernel module | 高性能、底层能力 |
| WASM Extension | 通过 WASM 沙箱执行扩展 | Envoy WASM filter、Proxy-Wasm | 高隔离、跨语言、高性能 |
| Provider / Driver | 实现宿主定义的接口 | Storage driver、Auth provider、Payment provider | 替换后端能力、对接外部系统 |
| Connector / Integration | 连接第三方系统 | SaaS connector、ETL connector | 数据同步、系统集成 |
| Theme / Resource Pack | 扩展样式、资源、模板 | Editor theme、Game mod | UI 外观、内容包 |

## 典型系统对照

| 系统 | 扩展形态 | 入口 | 隔离/权限 | 特点 |
| --- | --- | --- | --- | --- |
| Browser WebExtensions | Manifest + background/content script/API | `manifest.json`、content script、service worker | permissions、host permissions、extension process | 跨浏览器生态，强权限声明 |
| Chrome Extensions | Manifest V3 + extension APIs | service worker、content scripts、action、devtools | 权限、CSP、Chrome Web Store 审核 | 强调安全、声明式 API、后台生命周期受限 |
| Figma Plugin | JavaScript + HTML UI + Plugin API | 用户主动运行 plugin command | 文件 API 权限、iframe UI、用户触发 | 短生命周期，不支持后台常驻 |
| macOS Quick Look | Generator plugin + UTI + callbacks | `GeneratePreviewForURL`、`GenerateThumbnailForURL` | 系统加载、bundle 配置 | 专注文件预览/缩略图，callback 模型清晰 |
| Nginx Module | C module + phase/filter/config directives | HTTP phase、filter、directive | 进程内 native code，无强沙箱 | 性能高，但必须遵守非阻塞、内存池、reload 约束 |
| VS Code Extension | Node.js extension host + contribution points | `package.json` contributes、activation events | extension host、workspace trust、capabilities | contribution point 很完整，适合 IDE 生态 |
| Envoy WASM | Proxy-Wasm ABI | HTTP/network filter | WASM sandbox、ABI 限制 | 适合高性能网关扩展 |
| WordPress Plugin | PHP plugin hooks/options/admin UI | actions、filters、shortcode | 进程内 PHP，依赖审核/权限 | 生态大，但安全和兼容治理压力大 |

## 扩展点模型

### Declarative Extension Point

扩展通过配置声明能力，宿主解释执行。

例子：

- Browser extension manifest permissions / content scripts。
- VS Code `contributes.commands` / `contributes.languages`。
- Kubernetes CRD / Controller registration。

优点：

- 容易校验、审核、静态分析。
- 权限边界清晰。
- 兼容性更容易维护。

缺点：

- 表达能力有限。
- 高级逻辑仍需要脚本或 native API。

### Imperative Extension Point

扩展提供代码，宿主在运行时调用。

例子：

- Hook callback。
- Middleware function。
- Plugin API method。
- Native module handler。

优点：

- 灵活、表达力强。
- 适合复杂业务和集成。

缺点：

- 安全、性能、兼容性更难控制。
- 容易把宿主内部细节泄漏给扩展。

### Hybrid Model

多数成熟系统会混合使用：

- manifest 声明权限、入口、UI、资源。
- runtime API 执行业务逻辑。
- event/hook 触发扩展。
- store/review 管理发布和安全。

## 生命周期

| 阶段 | 关注点 |
| --- | --- |
| Discover | 扩展如何被发现：目录、市场、配置扫描、module path |
| Install | 安装包格式、签名、依赖、版本约束 |
| Enable | 启用范围：全局、workspace、tenant、project、user |
| Activate | 触发条件：启动时、事件、命令、文件类型、请求阶段 |
| Execute | 运行时、资源限制、超时、并发、错误隔离 |
| Update | 版本升级、兼容检查、迁移、回滚 |
| Disable | 禁用后状态清理、hook 解绑、后台任务停止 |
| Uninstall | 删除资源、保留用户数据、撤销授权 |

:::tip

不要默认让所有扩展在启动时激活。成熟扩展系统通常使用 activation event / lazy loading，避免启动慢、资源浪费和故障放大。

:::

## 扩展入口设计

| 入口 | 说明 | 适合 |
| --- | --- | --- |
| Command | 用户主动触发命令 | IDE、设计工具、后台任务 |
| Menu / Toolbar | 挂载到 UI 操作点 | Browser、Figma、桌面应用 |
| File Type / UTI | 针对文件类型自动触发 | Quick Look、编辑器语言插件 |
| Request Phase | 请求生命周期中的阶段 | Nginx、API Gateway、RPC |
| Event Subscription | 订阅宿主事件 | Webhook、automation、workflow |
| Scheduled Job | 定时运行 | 同步、清理、报告 |
| Resource Provider | 注册某类资源 provider | Storage、Auth、Payment、LLM provider |
| UI Contribution | 注入 panel、view、sidebar、inspector | IDE、Admin console、Design tool |

## API 契约设计

### API 应该稳定在语义层

扩展 API 不应直接暴露内部表、内部对象指针、未稳定的数据结构。推荐暴露：

- 领域对象：`Document`、`Node`、`Message`、`Request`、`User`。
- 能力接口：`readFile`、`createNode`、`registerCommand`、`sendMessage`。
- 事件：`DocumentChanged`、`RequestReceived`、`CommandExecuted`。
- 上下文：`workspace`、`tenant`、`selection`、`requestContext`。

### 常见 API 类型

| API 类型 | 说明 | 注意 |
| --- | --- | --- |
| Query API | 读取宿主状态 | 控制访问范围和分页 |
| Mutation API | 修改宿主状态 | 需要权限、事务、审计 |
| Registration API | 注册命令、菜单、provider、handler | 要支持注销和冲突处理 |
| Event API | 订阅事件 | 要有过滤、背压、错误隔离 |
| Storage API | 扩展私有存储 | 区分 user/workspace/global scope |
| Secret API | 管理 token / credential | 不要把 secret 直接暴露给 UI 或日志 |
| Network API | 访问外部网络 | 需要域名权限、代理、审计 |
| UI API | 打开 modal/panel/toast | 防止钓鱼和权限误导 |

### 同步 vs 异步

| 方式 | 优点 | 风险 |
| --- | --- | --- |
| Synchronous Hook | 简单、结果直接影响宿主流程 | 阻塞主流程，扩展慢会拖垮宿主 |
| Async Event | 解耦、可重试、可隔离 | 最终一致，错误处理复杂 |
| Async Command | 可等待结果但隔离更好 | 需要 timeout、cancel、progress |
| Background Task | 适合长任务 | 需要调度、配额、状态恢复 |

设计建议：

- UI 交互可用短同步调用，但必须有 timeout。
- 请求链路上的扩展尽量非阻塞或明确预算。
- 长任务使用 async job + progress + cancel。
- 事件订阅默认不要阻塞生产者。

## 隔离模型

| 隔离方式 | 安全性 | 性能 | 例子 | 说明 |
| --- | --- | --- | --- | --- |
| In-process native | 低 | 最高 | Nginx C module | 性能强，但崩溃/内存破坏会影响宿主 |
| In-process script | 中低 | 高 | Lua plugin、PHP plugin | 易扩展，但需要限制 API 和资源 |
| Separate process | 高 | 中 | VS Code extension host | 崩溃可隔离，IPC 有成本 |
| iframe / Web Worker | 中高 | 中 | Figma plugin UI、browser extension page | 适合 Web 技术和 UI 隔离 |
| WASM sandbox | 高 | 高 | Envoy WASM | ABI 清晰、跨语言，但能力受限 |
| Remote extension | 高 | 低到中 | Webhook、SaaS integration | 最强隔离，但网络、延迟、可靠性复杂 |

## 权限模型

扩展权限建议采用 least privilege：默认无权限，按能力声明和用户授权。

| 权限维度 | 例子 |
| --- | --- |
| Resource | 文件、页面、项目、租户、请求、消息 |
| Operation | read、write、delete、admin、execute |
| Scope | user、workspace、project、tenant、global |
| Network | 允许访问的 host / domain |
| Secret | 可访问哪些 credential、是否只可间接使用 |
| UI | 是否可弹窗、注入面板、显示通知 |
| Background | 是否可后台运行、定时运行 |
| Data Export | 是否可导出数据到外部服务 |

权限设计要点：

- 安装时展示权限，运行时敏感操作二次确认。
- 权限变更需要重新授权。
- 区分开发模式、本地安装、市场发布版本。
- 对企业环境支持 allowlist / blocklist / policy。
- 对扩展访问和数据导出做审计日志。

## 配置与 Manifest

Manifest 用于描述扩展元数据、入口、权限和贡献点。

```json
{
  "id": "example.extension",
  "name": "Example Extension",
  "version": "1.2.0",
  "engines": {
    "host": ">=1.0 <2.0"
  },
  "permissions": ["document:read", "document:write"],
  "activationEvents": ["onCommand:example.run"],
  "contributes": {
    "commands": [
      { "id": "example.run", "title": "Run Example" }
    ]
  }
}
```

建议字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 全局唯一扩展 ID |
| `name` / `description` | 展示信息 |
| `version` | 扩展版本，建议 SemVer |
| `engines` | 宿主版本约束 |
| `permissions` | 权限声明 |
| `activationEvents` | 激活条件 |
| `contributes` | 命令、菜单、UI、provider 等贡献点 |
| `main` / `module` | 执行入口 |
| `capabilities` | 扩展能力声明 |
| `configuration` | 可配置项 schema |
| `dependencies` | 依赖和兼容要求 |

## Hook / Middleware 设计

### Hook 类型

| 类型 | 说明 | 例子 |
| --- | --- | --- |
| Before Hook | 主流程执行前，可校验或修改输入 | `beforeSave`、`beforeRequest` |
| After Hook | 主流程成功后执行 | `afterCreate`、`afterPublish` |
| Around Hook | 包裹主流程，可决定是否继续 | middleware、interceptor |
| Error Hook | 主流程失败后执行 | `onError`、compensation |
| Filter Hook | 输入输出转换 | WordPress filter、response filter |
| Observer Hook | 只观察，不影响主流程 | audit、metrics、analytics |

### Middleware 顺序

Middleware 要明确顺序模型：

- 注册顺序。
- 优先级 `priority`。
- phase 分组。
- 显式 dependency：`before` / `after`。

常见问题：

- 多个 middleware 修改同一字段导致冲突。
- 某个 middleware 未调用 `next()` 阻断链路。
- 错误处理 middleware 顺序不清。
- 同步 middleware 中执行阻塞 IO。

## Event 扩展设计

事件适合低耦合扩展，但要注意可靠性和语义。

| 设计点 | 建议 |
| --- | --- |
| Event name | 使用过去式事实，例如 `DocumentSaved` |
| Event ID | 每个事件有唯一 ID，用于幂等 |
| Version | 事件 schema 要有版本 |
| Filter | 订阅支持按类型、资源、scope 过滤 |
| Delivery | 明确 at-most-once / at-least-once |
| Retry | 重试要有退避和上限 |
| DLQ | 失败事件进入死信队列或错误面板 |
| Ordering | 只承诺必要范围内有序，例如 document 内有序 |

更多事件驱动设计见 [事件驱动](./design-event-driven.md)。

## Native Module 设计

Native module 适合高性能或底层能力，但风险最高。

设计要点：

- ABI/API 版本必须明确。
- 避免阻塞宿主事件循环或 worker。
- 明确内存分配和释放模型。
- 支持 graceful reload / hot restart 时的状态迁移。
- 崩溃隔离较弱，必须限制加载来源。
- 对第三方依赖、全局状态、线程安全要格外谨慎。

Nginx 模块是典型例子：模块运行在 worker 进程内，应避免阻塞库、避免随意使用全局变量，内存通常绑定到 request/config/cycle pool。

## UI 扩展设计

UI 扩展最容易影响用户信任和产品一致性。

| 扩展点 | 设计建议 |
| --- | --- |
| Menu / Command | 命名清晰，支持快捷键和禁用状态 |
| Sidebar / Panel | 限制尺寸、生命周期、资源占用 |
| Modal | 用户主动触发，避免无限弹窗 |
| Inspector / Property Panel | 与当前 selection/context 绑定 |
| Toast / Notification | 限频，避免滥用 |
| Custom View | 明确数据访问边界 |

安全建议：

- 扩展 UI 与宿主 UI 有明确边界，避免伪造系统授权界面。
- 外部内容默认不可信，使用 CSP、sandbox、资源白名单。
- 敏感操作使用宿主提供的确认 UI，而不是扩展自绘确认框。

## 数据与状态

扩展通常需要自己的状态存储。

| 存储范围 | 用途 | 注意 |
| --- | --- | --- |
| Extension Global | 扩展全局配置 | 多用户/多租户隔离 |
| User | 用户偏好 | 跟随账号还是本机要明确 |
| Workspace / Project | 项目级配置 | 适合团队共享 |
| Document / Resource Metadata | 绑定到资源的元数据 | 需要迁移和删除策略 |
| Secret Store | token、API key | 必须加密和审计 |
| Cache | 临时数据 | 可清理、不可作为事实源 |

## 版本与兼容

扩展生态最难的是长期兼容。

| 对象 | 策略 |
| --- | --- |
| Host API | SemVer、deprecation period、feature detection |
| Extension | 声明兼容的 host version |
| Manifest | manifest version 独立演进 |
| Event Schema | 只增不改，消费者忽略未知字段 |
| Permission | 新权限需要重新授权 |
| Data Schema | 扩展提供 migration |

实践建议：

- 不要轻易删除 API；先标记 deprecated。
- 提供 capability detection：`host.hasCapability("foo")`。
- 提供 polyfill / compatibility layer。
- 插件市场展示兼容范围和最近更新时间。
- 宿主升级前可做 extension compatibility scan。

## 可观测性

扩展系统必须能回答：哪个扩展做了什么、花了多久、失败在哪里。

| 指标/日志 | 说明 |
| --- | --- |
| activation count | 激活次数 |
| execution duration | 执行耗时 |
| error count | 扩展错误数 |
| timeout count | 超时次数 |
| API call count | 调用宿主 API 次数 |
| permission denied count | 权限拒绝次数 |
| resource usage | CPU、内存、网络、存储 |
| install/update/uninstall audit | 安装、升级、卸载审计 |

建议：

- 错误归因到 extension id / version / command。
- 给扩展开发者提供日志，但过滤用户敏感数据。
- 宿主应能禁用高错误率或高资源消耗扩展。
- 长任务提供 progress、cancel 和 crash recovery。

## 安全风险

| 风险 | 说明 | 缓解 |
| --- | --- | --- |
| 权限过大 | 扩展读取/修改不该访问的数据 | 最小权限、scope、审核 |
| 数据外传 | 扩展把数据发到外部服务 | network permission、DLP、审计 |
| Supply Chain | 扩展更新后变恶意 | 签名、审核、版本锁定、企业 allowlist |
| Sandbox Escape | 沙箱逃逸影响宿主 | 进程隔离、WASM、CSP、依赖升级 |
| DoS | 扩展耗尽 CPU/内存/请求预算 | quota、timeout、rate limit |
| UI Spoofing | 扩展伪造登录/授权界面 | 宿主统一授权 UI、UI 边界 |
| Dependency Risk | 插件依赖被投毒 | lockfile、扫描、bundling policy |
| Native Crash | native 插件崩溃宿主 | 限制 native、隔离进程、审核 |

## 设计检查清单

- 扩展点是否是真实稳定的业务边界，而不是临时内部函数？
- 扩展是否可以被 lazy activate？
- 是否有明确权限、scope、审计？
- 扩展失败是否会拖垮宿主？
- 是否有 timeout、cancel、retry、DLQ 或错误面板？
- API 是否隐藏内部实现细节？
- 扩展数据如何迁移、备份、清理？
- 是否支持禁用、回滚、版本兼容检查？
- 是否有开发者工具：日志、调试、schema、类型定义、示例？
- 是否能在企业环境做 allowlist / blocklist / policy？

## 常见设计选择

### Plugin vs Webhook

| 维度 | Plugin | Webhook |
| --- | --- | --- |
| 运行位置 | 宿主内或宿主沙箱 | 第三方服务 |
| 隔离 | 中到低，取决于沙箱 | 高 |
| 延迟 | 低 | 网络延迟较高 |
| 能力 | 可深度集成 UI/API | 适合集成和通知 |
| 风险 | 影响宿主稳定性 | 网络可靠性和认证复杂 |

### Hook vs Event

| 维度 | Hook | Event |
| --- | --- | --- |
| 时机 | 主流程中 | 事实发生后 |
| 是否影响主流程 | 常常可以 | 通常不应影响 |
| 耦合 | 较高 | 较低 |
| 错误处理 | 直接影响调用方 | 异步重试/记录 |
| 适合 | 校验、拦截、转换 | 通知、同步、自动化 |

### Script vs WASM vs Native

| 维度 | Script | WASM | Native |
| --- | --- | --- | --- |
| 开发门槛 | 低 | 中 | 高 |
| 性能 | 中 | 高 | 最高 |
| 安全隔离 | 中 | 高 | 低 |
| 跨平台 | 高 | 高 | 低到中 |
| 适合 | 自动化、轻量逻辑 | 网关、策略、高性能沙箱 | 底层、高性能、系统集成 |

## FAQ

### 扩展点是不是越多越好？

不是。扩展点一旦公开，就会变成长期兼容负担。应该优先开放稳定、高价值、边界清晰的扩展点，而不是把内部生命周期全部暴露出去。

### 为什么很多插件系统都需要 manifest？

Manifest 让宿主能在执行代码前知道扩展的身份、入口、权限、兼容版本和贡献点，便于审核、安装、权限提示、lazy loading 和兼容检查。

### 什么时候应该用事件而不是 hook？

如果扩展只是响应一个已经发生的事实，不应该阻塞主流程，用事件更合适。如果扩展必须决定主流程是否继续、修改输入或输出，用 hook/middleware 更合适。

### 为什么 Figma 这类插件不支持后台常驻？

这是安全、性能和用户体验取舍。用户主动触发、短生命周期的插件更容易控制资源占用，也更容易让用户理解插件正在访问当前文件。

### Native plugin 最大的问题是什么？

不是开发复杂，而是隔离弱。native plugin 可以直接影响宿主进程稳定性、安全性和升级兼容，因此一般只适合强审核、高信任或内部场景。

## 相关

- [事件驱动](./design-event-driven.md)
- [Webhook](./design-webhook.md)
- [w3c/webextensions](https://github.com/w3c/webextensions)
- [Browser extensions - MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Quick Look Programming Guide](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/Quicklook_Programming_Guide/)
- [Nginx Development guide](https://nginx.org/en/docs/dev/development_guide.html)
