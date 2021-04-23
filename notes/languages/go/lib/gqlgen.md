---
title: gqlgen
---

# gqlgen

- [99designs/gqlgen](https://github.com/99designs/gqlgen) 是什么？
  - 基于生成的 GraphQL 引擎
  - Schema first - 需要 DSL 定义 GraphQL Schema
  - 类型安全
  - 支持 Plugin - 修改配置, 生成代码
- 缺点
  - 库代码质量一般
  - 文档少
  - 插件能力弱，且没什么 Demo
- [gqlgen vs gophers vs graphql-go vs thunder](https://gqlgen.com/feature-comparison/)
- 问题
  - [99designs/gqlgen#1516](https://github.com/99designs/gqlgen/issues/1516)
    - 不兼容 gqlparser 2.2 - 升级的时候注意

:::caution

- ⚠️ fragment 内的 alias 不会处理 - 非常严重且难排查
  - [99designs/gqlgen#1271](https://github.com/99designs/gqlgen/issues/1271)
- embeded 相同 struct 需要重复写 resolver
  - [99designs/gqlgen#592](https://github.com/99designs/gqlgen/issues/592) - resolve 逻辑不能定义在 interface 上
  - [99designs/gqlgen#626](https://github.com/99designs/gqlgen/issues/626) - 生成类型不支持 embedded
- enum 不支持 int - [99designs/gqlgen#366](https://github.com/99designs/gqlgen/issues/366)

:::

## Note

```go
type HandlerExtension interface {
  // ExtensionName should be a CamelCase string version of the extension which may be shown in stats and logging.
  ExtensionName() string
  // Validate is called when adding an extension to the server, it allows validation against the servers schema.
  Validate(schema ExecutableSchema) error
}
```

```
+--- REQUEST   POST /graphql --------------------------------------------+
| +- OPERATION query OpName { viewer { name } } -----------------------+ |
| |  RESPONSE  { "data": { "viewer": { "name": "bob" } } }             | |
| +- OPERATION subscription OpName2 { chat { message } } --------------+ |
| |  RESPONSE  { "data": { "chat": { "message": "hello" } } }          | |
| |  RESPONSE  { "data": { "chat": { "message": "byee" } } }           | |
| +--------------------------------------------------------------------+ |
+------------------------------------------------------------------------+
```
