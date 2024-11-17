---
title: peggy
---

# peggy

- [peggyjs/peggy](https://github.com/peggyjs/peggy)
  - [PEG.js](./pegjs.md) 后继
- 参考
  - https://github.com/peggyjs/peggy/blob/main/src/parser.pegjs
  - https://peggyjs.org/online
  - [metadevpro/ts-pegjs](https://github.com/metadevpro/ts-pegjs)
    - TS code generation plugin for peggy
- PEG.js 之后新功能
  - Global Initializers `{{}}`
    - 全局
    - `{}` 初始化是每次 parse 都会创建 - 能访问 **options**
  - value plucking `@`
  - typescript
  - source maps
- options
  - grammarSource
  - startRule

```bash
npx -y peggy ./parser.pegjs --format es
```

| flag                               | for                                       |
| ---------------------------------- | ----------------------------------------- |
| `--allowed-start-rules <rules>`    | 默认第一个,逗号分隔指定多个,`*` for all   |
| `--ast`                            | 输出内部 AST 代替 parser 源码             |
| `--cache`                          | 缓存结果,避免指数级解析时间,但解析会更慢  |
| `-d, --dependency <[name:]module>` | 依赖                                      |
| `-D, --dependencies <json>`        | 依赖                                      |
| `--dts`                            | 生成 .d.ts 文件                           |
| `-e, --export-var <variable>`      | 全局变量                                  |
| `--extra-options <options>`        | 额外选项 for peg.generate, json object    |
| `-c, --extra-options-file <file>`  | 额外选项                                  |
| `--format <format>`                | 输出格式, amd, commonjs, globals, umd, es |
| `-o, --output <file>`              | 输出文件                                  |
| `--plugin`                         | 插件                                      |
| `-m, --source-map <file>`          | 生成 source map                           |
| `--return-types <JSON object>`     | 返回类型, for `--dts`                     |
| `-S, --start-rule <rule>`          | 指定 start rule                           |
| `-t, --test <text>`                | 测试                                      |
| `-T, --test-file <text>`           | 测试                                      |
| `--trace`                          | 追踪                                      |
| `-w,--watch`                       | 监听                                      |

```js title='config.cjs'
module.exports = {
  allowedStartRules = ["foo", "bar"],
  format: "umd",
  exportVar: "foo",
  input: "fooGrammar.peggy",
  plugins: [require("./plugin.js")],
  testFile: "myTestInput.foo",
  trace: true,
};
```

```ts title='plugin.ts'
export function use(config:{parser:Parser,reservedWords,passes:{ [stage: string]: Pass[] } }, options) => {
}
```

```js
import peggy from 'peggy';
const parser = peggy.generate("start = ('a' / 'b')+");

const parser = peggy.generate([
  { source: 'file1.peggy', text: "numbers = number|.., ','|" },
  { source: 'lib.peggy', text: 'number = n:$[0-9]+ { return parseInt(n, 10) }' },
]);
```

| syntax                     | for                            |
| -------------------------- | ------------------------------ |
| `"a"`,`'a'`                | 匹配 a                         |
| `'a'i`                     | 匹配 a 或 A                    |
| .                          | 匹配任意                       |
| `!.`                       | EOF, EOI, End of Input         |
| `[ab]`                     | 匹配 a 或 b                    |
| `<rule>`                   | 匹配 rule                      |
| `(expr)`                   | 分组                           |
| `expr *`,`expr +`,`expr ?` | 重复                           |
| `& expr`                   | positive assertion, lookahead  |
| `! expr`                   | negative assertion, lookahead  |
| `& { predicate }`          | code block                     |
| `! { predicate }`          | code block                     |
| `$ expr`                   | -> `{return text();}` - 语法糖 |
| `label: expr`              | 定义 label/变量                |
| `@(label:)? expr`          | 返回 label 作为内容 - pluck    |
| `expr1 expr2`              | 顺序匹配                       |
| `expr { action }`          | 执行脚本                       |
| `expr1 / expr2`            | alternate , choose             |
| `expr \|COUNT\|`           |
| `expr \|COUNT,SEQ\|`       |
| `expr \|MIN..MAX\|`        |
| `expr \|MIN..MAX,SEP\|`    |
| `expr \|..\|`              | -> `expr*`                     |
| `expr \|0..\|`             | -> `expr*`                     |
| `expr \|1..\|`             | -> `expr+`                     |
| `expr \|..1\|`             | -> `expr?`                     |

```
// use runtime value as option
start = count:n1 "a"|count|;
n1 = n:$[0-9] { return parseInt(n); };

start = "a"|{ return options.count; }|;
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

## Action Execution Environment

- `()` 会形成变量作用域
- input - parse 参数
- options - parse 参数
- `error(message,where=location())` - 返回错误
- `expected(message, where=location())`
- `location()` - `{source:options.grammarSource,start:{offset,line,column},end}`
- `range()` 只返回 offset 对象
- `offset()` -> `location().start.offset`
- `text()`
- reserved/保留关键词
  - count

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
__ "whitespace" // human-readable name
  = [ \t]+
```

```
// 引入另外的 rule
import {number} from "./number.js"
a = number|1.., "," WS|
WS = [ \t]*
```

```
list
  = word|.., delimiter| delimiter?
delimiter
  = _ "," _
word
  = $[a-z]i+
_
  = [ \t]*
```
