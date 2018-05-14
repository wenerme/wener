# CMake

* [Wiki](https://cmake.org/Wiki/CMake)
* 交叉编译
  * Ubuntu + Mingw
  * Ubuntu [mingw-w64](http://packages.ubuntu.com/search?keywords=mingw-w64)
  * Ubuntu mingw-w64-x86-64 [Dockerfile](https://github.com/purpleKarrot/build-containers/blob/master/mingw-w64-x86-64/Dockerfile)


* FAQ
  * http://stackoverflow.com/questions/7461000/handling-header-files-dependencies-with-cmake



* [How To Write Platform Checks](https://cmake.org/Wiki/CMake:How_To_Write_Platform_Checks)
* [Useful_Variables](https://cmake.org/Wiki/CMake_Useful_Variables)
* [CheckCSourceCompiles](https://cmake.org/cmake/help/v3.0/module/CheckCSourceCompiles.html)
  * 使用编译来做 check
  * [类似检测](https://cmake.org/cmake/help/v2.8.10/cmake.html#module:CheckCSourceCompiles)
* [CMakeTestInline](https://cmake.org/Wiki/CMakeTestInline)
* [CMake 入门](https://zh.wikibooks.org/wiki/CMake_%E5%85%A5%E9%96%80)

* [GNUInstallDirs](https://cmake.org/cmake/help/v3.0/module/GNUInstallDirs.html)
  * 安装时使用的一些目录常量
  * 在 pkg-config 生成的时候也会用到
* Commands
  * [string](https://cmake.org/cmake/help/latest/command/string.html)
* References
  * [GNUInstallDirs](https://cmake.org/cmake/help/latest/module/GNUInstallDirs.html)
* 模块
  * [Kitware/CMake/Modules](https://github.com/Kitware/CMake/blob/master/Modules)
    * 官方模块
  * [bro/cmake](https://github.com/bro/cmake)
    * a collection of CMake scripts
  * [IoLanguage/io/modules](https://github.com/IoLanguage/io/tree/master/modules)

```bash
# 生成依赖图
cmake . --graphviz=deps.dot
# -T 也支持 ps
dot -Tpng deps.dot -o deps.png

# 显示 target
cmake --build . --target help

# 修改安装路径
cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr .

```

http://www.aosabook.org/en/cmake.html


```
ENABLE_AVX
ENABLE_AVX2
ENABLE_CCACHE
ENABLE_COVERAGE
ENABLE_FAST_MATH
ENABLE_FMA3
ENABLE_GNU_STL_DEBUG
ENABLE_IMPL_COLLECTION
ENABLE_INSTRUMENTATION
ENABLE_NOISY_WARNINGS
ENABLE_POPCNT
ENABLE_PROFILING
ENABLE_SOLUTION_FOLDERS
ENABLE_SSE
ENABLE_SSE2
ENABLE_SSE3
ENABLE_SSE41
ENABLE_SSE42
ENABLE_SSSE3
```

If I understand it well then HAL is just a convenient, IPP-like, low-level API to accelerate OpenCV for different platforms (by hiding low-level operations i.e. core, imgproc, … => HAL) and to enable hardware vendors to implement accelerated imaging and vision algorithms.

Intel IPP software building blocks are highly optimized instruction sets (using Intel AVX, AVX2 and SSE).It offers a special subset of functions for image processing and computer vision called the IPP-ICV libraries. More information can be found here. Also here you can find some information about speedup.

If real-time processing is not critical in your project or its performance is enough you can safely disable it.


## FAQ
### 如何为 add_custom_command 添加环境变量
* [#5145](https://cmake.org/Bug/view.php?id=5145)
```
add_custom_target(newtarget ${CMAKE_COMMAND} -E env NAME=VALUE somecommand)
```

### 并行构建
* [How to configure portable parallel builds in CMake?](https://stackoverflow.com/questions/10688549)


```bash
mkdir build
cd    build
cmake –G”Unix Makefiles” ../src
make –j5

mkdir build
cd    build
cmake -G Ninja ..
ninja             # Parallel build (no need -j12)

mkdir build
cd    build
cmake -G Ninja ..
cmake --build .   # Parallel build using ninja
```

### 配置文件
https://cmake.org/cmake/help/latest/command/configure_file.html

```
#cmakedefine HAVE_FEATURE_A @Feature_A_FOUND@
#cmakedefine HAVE_FEATURE_B @Feature_B_FOUND@
#cmakedefine HAVE_FEATURE_BITS @B_BITSIZE@
```

```
configure_file(config.h.in config.h)
```

