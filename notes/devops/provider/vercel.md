# Vercel

## Tips

- [价格](https://vercel.com/pricing)/[限制](https://vercel.com/docs/concepts/limits/overview)
  - Free
    - 100 部署/天
    - Serverless Functions 12/部署
    - Serverless Functions 10s 执行时间
      - 没有后台执行概念
      - Pro 60s Enterprise 900s
    - 3 Git Repository/Vercel Project
    - 内存 1024 MB
    - 50 自定义域名
    - 100 GB 带宽每月
- Serverless Function
  - 单个 < 50MB
  - 解压后 < 250MB
  - 消息体 5MB
  - 并发 1000
- [Fair Use Policy](https://vercel.com/docs/platform/fair-use-policy)
  - JAM 站点和应用
  - 前端
  - SPA
  - Functions that query DBs or APIs
  - 博客、电商、营销
- 问题
  - [#4910](https://github.com/vercel/vercel/discussions/4910) - Yarn2 build failed
  - [#4029](https://github.com/vercel/vercel/discussions/4029) - 价格调整
- 注意
  - Vercel 可以本地部署静态，但无法部署 nextjs 项目
  - 不支持 yarn2
  - 不支持 WebSocket
- [运行时](https://vercel.com/docs/runtimes)
  - NodeJS
  - Go
  - Python
  - Ruby

```bash
# 全局安装
npm i vercel -g
# 或直接执行
yarn dlx vercel
npx vercel

# 登陆
yarn dlx vercel login

# 部署
# .vercel 目录会记录项目信息 - 默认会加到 .gitignore
yarn dlx vercel
```

## 配置

- [](https://vercel.com/docs/configuration)

```json
{
  "version": 2,
  "name": "my-app",
  "alias": ["my-domain.com", "my-alias"],
  "scope": "my-team",
  "env": {
    "MY_KEY": "this is the value",
    "SECRET": "@my-secret-name"
  },

  "build": {
    "env": {
      "MY_KEY": "this is the value",
      "SECRET": "@my-secret-name"
    }
  },

  "builds": [
    { "src": "*.html", "use": "@vercel/static" },
    { "src": "*.py", "use": "@vercel/python" },
    { "src": "*.js", "use": "@vercel/node" }
  ],

  "functions": {
    "api/test.js": {
      "memory": 3008,
      "maxDuration": 60
    },
    "api/test.php": {
      "runtime": "vercel-php@0.1.0"
    }
  },

  // 最多 256
  "routes": [
    { "src": "/custom-page", "headers": { "cache-control": "s-maxage=1000" }, "dest": "/index.html" },
    { "src": "/api", "dest": "/my-api.js" },
    { "src": "/users", "methods": ["POST"], "dest": "/users-api.js" },
    { "src": "/users/(?<id>[^/]*)", "dest": "/users-api.js?id=$id" },
    { "src": "/.*", "dest": "https://my-old-site.com" },
    { "src": "/legacy", "status": 404 },
    { "src": "/redirect", "status": 308, "headers": { "Location": "https://example.com/" } }
  ],

  "regions": ["sfo1", "bru"],

  // source view & logs view
  "public": true,

  // /about.html -> /about
  // /api/user.go -> /api/user
  "cleanUrls": true,

  // /about/ <-> /about
  "trailingSlash": false,

  "redirects": [
    { "source": "/me", "destination": "/profile.html" },
    // permanent = 308/307
    { "source": "/user", "destination": "/api/user", "permanent": false },
    { "source": "/view-source", "destination": "https://github.com/vercel/vercel" }
  ],

  // 最多 1024 个记录
  // src,dst 最长 4096
  "rewrites": [
    { "source": "/about", "destination": "/about-our-company.html" },
    { "source": "/resize/:width/:height", "destination": "/api/sharp" },
    { "source": "/user/:id", "destination": "/api/user" },
    { "source": "/proxy/:match*", "destination": "https://example.com/:match*" }
  ],

  // HTTP Header 控制
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/api/feed",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/rss+xml"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],

  "github": {
    "enabled": false,
    "autoAlias": false,
    "silent": true,
    "autoJobCancelation": false
  }
}
```

```js
// 捕获所有路由
{ "src": "/blog/([^/]+)", "dest": "/blog?post=$1" }
// 等同于
{"rewrites": [{ "source": "/blog/:post", "destination": "/blog" }]}

//
{ "src": "/blog/(.*)", "dest": "/blog?post=$1" }
//
{"rewrites": [{ "source": "/blog/:post*", "destination": "/blog" }]}
```
