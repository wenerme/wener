---
tags:
  - Frontend
  - React
---

# Frontend

# FAQ

## 静态前端配置

> 加载 Bootstrap 配置 - 例如 API 地址

1. 构建时根据 branch 加载配置

```ts
import { defineConfig, loadEnv, type PluginOption } from 'vite';
export default defineConfig(({ mode, command }) => {
  const env = {};
  console.log(`Vite ${command} mode=${mode} branch=${process.env.CI_COMMIT_BRANCH || ''}`);
  Object.assign(env, loadEnv(mode, process.cwd(), ''));

  // 加载 .env.branch 覆盖
  if (process.env.CI_COMMIT_BRANCH) {
    Object.assign(env, loadEnv(process.env.CI_COMMIT_BRANCH, process.cwd(), ''));
  }
  process.env = Object.assign(process.env, env);

  return defineConfig({});
});
```

1. 部署时通过覆盖 json 配置
  - 请求 `${location.origin}/config.json` 获取配置
    - 允许配置不存在
    - 部署时可以将 /config.json 重定向
    - 部署时可以将 `/app/public/config.json` 内容进行替换
1. 回滚到 `${location.origin}/api` 作为默认 API 地址
1. 通过请求 API 获取配置
  - SaaS 场景
  - 允许用户输入租户 ID/名字
  - 服务端判断 referer/url 判断返回的配置信息
