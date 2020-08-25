---
id: consul-conf
title: Consul 配置
---

# Consul 配置

## Tips
* [Configuration](https://www.consul.io/docs/agent/options)

__单机配置__

```json
{
  "data_dir": "/var/consul",
  "server": true,
  "bootstrap_expect": 1,
  "disable_update_check": true,
  "disable_remote_exec": true,
  "enable_syslog": true
}
```

## acl
* https://learn.hashicorp.com/tutorials/consul/access-control-setup-production
* Token 类型
  * master - 主令牌
    * 等同于 acl bootstrap 的令牌 - 建议设置 - 设置后不再需要 acl bootstrap
    * 用于主 dc 的 server 之间
    * 使用 UUID
  * default - 默认 - 如果没有具体的 token
    * 用于向服务端发起请求
    * 没有则等同于 anonymous
  * agent
    * 用于客户端或服务执行内部操作
    * 如果没有则使用 default
    * 至少需要权限能设置节点信息
  * agent_master
    * 访问 agent 终端，读写 agent 权限
    * 服务中断时可用于 operator
  * replication
    * 用于授权二级 dc 访问主 dc 进行复制操作
