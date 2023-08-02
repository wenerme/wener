---
tags:
  - Configuration
---

# ScyllaDB 配置

- /etc/scylla/scylla.yaml
- 参考
  - https://github.com/scylladb/scylladb/blob/master/conf/scylla.yaml
  - https://docs.scylladb.com/stable/getting-started/system-configuration.html

```yaml
listen_address: 0.0.0.0
# listen_interface: eth0
# listen_interface_prefer_ipv6: false
broadcast_address: POD_IP
broadcast_rpc_address: POD_IP
listen_on_broadcast_address: false
rpc_address: 0.0.0.0
# = listen_address
alternator_address: 0.0.0.0
# rpc_interface: eth1
# rpc_interface_prefer_ipv6: false
api_address: 0.0.0.0
prometheus_address: 0.0.0.0

rpc_port: 9160
api_port: 10000
prometheus_port: 9180
native_transport_port: 9042
native_shard_aware_transport_port: 19042
alternator_port: 8000
alternator_https_port: 8443
# native_transport_port_ssl: 9142
# native_shard_aware_transport_port_ssl: 19142
# storage_port: 7000
# ssl_storage_port: 7001
# start_native_transport: true
# native_transport_max_frame_size_in_mb: 256
start_rpc: true # thrift
rpc_keepalive: true

read_request_timeout_in_ms: 5000
write_request_timeout_in_ms: 2000
cas_contention_timeout_in_ms: 1000

# 推荐设置，不能修改
cluster_name: scylladb1
seed_provider:
  # 直接指定
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
      # 逗号分隔多个
      - seeds: '127.0.0.1'
# SimpleSnitch - 单节点
# GossipingPropertyFileSnitch
# PropertyFileSnitch, Ec2Snitch, Ec2MultiRegionSnitch, RackInferringSnitch
endpoint_snitch: SimpleSnitch

# 数量越大则会分配越多的数据
num_tokens: 256

workdir: /var/lib/scylla
data_file_directories:
  - /var/lib/scylla/data
hints_directory: /var/lib/scylla/hints
view_hints_directory: /var/lib/scylla/view_hints
commitlog_directory: /var/lib/scylla/commitlog

# https://docs.scylladb.com/architecture/anti-entropy/hinted-handoff
# hinted_handoff_enabled: DC1,DC2
# hinted_handoff_enabled: true
# max_hint_window_in_ms: 10800000 # 3 hours

# ====================
# Commit Log
# ====================
# periodic, batch
# batch ACK 会等待 commitlog_sync_batch_window_in_ms fsync
# periodic 立即 ACK 然后定时 fsync
commitlog_sync: periodic
commitlog_sync_period_in_ms: 10000
# 如果想要归档 commitlog 可以设置小一点
commitlog_segment_size_in_mb: 32
commitlog_total_space_in_mb: -1
force_schema_commit_log: true

batch_size_warn_threshold_in_kb: 128
batch_size_fail_threshold_in_kb: 1024


# PasswordAuthenticator - 存储在 system_auth.credentials
# com.scylladb.auth.TransitionalAuthenticator - 用于升级 auth
authenticator: AllowAllAuthenticator
# CassandraAuthorizer - 存储在 system_auth.permissions
# com.scylladb.auth.TransitionalAuthorizer
authorizer: AllowAllAuthorizer
permissions_validity_in_ms: 10000
permissions_update_interval_in_ms: 2000

# initial_token: # 一般不会用到

# experimental_features:
#     - udf
#     - alternator-streams
#     - alternator-ttl
#     - raft

partitioner: org.apache.cassandra.dht.Murmur3Partitioner
murmur3_partitioner_ignore_msb_bits: 12

phi_convict_threshold: 8

incremental_backups: false
snapshot_before_compaction: false
auto_snapshot: true
# tombstone_warn_threshold: 1000
# tombstone_failure_threshold: 100000

# column_index_size_in_kb: 64
# column_index_auto_scale_threshold_in_kb: 10240
# compaction_large_partition_warning_threshold_mb: 1000
# compaction_large_row_warning_threshold_mb: 10
# compaction_large_cell_warning_threshold_mb: 1
# compaction_rows_count_warning_threshold: 100000

# range_request_timeout_in_ms: 10000
# counter_write_request_timeout_in_ms: 5000
# cas_contention_timeout_in_ms: 1000
# truncate_request_timeout_in_ms: 60000
# request_timeout_in_ms: 10000

# server_encryption_options:
# client_encryption_options:

# internode_compression: none
# inter_dc_tcp_nodelay: false

# developer_mode: false

# defragment_memory_on_idle: true

# reversed_reads_auto_bypass_cache: false
# enable_optimized_reversed_reads: true
# enable_parallelized_aggregation: true

# always, forbid, unsafe
alternator_write_isolation: only_rmw_uses_lwt
```
