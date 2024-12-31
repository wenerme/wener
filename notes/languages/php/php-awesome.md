---
title: PHP Awesome
tags:
  - Awesome
---

# PHP Awesome

- https://github.com/php
- https://github.com/psecio/iniscan
- https://www.owasp.org/index.php/PHP_Configuration_Cheat_Sheet
- http://www.phptherightway.com/
- [PHP-FIG](http://www.php-fig.org/)
  - [PSRs](http://www.php-fig.org/psr/)
- [php/pie](https://github.com/php/pie)
- [pear/pear-core](https://github.com/pear/pear-core)
- https://github.com/ziadoz/awesome-php
- https://getcomposer.org
- styleci
  - composer require styleci/cli:^1.2 --dev
- env
  - phpenv
  - asdf

## Framework

- [laravel](./laravel/README.md)
  - 增加 fiber [#47077](https://github.com/laravel/framework/discussions/47077)
- [revoltphp/event-loop](https://github.com/revoltphp/event-loop)
  -  event loop for concurrent PHP
- [walkor/workerman](https://github.com/walkor/workerman)
  - https://github.com/joanhey/AdapterMan
    - 适配运行别的框架，性能提升较大
  - 增加 fiber 支持 https://github.com/walkor/workerman/issues/693
- [AMPHP](./lib/amphp.md)
  - non-blocking concurrency framework
- [hyperf/hyperf](https://github.com/hyperf/hyperf)
  - 基于 swoole/swow
  - coroutine framework that focuses on hyperspeed and flexibility
- [swoole/swoole-src](https://github.com/swoole/swoole-src)
  - Apache-2.0
  - 开发不活跃
  - 目前 PHP 已经有 fiber 能力，swoole 意义没那么大
  - fork 事故 https://github.com/swoole/swoole-src/issues/4434
    - 2022-05
- [swow/swow](https://github.com/swow/swow)
- [sunrise-php/http-router](https://github.com/sunrise-php/http-router)
- [spiral/framework](https://github.com/spiral/framework)
  - PSR-{2,3,4,6,7,11,15,16,17}
  - Long-Living PHP Framework for enterprise application development
  - [stempler](https://spiral.dev/docs/stempler-basics/2.8/en)
    模板引擎
  - CycleORM
- [openswoole/openswoole](https://github.com/openswoole/openswoole)
- [Symfony](https://github.com/symfony/symfony)
- [CakePHP](https://github.com/cakephp/cakephp)
- [Yii2](https://github.com/yiisoft/yii2)
- [Slim](https://github.com/slimphp/Slim)
- [KumbiaPHP](https://github.com/KumbiaPHP/KumbiaPHP)
- [ThinkPHP](https://github.com/top-think/framework)
- [Leaf](https://github.com/leafsphp/leaf)
- ORM
  - [cycle/orm](https://github.com/cycle/orm)

## Library

- https://github.com/spatie
- Async/Concurrent
  - [amphp/amp](https://github.com/amphp/amp)
  - [guzzle/promises](https://github.com/guzzle/promises)
  - [spatie/async](https://github.com/spatie/async)
- jsonschema
  - [wol-soft/php-json-schema-model-generator](https://github.com/wol-soft/php-json-schema-model-generator)
    - JSONSchema -> PHP
  - [opis/json-schema](https://github.com/opis/json-schema)
  - [swaggest/php-json-schema](https://github.com/swaggest/php-json-schema)

## Server

- [roadrunner-server](https://github.com/roadrunner-server)
  - [roadrunner](https://github.com/roadrunner-server/roadrunner)
    - MIT, Go
    - load-balancer, process manager written in Golang
  - [goridge](https://github.com/roadrunner-server/goridge)
    - PHP-to-Golang IPC/RPC bridge

## Toolchain

- [phpstan/phpstan](https://github.com/phpstan/phpstan)
