"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["86908"],{58375:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>y,assets:()=>l,toc:()=>p,frontMatter:()=>i});var r=JSON.parse('{"id":"service/network/proxy/tinyproxy","title":"tinyproxy","description":"- tinyproxy/tinyproxy","source":"@site/../notes/service/network/proxy/tinyproxy.md","sourceDirName":"service/network/proxy","slug":"/service/network/proxy/tinyproxy","permalink":"/notes/service/network/proxy/tinyproxy","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/proxy/tinyproxy.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680070123000,"frontMatter":{"title":"tinyproxy"},"sidebar":"docs","previous":{"title":"Stash","permalink":"/notes/service/network/proxy/stash"},"next":{"title":"Tor","permalink":"/notes/service/network/proxy/tor"}}'),o=t("52676"),s=t("79938");let i={title:"tinyproxy"},a="tinyproxy",l={},p=[{value:"tinyproxy.conf",id:"tinyproxyconf",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"tinyproxy",children:"tinyproxy"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/tinyproxy/tinyproxy",children:"tinyproxy/tinyproxy"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"CPLv2, C"}),"\n",(0,o.jsx)(n.li,{children:"\u8F7B\u91CF\u7EA7\u7684 HTTP/HTTPS \u4EE3\u7406"}),"\n",(0,o.jsx)(n.li,{children:"\u652F\u6301\u7B80\u5355\u53CD\u5411\u4EE3\u7406"}),"\n",(0,o.jsx)(n.li,{children:"\u652F\u6301 upstream \u5206\u6D41"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# macOS \u5B89\u88C5\nbrew info tinyproxy\n\n# AlpineLinux\napk add tinyproxy\n\n# \u6700\u7B80\u914D\u7F6E\ncat << CONF > tinyproxy.conf\nUser nobody\nGroup nobody\nPort 8888\nMaxClients 100\nStartServers 10\nAllow 127.0.0.1\nBasicAuth admin password\nCONF\ntinyproxy -dc ./tinyproxy.conf\n\n# \u5224\u65AD IP\ncurl -x admin:password@127.0.0.1:8888 icanhazip.com\n# \u6D4B\u8BD5 \u5934\ncurl -x admin:password@127.0.0.1:8888 https://httpbin.org/get\n"})}),"\n",(0,o.jsx)(n.h2,{id:"tinyproxyconf",children:"tinyproxy.conf"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/tinyproxy/tinyproxy/blob/master/etc/tinyproxy.conf.in",children:"tinyproxy.conf"})}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"\u9ED8\u8BA4\u914D\u7F6E"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ini",children:'User tinyproxy\nGroup tinyproxy\nPort 8888\nTimeout 600\nDefaultErrorFile "/usr/share/tinyproxy/default.html"\nStatFile "/usr/share/tinyproxy/stats.html"\nLogLevel Info\nMaxClients 100\nMinSpareServers 5\nMaxSpareServers 20\nStartServers 10\nMaxRequestsPerChild 0\nAllow 127.0.0.1\nViaProxyName "tinyproxy"\n'})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ini",children:'# \u8FDB\u7A0B UID GID\nUser tinyproxy\nGroup tinyproxy\n\n# \u76D1\u542C\u7AEF\u53E3\nPort 8888\n\n# \u76D1\u542C\u5730\u5740\n#Listen 192.168.0.1\n\n# \u7ED1\u5B9A\u7684\u7F51\u5361 - \u51FA\u53BB\u7684\u8FDE\u63A5\n#Bind 192.168.0.1\n\n# \u8FDB\u51FA\u94FE\u63A5\u4F7F\u7528\u76F8\u540C\u5730\u5740\n#BindSame yes\n\n#\n# Timeout: The maximum number of seconds of inactivity a connection is\n# allowed to have before it is closed by tinyproxy.\n# \u8D85\u65F6\u65F6\u95F4\nTimeout 600\n\n#\n# ErrorFile: Defines the HTML file to send when a given HTTP error\n# occurs.  You will probably need to customize the location to your\n# particular install.  The usual locations to check are:\n#   /usr/local/share/tinyproxy\n#   /usr/share/tinyproxy\n#   /etc/tinyproxy\n#\n#ErrorFile 404 "/usr/share/tinyproxy/404.html"\n#ErrorFile 400 "/usr/share/tinyproxy/400.html"\n#ErrorFile 503 "/usr/share/tinyproxy/503.html"\n#ErrorFile 403 "/usr/share/tinyproxy/403.html"\n#ErrorFile 408 "/usr/share/tinyproxy/408.html"\n\n#\n# DefaultErrorFile: The HTML file that gets sent if there is no\n# HTML file defined with an ErrorFile keyword for the HTTP error\n# that has occured.\n#\nDefaultErrorFile "/usr/share/tinyproxy/default.html"\n\n#\n# StatHost: This configures the host name or IP address that is treated\n# as the stat host: Whenever a request for this host is received,\n# Tinyproxy will return an internal statistics page instead of\n# forwarding the request to that host.  The default value of StatHost is\n# tinyproxy.stats.\n#\n#StatHost "tinyproxy.stats"\n#\n\n#\n# StatFile: The HTML file that gets sent when a request is made\n# for the stathost.  If this file doesn\'t exist a basic page is\n# hardcoded in tinyproxy.\n#\nStatFile "/usr/share/tinyproxy/stats.html"\n\n#\n# LogFile: Allows you to specify the location where information should\n# be logged to.  If you would prefer to log to syslog, then disable this\n# and enable the Syslog directive.  These directives are mutually\n# exclusive. If neither Syslog nor LogFile are specified, output goes\n# to stdout.\n#\n#LogFile "/var/log/tinyproxy/tinyproxy.log"\n\n#\n# Syslog: Tell tinyproxy to use syslog instead of a logfile.  This\n# option must not be enabled if the Logfile directive is being used.\n# These two directives are mutually exclusive.\n#\n#Syslog On\n\n#\n# LogLevel: Warning\n#\n# Set the logging level. Allowed settings are:\n#	Critical	(least verbose)\n#	Error\n#	Warning\n#	Notice\n#	Connect		(to log connections without Info\'s noise)\n#	Info		(most verbose)\n#\n# The LogLevel logs from the set level and above. For example, if the\n# LogLevel was set to Warning, then all log messages from Warning to\n# Critical would be output, but Notice and below would be suppressed.\n#\nLogLevel Info\n\n#\n# PidFile: Write the PID of the main tinyproxy thread to this file so it\n# can be used for signalling purposes.\n# If not specified, no pidfile will be written.\n#\n#PidFile "/var/run/tinyproxy/tinyproxy.pid"\n\n#\n# XTinyproxy: Tell Tinyproxy to include the X-Tinyproxy header, which\n# contains the client\'s IP address.\n#\n#XTinyproxy Yes\n\n#\n# Upstream:\n#\n# Turns on upstream proxy support.\n#\n# The upstream rules allow you to selectively route upstream connections\n# based on the host/domain of the site being accessed.\n#\n# Syntax: upstream type (user:pass@)ip:port ("domain")\n# Or:     upstream none "domain"\n# The parts in parens are optional.\n# Possible types are http, socks4, socks5, none\n#\n# For example:\n#  # connection to test domain goes through testproxy\n#  upstream http testproxy:8008 ".test.domain.invalid"\n#  upstream http testproxy:8008 ".our_testbed.example.com"\n#  upstream http testproxy:8008 "192.168.128.0/255.255.254.0"\n#\n#  # upstream proxy using basic authentication\n#  upstream http user:pass@testproxy:8008 ".test.domain.invalid"\n#\n#  # no upstream proxy for internal websites and unqualified hosts\n#  upstream none ".internal.example.com"\n#  upstream none "www.example.com"\n#  upstream none "10.0.0.0/8"\n#  upstream none "192.168.0.0/255.255.254.0"\n#  upstream none "."\n#\n#  # connection to these boxes go through their DMZ firewalls\n#  upstream http cust1_firewall:8008 "testbed_for_cust1"\n#  upstream http cust2_firewall:8008 "testbed_for_cust2"\n#\n#  # default upstream is internet firewall\n#  upstream http firewall.internal.example.com:80\n#\n# You may also use SOCKS4/SOCKS5 upstream proxies:\n#  upstream socks4 127.0.0.1:9050\n#  upstream socks5 socksproxy:1080\n#\n# The LAST matching rule wins the route decision.  As you can see, you\n# can use a host, or a domain:\n#  name     matches host exactly\n#  .name    matches any host in domain "name"\n#  .        matches any host with no domain (in \'empty\' domain)\n#  IP/bits  matches network/mask\n#  IP/mask  matches network/mask\n#\n#Upstream http some.remote.proxy:port\n\n#\n# MaxClients: This is the absolute highest number of threads which will\n# be created. In other words, only MaxClients number of clients can be\n# connected at the same time.\n#\nMaxClients 100\n\n#\n# MinSpareServers/MaxSpareServers: These settings set the upper and\n# lower limit for the number of spare servers which should be available.\n#\n# If the number of spare servers falls below MinSpareServers then new\n# server processes will be spawned.  If the number of servers exceeds\n# MaxSpareServers then the extras will be killed off.\n#\nMinSpareServers 5\nMaxSpareServers 20\n\n#\n# StartServers: The number of servers to start initially.\n#\nStartServers 10\n\n#\n# MaxRequestsPerChild: The number of connections a thread will handle\n# before it is killed. In practise this should be set to 0, which\n# disables thread reaping. If you do notice problems with memory\n# leakage, then set this to something like 10000.\n#\nMaxRequestsPerChild 0\n\n# \u5141\u8BB8\u901A\u8FC7\u7684\u767D\u540D\u5355 - \u4E0D\u8BBE\u7F6E\u5141\u8BB8\u6240\u6709\nAllow 127.0.0.1\n\n# \u57FA\u7840\u8BA4\u8BC1\n#BasicAuth user password\n\n# \u6DFB\u52A0\u81EA\u5B9A\u4E49\u5934 - HTTPS \u4E0D\u751F\u6548\n#AddHeader "X-My-Header" "Powered by Tinyproxy"\n\n# Via \u5934\u5185\u5BB9\nViaProxyName "tinyproxy"\n\n# \u7981\u7528 Via \u5934\n#DisableViaHeader Yes\n\n# \u8FC7\u6EE4\u89C4\u5219\n#Filter "/etc/tinyproxy/filter"\n\n# \u8FC7\u6EE4 URL \u800C\u4E0D\u53EA\u662F\u57DF\u540D\n#FilterURLs On\n\n# POSIX \u6269\u5C55\u6B63\u5219\n#FilterExtended On\n\n# \u8FC7\u6EE4\u6B63\u5219\u5927\u5C0F\u5199\u654F\u611F\n#FilterCaseSensitive On\n\n# \u8FC7\u6EE4\u9ED8\u8BA4\u62D2\u7EDD - \u9ED8\u8BA4\u4E3A\u901A\u8FC7\n#FilterDefaultDeny Yes\n\n# \u533F\u540D\u4EE3\u7406 - \u53EA\u6709\u5728\u8FD9\u91CC\u5236\u5B9A\u4E86\u7684 Header \u624D\u5141\u8BB8\u901A\u8FC7\n#Anonymous "Host"\n#Anonymous "Authorization"\n#Anonymous "Cookie"\n\n# \u5141\u8BB8 HTTP CONNECT \u65B9\u6CD5\u7684\u7AEF\u53E3\uFF0C\u8BBE\u7F6E\u4E3A 0 \u7981\u7528\uFF0C\u4E0D\u8BBE\u7F6E\u5141\u8BB8\u6240\u6709\n#ConnectPort 443\n#ConnectPort 563\n\n# \u53CD\u5411\u4EE3\u7406\u5730\u5740\u91CD\u5199\n# http://localhost:8888/google/ => http://www.google.com/\n#ReversePath "/google/"	"http://www.google.com/"\n#ReversePath "/wired/"	"http://www.wired.com/"\n\n# \u53EA\u5141\u8BB8\u53CD\u5411\u4EE3\u7406\n#ReverseOnly Yes\n\n# \u4F7F\u7528 cookie \u8DDF\u8E2A\u53CD\u5411\u4EE3\u7406\n#ReverseMagic Yes\n\n# \u53CD\u54CD\u4EE3\u7406\u57FA\u7840\u5730\u5740 - \u5982\u679C\u4E0D\u8BBE\u7F6E\u5219\u4E0D\u91CD\u5199\n#ReverseBaseURL "http://localhost:8888/"\n'})})]})}function y(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return i}});var r=t(75271);let o={},s=r.createContext(o);function i(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);