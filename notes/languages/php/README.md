---
title: PHP
---

# PHP

| spec   |
| ------ | --------------------------- |
| PSR-1  | Basic Coding Standard       |
| PSR-2  | ~~Coding Style Guide~~      |
| PSR-3  | Logger Interface            |
| PSR-4  | Autoloading Standard        |
| PSR-6  | Caching Interface           |
| PSR-7  | HTTP Message Interface      |
| PSR-11 | Container Interface         |
| PSR-12 | Extended Coding Style Guide |
| PSR-13 | Hypermedia Links            |
| PSR-14 | Event Dispatcher            |
| PSR-15 | HTTP Handlers               |
| PSR-16 | Simple Cache                |
| PSR-17 | HTTP Factories              |
| PSR-18 | HTTP Client                 |

- [PHP Standards Recommendations](https://www.php-fig.org/psr/)

---

- 缓存
  - APC
    - 支持 opcode 和 数据缓存
    - System Cache Entries
    - Per-Directory Entries
    - User Cache Entries
  - APCu
    - 提供 APC 中的数据缓存功能
  - XCache
  - OPCache
    - 5.5 集成
    - 替代 APC 的 opcode 缓存, XCache

```bash
# CentOS
# 查看安装文件
rpm -ql php-fpm
yum instal yum-utils
# 查看已安装的文件
repoquery -lq --installed time

# 內建 web 服务
# http://php.net/manual/zh/features.commandline.webserver.php
php -S 0.0.0.0:8082 -c php.ini

# 判断是否有响应模块
php -i "(command-line 'phpinfo()')" | grep -i grpc
```

```ini
# PHP 常用配置
date.timezone=Asia/Shanghai
```

## Docker

```bash
# wener/php:app
# php7 + nginx + mongo,redis,grpc extension + composer
docker run --rm -it --entrypoint bash wener/php:app
```

## PHP 7

- opcache

## laravel

- [laravel](https://laravel.com/)
- http://www.golaravel.com/
- [awesome-laravel](https://github.com/chiraggude/awesome-laravel)
- ORM [illuminate](https://github.com/illuminate/database)
- [laravel-china](https://laravel-china.org/) - 中文社区

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

- fpm [配置项](http://php.net/manual/zh/install.fpm.configuration.php)
  - 计算 pm.max_children [参考](http://myshell.co.uk/blog/2012/07/adjusting-child-processes-for-php-fpm-nginx/)

### Lumen

- Laravel [Lumen](https://lumen.laravel.com/)
  - The stunningly fast micro-framework by Laravel.
- 主要做 REST 服务

## CentOS

- 参考 https://www.centos.org/forums/viewtopic.php?t=52586

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

- [paquettg/php-html-parser](https://github.com/paquettg/php-html-parser)
- [国内镜像](https://pkg.phpcomposer.com/)
- 私有仓库
  - https://getcomposer.org/doc/articles/handling-private-packages-with-satis.md
- https://getcomposer.org/doc/04-schema.md
- https://getcomposer.org/doc/03-cli.md

```bash
# 使用中国镜像安装
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');" && \
php composer-setup.php && \
php -r "unlink('composer-setup.php');" && \
mv composer.phar /usr/local/bin/composer

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

- 安装好后只需要添加一下 autoload 即可使用

```php
<?php
require __DIR__ . '/vendor/autoload.php';
```

### satis

```bash
# 可以映射主机上的主目录以利用缓存
# -v $COMPOSER_HOME:/composer
docker run --rm -it -v $PWD/build:/build --entrypoint /bin/sh composer/satis

# 当构建完成后直接上传为静态站点即可
rsync -avz  build/ my-server:/var/www/html
```

**satis.json**

```json
{
  "name": "MyRepo",
  "homepage": "https://composer.example.org",
  "repositories": [
    {
      "type": "vcs",
      "url": "https://example.org/code/api-php.git"
    },
    {
      "type": "vcs",
      "url": "https://example.org/code/other-php.git"
    }
  ],
  "require-all": true
}
```

```bash
cd /build
# 创建 satis.json
php /satis/bin/satis build satis.json .
# 或者 docker 构建
docker run --rm -it -v $PWD/build:/build composer/satis
rsync -avz --delete ./build/ root@my-host:/mysite
```

## ThinkPHP5

- [ThinkPHP5.0 完全开发手册](https://www.kancloud.cn/manual/thinkphp5)
- 需求
  - PHP >= 5.4.0
  - PDO PHP Extension
  - MBstring PHP Extension
  - CURL PHP Extension

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

### 代码

- `thinkphp/start.php`
  - 系统默认的一个引导文件
  - 加载系统常量定义
  - 加载环境变量定义文件
  - 注册自动加载机制
  - 注册错误和异常处理机制
  - 加载惯例配置文件
  - 执行应用
  - 首先会调用 base.php 基础引导文件，某些特殊需求下面可能直接在入口文件中引入基础引导文件。
- 路由
  - `__miss__` 定义未找到时的操作
  - `[blog]` 分组使用 `[]` 标示
- 控制器

  - 标准控制器支持 请求方法+路径 的转换
  - 资源控制支持以下方法映射

  | 标识   | 请求类型 | 生成路由规则  | 对应操作方法（默认） |
  | ------ | -------- | ------------- | -------------------- |
  | index  | GET      | blog          | index                |
  | create | GET      | blog/create   | create               |
  | save   | POST     | blog          | save                 |
  | read   | GET      | blog/:id      | read                 |
  | edit   | GET      | blog/:id/edit | edit                 |
  | update | PUT      | blog/:id      | update               |
  | delete | DELETE   | blog/:id      | delete               |

- 模型
  - 支持数据库表映射
  - 支持基本的增删改查操作

## PECL

- http://pear.php.net/packages.php
- https://pecl.php.net/package-stats.php
- http://php.net/manual/en/extensions.php
- 常用扩展
  - Redis
  - Mongo
  - gRPC
  - Protobuf

```bash
pecl updahe-channels
# yes 启用 igbinary
# https://github.com/igbinary/igbinary
pecl install -o -f redis <<<no
```

```
build                  Build an Extension From C Source
bundle                 Unpacks a Pecl Package
channel-add            Add a Channel
channel-alias          Specify an alias to a channel name
channel-delete         Remove a Channel From the List
channel-discover       Initialize a Channel from its server
channel-info           Retrieve Information on a Channel
channel-login          Connects and authenticates to remote channel server
channel-logout         Logs out from the remote channel server
channel-update         Update an Existing Channel
clear-cache            Clear Web Services Cache
config-create          Create a Default configuration file
config-get             Show One Setting
config-help            Show Information About Setting
config-set             Change Setting
config-show            Show All Settings
convert                Convert a package.xml 1.0 to package.xml 2.0 format
cvsdiff                Run a "cvs diff" for all files in a package
cvstag                 Set CVS Release Tag
download               Download Package
download-all           Downloads each available package from the default channel
info                   Display information about a package
install                Install Package
list                   List Installed Packages In The Default Channel
list-all               List All Packages
list-channels          List Available Channels
list-files             List Files In Installed Package
list-upgrades          List Available Upgrades
login                  Connects and authenticates to remote server [Deprecated in favor of channel-login]
logout                 Logs out from the remote server [Deprecated in favor of channel-logout]
makerpm                Builds an RPM spec file from a PEAR package
package                Build Package
package-dependencies   Show package dependencies
package-validate       Validate Package Consistency
pickle                 Build PECL Package
remote-info            Information About Remote Packages
remote-list            List Remote Packages
run-scripts            Run Post-Install Scripts bundled with a package
run-tests              Run Regression Tests
search                 Search remote package database
shell-test             Shell Script Test
sign                   Sign a package distribution file
svntag                 Set SVN Release Tag
uninstall              Un-install Package
update-channels        Update the Channel List
upgrade                Upgrade Package
upgrade-all            Upgrade All Packages [Deprecated in favor of calling upgrade with no parameters]
Usage: pecl [options] command [command-options] <parameters>
Type "pecl help options" to list all options.
Type "pecl help shortcuts" to list all command shortcuts.
Type "pecl help version" or "pecl version" to list version information.
Type "pecl help <command>" to get the help for the specified command.
```

## HHVM

- 结论: 不建议使用
- https://hhvm.com/
- http://hacklang.org/
- https://en.wikipedia.org/wiki/HHVM
- http://github.com/facebook/hhvm
- https://3v4l.org/
- https://www.keycdn.com/blog/php-7-vs-hhvm/
- Hip Hop bytecode
- HHVM vs PHP7
  - 速度相差不大
  - 扩展 HHVM 使用 C++ PHP7 使用 C
  - HHVM 支持类型注解, 类似于 Typescript 与 JavaScript 直接的关系
  - PHP7 更加稳定, 兼容性更强
  - 代码修正后 HHVM 需要重启
- 越来越多的库选择不再支持 HHVM
  - [Symfony 4: End of HHVM support](http://symfony.com/blog/symfony-4-end-of-hhvm-support)
  - [doctrine#6424](https://github.com/doctrine/doctrine2/issues/6424)
  - [HHVM and MongoDB](https://derickrethans.nl/mongodb-hhvm.html)
  - [cakephp#10674](https://github.com/cakephp/cakephp/issues/10674): Drop support for HHVM officially

## Symfony

- https://github.com/symfony/symfony

## Notes

- require,require_once,include_once,include 是语句而不是函数, 所以不需要括号 `()`

## FAQ

### 避免直接访问 PHP

```php
<?php
// 避免不被 include
if(count(get_included_files()) ==1) exit("Direct access not permitted.");

// 避免被 include
function blockit()
{
  $buf = get_included_files();
  return $buf[0] != __FILE__;
}
blockit() and exit("You can not include a MAIN file as a part of your script.");
```

### 确保相对引用正确

```php
<?php
// 定义相对路径
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');

// 而不是使用绝对路径
require_once('/var/www/public_html/config.php'); ?>
```

### 查看 ca 环境

```bash
php -r "print_r(openssl_get_cert_locations());"
```

### Connection to `ssl://pecl.php.net:443' failed: Unable to find the socket transport "ssl" - did you forget to enable it when you configured PHP?

- 可能是由于未启用 openssl `php -m | grep ssl`
- 可能是由于 pecl 未加载 php.ini

```bash
# 设置 php.ini
pear config-set php_ini /etc/php7/php.ini
```
