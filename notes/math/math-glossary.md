---
tags:
  - Glossary
---

# Math Glossary

| abbr. | stand for               | cn             |
| ----- | ----------------------- | -------------- |
| CAS   | Computer Algebra System | 计算机代数系统 |

| en                    | cn       |
| --------------------- | -------- |
| symbolic computing    | 符号计算 |
| symbolic manipulation | 符号操作 |
| Numerical Computation | 数值计算 |

## 符号计算 {#symbolic-computation}

- Symbolic Computation
- 与 数值计算/Numerical Computation 相对
- 对数学表达式中的符号进行操作，而不是直接求出数值结果。
- 是一种基于符号和变量的数学计算方式。
- 符号计算可以保持表达式的精确性，不涉及近似值计算。
- 主要内容
  - 表达式简化
  - 代数方程求解
  - 符号微分和积分
  - 多项式展开
  - 代数运算和化简
  - 符号矩阵运算
- 实现工具
  - Mathematica, Maple
  - SymPy
  - Mathlab Symbolic Math Toolbox
  - SageMath
  - Maxima

## 数值计算 {#numerical-computation}

- Numerical Computation
- 与 符号计算/Symbolic Computation 相对
- 对数学表达式进行数值上的计算，得出具体的数值结果。
- 是一种基于数值近似的计算方式。
- 数值计算通常用于需要快速得出结果或无法通过符号方式得到解析解的情况。
- 主要内容
  - 数值求解
    - 用于解方程或方程组的数值解，例如用数值方法解非线性方程。
  - 数值微分和积分
    - 使用数值方法进行微分和积分计算，例如梯形法求积分或差分法求导数。
  - 线性代数运算
    - 包括矩阵运算、线性方程组求解、特征值分解等。
  - 优化问题求解
    - 求最优解或最小化/最大化问题的数值解，例如梯度下降法。
  - 数据拟合
    - 根据已有数据求出拟合函数，例如最小二乘拟合。
- 实现工具
  - MATLAB
  - NumPy/SciPy（Python）
  - GNU Octave
  - R
  - Julia
  - Wolfram Mathematica

## 残差 {#residual}

- 残差 Residual
  - 真实值 (Observed Value) 与 预测值 (Predicted Value) 之间的差值
  - 残差 = 真实 - 预测
    - 代表了你的预测“错得有多离谱”。
  - 统计学 (Statistics)
    - 回归分析 (Regression Analysis) 的核心
    - 衡量模型拟合优度 (Goodness of Fit) 的基础
      - 所有常用的评估指标，如均方误差（Mean Squared Error, MSE），都是基于残差计算的。
  - 数值分析 (Numerical Analysis)
- 评估模型好坏: 一个模型所有预测的残差越小，说明模型越精准。训练模型的过程，在很多情况下就是想办法让总体的残差尽可能小。
- 残差网络 (ResNet)

## 奇异值分解 {#svd}

- 奇异值分解 - SVD / Singular Value Decomposition
  - 任何一个复杂的矩阵，都可以被拆解成三个更简单、更有代表性的“基础矩阵”的乘积。
  - A = U · Σ · Vᵀ
- 线性代数 (Linear Algebra)
