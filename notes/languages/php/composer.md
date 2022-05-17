---
title: composer
---

# composer

- 镜像
  - https://pkg.xyz/
  - https://mirrors.aliyun.com/composer/composer.phar
    - https://developer.aliyun.com/composer

```bash
# macOS
brew install composer
# 全局仓库镜像
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

composer init
# 单项目仓库镜像
composer config repo.packagist composer https://mirrors.aliyun.com/composer/

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
```

```php
<?php
require __DIR__ . '/vendor/autoload.php';
```

# FAQ

## file_put_contents(./composer.lock): Failed to open stream: Permission denied

```bash
chown $USER .
sudo chown -R $USER ~/.composer/
```
