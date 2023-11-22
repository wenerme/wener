---
tags:
  - Dev
---

# NestJS Dev

- Module
  - register
    - 模块配置
  - forRoot
    - 配置 1 次复用
  - forFeature
    - 在有 global 模块的时候，针对子模块注入特定内容
    - 例如： ORM 注入 Repository
  - registerAsync
  - forRootAsync
  - forFeatureAsync

```ts
// 支持配置的模块 - 生成 register, registerAsync
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
```
