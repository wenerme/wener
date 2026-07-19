---
title: Q-Learning
---

# Q-Learning

Q-Learning 是一种无模型、离策略（off-policy）的时序差分强化学习算法。它学习状态-动作价值函数 $Q(s, a)$，并在满足充分探索及适当学习率等条件时收敛到最优动作价值函数。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 首次提出 | 1989 年，Christopher J. C. H. Watkins 的博士论文 `Learning from Delayed Rewards`。 |
| 理论工作 | 1992 年，Watkins 与 Peter Dayan 在 `Machine Learning` 发表 `Q-learning`，给出受控 Markov 域中的收敛结果。 |
| 人物与机构 | Christopher J. C. H. Watkins，剑桥大学博士研究；Peter Dayan，Q-Learning 1992 论文合作者。 |
| 领域 | 强化学习、序贯决策、控制。 |
| 相关方法 | SARSA、DQN、Double DQN、Expected SARSA。 |

## 核心更新

对转移 $(s, a, r, s')$，典型更新为：

$$
Q(s, a) \leftarrow Q(s, a) + \alpha \left[r + \gamma \max_{a'} Q(s', a') - Q(s, a)\right]
$$

- $\varepsilon$-greedy 或其他行为策略负责探索；更新目标使用贪心动作，因此 Q-Learning 是离策略方法。
- 终止状态通常令后继价值为零。
- 表格型 Q-Learning 适用于状态和动作空间可枚举或可离散化的问题；高维状态通常需要函数逼近，如 DQN。

## 与相近方法的区别

| 方法 | 区别 |
| --- | --- |
| SARSA | 使用行为策略实际选出的下一动作进行更新，是在策略（on-policy）方法。 |
| DQN | 用神经网络近似 $Q$ 函数，并常结合经验回放和目标网络。 |
| MCTS | 在决策期显式搜索未来动作；Q-Learning 将价值压缩进已学习的函数。 |
| Policy Gradient | 直接参数化并优化策略，而不是通过 $\max_{a'} Q(s', a')$ 选取动作。 |

## 实现检查

- 明确奖励尺度、终止状态与截断状态的 bootstrap 规则。
- 将学习率 $\alpha$、折扣因子 $\gamma$、探索率 $\varepsilon$ 及其衰减策略记录为实验配置。
- 验证探索是否覆盖关键状态-动作对；只在贪心策略上采样会破坏收敛前提。
- 函数逼近、离策略更新和自举同时使用时可能不稳定；DQN 的目标网络与经验回放是常见缓解手段，而非表格型算法的必要组成。

## 参考

- [Learning from Delayed Rewards](https://mlanthology.org/misc/1989/watkins1989misc-learning/)
  - Watkins 1989 年博士论文。
- [Q-learning](https://doi.org/10.1007/BF00992698)
  - Watkins、Dayan 1992 年论文。
- [Algorithms](./algorithms.md)
