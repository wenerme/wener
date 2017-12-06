# Database Migration

* Flyway
  * 使用 SQL
  * 符合一定的目录结构标准即可
  * 基于 Java, 易于添加自定义配置
* Liquibase
  * 使用 XML, 可以操作不同库
  * 使用一个 changelog 来跟踪所有执行的变更
  * 有写 SQL 的 XML 标签, 但不建议使用, 因为就失去了其本身的优势
  * 提供工具支持从现有数据库生成 XML
  