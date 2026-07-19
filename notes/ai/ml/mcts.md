---
title: Monte Carlo Tree Search
---

# Monte Carlo Tree Search

MCTS（Monte Carlo Tree Search，蒙特卡洛树搜索）是一类在有限计算预算内，通过反复采样、扩展和回传估值来选择动作的在线规划方法。它不要求预先枚举整棵博弈树，适合分支很多、评估昂贵或缺少精确启发式函数的问题。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 时间 | 2006 年。Rémi Coulom 在 CG 2006 论文中以 Monte-Carlo Tree Search 为题讨论选择性搜索与回传；同年 Kocsis、Szepesvári 提出 UCT。 |
| 人物与机构 | Rémi Coulom（INRIA）；Levente Kocsis、Csaba Szepesvári（UCT 论文作者）。 |
| 代表工作 | Coulom 的选择性 MCTS 工作；Kocsis、Szepesvári 的 `Bandit Based Monte-Carlo Planning`；后续的 AlphaGo Zero / AlphaZero。 |
| 领域 | 博弈、规划、组合搜索、强化学习。 |

- 相关
  - [Algorithms](./algorithms.md)
  - [Monte-Carlo](../../algorithm/monte-carlo.md)
  - 强化学习：MCTS 可独立使用，也可由策略/价值网络引导并参与自博弈训练。

## 一次搜索

每轮 simulation 从根节点开始，通常经过四个阶段：

1. **选择（Selection）**：沿已展开节点选择兼顾利用与探索的动作，直至叶节点。
2. **扩展（Expansion）**：为叶节点创建一个或多个尚未探索的子节点。
3. **评估（Evaluation）**：使用随机 rollout、规则评估器或价值网络估计叶节点价值。
4. **回传（Backpropagation）**：将结果沿路径更新访问次数和累计价值；零和双人博弈需要在对手回合转换价值视角。

经过固定时间、simulation 数或其他预算限制后，通常按根节点子动作的访问次数选择最终动作，而非直接选择最高平均价值。

## 选择规则

### UCT

UCT（UCB applied to Trees）将多臂老虎机的 UCB 思想用于树搜索。常见形式为：

$$
a^* = \arg\max_a \left(Q(s, a) + c_{\mathrm{uct}} \sqrt{\frac{\ln N(s)}{1 + N(s, a)}}\right)
$$

- $Q(s, a)$：动作的平均价值。
- $N(s)$：节点访问次数；$N(s, a)$：该动作访问次数。
- $c_{\mathrm{uct}}$：探索系数。较大时更愿意探索低访问动作，较小时更偏向当前高价值动作。

### PUCT

PUCT 将策略先验 $P(s, a)$ 加入探索项，是 AlphaGo Zero、AlphaZero 等策略/价值网络引导搜索的常见形式：

$$
a^* = \arg\max_a \left(Q(s, a) + c_{\mathrm{puct}} P(s, a) \frac{\sqrt{N(s)}}{1 + N(s, a)}\right)
$$

策略网络将搜索资源优先分配到更有希望的动作，价值网络替代或减少随机 rollout。自博弈时可将根节点访问次数分布作为下一轮策略训练目标。

## 常见变体与实现点

| 主题                 | 要点                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Rollout MCTS         | 用随机或启发式模拟评估叶节点；实现直接，但长轨迹和弱 rollout 会带来高方差。                |
| Neural MCTS          | 使用策略先验和价值网络，减少 rollout；常见于 AlphaZero 系列。                              |
| Root exploration     | 自博弈训练常只在根节点向先验加入 Dirichlet noise，避免搜索过早收敛。                       |
| Transposition        | 同一状态可由多条路径到达时，应考虑使用有向无环图而非重复建树，并明确共享统计量与并发语义。 |
| Progressive widening | 动作空间很大或连续时，随访问次数逐步开放候选动作，而不是一次扩展全部动作。                 |
| Parallel search      | 需要处理多个 worker 同时选择同一节点的问题；virtual loss 是常用的冲突缓解手段。            |

## 与其他方法

| 方法                        | 主要作用                | 与 MCTS 的关系                                   |
| --------------------------- | ----------------------- | ------------------------------------------------ |
| Q-Learning / DQN            | 学习状态-动作价值       | 可提供估值，但通常不进行显式前瞻搜索。           |
| Policy Gradient / PPO / SAC | 直接优化策略            | 可作为策略先验或独立的决策方法。                 |
| AlphaZero                   | 自博弈训练策略/价值网络 | 用 PUCT 搜索产生行动与训练目标。                 |
| NEAT / rtNEAT               | 进化网络结构和参数      | 可进化策略或评估器；与 MCTS 属于不同的优化范式。 |

## 实现检查

- 明确价值定义：是当前行动方视角、根节点视角，还是固定玩家视角；回传时统一处理符号翻转。
- 统一终局、截断和未展开节点的价值来源，避免不同路径使用不可比较的分数。
- 将 simulation 数、时间预算、最大深度、探索系数和随机种子配置化，并记录实际搜索统计量。
- 大型状态空间优先评估动作生成、缓存、transposition 和 progressive widening，单纯增加 rollout 往往收益有限。
- 并行实现中验证访问计数、累计价值、虚拟损失和节点生命周期的同步边界。

## 参考

- [Bandit Based Monte-Carlo Planning](https://doi.org/10.1007/11871842_29)
  - Kocsis 与 Szepesvari 提出的 UCT 论文。
- [A general reinforcement learning algorithm that masters chess, shogi, and Go through self-play](https://www.science.org/doi/10.1126/science.aar6404)
  - AlphaZero：策略/价值网络与 MCTS 自博弈训练。
- [Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm](https://arxiv.org/abs/1712.01815)
  - AlphaZero 的 arXiv 预印本，arXiv:1712.01815。
- [lightvector/KataGo](https://github.com/lightvector/KataGo)
  - 围棋引擎及自博弈训练实现；其 [Monte-Carlo Graph Search from First Principles](https://github.com/lightvector/KataGo/blob/master/docs/GraphSearch.md) 说明了 MCTS 在 transposition 图中的实现要点。
