---
title: Central Processing Unit (CPU) Architectures
tags:
  - Hardware
  - CPU
  - Processor
  - x86
  - ARM
  - MIPS
---

# Central Processing Unit (CPU) Architectures

Notes on CPU architectures, technologies, and common terminology.

## CPU Feature Flags

Viewing CPU flags in Linux: `cat /proc/cpuinfo | grep flags`.

- **AES (AES-NI)**: Advanced Encryption Standard Instruction Set. Speeds up encryption/decryption.
- **AVX / AVX2 / AVX-512**: Advanced Vector Extensions. SIMD (Single Instruction Multiple Data) instructions for parallel processing.
- **VT-x (vmx) / AMD-V (svm)**: Hardware virtualization support.
- **SSBD / STIBP / SPECTRE / MELTDOWN**: Security-related flags and mitigations.
- [Detailed explanation of CPU flags (Unix StackExchange)](https://unix.stackexchange.com/questions/43539/what-do-the-flags-in-proc-cpuinfo-mean)

## Processor Series Suffixes (x86)

Common suffixes found in Intel and AMD processor names:

### Laptop / Mobile

- **U**: Ultra Low Power (e.g., Core i7-1355U). Balanced performance for thin laptops.
- **Y**: Extremely Low Power. Often found in fanless tablets.
- **H / HK / HX**: High Performance Graphics/Power. Used in gaming laptops and mobile workstations.
- **P**: Performance for thin and light laptops (Intel 12th gen onwards).

### Desktop

- **K**: Unlocked. Allows for overclocking (e.g., Core i9-13900K).
- **F**: No integrated graphics. Requires a dedicated GPU (e.g., i5-13400F).
- **T**: Power-optimized. Lower TDP for compact desktop builds.
- **X / XE**: Extreme Edition. High core counts for HEDT (High-End Desktop).

### AMD Specific

- **G**: Includes integrated Radeon graphics (e.g., Ryzen 5 5600G).
- **X**: Higher clock speeds / performance variant.
- **X3D**: Includes 3D V-Cache for gaming performance (e.g., Ryzen 7 7800X3D).

## Architectures

### MIPS (Microprocessor without Interlocked Pipeline Stages)

- Reduced Instruction Set Computer (RISC) ISA.
- Heavily used in enterprise networking (Cisco), older game consoles (N64, PS1), and low-end IoT.
- [MIPS Architecture (Wikipedia)](https://en.wikipedia.org/wiki/MIPS_architecture)

### ARM (Advanced RISC Machines)

- Dominant in mobile and embedded. Moving into server space.
- Highly power-efficient RISC architecture.

### RISC-V

- Open-source ISA. Gaining rapid adoption in specialized and embedded hardware.

## Resources

- [MIPS vs ARM Architectures](http://www.differencebetween.com/difference-between-mips-and-vs-arm/)
- [Intel Processor Numbers & Suffixes](https://www.intel.com/content/www/us/en/processors/processor-numbers.html)
- [AMD Ryzen Model Numbers](https://www.amd.com/en/technologies/ryzen-naming-announcement)
