# iSCSI

## Tips
* [ISCSI](https://en.wikipedia.org/wiki/ISCSI)
* [linux-iscsi](http://linux-iscsi.org/) - LIO
* Archlinux 
  * [ISCSI Initiator](https://wiki.archlinux.org/index.php/ISCSI_Initiator)
    * [简体中文](https://wiki.archlinux.org/index.php/ISCSI initiator (简体中文))
  * [TGT iSCSI Target](https://wiki.archlinux.org/index.php/TGT_iSCSI_Target)
* [Linux iSCSI Target (TCM)](https://wiki.alpinelinux.org/wiki/Linux_iSCSI_Target_(TCM))
* [High performance SCST iSCSI Target on Linux software Raid](https://wiki.alpinelinux.org/wiki/High_performance_SCST_iSCSI_Target_on_Linux_software_Raid)
  * SCST deprecated 
* [Linux SCSI target framework](http://stgt.sourceforge.net/)
* TCM - Target Core module
* https://en.wikipedia.org/wiki/SCST
* [A tale of two SCSI targets](https://lwn.net/Articles/424004/)
* [open-iscsi/targetcli-fb](https://github.com/open-iscsi/targetcli-fb)
  * A command shell for managing the Linux LIO kernel target
* https://pkgs.alpinelinux.org/package/v3.6/community/x86_64/targetcli
* https://pkgs.alpinelinux.org/package/v3.6/main/x86_64/open-iscsi
* High performance, transport independent, multi-platform iSCSI initiator


```bash
# 发现
iscsiadm -m discovery -t sendtargets -p 192.168.1.1
# 登陆
iscsiadm --mode node --targetname iqn.2001-05.com.doe:test --portal 192.168.1.1:3260 --login
```
