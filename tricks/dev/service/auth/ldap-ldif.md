---
id: ldif
title: LDIF
---


# LDIF

## Tips
* [RFC2849 The LDAP Data Interchange Format (LDIF)](https://tools.ietf.org/html/rfc2849)
* 每条记录都通过 dn 指向一个对象
* 每个对象之间使用空行分割
* 每行可以包含
  * LDAP 属性
  * changetype
    * add - 添加 Entry - 默认
    * delete - 删除 Entry
    * modify - 修改属性 - 对属性增删也是使用 modify
    * moddn/modrdn - 移动 Entry
  * 修改操作 - `changetype: modify`
    * add, delete, replace
  * 注释 `#`
  * 分割 `-` 操作

```ldif
# 新增 - 默认为新增
dn: ou=users,dc=home
changetype: add
objectclass: inetOrgPerson
cn: 陈小明
sn: 小明
uid: cxm

dn: uid=cxm,ou=users,dc=home
# 修改 DN
changetype: moddn
newrdn: uid=c
# 删除之前 DN
deleteoldrdn: 1
# 修改上级
newsuperior: ou=admins,dc=home

dn: cn=c,ou=users,dc=home
changetype: modify
add: telephoneNumber
telephoneNumber: +123 456 789
-
delete: sn
-
replace: description
description: Wener

# 添加一条属性
dn: cn=Paula Jensen, ou=Product Development, dc=airius, dc=com
changetype: modify
add: postaladdress
postaladdress: 123 Anystreet $ Sunnyvale, CA $ 94086
```
