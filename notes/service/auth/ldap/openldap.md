---
title: OpenLDAP
---

# OpenLDAP

- [openldap/openldap](https://github.com/openldap/openldap)
  - 支持 SQL 后端 - PostgreSQL
- 使用场景 - 用户联邦, 数据存储
  - Linux PAM
  - SSH PAM
  - Keycloak user federation
  - Kerberos database
  - PowerDNS database
  - Serive user - Gitea, Gitlab, Nextcloud
- 参考
  - [文档](https://www.openldap.org/doc/)
  - archlinux [OpenLDAP](https://wiki.archlinux.org/index.php/OpenLDAP)
  - [leenooks/phpLDAPadmin](https://github.com/leenooks/phpLDAPadmin)
    - [demo](http://demo.phpldapadmin.org/)
  - [OpenLDAP multi-tenant like ACL](https://stackoverflow.com/questions/22606811)
    - [Sets in Access Controls](https://www.openldap.org/faq/data/cache/1133.html)
  - [osixia/docker-openldap](https://github.com/osixia/docker-openldap)
  - [jp-gouin/helm-openldap](https://github.com/jp-gouin/helm-openldap)
  - [ltb-project/self-service-password](https://github.com/ltb-project/self-service-password)
    - GPLv3, PHP
    - change and reset password in an LDAP

## Note

- overlay
  - 前后端之间的中间层
  - 作为扩展添加其他功能
- 配置
  - /etc/openldap/slapd.conf
  - /etc/openldap/slapd.ldif
- passwd - argon2, pbkdf2, sha2
- 后端 - bdb, dnssrv, hdb, ldap, mdb, meta, monitor, null, passwd, relay, shell, sock, sql

| cli        | desc               |
| ---------- | ------------------ |
| slapacl    |
| slapadd    |
| slapauth   |
| slapcat    |
| slapd      | 独立 LDAP 守护进程 |
| slapdn     |
| slapindex  |
| slappasswd |
| slapschema |
| slaptest   |

| overlay     | desc |
| ----------- | ---- |
| accesslog   |
| auditlog    |
| collect     |
| constraint  |
| dds         |
| deref       |
| dyngroup    |
| dynlist     |
| lastbind    |
| memberof    |
| mqtt        |
| ppolicy     |
| proxycache  |
| refint      |
| retcode     |
| rwm         |
| seqmod      |
| sssvlv      |
| syncprov    |
| translucent |
| unique      |
| valsort     |

# FAQ

## 不支持 sha256, sha512

```
At present there is no need to change anything in the core since SHA-2 support
can be dynamically loaded. Don't fix what isn't broken.
```

- 参考
  - https://www.openldap.org/lists/openldap-bugs/201205/msg00055.html
  - https://www.openldap.org/faq/data/cache/1467.html
