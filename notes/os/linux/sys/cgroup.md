---
title: cgroup
---

# cgroup

- /sys/fs/cgroup
  - /proc/self/cgroup
- /sys/fs/cgroup/unified - v2/unified - fstype=63677270
  - /sys/fs/cgroup/cgroup.controllers

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
# OOM kill 评分
# /proc/${PID}/oom_score
```


## cgroup v2

## 内存使用情况

- /sys/fs/cgroup/memory
  - memory.stat
  - memory.usage_in_bytes - RSS+CACHE = free.used + free.(buff/cache) - (buff)
  - memory.max_usage_in_bytes
  - docker/ - 子 group
    - ID/ - 单个容器内存信息

# FAQ

## cgroup: "memory" requires setting use_hierarchy to 1 on the root."

- `/sys/fs/cgroup/memory/memory.use_hierarchy`
- 推荐开启
- 在汇报内存使用时，会统计子 cgroup 的情况

## cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory
