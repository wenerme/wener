# SaaS

## Tips


## Database
* [Designing a SaaS Database for Scale with Postgres](https://www.citusdata.com/blog/2016/10/03/designing-your-saas-database-for-high-scalability/)
  * [HN](https://news.ycombinator.com/item?id=12649734)
* [Multi-Tenant Data Architecture](https://msdn.microsoft.com/en-us/library/aa479086.aspx)
* [JavaOne 2014 - Supporting Multi-tenancy Applications with Java EE](https://www.slideshare.net/rcandidosilva/supporting-multitenancy-applications-with-java-ee)
* Salesforce
  * [Salesforce Multitenant Architecture: How We Do the Magic We Do](https://www.youtube.com/watch?v=jrKA3cJmoms)
  * [Understanding Multitenancy and the Architecture of the Salesforce Platform](https://www.youtube.com/watch?v=jeysYua6ENs)
  * [The Force.com Multitenant Architecture](https://developer.salesforce.com/page/Multi_Tenant_Architecture)
  * [Architect Core Resources](https://developer.salesforce.com/page/Architect_Core_Resources)
* 一个租户一个数据库
  * 数据隔离
  * 安全备份
  * 备份数据更有意义
  * 安全的数据删除
  * 独立的负载和性能
  * 更好的水平扩容
  * 便于直接访问数据
  * 独立的迁移路径
    * 多应用版本
    * 多数据版本
  * 自己托管数据库
* 一个租户一个 Schema
  * 便于共享公共数据
  * 单库租户数有限
    * 数据库备份性能有影响
  * 后期可考虑对租户分片到不同服务器
  * 无法保证 SLA
  * 无法鉴别对硬件的使用率
  * 事务并发量
* 所有租户共享数据库
  * 便于扩容
  * 应用开发相对复杂
  * 便于运维管理

* 问题
  * 商业模型
  * 收费模式
  * 地域分离
* 多租户模式
  * N 应用 -> N 数据库
    * 自定义
  * 1 应用 -> N 数据库
    * 可配置性
  * 1 应用 -> 1 数据库
    * 扩展
  * 考虑因素
    * 数据定制化
    * 功能定制化
    * 流程定制化
    * Licensing 特性

__数据库策略__

特性 | 数据库分离 | 表分离 | 共享数据库
----|-----------|-------|---------
数据定制化           | Y | Y | N
安全                | Y | N | N
内部依赖和性能        | Y | Y | N
可扩展模型           | N | Y | N
Customer Onboarding | N | N | Y

* Spring + Hibernate
  * [Hibernate Multi-tenancy](https://docs.jboss.org/hibernate/orm/4.2/devguide/en-US/html/ch16.html)
  * [Multi-tenant application with Spring Boot + Spring Data JPA + Hibernate](http://anakiou.blogspot.hk/2015/08/multi-tenant-application-with-spring.html)
    * 多数据源
  * [Multi-Tenancy Implementation for Spring Boot + Hibernate Projects](https://dzone.com/articles/spring-boot-hibernate-multitenancy-implementation)
    * 多 Schema
  * AbstractDataSourceBasedMultiTenantConnectionProviderImpl
  * MultiTenantConnectionProvider
  * CurrentTenantIdentifierResolver
