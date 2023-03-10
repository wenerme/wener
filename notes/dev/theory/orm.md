---
title: ORM
---

# ORM

> **Note**
>
> 1. ORM 和 Query Builder 需要权衡中间点
> 1. 需要考虑 先 Schema 还是 先 Entity - 迁移方式不同

- Data Mapper
- Unit of Work
- Identity Map
- Active Record
- 实现
  - EJB
  - Hibernate
  - JPA
  - gorm
  - Typeorm
  - sequelize
  - mikro-orm
  - jooq

## Identity Map

- ID 相同则实体相同

## Unit of Work

- 累计修改内容，一次性事务提交
  - 修改内容 -> changeset

```ts
const user = await em.findOneOrFail(User, 1);
user.email = 'foo@bar.com';
const car = new Car();
user.cars.add(car);

// 实际发生
await em.flush();
```
