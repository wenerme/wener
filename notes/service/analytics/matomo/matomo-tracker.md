---
title: Matomo Tracker 参考
tags:
  - Matomo
  - Analytics
  - Web
  - Tracking
---

# Matomo Tracker 参考

- [WeChat Matomo](https://github.com/Liudapeng/wechat-matomo/tree/master/wechat-matomo) - 微信小程序 Matomo 埋点
- [Tracking JavaScript Guide](https://developer.matomo.org/guides/tracking-javascript-guide)

跨设备精确用户检测: User ID (在 JS 和所有其他客户端中设置)
[GitHub Issue #3490](https://github.com/matomo-org/matomo/issues/3490)

[Google Analytics User-ID 参考](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id)

[FAQ 175: 如何告诉 Matomo 基于 Visitor ID Cookie 追踪唯一访客而不是 IP 地址？](https://matomo.org/faq/how-to/faq_175/)

```ini
[Tracker]
trust_visitors_cookies = 1
```

- [fingerprintjs2](https://github.com/Valve/fingerprintjs2)
- [FingerprintJS Matomo 集成](https://docs.fingerprintjs.com/pro/integrations/matomo-piwik)

```js
// 示例: 站点搜索追踪
getGlobalThis()?.['_paq']?.push([
  'trackSiteSearch',
  `${search.policyProvince ?? ''} ${search.keyword}`,
  '新冠政策搜索',
  result.length,
]);

// 跨域链接
_paq.push(['setDomains', ['*.domain1.com', '*.domain2.com']]);
_paq.push(['enableCrossDomainLinking']);

// 常用 API
_paq.push(['trackEvent', category, action, name, value, { dimension1: 'DimensionValue' }]);
_paq.push(['trackSiteSearch', keyword, category, resultsCount, { dimension1: 'DimensionValue' }]);
_paq.push(['trackLink', url, linkType, { dimension1: 'DimensionValue' }]);
_paq.push(['trackGoal', idGoal, customRevenue, { dimension1: 'DimensionValue' }]);

// 用户登出重置
_paq.push(['resetUserId']);
_paq.push(['appendToTrackingUrl', 'new_visit=1']); // 强制新访问
_paq.push(['trackPageView']);
_paq.push(['appendToTrackingUrl', '']); // 重置，避免影响后续请求

// 内容追踪
_paq.push(['trackContentImpression', 'Content Name', 'Content Piece', 'http://www.example.com']);

div.addEventListener('click', function () {
  _paq.push(['trackContentInteraction', 'tabActivated', 'Content Name', 'Content Piece', 'http://www.example.com']);
});
```

- 表单分析:
  - [Form Analytics](https://www.form-analytics.net/)
  - [Matomo FAQ](https://matomo.org/faq/form-analytics/)

- React 集成: [@datapunt/matomo-tracker-react](https://www.npmjs.com/package/@datapunt/matomo-tracker-react)
- Next.js 路由监听: [StackOverflow](https://stackoverflow.com/questions/54443354/listen-to-route-change-with-next-js-to-use-with-matomo-piwik)
