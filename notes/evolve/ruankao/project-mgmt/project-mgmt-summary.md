---
title: 软考项目管理概述汇总
---

# 软考项目管理概述汇总

软考教材基于 PMBOK 5th 制定，PMBOK 教材的核心内容相对更具有机构性，因此软考的前提是先记住 PMBOK 核心内容。

软考教材因为是取自 PMBOK，导致翻译层面会有很多歧义，建立记忆 PMBOK 内容时尽量对照看英文，英文比中文内容更好记忆。

## 基础

- 立项
- 项目基础概念

## 过程概览

> 基于 PMBOK 5th ed

- 5 过程组
  - Initiating - 启动
  - Planning - 规划
  - Executing - 执行
  - Monitoring and Controlling - 监控
  - Closing - 收尾
- 10 知识领域
  - 整体、范围、时间、成本、质量、人力资源、沟通、风险、采购、干系人
- 47 过程

![](https://kroki.io/plantuml/svg/eNpLyUwvSizIUCgoyk9OLS6u5lJQUPDMyyzJTCzJzEvXtQvISczLA7KsQRIwjq6da0VqcmkJTNw5P6-kKD8nB1MHigyqJjhP1w5JFaYu55z8YrBELQABRzsV)

<!--
digraph process{
   Initiating->Planning;
   Planning->Executing;
   Controlling->Planning;
   Controlling->Executing;
   Executing->Controlling;
   Controlling->Closing;
}
-->

| 47         | 启动 (2) | 规划 (24) | 执行 (8) | 监控 (11) | 收尾 (2) |
| ---------- | -------- | --------- | -------- | --------- | -------- |
| 整体 (6)   | .        | .         | .        | ..        | .        |
| 范围 (6)   |          | ....      |          | .         |
| 时间 (7)   |          | ......    |          | .         |
| 成本 (4)   |          | ...       |          | .         |
| 质量 (3)   |          | .         | .        | .         |
| 人力 (4)   |          | .         | ...      |           |
| 沟通 (3)   |          | .         | .        | .         |
| 风险 (6)   |          | .....     |          | .         |
| 采购 (4)   |          | .         | .        | .         | .        |
| 干系人 (4) | .        | .         | .        | .         |

:::tip

- 以 规划 开头的都是 规划
- 以 管理 开头的都是 执行
- 以 控制 开头的都是 监控

:::

## EMV

- EMV - Earned Value Management - 挣值管理

| abbr. |                       stand for |               cn |
| ----: | ------------------------------: | ---------------: | ------------------ |
|   BAC |           Budgets at Completion |         完工预算 |
|   EAC |          Estimate at Completion |         完工估算 |
|   ETC |          Estimate to Completion |     完工尚需估算 |
|   VAC |          Variance at Completion |         完工偏差 | =BAC-EAC           |
|    PV |                      Plan Value |         计划价值 | =计划% × BAC       |
|    EV |                  Estimate Value |             挣值 | =实际% × BAC       |
|    AC |                     Actual Cost |         实际成本 |
|    CV |                   Cost Variance |         成本偏差 | =EV-AC             |
|    SV |               Schedule Variance |         进度偏差 | =EV-PV             |
|   CPI |          Cost Performance Index |     成本绩效指数 | =EV/AC             |
|   SPI |      Schedule Performance Index |     进度绩效指数 | =EV/PV             |
|  TCPI | To Completion Performance Index | 完工尚需绩效指数 | =(BAC-EV)/(BAC-AC) |
|  BCWS |                                 |                  | PV                 |
|  BCWP |                                 |                  | EV                 |
|  ACWP |                                 |                  | AC                 |

<!-- ÷× -->

| value | formula                                     | note                                             |
| ----: | ------------------------------------------- | ------------------------------------------------ |
|    AC |
|    EV | =Actual% × BAC                              |
|    PV | =Planned% × BAC                             |
|    CV | =EV - AC                                    |
|   CPI | =EV / AC                                    | < 1 超出预算<br/> = 1 符合预算<br/> > 1 低于预算 |
|    SV | =EV - PV                                    |
|   SPI | =EV / PV                                    | < 1 进度滞后<br/> = 1 符合进度<br/> > 1 进度提前 |
|   EAC | =BAC/CPI<br/> =AC+ETC<br/> =AC+(BAC+EV)/CPI |
|   ETC | =EAC - AC                                   |
|   VAC | =BAC - EAC                                  |

:::tip

- 负的是不好的，正的是好的
- Variabce = EV -
- Index = EV /
- 成本 相关使用 EV
- 时间 相关使用 PV

:::

## 主要公式

| name                     | formula                    | cn         |
| ------------------------ | -------------------------- | ---------- | ----------------------------------------------------------- |
| Standard Devision        | = (P-O)/6                  | 标准差     |
| PERT                     | = (O + 4M + P) / 6         |
| Total Float              | = LS-ES = LF-EF            |
| Comm Channels            | = N(N-1)/2                 | 沟通渠道   | N=项目成员                                                  |
| Benefit Cost Ratio       | =Cost / Benefit            |            | < 1 不好、拒绝<br/> > 1 越高越好                            |
| Net Present Value        | =FV/(1+r)^n                | 净现值     |
| Future Value             | =PV(1+i)^n                 |
| ROI/Return of investment |                            | 投资回报率 |
| NPV/Net present value    | $=\sum_{t=1}^{n}A/(1+r)^t$ | 净现值     | t - 现金流持续时间<br/> A - 每年现金流<br/> r - 折现率<br/> |

- P - Pessimistic - 悲观值、最差的值
- O - Optimistic - 乐观值、最好的值
- M - Most likely - 通常值
- Internal Rate of Return
  - 越高越好

| Six Sigma |
| --------- | --------- |
| 1σ        | 68.27%    |
| 2σ        | 95.45%    |
| 3σ        | 99.73%    |
| 6σ        | 99.99966% |

**ROI**

$$
ROI = 总收益率 = (总折现收益 - 总折现成本)/折现成本
$$

## 关于数字的规则

| rule        | for          | note                                          |
| ----------- | ------------ | --------------------------------------------- |
| 80 小时规则 | 最大的工作包 |
| 0/50/100    | 工作包       |
| 80/20 规则  | 帕累托法则   | 20% of causes responsible for 80% of problems |

## 时间管理

- PDM - AON
- ADM - AOA
- CDM GERT
- 赶工 Crashing - 加更多资源
- 快速跟进 - 并行任务
