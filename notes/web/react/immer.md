---
title: immer
---

# immer

- [immerjs/immer](https://github.com/immerjs/immer)
- 参考
  - https://immerjs.github.io/immer/performance/

:::tip

- 默认会 autofreeze - 损失一点性能，返回不可变对象
- 大 list 可以先 freeze 在进行 produce

:::

:::caution

- 不能有循环引用

:::

```ts
import assert from 'node:assert/strict';
import test from 'node:test';
import { produce } from 'immer';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

test('immer', () => {
  const o: Record<string, any> = {
    a: { v: 0 },
    b: { v: 0 },
    c: { v: 0 },
  };

  // by produce
  {
    const o2 = produce(o, (s) => {
      s.b.v = 1;
    });

    assert.equal(o2.b.v, 1);
    // 没变
    assert(o.a === o2.a);
    assert(o.b !== o2.b);
  }
  {
    const store = createStore(
      immer(() => {
        return o;
      }),
    );
    store.setState((s) => {
      s.a.v = 0;
      s.b.v = 1;
    });
    let next = store.getState();
    // same
    assert(o.a === next.a);
    assert(o.b !== next.b);
    assert(!Object.isFrozen(next)); // not frozen
    // all frozen
    assert(Object.isFrozen(next.a));
    assert(Object.isFrozen(next.b));
    assert(Object.isFrozen(next.c));

    // set by merge instead of produce
    store.setState({ b: o.b });
    next = store.getState();
    assert(o.b === next.b);

    assert(!Object.isFrozen(next)); // not frozen
    assert(Object.isFrozen(next.a)); // frozen
    assert(!Object.isFrozen(next.b)); // not frozen
  }

  {
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

    assert(state !== next);
    assert(state.a !== next.a); // 变了
    assert(state.b !== next.b);
    assert.deepEqual(state.b, next.b); // 变了，但相同
    assert(state.c === next.c); // 没变
    assert(state.d === next.d); // 没变

    assert(Object.isFrozen(next));
    assert(Object.isFrozen(next.a));
    assert(Object.isFrozen(next.b));
    assert(Object.isFrozen(next.c)); // 没变 依然 frozen
    assert(Object.isFrozen(next.d)); // frozen
  }
});
```
