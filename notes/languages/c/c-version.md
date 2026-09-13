---
title: C Version
tags:
  - Version
---

# C Version

- 当前正式标准：C23（ISO/IEC 9899:2024）。
- C2Y 是后续标准的工作草案，尚未发布 ISO 标准。

| version         | ISO publication / status     | `__STDC_VERSION__` | 重点                                                   |
| --------------- | ---------------------------- | ------------------ | ------------------------------------------------------ |
| [C2Y](#c2y)     | working draft                | 实现相关           | 下一版标准，实验性支持                                 |
| [C23](#c23)     | ISO/IEC 9899:2024            | `202311L`          | `nullptr`、属性、`constexpr`、类型推导和新标准库头文件 |
| [C17](#c17)     | ISO/IEC 9899:2018            | `201710L`          | C11 缺陷修正，基本没有大型新语言特性                   |
| [C11](#c11)     | ISO/IEC 9899:2011            | `201112L`          | 原子操作、内存模型、线程接口、`_Static_assert`         |
| [C99](#c99)     | ISO/IEC 9899:1999            | `199901L`          | 混合声明、VLA、指定初始化、`//` 注释                   |
| [C95](#c95)     | ISO/IEC 9899:1990/Amd.1:1995 | `199409L`          | C90 修订、宽字符和国际化相关补充                       |
| [C90](#c90)/C89 | ISO/IEC 9899:1990            | 未定义             | 第一版 ISO C 标准                                      |

- `-std=c2y`、`-std=gnu2y`

```bash
# ISO C23：关闭与标准冲突的 GNU 扩展
cc -std=c23 -Wall -Wextra -Wpedantic -O2 main.c -o main

# GNU C23：保留 GNU 扩展
cc -std=gnu23 -Wall -Wextra -O2 main.c -o main
```

## Standard Detection

```c
#if !defined(__STDC_VERSION__)
// C90 或非标准模式；C90 没有定义 __STDC_VERSION__。
#elif __STDC_VERSION__ >= 202311L
// C23 或更高版本。
#elif __STDC_VERSION__ >= 201710L
// C17。
#elif __STDC_VERSION__ >= 201112L
// C11。
#elif __STDC_VERSION__ >= 199901L
// C99。
#endif
```

## C2Y

- C2Y 是 C23 之后标准修订的开发代号，特性和最终版本仍在演进。
- GCC 使用 `-std=c2y` 或 `-std=gnu2y` 提供实验性、不完整支持；编译器之间的选项名和支持范围可能不同。
- 生产代码不应依赖尚未进入已发布标准的 C2Y 特性，除非已经锁定工具链并准备兼容性回退方案。

## C23

- 语言：`nullptr`、`true` / `false` / `bool` 关键字、属性语法 `[[...]]`、`constexpr`、`typeof`、`auto` 类型推导、二进制整数常量和数字分隔符。
- 预处理器：增加 `#elifdef`、`#elifndef` 等条件分支形式，并标准化更多诊断能力。
- 标准库：增加或完善 `<stdbit.h>`、`<stdckdint.h>` 等整数和位操作支持；部分实现仍在补齐。
- 兼容性：移除旧式函数定义等过时能力，`_Noreturn` 等部分旧写法进入弃用路径；旧代码应使用明确的函数原型和标准属性逐步迁移。
- 工具链：GCC 使用 `-std=c23` 选择 ISO C23，`-std=gnu23` 选择带 GNU 扩展的 C23；其他编译器的支持矩阵需要单独确认。

## C17

- C17 主要整合 C11 的缺陷报告和措辞修正，语言能力基本与 C11 相同。
- `__STDC_VERSION__` 从 C11 的 `201112L` 变为 `201710L`，可以用于区分编译模式。
- 迁移时重点检查编译器对 C11 缺陷修正的默认处理，以及项目是否错误依赖了编译器扩展或未定义行为。

## C11

- 语言：`_Static_assert`、`_Generic`、`_Atomic`、`_Thread_local`、`_Alignas` / `_Alignof`、匿名结构体和联合体。
- 并发：定义了原子操作、内存模型以及 `<threads.h>` 线程接口；不同平台对线程库部分的支持并不一致。
- 标准库：线程本地存储、原子类型、Unicode 相关接口、边界检查接口等能力被纳入标准，其中部分属于可选支持。
- 升级关注：不要仅因编译器支持 `_Atomic` 就假定平台完整支持 C11 线程 API；应分别验证编译器和 libc。

## C99

- 语言：`//` 注释、允许在语句中声明变量、变长数组、指定初始化、复合字面量、`inline`、`restrict`、柔性数组成员。
- 类型和数值：`_Bool`、`<stdbool.h>`、复数类型、十六进制浮点常量、整数类型宽度定义。
- 标准库：`<stdint.h>`、`<inttypes.h>`、`<tgmath.h>`、`snprintf` 等能力得到标准化或补充。
- 升级关注：VLA 的栈使用量和生命周期应明确；指定初始化、混合声明等语法可能触发旧编译器兼容问题。

## C95

- C90 的修订和增补，正式形式为 ISO/IEC 9899:1990/Amd.1:1995，也常称为 C94 或 C95。
- 增加了 digraphs、宽字符和国际化相关内容，并引入 `__STDC_VERSION__`。
- GCC 中可以通过 `-std=iso9899:199409` 选择该方言；实际项目较少单独以 C95 为目标。

## C90

- 首个 ISO C 标准，通常也称为 ANSI C89 / ISO C90。
- 固化函数原型、标准库接口、结构化程序设计和预处理器等传统 C 基础。
- 现代项目保留 C90 通常是因为旧编译器、嵌入式环境、协议实现或长期 ABI 兼容要求。

## 参考

- [ISO/IEC JTC1/SC22/WG14 Project Status](https://open-std.org/JTC1/SC22/WG14/www/projects.html)
  - C 标准各版本、公开草案和项目状态
- [WG14](https://open-std.org/jtc1/sc22/wg14/)
  - ISO C 标准工作组入口
- [C History](https://en.cppreference.com/c/language/history)
  - C90、C95、C99、C11、C17、C23 的历史和特性索引
- [C23](https://en.cppreference.com/c/23)
  - C23 新特性、移除和弃用内容
- [GCC Standards](https://gcc.gnu.org/onlinedocs/gcc/Standards.html)
  - GCC 支持的 C 标准、`-std` 选项和 GNU 方言
- [GCC C Standards Support](https://gcc.gnu.org/projects/c-status.html)
  - GCC 对 C90、C99、C11、C17、C23 和 C2Y 的实现状态
