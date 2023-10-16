---
title: CASL
---

# CASL

- [stalniy/casl](https://github.com/stalniy/casl)
  - MIT, TS, JS
  - core 6KB
- CASL - CanCanAble Simple Language
  - AuthZ
  - 实现 ABAC、RBAC
- Ruby CanCan, RoR CanCanCan
- 核心
  - Ability
  - Action
    - 例如 read, create, update, delete, manage
  - Subject
    - 例如 Post
    - all 表示所有
  - Rule
- vs Casbin、OPA
  - 更简单，更易用
  - 支持前端
  - 面向 Web

```bash
npm add @casl/react @casl/ability
```

**序列化**

```ts
interface Rule {
  pricipal: string; // e.g. user id
  action: string; // read
  subject: string; // Post
  conditions: any; // {"published": true}
}
```

**RBAC**

```ts
function defineAbilitiesFor(role) {
  const { can, build } = new AbilityBuilder(Ability);

  if (role === 'user') {
    can('read', 'Article');
    can('create', 'Article');
  } else if (role === 'admin') {
    can(['read', 'create', 'update', 'delete'], 'Article');
  }

  return build();
}
```

```ts
can('read', 'Address', { 'country.isoCode': 'UA' });
can('read', 'Post', 'author.*');
can('read', 'Post', 'vehicle.*.generic.*');

// 支持自定义 any/all
// 默认 manage 和 all
const ability = new Ability([{ action: '*', subject: '*' }], {
  anyAction: '*',
  anySubjectType: '*',
});

can('*', 'Post');
can('*', '*');
```

## ucast

- [stalniy/ucast](https://github.com/stalniy/ucast)
- @ucast/core
- @ucast/js
  - 解释器
  - eq, ne
  - lt, lte
  - gt, gte
  - within, nin
  - all
  - regex
  - or, nor, and, not
  - exists
  - size
  - mod
  - where,
  - elemMatch
- 参考
  - http://docs.mongodb.org/manual/reference/operator/query/
