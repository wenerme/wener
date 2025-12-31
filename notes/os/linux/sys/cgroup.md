---
title: Linux Control Groups (cgroups)
tags:
  - Linux
  - SysAdmin
  - Cgroup
  - Resource
---

# Linux Control Groups (cgroups) {#linux-control-groups}

- Path: `/sys/fs/cgroup`
  - Process cgroup: `/proc/self/cgroup`
- Unified Hierarchy (v2): `/sys/fs/cgroup/unified` (fstype=63677270)
  - Controllers: `/sys/fs/cgroup/cgroup.controllers`

## 常用操作 (Common Operations) {#common-operations}

```bash
# 创建 group
cgcreate -g "memory:slack_group" -t victor:victor
# 限定 group 内存
cgset -r memory.limit_in_bytes=1G "slack_group"
# 在 group 内启动
cgexec -g "memory:slack_group" slack
# 移除 group
cgdelete "memory:slack_group"

# 禁止 swap
echo 0 > /sys/fs/cgroup/memory/slack_group/memory.swappiness

# 检查内存使用
cat /sys/fs/cgroup/memory/memory.usage_in_bytes
cat /sys/fs/cgroup/memory/memory.limit_in_bytes
```

## OOM Killing

- OOM Score: `/proc/${PID}/oom_score`

## 内存统计 (Memory Stats) {#memory-stats}

- `/sys/fs/cgroup/memory`
  - `memory.stat`
  - `memory.usage_in_bytes`
    - `RSS + CACHE`
    - `free.used + free.(buff/cache) - (buff)`
  - `memory.max_usage_in_bytes`
  - `docker/` (Docker sub-groups)
    - `ID/` (Container memory info)

## 常见问题 {#faq}

### "memory" requires setting use_hierarchy to 1 on the root

```text
cgroup: "memory" requires setting use_hierarchy to 1 on the root.
```

- File: `/sys/fs/cgroup/memory/memory.use_hierarchy`
- 建议开启 (Recommended: 1)
- 开启后，统计内存使用会包含子 cgroup 的使用情况。

### Check cgroup support

```bash
cat /proc/cgroups
```

## 参考资料 {#references}

- [Cgroups - Wikipedia](https://en.wikipedia.org/wiki/Cgroups)
- [Control Group v1 Documentation](https://www.kernel.org/doc/Documentation/cgroup-v1/)
- [Control Group v2 Documentation](https://www.kernel.org/doc/Documentation/cgroup-v2.txt)
- [Cgroups - ArchWiki](https://wiki.archlinux.org/index.php/Cgroups)
- [cgmanager - Alpine Linux](https://pkgs.alpinelinux.org/package/edge/community/x86_64/cgmanager)
- [Kernel Knowledge Behind Docker: cgroups Resource Isolation](http://www.infoq.com/cn/articles/docker-kernel-knowledge-cgroups-resource-isolation)

### v1 vs v2 vs hybrid

- [cgroup v1 memory](https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt)

### Reference Snippets

```bash
mount -t cgroup cgroup /sys/fs/cgroup
```
