---
id: nextcloud
title: NextCloud
---

# NextCloud

## Tips

- [Primary Storage](https://docs.nextcloud.com/server/11/admin_manual/configuration_files/primary_storage.html)
  - 可以使用 S3 或 Swift 作为主要存储
  - [lib/Files/ObjectStore](https://github.com/nextcloud/server/tree/master/lib/private/Files/ObjectStore)
- [User Authentication with LDAP](https://docs.nextcloud.com/server/11/admin_manual/configuration_user/user_auth_ldap.html)
  - The LDAP app is not compatible with the User backend using remote HTTP servers app. You cannot use both of them at the same time.
- 数据库可以使用 SQLite, MySQL, PostGreSQL
- [Config.php](https://docs.nextcloud.com/server/12/admin_manual/configuration_server/config_sample_php_parameters.html)
  - [config.sample.php](https://github.com/nextcloud/server/blob/master/config/config.sample.php)
- 默认推荐应用 - calendar,contacts,talk,mail,collaborative editing
- 发布变更内容 https://nextcloud.com/changelog/

## Docker

- /var/www/html - 主目录，需要更新
  - `/custom_apps` - 应用目录 - 安装或更新的应用
  - `/config` - 本地配置
  - `/data` 实际数据
  - `/themes/<THEME>` 主题

| Env                       | Default            | Description                                                                                    |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| SQLITE_DATABASE           |
| MYSQL_DATABASE            |
| MYSQL_USER                |
| MYSQL_PASSWORD            |
| MYSQL_HOST                |
| POSTGRES_DB               |
| POSTGRES_USER             |
| POSTGRES_PASSWORD         |
| POSTGRES_HOST             |                    | 可以包含端口，例如 `postgres:5432`                                                             |
| NEXTCLOUD_ADMIN_USER      |
| NEXTCLOUD_ADMIN_PASSWORD  |
| NEXTCLOUD_DATA_DIR        | /var/www/html/data | 存储用户数据的目录                                                                             |
| NEXTCLOUD_TRUSTED_DOMAINS |                    | 空格分割可信域名                                                                               |
| NEXTCLOUD_UPDATE          | 0                  | 如果自定义命令启动需要开启才会更新，使用默认 (apache-foreground, php-fpm) 启动的时候会触发更新 |
| REDIS_HOST                |                    | Redis 用于文件锁                                                                               |
| REDIS_HOST_PORT           | 6379               |
| SMTP_HOST                 |
| SMTP_SECURE               |                    | 可设置为 ssl                                                                                   |
| SMTP_PORT                 |                    | 25 或 SSL 456                                                                                  |
| SMTP_AUTHTYPE             | LOGIN              |
| SMTP_NAME                 |                    |
| SMTP_PASSWORD             |                    |
| MAIL_FROM_ADDRESS         |                    | 发信地址                                                                                       |
| MAIL_DOMAIN               |                    | 不设置则为 nextcloud 的域名                                                                    |
| APACHE_DISABLE_REWRITE_IP |                    | 设置为 1 禁用 IP 重写                                                                          |
| TRUSTED_PROXIES           |                    | 空格分割的可信代理，支持 CIDR                                                                  |
| OVERWRITEHOST             |                    | 指定 host，用于 TRUSTED_PROXIES 未生效的时候                                                   |
| OVERWRITEPROTOCOL         |                    | http https                                                                                     |
| OVERWRITEWEBROOT          |                    |
| OVERWRITECONDADDR         |                    | 复写生效的来源地址                                                                             |

```bash
# 指定数据库和账号密码则不需要进入到安装页面
# SQLite 文件在 /var/www/html/data/nextcloud.db
# 启动脚本 https://github.com/nextcloud/docker/blob/master/docker-entrypoint.sh
# 启动会检测 /var/www/html/version.php 版本号 - 如果没有则认为是新安装

# 单独目录映射
docker run -it --rm \
  -v $PWD/nextcloud/config:/var/www/html/config \
  -v $PWD/nextcloud/data:/var/www/html/data \
  -v $PWD/nextcloud/themes:/var/www/html/themes \
  -v $PWD/nextcloud/custom_apps:/var/www/html/custom_apps \
  -v $PWD/nextcloud/html:/var/www/html \
  -p 80:80 \
  -e SQLITE_DATABASE=nextcloud \
  -e NEXTCLOUD_ADMIN_USER=nextcloud \
  -e NEXTCLOUD_ADMIN_PASSWORD=nextcloud \
  --name nextcloud nextcloud:18

# 单个目录映射 - 会安装 300M 左右 - macos 较慢，访问也会慢
docker run -it --rm \
  -v $PWD/nextcloud:/var/www/html \
  -p 80:80 \
  -e SQLITE_DATABASE=nextcloud \
  -e NEXTCLOUD_ADMIN_USER=nextcloud \
  -e NEXTCLOUD_ADMIN_PASSWORD=nextcloud \
  --name nextcloud nextcloud:18

# 使用 www-data 账号进行操作
docker exec -it -u www-data nextcloud bash

# 禁用意义不大的应用
./occ app:disable firstrunwizard federation nextcloud_announcements support survey_client updatenotification
# 精选常用应用
for i in announcementcenter external impersonate limit_login_to_ip files_automatedtagging files_accesscontrol groupfolders notes user_ldap user_saml; do
  ./occ app:enable $i
done

# 安装常用应用
for i in admin_audit extract files_external files_texteditor group_everyone metadata user_ldap user_saml; do
  ./occ app:enable $i
done

# 官方推荐应用 - calendar,contacts,talk,mail,collaborative editing

# 社交应用
for i in circles talk social; do
  ./occ app:enable $i
done

# 事务应用
for i in calendar contacts mail deck tasks; do
  ./occ app:enable $i
done

# 办公应用 - 功能重复
for i in onlyoffice richdocuments; do
  ./occ app:enable $i
done

# 管理应用
for i in occweb; do
  ./occ app:enable $i
done

# 工具
for i in files_rightclick checksum; do
  ./occ app:enable $i
done
```

## ldap

- `ldap:set-config <configID> <configKey> <configValue>`

```bash
./occ ldap:set-config s01 ldapUserDisplayName2 displayName
```

## Notes

- [admin manual](https://docs.nextcloud.com/server/latest/admin_manual/index.html)
