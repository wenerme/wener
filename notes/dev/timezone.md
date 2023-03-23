---
title: timezone
---

# timezone

```bash
adjtimex  # 确认时间同步
date +%z  # +0800
date +%:z # +08:00
date +%Z  # CST
TZ=UTC date
TZ=Asia/Shanghai date
```

## Java

- -Duser.timezone=Asia/Shanghai

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
