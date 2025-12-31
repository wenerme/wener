---
title: Embedded Drivers Management
tags:
  - Embedded
  - Linux
  - macOS
  - Drivers
  - Kernel
---

# Embedded Drivers Management

Notes on managing kernel modules and drivers across different operating systems.

## Linux Module Management

Commands for managing loadable kernel modules (LKM):

```bash
# List loaded modules
lsmod

# Manage modules (loading/unloading with dependencies)
modprobe <module_name>

# Low-level module management
insmod <module_path>
rmmod <module_name>

# View kernel logs for driver issues
dmesg | tail
```

## macOS (OS X) Driver Management

Commands for managing kernel extensions (kexts):

```bash
# Utility for managing kexts
kextutil

# List loaded kexts
kextstat

# Load/Unload kexts
kextload <path_to_kext>
kextunload <bundle_id_or_path>
```
