---
tags:
  - Typescript
---

# TypeGraphQL

- [MichalLytek/type-graphql](https://github.com/MichalLytek/type-graphql)
  - MIT, Typescript
  - 注解/修饰器 方式

:::notes

- 文件上传 [#37](https://github.com/MichalLytek/type-graphql/issues/37)
- relay
  - 需要自己实现
  - https://github.com/calmonr/typegraphql-relay
- 不能 @Public 只能 @Authorized
  - Inverted authorization mode [#230](https://github.com/MichalLytek/type-graphql/issues/230)
- Data loader integration [#51](https://github.com/MichalLytek/type-graphql/issues/51)
  - 可以依赖底层的 ORM 去做
  - 例如 MikroORM 支持 dataloader
- Directive
  - [#77](https://github.com/MichalLytek/type-graphql/issues/77)
  - `@Directive('@deprecated(reason: "Use newField")')`

:::
