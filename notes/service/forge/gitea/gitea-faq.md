---
tags:
  - FAQ
---

# Gitea FAQ

:::caution

- AccessToken 目前无法限定 org/repo
  - Organization and Repository level access token [gitea#25900](https://github.com/go-gitea/gitea/issues/25900)
  - Permissions for package repositories [gitea#20596](https://github.com/go-gitea/gitea/issues/20596)
- Action 目前不能手动触发
  - Actions - Manually trigger a workflow/action [gitea#23668](https://github.com/go-gitea/gitea/issues/23668)

:::

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

## exit status 128 - fatal: protocol error: bad line length character: 4?

- git push 时发生
