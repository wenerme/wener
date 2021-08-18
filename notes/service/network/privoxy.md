---
id: privoxy
title: Privoxy
---

# Privoxy

- 提供 HTTP 代理
- 支持将二级代理
  - 例如将 SOCKS 代理转为 HTTP 代理
- [privoxy](https://www.privoxy.org/)
- 支持通过浏览器配置 - 需要安装了模板
  - http://config.privoxy.org
  - http://p.p
- https://www.privoxy.org/user-manual/index.html
- 注意
  - 不支持 auth，可以转发 auth
    - `enable-proxy-authentication-forwarding`

### privoxy

- 提供 HTTP 代理
- 支持将二级代理
  - 例如将 SOCKS 代理转为 HTTP 代理
- [privoxy](https://www.privoxy.org/)

```bash
# macOS
# macOS 下的配置目录为 /usr/local/etc/privoxy
brew install privoxy

# 监听 7777 转发到 8888 SOCKS 端口
cat <<CONF > privoxy.conf
listen-address 0.0.0.0:7777
forward-socks5t / 127.0.0.1:8888 .
CONF

# 配置文件校验
privoxy --config-test privoxy.conf
# 在前台运行
privoxy --no-daemon privoxy.conf

# Docker 启动
docker run -d --restart always \
  -p 127.0.0.1:7777:7777 \
  --name privoxy wener/privoxy

# AlpineLinux
apk add privoxy
cat <<CONF > /etc/privoxy/config
listen-address 0.0.0.0:7777
# forward-socks5t / 127.0.0.1:8888 .
CONF
service privoxy start
curl 127.0.0.1:7777 icanhazip.com

rc-update add privoxy
```

## 配置

- https://www.privoxy.org/faq/configuration.html

```conf
# 配置目录
confdir /etc/privoxy
# 模板目录 - 默认为 confdir/template
# templdir /etc/privoxy/templates
# 临时目录
# temporary-directory /tmp
# 日志目录
logdir /var/log/privoxy

# 动作文件 - confdir 的相对位置
actionsfile default.action
# 过滤文件 - confdir 的相对位置
filterfile default.filter
# 日志文件 - logdir 相对位置
logdir logfile
# 信任文件 - confdir 的相对位置
# trustfile trustfile

# 日志等级 - bit 位 或 写多行
debug 0
# 是否单线程运行
single-threaded 0
# CGI 页面显示的主机名
# hostname example.com

# 帮助文档目录
user-manual  /usr/share/doc/privoxy/user-manual
# 当访问不信任网站时显示的地址
# trust-info-url http://wener.me
# 在页面上显示的管理员地址
# admin-address admin@example.com
# 在页面上显示的代理信息
# proxy-info-url https://proxy.example.com


# 监听配置 - 可写多次
listen-address 127.0.0.1:8118

# 代理功能开关默认值 - 广告拦截、内容过滤
toggle 1
# 是否允许远程修改 - http://config.privoxy.org/toggle
enable-remote-toggle 0
# 是否识别 HTTP 头来控制开关 - X-Filter: No
enable-remote-http-toggle 0

# 是否允许编辑 action
enable-edit-actions 0

# 是否强制阻塞 - 默认在阻塞页面包含继续访问操作
enforce-blocks 0

# ACLs
# ==========
# 来源-目标
# src_addr[:port][/src_masklen] [dst_addr[:port][/dst_masklen]]
# 允许访问
permit-access 192.168.2.0/24
permit-access www.privoxy.org/24 www.example.com/32

# 禁止访问
deny-access 192.168.3.0/24
deny-access pornhub.com

# 内容过滤的缓冲
buffer-limit 4096
# 是否转发授权信息
enable-proxy-authentication-forwarding 0

# 可信任的管理页 referer 地址
# trusted-cgi-referer wener.me

# 转发
# ==========
# HTTP 转发
# forward target_pattern http_parent[:port]
# `.‘ 表示直接请求
# 所有的请求进行转发
forward   /      external-proxy.example.org:8080
# 443 不转发
forward   :443   .
# 域名控制转发
forward   .google.com   .

# 本地直接请求
forward 192.168.*.*/  .
forward 10.*.*.*/     .
forward 127.*.*.*/    .
forward localhost/    .

# 默认不转发，只转发固定格式文件
forward   /                          .
forward   /.*\.(exe|com|dll|zip)$    antivir.example.com:8010

# SOCKS 转发
# forward-socks4, forward-socks4a, forward-socks5 and forward-socks5t
# 值格式 target_pattern socks_proxy[:port] http_parent[:port]
# 将所有请求转发 127.0.0.1:8888
forward-socks5t / 127.0.0.1:8888 .

# 转发链接重试
forwarded-connect-retries 0

# 杂项
# ==========
# 接受被拦截的请求
accept-intercepted-requests 0
# 拦截是否对 CGI 生效
allow-cgi-request-crunching 0
# GCI 是否分离大表单
split-large-forms 0
# 链接保活时间
keep-alive-timeout 0
# 是否支持管道请求 - 一次请求多个返回
tolerate-pipelining 0
# 服务端链接超时时间
default-server-timeout 0
# 保活的链接是否共享
connection-sharing 0
# Socket 未接收到数据的超时时间
socket-timeout 300
# 最大链接数
max-client-connections 128
# 请求链接队列数
listen-backlog 128
# 接收过滤
enable-accept-filter 0

handle-as-empty-doc-returns-ok 0
# 启用压缩
enable-compression 0
# 压缩级别
compression-level 1
# HTTP 头顺序
# client-header-order Contet-Type,X-Token
# 客户端相关标签 - http://config.privoxy.org/client-tags
# client-specific-tag admin-block 控制管理员的访问
# 标签生命周期
client-tag-lifetime 60
# 是否信任 X-Forwarded-For
trust-x-forwarded-for 0
# 接收缓存大小
receive-buffer-size 5000
```
