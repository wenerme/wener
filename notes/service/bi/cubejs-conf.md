---
title: CubeJS 配置
---

# CubeJS 配置

- 环境变量配置
  - CUBEJS_DEV_MODE=true - 开发模式
  - CUBEJS_APP - APP ID
  - CUBEJS_TELEMETRY=false
  - [Environment Variables](https://cube.dev/docs/reference/environment-variables)
  - 映射方式 `CUBEJS_DB_TYPE` -> `dbType`
- cube.js 配置
  - https://cube.dev/docs/config
- dev mode
  - 无 auth
  - 单节点 cubestore
  - background refresh for in-memory cache, cheduled pre-aggregations
  - log level trace
  - playground http://localhost:4000
  - memory as the default cache/queue engine
  - log incorrect/invalid configuration for for externalRefresh /waitForRenew instead of throwing errors

```js title="cube.js"
module.exports = {
  telemetry: false,
  logger: (msg, params) => {
    console.log(`${msg}: ${JSON.stringify(params)}`);
  },
};
```

## 配置说明

**上下文关系**

- 请求 - ExpressRequest
- appId - RequestContext
- COMPILE_CONTEXT - RequestContext
- jwt - securityContext
- SECURITY_CONTEXT - securityContext
  - 尽量使用 queryRewrite 而不是 SECURITY_CONTEXT
  - 用于 row level security

```ts
interface CubejsConfiguration {
  // Schema 文件路径 /schema
  schemaPath: string;
  // REST 接口路径 /cubejs-api
  basePath: string;
  // 默认 /
  webSocketsBasePath: string;
  // 自定义 logger
  // 例如 console.log(`${msg}: ${JSON.stringify(params)}`);
  logger: (msg: string, params: object) => any;

  // 数据库类型 - 每个 appId 请求一次
  dbType: string | ((context: RequestContext) => string);
  // 数据源配置 - 一个数据源请求一次
  driverFactory: (context: DriverContext) => BaseDriver | Promise<BaseDriver>;
  // 外部数据库类型 - 每个 appId 请求一次
  externalDbType: string | ((context: RequestContext) => string);
  // 外部 rollup - 每个 appId 请求一次
  externalDriverFactory: (context: RequestContext) => BaseDriver | Promise<BaseDriver>;

  // AppID - 每次请求
  // 缓存 Key - schema compilation results, connection pool 等
  // 例如 ({ securityContext }) => `CUBEJS_APP_${securityContext.tenantId}_${securityContext.user_id}`
  contextToAppId: (context: RequestContext) => string;
  // 查询编排缓存 Key - 默认为 appId - 每次请求
  // 数据库连接, 执行队列, 预聚合表缓存
  // 例如 ({ securityContext }) => `CUBEJS_APP_${securityContext.tenantId}`
  contextToOrchestratorId: (context: RequestContext) => string;
  // Schema 仓库 - 每 AppID 请求
  // 实现多租户不同 schema
  // 例如 ({ securityContext }) => new FileRepository(`schema/${securityContext.appId}`)
  repositoryFactory: (context: RequestContext) => SchemaFileRepository;
  // REST 和 WebSockets API 鉴权
  // 默认 检查 Authorization JWT，验证后内容设置为 req.securityContext
  // 可禁用 (req, auth) => {}
  checkAuth: (req: ExpressRequest, authorization: string) => any;
  // SQL API 鉴权 - 默认校验 CUBE_SQL_USERNAME, CUBE_SQL_PASSWORD
  checkSqlAuth: (req: SQLRequest, user: string) => any;
  // 查询执行前的额外检查
  queryRewrite: (query: object, context: RequestContext) => object;
  // 预聚合 schema - 推荐生产和开发使用不同 schema - 每个 appId 请求一次
  // 开发模式默认 dev_pre_aggregations
  // 生产模式默认 prod_pre_aggregations
  preAggregationsSchema: string | ((context: RequestContext) => string);
  // schema 版本 - 确定什么时候重新编译
  schemaVersion: (context: RequestContext) => string;

  scheduledRefreshTimer: boolean | number;
  scheduledRefreshTimeZones: string[];
  scheduledRefreshContexts: () => Promise<object[]>;

  // 扩展 RequestContext
  extendContext: (req: ExpressRequest) => any;
  // 默认 250
  compilerCacheSize: number;
  // 单位 ms
  maxCompilerCacheKeepAlive: number;
  updateCompilerCacheKeepAlive: boolean;
  allowUngroupedWithoutPrimaryKey: boolean;
  telemetry: boolean;

  http: {
    cors: {
      methods: string | string[];
      origin: string;
      allowedHeaders: string | string[];
      exposedHeaders: string | string[];
      credentials: boolean;
      maxAge: number;
      preflightContinue: boolean;
      optionsSuccessStatus: number;
    };
  };

  jwt: {
    jwkUrl?: ((payload: any) => string) | string;
    key?: string;
    algorithms?: string[];
    issuer?: string[];
    audience?: string;
    subject?: string;
    claimsNamespace?: string;
  };
  // 推荐生产使用 redis
  cacheAndQueueDriver: 'memory' | 'redis';
  // 推荐保留默认
  orchestratorOptions: OrchestratorOptions | ((context: RequestContext) => OrchestratorOptions);
  allowJsDuplicatePropsInSchema: boolean;
}

interface OrchestratorOptions {
  redisPrefix: string;
  rollupOnlyMode: bool;
  queryCacheOptions: {
    refreshKeyRenewalThreshold: number;
    backgroundRenew: boolean;
    queueOptions: QueueOptions;
  };
  preAggregationsOptions: {
    queueOptions: QueueOptions;
  };
}

interface QueueOptions {
  concurrency: number;
  continueWaitTimeout: number;
  executionTimeout: number;
  orphanedTimeout: number;
  heartBeatInterval: number;
}

interface RequestContext {
  securityContext: object;
  requestId: string;
}

interface DriverContext extends RequestContext {
  dataSource: string;
}

interface SchemaFileRepository {
  dataSchemaFiles(): Promise<FileContent[]>;
}

interface FileContent {
  fileName: string;
  content: string;
}
```

```json title="QueueOptions"
{
  "concurrency": 2,
  "continueWaitTimeout": 5,
  "executionTimeout": 600,
  "orphanedTimeout": 120,
  "heartBeatInterval": 30
}
```

## Multitenancy

- Multitenancy vs Multiple Data Sources
  - Multitenancy
    - 多用户，不同数据集
  - Multiple Data Sources
    - 相同数据不同数据库
    - cube 关联 dataSource
    - 配置 dbType+driverFactory 生成多数据源
- Security Context vs Multitenant Compile Context
  - Security Context
    - row-level security within the same database for different users
  - Multitenant Compile Context
    - access different databases
- Security Context vs queryRewrite
  - Security Context
    - explicit control

```js title="cube.js"
const PostgresDriver = require('@cubejs-backend/postgres-driver');

module.exports = {
  driverFactory: ({ dataSource }) => new PostgresDriver({ database: dataSource }),
};
```

## 数据库

```js
const MySQLDriver = require('@cubejs-backend/mysql-driver');

new MySQLDriver({
  host: process.env.CUBEJS_EXT_DB_HOST,
  database: process.env.CUBEJS_EXT_DB_NAME,
  port: process.env.CUBEJS_EXT_DB_PORT,
  user: process.env.CUBEJS_EXT_DB_USER,
  password: process.env.CUBEJS_EXT_DB_PASS,
});
```
