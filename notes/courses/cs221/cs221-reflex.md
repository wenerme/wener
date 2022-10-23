---
title: CS221 Artificial Intelligence - Reflex
---

# CS221 AI Reflex Based Models

Reflex-based models
: 基于反射的模型
: $
\text{\color{orange}input } x
->
\stackrel{\color{orange}\text{predicator}}{\boxed{f(x)} }
->
y \text{\color{orange} output}
$

Binary Classification
: 二元分类
: $
x ->
\stackrel{\color{orange}\text{classifier}}{\boxed{f(x)} }
-> y \in \color{orange} \{+1,-1\} \text{ \color{red}label}
$

Regression
: 回归
: $
x -> \boxed{f(x)} -> y \in \color{orange} \mathbb{R} \text{ \color{red}response}
$

Structured prediction
: 结构化预测
: $
x -> \boxed{f(x)} -> y \text{ is a } \text{\color{orange}complex object}
$

<!-- x -> \boxed{f(x)} -> y \in \color{orange} \mathcal{Y} \text{ \color{red}label}
-->

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
f_W(x) = \text{w} \cdot \phi(x)
$$

- $W=[w_1,w_2]$ - weight vector - 权重向量
- feature extractor - $\phi(x)=[1,x]$ - feature vector

$$
f_W(x) = \text{sign}(\mathbf{w} \cdot \phi(x))
$$

$$
\begin{alignat*}{2}
\mathcal{F}
&=\{ f_\mathbf{w} : \mathbf{w} \in \mathbb R ^d \} \\
&=\{ f_\mathbf{w} = \mathbf{w} \cdot \phi(x) : \mathbf w \in \mathbb R ^d \}
\end{alignat*}
$$

Loss function
: 损失函数
: $
\text{Loss}_{0-1}(x,y,\text{w}) = 1[f_\text{w}(x) \ne y] \text{\color{orange} zero-one loss}
$

**非线性**

Quadratic predictors
: 二次预测器

Quadratic clasifiers
: 二次分类器
: Decision boundary - 一个圆

Piecewise constant predictors
: 分段常数预测器

Predictors with periodicity structure
: 周期性结构预测器

### Linear predictors

Feature vector
: 特征向量
: 特征工程 - feature-engineering
: 将原始数据抽象为特征向量

$$
\phi(x)=
\begin{bmatrix}
\phi_1(x)\\
\vdots\\
\phi_d(x)
\end{bmatrix}
\in \mathbb{R}^d
$$

- $\phi(x)$
  - feature extractor
  - 特性提取器

Score
: 分数
: 如果是最终结果，则代针对某个结论的肯定程度

$$
s(x,w) = w \cdot \phi(x)
$$

- w - weight - 权重
  - 对于一个输出，不同的特征对输出的影响不同
  - 例如: 一个人的身高，体重，年龄，性别，对于 性别和年龄 的影响不同
- s - score - 分数
  - 特征\*权重
  - 例如: 0.78 是 男性

**Linear classifier**

$$
\
f_w(x)=
sign(s(x,w)) =
\begin{cases}
+1 & \text{if} \space w \cdot \phi(x) > 0 \\
-1 & \text{if} \space w \cdot \phi(x) < 0 \\
? & \text{if} \space w \cdot \phi(x) = 0
\end{cases}
$$

**Margin**

- larger values are better

$$
m(x,y,w) = s(x,w) \times y
$$

**Linear regression**

$$
f_w(x) = s(x,w) = w \cdot \phi(x)
$$

**Residual**

amount by which the prediction $f_w(x)$ overshoots the target $y$

$$
r(x,y,w) = f_w(x) - y = s(x,w) - y
$$

### Loss minimization

Loss function
: 损失函数
: $Loss(x,y,w)$
: 评价模型的**预测值**和**真实值**不一样的程度
: weights $w$, output $y$, input $x$.
: 在训练中希望减小的值
: 分为 **经验风险损失函数** 和 **结构风险损失函数**

Classification case
: 分类问题

| Name         | Zero-one loss                   | Hinge loss                   | Logistic loss                   |
| ------------ | ------------------------------- | ---------------------------- | ------------------------------- |
| Loss         | $1_{m(x,y,w) <= 0}$             | $\text{max}(1−m(x,y,w),0)$   | $\text{log}(1+e^{−m(x,y,w)})$   |
| Illustration | ![](./assets/loss-zero-one.svg) | ![](./assets/loss-hinge.svg) | ![](./assets/loss-logistic.svg) |

**Regression case**

| Name                   | Squared loss                   | Absolute deviation loss        |
| ---------------------- | ------------------------------ | ------------------------------ |
| $\textrm{Loss}(x,y,w)$ | $(\textrm{res}(x,y,w))^2$      | $\|\textrm{res}(x,y,w)\|$      |
| Illustration           | ![](./assets/loss-squared.svg) | ![](./assets/loss-abs-dev.svg) |

**Zero-one loss**

$$
\begin{alignat*}{2}
\text{Loss}_{0-1}(x,y,\text{w}) &= 1[f_\text{w}(x) \ne y] \\
&= 1[
\underbrace{ (\text{w} \cdot \phi(x)) y }_{\text{margin}}
\le 0
]
\end{alignat*}
$$

**Hinge loss**

$$
\begin{alignat*}{2}
\textrm{Loos}_\text{hinge}(x,y,w)
&= \text{max}\{1− (w \cdot \phi(x))y ,0\} \\
&= \begin{cases}
    -\phi(x) y & \text{if} \space 1- (w \cdot \phi(x))y > 0 \\
    0 & \text{otherwise}
  \end{cases}
\end{alignat*}
$$

**Logistic regression**

$$
\textrm{Loos}_\text{logistic}(x,y,w) =
\text{log}(1+e^{−m(x,y,w)})
$$

**Loss minimization framework**

$$
\textrm{TrainLoss}(w)=\frac{1}{|\mathcal{D}_{\textrm{train}}|}\sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}\textrm{Loss}(x,y,w)
$$

group DRO
: Group distributionally robust optimization

$$
\textrm{TrainLoos}_\text{max}(w) =
\underset{g}{\text{max}}
\textrm{TrainLoos}_g(w)
$$

$$
\nabla\textrm{TrainLoos}_\text{max}(\mathbf{w})
= \nabla \textrm{TrainLoos}_{\text{g}^\text{*}} (\mathbf{w}) \\
\text{where } g^\text{*}=\underset{g}{\text{argmax}} \text{TrainLoss}_g(\mathbf{w})
$$

### Non-linear predictors

$k$-nearest neighbors
: KNN
: $k$相邻

Neural networks
: 神经网络

$$
z_j^{[i]}={w_j^{[i]}}^Tx+b_j^{[i]}
$$

- w - weight
- b - bias
- x - input
- z - non-activated output

### Stochastic gradient descent

随机梯度下降

- Stochastic updates
  - Stochastic gradient descent (SGD)
- Batch updates
  - Batch gradient descent (BGD)

### Fine-tuning models

- Hypothesis class
- Logistic function

$$
\boxed{\forall z\in]-\infty,+\infty[,\quad\sigma(z)=\frac{1}{1+e^{-z}}}
$$

$$
\sigma'(z)=\sigma(z)(1-\sigma(z))
$$

- Backpropagation
- Approximation and estimation error
- Regularization
  - keep the model from overfitting
  - LASSO
    - Shrinks coefficients to 0
    - Good for variable selection
  - Ridge
    - Makes coefficients smaller
  - Elastic Net
    - Tradeoff between variable selection and small coefficients
- Hyperparameters
- Sets vocabulary
- Training set - 训练集
  - 80%
- Validation set - 验证集
  - 20%
  - hold-out, development set
- Testing set - 测试集

### Unsupervised Learning

- k-means
- Clustering
- Objective function

$$
\textrm{Loss}_{\textrm{k-means}}(x,\mu)=\sum_{i=1}^n||\phi(x*i)-\mu*{z_i}||^2
$$

Algorithm

$$
\boxed{z*i=\underset{j}{\textrm{arg min}}||\phi(x_i)-\mu_j||^2}\quad\textrm{and}\quad\boxed{\mu_j=\frac{\displaystyle\sum*{i=1}^n1*{\{z_i=j\}}\phi(x_i)}{\displaystyle\sum*{i=1}^n1\_{\{z_i=j\}}}}
$$

**Principal Component Analysis**

- Eigenvalue, eigenvector

$$
\boxed{Az=\lambda z}
$$

​

Spectral theorem

$$
\exists\Lambda\textrm{ diagonal},\quad A=U\Lambda U^T
$$

$$
\boxed{\phi*j(x_i)\leftarrow\frac{\phi_j(x_i)-\mu_j}{\sigma_j}}\quad\textrm{where}\quad\boxed{\mu_j = \frac{1}{n}\sum*{i=1}^n\phi*j(x_i)}\quad\textrm{and}\quad\boxed{\sigma_j^2=\frac{1}{n}\sum*{i=1}^n(\phi_j(x_i)-\mu_j)^2}
$$

## Misc

- $y = w_1x_1 + w_2x_2 + ... + w_nx_n + b$
  - $y$ is the output
  - $x_i$ is the input
  - $w_i$ is the weight
  - $b$ is the bias
- 有监督学习
  - 有输入和输出
  - 输入是特征
  - 输出是标签
  - 通过学习输入和输出的关系, 从而预测未知的输出
