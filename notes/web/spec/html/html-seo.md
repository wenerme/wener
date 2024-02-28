---
tags:
  - Marketing
---

# SEO

- header
  - title
  - [meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- Core Web Vitals
- [OpenGraphProtocol](./html-ogp.md)

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Page</title>
    <meta name="description" content="A description of the page" />
    <!-- 2009 年谷歌弃用 keyworks -->
    <meta name="keywords" content="keyword1, keyword2, keyword3" />
    <!-- 默认 index,follow - 也可以写为 all -->
    <!-- 特殊页面可以写 noindex,nofollow -->
    <meta name="robots" content="index,follow" />
    <!-- 可针对 robot -->
    <meta name="googlebot" content="all" />
    <link rel="canonical" href="https://example.com/page" key="canonical" />
    <!-- 多语种 -->
    <link rel="alternate" href="https://example.com/page/en" hreflang="en" />
    <!-- OpenGraph -->
    <meta property="og:title" content="My Page" />
    <meta property="og:description" content="A description of the page" />
    <meta property="og:image" content="https://example.com/image.jpg" />
    <meta property="og:url" content="https://example.com/page" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="My Site" />
    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@site" />
    <meta name="twitter:creator" content="@user" />
    <meta name="twitter:title" content="My Page" />
    <meta name="twitter:description" content="A description of the page" />
    <meta name="twitter:image" content="https://example.com/image.jpg" />

    <!-- Google tags -->
    <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
    <meta name="google" content="notranslate" key="notranslate" />
  </head>
</html>
```

## sitemap.xml

```xml
<xml version="1.0" encoding="UTF-8">
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>http://www.example.com/foo</loc>
      <lastmod>2021-06-01</lastmod>
    </url>
  </urlset>
</xml>
```
