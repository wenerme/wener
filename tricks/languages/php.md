# PHP

## Tips
* https://github.com/psecio/iniscan
* https://www.owasp.org/index.php/PHP_Configuration_Cheat_Sheet
* http://www.phptherightway.com/
* [PHP-FIG](http://www.php-fig.org/)
  * [PSRs](http://www.php-fig.org/psr/)

```bash
# CentOS
# 查看安装文件
rpm -ql php-fpm
yum instal yum-utils
# 查看已安装的文件
repoquery -lq --installed time

# 內建 web 服务
# http://php.net/manual/zh/features.commandline.webserver.php
http://php.net/manual/zh/features.commandline.webserver.php
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
* [laravel](https://laravel.com/)
* http://www.golaravel.com/
* [awesome-laravel](https://github.com/chiraggude/awesome-laravel)
* ORM [illuminate](https://github.com/illuminate/database)
* [laravel-china](https://laravel-china.org/) - 中文社区

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

### Lumen
* Laravel [Lumen](https://lumen.laravel.com/)
  * The stunningly fast micro-framework by Laravel.
* 主要做 REST 服务


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
* [国内镜像](https://pkg.phpcomposer.com/)

```bash
# 使用国内镜像
# 修改全局配置
composer config -g repo.packagist composer https://packagist.phpcomposer.com
# 修改当前项目
composer config repo.packagist composer https://packagist.phpcomposer.com


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

## ThinkPHP5
* [ThinkPHP5.0完全开发手册](https://www.kancloud.cn/manual/thinkphp5)
* 需求
  * PHP >= 5.4.0
  * PDO PHP Extension
  * MBstring PHP Extension
  * CURL PHP Extension

```bash
composer create-project topthink/think tp5  --prefer-dist
cd tp5


# 启动自带 web 服务器
php -S localhost:8888 application/route.php

# 使得 think 可执行
# 不操作这一步也可以直接使用 php think 来执行
chmod +x think
# 查看所有命令
./think list
# Available commands:
#   build              Build Application Dirs
#   clear              Clear runtime file
#   help               Displays help for a command
#   list               Lists commands
#  make
#   make:controller    Create a new resource controller class
#   make:model         Create a new model class
#  optimize
#   optimize:autoload  Optimizes PSR0 and PSR4 packages to be loaded with classmaps too, good for production.
#   optimize:config    Build config and common file cache.
#   optimize:route     Build route cache.
#   optimize:schema    Build database schema cache.

# 生成定义的文件
# 默认会使用 application/build.php
./think build
# 使用指定的配置文件
./think build --config build.php
```

### 目录结构
```
project  应用部署目录
├─application           应用目录（可设置）
│  ├─common             公共模块目录（可更改）
│  ├─index              模块目录(可更改)
│  │  ├─config.php      模块配置文件
│  │  ├─common.php      模块函数文件
│  │  ├─controller      控制器目录
│  │  ├─model           模型目录
│  │  ├─view            视图目录
│  │  └─ ...            更多类库目录
│  ├─command.php        命令行工具配置文件
│  ├─common.php         应用公共（函数）文件
│  ├─config.php         应用（公共）配置文件
│  ├─database.php       数据库配置文件
│  ├─tags.php           应用行为扩展定义文件
|  ├─build.php          自动生成定义文件
│  └─route.php          路由配置文件
├─extend                扩展类库目录（可定义）
├─public                WEB 部署目录（对外访问目录）
│  ├─static             静态资源存放目录(css,js,image)
│  ├─index.php          应用入口文件
│  ├─router.php         快速测试文件
│  └─.htaccess          用于 apache 的重写
├─runtime               应用的运行时目录（可写，可设置）
├─vendor                第三方类库目录（Composer）
├─thinkphp              框架系统目录
│  ├─lang               语言包目录
│  ├─library            框架核心类库目录
│  │  ├─think           Think 类库包目录
│  │  └─traits          系统 Traits 目录
│  ├─tpl                系统模板目录
│  ├─.htaccess          用于 apache 的重写
│  ├─.travis.yml        CI 定义文件
│  ├─base.php           基础定义文件
│  ├─composer.json      composer 定义文件
│  ├─console.php        控制台入口文件
│  ├─convention.php     惯例配置文件
│  ├─helper.php         助手函数文件（可选）
│  ├─LICENSE.txt        授权说明文件
│  ├─phpunit.xml        单元测试配置文件
│  ├─README.md          README 文件
│  └─start.php          框架引导文件
├─build.php             自动生成定义文件（参考）
├─composer.json         composer 定义文件
├─LICENSE.txt           授权说明文件
├─README.md             README 文件
├─think                 命令行入口文件
```

## 代码
* `thinkphp/start.php`
  * 系统默认的一个引导文件
  * 加载系统常量定义
  * 加载环境变量定义文件
  * 注册自动加载机制
  * 注册错误和异常处理机制
  * 加载惯例配置文件
  * 执行应用
  * 首先会调用base.php基础引导文件，某些特殊需求下面可能直接在入口文件中引入基础引导文件。
* 路由
  * `__miss__` 定义未找到时的操作
  * `[blog]` 分组使用 `[]` 标示
* 控制器
  * 标准控制器支持 请求方法+路径 的转换
  * 资源控制支持以下方法映射

  标识  |请求类型|生成路由规则|对应操作方法（默认）
  ------|----|----|----
  index |GET    |blog         |index
  create|GET    |blog/create	|create
  save  |POST	  |blog	        |save
  read	|GET	  |blog/:id	    |read
  edit	|GET	  |blog/:id/edit|edit
  update|PUT    |blog/:id	    |update
  delete|DELETE	|blog/:id	    |delete
* 模型
  * 支持数据库表映射
  * 支持基本的增删改查操作
