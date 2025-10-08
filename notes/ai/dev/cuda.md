---
tags:
  - FAQ
---

# FAQ

## error during container init: error running prestart hook #0: exit status 1, stdout: , stderr: Auto-detected mode as 'legacy'

- 一般重启能解决
- 如果不能重启，则尝试 unload 然后 reload

```
nvidia-container-cli: initialization error: nvml error: driver/library version mismatch: unknown
```

```bash
nvidia-smi
```

```
Failed to initialize NVML: Driver/library version mismatch
NVML library version: 570.172
```

```bash
# unload old
lsmod | grep nvidia

sudo rmmod nvidia_drm
sudo rmmod nvidia_modeset
sudo rmmod nvidia_uvm
sudo rmmod nvidia

sudo lsof /dev/nvidia*

lsmod | grep nvidia

# reload
nvidia-smi
```
