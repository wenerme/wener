# LADP

## Tips

* LDAP vs Kerberos
  * LDAP 主要用过集中账户管理
  * Kerberos 主要用于 SSO
  * Kerberos 可以使用 LDAP 作为认证来源
* Reference
  * [LDAP for Rocket Scientists](http://www.zytrax.com/books/ldap/)
* LDAP 使用
  * [List of LDAP software](https://en.wikipedia.org/wiki/List_of_LDAP_software)
  * iOS/macOS 支持添加 LDAP 导入联系人
  * 存储
    * PowerDNS [backend-ldap](https://doc.powerdns.com/md/authoritative/backend-ldap/)
  * 认证
    * Gitlab [LDAP](https://docs.gitlab.com/ce/administration/auth/ldap.html)
    * Gogs/Gitea [LDAP Authentication Module](https://github.com/go-gitea/gitea/tree/master/modules/auth/ldap)
    * Nexus [LDAP Integration](https://books.sonatype.com/nexus-book/reference/ldap.html)
    * Nginx [nginx-auth-ldap](https://github.com/kvspb/nginx-auth-ldap)
    * Linux
      * [使用 PAM 集成 OpenLDAP 实现 Linux 统一管理系统用户](https://www.ibm.com/developerworks/cn/linux/1406_liulz_pamopenldap/)
      * [Linux LDAP authentication](https://www.s3it.uzh.ch/use/2014-11-04.linux-ldap-auth/slides.pdf)
    * SSH
      * [SSH key authentication using LDAP](https://serverfault.com/questions/653792)
      * [ssh-ldap-pubkey](https://github.com/jirutka/ssh-ldap-pubkey)
    * Odoo [auth_ldap](https://www.odoo.com/apps/modules/online/auth_ldap/)
    * Piwik [LoginLdap](https://plugins.piwik.org/LoginLdap)
    * Rundeck [ldap](http://rundeck.org/2.5.1/administration/authenticating-users.html#ldap)
    * Windows
      * [pgina](http://pgina.org/) 不活跃
      * Samba 提供 AD 服务, 后端对接 LDAP
      * [Can Windows integrate with LDAP?](https://serverfault.com/q/2769/190601)
    * Samba
      * [将 LDAP 目录用于 Samba 认证](https://www.ibm.com/developerworks/cn/education/linux/smb-ldap/smb-ldap.html)
      * [Samba & LDAP](https://wiki.samba.org/index.php/Samba_%26_LDAP)
      * Ubuntu [Samba and Ldap](https://help.ubuntu.com/lts/serverguide/samba-ldap.html)
    * MySQL [LDAP Authentication without Proxy Users](https://dev.mysql.com/doc/mysql-security-excerpt/5.6/en/pam-authentication-ldap-without-proxy.html)
    * MongoDB
      * [LDAP Authorization](https://docs.mongodb.com/manual/core/security-ldap-external/)
  * 库
    * [pac4j](https://github.com/pac4j/pac4j) 支持 LDAP
    * [spring-ldap](http://projects.spring.io/spring-ldap/)
    * [JNDI](https://en.wikipedia.org/wiki/Java_Naming_and_Directory_Interface)
* Kerberos 使用
  * 认证
    * SSH
      * [Using OpenSSH with Kerberos](https://www.ibm.com/support/knowledgecenter/en/ssw_aix_61/com.ibm.aix.security/using_openssh_with_kerberosv5.htm)
      * [How does Kerberos work with SSH?](https://serverfault.com/q/329901/190601)
      * sshd_config [GSSAPIAuthentication](http://man.openbsd.org/sshd_config#GSSAPIAuthentication)
      * [Using OpenSSH in a Single Sign-On Corporate Environment with z/OS,Windows and Linux](https://dovetail.com/docs/ssh/kerberos_sso.pdf)
    * MongoDB [Kerberos Authentication](https://docs.mongodb.com/manual/core/kerberos/)
    * Keycloak [Kerberos](https://keycloak.gitbooks.io/server-adminstration-guide/content/topics/authentication/kerberos.html)
  * 库
    * [spring-security-kerberos](http://projects.spring.io/spring-security-kerberos/)
* Reference
  * LDAP
    * [LDAP tut v2](http://quark.humbug.org.au/publications/ldap/ldap_tut_v2.pdf)
      * 演示文稿
      * 非常好的讲解
      * 逻辑梳理的非常清晰
    * [使用 LDAP + Kerberos 实现集中用户认证及授权系统](http://blog.clanzx.net/2013/09/27/ldap-kerberos.html)
    * MSDN [Lightweight Directory Access Protocol](https://msdn.microsoft.com/en-us/library/aa367008(v=vs.85).aspx)
  * Kerberos
    * [The MIT Kerberos Administrator’s How-to Guide](http://www.kerberos.org/software/adminkerberos.pdf)
    * [whykerberos](http://www.kerberos.org/software/whykerberos.pdf)
    * [Kerberos: The Definitive Guide](https://doc.lagout.org/network/Kerberos%20The%20Definitive%20Guide%202003.pdf)

https://github.com/github/github-ldap

* [LDAP - Object Classes and Attributes](http://www.zytrax.com/books/ldap/ape/)


Kerberos 5
http://searchsecurity.techtarget.com/definition/Kerberos
https://en.wikipedia.org/wiki/Authentication_server
Change Password Protocol
http://directory.apache.org/


* tools
  * [ldapsearch.1](https://linux.die.net/man/1/ldapsearch)
* [GroupOfUniqueNames vs groupOfNames](http://ldapwiki.com/wiki/GroupOfUniqueNames%20vs%20groupOfNames)
* acl
  * [Enable Authenticated Users to Browse and Read Entries](http://directory.apache.org/apacheds/advanced-ug/4.2.7.1-enable-authenticated-users-to-browse-and-read-entries.html)
* NOTE
  * LDAPS 已经废弃, 建议使用 StartTLS
* https://forum.forgerock.com/2015/04/ldaps-or-starttls-that-is-the-question/
* ldif
  * https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format

```bash
# 以简化操作
alias ldapsearch="ldapsearch -H ldap://127.0.0.1:10389 -D 'uid=admin,ou=system' -w secret"
# 检测用户是否在组中
ldapsearch -b 'cn=developer,ou=groups,dc=example,dc=com' '(&(member=uid=wener,ou=users,dc=example,dc=com))'

```



cn=developer,ou=groups,dc=wener,dc=me
## ApacheDS
* ldapServer
  * 10389 unencrypted or StartTLS
  * 10636 SSL


changePasswordServer
默认未启用
tcp/udp 60464
httpServer
http 8080
https 8443
kerberosServer
默认未启用
tcp/udp 60088

LDAP 端口为
389

默认用户
uid=admin,ou=system
secret

* 注意
  * 新增域名需要先添加分片, 添加分片后需要重启后生效
  * 部分 schema 是禁用的, 需要在 `ou=schema` 下启用
    * 例如 posixAccount 需要启用 nis , 在 `cn=nis,ou=schema` 中, 把 m-disable 设置为 false

https://www.ldap.com/basic-ldap-concepts
http://archive.oreilly.com/pub/a/perl/excerpts/system-admin-with-perl/ten-minute-ldap-utorial.html


https://www.manageengine.com/products/ad-manager/help/csv-import-management/active-directory-ldap-attributes.html
http://www.kouti.com/tables/userattributes.htm

https://en.wikipedia.org/wiki/LDAP_Data_Interchange_Format

字段|全称|含义
----|----|----
dn| distinguished name |
cn| Common Name | 全名
dc| Domain Component | wener.me -> dc=wener,dc=me
ou| Organizational Unit
sn| surname | 姓


https://www.ietf.org/rfc/rfc2253.txt

String  | X.500 AttributeType
------------------------------
CN      | commonName
L       | localityName
ST      | stateOrProvinceName
O       | organizationName
OU      | organizationalUnitName
C       | countryName
STREET  | streetAddress
DC      | domainComponent
UID     | userid




```bash
# 当前最新版为 2.0.0-M24
wget http://mirrors.aliyun.com/apache/directory/apacheds/dist/2.0.0-M24/apacheds-2.0.0-M24.zip
unzip apacheds-2.0.0-M24.zip
cd apacheds-2.0.0-M24

# apacheds.sh [<instance name>] <action>
# instance 默认为 default, action 为 run,start,stop,status,repair
chmod +x ./bin/apacheds.sh
# 启动服务
./bin/apacheds.sh start

# 测试服务器是否启动成功
ldapmodify -H ldap://127.0.0.1:10389

# 备份现有数据
ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub "(ObjectClass=*)" '*' + > backup.ldif

# 判断用户是否归属组
ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub  "(&(objectClass=person)(uid=wener)(memberof=CN=developer,OU=users,DC=example,DC=com))"

```

### fortress
* https://github.com/apache/directory-fortress-core/blob/master/README-QUICKSTART-DOCKER-APACHEDS.md
* 用到的 schema
  * https://github.com/apache/directory-fortress-core/tree/master/ldap/schema


```bash
# 下载并加载 schema
wget https://raw.githubusercontent.com/apache/directory-fortress-core/master/ldap/schema/apacheds-fortress.ldif
ldapmodify -h localhost -p 10389 -D uid=admin,ou=system -w secret -a -f apacheds-fortress.ldif

# 可以直接使用 jetty-runner 来执行 war
wget http://maven.aliyun.com/nexus/content/groups/public/org/eclipse/jetty/jetty-runner/9.4.6.v20170531/jetty-runner-9.4.6.v20170531.jar -O jetty-runner.jar

java -jar jetty-runner.jar --port 8081 fortress-rest.war
```

## 常见结构
* [LDAP Schemas, objectClasses and Attributes](http://www.zytrax.com/books/ldap/ch3/)
* [Ldap Object Class](http://www.ldapexplorer.com/en/manual/107060000-ldap-object-classes.htm)
* [ObjectClass](https://ldapwiki.com/wiki/ObjectClass)
* [basic auth acl](https://directory.apache.org/apacheds/basic-ug/3.2-basic-authorization.html)

* dc=wener,dc=me
  * ou=users
    * cn=USERNAME - 用户 - inetOrgPerson
      * uid 唯一标识符
      * cn 名称
      * cn 姓
  * ou=groups
    * cn=GROUPNAME - 分组 - groupOfNames
      * member - 成员
      * entryDN - 组成员属性、组 DN 属性
      * displayName - 如果不想显示 cn 可以考虑使用该属性


```bash
# 以简化操作
alias ldapsearch="ldapsearch -H ldap://127.0.0.1:10389 -D 'uid=admin,ou=system' -w admin"
# 检测用户是否在组中
ldapsearch -b 'cn=developer,ou=groups,dc=example,dc=com' '(&(member=uid=wener,ou=users,dc=example,dc=com))'

ldapsearch -b 'ou=users,dc=incos,dc=dev' '(uid=wener.cyw)'
```