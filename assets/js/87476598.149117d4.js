"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36514"],{50733:function(n,e,r){r.r(e),r.d(e,{metadata:()=>s,contentTitle:()=>i,default:()=>h,assets:()=>o,toc:()=>c,frontMatter:()=>a});var s=JSON.parse('{"id":"service/network/proxy/clash/clash-conf","title":"Clash \u914D\u7F6E","description":"- config.yaml","source":"@site/../notes/service/network/proxy/clash/clash-conf.md","sourceDirName":"service/network/proxy/clash","slug":"/service/network/proxy/clash/conf","permalink":"/notes/service/network/proxy/clash/conf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/network/proxy/clash/clash-conf.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1680491916000,"frontMatter":{"tags":["Configuration"]},"sidebar":"docs","previous":{"title":"clash","permalink":"/notes/service/network/proxy/clash/"},"next":{"title":"Clash FAQ","permalink":"/notes/service/network/proxy/clash/faq"}}'),t=r("52676"),l=r("79938");let a={tags:["Configuration"]},i="Clash \u914D\u7F6E",o={},c=[{value:"proxies",id:"proxies",level:2},{value:"proxy-groups",id:"proxy-groups",level:2},{value:"Rule",id:"rule",level:2}];function d(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"clash-\u914D\u7F6E",children:"Clash \u914D\u7F6E"})}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"config.yaml"}),"\n",(0,t.jsxs)(e.li,{children:["mode\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"rule - \u57FA\u4E8E\u89C4\u5219\u8DEF\u7531"}),"\n",(0,t.jsx)(e.li,{children:"global - \u5168\u5C40\u8DEF\u7531\u5230\u5355\u4E2A\u51FA\u53E3"}),"\n",(0,t.jsx)(e.li,{children:"direct - \u4E0D\u8DEF\u7531\u76F4\u63A5\u8BBF\u95EE"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["proxies - \u4E0A\u6E38\u4EE3\u7406\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["type\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"ss"}),"\n",(0,t.jsx)(e.li,{children:"ssr - ShadowsocksR"}),"\n",(0,t.jsx)(e.li,{children:"vmess"}),"\n",(0,t.jsx)(e.li,{children:"socks5"}),"\n",(0,t.jsx)(e.li,{children:"http"}),"\n",(0,t.jsx)(e.li,{children:"snell"}),"\n",(0,t.jsx)(e.li,{children:"trojan"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["proxy-groups - \u4EE3\u7406\u5206\u7EC4 - LB \u7B56\u7565\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["type\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"select - \u624B\u52A8\u9009\u62E9"}),"\n",(0,t.jsxs)(e.li,{children:["url-test - \u4F7F\u7528 url \u6D4B\u901F\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["url ",(0,t.jsx)(e.a,{href:"http://www.gstatic.com/generate_204",children:"http://www.gstatic.com/generate_204"})]}),"\n",(0,t.jsx)(e.li,{children:"interval 300"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["relay - \u4E32\u8054\u6240\u6709\u4EE3\u7406\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u4E0D\u652F\u6301 UDP"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:"fallback - \u57FA\u4E8E URL \u68C0\u6D4B\u8FDB\u884C\u56DE\u6EDA"}),"\n",(0,t.jsx)(e.li,{children:"load-balance - \u57FA\u4E8E eTLD+1 \u8FDB\u884C\u8D1F\u8F7D"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["proxy-providers - \u6307\u5411 yaml \u914D\u7F6E - \u5305\u542B ",(0,t.jsx)(e.code,{children:"proxies: []"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"type http,file"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["rules\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"DOMAIN"}),"\n",(0,t.jsx)(e.li,{children:"DOMAIN-SUFFIX"}),"\n",(0,t.jsx)(e.li,{children:"DOMAIN-KEYWORD"}),"\n",(0,t.jsx)(e.li,{children:"GEOIP"}),"\n",(0,t.jsx)(e.li,{children:"IP-CIDR"}),"\n",(0,t.jsx)(e.li,{children:"IP-CIDR6"}),"\n",(0,t.jsx)(e.li,{children:"SRC-IP-CIDR"}),"\n",(0,t.jsx)(e.li,{children:"SRC-PORT"}),"\n",(0,t.jsx)(e.li,{children:"DST-PORT"}),"\n",(0,t.jsx)(e.li,{children:"PROCESS-NAME"}),"\n",(0,t.jsx)(e.li,{children:"MATCH - \u9ED8\u8BA4\u5339\u914D"}),"\n",(0,t.jsx)(e.li,{children:"\u6DFB\u52A0 no-resolve \u53EF\u907F\u514D resolve \u57DF\u540D \u53BB\u5339\u914D cidr"}),"\n",(0,t.jsx)(e.li,{children:"\u7279\u6B8A\u7B56\u7565 DIRECT, REJECT"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:'clash -t -f config.yaml                        # test\ncurl -X PUT 127.0.0.1:9090/configs --json "{}" # reload\n'})}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-yaml",children:"# HTTP(S) \u4EE3\u7406\u7AEF\u53E3\nport: 7890\n# SOCKS5 \u4EE3\u7406\u7AEF\u53E3\nsocks-port: 7891\n\n# Linux, macOS \u8F6C\u53D1\u900F\u660E\u4EE3\u7406\u7AEF\u53E3 (Redirect TCP and TProxy UDP)\n# redir-port: 7892\n\n# Linux TProxy \u900F\u660E\u4EE3\u7406\u7AEF\u53E3 (TProxy TCP and TProxy UDP)\n# tproxy-port: 7893\n\n# HTTP(S), SOCKS4(A)/SOCKS5 \u591A\u534F\u8BAE\u7AEF\u53E3\n# mixed-port: 7890\n\n# SOCKS5/HTTP(S) \u4EE3\u7406\u8BA4\u8BC1\n# authentication:\n#  - \"user1:pass1\"\n#  - \"user2:pass2\"\n\n# \u5141\u8BB8 Lan \u8FDE\u63A5\u5230\u672C\u5730\u7AEF\u53E3\nallow-lan: false\n# allow-lan=true \u65F6\u7684\u76D1\u542C\u7ED1\u5B9A\u5730\u5740\nbind-address: '*'\n\n# \u8DEF\u7531\u6A21\u5F0F\n# rule - \u57FA\u4E8E\u89C4\u5219\u7684\u5305\u8F6C\u53D1\n# global - \u5168\u5C40\u5355\u51FA\u53E3\n# direct - \u76F4\u63A5\u8BBF\u95EE\nmode: rule\n\n# \u65E5\u5FD7\u7EA7\u522B\n# info / warning / error / debug / silent\nlog-level: info\n\nipv6: false\n\n# \u5916\u90E8 REST API \u63A5\u53E3 \u76D1\u542C\u5730\u5740\nexternal-controller: 127.0.0.1:9090\n# UI \u76EE\u5F55\n# \u8BBF\u95EE\u5730\u5740 http://{{external-controller}}/ui\nexternal-ui: folder\n# REST \u7684 \u5BC6\u94A5\n# Authorization: Bearer ${secret}\n# secret: \"\"\n\n# Outbound interface name\ninterface-name: en0\n\n# Linux fwmark\nrouting-mark: 6666\n\n# Static hosts for DNS server and connection establishment (like /etc/hosts)\n#\n# Wildcard hostnames are supported (e.g. *.clash.dev, *.foo.*.example.com)\n# Non-wildcard domain names have a higher priority than wildcard domain names\n# e.g. foo.example.com > *.example.com > .example.com\n# P.S. +.foo.com equals to .foo.com and foo.com\nhosts:\n  # '*.clash.dev': 127.0.0.1\n  # '.dev': 127.0.0.1\n  # 'alpha.clash.dev': '::1'\n\nprofile:\n  # Store the `select` results in $HOME/.config/clash/.cache\n  # set false If you don't want this behavior\n  # when two different configurations have groups with the same name, the selected values are shared\n  store-selected: false\n\n  # persistence fakeip\n  store-fake-ip: true\n\ndns:\n  enable: false\n  listen: 0.0.0.0:53\n  # ipv6: false # \u662F\u5426\u54CD\u5E94 AAAA\n\n  # \u9ED8\u8BA4\u4E0A\u6E38 NS\n  default-nameserver:\n    - 114.114.114.114\n    - 8.8.8.8\n  enhanced-mode: redir-host # or fake-ip\n  fake-ip-range: 198.18.0.1/16 # Fake IP addresses pool CIDR\n  # use-hosts: true # lookup hosts and return IP record\n\n  # Hostnames in this list will not be resolved with fake IPs\n  # i.e. questions to these domain names will always be answered with their\n  # real IP addresses\n  # fake-ip-filter:\n  #   - '*.lan'\n  #   - localhost.ptlogin2.qq.com\n\n  # \u652F\u6301 UDP, TCP, DoT, DoH\n  # \u652F\u6301\u6307\u5B9A\u7AEF\u53E3\n  # \u8FD4\u56DE\u7B2C\u4E00\u4E2A\u54CD\u5E94\n  # \u4E0D\u4F1A\u8D70\u4EE3\u7406\n  nameserver:\n    - 114.114.114.114 # default value\n    - 8.8.8.8 # default value\n    - tls://dns.rubyfish.cn:853 # DNS over TLS\n    - https://1.1.1.1/dns-query # DNS over HTTPS\n    - dhcp://en0 # dns from dhcp\n\n  # \u5728 nameservers \u4E4B\u5916\u5E76\u53D1\u8BF7\u6C42 DNS\n  # \u7528\u4E8E GEOIP \u975E CN \u65F6\n  # fallback:\n  #   - tcp://1.1.1.1\n\n  # If IP addresses resolved with servers in `nameservers` are in the specified\n  # subnets below, they are considered invalid and results from `fallback`\n  # servers are used instead.\n  #\n  # IP address resolved with servers in `nameserver` is used when\n  # `fallback-filter.geoip` is true and when GEOIP of the IP address is `CN`.\n  #\n  # If `fallback-filter.geoip` is false, results from `nameserver` nameservers\n  # are always used if not match `fallback-filter.ipcidr`.\n  #\n  # This is a countermeasure against DNS pollution attacks.\n  # fallback-filter:\n  #   geoip: true\n  #   geoip-code: CN\n  #   ipcidr:\n  #     - 240.0.0.0/4\n  #   domain:\n  #     - '+.google.com'\n  #     - '+.facebook.com'\n  #     - '+.youtube.com'\n\n  # \u9488\u5BF9\u57DF\u540D\u914D\u7F6E NS\n  # nameserver-policy:\n  #   'www.baidu.com': '114.114.114.114'\n  #   '+.internal.crop.com': '10.0.0.1'\n\n# \u4EE3\u7406\u8BBE\u7F6E\nproxies:\n  # Shadowsocks\n  # The supported ciphers (encryption methods):\n  #   aes-128-gcm aes-192-gcm aes-256-gcm\n  #   aes-128-cfb aes-192-cfb aes-256-cfb\n  #   aes-128-ctr aes-192-ctr aes-256-ctr\n  #   rc4-md5 chacha20-ietf xchacha20\n  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305\n  - name: 'ss1'\n    type: ss\n    server: server\n    port: 443\n    cipher: chacha20-ietf-poly1305\n    password: 'password'\n    # udp: true\n    # \u63D2\u4EF6\u914D\u7F6E\n    plugin: obfs # obfs, v2ray-plugin\n    plugin-opts:\n      # obfs - tls,http\n      # v2ray-plugin - websocket - \u6682\u4E0D\u652F\u6301 QUIC\n      mode: tls\n      # host: bing.com\n\n      # v2ray-plugin \u914D\u7F6E\n      # tls: true # wss\n      # skip-cert-verify: true\n      # host: bing.com\n      # path: \"/\"\n      # mux: true\n      # headers:\n      #   custom: value\n\n  # vmess\n  # cipher - auto/aes-128-gcm/chacha20-poly1305/none\n  - name: 'vmess'\n    type: vmess\n    server: server\n    port: 443\n    uuid: uuid\n    alterId: 32\n    cipher: auto\n    # udp: true\n    # tls: true\n    # skip-cert-verify: true\n    # servername: example.com # priority over wss host\n    # network: ws\n    # ws-opts:\n    #   path: /path\n    #   headers:\n    #     Host: v2ray.com\n    #   max-early-data: 2048\n    #   early-data-header-name: Sec-WebSocket-Protocol\n\n  - name: 'vmess-h2'\n    type: vmess\n    server: server\n    port: 443\n    uuid: uuid\n    alterId: 32\n    cipher: auto\n    network: h2\n    tls: true\n    h2-opts:\n      host:\n        - http.example.com\n        - http-alt.example.com\n      path: /\n\n  - name: 'vmess-http'\n    type: vmess\n    server: server\n    port: 443\n    uuid: uuid\n    alterId: 32\n    cipher: auto\n    # udp: true\n    # network: http\n    # http-opts:\n    #   # method: \"GET\"\n    #   # path:\n    #   #   - '/'\n    #   #   - '/video'\n    #   # headers:\n    #   #   Connection:\n    #   #     - keep-alive\n\n  - name: vmess-grpc\n    server: server\n    port: 443\n    type: vmess\n    uuid: uuid\n    alterId: 32\n    cipher: auto\n    network: grpc\n    tls: true\n    servername: example.com\n    # skip-cert-verify: true\n    grpc-opts:\n      grpc-service-name: 'example'\n\n  # http\n  - name: 'http'\n    type: http\n    server: server\n    port: 443\n    # username: username\n    # password: password\n    # tls: true # https\n    # skip-cert-verify: true\n    # sni: custom.com\n\n  # Snell\n  # Beware that there's currently no UDP support yet\n  - name: 'snell'\n    type: snell\n    server: server\n    port: 44046\n    psk: yourpsk\n    # version: 2\n    # obfs-opts:\n    # mode: http # or tls\n    # host: bing.com\n\n  # Trojan\n  - name: 'trojan'\n    type: trojan\n    server: server\n    port: 443\n    password: yourpsk\n    # udp: true\n    # sni: example.com # aka server name\n    # alpn:\n    #   - h2\n    #   - http/1.1\n    # skip-cert-verify: true\n\n  - name: trojan-grpc\n    server: server\n    port: 443\n    type: trojan\n    password: 'example'\n    network: grpc\n    sni: example.com\n    # skip-cert-verify: true\n    udp: true\n    grpc-opts:\n      grpc-service-name: 'example'\n\n  - name: trojan-ws\n    server: server\n    port: 443\n    type: trojan\n    password: 'example'\n    network: ws\n    sni: example.com\n    # skip-cert-verify: true\n    udp: true\n    # ws-opts:\n    # path: /path\n    # headers:\n    #   Host: example.com\n\n  # ShadowsocksR\n  # The supported ciphers (encryption methods): all stream ciphers in ss\n  # The supported obfses:\n  #   plain http_simple http_post\n  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth\n  # The supported supported protocols:\n  #   origin auth_sha1_v4 auth_aes128_md5\n  #   auth_aes128_sha1 auth_chain_a auth_chain_b\n  - name: 'ssr'\n    type: ssr\n    server: server\n    port: 443\n    cipher: chacha20-ietf\n    password: 'password'\n    obfs: tls1.2_ticket_auth\n    protocol: auth_sha1_v4\n    # obfs-param: domain.tld\n    # protocol-param: \"#\"\n    # udp: true\n\n# \u4EE3\u7406\u5206\u7EC4 - LB \u7B56\u7565\nproxy-groups:\n  # \u4E2D\u7EE7 - \u4F1A\u7ECF\u8FC7\u7ED9\u5B9A\u7684\u6240\u6709\u4EE3\u7406\n  # \u4E0D\u652F\u6301 UDP\n  # clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet\n  - name: 'relay'\n    type: relay\n    proxies:\n      - http\n      - vmess\n      - ss1\n      - ss2\n\n  # \u57FA\u4E8E\u8BF7\u6C42 URL \u7684\u901F\u5EA6\u6765\u9009\u62E9\n  - name: 'auto'\n    type: url-test\n    proxies:\n      - ss1\n      - ss2\n    # tolerance: 150\n    # lazy: true\n    url: 'http://www.gstatic.com/generate_204'\n    interval: 300\n\n  # \u57FA\u4E8E\u4F18\u5148\u7EA7\u9009\u62E9\u4E00\u4E2A\u53EF\u7528\u7684\u4EE3\u7406\n  # \u7C7B\u4F3C\u4E00\u4E2A url-test \u81EA\u52A8\u5206\u7EC4\n  - name: 'fallback-auto'\n    type: fallback\n    proxies:\n      - ss1\n      - ss2\n    url: 'http://www.gstatic.com/generate_204'\n    interval: 300\n\n  # \u57FA\u4E8E eTLD+1 \u8FDB\u884C\u8D1F\u8F7D\n  - name: 'load-balance'\n    type: load-balance\n    proxies:\n      - ss1\n      - ss2\n    url: 'http://www.gstatic.com/generate_204'\n    interval: 300\n    # strategy: consistent-hashing # round-robin\n\n  # \u9009\u62E9 proxy \u6216 proxy group\n  # \u53EF\u901A\u8FC7 RESTful API \u6765\u5207\u6362\n  - name: Proxy\n    type: select\n    # disable-udp: true\n    proxies:\n      - auto\n      - DIRECT # \u53EF\u4EE5\u6307\u5B9A \u76F4\u63A5\n    # DIRECT \u914D\u7F6E\n    interface-name: en1\n    routing-mark: 6667\n    #\n    use:\n      - provider1\n\nproxy-providers:\n  provider1:\n    type: http\n    url: 'url'\n    interval: 3600\n    path: ./provider1.yaml\n    health-check:\n      enable: true\n      interval: 600\n      # lazy: true\n      url: http://www.gstatic.com/generate_204\n  test:\n    type: file\n    path: /test.yaml\n    health-check:\n      enable: true\n      interval: 36000\n      url: http://www.gstatic.com/generate_204\n\nrules:\n  - IP-CIDR,127.0.0.0/8,DIRECT\n  - IP-CIDR,127.0.0.0/8,DIRECT\n  - DOMAIN-SUFFIX,google.com,auto\n  - DOMAIN,google.com,auto\n  - DOMAIN-KEYWORD,google,auto\n  - DOMAIN-SUFFIX,ad.com,REJECT\n  - SRC-IP-CIDR,192.168.1.201/32,DIRECT\n  # optional param \"no-resolve\" for IP rules (GEOIP, IP-CIDR, IP-CIDR6)\n  - GEOIP,CN,DIRECT\n  - DST-PORT,80,DIRECT\n  - SRC-PORT,7777,DIRECT\n  - RULE-SET,apple,REJECT # Premium only\n  - MATCH,auto\n"})}),"\n",(0,t.jsx)(e.h2,{id:"proxies",children:"proxies"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-yaml",children:"# socks5\n- name: 'socks'\n  type: socks5\n  server: server\n  port: 1080\n  # username: username\n  # password: password\n  # tls: true\n  # skip-cert-verify: true\n  # udp: true\n"})}),"\n",(0,t.jsx)(e.h2,{id:"proxy-groups",children:"proxy-groups"}),"\n",(0,t.jsx)(e.h2,{id:"rule",children:"Rule"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-yaml",children:"# \u5DF2\u77E5 IP \u6BB5\n- IP-CIDR,127.0.0.0/8,REJECT\n- IP-CIDR,0.0.0.0/8,REJECT\n- GEOIP,LAN,DIRECT\n\n# \u56FD\u5185\u5E38\u89C1\n- DOMAIN-SUFFIX,taobao.com,DIRECT\n- DOMAIN-SUFFIX,qq.com,DIRECT\n- DOMAIN-SUFFIX,jdapi.com,DIRECT\n\n# \u56FD\u5916\u5E38\u89C1\n- DOMAIN-SUFFIX,google.com,auto\n\n- GEOIP,CN,DIRECT\n\n#- RULE-SET,China,DIRECT\n\n- MATCH,auto\n"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:"type"}),(0,t.jsx)(e.th,{children:"desc"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DOMAIN-SUFFIX"}),(0,t.jsx)(e.td,{children:"\u57DF\u540D\u540E\u7F00"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DOMAIN"}),(0,t.jsx)(e.td,{children:"\u57DF\u540D\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DOMAIN-KEYWORD"}),(0,t.jsx)(e.td,{children:"\u57DF\u540D\u5173\u952E\u5B57\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"IP-CIDR"}),(0,t.jsx)(e.td,{children:"IP \u6BB5\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"SRC-IP-CIDR"}),(0,t.jsx)(e.td,{children:"\u6E90 IP \u6BB5\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"GEOIP"}),(0,t.jsx)(e.td,{children:"GEOIP \u6570\u636E\u5E93\uFF08\u56FD\u5BB6\u4EE3\u7801\uFF09\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"DST-PORT"}),(0,t.jsx)(e.td,{children:"\u76EE\u6807\u7AEF\u53E3\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"SRC-PORT"}),(0,t.jsx)(e.td,{children:"\u6E90\u7AEF\u53E3\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"PROCESS-NAME"}),(0,t.jsx)(e.td,{children:"\u6E90\u8FDB\u7A0B\u540D\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"RULE-SET"}),(0,t.jsx)(e.td,{children:"Rule Provider \u89C4\u5219\u5339\u914D"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:"MATCH"}),(0,t.jsx)(e.td,{children:"\u5168\u5339\u914D"})]})]})]}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["RULE-SET\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/Loyalsoldier/clash-rules",children:"https://github.com/Loyalsoldier/clash-rules"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://github.com/DivineEngine/Profiles/tree/master",children:"https://github.com/DivineEngine/Profiles/tree/master"})}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},79938:function(n,e,r){r.d(e,{Z:function(){return i},a:function(){return a}});var s=r(75271);let t={},l=s.createContext(t);function a(n){let e=s.useContext(l);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:a(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);