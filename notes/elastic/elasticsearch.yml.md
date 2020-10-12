## elasticsearch.yml


* 配置文件中可通过 `${...}` 来引用环境变量,例如:
```yml
node.rack: ${RACK_ENV_VAR}
```
* 所有的配置项都可通过启动参数指定,例如 `./bin/elasticsearch -Dpath.conf=my-config` 修改配置路径

## 2.x 配置文件及说明

```yml
# ==================================================
# 集群配置
# ==================================================
cluster:
  # 用于标示自动发现的集群明. 如果同时启动了多个集群会通过该标示符来区分
  name: friends


# ==================================================
# 节点配置
# ==================================================
node:
  # 节点名如果不配置在启动时会自动生成.
  name: joey
  # 标识该节点是否能成为主节点.
  master: true
  # 标识该节点是否存储数据
  data: true
  # 可为节点配置任意额外的属性,用于在选择分区时进行标识,例如:
  rack: abc
  # 默认情况下在单个安装目录(数据目录)可启动多个节点,可通过该配置来禁止
  max_local_storage_nodes: 1

# ==================================================
# 索引配置
# ==================================================
# 参考
# http://elasticsearch.org/guide/en/elasticsearch/reference/current/index-modules.html
# http://elasticsearch.org/guide/en/elasticsearch/reference/current/indices-create-index.html
index:
  # 默认分片数, 不能被修改, 可在创建索引时指定
  number_of_shards: 5
  # 默认副本数, 可运行时修改
  number_of_replicas: 1
  # 默认使用 lz4, best_compression 会使用 DEFLATE
  codec: best_compression
  # 自动扩展分片,当冗余节点足够的时候,自动增加副本数量,默认为 false, 可配置 0-5,3-all这样的范围值
  auto_expand_replicas: 0-5
  # 索引刷新间隔, 刷新后才能被搜索,可使用 -1 禁用
  refresh_interval: 1s
  # 返回的最大结果数量, 影响 from+size
  max_result_window: 10000
  blocks:
    # 设置为 true 使索引和索引元数据只读
    read_only: false
    read: True
    write: True
    metadata: True
  requests:
    # 当一个搜索请求对一个或多个索引执行时,每个需要查询的分片都会执行该请求然后返回本地结果到调度节点,最终合并一个全局的结果集.
    # 分片级别的请求缓存和用于缓存每个分片的本地计算结果. 这可以使常用(复杂)的查询立即得到返回结果.
    # 请求缓存非常适用于日志存储, 因为只有最近的索引数据会被更新,旧的索引数据可从缓存直接返回.
    # 目前只能缓存 size=0 的搜索请求,因此不会缓存 `hits`,但会缓存 `hots.total` 聚合和建议
    # 查询中使用了 `now` 的不能被缓存
    #
    # 对于未缓存的搜索也能保证近实时
    # 缓存会在分片刷新时自动失效,但只有实际被改变的数据才会失效.
    # 即保证缓存请求查询结果和未缓存请求是相同的.
    # 刷新间隔越久, 缓存的有效时间越久.
    # 缓存使用 LRU 规则
    # 可手动使缓存失效
    #   curl -XPOST 'localhost:9200/kimchy,elasticsearch/_cache/clear?request_cache=true'
    #
    # 缓存的 KEY 为请求的 JSON
    # 查看缓存使用统计
    # curl 'localhost:9200/_stats/request_cache?pretty&human'
    # curl 'localhost:9200/_nodes/stats/indices/request_cache?pretty&human'
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/shard-request-cache.html
    cache:
      enable: true
      # 堆中最大缓存量
      size: 1%
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/recovery.html



indices:
  # 字段数据缓存主要在对字段排序和聚合计算的时候使用.
  # 在基于字段文档进行访问时,为了提高访问速度回将所有字段值都加载到内存.
  # 构建字段数据缓存是相当昂贵的,因此建议配置足够的内存来缓存该数据.
  # https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-fielddata.html
  # curl -XGET 'http://localhost:9200/_stats/fielddata/?fields=field1,field2&pretty'
  fielddata:
    cache:
      # #调优# 该值可为百分比或具体的值,例如 12GB
      size: 30%
  # 查询缓存负责缓存查询的结果值.
  # 每个节点都有自己的查询缓存,供所有分片共享.
  # 缓存采用 LRU 规则
  # 只会缓存在过滤上下文中的查询
  # 该配置为静态配置,需要在每个数据节点配置
  queries:
    cache:
      size: 10%
  memory:
    # 索引缓冲会用于存储新索引的文档. 当满了过后, 缓冲中的文档会被写到磁盘段中. 每个节点的每个分片都有自己的缓冲.
    # 该配置为静态配置,需要在每个数据节点配置
    # 可配置百分比或具体的值
    # https://www.elastic.co/guide/en/elasticsearch/reference/current/indexing-buffer.html
    index_buffer_size: 10%
    min_index_buffer_size: 48mb
    # 默认为无限
    max_index_buffer_size: 50%
    # 为每个分片设置一个用于索引缓冲的最小缓存值
    min_shard_index_buffer_size: 4mb
  # 恢复相关设置
  # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-cache.html
  recovery:
    # 恢复分片的并发流数
    concurrent_streams: 3
    # 每个节点允许的小文件(<5mb)恢复流
    concurrent_small_file_streams: 2
    file_chunk_size: 512kb
    translog_ops: 1000
    translog_size: 512kb
    compress: true
    # 恢复时的数据限流
    max_bytes_per_sec: 100mb
  # 有 ttl 的文档会有专门的线程来操作
  # https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-ttl.html
  ttl:
    # 删除进程的运行间隔
    interval: 60s
    # 删除为批量操作,通过该配置来控制批处理量
    bulk_size: 10000


# ==================================================
# 路径配置
# ==================================================

path:
  # 配置路径, 包含 logging.yml 和 elasticsearch.yml, 通常通过命令行参数指定
  conf: config
  # 该节点存储索引数据的目录, 可配置多个
  # path.data: data1,data2
  data: data
  # 日志路径
  logs: logs
  # 插件路径
  plugins: plugins

# ==================================================
# 插件配置
# ==================================================
# 如果这里安装的插件未安装,则该节点不会启动
plugin.mandatory: mapper-attachments,lang-groovy

# ==================================================
# 内存配置
# ==================================================
# 内存锁,避免内存交换,提升性能,但占用的内存不能被别的进程使用
bootstrap.mlockall: true
# 确保 ES_MIN_MEM 和 ES_MAX_MEM 环境变量都是同样的值, 并确保服务器有足够的内存.
# 同时还需要确保 Elasticsearch 能够操作内存锁, `ulimit -l unlimited`

# ==================================================
# 网络和 HTTP
# ==================================================
network:
  # 绑定的主机地址
  bind_host: 0.0.0.0
  # 其他节点用来与该节点交互的地址.如果不配置则会自行判断.需要指定为真实 IP 地址
  publish_host: 192.168.0.1
  # 同时指定 bind_host, publish_host
  host: 0.0.0.0

# 传输模块负责集群内节点之间的通讯.所有的传输本质上都是一部的,因此不会有线程阻塞等待响应.
# 参考
#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html
transport:
    # 基于 TCP 实现的传输模块
    tcp:
      # 节点之间通信端口
      port: 9300-9400
      # 集群中其他节点与该节点通讯时使用的端口.当在防火墙或者代理后面的时候很有用.
      # 如果不设置与 port 值相同
      publish_port: 9300-9400
      # 绑定传输端口的主机地址
      # 默认 network.bind_host
      bind_host: 0.0.0.0
      # 集群中其他节点与该节点通讯时使用的主机地址
      # 默认 transport.host 或 network.publish_host
      publish_host: 0.0.0.0
      # 同时设置 transport.bind_host 和 transport.publish_host
      # 默认 network.host
      host: 0.0.0.0
      connect_timeout: 30s
      # 节点之间通信是否启用压缩 LZF
      compress: false
      # 定期发送 PING 保证链接存活
      ping_schedule: 5s
# HTTP 模块用于通过 HTTP 暴露 Elasticsearch 的 API
# HTTP 均为异步,没有线程会被等待响应阻塞,解决了 C10K 问题
# 尽量使用 HTTP keep-alive, 不要使用 HTTP chunking
# 参考
#     https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html
http:
  # 监听的 HTTP 端口
  port: 9200-9300
  # 客户端应该连接的节点
  # 默认 http.port 的实际值
  publish_port: 9200-9300
  # 绑定 HTTP 端口的主机地址
  # 默认 network.bind_host
  bind_host: 0.0.0.0
  # 客户端应该连接的主机地址
  publish_host: 0.0.0.0
  # 同时设置 bind_host 和 publish_host
  host: 0.0.0.0
  # 允许的最大内容长度
  # 如果大于 Integer.MAX_VALUE 会被重置为 100mb
  max_content_length: 100mb
  # URL 最大长度
  max_initial_line_length: 4kb
  max_header_size: 8kb
  # 是否在支持压缩的时候使用压缩
  compression: false
  # 压缩级别
  compression_level: 6
  # 是否禁用 HTTP
  enabled: false
  cors:
    # 是否启用跨域资源共享
    enabled: false
    allow-origin: *
    # 默认 1728000 = 20 天
    max-age: 1728000
    allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
    allow-headers: X-Requested-With, Content-Type, Content-Length
    allow-credentials: false
  # 是否在响应中显示具体的错误堆栈
  # 如果设置为 false, 当请求带了 error_trace 参数也会返回错误信息
  detailed_errors:
    enabled: true
  pipelining: true
  pipelining:
    # HTTP 链接关闭前堆积在内存中的最大事件数量
    max_events: 10000


# ==================================================
# 网关
# ==================================================
# 网关用于持久化集群状态,即便集群重启状态也不会丢失.所有对状态的变更(例如 添加索引)都会存储到网关.当集群启动时会从网关读取状态.
# 参考
#   http://elasticsearch.org/guide/en/elasticsearch/reference/current/modules-gateway.html
# 这些设置只有在整个集群全部重启后才会生效
gateway:
  # 集群类型
  type: local
  # 当节点里有指定节点数量后开始恢复
  recover_after_nodes: 1
  recover_after_master_nodes: 1
  recover_after_data_nodes: 1
  # 当达到指定时间后开始恢复
  recover_after_time: 10m
  # 集群中应有节点数量,当数量达到并且满足 recover_after_time, 立即开始恢复
  expected_nodes: 0
  expected_master_nodes: 0
  expected_data_nodes: 0

action:
  # 是否允许自动创建索引
  auto_create_index: true
  # 禁止关闭所有索引
  disable_close_all_indices: true
  # 禁止删除所有索引
  disable_delete_all_indices: true
  # 禁止关停该节点
  disable_shutdown: true

# ==================================================
# 恢复控制
# ==================================================
# 参考
#   https://www.elastic.co/guide/en/elasticsearch/reference/current/shards-allocation.html
#   https://www.elastic.co/guide/en/elasticsearch/reference/current/disk-allocator.html

cluster:
  routing:
    allocation:
      # all 允许对所有分片类型进行分片申请
      # primaries 只允许主分片的分片申请
      # new_primaries 只允许新增索引的主分片分片申请
      # none 不允许分片申请
      enable: all
      # 当初始恢复时的并发恢复数量
      node_initial_primaries_recoveries: 2
      # 当添加,删除或均衡负载时的并发恢复数量
      node_concurrent_recoveries: 4
      same_shard:
        # 是否允许在同一个主机申请分片
        host: false
    rebalance:
      # 可选值 all, primaries, new_primaries, none
      enable: all
      # 配置允许什么样的负载均衡
      # always 允许所有的负载均衡
      # indices_primaries_active 只有当所有主分片都存在时
      # indices_all_active 只有当所有主分片和分片副本在集群中都存在时.
      allow_rebalance: indices_all_active
      # 整个集群中允许同时进行负载均衡的数量
      cluster_concurrent_rebalance: 2
    balance:
      # 在一个节点上允许申请分片的权重因子. 增加该值,会使集群中节点上的分片数量趋于相等.
      shard: 0.45
      # 索引分片选择一个节点的权重因子. 增加该值,会使每个节点上每个索引分片的数量趋于相等.
      index: 0.55
      # 应执行的操作最小优化值. 增加该值, 会使集群趋向于不均衡分片.
      threshold: 1.0
    disk:
      # 选择分配时是否考虑磁盘情况
      threshold_enabled: true
      watermark:
        # Controls the low watermark for disk usage.
        # 当磁盘使用量达到 85% 时便不会再在该节点申请到分片.
        # 也可将该值设置为具体的量,例如 500mb, 表示当磁盘剩余空间小于该值后便不能再该节点申请到分片.
        low: 85%
        # Controls the high watermark.
        # 当磁盘使用量达到 90% 时,便会开始讲该节点上的分片迁移到其他节点.
        high: 90%
      # 在计算节点磁盘使用量的时候将正在迁移的分片考虑在内.因此在估算磁盘使用量的时候可能不准确.
      include_relocations: true
    update:
      # 检查集群中每个节点磁盘状态的间隔
      interval: 30s
    # 分片感知 https://www.elastic.co/guide/en/elasticsearch/reference/current/allocation-awareness.html
    # 分片过滤 https://www.elastic.co/guide/en/elasticsearch/reference/current/allocation-filtering.html
    awareness:
      # 这里的属性是指节点的自定义属性
      attributes: rack_id
      force.zone.values: zone1,zone2
# 只有当副本数量满足该配置时,主分片才会开始恢复,可选值为
#   quorum 默认,quorum-1 或 half, full, full -1, 或固定数字
index:
  recovery:
    initial_shards: quorum

# ==================================================
# 线程池
# ==================================================
# 每个节点中都有多个线程池, 大多的线程池还有一个关联的请求队列, 使得请求可以等待处理而不是被抛弃.
# 线程数量可在运行时修改
# 参考
#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-threadpool.html

threadpool:
    # 常规操作线程池, 例如 后台的节点发现, type: cached
    generic:
    # 用于索引和删除操作的线程池
    index:
      size: N
      queue_size: 200
    # 用搜索和 count 操作的线程池.
    search:
      size: (N * 3) / 2 + 1
      queue_size: 1000
    # 推荐操作.
    suggest:
      size: N
      queue_size: 1000
    # 获取操作
    get:
      size: N
      queue_size: 1000
    # 批量操作
    bulk:
      size: N
      queue_size: 50
    percolate:
      size: N
      queue_size: 1000
    # 备份和恢复操作
    snapshot:
      keep_alive: 5m
      size: min(5, N/2)
    warmer:
      keep_alive: 5m
      size: min(5, N/2)
    refresh:
      keep_alive: 5m
      size: min(10, N/2)
    listener:
      size: min(10, N/2)



# ==================================================
# 自动发现
# ==================================================
# 参考
#   http://elasticsearch.org/guide/en/elasticsearch/reference/current/modules-discovery-zen.html
discovery:
  zen:
    # 进行主节点选举时的最少参与选举的节点数
    minimum_master_nodes: 1
    ping:
      # 自动发现时等待节点响应时间
      timeout: 3s
      multicast:
        # 是否使用广播发现
        enabled: true
      unicast:
        # 单播发现其他节点的地址
        hosts: ["host1", "host2:port"]

# ==================================================
# 慢日志
# ==================================================
# 分片级别的查询和获取限流日志
index:
  search:
    slowlog:
      threshold:
        query:
          # 为时间达到 10s 的查询记录 warn 日志
          warn: 10s
          info: 5s
          debug: 2s
          trace: 500ms

        fetch:
          warn: 1s
          info: 800ms
          debug: 500ms
          trace: 200ms

        index:
          # 为时间达到 10s 的索引记录 warn 日志
          warn: 10s
          info: 5s
          debug: 2s
          trace: 500ms

# ==================================================
# GC 日志
# ==================================================
monitor:
  jvm:
    gc:
      ParNew:
        warn: 1000ms
        info: 700ms
        debug: 400ms

      ConcurrentMarkSweep:
        warn: 10s
        info: 5s
        debug: 2s

# ==================================================
# 脚本配置
# ==================================================
# 参考
#   https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
script.inline: sandbox
script.indexed: sandbox
script.file: true
script.update: false
script.mapping: false
script.auto_reload_enabled: true

script.engine.groovy.file.aggs: true
script.engine.groovy.file.mapping: true
script.engine.groovy.file.search: true
script.engine.groovy.file.update: true
script.engine.groovy.file.plugin: true
script.engine.groovy.indexed.aggs: true
script.engine.groovy.indexed.mapping: false
script.engine.groovy.indexed.search: true
script.engine.groovy.indexed.update: false
script.engine.groovy.indexed.plugin: false
script.engine.groovy.inline.aggs: true
script.engine.groovy.inline.mapping: false
script.engine.groovy.inline.search: false
script.engine.groovy.inline.update: false
script.engine.groovy.inline.plugin: false
```

### 参考
* [配置说明](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-configuration.html)
* [一份 ES 配置](https://gist.github.com/zsprackett/8546403)
