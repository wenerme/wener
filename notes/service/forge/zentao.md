---
title: zentao
---

# zentao

:::caution

- LDAP 需要 企业版、旗舰版
- zentao 需要 SUPER/SYSTEM_VARIABLES_ADMIN 权限 - 建议独立 MySQL 或者使用 内置

:::

- [easysoft/zentaopms](https://github.com/easysoft/zentaopms)
- [wwccss/zentaopms](https://gitee.com/wwccss/zentaopms)
- [quicklyon/zentao-docker](https://github.com/quicklyon/zentao-docker)
- 禅道

```bash
# https://hub.docker.com/r/easysoft/zentao
# Zentao >= 18.6
docker run --rm -it \
  -p 8080:80 \
  -v $PWD/data:/data \
  -e MYSQL_ROOT_PASSWORD=123456
--name zentao easysoft/zentao:18.7

# Zentao < 18.6
docker run --rm -it \
  -p 8080:80 \
  -v $PWD/data/zentaopms:/www/zentaopms \
  -v $PWD/data/mysql:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123456
--name zentao easysoft/zentao:18.5
```

| env                     | default                    | note              |
| ----------------------- | -------------------------- | ----------------- |
| DEBUG                   | false                      |
| PHP_SESSION_TYPE        | files                      | redis/files       |
| PHP_SESSION_PATH        | /data/php/session          |
| PHP_MAX_EXECUTION_TIME  | 120                        |
| PHP_MEMORY_LIMIT        | 256M                       |
| PHP_POST_MAX_SIZE       | 128M                       |
| PHP_UPLOAD_MAX_FILESIZE | 128M                       |
| ZT_MYSQL_HOST           | 127.0.0.1                  | MySQL 连接信息    |
| ZT_MYSQL_PORT           | 3306                       |
| ZT_MYSQL_DB             | zentao                     |
| ZT_MYSQL_USER           | root                       |
| ZT_MYSQL_PASSWORD       | pass4zenTao                |
| LDAP_ENABLED            | false                      |
| LDAP_HOST               | 127.0.0.1                  |
| LDAP_PORT               | 389                        |
| LDAP_BASEDN             | dc=quickon,dc=org          |
| LDAP_ADMINUSER          | cn=admin,dc=quickon,dc=org |
| LDAP_BINDPASSWORD       | pass4zenTao                |
| LDAP_USERKEY            | uid                        |
| LDAP_EMAILKEY           | mail                       |
| LDAP_GROUP              | 1                          |
| LDAP_REALNAME           | name                       |
| LDAP_REPEATPOLICY       | number                     | 重名策略          |
| LDAP_AUTOCREATE         | 1                          | 自动创建用户      |
| SMTP_ENABLED            | false                      |
| LINK_GIT                | false                      |
| GIT_TYPE                | gitea                      | gitea/gogs/gitlab |
| GIT_INSTANCE_NAME       | gitea                      |
| GIT_USERNAME            | root                       |
| GIT_PASSWORD            | pass4QuickOn               |
| GIT_PROTOCOL            | https                      |
| GIT_DOMAIN              |
| GIT_TOKEN               |
| LINK_CI                 | false                      |
| CI_TYPE                 | jenkins                    |
| LINK_SCAN               | false                      |
| SCAN_TYPE               | sonarqube                  |
| IS_CONTAINER            | true                       |
| MYSQL_INTERNAL          | false                      | 内置 MySQL        |
| MYSQL_ROOT_PASSWORD     |

- 容器内apache配置文件目录：/etc/apache2/
- 容器内禅道目录：/www/zentaopms
- 容器内mysql配置文件目录：/etc/mysql/
- 容器内php配置文件目录：/etc/php/7.0/apache2
- Redis
  - PHP_SESSION_TYPE=redis
  - PHP_SESSION_PATH=tcp://redis:6379
- 参考
  - [Docker方式部署禅道](https://www.zentao.net/book/zentaopms/405.html)

## Docker

- /apps/zentao/config/my.php

# FAQ

## 修改 AI 参数

```bash
echo '$config->ai->openai->api->openai->format = "https://openai-proxy.wener.me/%s/%s";' >> /apps/zentao/module/ai/config.php
```

- https://gitee.com/wwccss/zentaopms/blob/zentaopms_18.9/module/ai/config.php

## 还没有保存配置文件

## Admin

```sql
select admins from zt_company;

-- 修改 admin
update zt_company set admins=',cyw,' where id=1;
```

# 版本

## 18.6

- 结构变化
- 内置 MySQL 可关闭
  - MYSQL_INTERNAL
- 方便配置外部 MySQL
  - ZT_MYSQL
- 可以使用 Redis 持久化 Session
- 可以使用 ENV 配置 PHP
- 目录变化
- https://www.zentao.net/book/zentaopms/1059.html

---

- 旧版本
  - /www/zentaopms - 18.3
    - /www/zentaopms/VERSION
  - /apps/zentaopms - 18.4,18.5
  - /var/lib/mysql
- 新版本
  - /data
    - /data/mysql
    - /data/zentao
      - /data/zentao/.version
    - /data/phy

```bash
# 旧版本备份
cd /www/zentaopms/bin
bash init.sh
bash backup.sh

ls -1 /www/zentaopms/tmp/backup

cp -rp old/www/data new/data/zentao/www
cp -rp old/config/my.php new/data/zentao/config/my.php

cd old/www/zentaopms/tmp/backup

cp 202401100259473.sql.php bak.sql
sed -i '1d' bak.sql
sed -i 's/0000-00-00/1970-01-01/g' bak.sql

mysql -uroot -h127.0.0.1 -P3306 -p123456 zentao < bak.sql

mysql -uroot -h127.0.0.1 -P3306 -p123456 zentao
```

```sql
-- 判断数据是否恢复
select account from zt_user;
```
