---
title: composer
---

# composer

- https://repo.packagist.org/
  - https://repo.packagist.org/mirrors
    - https://packagist.pages.dev/
  - https://pkg.xyz/
  - https://mirrors.aliyun.com/composer/composer.phar
    - https://developer.aliyun.com/composer

```bash
# v1 升级到 v2
composer self-update --2

# macOS
brew install composer
# 全局仓库镜像
composer config -g repos.packagist composer https://packagist.pages.dev
# 阿里云
# composer config -g repos.packagist composer https://mirrors.aliyun.com/composer/
# 上海交大
# composer config -g repos.packagist composer https://packagist.mirrors.sjtug.sjtu.edu.cn

# 禁用
composer config -g --unset repos.packagist

composer init
# 单项目仓库镜像
composer config repos.packagist composer https://mirrors.aliyun.com/composer/

composer dump-autoload -o

# 项目 安装 composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# --install-dir
# --filename
# --version
php composer-setup.php
php -r "unlink('composer-setup.php');"

php composer.phar init

php composer.phar update

composer config --list
composer config --global

# 手动安装
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');" \
  && php composer-setup.php \
  && php -r "unlink('composer-setup.php');" \
  && mv composer.phar /usr/local/bin/composer

# CI
composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader
```

```php
<?php
require __DIR__ . '/vendor/autoload.php';
```

## composer.json

```bash
# 可以通过 config.platform 覆盖
composer show --platform
```

```json title="composer.json"
{
  "name": "vendor-name/package-name",
  "description": "This is a package",
  // library - 默认 - 会将文件 copy 到 vendor
  // project - 项目
  // metapackage
  // composer-plugin
  // php-ext
  // php-ext-zend
  "type": "library",
  "license": "MIT",
  "license": [],
  "keywords": [],
  "homepage": "https://example.com",
  "readme": "README.md",
  // 发布时间
  // YYYY-MM-DD, YYYY-MM-DD HH:MM:SS
  "time": "2021-01-01",
  "authors": [
    {
      "name": "Author Name",
      "email": "",
      "homepage": "",
      "role": ""
    }
  ],
  "support": {},
  // {type,url}[]
  "funding":[],
  "require": {
    "php": "^7.4",
    "vendor-name/package-name": "^1.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.5"
  },
  "autoload": {
    "psr-4": {
      "VendorName\\PackageName\\": "src/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "VendorName\\PackageName\\Tests\\": "tests/"
    }
  },
  "scripts": {
    "test": "phpunit"
  },
  // https://getcomposer.org/doc/06-config.md
  "config":{}
}
```

- https://getcomposer.org/schema.json
- https://getcomposer.org/doc/04-schema.md

## config

- $HOME/.composer - data-dir/home
  - auth.json
  - config.json
  - keys.dev.pub
  - keys.tags.pub
  - cache/ - cache-dir macOS ~/Library/Caches/composer
    - files/
    - repo/
    - vcs/
- https://getcomposer.org/doc/06-config.md

## auth.json

- COMPOSER_AUTH
  - 可以存储 json
- https://getcomposer.org/doc/03-cli.md#composer-auth

```json title="~/.composer/auth.json"
{
  "bitbucket-oauth": {},
  "github-oauth": {},
  "gitlab-oauth": {},
  "gitlab-token": {},
  "http-basic": {
    "try.gitea.com": {
      "username": "wener",
      "password": ""
    }
  },
  "bearer": {}
}
```

- gitea 可以使用 PAT

# FAQ

## file_put_contents(./composer.lock): Failed to open stream: Permission denied

```bash
chown $USER .
sudo chown -R $USER ~/.composer/
```
