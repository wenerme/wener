---
title: Trace
---

# Trace

```bash
strace -e trace=network

# file
strace -f -e open ls 2>&1 | grep ^open\( | grep “[[:digit:]]\+$” | cut -d\” -f2
strace -f -p $(pidof java)
# syscall
ltrace -c ls
```

| strace    | for                                        |
| --------- | ------------------------------------------ |
| -c        |
| -f        |
| -p PID    |
| -P /tmp   |
| -T        | 耗时                                       |
| -e trace= | ipc,memory, network, file, signal, process |

- file
  - access
  - close
  - fchmod
  - fchown
  - fstat
  - lseek
  - open
  - read
  - statfs - fs 相关信息
- network
  - bind
  - listen
  - socket
  - setsocketopt
- memory
  - mmap
  - munmap
