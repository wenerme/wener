---
title: Go 模板
---

# Go 模板

:::tip

- GoLand 支持添加类型注释 `{{/* gotype: entgo.io/ent/entc/gen.Graph */}}`
  - 添加后可对模板进行补全
- 推荐使用 `.gohtml`, `.gotpl`, `.tmpl`，  后缀

:::

- https://gotemplate.io/
  - wasm 编译的在线 template 渲染


## 语法

| Syntax                                                          | Description                                                          |
| --------------------------------------------------------------- | -------------------------------------------------------------------- |
| `{{"a" -}} b {{- "c"}}`                                         | 移除空白                                                             |
| `{{/* a comment */}}`                                           | 注释                                                                 |
| `{{pipeline}}`                                                  | 管道                                                                 |
| `{{if pipeline}} A {{else if pipeline}} B {{else}} C {{end}}`   | If-Then-Else                                                         |
| `{{range pipeline}} T1 {{else}} T0 {{end}}`                     | 遍历 array、slice、map、channel，当长度为 0 使用 else 部分           |
| `{{template "name" pipeline}}`                                  | 引入其他模板，可携带参数                                             |
| `{{define "name"}} T1 {{end}}`                                  | 定义模板用于 template 引入                                           |
| `{{block "name" pipeline}} T1 {{end}}`                          | 等于 define + template，用于实现默认，block 定义的模板可以被再次定义 |
| `{{with pipeline}} T1 {{else}} T0 {{end}}`                      | 设置 `.` 作用域，如果结果为空使用 else                               |
| `.`                                                             | 当前上下文                                                           |
| `$`                                                             | 当前模板 root 上下文                                                 |
| `{{ $v:= pipeline }}`                                           | 定义变量                                                             |
| `print (.F1 arg1) (.F2 arg2) (.StructValuedMethod "arg").Field` | 可以括号、对象可以通过 `.` 访问、可以直接调用函数                    |

## 内建函数

- 逻辑 and、or、not
- 比较 eq、ne、lt、le、gt、ge
- 输出 print、printf、println
- call
- html - HTMLEscaper
- index - 索引访问 - map、slice、array
- slice - 切分第一个参数
  - `slice x 1 2` -> `x[1:2]`
- js - JSEscaper - 返回转义后的 JS
- len - 返回长度
- urlquery - URLQueryEscaper - URL 编码
- print, printf, println

## sprig

- Go [Playground](https://play.golang.org/p/bbQDtcGKWFf)
