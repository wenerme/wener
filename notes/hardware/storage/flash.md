---
title: 闪存 (Flash Memory)
tags:
  - Hardware
  - Storage
  - Flash
  - SD
  - MicroSD
---

# 闪存 (Flash Memory) {#flash-memory}

| abbr.     | stand for                              | meaning                |
| --------- | -------------------------------------- | ---------------------- |
| microSD   | micro Secure Digital                   | 微型安全数码卡         |
| SD        | Secure Digital                         | 安全数码卡             |
| SDMC      | Secure Digital Memory Card             | 安全数码卡             |
| TF        | TransFlash                             | 转换闪存               |
| USB       | Universal Serial Bus                   | 通用串行总线           |
| microSDXC | micro Secure Digital eXtended Capacity | 微型安全数码卡扩展容量 |

- USB flash drive - U 盘
- TF - TransFlash
  - SanDisk+摩托罗拉 研发产品 - 2004 年
  - microSD 基于该产品形成标准
    - 为推广产品将标准并入 SD 协会

:::tip

- 一般 BlockSize 为 128KB
- extFAT 很适合闪存盘, > 32 GB 默认 blocksize 为 128KB

:::

- 容量标准
  - SD/SDSC
    - FAT12/FAT16, 最大 2GB
  - SDHC - Secure Digital High Capacity - 2006 年 3 月
    - FAT32, 2GB-32GB
    - Class 2,Class 4,Class 6
  - SDXC
    - exFAT, 32GB-2TB
    - 引入 UHS 标准
  - SDUC
    - exFAT, 2TB-128TB
- UHS - Ultra High Speed - 总线接口 - 限定了逻辑最大速度
  - 区分半双工和全双工
- UHS Speed Class - 总线速度标准，接口标准
  - U1 - UHS-I - 50 MB/s,104 MB/s
    - UHS104, SDR104
    - DDR208, DDR200 - 使用相同的 pin 达到更高的速度
      - SanDisk 扩展
      - Lexar 1066x, Kingston Canvas Go Plus, MyMemory PRO SD
    - 因为 U1 对消费者要求低 - 不需要更高级的读卡器，因此不少厂家做扩展提速
  - U2 - UHS-II - 156 MB/s,312 MB/s - 2011 年 - SD 17Pins, MicroSD 16Pins
    - 截止至 2022，DSLR 相机领域用的多
  - U3 - UHS-III - 312 MB/s,624 MB/s - 2017 年
    - 在 UHS-II 基础上提高速率
- SD Express - PCIe - 985 MB/s,1969 MB/s,3938 MB/s - 2018年
  - UHS 之后新的总线接口
  - NVMe 协议
- Speed Class - C2,C4,C6,C10 - 读取速度
- Video Speed Class - V6,V10,V30,V60,V90 - 视频速度分类 - 定义写入速度
  - `V<n>` -> `<n>MB/s` 顺序写入
  - V6 -> 4MB/s -> 4K
  - V30 -> 30MB/s -> 8K
- Application Performance Class - 定义 IOPS
  - 至少顺序写 10 MB/s

| std | read      | write     |
| --- | --------- | --------- | ------- |
| A1  | 1500 IOPS | 500 IOPS  |
| A2  | 4000 IOPS | 2000 IOPS |
| A3  | 4000 IOPS | 2000 IOPS |
| U3  |           | 30 MB/s   | 10 MB/s |
| V30 |

- [SD card](https://en.wikipedia.org/wiki/SD_card)

## 常见问题 {#faq}

- [Five things you never knew about flash drives](https://www.zdnet.com/article/five-things-you-never-knew-about-flash-drives/)
  (2007)
  1. 只能写 0
  2. NAND flash 128K block size, 2KB page size, 64 page
  3. page 只能顺序写，不能随机写
