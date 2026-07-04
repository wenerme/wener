---
tags:
  - Reference
---

# Grafana Reference

## Macro

- Grafana 内置变量通常在前端插值；Infinity datasource 的宏会在后端插值，更适合 URL、请求体和外部 API 参数。
- Infinity macro 可用位置：URL、Request body、GraphQL query、URL parameters、Inline data、UQL、GROQ、Computed column selectors、Filter expressions。

| Macro                           | 场景              | Output                                | 说明                                                   |
| ------------------------------- | ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `${__from}`                     | 全局              | `1594671549254`                       | Dashboard 开始时间，默认毫秒时间戳                     |
| `${__to}`                       | 全局              | `1594675149254`                       | Dashboard 结束时间，默认毫秒时间戳                     |
| `${__from:date}`                | 全局              | `2020-07-13T20:19:09.254Z`            | Dashboard 开始时间，ISO/RFC3339 格式                   |
| `${__to:date}`                  | 全局              | `2020-07-13T21:19:09.254Z`            | Dashboard 结束时间，ISO/RFC3339 格式                   |
| `${__from:date:YYYY-MM}`        | 全局              | `2020-07`                             | Dashboard 开始时间，自定义日期格式                     |
| `${__to:date:YYYY-MM}`          | 全局              | `2020-07`                             | Dashboard 结束时间，自定义日期格式                     |
| `$__dashboard`                  | 全局              | `Node Overview`                       | 当前 Dashboard 名称                                    |
| `$__interval`                   | 全局              | `2m`                                  | Grafana 自动计算的分组间隔                             |
| `$__interval_ms`                | 全局              | `120000`                              | `$__interval` 的毫秒数                                 |
| `$__name`                       | 全局 / 旧面板     | `series alias`                        | 旧 Singlestat 的序列名称                               |
| `${__timeFrom}`                 | Infinity          | `1594671549254`                       | Dashboard 开始时间，后端插值，常用于 API 调用          |
| `${__timeTo}`                   | Infinity          | `1594675149254`                       | Dashboard 结束时间，后端插值，常用于 API 调用          |
| `${__org.id}`                   | 全局 / Infinity   | `1`                                   | 当前 Grafana 组织 ID                                   |
| `${__org.name}`                 | 全局              | `Main Org.`                           | 当前 Grafana 组织名称                                  |
| `${__plugin.id}`                | Infinity          | `yesoreyeram-infinity-datasource`     | 当前插件 ID                                            |
| `${__plugin.version}`           | Infinity          | `3.0.0`                               | 当前插件版本                                           |
| `${__ds.uid}`                   | Infinity          | `c8f2...`                             | 当前数据源 UID                                         |
| `${__ds.name}`                  | Infinity          | `Infinity`                            | 当前数据源名称                                         |
| `${__ds.id}`                    | 全局 / 旧字段     | `12`                                  | 当前数据源 ID，已废弃                                  |
| `${__user.id}`                  | 全局              | `42`                                  | 当前用户 ID                                            |
| `${__user.login}`               | 全局 / Infinity   | `wener`                               | 当前用户登录名                                         |
| `${__user.email}`               | 全局 / Infinity   | `wener@example.com`                   | 当前用户邮箱                                           |
| `${__user.name}`                | 全局 / Infinity   | `Wener`                               | 当前用户显示名称                                       |
| `$__range`                      | Prometheus / Loki | `1h`                                  | 当前 Dashboard 时间范围                                |
| `$__range_ms`                   | Prometheus / Loki | `3600000`                             | 当前时间范围毫秒数                                     |
| `$__range_s`                    | Prometheus / Loki | `3600`                                | 当前时间范围秒数                                       |
| `$__rate_interval`              | Prometheus        | `1m`                                  | Prometheus `rate()` 推荐间隔                           |
| `$__rate_interval_ms`           | Prometheus        | `60000`                               | `$__rate_interval` 的毫秒数                            |
| `$timeFilter` / `$__timeFilter` | 数据源            | `time > now() - 7d`                   | 当前时间范围过滤表达式                                 |
| `$__timezone`                   | 全局              | `Asia/Shanghai`                       | 当前 Dashboard 时区                                    |
| `$__url_time_range`             | Link              | `from=1594671549254&to=1594672349254` | 当前时间范围 URL 参数                                  |
| `$__customInterval()`           | Infinity          | `1d`                                  | 按 Dashboard 时间范围返回不同值                        |
| `$__combineValues()`            | Infinity          | `foo:a OR foo:b`                      | 给多个值加前缀、后缀，并用分隔符拼接                   |
| SQL time macro                  | SQL               | `WHERE $__timeFilter(ts)`             | SQL 时间过滤、分组、epoch 范围宏，详见下方 SQL section |
| SQL variable format             | SQL               | `${host:sqlstring}`                   | SQL 查询里的模板变量转义与拼接，详见下方 SQL section   |

### Global Variable

- `${__from}` / `${__to}` 默认输出 Unix milliseconds，可用 `:date` 控制格式。
- `${__from:date}` / `${__to:date}` 默认输出 ISO/RFC3339；`:date:seconds` 输出 Unix seconds。
- 自定义日期格式不能包含 `:`，例如 `${__from:date:YYYY-MM}`；不带 `:iso` 时使用浏览器时间。
- `$__interval` 由 Grafana 根据时间范围和图表宽度自动估算，近似 `(to - from) / resolution`。
- `$__interval_ms` 是 `$__interval` 的毫秒数；InfluxDB 旧变量 `$interval` 等价但建议用 `$__interval`。
- `$__range` / `$__range_ms` / `$__range_s` 目前主要用于 Prometheus 和 Loki。
- `$__rate_interval` / `$__rate_interval_ms` 主要用于 Prometheus `rate()`，避免窗口太小导致 rate 不稳定。
- `$timeFilter` / `$__timeFilter` 会展开成数据源自己的时间过滤表达式，常见于 InfluxDB、Azure Monitor、MySQL、Postgres、MSSQL。
- `$__timezone` 返回 `utc` 或 IANA 时区；如果选择 Browser Time，会尝试解析浏览器时区。
- `$__url_time_range` 只适合 data link / panel link，需要自己加 `?` 或 `&`。
- `$__name` 只适用于旧 Singlestat，Grafana 8.0 后 Singlestat 已移除。

```text
${__from:date:seconds}
${__to:date:iso}
$__interval
$__interval_ms
$__range
$__rate_interval
$__timezone
https://grafana.example/d/target?${__url_time_range}
```

### Infinity Time Macro

- `${__timeFrom}` / `${__timeTo}` 返回 Dashboard 时间范围边界。
- Infinity 会在后端插值，适合外部 API 请求；插件版本要求：`2.7.1+`。
- `${__timeTo}` 支持和 `${__timeFrom}` 相同的格式参数。

| Macro                                 | 输出                       | 说明               |
| ------------------------------------- | -------------------------- | ------------------ |
| `${__timeFrom}`                       | `1594671549254`            | 毫秒时间戳         |
| `${__timeFrom:date:seconds}`          | `1594671549`               | 秒级时间戳         |
| `${__timeFrom:date}`                  | `2020-07-13T20:19:09.254Z` | ISO/RFC3339 时间   |
| `${__timeFrom:date:iso}`              | `2020-07-13T20:19:09.254Z` | ISO/RFC3339 时间   |
| `${__timeFrom:date:YYYY-MM-DD}`       | `2020-07-13`               | 自定义日期格式     |
| `${__timeFrom:date:YYYY:MM:DD:hh:mm}` | `2020:07:13:08:19`         | 自定义日期时间格式 |

```grafana
${__from:date:YYYY-MM}
${__to:date:YYYY-MM}

${__timeFrom}
${__timeFrom:date:seconds}
${__timeFrom:date:YYYY-MM-DD}
${__timeTo:date:iso}
```

### `$__customInterval()`

- 用途：根据 Dashboard 时间范围返回不同值，常用于动态调整查询粒度、step、bucket、API 参数。
- 语法：`$__customInterval(duration1,value1,duration2,value2,...,defaultValue)`。
- 参数必须是奇数个：`3`、`5`、`7`、`9` ...。
- 按顺序判断：时间范围小于等于 `durationN` 时返回 `valueN`；都不匹配时返回最后的 `defaultValue`。
- `duration` 使用 Grafana duration 语法，例如 `1m`、`1h`、`1d`、`7d`。

| Dashboard range | Query                                                     | Output    |
| --------------- | --------------------------------------------------------- | --------- |
| `24h`           | `$__customInterval(1m,1 MIN,1d)`                          | `1d`      |
| `24h`           | `$__customInterval(2d,2 DAYS,1d)`                         | `2 DAYS`  |
| `24h`           | `$__customInterval(5m,5 MINUTES,1d,1 DAY,10d,10 days,1d)` | `1 DAY`   |
| `7d`            | `$__customInterval(5m,5 MINUTES,1d,1 DAY,10d,10 days,1d)` | `10 days` |
| `30d`           | `$__customInterval(5m,5m,1d,1d,10d,10d,30d)`              | `30d`     |

```grafana
http://api.example.com?step=$__customInterval(5m,10s,1d,1m,10d,10m,1h)
```

### `$__combineValues()`

- 用途：把多个值分别加上前缀、后缀，再用分隔符拼接，适合多选变量。
- 语法：`$__combineValues(prefix,suffix,separator,value1,value2,value3,...)`。
- 每个 value 会变成 `prefix + value + suffix`，然后用 `separator` 连接。
- 当刚好 4 个参数且第 4 个参数是 `*` 时返回空字符串，用于 multi-value 变量的 `All`。

| 参数        | 说明                                        |
| ----------- | ------------------------------------------- |
| `prefix`    | 每个值前面加的字符串                        |
| `suffix`    | 每个值后面加的字符串                        |
| `separator` | 多个值之间的分隔符                          |
| `value...`  | 要拼接的一个或多个值，通常来自 `${var:csv}` |

| Escape    | 字符 |
| --------- | ---- |
| `__comma` | `,`  |
| `__space` | 空格 |
| `__open`  | `(`  |
| `__close` | `)`  |

| Query                                           | Output                       |
| ----------------------------------------------- | ---------------------------- |
| `$__combineValues(p,s,i,v)`                     | `pvs`                        |
| `$__combineValues(p,s,__space,v1,v2)`           | `pv1s pv2s`                  |
| `$__combineValues(__open,__close, OR ,foo,bar)` | `(foo) OR (bar)`             |
| `$__combineValues(,, OR ,foo,bar)`              | `foo OR bar`                 |
| `$__combineValues(p,s,i,*)`                     | 空字符串                     |
| `$__combineValues(foo:,, OR ,${server:csv})`    | `foo:server2 OR foo:server3` |
| `$__combineValues(foo:,,__comma,${server:csv})` | `foo:server2,foo:server3`    |

```grafana
# server 多选: server2, server3
$__combineValues(foo:,, OR ,${server:csv})
# -> foo:server2 OR foo:server3

# server = All 且 Custom all value = *
$__combineValues(foo:,, OR ,${server:csv})
# -> 空字符串
```

### SQL Variable / Macro

- Grafana SQL datasource macro 会展开成目标 SQL 方言；下表的 `Output` 以 MySQL 官方文档为例。
- `fill` 可选值常见为 `0`、`NULL`、`previous`，只对 time series 补点有意义；SQL 表达式本身通常不因 fill 改变。
- SQL 查询里使用模板变量时优先选择明确 formatter，避免默认格式和 SQL 注入风险。

#### SQL Variable Output

| 用法                   | Output             | 场景                             | 说明                                                  |
| ---------------------- | ------------------ | -------------------------------- | ----------------------------------------------------- |
| `${ids:csv}`           | `1,2,3`            | `id IN (${ids:csv})`             | 数值列表，不加引号                                    |
| `${names:singlequote}` | `'alice','bob'`    | `name IN (${names:singlequote})` | 字符串列表，简单单引号包裹                            |
| `${names:sqlstring}`   | `'alice','bob''s'` | `name IN (${names:sqlstring})`   | SQL 字符串，单引号按 SQL 规则转义，优先用于字符串列表 |
| `${clause:raw}`        | `status = 'ok'`    | `WHERE ${clause:raw}`            | 不转义，必须只用于受控变量                            |
| `${ids:json}`          | `[1,2,3]`          | JSON 函数或 JSON 字段查询        | 输出 JSON 数组，不是普通 `IN` 列表                    |
| `$__interval`          | `5m`               | `$__timeGroup(ts,$__interval)`   | SQL macro 的时间分组间隔参数                          |
| `$__interval_ms`       | `300000`           | 数值表达式或自定义 bucket        | `$__interval` 的毫秒数                                |

#### SQL Macro Output

| Macro                                       | 参数                          | Output / MySQL 示例                                                      | 说明                                   |
| ------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `$__time(column)`                           | `column`                      | `UNIX_TIMESTAMP(column) AS time_sec`                                     | 把时间列转换为 Grafana 识别的时间列    |
| `$__timeEpoch(column)`                      | `column`                      | `UNIX_TIMESTAMP(column) AS time_sec`                                     | 把时间列转换为 Unix epoch 时间         |
| `$__timeFilter(column)`                     | `column`                      | `column BETWEEN FROM_UNIXTIME(1494410783) AND FROM_UNIXTIME(1494410983)` | 当前 Dashboard 时间范围过滤条件        |
| `$timeFilter`                               | 无                            | `time > now() - 7d`                                                      | 当前时间范围表达式，具体输出依赖数据源 |
| `$__timeFrom()`                             | 无                            | `FROM_UNIXTIME(1494410783)`                                              | Dashboard 开始时间，SQL 时间表达式     |
| `$__timeTo()`                               | 无                            | `FROM_UNIXTIME(1494410983)`                                              | Dashboard 结束时间，SQL 时间表达式     |
| `$__timeGroup(column,'5m')`                 | `column`, `interval`          | `cast(cast(UNIX_TIMESTAMP(column)/300 as signed)*300 as signed)`         | 按时间间隔分组                         |
| `$__timeGroup(column,'5m',0)`               | `column`, `interval`, `fill`  | 同上，Grafana 补缺失点为 `0`                                             | 按时间间隔分组并补点                   |
| `$__timeGroup(column,'5m',NULL)`            | `column`, `interval`, `fill`  | 同上，Grafana 补缺失点为 `NULL`                                          | 按时间间隔分组并补 `NULL`              |
| `$__timeGroup(column,'5m',previous)`        | `column`, `interval`, `fill`  | 同上，Grafana 用前一个值补点                                             | 按时间间隔分组并延续前值               |
| `$__timeGroupAlias(column,'5m')`            | `column`, `interval`, `fill?` | `$__timeGroup(...) AS time`                                              | 按时间间隔分组，并把结果别名为 `time`  |
| `$__unixEpochFilter(column)`                | `column`                      | `column > 1494410783 AND column < 1494497183`                            | Unix 秒级时间范围过滤                  |
| `$__unixEpochFrom()`                        | 无                            | `1494410783`                                                             | Dashboard 开始时间，Unix 秒            |
| `$__unixEpochTo()`                          | 无                            | `1494497183`                                                             | Dashboard 结束时间，Unix 秒            |
| `$__unixEpochNanoFilter(column)`            | `column`                      | `column > 1494410783152415214 AND column < 1494497183142514872`          | Unix 纳秒时间范围过滤                  |
| `$__unixEpochNanoFrom()`                    | 无                            | `1494410783152415214`                                                    | Dashboard 开始时间，Unix 纳秒          |
| `$__unixEpochNanoTo()`                      | 无                            | `1494497183142514872`                                                    | Dashboard 结束时间，Unix 纳秒          |
| `$__unixEpochGroup(column,'5m',fill?)`      | `column`, `interval`, `fill?` | 类似 `$__timeGroup`，但输入列是 Unix 秒                                  | Unix 秒级时间按间隔分组                |
| `$__unixEpochGroupAlias(column,'5m',fill?)` | `column`, `interval`, `fill?` | 类似 `$__unixEpochGroup(...) AS time`                                    | Unix 秒级时间按间隔分组并命名为 `time` |

```sql
SELECT
  $__timeGroupAlias(created_at, $__interval, 0),
  count(*) AS value
FROM audit_logs
WHERE $__timeFilter(created_at)
  AND user_id IN (${user_ids:csv})
  AND status IN (${status:sqlstring})
GROUP BY 1
ORDER BY 1;
```

- 参考
  - https://grafana.com/docs/grafana/latest/datasources/mysql/query-editor/
  - https://github.com/grafana/grafana/blob/main/packages/grafana-sql/src/constants.ts

### Metadata Macro

| Macro                 | 说明             |
| --------------------- | ---------------- |
| `${__plugin.id}`      | 当前插件 ID      |
| `${__plugin.version}` | 当前插件版本     |
| `${__ds.uid}`         | 当前数据源 UID   |
| `${__ds.name}`        | 当前数据源名称   |
| `${__user.login}`     | 当前用户登录名   |
| `${__user.email}`     | 当前用户邮箱     |
| `${__user.name}`      | 当前用户显示名称 |

- `${__user.*}` 在告警、录制查询、公开 dashboard 等没有用户会话的场景可能不可用。
- 参考
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/macros/
  - https://grafana.com/docs/grafana/latest/visualizations/dashboards/variables/global-variables/
  - https://raw.githubusercontent.com/grafana/grafana/master/docs/sources/visualizations/dashboards/variables/global-variables.md

## annotations

```sql
SELECT
  created_at,
  action,
  operator,
  id,
  target,
  title ,
  text
FROM audit_logs
WHERE $__timeFilter(created_at)
-- WHERE created_at >= FROM_UNIXTIME($__unixEpochFrom()) AND created_at <= FROM_UNIXTIME($__unixEpochTo())
ORDER BY id DESC
LIMIT 50;
```

- `$__timeFilter(created_at)`
  - -> `created_at BETWEEN '2023-11-28 10:00:00' AND '2023-11-28 11:00:00'`
- Quota 问题
  - multi value 的时候
  - `${var:raw}` 得到原始，然后自己做 quote 处理

## Variable Formatting Options

语法：`${var_name:format}`

| 格式             | 输出          | 转义 & 结合逻辑                                         | 常见用途                  |
| :--------------- | :------------ | :------------------------------------------------------ | :------------------------ |
| `:regex`         | `(a\.b\|c)`   | **转义** 正则特殊字符（`.` -> `\.`），外层加 **括号**。 | `{label=~"${var:regex}"}` |
| `:pipe`          | `a.b\|c`      | **不转义** 特殊字符，仅用 `\|` 分隔，**无括号**。       | 自定义正则组合            |
| `:raw`           | `a.b,c`       | **不转义**，多选时以 **逗号** 分隔。                    | 别名、防止二次转义        |
| `:csv`           | `a.b,c`       | 同 `:raw`，逗号分隔。                                   | SQL `IN` 操作 (非字符串)  |
| `:json`          | `["a.b","c"]` | 转换为 JSON 数组格式。                                  | API 请求体                |
| `:percentencode` | `a.b%2Cc`     | URL 编码（主要针对分隔符）。                            | URL 参数                  |
| `:singlequote`   | `'a.b','c'`   | 单引号包裹，逗号分隔。                                  | SQL 字符串列表            |
| `:doublequote`   | `"a.b","c"`   | 双引号包裹，逗号分隔。                                  | JSON 或某些 SQL           |
| `:sqlstring`     | `'a.b','c'`   | 单引号包裹，并 **转义单引号** (`'` -> `''`)。           | 安全的 SQL 注入防护       |
| `:glob`          | `{a.b,c}`     | Glob 格式。                                             | Graphite 查询             |
