---
title: 阿里云
---

# 阿里云

## 定价 {#pricing}

**块存储**

| Service  |  IOPS |       IO |    Price/T |  Price/G |
| -------- | ----: | -------: | ---------: | -------: |
| ESSD PL0 |   10k |  180MB/s |  500¥ T/月 | 0.5/G/月 |
| ESSD PL1 |   50k |  350MB/s | 1000¥ T/月 |   1/G/月 |
| ESSD PL2 |  100k |  750MB/s | 2000¥ T/月 |   2/G/月 |
| ESSD PL3 | 1000k | 4000MB/s | 4000¥ T/月 |   4/G/月 |

- IOPS 和容量强相关
- 不同等级对最低容量有要求

**共享流量包**

| Service  |     Price | Note            |
| -------- | --------: | --------------- |
| 亚太全时 |  0.75 ¥/G |                 |
| 亚太闲时 | 0.525 ¥/G | 00:00AM-08:00AM |
| 欧美全时 |  0.46 ¥/G |

- `亚太闲时*1/3 + 亚太全时*2/3=7.5*1/3 + 5.25*2/3=6` ¥ 10G/月
  - 平均 0.6 ¥/G
  - 实际更大，因为流量不是匀速的

**共享带宽/按主流量计费**

- 中国 0.80 ¥/G
- 计费周期 1h
- 出入流量取大
  - 如果进出持平，则对比按量付费为 0.4 ¥/G
    - 1:1
  - 0.8 - 0.2 = 0.6 为 亚太闲时+亚太全时 **平均价格**
    - 也就是说出入对比在 1:4 左右能达到共享流量包的价格
      - 1:0.25 即 `0.8 - 0.25*0.8=0.6`
    - 实际情况可能在 **1:5** 左右使用 按主流量计费 就已经比 共享流量包划算了

**共享带宽**

| Service        |       Price |
| -------------- | ----------: |
| 上海 1000 Mbps |  80,000¥ 月 |
| 香港 1000 Mbps | 100,000¥ 月 |

**短信**

| 短信类型 | ≤10w     | 10w ＜ ≤30 万 | 30w ＜ ≤50w | 50 ＜ ≤100w | 100w ＜ ≤300w | ＞ 300w  |
| -------- | -------- | ------------- | ----------- | ----------- | ------------- | -------- |
| 系统短信 | ￥ 0.045 | ￥ 0.040      | ￥ 0.039    | ￥ 0.038    | ￥ 0.037      | ￥ 0.036 |
| 推广短信 | ￥ 0.055 | ￥ 0.050      | ￥ 0.049    | ￥ 0.048    | ￥ 0.047      | ￥ 0.046 |

- 系统短信 - 验证码、短信通知

**短信套餐包**

| Unit |   Price | 1/¥   |
| ---: | ------: | ----- |
| 5000 |     250 | 0.050 |
|   5w |   2,150 | 0.043 |
|  50w |  20,500 | 0.041 |
| 100w |  40,000 | 0.040 |
| 300w | 117,000 | 0.039 |

**Kafka**

> 集群流量 = 业务流量 + 集群内副本复制流量

- alikafka.hw.2xlarge
  - R 20MB/s
  - W 20MB/s
  - 基础 1000 分区
  - 500G
    - 高效云盘 1900/月
    - SSD 2900/月

**RocketMQ**

- rmq.s2.2xlarge - 标准版
  - TPS 2000/s - 4kb
  - 公网只支持固定带宽

**ACR**

镜像仓库，OSS 价格额外计算。

- 基础版 - 1000 仓库、15 命名空间、QPS 250
  - Trivy 扫描
    - 8000¥/年
  - 云安全扫描
    - 16000¥/年

## ECS

- 突发 - t5,t6
  - 2C2G 20%
    - 24 分/小时
    - 最多累计 576

## ACK

- ACK
  - 托管版
    - 托管 Master 容器节点
  - 专有版
    - 3 Master 节点
  - Serverless
    - 无需创建和管理 Master 节点及 Worker 节点
  - Edge
    - 将边缘节点接入到边缘集群中进行托管
  - 注册管理
    - 为分布在各处的外部 Kubernetes 集群提供统一的使用和管理方式

> ACK -> Aliyun Container Service for Kubernetes
>
> - ACK vs Self-Managed Kubernetes
>   - 省事
>   - 能更好结合阿里云产品 - 会用到更多阿里云产品 - SLB、Log、Monitor
>   - ACK 节点会部署相对多的 Agent

- ACK 托管集群管理+云产品资源
  - Pro - 5000节点，自定义参数、监控、etcd高可用、高级调度
    - 存在集群管理费用
  - 基础 - 10节点
  - 集群管理 - 独立的管理节点/单独的服务器 - 包含在集群费用中
    - 按量计费: 0.64 元/小时/集群 - 441/月，5300/年
    - 资源包: 415 元/月，4980 元/年
  - 网络 flannel/terway
    - [AliyunContainerService/terway](https://github.com/AliyunContainerService/terway) 是阿里自己的 CNI
    - 对比 https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/user-guide/work-with-terway/
- 专有版
  - 管理免费
- 托管版
  - 管理收费

## MySQL

**4C8G 5000IOPS 2000Con**

- 8.0.28

| conf                          | value      | note  |
| ----------------------------- | ---------- | ----- |
| innodb_buffer_pool_chunk_size | 33554432   | 32M   |
| innodb_buffer_pool_instances  | 8          |
| innodb_buffer_pool_size       | 6442450944 | 6G    |
| innodb_flush_method           | O_DIRECT   |
| innodb_io_capacity            | 20000      |
| innodb_read_io_threads        | 4          |
| innodb_thread_concurrency     | 0          |
| innodb_write_io_threads       | 4          |
| innodb_log_file_size          | 1572864000 | 1500M |
| innodb_log_files_in_group     | 2          |

## 大模型

| model      | price 1K/tokens | note                          |
| ---------- | --------------- | ----------------------------- |
| qwen-turbo | 0.012¥          | 免费 2,000,000 tokens、180 天 |
| qwen-plus  | 0.14¥           | 免费 1,000,000 tokens、180 天 |

- https://help.aliyun.com/zh/dashscope/product-overview/billing-rules

## 号码百科

- 企业
  - 二要素核验 - 企业名称、企业证件号
  - 三要素核验 - +企业法人姓名
  - 四要素核验 - +企业法人身份证号
