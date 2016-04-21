
## Tips

### Repository 方法语法
* [Repository 方法语法](http://docs.spring.io/spring-data/data-jpa/docs/current/reference/html/#jpa.query-methods.query-creation)

Keyword |	Sample	| JPQL snippet
----|----|----
And | findByLastnameAndFirstname | … where x.lastname = ?1 and x.firstname = ?2
Or | findByLastnameOrFirstname | … where x.lastname = ?1 or x.firstname = ?2
Is,Equals | findByFirstname,findByFirstnameIs,findByFirstnameEquals | … where x.firstname = ?1
Between | findByStartDateBetween | … where x.startDate between ?1 and ?2
LessThan | findByAgeLessThan | … where x.age < ?1
LessThanEqual | findByAgeLessThanEqual | … where x.age ⇐ ?1
GreaterThan | findByAgeGreaterThan | … where x.age > ?1
GreaterThanEqual | findByAgeGreaterThanEqual | … where x.age >= ?1
After | findByStartDateAfter | … where x.startDate > ?1
Before | findByStartDateBefore | … where x.startDate < ?1
IsNull | findByAgeIsNull | … where x.age is null
IsNotNull,NotNull | findByAge(Is)NotNull | … where x.age not null
Like | findByFirstnameLike | … where x.firstname like ?1
NotLike | findByFirstnameNotLike | … where x.firstname not like ?1
StartingWith | findByFirstnameStartingWith | … where x.firstname like ?1 (parameter bound with appended %)
EndingWith | findByFirstnameEndingWith | … where x.firstname like ?1 (parameter bound with prepended %)
Containing | findByFirstnameContaining | … where x.firstname like ?1 (parameter bound wrapped in %)
OrderBy | findByAgeOrderByLastnameDesc | … where x.age = ?1 order by x.lastname desc
Not | findByLastnameNot | … where x.lastname <> ?1
In | findByAgeIn(Collection<Age> ages) | … where x.age in ?1
NotIn | findByAgeNotIn(Collection<Age> age) | … where x.age not in ?1
True | findByActiveTrue() | … where x.active = true
False | findByActiveFalse() | … where x.active = false
IgnoreCase | findByFirstnameIgnoreCase | … where UPPER(x.firstame) = UPPER(?1)


```java
// Enables the distinct flag for the query
List<Person> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);
List<Person> findPeopleDistinctByLastnameOrFirstname(String lastname, String firstname);


// 使用 Top 和 First
User findFirstByOrderByLastnameAsc();
User findTopByOrderByAgeDesc();
Page<User> queryFirst10ByLastname(String lastname, Pageable pageable);
Slice<User> findTop3ByLastname(String lastname, Pageable pageable);
List<User> findFirst10ByLastname(String lastname, Sort sort);
List<User> findTop10ByLastname(String lastname, Pageable pageable);
```

## 在 Query 中使用 SpEL 来书写通用的 SQL
```java
@MappedSuperclass
public abstract class AbstractMappedType {
  String attribute;
}

@Entity
public class ConcreteType extends AbstractMappedType { … }

@NoRepositoryBean
public interface MappedTypeRepository<T extends AbstractMappedType> extends Repository<T, Long> {
  @Query("select t from #{#entityName} t where t.attribute = ?1")
  List<T> findAllByAttribute(String attribute);
}

public interface ConcreteRepository extends MappedTypeRepository<ConcreteType> { … }
```

## 自动生成创建时间字段和更新时间字段

```java
// ==================== #1 =======================

@EntityListeners({AuditingEntityListener.class})
@MappedSuperclass
@Data
@ToString
@EqualsAndHashCode
public abstract class AbstractEntity implements Serializable { }

// ==================== #2 =======================

@Entity
@Table(name = "entities")    
public class Entity {
  ...

  private Date created;
  private Date updated;

  @PrePersist
  protected void onCreate() {
    created = new Date();
  }

  @PreUpdate
  protected void onUpdate() {
    updated = new Date();
  }
}

// =================== #3 ========================

@MappedSuperclass
public abstract class AbstractTimestampEntity {
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", nullable = false)
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated", nullable = false)
    private Date updated;

    @PrePersist
    protected void onCreate() {
      updated = created = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
      updated = new Date();
    }
}

@Entity
@Table(name = "campaign")
public class Campaign extends AbstractTimestampEntity implements Serializable {
  // ...
}
// =================== #4 ========================

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
public class User extends AbstractPersistable<Long> {
    String username;
    String address;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;
}
```
