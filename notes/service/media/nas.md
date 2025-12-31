---
title: NAS
tags:
  - Service
  - Media
  - NAS
---

# NAS

## Tips

- firefly, minidlna, transmission
- Firefly: iTunes music sharing and management tool.
- MiniDLNA: DLNA server, for mobile wireless connection.
- Transmission: BT download client.
- Jail: Plugin system (like FreeBSD Jails/Docker containers) on FreeNAS/TrueNAS. Most plugins are installed inside a Jail.

```bash
aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all –c –D
```

- ThunderLixianExporter: [binux/ThunderLixianExporter](http://binux.github.com/ThunderLixianExporter/)
  - Greasemonkey script.
  - Setup: Install -> Open Offline Download -> Settings -> Modify RPC path to NAS IP (e.g. `http://192.168.1.130:6800:jsonrpc`) -> "Retrieve to Local" (YAAW).
  - Can view download status in WebUI.

- Chrome Extensions:
  - YAAW: [Chrome Store](https://chrome.google.com/webstore/detail/yaaw/aekjkkgbmhmfgnalmkjmakfdlejjokaa)
  - Thunder Lixian Assistant: [Chrome Store](https://chrome.google.com/webstore/detail/thunderlixianassistant/eehlmkfpnagoieibahhcghphdbjcdmen)
