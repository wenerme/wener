---
title: CS221 AI
---

# CS221 AI

- 基于刺激的模型 - [Reflex-based models](./cs221-reflex.md)
- 基于状态的模型 - [States-based models](./cs221-state.md)
- 基于变量的模型 - variable
- 基于逻辑的模型 - logic

---

- https://www.youtube.com/watch?v=J8Eh7RqggsU&list=PLoROMvodv4rO1NB9TD4iUZ3qghGEGtqNX
- https://www.youtube.com/watch?v=ZiwogMtbjr4&list=PLoROMvodv4rOca_Ovz1DvdtWuz8BfSWL2
- shervine [cs-221](https://stanford.edu/~shervine/teaching/cs-221/)

# Stanford CS221: Artificial Intelligence: Principles and Techniques | Autumn 2021

- https://stanford-cs221.github.io/autumn2021/
- [Youtube 播放列表](https://www.youtube.com/playlist?list=PLoROMvodv4rOca_Ovz1DvdtWuz8BfSWL2)

## Lession 1: Overview

Reflex-based models
: 基于 反射/刺激 的模型
: $
\text{\color{orange}input } x
->
\stackrel{\color{orange}\text{predicator}}{\boxed{f(x)} }
->
y \text{\color{orange} output}
$
: 最简单的模型，不考虑历史，只考虑当前情况

Binary Classification
: 二元分类
: $
x ->
\stackrel{\color{orange}\text{classifier}}{\boxed{f(x)} }
-> y \in \color{orange} \{+1,-1\} \text{ \color{red}label}
$
: 输出二元结果 - true/false, yes/no, positive/negative, 1/-1, 1/0

Regression
: 回归
: $
x -> \boxed{f(x)} -> y \in \color{orange} \mathbb{R} \text{ \color{red}response}
$
: 输出实数结果

Structured prediction
: 结构化预测
: $
x -> \boxed{f(x)} -> y \text{ is a } \text{\color{orange}complex object}
$
: 输出复杂对象

## Lession 2: Linear Regression

Linear regression framework
: 线性回归框架
: Decision boundary - 一条线
: Hypothesis class - 假设类 - 哪些预测是可能的
: Loss function - 损失函数 - 如何衡量预测的好坏
: Optimization algorithm - 优化算法 - 如何找到最好的预测

Hypothesis class
: 假设类
: 哪些预测是可能的

$$
\begin{alignat*}{2}
\mathcal{F}
&=\{ f_\mathbf{w} : \mathbf{w} \in \mathbb R ^d \} \\
&=\{ f_\mathbf{w} = \mathbf{w} \cdot \phi(x) : \mathbf w \in \mathbb R ^d \}
\end{alignat*}
$$

**符号说明**

| name              | notation                      | 含义       |
| ----------------- | ----------------------------- | ---------- |
| weight vector     | $\mathbf w = [ w_1, w_2 ]$    | 权重向量   |
| feature extractor | $\phi(x)$                     | 特征提取器 |
| feature vector    | $\phi(x)=\color{red}[1,x]$    | 特征向量   |
| train set         | $\mathcal D _ \textrm{train}$ | 训练集     |
| test set          | $\mathcal D _ \textrm{test}$  | 测试集     |

Loss function
: 损失函数

$$
\text{Loss}(x,y,\mathbf w) = 1[f_\mathbf w (x) \ne y] \text{\color{orange} zero-one loss}
$$

$$
\text{Loss}(x,y,\mathbf w) = (f_\mathbf w(x) - y)^2 \text{\color{orange} squared loss}
$$

$$
\textrm{TrainLoss}(\mathbf w)=
\frac{1}{|\mathcal{D}_{\textrm{train}}|}\sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}\textrm{Loss}(x,y,\mathbf w)
$$

:::tip 机器学习目标

**最小化 TrainLoss**

$$
\text{min}_\mathbf w \textrm{TrainLoss}(\mathbf w)
$$

:::

gradient
: the gradient $\nabla_\mathbf w\textrm{TrainLoss}(\mathbf w)$ is the direction that increases the training loss the most
: 梯度 是让训练损失最大化的方向
: $\nabla_\mathbf w \textrm{Loss}(x,y,\mathbf w)$
: $\nabla_\mathbf w\textrm{TrainLoss}(\mathbf w)$

:::tip gradient descent - 梯度下降算法

- 初始化 $\mathbf w = [0,...,0]$
- for $t = 1,..., T \text{ \tiny\color{orange}周期/epoch}$
  - $
\mathbf w \longleftarrow
\mathbf w -
  \underbrace{ \color{red} \eta  }_{\text{step size}}
  \underbrace{ \color{purple} \nabla_\mathbf w\textrm{TrainLoss}(\mathbf w) }_{\text{gradient}}
$

> - $\eta \in \mathbb R$
>   - learning rate - step size
>   - 学习速率 - 每次更新多少
> - 权重 $\mathbf w$ 在每个周期被更新 - **Machine 学习的内容**

![](https://stanford.edu/~shervine/teaching/cs-221/illustrations/gradient-descent.png)

:::

Objective function
: 初始化 **权重** 的函数

$$
\begin{alignat*}{2}
\textrm{TrainLoss}(\mathbf w)
&=\frac{1}{|\mathcal{D}_{\textrm{train}}|}
  \sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}
  \textrm{Loss}(x,y,\mathbf w) \\
&=\frac{1}{|\mathcal{D}_{\textrm{train}}|}
  \sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}
  (\mathbf w \cdot \phi(x) - y)^2 \text{ \tiny\color{orange}squared loss}
\end{alignat*}
$$

> **Note** 使用每个 loss 的平均作为初始 TrainLoss

$$
\nabla_\mathbf w\textrm{TrainLoss}(\mathbf w)=
  \frac 1 {|\mathcal{D}_{\textrm{train}}|}
  \sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}
  2(
    \underbrace{
    {\color{red} \mathbf w \cdot \phi(x)} - {\color{green}y}
    }_{\text{{\color{red}predication} - \color{green}target}}
  ) \phi(x)
$$

> **Note**
>
> - $()^2 \longrightarrow 2()$ 的 gradient/$\nabla$ 的转换逻辑后面会讲到
> - 使用 squared loss 的 gradient

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Lession2Demo} from '@theme/CS221';

<Admonition type="tip" icon="💡" title="Demo">

<details>

<summary>代码:</summary>



<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```js
function train({ iterations = 200, learningRate = 0.1, log = console.log.bind(console) } = {}) {
  // 训练集
  const trainSet = [
    [1, 1],
    [2, 3],
    [4, 3],
  ];
  log(`train epochs:${iterations} eta:${learningRate}`);
  // Optimization problem
  // 1/3 * sum((w*phi(x) - y) ^ 2)
  const trainLoss = (w) => {
    let sum = 0;
    for (const [x, y] of trainSet) {
      sum += (w[0] * 1 + w[1] * x - y) ** 2;
    }
    return sum * (1 / trainSet.length);
  };
  // 1/3 * sum(2(w*phi(x) - y)phi(x))
  const gradientTrainLoss = (w) => {
    let sum = [0, 0];
    for (const [x, y] of trainSet) {
      let d = 2 * (w[0] * 1 + w[1] * x - y);
      let z = [d * 1, d * x];
      sum = [sum[0] + z[0], sum[1] + z[1]];
    }
    const loss = [sum[0] * (1.0 / trainSet.length), sum[1] * (1.0 / trainSet.length)];
    return loss;
  };
  // Optimization algorithm
  const gradientDescent = (F, gradientF, initialWeightVector) => {
    let w = initialWeightVector;
    let eta = learningRate;
    for (let i = 0; i < iterations; i++) {
      let value = F(w);
      let gradient = gradientF(w);
      w = [w[0] - eta * gradient[0], w[1] - eta * gradient[1]];
      //
      log(`epoch ${i + 1}:`, `w: ${w}, F(w)=${value}, gradient: ${gradient}`);
    }
    return w;
  };
  const w = gradientDescent(trainLoss, gradientTrainLoss, [0, 0]);
  log(`w: ${w}`);
  return { w };
}
```

  </TabItem>
</Tabs>

</details>


<Lession2Demo/>

</Admonition>

:::tip 向量计算

$$
\begin{pmatrix}
  a_1&a_2
\end{pmatrix}
\cdot
\begin{pmatrix}
  b_1&b_2
\end{pmatrix} = a_1b_1+a_2b_2
$$

:::

## Lession 3: Linear Classification

## Lession 4: SGD

## Lession 5: Group DRO

## Lession 6: Non-Linear Features

## Lession 7: Feature Template

## Lession 8: Neural Networks

## Lession 9: Backpropagation

## Lession 10: Differentiable Programming

## Lession 11: Generalization

## Lession 12: Best Practices

## Lession 13: K-means
