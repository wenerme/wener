---
title: Stash
---

# Stash

- iOS $4
- 基于规则的代理
- 不支持 Reality

## 配置

- 规则类型
  - DOMAIN, DOMAIN-SUFFIX, DOMAIN-KEYWORD
  - IP-ASN, IP-CIDR, GEOIP, IP-CIDR6
  - DST-PORT
  - RULE-SET
  - GEOSITE
  - PROCESS-NAME, PROCESS-PATH
  - SCRIPT
    - python 脚本

## 默认配置

- https://stash.wiki/get-started


```yaml
proxy-providers:
  服务提供商-1:
    url: http://your-service-provider
    interval: 600
  # 服务提供商-2:
  #   url: http://your-another-service-provider
  #   interval: 600

proxy-groups:
  # 功能分组
  - name: 选择代理
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: Netflix
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: Disney+
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney%2B.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: Spotify
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: YouTube
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: Speedtest
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png
    type: select
    proxies:
      - 自动选择
      - 手动选择
      - HK 香港
      - TW 台湾
      - SG 新加坡
      - JP 日本
      - US 美国
      - DIRECT

  - name: 默认
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Final.png
    type: select
    proxies:
      - 选择代理
      - DIRECT

  # 基于地区分组
  - name: HK 香港
    filter: '澳门|🇲🇴|港|🇭🇰|HK|(?i)Hong'
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: TW 台湾
    filter: '台|🇹🇼|湾|TW|(?i)Taiwan'
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Taiwan.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: SG 新加坡
    filter: '新加坡|坡|狮城|🇸🇬|SG|(?i)Singapore'
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: JP 日本
    filter: '日|🇯🇵|东京|JP|(?i)Japan'
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: US 美国
    filter: '美|🇺🇲|US|(?i)States|America'
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: 自动选择
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png
    interval: 120
    lazy: true
    tolerance: 50
    type: url-test
    include-all: true

  - name: 手动选择
    icon: https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Static.png
    interval: 120
    lazy: true
    type: select
    include-all: true

rules:
  - SCRIPT,quic,REJECT

  # Netflix
  - GEOSITE,netflix,Netflix
  # Disney+
  - GEOSITE,disney,Disney+
  # Spotify
  - GEOSITE,spotify,Spotify
  # Speedtest
  - GEOSITE,speedtest,Speedtest
  # GitHub
  - GEOSITE,github,选择代理
  # Telegram
  - IP-ASN,62014,选择代理,no-resolve
  - IP-ASN,59930,选择代理,no-resolve
  - IP-ASN,44907,选择代理,no-resolve
  - IP-ASN,211157,选择代理,no-resolve
  - PROCESS-NAME,Telegram.exe,选择代理
  - PROCESS-NAME,Telegram,选择代理
  - GEOSITE,telegram,选择代理
  # YouTube
  - GEOSITE,youtube,YouTube
  # Google
  - GEOSITE,google,选择代理
  # Twitter
  - GEOSITE,twitter,选择代理
  - DOMAIN-SUFFIX,tapbots.com,选择代理
  # Instagram
  - GEOSITE,instagram,选择代理
  # Facebook
  - GEOSITE,facebook,选择代理
  # Steam
  - GEOSITE,steam@cn,DIRECT
  - GEOSITE,steam,选择代理
  # Apple LBS
  - DOMAIN-SUFFIX,iphone-ld.apple.com,DIRECT
  - DOMAIN-SUFFIX,lcdn-locator.apple.com,DIRECT
  - DOMAIN-SUFFIX,lcdn-registration.apple.com,DIRECT
  - DOMAIN-SUFFIX,push.apple.com,DIRECT
  # Apple OCSP
  - PROCESS-NAME,trustd,选择代理
  # Microsoft
  - GEOSITE,microsoft@cn,DIRECT
  - GEOSITE,microsoft,选择代理
  - GEOSITE,xbox,选择代理
  # common proxy utils
  - PROCESS-NAME,v2ray,DIRECT
  - PROCESS-NAME,Surge,DIRECT
  - PROCESS-NAME,ss-local,DIRECT
  - PROCESS-NAME,privoxy,DIRECT
  - PROCESS-NAME,trojan,DIRECT
  - PROCESS-NAME,trojan-go,DIRECT
  - PROCESS-NAME,naive,DIRECT
  - PROCESS-NAME,CloudflareWARP,DIRECT
  - PROCESS-NAME,Cloudflare WARP,DIRECT
  - IP-CIDR,162.159.193.0/24,DIRECT,no-resolve
  - PROCESS-NAME,p4pclient,DIRECT
  - PROCESS-NAME,Thunder,DIRECT
  - PROCESS-NAME,DownloadService,DIRECT
  - PROCESS-NAME,qbittorrent,DIRECT
  - PROCESS-NAME,Transmission,DIRECT
  - PROCESS-NAME,fdm,DIRECT
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,Folx,DIRECT
  - PROCESS-NAME,NetTransport,DIRECT
  - PROCESS-NAME,uTorrent,DIRECT
  - PROCESS-NAME,WebTorrent,DIRECT

  - GEOIP,LAN,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,默认
script:
  shortcuts:
    quic: network == 'udp' and dst_port == 443
dns:
  default-nameserver:
    - 114.114.115.115
    - 119.28.28.28
    - 223.6.6.6
    - system
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
log-level: warning
mode: rule
```

