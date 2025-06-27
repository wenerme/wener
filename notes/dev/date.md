---
tags:
  - Topic
---

# Date & Time

- JSON 标准为 ISO Date String `RFC 3339` - `2022-01-12T00:00:00Z`
- 主要操作对象
  - Date
  - DateTime
  - Duration
  - Interval - start, end
  - Calendar - 日历
- jsonschema
  - type=string
    - format=date-time - `yyyy-MM-dd HH:mm:ssZ` - `2022-01-12T00:00:00Z`
    - format=date - `yyyy-MM-dd` - `2022-01-12`
    - format=time - `HH:mm:ss` - `00:00:00`
      - `hh:mm:ss[.sss][Z|(+|-)hh:mm]`
- 标准
  - ISO 8601
    - ISO WeekDate 2017-W24-5
  - RFC 3339
    - ISO 8601 规范化版本
  - RFC 2822 常用于电子邮件
  - Unix Timestamp
    - 自 1970-01-01T00:00:00Z（UTC） 起的秒数
- JS/TS
  - Date
  - Intl for Locale and Timezone
  - Temporal
    - https://tc39.es/proposal-temporal/docs/
  - [luxon](https://github.com/moment/luxon)
    - MIT, JS
    - 🌟 推荐 如果不考虑 bundle size 优先选择 luxon
    - 80Kb/20Kb minified/gzipped
    - moment.js 的替代品 - immutable
    - https://moment.github.io/luxon/
  - [dayjs](https://github.com/iamkun/dayjs)
    - 7kB/3kB minified/gzipped
    - 2kB alternative to Moment.js with the same modern API
    - moment.js 最小化替代
    - 通过 plugin 提供大部分额外功能
    - https://day.js.org/
  - moment.js
    - 项目处于 sunset 阶段 https://momentjs.com/docs/
  - [date-fns](https://github.com/date-fns/date-fns)
    - 操作 JS 的 Date 对象
    - 函数，独立功能
  - chrono - 语意化时间解析
  - https://npmtrends.com/date-fns-vs-dayjs-vs-luxon-vs-moment
- Java
  - java.time - JSR-310, Java 8
    - 来自于 [JodaOrg/joda-time](https://github.com/JodaOrg/joda-time)
      - https://www.joda.org/joda-time/
    - JS - js-joda
    - .NET - [nodatime](https://github.com/nodatime/nodatime)
- PostgreSQL
  - https://www.postgresql.org/docs/current/datatype-datetime.html

```ts
// 得到的是 UTC 时间
new Date('2021-01-02').getTime() === new Date('2021-01-02T00:00:00Z').getTime();

// 有 daylight savings 的时区可能有问题
// https://github.com/iamkun/dayjs/issues/1260
// 目前 luxon 能处理好这样的情况
dayjs.utc('2020-03-04T10:00:00Z').tz('America/New_York').add(1, 'week').$offset;
// offset should be -240 since DST happens on 2020-03-05
// but the offset remains what the starting offset is, (-300)

// luxon 结果为 -240
luxon.DateTime.fromISO('2020-03-04T10:00:00Z', { zone: 'utc' }).setZone('America/New_York').plus({ weeks: 1 }).offset;
```

| abbr. | stand for                  | mean             |
| ----- | -------------------------- | ---------------- |
| UTC   | Coordinated Universal Time | 协调世界时       |
| GMT   | Greenwich Mean Time        | 格林尼治标准时间 |

## Format

- `new Date().toString()`
- `Day MMM DD YYYY HH:mm:ss GMT±HHMM (TimeZone)`

```js
// Day MMM DD YYYY HH:mm:ss GMT±HHMM (TimeZone)
// Fri Oct 08 2010 07:06:05 GMT+0800 (China Standard Time)
new Date(2010, 9, 8, 7, 6, 5).toString();

// RFC 2822 常用于电子邮件
// HTTP 头
// Day, DD MMM YYYY HH:mm:ss GMT
// Thu, 07 Oct 2010 23:06:05 GMT
new Date(2010, 9, 8, 7, 6, 5).toGMTString();
```

- [strftime](https://www.man7.org/linux/man-pages/man3/strftime.3.html)
  - RFC 2822 `%a, %d %b %Y %T %z`
  - RFC 3339 `%Y-%m-%dT%H:%M:%S%z`
  - RFC 822 `%a, %d %b %y %T %z`
  - JS [samsonjs/strftime](https://github.com/samsonjs/strftime)
- Unicode CLDR
  - https://cldr.unicode.org/translation/date-time/date-time-symbols
  - https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
- date-fns
  - Unicode 日期时间标识符（CLDR 格式）
  - https://date-fns.org/docs/format
  - https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md
- dayjs
  - 使用自定义格式化字符串
  - https://day.js.org/docs/en/display/format
- luxon
  - https://moment.github.io/luxon/#/formatting?id=table-of-tokens

| meaning     | CLDR | notes      |
| ----------- | ---- | ---------- |
| era         | G    | AD         |
| year        | y    | 989,2017   |
| ^           | yy   | 89,17      |
| month       | M    | September  |
| ^           | L    | Standalone |
| Day of week | E    | Tuesday    |
| ^           | c    | Standalone |
| day         | d    |
| hour        | h    | 12h        |
| ^           | H    | 0-23h      |
| ^           | K    | 0-11h      |
| ^           | k    | 1-24h      |
| minute      | m    |
| second      | s    |
| day period  | a    | AM/PM      |
| ^           | b    |
| ^           | B    |
| timezone    | z/v  |
| Quarter     | Q    |
| `'`         |      |

## Duration

| unit | for     | cn   |
| ---- | ------- | ---- |
| y    | year    | 年   |
| M    | month   | 月   |
| w    | week    | 周   |
| d    | day     | 天   |
| h    | hour    | 小时 |
| m    | minute  | 分钟 |
| s    | second  | 秒   |
| Q    | quarter | 季度 |

- ISO 8601 Duration
- `P[n]Y[n]M[n]DT[n]H[n]M[n]S`
- PostgreSQL Interval
  - 输入格式
    - `P [ years-months-days ] [ T hours:minutes:seconds ]`
    - `1 year 2 months 3 days 4 hours 5 minutes 6 seconds`
    - `P1Y2M3DT4H5M6S`
    - `P0001-02-03T04:05:06`
    - `1-2` 1 year 2 months
    - `3 4:05:06` 3 days 4 hours 5 minutes 6 seconds

## Relative Time

- Grafana
  - `now-6h` - 6 小时前

## Grafana

- isRelativeTimeRange
  - 只要包含 now 就是
- 默认 number 为 秒 单位

```ts
export function getDefaultTimeRange(): TimeRange {
  const now = dateTime();

  return {
    from: dateTime(now).subtract(6, 'hour'),
    to: now,
    raw: { from: 'now-6h', to: 'now' },
  };
}
```

| from      | to        | display                    | cn               |
| --------- | --------- | -------------------------- | ---------------- |
| now/d     | now/d     | Today                      | 今天             |
| now/d     | now       | Today so far               | 今天到目前为止   |
| now/w     | now/w     | This week                  | 本周             |
| now/w     | now       | This week so far           | 本周到目前为止   |
| now/M     | now/M     | This month                 | 本月             |
| now/M     | now       | This month so far          | 本月到目前为止   |
| now/y     | now/y     | This year                  | 今年             |
| now/y     | now       | This year so far           | 今年到目前为止   |
| now-1d/d  | now-1d/d  | Yesterday                  | 昨天             |
| now-2d/d  | now-2d/d  | Day before yesterday       | 前天             |
| now-7d/d  | now-7d/d  | This day last week         | 上周的这一天     |
| now-1w/w  | now-1w/w  | Previous week              | 上周             |
| now-1M/M  | now-1M/M  | Previous month             | 上个月           |
| now-1Q/fQ | now-1Q/fQ | Previous fiscal quarter    | 上个财季         |
| now-1y/y  | now-1y/y  | Previous year              | 去年             |
| now-1y/fy | now-1y/fy | Previous fiscal year       | 上个财年         |
| now-5m    | now       | Last 5 minutes             | 过去5分钟        |
| now-15m   | now       | Last 15 minutes            | 过去15分钟       |
| now-30m   | now       | Last 30 minutes            | 过去30分钟       |
| now-1h    | now       | Last 1 hour                | 过去1小时        |
| now-3h    | now       | Last 3 hours               | 过去3小时        |
| now-6h    | now       | Last 6 hours               | 过去6小时        |
| now-12h   | now       | Last 12 hours              | 过去12小时       |
| now-24h   | now       | Last 24 hours              | 过去24小时       |
| now-2d    | now       | Last 2 days                | 过去2天          |
| now-7d    | now       | Last 7 days                | 过去7天          |
| now-30d   | now       | Last 30 days               | 过去30天         |
| now-90d   | now       | Last 90 days               | 过去90天         |
| now-6M    | now       | Last 6 months              | 过去6个月        |
| now-1y    | now       | Last 1 year                | 过去1年          |
| now-2y    | now       | Last 2 years               | 过去2年          |
| now-5y    | now       | Last 5 years               | 过去5年          |
| now/fQ    | now       | This fiscal quarter so far | 本财季到目前为止 |
| now/fQ    | now/fQ    | This fiscal quarter        | 本财季           |
| now/fy    | now       | This fiscal year so far    | 本财年到目前为止 |
| now/fy    | now/fy    | This fiscal year           | 本财年           |

| from | to      | display         | cn             |
| ---- | ------- | --------------- | -------------- |
| now  | now+1m  | Next minute     | 下一分钟       |
| now  | now+5m  | Next 5 minutes  | 接下来的5分钟  |
| now  | now+15m | Next 15 minutes | 接下来的15分钟 |
| now  | now+30m | Next 30 minutes | 接下来的30分钟 |
| now  | now+1h  | Next hour       | 下一小时       |
| now  | now+3h  | Next 3 hours    | 接下来的3小时  |
| now  | now+6h  | Next 6 hours    | 接下来的6小时  |
| now  | now+12h | Next 12 hours   | 接下来的12小时 |
| now  | now+24h | Next 24 hours   | 接下来的24小时 |
| now  | now+2d  | Next 2 days     | 接下来的2天    |
| now  | now+7d  | Next 7 days     | 接下来的7天    |
| now  | now+30d | Next 30 days    | 接下来的30天   |
| now  | now+90d | Next 90 days    | 接下来的90天   |
| now  | now+6M  | Next 6 months   | 接下来的6个月  |
| now  | now+1y  | Next year       | 下一年         |
| now  | now+2y  | Next 2 years    | 接下来的2年    |
| now  | now+5y  | Next 5 years    | 接下来的5年    |

---

- 解析核心逻辑是 datemath + round
- https://github.com/grafana/grafana/blob/3724ffd8589aaae1528a6d9b562521ee5eda20af/packages/grafana-data/src/datetime/rangeutil.ts
- https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/#query-options
- dateTimeParse https://github.com/grafana/grafana/blob/3724ffd8589aaae1528a6d9b562521ee5eda20af/packages/grafana-data/src/datetime/parser.ts#L43-L53
- parseDateMath https://github.com/grafana/grafana/blob/3724ffd8589aaae1528a6d9b562521ee5eda20af/packages/grafana-data/src/datetime/datemath.ts#L119-L199

## MomentJS

```ts
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});
```

- https://github.com/moment/momentjs.com/blob/master/docs/moment/07-customization/07-relative-time.md
