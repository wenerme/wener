---
title: tf-idf
alias:
  - tf-idf
tags:
  - NLP
  - Search
---

# tf-idf

- TF-IDF - Term Frequency–Inverse Document Frequency
- IDF - 逆向文件频率
- 过滤掉常见的词语，保留重要的词语。
- 假设
  - 一个单词出现的文本频数越小，它区别不同类别文本的能力就越大。
- 词频率
  - 单个文件 - 正比
  - 资料库 - 反比

$$
\begin{alignat*}{2}
\text{tf-idf}({\color {green} w}, d, D)
&= \text{tf}({\color {green} w},d) \cdot \text{idf}({\color {green} w},D)\\
&= \text N({\color {green} w},d) \cdot \text{log} \frac {|D|} {|\{ d \in \text D: {\color {green} w} \in \text D \}|}
\end{alignat*}
$$

- $\color{green} w$ - 单个词
- $d$ - 单个文档
- $D$ - 所有文档
- $\text{tf}(w,d) = \text N(w,d)$
  - $w$ 在 $d$ 文档中的数量
  - 词频 - term frequency
- $\text{idf}(w,D)$
  - $w$ 在整个资料库中的数量
  - IDF - 逆向文件频率
    - 数量越高，权重越低

:::tip Demo

- `科技` 这个词 在有 1000 个词的文章中出现了 **10** 次
  - TF=1000/10=0.01
- `科技` 这个词在所有的 **100** 篇文章中有 **10** 篇文章包含了
  - IDF=log10(100/10)=1
- TF-IDF=0.01\*1=0.01

:::
