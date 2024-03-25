---
title: timezone
---

# timezone

```
2024-03-15T06:00:00.000+08:00
```

| abbr. | for                        | offset | cn               |
| ----- | -------------------------- | ------ | ---------------- |
| CST   | China Standard Time        | +08:00 | 中国标准时间     |
| UTC   | Coordinated Universal Time | +00:00 | 世界协调时间     |
| GMT   | Greenwich Mean Time        | +00:00 | 格林尼治标准时间 |
| EST   | Eastern Standard Time      | -05:00 | 东部标准时间     |
| PST   | Pacific Standard Time      | -08:00 | 太平洋标准时间   |
| EDT   | Eastern Daylight Time      | -04:00 | 东部夏令时间     |
| PDT   | Pacific Daylight Time      | -07:00 | 太平洋夏令时间   |

- [Time zone](https://en.wikipedia.org/wiki/Time_zone)

## shell

```bash
adjtimex  # 确认时间同步
date +%z  # +0800
date +%:z # +08:00
date +%Z  # CST
TZ=UTC date
TZ=Asia/Shanghai date
```

## JS Date.prototype.toJSON

```js
// 默认 toJSON 为 UTC
const now = new Date(2021, 12, 12, 0, 0, 0);
// now.getTimezoneOffset() // local timezone offset
console.assert(now.toJSON() === now.toISOString());
JSON.stringify({ now });

Date.prototype.toJSON = function () {
  // return moment(this).format();
  // return format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") // date-fns
  return dayjs(this).format();
};
```

| method                                               | format                        |
| ---------------------------------------------------- | ----------------------------- |
| now.toJSON()                                         | 2022-01-11T16:00:00.000Z      |
| moment(now).format()                                 | 2022-01-12T00:00:00+08:00     |
| dayjs(now).format()                                  | 2022-01-12T00:00:00+08:00     |
| date-fns format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") | 2022-01-12T00:00:00.000+08:00 |

## JS Date timezone offset

```ts
new Date(2023, 2, 18); // 2023-03-17T16:00:00.000Z
new Date(Date.UTC(2023, 2, 18)); // 2023-03-18T00:00:00.000Z
```

## Java

- JVM `-Duser.timezone=Asia/Shanghai`

**sprintboot**

```xml
<properties>
  <spring-boot.run.jvmArguments>-Duser.timezone=UTC</spring-boot.run.jvmArguments>
</properties>
```

## MySQL

```mysql
show global variables like '%time_zone';

select now();
```

| var              | val    |
| ---------------- | ------ |
| system_time_zone | CST    |
| time_zone        | SYSTEM |

- UTC - Coordinated Universal Time - 世界标准时间
- GMT - Greenwich Mean Time - 格林尼治标准时间
- CST
  - China Standard Time - 中国标准时间 - UT+8:00
  - Central Time Zone - 北美中部时间 USA - UT-6:00
  - Cuba Standard Time UT-4:00
- EST - Eastern Time Zone
- https://timezonedb.com/time-zones/Asia/Shanghai
