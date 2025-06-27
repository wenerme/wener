---
tags:
  - FAQ
---

# MikroORM FAQ

## LockMode

```
OPTIMISTIC
PESSIMISTIC_READ
PESSIMISTIC_WRITE
PESSIMISTIC_PARTIAL_WRITE
PESSIMISTIC_WRITE_OR_FAIL
PESSIMISTIC_PARTIAL_READ
```

- PESSIMISTIC_WRITE_OR_FAIL
  - FOR UPDATE NOWAIT

## Transaction query already complete

## toPOJO vs toObject

- toObject
  - 正常使用，会遵循 hidden
  - `toObject<Ignored extends EntityKey<Entity> = never>(ignoreFields?: Ignored[]): Omit<EntityDTO<Entity>, Ignored>`
    - `EntityTransformer.toObject(this.entity, ignoreFields)`
- toPOJO
  - 主要用于缓存
  - `toPOJO(): EntityDTO<Entity>`
    - `EntityTransformer.toObject(this.entity, [], true) as EntityDTO<Entity>`
- toJSON
  - `toJSON(...args: any[]): EntityDictionary<Entity>`
    - `(entity as Dictionary).toJSON(...args)`
