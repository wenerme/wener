---
title: 虚拟化常见问题
---

# 虚拟化常见问题

## KVM vs Vmware
- [KVM vs. VMware](https://www.redhat.com/en/topics/virtualization/kvm-vs-vmware-comparison)

## XenServer vs VMware vSphere

- [Citrix Xenserver Vs Vmware vSphere](https://www.simplilearn.com/citrix-xenserver-vs-vmware-vsphere-rar338-article)
- VMware vSphere
  - 120 VM/Host
  - 2048 GB, 2048 vdisk/Host
  - 160 CPU/Host
  - 2048 vCPU/Host
- XenServer
  - 75 VM/Host
  - 1024 GB, 512 vdisk/Host
  - 160 CPU/Host
  - 不支持
    - Dynamic Resource Allocation
    - Failover
    - Live Migration

| vs.                         | XenServer      | vSphere         |
| --------------------------- | -------------- | --------------- |
| 目标用户                    | 个人或中小企业 | 中小企业        |
| 操作系统虚拟化              | No             | No              |
| 全虚拟化                    | No             | Yes             |
| x86,x86_64                  | Yes            | Yes             |
| FCoE SSD Swap               | No             | Yes             |
| USB,SATA,SASmNFS,iSCSI      | Yes            | No              |
| DAS,FC,NAS                  | Yes            | Yes             |
| eSATA,RDM                   | No             | No              |
| Virtual Disk Size           | 2000GB         | 2000GB          |
| GB/vm                       | 128 GB         | 1024 GB         |
| vCPUs/vm                    | 16             | 32              |
| vNICs                       | 7              | 10              |
| vDisk/vm                    | 16             | 62              |
| vCPUs on Host               | N/A            | 2048 vCPUs/host |
| Thin Provisioning           | Yes            | Yes             |
| Asset management            | Yes            | No              |
| Configuration mapping       | Yes            | No              |
| Dynamic Resource Allocation | No             | Yes             |
| Failover                    | No             | Yes             |
| Live Migration              | No             | Yes             |
