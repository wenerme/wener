---
title: Ceph
---

# Ceph

- 适用场景
  - 单独存储集群
  - 大存储集群 - 100TB+ PB+
- 不适用场景
  - 不太适合于直接部署到 k8s 小集群作为微服务存储使用
  - 简单的分布式文件系统
- [ceph/ceph](https://github.com/ceph/ceph)
  - LGPL-2.1+LGPL-3.0, C++
- imixs [Ceph](https://github.com/imixs/imixs-cloud/blob/master/doc/CEPH.md)
- 默认日志路径为 `/var/lib/ceph/osd/$cluster-$id/journal`, 可将该文件挂在到其它磁盘以增加性能
- Ceph 使用副本或 EC 来保护数据
- CephFS 默认端口为 6789
- 参考
  - [Bluestore vs. Filestore: A Functional Comparison and a Benchmark](https://www.youtube.com/watch?v=VFeDB7PQHZ4)
  - [文档](http://docs.ceph.com/docs/master/)

**最佳实践**

- 每个 OSD 预留 2G 内存,每个 OSD 一个磁盘,冗余 NIC
- 如果有 SSD, 可将 SSD 作为日志磁盘, 使用机械盘作为存储磁盘, 如果 SSD 较少,可多个 OSD 共用一个 SSD(一个 SSD 损坏影响多个 OSD)
- 使用 SSD 前最好事先测试出顺序和随机读写的性能
- MON 位于单独服务器, 不需要太多的 RAM 和磁盘,冗余 NIC
- 如果单个主机上 OSD 较多(例如 >20),建议增大系统线程数 `kernel.pid_max = 4194303`
- [推荐硬件](http://docs.ceph.com/docs/master/start/hardware-recommendations/)
  - 不推荐和计算集群一起部署 - k8s
  - ceph-mds - metadata
    - 4 CPU+
    - 1GB+
  - ceph-osd
    - 2 CPU+
    - 默认 4GB， 2-4GB 可用，不推荐小于 2GB
    - 小文件多建议 4GB+，大数据传输建议 256GB+
    - 磁盘推荐 1TB+
    - 不推荐 1硬盘 1OSD 1MSD，不推荐 1硬盘多OSD
    - 分离 日志、数据、系统 盘
    - 推荐使用 SSD 作为 日志 盘
    - 确保网络带宽大于总磁盘带宽
    - 10Gbps+ - 1T 副本 20分钟
  - ceph-mgr
    - 1-2 GB 小集群，5-10 GB 大集群 - 随集群扩容 - 基本 1G/1T
  - ceph-mon - monitor
    - CPU 要求不高
    - 1-2 GB 小集群，5-10 GB 大集群 - 同 ceph-mgr
- 参考 [推荐操作系统](http://docs.ceph.com/docs/master/start/os-recommendations/)


| **对象存储/rados**       | **块设备/RBD**            | **文件系统/CephFS**       |
| ------------------ | ------------------------- | ------------------------- |
| REST 接口          | Thin-provisioned          | 符合 POSIX 语义           |
| S3、Swift 兼容接口 | 16 EB                     | 元数据数据分离            |
| S3 子域名          | Configurable striping     | Configurable striping     |
| S3、Swift 命名空间 | 内存缓存                  | 动态平衡                  |
| 用户管理           | 快照                      | 子目录快照                |
| 使用跟踪           | COW 克隆                  | FUSE 支持                 |
| Striped objects    | 内核驱动支持              | 内核驱动支持              |
| 云集成             | KVM/libvirt 支持          | 可部署 NFS/CIFS           |
| 多站点部署         | 后端云方案集成            | 可配合 Hadoop - 替代 HDFS |
| 多站点副本         | 增量备份                  |
|                    | 灾难恢复 - 多站点异步副本 |

**所有的命令**

```
ceph                   ceph-create-keys       ceph-detect-init       ceph-fuse              ceph-post-file
ceph-authtool          ceph-crush-location    ceph-disk              ceph-mds               ceph-rbdnamer
ceph-bluefs-tool       ceph-debugpack         cephfs-data-scan       ceph-mon               ceph-rest-api
ceph-clsinfo           ceph-dencoder          cephfs-journal-tool    ceph-objectstore-tool  ceph-run
ceph-conf              ceph-deploy            cephfs-table-tool      ceph-osd               ceph-syn
```

```bash
# 查看磁盘类型
file -sL /dev/vda1
df -T

# XFS 测试
apt-get install xfsprogs
# 使用文件创建 xfs
truncate -s 2G data.vol
# 也可挂载为设备
# losetup /dev/loop5 data.vol

# 格式化 n 创建分区 p 主分区 w 写入
fdisk data.vol
# 格式化为 xfs
mkfs.xfs -f data.vol
# 挂载
mkdir /storage
mount -t xfs data.vol /storage
# 查看文件系统
df -Th /storage

##########
# RADOS
##########
rados mkpool data # 创建 Pool
echo Test-data > testfile.txt
rados put tf.txt testfile.txt -p data # 放入文件
rados -p data ls # 查看对象
ceph osd map data tf.txt # 找到存储的对象映射

rados df # 查看使用量

rados lspools # 查看所有的 rados pool
rados -p metadata ls # 查看某个 pool 中的对象

# 获取 pg pgp 数量
ceph osd pool get data pgp_num
ceph osd pool get data pg_num
# 查看副本数量
ceph osd dump | grep size


##########
# RDB
##########
# 挂载 RBD
# 尽量使用 3.5+ 内核版本
uname -r
modprobe rbd

rbd create rbd-1
rbd info rbd-1
rbd map rbd/rbd-1
# 查看映射的设备
rbd showmapped
# 挂载文件系统
mkfs.btrfs /dev/rbd0
mkdir -p /mnt/rbd/rbd-1
mount /dev/rbd0 /mnt/rbd/rbd-1
# 然后就可以使用了
# docker run --name redis -v /mnt/rbd/rbd-1:/data -d redis redis-server --appendonly yes
# docker exec -it redis redis-cli set a 1
# docker exec -it redis redis-cli keys *
# cat /mnt/rbd/rbd-1/appendonly.aof

# 映射可能会出现由于 krbd 不支持 ceph rbd 特性的错误
# 查看 Ceph 打开的特性
ceph --show-config|grep rbd|grep features
# layering      | 1
# striping      | 2
# exclusive-lock| 3
# object-map    | 8
# fast-diff     | 16
# deep-flatten  | 32

# 关闭相关特性
rbd feature disable rbd/rbd-1 deep-flatten
rbd feature disable rbd/rbd-1 fast-diff
rbd feature disable rbd/rbd-1 object-map
rbd feature disable rbd/rbd-1 exclusive-lock
# 也可以使用
# for i in deep-flatten fast-diff object-map exclusive-lock; do rbd feature disable rbd/rbd-1 $i; done

# 可以在配置中添加 rbd_default_features = 3 以修改创建出的 rbd 特性
# 到 4.6 为止,依然只支持 1+2

# CephFS
ceph-deploy mds create ceph-node1

ceph osd pool create fs_data 128 128
ceph osd pool create fs_metadata 128 128

ceph fs new cephfs fs_data fs_metadata
ceph fs ls
ceph mds stat

mkdir -p /mnt/cfs
# 查看 secret 值
cat ceph.client.admin.keyring
mount -t ceph 地址:6789:/ /mnt/cfs -o name=admin,secret=上面的secret值
# 也可以将 secret 放在文件中
# mount -t ceph 地址:6789:/ /mnt/cfs -o name=admin,secretfile=文件路径

```

## Troubleshooting

- 日志目录 `/var/log/ceph`
- Admin Socket `/var/run/ceph`
  - 使用上述的 socket 来操作
  - `ceph daemon mon.node-2 help`
  - `ceph daemon /var/run/ceph/ceph-mon.hd2-2.asok help`
- 查看 systemd 操作日志 `journalctl -xe`
- 配置数据存储目录 `/var/lib/ceph/`

```

```

http://docs.ceph.com/docs/jewel/rados/troubleshooting/troubleshooting-osd/

## 技术比较

### vs HDFS

- HDFS
  - Name Node 会造成单点,且是整个系统中的瓶颈
- Ceph
  - 集群为 AA 模式, 无单点
  - CRUSH 使得对象存储不会存在中心服务,架构中无瓶颈

## 命令行

```
$ rbd create -h
usage: rbd <command> ...

Command-line interface for managing Ceph RBD images.

Positional arguments:
  <command>
    bench-write                 Simple write benchmark.
    children                    Display children of snapshot.
    clone                       Clone a snapshot into a COW child image.
    copy (cp)                   Copy src image to dest.
    create                      Create an empty image.
    diff                        Print extents that differ since a previous
                                snap, or image creation.
    disk-usage (du)             Show disk usage stats for pool, image or
                                snapshot
    export                      Export image to file.
    export-diff                 Export incremental diff to file.
    feature disable             Disable the specified image feature.
    feature enable              Enable the specified image feature.
    flatten                     Fill clone with parent data (make it
                                independent).
    image-meta get              Image metadata get the value associated with
                                the key.
    image-meta list             Image metadata list keys with values.
    image-meta remove           Image metadata remove the key and value
                                associated.
    image-meta set              Image metadata set key with value.
    import                      Import image from file.
    import-diff                 Import an incremental diff.
    info                        Show information about image size, striping,
                                etc.
    journal export              Export image journal.
    journal import              Import image journal.
    journal info                Show information about image journal.
    journal inspect             Inspect image journal for structural errors.
    journal reset               Reset image journal.
    journal status              Show status of image journal.
    list (ls)                   List rbd images.
    lock add                    Take a lock on an image.
    lock list (lock ls)         Show locks held on an image.
    lock remove (lock rm)       Release a lock on an image.
    map                         Map image to a block device using the kernel.
    merge-diff                  Merge two diff exports together.
    mirror image demote         Demote an image to non-primary for RBD
                                mirroring.
    mirror image disable        Disable RBD mirroring for an image.
    mirror image enable         Enable RBD mirroring for an image.
    mirror image promote        Promote an image to primary for RBD mirroring.
    mirror image resync         Force resync to primary image for RBD mirroring.
    mirror image status         Show RDB mirroring status for an image.
    mirror pool disable         Disable RBD mirroring by default within a pool.
    mirror pool enable          Enable RBD mirroring by default within a pool.
    mirror pool info            Show information about the pool mirroring
                                configuration.
    mirror pool peer add        Add a mirroring peer to a pool.
    mirror pool peer remove     Remove a mirroring peer from a pool.
    mirror pool peer set        Update mirroring peer settings.
    mirror pool status          Show status for all mirrored images in the pool.
    nbd list (nbd ls)           List the nbd devices already used.
    nbd map                     Map image to a nbd device.
    nbd unmap                   Unmap a nbd device.
    object-map rebuild          Rebuild an invalid object map.
    remove (rm)                 Delete an image.
    rename (mv)                 Rename image within pool.
    resize                      Resize (expand or shrink) image.
    showmapped                  Show the rbd images mapped by the kernel.
    snap create (snap add)      Create a snapshot.
    snap list (snap ls)         Dump list of image snapshots.
    snap protect                Prevent a snapshot from being deleted.
    snap purge                  Deletes all snapshots.
    snap remove (snap rm)       Deletes a snapshot.
    snap rename                 Rename a snapshot.
    snap rollback (snap revert) Rollback image to snapshot.
    snap unprotect              Allow a snapshot to be deleted.
    status                      Show the status of this image.
    unmap                       Unmap a rbd device that was used by the kernel.
    watch                       Watch events on image.

Optional arguments:
  -c [ --conf ] arg     path to cluster configuration
  --cluster arg         cluster name
  --id arg              client id (without 'client.' prefix)
  --user arg            client id (without 'client.' prefix)
  -n [ --name ] arg     client name
  -m [ --mon_host ] arg monitor host
  --secret arg          path to secret key (deprecated)
  -K [ --keyfile ] arg  path to secret key
  -k [ --keyring ] arg  path to keyring

See 'rbd help <command>' for help on a specific command.
```

```
$ ceph -h

 General usage:
 ==============
usage: ceph [-h] [-c CEPHCONF] [-i INPUT_FILE] [-o OUTPUT_FILE]
            [--id CLIENT_ID] [--name CLIENT_NAME] [--cluster CLUSTER]
            [--admin-daemon ADMIN_SOCKET] [--admin-socket ADMIN_SOCKET_NOPE]
            [-s] [-w] [--watch-debug] [--watch-info] [--watch-sec]
            [--watch-warn] [--watch-error] [--version] [--verbose] [--concise]
            [-f {json,json-pretty,xml,xml-pretty,plain}]
            [--connect-timeout CLUSTER_TIMEOUT]

Ceph administration tool

optional arguments:
  -h, --help            request mon help
  -c CEPHCONF, --conf CEPHCONF
                        ceph configuration file
  -i INPUT_FILE, --in-file INPUT_FILE
                        input file
  -o OUTPUT_FILE, --out-file OUTPUT_FILE
                        output file
  --id CLIENT_ID, --user CLIENT_ID
                        client id for authentication
  --name CLIENT_NAME, -n CLIENT_NAME
                        client name for authentication
  --cluster CLUSTER     cluster name
  --admin-daemon ADMIN_SOCKET
                        submit admin-socket commands ("help" for help
  --admin-socket ADMIN_SOCKET_NOPE
                        you probably mean --admin-daemon
  -s, --status          show cluster status
  -w, --watch           watch live cluster changes
  --watch-debug         watch debug events
  --watch-info          watch info events
  --watch-sec           watch security events
  --watch-warn          watch warn events
  --watch-error         watch error events
  --version, -v         display version
  --verbose             make verbose
  --concise             make less verbose
  -f {json,json-pretty,xml,xml-pretty,plain}, --format {json,json-pretty,xml,xml-pretty,plain}
  --connect-timeout CLUSTER_TIMEOUT
                        set a timeout for connecting to the cluster

 Monitor commands:
 =================
[Contacting monitor, timeout after 5 seconds]
auth add <entity> {<caps> [<caps>...]}   add auth info for <entity> from input
                                          file, or random key if no input is
                                          given, and/or any caps specified in
                                          the command
auth caps <entity> <caps> [<caps>...]    update caps for <name> from caps
                                          specified in the command
auth del <entity>                        delete all caps for <name>
auth export {<entity>}                   write keyring for requested entity, or
                                          master keyring if none given
auth get <entity>                        write keyring file with requested key
auth get-key <entity>                    display requested key
auth get-or-create <entity> {<caps>      add auth info for <entity> from input
 [<caps>...]}                             file, or random key if no input given,
                                          and/or any caps specified in the
                                          command
auth get-or-create-key <entity> {<caps>  get, or add, key for <name> from
 [<caps>...]}                             system/caps pairs specified in the
                                          command.  If key already exists, any
                                          given caps must match the existing
                                          caps for that key.
auth import                              auth import: read keyring file from -i
                                          <file>
auth list                                list authentication state
auth print-key <entity>                  display requested key
auth print_key <entity>                  display requested key
auth rm <entity>                         remove all caps for <name>
compact                                  cause compaction of monitor's leveldb
                                          storage (DEPRECATED)
config-key del <key>                     delete <key>
config-key exists <key>                  check for <key>'s existence
config-key get <key>                     get <key>
config-key list                          list keys
config-key put <key> {<val>}             put <key>, value <val>
config-key rm <key>                      rm <key>
df {detail}                              show cluster free space stats
fs add_data_pool <fs_name> <pool>        add data pool <pool>
fs dump {<int[0-]>}                      dump all CephFS status, optionally
                                          from epoch
fs flag set enable_multiple <val> {--    Set a global CephFS flag
 yes-i-really-mean-it}
fs get <fs_name>                         get info about one filesystem
fs ls                                    list filesystems
fs new <fs_name> <metadata> <data>       make new filesystem using named pools
                                          <metadata> and <data>
fs reset <fs_name> {--yes-i-really-mean- disaster recovery only: reset to a
 it}                                      single-MDS map
fs rm <fs_name> {--yes-i-really-mean-it} disable the named filesystem
fs rm_data_pool <fs_name> <pool>         remove data pool <pool>
fs set <fs_name> max_mds|max_file_size|  set mds parameter <var> to <val>
 allow_new_snaps|inline_data|cluster_
 down|allow_multimds|allow_dirfrags
 <val> {<confirm>}
fs set_default <fs_name>                 set the default to the named filesystem
fsid                                     show cluster FSID/UUID
health {detail}                          show cluster health
heap dump|start_profiler|stop_profiler|  show heap usage info (available only
 release|stats                            if compiled with tcmalloc)
injectargs <injected_args> [<injected_   inject config arguments into monitor
 args>...]
log <logtext> [<logtext>...]             log supplied text to the monitor log
mds add_data_pool <pool>                 add data pool <pool>
mds cluster_down                         take MDS cluster down
mds cluster_up                           bring MDS cluster up
mds compat rm_compat <int[0-]>           remove compatible feature
mds compat rm_incompat <int[0-]>         remove incompatible feature
mds compat show                          show mds compatibility settings
mds deactivate <who>                     stop mds
mds dump {<int[0-]>}                     dump legacy MDS cluster info,
                                          optionally from epoch
mds fail <who>                           force mds to status failed
mds getmap {<int[0-]>}                   get MDS map, optionally from epoch
mds metadata <who>                       fetch metadata for mds <who>
mds newfs <int[0-]> <int[0-]> {--yes-i-  make new filesystem using pools
 really-mean-it}                          <metadata> and <data>
mds remove_data_pool <pool>              remove data pool <pool>
mds repaired <rank>                      mark a damaged MDS rank as no longer
                                          damaged
mds rm <int[0-]>                         remove nonactive mds
mds rm_data_pool <pool>                  remove data pool <pool>
mds rmfailed <who> {<confirm>}           remove failed mds
mds set max_mds|max_file_size|allow_new_ set mds parameter <var> to <val>
 snaps|inline_data|allow_multimds|allow_
 dirfrags <val> {<confirm>}
mds set_max_mds <int[0-]>                set max MDS index
mds set_state <int[0-]> <int[0-20]>      set mds state of <gid> to <numeric-
                                          state>
mds stat                                 show MDS status
mds stop <who>                           stop mds
mds tell <who> <args> [<args>...]        send command to particular mds
mon add <name> <IPaddr[:port]>           add new monitor named <name> at <addr>
mon compact                              cause compaction of monitor's leveldb
                                          storage
mon dump {<int[0-]>}                     dump formatted monmap (optionally from
                                          epoch)
mon getmap {<int[0-]>}                   get monmap
mon metadata <id>                        fetch metadata for mon <id>
mon remove <name>                        remove monitor named <name>
mon rm <name>                            remove monitor named <name>
mon scrub                                scrub the monitor stores
mon stat                                 summarize monitor status
mon sync force {--yes-i-really-mean-it}  force sync of and clear monitor store
 {--i-know-what-i-am-doing}
mon_status                               report status of monitors
node ls {all|osd|mon|mds}                list all nodes in cluster [type]
osd blacklist add|rm <EntityAddr>        add (optionally until <expire> seconds
 {<float[0.0-]>}                          from now) or remove <addr> from
                                          blacklist
osd blacklist clear                      clear all blacklisted clients
osd blacklist ls                         show blacklisted clients
osd blocked-by                           print histogram of which OSDs are
                                          blocking their peers
osd create {<uuid>} {<int[0-]>}          create new osd (with optional UUID and
                                          ID)
osd crush add <osdname (id|osd.id)>      add or update crushmap position and
 <float[0.0-]> <args> [<args>...]         weight for <name> with <weight> and
                                          location <args>
osd crush add-bucket <name> <type>       add no-parent (probably root) crush
                                          bucket <name> of type <type>
osd crush create-or-move <osdname (id|   create entry or move existing entry
 osd.id)> <float[0.0-]> <args> [<args>..  for <name> <weight> at/to location
 .]                                       <args>
osd crush dump                           dump crush map
osd crush get-tunable straw_calc_version get crush tunable <tunable>
osd crush link <name> <args> [<args>...] link existing entry for <name> under
                                          location <args>
osd crush move <name> <args> [<args>...] move existing entry for <name> to
                                          location <args>
osd crush remove <name> {<ancestor>}     remove <name> from crush map (
                                          everywhere, or just at <ancestor>)
osd crush rename-bucket <srcname>        rename bucket <srcname> to <dstname>
 <dstname>
osd crush reweight <name> <float[0.0-]>  change <name>'s weight to <weight> in
                                          crush map
osd crush reweight-all                   recalculate the weights for the tree
                                          to ensure they sum correctly
osd crush reweight-subtree <name>        change all leaf items beneath <name>
 <float[0.0-]>                            to <weight> in crush map
osd crush rm <name> {<ancestor>}         remove <name> from crush map (
                                          everywhere, or just at <ancestor>)
osd crush rule create-erasure <name>     create crush rule <name> for erasure
 {<profile>}                              coded pool created with <profile> (
                                          default default)
osd crush rule create-simple <name>      create crush rule <name> to start from
 <root> <type> {firstn|indep}             <root>, replicate across buckets of
                                          type <type>, using a choose mode of
                                          <firstn|indep> (default firstn; indep
                                          best for erasure pools)
osd crush rule dump {<name>}             dump crush rule <name> (default all)
osd crush rule list                      list crush rules
osd crush rule ls                        list crush rules
osd crush rule rm <name>                 remove crush rule <name>
osd crush set                            set crush map from input file
osd crush set <osdname (id|osd.id)>      update crushmap position and weight
 <float[0.0-]> <args> [<args>...]         for <name> to <weight> with location
                                          <args>
osd crush set-tunable straw_calc_        set crush tunable <tunable> to <value>
 version <int>
osd crush show-tunables                  show current crush tunables
osd crush tree                           dump crush buckets and items in a tree
                                          view
osd crush tunables legacy|argonaut|      set crush tunables values to <profile>
 bobtail|firefly|hammer|jewel|optimal|
 default
osd crush unlink <name> {<ancestor>}     unlink <name> from crush map (
                                          everywhere, or just at <ancestor>)
osd deep-scrub <who>                     initiate deep scrub on osd <who>
osd df {plain|tree}                      show OSD utilization
osd down <ids> [<ids>...]                set osd(s) <id> [<id>...] down
osd dump {<int[0-]>}                     print summary of OSD map
osd erasure-code-profile get <name>      get erasure code profile <name>
osd erasure-code-profile ls              list all erasure code profiles
osd erasure-code-profile rm <name>       remove erasure code profile <name>
osd erasure-code-profile set <name>      create erasure code profile <name>
 {<profile> [<profile>...]}               with [<key[=value]> ...] pairs. Add a
                                          --force at the end to override an
                                          existing profile (VERY DANGEROUS)
osd find <int[0-]>                       find osd <id> in the CRUSH map and
                                          show its location
osd getcrushmap {<int[0-]>}              get CRUSH map
osd getmap {<int[0-]>}                   get OSD map
osd getmaxosd                            show largest OSD id
osd in <ids> [<ids>...]                  set osd(s) <id> [<id>...] in
osd lost <int[0-]> {--yes-i-really-mean- mark osd as permanently lost. THIS
 it}                                      DESTROYS DATA IF NO MORE REPLICAS
                                          EXIST, BE CAREFUL
osd ls {<int[0-]>}                       show all OSD ids
osd lspools {<int>}                      list pools
osd map <poolname> <objectname>          find pg for <object> in <pool> with
 {<nspace>}                               [namespace]
osd metadata {<int[0-]>}                 fetch metadata for osd {id} (default
                                          all)
osd out <ids> [<ids>...]                 set osd(s) <id> [<id>...] out
osd pause                                pause osd
osd perf                                 print dump of OSD perf summary stats
osd pg-temp <pgid> {<id> [<id>...]}      set pg_temp mapping pgid:[<id> [<id>...
                                          ]] (developers only)
osd pool create <poolname> <int[0-]>     create pool
 {<int[0-]>} {replicated|erasure}
 {<erasure_code_profile>} {<ruleset>}
 {<int>}
osd pool delete <poolname> {<poolname>}  delete pool
 {--yes-i-really-really-mean-it}
osd pool get <poolname> size|min_size|   get pool parameter <var>
 crash_replay_interval|pg_num|pgp_num|
 crush_ruleset|hashpspool|nodelete|
 nopgchange|nosizechange|write_fadvise_
 dontneed|noscrub|nodeep-scrub|hit_set_
 type|hit_set_period|hit_set_count|hit_
 set_fpp|auid|target_max_objects|target_
 max_bytes|cache_target_dirty_ratio|
 cache_target_dirty_high_ratio|cache_
 target_full_ratio|cache_min_flush_age|
 cache_min_evict_age|erasure_code_
 profile|min_read_recency_for_promote|
 all|min_write_recency_for_promote|fast_
 read|hit_set_grade_decay_rate|hit_set_
 search_last_n|scrub_min_interval|scrub_
 max_interval|deep_scrub_interval|
 recovery_priority|recovery_op_priority|
 scrub_priority
osd pool get-quota <poolname>            obtain object or byte limits for pool
osd pool ls {detail}                     list pools
osd pool mksnap <poolname> <snap>        make snapshot <snap> in <pool>
osd pool rename <poolname> <poolname>    rename <srcpool> to <destpool>
osd pool rm <poolname> {<poolname>} {--  remove pool
 yes-i-really-really-mean-it}
osd pool rmsnap <poolname> <snap>        remove snapshot <snap> from <pool>
osd pool set <poolname> size|min_size|   set pool parameter <var> to <val>
 crash_replay_interval|pg_num|pgp_num|
 crush_ruleset|hashpspool|nodelete|
 nopgchange|nosizechange|write_fadvise_
 dontneed|noscrub|nodeep-scrub|hit_set_
 type|hit_set_period|hit_set_count|hit_
 set_fpp|use_gmt_hitset|debug_fake_ec_
 pool|target_max_bytes|target_max_
 objects|cache_target_dirty_ratio|cache_
 target_dirty_high_ratio|cache_target_
 full_ratio|cache_min_flush_age|cache_
 min_evict_age|auid|min_read_recency_
 for_promote|min_write_recency_for_
 promote|fast_read|hit_set_grade_decay_
 rate|hit_set_search_last_n|scrub_min_
 interval|scrub_max_interval|deep_scrub_
 interval|recovery_priority|recovery_op_
 priority|scrub_priority <val> {--yes-i-
 really-mean-it}
osd pool set-quota <poolname> max_       set object or byte limit on pool
 objects|max_bytes <val>
osd pool stats {<name>}                  obtain stats from all pools, or from
                                          specified pool
osd primary-affinity <osdname (id|osd.   adjust osd primary-affinity from 0.0 <=
 id)> <float[0.0-1.0]>                     <weight> <= 1.0
osd primary-temp <pgid> <id>             set primary_temp mapping pgid:<id>|-1 (
                                          developers only)
osd repair <who>                         initiate repair on osd <who>
osd reweight <int[0-]> <float[0.0-1.0]>  reweight osd to 0.0 < <weight> < 1.0
osd reweight-by-pg {<int>} {<float>}     reweight OSDs by PG distribution
 {<int>} {<poolname> [<poolname>...]}     [overload-percentage-for-
                                          consideration, default 120]
osd reweight-by-utilization {<int>}      reweight OSDs by utilization [overload-
 {<float>} {<int>} {--no-increasing}      percentage-for-consideration, default
                                          120]
osd rm <ids> [<ids>...]                  remove osd(s) <id> [<id>...] in
osd scrub <who>                          initiate scrub on osd <who>
osd set full|pause|noup|nodown|noout|    set <key>
 noin|nobackfill|norebalance|norecover|
 noscrub|nodeep-scrub|notieragent|
 sortbitwise
osd setcrushmap                          set crush map from input file
osd setmaxosd <int[0-]>                  set new maximum osd value
osd stat                                 print summary of OSD map
osd test-reweight-by-pg {<int>}          dry run of reweight OSDs by PG
 {<float>} {<int>} {<poolname>            distribution [overload-percentage-for-
 [<poolname>...]}                         consideration, default 120]
osd test-reweight-by-utilization         dry run of reweight OSDs by
 {<int>} {<float>} {<int>} {--no-         utilization [overload-percentage-for-
 increasing}                              consideration, default 120]
osd thrash <int[0-]>                     thrash OSDs for <num_epochs>
osd tier add <poolname> <poolname> {--   add the tier <tierpool> (the second
 force-nonempty}                          one) to base pool <pool> (the first
                                          one)
osd tier add-cache <poolname>            add a cache <tierpool> (the second one)
 <poolname> <int[0-]>                     of size <size> to existing pool
                                          <pool> (the first one)
osd tier cache-mode <poolname> none|     specify the caching mode for cache
 writeback|forward|readonly|readforward|  tier <pool>
 proxy|readproxy {--yes-i-really-mean-
 it}
osd tier remove <poolname> <poolname>    remove the tier <tierpool> (the second
                                          one) from base pool <pool> (the first
                                          one)
osd tier remove-overlay <poolname>       remove the overlay pool for base pool
                                          <pool>
osd tier rm <poolname> <poolname>        remove the tier <tierpool> (the second
                                          one) from base pool <pool> (the first
                                          one)
osd tier rm-overlay <poolname>           remove the overlay pool for base pool
                                          <pool>
osd tier set-overlay <poolname>          set the overlay pool for base pool
 <poolname>                               <pool> to be <overlaypool>
osd tree {<int[0-]>}                     print OSD tree
osd unpause                              unpause osd
osd unset full|pause|noup|nodown|noout|  unset <key>
 noin|nobackfill|norebalance|norecover|
 noscrub|nodeep-scrub|notieragent|
 sortbitwise
osd utilization                          get basic pg distribution stats
pg debug unfound_objects_exist|degraded_ show debug info about pgs
 pgs_exist
pg deep-scrub <pgid>                     start deep-scrub on <pgid>
pg dump {all|summary|sum|delta|pools|    show human-readable versions of pg map
 osds|pgs|pgs_brief [all|summary|sum|     (only 'all' valid with plain)
 delta|pools|osds|pgs|pgs_brief...]}
pg dump_json {all|summary|sum|pools|     show human-readable version of pg map
 osds|pgs [all|summary|sum|pools|osds|    in json only
 pgs...]}
pg dump_pools_json                       show pg pools info in json only
pg dump_stuck {inactive|unclean|stale|   show information about stuck pgs
 undersized|degraded [inactive|unclean|
 stale|undersized|degraded...]} {<int>}
pg force_create_pg <pgid>                force creation of pg <pgid>
pg getmap                                get binary pg map to -o/stdout
pg ls {<int>} {active|clean|down|replay| list pg with specific pool, osd, state
 splitting|scrubbing|scrubq|degraded|
 inconsistent|peering|repair|recovering|
 backfill_wait|incomplete|stale|
 remapped|deep_scrub|backfill|backfill_
 toofull|recovery_wait|undersized|
 activating|peered [active|clean|down|
 replay|splitting|scrubbing|scrubq|
 degraded|inconsistent|peering|repair|
 recovering|backfill_wait|incomplete|
 stale|remapped|deep_scrub|backfill|
 backfill_toofull|recovery_wait|
 undersized|activating|peered...]}
pg ls-by-osd <osdname (id|osd.id)>       list pg on osd [osd]
 {<int>} {active|clean|down|replay|
 splitting|scrubbing|scrubq|degraded|
 inconsistent|peering|repair|recovering|
 backfill_wait|incomplete|stale|
 remapped|deep_scrub|backfill|backfill_
 toofull|recovery_wait|undersized|
 activating|peered [active|clean|down|
 replay|splitting|scrubbing|scrubq|
 degraded|inconsistent|peering|repair|
 recovering|backfill_wait|incomplete|
 stale|remapped|deep_scrub|backfill|
 backfill_toofull|recovery_wait|
 undersized|activating|peered...]}
pg ls-by-pool <poolstr> {active|clean|   list pg with pool = [poolname | poolid]
 down|replay|splitting|scrubbing|scrubq|
 degraded|inconsistent|peering|repair|
 recovering|backfill_wait|incomplete|
 stale|remapped|deep_scrub|backfill|
 backfill_toofull|recovery_wait|
 undersized|activating|peered [active|
 clean|down|replay|splitting|scrubbing|
 scrubq|degraded|inconsistent|peering|
 repair|recovering|backfill_wait|
 incomplete|stale|remapped|deep_scrub|
 backfill|backfill_toofull|recovery_
 wait|undersized|activating|peered...]}
pg ls-by-primary <osdname (id|osd.id)>   list pg with primary = [osd]
 {<int>} {active|clean|down|replay|
 splitting|scrubbing|scrubq|degraded|
 inconsistent|peering|repair|recovering|
 backfill_wait|incomplete|stale|
 remapped|deep_scrub|backfill|backfill_
 toofull|recovery_wait|undersized|
 activating|peered [active|clean|down|
 replay|splitting|scrubbing|scrubq|
 degraded|inconsistent|peering|repair|
 recovering|backfill_wait|incomplete|
 stale|remapped|deep_scrub|backfill|
 backfill_toofull|recovery_wait|
 undersized|activating|peered...]}
pg map <pgid>                            show mapping of pg to osds
pg repair <pgid>                         start repair on <pgid>
pg scrub <pgid>                          start scrub on <pgid>
pg send_pg_creates                       trigger pg creates to be issued
pg set_full_ratio <float[0.0-1.0]>       set ratio at which pgs are considered
                                          full
pg set_nearfull_ratio <float[0.0-1.0]>   set ratio at which pgs are considered
                                          nearly full
pg stat                                  show placement group status.
quorum enter|exit                        enter or exit quorum
quorum_status                            report status of monitor quorum
report {<tags> [<tags>...]}              report full status of cluster,
                                          optional title tag strings
scrub                                    scrub the monitor stores (DEPRECATED)
status                                   show cluster status
sync force {--yes-i-really-mean-it} {--  force sync of and clear monitor store (
 i-know-what-i-am-doing}                  DEPRECATED)
tell <name (type.id)> <args> [<args>...] send a command to a specific daemon
version                                  show mon daemon version
```

## FAQ

### HEALTH_ERR 64 pgs are stuck inactive for more than 300 seconds; 64 pgs stuck inactive

这个是有可能由很多问题引起的,可分别查看其它服务上的日志来判断 `cat /var/log/ceph/ceph*`

### ERROR: osd init failed: (36) File name too long

文件名太长,可能是由于文件系统类型导致的 `df -T`,一般建议使用 XFS 或 Btrfs, 但大多数情况下是 ext4, 文件名不能超过 1024b.
