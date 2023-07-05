---
title: mitigations
---

# mitigations

```bash
lscpu # 查看用了哪些 mitigation
```

- 主要影响旧的 Intel CPU
- Linux 默认开启了 mitigations=on - 可以考虑关闭以提高性能
  - 前提是运行的 **可信** 的 VM
  - Spectre、Meltdown、L1TF（Foreshadow）、ZombieLoad
- 参考
  - https://www.phoronix.com/review/3-years-specmelt/2
