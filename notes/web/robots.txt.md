---
title: robots.txt
---

# robots.txt

- 字段
  - User-agent
  - Allow
  - Disallow
  - Sitemap
- robots.txt
  - https://developer.mozilla.org/robots.txt
  - https://www.workday.com/robots.txt
- 参考
  - https://developers.google.com/search/docs/advanced/robots/intro
  - https://support.google.com/webmasters/answer/6062598

```
User-agent: *
Disallow: /
```

```
User-agent: *
Disallow:
```

```robot.txt
User-agent: *
Sitemap: https://developer.mozilla.org/sitemap.xml

Disallow: /api/
Disallow: /*/files/
Disallow: /media
Disallow: /en-US/search
Disallow: /es/search
Disallow: /fr/search
Disallow: /ja/search
Disallow: /ko/search
Disallow: /pt-BR/search
Disallow: /ru/search
Disallow: /zh-CN/search
Disallow: /zh-TW/search
```
