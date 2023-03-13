---
title: Flyway
---

# Flyway

- 使用 SQL
- 符合一定的目录结构标准即可
- 基于 Java, 易于添加自定义配置

---

- [SpringBoot - Database Initialization](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html)
- undo 只有专业版才有

```bash
# macOS 安装
brew install flyway

# 迁移
flyway -configFiles=path/to/myAlternativeConfig.conf migrate
# 可通过环境变量指定配置文件
export FLYWAY_CONFIG_FILES=path/to/myAlternativeConfig.conf,other.conf
# 显示迁移信息
flyway info
# baselineVersion=1	基础版本号
# baselineDescription=<< Flyway Baseline >>	描述信息
# 基于现在数据库做 Baseline
flyway baseline

# target 目标版本, 默认为最新
flyway migrate
```

```ini
# 示例配置
flyway.driver=org.postgresql.Driver
flyway.url=jdbc:postgresql://localhost:5432/flywaydemo
flyway.user=flywaydemo
flyway.password=flywaydemo
flyway.locations=filesystem:src/main/resources/flyway/migrations
flyway.sqlMigrationPrefix=V
flyway.sqlMigrationSeparator=__
flyway.sqlMigrationSuffix=.sql
flyway.validateOnMigrate=true
```

## flyway --help

```
Flyway Community Edition 5.0.2 by Boxfuse

Usage
=====

flyway [options] command

By default, the configuration will be read from conf/flyway.conf.
Options passed from the command-line override the configuration.

Commands
--------
migrate  : Migrates the database
clean    : Drops all objects in the configured schemas
info     : Prints the information about applied, current and pending migrations
validate : Validates the applied migrations against the ones on the classpath
undo     : Undoes the most recently applied versioned migration
baseline : Baselines an existing database at the baselineVersion
repair   : Repairs the schema history table

Options (Format: -key=value)
-------
driver                       : Fully qualified classname of the JDBC driver
url                          : Jdbc url to use to connect to the database
user                         : User to use to connect to the database
password                     : Password to use to connect to the database
schemas                      : Comma-separated list of the schemas managed by Flyway
table                        : Name of Flyway's schema history table
locations                    : Classpath locations to scan recursively for migrations
resolvers                    : Comma-separated list of custom MigrationResolvers
skipDefaultResolvers         : Skips default resolvers (jdbc, sql and Spring-jdbc)
sqlMigrationPrefix           : File name prefix for versioned SQL migrations
undoSqlMigrationPrefix       : File name prefix for undo SQL migrations
repeatableSqlMigrationPrefix : File name prefix for repeatable SQL migrations
sqlMigrationSeparator        : File name separator for sql migrations
sqlMigrationSuffixes         : Comma-separated list of file name suffixes for sql migrations
mixed                        : Allow mixing transactional and non-transactional statements
encoding                     : Encoding of sql migrations
placeholderReplacement       : Whether placeholders should be replaced
placeholders                 : Placeholders to replace in sql migrations
placeholderPrefix            : Prefix of every placeholder
placeholderSuffix            : Suffix of every placeholder
installedBy                  : Username that will be recorded in the schema history table
target                       : Target version up to which Flyway should use migrations
outOfOrder                   : Allows migrations to be run "out of order"
callbacks                    : Comma-separated list of FlywayCallback classes
skipDefaultCallbacks         : Skips default callbacks (sql)
validateOnMigrate            : Validate when running migrate
ignoreMissingMigrations      : Allow missing migrations when validating
ignoreFutureMigrations       : Allow future migrations when validating
cleanOnValidationError       : Automatically clean on a validation error
cleanDisabled                : Whether to disable clean
baselineVersion              : Version to tag schema with when executing baseline
baselineDescription          : Description to tag schema with when executing baseline
baselineOnMigrate            : Baseline on migrate against uninitialized non-empty schema
configFiles                  : Comma-separated list of config files to use
configFileEncoding           : Encoding to use when loading the config files
jarDirs                      : Comma-separated list of dirs for Jdbc drivers & Java migrations
dryRunOutput                 : File where to output the SQL statements of a migration dry run
errorHandlers                : Comma-separated list of handlers for errors and warnings

Flags
-----
-X : Print debug output
-q : Suppress all output, except for errors and warnings
-n : Suppress prompting for a user and password
-v : Print the Flyway version and exit
-? : Print this usage info and exit

Example
-------
flyway -user=myuser -password=s3cr3t -url=jdbc:h2:mem -placeholders.abc=def migrate

More info at https://flywaydb.org/documentation/commandline
```
