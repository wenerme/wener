---
title: PageSize
---

# pagesize

- 4KB - 大多场景
  - 最大 512G 虚拟内存 - 通过 huge page 使用更多内存
  - 非 4KB 内存可能那个导致各种问题
    - electron, k3s
  - etcd boltdb 4k
- 64K PageSize
  - AARCH64 之前有性能问题，部分 distro 选择 64KB
  - CentOS 7 aarch64, RedHat 7
    - RedHat 9 恢复为 4K - [RHEL 9.0 Release Notes](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html-single/9.0_release_notes/index)
      - lazy direct memory access (DMA) for system memory management unit (SMMU)
        - 避免 4KB 性能影响
  - SUSE [SLE 15](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15-SP4/index.html#technology-preview-aarch64)
    支持 4KB 内存
- 16K PageSize
  - Asahi linux
  - macOS
  - MySQL InnoDB
- 8K
  - PostgreSQL
- 128k
  - zfs
    - 默认存在写放大问题

```bash
# 当前 page size
getconf PAGESIZE
```

- https://github.com/electron/electron/issues/25387
- https://github.com/k3s-io/k3s/issues/6708
