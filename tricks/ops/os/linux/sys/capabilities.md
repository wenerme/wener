---
id: capabilities
title: 能力管理
---

# Capabilities
## Tips
* [capabilities.7](http://man7.org/linux/man-pages/man7/capabilities.7.html)
  * 自 2.2 将 root 权限拆分为多个能力
  * 能力是线程级别的属性
* 主要能力
  * CAP_NET_ADMIN
    * 网卡配置
    * IP 管理
    * 路由表
    * 建立广播
  * CAP_SYS_ADMIN
    * 挂载、赔额
    * 主机名
