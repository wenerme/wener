---
id: peg
title: Parsing Expression Grammars
sidebar_label: PEG
---

# PEG

- [Parsing expression grammar](https://en.wikipedia.org/wiki/Parsing_expression_grammar)
- [orlandohill/peg-left-recursion](https://github.com/orlandohill/peg-left-recursion) - An idea to handle left-recursion in Parsing Expression Grammars (PEGs)
- [PhilippeSigaud/Pegged/wiki/Left-Recursion](https://github.com/PhilippeSigaud/Pegged/wiki/Left-Recursion)
- Golang
  - [pointlander/peg](https://github.com/pointlander/peg)
- Java
  - [sirthias/parboiled](https://github.com/sirthias/parboiled) - Elegant parsing in Java and Scala - lightweight, easy-to-use, powerful.
- JavaScript
  - [PEG.js](https://pegjs.org/)
    - [pegjs/pegjs](https://github.com/pegjs/pegjs)
    - [parser.pegjs](https://github.com/pegjs/pegjs/blob/master/src/parser.pegjs)
    - Simple and expressive grammar syntax
    - Integrates both lexical and syntactical analysis
    - Parsers have excellent error reporting out of the box
    - Based on parsing expression grammar formalism — more powerful than traditional LL(k) and LR(k) parsers
    - Usable from your browser, from the command line, or via JavaScript API
- 案例
  - https://github.com/jgm/peg-markdown/blob/master/markdown_parser.leg
    - Markdown
- 参考
  - [The Packrat Parsing and Parsing Expression Grammars Page](http://bford.info/packrat/)
  - [LL(\*): The Foundation of the ANTLR Parser Generator](http://www.antlr.org/papers/LL-star-PLDI11.pdf)

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

## Packrat
