
## Tips

Directory and file names that begin with "." or "_ " are ignored by the go tool, as are directories named "testdata".

----



## Install golang under linux
```bash
GOVERSION=1.6
# 查看可选架构 https://storage.googleapis.com/golang/
wget https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go$GOVERSION.linux-amd64.tar.gz
export GOROOT=/usr/local/go
export PATH=$GOROOT/bin:$PATH
export GOPATH=$HOME/go

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

* 查看所有支持的环境 [environment](https://golang.org/doc/install/source#environment)


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

### 学习资源
* [《Go编程基础》](https://github.com/Unknwon/go-fundamental-programming)
	是一套针对 Google 出品的 Go 语言的视频语音教程，主要面向新手级别的学习者。
* [Learning-Go](https://github.com/mikespook/Learning-Go-zh-cn)
* [Go Web 基础](https://github.com/Unknwon/go-web-foundation)
* [Go名库讲解](https://github.com/Unknwon/go-rock-libraries-showcases)
* [Go 语言学习资料与社区索引](https://github.com/Unknwon/go-study-index)
