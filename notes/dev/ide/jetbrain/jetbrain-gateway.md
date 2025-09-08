---
title: Gateway
---

# Gateway

- https://www.jetbrains.com/remote-development/gateway/
- https://www.jetbrains.com/help/go/prerequisites.html
- SSH 不支持 ProxyJump
  - 使用 ProxyCommand workaround `ssh jumphost -W %h:%p`
  - https://youtrack.jetbrains.com/issue/IJPL-63089/ProxyJump-not-supported
- ~/.config/JetBrains/
- ~/.cache/JetBrains/RemoteDev/

# FAQ

## 不支持 musl

```
ldd /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so
        /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        libdl.so.2 => /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        libpthread.so.0 => /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        librt.so.1 => /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        libm.so.6 => /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        libc.so.6 => /lib/ld-musl-x86_64.so.1 (0x7fe09bf7a000)
        ld-linux-x86-64.so.2 => /lib/ld-linux-x86-64.so.2 (0x7fe09bf6d000)
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: posix_fallocate64: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: fcntl64: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: __sched_cpufree: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: __getpagesize: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: malloc_trim: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: __cxa_thread_atexit_impl: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: __sched_cpualloc: symbol not found
Error relocating /home/admin/.cache/JetBrains/RemoteDev/dist/7bbdfa250cf04_pycharm-2025.2.1.1/jbr/lib/server/libjvm.so: dlvsym: symbol not found
```
