---
title: CS221 States-based models
---

# States-based models

## 搜索优化

Tree search
: 树搜索

![](https://stanford.edu/~shervine/teaching/cs-221/illustrations/tree.png)

Backtracking search
: 回溯搜索

Breadth-first search (BFS)
: 广度优先搜索

Depth-first search (DFS)
: 深度优先搜索

Iterative deepening
: 迭代加深

| Algorithm               | Action costs  | Space              | Time               |
| ----------------------- | ------------- | ------------------ | ------------------ |
| Backtracking search     | any           | $\mathcal{O}(D)$   | $\mathcal{O}(b^D)$ |
| BFS                     | $c\geqslant0$ | $\mathcal{O}(b^d)$ | $\mathcal{O}(b^d)$ |
| DFS                     | 0             | $\mathcal{O}(D)$   | $\mathcal{O}(b^D)$ |
| DFS-Iterative deepening | $c\geqslant0$ | $\mathcal{O}(d)$   | $\mathcal{O}(b^d)$ |

- $b$ - 每个状态的操作数量
- $d$ - solution depth - 解的深度
- $D$ - 最大深度

## Graph search

Dynamic programming - DP
: 动态规划
: backtracking search + memoization

$$
\textrm{FutureCost}(s)=\left\{\begin{array}{lc}0 & \textrm{if IsEnd}(s)\\\underset{a\in\textrm{Actions}(s)}{\textrm{min}}\big[\textrm{Cost}(s,a)+\textrm{FutureCost(Succ}(s,a))\big] & \textrm{otherwise}\end{array}\right.
$$

![](https://stanford.edu/~shervine/teaching/cs-221/illustrations/dynamic-programming.png)

- Explored $\mathcal{E}$
- Frontier $\mathcal{F}$
- Unexplored $\mathcal{U}$

Uniform cost search - UCS
: 统一代价搜索
: Dijkstra's algorithm
: 不支持 negative action costs

![](https://stanford.edu/~shervine/teaching/cs-221/illustrations/ucs-example.png)

| Algorithm           | Acyclicity | Costs         | Time/space              |
| ------------------- | ---------- | ------------- | ----------------------- |
| Dynamic programming | yes        | any           | $\mathcal{O}(N)$        |
| Uniform cost search | no         | $c\geqslant0$ | $\mathcal{O}(n\log(n))$ |

## Learning costs

Structured perceptron
: 结构感知机

A<sup>*</sup> search
: A<sup>*</sup> 搜索
