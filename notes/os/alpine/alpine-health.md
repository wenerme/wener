---
title: Health Check
---

# Health Check

## DISK

```bash
apk add smartmontools
# -a 输出所有信息
smartctl -a /dev/sdb
# -x 输出更多信息, 包含非 smart 信息
smartctl -x /dev/sdb
# -H 输出健康状态
smartctl -H /dev/sdb
# -t 运行测试, -a 查看状态
smartctl -t short /dev/sdb

# 坏块检测
apk add e2fsprogs-extra
# 注意: 非常慢
# 1TB 4 runs(-w) 差不多 70 小时
badblocks -v /dev/sdb
```

### SCSI

- [SCSI - Hot add, remove, rescan of SCSI devices](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Power+Systems/page/SCSI+-+Hot+add,+remove,+rescan+of+SCSI+devices)

```bash
apk add lsscsi
# 查看 scsi 设备
lsscsi
cat /proc/scsi/scsi

# 重新扫描
echo "- - -" > /sys/class/scsi_host/host0/scan
# 移除设备
echo 1 > /sys/bus/scsi/drivers/sd/<SCSI-ID>/delete
```
