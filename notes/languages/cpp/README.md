---
title: C++
tags:
  - Topic
---

# C++

- [版本演进](./cpp-version.md)

- C + OOP, Generic, Async, Template, Operator Override
- Source `.cpp`、`.cc` 、 `.cxx`
- Header `.h`、`.hpp` 、 `.hh`
- toolchain
  - GCC：`g++`
  - LLVM Clang：`clang++`
  - Microsoft Visual C++：`cl.exe`
  - CMake, Make, Ninjia
  - Conan, vcpkg
  - GDB, LLDB
  - AddressSanitizer、UndefinedBehaviorSanitizer
  - `clang-tidy`、`clang-format`
- Async
  - co_await, co_return, co_yield, std::async, `Task<T>`
  - FreeRTOS task - 独立栈、可抢占的任务
- 参考
  - [C++ 编译器支持](https://en.cppreference.com/w/cpp/compiler_support)

## 核心概念

- 类型系统：基础类型、类、枚举、联合体、类型推导和 `const` / `constexpr`
- 资源管理：构造函数、析构函数、RAII、移动语义和智能指针
- 值类别：左值、右值、引用、完美转发
- 泛型编程：函数模板、类模板、特化、Concepts 和标准库算法
- 标准库：容器、迭代器、算法、字符串、文件系统、线程、同步原语和时间库
- 错误处理：异常、错误码、`std::expected` 等显式错误表示
- 并发：线程、锁、原子操作、Future、协程和并行算法
- 编译与链接：翻译单元、头文件、ODR、符号、ABI、静态库和动态库
- C 互操作：`extern "C"`、C ABI、封装 C 接口和跨语言 FFI

```cpp
#include <iostream>

int main() {
  std::cout << "Hello, C++\n";
  return 0;
}
```

```bash
# GCC
g++ -std=c++20 -Wall -Wextra -Wpedantic -O2 main.cpp -o hello

# LLVM Clang
clang++ -std=c++20 -Wall -Wextra -Wpedantic -O2 main.cpp -o hello

./hello

# 调试构建可以加入调试信息和运行时检查：
clang++ -std=c++20 -Wall -Wextra -Wpedantic -g -fsanitize=address,undefined main.cpp -o hello-debug
```

## CMake

```text
hello/
├── CMakeLists.txt
└── main.cpp
```

`CMakeLists.txt`：

```cmake
cmake_minimum_required(VERSION 3.20)
project(hello LANGUAGES CXX)

add_executable(hello main.cpp)
target_compile_features(hello PRIVATE cxx_std_20)
target_compile_options(hello PRIVATE
  $<$<CXX_COMPILER_ID:GNU,Clang>:-Wall;-Wextra;-Wpedantic>
)
```

```bash
cmake -S . -B build -G Ninja
cmake --build build
./build/hello
```

## 代码组织

- 头文件放置声明，源文件放置实现；尽量减少头文件中的非必要实现内容
- 使用命名空间隔离公共符号，避免把 `using namespace ...` 放入头文件
- 优先使用标准库和 RAII 管理资源，减少裸 `new` / `delete`
- 对外接口优先明确所有权、生命周期、异常保证和线程安全约束
- 将编译器警告视为代码质量检查的一部分，并在 CI 中固定编译标准和关键警告选项
- C++ 项目应明确编译器版本、标准库实现、目标平台和 ABI 约束

## 参考

- [isocpp.org](https://isocpp.org/)
  - ISO C++ 标准委员会相关资源和 C++ 社区入口
- [C++ reference](https://en.cppreference.com/w/cpp)
  - C++ 语言和标准库的检索式参考
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
  - C++ 代码设计、接口和资源管理指南
- [GCC C++ Dialect Options](https://gcc.gnu.org/onlinedocs/gcc/C-Dialect-Options.html)
  - GCC 的 C 和 C++ 方言、标准版本及相关编译选项
- [Clang C++ Language Status](https://clang.llvm.org/cxx_status.html)
  - Clang 对不同 C++ 标准特性的支持情况
- [CMake Documentation](https://cmake.org/cmake/help/latest/)
  - CMake 的命令、属性、生成器和构建系统参考
