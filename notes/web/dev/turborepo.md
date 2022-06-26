---
title: turborepo
---

# turborepo

- [vercel/turborepo](https://github.com/vercel/turborepo)
  - 类似 nx，但支持多 package；类似 bazel
  - 适用于 monorepo 构建
  - 支持缓存、依赖
- node_modules/.cache/turbo

```bash
npx -y create-turbo@latest
cd my-turborepo/
npm run dev
npm run build

# 添加到已有项目
npm install turbo -D

# 运行定义的 pipeline
turbo run build
turbo run dev --parallel
turbo run lint

# vercel remote cache
npx turbo login
# team remote cache
npx turbo login --sso-team=<team-slug>
```

```json title="turbo.json"
{
  "$schema": "https://turborepo.org/schema.json",
  "baseBranch": "origin/main"
}
```

**starter**

- /apps/
  - web/
  - docs/
- /packages/
  - ui/
  - config/ - eslint
  - tsconfig/

## 缓存

- 缓存输出的文件和命令执行的输出
- `.turbo/run-<command>.log`
- `node_modules/.cache/turbo`
- 环境变量 TURBO_HASH 依据
  - inputs, package.json 中依赖, 内部依赖
  - 任务名字
  - dependsOn
  - lockfile

```bash
turbo run build --force             # 强制 - 忽略存在缓存
turbo run dev --parallel --no-cache # 不缓存
```

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      // 缓存内容
      "outputs": ["dist/**", ".next/**"],
      // 缓存依据
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"],
      // 缓存依赖 ENV
      "dependsOn": ["^build", "$SOME_ENV_VAR"]
    },
    "test": {
      // 只缓存日志
      "outputs": [],
      "dependsOn": ["build"]
    },
    "dev": {
      // dev 不缓存
      "cache": false
    }
  },
  // 全局依赖
  "globalDependencies": ["$GITHUB_TOKEN", "tsconfig.json", ".env.*"]
}
```

## turborepo-remote-cache

> **Note**
>
> local 存储会添加 /tmp 前缀到 STORAGE_PATH [src/plugins/remote-cache/storage/local.ts](https://github.com/fox1t/turborepo-remote-cache/blob/main/src/plugins/remote-cache/storage/local.ts)

```bash
docker run \
  -v $PWD/cache:/cache --env-file=.env \
  -p 3000:3000 \
  --name turborepo-remote-cache fox1t/turborepo-remote-cache

# npx 启动
# npx turborepo-remote-cache
```

```env
# development
NODE_ENV=production
PORT=3000
TURBO_TOKEN=
LOG_LEVEL=info
# s3
STORAGE_PROVIDER=local
STORAGE_PATH=/cache
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
S3_ENDPOINT=
```

```bash
# --api
turbo run build --token=$TURBO_TOKEN
```

```json title=".turbo/config.json"
{
  "teamId": "team_FcALQN9XEVbeJ1NjTQoS9Wup",
  "apiUrl": "http://localhost:3000"
}
```

- [fox1t/turborepo-remote-cache](https://github.com/fox1t/turborepo-remote-cache)
  - open-source implementation of the Turborepo custom remote cache server
- [remote-caching](https://turborepo.org/docs/core-concepts/remote-caching)
