---
title: immer
---

# immer

- [immerjs/immer](https://github.com/immerjs/immer)

:::tip

- 默认会 autofreeze - 损失一点性能，返回不可变对象
- 大 list 可以先 freeze 在进行 produce

:::

:::caution

- 不能有循环引用

:::

```ts
import test from 'ava';
import produce from 'immer';

test('immer', (t) => {
  const state = {
    a: { v: 1 },
    b: { v: 1 },
    c: { v: 1 },
    d: { v: 1 },
  };
  const next = produce(state, (s) => {
    s.a.v++;
    s.b.v++;
    s.b.v--;
    s.c.v = 1;
  });
  t.not(state, next);
  t.not(state.a, next.a); // 变了
  t.not(state.b, next.b);
  t.deepEqual(state.b, next.b); // 变了，但相同
  t.is(state.c, next.c); // 没变

  t.true(Object.isFrozen(next));
  t.true(Object.isFrozen(next.a));
  t.true(Object.isFrozen(next.d));
});
```
