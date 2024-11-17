---
title: chevrotain
---

# Chevrotain

- [chevrotain](https://github.com/Chevrotain/chevrotain)
  - Apache-2.0, TS
  - LL(K)
  - 使用代码的方式定义 - 有运行时依赖
    - 写起来会有点冗长
    - 非常动态
  - https://chevrotain.io/playground/
  - 性能好
    - https://chevrotain.io/performance/
- CST - Concrete Syntax Tree
- AST - Abstract Syntax Tree

```ts
const createToken = chevrotain.createToken;
// 正则 Token
onst Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
const Select = createToken({
  name: "Select",
  pattern: /SELECT/,
  longer_alt: Identifier,
});
// 一般 Token
const From = createToken({
  name: "From",
  pattern: /FROM/,
  longer_alt: Identifier,
});
const Where = createToken({
  name: "Where",
  pattern: /WHERE/,
  longer_alt: Identifier,
});

const Comma = createToken({ name: "Comma", pattern: /,/ });

const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
const GreaterThan = createToken({ name: "GreaterThan", pattern: />/ });
const LessThan = createToken({ name: "LessThan", pattern: /</ });
// 忽略
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: chevrotain.Lexer.SKIPPED,
});

// Lexar
let allTokens = [
  WhiteSpace,
  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Comma,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  GreaterThan,
  LessThan,
];
let SelectLexer = new Lexer(allTokens);

// Lexer
let inputText = "SELECT column1 FROM table2";
let lexingResult = SelectLexer.tokenize(inputText);
```

```
selectStatement
   : selectClause fromClause (whereClause)?

selectClause
   : "SELECT" Identifier ("," Identifier)*

fromClause
   : "FROM" Identifier

whereClause
   : "WHERE" expression

expression
   : atomicExpression relationalOperator atomicExpression

atomicExpression
   : Integer | Identifier

relationalOperator
   : ">" | "<"
```

**CstParser**

```ts
class SelectParser extends CstParser {
  constructor() {
    super(allTokens);
    const $ = this;

    $.RULE('selectStatement', () => {
      $.SUBRULE($.selectClause);
      $.SUBRULE($.fromClause);
      $.OPTION(() => {
        $.SUBRULE($.whereClause);
      });
    });

    $.RULE('selectClause', () => {
      $.CONSUME(Select);
      $.AT_LEAST_ONE_SEP({
        SEP: Comma,
        DEF: () => {
          $.CONSUME(Identifier);
        },
      });
    });

    $.RULE('fromClause', () => {
      $.CONSUME(From);
      $.CONSUME(Identifier);
    });

    $.RULE('whereClause', () => {
      $.CONSUME(Where);
      $.SUBRULE($.expression);
    });

    // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
    // to use names during CST Visitor (step 3a).
    $.RULE('expression', () => {
      $.SUBRULE($.atomicExpression, { LABEL: 'lhs' });
      $.SUBRULE($.relationalOperator);
      $.SUBRULE2($.atomicExpression, { LABEL: 'rhs' }); // note the '2' suffix to distinguish
      // from the 'SUBRULE(atomicExpression)'
      // 2 lines above.
    });

    $.RULE('atomicExpression', () => {
      $.OR([{ ALT: () => $.CONSUME(Integer) }, { ALT: () => $.CONSUME(Identifier) }]);
    });

    $.RULE('relationalOperator', () => {
      $.OR([{ ALT: () => $.CONSUME(GreaterThan) }, { ALT: () => $.CONSUME(LessThan) }]);
    });

    //
    this.performSelfAnalysis();
  }
}
```

```ts
// ONLY ONCE
const parser = new SelectParser();

function parseInput(text) {
  const lexingResult = SelectLexer.tokenize(text);
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  parser.selectStatement();

  if (parser.errors.length > 0) {
    throw new Error('sad sad panda, Parsing errors detected');
  }
}

const inputText = 'SELECT column1 FROM table2';
parseInput(inputText);
```
