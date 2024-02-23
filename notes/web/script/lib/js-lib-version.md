---
tags:
  - Version
  - FAQ
---

# JS Lib Version

- TanStack Query/react-query v5
  - [Migrating to TanStack Query v5](https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5)
  - [trpc#4218](https://github.com/trpc/trpc/issues/4218) v11
- react v18
  - [How to Upgrade to React 18](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- trpc
  - [v10 -> v11](https://trpc.io/docs/migrate-from-v10-to-v11)
- MikroORM v6
  - [v6 Released](https://mikro-orm.io/blog/mikro-orm-6-released)
  - [Upgrading from v5 to v6](https://mikro-orm.io/docs/upgrading-v5-to-v6)
    - Node 18.12+, TS v5+
    - `BaseEntity<E,'id'>` -> `BaseEntity` 移除 类型参数
    - UseRequestContext -> CreateRequestContext, EnsureRequestContext
    - OptionalProps 可用 Opt 类型
      - `fullName: string & Opt = '';`
        - 也可以 `Opt<string>`
      - `@Property({ hidden: true, nullable: true }) password?: string & Hidden;`
        - 也可以 `Hidden<string>`
    - PrimaryKeyType,PrimaryKeyType -> PrimaryKeyProp
      - 修改后的 PrimaryKeyProp 只需要制定 key
    - `RequestContext.createAsync` -> `RequestContext.create`
    - `onUpdateIntegrity` -> `updateRule`
- reflect-metadata v0.2

## Patches

**ts-node@11.0.0-beta.1.patch**

ts-node 兼容新版本 swc

```diff
diff --git a/dist/transpilers/swc.js b/dist/transpilers/swc.js
index c334bd3b18b292c3f865639dca4080ff3dfe53e8..26c37e4b45177554f4a79e311775dab3e9085a59 100644
--- a/dist/transpilers/swc.js
+++ b/dist/transpilers/swc.js
@@ -167,7 +167,7 @@ function createSwcOptions(compilerOptions, nodeModuleEmitKind, swcInstance, swcD
                         : {}),
                 }
                 : undefined,
-            swcrc: false,
+            swcrc: true,
             jsc: {
                 externalHelpers: importHelpers,
                 parser: {
```

# FAQ

### swc 升级后导致 build 多了一层目录

```bash
# dist/src -> dist
npx swc ./src -d dist --strip-leading-paths
```
