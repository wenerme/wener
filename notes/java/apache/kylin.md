# Apache Kylin

## Tips
* https://kylin.apache.org/ - Extreme OLAP Engine for Big Data
* https://en.wikipedia.org/wiki/Apache_Kylin
* 2013 年，始于 eBay 上海研发中心。2014 年 10 月 v0.6 开源。2014 年 11 月加入 ASF 孵化。2015 年 12 约成为顶级项目。

## NOTES
* 主要基于 Spark 执行，HBase 存储。
* Model - 数据模型、元数据
  * 数据模型 - 事实表
    * 事实表与纬度表之间的关系
      * 表、JOIN、条件
  * 维度
    * 表、列
  * 指标
    * 列 - 事实表
  * 其他
    * 分片列 - 一般为天
    * 可指定额外的时间列
* Cube
  * 模型
  * 维度
    * 名字、表、列
    * 支持衍生列、级连列，可降纬
  * 指标
    * 名字、表达式、参数、返回类型
    * SUM,MIN,MAX,COUNT,COUNT_DISTINCT,TOP_N,RAW
    * COUNT_DISTINCT 只有 Integer 才支持精确的 COUNT，默认为 HLL 有一定误差
  * 刷新
    * 数据留存周期
    * 合并周期
    * 开始计算时间
  * RAWKEY - 默认为所有纬度
* 增量更新
* 定期 Merge - Roll up - 周期可配
* Fast Cubing
