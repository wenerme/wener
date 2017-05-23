# PHP

## Tips
* https://github.com/psecio/iniscan
* https://www.owasp.org/index.php/PHP_Configuration_Cheat_Sheet
* http://www.phptherightway.com/

```bash
# CentOS
# 查看安装文件
rpm -ql php-fpm
yum instal yum-utils
# 查看已安装的文件
repoquery -lq --installed time
```

```ini
# PHP 常用配置
date.timezone=Asia/Shanghai
```

## Docker

__php.dockerfile__
```dockerfile
FROM php:5-apache
RUN apt-get update
RUN apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev  \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb
RUN pecl install redis && docker-php-ext-enable redis
```

__php-nginx.dockerfile__
```dockerfile
FROM php:5-fpm
RUN apt-get update
RUN apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev  \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb
RUN pecl install redis && docker-php-ext-enable redis

RUN apt-get install -y nginx

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
```

__entrypoint.sh__
```shell
#!/bin/sh
set -e
set -o xtrace
[ -z "$WWW_ROOT" ] || sed -i -e "s#/var/www/html#$WWW_ROOT#g" /etc/nginx/nginx.conf

php-fpm -t && nginx -t

php-fpm -D
nginx -g 'daemon off;'
```

使用 nginx, 运行时需要映射适当的 nginx.conf

## laravel

https://github.com/illuminate/database

```bash
# 可使用代理 https_proxy=http://127.0.0.1:7777 http_proxy=http://127.0.0.1:7777
composer global require -vvv "laravel/lumen-installer"
composer create-project --prefer-dist laravel/lumen  -vvv blog
cd blog
php -S localhost:8000 -t ./public

php artisan make:migration create_users_table
# 修改 Mirage 下的数据,添加 User 表的 migrate
# 添加 UserTableSeeder 往 User 插入数据
php artisan migrate
# 可以回滚
php artisan migrate:rollback
# 调用 seeder
php artisan db:seed
```

* fpm [配置项](http://php.net/manual/zh/install.fpm.configuration.php)
  * 计算 pm.max_children [参考](http://myshell.co.uk/blog/2012/07/adjusting-child-processes-for-php-fpm-nginx/)

## CentOS
* 参考 https://www.centos.org/forums/viewtopic.php?t=52586
```bash
# 7.x
rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
# 该仓库中的内容可以查看 https://uk.repo.webtatic.com/yum/el7/SRPMS/RPMS/
# 现在可以直接安装 56 版本
yum install php56w php56w-opcache
# 也可以使用插件来替换本地的 php 版本
yum install yum-plugin-replace
yum replace --enablerepo=webtatic-testing php-common --replace-with=php56w-common
```

## Composer
* [paquettg/php-html-parser](https://github.com/paquettg/php-html-parser)

```bash
# 初始化
composer init
# 添加依赖
composer require paquettg/php-html-parser
# 移除依赖
composer remove paquettg/php-html-parser
# 安装依赖
composer install
# 更新依赖
composer update
composer update --lock
composer dump-autoload --optimize


composer about
composer archive
composer browse
composer clear-cache
composer config --list
composer create-project symfony/standard-edition dir/
composer depends vendor-name/package-name
composer diagnose
composer global
composer help
composer init
composer licenses
composer list
composer remove
composer run-script
composer search my keywords
composer self-update
composer show
composer suggest
composer status
composer validate
```

* 安装好后只需要添加一下 autoload 即可使用
```php
<?php
require "vendor/autoload.php";
```
