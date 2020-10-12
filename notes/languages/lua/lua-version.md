---
id: lua-version
title: Lua 版本
---

# Lua 版本
* LuaJIT 停留在 5.1

## 5.4
* [Changes](https://www.lua.org/manual/5.4/readme.html#changes)
  * [HN](https://news.ycombinator.com/item?id=23686297)
* 实现
  * 新的 GC
  * math.random 新实现
  * 告警系统
  * utf8 codepoint 支持到 2^31
  * allocation function allowed to fail when shrinking a memory block
  * debug information about function arguments and returns
* 语言
  * const 变量
  * userdata can have multiple user values
  * 新的 for 数字循环语法
  * to-be-closed variables
* 库
  * string.gmatch 参数 init 可选
  * string.format 新增 `%p`
  * string-to-number coercions moved to the string library
* C API
  * 新增函数 lua_resetthread coroutine.close

## 5.3
* [Changes](https://www.lua.org/manual/5.3/readme.html#changes)
* 实现
  * 整数默认 64 位
  * official support for 32-bit numbers
  * bitwise operators
  * 基础 utf-8 支持
  * functions for packing and unpacking values
* 语言
  * userdata can have any Lua value as uservalue
  * floor division
  * more flexible rules for some metamethods
* Libraries
  * ipairs and the table library respect metamethods
  * strip option in string.dump
  * table library respects metamethods
  * 新方法
    * table.move
    * string.pack
    * string.unpack
    * string.packsize
* C API
  * simpler API for continuation functions in C
  * lua_gettable and similar functions return type of resulted value
  * strip option in lua_dump
  * 新方法
    * lua_geti
    * lua_seti
    * lua_isyieldable
    * lua_numbertointeger
    * lua_rotate
    * lua_stringtonumber
  * Lua standalone interpreter
  * 可用于计算器 - 不再需要添加 `=` 前缀
  * arg table available to all code
