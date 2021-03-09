---
title: nebula
---

# nebula
* 是什么？
  * P2P overlay 网络 - 类似 Tinc
  * Layer 3 - IP 层 - 不支持 MAC - 预先配置网络
  * 注重性能和简洁
  * 支持 iOS 和 Android - [DefinedNet/mobile_nebula](https://github.com/DefinedNet/mobile_nebula)
    * Flutter+Go binding
  * 支持 Windows, MacOS, FreeBSD
  * 默认 elliptic curve Diffie-Hellman key exchange, AES-256-GCM
  * Open Source Since 2019 Nov - slackhq 内部开发 3 年
  * 基于 [Noise Protocol Framework.](https://noiseprotocol.org/)
    * 双向认证, p2p, SDN
* [slackhq/nebula](https://github.com/slackhq/nebula)
  * MIT
* lighthouse 辅助 nat punch
* 参考
  * [Creating a Fast, Secure, Location Agnostic Mesh Network with Nebula - Ryan Huber](https://youtu.be/qy2cgqglt3o)

:::caution

* 目前直连为主，没有类似 tinc 的通过节点路由的逻辑 - [#218](https://github.com/slackhq/nebula/issues/218)
  * 通过 lighthouse 支持路由一个网络
* 不支持 unsafe_routes 之外自定义路由 - [#274](https://github.com/slackhq/nebula/issues/274)
  * 只能使用预先定义的网络 - 不能 `ip ro add`
  * 不支持 flannel+nebula

:::

```bash
# macOS
brew install nebula
```
