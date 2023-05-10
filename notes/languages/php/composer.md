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

- $HOME/.composer - data-dir/home
  - auth.json
  - config.json
  - keys.dev.pub
  - keys.tags.pub
  - cache/ - cache-dir
    - files/
    - repo/
    - vcs/

# FAQ

## file_put_contents(./composer.lock): Failed to open stream: Permission denied

```bash
chown $USER .
sudo chown -R $USER ~/.composer/
```
