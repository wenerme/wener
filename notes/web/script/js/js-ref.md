---
tags:
  - Reference
---

# JS References

- [Decorator](./js-decorator.md)
- [Reflect](./js-reflect.md)
- [Prototype](./js-prototype.md)

## Function

```js
// 检测 AsyncIterator/Generator
// next, return, throw
console.assert('next' in async function* () {}.prototype);
console.assert('next' in function* () {}.prototype);

(function* () {})[Symbol.toStringTag]; // GeneratorFunction
(async function* () {})[Symbol.toStringTag]; // AsyncGeneratorFunction
(async () => {})[Symbol.toStringTag]; // AsyncFunction
```

## Symbol

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols

### Symbol.toStringTag

- Object.prototype.toString()
- `[object ${@@toStringTag}]`
