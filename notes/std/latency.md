---
title: 延迟数
---

# 延迟数

| type       | range          | for                        |
| ---------- | -------------- | -------------------------- |
| 即时响应   | < 100ms        | 搜索自动补全、按钮点击     |
| 流畅响应   | 100ms - 300ms  | 拖拽、滚动、页面、内容加载 |
| 可接受响应 | 300ms - 1000ms | 交互式应用、提交表单       |
| 过长响应   | > 1000ms       | **用户会感到延迟**         |
| VoIP       | 150ms - 300ms  | 语音通话                   |

|   debounce | for                             |
| ---------: | ------------------------------- |
|  100-200ms | UI元素的交互 - 滑块、拖动       |
|  200-500ms | 轻量级的用户输入 - 搜索触发请求 |
| 500-1000ms | 数据密集型的操作 - 实时数据校验 |

| Metric                                | Estimate | Metric Impact  |
| ------------------------------------- | -------- | -------------- |
| Wifi 连接到互联网的延迟               | 1-4ms    | TTFB, FCP, LCP |
| 5G 高频段（毫米波）连接到互联网的延迟 | 1-5ms    | TTFB, FCP, LCP |
| 每帧 60 帧每秒的用户空间预算          | 5-10ms   | 平滑帧率       |
| 5G 中频段连接到互联网的延迟           | 10-30ms  | TTFB, FCP, LCP |
| 与同一云区域内服务或数据库的往返延迟  | 10ms     | TTFB, FCP, LCP |
| LTE 连接到互联网的延迟                | 15-50ms  | TTFB, FCP, LCP |
| 60 帧每秒的帧持续时间                 | 16ms     | 平滑帧率       |
| 与同一大陆其他城市的往返延迟          | 33ms     | TTFB, FCP, LCP |
| 人类感知到时间流逝的最短时间          | 40-80ms  | INP            |
| 解析 1MB CSS 的时间                   | 100ms    | FCP, LCP       |
| 解析 1MB HTML 的时间                  | 120ms    | FCP, LCP       |
| 3G 连接到互联网的延迟                 | 150ms    | TTFB, FCP, LCP |
| 高质量网络到地球另一端的往返延迟      | 150ms    | TTFB, FCP, LCP |
| 解析 1MB JS 的时间                    | 150ms    | FCP, LCP, INP  |
| 人类感知到的迟缓时间                  | 200ms    | INP            |
| 无租用光纤到地球另一端的往返延迟      | 300ms    | TTFB, FCP, LCP |

| abbr. | for                      | cn           |
| ----- | ------------------------ | ------------ |
| TTFB  | Time To First Byte       | 首字节时间   |
| FCP   | First Contentful Paint   | 首次内容绘制 |
| LCP   | Largest Contentful Paint | 最大内容绘制 |
| INP   | Input Delay              | 输入延迟     |

- 1小时 = 60分钟 = 3600秒 = 3,600,000毫秒
- 1天 = 24小时 = 1,440分钟 = 86,400秒 = 86,400,000毫秒

---

- 网络速度通常以比特每秒（bps）为单位
- 文件大小以字节（Byte）为单位
- **1 Byte = 8 bits**。因此，一个 1Gbps 的网络，其理论最大传输速度为 125MB/s (1000 Mbps / 8)。

|   网络标准 |                       别名 | 理论速率 |   传输 1GB | 实际速率            |
| ---------: | -------------------------: | -------: | ---------: | ------------------- |
|   10BASE-T |          Ethernet / 以太网 |  10 Mbps | ~13.3 分钟 | 9-10 Mbps           |
| 100BASE-TX | Fast Ethernet / 快速以太网 | 100 Mbps |     ~80 秒 | 90-95 Mbps          |
| 1000BASE-T |            GE / 千兆以太网 |   1 Gbps |      ~8 秒 | 900-950 Mbps        |
| 2.5GBASE-T |       2.5GbE / 2.5G 以太网 | 2.5 Gbps |    ~3.4 秒 | 2.3-2.4 Gbps        |
|  10GBASE-T |         10GbE / 万兆以太网 |  10 Gbps |    ~0.8 秒 | 9+ Gbps             |
|  40GBASE-R |                 40G 以太网 |  40 Gbps |    ~0.2 秒 | 38+ Gbps            |
| 100GBASE-R |                100G 以太网 | 100 Gbps |   ~0.08 秒 | 95+ Gbps            |
|    Wi-Fi 4 |                    802.11n | 600 Mbps |   ~13.3 秒 | 50-200 Mbps         |
|    Wi-Fi 5 |                   802.11ac | 6.9 Gbps |    ~1.2 秒 | 200-800 Mbps        |
|    Wi-Fi 6 |                   802.11ax | 9.6 Gbps |    ~0.8 秒 | 300 Mbps - 1.5 Gbps |
|   Wi-Fi 6E |                   802.11ax | 9.6 Gbps |    ~0.8 秒 | 500 Mbps - 2 Gbps   |
|    Wi-Fi 7 |                   802.11be |  46 Gbps |    ~0.2 秒 | 1 Gbps - 5 Gbps+    |
|         3G |                      HSPA+ |  42 Mbps |    ~3 分钟 | 1-10 Mbps           |
|         4G |                        LTE | 150 Mbps |     ~53 秒 | 10-50 Mbps          |
|         5G |                         NR |  10 Gbps |    ~0.8 秒 | 100 Mbps - 1 Gbps+  |

- 影响因素
  - 网络协议开销（TCP/IP/HTTP）
  - 服务器负载
  - 网络延迟
- 2.5GbE
  - 复用 超五类 (Cat5e) 和六类 (Cat6)
- Wi-Fi 4 (802.11n)
  - 40MHz, 2x2 MIMO = 300Mbps
- 信噪比(SNR) = 信号 - 噪音
- 空间流数量 (Number of Spatial Streams/NSS)
  - 2x2 MIMO - 两根天线

---

- hot potato routing - 无租用光纤 - 网络运营商会尽可能快地将数据包从自己的网络中移出并传递给下一个网络
  - 特点：快速移交，低成本
  - 问题： 导致更高延迟，可能会选择次优路径来传递
- cold potato routing - 高质量网络 - 尽可能长时间地在自己的网络中保持数据包，然后再将其传递给下一个网络
  - 特点： 延迟移交、高质量
  - 问题：成本较高
- [Latency numbers every frontend developer should know](https://vercel.com/blog/latency-numbers-every-web-developer-should-know)

## Latency Comparison Numbers ~ 2012

- Interactive [Latency Numbers Every Programmer Should Know](https://colin-scott.github.io/personal_website/research/interactive_latency.html)
- [HN](https://news.ycombinator.com/item?id=13530820)
- [Gist](https://gist.github.com/jboner/2841832) [Neo](https://gist.github.com/GLMeece/b00c9c97a06a957af7426b1be5bc8be6)
- [Grace Hopper explains Nanoseconds](https://www.youtube.com/watch?v=JEpsKnWZrJ8)
- [Global Ping](https://wondernetwork.com/pings/)
- https://computers-are-fast.github.io/

| computer latency                   |     nano seconds | micro seconds | milliseconds | relative                    |
| ---------------------------------- | ---------------: | ------------: | -----------: | --------------------------- |
| L1 cache reference                 |           0.5 ns |               |              |                             |
| Branch mispredict                  |           5.0 ns |               |              |                             |
| L2 cache reference                 |           7.0 ns |               |              | 14x L1 cache                |
| Mutex lock/unlock                  |          25.0 ns |               |              |                             |
| Main memory reference              |         100.0 ns |               |              | 20x L2 cache, 200x L1 cache |
| Compress 1K bytes with Zippy       |       3,000.0 ns |          3 us |              |                             |
| Send 1K bytes over 1 Gbps network  |      10,000.0 ns |         10 us |              |                             |
| Read 4K randomly from SSD          |     150,000.0 ns |        150 us |              | ~1GB/sec SSD                |
| Read 1 MB sequentially from memory |     250,000.0 ns |        250 us |              |                             |
| Round trip within same datacenter  |     500,000.0 ns |        500 us |       0.5 ms |                             |
| Read 1 MB sequentially from SSD    |   1,000,000.0 ns |      1,000 us |         1 ms | ~1GB/sec SSD, 4X memory     |
| Disk seek                          |  10,000,000.0 ns |     10,000 us |        10 ms | 20x datacenter roundtrip    |
| Read 1 MB sequentially from disk   |  20,000,000.0 ns |     20,000 us |        20 ms | 80x memory, 20X SSD         |
| Send packet CA->Netherlands->CA    | 150,000,000.0 ns |    150,000 us |       150 ms |                             |

## Misc

| common latency |    ms |       s |
| -------------: | ----: | ------: |
|        120 fps |  8 ms | 1/120 s |
|         60 fps | 16 ms |  1/60 s |
|         24 fps | 41 ms |  1/24 s |

|      human lantency |         ms |         s |
| ------------------: | ---------: | --------: |
|           eye blink | 100-150 ms | 0.1-0.5 s |
| human reaction time |     250 ms |    0.25 s |

- Nerve conduction velocity/神经传导速度 ~ 40m/s
- 音速 - 343 m/s
- 光速 - 299,792,458 m / s

## Unit

| unit |    stand for | n    | mean |
| ---: | -----------: | ---- | ---: |
|   ns |  nano second | 10^9 | 纳秒 |
|   us | micro second | 10^6 | 微秒 |
|   ms | milli second | 10^3 | 毫秒 |
|    s |       second | 1    |   秒 |

| ns   | us    | ms    | s     |
| ---- | ----- | ----- | ----- |
| 1    | 10^-3 | 10^-6 | 10^-9 |
| 1000 | 1     | 10^-3 | 10^-6 |
| 10^6 | 1000  | 1     | 10^-3 |
| 10^9 | 10^6  | 1000  | 1     |

## datacenter vs region vs zone vs vs cluster vs rack

- datacenter - dc
  - 逻辑机房
  - 可能在同一个 region
  - 相同 dc 内 < 1ms
  - 相同 region 内 < 10ms
  - 不同 region 则延时不确定 - 可能跨越半个地球
    - 低到 < 10ms
    - 高到 > 300ms
- cluster
  - 逻辑概念
  - 通常在一个 dc
- rack
  - 不同服务器最近接近的定义
  - 相同交换机背板
- region - 区域 - 由多个地区组成
  - 独立地理位置
- zone - 地区
  - 故障网域

---

- [Google Cloud Inter-Region Latency and Throughput](https://datastudio.google.com/reporting/fc733b10-9744-4a72-a502-92290f608571/page/70YCB)
- https://docs.google.com/spreadsheets/d/1lCUjdT-JNoATftGshtUIPQIl0CLb2Z8DCL-k8UAMtec/pubhtml
  - https://geekflare.com/google-cloud-latency/
- https://gcping.com/
