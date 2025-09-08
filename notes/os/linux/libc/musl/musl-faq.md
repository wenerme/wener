---
tags:
  - FAQ
---

# MUSL FAQ

- [Open Issues](https://wiki.musl-libc.org/open-issues.html)
  - 不支持 LC_TIME
  - 无 ucontext.h - obsolescent in POSIX.1-2001
    - [makecontext](https://pubs.opengroup.org/onlinepubs/009695399/functions/makecontext.html#tag_03_356_08)
    - [glusterfs#268](https://github.com/gluster/glusterfs/issues/268)
      - glusterfs 不支持 musl
    - [openssl#7406](https://github.com/openssl/openssl/issues/7406)
      - 使用 no-async 绕过
- 不支持 nsswitch
  - [pikhq/musl-nscd](https://github.com/pikhq/musl-nscd)
- 不支持 res_uinit
  - asterisk 无法获取 nameserver
- 无 fts
- 其他软件兼容问题
  - Golang runtime: c-shared builds fail with musllibc
    [golang/go#13492](https://github.com/golang/go/issues/13492)
    - 无法获取 argc, argv - 基于 glibc 扩展
    - 导致
      - FluentBit 插件不支持 AlpineLinux
  - libasan 不支持 musl
    [google/sanitizers#1080](https://github.com/google/sanitizers/issues/1080)
  - glusterfs 不支持 musl [glusterfs#268](https://github.com/gluster/glusterfs/issues/268)
- [bugs-found-by-musl](https://wiki.musl-libc.org/bugs-found-by-musl.html)
  - 其他软件已知因为 musl 导致的 bug
- posix_fallocate64

| symbol not found           | desc                                                  |
| -------------------------- | ----------------------------------------------------- |
| posix_fallocate64          | 64位文件偏移版本的 posix_fallocate，musl 使用统一实现 |
| fcntl64                    | 64位文件偏移版本的 fcntl，musl 使用统一实现           |
| `__sched_cpufree`          | glibc 内部函数，释放 CPU 集合内存                     |
| `__getpagesize`            | glibc 内部函数，获取内存页大小                        |
| malloc_trim                | glibc 扩展，释放堆顶部未使用内存给系统                |
| `__cxa_thread_atexit_impl` | C++ ABI 内部函数，线程退出时析构函数支持              |
| `__sched_cpualloc`         | glibc 内部函数，分配 CPU 集合内存                     |
| dlvsym                     | glibc 扩展，按版本查找动态库符号                      |

- libjvm.so

## malloc

- musl 1.2.1 启用了重写的 malloc
  - 2020-06
- 参考
  - https://andygrove.io/2020/05/why-musl-extremely-slow/
  - https://pythonspeed.com/articles/alpine-docker-python/
  - https://www.linkedin.com/pulse/testing-alternative-c-memory-allocators-pt-2-musl-mystery-gomes/

## DNS

- 目前已经支持 DNS over TCP，大部分 DNS 问题已经解决
- musl libc 1.2.4 - tcp dns - 解决 udp dns 不能返回太多解析的问题

---

resolv 不支持 dns over tcp/edns, 因此一次 resolve 最多返回 一个包，512 bytes，有时候解析会因此出现问题。

- 问题
  - [alpine/aports#9734](https://gitlab.alpinelinux.org/alpine/aports/issues/9734) - DNS resolver patch
    - AAAA 不识别 NotImp 导致等待超时
  - 会同时发起 A 和 AAAA 请求
  - glibc's DNS resolver only generates AAAA queries if it can create an IPv6 socket.
  - 5s 超时重试
  - `options single-request`
  - `options timeout:1`
- 参考
  - [weaveworks/weave#3287](https://github.com/weaveworks/weave/issues/3287) DNS lookup timeouts due to races in conntrack
  - [gliderlabs/docker-alpine#255](https://github.com/gliderlabs/docker-alpine/issues/255)
  - [kubernetes/kubernetes#56903](https://github.com/kubernetes/kubernetes/issues/56903#issuecomment-462252499) - DNS intermittent delays of 5s
  - [Intermittent delays in Kubernetes](https://medium.com/techmindtickle/e9de8239e2fa)
    - resolve.conf 添加 `options single-request-reopen`
  - [Racy conntrack and DNS Lookup Timeouts](https://dzone.com/articles/racy-conntrack-and-dns-lookup-timeouts)
    - 因为 A 和 AAAA 通过同一个端口发起请求导致异常
    - disable parallel lookups, disable IPv6 to avoid AAAA lookups, use TCP for lookups
  - [resolver: only exit the search path loop there are a positive number of results give](https://www.openwall.com/lists/musl/2018/03/30/4) - DNS 服务异常导致 musl 行为异常
  - [DNS resolution happenning only after timeout](https://www.openwall.com/lists/musl/2017/10/04/6)
    - 因为 AAAA 的问题
    - 目前无法禁止
  - [How to disable AAAA lookups?](https://serverfault.com/questions/632665)
    - 目前没有好的方式
  - [Linux slow dns lookup (delay = 5 seconds)](https://www.math.tamu.edu/~comech/tools/linux-slow-dns-lookup/)
  - dnsmasq 也没有直接针对 aaaa 返回 nx 的方式
    - [Is there a way to "block" IPv6 address queries?](http://lists.thekelleys.org.uk/pipermail/dnsmasq-discuss/2005q2/000229.html)
    - 可以通过减少 DNS 外部查询以达到类似目的
    - `cache-size=65535` 和 `min-cache-ttl=300` 增加缓存
  - iptables 禁用 aaaa 记录查询
    - [oskar456/xt_dns](https://github.com/oskar456/xt_dns) 模块可以实现 dns 匹配
    - https://www.v2ex.com/t/242793
  - 转发处理 AAAA
    - [shawn1m/overture](https://github.com/shawn1m/overture) - 支持 reject qtype - 但是返回 ServFail
    - 建议返回 NXDOMAIN [weaveworks/weave#2244](https://github.com/weaveworks/weave/issues/2244)

```bash
# 监控 DNS 请求
tcpdump -ni eth0 port 53

# 完整查询内容例如 |03|www|07|example|03|com
# 使用 match-set 禁用 AAAA
iptables -N AAAA
# iptables -I FORWARD 1 -p udp -s 192.168.0.0/16 --dport 53 -j AAAA
iptables -I OUTPUT 1 -p udp --dport 53 -j AAAA
# drop 会导致超时 - 最好是返回 NXDATA 或者 NXDOMAIN
iptables -A AAAA -m string --algo bm --from 40 --hex-string '|001c|' -j DROP
```

## pthread_attr_setaffinity_np

- 没有
- torch libgomp
- 替代 - https://patches.dpdk.org/project/dpdk/patch/20210319145730.3555384-15-thomas@monjalon.net/
  - pthread_yield -> sched_yield
  - pthread_attr_setaffinity_np -> pthread_create+pthread_setaffinity_np

## pthread_rwlockattr_setkind_np

## gcompat

- 解决一部分兼容问题

```bash
apk add gcompat
export LD_PRELOAD=/lib/libgcompat.so.0
```

## symbols

```bash
# 基础
apk add libstdc++ libgcc
```

- fcntl64
- https://clickhouse.com/codebrowser/ClickHouse/base/glibc-compatibility/musl/fcntl.c.html
- https://lore.kernel.org/all/20231014153924.54987-1-raj.khem@gmail.com/T/
