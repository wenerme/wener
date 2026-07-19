---
title: Algorithms
---

# Algorithms

| 方法                 | 学习对象           | 学习发生在             | 主要信号                 | 典型特点                               |
| -------------------- | ------------------ | ---------------------- | ------------------------ | -------------------------------------- |
| [Q-Learning](./qlearning.md) | 状态-动作价值函数  | 单个智能体在交互过程中 | 每一步奖励、折扣回报     | 经典离策略强化学习，适合离散动作空间   |
| SARSA                | 状态-动作价值函数  | 单个智能体在交互过程中 | 当前策略下的奖励         | 与 Q-Learning 类似，但更偏向在策略学习 |
| Policy Gradient      | 策略参数           | 与环境交互的采样回合中 | 累积回报                 | 直接优化策略，适合连续动作控制         |
| Actor-Critic         | 策略与价值函数     | 交互采样与更新循环中   | 奖励、优势函数、TD 误差  | 结合策略梯度与价值估计，训练更稳定     |
| PPO                  | 策略与价值函数     | 多轮采样后的批量更新中 | 优势函数、裁剪目标       | 受限策略更新，常用于稳定的在线强化学习 |
| SAC                  | 随机策略与价值函数 | 连续控制的经验回放中   | 奖励、熵、TD 误差        | 最大熵离策略方法，样本效率较高         |
| DQN                  | 深度神经网络参数   | 经验回放与批量训练时   | 奖励、TD 误差            | 将 Q-Learning 扩展到深度网络           |
| [MCTS（UCT/PUCT）](./mcts.md) | 搜索树与动作估值   | 每次决策时的在线搜索中 | 模拟回报、价值与策略先验 | 通过选择、扩展、评估、回传规划动作     |
| [NEAT](./neat.md)    | 神经网络权重和结构 | 一代代种群之间         | 个体适应度               | 通过进化同时搜索结构与参数             |
| rtNEAT               | 网络权重和结构     | 世界持续运行时         | 实时适应度               | 面向在线进化，适合实时交互系统         |
| Genetic Algorithm    | 参数、结构或规则   | 多代种群进化过程中     | 适应度                   | 通用黑箱优化方法，常用于搜索和调参     |
| Transformer          | 序列表示与输出分布 | 预训练 + 微调阶段      | 轨迹、文本、奖励、示范   | 擅长处理长依赖，可做行为克隆或序列决策 |
| Behavior Cloning     | 策略映射           | 监督学习阶段           | 专家示范数据             | 用模仿学习直接学习动作映射             |
| RLHF                 | 策略与偏好对齐     | 预训练后的人类反馈阶段 | 人类偏好、奖励模型       | 常用于对齐大模型输出                   |
| Evolution Strategies | 参数向量           | 多次采样评估中         | 任务回报                 | 基于随机扰动的黑箱优化，易并行         |

- [A Tour of Machine Learning Algorithms](http://machinelearningmastery.com/a-tour-of-machine-learning-algorithms/)

## Top 10 Machine Learning Algorithms

1. Naïve Bayes Classifier Algorithm
2. K Means Clustering Algorithm
3. Support Vector Machine Algorithm
4. Apriori Algorithm
5. Linear Regression
6. Logistic Regression
7. Artificial Neural Networks
8. Random Forests
9. Decision Trees
10. Nearest Neighbours

---

- [Top 10 Machine Learning Algorithms](https://www.dezyre.com/article/top-10-machine-learning-algorithms/202)

## String

- [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
  - [莱文斯坦距离](https://zh.wikipedia.org/wiki/莱文斯坦距离)
- [What are the data structures behind a spreadsheet?](https://softwareengineering.stackexchange.com/a/219301/126631)
  - DAG + Topological Sorting
