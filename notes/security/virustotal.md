---
title: virustotal
---

# virustotal

- https://www.virustotal.com/gui
- Free
  - 4 lookups/分钟
  - 500 lookups/天
  - 15.50 K lookups/月
- Premium - $10,000/年

```bash
curl -v -X POST \
  --url 'https://www.virustotal.com/vtapi/v2/file/report' \
  -d apikey=$API_KEY \
  -d 'resource=$filehash'

curl -X POST \
  https://www.virustotal.com/vtapi/v2/file/scan \
  -F apikey=$API_KEY \
  -F file=@/path/to/file

curl -X POST \
  https://www.virustotal.com/vtapi/v2/file/rescan \
  -F apikey=$API_KEY \
  -F resource=$filehash

# 扫描网址
curl -X POST \
  https://www.virustotal.com/vtapi/v2/url/scan \
  -F apikey=$API_KEY \
  -F url=https://wener.me

# 获取扫描结果
# scan=1 如果没有则扫描
curl -X POST \
  http://www.virustotal.com/vtapi/v2/url/report \
  -F apikey=$API_KEY \
  -F resource=https://wener.me \
  -F scan=1

# 域名情况
curl -X GET \
  'http://www.virustotal.com/vtapi/v2/domain/report?domain=wener.me'
# IP 地址情况
curl -X GET \
  'http://www.virustotal.com/vtapi/v2/ip-address/report?ip=1.1.1.1&apikey=$API_KEY'
# 添加评论
curl -X POST \
  https://www.virustotal.com/vtapi/v2/comments/put \
  -F apikey=$API_KEY \
  -F resource=https://evil-phishing-site.com/secured/login \
  -F 'comment=This is a phishing page'
```
