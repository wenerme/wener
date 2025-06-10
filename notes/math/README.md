---
title: 数学
tags:
  - Reference
---

# Math

## 符号 {symbols}

| for            | sym | html             | latex             | cn     |
| -------------- | --- | ---------------- | ----------------- | ------ |
| plus           |     | &plus;           | $+$               |
| minus          |     | &minus;          | $-$               |
| Multiplication |     | &times;          | $\times$          |
| Division       |     | &divide;         | $\div$            |
| Not Equal To   |     | &ne;             | $\ne$             |
| Plus minus     |     | &plusmn;         | $\plusmn$         |
| real number    | ℝ   | &reals;          | $\mathbb R$       | 实数   |
| sum            | ∑   | &sum;            | $\sum$            | 求和   |
| Delta          | Δ   | &Delta;          | $\Delta$          |
| [Nabla]        | ∇   | &nabla;          | $\nabla$          | 纳布拉 |
| ceiling        | ⌈⌉  | &lceil;&rceil;   | $\lceil \rceil$   |
| floor          | ⌊⌋  | &lfloor;&rfloor; | $\lfloor \rfloor$ |
| Angle Bracket  | ⟨ ⟩ | &lang; &rang;    | $\lang \rang$     |
| Dot Operator   | ⋅   | &sdot;           | $\sdot$           |
| verbar         |     | &verbar;         | $\vert$           |        |

Nabla
: gradien
: divergence (∇⋅)
: curl (∇×)

[nabla]: https://en.wikipedia.org/wiki/Nabla_symbol

:::note

- HTML 使用十进制 `&#8711;`, Unicode 使用 十六进制。
- Latex 与 HTML 大多名字相同

:::

- https://en.wikipedia.org/wiki/Mathematical_Operators_(Unicode_block)
- https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode
- https://unicode-table.com/en/sets/mathematical-signs/
- https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references
  - HTML Named Enitties
  - https://html.spec.whatwg.org/entities.json
- https://katex.org/docs/support_table.html

## Scalar

## Vector

- 属性
  - length
  - distance
  - angle

| notation                     | for           | mean                              |
| ---------------------------- | ------------- | --------------------------------- |
| $\left\|\mathbf{a}\right\|$  | length        | 长度                              |
| $\mathbf{a}\cdot\mathbf{b}$  | dot product   | 点积                              |
| $\mathbf{a}\times\mathbf{b}$ | cross product | 叉积                              |
| $θ$                          | angle         | $\angle\mathbf{a}\mathbf{b}$ 夹角 |

vector
: an element of a vector space
: $\reals ^n$
: Euclidean vector
: Hilbert space

Length
: 长度

$$
\begin{alignat*}{2}
\left\|\mathbf{a}\right\|
  &= \sqrt{\mathbf{a}\cdot\mathbf{a}} \\
  &= \sqrt{a_1^2+a_2^2+a_3^2} \\
  &= \sqrt{\sum_{i=1}^n a_i^2}
\end{alignat*}
$$

Dot product
: 标量积
: 点积
: $\mathbf{a}\cdot\mathbf{b}=\left\|\mathbf{a}\right\|\left\|\mathbf{b}\right\|\cos\theta$
: $\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$
: $\left(x_1,\:\:\ldots ,\:\:x_n\right)\cdot \left(b,\:\:\ldots ,\:\:y_n\right)=\sum _{i=1}^nx_iy_i$

Cross product
: 矢量积
: $\mathbf{a}\times\mathbf{b}=\left\|\mathbf{a}\right\|\left\|\mathbf{b}\right\|\sin(\theta)\,\mathbf{n}$

## Matrix

矩阵

## Tensor

张量

- rank 0 - scalar - 标量、纯量
- rank 1 - vector - 向量
- rank 2 - matrix - 矩阵
- rank $m$ - $d_1 \times d_2 \times \cdots \times d_m$ where $d_i > 0$
  - $m$ - 称作 秩 或 阶
- 协变张量 - 指标在下
- 逆变张量 - 指标在上
- 混合张量 - 上下都有指标

---

- https://en.wikipedia.org/wiki/Tensor

## 概率 {#probability}

| abbr. | stand for                 | meaning      |
| ----- | ------------------------- | ------------ |
| PMF   | Probability Mass Function | 概率质量函数 |

- 概率论
- 随机过程
- 随机变量
- 随机分布

### 期望

期望
: Expectation
: 随机变量的“平均值”或者“加权平均值”。如果你重复进行一个随机实验很多很多次，那么每次结果的平均值就会越来越接近这个随机变量的期望。
: $E(X)$

**期望的意义：**

期望是概率论中衡量随机变量集中趋势的重要指标。它告诉我们随机变量的平均表现会是什么样子。在风险评估、投资决策、精算等领域都有广泛应用。

**离散随机变量的期望**

$$
E(X) = \sum_{i} x_i P(X=x_i)
$$

其中 $x_i$ 是随机变量 $X$ 的可能取值，$P(X=x_i)$ 是 $X$ 取值为 $x_i$ 的概率。

**连续随机变量的期望**

$$
E(X) = \int_{-\infty}^{\infty} x f(x) \, dx
$$

其中 $f(x)$ 是随机变量 $X$ 的概率密度函数。

## 概率分布

- 类型：
  - 离散概率分布 (Discrete Probability Distribution)： 随机变量只能取有限个或可数无限个特定值（通常是整数）。例如，抛硬币的次数、某个时间段内的顾客数量。
  - 连续概率分布 (Continuous Probability Distribution)： 随机变量可以在一个连续区间内取任何值。例如，一个人的身高、一辆车行驶的时间。
- 分布的意义：
  - 概率分布是统计学和概率论的基石。它能帮助我们：
    - 预测： 了解未来可能发生的事件的概率。
    - 决策： 在不确定性下做出更合理的选择。
    - 分析： 识别数据中的模式和异常。

| 离散       | 连续/极限 | notes            |
| ---------- | --------- | ---------------- |
| 二项分布   | 泊松分布  |                  |
| 几何分布   | 指数分布  |                  |
| 负二项分布 | 伽马分布  |                  |
| 泊松分布   | 正太分布  | $\lambda$ 足够大 |

### 离散概率分布

#### 二项分布{#binomial-distribution}

- 二项分布 (Binomial Distribution)
- 描述在 $n$ 次独立试验中，成功次数的分布。
- $B(n, p)$
  - 其中 $n$ 是试验次数，$p$ 是单次成功的概率。
- PMF: $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$
  - 其中 $k$ 是成功次数，$p$ 是单次成功的概率。
- $E(X)=np$
- 应用场景
  - 产品质检： 100个产品中，有多少个是合格品（假设合格率固定）。
  - 抽样调查： 随机抽取20人，其中有多少人支持某个政策。
  - 体育比赛： 射手10次射门中，命中靶心的次数。

#### 几何分布{#geometric-distribution}

- 几何分布 (Geometric Distribution)
- 描述第一次成功之前的失败次数。
- 描述第一次成功所需的试验次数。
- $Geo(p)$
  - 其中 $p$ 是单次成功的概率。
- PMF: $P(X=k) = (1-p)^{k-1} p$
  - 表示第 $k$ 次试验中第一次成功的概率。
- $E(X)=\frac{1}{p}$
- 应用场景
  - 市场营销： 平均需要打多少个推销电话才能成功卖出一单。
  - 生物实验： 进行多少次杂交实验才能得到第一个具有特定基因型的后代。
  - 游戏抽奖： 玩多少次抽奖才能抽到稀有物品。

#### 负二项分布{#negative-binomial-distribution}

- 负二项分布 (Negative Binomial Distribution)
- 几何分布是负二项分布$r=1$的特例。
- $NB(r, p)$
  - 其中 $r$ 是成功次数，$p$ 是单次成功的概率。
- PMF: $P(X=k) = C(k-1, r-1) p^r (1-p)^k$
- $E(X)=\frac{r}{p}$
- 应用场景
  - 医生看病： 需要看多少个病人才能遇到5个患有某种特定疾病的病人。
  - 金融投资： 需要进行多少次投资才能获得3次盈利。
  - 生产线： 生产多少个零件才能得到10个合格品。

### 连续概率分布 {#continuous-probability-distribution}

#### 正态分布 {#normal-distribution}

- 正态分布 (Normal Distribution)
- 高斯分布（Gaussian Distribution）
- 自然界和统计学中最重要、最常见的连续概率分布之一。它以其独特的“钟形曲线”而闻名。
- 描述数据在平均值附近对称分布的情况。
- 参数
  - 均值 $\mu$： 分布的中心位置，决定了钟形曲线的对称轴。
  - 方差 $\sigma^2$ 或 标准差 $\sigma$： 决定了分布的“胖瘦”或“扩散程度”。
    - $\sigma$ 越大，曲线越扁平，数据越分散。
    - $\sigma$ 越小，曲线越陡峭，数据越集中。
- 符号表示
  - $N(\mu, \sigma^2)$
- PDF: $f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$
- PDF: $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$
- $E(X)=\mu$
- 标准化正态分布 (Standard Normal Distribution)
  - 当 $\mu=0$ 且 $\sigma=1$ 时，称为标准正态分布，记作 $N(0, 1)$ 或 $\mathcal{Z}$ 分布。
  - 任何一个正态分布都可以通过标准化转换为标准正态分布：
    - $Z = \frac{X - \mu}{\sigma}$
- “68-95-99.7”法则 (经验法则)
  - 68% 的数据在 $\mu \pm \sigma$ 范围内, 即距均值1个标准差之内
  - 95% 的数据在 $\mu \pm 2\sigma$ 范围内, 即距均值2个标准差之内
  - 99.7% 的数据在 $\mu \pm 3\sigma$ 范围内, 即距均值3个标准差之内
- 6 西格玛 (Six Sigma)
  - 质量管理方法，旨在减少缺陷率，通常假设数据服从正态分布。
- 应用场景
  - 自然科学： 许多自然测量数据，如人类身高、体重、血压、测量误差、物理实验结果等，都近似服从正态分布。
  - 社会科学： 心理学测试分数（如智商）、考试成绩、某些人口学特征。
  - 经济金融： 股票价格的对数收益率（通常假定服从正态分布）、资产回报率、某些经济指标的波动。
  - 质量控制： 生产线上产品的尺寸、重量等指标的波动范围。
  - 统计推断： 许多统计方法（如假设检验、置信区间）都基于数据服从正态分布或其统计量服从正态分布的假设。
  - 机器学习： 许多算法（如线性回归、逻辑回归）在输入数据为正态分布时表现更好，或者模型误差假定服从正态分布。

#### 指数分布 {#exponential-distribution}

- 指数分布 (Exponential Distribution)
- 描述事件发生的时间间隔。
- $Exp(\lambda)$
  - 其中 $\lambda$ 是事件发生的平均速率。
- PDF: $f(x) = \lambda e^{-\lambda x}$
- $E(X)=\frac{1}{\lambda}$
- 应用场景
  - 设备寿命： 电子元件的无故障工作时间。
  - 服务等待： 顾客在银行排队等待服务的时间。
  - 电话接听： 两通电话打进来的时间间隔。

#### 伽马分布 {#gamma-distribution}

- 伽马分布 (Gamma Distribution)
- 描述等待时间的分布，特别是多个独立事件的总等待时间。
- $Gamma(k, \theta)$
  - 其中 $k$ 是形状参数，$\theta$ 是尺度参数。
  - $\theta = 1/\lambda$，其中 $\lambda$ 是速率参数。
- $Gamma(k, 1/\lambda)$
- PDF: $f(x) = \frac{x^{k-1} e^{-\frac{x}{\theta}}}{\theta^k \Gamma(k)}$
- PDF: $f(x) = \frac{\lambda^k x^{k-1} e^{-\lambda x}}{\Gamma(k)}$
  - 其中 $\Gamma(k)$ 是伽马函数。
- $E(X)=k\theta$
- 应用场景
  - 生物统计： 描述细胞分裂的时间间隔。
  - 保险精算： 描述索赔金额的分布。
  - 排队论： 描述顾客到达服务台的时间间隔。

#### 泊松分布 {#poisson-distribution}

- 泊松分布 (Poisson Distribution)
- 描述在固定时间内某事件发生的次数。
- $Poisson(\lambda)$
  - 其中 $\lambda$ 是单位时间内事件发生的平均次数。
- PMF: $P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$
- $E(X)=\lambda$
- 应用场景
  - 电话呼叫中心： 每小时接到的电话数量。
  - 交通流量： 每分钟通过某个路口的车辆数量。
  - 生物统计： 某种罕见疾病在特定人群中的发病率。
