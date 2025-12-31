---
title: SMBIOS
tags:
  - Virtualization
  - Hardware
  - SMBIOS
---

# SMBIOS {#smbios}

- [System Management BIOS - Wikipedia](https://en.wikipedia.org/wiki/System_Management_BIOS)
- [dmidecode](https://github.com/mirror/dmidecode)

```bash
# Dump SMBIOS data
dmidecode

# QEMU SMBIOS options
# -smbios file=path
# -smbios type=0,vendor=LENOVO,version=...
```

## Structure

- Type 0: BIOS
- Type 1: System
- Type 2: Baseboard
- Type 3: Chassis
- Type 4: Processor
- Type 11: OEM Strings

- [DMTF - SMBIOS](https://www.dmtf.org/cn/standards/smbios)
