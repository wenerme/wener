---
title: PHP Pecl
---

# PHP Pecl

:::info

After Alpine v3.5, the `/usr/bin/php` is php7, before that is php5 in php5-cli package.

:::

```bash
# igbinary
# https://pecl.php.net/package/igbinary
pecl install -o -f igbinary

# redis
# OPTIONS: igbinary, lzf
# https://pecl.php.net/package/redis
pecl install -o -f redis <<<""
# build
apk add xz-dev
pecl install -o -f redis < <(echo -e "yes\nyes")
# 有些环境下不支持 < <() 语法可以这样
echo -e "yes\nyes" | pecl install -o -f redis

# imagick
apk add imagemagick-dev
pecl install -o -f imagick <<<""

# protobuf
pecl install -o -f protobuf
pecl install -o -f grpc

# yaml
# require php7
apk add yaml-dev
pecl install -o -f yaml <<<""

# mongodb
pecl install -o -f mongodb

# APCU
# require php7
# OPTIONS internal debug
pecl install -o -f apcu <<<no

# AMQP
# https://pecl.php.net/package/amqp
# 是动态编译的, 运行时需要安装 rabbitmq-c
apk add rabbitmq-c-dev
pecl install -o -f amqp <<<""

# swoole
# https://pecl.php.net/package/swoole
# Event-driven asynchronous and concurrent networking engine with high performance for PHP.
# OPTIONS: debug/trace log, sockets, openssl, http2 -> nghttp2-dev, async-redis -> hiredis, mysqlnd
# all no
pecl install -o -f swoole <<<""

apk add nghttp2-dev hiredis-dev
# all yes except trace log
pecl install -o -f swoole < <(echo -e "no\nyes\nyes\nyes\nyes\nyes")

# memcached
# require php7

# memcache
# php5
```
