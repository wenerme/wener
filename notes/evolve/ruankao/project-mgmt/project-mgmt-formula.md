---
title: 项目管理 公式
---

# 项目管理 公式

| name                     | formula         | cn       |
| ------------------------ | --------------- | -------- | -------------------------------- |
| Standard Devision        | = (P-O)/6       | 标准差   |
| TF/Total Float           | = LS-ES = LF-EF | 总时差   |
| Comm Channels            | = N(N-1)/2      | 沟通渠道 | N=项目成员                       |
| Benefit Cost Ratio       | =Cost / Benefit |          | < 1 不好、拒绝<br/> > 1 越高越好 |
| Net Present Value        | =FV/(1+r)^n     | 净现值   |
| Future Value             | =PV(1+i)^n      |
| ROI/Return of investment |                 |

- Free float - 自由时差
  - 下一个节点 ES - 当前节点 EF

$$
ROI = 总收益率 = (总折现收益 - 总折现成本)/折现成本
$$

## 三点估算

:::info

- Three-Point Estimating - 三点估算
- PERT - Program Evaluation and Review Technique - 计划评审技术
- 用于评估 **成本** 和 **时间**
  - 帮助规划进度
  - 帮助优化资源
- 临近 beta 分部公式
- 1:4:1

:::

$$
PERT = \frac{(O + 4M + P)} {6} = \frac{(t_o + 4 t_m + t_p) } {6}
$$

$$
SD = \frac{t_p - t_o} {6}
$$

- P - Pessimistic - 悲观值、最差的值
- O - Optimistic - 乐观值、最好的值
- M - Most likely - 通常值

---

- PERT vs CPM
  - PERT
    - 面向事件
    - 估算的时间不确定 - 概率
    - 结束开始关系
    - 用于时间不具体时 - 单个节点变化不影响整体
  - CPM
    - 面向活动
    - 估算的时间是确定的
    - 可以有多种依赖关系
    - 任意节点时间变化影响最终估算
- 参考
  - https://pmstudycircle.com/pert-program-evaluation-and-review-technique/
  - https://projectmanagementacademy.net/resources/blog/a-three-point-estimating-technique-pert/

## 标准差

$$
SD^2 = \frac{\sum^N_{i=1}{(x_i - \mu)^2}}{N}
$$

$$
SD = \sqrt \frac{\sum^N_{i=1}{(x_i - \mu)^2}}{N}
$$

- $\mu$ 为平均值 $(\overline{x})$

:::info

- Standard Deviation - SD - σ - sigma
- 标准差、标准偏差、均方差
- 测量一组数值的离散程度
- 可用于 **投资** - 量度回报稳定性的指标

:::

---

- wikipedia [标准差](https://zh.wikipedia.org/wiki/标准差)

## 净现值

:::info

- NPV - Net Present Value - 净现值
  - 也叫 NPW - Net Present Worth
  - 现值的总和
  - 金融学 相关词汇
  - 体现 金钱的时间价值(time value of money, TVM)
  - 用于项目评估收益
- PV/Present Value/现值

:::

$$
PV=\frac{R_t}{(1+i)^t}
$$

$$
NPV(i,N)=\sum_{t=1}^{N}\frac{R_t}{(1+i)^t}
$$

- t - 时间 - 从 0 开始 - 例如 年、期
- i - discount rate - 贴现率、折现率
- $R_t$ - net cash flow - 净现金流量
- N - 持续时间

---

- [Net present value](https://en.wikipedia.org/wiki/Net_present_value)

<!-- [].reduce((s,a,i)=>s+a/Math.pow(1+r,i),0) -->

## 六标准差

:::info

- 六标准差 - Six Sigma - 六西格玛
- 六个标准方差
- 三西格马 - 68,95,99.7
  - “几乎所有”的值都在平均值正负三个标准差的范围内

:::

| Six Sigma |
| --------- | --------- |
| 1σ        | 68.27%    |
| 2σ        | 95.45%    |
| 3σ        | 99.73%    |
| 6σ        | 99.99966% |

---

- wikipedia [Six Sigma](https://en.wikipedia.org/wiki/Six_Sigma)
- [68–95–99.7 原則](https://zh.wikipedia.org/wiki/68–95–99.7原則)
- DMAIC
  - 定义-测量-分析-提升-控制
  - 用于改善现有的商业流程
  - RDMAIC - R-认知
- DMADV
  - 定义-摸准-分析-设计-验证
  - DFSS - Design for sigma
  - 用于建立新的产品或设计流程
