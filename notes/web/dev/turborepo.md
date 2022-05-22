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

## turborepo-remote-cache

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
