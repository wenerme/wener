---
id: apacheds-ops
title: ApacheDS 运维
---

# ApacheDS 运维

## ApacheDS 目录设计

- DN
  - ou=users - 用户
    - uid=test.cs
  - ou=groups - 分组、组织架构
    - uid=company
      - objectclass: groupOfNames
  - ou=roles - 角色
    - uid=admin
      - objectclass: groupOfNames
  - ou=services - 服务账号
    - uid=keycloak
    - uid=nextcloud
  - dc=security - 安全相关
    - ou=services - 安全服务
      - uid=krbtgt
        - krb5PrincipalName: krbtgt/EXAMPLE.COM@EXAMPLE.COM
        - userPassword: randomKey
      - uid=kpasswd
        - krb5PrincipalName: kadmin/changepw@EXAMPLE.COM
      - uid=ldap
        - krb5PrincipalName: ldap/example.net@EXAMPLE.COM
- 类选择
  - 主体 inetOrgPerson
    - 参照 [rfc2798](https://tools.ietf.org/html/rfc2798) 选用属性
  - 分组 groupOfNames
  - 角色 groupOfNames
- 属性选择
  - uid 用于唯一标示
    - uid 不是 inetOrgPerson 强制属性
    - cn 和 sn 是强制属性

```ldif
# 创建基础结构 - 可替换 basedn dc=example,dc=com
dn: ou=users,dc=example,dc=com
objectclass: organizationalUnit
ou: users

dn: ou=groups,dc=example,dc=com
objectclass: organizationalUnit
ou: groups

dn: ou=roles,dc=example,dc=com
objectclass: organizationalUnit
ou: roles

dn: ou=services,dc=example,dc=com
objectclass: organizationalUnit
ou: services

dn: dc=security,dc=example,dc=com
objectclass: domain
dc: security

dn: ou=services,dc=security,dc=example,dc=com
objectclass: organizationalUnit
ou: services
```

## 删除默认分区

```bash
# 递归删除配置
ldapdelete -r -H ldap://localhost:10389 -D uid=admin,ou=system -w secret ads-partitionId=example,ou=partitions,ads-directoryServiceId=default,ou=config
```

## 修改默认密码

```ldif
# 修改默认 admin 密码
dn:uid=admin,ou=system
changetype: modify
replace: userPassword
# 新的密码
userPassword: secret
```

## Nextcloud LDAP

```bash
./occ ldap:show-config s01
```

| Configuration                 | s01                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| hasMemberOfFilterSupport      |                                                                                         |
| homeFolderNamingRule          |                                                                                         |
| lastJpegPhotoLookup           | 0                                                                                       |
| ldapAgentName                 | uid=admin,ou=system                                                                     |
| ldapAgentPassword             | secret                                                                                  |
| ldapAttributesForGroupSearch  |                                                                                         |
| ldapAttributesForUserSearch   |                                                                                         |
| ldapBackupHost                |                                                                                         |
| ldapBackupPort                |                                                                                         |
| ldapBase                      | dc=example,dc=com                                                                       |
| ldapBaseGroups                | ou=groups,dc=example,dc=com                                                             |
| ldapBaseUsers                 | ou=users,dc=example,dc=com                                                              |
| ldapCacheTTL                  | 600                                                                                     |
| ldapConfigurationActive       | 1                                                                                       |
| ldapDefaultPPolicyDN          |                                                                                         |
| ldapDynamicGroupMemberURL     |                                                                                         |
| ldapEmailAttribute            | mail                                                                                    |
| ldapExperiencedAdmin          | 0                                                                                       |
| ldapExpertUUIDGroupAttr       | enrtyUUID                                                                               |
| ldapExpertUUIDUserAttr        | enrtyUUID                                                                               |
| ldapExpertUsernameAttr        | uid                                                                                     |
| ldapExtStorageHomeAttribute   |                                                                                         |
| ldapGidNumber                 | gidNumber                                                                               |
| ldapGroupDisplayName          | cn                                                                                      |
| ldapGroupFilter               | (objectclass=groupOfNames)                                                              |
| ldapGroupFilterGroups         |                                                                                         |
| ldapGroupFilterMode           | 1                                                                                       |
| ldapGroupFilterObjectclass    | inetOrgPerson                                                                           |
| ldapGroupMemberAssocAttr      | member                                                                                  |
| ldapHost                      | ldap://192.168.1.1                                                                      |
| ldapIgnoreNamingRules         |                                                                                         |
| ldapLoginFilter               | `(&(|(objectclass=inetOrgPerson))(|(uid=%uid)(|(mailPrimaryAddress=%uid)(mail=%uid))))` |
| ldapLoginFilterAttributes     |                                                                                         |
| ldapLoginFilterEmail          | 1                                                                                       |
| ldapLoginFilterMode           | 0                                                                                       |
| ldapLoginFilterUsername       | 1                                                                                       |
| ldapNestedGroups              | 1                                                                                       |
| ldapOverrideMainServer        |                                                                                         |
| ldapPagingSize                | 500                                                                                     |
| ldapPort                      | 10389                                                                                   |
| ldapQuotaAttribute            |                                                                                         |
| ldapQuotaDefault              |                                                                                         |
| ldapTLS                       | 0                                                                                       |
| ldapUserAvatarRule            | default                                                                                 |
| ldapUserDisplayName           | cn                                                                                      |
| ldapUserDisplayName2          | displayname                                                                             |
| ldapUserFilter                | (objectclass=inetOrgPerson)                                                             |
| ldapUserFilterGroups          |                                                                                         |
| ldapUserFilterMode            | 1                                                                                       |
| ldapUserFilterObjectclass     | inetOrgPerson                                                                           |
| ldapUuidGroupAttribute        | auto                                                                                    |
| ldapUuidUserAttribute         | auto                                                                                    |
| turnOffCertCheck              | 0                                                                                       |
| turnOnPasswordChange          | 0                                                                                       |
| useMemberOfToDetectMembership | 1                                                                                       |

## 分区


```ldif

```
