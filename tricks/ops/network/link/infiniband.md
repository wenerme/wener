---
id: infiniband
title: InfiniBand
---

# InfiniBand

## Tips

* [wiki/InfiniBand](https://en.wikipedia.org/wiki/InfiniBand)
* Current message level
  * https://www.kernel.org/doc/Documentation/networking/netif-msg.txt
* Arch
  * https://wiki.archlinux.org/index.php/InfiniBand
  * https://wiki.archlinux.org/index.php/Jumbo_frames
* 10 Gig Eth
  * 不需要 IB 交换机
  * Mellanox 带 `_en` 的即为 ethernet 设备
* jumbo frames
  * MTU 大于 1500 的 Ethernet 帧
  * 最多 9000, 根据设备和网络结构可能有所不同
  * 可能增加延时, 但是能大量提升网络传输速度
* mellanox
  * [MLNX_EN_Linux_README.txt](http://www.mellanox.com/related-docs/prod_software/MLNX_EN_Linux_README.txt)
  * linux [mlx4_en.h](https://github.com/torvalds/linux/blob/master/drivers/net/ethernet/mellanox/mlx4/mlx4_en.h)
* 参考
  * [infinibandta](http://www.infinibandta.org/)
  * [How to fine tune TCP performance on Linux with a 10Gb fiber connection](https://serverfault.com/questions/757961)
  * [How to achieve low latency with 10Gbps Ethernet](https://blog.cloudflare.com/how-to-achieve-low-latency/)
* 注意
  * 在 `/etc/network/interface` 下配置的顺序会影响默认网卡, 将 ib 配置在第一位即可
* 工具
  * [网络性能测试](../admin/benchmark.md#network)

```bash
# 查看邮件
apk add lshw
lshw -class network

# 查看 pci 设备
apk add pciutils
lspci | grep -i 'ethernet'


# 常见厂商信息
dmesg | egrep -i "Mellanox|InfiniBand|QLogic|Voltaire"
# ib 状态, 需要安装扩展包
ibstat
# 查看设备
ls /sys/class/infiniband/
# 查看物理状态
grep . /sys/class/infiniband/*/ports/*/phys_state
# 查看设备状态
grep . /sys/class/infiniband/*/ports/*/state
# 查看 mtu 和 地址
grep . /sys/class/net/*/{mtu,address}

# 查看设置
ethtool eth2
# Settings for eth2:
# 	Supported ports: [ FIBRE ]
# 	Supported link modes:   10000baseT/Full
# 	Supported pause frame use: No
# 	Supports auto-negotiation: No
# 	Advertised link modes:  10000baseT/Full
# 	Advertised pause frame use: No
# 	Advertised auto-negotiation: No
# 	Speed: 10000Mb/s
# 	Duplex: Full
# 	Port: FIBRE
# 	PHYAD: 0
# 	Transceiver: internal
# 	Auto-negotiation: off
# 	Supports Wake-on: d
# 	Wake-on: d
# 	Current message level: 0x00000014 (20)
# 			       link ifdown
# 	Link detected: yes

# 查看驱动信息
ethtool -i eth2
# driver: mlx4_en
# version: 2.2-1 (Feb 2014)
# firmware-version: 2.9.1000
# expansion-rom-version:
# bus-info: 0000:08:00.0
# supports-statistics: yes
# supports-test: yes
# supports-eeprom-access: no
# supports-register-dump: no
# supports-priv-flags: yes
```

### 常见的延迟和速度

Mode	    | MTU	  | MB/s	| Latency/us
----------|-------|-------|--------------
datagram  | 2044	| 707	  | 19.4
connected	| 2044	| 353	  | 18.9
connected	| 65520	| 726	  | 19.6

### 内核模块

```
$ tree /lib/modules/*/kernel/drivers/infiniband/
/lib/modules/4.9.65-1-hardened/kernel/drivers/infiniband/
├── core
│   ├── ib_cm.ko
│   ├── ib_core.ko
│   ├── ib_ucm.ko
│   ├── ib_umad.ko
│   ├── ib_uverbs.ko
│   ├── iw_cm.ko
│   ├── rdma_cm.ko
│   └── rdma_ucm.ko
├── hw
│   ├── cxgb3
│   │   └── iw_cxgb3.ko
│   ├── cxgb4
│   │   └── iw_cxgb4.ko
│   ├── hfi1
│   │   └── hfi1.ko
│   ├── i40iw
│   │   └── i40iw.ko
│   ├── mlx4
│   │   └── mlx4_ib.ko
│   ├── mlx5
│   │   └── mlx5_ib.ko
│   ├── mthca
│   │   └── ib_mthca.ko
│   ├── nes
│   │   └── iw_nes.ko
│   └── qib
│       └── ib_qib.ko
├── sw
│   ├── rdmavt
│   │   └── rdmavt.ko
│   └── rxe
│       └── rdma_rxe.ko
└── ulp
    ├── ipoib
    │   └── ib_ipoib.ko
    ├── iser
    │   └── ib_iser.ko
    ├── isert
    │   └── ib_isert.ko
    ├── srp
    │   └── ib_srp.ko
    └── srpt
        └── ib_srpt.ko
```

### 启动内核信息

```
[   12.225627] mlx4_core 0000:42:00.0: PCIe link speed is 5.0GT/s, device supports 5.0GT/s
[   12.225632] mlx4_core 0000:42:00.0: PCIe link width is x8, device supports x8
[   12.501725] NET: Registered protocol family 10
[   12.537987] mlx4_en: Mellanox ConnectX HCA Ethernet driver v2.2-1 (Feb 2014)
[   12.538258] mlx4_en 0000:42:00.0: Activating port:1
[   12.550287] mlx4_en: 0000:42:00.0: Port 1: Using 256 TX rings
[   12.550289] mlx4_en: 0000:42:00.0: Port 1: Using 8 RX rings
[   12.550292] mlx4_en: 0000:42:00.0: Port 1:   frag:0 - size:1522 prefix:0 stride:1536
[   12.550428] mlx4_en: 0000:42:00.0: Port 1: Initializing port
[   12.563234] <mlx4_ib> mlx4_ib_add: mlx4_ib: Mellanox ConnectX InfiniBand driver v2.2-1 (Feb 2014)
[   12.566383] <mlx4_ib> mlx4_ib_add: counter index 1 for port 1 allocated 1
```

## FAQ

### 常见错误

* 速度没上去
  * 确定是走的正确的网卡, 一般 ib 不是 eth0

```bash
# 确保默认路由是 ib 卡
ip ro get 8.8.8.8

# 如果不是, 则替换默认路由
# 假设 eth2 为 ib 卡
ip route replace default via 192.168.1.1 dev eth2
```
