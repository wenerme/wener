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

:::caution

- sql backend 需要自行维护 表 与 ObjectClass 的关系
  - 并不是直接可用 - 初期有一定工作量
- 不支持 reload - 直接重启

:::

```bash
# macOS
/usr/libexec/slapd -VVV # 自带 v2.4

brew install openldap
export PATH="/usr/local/opt/openldap/bin:$PATH"
export PATH="/usr/local/opt/openldap/sbin:$PATH"
/usr/local/opt/openldap/libexec/slapd -VVV # 最新版 v2.6

# AlpineLinux
apk add openldap
# 添加后端 - 生产用 sql 测试用 mdb
apk add openldap-back-sql openldap-back-mdb
# 添加 overlay - openldap-overlay-all 为所有
apk add openldap-overlay-{accesslog,memberof,otp}
apk add openldap-passwd-{pbkdf2,argon2,sha2}
# /etc/openldap/slapd.conf
service slapd checkconfig
```

## Note

- overlay
  - 前后端之间的中间层
  - 作为扩展添加其他功能
- 配置
  - /etc/openldap/slapd.conf
  - /etc/openldap/slapd.ldif
- 后端 - bdb, dnssrv, hdb, ldap, mdb, meta, monitor, null, passwd, relay, shell, sock, sql

| cli         | desc                |
| ----------- | ------------------- |
| **SBIN**    |
| slapacl     | 校验 slapd 目录权限 |
| slapadd     |
| slapauth    |
| slapcat     |
| slapd       | 独立 LDAP 守护进程  |
| slapdn      |
| slapindex   |
| slappasswd  |
| slapschema  |
| slaptest    |
| slapmodify  |
| **BIN**     |
| ldapadd     |
| ldapdelete  |
| ldapmodify  |
| ldappasswd  |
| ldapurl     |
| ldapwhoami  |
| ldapcompare |
| ldapexop    |
| ldapmodrdn  |
| ldapsearch  |
| ldapvc      |
| **MISC**    |
| lloadd      | 负载均衡代理服务    |

| slapd           | for                 |
| --------------- | ------------------- |
| -h URLs         | 监听                |
| -u user         |
| -g group        |
| -r dir          | chroot              |
| -c cookie       | cookie for syncrepl |
| -o option=value |
| -d debug-level  |
| -f slapd.conf   |
| -F slapd.d      | ldif 配置目录       |
| -T              | 工具                |

- -T - acl, a/add, auth, c/cat, d/dn, i/index, p/passwd, s/schema, t/test
- -h `ldap:/// ldaps:/// ldapi:///`
  - ldap - 默认 389
  - ldaps - 默认 636 - LDAP over TLS
  - ldapi - LDAP over IPC
    - x-mod 可指定权限
  - PLDAP, PLDAPS - HAProxy proxy protocol version 2
- -c cookie
  - rid, sid, csn
- -o option
  - slp

```bash
slapd -d ?                 # 显示所有的 debug level
slapd -Tt -f slapd.conf    # 校验配置 - slaptest
slapd -f slapd.conf -d 255 # 启动

chown -R ldap:ldap slapd.d # 确保权限正确
# 存在 slapd.d/cn=config.ldif
slapd -F slapd.d -u ldap -g ldap # 推荐使用 ldif 配置

# 配置转换
slaptest -f slapd.conf -F slapd.d

slapcat -F /usr/local/etc/openldap/slapd.d -n0 -l extracted_config.ldif
slapadd -F /usr/local/etc/openldap/slapd.d -l updated_config.ldif

# -b DN
# -U authcID
# [attr[/access][:value]]
# 检测 wener 用户是否能读取 dc=wener,dc=me 的 name 属性
slapacl -f slapd.conf -v -U wener -b "dc=wener,dc=me" "name/read:wener"
```

## Overlay

| overlay      | desc                                        |
| ------------ | ------------------------------------------- |
| accesslog    | 存储访问日志到 DB - 也会用于 delta-syncrepl |
| auditlog     | 修改日志                                    |
| chain        |
| collect      |
| constraint   | 用 regex 限定属性值                         |
| dds          | dynamicObject,ttl                           |
| deref        |
| dynlist      |
| homedir      |
| lastbind     |
| memberof     | 维护反向分组关系                            |
| mqtt         |
| pcache       | Proxy Cache                                 |
| ppolicy      | Password Policy                             |
| proxycache   |
| refint       | Referential Integrity                       |
| remoteauth   |
| retcode      | Return Code                                 |
| rwm          | Rewrite/Remap                               |
| seqmod       |
| sssvlv       |
| syncprov     | Sync Provider                               |
| translucent  | Translucent Proxy                           |
| unique       | 唯一限定                                    |
| valsort      | Value Sorting                               |
| ~~dyngroup~~ | 使用 dynlist                                |

- 多个 overlay 是反序执行的
- dds - Dynamic Directory Services - rfc2859
  - CRP - Client Refresh Period
    - 刷新 ttl - ldapexop
- memberof
  - 为 groupOfNames 的 member 对象生成 memberof 方向引用属性
- rwm [slapo-rwm](https://www.openldap.org/software/man.cgi?query=slapo-rwm&apropos=0&sektion=5&manpath=OpenLDAP+2.6-Release&arch=default&format=html)
  - 为远程 ldap 或 relay 提供虚拟字段
- translucent
  - 存储部分代理数据的到本地
- unique
  - unique_uri - `ldap:///ou=users,dc=example,dc=com?mail?sub?(objectClass=inetOrgPerson)`
- valsort
  - valsort-attr - `memberUid ou=groups,dc=wener,dc=me alpha-ascend`

**refint**

- 支持 rename
- 如果 user 被删除，对应的 member 关系也被删除
- 如果没有任何 member 则使用 refint_nothing

```conf
overlay refint
refint_attributes member
refint_nothing "cn=admin,dc=example,dc=com"
```

### dynlist

```conf
overlay dynlist
# dynlist-attrset <group-oc> <URL-ad> [member-ad]
# member-ad - 存在则为 dyngroup - 需要包含 dyngroup.schema

# 将查询结果的单一属性返回
dynlist-attrset nisMailAlias labeledURI

# 将查询结果作为 member 属性返回
dynlist-attrset groupOfURLs labeledURI member
```

```ldif
cn=all,ou=aliases,dc=example,dc=com
cn: all
objectClass: nisMailAlias
labeledURI: ldap:///ou=People,dc=example,dc=com?mail?one?(objectClass=inetOrgPerson)
```

- 查询该对象时实际返回 labeledURI 查询结果

## Schema

| schema        | note                                                |
| ------------- | --------------------------------------------------- |
| collective    | Collective attributes (experimental)                |
| corba         |
| core          | OpenLDAP core                                       |
| cosine        | COSINE Pilot                                        |
| dsee          | Sun DSEE                                            |
| duaconf       | Client Configuration - WIP                          |
| dyngroup      | Dynamic Group (experimental)                        |
| inetorgperson | InetOrgPerson                                       |
| java          | Java Object                                         |
| misc          | Miscellaneous Schema (experimental)                 |
| msuser        | Microsoft's Active Directory schema for replication |
| namedobject   | namedObject draft schema - WIP                      |
| nis           | Network Information Service (experimental)          |
| openldap      |
| pmi           | ITU X.509 PMI support (experimental)                |

- https://github.com/openldap/openldap/tree/master/contrib
  - 额外模块
    - passwd/pbkdf2
    - passwd/sha2

### Password

- argon2
- pbkdf2
  - PBKDF2 -> PBKDF2-SHA1
  - PBKDF2-SHA1
  - PBKDF2-SHA256
  - PBKDF2-SHA512
- sha2
  - SHA512
  - SHA384
  - SHA256
  - SSHA512
  - SSHA384
  - SSHA256
  - S 前缀 Salted
- totp - RFC 6238 Time-based One Time Passwords
  - TOTP1 - SHA-1
  - TOTP256 - SHA-256
  - TOTP512 - SHA-512
  - TOTP1ANDPW
  - TOTP256ANDPW
  - TOTP512ANDPW
    - TOTP+password
- kerberos
- netscape
- apr1
- radius

```txt title="password"
# password=secret salt=saltsalt
userPassword: {ARGON2}$argon2i$v=19$m=4096,t=3,p=1$c2FsdHNhbHQ$DKlexoEJUoZTmkAAC3SaMWk30El9/RvVhlqGo6afIng
```

```bash
# 默认支持 SHA
slappasswd -o module-load=pw-sha2.so -h {SHA} -s secret

echo -n "secret" | argon2 "salt" -e
slappasswd -o module-load=argon2.so -h {ARGON2} -s secret

slappasswd -o module-load=pw-pbkdf2.so -h {PBKDF2} -s secret

slappasswd -o module-load=pw-sha2.so -h {SHA256} -s secret
echo -n "secret" | openssl dgst -sha256 -binary | openssl enc -base64
```

- passwd - [servers/slapd/pwmods](https://github.com/openldap/openldap/tree/master/servers/slapd/pwmods)

## slapd-config

使用 ldif 配置

- cn=config 0 olcGlobal
  - olcIdleTimeout
  - olcLogLevel
  - olcReferral
  - cn=module
    - olcModuleLoad
    - olcModulePath
  - cn=schema - olcSchemaConfig - System schema
    - olcAttributeTypes
    - olcObjectClasses
    - cn={0}core - CoreSchema
      - olcAttributeTypes
      - olcObjectClasses
  - olcBackend
  - olcDatabase={1}mdb - olcBackendConfig
    - index 用于区分多个同类型的不同 db
      - 不指定会自动创建
    - `olcAccess: to <what> [ by <who> [<accesslevel>] [<control>] ]+`
    - olcReadonly
    - olcRootDN
    - olcRootPW
    - olcSizeLimit
    - olcSuffix
    - olcSyncrepl
    - olcTimeLimit: 3600
    - olcUpdateref
  - olcDatabase=frontend
    - olcAccess
- mdb
  - backend
    - olcBkMdbIdlExp: 16
  - database
    - olcDbDirectory: /usr/local/var/openldap-data
    - olcDbCheckpoint: 1024 10
    - olcDbEnvFlags
    - olcDbIndex
    - olcDbMaxEntrySize: 0
    - olcDbMaxReaders: 126
    - olcDbMaxSize: 10485760 - 10MB
    - olcDbMode: 0600
    - olcDbMultival
    - olcDbRtxnsize
    - olcDbSearchStack: 16
    - olcDbNosync

### 基础配置

```ldif
dn: cn=config
objectClass: olcGlobal
cn: config

olcArgsFile: /var/lib/openldap/run/slapd.args
olcPidFile: /var/lib/openldap/run/slapd.pid

# 模块加载
dn: cn=module,cn=config
objectClass: olcModuleList
cn: module
olcModulepath:	/usr/lib/openldap
olcModuleload:	back_mdb.so

dn: cn=schema,cn=config
objectClass: olcSchemaConfig
cn: schema

include: file:///etc/openldap/schema/core.ldif

# 前端
#
dn: olcDatabase=frontend,cn=config
objectClass: olcDatabaseConfig
objectClass: olcFrontendConfig
olcDatabase: frontend
# 访问控制策略
#	Other DSEs:
#		Allow self write access
#		Allow authenticated users read access
#		Allow anonymous users to authenticate
#
#olcAccess: to dn.base="" by * read
#olcAccess: to dn.base="cn=Subschema" by * read
#olcAccess: to *
#	by self write
#	by users read
#	by anonymous auth
#
# if no access controls are present, the default policy
# allows anyone and everyone to read anything but restricts
# updates to rootdn.  (e.g., "access to * by * read")
#
# rootdn can always read and write EVERYTHING!
#

# 数据库配置
dn: olcDatabase=mdb,cn=config
objectClass: olcDatabaseConfig
objectClass: olcMdbConfig
olcDatabase: mdb
olcDbMaxSize: 1073741824
olcSuffix: dc=wener,dc=me
olcRootDN: cn=admin,dc=wener,dc=me
olcRootPW: secret
olcDbDirectory:	/var/lib/openldap/openldap-data
olcDbIndex: objectClass eq

dn: olcDatabase=monitor,cn=config
objectClass: olcDatabaseConfig
olcDatabase: monitor
olcRootDN: cn=config
olcMonitoring: FALSE
```

## slapd.conf

:::caution

- 该配置方式已废弃，推荐使用 slapd-config 配置

:::

- 全局配置+数据库配置
- 行开头为空白则为 续 行
- `backend <type>`
  - asyncmeta, config, dnssrv, ldap, ldif, mdb, meta, monitor, null, passwd, perl, relay, sock, sql, wt
  - wt - WiredTiger
- `overlay <name>`

---

- https://www.openldap.org/doc/admin26/slapdconf2.html
- https://man7.org/linux/man-pages/man5/slapd.conf.5.html

### 基础配置

```conf
include		/etc/openldap/schema/core.schema

pidfile		/var/lib/openldap/run/slapd.pid
argsfile	/var/lib/openldap/run/slapd.args

# 加载模块
modulepath	/usr/lib/openldap
moduleload	back_mdb.la

attributeoptions x-hidden lang-
access to attrs=name;x-hidden by * =cs
access to attrs=userPassword  by * auth
access to *  by * read

database config
# 开启后可 bind cn=config 直接修改配置 - 不过配置修改不会保存
# rootpw secret

# mdb 配置
database	mdb
maxsize		1073741824
suffix		"dc=wener,dc=me"
rootdn		"cn=admin,dc=wener,dc=me"
# 避免密码明文 - 使用 slappasswd 生成
rootpw		secret
# chmod 700
directory	/var/lib/openldap/openldap-data
# 需要维护的索引
index	objectClass	eq
index cn,sn,mail pres,eq,approx,sub

database monitor
```

## backend sql

- 使用 odbc 连接
- 需要自行维护 表 与 ObjectClass 的关系

```ini title="/etc/odbc.ini"
[example]
Description         = OpenLDAP back-sql
Driver              = PostgreSQL
Trace               = No
Database            = example
Servername          = localhost
UserName            = manager
Password            = secret
Port                = 5432
;Protocol            = 6.4
ReadOnly            = No
RowVersioning       = No
ShowSystemTables    = No
ShowOidColumn       = No
FakeOidIndex        = No
ConnSettings        =
```

```ini title="/etc/odbcinst.ini"
[PostgreSQL]
Description     = ODBC for PostgreSQL
Driver          = /usr/lib/libodbcpsql.so
Setup           = /usr/lib/libodbcpsqlS.so
FileUsage       = 1
```

```conf
database	sql
suffix		"o=sql,c=RU"
rootdn		"cn=root,o=sql,c=RU"
rootpw		secret
dbname		PostgreSQL
dbuser		postgres
dbpasswd	postgres
insentry_stmt	"insert into ldap_entries (id,dn,oc_map_id,parent,keyval) values ((select max(id)+1 from ldap_entries),?,?,?,?)"
upper_func	"upper"
strcast_func	"text"
concat_pattern	"?||?"
has_ldapinfo_dn_ru	no
```

**PostgreSQL**

- ldap_oc_mappings
- ldap_attr_mappings
- ldap_entries
- ldap_entry_objclasses

```sql
create table
  ldap_oc_mappings (
    id serial not null primary key,
    -- objectClass name
    name varchar(64) not null,
    -- 映射的表名
    keytbl varchar(64) not null,
    -- pk 列
    keycol varchar(64) not null,
    -- 创建 SQL
    create_proc varchar(255),
    -- 删除 SQL
    delete_proc varchar(255),
    expect_return int not null
  );

create table
  ldap_attr_mappings (
    id serial not null primary key,
    oc_map_id integer not null references ldap_oc_mappings(id),
    name varchar(255) not null,
    sel_expr varchar(255) not null,
    sel_expr_u varchar(255),
    from_tbls varchar(255) not null,
    join_where varchar(255),
    add_proc varchar(255),
    delete_proc varchar(255),
    param_order int not null,
    expect_return int not null
  );

create table
  ldap_entries (
    id serial not null primary key,
    dn varchar(255) not null,
    oc_map_id integer not null references ldap_oc_mappings(id),
    parent int NOT NULL,
    keyval int NOT NULL,
    UNIQUE (oc_map_id, keyval),
    UNIQUE (dn)
  );

create table
  ldap_entry_objclasses (
    entry_id integer not null references ldap_entries(id),
    oc_name varchar(64)
  );
```

- https://github.com/openldap/openldap/tree/master/servers/slapd/back-sql/rdbms_depend/pgsql

## backend monitor

- 由 slapd 维护，提供系统健康信息
- cn=Monitor
  - cn=Backends
    - monitoredInfo
    - cn=Backend 0
  - cn=Connections
    - cn=Total
    - cn=Current
  - cn=Databases
    - cn=Database 0
  - cn=Listeners
  - cn=Overlays
    - monitoredInfo
  - cn=Statistics
    - cn=Entries
      - monitorCounter
  - cn=Threads
    - cn=Max
      - monitoredInfo
  - cn=Time
    - cn=Current
      - monitorTimestamp
    - cn=Start
  - cn=Waiters
    - cn=Read
      - monitorCounter
    - cn=Write

```conf
database monitor
access to * by dn.exact="cn=admin,dc=wener,dc=me" by * none
```

```bash
ldapsearch -x -D 'cn=admin,dc=wener,dc=me' -W -b 'cn=Monitor' -s base 1.1
ldapsearch -x -D 'cn=admin,dc=wener,dc=me' -W -b 'cn=Monitor' -s base '(objectClass=*)' '*' '+'
```

## Access Control

```
access to <what> [by <who> [<access>] [<control>] ]+
```

- what
  - `*`
  - `dn[.<basic-style>]=<regex> | dn.<scope-style>=<DN>`
    - basic-style - regex, exact
    - scope-style - base, one, subtree, children
  - `filter=<ldapfilter>] [attrs=<attrlist>`
- who
  - `*`
  - anonymous
  - users
  - self
  - `dn[.<basic-style>]=<regex> | dn.<scope-style>=<DN>]`
  - dnattr=
  - group/x=
  - peername=
  - sockname=
  - domain=
  - sockurl=
  - set=
  - aci=
- access
  - self
  - level
    - none | disclose | auth | compare | search | read | write | manage
    - 下级包含上级
  - priv
    - `{=|+|-}{m|w|r|s|c|x|d|0}+`
- control
  - stop | continue | break

| who                          | desc                                |
| ---------------------------- | ----------------------------------- |
| `*`                          | 所有                                |
| anonymous                    | 匿名/未授权 用户                    |
| users                        | 授权用户                            |
| self                         | User associated with target entry   |
| `dn[.<basic-style>]=<regex>` | Users matching a regular expression |
| `dn.<scope-style>=<DN>`      | Users within scope of a DN          |

| level    | priv     | desc                                       |
| -------- | -------- | ------------------------------------------ |
| none     | =0       | 不能访问                                   |
| disclose | =d       | needed for information disclosure on error |
| auth     | =dx      | 需要认证 - bind                            |
| compare  | =cdx     | needed to compare                          |
| search   | =scdx    | needed to apply search filters             |
| read     | =rscdx   | needed to read search results              |
| write    | =wrscdx  | needed to modify/rename                    |
| manage   | =mwrscdx | needed to manage                           |

## Off-line

```ldif
dn: dc=wener,dc=me
objectClass: dcObject
objectClass: organization
dc: wener
o: Wener's Website
description: A blog full of notes

dn: cn=admin,dc=example,dc=com
objectClass: organizationalRole
cn: admin
description: Directory Administrator
```

```bash
# 使用 directory 的 可以加
slapd -Ta -F slapd.d -l demo.ldif
```

## ldap cli

| flag          | for                         |
| ------------- | --------------------------- |
| -f file       |
| -D binddn     |
| -W            | ask password                |
| -w passwd     |
| -x            | simple auth instead of SASL |
| -y passwdfile |
| -H ldapuri    |
| -h host       |
| -p port       |
| -n            | dry run                     |

- ldapadd = ldapmodify -a
- /etc/openldap/ldap.conf

```conf
BASE dc=wener,dc=me
URI ldap://ip
TLS_CACERTDIR /etc/openldap/certs
```

```bash
ldapsearch -x -LLL
```

## 备份

```bash
slapcat -f slapd.conf -b "dc=example,dc=com"
```

## lloadd

- 负载均衡

```conf
feature proxyauthz

bindconf bindmethod=simple
        binddn="cn=Manager,dc=example,dc=com"
        credentials=secret

tier roundrobin
backend-server uri=ldap://server1.example.com
              numconns=5 bindconns=5
              max-pending-ops=10 conn-max-pending=3
              retry=5000
backend-server uri=ldap://server2.example.com
              numconns=5 bindconns=5
              max-pending-ops=10 conn-max-pending=3
              retry=5000
```

# FAQ

## 不支持 sha256, sha512

```
At present there is no need to change anything in the core since SHA-2 support
can be dynamically loaded. Don't fix what isn't broken.
```

- 参考
  - https://www.openldap.org/lists/openldap-bugs/201205/msg00055.html
  - https://www.openldap.org/faq/data/cache/1467.html

## No passwd entry for user ldap

```bash
getent passwd ldap
```

## slapd.ldif

默认只能 slapd.conf 单文件配置，可以通过一定的方式实现 ldif 配置。

```bash
slapd -f slapd.conf.init -F slapd.d -h 'ldap:// ldaps:// ldapi://'

# slapd.ldif 包含所有配置
ldapadd -Y EXTERNAL -H ldapi:// -f slapd.ldif
```

```conf title="slapd.conf.init"
pidfile /var/lib/openldap/run/slapd.pid

database config
# 允许通过 sock 管理
access to * by dn.base="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth" manage
```

```ldif title="slapd.ldif"
dn: cn=module,cn=config
objectClass: olcModuleList
cn: module
olcModulePath: /usr/lib/openldap
olcModuleLoad: back_mdb.so

dn: olcDatabase=mdb,cn=config
objectClass: olcDatabaseConfig
objectClass: olcMdbConfig
olcDatabase: mdb
olcSuffix: dc=example,dc=com
olcRootDN: cn=manager,dc=example,dc=com
olcRootPW:: c2VjcmV0
olcDbDirectory: /var/lib/openldap/example.com
olcAccess: to * by dn.base="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth" manage
```
