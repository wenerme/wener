---
title: NAS (Network Attached Storage)
tags:
  - DevOps
  - Storage
  - NAS
  - Synology
  - FreeNAS
---

# NAS (Network Attached Storage)

## 群晖 (Synology)

- **黑群晖 (XPEnology)**
  - [Official Site](http://xpenology.me/)
  - Note: Currently supports up to 5.2, 6.0 compatibility is limited.
- **Packages/Downloads**
  - Downloads vary by model.
  - [DS214play Download](https://www.synology.com/zh-cn/support/download/DS214play)

## FreeNAS / TrueNAS

- Based on **FreeBSD**.
- Uses **ZFS** filesystem.
- Recommended to use **HBA Card** in JOBD mode.
- **Warning**: Using a RAID card to create RAID 0 for each disk results in poor performance.
- Hard RAID is not recommended for ZFS.
