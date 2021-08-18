---
id: php
---

# PHP

## redis session

- [How to Set Up a Redis Server as a Session Handler for PHP on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-redis-server-as-a-session-handler-for-php-on-ubuntu-14-04)
- php5-redis

**/etc/php5/fpm/php.ini**

```ini
session.save_handler = redis
# key 格式
# PHPREDIS_SESSION:j9rsgtde6st2rqb6lu5u6f4h83
session.save_path = "tcp://10.10.1.1:6379?auth=yourverycomplexpasswordhere"
```
