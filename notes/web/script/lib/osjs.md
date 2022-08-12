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

```ts
interface CoreBase extends EventEmitter {
  constructor(defaultConfiguration: Object, configuration: Object, options: Object);
  boot();
  config(key: String, defaultValue: any): any;
  destroy();
  // check service exists
  has(name: String): Boolean;

  // Register a instanciator provider
  instance(name: String, callback: Function);
  // Create an instance of a provided service
  make(name: String, ...args: any): any;

  // Register a service provider
  register(ref: Class, options: Object);
  // Register a singleton provider
  singleton(name: String, callback: Function);
  // start core services
  start(): any;
}

interface ServiceProvider {
  core: Core;
  constructor(core: Core);
  depends(): string[];
  destroy();
  init();
  provides(): string[];
  start();
}
```
