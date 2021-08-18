---
title: Squid
---

# Squid

- [squid-cache/squid](https://github.com/squid-cache/squid)
  - Web 缓存服务器 - 用于缓存网页内容以便于快速返回
  - 对于动态内容会相对较慢
  - 可用于反向代理 - 出网缓存 - 服务端
    - 例如缓存静态站点，类似于 Vanish 角色
  - 可用于转发代理 - 入网缓存 - 客户端
    - 例如缓存 Windows 更新
    - 当终端多时可加速静态内容访问
- 默认端口 3128
- 参考
  - [How to monitor Squid proxy server](https://www.monitis.com/blog/how-to-monitor-squid-proxy-server/)
  - [Setting up Explicit Squid Proxy](https://wiki.alpinelinux.org/wiki/Setting_up_Explicit_Squid_Proxy)

:::tip

- 建议配置 HTTPS CA 证书
- 可用于爬虫前置请求代理/缓存
- 可配置 privoxy 作为唯一 cache_peer
  - 实现 https 基于域名转发
  - 支持 socks

:::

:::caution

- 默认不支持 HTTPS 的缓存 [Features/HTTPS](https://wiki.squid-cache.org/Features/HTTPS)
  - HTTPS 会使用 CONNECT 的方式进行 TUNNEL 代理
  - 支持 HTTPS 需要客户端安装 CA 证书
  - 如果安装了 CA 证书也能实现透明代理
- 默认不支持 SOCKS
- SSL Bump 时无法根据域名选择 cache_peer
- 没有 Web 管理端

:::

```bash
cat <<CONF > squid.conf
http_port 3128
acl localnet src 127.0.0.0/24

http_access allow localhost manager
http_access deny manager

cache_dir ufs .cache 500 16 256
minimum_object_size 0 bytes

access_log      access.log
cache_log       cache.log
cache_store_log store.log
CONF
# 校验配置
squid -k parse -f squid.conf
# 准备缓存目录
squid -z -f squid.conf
# 启动
squid --foreground -f squid.conf

# 从新配置
squid -k reconfigure

squidclient -h 127.0.0.1 mgr:info
squidclient -h 127.0.0.1 mgr:utilization

# 测试缓存
curl -x 127.0.0.1:3128 https://www.baidu.com/favicon.ico -v > /dev/null

# 使用情况
squidclient -h 127.0.0.1 -p 3128 cache_object://www.baidu.com/favicon.ico mgr:utilization ｜ grep server.all
# 命中情况
squidclient -h 127.0.0.1 -p 3128 cache_object://www.baidu.com/favicon.ico mgr:info
```

**命中缓存会添加的头**

```
X-Cache: HIT from localhost
X-Cache-Lookup: HIT from localhost:3128
Via: 1.1 localhost (squid)
Age: 51
```

## HTTPS

- 证书可存放于 - /etc/squid/certs/
- 参考
  - [Using Squid to Proxy SSL Sites](https://elatov.github.io/2019/01/using-squid-to-proxy-ssl-sites/)
  - [Intercept HTTPS CONNECT messages with SSL-Bump](https://wiki.squid-cache.org/ConfigExamples/Intercept/SslBumpExplicit)
  - [SslBump Peek and Splice](https://wiki.squid-cache.org/Features/SslPeekAndSplice)

**初始化**

```bash
# macOS 需要使用额外安装的 openssl
brew --prefix openssl

# 生成证书
openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -extensions v3_ca -keyout squid-ca-key.pem -out squid-ca-cert.pem
# 合并 chain
cat squid-ca-cert.pem squid-ca-key.pem >> squid-ca-cert-key.pem

# macOS 注意安装路径
# /usr/local/opt/squid
brew --prefix squid

# 初始化 ssl_db
/usr/local/opt/squid/libexec/security_file_certgen -c -s ssl_db -M 16 MB
# AlpineLinux
/usr/lib/squid/security_file_certgen -c -s ssl_db -M 16 MB
```

**配置**

```
# 监听配置
http_port 3128 ssl-bump \
  cert=squid-ca-cert-key.pem \
  generate-host-certificates=on dynamic_cert_mem_cache_size=16MB
https_port 3129 intercept ssl-bump \
  cert=squid-ca-cert-key.pem \
  generate-host-certificates=on dynamic_cert_mem_cache_size=16MB
sslcrtd_program /usr/local/opt/squid/libexec/security_file_certgen -s ssl_db -M 16MB

# 全量 - 可配置为部分
acl step1 at_step SslBump1
ssl_bump peek step1
ssl_bump bump all
ssl_bump splice all
```

**校验**

```bash
# 失败
curl -x 127.0.0.1:3128 https://mirrors.ustc.edu.cn
# 成功
curl --cacert squid-ca-cert.pem -x 127.0.0.1:3128 https://mirrors.ustc.edu.cn
```

### 其他配置

```
# 正则匹配 SNI
acl api_google_ssl ssl::server_name_regex .*\.googleapis\.com
acl api_google_ssl ssl::server_name_regex .*\.google\.com
acl api_google_ssl ssl::server_name_regex .*\.cloud\.google\.com
```

## CacheManager

- [Features/CacheManager](https://wiki.squid-cache.org/Features/CacheManager)
- 简单的 Web 界面 - 用于查看运行状态
- https://wiki.squid-cache.org/ManagerCgiTool
- http://host/cgi-bin/cachemgr.cgi

### SNMP

- [Features/Snmp](https://wiki.squid-cache.org/Features/Snmp)

```
snmp_port 3401
acl snmppublic snmp_community public
snmp_access allow snmppublic
snmp_access deny all
snmp_incoming_address 0.0.0.0
snmp_outgoing_address 255.255.255.255
```

### 镜像站点

```ini
# 缓存策略
cache_replacement_policy heap LFUDA

# 例如 http://mirrors.ustc.edu.cn/alpine/v3.10/main
refresh_pattern mirrors.ustc.edu.cn/.*\.(apk|iso|deb|rpm) 4320 100% 43200 refresh-ims override-expire

# 或者单独配置
refresh_pattern -i .rpm$ 129600 100% 129600 refresh-ims override-expire
refresh_pattern -i .iso$ 129600 100% 129600 refresh-ims override-expire
refresh_pattern -i .deb$ 129600 100% 129600 refresh-ims override-expire
```

## FAQ

### Your cache is running out of filedescriptors

- `max_filedescriptors 65535` 可指定最大 fd

```bash
# 环境下的限制
ulimit -n
# 修改后重启服务端 - 或在 linux 下全局修改(不推荐)
ulimit -n 65535

# macOS 下查看
launchctl limit maxfiles
# 修改当前会话
sudo launchctl limit maxfiles 65536 200000
ulimit -n 65535

# 启动会输出 fd 数量
grep 'file descriptors available' cache.log

# 服务端当前情况
squidclient mgr:info | grep 'File descriptor' -A 7
```

### SSL_CTX_use_certificate:passed a null parameter

- https://www.spinics.net/lists/squid/msg90936.html

```
2020/05/17 20:08:00 kid1| TLS error: failed to allocate handle: error:140AB043:SSL routines:SSL_CTX_use_certificate:passed a null parameter
2020/05/17 20:08:00 kid1| ERROR: client https start failed to allocate handle: error:140AB043:SSL routines:SSL_CTX_use_certificate:passed a null parameter
2020/05/17 20:08:00 kid1| ERROR: could not create TLS server context for local=127.0.0.1:3130 remote=127.0.0.1:55424 FD 16 flags=1
```

### 默认不支持 socks
- alpine 未构建 socks 支持
- https://wiki.squid-cache.org/Features/Socks
