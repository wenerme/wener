---
title: 内存
---

# 内存

## 名词

- [REG](https://en.wikipedia.org/wiki/Registered_memory) / 寄存器内存
  - 寄存器内存无法在非为其设计的主板上使用
  - 寄存器内存与非寄存器内存不能混用
- [DIMM](http://en.wikipedia.org/wiki/DIMM) 双列直插式内存模块
  - RDIMM - Buffered/Registered DIMM
  - UDIMM - Unbuffered/Unregistered DIMM
    - 比较少，价格高，建议用 RDIMM
  - FBDIMM - Buffered/Registered
  - SO-DIMM
    - 笔记本内存
- 无缓冲内存（unbuffered memory）或非寄存器内存（unregistered memory）
- [How Much Power Does Memory Use?](https://www.crucial.com/support/articles-faq-memory/how-much-power-does-memory-use)
  - 3w 8G
- [DDR5 Memory Specification Released: Setting the Stage for DDR5-6400 And Beyond](https://www.anandtech.com/show/15912/ddr5-specification-released-setting-the-stage-for-ddr56400-and-beyond)
  - 64 Gbit 128 GB 6.4 Gbps
  - 自带 ECC
  - 最大 32TB - 8 Channel 16 DIMM per socket
  - [HN](https://news.ycombinator.com/item?id=23860779)

```bash
# Multi-bit ECC - Fully buffered
# Single-bit ECC - Unbuffered
# None - 无 ECC
dmidecode -t 16 | grep "Error Correction Type:"
# 内存型号
dmidecode -t 17 | grep "Part Number:"
```

## GTK

另外, 1G43 说明是 E-die x8 排列(B-die 的中间那个字母都是 K), 也就是 `1Rank=512MB*64/8=4G`B, 单条 2Ranks 的 E-die 只能是 8GB

Non-ECC UDIMM 和 ECC UDIMM 都不会采用 x4 排列(颗粒数太多), 所以要想 16GB 单条只能是 2Ranks 的 B-die

# FAQ

## UDIMM vs RDIMM

- UDIMM
  - 小服务器，两条内存
  - 只能双通道
  - 单通道时性能会好一点
- RDIMM
  - 大服务器
  - 双通道或三通道时候带宽更高
- 参考
  - https://serverfault.com/a/289102/190601

## Rank

- 1 Rank - 1 芯片 1 内存 - 1 Rank 1 Bank
- 2 Rank - 2 个 单 Rank 组成一个模块 - 同时只能访问一个 Rank 内存
- 4 Rank - 2 个 双 Rank 组成一个模块 - 同时只能访问一个 Rank
- `2R*8` vs `2R*4` vs `4R*4`
  - 容量 32G 内存
  - `2R*8` = `2*2*8` - 每个 Rank 2G
    - 频率 2666MHz
    - 价格高
  - `2R*4` = `2*4*4` - 每个 Rank 4G
    - 频率 2400MHz
  - `4R*4` = `4*2*4` - 每个 Rank 2G
    - 单个 Rank 密度更低
    - 频率 2133MHz
    - 价格低

```bash
# 能看到 Rank 和 频率
dmidecode -t memory
```

- https://techlibrary.hpe.com/docs/iss/DL380pGen8/setup_install/advanced/Content/138678.htm
