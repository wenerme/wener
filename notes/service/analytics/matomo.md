---
title: Matomo
---

# matomo

- [matomo-org/matomo](https://github.com/matomo-org/matomo)
  - GPLV3, PHP+MySQL
- [nginx piwik recipes](https://www.nginx.com/resources/wiki/start/topics/recipes/piwik/)
- [自定义 logo](https://github.com/piwik/piwik/issues/3318)
- [通过代理进行外部访问](http://piwik.org/faq/troubleshooting/#faq_121)
  - 插件
- [log-analytics](https://github.com/piwik/piwik-log-analytics)
  - [how-to](http://piwik.org/docs/log-analytics-tool-how-to/)

:::caution

- 不能读取百度关键词 - 只有百度统计可以

:::

```bash
docker run --rm -it \
  --name matomo matomo
```

```ini
; 外部网络代理
[proxy]
host = proxy    ; Proxy host: the host name of your proxy server (mandatory)
port =          ; Proxy port: the port that the proxy server listens to. There is no standard default, but 80, 1080, 3128, and 8080 are popular
username =      ; Proxy username: optional; if specified, password is mandatory
password =      ; Proxy password: optional; if specified, username is mandatory
```

- https://github.com/matomo-org/matomo/blob/4.x-dev/config/global.ini.php

---

- /piwik.js
- /piwik.php
- /matomo.js
- /matomo.php
- https://github.com/matomo-org/matomo/blob/master/js/piwik.js

## 活动支持

- Piwik 支持 GA 的 utm_campaign, utm_medium, utm_source, utm_term [FAQ 119](http://piwik.org/faq/general/faq_119/#faq_119)

```nginx
# vhost log format
log_format vhosts '$host $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
```

- piwik/config/config.ini.php

## 配置 {#configuration}

```ini
[General]
# 使用 https
assume_secure_protocol=1
```

# FAQ

## 关闭网络访问

- [How do I configure Piwik on a server without Internet?](https://piwik.org/faq/troubleshooting/faq_16646/)
- 禁用掉 Marketplace 插件即可

## 如何检测唯一用户

- https://matomo.org/faq/general/faq_21418/
- 默认跨站用户独立跟踪，可使用 `enable_fingerprinting_across_websites` 关闭

