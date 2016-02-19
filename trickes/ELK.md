
# Elasticsearch


## 建模

### Parent-Child
* [Parent Child Relationship](https://www.elastic.co/guide/en/elasticsearch/guide/current/parent-child.html)
* 适合于子文档特别多,父文档较少的情况
* 父子关系的映射会存储在内存中
* 更新父文档不影响子文档
* 增删改子文档不影响父文档
* 减少父文档 ID 长度
* 父子都存储在同一个分片
* 可以实现祖孙关系,增加时需要使用 routing 来指定分片
* has_child filter 不会缓存
* 搜索子文档时,避免使用 score_mode
* `GET /_nodes/stats/indices/id_cache?human` 可查看用于缓存父子占用的内存
* 每次索引更改需要重建 Global Ordinals,当父文档较多时,需要占用大量的时间,可通过修改 fielddata 的 loading 来使其发生在 refresh 时而不是 query 时.

## 聚合
### 内存控制
* [Controlling Memory](https://www.elastic.co/guide/en/elasticsearch/guide/current/controlling-memory.html)
* $ES_HEAP_SIZE 可用于控制堆大小,小于可用的一半,小于32G
#### Fielddata
* 会将所有文档的 fielddata 加载到内存,主要是 uinvert index
* 缓存以段位单位
* 主要用于排序,聚合和部分过滤及脚本
