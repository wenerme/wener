---
id: go
title: Golang
---

# Golang

:::tip 实践

- 尽量避免 cgo
- 重复代码尽量 生成

:::

:::caution

- `go get` 不会下载源码到 `~/go/src` 了 - [#31529](https://github.com/golang/go/issues/31529)
- c-shared 不支持 musl - [golang/go#13492](https://github.com/golang/go/issues/13492)
- json omitempty 不支持 struct [golang/go#11939](https://github.com/golang/go/issues/11939)

:::

- 参考
  - [Design Philosophy On Data And Semantics](https://www.ardanlabs.com/blog/2017/06/design-philosophy-on-data-and-semantics.html)


- Websocket [C10M](http://goroutines.com/10m)

Directory and file names that begin with "." or `_` are ignored by the go tool, as are directories named "testdata".

---

```bash
# 更新 Go 过后可能会导致每个项目都会重复构建, 导致编译很慢, 针对单个项目可以按照如下的方式处理
# 把所有的依赖从新编译
go build -v 2> /tmp/build-tmp
sed -i '$ d' /tmp/build-tmp
# 更新所有依赖
cat /tmp/build-tmp | xargs -n 1 go get -u -v

# go build -v 2> /tmp/build-tmp;sed -i '$ d' /tmp/build-tmp;cat /tmp/build-tmp | xargs -n 1 go get -u -v
# 重新构建并缓存, 这样下次构建就会很快了
go build -i -v ./...

# 跨平台编译
env GOOS=linux GOARCH=amd64 go build  -o main-linux-amd64 main.go

# 移动包
go get github.com/golang/tools/cmd/gomvpkg/main.go
gomvpkg -from github.com/wenerme/before -to github.com/wenerme/after

# 将构建时间添加到生成的内容中
go build -ldflags "-X main.minversion=`date -u +.%Y%m%d.%H%M%S`" service.go
go run -ldflags "-X main.xyz=abc" main.go
go run -ldflags "-X main.build=`date +%Y%m%d.%H%M%S`" main.go


# Guru
go get github.com/golang/tools/cmd/guru/main.go
```

- https://mholt.github.io/json-to-go/
- https://mholt.github.io/curl-to-go/

## Install golang under linux

```bash
GOVERSION=1.7.3
# 查看可选架构 https://storage.googleapis.com/golang/
# Windows 64 位 https://storage.googleapis.com/golang/go$GOVERSION.windows-amd64.zip
# Windows 32 位 https://storage.googleapis.com/golang/go$GOVERSION.windows-386.zip
wget https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz
# 或者使用代理下载
# https_proxy=socks://127.0.0.1:8888 curl https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz -o go$GOVERSION.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go$GOVERSION.linux-amd64.tar.gz
export GOROOT=/usr/local/go
export PATH=$GOROOT/bin:$PATH
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$PATH
# 或将环境变量放到启动脚本
cd ~
echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
echo 'export GOPATH=$HOME/go' >> $HOME/.bashrc
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> $HOME/.bashrc
source $HOME/.bashrc
```

**UNINSTALL**

```
sudo rm -rf /usr/local/go
```

## 与 C 交互操作/Interop with C

```bash
go install -buildmode=shared -linkshared  std
go install  -buildmode=shared -linkshared userownpackage
go build -linkshared yourprogram
```

### Export function

```go
//export SayHello
func SayHello(name string) {
	fmt.Printf("Nautilus says: Hello, %s!\n", name)
}
```

### Inline C code

```go
// typedef int (*intFunc) ();
//
// int
// bridge_int_func(intFunc f)
// {
//		return f();
// }
//
// int fortytwo()
// {
//	    return 42;
// }
import "C"
import "fmt"

func main() {
	f := C.intFunc(C.fortytwo)
	fmt.Println(int(C.bridge_int_func(f)))
	// Output: 42
}
```

### Reference

- [golang-sharing-libraries](http://blog.ralch.com/tutorial/golang-sharing-libraries/)
- [Go Execution Mode](https://docs.google.com/document/d/1nr-TQHw_er6GOQRsF6T43GGhFDelrAP0NqSS_00RgZQ/edit)
- [cmd/cgo](https://golang.org/cmd/cgo/)

## 交叉编译/Cross compile

```bash
# 编译为 Linux 可执行文件
env GOOS=linux GOARCH=amd64 go build -o RedHat/clbeat -v github.com/wenerme/clbeat
# 编译为 Windows 可执行文件
env GOOS=windows GOARCH=amd64 go build -o main.exe -v
```

部分需要 linux cgo 编译的可使用 docker 镜像完成

```bash
docker run --rm -v $GOPATH:/go -w /go/src/应用包 golang go build -i -v
# 因为是使用 alphie 编译的,因此构建的 docker 中需要添加
# RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
# 需要注意 https://github.com/golang/go/issues/9344
```

### xgo

可使用 xgo 一次性编译多个平台的可执行文件,可使用 xgo 镜像以便于跨平台编译 cgo.

- 查看所有支持的环境 [environment](https://golang.org/doc/install/source#environment)

## Go & C++

- [Swig 3.0 Document for GO](http://www.swig.org/Doc3.0/SWIGDocumentation.html#Go)

使用 Go 和 C++ 可通过 Swig 实现,也可通过将 C++ 的方法全封装为 C 方法,然后再通过 Go 调用.
在量较少的时候,使用第二种方式是非常方便快捷的,但是如果想要把大量的接口导出到 Go, 并且保持类特性,则只能使用 Swig.

Go 自 1.1 开就支持 Swig 了.

- [Swig Go Example](https://github.com/swig/swig/tree/master/Examples/go)

```bash
# 相关帮助
swig -go -help
swig -go -intgosize 64 -c++ -cgo director.i
go install
```

**swig -go --help**

```
Go Options (available with -go)
     -cgo                - Generate cgo input files
     -gccgo              - Generate code for gccgo rather than 6g/8g
     -go-pkgpath <p>     - Like gccgo -fgo-pkgpath option
     -go-prefix <p>      - Like gccgo -fgo-prefix option
     -intgosize <s>      - Set size of Go int type--32 or 64 bits
     -package <name>     - Set name of the Go package to <name>
     -use-shlib          - Force use of a shared library
     -soname <name>      - Set shared library holding C/C++ code to <name>
```

## 程序瘦身/Reduce binary size

```bash
# A Hello world in Golang 1.6 is 2.2M

# 2.1M
strip main

# -s	disable symbol table
# -w	disable DWARF generation
# 1.7M
go build -ldflags "-s -w"  main.go

# UPX can not compress drawin.amd64
env GOOS=linux GOARCH=amd64 go build  -o main.linux.amd64 main.go # 2.2M
env GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -o main.linux.amd64.flag main.go # 1.6M

upx --best main.linux.amd64 # 666K
upx -9 --ultra-brute main.linux.amd64 # 508K

upx --best main.linux.amd64 # 478K
upx -9 --ultra-brute main.linux.amd64 # 363K
```

## Profiling

https://blog.golang.org/profiling-go-programs
https://golang.org/pkg/net/http/pprof/

## Beego

```bash
go get -u github.com/beego/bee
go get -u github.com/astaxie/beego

bee api bapi
cd bapi
bee run -downdoc=true -gendoc=true
```

## Self Update

- https://github.com/jpillora/overseer

## 参考/Reference

- Articles
  - [Go Patterns](http://www.infoq.com/news/2016/03/go-patterns)
- Video
  - [Profiling & Optimizing in Go](https://www.youtube.com/watch?v=xxDZuPEgbBU)
- [cmd/go](https://golang.org/cmd/go/)
- [vender](https://docs.google.com/document/d/1Bz5-UB7g2uPBdOx-rw5t9MxJwkfpx90cqG9AFL0JAYo/edit)
- [Summary of Go Generics Discussions](https://docs.google.com/document/d/1vrAy9gMpMoS3uaVphB32uVXX4pi-HnNjkMEgyAHX4N4/edit#heading=h.vuko0u3txoew)
- [FAQ](http://golang.org/doc/faq)
- [The Three Go Landmines](https://gist.github.com/lavalamp/4bd23295a9f32706a48f)
- [pkg/plugin](https://tip.golang.org/pkg/plugin/)
- [Calling Go Functions from Other Languages](https://dev.to/vladimirvivien/calling-go-functions-from-other-languages)

### 学习资源

- [《Go 编程基础》](https://github.com/Unknwon/go-fundamental-programming)
  是一套针对 Google 出品的 Go 语言的视频语音教程，主要面向新手级别的学习者。
- [Learning-Go](https://github.com/mikespook/Learning-Go-zh-cn)
- [Go Web 基础](https://github.com/Unknwon/go-web-foundation)
- [Go 名库讲解](https://github.com/Unknwon/go-rock-libraries-showcases)
- [Go 语言学习资料与社区索引](https://github.com/Unknwon/go-study-index)

## FAQ

### 什么时候使用指针

- 方法接收使用指针
- 当有疑问时, 使用指针
- 当结构体比较大, 或会发生变化时使用指针

### 为枚举生成 String 方法

- 使用 [Stringer](https://godoc.org/golang.org/x/tools/cmd/stringer) 生成
- 生成的默认文件为 `<type>_string.go`

```go
// 为类型 MyType 生成 Stringer
//go:generate stringer -type=MyType
// 输出到 strings.go
//go:generate stringer -type=MyType -output=strings.go
```
