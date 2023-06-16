---
title: SSD
---

# SSD

:::tip

- SSD 容量越大寿命越久
- SSD 不需要 defragment
- fstrim 可能增加寿命

:::

| ssd spec  | SATA SSD | M.2 SATA | M.2 PCIe/NVMe |
| --------- | -------- | -------- | ------------- |
| interface | SATA     | M.2/SATA | M.2/PCIe      |
| feature   | 取代 HDD | 更轻薄   | 更快          |
| write     | 560 MB/s | 560 MB/s | 3400 MB/s     |
| read      | 510 MB/s | 510 MB/s | 3400 MB/s     |

## 寿命

| abbr. | stand for                  | cn               |
| ----- | -------------------------- | ---------------- |
| TBW   | TotalBytes Written         | 总写入量         |
| TBW   | TB Written
| DWPD  | Drive Write Per Day        | 每日写入量       |
| MTBF  | Mean time between failures | 平均故障间隔时间 |
| WAF   | Write Amplification Factor | 写放大因子       |
| P/E   | Program / Erase            |
| RBER  | Raw Bit Error Rate         | 原始位错误率     |

- TBW = `SSD Capacity * NAND P/E Cycles / WAF * 1024`
  - 不考虑 WAF - 如果 100G, PE = 3000 则 TBW=300T
  - 预留 15% TBW - 低于该数值应该考虑更换
- DWPD = `TBW * 1024 / SSD Capacity * 保固期限`
- MTBF = 1/失效率
- WAF
  - 例如 8k page, 写 512 byte 则 WAF = 8K/512=16
  - 个人通常 2-4，企业通常 10
  - 随机写引发的 GC 和移动
- NAND P/E Cycles
  - MLC 128GB SSD, NAND P/E cycles = 3000
- JESD219A Solid-State Drive
  - TWB 计算标准

# FAQ

- RAPID Mode - Realtime Accelerated Processing of I/O Data
  - 三星 EVO 专利技术
- SRT - Smart Response Technology
  - Intel 技术 - 使用 SSD 加速 HDD
- Samsung 850 PRO > Samsung 850 EVO > Samsung 850
- fast write-back cache
  - SSD 的写入缓存，当写入量超过时可能会变得很慢

## 监控

- 三星
  - Total_LBAs_Written
    - value\*512=总写入
  - 总写入/Power_On_Hours=平均每小时写入速率
  - Wear_Leveling_Count

```
SMART/Health Information (NVMe Log 0x02)
Critical Warning:                   0x00
Temperature:                        50 Celsius
Available Spare:                    100%
Available Spare Threshold:          5%
Percentage Used:                    0%
Data Units Read:                    1,493,974 [764 GB]
Data Units Written:                 1,670,589 [855 GB]
Host Read Commands:                 12,129,225
Host Write Commands:                7,321,092
Controller Busy Time:               22
Power Cycles:                       69
Power On Hours:                     7
Unsafe Shutdowns:                   45
Media and Data Integrity Errors:    0
Error Information Log Entries:      2
Warning  Comp. Temperature Time:    0
Critical Comp. Temperature Time:    0
Thermal Temp. 1 Transition Count:   1
Thermal Temp. 1 Total Time:         22
```

- https://askubuntu.com/a/865793/267103
