---
title: GunDB
---

# GunDB

- [amark/gun](https://github.com/amark/gun)
  - http://gun.js.org/
  - 实时
  - 分布式 - 点对点
  - 离线优先
  - 图
  - CRDT
- 相关技术
  - [AXE](https://gun.eco/docs/AXE) - Advanced eXchange Equation
    - P2P 网络层
  - [DAM](https://gun.eco/docs/DAM) - Daisy-chain Ad-hoc Mesh-network
    - 网络消息中继
  - [SEA](https://gun.eco/docs/SEA) - Security, Encryption, & Authorization
    - 类似于 stun 的 session - 一个终端
    - 安全加密授权
- https://github.com/amark/gun/wiki/porting-gun

:::caution

- gundb 类似于 webrtc 的 p2p，互联也需要 `signaling` - 也需要启动一个服务
  - 例如 https://guntest.herokuapp.com/gun
- Web 端默认数据存储于 localStorage
- Node 端默认数据存储于 fs
- user
  - 用户名并不唯一
  - 密码不可重置
  - 密码并不安全
- 所有节点都会存储数据 - browsers, nodejs, phones

:::

```bash
# 本地 gun signaling server
npm install gun && cd node_modules/gun && npm start
```
