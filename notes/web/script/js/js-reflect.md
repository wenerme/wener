---
title: Reflect
---

# Reflect

- 反射
- 参考
  - [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## Reflect.metadata

- https://rbuckton.github.io/reflect-metadata/

| ext                    | for |
| ---------------------- | --- |
| Reflect.decorate       |
| Reflect.defineMetadata |
| Reflect.getMetadata    |
| Reflect.hasMetadata    |
| Reflect.getOwnMetadata |
| Reflect.hasOwnMetadata |
| Reflect.metadata       | 返回 decorator


```ts
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
```

- 类型信息 Key - emitDecoratorMetadata
  - design:type
  - design:paramtypes
  - design:returntype
- Typescript
  - emitDecoratorMetadata
  - https://www.typescriptlang.org/docs/handbook/decorators.html
- [core-js/es7/reflect](https://github.com/zloirock/core-js/tree/master/packages/core-js/es/reflect)
- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
- [@abraham/reflection](https://github.com/abraham/reflection)
