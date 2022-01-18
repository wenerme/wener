---
title: Go FAQ
tags:
  - FAQ
---

# Go FAQ

:::caution

- [golang/go#9200](https://github.com/golang/go/issues/9200)
  - html/template JS 不能包含 `\``

:::

## 使用最新测试版本

- $HOME/sdk/go$VERSION/go$VERSION.darwin-amd64.tar.gz

```bash
# 下载 tip 版本
go install golang.org/dl/gotip@latest
gotip download

# 下载最新版本
go install golang.org/dl/go1.18beta1@latest
go1.18beta1 download
go1.18beta1 env GOROOT
```

## golang.org/x

- x/net
  - https://github.com/golang/net
  - https://cs.opensource.google/go/x/net

## 查找用到了 cgo 的模块

```bash
go list -f "{{if .CgoFiles}}{{.ImportPath}}{{end}}" $(go list -f "{{.ImportPath}}{{range .Deps}} {{.}}{{end}}" ./... )
```

## JSON string to int

- json.Number - encode 保留 number
- `json:",string"` - encode 会转 string

## sql null

- 直接使用指针
  - 简单、无外部依赖
  - json、mapstructure 能正确处理
  - 代码逻辑复杂一点
  - 可能导致未预期的修改
- sql.NullType
  - 代码逻辑清晰，不会导致指针修改
  - json、mapstructure 无法正确处理
  - mapstructure 需要自定义 Hook
- null.Type - [guregu/null](https://github.com/guregu/null)
  - 引入外部库
  - 提供便捷方法
  - 支持 json
  - mapstructure 无法正确处理
  - mapstructure 需要自定义 Hook

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
    - [1](https://github.com/gliderlabs/docker-alpine/issues/367#issuecomment-424546457)
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

## gc vs gccgo

- gc - 默认 Golang 实现
  - 半年升级一次 - 跟随 spec 版本
  - 1.5 后不再依赖 C 编译器
  - 跨平台编译 - 不依赖 CGO 时
  - 静态编译 - 体积大 - HelloWorld 2M+
- gccgo - 基于 GCC 实现
  - 随 GCC 升级 - 版本一般落后，升级慢
  - 依赖 OS 提供 GCC 包 - 一般落后主 GCC 版本
  - 编译更快，但支持更多优化 - 重 CPU 场景性能更好
  - 默认支持 CGO
  - 支持更多平台 - 所有 GCC 支持的平台
  - 交叉编译非常难
  - 动态链接 - 体积非常小 - HelloWorld 250K
    - libgo, libm, libgcc, libz, libpthread, ld.so, linux-vdso.so - virtual shared object

```bash
# go 可直接使用 gccgo 编译
go build -compiler gccgo myprog

# gccgo flags
go build -gccgoflags "-s -w" main.go
```

## Cipher CBC / ECB / CFB / GCM

## memstats.gc_sys undefined (type mstats has no field or method gc_sys)

升级后出现，尝试卸载重装。

尝试删除目录 /usr/lib/go/ 后重装。

## go.sum h1

- h1: hash-v1
  - sha256+base64
  - https://github.com/vikyd/go-checksum

```go.sum
<module> <version> <hash>
<module> <version>/go.mod <hash>
```
