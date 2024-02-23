---
title: NestJS
---

# NestJS

- [nestjs/nest](https://github.com/nestjs/nest)
  - 设计来自 Angular + SpringFramework
  - http-errors
- 核心概念
  - Module
    - `@Module()`
  - Controller
    - request -> response
    - `@Controller('user/me')`
    - `@Get()`,`@Post` - `@HttpCode(204)`, `@Header('Cache-Control', 'none')`, `@Redirect('https://nestjs.com', 301)`
    - `@Request()`, `@Req() req: Request`
    - `@Response()`, `@Res() res: Response`
    - `@Param(key?: string)` - req.params
    - `@Body(key?: string)` - req.body
    - `@Query(key?: string)` - req.query
    - `@Headers(name?: string)` - req.headers
    - `@Next() next`
    - `@Ip()` - req.ip
    - `@HostParam()` - req.hosts
    - `@Session()`
  - Provider
    - `@Injectable()`
    - `@Optional()`, `@Inject(key?:string)`
  - Middleware
  - Exception filter
  - Pipe
  - Guard
  - Interceptor
  - decorator
- 特性
  - 底层平台无关 - 默认 Express，可用 Fastify
  - 支持 GraphQL、WebSocket
  - combine your config and your code seamlessly by making use of TypeScript decorators
- 集成
  - NextJS
    - [nestjs/nest#1122](https://github.com/nestjs/nest/issues/1122)
    - [kyle-mccarthy/nest-next](https://github.com/kyle-mccarthy/nest-next)
    - 因为 Next 可能在构建时有一些请求，两者共存可能会有些问题
    - 可能前后端分离更好
  - 数据库
    - `@nestjs/typeorm`
    - `@nestjs/sequelize`
  - 配置
    - `@nestjs/config` - dotenv
  - 校验
    - [class-validator](https://www.npmjs.com/package/class-validator)
  - 缓存
    - [cache-manager](https://www.npmjs.com/package/cache-manager) - Flexible NodeJS cache module
  - 序列化
    - [class-transformer](https://www.npmjs.com/package/class-transformer)
  - 任务调度
    - `@nestjs/schedule` - [node-cron](https://www.npmjs.com/package/node-cron)
  - 安全
    - [helmet](https://www.npmjs.com/package/helmet)
    - CSRF [csurf](https://www.npmjs.com/package/csurf)
    - 限流 [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  - 队列
    - `@nestjs/bull` - bull
  - 日志
    - [winstonjs/winston](https://github.com/winstonjs/winston)
  - 文件上传
    - [expressjs/multer](https://github.com/expressjs/multer)
  - HTTP 客户端
    - axios
  - GraphQL
    - `@nestjs/graphql`
    - `@nestjs/apollo`
      - apollo-server-express
    - `@nestjs/mercurius`


```
📂 src
├─ 📄 app.controller.spec.ts
├─ 📄 app.controller.ts
├─ 📄 app.module.ts
├─ 📄 app.service.ts
└─ 📄 main.ts
```

## GraphQL

```bash
# Express + Apollo 默认
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql

# Fastify + Apollo
npm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/fastify graphql

# Fastify + Mercurius
npm i @nestjs/graphql @nestjs/mercurius graphql mercurius
```

## Standalone

作为 IoC 容器

- @nestjs/core
  - 172.1kB, 43.9kB
- @nestjs/common
  - 86.9kB, 19.4kB

```ts
import { NestFactory } from '@nestjs/core';

const app = await NestFactory.createApplicationContext(AppModule);
const userService = app.get(UserService);

await app.close();
```

# FAQ

## Reflection metadata 'design:paramtypes' returning undefined

- 需要 emitDecoratorMetadata
- esbuild 不支持 emitDecoratorMetadata，swc 支持

```bash
# 推荐 swc + tsx
pnpm swc --watch ./src -d ./dist/out
pnpm tsx watch ./dist/out/main.js

# 或 ts-node
ts-node --esm --swc
```

