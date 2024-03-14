---
title: 嵌套虚拟化
---

# 嵌套虚拟化

- VMCS shadowing
  - VMCS - virtual machine control structure
  - 2013 intel Haswell 硬件加速
- [Nested virtualization](https://en.wikipedia.org/wiki/Nested_virtualization)

## KVM

- [Nested Guests](https://www.linux-kvm.org/page/Nested_Guests)
  - 当启动了嵌套虚拟机后，在未关闭嵌套的虚拟机之前，上层虚拟机无法迁移、保存、加载

```bash
# intel
cat /sys/module/kvm_intel/parameters/nested
# amd
cat /sys/module/kvm_amd/parameters/nested

# 启用
modprobe kvm_intel nested=1
# 如果已经加载过需要先移除
modprobe kvm_intel -r
# /etc/modprobe.d/kvm.conf
# options kvm_intel nested=1
```

## HyperV

- 要求
  - Windows Server 2016+, Windows 10+
  - Hyper-V VM 8+
  - Intel VT-x,EPT
  - AMD 目前不支持

```powershell
# ExposeVirtualizationExtensions 表示是否开启
Get-VMProcessor -VMName vm_name | fl *
# 开启
Set-VMProcessor -VMName vm_name -ExposeVirtualizationExtensions $true
```

- 参考
  - [Hyper-V Nested Virtualization Explained](https://www.nakivo.com/blog/hyper-v-nested-virtualization-explained)
