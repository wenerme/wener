---
title: Parser
---

# Parser

**操作符分类**

| Operator   | Symbol                       |
| ---------- | ---------------------------- |
| Arithmetic | `+-*/%`                      |
| Assignment | `=`,`+=`,`-=`,`*=`,`/=`,`%=` |
| Relational | `==`,`!=`,`>`,`<`,`>=`,`<=`  |
| Logical    | `&&`,`\|\|`,`!`              |
| Unary      | `+`,`-`,`++`,`--`,`!`        |
| Bitwise    | `~`,`<<`,`>>`,`>>>`,`&`,`^`  |
| Ternary    | `?:`                         |

- Relational - Comparison
- Logical - Conditional

**操作符名字**

| Operator  | abbr | Name                                                |
| --------- | ---- | --------------------------------------------------- |
| +         | add  | addition, add, plus, sum                            |
| -         | sub  | subtraction, sub, minus, difference                 |
| +         | pos  | unary plus, positive, pos                           |
| -         | neg  | unary minus, negative, neg                          |
| \*        | mul  | multiplication, mul, product, times                 |
| /         | div  | division, div, quotient                             |
| %         | mod  | remainder after division, rem, modulo division, mod |
| ++ --     |      | suffix/postfix/prefix increment and decrement       |
| ==        | eq   | Equal to                                            |
| >         | gt   | Greater than                                        |
| <         | lt   | Less than                                           |
| !=        | ne   | Not equal to                                        |
| >=        | gte  | Greater than or equal to                            |
| <=        | lte  | Less than or equal to                               |
| &&        | and  | Logical AND, Conditional AND                        |
| \|\|      | or   | Logical OR                                          |
| !         | not  | Logical NOT, Bitwise NOT                            |
| ^         | xor  | Logical exclusive OR,Bitwise exclusive OR           |
| ??        |      | Nullish Coalescing                                  |
| ?.        |      | Optional Chaining                                   |
| &         | and  | Bitwise AND                                         |
| \|        | or   | Bitwise OR                                          |
| &^        |      | Bitwise AND NOT - bit clear                         |
| ~         |      | Bitwise complement                                  |
| <<        | sl   | Bitwise shift left                                  |
| >>        | sr   | Bitwise shift right                                 |
| `>>>`     |      | Bitwise unsigned right shift                        |
| `()`      |      | parentheses, paren                                  |
| `()`      | call | Function call                                       |
| `[]`      |      | array subscripting, brackets                        |
| `{}`      |      | curly braces                                        |
| .         |      | member access                                       |
| ->        |      | member access through pointer                       |
| (type)    |      | cast                                                |
| `*`       |      | indirection, dereference, pointer indirection       |
| `&`       |      | address-of                                          |
| ?:        |      | Ternary conditional                                 |
| =         |      | Simple assignment                                   |
| += -=     |      | Assignment by sum and difference                    |
| \*= /= %= |      | Assignment by product, quotient, and remainder      |
| <<= >>=   |      | Assignment by bitwise left shift and right shift    |
| &= ^= \|= |      | Assignment by bitwise AND, XOR, and OR              |
| \|\|= &&= |      | Assignment by Logical                               |
| ??=       |      | Logical nullish assignment                          |
| <-        |      | receive                                             |
| ->        |      | send                                                |
| ^, `**`   |      | power, expoentation                                 |
| ...       |      | spread, expand                                      |
| ,         |      | comma                                               |

**优先级**

| Precedence | Operator     | desc           | Associativity |
| ---------- | ------------ | -------------- | ------------- |
| 1          | ++,--        | suffix/postfix | left to right |
|            | ()           |
|            | []           |
|            | .            |
|            | ->           |
|            | (type){list} |
| 2          | ++,--        | prefix         | right to left |
|            | + -          | unary          |
|            | ! ~          |
|            | (type)       | cast           |
|            | \*           | deref          |
|            | &            | address of     |
|            | sizeof       |
| 3          | \* / %       |
| 4          | + -          |
| 5          | << >>        |
| 6          | < <=         |
|            | > >=         |
| 7          | == !=        |
| 8          | &            | bitwise        |
| 9          | ^            | bitwise        |
| 10         | \|           | bitwise        |
| 11         | &&           | and            |
| 12         | \|\|         | or             |
| 13         | ?:           | ternary        |
| 14         | =            |
|            | += -=        |
|            | \*= /=       |
|            | <<= >>=      |
|            | &= ^= \|=    |
| 15         | ,            |

- 优先级顺序
  - Unary operators -> Binary operators (MACAO)
    - M - Multiplicative
    - A - Additive
    - C - Comparison
    - A - And
    - O - Or
  - Statement operators - ++,-- - 不考虑在优先级里

---

- 参考
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
  - https://en.cppreference.com/w/c/language/operator_precedence
  - [How to implement a programming language in JavaScript](http://lisperator.net/pltut)
    - 解析, 解释器, 转译器, CPS
  - [Comparison of parser generators](https://en.wikipedia.org/wiki/Comparison_of_parser_generators)

## SQL Operators

| Operator                                                    | desc                                                | flavor      |
| ----------------------------------------------------------- | --------------------------------------------------- | ----------- |
| AND                                                         | &&                                                  |
| OR                                                          | \|\|                                                |
| =                                                           | ==                                                  |
| `<>`                                                        | !=                                                  |
| !!=                                                         | not in                                              | PostgresSQL |
| `~~`                                                        | like                                                | PostgresSQL |
| `!~~`                                                       | not like                                            | PostgresSQL |
| `~`                                                         | regexp                                              |
| `!~`                                                        | not regexp                                          |
| `~*`                                                        | iregexp                                             |
| `!~*`                                                       | not iregexp                                         |
| `!~*`                                                       | not iregexp                                         | PostgresSQL |
| `\|\|`                                                      | concatenate strings                                 |             |
| `[NOT] IN`                                                  |
| `[NOT] IN [ANY\|ALL]`                                       |                                                     | PostgresSQL |
| `string [NOT] LIKE pattern [ESCAPE escape-character]`       |                                                     |             |
| `[NOT] LIKE [ANY\|ALL]`                                     |                                                     | PostgresSQL |
| `[NOT] ILIKE [ANY\|ALL]`                                    |                                                     |
| `string [NOT] SIMILAR TO pattern [ESCAPE escape-character]` |                                                     | PostgresSQL |
| `[NOT] REGEXP`                                              |                                                     | PostgresSQL |
| `[NOT] IREGEXP`                                             |                                                     | PostgresSQL |
| RLIKE                                                       |                                                     | MySQL       |
| `[NOT] BETWEEN expr AND expr`                               |
| `[NOT] BETWEEN SYMMETRIC expr AND expr`                     | 自动排序两个值                                      |
| `IS [NOT] (TRUE\|FALSE\|NULL)`                              |
| `IS [NOT] UNKNOWN`                                          | UNKNOWN -> NULL                                     |
| ISNULL                                                      |
| NOTNULL                                                     |
| `ARRAY[expr...]`                                            |
| `expr::TYPE`                                                | cast                                                |
| `expr [ANY\|SOME\|ALL] ( ... )`                             | 数组比较 - SOME=ANY                                 |
| `row IS [NOT] DISTINCT FROM raw`                            |
| !                                                           | factorial                                           |
| !!                                                          | factorial (left operator)                           |
| %                                                           | module - `5 % 4`                                    |
| %                                                           | truncate - `% 4.5`                                  |
| :                                                           | Natural Exponentiation - `: 3.0`                    |
| ;                                                           | Natural Logarithm - `(; 5.0)`                       |
| @                                                           | absolute - `@ -5`                                   |
| ^                                                           | Exponentiation - `3.0 ^ 2.0`                        |
| `\|/`                                                       | Square root - `\|/25.0`                             |
| `\|\|/`                                                     | Cube root - `\|\|/27.0`                             |
| `#<`,`#>`,`#<=`,`#>=`,`#<>`,`#=`                            | interval relation                                   |
| `<#>`                                                       | convert to tine interval                            |
| `\|`                                                        | start of interval                                   |
| ~=                                                          | same as                                             |
| `<?>`                                                       | time inside interval                                |
| `&` `\|` `#` `~` `<<` `>>`                                  | Bitewise AND, OR, XOR, NOT, Shift left, Shift right | PostgreSQL  |
| MOD                                                         | %                                                   | MySQL       |
| ->                                                          | JSON Extract                                        |
| ->>                                                         | JSON Extract to Text                                |
| ^                                                           | Bitwise XOR                                         | MySQL       |

- num_nonnulls( VARIADIC "any" ) - 返回 nonnull 数量
- num_nulls( VARIADIC "any" ) - 返回 null 数量
- https://www.postgresql.org/docs/current/functions-math.html

| Conditional                                                    | desc |
| -------------------------------------------------------------- | ---- |
| `CASE WHEN condition THEN result [WHEN...] [ELSE result] END`  |
| `CASE expr WHEN value THEN result [WHEN...] [ELSE result] END` |
| `COALESCE(value [, ...])`                                      |
| `NULLIF(value1, value2)`                                       |
| `GREATEST(value [, ...])`                                      |
| `LEAST(value [, ...])`                                         |

```sql
-- 所有的 operator
SELECT
  oprleft,
  oprright,
  oprresult,
  oprcode
FROM
  pg_operator;
```

- 参考
  - https://www.postgresql.org/docs/current/functions.html
  - https://www.postgresql.org/docs/6.3/c09.htm
  - https://sqlite.org/lang_expr.html
  - https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html
  - https://dev.mysql.com/doc/refman/8.0/en/non-typed-operators.html

### JSON

| Operator                    | desc                           |
| --------------------------- | ------------------------------ |
| json->integer               | 数组                           |
| json->text                  | 字段                           |
| json->>integer, json->>text | 返回为 text                    |
| `json#>text[]`              | 提取 path                      |
| `json#>>text[]`             | 提取 为 text                   |
| jsonb @> jsonb              | 包含                           |
| jsonb <@ jsonb              | 被包含                         |
| jsonb ? text                | key 存在                       |
| jsonb ?\| text[]            | 任意 key 存在                  |
| jsonb ?& text[]             | 所有 key 存在                  |
| jsonb \|\| jsonb            | 合并                           |
| jsonb - text                | 删除 key                       |
| jsonb - text[]              | 删除 keys                      |
| jsonb - integer             | 删除 数组 元素                 |
| jsonb #- text[]             | 删除 path 元素                 |
| jsonb @? jsonpath           | JSONPATH 匹配                  |
| jsonb @@ jsonpath           | JSONPATH 匹配 - 必须为 Boolean |

- https://www.postgresql.org/docs/current/functions-json.html

### Functions

- https://www.sqlite.org/lang_corefunc.html
