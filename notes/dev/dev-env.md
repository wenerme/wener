---
title: ENV
---

# 环境变量

- 运行环境 - 分支可能对应了运行环境
  - 开发环境
  - 测试环境
  - 预发布环境
  - 生产环境
  - 性能测试环境
- 运行模式
  - production
  - development
  - test
- env - 环境
- profile - 配置文件/配置轮廓
  - --spring.profiles.active
- envrionment variable - 环境变量

| abbr. | for                        | cn                   |
| ----- | -------------------------- | -------------------- |
|       | staging                    | 预发布               |
| dev   | development                | 开发                 |
| prod  | production                 | 生产                 |
| test  | test/testing               | 测试                 |
| perf  | performance                | 性能测试             |
| bench | benchmark                  | 基准测试             |
| sit   | System Integration Testing | 系统集成测试, 由公司 |
| uat   | User Acceptance Testing    | 用户验收测试, 由用户 |
|       | next                       | 下一个版本           |
|       | alpha                      | 内部测试             |
|       | beta                       | 公测                 |
| ga    | general availability       | 正式发布             |
| rc    | release candidate          | 发布候选版本         |
| cr    | code review                | 代码审查             |
|       | stable                     | 稳定版本             |
| EAP   | Early Access Program       | 早期访问计划         |

- 开发->测试->上线
- SIT -> UAT
- 面向生命周期
  - 开发、测试、预发布、生产、性能测试
  - dev/test/staging/prod/perf
  - local/development/staging/production/testing
  - dev/test/staging/prod
  - development/test/stage/produciton
  - 预发布 - staging/pre/next
  - 性能测试 - performance/perf/benchmark/bench
- 面向环境
  - region
  - zone

---

- APP_ENV
  - larval - local, production, testing
    - https://github.com/laravel/framework/blob/5.8/src/Illuminate/Foundation/Application.php
- NODE_ENV - production, development, test - 运行模式
  - https://github.com/kerimdzhanov/dotenv-flow
  - process.env https://nodejs.org/api/process.html#process_process_env
- SPRING_PROFILES_ACTIVE,spring.profiles.active
- [.NET](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/environments)
  - DOTNET_ENVIRONMENT
  - ASPNETCORE_ENVIRONMENT
- NEXT_PUBLIC_VERCEL_ENV, [VERCEL_ENV](https://vercel.com/docs/projects/environment-variables/system-environment-variables)
  - production, preview, development
- https://docs.digitalocean.com/products/app-platform/how-to/use-environment-variables/
  - APP_DOMAIN, APP_URL, APP_ID
- `__DEV__` 变量 - 运行模式
  - 由 RN 引入 https://reactnative.dev/docs/javascript-environment
  - ReactRouter 也使用了这个变量 https://github.com/search?q=repo%3Aremix-run%2Freact-router%20__DEV__&type=code
    - 通过 rollup 注入了变量
- `__PROD__` 变量
- import.meta.env
  - by Vite

## vars

- NO_COLOR - 关闭彩色输出
- DNT - Do Not Track - 关闭 Telemetry

# FAQ


## 静态前端配置 {#static-frontend-config}

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
1. 在前端配置所有 domain -> config 的配置，根据当前域名加载配置
1. 基于 当前域名 按照规则生成 api 地址
1. 回滚到 `${location.origin}/api` 作为默认 API 地址
1. 通过请求 API 获取配置
  - SaaS 场景
  - 允许用户输入租户 ID/名字
  - 服务端判断 referer/url 判断返回的配置信息
