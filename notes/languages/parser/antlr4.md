---
title: Antlr 4
---

# Antlr4

- ANTLR - ANother Tool for Language Recognition
- 案例
  - [grammars-v4](https://github.com/antlr/grammars-v4)
- 语言支持
  - Java
  - C#
  - Python 2/3
  - JavaScript
  - Go
  - C++
  - Swift
- Antlr4 - Adaptive LL(*) - https://www.antlr.org/papers/allstar-techreport.pdf
- Antlr3 - LL(*)

```bash
java -jar antlr-4.6-complete.jar -Dlanguage=Go MyLang.g4
```

## 语法结构

```antlr4
@header {
}

@members {
}

@parser::members {
}

@lexer::members {
}

parent
locals [
    List<String> symbols = new ArrayList<String>()
]
: ruleName;

ruleName[int returnValue]
@init{
}
@after {
}
locals [int i=1]
  :  ID {/*Dynamically-Scoped Attributes*/if($block::symbols.contains($ID.text)){}}
  ;
```

```g4
/** Optional javadoc style comment */
grammar Name;
options {...}
import ... ;

tokens {...}
channels {...} // lexer only
@actionName {...}

rule1 // parser and lexer rules, possibly intermingled
...
ruleN
```

```
grammar Count;

@header {
package foo;
}

@members {
int count = 0;
}

list
@after {System.out.println(count+" ints");}
: INT {count++;} (',' INT {count++;} )*
;

INT : [0-9]+ ;
WS : [ \r\t\n]+ -> skip ;
```

```antlr
grammar JSON;

json
   : value
   ;

object
   : '{' pair (',' pair)* '}'
   | '{' '}'
   ;

pair
   : STRING ':' value
   ;

array
   : '[' value (',' value)* ']'
   | '[' ']'
   ;

value
   : STRING
   | NUMBER
   | object
   | array
   | 'true'
   | 'false'
   | 'null'
   ;


STRING
   : '"' (ESC | ~ ["\\])* '"'
   ;
fragment ESC
   : '\\' (["\\/bfnrt] | UNICODE)
   ;
fragment UNICODE
   : 'u' HEX HEX HEX HEX
   ;
fragment HEX
   : [0-9a-fA-F]
   ;
NUMBER
   : '-'? INT '.' [0-9] + EXP? | '-'? INT EXP | '-'? INT
   ;
fragment INT
   : '0' | [1-9] [0-9]*
   ;
// no leading zeros
fragment EXP
   : [Ee] [+\-]? INT
   ;
// \- since - means "range" inside [...]
WS
   : [ \t\n\r] + -> skip
   ;
```

## Go

- https://github.com/antlr/antlr4/blob/master/doc/go-target.md

```bash
go get github.com/antlr/antlr4/runtime/Go/antlr
antlr4 -Dlanguage=Go -package mylang MyLang.g4
```

## antlr4 cli options

```
ANTLR Parser Generator  Version 4.7.1
 -o ___              specify output directory where all output is generated
 -lib ___            specify location of grammars, tokens files
 -atn                generate rule augmented transition network diagrams
 -encoding ___       specify grammar file encoding; e.g., euc-jp
 -message-format ___ specify output style for messages in antlr, gnu, vs2005
 -long-messages      show exception details when available for errors and warnings
 -listener           generate parse tree listener (default)
 -no-listener        don't generate parse tree listener
 -visitor            generate parse tree visitor
 -no-visitor         don't generate parse tree visitor (default)
 -package ___        specify a package/namespace for the generated code
 -depend             generate file dependencies
 -D<option>=value    set/override a grammar-level option
 -Werror             treat warnings as errors
 -XdbgST             launch StringTemplate visualizer on generated code
 -XdbgSTWait         wait for STViz to close before continuing
 -Xforce-atn         use the ATN simulator for all predictions
 -Xlog               dump lots of logging info to antlr-timestamp.log
 -Xexact-output-dir  all output goes into -o dir regardless of paths/package
```

## FAQ

### What is semantic predicate ?

- [What is a 'semantic predicate' in ANTLR?](https://stackoverflow.com/q/3056441/1870054)

### Lexer vs Parser

- 词法/lexer rule
  - 大写
  - used to tokenize your input source. It represents a fundamental building block of your language.
- 语法/parser rule
  - 小写
  - consists of zero or more other parser rules or tokens produced by the lexer.
- 如果多个 Lexer 都能匹配同一个内容, 第一个匹配的会被选择.
- Lexer 中不会有其他的 Token, Skip 不会生效, 因为一个 Lexer 是一个 Token
- [WHEN TO USE PARSER RULES VS LEXER RULES?](https://www.3dbuzz.com/forum/threads/203932-ANTLR-When-to-use-Parser-Rules-vs-Lexer-Rules)
  - 解析的基本步骤
    - 将字符串解析为一个一个的 Token
    - 将一组 Token 解析为抽象语法树
    - 对语法树进行处理
  - 这两者是分不开的

### 忽略大小写

- [Case-Insensitive Lexing](https://github.com/antlr/antlr4/blob/master/doc/case-insensitive-lexing.md)
  1. 关键词定义使用忽略大小写的匹配
  2. 自定义字符流

### Visitor vs Listener

- [Antlr4 Listeners and Visitors - which to implement?](https://stackoverflow.com/questions/20714492)
- [Visitor vs Listener](http://jakubdziworski.github.io/java/2016/04/01/antlr_visitor_vs_listener.html)
- visitor pattern you have the ability to direct tree walking while in listener you are only reacting to the tree walker.
- [Antlr4 visitor vs listener pattern](http://saumitra.me/blog/antlr4-visitor-vs-listener-pattern/)
  - listener pattern is that its all automatic and even if you don’t write any parse tree walker, then also it will figure out and trigger the enter and exit method for each rule. This is a huge benefit for translation type of usecases.
- [Fight "the Listener vs the Visitor" at antlr4 stadium](http://developers-club.com/posts/259691/)

### reportAttemptingFullContext

- [DiagnosticErrorListener#reportAttemptingFullContext](http://www.antlr.org/api/Java/org/antlr/v4/runtime/DiagnosticErrorListener.html#reportAttemptingFullContext-org.antlr.v4.runtime.Parser-org.antlr.v4.runtime.dfa.DFA-int-int-java.util.BitSet-org.antlr.v4.runtime.atn.ATNConfigSet-)
- 不影响解析
