---
title: SSD
---

# SSD

- SSD 不要 defragment
- fstrim 可能增加寿命

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
| WAF   | Write Amplification Factor | 写放大因子

- TBW = `SSD Capacity * NAND P/E Cycles / WAF * 1024`
  - 不考虑 WAF - 如果 100G, PE = 3000 则 TBW=300T
  - 预留 15% TBW - 低于该数值应该考虑更换
- DWPD = `TBW * 1024 / SSD Capacity * 保固期限`
- MTBF = 1/失效率
- WAF
  - 例如 8k page, 写 512 byte 则 WAF = 8K/512=16
  - 个人通常 2-4，企业通常 10
- NAND P/E Cycles
  - MLC 128GB SSD, NAND P/E cycles = 3000
- JESD219A Solid-State Drive
  - TWB 计算标准
