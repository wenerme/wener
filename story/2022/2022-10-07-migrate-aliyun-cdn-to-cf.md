---
slug: migrate-aliyun-cdn-to-cf
title: 迁移阿里云 CDN 到 Cloudflare
tags:
  - DevOps
  - Aliyun
---

# 迁移阿里云 CDN 到 Cloudflare

![](./2022-10-07-cf-stat.png)

每月节省 30¥ 阿里云全站 CDN 流量费用。

<!-- more -->

## 背景

https://wener.tech 为国内备案域名，https://wener.me 为未备案域名，两个站点提供相同内容，数据都为 github pages

- wener.me https://github.com/wenerme/wener/tree/gh-pages
- wener.tech https://github.com/wenerme/wener.tech/tree/gh-pages
- https://charts.wener.tech https://github.com/wenerme/charts

因为一个 repo 只能有一个 CNAME，所以使用了两个。

在国内备案域名最省事的方式是放到国内云平台解析，迁出可能导致备案撤销，因此 wener.tech 使用了阿里云全站 CDN。

其中 charts.wener.tech 流量最大，因为加到一些 helm charts 的索引站里，且部署很多地方都用到了。
其中量最大的请求为 index.yaml ， 单个文件不小，请求次数高，每个月的全站 CDN 基本都花费在了 charts.wener.tech。

## 迁移

每个月为 charts.wener.tech 流量付费也不是办法，因此打算迁移。

**之前**

import Mermaid from '@theme/Mermaid';

<Mermaid
  chart={`
graph TD
    charts.wener.tech --CNAME--> AliyunCDN
    AliyunCDN --> GitHubPages
`}
/>


**之后**

<Mermaid
  chart={`
graph TD
    charts.wener.tech -- CNAME --> fb.wener.me
    fb.wener.me --> ArgoTunnel --Kubernetes--> Nginx
    Nginx --> GitHubPages
`}
/>

因为 wener.tech 是在国内，因此只能使用 CNAME 方式到 cloudflare，cloudflare 支持为外部域名配置 ssl ，然后 fallback 到托管域名。

使用了 Nginx 作为反向代理缓存，尝试了 Varnish，但发现还是 Nginx 最为简单暴力。

GitHub Pages 有时候在国内也不一定能访问，加了本地缓存是最为保险的。

> **Note** [Why choose nginx as proxy cache](https://wener.me/notes/devops/web/proxy-cache).

**Cloudflare 缓存命中问题**

一开始缓存命中是很低的

![](./2022-10-07-cf-stat.png)

因为 Cloudflare 基于 extension 缓存而不是 mime，且默认不缓存 html yaml 这种，在通过 Page Rule 添加全站缓存后，缓存命中率一下子就上去了。

就这样每个月节省了一小笔阿里云全站 CDN 流量费用。

**穿透到 Nginx 的流量**

![](./2022-10-07-goaccess-stat.png)
