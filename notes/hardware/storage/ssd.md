---
title: SSD
---

# SSD

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
| DWPD  | Drive Write Per Day        | 每日写入量       |
| MTBF  | Mean time between failures | 平均故障间隔时间 |

- TBW = User Capacity _ NAND P/E Cycles / WAF _ 1024
- DWPD = TBW _ 1024 / SSD Capacity _ 保固期限
- MTBF = 1/失效率
