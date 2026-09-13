---
title: C++ Version
tags:
  - Version
---

# C++ Version

- 当前正式标准：C++23（ISO/IEC 14882:2024(E)）。
- C++26 的 final working draft 已形成 Draft International Standard 的基础，但尚未成为已发布 ISO 标准。

| version       | ISO publication / status       | `__cplusplus` | 重点                                           |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------- |
| [C++26](#c26) | final working draft            | `202603L`     | 草案特性与实现支持仍在变化                     |
| [C++23](#c23) | ISO/IEC 14882:2024(E)          | `202302L`     | `std::expected`、`std::print`、显式对象参数    |
| [C++20](#c20) | ISO/IEC 14882:2020，2020-12    | `202002L`     | Concepts、Ranges、coroutines、modules          |
| [C++17](#c17) | ISO/IEC 14882:2017，2017-12    | `201703L`     | 结构化绑定、`std::filesystem`、`std::optional` |
| [C++14](#c14) | ISO/IEC 14882:2014，2014-12    | `201402L`     | 对 C++11 的增量完善                            |
| [C++11](#c11) | ISO/IEC 14882:2011，2011-09-01 | `201103L`     | 现代 C++ 基础：移动语义、lambda、线程          |
| [C++03](#c03) | ISO/IEC 14882:2003，2003-10-16 | `199711L`     | C++98 技术勘误与缺陷修正                       |
| [C++98](#c98) | ISO/IEC 14882:1998             | `199711L`     | 第一版 ISO C++ 标准、STL                       |

- `-std=c++26`、`-std=c++2c`

```bash
# GCC / Clang
c++ -std=c++20 main.cpp -o main

# CMake：按目标声明最低语言要求
target_compile_features(app PRIVATE cxx_std_20)
set(CMAKE_CXX_EXTENSIONS OFF)
```

```cpp
#if __cplusplus >= 202002L
// 当前翻译单元以至少 C++20 语言模式编译。
#endif

#if defined(__cpp_lib_expected) && __cpp_lib_expected >= 202202L
// 当前标准库提供 std::expected。
#endif
```

- `__cplusplus` 表示当前 C++ 语言模式，不表示每一项库特性均已实现。
- MSVC 项目需要启用 `/Zc:__cplusplus`，才能使 `__cplusplus` 反映选择的标准版本。

## C++26

- 截至 2026-09-07，C++26 的 final working draft 已形成 Draft International Standard 的基础，但 ISO C++ 官方页面仍将其作为 in-progress 资料处理。
- 不同编译器会以 C++26/C++2c 语言模式或单独实验开关提前交付部分能力；特性集合、宏值和实现完整度可能继续变化。
- 生产项目引入草案特性前，应固定编译器和标准库版本，并为降级路径、跨编译器构建和 CI 做单独验证。

## C++23

- 技术工作于 2023 年 2 月完成，ISO 正式出版物为 ISO/IEC 14882:2024(E)。
- 语言：显式对象参数（explicit object parameter，也常称 deducing `this`）、`if consteval`、多维下标运算符。
- 标准库：`std::expected`、`std::print` / `std::println`、`std::mdspan`、`std::flat_map` / `std::flat_set`、更多 ranges 支持。
- 升级关注：检查目标标准库是否实现所需 C++23 组件；不能只根据编译器接受 `-std=c++23` 判断可用性。

## C++20

- 语言：Concepts、coroutines、modules、三路比较运算符、指定初始化、`consteval`、`constinit`。
- 标准库：Ranges、`std::span`、`std::format`、日历与时区 `<chrono>`、`std::source_location`、原子等待与通知。
- 升级关注：modules 的构建与分发模型不同于头文件；编译器、构建系统和 IDE 支持应作为一个整体验证。

## C++17

- 语言：结构化绑定、`if constexpr`、折叠表达式、内联变量、类模板参数推导。
- 标准库：`std::optional`、`std::variant`、`std::any`、`std::string_view`、`std::filesystem`、并行算法。
- 升级关注：`std::string_view` 和 `std::optional` 不解决生命周期问题；接口设计仍需明确所有权和引用有效期。

## C++14

- 对 C++11 的增量版本，适合作为从旧工具链迁移到现代 C++ 时的过渡基线。
- 语言：泛型 lambda、lambda 初始化捕获、函数返回类型推导、变量模板。
- 标准库：`std::make_unique`、透明比较器完善、字面量和 `<chrono>` 补充。

## C++11

- 现代 C++ 的主要起点。
- 语言：`auto`、范围 `for`、lambda、右值引用、移动语义、`constexpr`、`nullptr`、强类型枚举、variadic templates。
- 标准库：`std::unique_ptr`、`std::shared_ptr`、线程与同步原语、`std::future`、`std::chrono`、无序容器。
- 升级关注：优先理解 RAII、移动语义和所有权；不要将智能指针当作裸指针的机械替代品。

## C++03

- 以 C++98 的技术勘误、缺陷修正和措辞澄清为主，没有 C++11 级别的大规模新语言能力。
- `__cplusplus` 仍为 `199711L`，不能仅依赖该宏区分 C++98 与 C++03。

## C++98

- 首个 ISO C++ 标准。
- 固化类、模板、异常和 STL 等早期 C++ 核心能力。
- 现有项目通常仅因旧平台、旧 ABI 或遗留依赖而保留该语言模式。

## 参考

- [C++ Standard](https://isocpp.org/std/the-standard)
  - 当前已发布标准、版本命名和 working draft 说明
- [WG21 Standards](https://www.open-std.org/jtc1/sc22/wg21/docs/standards.html)
  - ISO/IEC 14882 各已发布版本及公开草案索引
- [C++ Compiler Support](https://en.cppreference.com/w/cpp/compiler_support)
  - GCC、Clang、MSVC 等对语言和标准库特性的支持矩阵
- [Feature-testing macros](https://en.cppreference.com/w/cpp/feature_test)
  - `__cpp_*` 与 `__cpp_lib_*` 的特性级检测方式
- [Preprocessor](https://en.cppreference.com/w/cpp/preprocessor/replace)
  - `__cplusplus` 的版本值及预定义宏说明
- [GCC C++ Dialect Options](https://gcc.gnu.org/onlinedocs/gcc/C-Dialect-Options.html)
- [Clang C++ Language Status](https://clang.llvm.org/cxx_status.html)
- [MSVC `/Zc:__cplusplus`](https://learn.microsoft.com/zh-cn/cpp/build/reference/zc-cplusplus?view=msvc-170)
