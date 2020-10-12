---
id: lua
title: Lua
---

# Lua

## Tips
- [lua/lua](https://github.com/lua/lua)
- [5.4/manual](https://www.lua.org/manual/5.4/manual.html)
- 注意
  - 不能直接为 Table 添加额外方法, 因为每个 Table 都有自己的 Metadata
- 参考
  - [openresty/luajit2](https://github.com/openresty/luajit2) - OpenResty 的 LuaJIT fork

```lua
-- 自定义加载目录
package.path = package.path .. ';/data/lua/?.lua'
T = require("t")

-- dotfile 可以直接使用绝对路径
dofile("/data/lua/my")
```

## 语法

```lua
-- 类
Dog = {}

function Dog:new()
  local newObj = {sound = 'woof'}
  self.__index = self
  return setmetatable(newObj, self)
end

function Dog:makeSound()
  print('I say ' .. self.sound)
end
-- : 等同于
function Dog.makeSound(self)
  print('I say ' .. self.sound)
end

-- 继承
LoudDog = Dog:new()

-- 可选
function LoudDog:new()
  local newObj = {}
  -- 初始化 newObj
  self.__index = self
  return setmetatable(newObj, self)
end
function LoudDog:makeSound()
  local s = self.sound .. ' '
  print(s .. s .. s)
end

-- mod.lua
local M = {}
function M.func()
  return true
end
return M

-- 依赖模块
-- require 会缓存
-- dofile 不会缓存
-- loadfile 不执行，返回函数 - 类似于 loadstring
local mod = require('mod')
-- 等价于
local mod = (function ()
  -- mod.lua 内容
  local M = {}
  function M.func()
    return true
  end
  return M
end)()
```

## metatable

- 元表 - 操作重载

| method                | demo      |
| --------------------- | --------- |
| `__add(a, b)`         | `a + b`   |
| `__sub(a, b)`         | `a - b`   |
| `__mul(a, b)`         | `a * b`   |
| `__div(a, b)`         | `a / b`   |
| `__mod(a, b)`         | `a % b`   |
| `__pow(a, b)`         | `a ^ b`   |
| `__unm(a)`            | `-a`      |
| `__concat(a, b)`      | `a .. b`  |
| `__len(a)`            | `#a`      |
| `__eq(a, b)`          | `a == b`  |
| `__lt(a, b)`          | `a < b`   |
| `__le(a, b)`          | `a <= b`  |
| `__index(a, b)`       | `a.b`     | fn(tbl,key) or a table |
| `__newindex(a, b, c)` | `a.b = c` |
| `__call(a, ...)`      | `a(...)`  |
| `__gc`                |           |
| `__close`             |           |
| `__mode`              |           |
| `__name`              |           |

## Helper

```lua
---------------------------------------------
---- Lua Table Helper
---------------------------------------------
local table_meta = { __index = table }
function T(t)
    -- returns the table passed as parameter or a new table
    -- with custom metatable already set to resolve methods in `table`
    return setmetatable(t or {}, table_meta)
end

table.T = T

function table.filter(tab, f)
    if type(f) ~= 'function' then
        local _v = f
        f = function(v, i) return v == _v end
    end

    local t = T {}
    for k, v in pairs(tab) do
        if not f(v) then
            t[#t + 1] = v
        end
    end
    return t
end

function table.map(tab, fn)
    for k, v in pairs(tab) do
        tab[k] = fn(v, k)
    end
    return tab
end

function string:split(sep)
    local sep, fields = sep or ",", T {}
    local pattern = string.format("([^%s]+)", sep)
    self:gsub(pattern, function(c) fields[#fields + 1] = c end)
    return fields
end

return T
```
