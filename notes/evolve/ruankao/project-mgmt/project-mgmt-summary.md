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

- 组织过程资产
- 事业环境因素

实施整体变更控制

## 沟通管理

### 管理沟通

- 项目沟通管理计划
- 工作绩效报告
- 事业环境因素
- 组织过程资产

### 扩展了解

- PBP - 投资回收期 - Payback Period
  - sum(NPV) > 0
  - 可以算带小小数点时间
    - 年+sum(NPM)/367.51
  - = (p - n)÷p + ny
  - = 1 + ny - n÷p
  - https://www.calculator.net/payback-period-calculator.html
- Cash Flow Return Rate
- Internal Rate of Return - 越高越好
- cash inflow - 现金流

$$
投资收益率 = 1 / 投资回收期
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
