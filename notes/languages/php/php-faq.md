---
title: PHP FAQ
---

# PHP FAQ

## Timezone

- 默认使用 TZ 环境变量

```php
<?php
date_default_timezone_set('Asia/Shanghai');

$script_tz = date_default_timezone_get();
if (strcmp($script_tz, ini_get('date.timezone'))){
    echo '时区与INI配置 不同';
} else {
    echo '时区与INI配置 相同'
}
```

**php.ini**

```ini
[Date]
; Defines the default timezone used by the date functions
; http://php.net/date.timezone
; https://www.php.net/manual/en/timezones.asia.php
date.timezone = "Asia/Shanghai"
```
