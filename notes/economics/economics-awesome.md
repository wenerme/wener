---
tags:
  - Awesome
---

# Economics Awesome

- Frameworks
  - [microsoft/qlib](https://github.com/microsoft/qlib)
    - MIT, Python
    - AI-oriented Quant investment platform
- AI/ML/LLM
  - FinBERT
  - BloombergGPT
  - FinGPT
  - [microsoft/RD-Agent](https://github.com/microsoft/RD-Agent)
    - MIT, Python
  - TradExpert: Revolutionizing Trading with Mixture of Expert LLMs
    - https://news.ycombinator.com/item?id=44157378
    - 新闻分析师 - 分析新闻文本预测股价变动，并提供推理过程（采用思维链CoT方法）
    - 市场分析师
      - 分析历史OHLCV（开盘价、最高价、最低价、收盘价、成交量）数据
      - TSFresh
    - 阿尔法专家
      - 处理基于表达式的阿尔法因子（技术指标和算法生成的因子）。
      - 利用GPT-4为每个因子预生成语言描述。
      - 模型会基于LightGBM计算一个综合得分，并选取贡献最大的Top-K阿尔法因子及其描述输入LLM。
    - 基本面分析师
      - 分析财报电话会议记录和财务指标，进行季度性股价预测，并提供推理。
      - 预测分为“强势上涨”、“温和上涨”、“无变化”、“温和下跌”或“强势下跌”五个类别。
    - 通用专家
      - 总结四个专家LLM的报告
      - 预测模式 (Prediction Mode)：基于总结报告预测股票涨跌。
      - 排名模式 (Ranking Mode)：作为比较器，判断两支股票中哪支未来表现更好。 通过一种“宽松的基于比较的排序算法”（类似冒泡排序，但进行N²次比较）来获得Top-K股票排名，以应对LLM比较器的非传递性问题。

| en  | cn         |
| --- | ---------- |
|     | 物价       |
|     | 房价收入比 |

## Live

- https://www.numbeo.com/cost-of-living/
- 房价
  - https://mobile.anjuke.com/fangjia/chengdu/wenjiangcq/
  - https://m.fang.com/fangjia/fjmap.html
  - 总体房价 https://sc.macromicro.me/collections/26/cn-house-relative/983/house-price-yoy

## Tax

- https://www.shui5.cn/

## Read

- Essential Economics (Economist Essentials)
  https://www.amazon.com/exec/obidos/tg/detail/-/1861975805/theeconomist
- Economics 101
