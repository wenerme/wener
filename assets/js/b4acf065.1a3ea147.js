"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["84398"],{13833:function(n,e,t){t.r(e),t.d(e,{metadata:()=>o,contentTitle:()=>i,default:()=>S,assets:()=>a,toc:()=>p,frontMatter:()=>l});var o=JSON.parse('{"id":"service/network/proxy/stash","title":"Stash","description":"- iOS $4","source":"@site/../notes/service/network/proxy/stash.md","sourceDirName":"service/network/proxy","slug":"/service/network/proxy/stash","permalink":"/notes/service/network/proxy/stash","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/proxy/stash.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702440128000,"frontMatter":{"title":"Stash"},"sidebar":"docs","previous":{"title":"SNI Reverse Proxy","permalink":"/notes/service/network/proxy/sni-rev-proxy"},"next":{"title":"tinyproxy","permalink":"/notes/service/network/proxy/tinyproxy"}}'),r=t("52676"),s=t("79938");let l={title:"Stash"},i="Stash",a={},p=[{value:"\u9ED8\u8BA4\u914D\u7F6E",id:"\u9ED8\u8BA4\u914D\u7F6E",level:2}];function c(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"stash",children:"Stash"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"iOS $4"}),"\n",(0,r.jsx)(e.li,{children:"\u57FA\u4E8E\u89C4\u5219\u7684\u4EE3\u7406"}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"\u9ED8\u8BA4\u914D\u7F6E",children:"\u9ED8\u8BA4\u914D\u7F6E"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://stash.wiki/get-started",children:"https://stash.wiki/get-started"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-yaml",children:"proxy-providers:\n  \u670D\u52A1\u63D0\u4F9B\u5546-1:\n    url: http://your-service-provider\n    interval: 600\n  # \u670D\u52A1\u63D0\u4F9B\u5546-2:\n  #   url: http://your-another-service-provider\n  #   interval: 600\n\nproxy-groups:\n  # \u529F\u80FD\u5206\u7EC4\n  - name: \u9009\u62E9\u4EE3\u7406\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: Netflix\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: Disney+\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney%2B.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: Spotify\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: YouTube\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: Speedtest\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png\n    type: select\n    proxies:\n      - \u81EA\u52A8\u9009\u62E9\n      - \u624B\u52A8\u9009\u62E9\n      - HK \u9999\u6E2F\n      - TW \u53F0\u6E7E\n      - SG \u65B0\u52A0\u5761\n      - JP \u65E5\u672C\n      - US \u7F8E\u56FD\n      - DIRECT\n\n  - name: \u9ED8\u8BA4\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Final.png\n    type: select\n    proxies:\n      - \u9009\u62E9\u4EE3\u7406\n      - DIRECT\n\n  # \u57FA\u4E8E\u5730\u533A\u5206\u7EC4\n  - name: HK \u9999\u6E2F\n    filter: '\u6FB3\u95E8|\uD83C\uDDF2\uD83C\uDDF4|\u6E2F|\uD83C\uDDED\uD83C\uDDF0|HK|(?i)Hong'\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: TW \u53F0\u6E7E\n    filter: '\u53F0|\uD83C\uDDF9\uD83C\uDDFC|\u6E7E|TW|(?i)Taiwan'\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Taiwan.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: SG \u65B0\u52A0\u5761\n    filter: '\u65B0\u52A0\u5761|\u5761|\u72EE\u57CE|\uD83C\uDDF8\uD83C\uDDEC|SG|(?i)Singapore'\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: JP \u65E5\u672C\n    filter: '\u65E5|\uD83C\uDDEF\uD83C\uDDF5|\u4E1C\u4EAC|JP|(?i)Japan'\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: US \u7F8E\u56FD\n    filter: '\u7F8E|\uD83C\uDDFA\uD83C\uDDF2|US|(?i)States|America'\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: \u81EA\u52A8\u9009\u62E9\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png\n    interval: 120\n    lazy: true\n    tolerance: 50\n    type: url-test\n    include-all: true\n\n  - name: \u624B\u52A8\u9009\u62E9\n    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Static.png\n    interval: 120\n    lazy: true\n    type: select\n    include-all: true\n\nrules:\n  - SCRIPT,quic,REJECT\n\n  # Netflix\n  - GEOSITE,netflix,Netflix\n  # Disney+\n  - GEOSITE,disney,Disney+\n  # Spotify\n  - GEOSITE,spotify,Spotify\n  # Speedtest\n  - GEOSITE,speedtest,Speedtest\n  # GitHub\n  - GEOSITE,github,\u9009\u62E9\u4EE3\u7406\n  # Telegram\n  - IP-ASN,62014,\u9009\u62E9\u4EE3\u7406,no-resolve\n  - IP-ASN,59930,\u9009\u62E9\u4EE3\u7406,no-resolve\n  - IP-ASN,44907,\u9009\u62E9\u4EE3\u7406,no-resolve\n  - IP-ASN,211157,\u9009\u62E9\u4EE3\u7406,no-resolve\n  - PROCESS-NAME,Telegram.exe,\u9009\u62E9\u4EE3\u7406\n  - PROCESS-NAME,Telegram,\u9009\u62E9\u4EE3\u7406\n  - GEOSITE,telegram,\u9009\u62E9\u4EE3\u7406\n  # YouTube\n  - GEOSITE,youtube,YouTube\n  # Google\n  - GEOSITE,google,\u9009\u62E9\u4EE3\u7406\n  # Twitter\n  - GEOSITE,twitter,\u9009\u62E9\u4EE3\u7406\n  - DOMAIN-SUFFIX,tapbots.com,\u9009\u62E9\u4EE3\u7406\n  # Instagram\n  - GEOSITE,instagram,\u9009\u62E9\u4EE3\u7406\n  # Facebook\n  - GEOSITE,facebook,\u9009\u62E9\u4EE3\u7406\n  # Steam\n  - GEOSITE,steam@cn,DIRECT\n  - GEOSITE,steam,\u9009\u62E9\u4EE3\u7406\n  # Apple LBS\n  - DOMAIN-SUFFIX,iphone-ld.apple.com,DIRECT\n  - DOMAIN-SUFFIX,lcdn-locator.apple.com,DIRECT\n  - DOMAIN-SUFFIX,lcdn-registration.apple.com,DIRECT\n  - DOMAIN-SUFFIX,push.apple.com,DIRECT\n  # Apple OCSP\n  - PROCESS-NAME,trustd,\u9009\u62E9\u4EE3\u7406\n  # Microsoft\n  - GEOSITE,microsoft@cn,DIRECT\n  - GEOSITE,microsoft,\u9009\u62E9\u4EE3\u7406\n  - GEOSITE,xbox,\u9009\u62E9\u4EE3\u7406\n  # common proxy utils\n  - PROCESS-NAME,v2ray,DIRECT\n  - PROCESS-NAME,Surge,DIRECT\n  - PROCESS-NAME,ss-local,DIRECT\n  - PROCESS-NAME,privoxy,DIRECT\n  - PROCESS-NAME,trojan,DIRECT\n  - PROCESS-NAME,trojan-go,DIRECT\n  - PROCESS-NAME,naive,DIRECT\n  - PROCESS-NAME,CloudflareWARP,DIRECT\n  - PROCESS-NAME,Cloudflare WARP,DIRECT\n  - IP-CIDR,162.159.193.0/24,DIRECT,no-resolve\n  - PROCESS-NAME,p4pclient,DIRECT\n  - PROCESS-NAME,Thunder,DIRECT\n  - PROCESS-NAME,DownloadService,DIRECT\n  - PROCESS-NAME,qbittorrent,DIRECT\n  - PROCESS-NAME,Transmission,DIRECT\n  - PROCESS-NAME,fdm,DIRECT\n  - PROCESS-NAME,aria2c,DIRECT\n  - PROCESS-NAME,Folx,DIRECT\n  - PROCESS-NAME,NetTransport,DIRECT\n  - PROCESS-NAME,uTorrent,DIRECT\n  - PROCESS-NAME,WebTorrent,DIRECT\n\n  - GEOIP,LAN,DIRECT\n  - GEOIP,CN,DIRECT\n  - MATCH,\u9ED8\u8BA4\nscript:\n  shortcuts:\n    quic: network == 'udp' and dst_port == 443\ndns:\n  default-nameserver:\n    - 114.114.115.115\n    - 119.28.28.28\n    - 223.6.6.6\n    - system\n  nameserver:\n    - https://dns.alidns.com/dns-query\n    - https://doh.pub/dns-query\nlog-level: warning\nmode: rule\n"})})]})}function S(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(c,{...n})}):c(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return l}});var o=t(75271);let r={},s=o.createContext(r);function l(n){let e=o.useContext(s);return o.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),o.createElement(s.Provider,{value:e},n.children)}}}]);