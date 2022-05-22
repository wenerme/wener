# PCI

- http://pci-ids.ucw.cz/
  The PCI ID Repository
  The home of the pci.ids file
- [PCI](https://en.wikipedia.org/wiki/Conventional_PCI)
  - Peripheral Component Interconnect
  - 外设组件互连标准
  - 1992
  - 速度
    - 133 MB/s (32-bit at 33 MHz – the standard configuration)
    - 266 MB/s (32-bit at 66 MHz or 64-bit at 33 MHz)
    - 533 MB/s (64-bit at 66 MHz)
- [PCIe](https://en.wikipedia.org/wiki/PCI_Express)
  - 取代 PCI
  - 2004
  - 速度
    - 2005 v.1.x (2.5 GT/s): 250 MB/s (×1) 4 GB/s (×16)
    - 2010 v.2.x (5 GT/s): 500 MB/s (×1) 8 GB/s (×16)
    - 2014 v.3.x (8 GT/s): 985 MB/s (×1) 15.75 GB/s (×16)
    - 2017 v.4.0 (16 GT/s): 1.969 GB/s (×1) 31.51 GB/s (×16)
    - 2019 v.5.0 (32 GT/s): 3.9 GB/s (×1) 63 GB/s (×16)

## PCIe

- [PCI Express](https://en.wikipedia.org/wiki/PCI_Express)

## Mini PCIe

> ![](./minipcie-52pin.gif)
>
> [pinout](https://pinoutguide.com/Slots/mini_pcie_pinout.shtml)

- [PCI Express Mini 接口](https://en.wikipedia.org/wiki/PCI_Express#Electrical_interface)
  - PCIe/PCI Express ×1 - 带 SMBus
  - USB 2.0
  - 诊断 LEDs - 例如 WiFi 网络状态
  - SIM 卡 - 针对 GSM, WCDMA 应用 - UIM signals on spec
  - 未来扩展 PCIe lane
  - 1.5v, 3.3v 供电
- 参考
  - [WiFi module says “mini PCI-e format” with “USB host interface” - what does this mean?](https://electronics.stackexchange.com/questions/26961)
    - PCIe 接口
    - USB2 data 使用 pin 36, 38
