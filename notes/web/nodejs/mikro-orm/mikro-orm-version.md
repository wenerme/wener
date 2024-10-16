---
tags:
  - Version
---

# MikroORM Version

## MikroORM v6

- 类型
  - populate 类型安全
  - Opt 类型 - 解决之前需要 OptionalProps 的问题，不好扩展
  - Hidden 类型 - 序列化后字段不存在
  - BaseEntity 不再需要类型参数，通过 PrimaryKeyProp 定义
  - `[Config]?: DefineConfig<{ forceObject: true }>;`
    - 序列化后类型为 object
- 查询
  - populate 支持 `*` - 所有，之前的 true
  - populate 支持 `$infer` - 基于查询
  - Collection 接口功能完善 - 类似 数组
  - findByCursor - 基于游标分页
  - 关联子查询 $some, $none, $every
- helper
  - rel
  - ref
- [dataloader](https://mikro-orm.io/docs/dataloaders)
- Logging
  - 支持 label、context
  - 可以按需关闭
- 可以扩展 EntityManager
- 解决默认 require 插件依赖问题
- `MikroORM.initSync`
- 元数据生成 adapter
  - GeneratedCacheAdapter
  - `npx mikro-orm cache:generate --combined`
  - 可以避免 reflect-metadata 、 @mikro-orm/reflection

```ts
MikroORM.init({
  metadataCache: {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    options: { data: require('./temp/metadata.json') },
  },
});

//
MikroORM.init({
  dataloader: Dataloader.ALL,
});
```
