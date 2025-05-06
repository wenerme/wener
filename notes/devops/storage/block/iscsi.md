---
title: iSCSI
---

# iSCSI

- [ISCSI](https://en.wikipedia.org/wiki/ISCSI)
- [linux-iscsi](http://linux-iscsi.org/) - LIO
- Archlinux
  - [ISCSI Initiator](https://wiki.archlinux.org/index.php/ISCSI_Initiator)
    - [简体中文](https://wiki.archlinux.org/index.php/ISCSI initiator (简体中文))
  - [TGT iSCSI Target](https://wiki.archlinux.org/index.php/TGT_iSCSI_Target)
- [Linux iSCSI Target (TCM)](<https://wiki.alpinelinux.org/wiki/Linux_iSCSI_Target_(TCM)>)
- [High performance SCST iSCSI Target on Linux software Raid](https://wiki.alpinelinux.org/wiki/High_performance_SCST_iSCSI_Target_on_Linux_software_Raid)
  - SCST deprecated
- [Linux SCSI target framework](http://stgt.sourceforge.net/)
- TCM - Target Core module
- https://en.wikipedia.org/wiki/SCST
- [A tale of two SCSI targets](https://lwn.net/Articles/424004/)
- [open-iscsi/targetcli-fb](https://github.com/open-iscsi/targetcli-fb)
  - A command shell for managing the Linux LIO kernel target
- https://pkgs.alpinelinux.org/package/v3.6/community/x86_64/targetcli
- https://pkgs.alpinelinux.org/package/v3.6/main/x86_64/open-iscsi
- High performance, transport independent, multi-platform iSCSI initiator

| port | for   |
| ---- | ----- |
| 3260 | iSCSI |

| abbr. | stand for                                 | meaning |
| ----- | ----------------------------------------- | ------- |
| SCSI  | Small Computer System Interface           |
| iSCSI | Internet Small Computer Systems Interface |
| IQN   | iSCSI Qualified Name                      |
| LUN   | Logical Unit Number                       |
| TCM   | Target Core Module                        |
| TGT   | Target                                    |

- Initiator - 发起端/客户端
- Target - 目标端/服务端

:::caution

- iSCSI 不支持多个节点共享挂载 - 因为底层 fs 不支持
  - 例如 ext4, xfs, btrfs, ntfs 都是假设单个操作系统独占访问和管理
  - 单个操作系统维护 缓存、元数据、日志
  - 除非使用集群文件系统: GFS2, OCFS2, VMFS

:::

```bash
apk add open-iscsi

# iscsiadm -m discovery -t sendtargets -p <target_ip>
# iscsiadm -m node -T <target_iqn> -p <target_ip> --login

iscsiadm -m discovery -t sendtargets -p 192.168.1.100
# IQN
# 192.168.1.100:3260,1 iqn.2000-01.com.synology:SYN-NAS.default-target.00000000000

service iscsid start
```

```bash
# 发现
iscsiadm -m discovery -t sendtargets -p 192.168.1.1
# 登陆
iscsiadm --mode node --targetname iqn.2001-05.com.doe:test --portal 192.168.1.1:3260 --login
```
