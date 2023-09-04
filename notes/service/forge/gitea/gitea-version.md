---
tags:
  - Version
---

# Gitea Version

| version    | date       |
| ---------- | ---------- |
| Gitea 1.20 | 2023-07-16 |
| Gitea 1.19 | 2023-03-20 |
| Gitea 1.18 | 2022-10-29 |

:::tip

- 支持 GITEA_TOKEN 登录 docker - [#23642](https://github.com/go-gitea/gitea/issues/23642)

```yaml
- name: Log in to the Container registry
  uses: docker/login-action@v2
  with:
    registry: my.gitea.domain
    username: ${{ github.repository_owner }}
    password: ${{ secrets.GITEA_TOKEN }}
```

- action 支持 cron [#26655](https://github.com/go-gitea/gitea/pull/26655)
  - v 1.21
- 支持手动触发 action [#23668](https://github.com/go-gitea/gitea/issues/23668)
- action badge [#23688](https://github.com/go-gitea/gitea/issues/23688)
- Package Registry TODO [#19270](https://github.com/go-gitea/gitea/issues/19270)
- 1.21 [#25123](https://github.com/go-gitea/gitea/issues/25123)
- git sha256 [#13794](https://github.com/go-gitea/gitea/issues/13794)

:::

## Gitea 1.20

- package
  - Alpine
  - CRAN
  - Debian
  - Go
  - RPM
  - Swift
- actions
  - 支持 needs, outputs
- User webhooks
- https://blog.gitea.com/release-of-1.20.0/

## Gitea 1.19

- PTA scope
- 个人设置/仓库设置 - 支持配置清理逻辑,容量限制
- 新增仓库 Cargo, Chef, Conda
- 用户名
  - `[-._a-zA-Z0-9]`
  - 不能以 `-._` 开头和结尾
  - 不能连续出现 `-._`
- Gitea Actions
  - `.gitea/workflows/<workflow name>.yaml`
  - `.github/workflows/<workflow name>.yaml`
  - 新增 Secrets
- LFS GC
- Reply by email

## Gitea 1.18

- 新增仓库
  - Chocolatey/NuGet v2 API (.NET)
  - Vagrant
  - npm unpublish (JS/TS)
  - Pub packages (Dart)
- Issue forms and PR forms
- User/organization code search
- system_setting 配置表

## Gitea 1.17

- 支持 package
  - Composer, Conan, Generic, Helm, Maven, npm, NuGet, OCI Containers (Docker), PyPI and RubyGems
  - https://docs.gitea.io/en-us/packages/overview/
