---
title: FPGA (Field-Programmable Gate Array)
tags:
  - Embedded
  - FPGA
  - Hardware
  - HDL
---

# FPGA (Field-Programmable Gate Array)

[FPGA](https://en.wikipedia.org/wiki/Field-programmable_gate_array) is an integrated circuit designed to be configured by a customer or a designer after manufacturing.

## Resources & Tips

- [fpga4fun](http://www.fpga4fun.com/) - Excellent hands-on FPGA tutorials.
- [FuseSoC](https://github.com/olofk/fusesoc) - Package manager and build abstraction tool for FPGA/HDL projects.
- [List of HDL Simulators](https://en.wikipedia.org/wiki/List_of_HDL_simulators)
- [Intro Video - What is an FPGA?](https://youtu.be/gUsHwi4M4xE)
- [Cheap FPGA Development Boards](https://joelw.id.au/FPGA/CheapFPGADevelopmentBoards)

## Why FPGA?

- **Versatility**: 可以做任何事 (Can implement any digital logic).
- **Performance**: 非常快 (Extremely fast processing).
- **Parallelism**: 大量的并发 (Massive concurrency).
- **High I/O**: 高 IO capabilities.

## Key Concepts

- **CLB**: Configurable Logic Block.
- **IOB**: I/O Block.
- **LUT**: Lookup Table.
- **LE (Logic Element)**: 最小单位 (The smallest unit) = LUT + Flip-Flop + MUX.
- **Flip-Flop**: 触发器.
- **PWM**: Pulse Width Modulator.
- **MUX (Multiplexer)**: [数据选择器](https://zh.wikipedia.org/wiki/数据选择器).

## Major Vendors

- **Intel Altera**
- **Xilinx** (now part of AMD)
- **Lattice Semiconductor**
- **Microsemi**
- **Achronix**

## Intel Altera

- [Altera FPGA Overview](https://www.altera.com/products/fpga/overview.html)
- **Cyclone Family**: 低功耗, 低成本 (Low power, low cost).
  - [Cyclone IV Product Table](https://www.intel.com/content/dam/altera-www/global/en_US/pdfs/literature/pt/cyclone-iv-product-table.pdf)
- **Quartus**: [Development Environment](http://dl.altera.com/17.0/).
- [Device Part Number Format](https://www.intel.com/content/www/us/en/programmable/products/devices/dev-format.html)

## FAQ

- **VHDL vs. Verilog**: The two primary Hardware Description Languages.
