---
title: immer
---

# immer

- [immerjs/immer](https://github.com/immerjs/immer)

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
  t.not(state.a, next.a);
  t.not(state.b, next.b);
  t.deepEqual(state.b, next.b);
  t.is(state.c, next.c);

  t.true(Object.isFrozen(next));
  t.true(Object.isFrozen(next.a));
  t.true(Object.isFrozen(next.d));
});
```
