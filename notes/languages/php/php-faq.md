---
title: PHP FAQ
tags:
  - FAQ
---

# PHP FAQ

```bash
php -m    # 查看已经加载的模块
php --ini # 查看配置文件
php -i    # phpinfo
php -r 'echo "Hello, World!\n";'
```

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

- sodium_crypto_aead_aes256gcm_is_available()

## Allowed memory size of 134217728 bytes exhausted (tried to allocate 65011744 bytes)

- php.ini
  - memory_limit=128M

```php
<?
ini_set('memory_limit', '-1');
```

## epoll_wait() reported that client prematurely closed connection, so upstream connection is closed too while sending request to upstream

## Declaration of Monolog\Logger must be compatible with PsrExt\Log\LoggerInterface

```bash
apk del php82-pecl-psr
```

- psr-4 已经弃用？

## ZipArchive 文件名乱码

```php
<?php

$zip = new ZipArchive();
if ($zip->open('./test.zip') === TRUE) {
    $numFiles = $zip->numFiles;

    for ($i = 0; $i < $numFiles; $i++) {
        $statInfo = $zip->statIndex($i, ZipArchive::FL_ENC_RAW);
        $encoding = mb_detect_encoding($statInfo['name'], array("UTF-8", "GBK", "ISO-8859-1", "ASCII"));
        // CP936=GBK
        echo "Encoding: " . $encoding . PHP_EOL;
        // $filename = iconv($encoding, 'UTF-8//IGNORE', $statInfo['name']);
        // php-intl, icu
        $filename = mb_convert_encoding($statInfo['name'], 'UTF-8', $encoding);
        echo "文件名: " . $filename . PHP_EOL;
    }

    $zip->close();
} else {
    echo '无法打开 ZIP 文件';
}
```

- mb_list_encodings
  - 显示所有支持的编码

## Alpine iconv

> iconv(): Wrong encoding, conversion from "CP936" to "UTF-8//IGNORE" is not allowed

- 使用 mb_convert_encoding 替代 iconv
- PHP7.2+ 使用 icu 替代 libiconv

```bash
apk del icu-data-en   # php83-intl
apk add icu-data-full # php83-intl
```

```bash
# 旧版本 - 现在没有 2021 移除了 preloadable_libiconv.so
LD_PRELOAD=/usr/lib/preloadable_libiconv.so php test.php
```

- https://github.com/docker-library/php/issues/1121
- https://gitlab.alpinelinux.org/alpine/aports/-/issues/12328
