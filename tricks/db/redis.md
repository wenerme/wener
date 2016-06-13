https://scaleyourcode.com/blog/article/15

http://download.redis.io/redis-stable/redis.conf
https://redislabs.com/blog/5-key-takeaways-for-developing-with-redis
http://redis.io/topics/admin
https://www.youtube.com/watch?v=X01gn5a2WQ0


## CHANGELOG

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
