---
title: ReLU
---

# ReLU

ReLU（Rectified Linear Unit，线性整流单元）是深度神经网络常用的逐元素激活函数：

$$
\operatorname{ReLU}(x) = \max(0, x)
$$

它在正半轴保持线性、负半轴输出零，计算简单并能产生稀疏激活。卷积网络和早期深度前馈网络广泛使用 ReLU；Transformer 的前馈层则更常见 GELU、SwiGLU 等平滑或门控变体。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 早期脉络 | 2000 年，M. W. Hahnloser 等人在神经科学启发的电路中讨论整流线性单元。 |
| 深度学习代表工作 | 2010 年，Vinod Nair 与 Geoffrey E. Hinton 在受限玻尔兹曼机中研究 ReLU；2011 年，Xavier Glorot、Antoine Bordes、Yoshua Bengio 将整流激活用于深层稀疏网络。 |
| 人物与机构 | Nair、Hinton 的工作来自多伦多大学；Glorot、Bordes、Bengio 的工作来自蒙特利尔大学 DIRO。 |
| 领域 | 神经网络、深度学习、计算机视觉。 |
| 相关变体 | Leaky ReLU、PReLU、ELU、GELU、SiLU/Swish、ReLU6、SwiGLU。 |

## 导数与训练行为

$$
\frac{d}{dx}\operatorname{ReLU}(x) =
\begin{cases}
1, & x > 0 \\
0, & x < 0
\end{cases}
$$

- $x = 0$ 处不可导；实现通常约定一个次梯度，常见取值为 $0$。
- 正半轴梯度恒为 $1$，相比 sigmoid 或 tanh 更不容易因饱和而产生梯度衰减。
- 长期落在负半轴的单元输出与梯度都为零，可能形成 dying ReLU。
- ReLU 不限制正值大小；初始化、学习率、归一化和残差结构仍影响激活尺度与训练稳定性。

## 常见变体

| 方法 | 形式或机制 | 使用动机 |
| --- | --- | --- |
| Leaky ReLU | 负半轴使用固定小斜率 $\alpha x$ | 为负输入保留梯度，缓解 dying ReLU。 |
| PReLU | 将负半轴斜率作为可学习参数 | 让网络按通道或层学习负半轴形状。 |
| ELU | 负半轴使用指数平滑函数 | 允许负输出并平滑过渡。 |
| GELU | $x\Phi(x)$，按输入大小平滑门控 | 常用于 Transformer。 |
| SiLU / Swish | $x\sigma(x)$ | 平滑、自门控激活。 |
| ReLU6 | 将输出截断到 $[0, 6]$ | 常见于面向低精度移动端的网络。 |

## 选择与实现检查

- CNN 或简单 MLP 可从 ReLU 开始；若观察到大量零激活或训练不稳定，比较 Leaky ReLU、PReLU、ELU。
- 不要把输出层激活与隐藏层激活混用：分类概率通常使用 softmax 或 sigmoid，回归输出依目标范围决定是否需要约束。
- 记录激活函数、初始化、归一化层与学习率，它们共同决定训练行为。
- 导出或量化模型时检查目标运行时是否支持所选激活及其参数语义。

## 参考

- [Rectified Linear Units Improve Restricted Boltzmann Machines](https://www.cs.toronto.edu/~hinton/absps/reluICML.pdf)
  - Nair、Hinton，ICML 2010。
- [Deep Sparse Rectifier Neural Networks](https://proceedings.mlr.press/v15/glorot11a.html)
  - Glorot、Bordes、Bengio，AISTATS 2011。
- [Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification](https://arxiv.org/abs/1502.01852)
  - He 等人，PReLU，arXiv:1502.01852。
- [Fast and Accurate Deep Network Learning by Exponential Linear Units](https://arxiv.org/abs/1511.07289)
  - Clevert、Unterthiner、Hochreiter，ELU，arXiv:1511.07289。
- [Gaussian Error Linear Units (GELUs)](https://arxiv.org/abs/1606.08415)
  - Hendrycks、Gimpel，GELU，arXiv:1606.08415。
