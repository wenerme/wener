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

## SCSI

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

## IO Load

```bash
apk add sysstat
# %iowait - CPU 等待 IO 的时间 - CPU 负载高情况该值意义不大
iostat

apk add iotop
# 分析每个进程 io 情况
iotop
```

## sar

- 收集记录 /proc, /sys 信息记录到文件，用于需要的时候查看
- [sar.1](https://man7.org/linux/man-pages/man1/sar.1.html)
- 配置 /etc/sysconfig/sysstat
- 默认日志目录 - /var/log/sa
  - /var/log/sa/saDD
  - /var/log/sa/saYYYYMMDD

```bash
# 查看 - 类似 iostat 结果
sar
```

**配置 cron 定时生成**

```
# Run sar to gather stats
*/2 * * * *   /usr/lib/sa/sa1 1 1
# Additional run at 23:59 to rotate the statistics file
59 23 * * *   /usr/lib/sa/sa1 60 2
```
