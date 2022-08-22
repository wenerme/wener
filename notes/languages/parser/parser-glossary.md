---
id: glossary
title: Parser Glossary
tags:
  - Glossary
---

# Parser Glossary

| Abbr.           | Word                                           | Desc                           |
| --------------- | ---------------------------------------------- | ------------------------------ |
| BNF             | Backus–Naur form                               | 巴科斯范式 - 1959 John Backus  |
| EBNF            | extended BNF                                   | 扩展巴科斯范式 - ISO-14977     |
| DFA             | Deterministic finite automaton                 | 确定有限状态自动机             |
| NFA             | Nondeterministic finite automaton              | 非确定有限状态自动机           |
| CFG             | Context free grammar                           | 上下文无关语法                 |
| TDPL            | Top-Down Parsing Language                      |
| [LL(k)]         | Left-to-right, Leftmost derivation             | top-down - 1970s               |
| LLR             | LL-regular                                     |
| LR              | Left-to-right, Rightmost derivation in reverse | bottom-up - 1965 Donald Knuth  |
| DCFG            | Deterministic Context Free Grammar             |
| [PEG]           | Parsing expression grammar                     | 解析表达文法 - 2004 Bryan Ford |
| ANTLR           | ANother Tool for Language Recognition          |
| LALR            | Look-Ahead LR parser                           | 简化版的 LR                    |
| SLR             |
| Canonical LR(1) |
| Minimal LR(1)   |
| GLR             |
| RPN             | Reverse Polish notation                        |

| en         | cn     |
| ---------- | ------ |
| grammar    | 语法   |
| syntax     | 语法   |
| semantics  | 语义   |
| expression | 表达式 |
| term       |

[ll(k)]: https://en.wikipedia.org/wiki/LL_parser
[peg]: ./peg.md

- LL 区分 `LL(*)` 和 `LL(k)`
  - Lookahead 是否有限
  - JavaCC 默认 `LL(1)` - 可设置 lookahead 变为 `LL(k)`
- PEG 类似 CFG 但并不是子集
- DFA - flex, regex, jflex
- [Left recursion](https://en.wikipedia.org/wiki/Left_recursion)
  - Direct left recursion
  - Indirect left recursion

**a and b and c**

```json
{
  "type": "and",
  // left
  "left": {"type": "and", "left": {"term": "a"}, "right": {"term": "b"}},
  //
  "right": {"term": "c"}
}
```

- PEG 手写 right recursion

```mermaid
graph TD;
    CFG-->DCFG
    DCFG-->LL --> LL_k
    LL --> LL_inf
    LL_k --> JavaCC
    LL_inf --> Antlr4

    LL_inf["LL(*)"]
    LL_k["LL(k)"]
```
