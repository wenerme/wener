---
title: DMN
---

# DMN

- DMN - Decision Model and Notation - 决策模型与标记法
- 参考
  - wikipedia [Decision Model and Notation](https://en.wikipedia.org/wiki/Decision_Model_and_Notation)
  - 2023-04 [DMN 1.4 Specification](https://www.omg.org/spec/DMN/1.4/)

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
