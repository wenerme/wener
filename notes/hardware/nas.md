---
title: NAS (Network Attached Storage) Considerations
tags:
  - Hardware
  - NAS
  - Storage
  - Server
---

# NAS

## 考虑因素

- **存储 (Storage)**
  - **盘位 (Bays)**: 1, 2, 4, 6, 8 bays.
  - **接口 (Interface)**: SAS, SATA.
  - **缓存 (Cache)**: SSD Cache support.
- **功耗 (Power Consumption)**
  - ARM Mini NAS: ~10W
  - x86 Mini NAS: ~20W
  - Regular Small Server: ~60W
- **系统 (OS/System)**
  - **现成 (Turnkey)**: Synology (群晖), QNAP.
  - **DIY**: TrueNAS, Unraid, OpenMediaVault, Linux (Ubuntu/Alpine).
- **目的 (Purpose)**
  - File Storage (文件存储)
  - Multimedia (多媒体) - requires decoding capability (GPU/iGPU).
  - General Server (通用 NAS) - requires RAM/CPU.

## Resources

- [Build Your Own NAS (wener.me)](https://wener.me/story/build-your-own-nas)
