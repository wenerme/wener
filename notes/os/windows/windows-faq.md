---
id: windows-faq
title: Windows FAQ
---

# Windows FAQ

## tuntap

- openvpn 提供 tuntap 设备
  - https://build.openvpn.net/downloads/releases/
  - Windows 10 x64 可能需要 [修改注册表](https://github.com/slackhq/nebula/issues/9#issuecomment-761974328)
- 可以使用 [WireGuard/wintun](https://github.com/WireGuard/wintun)
  - GPL, wintun.h 可以是 MIT
- 参考
  - [#289](https://github.com/slackhq/nebula/pull/289) nebula 支持 wintun

## AD vs LDAP

- LDAP
  - 是一个标准协议
  - 基于目录的方式访问存储的数据
  - 本质后端是一个数据库
  - LDAP 是与数据库的通信协议
- AD
  - 是一个私有软件应用
  - 是一个数据库，提高了认证，目录，策略等
  - 支持 LDAP 的方式进行交互

## DC vs. AD - Domain Controllers vs. Active Directory

- DC 提供 AD 服务

## Extending Shortcut Menus

https://docs.microsoft.com/en-us/windows/win32/shell/context
