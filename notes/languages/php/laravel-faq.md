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
