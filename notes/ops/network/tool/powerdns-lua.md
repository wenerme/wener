---
id: powerdns-lua
title: PowerDNS LUA
---

# PowerDNS LUA
## Tips
* 自 4.2 开始支持
* [所有函数](https://doc.powerdns.com/authoritative/lua-records/functions.html)
* [LUA Reference](https://doc.powerdns.com/authoritative/lua-records/reference/index.html)
* __注意__
  0. 默认会添加 `return`，如果语句不是返回值，可以添加 `;` 前缀，然后自己写 `return`。

```sql
-- 针对域名启用 LUA
-- 或配置添加 enable-lua-records 进行全局启用
INSERT INTO domainmetadata (domain_id, kind, content) VALUES (1, 'ENABLE-LUA-RECORDS', 1);

-- 添加 LUA 记录
INSERT INTO records (domain_id, name, type, content, ttl)
VALUES (
  1,
  'www.example.com',
  'LUA',
  'A "pickclosest({''192.0.2.1'',''192.0.2.2'',''198.51.100.1''})',
  600
);

-- 配置记录
INSERT INTO records (domain_id, name, type, content, ttl)
VALUES ( 1, 'config.example.com', 'LUA',
  'LUA "fallbackIp=''192.168.1.1''"', 600
);
-- 使用配置
INSERT INTO records (domain_id, name, type, content, ttl)
VALUES ( 1, 'www.example.com', 'LUA',
  'A ";include(''config'');return fallbackIp"', 600
);
```

```lua
-- 返回请求方 IP
who:toString()

-- 根据请求方 IP 不同返回不同地址
view({
  {{'10.10.0.0/16'}, {'10.10.1.1'}}
  {{'0.0.0.0/0'}, {'192.0.2.1'}}
})

-- 返回存活的 IP
-- 异步检测 - 如果都不存活则都返回
ifportup(443, {'192.0.2.1', '192.0.2.2'})
-- 使用 URL 检测存活 - stringmatch 为可选的内容匹配条件
ifurlup("example.com/status", { {"192.0.2.20", "203.0.113.4"}, {"203.0.113.2"} },{stringmatch='ok'})

-- 基于请求方的 HASH(bestwho) 进行返回
pickwhashed({{10,'192.168.0.1'},{100,'192.168.0.2'}})
-- 随机返回 - 有带权重版
pickrandom({{'192.168.0.1'},{'192.168.0.2'}})
pickwrandom({{10,'192.168.0.1'},{100,'192.168.0.2'}})
```