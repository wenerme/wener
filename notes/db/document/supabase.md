---
title: supabase
---

# supabase

- [supabase/supabase](https://github.com/supabase/supabase)
  - Apache-2.0, TS, Postgres

:::caution Self Hosting

- 一套部署只能支持 1 个项目 - [#4907](https://github.com/supabase/supabase/discussions/4907)
  - 不能作为 SaaS - 除非二次开发
  - 推荐 [appwrite](./appwrite.md)
- studio 没有安全概念，不适合公网 - 如果需要至少反向代理加上 BasicAuth

:::


:::tip

- 适用于快速开发应用

:::

## Self Hosting

![](https://supabase.com/docs/img/supabase-architecture.png)

- https://supabase.com/docs/guides/self-hosting
- https://github.com/supabase/supabase/tree/master/docker
  - docker compose

```sql
create schema if not exists extensions;
create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create extension if not exists pgjwt with schema extensions;
```
