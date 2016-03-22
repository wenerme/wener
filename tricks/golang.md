
## Tips

Directory and file names that begin with "." or "_ " are ignored by the go tool, as are directories named "testdata".

----



## Install golang under linux
```bash
GOVERSION=1.6
wget https://storage.googleapis.com/golang/go$GOVERSION.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go$GOVERSION.linux-amd64.tar.gz
export GOROOT=/usr/local/go
export PATH=$GOROOT/bin:$PATH

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

## Interop with C

```
go install -buildmode=shared -linkshared  std
go install  -buildmode=shared -linkshared userownpackage
go build -linkshared yourprogram
```

### Export function

```
//export SayHello
func SayHello(name string) {
	fmt.Printf("Nautilus says: Hello, %s!\n", name)
}
```

### Inline C code
```
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

## Cross compile

env GOOS=linux GOARCH=amd64 go build -o RedHat/clbeat -v github.com/wenerme/clbeat

* [environment](https://golang.org/doc/install/source#environment)

## Reference

* [cmd/go](https://golang.org/cmd/go/)
* [vender](https://docs.google.com/document/d/1Bz5-UB7g2uPBdOx-rw5t9MxJwkfpx90cqG9AFL0JAYo/edit)
* [Summary of Go Generics Discussions](https://docs.google.com/document/d/1vrAy9gMpMoS3uaVphB32uVXX4pi-HnNjkMEgyAHX4N4/edit#heading=h.vuko0u3txoew)
* [FAQ](http://golang.org/doc/faq)
* [The Three Go Landmines](https://gist.github.com/lavalamp/4bd23295a9f32706a48f)
* Video
	* [Profiling & Optimizing in Go](https://www.youtube.com/watch?v=xxDZuPEgbBU)
