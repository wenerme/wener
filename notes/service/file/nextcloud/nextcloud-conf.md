---
title: Nextcloud 配置
tags:
  - Configuration
---

# Nextcloud 配置

:::tip

- 环境变量会覆盖配置 config.php
- 环境变量会在 redis.config.php autoconfig.php 等配置文件中读取

:::

- [config.sample.php](https://github.com/nextcloud/server/blob/master/config/config.sample.php)

```bash
docker exec -it -u www-data nextcloud bash
```

```bash
cat config/config.php

# 服务器状态
./occ status

# 配置
./occ config:system:get trusted_domains
./occ config:system:set trusted_domains 1 --value=192.168.1.1

# 离线
./occ config:system:set has_internet_connection --value=true --type=boolean

# 设置默认语言
./occ config:system:set default_language --value=zh_CN
./occ config:system:set default_ladefault_localenguage --value=zh

# 导出配置
# private 包含密码之类的内容
./occ config:list --private
./occ config:list system --output=plain
```

```php
<?php

$CONFIG = array(
// 实例唯一标识符
'instanceid' => '',
// 默认语言 - 默认 en
'default_language' => 'zh_CN',
'default_locale' => 'zh',
// 默认打开应用
'defaultapp' => 'files',
// 信任域名
'trusted_domains' =>
  [
    'localhost',
  ],

// 默认开启帮助文档
'knowledgebaseenabled' => false,

// 模板文件目录 - 新创建用户
'skeletondirectory' => 'core/skeleton',
// 'skeletondirectory' => 'config/skeleton',

// HTTP_PROXY
'proxy' => '',
'proxyuserpwd' => '',
// NO_PROXY
'proxyexclude' => [],

// 是否自动检查更新
'updatechecker' => false,

// 是否有网络链接 - false 则是离线状态
'has_internet_connection' => true,
// 检测联通性
'connectivity_check_domains' => [
	'www.nextcloud.com',
	'www.startpage.com',
	'www.eff.org',
	'www.edri.org'
],


// 个个平台的客户端下载链接配置
'customclient_desktop' =>
	'https://nextcloud.com/install/#install-clients',
'customclient_android' =>
	'https://play.google.com/store/apps/details?id=com.nextcloud.client',
'customclient_ios' =>
	'https://itunes.apple.com/us/app/nextcloud/id1125420102?mt=8',
'customclient_ios_appid' =>
    '1125420102',


// 是否启用应用商店
'appstoreenabled' => true,

// 信任的反向代理
'trusted_proxies' => ['192.168.0.0/16'],
'forwarded_for_headers' => ['HTTP_X_FORWARDED_FOR'],

// 代理配置
// ==============================

// 覆盖主机 - 用于检测不到反向代理的 Host 时
'overwritehost' => '',

// 如果在反向代理之后检测不到 schema 时可以设置 - 例如 https
'overwriteprotocol' => '',

// 覆盖 root 路径 - 例如 www.example.com/nextcloud 会检测为 /nextcloud
// 反向代理的时候可能检测不到
'overwritewebroot' => '',

// 复写的条件地址 - 例如 10\.0\.0\. 则只覆盖 10.0.0.0/24 过来的请求
// 正则表达式
'overwritecondaddr' => '',

// 覆盖命令行工具地址 - 例如 occ cron 等
'overwrite.cli.url' => '',

)
```
