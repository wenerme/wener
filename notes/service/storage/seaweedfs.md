---
id: seaweedfs
title: seaweedfs
---

# seaweedfs
## Tips
* 注意
  * 默认构建的单 `weed volume` 只支持 30G - 对分布式文件系统来说太小了
* [chrislusf/seaweedfs](https://github.com/chrislusf/seaweedfs)
  * 起源于 [Facebook's Haystack design paper](http://www.usenix.org/event/osdi10/tech/full_papers/Beaver.pdf)
  * 每个文件 40byte 元数据
  * 底层对象存储
  * 通过 filer 实现 POSIX 兼容文件系统
  * REST 接口 - JSON、JSONP 返回
  * 架构简单
* 特性
  * 冷热数据分离
  * 热数据 O(1) 访问时间
  * 可选择无副本或不同副本级别 - 感知 rack 和 dc
  * 无单点 - 主节点 failover
  * 基于文件 mime 就行 gzip
  * 更新或删除后就行空间回收
  * 支持 TTL
  * 只要有磁盘空间就可以添加总存储空间
  * 添加删除节点不会导致数据就行从新平衡
  * 图片大小调整 - 可选
  * Tag, Accept-Range, Last-Modified 等
  * in-memory/leveldb/readonly mode tuning for memory/performance balance.
  * 支持在线 rebalancing
  * 透明云集成 - 对热数据就行层叠结构存储实现无限空间
  * 热数据 Erasure Coding - 感知 Rack
    * RS(10,4) - 允许丢失 4 分片，总数据为原来 1.4 倍
    * 1GB 连续块，1MB 块大小，提升读取性能
    * 不会将索引加载到内存 - 节省内存，启动块
    * 服务器灵活布局，没有最低 server 和 rack 要求
    * 通过 volume 管理 ec
    * 如果少于 4 volume，ec 可以用保护磁盘损坏
    * 如果大于等于 4 volume，ec 可以用于保护系统失败
    * 如果大于 4 rack，ec 可保护 rack 失败
    * 劣势
      * 丢失分片在访问时会变慢
      * 重构 ec 需要传输整个 volume - 传输量大但效率高
      * 只支持删除不支持更新
      * 压缩需要先转换为普通 volume
* Filer 特性
  * 支持 HTTP 暴露文件和目录
  * 支持大文件 - TB 级别
  * 支持 FUSE 挂载
    * `weed mount`
  * S3 兼容接口
    * `weed s3` 启动 Gateway
    * Bucket 映射为目录 ` /buckets/<bucket_name>`
    * 不支持 Policy
  * HDFS 兼容接口
  * 异步备份到 S3, Google Cloud Storage, Azure, BackBlaze
  * WebDAV 接口
    * `weed webdav`
    * 无认证
  * AES256-GCM  加密存储
  * 支持 TTL
  * Kubernetes CSI 驱动
* Filer
  * 元信息需要存储
  * Cassandra, Mongodb, Redis, Elastic Search, MySql, Postgres, MemSql, TiDB, CockroachDB, Etcd
  * 为确保原子性可使用 Postgres, MySql
    * 文件重命名、目录重命名需要原子性支持
  * 支持订阅文件变化发送消息
  * __不支持递归目录删除__
  * __如果 Filter 元信息丢失，则会导致文件结构信息丢失__ - 无法恢复，基本等同于文件丢失，且无法访问
* 场景
  * 相对小文件高并发
  * CDN
  * 分布式文件缓存
  * 图片服务器
* 端口
  * 主节点
    * 9333
  * 存储节点
    * 8080
* 存储大小
  * 单卷最大 32G - 32GiB or 8x2^32 bytes
    * 8 bytes 对齐
    * 增加对齐可增加空间大小，但对齐可能需要 pad 浪费空间
  * 最多 4Gi / 2^32 卷
    * 因此默认最大集群 8 x 4GiB x 4GiB = 128 128EiB
  * 单文件最大为卷大小
* 文件元信息存储于内存
  * key 16 bytes - `<64bit key, 32bit offset, 32bit size>`
* fid - 每个被存储的对象的唯一 ID - 文件信息可由外部存储 id 映射进行跟踪
  * `3,01637037d6` - 字符串最长 33 bytes，二进制存储最长 16 bytes
    * uint32 volume id=3
    * uint64 file key=0x01 - 文件数量 - 增加
      * 大文件 chunk 也会增加
    * uint32 file cookie=0x637037d6 - 用于避免 URL 猜测文件
* 副本级别
  * xyz -> 不同DC|同DC不同Rack|同Rack
  * 000 - 无
  * 001 - 同 rack 1 副本
  * 010 - 不同 rack 同 dc 1 副本
  * 100 - 不同 dc 1 副本
  * 200 - 不同 dc 2 副本
  * 110 - 不同 rack 1 副本，不同 dc 1 副本
* Volume
  * 存储固定节点 - 位置可以缓存，可订阅变化
  * 类似于分片/Sharding
  * 写入到所有 replica 才算成功
  * 如果失败，则标记 volume 只读，下次分配其他可写入 volume id
* Volume Server - `weed volume`
  * 最多 30G - 构建添加 tag 5BytesOffset 支持可最多 8T
  * 提供 volume 存储 - 默认最多 8 个 volume id
    * 相当于平均单个 volume id 最多 30G/8 ~ 3.75G
* Usually hot data are fresh and warm data are old
  * newly created volumes on local servers, and optionally upload the older volumes on the cloud
* collection
  * volume 集合 - 相当于将用到的 volume 进行分类，方便统一管理

```bash
# 下载 https://github.com/chrislusf/seaweedfs/releases
# 安装
go get -u -v github.com/chrislusf/seaweedfs/weed
# $GOPATH/src/github.com/chrislusf/seaweedfs/weed

# 生成配置
# 配置目录 ./ $HOME/.seaweedfs /etc/seaweedfs
# config filer|notification|replication|security|master
weed scaffold -config master -output ./
weed scaffold -config filer -output ./
weed scaffold -config replication -output ./

# matser
# http://localhost:9333
# -metrics.address Prometheus gateway
mkdir -p meta-data v1 v2 mnt-cache mnt
weed master -mdir=./meta-data -port=9333

# volumes
# -dataCenter
# -rack
# -index=memory
# -max=8 卷数量
weed volume -dir=$PWD/v1 -max=5  -mserver=localhost:9333 -port=8080
weed volume -dir=$PWD/v2 -max=10 -mserver=localhost:9333 -port=8081

# 性能测试
# 1M 1k 的文件
# 两个 volume - 5808.88 #/sec 5987.44 Kbytes/sec
# 运行完成后删除 collection - http://localhost:9333/col/delete?collection=benchmark
weed benchmark -master=localhost:9333

# 文件系统
weed filer -port=8888

# 本地挂载
# -filer.path
# -replication
# -ttl
# -umask
weed mount -filer=localhost:8888 -cacheDir=$PWD/mnt-cache -dir=$PWD/mnt -dirAutoCreate

# 匿名读 public
# admin 管理
# test 访问 test bucket
cat <<JSON > s3.json
{
  "identities": [
    {
      "name": "anonymous",
      "actions": ["Read:public"]
    },
    {
      "name": "admin",
      "credentials": [
        {
          "accessKey": "admin",
          "secretKey": "secret"
        }
      ],
      "actions": ["Admin", "Read", "Write"]
    },
    {
      "name": "test",
      "credentials": [
        {
          "accessKey": "test",
          "secretKey": "test"
        }
      ],
      "actions": ["Read:test", "Read:test", "Write:test"]
    }
  ]
}
JSON
weed s3 -port=8333 -filer=localhost:8888 -config s3.json
```

## volume

## weed shell
* [weed-shell](https://github.com/chrislusf/seaweedfs/wiki/weed-shell)
* 命令参数要看源码

```bash
# 查看所有
volume.list

# 修改之前需要 lock
lock

# 将 volume 157 副本设置为 001 - 同 rack 1 副本
volume.configure.replication -volumeId=157 -replication=001
# 修复副本
volume.fix.replication

# 修改之后 unlock
unlock

# 删除
# volume-server volume-id
volume.delete 127.0.0.1:8080 157
```

## 优化
* https://github.com/chrislusf/seaweedfs/wiki/Optimization
* dc 可用于标示不同存储层
  * 例如 SSD
* assign 时可指定 dc

## Kubernetes
* [seaweedfs/seaweedfs-csi-driver](https://github.com/seaweedfs/seaweedfs-csi-driver) - 创建 sc 指向 filer
  * storageclass - `seaweedfs-storage`
    * 会被设置成默认，按需编辑 yaml 取消
    * provisioner: `com.seaweedfs.csi`
  * SEAWEEDFS_FILER - 指向 filer
    * 编辑 yaml 修改
* [seaweedfs/seaweedfs-operator](https://github.com/seaweedfs/seaweedfs-operator)
* helm [chart](https://github.com/chrislusf/seaweedfs/tree/master/k8s)
  * 不推荐使用，可用于参考
  * master/filer/volume
    * statefulsets 
    * anti-affinity on hostname
    * memsql(mysql) filer backend
    * secret-seaweedfs-db.yaml - mysql password
  * host path
    * /storage/logs/seaweedfs - 日志 `-logdir`
      * master
      * volume
      * filer
    * /ssd/seaweed-master/ - master 元数据 `-mdir`
    * /storage/object_store/ - volume 数据 `-dir`
  * 目前数据账号密码是硬编码 - YourSWUser:HardCodedPassword
  * 默认会创建 ingress - 且无法自定义
