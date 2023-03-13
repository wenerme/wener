---
title: lsof
---

# lsof

- [lsof.8](https://man7.org/linux/man-pages/man8/lsof.8.html)

```bash
# 搜索目录
lsof +D /var/lib/k0s/containerd/io.containerd.snapshotter.v1.overlayfs/
# 搜索 Linux 文件
lsof -f -- /run/k0s/konnectivity-server/konnectivity-server.sock

lsof -c ssh -c init

lsof -a -d "^cwd,^rtd" +D "/"
```

| flag                | for                    |
| ------------------- | ---------------------- |
| -d FD               |
| +D DIR              | 遍历 DIR               |
| +d DIR              | 不遍历                 |
| -u USER             |
| -g GROUP            |
| -a                  | AND                    |
| -c PROCESS_NAME     |                        |
| -p PID              |
| -t                  | 输出 PID               |
| `+\|-r [t[m<fmt>]]` | repeat N times         |
| -i                  | network                |
| -N                  | NFS                    |
| -P                  | 不 port -> name        |
| -n                  | 不 ip -> hostname      |
| `+\|-f [cfgGn]`     | path name              |
| -D D                | device cache file       |
| `-x [fl]`           | l - symlink, f - mount |

- `^EXCLUDE`
  - `-u ^root` - exclude root user
  - `-p ^init` - exclude init process
  - `-p 123,^456`
- `-i [46][protocol][@hostname|hostaddr][:service|port]`
  - `-i TCP:22`
  - `-i TCP:1-1024`
  - `-i 4` - IPv4
  - `-i 6` - IPv6
- `+D DIR -x l` - follow symlink
- `+D DIR -x f` - follow mount point

**FD**

| FD   | for                                    |
| ---- | -------------------------------------- |
| cwd  | current working directory              |
| Lnn  | library references (AIX)               |
| err  | FD information error (see NAME column) |
| jld  | jail directory (FreeBSD)               |
| ltx  | shared library text (code and data)    |
| Mxx  | hex memory-mapped type number xx       |
| m86  | DOS Merge mapped file                  |
| mem  | memory-mapped file                     |
| mmap | memory-mapped device                   |
| pd   | parent directory                       |
| rtd  | root directory                         |
| tr   | kernel trace file (OpenBSD)            |
| txt  | program text (code and data)           |
| v86  | VP/ix mapped file                      |

- r -> read
- w -> write
- u -> read+write
- ` ` -> unknow & no lock
- `-` -> unknown & lock

**Lock**

| L     | for                                            |
| ----- | ---------------------------------------------- |
| N     | Solaris NFS lock of unknown type;              |
| r     | read lock on part of the file;                 |
| R     | read lock on the entire file;                  |
| w     | write lock on part of the file;                |
| W     | write lock on the entire file;                 |
| u     | read and write lock of any length;             |
| U     | lock of unknown type;                          |
| x     | SCO OpenServer Xenix lock on part of the file; |
| X     | SCO OpenServer Xenix lock on the entire file;  |
| space | no lock.                                       |

- TYPE
  - REG - Regular File
  - DIR
  - FIFO
  - CHR
