---
title: 词汇
tags:
  - Glossary
---

# Auth Glossary

| abbr. | stand for              | mean               |
| ----- | ---------------------- | ------------------ |
|       | two-legged OAuth 2.0   | client_credentials |
|       | three-legged OAuth 2.0 |

| abbr. | stand for                               | meanning           |
| ----- | --------------------------------------- | ------------------ |
| CIAM  | Customer Identity and Access Management | 客户身份和访问管理 |

| en        | cn   | means                             |
| --------- | ---- | --------------------------------- |
| Principal | 主体 | 身份主体 / 当事人                 |
| Subject   | 主体 | 操作主体 / 主语                   |
| Object    | 对象 | 对象 / 宾语 / 权限客体 / Resource |

| term      | 关注点                | 解决的问题     |     角色     |       中文表述       |
| :-------- | :-------------------- | :------------- | :----------: | :------------------: |
| Principal | 认证 (Authentication) | “你是谁？”     | 身份的持有者 |   身份主体、当事人   |
| Subject   | 授权 (Authorization)  | “谁在做事？”   | 动作的发起者 |    操作主体、主语    |
| Object    | 资源 (Resource)       | “你对谁做事？” | 动作的承受者 | 对象、客体、权限受体 |

- Principal 已验证的身份

## ACL 相关对象

- Subject - 访问主体,即进行访问和操作的实体,如用户、组织、设备等
- Object - 被访问的对象或者资源,如数据、文件、系统等
- Action - 允许或者拒绝的操作,如读、写、执行、删除等
- Condition - 访问的条件或者上下文,时间、地点、方式等
- Effect - 授权结果,是允许还是否认访问
- Priority - ACL 规则的优先级顺序

## Subject vs Principal

- Subject
  - 用于 ACL、动态权限、临时授权、主体隔离、代理访问、会话管理、Audit
- Principal
  - 用于 Auth, Permission, Audit
  - 权限委托、责任追究、长会话、身份隔离

---

1. Subject 更广泛,Principal 更明确身份

- Subject 是一个抽象概念,表示执行动作的主体,可以是用户、进程、服务等
- Principal 强调是一个验证过的身份,通常是一个指定的用户。
  - 强调正在进行 Auth

2. Subject 主动发起,Principal 被动绑定

- Subject 更侧重主动行为主体,Principal 更侧重已经验证通过的身份。

3. Subject 关注当前状态,Principal 关注持久标识

Subject 通常指当前发起请求的临时状态。Principal 是对一个持久身份的标识,不会频繁变更。

4. ACL 中主要使用 Subject
   在访问控制列表(ACL)中,通常直接使用 Subject 来表示访问和操作主体。Principal 在授权验证中更常使用。

5. Subject 更抽象,Principal 更具体
   Subject 可以表示不同类型的访问主体,Principal 通常指定唯一的用户身份。

## SWT token

- Simple Web Token
- OAuth 2.0 RFC6749
- https://www.networknt.com/architecture/swt-vs-jwt/
- [netlify/gotrue](https://github.com/netlify/gotrue)

## IdP - Identity Provider

- 提供认证信息
  - 例如 用户可以使用账号密码登陆
- 实际存放用户信息

## IdM - Identity Management - 身份管理

- [Identity management](https://en.wikipedia.org/wiki/Identity_management)

## IdAM - IAM - Identity and Access Management - 身份访问管理

## SAML - Security Assertion Markup Language - 安全断言标记语言

- 支持认证和授权
- principal - 例如 终端用户
- service provider - 例如 网站，principal 尝试访问
- identity provider - 持有 principal 认证和授权信息的服务

## bearer token - 不记名令牌

bearer (who hold the access token) can access authorized resources without further identification

access token 为 bearer token

## id token - 身份令牌

contains Claims(claims are name/value pairs that contain information about a user) about the Authentication of an End-User by an Authorization Server
