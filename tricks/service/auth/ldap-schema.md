---
id: ldap-schema
title: LDAP Schema
---

# LDAP Schema

- [Combined Active Directory Schema Classes and Attributes for Windows Server](https://www.microsoft.com/en-us/download/details.aspx?id=23782)
  - ldf 格式
  - 用于参考，包含可多 AD DS 操作属性
- [Active Directory to OpenLdap](https://github.com/dkoudela/active-directory-to-openldap)
  - 将 Active Directory 转为 OpenLdap

| 字段 | 全称                | 含义                       |
| ---- | ------------------- | -------------------------- |
| dn   | distinguished name  | 专有名称                   |
| cn   | Common Name         | 通用名、全名               |
| dc   | Domain Component    | wener.me -> dc=wener,dc=me |
| ou   | Organizational Unit | 组织单位                   |
| sn   | surname             | 姓                         |

- inetOrgPerson
  - 常用的组织用户类

cn
person, organizationalPerson, user

uid
inetOrgPerson, organizationalPerson

```ldif
# 陈小明
dn: uid=chenxiaoming,ou=users,dc=incos
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: person
objectClass: top
cn: 陈小明
sn: 陈
uid: chenxiaoming
```

## inetOrgPerson

| Attribute        | Meaning                       |
| ---------------- | ----------------------------- |
| uid              | 唯一标识                      |
| initials         | 首字母                        |
| sn               | 姓                            |
| givenName        | 名                            |
| cn               | 名字、全名                    |
| displayName      | 昵称、显示名称                |
| mail             |
| telephoneNumber  |
| mobile           |
| roomNumber       |
| carLicense       |
| title            | 职位                          |
| employeeNumber   | 工号                          |
| employeeType     | 员工类型，例如 正式员工，兼职 |
| o                | 公司名称                      |
| ou               | 部门名称                      |
| departmentNumber | 部门编号                      |
| jpegPhoto        | 头像、二进制数据              |
| photo            | 头像地址                      |
| manager          | 主管                          |
