---
id: apacheds
title: Apache Directory
---

# Apache DS

- [Apache Directory™](http://directory.apache.org/)
  - LDAP 实现
  - Kerberos 实现
  - 后端为自定义 DB - 需要磁盘空间存储，不支持 DB
- 阿里云镜像下载 http://mirrors.aliyun.com/apache/directory/
- 默认授权
  - uid=admin,ou=system
  - secret
- 子项目
  - ApacheDS - Directory Server - LDAP 服务器
  - Apache Directory Studio - 基于 Eclipse 的桌面管理工具
  - LDAP API 1.x
  - LDAP API 2.x
  - Mavibot - 后端的 KV 存储 - MVCC+BTree
  - Fortress - 基于角色和属性的访问控制授权系统，将管理和密码策略交由后端 LDAP 服务
  - SCIMple
  - Kerby - Java Kerberos
    - 可以独立运行 KDC
    - 包含不少 KDC 工具
- 默认端口
  - 10389 - LDAP
  - 10636 - LDAPs
  - 60088 - Kerberos
  - 60464 - Kerberos 修改密码服务
- 注意
  - 新增域名需要先添加分片, 添加分片后需要重启后生效
  - 部分 schema 是禁用的, 需要在 `ou=schema` 下启用
    - 例如 posixAccount 需要启用 nis , 在 `cn=nis,ou=schema` 中, 把 `m-disable` 设置为 false
- 参考
  - [CreateKeytab.java](https://github.com/kwart/kerberos-using-apacheds/blob/master/src/main/java/org/jboss/test/kerberos/CreateKeytab.java)

```bash
# Docker 启动
# 如果需要 kerberos -p 60088:60088 -p 60464:60464  -p 60088:60088/udp -p 60464:60464/udp
docker run --rm -it -e TZ=Asia/Shanghai \
    -p 10389:10389 -p 10636:10636 \
    -v $PWD/apacheds:/opt/apacheds/instances \
    --name apacheds wener/apacheds

# 测试服务器是否启动成功
ldapmodify -H ldap://127.0.0.1:10389
# 备份现有数据
ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub "(ObjectClass=*)" '*' + > backup.ldif
# 判断用户是否归属组
ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost -b "dc=example,dc=com" -s sub  "(&(objectClass=person)(uid=wener)(memberof=CN=developer,OU=users,DC=example,DC=com))"
```

## Schema

- 所有预定义 [Schema](https://github.com/apache/directory-ldap-api/tree/master/ldap/schema/data/src/main/resources/schema/ou%3Dschema)
- [Enabling Schema](https://directory.apache.org/apacheds/basic-ug/2.3.2-enabling-schema.html)

```bash
alias ldapsearch='ldapsearch -D "uid=admin,ou=system" -w secret -p 10389 -h localhost'

# 查看 Schema
ldapsearch -b "cn=schema" -s base "(objectclass=subschema)" objectclasses
```

```ldif
# 启用 schema
dn: cn=nis,ou=schema
changetype: modify
delete: m-disabled
```

## 手动安装

```bash
# 当前最新版为 2.0.0-M26
ver=2.0.0.M26
wget http://mirrors.aliyun.com/apache/directory/apacheds/dist/$ver/apacheds-$ver.zip
unzip apacheds-$ver.zip
cd apacheds-$ver

# apacheds.sh [<instance name>] <action>
# instance 默认为 default, action 为 run,start,stop,status,repair
# 启动服务
sh ./bin/apacheds.sh run
```
