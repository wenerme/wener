---
id: privoxy-action
title: Privoxy Action
---

# Privoxy Action

* [Action file](https://www.privoxy.org/user-manual/actions-file.html)

## 语法

```ini
+name # 启用 Action
-name # 禁用 Action

+name{param} # 启用带参数
```

## 重定向 google 的搜索结果为 https


```ini
{+redirect{s@^http://[^/]*/search\?q=([^&]*).*@https://encrypted.google.com/search?q=$1@}}
.google.*/search
```

## 覆盖转发
```ini
# 转发特定域名到特定远程 Socks
{+forward-override{forward-socks5t 127.0.0.1:1080 .}}
*.wener.me

# 远程 http proxy 协议
{+forward-override{forward 127.0.0.1:8123 }}
*.wener.me

# 直接请求
{+forward-override{forward .}}
*.wener.me

# 请求 Web 端口
{+forward-override{forward-webserver 127.0.0.1:80}}
*.wener.me

```

### match-all.action
```ini
{ \
# 移除 X-Forwarded-For
+change-x-forwarded-for{block} \
# 针对不同类型添加标记
+client-header-tagger{css-requests} \
+client-header-tagger{image-requests} \
+client-header-tagger{range-requests} \
# 移除邮箱
+hide-from-header{block} \
# 设置如何阻塞图片
+set-image-blocker{pattern} \
}
# 匹配所有 URL
/
```
