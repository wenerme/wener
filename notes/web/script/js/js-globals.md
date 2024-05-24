---
title: JavaScript 全局对象
---

# globals

- mdn [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
  - Chrome 71+, Firefox 65+, Safari 12.1+, Node.js 12.0.0+

```ts
function getGlobals(): typeof globalThis | undefined {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  } else if (typeof self !== 'undefined') {
    return self;
  } else if (typeof global !== 'undefined') {
    return global;
  }
  return undefined;
}

export const globals = getGlobals();

export const getGlobalThis = (): typeof globalThis => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global as any;
  if (typeof this !== 'undefined') return this as any;
  throw new Error('Unable to locate global `this`');
};
```
