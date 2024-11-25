---
title: Parsing Expression Grammars
sidebar_label: PEG
---

# PEG

- PEG 类似 CFG，但不存在歧义
  - 不会回溯执行 - 例如 `a|ab` 只会匹配第一个
  - `LL(*)` with infinite lookahead
- 优化
  - Packrat
- [Parsing expression grammar](https://en.wikipedia.org/wiki/Parsing_expression_grammar)

## 语法内容

> **Note**
>
> - 类似 regex
> - 不同的 PEG 实现语法略有不同，但核心内容相同

- 词组 - `a`
- 范围 - `a{1,3}`
- 重复 - `a+`, `a*`, `a?`
- 序列 - `a b`
- 或 - `a|b`
- Lookahead - `(=b)a`
- Negative Lookahead - `(!=b)a`


## 操作符优先级

例如 `!true || !false && (true ^ false)`

定义语法如下

```pegjs
Exp = AndExp
AndExp = OrExp ( _ "&&" _ AndExp)?
OrExp = ExOrExp ( _ "||" _ OrExp)?
ExOrExp = PrefixExp ( _ "^" _ ExOrExp)?
PrefixExp = PrimaryExp / _ "!" _ PrefixExp
PrimaryExp = "(" _ Exp _ ")" / Boolean
Boolean = "true" / "false"

_ "whitespace" = [ \t\n\r]*
```

该预发能正确处理各操作符的优先级，在非 `LLR` 中一般这样处理

```pegjs
Exp = AndExp
AndExp = a:OrExp ( _ "&&" _ b:AndExp)? {return b?[a,"AND",b]:a}
OrExp = a:ExOrExp ( _ "||" _ b:OrExp)? {return b?[a,"OR",b]:a}
ExOrExp = a:PrefixExp ( _ "^" _ b:ExOrExp)? {return b?[a,"XOR",b]:a}
PrefixExp = PrimaryExp / _ "!" _ PrefixExp
PrimaryExp = "(" _ Exp _ ")" / Boolean
Boolean = "true" / "false"

_ "whitespace" = [ \t\n\r]*
```

