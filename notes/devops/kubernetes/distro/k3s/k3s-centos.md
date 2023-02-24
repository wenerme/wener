---
title: Centos
---

# Centos

# FAQ

## xtables-set-mode.sh was not found in PATH

```bash
export PATH=/var/lib/rancher/k3s/data/current/bin:$PATH
k3s server
```

## arm64 signal: segmentation fault: unknown

```bash
getconf PAGESIZE # rel7 64K
```

- https://github.com/k3s-io/k3s/issues/6708
- https://github.com/electron/electron/issues/25387
