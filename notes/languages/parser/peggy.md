---
title: peggy
---

# peggy

- [peggyjs/peggy](https://github.com/peggyjs/peggy)
  - [PEG.js](./pegjs.md) 后继
- 参考
  - https://peggyjs.org/online
  - [metadevpro/ts-pegjs](https://github.com/metadevpro/ts-pegjs)
    - TS code generation plugin for peggy
- PEG.js 之后新功能
  - Global Initializers `{{}}`
  - value plucking `@`
  - typescript
  - source maps

| syntax                     | for                          |
| -------------------------- | ---------------------------- |
| `"a"`,`'a'`                | 匹配 a                       |
| `'a'i`                     | 匹配 a 或 A                  |
| .                          | 匹配任意                     |
| `[ab]`                     | 匹配 a 或 b                  |
| `<rule>`                   | 匹配 rule                    |
| `(expr)`                   |
| `expr *`,`expr +`,`expr ?` |
| `& expr`                   | lookahead                    |
| `! expr`                   | negative lookahead           |
| `& { predicate }`          | positive assertion - js 脚本 |
| `! { predicate }`          | negative assertion - js 脚本 |
| `$ expr`                   | 匹配返回 `text()` - 语法糖   |
| `label: expr`              | 定义 label/变量              |
| `@(label:)? expr`          | 返回 label 作为内容 - pluck  |
| `expr1 expr2`              | 顺序匹配                     |
| `expr { action }`          | 执行脚本                     |
| `expr1 / expr2`            |

```
expression |count|
expression |min..max|
expression |count, delimiter|
expression |min..max, delimiter|
```

- min,max,count 可以是 label/变量/code block

```pegjs
start = "a"|{ return options.count; }|;
```

```pegjs
// 手写
Values = next:(a:Value _ b:(_ ',' _ next:Value {return next})* ','? {return b?[a,...b]:a})? {return next || []}
// repeat
Values = next:(Value|..,","|)  ','?  {return next || []}
```

---

- Action Execution Environment
  - `()` 会形成变量作用域
  - input - parse 参数
  - options - parse 参数
  - `error(message,where=location())` - 返回错误
  - `expected(message, where=location())`
  - `location()` - `{source:options.grammarSource,start:{offset,line,column},end}`
  - `range()`
  - `offset()`
  - `text()`

```pegjs
{{
  // 全局初始化 - 定义的方法和变量全局有效
}}

{
  // parser 初始化
}

list = head:word tail:(_ "," _ @word)* { return [head, ...tail]; }
word = $[a-z]i+
_ = [ \t]*
```
