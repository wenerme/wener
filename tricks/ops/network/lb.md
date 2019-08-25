# Load Balance

## Tips
* [DPDK](https://en.wikipedia.org/wiki/Data_Plane_Development_Kit) - Data Plane Development Kit
  * 直接在网卡开发应用实现抓发，绕过内核处理，做到性能最大化
* 绕过内核
* [Netfilter](https://en.wikipedia.org/wiki/Netfilter)
  * Linux 提供的内核机制，用于网络相关处理
* [OpenOnload](https://www.openonload.org/)
  * 网络栈
* [FDio/vpp](https://github.com/FDio/vpp) - [fd.io](https://fd.io/) 的项目 - The Fast Data Project
  * open source version of Cisco's Vector Packet Processing (VPP) technology
* 参考
  * [Kernal bypass](https://blog.cloudflare.com/kernel-bypass/)
    * 如何绕过内核以提高性能
    * PACKET_MMAP - Linux 接口，快速网络嗅探
    * PF_RING - 加速包捕获，不在 linux 主干
    * Snabbswitch - L2，使用 Lua 编写的框架，对网卡编程，绕过内核网络栈
    * DPDK
    * Netmap
  * [10 Open Source Load Balancer for HA and Improved Performance](https://geekflare.com/open-source-load-balancer)
  * [iqiyi/dpvs](https://github.com/iqiyi/dpvs) - high performance Layer-4 load balancer based on DPDK
  * [Building a Billion User Load Balancer](https://news.ycombinator.com/item?id=13354546)

## NOTE
* LB 需要考虑
  * 支持的协议层级
  * 支持的应用协议
  * 支持的负载权重因子
