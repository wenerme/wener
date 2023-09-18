---
title: 微服务
---

# microservices

- 传输
  - TCP
  - Redis Pub/Sub
    - 不做处理会被多个 服务端 处理
    - 用 redis stream 可以避免重复消费问题
      - [tamimaj/nestjs-redis-streams](https://github.com/tamimaj/nestjs-redis-streams)
      - 但会有 stale 问题，需要注意
  - MQTT Pub/Sub - `{data,headers}`
  - NATS reqreply, pubsub
  - RabbitMQ
  - Kafka
  - gRPC
- 核心模块不会增加额外的传输策略
  - https://github.com/nestjs/nest/issues/3960#issuecomment-771647374
- pattern
  - 会序列化为 JSON - 因此可以用 Object
- `@MessagePattern({ cmd: '' })` - 请求响应
  - 支持返回 Promise, Observable
- `@EventPattern('')` - 事件
- ClientProxy
  - `ClientsModule.register()` - 注册后使用
  - `@Client({ transport: Transport.TCP }) client: ClientProxy;` - 直接注解使用
- adopted by
  - [amplication/amplication](https://github.com/amplication/amplication)
- 实现依赖 rxjs
- 参考
  - https://amplication.com/blog/working-with-microservices-with-nestjs

```bash
npm add rxjs @nestjs/microservices
```

```ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
  });
  await app.listen();
}
bootstrap();
```

```ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
```

```ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { CONTEXT, RequestContext } from '@nestjs/microservices';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(CONTEXT) private ctx: RequestContext) {}
}

export interface RequestContext<T = any> {
  pattern: string | Record<string, any>;
  data: T;
}
```

## Hybrid application

- HTTP + Microservice

```ts
const app = await NestFactory.create(AppModule);
const microservice = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.TCP,
});

await app.startAllMicroservices();
await app.listen(3001);
```

- https://docs.nestjs.com/faq/hybrid-application
