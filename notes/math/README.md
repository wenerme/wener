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
