---
title: Prisma2
---

# Prisma2

-  PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, CockroachDB
- Query Engine - Rust 实现
  - 作为 sidecard 或者 n-api 使用
- 架构不同于 Prisma1 - 客户端 -> 查询引擎 -> 数据库
  - 没有额外的服务 - 内嵌
  - cli 集成 db 迁移能力
  - 对不同组件进行拆分
  - Photon - 生成 ORM 代码
  - Life - 模型定义和迁移
  - Studio - 管理界面
  - GrahQL 能力
  - 部分核心能力使用 RUST 重写 - 之前为 Scala
    - 因为考虑可能多语言
- 支持数据库
  - PostgreSQL
  - MySQL
  - SQLite
- 问题
  - 不支持 yarn2 PnP [#1439](https://github.com/prisma/prisma/issues/1439)
    - 修改输出路径为 `../src/generated/prisma`，调整 PrismaClient 的引入路径可以使用
- [prisma/studio](https://github.com/prisma/studio)
  - 闭源
- https://playground.prisma.io/

```bash
npm install prisma --save-dev
# postgresql, mysql, sqlite, sqlserver, mongodb, cockroachdb
npx prisma init --datasource-provider postgresql
```

- 配置
  - .env
  - .env.test
  - .env.development
  - .env.production - 不推荐
  - 不支持 .env.local
    - [#3865](https://github.com/prisma/prisma/issues/3865#issuecomment-767665090)
    - [#15681](https://github.com/prisma/prisma/issues/15681)
    - 修改 script 可以用 `dotenv-flow -- npx prisma migrate deploy --preview-feature`
- DATABASE_URL

```bash
yarn add @prisma/cli --dev
yarn add @prisma/client

mkdir prisma
cat <<EOF > ./prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider      = "prisma-client-js"
  // 默认位置
  output        = "node_modules/@prisma/client"
  binaryTargets = ["native"]
}

model User {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  email     String   @unique
  name      String
  // role      Role     @default(USER)
  // posts     Post[]
  // profile   Profile?
}

model Setting {
  id        String      @default(uuid()) @id
  key       String      @unique
  value     Json
}
EOF

yarn prisma generate
```

```bash
npx prisma db pull

npx prisma migrate resolve --applied 0_init

npm install @prisma/client

npx prisma generate
```


```hcl
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
