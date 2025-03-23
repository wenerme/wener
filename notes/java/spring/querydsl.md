---
tags:
  - DSL
---

# QueryDSL

- [querydsl/querydsl](https://github.com/querydsl/querydsl)
  - Apache-2.0, Java
  - Unified Queries for Java

## 子查询

```java
BooleanExpression exp = invoice.supplier.number.in(new JPASubQuery()
    .from(company)
    .where(company.active.isTrue())
    .list(company.nu‌​mber));
```

## 直接使用 Entity 类创建 PathBuilder

```java
// entityClass is the entity type, not the Q-type
Class<?> entityClass = Class.forName(...)
// "entity" is the variable name of the path
PathBuilder<?> entityPath = new PathBuilder(entityClass, "entity");
// use getString to get a String path
Predicate predicate = entityPath.getString("property").like("a%");
```

## 使用 Map 创建 Predicate

```java
// 也可以使用 BooleanBuilder
BooleanExpression expr = null;
for ( int i = 0; i < associations.length; i++ ){
    BooleanExpression innerExpr =
        documentExternalAssocEntity.associationtype.eq(associations[i].getKey())
            .and(documentExternalAssocEntity.associationvalue.eq(associations[i].getValue()))
    if (expr == null) {
        expr = innerExpr;
    } else {
        expr = expr.or(innerExpr);
    }
}
```
