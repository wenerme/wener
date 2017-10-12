# Lua

## Tips
* 不能直接为 Table 添加额外方法, 因为每个 Table 都有自己的 Metadata

```lua
-- 自定义加载目录
package.path = package.path .. ';/data/lua/?.lua'
T = require("t")

-- dotfile 可以直接使用绝对路径
dofile("/data/lua/my")
```

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
