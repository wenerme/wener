---
id: vmware
title: VmWare
---

# VmWare
## Tips
* 桌面产品
  * Workstation
  * Fusion
  * Workstation Player - 免费非商业版
* 服务端产品
  * ESXi
* 云产品
  * VMware vRealize Suite - 混合云管理平台
  * VMware Go - VMware vSphere Hypervisor Web 安装工具
  * VMware Cloud Foundation - 私有云安装部署 - SDDC 系统集成
  * VMware Horizon View - virtual desktop infrastructure (VDI)
  * VMware vSphere
    * VMware Infrastructure 4 之前名字
* vCenter Server Appliance with an Embedded Platform Services Controller (PSC)
* Wikipedia [VMFS](https://en.wikipedia.org/wiki/VMware_VMFS)
* 参考
  * [Virtual machine hardware versions](https://kb.vmware.com/s/article/1003746)
    * ESXi 7.0 vmx-17+
    * ESXi 6.0 vmx-11+
    * ESXi 5.0 vmx-8+

```bash
# QCOW2 转 vmdk
# flat 格式，能导入，但是是完整大小镜像，上传非常慢
qemu-img convert -f qcow2 -O vmdk -o adapter_type=lsilogic,subformat=monolithicFlat alpine.qcow2 alpine.vmdk
# https://kb.vmware.com/s/article/2144687
qemu-img convert -f qcow2 -O vmdk -o subformat=streamOptimized alpine.qcow2 alpine.vmdk
printf '\x03' | dd conv=notrunc of=alpine.vmdk bs=1 seek=$((0x4))
```

# FAQ
## ESXi vs vSphere vs vCenter
* vSphere
  * 产品集/平台
  * 其中 Hypervisor 为 ESXi
  * Web 管理端操作 ESXi
  * 功能
    * 虚拟数据中心管理
    * 迁移
    * 远程管理
* vCenter
  * 集中管理 - 管理 ESXi 集群
  * 一般虚拟机方式安装
  * 功能
    * 单点登陆
    * 设备设施仓库
    * 通知告警
    * 主机信息
* ESXi
  * Hypervisor
  * 直接安装在物理机上
  * 实际运行虚拟机
  * 类似于 Xen 的 dom0
  * 单节点

## 磁盘没有 UUID
- ESX/ESXi 4.1 增加参数 disk.enableUUID
- 早起版本迁移可能会有冲突
- 将 disk.enableUUID 设置为 true 启用 UUID
- 参考
  - https://kb.vmware.com/s/article/2009065
  - [Why is disk.enableuuid=TRUE not the default?](https://communities.vmware.com/t5/VMware-vSphere-Discussions/Why-is-disk-enableuuid-TRUE-not-the-default/td-p/518472)
    - 主要影响 clone
