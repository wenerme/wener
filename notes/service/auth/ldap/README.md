---
title: LADP
---

# LADP

- 端口
  - 389 ldap
  - 636,3269 ldaps - LDAP over SSL
  - 389 - starttls - LDAP over TLS - [rfc2830](https://www.rfc-editor.org/rfc/rfc2830)
- LDAP vs Kerberos
  - LDAP
    - 主要用于集中账户管理
  - Kerberos
    - 主要用于 SSO
    - 可以使用 LDAP 作为认证来源
- 操作
  - Add
  - Bind - 认证
  - Delete
  - Modify
  - Unbind - 断开认证连接
- 用户
  - Anonymous
  - Simple
  - SASL (Simple Authentication and Security Layer)
    - TLS, Kerberos
- LDAPv3 Password Modify Extended Operation
- DSA - Directory System Agent
- PAM - Privileged Access Management
- Reference
  - [LDAP for Rocket Scientists](http://www.zytrax.com/books/ldap/)
- LDAP 使用
  - [List of LDAP software](https://en.wikipedia.org/wiki/List_of_LDAP_software)
  - iOS/macOS 支持添加 LDAP 导入联系人
  - 存储
    - PowerDNS [backend-ldap](https://doc.powerdns.com/md/authoritative/backend-ldap/)
  - 认证
    - Gitlab [LDAP](https://docs.gitlab.com/ce/administration/auth/ldap.html)
    - Gogs/Gitea [LDAP Authentication Module](https://github.com/go-gitea/gitea/tree/master/modules/auth/ldap)
    - Nexus [LDAP Integration](https://books.sonatype.com/nexus-book/reference/ldap.html)
    - Nginx [nginx-auth-ldap](https://github.com/kvspb/nginx-auth-ldap)
    - Linux
      - [使用 PAM 集成 OpenLDAP 实现 Linux 统一管理系统用户](https://www.ibm.com/developerworks/cn/linux/1406_liulz_pamopenldap/)
      - [Linux LDAP authentication](https://www.s3it.uzh.ch/use/2014-11-04.linux-ldap-auth/slides.pdf)
    - SSH
      - [SSH key authentication using LDAP](https://serverfault.com/questions/653792)
      - [ssh-ldap-pubkey](https://github.com/jirutka/ssh-ldap-pubkey)
    - Odoo [auth_ldap](https://www.odoo.com/apps/modules/online/auth_ldap/)
    - Piwik [LoginLdap](https://plugins.piwik.org/LoginLdap)
    - Rundeck [ldap](http://rundeck.org/2.5.1/administration/authenticating-users.html#ldap)
    - Windows
      - [pgina](http://pgina.org/) 不活跃
      - Samba 提供 AD 服务, 后端对接 LDAP
      - [Can Windows integrate with LDAP?](https://serverfault.com/q/2769/190601)
    - Samba
      - [将 LDAP 目录用于 Samba 认证](https://www.ibm.com/developerworks/cn/education/linux/smb-ldap/smb-ldap.html)
      - [Samba & LDAP](https://wiki.samba.org/index.php/Samba_&_LDAP)
      - Ubuntu [Samba and Ldap](https://help.ubuntu.com/lts/serverguide/samba-ldap.html)
    - MySQL [LDAP Authentication without Proxy Users](https://dev.mysql.com/doc/mysql-security-excerpt/5.6/en/pam-authentication-ldap-without-proxy.html)
    - MongoDB
      - [LDAP Authorization](https://docs.mongodb.com/manual/core/security-ldap-external/)
  - 库
    - [pac4j](https://github.com/pac4j/pac4j) 支持 LDAP
    - [spring-ldap](http://projects.spring.io/spring-ldap/)
    - [JNDI](https://en.wikipedia.org/wiki/Java_Naming_and_Directory_Interface)
- Kerberos 使用
  - 认证
    - SSH
      - [Using OpenSSH with Kerberos](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_61/com.ibm.aix.security/using_openssh_with_kerberosv5.htm)
      - [How does Kerberos work with SSH?](https://serverfault.com/q/329901/190601)
      - sshd_config [GSSAPIAuthentication](http://man.openbsd.org/sshd_config#GSSAPIAuthentication)
      - [Using OpenSSH in a Single Sign-On Corporate Environment with z/OS,Windows and Linux](https://dovetail.com/docs/ssh/kerberos_sso.pdf)
    - MongoDB [Kerberos Authentication](https://docs.mongodb.com/manual/core/kerberos/)
    - Keycloak [Kerberos](https://keycloak.gitbooks.io/server-adminstration-guide/content/topics/authentication/kerberos.html)
  - 库
    - [spring-security-kerberos](http://projects.spring.io/spring-security-kerberos/)
- Reference
  - LDAP
    - [LDAP tut v2](http://quark.humbug.org.au/publications/ldap/ldap_tut_v2.pdf)
      - 演示文稿
      - 非常好的讲解
      - 逻辑梳理的非常清晰
    - [使用 LDAP + Kerberos 实现集中用户认证及授权系统](http://blog.clanzx.net/2013/09/27/ldap-kerberos.html)
    - MSDN [Lightweight Directory Access Protocol](<https://msdn.microsoft.com/en-us/library/aa367008(v=vs.85).aspx>)
  - Kerberos
    - [The MIT Kerberos Administrator’s How-to Guide](http://www.kerberos.org/software/adminkerberos.pdf)
    - [whykerberos](http://www.kerberos.org/software/whykerberos.pdf)
    - [Kerberos: The Definitive Guide](https://doc.lagout.org/network/Kerberos%20The%20Definitive%20Guide%202003.pdf)
- 推荐通过 安全协议 使用 - LDAPS, StartTLS

https://github.com/github/github-ldap

- [LDAP - Object Classes and Attributes](http://www.zytrax.com/books/ldap/ape/)

https://www.manageengine.com/products/ad-manager/help/csv-import-management/active-directory-ldap-attributes.html

Kerberos 5
http://searchsecurity.techtarget.com/definition/Kerberos
https://en.wikipedia.org/wiki/Authentication_server
Change Password Protocol
http://directory.apache.org/

- tools
  - [ldapsearch.1](https://linux.die.net/man/1/ldapsearch)
- [GroupOfUniqueNames vs groupOfNames](http://ldapwiki.com/wiki/GroupOfUniqueNames%20vs%20groupOfNames)
- acl
  - [Enable Authenticated Users to Browse and Read Entries](http://directory.apache.org/apacheds/advanced-ug/4.2.7.1-enable-authenticated-users-to-browse-and-read-entries.html)
- NOTE
  - LDAPS 已经废弃, 建议使用 StartTLS
- https://forum.forgerock.com/2015/04/ldaps-or-starttls-that-is-the-question/
- ldif
  - https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format

https://github.com/Pryz/terraform-provider-ldap

```bash
# 以简化操作
alias ldapsearch="ldapsearch -H ldap://127.0.0.1:10389 -D 'uid=admin,ou=system' -w secret"
# 检测用户是否在组中
ldapsearch -b 'cn=developer,ou=groups,dc=example,dc=com' '(&(member=uid=wener,ou=users,dc=example,dc=com))'
```

cn=developer,ou=groups,dc=wener,dc=me

### fortress

- https://github.com/apache/directory-fortress-core/blob/master/README-QUICKSTART-DOCKER-APACHEDS.md
- 用到的 schema
  - https://github.com/apache/directory-fortress-core/tree/master/ldap/schema

```bash
# 下载并加载 schema
wget https://raw.githubusercontent.com/apache/directory-fortress-core/master/ldap/schema/apacheds-fortress.ldif
ldapmodify -h localhost -p 10389 -D uid=admin,ou=system -w secret -a -f apacheds-fortress.ldif

# 可以直接使用 jetty-runner 来执行 war
wget http://maven.aliyun.com/nexus/content/groups/public/org/eclipse/jetty/jetty-runner/9.4.6.v20170531/jetty-runner-9.4.6.v20170531.jar -O jetty-runner.jar

java -jar jetty-runner.jar --port 8081 fortress-rest.war
```

## Usecase

- OpenVPN
- Jenkins
- Kubernetes
- Docker
- Atlassian Jira & Confluence
- Linux Samba

## 常见结构

- dc=wener,dc=me
  - ou=users
    - cn=USERNAME - 用户 - inetOrgPerson
      - uid 唯一标识符
      - cn 名称
      - cn 姓
  - ou=groups
    - cn=GROUPNAME - 分组 - groupOfNames
      - member - 成员
      - entryDN - 组成员属性、组 DN 属性
      - displayName - 如果不想显示 cn 可以考虑使用该属性
  - ou=policies - 策略
    - cn=default - pwdPolicy,namedPolicy,top
- c=国家
  - o=组织

```bash
# 以简化操作
alias ldapsearch="ldapsearch -H ldap://127.0.0.1:10389 -D 'uid=admin,ou=system' -w admin"
# 检测用户是否在组中
ldapsearch -b 'cn=developer,ou=groups,dc=example,dc=com' '(&(member=uid=wener,ou=users,dc=example,dc=com))'

ldapsearch -b 'ou=users,dc=incos,dc=dev' '(uid=wener.cyw)'
```

- [LDAP Schemas, objectClasses and Attributes](http://www.zytrax.com/books/ldap/ch3/)
- [Ldap Object Class](http://www.ldapexplorer.com/en/manual/107060000-ldap-object-classes.htm)
- [ObjectClass](https://ldapwiki.com/wiki/ObjectClass)
- [basic auth acl](https://directory.apache.org/apacheds/basic-ug/3.2-basic-authorization.html)
