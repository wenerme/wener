---
tags:
  - Glossary
---

# Patterns Glossary

| abbr. | stand for                                | meaning                          |
| ----- | ---------------------------------------- | -------------------------------- |
| CQRS  | Command Query Responsibility Segregation | 命令查询责任分离                 |
| MTBF  | Mean Time Between Failures               | 平均故障间隔时间, 平均无故障时间 |
| MTTF  | Mean Time To Failure                      | 平均失效时间                     |
| MTTR  | Mean Time To Recovery                    | 平均恢复时间                     |

- MTBF
  - 修复产品两次相邻故障之间的平均时间
- MTTF
  - 衡量不可修复产品的平均寿命或失效前的平均时间

```
MTBF = 总运行时间÷ 故障次数

故障率(λ) = 1 / MTBF
```

| en           | cn     |
| ------------ | ------ |
| Availability | 可用性 |
| Resilience   | 韧性   |

- 弹性（Resiliency）
  - 强调防御模式
