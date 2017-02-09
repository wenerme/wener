# Piwik


## 活动支持

* Piwik 支持 GA 的 utm_campaign, utm_medium, utm_source, utm_term [FAQ 119](http://piwik.org/faq/general/faq_119/#faq_119)
* [nginx piwik recipes](https://www.nginx.com/resources/wiki/start/topics/recipes/piwik/)
* [自定义 logo](https://github.com/piwik/piwik/issues/3318)
* [通过代理进行外部访问](http://piwik.org/faq/troubleshooting/#faq_121)
  * 插件
* [log-analytics](https://github.com/piwik/piwik-log-analytics)
  * [how-to](http://piwik.org/docs/log-analytics-tool-how-to/)


```nginx
# vhost log format
log_format vhosts '$host $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
```
