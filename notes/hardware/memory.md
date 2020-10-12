# 内存

## 名词
* [REG](https://en.wikipedia.org/wiki/Registered_memory) / 寄存器内存
  * 寄存器内存无法在非为其设计的主板上使用
  * 寄存器内存与非寄存器内存不能混用
* [DIMM](http://en.wikipedia.org/wiki/DIMM) 双列直插式内存模块
  * RDIMM - Buffered/Registered DIMM
  * UDIMM - Unbuffered/Unregistered DIMM
    * 比较少，价格高，建议用 RDIMM
  * FBDIMM - Buffered/Registered
  * SO-DIMM
    * 笔记本内存
* 无缓冲内存（unbuffered memory）或非寄存器内存（unregistered memory）
* [How Much Power Does Memory Use?](https://www.crucial.com/support/articles-faq-memory/how-much-power-does-memory-use)
  * 3w 8G
* [DDR5 Memory Specification Released: Setting the Stage for DDR5-6400 And Beyond](https://www.anandtech.com/show/15912/ddr5-specification-released-setting-the-stage-for-ddr56400-and-beyond)
  * 64 Gbit 128 GB 6.4 Gbps
  * 自带 ECC
  * 最大 32TB - 8 Channel 16 DIMM per socket
  * [HN](https://news.ycombinator.com/item?id=23860779)

```bash
# Multi-bit ECC - Fully buffered
# Single-bit ECC - Unbuffered
# None - 无 ECC
dmidecode -t 16 | grep "Error Correction Type:"
# 内存型号
dmidecode -t 17 | grep "Part Number:"
```


## GTK
另外, 1G43说明是E-die x8排列(B-die的中间那个字母都是K), 也就是1Rank=512MB*64/8=4GB, 单条2Ranks的E-die只能是8GB

Non-ECC UDIMM和ECC UDIMM都不会采用x4排列(颗粒数太多), 所以要想16GB单条只能是2Ranks的B-die


## 三星
* [DDR4 SDRAM Memory](https://www.samsung.com/semiconductor/global.semi/file/resource/2018/06/DDR4_Product_guide_May.18.pdf)

# FAQ
## UDIMM vs RDIMM
* UDIMM
  * 小服务器，两条内存
  * 只能双通道
  * 单通道时性能会好一点
* RDIMM 
  * 大服务器
  * 双通道或三通道时候带宽更高
* 参考
  * https://serverfault.com/a/289102/190601
