---
title: Apache Tez
---

# Tez

- [Apache Tez](http://tez.apache.org/) 是一个构建在 Hadoop YARN 之上的数据处理框架，用于构建高性能的批处理和交互式应用。它通过将计算任务建模为有向无环图 (DAG)，提供了比 MapReduce 更高的灵活性和性能。
- [apache/tez](https://github.com/apache/tez)
  - Apache-2.0, Java, Big Data
  - 基于 YARN 的通用 DAG 数据处理框架。

**主要特性**

- **DAG 计算模型**: 支持复杂的任务编排，突破 Map -> Reduce 的限制。
- **高性能**: 支持运行时动态优化（如动态调整并行度），减少中间结果写入 HDFS 的开销。
- **灵活性**: 采用 Input-Processor-Output 模型，即插即用，不限制数据类型。
- **生态支持**: 作为 Apache Hive 和 Apache Pig 的执行引擎以提升性能。
