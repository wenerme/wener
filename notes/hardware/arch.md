---
title: Computer Architecture & Standards
tags:
  - Hardware
  - Architecture
  - CPU
  - RAM
  - Standards
---

# Computer Architecture & Standards

Notes on computer hardware architecture, component hierarchies, and industry standards for processors and memory.

## CPU Architectures

Modern computing is dominated by a few key Instruction Set Architectures (ISA):

- **x86 / x86_64**: Dominant in desktops, laptops, and servers (Intel, AMD).
- **ARM (Advanced RISC Machines)**: Dominant in mobile devices and increasingly servers/desktops (Apple Silicon, AWS Graviton).
  - Architectures: ARMv7, ARMv8-A (64-bit), ARMv9.
- **RISC-V**: Open-standard ISA growing in embedded and specialized sectors.
- **MIPS / POWER**: Legacy architectures still used in networking and enterprise.

## Memory Standards (RAM)

Evolution of Dual In-line Memory Modules (DIMM) and Small Outline DIMM (SO-DIMM):

- **DDR3**: Mainstream approx. 2007-2015.
  - Standard DIMM capacity usually up to 8GB or 16GB per module.
- **DDR4**: Released Q2 2014. Increased speed and lower voltage.
  - Standard module capacities up to 32GB/64GB, server modules (LRDIMM) up to 128GB+.
- **DDR5**: Released approx. 2020. Higher density and performance.
  - Modules starting at 16GB, theoretical capacity up to 128GB per standard DIMM.

## System Hierarchy

1. **CPU** (ALU, Registers, Cache L1/L2/L3)
2. **Main Memory** (RAM)
3. **Storage** (SSD, HDD, NVMe)
4. **I/O Interfaces** (PCIe, USB, SATA, Ethernet)

## Resources

- [Computer Architecture (Wikipedia)](https://en.wikipedia.org/wiki/Computer_architecture)
- [DDR4 SDRAM (Wikipedia)](https://en.wikipedia.org/wiki/DDR4_SDRAM)
