---
title: DMN
---

# DMN

| abbr. | stand for                           | cn               | meaning                                                    |
| ----- | ----------------------------------- | ---------------- | ---------------------------------------------------------- |
| DMN   | Decision Model and Notation         | 决策模型与标记法 | 用于建模与执行业务决策的标准，包含决策表、DRD、FEEL 等要素 |
| DRD   | Decision Requirements Diagram       | 决策需求图       | 图形化表示决策及其相互依赖关系，组织决策模型的结构         |
| FEEL  | Friendly Enough Expression Language | 友好表达式语言   | DMN 中用于编写表达式和条件的简洁可读语言                   |
| BKM   | Business Knowledge Model            | 业务知识模型     | 封装可复用的业务规则或函数，供决策引用与复用               |

- DMN
  - by OMG
- 参考
  - DMN Technology Compatibility Kit https://github.com/dmn-tck/tck
    - https://dmn-tck.github.io/tck/
  - https://docs.camunda.org/manual/latest/user-guide/model-api/dmn-model-api/
  - https://github.com/bpmn-io/feel-editor
  - https://docs.camunda.io/docs/components/modeler/feel/what-is-feel/
  - https://github.com/EdgeVerve/feel
  - https://github.com/nikku/feelin
    - https://nikku.github.io/feel-playground
  - https://github.com/bpmn-io/dmn-js
  - wikipedia [Decision Model and Notation](https://en.wikipedia.org/wiki/Decision_Model_and_Notation)
  - 2023-04 [DMN 1.4 Specification](https://www.omg.org/spec/DMN/1.4/)

**决策表**

e.g.

inputs -> outputs

| #   | 重量 (kg) | 地区 | 费用计算表达式    |
| --- | --------- | ---- | ----------------- |
| 1   | ≤1        | 本地 | 8                 |
| 2   | ≤1        | 省内 | 10                |
| 3   | ≤1        | 省外 | 12                |
| 4   | >1 且 ≤5  | 本地 | 12                |
| 5   | >1 且 ≤5  | 省内 | 16                |
| 6   | >1 且 ≤5  | 省外 | 20                |
| 7   | >5        | 本地 | 12 + 2 × (重量-5) |
| 8   | >5        | 省内 | 16 + 3 × (重量-5) |
| 9   | >5        | 省外 | 20 + 4 × (重量-5) |

- 输入
  - 重量
  - 地区
    - 可更细化为 发货地区、收货地区
- 输出
  - 费用

## Syntax

| 图形 / 线条            | 样式 | DMN 中的名称                                      | 中文解释                                                                                                                  |
| :--------------------- | :--- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| **矩形**               |      | **Decision** (决策)                               | 代表一个决策点，其结果由一个或多个输入决定。这是 DRD 的核心元素。例如 `TotalUsageCost`。                                  |
| **带表格图标的矩形**   |      | **Decision**/决策 / 决策表                        | 与普通决策相同，但左上角的图标明确表示其内部逻辑是由一个**决策表 (Decision Table)** 来实现的。                            |
| **带 `{}` 图标的矩形** |      | **Decision** (决策)/ 表达式                       | 与普通决策相同，但左上角的图标明确表示其内部逻辑是由一个**字面表达式 (Literal Expression)**（如一个 FEEL 公式）来实现的。 |
| **圆角矩形**           |      | **Input Data** (输入数据)                         | 代表决策所需的一个外部输入数据或对象。例如 `UsageMetrics`。                                                               |
| **波浪底矩形**         |      | **Knowledge Source** (知识源)                     | 代表决策所依据的外部文档、政策或专家。它通过权威需求（虚线）影响决策。例如，一个“公司定价策略”文档。                      |
| **切角矩形**           |      | **Business Knowledge Model (BKM)** (业务知识模型) | 代表可被复用的决策逻辑或函数。它通过知识需求（虚线箭头）被其他决策调用。例如，一个通用的“阶梯计价函数”。                  |
| **实线箭头**           |      | **Information Requirement** (信息需求)            | **表示依赖关系**。箭头从输入数据指向决策，或从一个子决策指向一个依赖其结果的父决策。这是最常见的连接线。                  |
| **虚线箭头**           |      | **Knowledge Requirement** (知识需求)              | **表示调用关系**。箭头从 BKM 指向一个决策，表示该决策在执行时会调用这个 BKM 中封装的逻辑。                                |
| **带圆点的虚线**       |      | **Authority Requirement** (权威需求)              | **表示影响关系**。箭头从知识源指向一个决策或 BKM，表示该决策的制定受到了这个知识源（如政策文档）的指导或约束。            |
