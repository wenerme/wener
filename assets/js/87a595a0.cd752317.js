"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["47647"],{3955:function(n,e,t){t.r(e),t.d(e,{metadata:()=>r,contentTitle:()=>o,default:()=>d,assets:()=>l,toc:()=>_,frontMatter:()=>i});var r=JSON.parse('{"id":"db/column/scylladb/scylladb-conf","title":"ScyllaDB \u914D\u7F6E","description":"- /etc/scylla/scylla.yaml","source":"@site/../notes/db/column/scylladb/scylladb-conf.md","sourceDirName":"db/column/scylladb","slug":"/db/column/scylladb/conf","permalink":"/notes/db/column/scylladb/conf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/column/scylladb/scylladb-conf.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1690946986000,"frontMatter":{"tags":["Configuration"]},"sidebar":"docs","previous":{"title":"ScyllaDB","permalink":"/notes/db/column/scylladb/"},"next":{"title":"ScyllaDB \u5F00\u53D1","permalink":"/notes/db/column/scylladb/dev"}}'),a=t("52676"),s=t("79938");let i={tags:["Configuration"]},o="ScyllaDB \u914D\u7F6E",l={},_=[];function c(n){let e={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"scylladb-\u914D\u7F6E",children:"ScyllaDB \u914D\u7F6E"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"/etc/scylla/scylla.yaml"}),"\n",(0,a.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://github.com/scylladb/scylladb/blob/master/conf/scylla.yaml",children:"https://github.com/scylladb/scylladb/blob/master/conf/scylla.yaml"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://docs.scylladb.com/stable/getting-started/system-configuration.html",children:"https://docs.scylladb.com/stable/getting-started/system-configuration.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-yaml",children:"listen_address: 0.0.0.0\n# listen_interface: eth0\n# listen_interface_prefer_ipv6: false\nbroadcast_address: POD_IP\nbroadcast_rpc_address: POD_IP\nlisten_on_broadcast_address: false\nrpc_address: 0.0.0.0\n# = listen_address\nalternator_address: 0.0.0.0\n# rpc_interface: eth1\n# rpc_interface_prefer_ipv6: false\napi_address: 0.0.0.0\nprometheus_address: 0.0.0.0\n\nrpc_port: 9160\napi_port: 10000\nprometheus_port: 9180\nnative_transport_port: 9042\nnative_shard_aware_transport_port: 19042\nalternator_port: 8000\nalternator_https_port: 8443\n# native_transport_port_ssl: 9142\n# native_shard_aware_transport_port_ssl: 19142\n# storage_port: 7000\n# ssl_storage_port: 7001\n# start_native_transport: true\n# native_transport_max_frame_size_in_mb: 256\nstart_rpc: true # thrift\nrpc_keepalive: true\n\nread_request_timeout_in_ms: 5000\nwrite_request_timeout_in_ms: 2000\ncas_contention_timeout_in_ms: 1000\n\n# \u63A8\u8350\u8BBE\u7F6E\uFF0C\u4E0D\u80FD\u4FEE\u6539\ncluster_name: scylladb1\nseed_provider:\n  # \u76F4\u63A5\u6307\u5B9A\n  - class_name: org.apache.cassandra.locator.SimpleSeedProvider\n    parameters:\n      # \u9017\u53F7\u5206\u9694\u591A\u4E2A\n      - seeds: '127.0.0.1'\n# SimpleSnitch - \u5355\u8282\u70B9\n# GossipingPropertyFileSnitch\n# PropertyFileSnitch, Ec2Snitch, Ec2MultiRegionSnitch, RackInferringSnitch\nendpoint_snitch: SimpleSnitch\n\n# \u6570\u91CF\u8D8A\u5927\u5219\u4F1A\u5206\u914D\u8D8A\u591A\u7684\u6570\u636E\nnum_tokens: 256\n\nworkdir: /var/lib/scylla\ndata_file_directories:\n  - /var/lib/scylla/data\nhints_directory: /var/lib/scylla/hints\nview_hints_directory: /var/lib/scylla/view_hints\ncommitlog_directory: /var/lib/scylla/commitlog\n\n# https://docs.scylladb.com/architecture/anti-entropy/hinted-handoff\n# hinted_handoff_enabled: DC1,DC2\n# hinted_handoff_enabled: true\n# max_hint_window_in_ms: 10800000 # 3 hours\n\n# ====================\n# Commit Log\n# ====================\n# periodic, batch\n# batch ACK \u4F1A\u7B49\u5F85 commitlog_sync_batch_window_in_ms fsync\n# periodic \u7ACB\u5373 ACK \u7136\u540E\u5B9A\u65F6 fsync\ncommitlog_sync: periodic\ncommitlog_sync_period_in_ms: 10000\n# \u5982\u679C\u60F3\u8981\u5F52\u6863 commitlog \u53EF\u4EE5\u8BBE\u7F6E\u5C0F\u4E00\u70B9\ncommitlog_segment_size_in_mb: 32\ncommitlog_total_space_in_mb: -1\nforce_schema_commit_log: true\n\nbatch_size_warn_threshold_in_kb: 128\nbatch_size_fail_threshold_in_kb: 1024\n\n\n# PasswordAuthenticator - \u5B58\u50A8\u5728 system_auth.credentials\n# com.scylladb.auth.TransitionalAuthenticator - \u7528\u4E8E\u5347\u7EA7 auth\nauthenticator: AllowAllAuthenticator\n# CassandraAuthorizer - \u5B58\u50A8\u5728 system_auth.permissions\n# com.scylladb.auth.TransitionalAuthorizer\nauthorizer: AllowAllAuthorizer\npermissions_validity_in_ms: 10000\npermissions_update_interval_in_ms: 2000\n\n# initial_token: # \u4E00\u822C\u4E0D\u4F1A\u7528\u5230\n\n# experimental_features:\n#     - udf\n#     - alternator-streams\n#     - alternator-ttl\n#     - raft\n\npartitioner: org.apache.cassandra.dht.Murmur3Partitioner\nmurmur3_partitioner_ignore_msb_bits: 12\n\nphi_convict_threshold: 8\n\nincremental_backups: false\nsnapshot_before_compaction: false\nauto_snapshot: true\n# tombstone_warn_threshold: 1000\n# tombstone_failure_threshold: 100000\n\n# column_index_size_in_kb: 64\n# column_index_auto_scale_threshold_in_kb: 10240\n# compaction_large_partition_warning_threshold_mb: 1000\n# compaction_large_row_warning_threshold_mb: 10\n# compaction_large_cell_warning_threshold_mb: 1\n# compaction_rows_count_warning_threshold: 100000\n\n# range_request_timeout_in_ms: 10000\n# counter_write_request_timeout_in_ms: 5000\n# cas_contention_timeout_in_ms: 1000\n# truncate_request_timeout_in_ms: 60000\n# request_timeout_in_ms: 10000\n\n# server_encryption_options:\n# client_encryption_options:\n\n# internode_compression: none\n# inter_dc_tcp_nodelay: false\n\n# developer_mode: false\n\n# defragment_memory_on_idle: true\n\n# reversed_reads_auto_bypass_cache: false\n# enable_optimized_reversed_reads: true\n# enable_parallelized_aggregation: true\n\n# always, forbid, unsafe\nalternator_write_isolation: only_rmw_uses_lwt\n"})})]})}function d(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(c,{...n})}):c(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return o},a:function(){return i}});var r=t(75271);let a={},s=r.createContext(a);function i(n){let e=r.useContext(s);return r.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:i(n.components),r.createElement(s.Provider,{value:e},n.children)}}}]);