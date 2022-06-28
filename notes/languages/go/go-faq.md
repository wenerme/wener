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

## 安装

- https://go.dev/dl/
  - https://mirrors.ustc.edu.cn/golang/

```bash
# Windows go1.17.6.windows-amd64.zip
# macOS go1.18.3.darwin-amd64.tar.gz
curl -LO https://mirrors.ustc.edu.cn/golang/go1.17.6.windows-amd64.zip
mkdir -p ~/sdk
unzip go1.17.6.windows-amd64.zip -d ~/sdk
mv ~/sdk/go ~/sdk/go1.17.6
~/sdk/go1.17.6/bin/go version

export PATH=$HOME/sdk/go1.17.6/bin:$PATH
```

## 安装指定版本 Golang 环境

- 下载位置
  - $HOME/sdk/go$VERSION/go$VERSION.darwin-amd64.tar.gz
- 安装逻辑 [golang.org/dl/internal/version/version.go]（https://cs.opensource.google/go/dl/+/1eec6072:internal/version/version.go
- 安装完成不会删除压缩包，可自己删除
- tip 最新 latest
  - 下载源码进行编译
- 默认下载地址 `"https://dl.google.com/go/" + version + "." + goos + "-" + arch + ext`

```bash
# 下载 tip 版本
go install golang.org/dl/gotip@latest
gotip download

# 下载最新版本
# 从 dl.google.com 下载
# 默认安装到 ~/sdk/
# 其他版本 例如 go1.18rc1
go install golang.org/dl/go1.18@latest
go1.18 download
go1.18 env GOROOT
～/sdk/go1.18/bin/go env

# 安装到别的地方
HOME=/opt ~/go/bin/go1.18 download
/opt/sdk/go1.18/bin/go env

# 交叉编译
mkdir work && cd work
go mod init work
go get -u golang.org/dl/go1.18
GOOS=linux go build -o go1.18_linux golang.org/dl/go1.18@latest

# AlpineLinux 基础依赖
apk add libc6-compat gcompat
# AlpineLinux CGO 依赖
apk add gcc musl-dev

# 注意设置 GOROOT - 默认 /usr/go
export GOROOT=/opt/sdk/go1.18

export PATH="$GOROOT/bin:$HOME/go/bin:$PATH"
```

## GOVCS disallows using git for public

添加 GOVCS 设置，默认为 `public:git|hg,private:all`

```bash
# 全部允许
GOVCS=*:all go get github.com/wenerme/apki
# 限定
GOVCS=github.com:git,*:off go get github.com/wenerme/apki
```

## go: cannot find GOROOT directory: /usr/local/go

- 从源码构建默认 GOROOT_FINAL=/usr/local/go
- AlpineLinux 默认为 /usr/lib/go
  - 自行构建可修改 - [alpinelinix/go/APKBUILD](https://gitlab.alpinelinux.org/alpine/aports/-/blob/master/community/go/APKBUILD#L135)
- bazel 安装的 Go 也有这个问题

---

1. 创建目录 - 推荐方式

```bash
ln -s /opt/sdk/go1.18beta1 /usr/local/go
```

2. 修改 GOROOT 配置

```bash
GOROOT=/opt/sdk/go1.18beta1 /opt/sdk/go1.18beta1/bin/go env
# 写入后便不会报错
GOROOT=/opt/sdk/go1.18beta1 /opt/sdk/go1.18beta1/bin/go env -w GOROOT=/opt/sdk/go1.18beta1
/opt/sdk/go1.18beta1/bin/go env
```

## golang.org/x

- x/net
  - https://github.com/golang/net
  - https://cs.opensource.google/go/x/net

## 查找用到了 cgo 的模块

```bash
go list -f "{{if .CgoFiles}}{{.ImportPath}}{{end}}" $(go list -f "{{.ImportPath}}{{range .Deps}} {{.}}{{end}}" ./...)
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
  - 动态链接 - 体积非常小 - HelloWorld 250K vs 2MB
    - libgo, libm, libgcc, libz, libpthread, ld.so, linux-vdso.so - virtual shared object

```bash
# go 可直接使用 gccgo 编译
go build -compiler gccgo myprog

# gccgo flags
go build -gccgoflags "-s -w" main.go
```

## compile: version does not match go tool version

注意调整 GOROOT

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

## GODEBUG

- GODEBUG=netdns=go
- GODEBUG=netdns=cgo
- GODEBUG=netdns=go+2
- GODEBUG=netdns=cgo+2

## 常见大写字段名字

```
ACL
API
ASCII
CPU
CSS
DNS
EOF
GUID
HTML
HTTP
HTTPS
ID
IP
JSON
LHS
QPS
RAM
RHS
RPC
SLA
SMTP
SQL
SSH
TCP
TLS
TTL
UDP
UI
UID
URI
URL
UTF8
UUID
VM
XML
XMPP
XSRF
XSS
```

- [commonInitialisms](https://github.com/golang/lint/blob/6edffad5e6160f5949cdefc81710b2706fbcd4f6/lint.go#L770-L809)

## regexp

- Index 为 byte index
- https://pkg.go.dev/regexp
- https://pkg.go.dev/regexp/syntax

## go build static

```bash
CGO_ENABLED=0 go build -a -ldflags '-extldflags "-static"'
# statically linked PIE
CGO_ENABLED=1 go build -buildmode=pie -tags 'osusergo,netgo,static,static_build' -ldflags '-linkmode=external -extldflags "-static-pie"' .

GOOS=linux go build -tags 'osusergo netgo'
GOFLAGS=-static
```

- https://github.com/golang/go/issues/26492

## struct 可比较

- 如果所有字段可比较，则 struct 可比较
- 使用 struct 作为 context key 需要注意比较逻辑
  - 指针和非指针比较逻辑相同

## 判断 int 类型

```go
package main

import (
	"fmt"
	"runtime"
	"unsafe"
)

func main() {
	fmt.Println("arch", runtime.GOARCH)
  // 8 -> int64
  // 4 -> int32
	fmt.Println("int", unsafe.Sizeof(int(0)))
}
```
