---
title: Linux 时间与时区 (Date & Time)
tags:
  - Linux
  - SysAdmin
  - Date
  - Time
  - Timezone
---

# Linux 时间与时区 (Date & Time) {#linux-date-time}

```bash
# 获取时区
date +"%Z %z"
```

- `/etc/localtime`: 符号链接
  - e.g., `/etc/localtime -> /etc/zoneinfo/Asia/Shanghai`
- `/etc/timezone`: 纯文本时区名称

## 使用环境变量 (Environment Variable) {#env-usage}

```bash
TZ=America/New_York date
TZ=Asia/Shanghai date
```

## 配置 (Configuration) {#configuration}

```bash
# systemd
timedatectl set-timezone Etc/GMT-6
```

- `tzdata`: 时区数据包
- GNU libc 读取 `/etc/localtime`

- [What is /etc/timezone used for? - Unix StackExchange](https://unix.stackexchange.com/questions/452559/what-is-etc-timezone-used-for)
