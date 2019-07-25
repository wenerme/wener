# Linux Kernel

## Tips
* [Kernel wiki](https://wiki.kernel.org/)
* [Linux Kernel Hackers' Guide](http://www.tldp.org/LDP/khg/HyperNews/get/khg.html)
  * 讲的 Linux 1.0 结构
  * 非常简单通俗易懂
* [Linux Kernel Module Cheat](https://github.com/cirosantilli/linux-kernel-module-cheat)


```
# norandmaps: Don't use address space randomization. Equivalent to echo 0 > /proc/sys/kernel/randomize_va_space.
# printk.time=y: log in format: "[time ] msg" for all printk messages.
# nokaslr: https://unix.stackexchange.com/questions/397939/turning-off-kaslr-to-debug-linux-kernel-using-qemu-and-gdb
#   Turned on by default since v4.12
nokaslr norandmaps printk.devkmsg=on printk.time=y
```

https://en.wikipedia.org/wiki/Linux_kernel


System.map
https://en.wikipedia.org/wiki/System.map

https://en.wikipedia.org/wiki/Vmlinux

所有模块
find /lib/modules/$(uname -r) -type f -name '*.ko'

/lib/modules/$(uname -r)/modules.dep
modules.dep.bin

depmod
生成 modules.dep 和 modules.dep.bin
depmod -av

已加载的
cat /proc/modules

lsmod | tail -n +2 | cut -f 1 -d ' ' | sort

内核内建模块
cat /lib/modules/$(uname -r)/modules.builtin

blob kernel

