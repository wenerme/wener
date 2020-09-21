---
id: hibernate-enver
title: Hibernate Enver
---

# Hibernate Enver

## Tips
* [Hibernate ORM Envers](http://hibernate.org/orm/envers/)
* [Hibernate User Guide Envers](http://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#envers)
* spring-data/envers

* 主要功能
  * 每次操作记录修改前状态
  * 可记录后状态
  * 可记录修改的实体名字
  * 可记录修改的字段
  * 可在修改信息上附加自定义信息
  * `@OneToMany` 可以记录修改到中间表
    * `@AuditMappedBy`
* FAQ
  * 如果开启了 revend, 如果是修改操作, 找不到上次记录, 会异常
  * SpringData 的 Enver 无法和 QueryDSL 共用, 需要重写很多东西


## 配置

* 涉及的表
  * `_AUD`
  * `REVINFO`
  * `TRACKING_REVINFO`
  * 列 `_MOD`
  REVCHANGES

* 配置 `org.hibernate.envers.configuration.EnversSettings`

```ini
# 审计表前缀
org.hibernate.envers.audit_table_prefix=
# 审计表后缀
org.hibernate.envers.audit_table_suffix=_AUD

# 修正字段名
org.hibernate.envers.revision_field_name=REV
# 修正类型字段名 0,1,2 -> add,mod,del
org.hibernate.envers.revision_type_field_name=REVTYPE

org.hibernate.envers.revision_on_collection_change=true
# 不记录 @Version 字段
org.hibernate.envers.do_not_audit_optimistic_locking_field=true
# 是否在删除时记录值, 默认只记录一条删除, 所有属性为 null
org.hibernate.envers.store_data_at_delete=false

org.hibernate.envers.default_schema=
org.hibernate.envers.default_catalog=

# 审计策略
# org.hibernate.envers.strategy.ValidityAuditStrategy 会记录修改前和修改后的信息
org.hibernate.envers.audit_strategy=org.hibernate.envers.strategy.DefaultAuditStrategy

# ===================================================
# org.hibernate.envers.strategy.ValidityAuditStrategy
# ===================================================
# 修改后的状态修正记录
org.hibernate.envers.audit_strategy_validity_end_rev_field_name=REVEND
# 修改后的时间戳是否记录
# 记录便于分表和清除旧数据
org.hibernate.envers.audit_strategy_validity_store_revend_timestamp=false
# 修改后的时间戳字段名
org.hibernate.envers.audit_strategy_validity_revend_timestamp_field_name=REVEND_TSTMP

# 定义修正版本号的生成方式, 默认由数据库生成
# 对于 PG, 会使用 sequence, 使用 IDENTITY 需要修改
# 如果为 false 则使用  org.hibernate.envers.enhanced.SequenceIdRevisionEntity
#   由 org.hibernate.id.enhanced.SequenceStyleGenerator 生成
org.hibernate.envers.use_revision_entity_with_native_id=true

# 是否记录每次修改的实体类型
# 存储在表 REVCHANGES(rev reference REVINFO(rev),name)
org.hibernate.envers.track_entities_changed_in_revision=false

# 属性修改信息是否记录
# 会记录在 <属性>_MOD BOOLEAN 字段
org.hibernate.envers.global_with_modified_flag=false
# 属性修改字段名后缀
org.hibernate.envers.modified_flag_suffix=_MOD
# 记录嵌入元素的修改顺序字段名
org.hibernate.envers.embeddable_set_ordinal_field_name=SETORDINAL


org.hibernate.envers.cascade_delete_revision=false
org.hibernate.envers.allow_identifier_reuse=false
# Specifies the composite-id key property name used by the audit table mappings.
org.hibernate.envers.original_id_prop_name=originalId
```

<!--
https://javers.org/
https://github.com/javers/javers


@Audited
@javax.persistence.OrderColumn
@CollectionId
AuditJoinTable
AuditMappedBy
