---
title: JSON Patch
---



# JSON Patch

- rfc6902

```json
[
  { "op": "test", "path": "/a/b/c", "value": "foo" },
  { "op": "remove", "path": "/a/b/c" },
  { "op": "add", "path": "/a/b/c", "value": ["foo", "bar"] },
  { "op": "replace", "path": "/a/b/c", "value": 42 },
  { "op": "move", "from": "/a/b/c", "path": "/a/b/d" },
  { "op": "copy", "from": "/a/b/d", "path": "/a/b/e" }
]
```


| op      | args            | desc                                       |
| ------- | --------------- | ------------------------------------------ |
| add     | `path`, `value` | 在指定路径添加值或将元素插入数组           |
| remove  | `path`          | 移除指定路径的值                           |
| replace | `path`, `value` | 替换指定路径的值                           |
| move    | `from`, `path`  | 将值从 `from` 移动到 `path`                |
| copy    | `from`, `path`  | 将值从 `from` 复制到 `path`                |
| test    | `path`, `value` | 测试指定路径的值是否与给定的 `value` 相等 |

- from, path 是  JSON Pointer - RFC6901
