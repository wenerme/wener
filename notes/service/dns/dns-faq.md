---
title: DNS FAQ
tags:
  - FAQ
---

# DNS FAQ

- apex domain
  - 不含子域名
  - 有 SOA 记录
  - 域的顶级 记录/节点
  - apex=origin
- https://www.rfc-editor.org/rfc/rfc7719 "DNS Terminology"
- 阿里云 URL 记录 - 会隐含 A 记录
  - 显性 URL - Location 头
  - 隐性 URL - 使用 iframe

## CNAME 和 TXT 不能共存

- RFC1034

> If a CNAME RR is present at a node, no other data should be present

- 但可以有 A 记录
- 或者尝试用 ALIAS - 不是所有都支持,不是标准记录
  - PowerDNS
  - bind9
  - dnsimple [What’s an ALIAS record?](https://support.dnsimple.com/articles/alias-record/#whats-an-alias-record)

## 清除 DNS 缓存 / Clear DNS cache

```bash
# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns
```

- chrome://net-internals/#dns
  - 清除 DNS 缓存
- chrome://net-internals/#sockets
  - 清除链接 - 因为还是打开的之前的地址

## PiHole vs AdGuard

- PiHole
  - 完全控制
- AdGuard
  - 使用更简单

---

- https://github.com/AdguardTeam/AdguardHome#how-does-adguard-home-compare-to-pi-hole

## usercontent

- To C 场景支持 UGC(User Generate Content) 时需要考虑
- 安全考虑
  - XSS
  - CSRF
  - 上传文件
  - 隔离
    - 域名不同 对于浏览器来说不在一个 origin
    - cookie, sandbox, CSP 策略都不同
  - 缓存策略后端逻辑可能不同
  - 用户隐私 & 合规 - 区分不同的内容类型
- e.g. 区分 CDN & UserContent
  - githubusercontent.com
  - googleusercontent.com
  - fbcdn.net
  - dropboxusercontent.com
  - redditmedia.com
  - redditusercontent.com
  - slack-edge.com
  - slack-files.com
  - wp.com
  - wordpressusercontent.com
  - oaiusercontent.com
  - oaistatic.com
  - twimg.com
  - ytimg.com
  - cloudfront.net
  - scdn.co
  - discordapp.com
  - discordusercontent.com
- Thanks HN: Lessons learned after Google nearly killed my site
  [HN](https://news.ycombinator.com/item?id=26357033)

## @

- placeholder = the current domain/current origin
- https://datatracker.ietf.org/doc/html/rfc1035#page-35

## 二级域名 {#subdomain}

- 控制台
  - dash
  - console
- 后台
  - admin
- 静态
  - static <-> dynamic
    - 静态资源
    - 强调文件的静态性质，适合用于所有不需要服务器动态处理的文件。
    - HTML、CSS、JS、图像等
  - assets
    - 资源
    - 静态资源
    - 通常包括图片、字体、样式表、脚本等。
  - cdn
    - 内容分发, 和地理位置相关
    - 包含多种文件类型 图片、视频、JavaScript/CSS 文件
  - public <-> internal
    - 强调文件是公开可访问的，适合用于公开的文档、下载链接等。
    - 用途更为广泛
  - img
    - 图片
    - 可能支持图片的缩略图、水印等处理
  - avatar
    - 头像
    - 专门用于存放用户头像
    - https://avatars.githubusercontent.com/u/1777211
    - `https://lh3.googleusercontent.com/ogw/AF2bZygZwHRnKCON05JMtPJkbegumW5fl7A8-AjDqkHMqeIov88g=s128-c-mo`
      - s128-c-mo
        - s: size
        - c: crop
        - mo: mode
  - dl
    - 下载
    - 专门用于提供文件下载的链接，通常用于软件、文档等文件的下载页面
  - files
    - 文件
    - 用于存放各种文件，如文档、图片、视频等
  - vod
  - videos
    - [kaltura/nginx-vod-module](https://github.com/kaltura/nginx-vod-module)

---

- drive.google.com
- onedrive.live.com
- amazon.com/clouddrive
- pan.baidu.com
- www.alipan.com
