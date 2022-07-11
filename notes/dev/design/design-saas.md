---
title: SaaS
---

# SaaS

## Database

- [Designing a SaaS Database for Scale with Postgres](https://www.citusdata.com/blog/2016/10/03/designing-your-saas-database-for-high-scalability/)
  - [HN](https://news.ycombinator.com/item?id=12649734)
- [Multi-Tenant Data Architecture](https://msdn.microsoft.com/en-us/library/aa479086.aspx)
- [Design patterns for multi-tenant SaaS applications and Azure SQL Database](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-design-patterns-multi-tenancy-saas-applications)
- [JavaOne 2014 - Supporting Multi-tenancy Applications with Java EE](https://www.slideshare.net/rcandidosilva/supporting-multitenancy-applications-with-java-ee)
- [SaaS Based Application Architecture – Best Practices](http://saasaddict.walkme.com/saas-based-application-architecture-best-practices/)
  - Self Service & Personalization
  - Multi-tenancy
  - Integration
    - 应用能与其他应用或平台进行集成
    - 应用可以有预置的集成
  - Operational Performance
  - Security and Compliance
    - 企业选择 SaaS 平台的首要考虑
    - 提供给用户更多的选择并不代表用户一定会选择, 但会让用户感觉有退路
  - Why Multi-tenancy is Critical for the Success of SaaS
    - 多租户是平台成功的关键
  - Design Considerations
  - Security Considerations
  - Scalability Considerations
    - Application Scalability
    - Database Scalability
  - Monitoring
- Salesforce
  - [Salesforce Multitenant Architecture: How We Do the Magic We Do](https://www.youtube.com/watch?v=jrKA3cJmoms)
  - [Understanding Multitenancy and the Architecture of the Salesforce Platform](https://www.youtube.com/watch?v=jeysYua6ENs)
  - [The Force.com Multitenant Architecture](https://developer.salesforce.com/page/Multi_Tenant_Architecture)
  - [Architect Core Resources](https://developer.salesforce.com/page/Architect_Core_Resources)
- [ISO/IEC 27001:2013](https://en.wikipedia.org/wiki/ISO/IEC_27001:2013)
  - 信息安全规范
  - Information technology — Security techniques — Information security management systems — Requirements
  - [钉钉全面安全防护](https://tms.dingtalk.com/markets/dingtalk/dingtalksecurity)
- 租户维度
  - 1 租户 -> 1 物理数据库
    - 数据隔离
    - 安全备份
    - 备份数据更有意义
    - 安全的数据删除
    - 独立的负载和性能
    - 更好的水平扩容
    - 便于直接访问数据
    - 独立的迁移路径
      - 多应用版本
      - 多数据版本
    - 自己托管数据库
    - 不利于统计分析
      - 可将数据二次汇总
    - 需要更多的运维
      - 数量受限
  - 1 租户 -> 1 逻辑数据库 - Schema
    - 便于共享公共数据
    - 单库租户数有限
      - 数据库备份性能有影响
    - 后期可考虑对租户分片到不同服务器
    - 无法保证 SLA
    - 无法鉴别对硬件的使用率
    - 事务并发量
  - N 租户 -> 1 数据库
    - 便于扩容
    - 便于运维管理
    - 便于统计分析
    - 应用开发相对复杂,数据风险
      - 技术层面屏蔽租户概念
      - 因此开发可认为是一个租户一个数据库
      - 如果一个错误会发生,那一定会发生,需要从架构层面去避免
- 应用维度数据模型
  - N 应用 -> N 数据库
    - 自定义
    - 便于应用更新升级
    - 用户可选择不同应用版本
    - 用户可定制化
  - 1 应用 -> N 数据库
    - 可配置性
    - 共享代码, 易于扩展和升级应用能力
    - 应用升级需维护较多的数据库
  - 1 应用 -> 1 数据库
    - 扩展
- 综合维度
  - 1 租户 -> 1 应用 -> 1 数据库
    - 传统项目
  - N 租户 -> 1 应用
    - -> 1 数据库
    - -> N 数据库
  - N 租户 -> N 应用
    - 以应用还是以租户划分
    - -> 1 数据库
    - -> N 数据库
- 考虑因素
  - 数据定制化
  - 功能定制化
  - 流程定制化
  - 一个应用作为平台 vs 一个平台提供多个应用
  - Licensing 特性
- 误区
  - 隔离公司数据和其他租户数据
    - 如果能隔离, 那么其他租户也是能够选择隔离
  - 自己使用接口和其他用户的接口不是同一套接口
    - 如果是定制化接口, 那么其他租户也是具有定制化能力
    - 如果只是平台接口, 那么是不应该的
      - [Eating your own dog food](https://zh.wikipedia.org/zh-hans/Eating_your_own_dog_food)
- 设计权衡
  - 租户隔离
  - 资源消耗
  - 运维难度
  - 可扩展性
- 业务问题
  - 商业模型
  - 收费模式
  - 地域分离
- 解决方案
  - 制定平台发展策略
  - 为平台用户考虑发展策略
  - 没有什么是必然的

**数据库策略**

| 特性                | 数据库分离 | 表分离 | 共享数据库 |
| ------------------- | ---------- | ------ | ---------- |
| 数据定制化          | Y          | Y      | N          |
| 安全                | Y          | N      | N          |
| 内部依赖和性能      | Y          | Y      | N          |
| 可扩展模型          | N          | Y      | N          |
| Customer Onboarding | N          | N      | Y          |

- Spring + Hibernate
  - [Hibernate Multi-tenancy](https://docs.jboss.org/hibernate/orm/4.2/devguide/en-US/html/ch16.html)
  - [Multi-tenant application with Spring Boot + Spring Data JPA + Hibernate](http://anakiou.blogspot.hk/2015/08/multi-tenant-application-with-spring.html)
    - 多数据源
  - [Multi-Tenancy Implementation for Spring Boot + Hibernate Projects](https://dzone.com/articles/spring-boot-hibernate-multitenancy-implementation)
    - 多 Schema
  - AbstractDataSourceBasedMultiTenantConnectionProviderImpl
  - MultiTenantConnectionProvider
  - CurrentTenantIdentifierResolver
