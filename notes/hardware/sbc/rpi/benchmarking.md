---
title: Raspberry Pi Benchmarking & System Diagnostics
tags:
  - Hardware
  - RaspberryPi
  - Diagnostics
  - Benchmarking
  - StressTesting
  - vcgencmd
---

# Raspberry Pi Benchmarking & Diagnostics

Guidelines and tools for monitoring Raspberry Pi health, investigating performance throttling, and performing stress tests.

## System Diagnostics with `vcgencmd`

The `vcgencmd` utility allows you to query various pieces of information from the Raspberry Pi's GPU firmware.

- [Official vcgencmd Documentation](https://www.raspberrypi.org/documentation/raspbian/applications/vcgencmd.md)
- [RPi vcgencmd Usage Guide (eLinux)](https://elinux.org/RPI_vcgencmd_usage)

### Investigating Throttling

If your Pi feels slow, it might be due to thermal or voltage issues.

```bash
vcgencmd get_throttled
```

**Status Code Breakdown (Hex Bitmask)**:

- `0x1`: Under-voltage detected (at the moment).
- `0x2`: ARM frequency capped (at the moment).
- `0x4`: Currently throttled.
- `0x10000`: Under-voltage has occurred since last boot.
- `0x20000`: ARM frequency capped has occurred since last boot.
- `0x40000`: Throttling has occurred since last boot.

_Example: `0x50005` means under-voltage and throttling are active now and have occurred previously._

## CPU Stress Testing

### 1. `cpuburn-arm`

Designed to generate maximum heat by intensively utilizing ARM instructions.

- - [ssvb/cpuburn-arm](https://github.com/ssvb/cpuburn-arm)
    - Assembly, MIT
    - Optimized CPU stress testing for various ARM architectures (A53, A8, etc.).

```bash
# Example for RPi 3/4 (Cortex-A53/A72)
wget https://raw.githubusercontent.com/ssvb/cpuburn-arm/master/cpuburn-a53.S
gcc -o cpuburn-a53 cpuburn-a53.S
./cpuburn-a53
```

### 2. `stress-ng`

A comprehensive tool to stress various system components.

```bash
# Install tools
sudo apt-get install -y stress-ng htop

# Run a heavy stress test for 60 seconds
stress-ng --cpu $(nproc) --vm $(nproc) --vm-bytes 500M --io $(nproc) --timeout 60
```

## GPU Stress Testing

### `gpu-burn` (CUDA only)

_Note: This is specifically for CUDA-enabled devices; standard Raspberry Pi GPUs (VideoCore) require different tools like GLMark2._

- - [wilicc/gpu-burn](https://github.com/wilicc/gpu-burn)
    - C++, BSD-2-Clause
    - Multi-GPU CUDA stress test tool.

## Real-time Monitoring Script

Run this loop while stress testing to monitor clock speeds and temperatures:

```bash
while true; do
  for v in "measure_clock arm" "measure_clock gpu" measure_temp get_throttled; do
    /opt/vc/bin/vcgencmd $v
  done
  sleep 2
done
```

## Resources

- [Perform GPU and CPU Stress Testing on Linux](https://lambdalabs.com/blog/perform-gpu-and-cpu-stress-testing-on-linux/)
- [RPi 4 vs RPi 3 Benchmarks](https://www.geeks3d.com/20190930/raspberry-pi-4-vs-raspberry-pi-3-cpu-and-gpu-benchmarks/)
