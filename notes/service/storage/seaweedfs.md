---
title: seaweedfs
---

# seaweedfs

:::caution

- 默认构建的单 `weed volume` 只支持 30G - 对分布式文件系统来说太小了

:::

- [chrislusf/seaweedfs](https://github.com/chrislusf/seaweedfs)
  - 起源于 [Facebook's Haystack design paper](http://www.usenix.org/event/osdi10/tech/full_papers/Beaver.pdf), f4
  - 每个文件 40byte 元数据
  - 底层对象存储
  - 通过 filer 实现 POSIX 兼容文件系统
    - 支持暴露 S3 接口
  - REST 接口 - JSON、JSONP 返回
  - 架构简单
- 特性
  - 冷热数据分离
  - 热数据 O(1) 访问时间
  - 可选择无副本或不同副本级别 - 感知 rack 和 dc
  - 无单点 - 主节点 failover
  - 基于文件 mime 就行 gzip
  - 更新或删除后就行空间回收
  - 支持 TTL
  - 只要有磁盘空间就可以添加总存储空间
  - 添加删除节点不会导致数据进行从新平衡
  - 图片大小调整 - 可选
  - Tag, Accept-Range, Last-Modified 等
  - in-memory/leveldb/readonly mode tuning for memory/performance balance.
  - 支持在线 rebalancing
  - 透明云集成 - 对热数据就行层叠结构存储实现无限空间
  - 热数据 Erasure Coding - 感知 Rack
    - RS(10,4) - 允许丢失 4 分片，总数据为原来 1.4 倍
    - 1GB 连续块，1MB 块大小，提升读取性能
    - 不会将索引加载到内存 - 节省内存，启动块
    - 服务器灵活布局，没有最低 server 和 rack 要求
    - 通过 volume 管理 ec
    - 如果少于 4 volume，ec 可以用保护磁盘损坏
    - 如果大于等于 4 volume，ec 可以用于保护系统失败
    - 如果大于 4 rack，ec 可保护 rack 失败
    - 劣势
      - 丢失分片在访问时会变慢
      - 重构 ec 需要传输整个 volume - 传输量大但效率高
      - 只支持删除不支持更新
      - 压缩需要先转换为普通 volume
- Filer 特性
  - 支持 HTTP 暴露文件和目录
  - 支持大文件 - TB 级别
  - 支持 FUSE 挂载
    - `weed mount`
  - HDFS 兼容接口
  - 异步备份到 S3, Google Cloud Storage, Azure, BackBlaze
  - WebDAV 接口
    - `weed webdav`
    - 无认证
  - AES256-GCM 加密存储
  - 支持 TTL
  - Kubernetes CSI 驱动
- 场景
  - 相对小文件高并发
  - CDN
  - 分布式文件缓存
  - 图片服务器
- 端口
  - 主节点
    - 9333
  - 存储节点
    - 8080
- 存储大小
  - 单卷最大 32G - 32GiB or 8x2^32 bytes
    - 8 bytes 对齐
    - 增加对齐可增加空间大小，但对齐可能需要 pad 浪费空间
  - 最多 4Gi / 2^32 卷
    - 因此默认最大集群 8 x 4GiB x 4GiB = 128 128EiB
  - 单文件最大为卷大小
- 文件元信息存储于内存
  - key 16 bytes - `<64bit key, 32bit offset, 32bit size>`
- 副本级别
  - xyz -> 不同 DC|同 DC 不同 Rack|同 Rack
  - 000 - 无
  - 001 - 同 rack 1 副本
  - 010 - 不同 rack 同 dc 1 副本
  - 100 - 不同 dc 1 副本
  - 200 - 不同 dc 2 副本
  - 110 - 不同 rack 1 副本，不同 dc 1 副本
- Volume
  - 存储固定节点 - 位置可以缓存，可订阅变化
  - 类似于分片/Sharding
  - 写入到所有 replica 才算成功
  - 如果失败，则标记 volume 只读，下次分配其他可写入 volume id
- Volume Server - `weed volume`
  - 最多 30G - 构建添加 tag 5BytesOffset 支持可最多 8T
  - 提供 volume 存储 - 默认最多 8 个 volume id
    - 相当于平均单个 volume id 最多 30G/8 ~ 3.75G
- Usually hot data are fresh and warm data are old
  - newly created volumes on local servers, and optionally upload the older volumes on the cloud

:::note

- volume -fileSizeLimitMB=256 - 默认单文件最大 256MB，配置过大可能导致 OOM
  - [Large file handleing](https://github.com/chrislusf/seaweedfs/wiki/Large-File-Handling)

:::

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

# 快捷启动 - 单 master 单 volumn 包含 filer
weed server -filer=true -s3=true -master.port=9333 -volume.port=8080 -filer.port=8888 -dir="./data"

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

- [weed-shell](https://github.com/chrislusf/seaweedfs/wiki/weed-shell)
- 命令参数要看源码

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

- https://github.com/chrislusf/seaweedfs/wiki/Optimization
- dc 可用于标示不同存储层
  - 例如 SSD
- assign 时可指定 dc

## Kubernetes

- [seaweedfs/seaweedfs-csi-driver](https://github.com/seaweedfs/seaweedfs-csi-driver) - 创建 sc 指向 filer
  - storageclass - `seaweedfs-storage`
    - 会被设置成默认，按需编辑 yaml 取消
    - provisioner: `com.seaweedfs.csi`
  - SEAWEEDFS_FILER - 指向 filer
    - 编辑 yaml 修改
- [seaweedfs/seaweedfs-operator](https://github.com/seaweedfs/seaweedfs-operator)
- helm [chart](https://github.com/chrislusf/seaweedfs/tree/master/k8s)
  - 不推荐使用，可用于参考
  - master/filer/volume
    - statefulsets
    - anti-affinity on hostname
    - memsql(mysql) filer backend
    - secret-seaweedfs-db.yaml - mysql password
  - host path
    - /storage/logs/seaweedfs - 日志 `-logdir`
      - master
      - volume
      - filer
    - /ssd/seaweed-master/ - master 元数据 `-mdir`
    - /storage/object_store/ - volume 数据 `-dir`
  - 目前数据账号密码是硬编码 - YourSWUser:HardCodedPassword
  - 默认会创建 ingress - 且无法自定义

# Notes

- volumn
  - 副本、冗余、TTL 的最小单位
  - 默认 30GB，8 volumn
    - 1.29+ 提供 large_disk 构建的 binary - 8T
    - volumn 过多也会对 master 造成压力
  - 如果修改较多，建议 volumn 小一点
  - 如果大多为只读，使用 large_disk 可以将 volumn 设置大一点
- collection
  - volume 集合
  - s3 buckect 对应 collection
- rpc
  - 服务之间 rpc 为 grpc
  - grpc 端口为默认+10000 - 例如 8080 -> 18080
    - 可自定义 `<host>:<port>.<grpcPort>`
  - 支持 HTTP 接口
- vacuum
  - when garbage is more than 30%
  - 立即触发 weed shell `volume.vacuum -garbageThreshold=0.0001`
- fid - 每个被存储的对象的唯一 ID - 文件信息可由外部存储 id 映射进行跟踪
  - `3,01637037d6` - 字符串最长 33 bytes，二进制存储最长 16 bytes
    - uint32 volume id=3
    - uint64 file key=0x01 - 文件数量 - 增加
      - 大文件 chunk 也会增加
    - uint32 file cookie=0x637037d6 - 用于避免 URL 猜测文件
- ttl
  - 是 volume 级别的
  - 因此 assign 指定 ttl 时会尝试找匹配 ttl 的 volumn，如果找不到则会创建 volumn
  - 会跟踪每个 volumn 里的最大失效时间
  - 当全失效后经过 `min(10%*ttl, 10m)` 时间则 volumn server 会删除 volumn
  - 不推荐 频繁 ttl 和 非 ttl volumn 在相同集群
- Erasure Coding - [f4: Facebook’s Warm BLOB Storage System](https://www.usenix.org/system/files/conference/osdi14/osdi14-paper-muralidhar.pdf)
  - seal 冷数据，利用 EC 节省空间、提高有效性
  - 默认 `RS(10,4)`
  - 1GB chunks
  - ec 后会删除副本
  - downside
    - 不能更新，只能删除
    - 恢复需要传输整个 volumn
    - 读取会更慢 - 多了网络跳转

| server      | http port | gRPC port |
| ----------- | --------- | --------- |
| master      | 9333      | 19333     |
| volume      | 8080      | 18080     |
| filer       | 8888      | 18888     |
| s3          | 8333      |
| webdav      | 7333      |
| iam         | 8111      |
| filer.debug | 6060      |

```shell
# ec 95% 1h 没操作的 volumn
ec.encode -fullPercent=95 -quietFor=1h
# 修复 ec
ec.rebuild -force
# 从新平衡 ec volumn 分布
ec.balance -force
```

## master service

- http://localhost:9333
- raft 协议 - 偶数个节点
- 大多情况下单节点足矣
- 添加新节点需要重启所有节点 - peers

## volumn service

- http://localhost:8080/ui/index.html
- 提供存储空间
- 维护 volumn

```bash
# 可以将 index 存储在更快的存储提高查询性能
weed volume -dir.idx=/fast/disk/dir
```

## filer service

- http://localhost:8888
- 组织维护 fs 信息
- 提供 fs 接口
- 元信息需要存储 - Cassandra, Mongodb, Redis, Elastic Search, MySql, Postgres, MemSql, TiDB, CockroachDB, Etcd
- 为确保原子性可使用 Postgres, MySQL
  - 文件重命名、目录重命名需要原子性支持
- 支持订阅文件变化发送消息
- **不支持递归目录删除**
- **如果 filer 元信息丢失，则会导致文件结构信息丢失** - 无法恢复，基本等同于文件丢失，且无法访问
- 可运行多个 filer - 多租户、负载
- 支持按 path 配置 filer store
  - 可以 trim prefix - 因此也能提供类似 mount 能力
- 文件分 chunk
  - chunk info 大约 40 bytes
- 大文件
  - manifest chunk to hold 1000 pieces of chunk info
- 支持加密 - AES256-GCM
  - 每个文件的 key 会存储到 filer store
  - 写到 volumn 的是加密后的数据
- 支持 Automatic Peer Discovery
  - filer 启动会注册到 master
  - 从 master 发现其他 filer
- 支持 同步 - embedded store replay 其他 filer
  - 通过 filer.store.id 识别不同 filer
    - 启动随机生成 uuid
- `-saveToFilerLimit=1024` - 小于 1k 的文件直接存储到 filer store
- 支持 Key-Value 存储
- 支持监听 filer.meta.tail
- metadata 事件 /topics/.system/log/yyyy-MM-dd/hh-mm.segment

```shell
fs.cd /
# 迁移 filer store
fs.meta.save            # 备份 meta
fs.meta.load uuid.meta  # 恢复 meta

# 同步 filer a<->b
# 支持指定路径 -a.path -b.path
# -isActivePassive a->b
filer.sync -a <filer1_host>:<filer1_port> -b <filer2_host>:<filer2_port>
```

## webdav

- `weed webdav`
- 暂不支持 auth

## s3 service

- 依赖 filer 存储在 `/buckets/<bucket_name>`
- 提供 s3 接口
- filer 可内置启动 `-s3=true`
- `weed s3` 启动 Gateway
- 不支持 Policy
- `weed iam` 支持 IAM

# source

- postgres2
  - 支持原子操作
  - 支持 Fast Bucket Deletion

```sql
CREATE TABLE IF NOT EXISTS "%s" (
  dirhash   BIGINT,
  name      VARCHAR(65535),
  directory VARCHAR(65535),
  meta      bytea,
  PRIMARY KEY (dirhash, name)
);
```

- https://github.com/viant/ptrie
  - prefix tree
  - 匹配 store 路径


```go
type Filer struct {
  Store               VirtualFilerStore
  MasterClient        *wdclient.MasterClient
	RemoteStorage       *FilerRemoteStorage
	UniqueFileId        uint32
	MetaAggregator      *MetaAggregator
  buckets             *FilerBuckets
}
```

- VirtualFilerStore
  - path 匹配映射多个 store
- MetaAggregator
  - 聚合多个 filer 元数据
- `weed filer -webdav -s3 -ima`
  - 同时启动多个服务，通过端口通讯，而不是直接传递的内部 filer 实现
- webdav
  - 基于 golang.org/x/net/webdav 实现
    - 使用 in-memory LockSystem
