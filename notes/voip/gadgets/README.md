---
title: VoIP Gadgets
---

# VoIP Gadgets

VoIP/电话小硬件、扩展模块、SBC 通信板索引，重点关注 Asterisk / DAHDI 生态里的 FXS、FXO、GSM、TDM 硬件。

## 范围

- `notes/voip/gadgets/`：VoIP 小硬件、开发板、Raspberry Pi/SBC 模块。
- [VoIP Hardware](../hardware/)：商用语音卡、网关、运营商接入硬件、E1/T1、FXS/FXO 厂商。
- [Registered Jack & VoIP 接口](../../hardware/gadgets/rj.md)：RJ11/RJ45/RJ21、FXS/FXO、SLIC/DAA 等物理接口。
- [Asterisk chan_dongle](../asterisk/chan_dongle.md)：GSM dongle / PiGSM 这类硬件的软件接入。
- [Asterisk DAHDI](../asterisk/dahdi.md)：TDM/电话硬件驱动与 Asterisk 接入。

## SwitchPi

- [SwitchPi](https://switchpi.com/)
  - Raspberry Pi, Asterisk, FreePBX, DAHDI, GSM, PBX, VoIP
  - 面向 Raspberry Pi / Asterisk 通信场景的开源硬件与模块项目。
- [lixinswitchpi](https://github.com/lixinswitchpi)
  - SwitchPi GitHub 账号。
  - 主要项目包括 `dawn`、`pigsm`、`oak`、`oak8x`、`oakpro` 等。

### Dawn

- [lixinswitchpi/dawn](https://github.com/lixinswitchpi/dawn)
  - -, C, FPGA, PCIe, TDM, DAHDI, Asterisk
  - A fully open source FPGA TDM IP Core which supports the Asterisk DAHDI.
- [DAWN FPGA PCIe TDM IP Core](https://switchpi.com/2018/05/25/dawn-fpga-2-tdm-ip-cores/)

Dawn 是 SwitchPi 的 FPGA PCIe TDM IP Core，目标是兼容 Tiger320 类 TDM 芯片/接口，让 Asterisk / DAHDI 能识别为 TDM analog span。

- PCIe 接口。
- 面向 Asterisk DAHDI。
- open source 版本支持自己构建简单 TDM card。
- commercial version 描述中支持 2 条 TDM bus、最多 64 DAHDI channels、双 DMA engine。
- README 示例里 `dahdi_scan` 可看到 `SwitchPi DAWN TDM BUS 0/1`。

```bash
# Dawn driver
git clone https://github.com/lixinswitchpi/dawn

# 常见验证
dmesg | grep -i dawn
dahdi_scan
dahdi_cfg -vvv
asterisk -rvvvvv
```

### PiTDM

- PiTDM
  - Raspberry Pi analog module
  - 支持 FXS/FXO 模块化组合。
  - 每卡最多 4 个连接/端口。
- [PiTDM Module Installation Manual](https://switchpi.com/2018/01/14/manual-of-install-pitdm-module/)

PiTDM 更像 Raspberry Pi 上的模拟电话模块，适合小规模 FXS/FXO 接入。

### PiGSM

- [lixinswitchpi/pigsm](https://github.com/lixinswitchpi/pigsm)
  - -, C, Raspberry Pi, GSM, SIM800L, Asterisk
  - Raspberry Pi GSM VoIP / Asterisk voice module，使用 SIM800L quad band GSM module。
- Asterisk 侧通常通过 [chan_dongle](../asterisk/chan_dongle.md) 接入。

### OAK 系列

- [lixinswitchpi/oak](https://github.com/lixinswitchpi/oak)
  - -, C, Raspberry Pi, Asterisk, FXO/FXS
  - A fully open source Asterisk FXO/FXS module based on Raspberry Pi.
- [lixinswitchpi/oak8x](https://github.com/lixinswitchpi/oak8x)
  - -, C, Raspberry Pi, Asterisk, FXO/FXS
  - 支持 up to 8 channels 的 Asterisk FXO/FXS module。
- [lixinswitchpi/oakpro](https://github.com/lixinswitchpi/oakpro)
  - -, C, Raspberry Pi, DSP, echo cancellation, FXO/FXS
  - OAK PRO 加 DSP 做 echo cancellation，并内置低功耗 FXS 与 FXO 模块。

## 术语

- FXS：Foreign Exchange Station，给普通电话机供电/振铃的一侧。
- FXO：Foreign Exchange Office，接 PSTN/运营商模拟线的一侧。
- DAHDI：Digium/Asterisk Hardware Device Interface，Asterisk 常用 TDM/电话硬件接口层。
- TDM：Time Division Multiplexing，传统数字/模拟电话硬件常见的时分复用接口。
- SLIC / DAA：模拟电话接口芯片/线路接口相关。
- chan_dongle：Asterisk GSM dongle channel driver。
