---
title: OpenSearch
---

# OpenSearch

- [opensearch-project/OpenSearch](https://github.com/opensearch-project/OpenSearch)
  - Apache-2.0, Java
  - AWS 在 Elasticsearch 修改 License 后 fork 的分支
    - Elastic License 2.0 - 不允许 SaaS
    - Elasticsearch 7.10.2 & Kibana 7.10.2
- [opensearch-project/helm-charts](https://github.com/opensearch-project/helm-charts)

| Port | component                        |
| ---- | -------------------------------- |
| 443  | Dashboards in AWS                |
| 5601 | Dashboards                       |
| 9200 | REST API                         |
| 9250 | Cross-cluster search             |
| 9300 | Node communication and transport |
| 9600 | Performance Analyzer             |

```bash
# /usr/share/opensearch/config/opensearch.yml
# 开发环境 DISABLE_INSTALL_DEMO_CONFIG=true DISABLE_SECURITY_PLUGIN=true discovery.type=single-node
docker run --it --rm \
  -p 9200:9200 -p 9600:9600 \
  -e cluster.name=opensearch-cluster \
  -e node.name=opensearch-node1 \
  -e discovery.seed_hosts=opensearch-node1 \
  -e cluster.initial_cluster_manager_nodes=opensearch-node1 \
  -e bootstrap.memory_lock=true \
  -e "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m" \
  -e network.host=0.0.0.0 \
  -v $PWD/data:/usr/share/opensearch/data \
  --hostname opensearch-node1 \
  --name opensearch opensearchproject/opensearch

# /usr/share/opensearch-dashboards/config/opensearch_dashboards.yml
# 开发环境 DISABLE_SECURITY_DASHBOARDS_PLUGIN=true
docker run --rm -it \
  -p 5601:5601 \
  -e 'OPENSEARCH_HOSTS=["http://opensearch-node1:9200"]' \
  --name opensearch-dashboards opensearchproject/opensearch-dashboards
```

```bash
# 插件列表
bin/opensearch-plugin list

# --batch 忽略询问
# bin/opensearch-plugin install <plugin-name>
# bin/opensearch-plugin install <zip-file>
# bin/opensearch-plugin install <groupId>:<artifactId>:<version>
```

- [Available plugins](https://opensearch.org/docs/latest/opensearch/install/plugins/#available-plugins)
- bundled
  - alerting
  - anomaly-detection
  - asynchronous-search
  - cross-cluster-replication
  - notebooks
  - reports-scheduler
  - geospatial
  - index-management
  - job-scheduler
  - knn
  - ml
    - https://tribuo.org/
    - K-means
    - Linear regression
    - RCF - Random Cut Forest
    - RCFSummarize
    - Localization
    - Logistic regression
  - observability
  - performance-analyzer
  - security
  - sql
- 可安装
  - analysis-icu
  - ingest-attachment
  - mapper-annotated-text
  - mapper-murmur3
  - mapper-size
  - repository-s3
  - store-smb
  - transport-nio

## Notes

- REST 公共参数
  - human=true
  - pretty=true
  - Content-Type - 支持 json, yaml, cbor
  - error_trace=true
- Endpoints
  - `/_cat/nodes?v`
  - `/_cat/plugins?v`
  - `/_cat/aliases?v`
  - `/<index-name>/_search?q=wind`
  - `/_cluster/settings?include_defaults=true`
  - `DELETE /<index-name>/_doc/<document-id>`
  - `POST _aliases` - 别名
  - `POST _index_template` - 索引模板
  - `PUT _data_stream/<index>`
  - \_reindex - 重新索引
  - `<index_name>/_update_by_query`
  - `_search/template`
- Data streams
  - 用于持续的时序数据，旧数据不变
- mapping
  - schema 概念 - 默认动态
  - 可手动指定 mapping
  - 支持类型: null, boolean, float, double, integer, object, array, text, keyword, date detection string, numeric detection string
- 聚合
  - 指标
    - 单值: sum, min, max, avg, cardinality, value_count
    - 多值: stats, extended_stats, matrix_stats, percentile, percentile_ranks, geo_bound, top_hits, scripted_metric
  - Bucket
  - Pipeline

---

- [REST API reference](https://opensearch.org/docs/latest/opensearch/rest-api/index/)
- https://opensearch.org/docs/latest/opensearch/popular-api/
  - 常用接口

## 配置

- OPENSEARCH_PATH_CONF=/etc/opensearch
- Docker /usr/share/opensearch/config/opensearch.yml
- /etc/opensearch/opensearch.yml

```yaml
cluster.name: opensearch1
# 集群管理
node.name: opensearch-cluster_manager
node.roles: [ cluster_manager ]
# 数据
node.name: opensearch-d1
node.roles: [ data, ingest ]
# 调度
node.name: opensearch-c1
node.roles: []

node.attr.zone: zoneA
node.attr.temp: hot

network.host: [_local_, _site_]
discovery.seed_hosts: ["<private IP of opensearch-d1>", "<private IP of opensearch-d2>", "<private IP of opensearch-c1>"]
```

**强制感知 Zone 且平衡副本**

```http
PUT _cluster/settings
{
  "persistent": {
    "routing.allocation.awareness.balance": "true",
    "cluster.routing.allocation.awareness.attributes": "zone",
    "cluster.routing.allocation.awareness.force.zone.values":["zoneA", "zoneB"]
  }
}
```

**创建 Index 指定节点**

```http
PUT newindex
{
  "settings": {
    "index.routing.allocation.require.temp": "hot"
  }
}
```

- https://opensearch.org/docs/latest/opensearch/configuration/

## Performance Analyzer

```bash
curl -XPOST localhost:9200/_plugins/_performanceanalyzer/cluster/config -H 'Content-Type: application/json' -d '{"enabled": true}'
# RCA - Root Cause Analyzer
curl -XPOST localhost:9200/_plugins/_performanceanalyzer/rca/cluster/config -H 'Content-Type: application/json' -d '{"enabled": true}'
```

## Helm

- https://github.com/opensearch-project/helm-charts/tree/main/charts

## 运维

```bash
# vm.max_map_count=262144
cat /proc/sys/vm/max_map_count
```

- https://opensearch.org/docs/latest/opensearch/install/important-settings/
