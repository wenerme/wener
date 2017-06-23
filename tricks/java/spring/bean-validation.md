# Bean Validation

## Tips
* http://beanvalidation.org/


## Hibernate Validation
* http://hibernate.org/validator/
* [Can I add a bean validation annotation with group?](https://stackoverflow.com/q/44366294)
### 源码分析
* ConstraintHelper
  * 用于辅助处理注解
* ConstraintDescriptor
  * 对应一个注解
* MetaConstraint
  * 表示所有类型的限制注解, 注解验证时的最终呈现形式
* MetaDataProvider
  * 根据各种来源提供与 Bean 相关的限制信息
  * 最终生成 BeanConfiguration
* AnnotationMetaDataProvider
  * 用于创建注解相关的 `ConstraintDescriptor`
* ConstraintMetaData
  * 限制会聚合为几个类型: 返回值,参数,属性,方法
* 注解可以是组合注解
  * 即注解上还有注解
  * 通过 `ConstraintDescriptor#getComposingConstraints` 获取组合注解
  * 因此注解是树形的, ConstraintTree 表示该树结构
  * 注解注解上的组会被忽略, 会设置为被注解的注解分组
    * `ConstraintDescriptorImpl#createComposingConstraintDescriptor`
    * `ConstraintDescriptorImpl:710`
  * 组合注解的逻辑关系可以使用 `@ConstraintComposition` 控制

* FAQ
  * 限制注解的分组默认值必须为空
