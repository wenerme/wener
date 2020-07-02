---
id: libreoffice-online
title: LibreOffice Online
---

# LibreOffice Online

* LibreOffice Online WebSocket Daemon (loolwsd)
* 端口 9980
* WOPI 协议
* [LibreOffice/online](https://github.com/LibreOffice/online) - MPL
* 参考
  * [LibreOffice Online API](https://github.com/LibreOffice/online/blob/master/wsd/reference.md)
* 字典 en_US en_GB en_AU en_CA en_NZ en_IE en_ZA en_JM en_BS en_BZ en_TT en_ZW en_PH en_IN en_NA en_GH en_MW 

```bash
# https://hub.docker.com/r/libreoffice/online/
# -e DONT_GEN_SSL_CERT=1 可以不生成证书 - 自己提供
docker run --rm -it \
  -p 9980:9980 \
  --name libre libreoffice/online
```
