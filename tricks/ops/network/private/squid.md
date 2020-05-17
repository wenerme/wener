# Squid
## Tips
* Web 缓存服务器 - 用于缓存网页内容以便于快速返回
  * 对于动态内容会相对较慢
  * 可用于反向代理 - 出网缓存 - 服务端
    * 例如缓存静态站点，类似于 Vanish 角色
  * 可用于转发代理 - 入网缓存 - 客户端
    * 例如缓存 Windows 更新
    * 当终端多时可加速静态内容访问
* 默认端口 3128
* 参考
  * [How to monitor Squid proxy server](https://www.monitis.com/blog/how-to-monitor-squid-proxy-server/)
  * [Setting up Explicit Squid Proxy](https://wiki.alpinelinux.org/wiki/Setting_up_Explicit_Squid_Proxy)
* 注意 ⚠️
  * 默认不支持 HTTPS 的缓存 [Features/HTTPS](https://wiki.squid-cache.org/Features/HTTPS)
    * HTTPS 会使用 CONNECT 的方式进行 TUNNEL 代理

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

## HTTPS
* 证书可存放于 - /etc/squid/certs/
* 参考
  * [Using Squid to Proxy SSL Sites](https://elatov.github.io/2019/01/using-squid-to-proxy-ssl-sites/)
  * [Intercept HTTPS CONNECT messages with SSL-Bump](https://wiki.squid-cache.org/ConfigExamples/Intercept/SslBumpExplicit)
  * [SslBump Peek and Splice](https://wiki.squid-cache.org/Features/SslPeekAndSplice)

__初始化__

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
```

__配置__

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

__校验__

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

## 配置
* 参考
  * http://www.squid-cache.org/Doc/config/
  * https://gist.github.com/kipyegonmark/ef54ea4fb7a11f4d0470
  * https://docs.netgate.com/pfsense/en/latest/cache-proxy/squid-package-tuning.html
  * https://filterlists.com/

### 基础配置
```ini
# 监听端口
http_port 7777

# 定义本地网络
acl localnet src 127.0.0.0/24
acl localnet src 192.168.0.0/16
acl localnet src 10.0.0.0/8
http_access allow localnet

# 缓存目录 - 500MB - 第一级 16 - 第二级 256
cache_dir ufs .caache 500 16 256
```

### 上级转发配置

```ini
# 上级缓存
cache_peer 127.0.0.1 parent 7777 7 no-query

# FTP 不转发 - 直接访问
acl ftp proto FTP
always_direct allow ftp

# 全部走 cache_peer
never_direct allow all
```

### 推荐配置
```ini
# 最小缓存对象
maximum_object_size 1 MB
# 不发送版本信息
httpd_suppress_version_string on

# 定义本地网络
acl localnet src 10.0.0.0/8
acl localnet src 172.16.0.0/12
acl localnet src 192.168.0.0/16
acl localnet src fc00::/7
acl localnet src fe80::/10

# acl localnet src all

# 定义安全端口
acl SSL_ports port 443
acl Safe_ports port 80		# http
acl Safe_ports port 21		# ftp
acl Safe_ports port 443		# https
acl Safe_ports port 70		# gopher
acl Safe_ports port 210		# waiss
acl Safe_ports port 1025-65535	# unregistered ports
acl Safe_ports port 280		# http-mgmt
acl Safe_ports port 488		# gss-http
acl Safe_ports port 591		# filemaker
acl Safe_ports port 777		# multiling http

# 识别 CONNECT 方法
acl CONNECT method CONNECT
# 识别查询参数
acl QUERY urlpath_regex cgi-bin \? asp aspx jsp
# 带参数不缓存
cache deny QUERY

# 只允许安全端口
http_access deny !Safe_ports

# 只允许 CONNECT SSL 端口
http_access deny CONNECT !SSL_ports

# 只允许本地访问 cachemgr
http_access allow localhost manager
http_access deny manager

# 不允许访问本地
http_access deny to_localhost

# 允许本地访问
http_access allow localnet
http_access allow localhost
http_access deny all
```

## refresh_pattern
* [refresh_pattern](http://www.squid-cache.org/Doc/config/refresh_pattern/)
  * `refresh_pattern [-i] regex min percent max [options]`
    * `-i` 大小写不敏感
    * `min` 默认最小失效时间 - 分钟
    * `percent` 失效时间比例 - 例如虽然指定 1h 但达到 50% 的时候就失效
    * `max` 最大失效时间

```
# windows 更新
refresh_pattern -i windowsupdate.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i microsoft.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i windows.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i microsoft.com.akadns.net/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i deploy.akamaitechnologies.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
range_offset_limit none

# mac 更新
refresh_pattern ([^.]+.|)(download|adcdownload).(apple.|)com/.*\.(pkg|dmg) 4320 100% 43200 reload-into-ims

# avg 更新
refresh_pattern ([^.]+.|)avg.com/.*\.(bin) 4320 100% 43200 reload-into-ims
refresh_pattern ([^.]+.|)spywareblaster.net/.*\.(dtb) 4320 100% 64800 reload-into-ims
refresh_pattern ([^.]+.|)symantecliveupdate.com/.*\.(zip|exe) 43200 100% 43200 reload-into-ims
refresh_pattern ([^.]+.|)avast.com/.*\.(vpu|vpaa) 4320 100% 43200 reload-into-ims
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
* `max_filedescriptors 65535` 可指定最大 fd

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
* https://www.spinics.net/lists/squid/msg90936.html

```
2020/05/17 20:08:00 kid1| TLS error: failed to allocate handle: error:140AB043:SSL routines:SSL_CTX_use_certificate:passed a null parameter
2020/05/17 20:08:00 kid1| ERROR: client https start failed to allocate handle: error:140AB043:SSL routines:SSL_CTX_use_certificate:passed a null parameter
2020/05/17 20:08:00 kid1| ERROR: could not create TLS server context for local=127.0.0.1:3130 remote=127.0.0.1:55424 FD 16 flags=1
```

