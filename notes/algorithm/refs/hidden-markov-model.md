---
title: Hidden Markov Model
alias:
  - HMM
---

# Hidden Markov Model

- 隐马尔可夫模型 - Hidden Markov Model - HMM - 隐性马尔可夫模型
- 一种统计模型
- Hidden
  - 指 从可观察的参数中确定该过程的隐含参数
  - 确定 马尔可夫模型
- 用例
  - 模式识别
  - 中文断词/分词
  - 语音识别
  - 光学字符识别
  - 机器翻译
  - 生物信息学
  - 基因组学
- 优化
  - Baum-Welch
  - Viterbi algorithm
  - 联结树
- 概念
  - 转换概率（transition probabilities）
  - 输出概率（output probabilities）
- 参考
  - [Lecture 15: Applications of HMMs](https://www.youtube.com/watch?v=KBg97801U40)

---

- 问题
  - filter
    - 输入 -> 概率分布
    - ${\displaystyle P(x(t)\ |\ y(1),\dots ,y(t))}{\displaystyle P(x(t)\ |\ y(1),\dots ,y(t))}$
      - $t$ - 序列
      - $x(t)$ - 输入
      - $y(n)$ - 状态概率
  - smoothing
  - most likely explanation
    - Viterbi
