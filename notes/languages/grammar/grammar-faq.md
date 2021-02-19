
# FAQ
## Antlr vs PEG
__书写语法区别__

* PEG
  * 语法结构更简单，类似于拼装复杂正则，不区分语法和词法
  * 执行逻辑自上下下一次性执行出结果
* Antlr
  * 语法区分词法和语法 - Lexer 和 Grammar
  * 解析是有分词逻辑 - Tokenize
  * 将 Token 放入 Grammar 逻辑得到最终的 AST

__概念理论区别__

* PEG
  * 类似 CFG 但并不是子集
    * 例如 `A{n}B{n}C{n}` 能表达上下文相关语法
  * 没有二义性
    * `A / AB` 永远不会匹配到第二个规则
  * Lookahead 可以包含递归
    * 如果 PEG 不包含递归 LA 则可以翻译为 Antlr
* Antlr
  * `LL(*)`, CFG 子集
  * `A / AB` 可能匹配第二个规则
  * Lookahead 只能是简单的模式 - DFA

__功能区别__
* PEG
  * 功能简单，每个语言一般都有实现，语法不同但相似
  * 一般按需捕获 text 内容
  * 书写复杂语法需要注意优先级 - [Operator-precedence parser](https://en.wikipedia.org/wiki/Operator-precedence_parser)
  * 不能左递归
* Antlr
  * 功能强大，支持非常多语言
  * 周边工具较多 - IDE 支持

```antlr
// PEG 优先级 - 有序，无歧义
AddExp: MultiExp ( '+' MultiExp)*
MultiExp: Primary ( '*' Primary)
Primary: [0-9]+

// Antlr 优先级 - 左递归
expression
  : expression '*' expression
  | expression '+' expression
  | Int
  ;
Int: [0-9]+ ;
```

* 参考
  * [Left Recursion in Parsing Expression Grammars](https://arxiv.org/abs/1207.0443)
