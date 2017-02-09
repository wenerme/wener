# PHP

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
