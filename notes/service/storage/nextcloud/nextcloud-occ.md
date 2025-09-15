---
tags:
  - Ops
---

# occ

```bash
docker exec -u www-data -it nextcloud bash
# root -> www-data
su -l www-data -s /bin/bash
cd /var/www/html

export PHP_MEMORY_LIMIT=8G
./occ

tail -f /var/www/html/data/nextcloud.log

./occ log:tail 20 -f

./occ status

./occ user:list

./occ user:list -d # list disabled

./occ user:enable admin
./occ user:disable admin

OC_PASS=PASS ./occ user:resetpassword --password-from-env admin

./occ db:add-missing-indices

./occ config:system:get has_internet_connection # 当前网络状态
# 允许网络
./occ config:system:set has_internet_connection --value=true --type=boolean
./occ app:update --all
# 关闭网络
./occ config:system:set has_internet_connection --value=false --type=boolean
```

| cmd                                   | for                                  |
| ------------------------------------- | ------------------------------------ |
| app:disable                           | 禁用应用                             |
| app:enable                            | 启用应用                             |
| app:getpath                           | 获取应用目录的绝对路径               |
| app:install                           | 安装应用                             |
| app:list                              | 列出所有可用的应用                   |
| app:remove                            | 移除应用                             |
| app:update                            | 更新应用或所有应用                   |
| background:ajax                       | 使用 ajax 运行后台任务               |
| background:cron                       | 使用 cron 运行后台任务               |
| background:webcron                    | 使用 webcron 运行后台任务            |
| background-job:execute                | 手动执行单个后台任务                 |
| background-job:list                   | 列出后台任务                         |
| broadcast:test                        | 测试 SSE 广播器                      |
| circles:check                         | 检查配置                             |
| circles:maintenance                   | 清理数据，保持应用运行               |
| circles:manage:config                 | 编辑 Circle 配置/类型                |
| circles:manage:create                 | 创建新 Circle                        |
| circles:manage:destroy                | 按 ID 销毁 Circle                    |
| circles:manage:details                | 获取 Circle 详细信息                 |
| circles:manage:edit                   | 编辑 Circle 显示名称或描述           |
| circles:manage:join                   | 模拟用户加入 Circle                  |
| circles:manage:leave                  | 模拟用户离开 Circle                  |
| circles:manage:list                   | 列出当前 Circles                     |
| circles:manage:setting                | 编辑 Circle 设置                     |
| circles:members:add                   | 添加成员到 Circle                    |
| circles:members:details               | 按 ID 获取成员详细信息               |
| circles:members:level                 | 更改 Circle 成员权限                 |
| circles:members:list                  | 列出 Circle 成员                     |
| circles:members:remove                | 移除 Circle 成员                     |
| circles:members:search                | 在 Circle 中搜索成员                 |
| circles:memberships                   | 显示本地和联邦用户的 Circle 成员关系 |
| circles:remote                        | 远程功能                             |
| circles:shares:files                  | 列出共享文件                         |
| circles:sync                          | 同步 Circles 和成员                  |
| circles:test                          | 测试功能                             |
| config:app:delete                     | 删除应用配置值                       |
| config:app:get                        | 获取应用配置值                       |
| config:app:set                        | 设置应用配置值                       |
| config:import                         | 导入配置列表                         |
| config:list                           | 列出所有配置                         |
| config:system:delete                  | 删除系统配置值                       |
| config:system:get                     | 获取系统配置值                       |
| config:system:set                     | 设置系统配置值                       |
| dav:create-addressbook                | 创建 DAV 地址簿                      |
| dav:create-calendar                   | 创建 DAV 日历                        |
| dav:delete-calendar                   | 删除 DAV 日历                        |
| dav:list-calendars                    | 列出用户的所有日历                   |
| dav:move-calendar                     | 将日历从一个用户移动到另一个用户     |
| dav:remove-invalid-shares             | 删除无效的 DAV 共享                  |
| dav:retention:clean-up                | 清理 DAV 过期数据                    |
| dav:send-event-reminders              | 发送事件提醒                         |
| dav:sync-birthday-calendar            | 同步生日日历                         |
| dav:sync-system-addressbook           | 将用户同步到系统地址簿               |
| db:add-missing-columns                | 为数据库表添加缺失的可选列           |
| db:add-missing-indices                | 为数据库表添加缺失的索引             |
| db:add-missing-primary-keys           | 为数据库表添加缺失的主键             |
| db:convert-filecache-bigint           | 将 filecache ID 列转换为 BigInt      |
| db:convert-mysql-charset              | 将 MySQL/MariaDB 编码转换为 utf8mb4  |
| db:convert-type                       | 将数据库转换为新配置的类型           |
| encryption:change-key-storage-root    | 更改密钥存储根目录                   |
| encryption:decrypt-all                | 禁用服务器端加密并解密所有文件       |
| encryption:disable                    | 禁用加密                             |
| encryption:enable                     | 启用加密                             |
| encryption:encrypt-all                | 加密所有用户的文件                   |
| encryption:list-modules               | 列出所有可用的加密模块               |
| encryption:migrate-key-storage-format | 迁移密钥存储格式                     |
| encryption:set-default-module         | 设置默认加密模块                     |
| encryption:show-key-storage-root      | 显示当前密钥存储根目录               |
| encryption:status                     | 显示加密状态                         |
| files:cleanup                         | 清理文件缓存                         |
| files:repair-tree                     | 修复损坏的文件系统树结构             |
| files:scan                            | 重新扫描文件系统                     |
| files:scan-app-data                   | 重新扫描 AppData 文件夹              |
| files:transfer-ownership              | 转移所有文件和文件夹的所有权         |
| group:add                             | 添加组                               |
| group:adduser                         | 将用户添加到组                       |
| group:delete                          | 删除组                               |
| group:info                            | 显示组信息                           |
| group:list                            | 列出所有组                           |
| group:removeuser                      | 从组中移除用户                       |
| groupfolders:create                   | 创建新的组文件夹                     |
| groupfolders:delete                   | 删除组文件夹                         |
| groupfolders:list                     | 列出已配置的组文件夹                 |
| integrity:check-app                   | 使用签名检查应用的完整性             |
| integrity:check-core                  | 使用签名检查核心代码的完整性         |
| integrity:sign-app                    | 使用私钥对应用进行签名               |
| integrity:sign-core                   | 使用私钥对核心进行签名               |
| l10n:createjs                         | 为指定应用创建 JavaScript 翻译文件   |
| log:file                              | 操作日志存储方式                     |
| log:manage                            | 管理日志配置                         |
| log:tail                              | 监视 Nextcloud 日志文件              |
| log:watch                             | 监听 Nextcloud 日志文件              |
| maintenance:data-fingerprint          | 在恢复备份后更新数据指纹             |
| maintenance:mode                      | 设置维护模式                         |
| maintenance:repair                    | 修复 Nextcloud 安装                  |
| maintenance:repair-share-owner        | 修复数据库中无效的共享所有者条目     |
| maintenance:update:htaccess           | 更新 `.htaccess` 文件                |
| notification:generate                 | 为指定用户生成通知                   |
| notification:test-push                | 为指定用户生成推送通知               |
| preview:repair                        | 重新组织预览文件                     |
| security:certificates                 | 列出受信任的证书                     |
| security:certificates:import          | 导入受信任的 PEM 格式证书            |
| security:certificates:remove          | 删除受信任的证书                     |
| user:add                              | 添加用户                             |
| user:delete                           | 删除指定用户                         |
| user:disable                          | 禁用指定用户                         |
| user:enable                           | 启用指定用户                         |
| user:info                             | 显示用户信息                         |
| user:list                             | 列出所有用户                         |
| user:resetpassword                    | 重置指定用户密码                     |
| versions:cleanup                      | 删除文件版本                         |
| versions:expire                       | 使用户的文件版本过期                 |
| workflows:list                        | 列出配置的工作流                     |
