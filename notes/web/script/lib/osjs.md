---
title: OS.js
---

# OS.js

- [os-js/OS.js](https://github.com/os-js/OS.js)
  - BSD-2, JS
- 参考
  - https://demo.os-js.org/
- @osjs/event-emitter
- @osjs/common
  - class CoreBase
    - deepmerge, omit-deep 合并选项
  - interface ServiceProvider

## Notes

- 区分 Client 和 Server
  - @osjs/client
  - @osjs/server
- 动态加载的内容有 Client 和 Server 部分
- [os-js/OS.js](https://github.com/os-js/OS.js)
  - client [Bootstrap](https://github.com/os-js/OS.js/blob/0aa874455e1ca5a31e7be193b3be14080300c2c1/src/client/index.js#L57-L72)
    - CoreServiceProvider
    - DesktopServiceProvider
    - VFSServiceProvider
    - NotificationServiceProvider
    - SettingsServiceProvider
    - AuthServiceProvider
    - PanelServiceProvider
    - DialogServiceProvider
    - GUIServiceProvider
  - 配置 https://github.com/os-js/osjs-client/blob/master/src/config.js
- [@osjs/event-emitter](https://github.com/os-js/osjs-event-emitter)
  - 非常简单的 EventEmitter
- [@osjs/common](https://github.com/os-js/osjs-common)
  - CoreBase
    - 作为 OS 的核心 容器/IoC 容器/运行上下文
  - providerHandler - 创建容器
    - IoC 依赖容器
    - 基于 [async-dependency-graph](https://github.com/chriswoodle/async-dependency-graph)
      - async-dependency-graph - 5.3kB 1.5kB
      - 对比 inversify - 50kB, 11kB
- @osjs/client
  - Core extends CoreBase
    - window.OSjs = this.createGlobalApi()
      - 暴露到全局的 API
  - Application - 应用管理
  - Window - 窗口管理器
  - Session - 会话
  - Packages - 动态加载包
  - Tray
  - Websocket - ws 通讯
  - Clickboard
  - Middleware
  - locale
    - https://github.com/os-js/osjs-client/blob/master/src/locale/zh_CN.js
  - CoreServiceProvider
    - osjs/application
    - osjs/basic-application
    - osjs/window
    - osjs/windows
    - osjs/event-handler
    - osjs/window-behaviour
    - osjs/dnd
    - osjs/dom
    - osjs/clipboard
    - osjs/middleware
    - osjs/tray
    - osjs/locale
    - osjs/packages
    - osjs/websocket
    - osjs/session
    - osjs/theme
    - osjs/sounds
- 应用 注册逻辑
  - 类型: theme, icons, sounds, application
  - 先 preload，然后应用内通过 `osjs.register(name,callback)` 注册回调到 Packages
  - Packages preload 完成后触发 注册的 回调
  - callback 入参为 `core, args, options, metadata`
- 应用
  - 创建 osjs/application 作为主要 进程
    - 通过 proc 创建 window - 获取到可渲染的 $content
    - 创建 osjs/basic-application 作为 event-bus
      - 提供标准操作 - dialog, vfs 操作
      - 渲染到 $content
      - vfs 操作触发事件到 event
        - new-file
        - save-file - 实际保存操作
        - open-file - 实际读取文件

## CoreBase

```ts
export interface ServiceProviderOptions {
  before?: boolean;
  args?: object;
}

export class ServiceProvider {
  readonly core: CoreBase;
  readonly options: any;
  constructor(core: CoreBase, options: any);
  // 所有服务
  provides(): string[];
  // 初始化
  init(): Promise<any>;
  // 启动
  start(): Promise<any>;
  // 销毁
  destroy(): void;
}

export class CoreBase extends EventEmitter {
  // 默认 console
  readonly logger: any;
  readonly configuration: object;
  readonly options: object;
  booted: boolean;
  started: boolean;
  destroyd: boolean;
  // Service Provider Handler
  providers: any;

  constructor(defaultConfiguration: object, configuration: object, options: object);

  // 销毁
  destroy(): void;
  // 启动
  boot(): Promise<boolean>;

  // 启动所有核心服务
  // before?
  // this.providers.init(false)
  start(): Promise<boolean>;
  // 获取配置
  config(key: string, defaultValue: any): any;

  // 注册 service provider
  // providers.push(new ref(core, options.args))
  register(ref: typeof ServiceProvider, options: ServiceProviderOptions): void;

  // 注册 instanciator provider
  instance(name: string, callback: Function): void;
  // 注册 单例 provider
  singleton(name: string, callback: Function): void;
  // 实例化服务
  //
  make<T>(name: string, ...args: any[]): T;

  // 服务是否存在
  has(name: string): boolean;
}

```
