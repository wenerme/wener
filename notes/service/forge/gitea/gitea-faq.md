---
tags:
  - FAQ
---

# Gitea FAQ

## OIDC Mapping

```env
GITEA__service__DISABLE_REGISTRATION=true
GITEA__service__ALLOW_ONLY_EXTERNAL_REGISTRATION=true
```

- Keycloak
  - 新建 `gitea` Client Mapper
    - 映射 claims `gitea_groups` -> 用户属性 `GITEA_GROUPS`, 值为 JSON
  - User
    - `GITEA_GROUPS=["admin","wener"]`
- Gitea
  - 自动发现 `https://wener.me/realms/wener/.well-known/openid-configuration`
  - 附加授权范围（Scopes）
    - `openid email profile gitea`
  - 用于提供用户组名称的 Claim 声明名称
    - `gitea_groups`
  - 管理员用户组的 Claim 声明值
    - `admin`
  - 映射声明的组到组织团队
    - `{"wener":{"wener":["owners"]}}`
      - 映射 wener 组为 wener 组织的 owners 团队

## Trigger Mirror Sync / WebHook

```bash
curl -X POST https://gitea.com/api/v1/repos/{owner}/{repo}/mirror-sync?token={pta}
```
