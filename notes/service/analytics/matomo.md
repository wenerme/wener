---
id: matomo
title: Matomo
---

# matomo

## Tips

* [nginx piwik recipes](https://www.nginx.com/resources/wiki/start/topics/recipes/piwik/)
* [自定义 logo](https://github.com/piwik/piwik/issues/3318)
* [通过代理进行外部访问](http://piwik.org/faq/troubleshooting/#faq_121)
  * 插件
* [log-analytics](https://github.com/piwik/piwik-log-analytics)
  * [how-to](http://piwik.org/docs/log-analytics-tool-how-to/)

```bash
docker run --rm -it \
  --name matomo matomo
```

```ini
; 外部网络代理
[proxy]
host = proxy      ; Proxy host: the host name of your proxy server (mandatory)
port =      ; Proxy port: the port that the proxy server listens to. There is no standard default, but 80, 1080, 3128, and 8080 are popular
username =      ; Proxy username: optional; if specified, password is mandatory
password =      ; Proxy password: optional; if specified, username is mandatory
```

## 活动支持

* Piwik 支持 GA 的 utm_campaign, utm_medium, utm_source, utm_term [FAQ 119](http://piwik.org/faq/general/faq_119/#faq_119)

```nginx
# vhost log format
log_format vhosts '$host $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
```

piwik/config/config.ini.php

## FAQ
### 关闭网络访问
* [How do I configure Piwik on a server without Internet?](https://piwik.org/faq/troubleshooting/faq_16646/)
* 禁用掉 Marketplace 插件即可

## 如何检测唯一用户
* https://matomo.org/faq/general/faq_21418/
* 默认跨站用户独立跟踪，可使用 `enable_fingerprinting_across_websites` 关闭

```ini
[General]
# 使用 https
assume_secure_protocol=1

```

Accurate User Detection cross devices: User ID (set in JS and all other clients) 
https://github.com/matomo-org/matomo/issues/3490

https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id


https://matomo.org/faq/how-to/faq_175/
HOW DO I TELL MATOMO TO TRACK UNIQUE VISITORS BASED ON THE VISITOR ID COOKIE, INSTEAD OF USING IP ADDRESS?

```
[Tracker]
trust_visitors_cookies = 1
```

https://github.com/Valve/fingerprintjs2


https://docs.fingerprintjs.com/pro/integrations/matomo-piwik


      getGlobalThis()?.['_paq']?.push(['trackSiteSearch',
        `${search.policyProvince ?? ''} ${search.keyword}`,
        '新冠政策搜索',
        result.length
      ]);

_paq.push(["setDomains", ["*.domain1.com", "*.domain2.com"]]);
_paq.push(["enableCrossDomainLinking"]);

https://developer.matomo.org/api-reference/tracking-javascript

https://developer.matomo.org/guides/tracking-javascript-guide

_paq.push(['trackEvent', category, action, name, value, {dimension1: 'DimensionValue'}]);
_paq.push(['trackSiteSearch', keyword, category, resultsCount, {dimension1: 'DimensionValue'}]);
_paq.push(['trackLink', url, linkType, {dimension1: 'DimensionValue'}]);
_paq.push(['trackGoal', idGoal, customRevenue, {dimension1: 'DimensionValue'}]);

// User has just logged out, we reset the User ID
_paq.push(['resetUserId']);

// we also force a new visit to be created for the pageviews after logout
_paq.push(['appendToTrackingUrl', 'new_visit=1']); 

_paq.push(['trackPageView']);

// we finally make sure to not again create a new visit afterwards (important for Single Page Applications)
_paq.push(['appendToTrackingUrl', '']); 



_paq.push(['trackContentImpression', 'Content Name', 'Content Piece', 'http://www.example.com']);

div.addEventListener('click', function () {
    _paq.push(['trackContentInteraction', 'tabActivated', 'Content Name', 'Content Piece', 'http://www.example.com']);
});


Form
https://www.form-analytics.net/
https://matomo.org/faq/form-analytics/

trackEvent(category, action, [name], [value])

https://www.npmjs.com/package/@datapunt/matomo-tracker-react

matomo nextjs

https://stackoverflow.com/questions/54443354/listen-to-route-change-with-next-js-to-use-with-matomo-piwik
