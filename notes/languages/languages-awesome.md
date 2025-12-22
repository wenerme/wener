---
title: Languages Awesome
tags:
  - Awesome
---

# Languages Awesome

- 分类
  - System Language
  - Application Language
  - Script Language
  - DSL
- Template/General
  - [mustache](./template/mustache.md)
    - Logic-less, 最安全
    - 可面向用户
  - Handlebars
    - Java, .NET, Rust, Go
    - [handlebars-lang/handlebars.js](https://github.com/handlebars-lang/handlebars.js)
- Template/Golang
  - 内置
  - [Masterminds/sprig]
- Template/Javascript
  - ejs
  - eta
  - JSX, React
  - Vue.js
  - Svelte
  - Angular
  - Backbone.js
  - Ember.js
  - Knockout
- typesetting system/markup language/排版系统
  - TeX
    - since 1978
    - by Donald Knuth
  - LaTeX
    - 基于 TeX 的宏包和文档准备系统
    - since 1984
    - by Leslie Lamport
  - [typst/typst](https://github.com/typst/typst)
    - Apache-2.0, Rust
    - since 2019-02
    - markup-based typesetting system
    - 图灵完备 语言
  - [sile-typesetter/sile](https://github.com/sile-typesetter/sile)
    - MIT, Lua, C++, C
  - Typora
  - InDesign
  - Microsoft Word
  - Microsoft Publisher

## Playground

> ODE - Online IDE

- https://tio.run/
  - try it online
  - 可以运行各种语言
- https://godbolt.org/
  - 编译各种语言为 Assembly
  - [compiler-explorer/compiler-explorer](https://github.com/compiler-explorer/compiler-explorer)
    - BSD-2, TypeScript
    - https://compiler-explorer.com/
    - 支持的语言 https://godbolt.org/api/languages
- https://replit.com
- https://ideone.com/
- https://go.dev/play
- https://play.golang.org/
- https://play.rust-lang.org/s
- https://play.kotlinlang.org/
- https://play.crystal-lang.org/
- https://play.nim-lang.org/
- https://play.haskell.org/
- https://pypl.github.io/ODE.html
- [jprendes/emception](https://github.com/jprendes/emception)
  - https://jprendes.github.io/emception/

## Tools

- AST
  - https://astexplorer.net/
  - [fkling/astexplorer](https://github.com/fkling/astexplorer)
  - https://ts-ast-viewer.com
    - [Using the Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [languagetool-org/languagetool](https://github.com/languagetool-org/languagetool)
  - Style and Grammar Checker for 25+ Languages
  - https://languagetool.org/dev
- Version Manager
  - https://github.com/asdf-vm/asdf

## Languages

- [carbon-language/carbon-lang](./carbon/README.md)
  - 目标是替代 C++
  - by Google
  - https://github.com/carbon-language/carbon-lang/blob/trunk/docs/project/faq.md#why-not-rust
    - C++ is difficult to improve
    - Rust 对现有 C++ 代码不友好 - interop, safe
- [GoodManWEN/Programming-Language-Benchmarks-Visualization](https://github.com/GoodManWEN/Programming-Language-Benchmarks-Visualization)
- [ballerina-platform/ballerina-lang](https://github.com/ballerina-platform/ballerina-lang)
  - Apache-2.0, Java
  - 面向云服务的编程语言
  - 内建 HTTP, HTTP2, gRPC, NATS 协议支持
  - 支持 xml, json 类型
  - 异步网络请求
  - 包含常用服务客户端 - twitter, graphql, openapi
  - 服务集成 - awslambda, azure_functions
  - 流程图形化 - 序列图, 函数图, 客户端对象图
- [terralang/terra](https://github.com/terralang/terra)
  low-level system programming language embedded Lua
  - MIT
- [openai/triton](https://github.com/openai/triton)
  writing highly efficient custom Deep-Learning primitives
- [alshdavid/BorrowScript](https://github.com/alshdavid/BorrowScript)
  - TypeScript + Borrow Checker
- [mustafaquraish/cup](https://github.com/mustafaquraish/cup)
  - simple C-like programming language
- tinygo
- [benhoyt/mugo](https://github.com/benhoyt/mugo)
  - a toy compiler for a subset of Go that can compile itself
- [wenyan-lang/wenyan](https://github.com/wenyan-lang/wenyan)
  - 文言文
- https://github.com/breck7/pldb
- [Ph0enixKM/Amber](https://github.com/Ph0enixKM/Amber)
  - GPLv3, Rust
  - 编译为 bash

## DSL

- JsonLogic
  - https://jsonlogic.com/
  - [Playground](https://jsonlogic.com/play.html)
  - [jwadhams/json-logic-js](https://github.com/jwadhams/json-logic-js)
- SpEL - [Spring Expression Language](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html)
- SQL
  - [mysqljs/sqlstring](https://github.com/mysqljs/sqlstring)
- GraphQL
- JSONPath
- XPath
- CEL - [Common Expression Language](https://github.com/google/cel-spec)
  - [ChromeGG/cel-js](https://github.com/ChromeGG/cel-js)
    - MIT, TS, Chevrotain
  - [google/cel-go](https://github.com/google/cel-go)
- MongoDB Query
- Elasticsearch Query
- PromQL
- [silentmatt/expr-eval](https://github.com/silentmatt/expr-eval)
  - MIT, JS
  - Mathematical expression evaluator in JavaScript
- [expr-lang/expr](https://github.com/expr-lang/expr)
  - MIT, Go
  - used by GCP, Uber, GoDaddy, Argo, OpenTelemetry, CoreDNS ...

## Rank

- https://www.tiobe.com/tiobe-index/
- https://redmonk.com/sogrady/2022/10/20/language-rankings-6-22/

## AST

- [tabatkins/railroad-diagrams](https://github.com/tabatkins/railroad-diagrams)
- [fkling/astexplorer](https://github.com/fkling/astexplorer)

## Generator

- Antlr
- JavaCC
- PEG.js
- Bison
- Yacc
- [Comparison of parser generators](https://en.wikipedia.org/wiki/Comparison_of_parser_generators)

## Low

- [vnmakarov/mir](https://github.com/vnmakarov/mir)
- [Common Language Infrastructure](https://en.wikipedia.org/wiki/Common_Language_Infrastructure)
  - [ecma-335](https://www.ecma-international.org/publications-and-standards/standards/ecma-335/)
  - [ISO/IEC 23271:2012](https://www.iso.org/standard/58046.html)

## VM

- [beehive-lab/TornadoVM](https://github.com/beehive-lab/TornadoVM)
- [Writing a simple 16 bit VM in less than 125 lines of C](https://www.andreinc.net/2021/12/01/writing-a-simple-vm-in-less-than-125-lines-of-c)

## 工具

- [evanw/source-map-visualization](https://github.com/evanw/source-map-visualization)
  - source map 可视化
- [raxod502/riju](https://github.com/raxod502/riju)
  - https://riju.codes/
  - online playground for programming language

## Glossary

- metacompiler - tools for compiler, translator, interpreters
- compiler-compiler - parser generator
- grammar
  - BNF - Backus–Naur form
  - EBNF - extended Backus–Naur form

## Highlight

- [github/linguist](https://github.com/github/linguist)
- [Alhadis/language-etc](https://github.com/Alhadis/language-etc)
- https://prismjs.com/#supported-languages
- [drudru/ansi_up](https://github.com/drudru/ansi_up)
  - ANSI
- [Hyperlinks (a.k.a. HTML-like anchors) in terminal emulators](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda)

## HowTo

- [Lessons from Writing a Compiler](https://borretti.me/article/lessons-writing-compiler)

## Typesetting

> - 排版、技术文档
> - 区分 专业 和 轻量级
> - Typesetting 大多输出为 PDF
> - 轻量级输出为 HTML/Web

- [markdown](./markdown/README.md)
- [LaTeX](./tex/README.md)
  - [sile-typesetter/sile](https://github.com/sile-typesetter/sile)
- [typst/typst](https://github.com/typst/typst)
  - Apache-2.0, Rust
  - Typst is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use
  - [qjcg/awesome-typst](https://github.com/qjcg/awesome-typst)
  - [Myriad-Dreamin/typst.ts](https://github.com/Myriad-Dreamin/typst.ts)
    - wasm
- https://www.jetbrains.com/writerside/
  - Markdown & XML
  - writing docs for website
- Asciidoc
- DITA
- GTFO
