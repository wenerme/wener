---
title: Lua Awesome
tags:
- Awesome
---

# Lua Awesome

- 参考
  - [MegaBedder/my-awesome-lua](https://github.com/MegaBedder/my-awesome-lua)

## Runtime

- [LuaJIT/LuaJIT](https://github.com/LuaJIT/LuaJIT)
  - Lua 5.1
- [openresty/luajit2](https://github.com/openresty/luajit2)
  - OpenResty fork LuaJIT

## Lua VM Internal

- [Lua VM FAQ](https://gist.github.com/zeux/bb646a63c02ff2828117092036d2d174)
- [Lua 5.3 Bytecode Reference](https://the-ravi-programming-language.readthedocs.io/en/latest/lua_bytecode_reference.html)
- [Lua Bytecode Explorer](https://www.luac.nl/)

## Run In Other Language

- [Shopify/go-lua](https://github.com/Shopify/go-lua)
  - Lua 5.2 VM in Go
  - 执行 luac 编译结果
  - fib(35) 6x 慢于 lua, 20% 快于 gopher-lua
    - tail-recursive
- [yuin/gopher-lua](https://github.com/yuin/gopher-lua)
  - Lua 5.1 VM and Compiler
- [aarzilli/golua](https://github.com/aarzilli/golua)
  - Go bindings for Lua C API

## stdlib

- [os](http://lua-users.org/wiki/OsLibraryTutorial)
- [io](http://lua-users.org/wiki/IoLibraryTutorial)
- [math](http://lua-users.org/wiki/MathLibraryTutorial)
- [table](http://lua-users.org/wiki/TableLibraryTutorial)
- [string](http://lua-users.org/wiki/StringLibraryTutorial)
- Lua 5.3 [stdlib](https://www.lua.org/manual/5.3/manual.html#6)
