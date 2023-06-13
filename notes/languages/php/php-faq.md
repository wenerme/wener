---
title: PHP FAQ
tags:
  - FAQ
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

## redis session

- [How to Set Up a Redis Server as a Session Handler for PHP on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-redis-server-as-a-session-handler-for-php-on-ubuntu-14-04)
- php5-redis

**/etc/php5/fpm/php.ini**

```ini
session.save_handler = redis
# key 格式
# PHPREDIS_SESSION:j9rsgtde6st2rqb6lu5u6f4h83
session.save_path = "tcp://10.10.1.1:6379?auth=yourverycomplexpasswordhere"
```

## 强制类型

```php
<?
declare(strict_types=1)
```

- [strict_types](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.strict)
  - 不允许 弱类型 类型转换

## Connection to `ssl://pecl.php.net:443' failed: Unable to find the socket transport "ssl" - did you forget to enable it when you configured PHP


```bash
apk add php7-openssl
```

<!--
```init php.ini
extension=php_openssl.dll
```
-->

## sodium_crypto_aead_aes256gcm_decrypt

```bash
apk add php7-sodium
```

-  sodium_crypto_aead_aes256gcm_is_available()

## Allowed memory size of 134217728 bytes exhausted (tried to allocate 65011744 bytes)

- php.ini
  - memory_limit=128M

```php
<?
ini_set('memory_limit', '-1');
```
