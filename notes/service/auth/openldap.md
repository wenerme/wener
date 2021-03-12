---
title: OpenLDAP
---

# OpenLDAP

* slapd
  * 独立 LDAP 守护进程
* overlay
  * 前后端之间的中间层
  * 作为扩展添加其他功能
* 参考
  * [文档](https://www.openldap.org/doc/)
  * archlinux [OpenLDAP](https://wiki.archlinux.org/index.php/OpenLDAP)

# FAQ

## 不支持 sha256, sha512

```
At present there is no need to change anything in the core since SHA-2 support
can be dynamically loaded. Don't fix what isn't broken.
```

* 参考
  * https://www.openldap.org/lists/openldap-bugs/201205/msg00055.html
  * https://www.openldap.org/faq/data/cache/1467.html
