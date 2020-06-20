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
-  数据库可以使用 SQLite, MySQL, PostGreSQL
- [Config.php](https://docs.nextcloud.com/server/12/admin_manual/configuration_server/config_sample_php_parameters.html)
  - [config.sample.php](https://github.com/nextcloud/server/blob/master/config/config.sample.php)
- 默认推荐应用 - calendar,contacts,talk,mail,collaborative editing

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
docker run -it --rm \
  -v $PWD/nextcloud/config:/var/www/html/config \
  -v $PWD/nextcloud/data:/var/www/html/data \
  -p 80:80 \
  -e SQLITE_DATABASE=nextcloud \
  -e NEXTCLOUD_ADMIN_USER=nextcloud \
  -e NEXTCLOUD_ADMIN_PASSWORD=nextcloud \
  --name nextcloud nextcloud:apache

# 使用 www-data 账号进行操作
docker exec -it -u www-data nextcloud bash

# 禁用意义不大的应用
docker exec -u www-data nextcloud ./occ app:disable firstrunwizard federation nextcloud_announcements support survey_client updatenotification
# 安装常用应用
for i in admin_audit user_ldap user_saml files_external files_texteditor files_readmemd; do 
  docker exec -u www-data nextcloud ./occ app:enable $i
done
```

## ldap
* `ldap:set-config <configID> <configKey> <configValue>`

```bash
./occ ldap:set-config s01 ldapUserDisplayName2 displayName
```

## occ
```bash
Nextcloud 19.0.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --no-warnings     Skip global warnings, show command output only
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  check                               check dependencies of the server environment
  help                                Displays help for a command
  list                                Lists commands
  status                              show some status information
  upgrade                             run upgrade routines after installation of a new release. The release has to be installed before.
 activity
  activity:send-mails                 Sends the activity notification mails
 app
  app:check-code                      check code to be compliant
  app:disable                         disable an app
  app:enable                          enable an app
  app:getpath                         Get an absolute path to the app directory
  app:install                         install an app
  app:list                            List all available apps
  app:remove                          remove an app
  app:update                          update an app or all apps
 background
  background:ajax                     Use ajax to run background jobs
  background:cron                     Use cron to run background jobs
  background:webcron                  Use webcron to run background jobs
 broadcast
  broadcast:test                      test the SSE broadcaster
 config
  config:app:delete                   Delete an app config value
  config:app:get                      Get an app config value
  config:app:set                      Set an app config value
  config:import                       Import a list of configs
  config:list                         List all configs
  config:system:delete                Delete a system config value
  config:system:get                   Get a system config value
  config:system:set                   Set a system config value
 dav
  dav:create-addressbook              Create a dav addressbook
  dav:create-calendar                 Create a dav calendar
  dav:list-calendars                  List all calendars of a user
  dav:move-calendar                   Move a calendar from an user to another
  dav:remove-invalid-shares           Remove invalid dav shares
  dav:send-event-reminders            Sends event reminders
  dav:sync-birthday-calendar          Synchronizes the birthday calendar
  dav:sync-system-addressbook         Synchronizes users to the system addressbook
 db
  db:add-missing-columns              Add missing optional columns to the database tables
  db:add-missing-indices              Add missing indices to the database tables
  db:convert-filecache-bigint         Convert the ID columns of the filecache to BigInt
  db:convert-mysql-charset            Convert charset of MySQL/MariaDB to use utf8mb4
  db:convert-type                     Convert the Nextcloud database to the newly configured one
 encryption
  encryption:change-key-storage-root  Change key storage root
  encryption:decrypt-all              Disable server-side encryption and decrypt all files
  encryption:disable                  Disable encryption
  encryption:enable                   Enable encryption
  encryption:encrypt-all              Encrypt all files for all users
  encryption:list-modules             List all available encryption modules
  encryption:set-default-module       Set the encryption default module
  encryption:show-key-storage-root    Show current key storage root
  encryption:status                   Lists the current status of encryption
 files
  files:cleanup                       cleanup filecache
  files:recommendations:recommend
  files:scan                          rescan filesystem
  files:scan-app-data                 rescan the AppData folder
  files:transfer-ownership            All files and folders are moved to another user - shares are moved as well.
 files_external
  files_external:applicable           Manage applicable users and groups for a mount
  files_external:backends             Show available authentication and storage backends
  files_external:config               Manage backend configuration for a mount
  files_external:create               Create a new mount configuration
  files_external:delete               Delete an external mount
  files_external:export               Export mount configurations
  files_external:import               Import mount configurations
  files_external:list                 List configured admin or personal mounts
  files_external:notify               Listen for active update notifications for a configured external mount
  files_external:option               Manage mount options for a mount
  files_external:verify               Verify mount configuration
 group
  group:add                           Add a group
  group:adduser                       add a user to a group
  group:delete                        Remove a group
  group:list                          list configured groups
  group:removeuser                    remove a user from a group
 integrity
  integrity:check-app                 Check integrity of an app using a signature.
  integrity:check-core                Check integrity of core code using a signature.
  integrity:sign-app                  Signs an app using a private key.
  integrity:sign-core                 Sign core using a private key.
 l10n
  l10n:createjs                       Create javascript translation files for a given app
 ldap
  ldap:check-user                     checks whether a user exists on LDAP.
  ldap:create-empty-config            creates an empty LDAP configuration
  ldap:delete-config                  deletes an existing LDAP configuration
  ldap:search                         executes a user or group search
  ldap:set-config                     modifies an LDAP configuration
  ldap:show-config                    shows the LDAP configuration
  ldap:show-remnants                  shows which users are not available on LDAP anymore, but have remnants in Nextcloud.
  ldap:test-config                    tests an LDAP configuration
 log
  log:file                            manipulate logging backend
  log:manage                          manage logging configuration
  log:tail                            Tail the nextcloud logfile
  log:watch                           Watch the nextcloud logfile
 maintenance
  maintenance:data-fingerprint        update the systems data-fingerprint after a backup is restored
  maintenance:mimetype:update-db      Update database mimetypes and update filecache
  maintenance:mimetype:update-js      Update mimetypelist.js
  maintenance:mode                    set maintenance mode
  maintenance:repair                  repair this installation
  maintenance:theme:update            Apply custom theme changes
  maintenance:update:htaccess         Updates the .htaccess file
 migrations
  migrations:execute                  Execute a single migration version manually.
  migrations:generate
  migrations:generate-from-schema
  migrations:migrate                  Execute a migration to a specified version or the latest available version.
  migrations:status                   View the status of a set of migrations.
 notification
  notification:generate               Generate a notification for the given user
  notification:test-push              Generate a notification for the given user
 security
  security:certificates               list trusted certificates
  security:certificates:import        import trusted certificate
  security:certificates:remove        remove trusted certificate
 sharing
  sharing:cleanup-remote-storages     Cleanup shared storage entries that have no matching entry in the shares_external table
  sharing:expiration-notification     Notify share initiators when a share will expire the next day.
 text
  text:reset                          Reset a text document
 trashbin
  trashbin:cleanup                    Remove deleted files
  trashbin:expire                     Expires the users trashbin
 twofactorauth
  twofactorauth:cleanup               Clean up the two-factor user-provider association of an uninstalled/removed provider
  twofactorauth:disable               Disable two-factor authentication for a user
  twofactorauth:enable                Enable two-factor authentication for a user
  twofactorauth:enforce               Enabled/disable enforced two-factor authentication
  twofactorauth:state                 Get the two-factor authentication (2FA) state of a user
 user
  user:add                            adds a user
  user:delete                         deletes the specified user
  user:disable                        disables the specified user
  user:enable                         enables the specified user
  user:info                           show user info
  user:lastseen                       shows when the user was logged in last time
  user:list                           list configured users
  user:report                         shows how many users have access
  user:resetpassword                  Resets the password of the named user
  user:setting                        Read and modify user settings
 versions
  versions:cleanup                    Delete versions
  versions:expire                     Expires the users file versions
 workflows
  workflows:list                      Lists configured workflows
```
