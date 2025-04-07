"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["24714"],{61555:function(e,n,i){i.r(n),i.d(n,{metadata:()=>t,contentTitle:()=>c,default:()=>o,assets:()=>d,toc:()=>a,frontMatter:()=>l});var t=JSON.parse('{"id":"network/internet/ip","title":"IP","description":"- https://en.wikipedia.org/wiki/IP_address","source":"@site/../notes/network/internet/ip.md","sourceDirName":"network/internet","slug":"/network/internet/ip","permalink":"/notes/network/internet/ip","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/network/internet/ip.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1743657456000,"frontMatter":{"title":"IP"},"sidebar":"docs","previous":{"title":"IEEE 802","permalink":"/notes/network/ieee-802"},"next":{"title":"IP \u5730\u5740\u5E93","permalink":"/notes/network/internet/ipdb"}}'),s=i("52676"),r=i("79938");let l={title:"IP"},c="TCP/IP",d={},a=[{value:"Private",id:"private",level:2},{value:"Welknown Private",id:"welknown-private",level:2},{value:"Tags",id:"tags",level:2},{value:"FAQ",id:"faq",level:2},{value:"IP-address ending with zero?",id:"ip-address-ending-with-zero",level:3},{value:"Tools",id:"tools",level:3},{value:"apnic",id:"apnic",level:2}];function h(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"tcpip",children:"TCP/IP"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/IP_address",children:"https://en.wikipedia.org/wiki/IP_address"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Reserved_IP_addresses",children:"https://en.wikipedia.org/wiki/Reserved_IP_addresses"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"http://ip.taobao.com/",children:"http://ip.taobao.com/"})}),"\n",(0,s.jsxs)(n.li,{children:["AS13335\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"CF WARP"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://bgpview.io/asn/13335",children:"https://bgpview.io/asn/13335"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/firewall/",children:"https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/firewall/"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc3330",children:"https://datatracker.ietf.org/doc/html/rfc3330"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u83B7\u53D6 IP\ncurl checkip.amazonaws.com\ncurl ipinfo.io/ip\ncurl ifconfig.co\ncurl ipecho.net/plain\ncurl icanhazip.com\ncurl ipv4.icanhazip.com\n\ncurl 'https://vv.video.qq.com/checktime?otype=json&callback=onCheckTime'\n\n# \u4F7F\u7528 DNS \u7684\u65B9\u5F0F\u83B7\u53D6\ndig +short myip.opendns.com @resolver1.opendns.com\n\n\n# Service\ncurl https://www.cloudflare.com/ips-v4\ncurl https://www.cloudflare.com/ips-v6\ncurl https://ip-ranges.amazonaws.com/ip-ranges.json\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["240.0.0.0/4\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"class E"}),"\n",(0,s.jsx)(n.li,{children:"\u6CA1\u6709\u88AB\u4F7F\u7528"}),"\n",(0,s.jsx)(n.li,{children:"\u7279\u6B8A IP \u6BB5"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml",children:"https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://tools.ietf.org/html/draft-chen-ati-adaptive-ipv4-address-space-03",children:"https://tools.ietf.org/html/draft-chen-ati-adaptive-ipv4-address-space-03"})}),"\n",(0,s.jsxs)(n.li,{children:["Reclaiming IPv4 Class E's 240.0.0.0/4  ",(0,s.jsx)(n.a,{href:"https://news.ycombinator.com/item?id=40491038",children:"https://news.ycombinator.com/item?id=40491038"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["169.254.169.254\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u901A\u5E38\u4F5C\u4E3A metadata"}),"\n",(0,s.jsx)(n.li,{children:"AWS, GCP, Azure"}),"\n",(0,s.jsx)(n.li,{children:"\u7CFB\u7EDF\u4F1A\u901A\u8FC7\u8FD9\u4E2A IP \u5730\u5740\u5411\u4E91\u670D\u52A1\u67E5\u8BE2\u5F53\u524D\u5B9E\u4F8B\u7684\u4FE1\u606F\uFF08\u4F8B\u5982\u5B9E\u4F8BID\u3001\u533A\u57DF\u3001\u914D\u7F6E\u4FE1\u606F\u7B49\uFF09\u3002"}),"\n",(0,s.jsxs)(n.li,{children:["AWS ",(0,s.jsx)(n.a,{href:"http://169.254.169.254/latest/meta-data/",children:"http://169.254.169.254/latest/meta-data/"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/aws/amazon-ec2-metadata-mock",children:"aws/amazon-ec2-metadata-mock"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html",children:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Azure ",(0,s.jsx)(n.code,{children:"http://169.254.169.254/metadata/instance?api-version=2021-02-01"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Header ",(0,s.jsx)(n.code,{children:" Metadata: true"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["GCP ",(0,s.jsx)(n.a,{href:"http://metadata.google.internal/",children:"http://metadata.google.internal/"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Header ",(0,s.jsx)(n.code,{children:"Metadata-Flavor: Google"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["OpenStack ",(0,s.jsx)(n.a,{href:"http://169.254.169.254/openstack/",children:"http://169.254.169.254/openstack/"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"private",children:"Private"}),"\n",(0,s.jsx)(n.p,{children:"| CIDR            | Start       | End             | Count    | Class |\n| --------------- | ----------- | --------------- | -------- | ----- | ---------- |\n| 0.0.0.0/8       |\n| 127.0.0.0/8     |\n| 10.0.0.0/8      | 10.0.0.0    | 10.255.255.255  | 16777216 | A     |\n| 100.64.0.0/10   | 100.64.0.0  | 100.127.255.255 |\n| 169.254.0.0/16  |\n| 172.16.0.0/12   | 172.16.0.0  | 172.31.255.255  | 1048576  | B     |\n| 192.0.0.0/24    |\n| 192.0.2.0/24    |             |                 |          |       | TEST-NET-1 |\n| 192.168.0.0/16  | 192.168.0.0 | 192.168.255.255 | 65536    | B     |\n| 192.88.99.0/24  |\n| 198.18.0.0/15   |\n| 198.51.100.0/24 |             |                 |          |       | TEST-NET-2 |\n| 203.0.113.0/24  |             |                 |          |       | TEST-NET-3 |\n| 224.0.0.0/3     |\n| 224.0.0.0/4     |\n| ::1/128         |\n| fc00::/7        |\n| fe80::/10       |"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"127.0.0.0/8,10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc5737",children:"rfc5737"})," IPv4 Address Blocks Reserved for Documentation\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"TEST-NET"}),"\n",(0,s.jsx)(n.li,{children:"\u6587\u6863\u5EFA\u8BAE Block"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"welknown-private",children:"Welknown Private"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"CIDR"}),(0,s.jsx)(n.th,{children:"for"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.42.0.0/16"}),(0,s.jsx)(n.td,{children:"k3s cluster-cidr"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.43.0.0/16"}),(0,s.jsx)(n.td,{children:"k3s service-cidr"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.244.0.0/16"}),(0,s.jsx)(n.td,{children:"k0s cluster-cidr"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.96.0.0/12"}),(0,s.jsx)(n.td,{children:"k0s service-cidr"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.96.0.10"}),(0,s.jsx)(n.td,{children:"k0s dns"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"10.10.0.0"}),(0,s.jsx)(n.td,{children:"openvpn"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"100.64.0.0/10"}),(0,s.jsx)(n.td,{children:"tailscale"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"100.100.100.100"}),(0,s.jsx)(n.td,{children:"tailscale dns"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"tags",children:"Tags"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/MetaCubeX/meta-rules-dat",children:"https://github.com/MetaCubeX/meta-rules-dat"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/MetaCubeX/meta-rules-dat/blob/master/.github/workflows/run.yml",children:"https://github.com/MetaCubeX/meta-rules-dat/blob/master/.github/workflows/run.yml"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/metacubex/geo",children:"https://github.com/metacubex/geo"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5DE5\u5177"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/Loyalsoldier/v2ray-rules-dat",children:"Loyalsoldier/v2ray-rules-dat"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/Loyalsoldier/domain-list-custom",children:"Loyalsoldier/domain-list-custom"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/v2fly/domain-list-community",children:"v2fly/domain-list-community"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/v2fly/v2ray-core/blob/master/app/router/config.proto",children:"https://github.com/v2fly/v2ray-core/blob/master/app/router/config.proto"})}),"\n",(0,s.jsx)(n.li,{children:"\u751F\u6210 PB \u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["mmdb - MaxMind DB\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://maxmind.github.io/MaxMind-DB/",children:"https://maxmind.github.io/MaxMind-DB/"})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/runk/node-maxmind",children:"runk/node-maxmind"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"NodeJS"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://github.com/runk/mmdb-lib",children:"runk/mmdb-lib"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"MIT, Browser"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["geoip2\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"http://dev.maxmind.com/geoip/geoip2/geolite2/",children:"http://dev.maxmind.com/geoip/geoip2/geolite2/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h3,{id:"ip-address-ending-with-zero",children:"IP-address ending with zero?"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u73B0\u5728\u6765\u8BF4\u662F\u6CA1\u95EE\u9898\u7684, 20 \u5E74\u524D\u6709\u9690\u6027\u7684\u5B50\u7F51\u7EA6\u5B9A, .0 \u4EE3\u8868\u7F51\u7EDC, .255 \u4EE3\u8868\u5E7F\u64AD, \u8BB8\u591A\u786C\u4EF6\u8BBE\u5907\u548C\u8F6F\u4EF6\u89C4\u5219\u6709\u57FA\u4E8E\u8FD9\u6837\u7684\u5047\u8BBE, \u73B0\u5728\u90FD\u662F\u4EE5 CIDR \u4E3A\u6807\u51C6, \u56E0\u6B64 .0 \u548C .255 \u90FD\u662F\u6709\u6548\u7684\u5730\u5740"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://stackoverflow.com/questions/14915188",children:"IP-address ending with zero?"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"tools",children:"Tools"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ipjisuanqi.com/",children:"https://ipjisuanqi.com/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://dnsdaquan.com/",children:"https://dnsdaquan.com/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://ipchaxun.com/",children:"https://ipchaxun.com/"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://icplishi.com/jiashule.com/",children:"https://icplishi.com/jiashule.com/"})}),"\n",(0,s.jsx)(n.li,{}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"apnic",children:"apnic"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://www.apnic.net/about-apnic/corporate-documents/documents/resource-guidelines/rir-statistics-exchange-format/",children:"https://www.apnic.net/about-apnic/corporate-documents/documents/resource-guidelines/rir-statistics-exchange-format/"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/DanielPLSH/apnic",children:"https://github.com/DanielPLSH/apnic"}),"\n\u6839\u636E apnic \u53D1\u5E03\u7684\u6700\u65B0 IP \u5730\u5740\uFF0C\u5206\u6790\u7535\u4FE1\u3001\u8054\u901A\u3001\u79FB\u52A8\u7B49 IP \u5730\u5740\u6BB5"]}),"\n",(0,s.jsxs)(n.p,{children:["version|registry|serial|records|startdate|enddate|UTCoffset\n",(0,s.jsx)(n.a,{href:"http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest",children:"http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest"})]})]})}function o(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return c},a:function(){return l}});var t=i(75271);let s={},r=t.createContext(s);function l(e){let n=t.useContext(r);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);