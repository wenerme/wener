---
title: tinyproxy
---

# tinyproxy

- [tinyproxy](https://tinyproxy.github.io/)
- [tinyproxy.conf](https://github.com/tinyproxy/tinyproxy/blob/master/etc/tinyproxy.conf.in)
- 轻量级的 HTTP/HTTPS 代理

```bash
# macOS 安装
brew info tinyproxy

# AlpineLinux
apk add tinyproxy

# 最简配置
cat <<CONF > tinyproxy.conf
User nobody
Group nobody
Port 8888
MaxClients 100
StartServers 10
Allow 127.0.0.1
BasicAuth admin password
CONF
tinyproxy -dc ./tinyproxy.conf

curl -x admin:password@127.0.0.1:8888 icanhazip.com
```

**默认配置**

```ini
User tinyproxy
Group tinyproxy
Port 8888
Timeout 600
DefaultErrorFile "/usr/share/tinyproxy/default.html"
StatFile "/usr/share/tinyproxy/stats.html"
LogLevel Info
MaxClients 100
MinSpareServers 5
MaxSpareServers 20
StartServers 10
MaxRequestsPerChild 0
Allow 127.0.0.1
ViaProxyName "tinyproxy"
```

```ini
# 进程 UID GID
User tinyproxy
Group tinyproxy

# 监听端口
Port 8888

# 监听地址
#Listen 192.168.0.1

# 绑定的网卡 - 出去的连接
#Bind 192.168.0.1

# 进出链接使用相同地址
#BindSame yes

#
# Timeout: The maximum number of seconds of inactivity a connection is
# allowed to have before it is closed by tinyproxy.
# 超时时间
Timeout 600

#
# ErrorFile: Defines the HTML file to send when a given HTTP error
# occurs.  You will probably need to customize the location to your
# particular install.  The usual locations to check are:
#   /usr/local/share/tinyproxy
#   /usr/share/tinyproxy
#   /etc/tinyproxy
#
#ErrorFile 404 "/usr/share/tinyproxy/404.html"
#ErrorFile 400 "/usr/share/tinyproxy/400.html"
#ErrorFile 503 "/usr/share/tinyproxy/503.html"
#ErrorFile 403 "/usr/share/tinyproxy/403.html"
#ErrorFile 408 "/usr/share/tinyproxy/408.html"

#
# DefaultErrorFile: The HTML file that gets sent if there is no
# HTML file defined with an ErrorFile keyword for the HTTP error
# that has occured.
#
DefaultErrorFile "/usr/share/tinyproxy/default.html"

#
# StatHost: This configures the host name or IP address that is treated
# as the stat host: Whenever a request for this host is received,
# Tinyproxy will return an internal statistics page instead of
# forwarding the request to that host.  The default value of StatHost is
# tinyproxy.stats.
#
#StatHost "tinyproxy.stats"
#

#
# StatFile: The HTML file that gets sent when a request is made
# for the stathost.  If this file doesn't exist a basic page is
# hardcoded in tinyproxy.
#
StatFile "/usr/share/tinyproxy/stats.html"

#
# LogFile: Allows you to specify the location where information should
# be logged to.  If you would prefer to log to syslog, then disable this
# and enable the Syslog directive.  These directives are mutually
# exclusive. If neither Syslog nor LogFile are specified, output goes
# to stdout.
#
#LogFile "/var/log/tinyproxy/tinyproxy.log"

#
# Syslog: Tell tinyproxy to use syslog instead of a logfile.  This
# option must not be enabled if the Logfile directive is being used.
# These two directives are mutually exclusive.
#
#Syslog On

#
# LogLevel: Warning
#
# Set the logging level. Allowed settings are:
#	Critical	(least verbose)
#	Error
#	Warning
#	Notice
#	Connect		(to log connections without Info's noise)
#	Info		(most verbose)
#
# The LogLevel logs from the set level and above. For example, if the
# LogLevel was set to Warning, then all log messages from Warning to
# Critical would be output, but Notice and below would be suppressed.
#
LogLevel Info

#
# PidFile: Write the PID of the main tinyproxy thread to this file so it
# can be used for signalling purposes.
# If not specified, no pidfile will be written.
#
#PidFile "/var/run/tinyproxy/tinyproxy.pid"

#
# XTinyproxy: Tell Tinyproxy to include the X-Tinyproxy header, which
# contains the client's IP address.
#
#XTinyproxy Yes

#
# Upstream:
#
# Turns on upstream proxy support.
#
# The upstream rules allow you to selectively route upstream connections
# based on the host/domain of the site being accessed.
#
# Syntax: upstream type (user:pass@)ip:port ("domain")
# Or:     upstream none "domain"
# The parts in parens are optional.
# Possible types are http, socks4, socks5, none
#
# For example:
#  # connection to test domain goes through testproxy
#  upstream http testproxy:8008 ".test.domain.invalid"
#  upstream http testproxy:8008 ".our_testbed.example.com"
#  upstream http testproxy:8008 "192.168.128.0/255.255.254.0"
#
#  # upstream proxy using basic authentication
#  upstream http user:pass@testproxy:8008 ".test.domain.invalid"
#
#  # no upstream proxy for internal websites and unqualified hosts
#  upstream none ".internal.example.com"
#  upstream none "www.example.com"
#  upstream none "10.0.0.0/8"
#  upstream none "192.168.0.0/255.255.254.0"
#  upstream none "."
#
#  # connection to these boxes go through their DMZ firewalls
#  upstream http cust1_firewall:8008 "testbed_for_cust1"
#  upstream http cust2_firewall:8008 "testbed_for_cust2"
#
#  # default upstream is internet firewall
#  upstream http firewall.internal.example.com:80
#
# You may also use SOCKS4/SOCKS5 upstream proxies:
#  upstream socks4 127.0.0.1:9050
#  upstream socks5 socksproxy:1080
#
# The LAST matching rule wins the route decision.  As you can see, you
# can use a host, or a domain:
#  name     matches host exactly
#  .name    matches any host in domain "name"
#  .        matches any host with no domain (in 'empty' domain)
#  IP/bits  matches network/mask
#  IP/mask  matches network/mask
#
#Upstream http some.remote.proxy:port

#
# MaxClients: This is the absolute highest number of threads which will
# be created. In other words, only MaxClients number of clients can be
# connected at the same time.
#
MaxClients 100

#
# MinSpareServers/MaxSpareServers: These settings set the upper and
# lower limit for the number of spare servers which should be available.
#
# If the number of spare servers falls below MinSpareServers then new
# server processes will be spawned.  If the number of servers exceeds
# MaxSpareServers then the extras will be killed off.
#
MinSpareServers 5
MaxSpareServers 20

#
# StartServers: The number of servers to start initially.
#
StartServers 10

#
# MaxRequestsPerChild: The number of connections a thread will handle
# before it is killed. In practise this should be set to 0, which
# disables thread reaping. If you do notice problems with memory
# leakage, then set this to something like 10000.
#
MaxRequestsPerChild 0

# 允许通过的白名单 - 不设置允许所有
Allow 127.0.0.1

# 基础认证
#BasicAuth user password

# 添加自定义头 - HTTPS 不生效
#AddHeader "X-My-Header" "Powered by Tinyproxy"

# Via 头内容
ViaProxyName "tinyproxy"

# 禁用 Via 头
#DisableViaHeader Yes

# 过滤规则
#Filter "/etc/tinyproxy/filter"

# 过滤 URL 而不只是域名
#FilterURLs On

# POSIX 扩展正则
#FilterExtended On

# 过滤正则大小写敏感
#FilterCaseSensitive On

# 过滤默认拒绝 - 默认为通过
#FilterDefaultDeny Yes

# 匿名代理 - 只有在这里制定了的 Header 才允许通过
#Anonymous "Host"
#Anonymous "Authorization"
#Anonymous "Cookie"

# 允许 HTTP CONNECT 方法的端口，设置为 0 禁用，不设置允许所有
#ConnectPort 443
#ConnectPort 563

# 反向代理地址重写
# http://localhost:8888/google/ => http://www.google.com/
#ReversePath "/google/"	"http://www.google.com/"
#ReversePath "/wired/"	"http://www.wired.com/"

# 只允许反向代理
#ReverseOnly Yes

# 使用 cookie 跟踪反向代理
#ReverseMagic Yes

# 反响代理基础地址 - 如果不设置则不重写
#ReverseBaseURL "http://localhost:8888/"
```
