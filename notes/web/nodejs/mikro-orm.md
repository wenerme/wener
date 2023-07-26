---
title: mikro-orm
---

# mikro-orm

- [mikro-orm/mikro-orm](https://github.com/mikro-orm/mikro-orm)
  - MIT, Typescript
  - ORM
  - 支持 Data Mapper, Unit of Work, Identity Map
  - 支持 MongoDB, MySQL, MariaDB, PostgreSQL, SQLite
- @mikro-orm/knex
  - Builder

```bash
# mongodb, mysql, mariadb, sqlite
npm add @mikro-orm/core @mikro-orm/postgresql
```

```json title="tsconfig.json"
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "esModuleInterop": true
}
```

```ts
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package
import { EntityManager } from '@mikro-orm/postgresql';

const orm = await MikroORM.init<PostgreSqlDriver>({
  // 自动发现
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  // entities: ['./dist/app/**/entities'],
  // entitiesTs: ['./src/app/**/entities'],
  // entities: ['./dist/app/**/entities/*.entity.js'],
  // entitiesTs: ['./src/app/**/entities/*.entity.ts'],

  // 手动配置
  entities: [Author, Book, BookTag, Publisher, Test],
  discovery: { disableDynamicFileAccess: true },

  dbName: 'my-db-name',
  type: 'postgresql',
});
const em = orm.em as EntityManager;
```

- https://mikro-orm.io/docs/configuration#using-environment-variables

```bash
npm add -D @mikro-orm/cli
# mikro-orm.config.js
npx mikro-orm

mikro-orm generate-entities

# by dlx
pnpm --package=@mikro-orm/cli dlx mikro-orm

NODE_OPTIONS='--loader tsx' pnpm mikro-orm generate-entities --schema public -p ./src/server/db/entities/ -d
```

- mikro-orm.config.ts
  - 依赖 ts-node

```ts
export type MinimalOptionalEntityFields =
  | 'id'
  | 'uid'
  | 'createdAt'
  | 'updatedAt'
  | 'sid'
  | 'tid'
  | 'attributes'
  | 'properties'
  | 'extensions';

@Entity({ abstract: true })
export abstract class MinimalBaseEntity<Entity extends MinimalBaseEntity<any>> extends BaseEntity<Entity, 'id'> {
  // 在子类中定义 - Base 里的定义无法覆盖
  [OptionalProps]?: MinimalOptionalEntityFields;

  @PrimaryKey({ type: 'text', defaultRaw: 'public.gen_ulid()' })
  id!: string;

  //@PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uid!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', defaultRaw: 'current_timestamp' })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
```

## RequestContext

- Middleware `RequestContext.create(orm.em, next)`

# FAQ

## Transaction query already complete
