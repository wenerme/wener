---
title: KeyCloak LDAP
tags:
  - LDAP
---

# KeyCloak LDAP

:::caution

- Sync 在 KC 添加的用户不会同步到 LDAP
  - registration 可以
- 导入属性 - 不可修改
  - LDAP_ENTRY_DN
  - LDAP_ID
  - modifyTimestamp
  - createTimestamp
- 修改密码开启后可同步
  - 虽然 KC 后台看到是 No credentials

:::

- 映射
  - Users
  - Groups
    - Mapped Group Attributes - 可映射额外属性
      - displayName,description
  - Roles
    - 没有额外属性可映射

---

- Full sync period - 604800
- Changed users sync period - 86400
- LDAPv3 password modify extended operation
- https://github.com/keycloak/keycloak/tree/main/examples/ldap
- https://www.keycloak.org/docs/latest/server_admin/#_ldap_password_hashing

### group-ldap-mapper

- 分组映射
- 注意
  - 不能有同名组，会导致无法同步回 Keycloak
  - LDAP 无法识别同名组

| 选项                                 | 翻译                  | 说明                                                                      |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------- |
| LDAP Groups DN                       | 分组 DN               | 例如 `ou=groups,dc=wener,dc=me`                                           |
| Group Name LDAP Attribute            | LDAP 属性 -> 分组名字 |
| Group Object Classes                 | 对象类                | `groupOfNames` `groups`                                                   |
| Preserve Group Inheritance           | 保留层级              | 如果不保留，则同步后都是顶级<br/>如果保留，存在相同名字分组会导致同步异常 |
| Ignore Missing Groups                | 忽略缺少分组          |
| Membership LDAP Attribute            | 表示成员的 LDAP 属性  | 例如 `member`                                                             |
| Membership Attribute Type            | 成员属性类型          | DN UID                                                                    |
| Membership User LDAP Attribute       | 成员用户 LDAP 属性    | UID 模式则使用该字段表示，一般为 `uid`                                    |
| LDAP Filter                          | 过滤条件              |
| Mode                                 | 模式                  | LDAP_ONLY,IMPORT,READ_ONLY                                                |
| User Groups Retrieve Strategy        | 查询策略              |
| Member-Of LDAP Attribute             | memberOf 属性         |
| Mapped Group Attributes              | 映射属性              | 例如 `description,ou,o`                                                   |
| Drop non-existing groups during sync | 同步删除不存在分组    | LDAP 到 Keycloak 时候                                                     |
