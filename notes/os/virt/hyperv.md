---
id: hyperv
title: HyperV
---

# HyperV
## Tips
* 环境要求
  * Windows 10 企业版、Pro、教育版
  * 64 bit 处理器，支持 Second Level Address Translation (SLAT)
  * CPU 支持 VM Monitor Mode Extension (VT-c on Intel CPUs)
  * 4 GB 内存+

## 启动

* [Install Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)

```powershell
Install-WindowsFeature-Name Hyper-V-Restart

# 启用 HyperV
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```


