---
title: NEAT
---

# NEAT

NEAT（NeuroEvolution of Augmenting Topologies）是一种 neuroevolution 算法。它从简单神经网络开始，同时演化连接权重和网络拓扑，并通过物种划分保护新出现的结构创新。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 时间 | 2002 年，`Evolving Neural Networks through Augmenting Topologies` 发表在 `Evolutionary Computation`。 |
| 人物与机构 | Kenneth O. Stanley、Risto Miikkulainen；得克萨斯大学奥斯汀分校 Department of Computer Sciences。 |
| 名称 | NeuroEvolution of Augmenting Topologies。 |
| 领域 | 进化计算、神经进化、强化学习、控制。 |
| 在线变体 | rtNEAT：Stanley、Bobby D. Bryant、Miikkulainen 在 2005 年 NERO 游戏工作中展示的实时神经进化方法。 |

## 核心机制

1. **从简单拓扑开始**：初始网络尽量小，复杂度随演化逐步增加。
2. **创新编号（innovation number）**：为结构突变分配历史标记，使不同基因组的交叉能够对齐同源连接。
3. **物种划分（speciation）**：按基因组距离分组，保护较新的拓扑结构在尚未优化权重前不被成熟种群淘汰。
4. **复杂化（complexification）**：通过增加连接和节点等突变扩展表达能力，同时保留已有可行结构。

## rtNEAT

rtNEAT（real-time NEAT）将种群更新放进持续运行的环境中，而非等待一整代离线评估完成。它面向实时交互和非平稳任务；NERO（NeuroEvolving Robotic Operatives）是其代表性游戏应用。

- 在线评估的适应度窗口、个体替换频率与训练环境变化需要明确，否则不同个体的分数不可比较。
- 种群多样性、评估预算和实时延迟通常比单次离线 NEAT 更关键。

## 与相近方法的区别

| 方法 | 区别 |
| --- | --- |
| Genetic Algorithm | 通用遗传算法不规定神经网络基因对齐、拓扑增量或物种保护。 |
| Evolution Strategies | 通常优化固定维度的参数向量，不直接演化离散网络拓扑。 |
| Q-Learning / DQN | 通过 Bellman 目标学习价值函数；NEAT 以适应度驱动种群演化。 |
| MCTS | 通过在线树搜索选择当前动作；NEAT 学习或演化策略/评估器本身。 |

## 实现检查

- 为新增连接和节点维护全局、可重复的创新编号。
- 将兼容距离、物种阈值、种群规模、突变率、交叉率与精英保留策略纳入实验配置。
- 分离训练期随机种子和评估期随机种子，避免只适应单个环境实例。
- 记录每代物种数量、平均拓扑规模、最佳与中位适应度，防止复杂化失控或种群早熟收敛。

## 参考

- [Evolving Neural Networks through Augmenting Topologies](https://doi.org/10.1162/106365602320169811)
  - Stanley、Miikkulainen 2002 年论文。
- [Real-Time Neuroevolution in the NERO Video Game](https://doi.org/10.1109/TEVC.2005.856210)
  - Stanley、Bryant、Miikkulainen 2005 年论文，介绍 rtNEAT。
- [Algorithms](./algorithms.md)
