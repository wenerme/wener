---
tags:
  - Reference
---

# sitemap
- `<urlset>`
  - `<url>`
    - `<loc>` - URL
      - 最长 2024
    - `<lastmod>` - 最后修改时间
      - `YYYY-MM-DD` 可以包含时间
    - ~~`<changefreq>`~~ - 更新频率
      - always, hourly, daily, weekly, monthly, yearly, never
    - ~~`<priority>`~~ - 优先级
      - 0.0 - 1.0
      - 默认 0.5
- `http://www.example.com/sitemap.xml`
- `http://example.com/catalog/sitemap.xml` 应该包含  `http://example.com/catalog/` 下的内容
- in `robots.txt`
  - `Sitemap: http://www.example.com/sitemap.xml`
- 参考
  - https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
  - [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
  - google 不支持 /ping 提交 sitemap
    -  https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://www.example.com/</loc>
    <lastmod>2023-10-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>http://www.example.com/about</loc>
    <lastmod>2023-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```
