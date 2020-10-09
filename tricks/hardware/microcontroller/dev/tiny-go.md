# TinyGo
## Tips
* [tinygo-org/tinygo](https://github.com/tinygo-org/tinygo) - Go on Microcontrollers and WASM
  * 基于 LLVM Go
* [语言特性支持](https://tinygo.org/lang-support/)
* [Why go instead of rust](https://tinygo.org/faq/why-go-instead-of-rust/)
  * Go 优势
    * Go 更具有主见性 - 因此更易学易用 - 更简单
    * 内建并发支持 - 不依赖线程实现
    * 完善低耦合的标准库
  * Rust 优势
    * 默认没有 GC
    * 更强的内存安全保障
    * 更底层，更容易支持 microcontroller

```bash
# 源码安装
git clone --recursive https://github.com/tinygo-org/tinygo.git
cd tinygo
# 安装 - 使用本地安装的 llvm
sudo apk add clang clang-analyzer clang-extra-tools clang-dev llvm-dev
GOPROXY=https://goproxy.io go install -v

# 自行构建 llvm
export CC=clang
export CXX=clang++
make llvm-build
make

./build/tinygo version

make gen-device

# docker
docker run --rm -v $(pwd):/src tinygo/tinygo:0.15.0 tinygo build -o /src/blinky1.hex -size=short -target=pca10040 examples/blinky1
```
