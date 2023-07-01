---
title: Keycloak Authz
---

# Keycloak Authz

- [授权服务](https://www.keycloak.org/docs/latest/authorization_services/)
- 访问控制方式 / Policy
  - ABAC - Attribute-based access control - 基于属性
  - RBAC- Role-based access control - 基于角色
  - UBAC - User-based access control - 基于用户
  - CBAC - Context-based access control - 基于上下文
  - Rule-based access control - 基于规则
    - 可以使用 JavaScript
  - Time-based access control - 基于时间
  - 通过策略 SPI (Service Provider Interface) 自定义访问控制机制 (ACMs - access control mechanisms)

| abbr | detail                      | role                   |
| ---- | --------------------------- | ---------------------- |
| PAP  | Policy Administration Point | Admin UI               |
| PDP  | Policy Decision Point       | Authorization Services |
| PEP  | Policy Enforcement Point    | 请求拦截               |
| PIP  | Policy Information Point    | 策略信息               |
| RTP  | Requesting party token      |

- 授权流程
  - 资源管理
    - 创建资源服务 / Resource Server
    - 创建资源 / Resource
      - 例如 URL PATH, UUID, ID
    - 创建和关联资源域 / Scope
      - 一般关联 Action+Resource
      - 可以通过资源属性定义
  - 权限和策略管理
    - 创建策略 / Policy
      - 例如 要求匹配 资源和 Scope
      - 支持 JavaScript 定义策略
    - 定义权限 / Permission
      - Resource + Scope + Policy -> grant/deny
    - 应用策略到权限
  - Policy Enforcement
    - 在服务中添加拦截，请求 Keycloak 进行鉴权
- [Authorization Services](https://www.keycloak.org/docs/latest/authorization_services/#_service_overview) - 授权服务 - 提供接口给后端进行权限交互
  - Token Endpoint
    - Token 包含策略信息
    - RPT - Requesting Party Token
  - Resource Management Endpoint
    - 资源管理 - 创建、删除、FindByID、Query
  - Permission Management Endpoint
    - Issue Permission Tickets
- 资源/Protection API
  - 满足 [UMA](https://docs.kantarainitiative.org/uma/wg/oauth-uma-federated-authz-2.0-09.html) 规范定义的资源标识符
  - 需要 uma_protection scope
- 权限/Permission
  - 权限决策策略
    - Unanimous - 默认 - 所有都允许
    - Affirmative - 至少一个允许
    - Consensus - 至少一半以上允许

```js
// 拒绝
$evaluation.deny();
// 允许
$evaluation.grant();
```

```java
public interface Evaluation {

    /**
     * Returns the {@link ResourcePermission} to be evaluated.
     *
     * @return the permission to be evaluated
     */
    ResourcePermission getPermission();

    /**
     * Returns the {@link EvaluationContext}. Which provides access to the whole evaluation runtime context.
     *
     * @return the evaluation context
     */
    EvaluationContext getContext();

    /**
     * Returns a {@link Realm} that can be used by policies to query information.
     *
     * @return a {@link Realm} instance
     */
    Realm getRealm();

    /**
     * Grants the requested permission to the caller.
     */
    void grant();

    /**
     * Denies the requested permission.
     */
    void deny();
}

public interface EvaluationContext {
    /**
     * Returns the {@link Identity} that represents an entity (person or non-person) to which the permissions must be granted, or not.
     *
     * @return the identity to which the permissions must be granted, or not
     */
    Identity getIdentity();
    /**
     * Returns all attributes within the current execution and runtime environment.
     *
     * @return the attributes within the current execution and runtime environment
     */
    Attributes getAttributes();
}
```

**Attributes**

| name                         | type     | desc                                        |
| ---------------------------- | -------- | ------------------------------------------- |
| kc.time.date_time            | String   | Current date and time - MM/dd/yyyy hh:mm:ss |
| kc.client.network.ip_address | String   | IPv4 address of the client                  |
| kc.client.network.host       | String   | Client’s host name                          |
| kc.client.id                 | String   | The client id                               |
| kc.client.user_agent         | String[] | The value of the 'User-Agent' HTTP header   |
| kc.realm.name                | String   | The name of the realm                       |

## PEP

- [Policy Enforcers](https://www.keycloak.org/docs/latest/authorization_services/#_enforcer_overview)

## UMA

- [Managing Resource Permissions using the Policy API](https://www.keycloak.org/docs/latest/authorization_services/index.html#_service_authorization_uma_policy_api)

```
http://${host}:${port}/auth/realms/${realm_name}/authz/protection/uma-policy/{resource_id}
```

## Example

- https://github.com/keycloak/keycloak-quickstarts/blob/latest/app-authz-uma-photoz/photoz-realm.json

| Resource              | Type                      | URI        | Scopes                      |
| --------------------- | ------------------------- | ---------- | --------------------------- |
| Admin Resources       | http://photoz.com/admin   | `/admin/*` | admin:manage                |
| User Profile Resource | http://photoz.com/profile | /profile   | profile:view                |
| Album Resource        | http://photoz.com/album   | `/album/*` | album:delete<br/>album:view |

**Policies**

- Only Owner and Administrators Policy
  - type=aggregate AFFIRMATIVE
  - Administration Policy,Only Owner Policy
- Administration Policy
  - type=aggregate
  - Any Admin Policy,Only From a Specific Client Address
- Only Owner Policy
  - script-only-owner.js
- Any Admin Policy
  - type=role logic=POSITIVE
  - roles=admin
- Only From a Specific Client Address
  - script-only-keycloak-domain-or-admin.js
- Any User Policy
  - type=role logic=POSITIVE
  - roles=user,photoz-restful-api/manage-albums
- Admin Resource Permission
  - type=resource logic=POSITIVE
  - defaultResourceType=http://photoz.com/admin
  - default=true
- Album Resource Permission
  - type=scope logic=POSITIVE
  - scopes=album:view,album:delete
  - resources=Album Resource
- View User Permission
  - type=scope logic=POSITIVE
  - scopes=profile:view

## Permission

```json
{
  "grant_type": "urn:ietf:params:oauth:grant-type:uma-ticket",
  "audience:": "resource_server_client_id",
  "permission": ["Resource A#Scope A"],
  "ticket": "permission_ticket"
}
```

```json
{
  "access_token": "${rpt}"
}
```

- Requesting party token

```json
{
  "authorization": {
    "permissions": [
      {
        "resource_set_id": "d2fe9843-6462-4bfc-baba-b5787bb6e0e7",
        "resource_set_name": "Hello World Resource"
      }
    ]
  }
}
```
