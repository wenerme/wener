# Redis
https://scaleyourcode.com/blog/article/15

http://download.redis.io/redis-stable/redis.conf
https://redislabs.com/blog/5-key-takeaways-for-developing-with-redis
http://redis.io/topics/admin
https://www.youtube.com/watch?v=X01gn5a2WQ0


## CHANGELOG

### 4.0

http://www.antirez.com/news/110
https://raw.githubusercontent.com/antirez/redis/4.0/00-RELEASENOTES

1. 模块
2. 新的同步方式
  * A -> B -> C -> D
3. 失效机制
  * LFU
4. 非阻塞 DEL 和 FLUSHALL/FLUSHDB.
5. RDB-AOF 混合持久模式
6. 新的 MEMORY 语句
7. Redis Cluster 现在兼容 NAT/Docker


### 3.2.0
http://antirez.com/news/104

* [GEO](http://redis.io/commands/#geo) API
* [BITFIELD](http://redis.io/commands/bitfield) command
* script effects replication
  集群下只同步被脚本修改的内容,而不是分发脚本到所有节点执行
* Lua scripts debugger
  VIDEO: [New Redis Lua scripts debugger: a short intro](https://www.youtube.com/watch?v=IMvRfStaoyM)
* slaves and masters are in agreement about what keys are expired during read operations.
* SPOP now accepts an optional count argument
* RDB AUX fields
* Sentinel can now scale monitoring many masters

## Module

```
```

* [写 Redis 模块的教程](https://redislabs.com/blog/writing-redis-modules)
* [Redis 模块仓库](http://redismodules.com/)
* [Antirez 关于 Redis 模块的博客](http://antirez.com/news/106)
