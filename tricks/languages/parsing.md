---
id: parsing
title: 语法解析
---

# 解析

* Parsing - 解析
  * 常用算法
    * LL - Left to right, Leftmost dervation - 上下文无关，自上向下
    * LR - Left to right, Rightmost dervation  - 上下文无关，自底向上
    * PEG + Packrat parsing
    * Earley Parsing
  * 不同的方式决定了内部数据结构不同，解决分歧的方式不同
* 上下文无关 - Context Free
  * 例如 `int int = 10;` - 这里在做 lexing 的时候会成功，但语法层面会失败；
    * 因为上下文无关，先做 lexing，第二个 int 也会被识别成类型的 token。
* 左递归 - Left Recursion
```antlr4
exp
  : exp '+' exp
  | integer
  ;
```
* LALR - LookAhead Left Recursion
  * 前向环视左递归
  * 使用 LA 来解决分歧
* Parser Combinator - 组合解析
* Parser Generator - 生成解析
* 参考
  * [https://github.com/sap/chevrotain](https://github.com/sap/chevrotain) - Parser Building Toolkit for JavaScript
  * [When to use a Parser Combinator? When to use a Parser Generator?](https://softwareengineering.stackexchange.com/questions/338665)
