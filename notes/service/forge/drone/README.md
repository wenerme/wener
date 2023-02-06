---
title: drone
---

# drone

- [harness/drone](https://github.com/harness/drone)

> **Note** 开发不活跃

:::tip

- drone 命令行工具功能相对完善

:::

:::caution

- 在没有 build 之前无法创建 build
- UI 上如果没权限会直接异常 - 空白
- 注册的第一个账号不会被认为是 admin
  - 手动修改 `update users set user_admin=1 where user_login='drone';`
  - 或者 记得设置 DRONE_USER_CREATE=username:password,admin:true
- 没地方看当前账号的名字是什么
- kubernetes runner 还处于 **实验阶段** - 不推荐
- exec runner 不维护了，无法使用
  - 插件机制依赖 image 运行
- kubernetes secrets 需要额外定义 secret 资源，需要 name+key
- 有些文档在 https://docs.drone.io/ 侧栏看不到

:::

## server

```ini
# 必须 - 预生产
DRONE_RPC_SECRET=
# 服务信息 - 用于配置 webhook 之类
DRONE_SERVER_HOST=
DRONE_SERVER_PROTO=

# 代码仓库
DRONE_GITEA_CLIENT_ID=
DRONE_GITEA_CLIENT_SECRET=
DRONE_GITEA_SERVER=

#
DRONE_GIT_ALWAYS_AUTH=
DRONE_GIT_USERNAME=
DRONE_GIT_PASSWORD=

# 可修改使用的数据库 - 默认使用 sqlite
DRONE_DATABASE_DRIVER=postgres
DRONE_DATABASE_DATASOURCE=postgres://root:password@1.2.3.4:5432/postgres?sslmode=disable

# 使用 s3 存储 build log - 默认存储在 sqlite
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_REGION=

DRONE_S3_BUCKET=logs
```

- https://docs.drone.io/server/reference/

## drone cli

```bash
# brew install drone
curl -L https://github.com/harness/drone-cli/releases/latest/download/drone_darwin_amd64.tar.gz | tar zx
install -t ~/bin drone

export DRONE_SERVER=https://drone.example.com
export DRONE_TOKEN=
drone info

# --branch=main --event=pull_request
# --trusted 提高权限
drone exec                                     # 本地执行 .drone.yml
drone exec --pipeline=test                     # 执行单个 step - 支持 --include,--exclude
drone exec --secret-file=.env.local            #
DRONE_SYSTEM_HOST=drone.company.com drone exec #
```

```bash
# 用 orgsecret 能简化一些配置
drone orgsecret add org DOCKER_REGISTRY http://registry.example.com
drone orgsecret add org DOCKER_REGISTRY_USER user
drone orgsecret add org DOCKER_REGISTRY_PASSWORD user
```

# FAQ

## No stage specified, assuming 'default'

```bash
drone exec
```

## trigger: skipping build, no matching pipelines

删除 trigger

## cannot accept stage error="Optimistic Lock Error"

一般不影响，并发错误。

## could not read Username

:::caution

- exec runner 现在用不了

:::

DRONE_GIT_ALWAYS_AUTH=true

- https://community.harness.io/t/fatal-could-not-read-username-for/10998
- https://community.harness.io/t/solved-fatal-could-not-read-username-for-fqdn-terminal-prompts-disabled-gitea/11663
  - gitea 需要把用户 add 到 org
- https://github.com/appleboy/drone-git-push/issues/49

**~/.netrc**

```.netrc
machine github.com
login technoweenie
password SECRET

machine api.github.com
login technoweenie
password SECRET
```

## http: no content returned: re-connect and re-try
