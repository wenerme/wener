---
title: res_sorcery
---

# res_sorcery
- res_sorcery
  - asterisk 12+
  - 用于配置 asterisk - 数据层抽象 - CRUD
  - 支持使用数据库配置
  - 支持实时配置
- func - asterisk 14+
  - AST_SORCERY
- AMI Event
  - SorceryMemoryCacheExpire
  - SorceryMemoryCacheExpireObject
  - SorceryMemoryCachePopulate
  - SorceryMemoryCacheStale
  - SorceryMemoryCacheStaleObject
- 模块
  - astdb
    - 从 asterisk 主数据库获取配置
  - config
    - 映射为配置文件操作
  - memory
  - realtime
  - memory_cache - Asterisk 13.5.0+
    - 缓存从 DB 获取的配置 - 大多是 pjsip 相关配置
- 可自定义配置映射
