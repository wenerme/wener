---
tags:
  - Topic
---

# 逻辑学

| en                     | cn         | notes                       |
| ---------------------- | ---------- | --------------------------- |
| Logic                  | 逻辑学     |
| Proposition            | 命题       |
| Hypothesis             | 假设       |
| Premise                | 前提条件   |
| Deduction              | 演绎       |
| Induction              | 归纳       |
| Contradiction          | 矛盾       |
| Syllogism              | 三段论     |
| Inference              | 推理       |
| Conclusion             | 结论       |
| Validity               | 有效性     |
| Consistency            | 一致性     |
| Paradox                | 悖论       |
| Axiom                  | 公理       |
| Theorem                | 定理       |
| Proof                  | 证明       |
| Conjunction, And       | 合取       | P∧Q                         |
| Disjunction, Or        | 析取       | P∨Q                         |
| Negation , Not         | 否定       | ¬P                          |
| Conditional            | 条件       | IF ... THEN ..., P→Q        |
| Biconditional          | 双条件     |
| Tautology              | 重言式     |
| Fallacy                | 谬误       |
| Modus Ponens           | 肯定前件   | P->Q; P=True -> Q=True      |
| Modus Tollens          | 否定后件   | P->Q; Q=False -> P=False    |
| Disjunctive Syllogism  | 析取三段论 | P∨Q; ¬P -> Q=True           |
| Hypothetical Syllogism | 假言三段论 | P→Q, Q→R; P=True, Q=True    |
| Possible               | 可能       | ◇,表示 一个命题可能为真     |
| Necessary              | 必然       | □,表示 一个命题必然为真     |
| Universal Quantifier   | 全称量词   | ∀,表示 “所有”或“对于每一个” |
| Existential Quantifier | 存在量词   | ∃,表示“存在”或“至少有一个”  |
| Element of             | 属于       | ∈                           |
| Union                  | 并集       | ∪                           |
| Intersection           | 交集       | ∩                           |
| Subset                 | 子集       | ⊆                           |

前提
: Premise
: 支持或证明结论的陈述，是论证的基础。

结论
: Conclusion
: 由前提支持的陈述，是论证的最终目标。

    •	有效论证（Valid Argument）：如果前提为真，结论必然为真。这是论证形式上的正确性。
    •	无效论证（Invalid Argument）：即使前提为真，结论也可能为假，论证形式存在问题。

- 逻辑谬误 - Fallacy
  - 稻草人谬误 - 曲解对方的论点然后反驳这个曲解。
  - 循证谬误/循环论证
    - 结论被用作前提之一，论证陷入循环。
    - 用结论本身作为论据，无法说服他人。
  - 类比谬误 - 用不恰当的类比来支持论点。
  - 人身攻击 - Ad Hominem
  - 诉诸情感 - 用情感而不是理性去支持论点。
  - 诉诸权威
  - 诉诸人数, 从众谬误
  - 诉诸个人
  - 诉诸传统
  - 诉诸无知
  - 形式谬误
    - 肯定后件的谬误 - Affirming the Consequent
      - 如果 P 则 Q；因为 Q，所以 P
    - 否定前件的谬误 - Denying the Antecedent
      - 如果 P 则 Q；因为 非 P，所以 非 Q

```
这个产品一定好用，因为很多人都买了。
你不同意我，那就是不关心我的感受。
我觉得这个决定是对的，因为我内心感觉很踏实。
```

- 矛盾与悖论
  - 自我指涉悖论 - Self-Reference Paradox
    - 一个命题指涉到自己
    - 比如 “我在撒谎” - 如果这句话是真的，那它就是假的；但如果它是假的，那它就是真的。
  - 罗素悖论 - Russell's Paradox
    - 一个集合包含所有不包含自己的集合，那么这个集合是否包含自己？

```
有一张纸条上写着“这句话是假的”。这句话是“真”还是“假”？
假设有一个理发师，他给镇上所有“不自己理发的人”理发。那么问题来了，理发师会不会给自己理发？
```

- 推理类型
  - 归纳推理 - Deductive Reasoning
    - 小 -> 大
    - 从具体到一般的推理
    - 归纳推理无法确保结论绝对成立，但可以提供很强的概率支持。
  - 演绎推理 - Inductive Reasoning
    - 大 -> 小
    - 从一般到具体的推理
  - 溯因推理 - Abductive Reasoning
    - 根据结果推测最可能的原因
    - 通常用于形成假设。
- 数理逻辑基础
  - 集合论
  - 公理化系统
  - 递归理论
- 逻辑证明方法
  - 直接证明法
  - 反证法
  - 数学归纳法
  - 穷举法

## 批判性思维

## 数学基础

- 集合论：集合、子集、交集、并集等概念。
- 数论基础：偶数、奇数、质数等数的性质。
- 基础代数：表达式展开、平方、基本因式分解。
