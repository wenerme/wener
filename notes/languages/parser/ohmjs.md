---
title: ohmjs
---

# ohmjs

- [harc/ohm](https://github.com/harc/ohm)
  - MIT, JS
  - 133kB, 36kB
  - 不生成代码，使用类似 Regex - 注语法解析
    - 规则复用 - `ListOf<option,",">`
    - 语法继承 - `MyJS <: JS`
  - 通过 semantics 添加执行逻辑 - 而不是在 grammar 里嵌入
- 参考
  - https://ohmjs.org/editor/
    - 因为执行逻辑是外部添加的，因此看不到实际执行效果 - 和 [PEG.js](./peg/peggy.md) 主要区别
  - https://ohmjs.org/docs/syntax-reference

:::tip

- 默认忽略 空白
  - 使用特殊语法避免忽略
  - 例如: `#((space+ "not" space+)? spaces "in" spaces)`
    - 不做处理会匹配 `notin`
- 支持一些语法糖 - 开发体验好
- 交互式 editor 开发体验好 - 但目前错误排查也不方便
- 执行逻辑外部注入 - 相对麻烦一点，但方便实现多套执行逻辑
- alternative 的时候需要两部相同数量元素 - 否则需要加别名

:::

- Semantics
  - 执行逻辑
  - 要求参数数量匹配
  - 特殊回滚 action
    - \_terminal
    - \_nonterminal
    - \_iter
  - Node - IterationNode， NonterminalNode， TerminalNode
  - OperationName 可以为方法签名
    - `prettyPrint(depth, strict)`
      - this.args.depth
      - 增加参数后，则所有内部调用也要加参数 - 类似于 context

```js
const g = ohm.grammar(`
  Arithmetic {
    Exp = AddExp

    AddExp = AddExp "+" MulExp  -- plus
           | AddExp "-" MulExp  -- minus
           | MulExp

    MulExp = MulExp "*" number  -- times
           | MulExp "/" number  -- div
           | number

    number = digit+
  }
`);

console.assert(g.match('42').succeeded());

const semantics = g.createSemantics();
// 对应 syntax 执行
semantics.addOperation('eval', {
  AddExp_plus(a, _, b) {
    return a.eval() + b.eval();
  },
  AddExp_minus(a, _, b) {
    return a.eval() - b.eval();
  },
  MulExp_times(a, _, b) {
    return a.eval() * b.eval();
  },
  MulExp_div(a, _, b) {
    return a.eval() / b.eval();
  },
  number(digits) {
    return parseInt(digits.sourceString);
  },
});

console.assert(sematics(g.match('1 + 1')).eval() === 2);
```

```ts title="toAST"
import { toAST } from 'ohm-js/extras';
// 转换为 AST
const ast = toAST(match);

// 重新映射
const ast = toAST(match, {
  Equation: { content: 0 },
  // 位置变为 key，修改类型
  AddExpr: { type: 'Expression', expr1: 0, op: 1, expr2: 2 },
});
```

```json
{
  "type": "AddExpr", // 规则名字
  "0": "24", // 位置内容
  "2": "6"
}
```

- concrete value - 如果是 "xyz" 这样的内容会忽略
- intermediate node - 只有一个 child
- 映射 node-level
  - object - 整体
  - number - 返回 位置 内容
  - function
- 映射 property-level
  - number - 插入位置内容
  - string|boolean|object|null - 直接替换为值
  - function

```bash
npm add -D @ohm-js/cli
npx ohm generateBundles --withTypes --esm src/grammar.ohm
```

- 生成 ts 类型
- src/my-grammar.ohm
  - src/my-grammar.ohm-bundle.js
    - ohm.makeRecipe - grammar 转为的 object
  - src/my-grammar.ohm-bundle.d.ts

```ts
import grammar, { ArithmeticSemantics } from './arithmetic.ohm-bundle';
```

- 发布的一些语法
  - https://www.npmjs.com/search?q=ohm-grammar-

## 语法

- 大写名字 为 Rule - 忽略空白
- 小写名字 为 Lex - 不忽略空白
- 空白 - `[ \r\n\t]` - https://262.ecma-international.org/5.1/#sec-7.2

**语法继承**

> 语法复用

```
Arithmetic {
  AddExp = ...
}
Math <: Arithmetic {
	Expr = AddExp
}
```

**Inline Rule**

> 辅助 left recursive -> right recursion

```
AddExp = AddExp "+" MulExp  -- plus
       | MulExp
```

展开为

```
AddExp = AddExp_plus
       | MulExp
AddExp_plus = AddExp "+" MulExp
```

- 内置规则 - https://github.com/harc/ohm/blob/master/packages/ohm-js/src/built-in-rules.ohm
  - any
  - letter
  - lower
  - upper
  - digit
  - hexDigit
  - alnum
  - spec
  - end
  - `caseInsensitive<terminal>`
  - `ListOf<exp,sep>`

## Rule int involves an alternation which has inconsistent arity

- 或关系要求参数数量相同
- rule 可加名字生成新的规则 - 则允许不同参数

将

```
int = "0" | "1".."9" digit*
```

修改为

```
int
  = "0"
  | int_non_zero
int_non_zero = "1".."9" digit*
```

或修改为

```
int = spaces "0" | "1".."9" digit*
```

处理的时候需要处理下空白

## Reference Grammar

- [ohm-grammar.ohm](https://github.com/harc/ohm/blob/master/packages/ohm-js/src/ohm-grammar.ohm)
  - [built-in-rules.ohm](https://github.com/harc/ohm/blob/master/packages/ohm-js/src/built-in-rules.ohm)
  - [operations-and-attributes.ohm](https://github.com/harc/ohm/blob/master/packages/ohm-js/src/operations-and-attributes.ohm)

# Version

## ohm-js v17.0

- any - onsumes an entire code point
- 移除 helper namespace, extendNamespace
- ESM 无 default export
- ohm.util -> extras
