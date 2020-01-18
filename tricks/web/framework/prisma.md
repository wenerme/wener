# Prisma

## Tips

* 注意
  * 生成的客户端只能服务端执行 [#3142](https://github.com/prisma/prisma/issues/3142)
    * 浏览器端只能通过 GraphQL 使用
* Prisma 介于 ORM 和 CMS 之间 - 定位类似于 RoR 的数据模块
* 主要特性
  * 支持 GraphQL 接口
  * [支持多数据库](https://www.prisma.io/features/databases) - PostgreSQL MySQL
  * 支持生成客户端 - TS JS GO
    * 支持实时订阅
  * 数据模型通过 DSL 定义 - 支持自动迁移
* 架构: 应用 -> Prisma Client -> Prisma Server -> Database
* 现有的一些问题
  * [Postgraphile vs Hasura vs Prisma vs AppSync experiences?](https://www.reddit.com/r/graphql/comments/ah27k1/postgraphile_vs_hasura_vs_prisma_vs_appsync/)
  * 因为抽象了 DB 层 - 因此与具体的某个 DB 结合的没那么好
    * 比如与 Postgre 没有 Hasura 结合的好 - 性能和功能

```bash
# 安装命令行工具
npm install -g prisma
# 引导初始化
# 生成 datamodel.prisma docker-compose.yml prisma.yml
prisma init my-web
# 启动 prisma
cd my-web
# GQL控制台 http://localhost:4466/
# 管理控制台 http://localhost:4466/_admin
# 管理接口 http://localhost:4466/management
# 会在数据库创建 management 库进行管理
docker-compose up
# 部署新的模型
prisma deploy
```

## 命令行
```bash
# 通过数据库生成模型
prisma introspect
```

## prisma.yml
* [prisma.yml](https://www.prisma.io/docs/prisma-cli-and-configuration/prisma-yml-5cy7/) - [schema.json](https://github.com/prisma/prisma-json-schema/blob/master/src/schema.json)

```yaml
# prisma 的服务端地址 - 格式 https|https://<地址>/<服务>/<环境/stage>
# 默认服务名字为 default - 等同于路径 http://localhost:4466/default/default
# http://localhost:4466/my-service - 服务名字为 my-service
# http://localhost:4466/my-service/dev - 环境为 dev
endpoint: http://localhost:4466
# schema 文件
# 可以使用数组指定多个
datamodel: datamodel.prisma
# 密钥
# secret: mysecret42
# 支持使用环境变量
secret: ${env:PRISMA_SECRET}

# 生成配置
generate:
  # 生成器
  # 可选类型 javascript-client typescript-client flow-client go-client graphql-schema
  - generator: typescript-client
    output: ./generated/prisma-client/

# 事件钩子
hooks:
  post-deploy:
    - prisma generate

# 基础数据
seed:
  # 执行脚本创建
  run: node data/seed.js
  # 导入备份数据创建
  import: database/backup.zip

# 任意变量定义
# 通过 ${self:custom.datamodelPath} 引用
custom:
  datamodelPath: myDatamodel
```

## 导入导出
* 导入接口 `http://localhost:4466/my-app/dev/import`
* 导出接口 `http://localhost:4466/my-app/dev/export`

```bash
# 导入
curl '__SERVICE_ENDPOINT__/import' -H 'Content-Type: application/json' -H 'Authorization: Bearer __JWT_AUTH_TOKEN__' -d '{"valueType":"__NDF_TYPE__","values": __DATA__ }' -sSv

# 导出
curl '__SERVICE_ENDPOINT__/export' -H 'Content-Type: application/json' -H 'Authorization: Bearer __JWT_AUTH_TOKEN__' -d '{"fileType":"__NDF_TYPE__","cursor": {"table":__TABLE__,"row":__ROW__,"field":__FIELD__,"array":__ARRAY__}} }' -sSv
```

## DSL
* 语法类似于 GraphQL


### 简单模型
```prisma
type User {
  id: ID! @id
  name: String!
  // 唯一约束
  email: String! @unique
  // 一对多
  addresses: [Address!]!
  // 默认值
  isAdmin: Boolean @default(value: "false")
  role: UserRole @default(value: "USER")
  
  // 会创建一个中间表 _UserLikedPosts{A,B}
  likedPost: [Post!]!  @relation(name: "UserLikedPosts")

  // 元数据字段
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  
  // JSON 字段 - 默认 256K
  data: Json
}

type Address {
  id: ID! @id

  raw: String
  city: String
  country: String
  zip: String
  // 反向关联
  user: User @relation(link: INLINE)
}

// 如果不想使用创建的中间表可以手动指定
type UserLikedPosts @relationTable {
  user: User!
  post: Post!
}

// 枚举
enum UserRole {
  USER
  ADMIN
  VISITOR
}
```
