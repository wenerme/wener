---
id: nextcloud
title: NextCloud
---

# NextCloud

## Tips
* [Primary Storage](https://docs.nextcloud.com/server/11/admin_manual/configuration_files/primary_storage.html)
  * 可以使用 S3 或 Swift 作为主要存储
  * [lib/Files/ObjectStore](https://github.com/nextcloud/server/tree/master/lib/private/Files/ObjectStore)
* [User Authentication with LDAP](https://docs.nextcloud.com/server/11/admin_manual/configuration_user/user_auth_ldap.html)
  * The LDAP app is not compatible with the User backend using remote HTTP servers app. You cannot use both of them at the same time.
* 数据库可以使用 SQLite, MySQL, PostGreSQL
* [Config.php](https://docs.nextcloud.com/server/12/admin_manual/configuration_server/config_sample_php_parameters.html)
  * [config.sample.php](https://github.com/nextcloud/server/blob/master/config/config.sample.php)
* https://wiki.archlinux.org/index.php/Nextcloud

```bash
# 简单启动
docker run -it --rm \
  -v /data/nextcloud:/var/www/html \
  --name nextcloud nextcloud

./occ maintenance:mode --off
./occ app:list
./occ app:enable -- files_external
```

## FAQ
### WebDAV 很慢
https://help.nextcloud.com/t/slow-webdav-performance/11255

如果每次操作都等 30s 左右, 可能是触发了密码防爆破机制.

## occ --help

```
Nextcloud 13.0.1

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
  _completion                         BASH completion hook.
  check                               check dependencies of the server environment
  help                                Displays help for a command
  list                                Lists commands
  status                              show some status information
  upgrade                             run upgrade routines after installation of a new release. The release has to be installed before.
 app
  app:check-code                      check code to be compliant
  app:disable                         disable an app
  app:enable                          enable an app
  app:getpath                         Get an absolute path to the app directory
  app:install                         install an app
  app:list                            List all available apps
 background
  background:ajax                     Use ajax to run background jobs
  background:cron                     Use cron to run background jobs
  background:webcron                  Use webcron to run background jobs
 config
  config:app:delete                   Delete an app config value
  config:app:get                      Get an app config value
  config:app:set                      Set an app config value
  config:import                       Import a list of configs
  config:list                         List all configs
  config:system:delete                Delete a system config value
  config:system:get                   Get a system config value
  config:system:set                   Set a system config value
 db
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
 group
  group:adduser                       add a user to a group
  group:list                          list configured groups
  group:removeuser                    remove a user from a group
 integrity
  integrity:check-app                 Check integrity of an app using a signature.
  integrity:check-core                Check integrity of core code using a signature.
  integrity:sign-app                  Signs an app using a private key.
  integrity:sign-core                 Sign core using a private key.
 l10n
  l10n:createjs                       Create javascript translation files for a given app
 log
  log:file                            manipulate logging backend
  log:manage                          manage logging configuration
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
 security
  security:certificates               list trusted certificates
  security:certificates:import        import trusted certificate
  security:certificates:remove        remove trusted certificate
 twofactorauth
  twofactorauth:disable               Disable two-factor authentication for a user
  twofactorauth:enable                Enable two-factor authentication for a user
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
```
