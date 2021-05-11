---
title: DNS
---

# DNS

- [域名.信息](http://域名.信息)
- [alidns](https://alidns.com/)
- 工具
  - [dns.google](https://dns.google/)
  - [dnssec-analyzer](https://dnssec-analyzer.verisignlabs.com/)
- DoT 853 被 GFW 拦截

## Block

- [nicholasb2101/PiHole](https://github.com/nicholasb2101/PiHole)
- https://gist.github.com/michaelx/316dc4882f125a8325150e4e2fa9edd6
- https://firebog.net/
- [privacy-protection-tools/anti-AD](https://github.com/privacy-protection-tools/anti-AD)
- [Mosney/anti-anti-AD](https://github.com/Mosney/anti-anti-AD)
- [neoFelhz/neohosts](https://github.com/neoFelhz/neohosts)
- [vokins/yhosts](https://github.com/vokins/yhosts)
- [blocklistproject/Lists](https://github.com/blocklistproject/Lists)
- https://github.com/nextdns/metadata/tree/master/privacy
  - blocklisk 拦截列表
  - native 系统级跟踪列表

```bash
curl https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts -so ad-wars.txt
# 拆分为 1000 列表方便 cloudflare 导入
grep '127.0.0.1' ad-wars.txt | grep -v '#' | awk '{print $2}' | sort -u | split -l 1000 -d --additional-suffix '.csv' - ad-wars-
```
