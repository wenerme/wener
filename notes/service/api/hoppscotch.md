---
title: hoppscotch
---

# hoppscotch

- [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch) 是什么？
  - MIT, Typescript+Vue
  - 类似 Postman，但是是开源产品
  - 早期叫 Postwoman
  - 支持 HTTP, REST, WebSocket, SSE, Socket.IO, MQTT, GraphQL
  - Web 应用
  - 可以导入 OpenAPI JSON/YAML
  - 可以导入 Postman, Insomina
- [hoppscotch.io](https://hoppscotch.io) - 线上版本
  - [Hoppscotch Browser Extension](https://chrome.google.com/webstore/detail/hoppscotch-browser-extens/amknoiejhlmhancpahfcfcfhllgkpbld)
    - Chrome 插件，支持 CORS
    - [hoppscotch/hoppscotch-extension](https://github.com/hoppscotch/hoppscotch-extension)
- Add-ons
  - Proxy
  - Cli
  - Browser Extensions - CORS
  - [hopp-doc-gen](https://github.com/hoppscotch/hopp-doc-gen) API doc generator CLI

:::caution

- Selfhost 不能持久化
  - 用了 firebase
  - [#1817](https://github.com/hoppscotch/hoppscotch/issues/1817)

:::


```bash
docker run --rm -p 3000:3000 --name hoppscotch hoppscotch/hoppscotch:latest
```
