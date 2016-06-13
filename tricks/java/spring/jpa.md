
# JPA

## What's new in Hibernate 5

* Java 8 支持 [Hibernate Java 8](http://mvnrepository.com/artifact/org.hibernate/hibernate-java8)

## JPA 规范内容
* 实体
  * 各种类型的实体映射
  * 各种关系的实体映射
* 实体操作
  * EntityManager
  * 实体生命周期
  * 持久化上下文
  * 锁和并发
  * 缓存
  * 验证
  * 实体图
  * 查询接口
* 查询语言 JPQL
* 元模型接口
* Criteria 接口
* EntityManager & Persistence Context
* 元数据注解
* ORM 元数据
* ORM XML 映射描述


## JOIN 不相关的实体

目前无法关联不相关的实体,只能通过子查询来实现.

```sql
from A a where a.some not in ( select b.some from B)
```

Hibernate 5.1 修正了该[问题](https://hibernate.atlassian.net/projects/HHH/issues/HHH-16?filter=allissues&orderby=votes+DESC%2C+priority+DESC%2C+updated+DESC)


## 关系类型

OneToOne, OneToMany,
ManyToOne, ManyToMany


### 双向 OneToOne
```java
// 关系所有者
class A{
  @OneToOne
  B b;
}
class B{
  @OneToOne(mappedBy="b")
  A a;
}
```
### 双向 ManyToOne / OneToMany
```java
class A{
  @OneToMany(mappedBy="a")
  List<B> bs;
}
class B{
  // 关系所有者
  @ManyToOne
  A a;
}
```

### 单向 OneToOne
```java
class A{
  // 关系所有者
  @OneToOne
  B b;
}
class B{
}
```
### 单向 ManyToOne
```java
class A{
}
class B{
  // 关系所有者
  @ManyToOne
  A a;
}
```

### 双向 ManyToMany
```java
class Project{
  // 关系所有者
  @ManyToMany
  List<Employee> employees
}
class Employee{
  @ManyToMany(mappedBy="employees")
  List<Project> projects;
}
```

### 单向 OneToMany
```java
@Entity
public class Employee {
  // 关系所有者
  @OneToMany
  Collection<AnnualReview> annualReviews;
}
@Entity
public class AnnualReview {
}
```

### 单向 ManyToMany
```java
@Entity
public class Employee {
  // 关系所有者
  @ManyToMany
  Collection<Patent> patents;
}
@Entity
public class Patent {
}
```

## orphanRemoval
在关系中会有一个 orphanRemoval 选项,默认该选项为 `false`, 如果设置为 `true` 则

* 当关系对象从关系中移除(或设置为 null 时),移除操作也会应用在被孤立的实体上.
* 如果孤立的实体是 detached, 新的, 或已移除的实体,则 `orphanRemoval` 的语义不会被应用.
* 该操作间接指定了级联移除(CascadeType.REMOVE)
* 移除操作会在 flush 操作时执行.
* 该功能主要用于实体对象为父实体私有实体时.
* 不能依赖移除顺序.
* 不能将孤立的实体赋予到另外一个关系中,或者尝试将其持久化.

## 级联和 Column 中定义 insertable updatable 的区别
级联能定义插入级联和更新级联,而 Column 中能定义 `insertable`,`updatable`,这两者的区别在于

* Column 中定义的属性为在对该对象进行 `INSERT` 和 `UPDATE` 是,是否对对应的列生成插入和更新操作
* 级联则是在对该对象进行 `INSERT` 和 `UPDATE` 时,是否对关联对象也进行 `INSERT` 和 `UPDATE`
