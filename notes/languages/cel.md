---
title: CEL
tags:
  - DSL
---

# CEL

- CEL - [Common Expression Language](https://github.com/google/cel-spec)
  - Apache 2.0, 多语言
  - Google 开发的表达式语言，用于配置和策略评估
  - 支持类型安全、沙盒执行、高性能
  - 广泛用于 Kubernetes、Envoy、Istio 等项目
- 实现
  - [google/cel-go](https://github.com/google/cel-go) - Go 实现
  - [ChromeGG/cel-js](https://github.com/ChromeGG/cel-js) - JavaScript/TypeScript 实现
  - [google/cel-cpp](https://github.com/google/cel-cpp) - C++ 实现
  - [google/cel-java](https://github.com/google/cel-java) - Java 实现
- 参考
  - 文档: https://cel.dev/
  - Playground: https://playcel.undistro.io/
  - 规范: https://github.com/google/cel-spec

```cel
// 字面量
true, false                                    // 布尔值
42, 3.14                                       // 数字
"hello", 'world'                              // 字符串
b"bytes"                                       // 字节
[1, 2, 3]                                      // 列表
{"key": "value", "num": 42}                   // 映射

// 变量和字段访问
user.name                                      // 字段访问
user.address.city                              // 嵌套字段
users[0].name                                  // 列表索引
settings["timeout"]                            // 映射访问

// 函数调用
size(list)                                     // 函数调用
substring(text, 0, 5)                         // 带参数函数
user.hasRole("admin")                          // 方法调用

// 宏使用
list.all(x, x > 0)                            // 检查所有元素
map.exists(k, k.startsWith("test"))           // 检查存在元素
items.filter(x, x.status == "active")         // 过滤元素
users.map(u, u.name)                          // 映射转换

// 复杂表达式
(user.age >= 18 && user.hasRole("member")) ||
(user.isAdmin == true)                        // 逻辑组合

order.total > 100 ? "premium" : "standard"     // 条件表达式

size(items.filter(item,
  item.price < 50 && item.category in ["electronics", "books"]
))                                             // 嵌套调用
```

## 操作符

| 操作符 | 描述       | 示例                        |
| ------ | ---------- | --------------------------- |
| `&&`   | 逻辑与     | `a && b`                    |
| `\|\|` | 逻辑或     | `a \|\| b`                  |
| `!`    | 逻辑非     | `!a`                        |
| `==`   | 等于       | `a == b`                    |
| `!=`   | 不等于     | `a != b`                    |
| `<`    | 小于       | `a < b`                     |
| `<=`   | 小于等于   | `a <= b`                    |
| `>`    | 大于       | `a > b`                     |
| `>=`   | 大于等于   | `a >= b`                    |
| `+`    | 加法/连接  | `a + b`                     |
| `-`    | 减法/取负  | `a - b` 或 `-a`             |
| `*`    | 乘法       | `a * b`                     |
| `/`    | 除法       | `a / b`                     |
| `%`    | 取模       | `a % b`                     |
| `?:`   | 条件运算符 | `condition ? a : b`         |
| `[]`   | 列表索引   | `list[0]`                   |
| `[]`   | 映射访问   | `map.key` 或 `map["key"]`   |
| `in`   | 成员检查   | `x in list` 或 `key in map` |

CEL 内置函数分为**核心函数**和**扩展库**。核心函数自动包含，扩展库需要显式启用。

| 函数签名                                                                             | 类别                 | 描述                     |
| ------------------------------------------------------------------------------------ | -------------------- | ------------------------ |
| `getHours(timestamp: timestamp): int`                                                | 核心                 | 获取小时                 |
| `getMinutes(timestamp: timestamp): int`                                              | 核心                 | 获取分钟                 |
| `getSeconds(timestamp: timestamp): int`                                              | 核心                 | 获取秒                   |
| `getMilliseconds(value: timestamp\|duration): int`                                   | 核心                 | 获取毫秒                 |
| `has(field: message.field\|map.key): bool`                                           | 宏                   | 检查字段/键是否存在      |
| `all(iterable: list\|map, predicate: function): bool`                                | 宏                   | 检查所有元素满足谓词     |
| `exists(iterable: list\|map, predicate: function): bool`                             | 宏                   | 检查存在元素满足谓词     |
| `exists_one(iterable: list\|map, predicate: function): bool`                         | 宏                   | 检查恰好一个元素满足谓词 |
| `map(iterable: list\|map, transform: function): T`                                   | 宏                   | 映射转换元素             |
| `map(iterable: list\|map, predicate: function, transform: function): T`              | 宏                   | 条件映射转换             |
| `filter(iterable: list\|map, predicate: function): T`                                | 宏                   | 过滤元素                 |
| `charAt(str: string, index: int): string`                                            | Strings              | 获取指定位置字符         |
| `indexOf(str: string, substr: string): int`                                          | Strings              | 查找子串首次出现位置     |
| `lastIndexOf(str: string, substr: string): int`                                      | Strings              | 查找子串最后出现位置     |
| `lowerAscii(str: string): string`                                                    | Strings              | 转小写 (ASCII)           |
| `upperAscii(str: string): string`                                                    | Strings              | 转大写 (ASCII)           |
| `replace(str: string, old: string, new: string): string`                             | Strings              | 替换子串                 |
| `split(str: string, sep: string): list<string>`                                      | Strings              | 分割字符串               |
| `substring(str: string, start: int, end?: int): string`                              | Strings              | 截取子串                 |
| `trim(str: string): string`                                                          | Strings              | 去除首尾空白             |
| `join(strings: list<string>, sep?: string): string`                                  | Strings              | 连接字符串列表           |
| `reverse(str: string): string`                                                       | Strings              | 反转字符串               |
| `format(template: string, args: list): string`                                       | Strings              | 格式化字符串             |
| `quote(str: string): string`                                                         | Strings              | 引用字符串               |
| `slice(list: list, start: int, end: int): list`                                      | Lists                | 切片                     |
| `flatten(list: list, depth?: int): list`                                             | Lists                | 展平嵌套列表             |
| `distinct(list: list): list`                                                         | Lists                | 去重                     |
| `range(count: int): list<int>`                                                       | Lists                | 生成整数列表             |
| `reverse(list: list): list`                                                          | Lists                | 反转列表                 |
| `sort(list: list): list`                                                             | Lists                | 排序                     |
| `greatest(...values: number): number`                                                | Math                 | 最大值                   |
| `least(...values: number): number`                                                   | Math                 | 最小值                   |
| `abs(value: number): number`                                                         | Math                 | 绝对值                   |
| `sign(value: number): int`                                                           | Math                 | 符号                     |
| `ceil(value: double): double`                                                        | Math                 | 向上取整                 |
| `floor(value: double): double`                                                       | Math                 | 向下取整                 |
| `round(value: double): double`                                                       | Math                 | 四舍五入                 |
| `trunc(value: double): double`                                                       | Math                 | 截断                     |
| `sqrt(value: double): double`                                                        | Math                 | 平方根                   |
| `isInf(value: double): bool`                                                         | Math                 | 检查无穷大               |
| `isNaN(value: double): bool`                                                         | Math                 | 检查非数字               |
| `isFinite(value: double): bool`                                                      | Math                 | 检查有限数               |
| `bitOr(left: int, right: int): int`                                                  | Math                 | 位或                     |
| `bitAnd(left: int, right: int): int`                                                 | Math                 | 位与                     |
| `bitXor(left: int, right: int): int`                                                 | Math                 | 位异或                   |
| `bitNot(value: int): int`                                                            | Math                 | 位非                     |
| `bitShiftLeft(value: int, shift: int): int`                                          | Math                 | 左移位                   |
| `bitShiftRight(value: int, shift: int): int`                                         | Math                 | 右移位                   |
| `encode(data: bytes): string`                                                        | Encoders             | Base64 编码              |
| `decode(data: string): bytes`                                                        | Encoders             | Base64 解码              |
| `contains(left: list, right: list): bool`                                            | Sets                 | 检查包含关系             |
| `equivalent(left: list, right: list): bool`                                          | Sets                 | 检查集合等价             |
| `intersects(left: list, right: list): bool`                                          | Sets                 | 检查交集                 |
| `replace(target: string, pattern: string, replacement: string, count?: int): string` | Regex                | 正则替换                 |
| `extract(target: string, pattern: string): string`                                   | Regex                | 正则提取首次匹配         |
| `getExt(msg: message, extension: string): any`                                       | Protos               | 获取扩展字段             |
| `hasExt(msg: message, extension: string): bool`                                      | Protos               | 检查扩展字段存在         |
| `bind(varName: string, initExpr: any, resultExpr: any): any`                         | Bindings             | 绑定局部变量             |
| `all(...)`                                                                           | TwoVarComprehensions | 测试宏                   |
| `exists(...)`                                                                        | TwoVarComprehensions | 测试宏                   |
| `existsOne(...)`                                                                     | TwoVarComprehensions | 测试宏                   |
| `transformList(...)`                                                                 | TwoVarComprehensions | 转换宏                   |
| `transformMap(...)`                                                                  | TwoVarComprehensions | 转换宏                   |
| `transformMapEntry(...)`                                                             | TwoVarComprehensions | 转换宏                   |
| `string(value: any): string`                                                         | 类型转换             | 转字符串                 |
| `timestamp(value: string): timestamp`                                                | 类型转换             | 转时间戳                 |
| `type(value: any): string`                                                           | 类型转换             | 获取类型                 |
| `uint(value: number\|string): uint`                                                  | 类型转换             | 转无符号整数             |
