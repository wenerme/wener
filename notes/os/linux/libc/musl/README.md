---
title: musl
---

# musl

:::caution

- malloc 大场景性能弱 - 性能要求高的场景使用 jemalloc 或 mimaloc
- 不支持 utmp/wtmp - last,who,users 命令部分功能不可用
  - 安全考虑、隐私考虑
  - 需要实现 suid/sgid 修改 记录
  - https://wiki.musl-libc.org/faq.html
- [DNS 问题已经解决](./musl-faq.md#dns)

:::

- [musl](https://musl.libc.org/) - MIT
- [FAQ](./musl-faq.md)
- [与 glibc 的不同点](https://wiki.musl-libc.org/functional-differences-from-glibc.html)
- 参考
  - https://git.musl-libc.org/cgit/musl
    - [bminor/musl](https://github.com/bminor/musl)
  - https://github.com/gentoo/musl

## 环境变量

| Env             | Used by                      | Note                                                      |
| --------------- | ---------------------------- | --------------------------------------------------------- |
| PATH            | execvp, execlp, posix_spawnp |
| TZ              |                              | `stdoffset[dst[offset][,start[/time],end[/time]]` 或 名字 |
| DATEMSK         | getdate                      |
| PWD             | get_current_dir_name, getcwd |
| LOGNAME         | getlogin                     |
| LD_PRELOAD      | setuid, setgid 忽略          | dl 预加载动态库列表                                       |
| LD_LIBRARY_PATH | setuid, setgid 忽略          | 动态库搜索目录列表                                        |

- TZ 搜索目录
  - /usr/share/zoneinfo
  - /share/zoneinfo
  - /etc/zoneinfo
- [Environment Variables](https://wiki.musl-libc.org/environment-variables.html)
