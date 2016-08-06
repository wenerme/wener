# Spring Data
* [Spring Data 示例](https://github.com/spring-projects/spring-data-examples)
* [Spring Data Commons 文档](http://docs.spring.io/spring-data/commons/docs/current/reference/html/)


## Spring Data 查询关键字

逻辑关键词 |	关键词表达式
----|----
AND | And
OR | Or
AFTER | After, IsAfter
BEFORE | Before, IsBefore
CONTAINING | Containing, IsContaining, Contains
BETWEEN | Between, IsBetween
ENDING_WITH | EndingWith, IsEndingWith, EndsWith
EXISTS | Exists
FALSE | False, IsFalse
GREATER_THAN | GreaterThan, IsGreaterThan
GREATER_THAN_EQUALS | GreaterThanEqual, IsGreaterThanEqual
IN | In, IsIn
IS | Is, Equals, (or no keyword)
IS_NOT_NULL | NotNull, IsNotNull
IS_NULL | Null, IsNull
LESS_THAN | LessThan, IsLessThan
LESS_THAN_EQUAL | LessThanEqual, IsLessThanEqual
LIKE | Like, IsLike
NEAR | Near, IsNear
NOT | Not, IsNot
NOT_IN | NotIn, IsNotIn
NOT_LIKE | NotLike, IsNotLike
REGEX | Regex, MatchesRegex, Matches
STARTING_WITH | StartingWith, IsStartingWith, StartsWith
TRUE | True, IsTrue
WITHIN | Within, IsWithin

## Spring Data 返回结果类型
返回类型	| 描述
----|----
void | 不返回值
原子类型 | Java 原子类型值
包装类型 |  Java 包装类型值
T | An unique entity. Expects the query method to return one result at most. In case no result is found null is returned. More than one result will trigger an IncorrectResultSizeDataAccessException.
Iterator<T> | An Iterator.
Collection<T> | A Collection.
List<T> | A List.
Optional<T> | A Java 8 or Guava Optional. Expects the query method to return one result at most. In case no result is found Optional.empty()/Optional.absent() is returned. More than one result will trigger an IncorrectResultSizeDataAccessException.
Stream<T> | A Java 8 Stream.
Future<T> | A Future. Expects method to be annotated with @Async and requires Spring’s asynchronous method execution capability enabled.
CompletableFuture<T> | A Java 8 CompletableFuture. Expects method to be annotated with @Async and requires Spring’s asynchronous method execution capability enabled.
ListenableFuture | A org.springframework.util.concurrent.ListenableFuture. Expects method to be annotated with @Async and requires Spring’s asynchronous method execution capability enabled.
Slice | A sized chunk of data with information whether there is more data available. Requires a Pageable method parameter.
Page<T> | A Slice with additional information, e.g. the total number of results. Requires a Pageable method parameter.
GeoResult<T> | A result entry with additional information, e.g. distance to a reference location.
GeoResults<T> | A list of GeoResult<T> with additional information, e.g. average distance to a reference location. | GeoPage<T> | A Page with GeoResult<T>, e.g. average distance to a reference location.

> 空间坐标类型(GeoResult, GeoResults, GeoPage)只有在存储类型支持空间类型时返回

## JPA Repository 方法语法
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

// 返回结果流
@Query("select u from User u")
Stream<User> findAllByCustomQueryAndStream();
// 只返回结果片段
Slice<User> findTop3ByLastname(String lastname, Pageable pageable);

// 选择单个返回,可返回 Optional
User findFirstByOrderByLastnameAsc();
Optional<User> findTopByOrderByAgeDesc();

// 异步操作
@Async
Future<User> findByFirstname(String firstname);               
@Async
CompletableFuture<User> findOneByFirstname(String firstname);
@Async
ListenableFuture<User> findOneByLastname(String lastname);

Long countByLastname(String lastname);
Long deleteByLastname(String lastname);
List<User> removeByLastname(String lastname);
```

## 单独使用 Repository
```java
RepositoryFactorySupport factory = … // Instantiate factory here
UserRepository repository = factory.getRepository(UserRepository.class);
```

## 实现自定义接口
```java
interface UserRepositoryCustom {
  public void someCustomMethod(User user);
}
class UserRepositoryImpl implements UserRepositoryCustom {

  public void someCustomMethod(User user) {
    // Your custom implementation
  }
}
interface UserRepository extends CrudRepository<User, Long>, UserRepositoryCustom {

  // Declare query methods here
}
```

## 为所有 Repository 添加自定义方法
```java
@NoRepositoryBean
public interface MyRepository<T, ID extends Serializable>
  extends PagingAndSortingRepository<T, ID> {

  void sharedCustomMethod(ID id);
}

public class MyRepositoryImpl<T, ID extends Serializable>
  extends SimpleJpaRepository<T, ID> implements MyRepository<T, ID> {

  private final EntityManager entityManager;

  // 构造函数必须要要有这样的依赖注入
  public MyRepositoryImpl(JpaEntityInformation entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);

    // Keep the EntityManager around to used from the newly introduced methods.
    this.entityManager = entityManager;
  }

  public void sharedCustomMethod(ID id) {
    // implementation goes here
  }
}

@Configuration
@EnableJpaRepositories(repositoryBaseClass = MyRepositoryImpl.class)
class ApplicationConfiguration { … }
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

## Spring Web 集成
### 直接使用实体和特殊参数
```java
@Controller
@RequestMapping("/users")
public class UserController {

  @RequestMapping("/{id}")
  public String showUserForm(@PathVariable("id") User user, Model model) {

    model.addAttribute("user", user);
    return "userForm";
  }
}
```

* 通过 `DomainClassConverter` 实现参数实体的注入
* 通过 `HandlerMethodArgumentResolver` 实现特殊参数(Pageable,Sort)的注入


### 使用多个分页参数

以下两个参数分别通过 `foo_page` 和 `bar_page` 指定
```java
public String showUsers(Model model,
      @Qualifier("foo") Pageable first,
      @Qualifier("bar") Pageable second) { … }
```

### Spring HATEOAS 支持分页
```java
@Controller
class PersonController {

  @Autowired PersonRepository repository;

  @RequestMapping(value = "/persons", method = RequestMethod.GET)
  HttpEntity<PagedResources<Person>> persons(Pageable pageable,
    PagedResourcesAssembler assembler) {

    Page<Person> persons = repository.findAll(pageable);
    return new ResponseEntity<>(assembler.toResources(persons), HttpStatus.OK);
  }
}
```

### 使用 Querydsl 实现查询参数绑定
```java
@Controller
class UserController {

  @Autowired UserRepository repository;

  @RequestMapping(value = "/", method = RequestMethod.GET)
  String index(Model model, @QuerydslPredicate(root = User.class) Predicate predicate,    
          Pageable pageable, @RequestParam MultiValueMap<String, String> parameters) {

    model.addAttribute("users", repository.findAll(predicate, pageable));

    return "index";
  }
}

/* 定制化绑定方式 */
interface UserRepository extends CrudRepository<User, String>,
                                 QueryDslPredicateExecutor<User>,                
                                 QuerydslBinderCustomizer<QUser> {               

  @Override
  default public void customize(QuerydslBindings bindings, QUser user) {

    bindings.bind(user.username).first((path, value) -> path.contains(value))    
    bindings.bind(String.class)
      .first((StringPath path, String value) -> path.containsIgnoreCase(value));
    bindings.excluding(user.password);                                           
  }
}
```

## 使用 Hibernate 实现软删除
```java
@Entity
@Where("deleted = 0") // Hibernate 注解
class User{
  String name;
  Integer deleted;
}
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

## 链接断开异常
```
DataAccessResourceFailureException: could not prepare statement; nested exception is org.hibernate.exception.JDBCConnectionException: could not prepare statement
```

```
Caused by: com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: The last packet successfully received from the server was 48,054,727 milliseconds ago.  The last packet sent successfully to the server was 48,054,727 milliseconds ago. is longer than the server configured value of 'wait_timeout'. You should consider either expiring and/or testing connection validity before use in your application, increasing the server configured values for client timeouts, or using the Connector/J connection property 'autoReconnect=true' to avoid this problem.
```

为 MySQL 使用 `&autoReconnect=true&failOverReadOnly=false&maxReconnects=10` 链接参数

## Not a managed type
```java
@SpringBootApplication
@EntityScan(basePackageClasses = MyEntityPackage.class)
class MyApp{

}
```

## 使用 QueryDSL 构建动态查询
```java
public interface BaseRepository<T, ID extends Serializable>
        extends JpaRepository<T, ID>, JpaSpecificationExecutor<T>, QueryDslPredicateExecutor<T> {
}
public interface UserRepository extends BaseRepository<User,Long> {
}
```

```java
PathBuilder builder = new PathBuilder<>(entityType, Preconditions.checkNotNull(CaseFormat.UPPER_CAMEL.converterTo(CaseFormat.LOWER_CAMEL).convert(entityType.getSimpleName())));

public Page<T> query(Map<String, Object> params, Pageable pageable) {
    BooleanExpression[] expressions = new BooleanExpression[params.size()];
    int i = 0;
    for (Map.Entry<String, Object> entry : params.entrySet()) {
        expressions[i++] = builder.get(entry.getKey()).eq(entry.getValue());
        Expressions.path(entityType, entry.getKey());
    }
    return repository.findAll(BooleanExpression.allOf(expressions), pageable);
}
```
