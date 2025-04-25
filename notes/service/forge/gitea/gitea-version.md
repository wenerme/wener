---
tags:
  - Version
---

# Gitea Version

| version    | date       |
| ---------- | ---------- |
| Gitea 1.23 | 2025-01-09 |
| Gitea 1.22 | 2024-05-04 |
| Gitea 1.21 | 2023-11-12 |
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

- Package Registry TODO [#19270](https://github.com/go-gitea/gitea/issues/19270)
- Audit Log
  - https://github.com/go-gitea/gitea/issues/8
  - https://github.com/go-gitea/gitea/pull/24257

:::

## Gitea 1.23

- SSH RSA signing 移除 SHA1
- API `/admin` -> `/-/admin`
- 支持禁用密码登陆
- 支持 Passkey 登陆
- Repository
  - 支持 License 显示
  - 支持 "merge upstream branch" (Sync fork)
  - 支持 Tag 搜索
  - 支持 pure SSH LFS
- Actions
  - 默认删除 1年前的 action 日志
  - 现在默认会压缩 action 日志
  - 支持 workflow dispatch event - 手动触发
- Packages
  - 支持 Arch 包

## Gitea 1.22

- 不需要配置缓存也能搜索
- 支持 SHA256 仓库
- 支持 组织 profile 页面
  - 使用 `.profile` 仓库
- Actions
  - 提供 actions 的 runner-image
    - https://gitea.com/gitea/runner-images
  - Artifacts v4 backend
  - 支持 `[skip ci]`
  - 支持全局变量
- 管理
  - 可以禁用用户功能 - `[admin]USER_DISABLED_FEATURES=` - deletion,manage_ssh_keys,manage_gpg_keys
- OFFLINE_MODE=false
  - 之前默认 true
- LOGIN_REMEMBER_DAYS=30
  - 记住登录保留 30 天
  - 之前默认 7 天
- 依赖变化
  - MySQL 5.7 → MySQL 8.0
  - PostgreSQL 10 → PostgreSQL 12
  - MSSQL 2008 → MSSQL 2012
- Markdown Callout/Alter 语法变化
  - `> **Note** My note` -> `> [!NOTE]\n> My note`
  - https://github.com/go-gitea/gitea/pull/29121

## Gitea 1.21

- gitea action
  - 支持 cron [#26655](https://github.com/go-gitea/gitea/pull/26655)
  - variables - 不隐藏，`${{vars.XYZ}}`
  - auto-cancellation of concurrent jobs if the event is push
- 支持 `.git-blame-ignore-revs`
- direct serving of package content
- package cleanup from admin page
- codeowners
  - `./CODEOWNERS`
  - `./docs/CODEOWNERS`
  - `./.gitea/CODEOWNERS`
  - `<regexp rule> <@user or @org/team> [@user or @org/team]...`
  - regex 可以以 `!` 开头，表示排除
  - https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
  - https://docs.gitlab.com/ee/user/project/codeowners/

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
