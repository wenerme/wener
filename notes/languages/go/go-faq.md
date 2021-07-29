---
title: Go FAQ
---

# Go FAQ

## Struct 是否使用指针

- 尽量不使用指针 - 直接使用 Struct 会更快
  - 使用指针会用到全局堆，使用 struct 副本可直接放到栈
  - 用到堆就会涉及到 GC
- 使用 Pointer
  - 调用密度高
  - 不需要副本场景
- 使用 Struct
  - 数据密度高但不需要经常调用
  - 确保数据不发生变化
- 如果 Struct 包含了不可复制对象，则一定要用指针 - 例如 sycn.Mutex
- 参考
  - [Go: Should I Use a Pointer instead of a Copy of my Struct?](https://medium.com/a-journey-with-go/44b43b104963)

```golang
type Server struct {
  // 内部配置对象可使用 Struct
  conf ServerConf
}
// 因为会对 conf 进行默认值补齐 - 因此传入指针
func NewServer(conf *ServerConf)*Server{
  // 修改
  if conf.Bind == "" {
    conf.Bind = "0.0.0.0"
  }
  // 复制一个 conf 避免外部更改
  // Server 使用指针，因为不需要副本
  return &Server{ Conf = *conf }
}
```

## text/template vs html/template

- html/template
  - 输出内容被转义，避免代码注入

## 不会使用 /etc/hosts 就行解析

- 添加 `/etc/nsswitch.conf` 可以解决
  - `echo "hosts: files dns" > /etc/nsswitch.conf`
- [#35305](https://github.com/golang/go/issues/35305) - net: prefer /etc/hosts over DNS when no /etc/nsswitch.conf is present
- [#22846](https://github.com/golang/go/issues/22846) - net: Go DNS resolver does not read /etc/hosts

**/etc/nsswitch.conf**

```
# /etc/nsswitch.conf
#
# As described on the web page https://man7.org/linux/man-pages/man3/gethostbyname.3.html,
# without the nsswitch.conf file, the gethostbyname() and gethostbyaddr() domain queries
# will fail to a local name server, thus the /etc/hosts will take no effect.
#
# For example, when hostaliases are specified for a kubernetes pod, without proper settings
# defined in this file, the hostaliases settings will not take effect.
#
# Following contents of this file is from the ubuntu:16.04 docker image.

passwd:         compat
group:          compat
shadow:         compat
gshadow:        files

hosts:          files dns
networks:       files

protocols:      db files
services:       db files
ethers:         db files
rpc:            db files

netgroup:       nis
```

## Windows 安装

- https://golang.org/dl/ - 下载 MSI 或 Zip
  - MSI 默认安装在 `C:\GO`

```bash
# msys 下
export GOPATH=$HOME/go
export PATH="$PATH:/c/GO/bin:$HOME/go/bin"
export GO111MODULE=on
export GOPROXY=https://goproxy.io
```

## reflect.Value.Interface: cannot return value obtained from unexported field or method

relfect 不允许访问未导出字段

- Hack access https://stackoverflow.com/a/43918797/1870054

## bufio.Reader vs bufio.Scanner

- bufio.Scanner
  - 一次读一行 - 不包含分隔符 `\r\n`
  - 默认 64k 行限制
  - 接口使用友好，Scan 和 错误 独立
  - `io.EOF` 时 Err 为 nil
- bufio.Reader
- 内部 4k 缓冲
- ReadLine 不返回换行，类似 Scanner，但返回 `[]byte` - **不推荐** 使用
- ReadString - 读取直到指定分隔符，返回分隔符 - 类似 Scanner
- 实现 `io.Reader` - 很多时候这个是选择的 _决定因素_

## pq vs pgx

> pq 作者推荐推荐使用 pgx

- [pq](https://github.com/lib/pq)
  - 项目处于维护模式
- [pgx](https://github.com/jackc/pgx)
  - 支持所有 native 类型
  - 支持逻辑复制协议
