---
tags:
  - FAQ
---

# Laravel FAQ

## Missing app key

> No application encryption key has been specified

```bash
php artisan key:generate

php artisan config:cache
```

## 429: Too Many Requests

- ThrottleRequests

## Class 'Monolog\Logger' not found

- 注意前置错误

```bash
stat vendor/monolog/monolog/src/Monolog/Logger.php
cat vendor/composer/autoload_static.php | grep -E 'Monolog[\\]+Logger' # 确保存在
```

## Declaration of Monolog\Logger::emergency

```
Declaration of Monolog\Logger::emergency(Stringable|string $message, array $context = []): void must be compatible with PsrExt\Log\LoggerInterface::emergency($message, array $context = [])
```


- https://github.com/composer/composer/issues/11246
- https://github.com/laravel/framework/issues/46165
