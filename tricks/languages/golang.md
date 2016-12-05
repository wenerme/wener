# Golang

## Library

* [Awesome Go](https://github.com/avelino/awesome-go)

### Machine Learning

* [GoLearn](https://github.com/sjwhitworth/golearn) is a 'batteries included' machine learning library for Go. Simplicity, paired with customisability, is the goal.
* [goml](https://github.com/cdipaolo/goml) is a machine learning library written entirely in Golang which lets the average developer include machine learning into their applications.
* [Gorgonia](https://github.com/chewxy/gorgonia) is a library that helps facilitate machine learning in Go. Write and evaluate mathematical equations involving multidimensional arrays easily.

### Web
一般 Web 的库分为很多种, MVC 型, REST 型,基础功能型

* Beego 的 MVC 做的相当好
* REST 类的 ECHO 会比较好,虽然 Gin 也不错,但是 Gin 使用的 httprouter 无法处理 `/user` 和 `/user/:id` 这样的路径
* 基础功能的一般可考虑直接使用原生或 Gin 或者 Mux 这样的来组装自己的服务

### Data

* ORM
	* gorm 是目前最好的 Go ORM 库

### Misc
https://github.com/alexflint/go-restructure
https://github.com/urfave/cli
https://github.com/pointlander/peg Peg, Parsing Expression Grammar
https://github.com/jteeuwen/go-bindata

https://github.com/hanwen/go-fuse



### Game
https://go-talks.appspot.com/github.com/guregu/slides/comiket/comiket.slide

https://github.com/EngoEngine/engo
 is an open-source 2D game engine written in Go.
 https://github.com/azul3d/engine A 3D game engine written in Go!

https://github.com/golang/mobile
 Golang mobile support cross-platform gl binding

https://github.com/name5566/leaf
https://github.com/xtaci/gonet
Golang 实现的游戏服务器框架


https://github.com/veandco/go-sdl2
https://github.com/fogleman/gg
https://github.com/andlabs/ui
## Tips

Directory and file names that begin with "." or "_ " are ignored by the go tool, as are directories named "testdata".

----


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
```


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

__UNINSTALL__

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

* [golang-sharing-libraries](http://blog.ralch.com/tutorial/golang-sharing-libraries/)
* [Go Execution Mode](https://docs.google.com/document/d/1nr-TQHw_er6GOQRsF6T43GGhFDelrAP0NqSS_00RgZQ/edit)
* [cmd/cgo](https://golang.org/cmd/cgo/)

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




* 查看所有支持的环境 [environment](https://golang.org/doc/install/source#environment)

## Go & C++
* [Swig 3.0 Document for GO](http://www.swig.org/Doc3.0/SWIGDocumentation.html#Go)

使用 Go 和 C++ 可通过 Swig 实现,也可通过将 C++ 的方法全封装为 C 方法,然后再通过 Go 调用.
在量较少的时候,使用第二种方式是非常方便快捷的,但是如果想要把大量的接口导出到 Go, 并且保持类特性,则只能使用 Swig.

Go 自 1.1 开就支持 Swig 了.

* [Swig Go Example](https://github.com/swig/swig/tree/master/Examples/go)

```bash
# 相关帮助
swig -go -help
swig -go -intgosize 64 -c++ -cgo director.i
go install
```

__swig -go --help__

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

## 参考/Reference
* Articles
	* [Go Patterns](http://www.infoq.com/news/2016/03/go-patterns)
* Video
	* [Profiling & Optimizing in Go](https://www.youtube.com/watch?v=xxDZuPEgbBU)
* [cmd/go](https://golang.org/cmd/go/)
* [vender](https://docs.google.com/document/d/1Bz5-UB7g2uPBdOx-rw5t9MxJwkfpx90cqG9AFL0JAYo/edit)
* [Summary of Go Generics Discussions](https://docs.google.com/document/d/1vrAy9gMpMoS3uaVphB32uVXX4pi-HnNjkMEgyAHX4N4/edit#heading=h.vuko0u3txoew)
* [FAQ](http://golang.org/doc/faq)
* [The Three Go Landmines](https://gist.github.com/lavalamp/4bd23295a9f32706a48f)
* [pkg/plugin](https://tip.golang.org/pkg/plugin/)

### 学习资源
* [《Go编程基础》](https://github.com/Unknwon/go-fundamental-programming)
	是一套针对 Google 出品的 Go 语言的视频语音教程，主要面向新手级别的学习者。
* [Learning-Go](https://github.com/mikespook/Learning-Go-zh-cn)
* [Go Web 基础](https://github.com/Unknwon/go-web-foundation)
* [Go名库讲解](https://github.com/Unknwon/go-rock-libraries-showcases)
* [Go 语言学习资料与社区索引](https://github.com/Unknwon/go-study-index)
