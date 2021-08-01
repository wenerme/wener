---
title: PowerDNS Version
---

# PowerDNS Version

- [Changelogs](https://doc.powerdns.com/authoritative/changelog/index.html)

## 4.5

- rrtype CSYNC, NID, L32, L64, LP
- LUA filterForward 函数

## 4.4

- LMDB 支持长记录 - production ready
- 支持 SVCB HTTPS 记录
- 验证 slave zone
- 移除 GSS/TSIG 支持
- auth server 增加 /api/docs 接口

## 4.3

- 增加 default-publish-{cds|cdnskey} 配置
- 管理未发布的 DNSSEC Key
- pdnsutil 支持在 edit-zone 时增加 serial
- zone 增加 edited_serial
- 移除后端 goracle, lua, mydns, opendbx, oracle

## 4.2

- LUA 记录支持
- LMDB 后端支持
- [changelog](https://doc.powerdns.com/authoritative/changelog/4.2.html) / [发布申明](https://blog.powerdns.com/2019/08/30/powerdns-authoritative-server-4-2-0/)

## 4.1

- api 添加 metadata 接口
- 移除了 as 中的 recursor
  1. 通过 recursor 转发到 as
  2. 通过 dnsdist 负载均衡基于规则进行分发
- [Migrating from using recursion on the Authoritative Server to using a Recursor](https://doc.powerdns.com/authoritative/guides/recursion.html)
- [changelog](https://doc.powerdns.com/authoritative/changelog/4.1.html)
