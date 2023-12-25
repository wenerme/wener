---
tags:
  - Awesome
---

# Parser Awesome

- [Antlr](./antlr4.md)
  - Adaptive LL(\*)
- [JavaCC](./javacc.md)
  - LL(k)
- Grammer
  - yacc - Yet Another Compiler-Compiler
  - bison - YACC-compatible Parser Generator
    - LALR(1), LR(1), IELR(1), GLR
- Lexer - DFA
  - lex - Lexical Analyzer Generator
  - flex
  - [skvadrik/re2c](https://github.com/skvadrik/re2c)
    - Lexer generator for C, C++, Go and Rust
  - http://jflex.de/
    - https://github.com/jflex-de/jflex
- Diagram - railroad diagrams - wikipedia [Syntax diagram](https://en.wikipedia.org/wiki/Syntax_diagram)
  - [tabatkins/railroad-diagrams](https://github.com/tabatkins/railroad-diagrams)
    - MIT, JS, Python
  - https://www.bottlecaps.de/rr/ui
- Languages
  - https://github.com/mingodad/squilu
- [adrian-thurston/ragel](https://github.com/adrian-thurston/ragel)
  - Ragel State Machine Compiler
- BNF, ABNF, EBNF
  - ABNF - Augmented Backus–Naur Form - [rfc5234](https://www.rfc-editor.org/rfc/rfc5234.html)
- [lezer-parser/lr](https://github.com/lezer-parser/lr)
  - Incremental parsing system

---

- [Comparison of parser generators](https://en.wikipedia.org/wiki/Comparison_of_parser_generators)
- http://dinosaur.compilertools.net/
- https://ldapwiki.com/wiki/ABNF

## PEG

- Golang
  - [pointlander/peg](https://github.com/pointlander/peg)
  - [zyedidia/gpeg](https://github.com/zyedidia/gpeg)
- Java
  - [sirthias/parboiled](https://github.com/sirthias/parboiled)
    - Apache-2.0, Java
    - 不生成代码，直接通过注解执行 - 简单易用
    - Elegant parsing in Java and Scala - lightweight, easy-to-use, powerful.
- JavaScript
  - [peggy](./peggy.md)
    - successor of PEG.js
  - [PEG.js](./pegjs.md)
    - ⚠️ 不再维护
    - [pegjs/pegjs](https://github.com/pegjs/pegjs)
    - [parser.pegjs](https://github.com/pegjs/pegjs/blob/master/src/parser.pegjs)
    - Simple and expressive grammar syntax
    - Integrates both lexical and syntactical analysis
    - Parsers have excellent error reporting out of the box
    - Based on parsing expression grammar formalism — more powerful than traditional LL(k) and LR(k) parsers
    - Usable from your browser, from the command line, or via JavaScript API
  - [harc/ohm](./ohmjs.md)
    - MIT, JS
    - 不生成代码 - 运行时解析
    - 使用类似 Regex - 给语法解析执行
    - https://ohmjs.org/editor/
    - https://ohmjs.org/docs/syntax-reference
  - [chevrotain](https://github.com/Chevrotain/chevrotain)
    - LL(K)
    - 使用代码的方式定义
      - 写起来会有点冗长
      - 非常动态
    - https://chevrotain.io/playground/
    - 性能好
      - https://chevrotain.io/performance/
  - [kach/nearley](https://github.com/kach/nearley)
  - [zaach/jison](https://github.com/zaach/jison)
    - Bison in JS
  - [jneen/parsimmon](https://github.com/jneen/parsimmon)
- 案例
  - https://github.com/jgm/peg-markdown/blob/master/markdown_parser.leg
    - Markdown
- 参考
  - [The Packrat Parsing and Parsing Expression Grammars Page](http://bford.info/packrat/)
  - [LL(\*): The Foundation of the ANTLR Parser Generator](http://www.antlr.org/papers/LL-star-PLDI11.pdf)
  - [orlandohill/peg-left-recursion](https://github.com/orlandohill/peg-left-recursion) - An idea to handle left-recursion in Parsing Expression Grammars (PEGs)
  - [PhilippeSigaud/Pegged/wiki/Left-Recursion](https://github.com/PhilippeSigaud/Pegged/wiki/Left-Recursion)

## AST

- [fkling/astexplorer](https://github.com/fkling/astexplorer)
  - https://astexplorer.net/
- https://github.com/syntax-tree
- https://github.com/textlint/textlint/tree/master/packages/@textlint/markdown-to-ast/
- https://github.com/nikic/PHP-Parser
