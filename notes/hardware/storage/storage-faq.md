---
title: 存储硬件常见问题
tags:
  - FAQ
---

# 存储硬件常见问题

## NAND flash cell

| abbr. |         stand for | bits/cell | first ssd            | P/E                         |
| ----- | ----------------: | --------- | -------------------- | --------------------------- |
| SLC   | Single-Level Cell | 1         |
| DLC   | Double-level cell | 2         |
| MLC   |  Multi-Level Cell | 2         |
| TLC   | Triple-Level Cell | 3         | 2010 Samsung 840 SSD | 5xnm,2500                   |
| QLC   |   Quad-Level Cell | 4         | 2018 Micron 5210 ION | 3xnm,2xnm,1xnm 1250,750,500 |
| PLC   |  Penta-level cell | 5         |                      | 1xm,35                      |

- level 越低，速度越快，成本越高，容量越低
- level 越高，误码率越高
  - ECC、BCH
- 制程影响 P/E
- eMLC - 企业级 MLC
  - 低错误率
- [Multi-level cell](https://en.wikipedia.org/wiki/Multi-level_cell)

## NOR vs NAND

- NOR
  - 可以随机读写
  - 平行方式连接
- NAND
  - 按页读写
  - 低面积、高容量、低成本
  - 顺序方式连接
