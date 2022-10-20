---
title: CS221 Artificial Intelligence - Reflex
---

# CS221 AI Reflex

### Linear predictors

Feature vector
: 特征向量

$$
\phi(x)=
\begin{bmatrix}
\phi_1(x)\\
\vdots\\
\phi_d(x)
\end{bmatrix}
\in \mathbb{R}^d
$$

**Score**

- 分数

$$
s(x,w) = w \cdot \phi(x)
$$

**Linear classifier**

$$
f_w(x)=
sign(s(x,w)) =
\begin{cases}
+1 & \text{if} \space w \cdot \phi(x) > 0 \\
-1 & \text{if} \space w \cdot \phi(x) < 0 \\
?  & \text{if} \space w \cdot \phi(x) = 0
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

| Name | Zero-one loss       | Hinge loss                 | Logistic loss                 |
| ---- | ------------------- | -------------------------- | ----------------------------- |
| Loss | $1_{m(x,y,w) <= 0}$ | $\text{max}(1−m(x,y,w),0)$ | $\text{log}(1+e^{−m(x,y,w)})$ |

$$
\begin{tikzpicture}
  \draw[->] (-3.2, 0) -- (3.2, 0) node[right] {$m(x,y,w)$};
  \draw[->] (0, 0) -- (0, 4.2) node[above] {$Loss_{0-1}$};
  \draw[shift={(0,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$0$};
  \draw[shift={(1,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$1$};
  \draw[line width=1mm, draw opacity=0.7, green] (-3,1.5) -- (0,1.5) -- (0,0) -- (3,0);
\end{tikzpicture}
$$

$$
\begin{tikzpicture}
  \draw[->] (-3.2, 0) -- (3.2, 0) node[right] {$m(x,y,w)$};
  \draw[->] (0, 0) -- (0, 4.2) node[above] {$Loss_\text{hing}$};
  \draw[shift={(0,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$0$};
  \draw[shift={(1,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$1$};
  \draw[line width=1mm, draw opacity=0.7, orange] (-3,4) -- (1,0) -- (3,0);
\end{tikzpicture}
$$

$$
\begin{tikzpicture}
  \draw[->] (-3.2, 0) -- (3.2, 0) node[right] {$m(x,y,w)$};
  \draw[->] (0, 0) -- (0, 4.2) node[above] {$Loss_\text{logistic}$};
  \draw[shift={(0,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$0$};
  \draw[shift={(1,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$1$};
  \draw[line width=1mm, draw opacity=0.7, domain=-3:3, smooth, variable=\x, blue] plot ({\x}, {log2(1+e^-\x)});
\end{tikzpicture}
$$

**Regression case**

| Name                   | Squared loss              | Absolute deviation loss   |
| ---------------------- | ------------------------- | ------------------------- |
| $\textrm{Loss}(x,y,w)$ | $(\textrm{res}(x,y,w))^2$ | $\|\textrm{res}(x,y,w)\|$ |

$$
\begin{tikzpicture}
  \draw[->] (-3.2, 0) -- (3.2, 0) node[right] {$res(x,y,w)$};
  \draw[->] (0, 0) -- (0, 4.2) node[above] {$Loss_\text{squared}$};
  \draw[shift={(0,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$0$};
  \draw[line width=1mm, draw opacity=0.7, domain=-2:2, smooth, variable=\x, blue] plot ({\x}, {\x*\x});
\end{tikzpicture}
$$

$$
\begin{tikzpicture}
  \draw[->] (-3.2, 0) -- (3.2, 0) node[right] {$res(x,y,w)$};
  \draw[->] (0, 0) -- (0, 4.2) node[above] {$Loss_\text{absdev}$};
  \draw[shift={(0,0)}] (0pt,2pt) -- (0pt,-2pt) node[below] {$0$};
  \draw[line width=1mm, draw opacity=0.7, pink] (-3,4) -- (0,0) -- (3,4)
\end{tikzpicture}
$$

**Loss minimization framework**

$$
\boxed{\textrm{TrainLoss}(w)=\frac{1}{|\mathcal{D}_{\textrm{train}}|}\sum_{(x,y)\in\mathcal{D}_{\textrm{train}}}\textrm{Loss}(x,y,w)}
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

$$
\mathcal{F}=\left\{f_w:w\in\mathbb{R}^d\right\}
$$

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
\textrm{Loss}_{\textrm{k-means}}(x,\mu)=\sum_{i=1}^n||\phi(x_i)-\mu_{z_i}||^2
$$

Algorithm

$$
\boxed{z_i=\underset{j}{\textrm{arg min}}||\phi(x_i)-\mu_j||^2}\quad\textrm{and}\quad\boxed{\mu_j=\frac{\displaystyle\sum_{i=1}^n1_{\{z_i=j\}}\phi(x_i)}{\displaystyle\sum_{i=1}^n1_{\{z_i=j\}}}}
$$

**Principal Component Analysis**

- Eigenvalue, eigenvector

$$
\boxed{Az=\lambda z}
$$

​

Spectral theorem

$$
\boxed{\exists\Lambda\textrm{ diagonal},\quad A=U\Lambda U^T}
$$

$$
\boxed{\phi_j(x_i)\leftarrow\frac{\phi_j(x_i)-\mu_j}{\sigma_j}}\quad\textrm{where}\quad\boxed{\mu_j = \frac{1}{n}\sum_{i=1}^n\phi_j(x_i)}\quad\textrm{and}\quad\boxed{\sigma_j^2=\frac{1}{n}\sum_{i=1}^n(\phi_j(x_i)-\mu_j)^2}
$$
