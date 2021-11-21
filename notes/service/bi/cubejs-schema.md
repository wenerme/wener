---
title: CubeJS Schema
---

# CubeJS Schema

- dimensions
  - 单个数据点的 **属性**
  - Time Dimension
  - type:
    - time, string, number, boolean, geo
  - format:
    - imageUrl, link, currency, percent
    - id - 避免针对 number 加分隔符
- measures
  - set of data points
  - type:
    - number - 用于计算 measure
    - count - 不需要写 sql，一般会配合下钻
    - countDistinct - `COUNT DISTINCT`
    - countDistinctApprox
      - 能使用 rollup pre-aggregations
      - 可能使用 HyperLogLog
    - sum, avg, min, max, runningTotal
  - format: percent, currency
  - drillMembers:
    - 下钻纬度 - 会默认包含这些下钻属性
    - 可用于构建更丰富的客户端
- joins
  - relationship: belongsTo,hasMany,hasOne
  - sql
  - 均为 LEFT JOIN
    - 通过 `IS NOT NULL` 达到 INNER JOIN
- segments
  - 预定义在 schema 中的过滤条件
  - 建议用于复杂查询，简单场景使用 filter
- preAggregations
  - 预聚合
- 上下文变量
  - FILTER_PARAMS - `FILTER_PARAMS.<CUBE_NAME>.<FILTER_NAME>.filter(expression)`
  - SECURITY_CONTEXT
    - 推荐尽量使用 queryRewrite
  - SQL_UTILS
    - `convertTz('created_at')`
  - COMPILE_CONTEXT
- partition
  - rollup 基于分片
  - 分片通常是时间纬度
  - 时间维度+时间精度产生不同粒度的分片

```js
cube(`Users`, {
  sql: `select * from public.users`,
  title: `用户`,
  description: '所有的系统用户',
  // extends: BaseEntity // 继承
  // sqlAlias: `usr`,

  joins: {
    // key 必需为 Cube 名字
    // 意味着相同关系只能 join 一个，除非创建多个相同 cube
    Teams: {
      relationship: `belongsTo`,
      sql: `${Users}.team_id = ${Teams}.id`,
    },
  },
  segments: {
    activitiedUsers: {
      sql: `${CUBE}.state = 'activitied'`,
    },
  },
  preAggregations: {
    usersByStatus: {
      // rollup - 默认 - count, sum, min, max, countDistinctApprox
      // originalSql - 特殊情况使用  - 例如 漏斗，很复杂的 SQL
      // rollupJoin - 支持 join
      type: 'rollup',
      dimensions: [CUBE.status],
      measures: [CUBE.count],
      timeDimension: CUBE.createdAt,
      // hour, day, week, month, quarter, year
      granularity: `day`,
      segments: [CUBE.activitiedUsers],
      // 分区粒度
      partitionGranularity: `month`,
      // 刷新 key
      refreshKey: {
        // 无 sql 默认 1 hour
        // 有 sql 默认 10 seconds
        every: `1 day`,
        // 整理 rollup - 默认 true
        incremental: true,
        // 增量窗口
        updateWindow: `7 day`,
      },
      useOriginalSqlPreAggregations: true,
      // 定时刷新
      scheduledRefresh: false,
      // 范围定义
      buildRangeStart: {
        sql: `SELECT NOW() - interval '300 day'`,
      },
      buildRangeEnd: {
        sql: `SELECT NOW()`,
      },
      //
      indexes: {
        categoryIndex: {
          columns: [CUBE.category],
        },
        timestampIndex: {
          columns: ['timestamp'],
        },
      },
    },
    // rollup join
    usersRollup: {
      type: 'rollupJoin',
      dimensions: [Teams.teamsRollup, CUBE.usersByStatus],
    },
    // sql
    main: {
      type: `originalSql`,
    },
  },
  measures: {
    count: {
      sql: `id`,
      type: `count`,
      title: '总数',
      description: '用户数量',
      shown: true, // 是否可见
      // 自定义过滤查询
      filters: [{ sql: `${CUBE}.status = 'activited'` }],
      // 滚动窗口
      rollingWindow: {
        // (-?\d+) (minute|hour|day|week|month|year)
        // unbounded
        trailing: `1 month`,
        leading: '',
        offset: '', // start|end
      },
      // 下钻纬度
      drillMembers: [id, status, Products.name, Users.email],
      // 传递到前端的自定义信息
      meta: {
        any: 'value',
      },
    },

    payingCount: {
      sql: `id`,
      type: `count`,
      filters: [{ sql: `${CUBE}.paying = 'true'` }],
    },

    payingPercentage: {
      // 计算值
      sql: `100.0 * ${payingCount} / ${count}`,
      type: `number`,
      format: `percent`,
    },

    // 引用 subquery
    averageTeamsScore: {
      sql: `${teamsScore}`,
      type: `avg`,
    },
  },
  // 纬度
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      // 会用于去重，join
      // shown 会默认为 false
      primaryKey: true,
    },
    age: {
      sql: 'age',
      type: 'number',
      title: '年龄',
      description: '用户活了几多年',
      shown: true,
      case: {
        when: [
          { sql: `${CUBE}.age < 2`, label: `baby` },
          { sql: `${CUBE}.age < 18`, label: `young` },
          { sql: `${CUBE}.age < 60`, label: { sql: `${CUBE}.job` } }, // label 也可以引用
        ],
        else: { label: `老人` },
      },
      meta: {
        any: 'value',
      },
    },

    // 时间维度
    createdAt: {
      sql: `created_at`,
      type: `time`,
    },

    completedAt: {
      sql: `completed_at`,
      type: `time`,
    },
    // 子查询
    // - 必需先定义 join
    // - 引用 measure
    teamsScore: {
      sql: `${Teams.score}`,
      type: `number`,
      subQuery: true, // 声明子查询
      propagateFiltersToSubQuery: true, //  传递查询到子查询
    },
  },

  // SQL 生成后是否允许 cube 重写查询 - 可进行一定优化
  rewriteQueries: false,
  // 缓存刷新 key
  refreshKey: {
    // 1. evert interval
    every: '2 minute', // 默认 BigQuery, Athena, Snowflake, Presto
    every: '10 second', // 其他 DB 默认
    // 2. 自定义
    sql: `SELECT MAX(update_at) FROM users`,
    // 3. corn
    every: '30 5 * * 5',
    timezone: 'Asia/Shanghai',
  },
  // 数据源
  dataSource: `default`,
});

// 抽象 Cube - 用于 extends
const Users = cube({
  sql: `select * from users`,

  dimensions: {
    // primary key,
    name: {
      sql: `${CUBE}.name`,
      type: `string`,
    },
  },
});

cube(`BaseEvents`, {
  sql: `select * from events`,
});

// 继承 sql, joins, measures, dimensions
cube(`PageViews`, {
  sql: `select * from page_views`,
  extends: BaseEvents,

  dimensions: {
    pagePath: {
      sql: `page_path`,
      type: `string`,
    },
  },
});

// Data Blending/数据混合 - 融合多组数据
cube(`AllSales`, {
  sql: `
SELECT
  amount,
  user_id AS customer_id,
  created_at,
  'OnlineOrders' AS row_type
FROM ${OnlineOrders.sql()}
UNION ALL
SELECT
  amount,
  customer_id,
  created_at,
  'Orders' AS row_type
FROM ${RetailOrders.sql()}
 `,
});
```

## 预聚合

- additive rollup
  - count, sum, min, max, countDistinctApprox
- https://en.wikipedia.org/wiki/OLAP_cube
- https://en.wikipedia.org/wiki/Aggregate_function
- CUBEJS_ROLLUP_ONLY - 要求所有请求都走预聚合
- 聚合表名 - `<CUBE>_<ROLLUP><date partation>_23jnqarg_uiyfxd0f_1gifflf`

```js
cube(`Users`, {
  preAggregations: {
    main: {
      measures: [CUBE.count],
      refreshKey: {
        every: `1 hour`,
        incremental: true,
        updateWindow: `7 day`,
      },
    },
  },
});
```

```ini title="external db"
CUBEJS_EXT_DB_HOST=YOUR_DB_HOST_HERE
CUBEJS_EXT_DB_PORT=YOUR_DB_PORT_HERE
CUBEJS_EXT_DB_NAME=YOUR_DB_NAME_HERE
CUBEJS_EXT_DB_USER=YOUR_DB_USER_HERE
CUBEJS_EXT_DB_PASS=YOUR_DB_PASS_HERE
CUBEJS_EXT_DB_TYPE=SUPPORTED_DB_TYPE_HERE
```
