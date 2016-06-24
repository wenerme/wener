# 文档路径
https://docs.jboss.org/hibernate/orm

## 配置选项
* [Configuration properties](https://docs.jboss.org/hibernate/orm/4.3/devguide/en-US/html/apa.html)
* 所有的属性也定义在
  * `org.hibernate.cfg.Environment`
  * `org.hibernate.cfg.AvailableSettings`
  * `org.hibernate.jpa.AvailableSettings`

## 优化

__开启用于调试的日志__

```yml
org.hibernate.SQL: debug # 如果开了 show_sql 就可以不用开这个
org.hibernate.id: info # Logs SQL statements for id generation
org.hibernate.type: debug # Logs the JDBC-Parameter which are passed to a query (very verboose)
org.hibernate.cache: debug # Logs cache related activities
org.hibernate.stat: debug
org.hibernate.event.internal: trace # 查看所有的缓存操作
org.springframework.cache: trace
```

__开启用于调试的配置__
```yml
hibernate.generate_statistics: true
hibernate.format_sql: true
hibernate.show_sql: true
hibernate.use_sql_comments: true
```

__二级缓存配置__

```yml
# 只针对使用了注解的实体进行缓存
javax.persistence.sharedCache.mode: ENABLE_SELECTIVE
# 缓存处理类
hibernate.cache.region.factory_class: com.hazelcast.hibernate.HazelcastLocalCacheRegionFactory
hibernate.cache.hazelcast.instance_name: default # 使用现有的 Hazelcast 实例,而不是创建
hibernate.cache.use_second_level_cache: true # 启用二级缓存
hibernate.cache.use_query_cache: true # 启用查询缓存
hibernate.cache.use_reference_entries: true # 缓存使用引用
hibernate.cache.use_structured_entries: true # 使缓存数据的结构更可读
hibernate.cache.use_minimal_puts: true # 提示 Hibernate 减少缓存 put
hibernate.cache.default_cache_concurrency_strategy: nonstrict-read-write # 默认缓存并发级别
```

```java
// Hibernate 统计信息
Statistics statistics = sessionFactory.getStatistics();
statistics.setStatisticsEnabled(true);
statistics.logSummary();
```


* 使用 `BatchSize` 控制集合加载的数据量
* 可通过设置 `default_batch_fetch_size` 来控制默认的加载量
* 使用 Bag 或 List 来实现反向的集合,而非 Set, 这样可以在不获取整个集合的前提下向集合中添加元素
* 缓存只会缓存实体本身而__不会__缓存实体关系,例如: OneToMany 集合
* 集合缓存需要额外添加注解 `@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_ONLY)`


### Fetching 策略
建议保留默认,建议在查询时控制,细粒度控制
* WHEN -  何时获取数据 - 通过各个 ToOne 和 ToMany 上的 fetch 控制
  * EAGER - ToOne 默认
    * 当关联关系较深时会加载大量数据
  * LAZY - ToMany 默认
    * 懒惰级别
      * 属性级别: 较少使用
      * ToOne
        * 代理实现: 在使用 ID 时不会导致整个对象加载,代理对象由 Hibernate 管理
        * 非代理实现: 在使用 ID 时会导致整个对象加载,需要构建时织入
  * EXTRA LAZY - 通过 Hibernate LazyCollection 注解设置
    * 只对集合有效
    * 在使用集合内元素的 ID 时也不会导致集合中实体的数据被加载
    * 使用集合中的单个元素只会加载单个,而不会加载整个集合
    * 集合大小不会被缓存
* HOW - 如何获取数据 - Hibernate 扩展,使用 Fetch 注解控制
  * JOIN
    * 适用于 ToOne 关系
    * 在对集合使用时需要注意一般数据库 Select 会比 Join 更快
  * SELECT
    * 集合的默认获取方式,避免笛卡尔乘积
    * 需要注意 N+1 问题, 每个集合元素都获取一次
  * BATCH
    * 在访问一个元素时即加载多个元素
    * 批量加载数量可配置
    * 批量加载数量有多种算法来判断
  * SUBSELLECT
    * 当访问集合中的某个元素时加载整个集合
    * 性能取决于数据库
  * PROFILE
    * 可通过指定多个配置在实际使用时使用不同的策略

### 一级缓存 vs 二级缓存
* 一级缓存
  * Session 级别缓存
  * 在同一个事务中
  * 事务之间不会共享缓存数据
  * 事务结束时缓存即被清理
* 二级缓存
  * SessionFactory 级别缓存即 JVM 级别缓存
  * 所有的会话都会共享缓存
  * 事务完成后缓存依然存在

### 2LC - 二级缓存
* 默认不启用
  * 可打开全局的二级缓存,sharedMode ALL
  * 可针对单个实体和集合进行缓存
  * 可在会话级别控制缓存模式
* 可缓存所有属性(默认)或非懒加载属性

__二级缓存的并发策略__

CacheConcurrencyStrategy | 说明
----|----
NONE | 不使用任何并发策略
READ_ONLY | 最简单和最优的
NONSTRICT_READ_WRITE| 如果更新较少且不易碰撞,事务隔离不强
READ_WRITE | 支持更新,在使用串行事务级别时不应该使用
TRANSACTIONAL| 需要支持事务的缓存,需要 JTA



* [Hibernate ORM: Tips, Tricks, and Performance Techniques](http://www.slideshare.net/brmeyer/hibernate-orm-performance-31550150)
* [数据获取和缓存优化](http://what-when-how.com/hibernate/optimizing-fetching-and-caching-hibernate/)


## Hibernate 更新操作

PreUpdate 只有在修改实体时才会触发,如果使用 Hibernate 的 EXTRA LAZY, 往 Collection 中插入时时不会触发原实体的,因此 PreUpdate 在修改部分 Collection 的时候不会被触发.

Version 字段只有在自己所持有熟悉和自己所持有的关系被修改时才会更新 Version, 更新 Version 时也会触发 PreUpdate 修改.

在 Hibernate 中可强制使用 `OptimisticLock` 使得在更新集合时也触发 Version 的修改,因此也可以强制触发 PreUpdate 事件.
