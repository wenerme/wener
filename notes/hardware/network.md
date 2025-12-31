---
title: High-Performance Networking Hardware (10GbE+)
tags:
  - Hardware
  - Networking
  - Ethernet
  - 10GbE
  - Mellanox
  - Intel
  - SFP+
---

# High-Performance Networking Hardware

Notes on enterprise-grade network interface cards (NICs), switches, and connectivity standards for 1GbE, 10GbE, and beyond.

## Network Interface Controllers (NICs)

### Intel Connectivity

- **Intel I350**: The gold standard for Gigabit (1GbE) networking. Reliable, supports SR-IOV, and widely compatible.
- **Intel X520 / X540 / X710**: Common choices for 10GbE networking.

### Mellanox (now NVIDIA Networking)

Mellanox adapters are highly regarded for their low latency and RDMA support.

- **ConnectX-2 / ConnectX-3**: Popular and affordable second-hand 10GbE/40GbE adapters.
- **ConnectX-4 / ConnectX-5**: Modern high-performance adapters for 25GbE/100GbE+.
- [Mellanox Products Overview](http://www.mellanox.com/page/products_overview)
- [Mellanox Technologies (Wikipedia)](https://en.wikipedia.org/wiki/Mellanox_Technologies)

## 10GbE Connectivity Standards

When using SFP+ ports, there are two primary ways to connect devices:

### 1. Direct Attach Copper (DAC)

A "high-speed cable" (10G 高速电缆) that has SFP+ Transceivers permanently attached to both ends.

- **Pros**: Cheaper, lower power consumption, lower latency.
- **Cons**: Limited length (usually < 7m), thicker and less flexible than fiber.

### 2. Optical Fiber

Requires two separate **SFP+ Transceivers** and a **Fiber Patch Cable** (光纤跳线, e.g., OM3/OM4/OM5).

- **Pros**: Supports extremely long distances, thinner cabling.
- **Cons**: More expensive, higher power/heat.

## Hardware Reference

- **H3C ER6300G2**: An enterprise-grade multi-WAN Gigabit router.
- **Mellanox MT26448**: A ConnectX EN 10GigE adapter (PCIe 2.0).
