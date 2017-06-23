# Master Machine Learning Algorithms

* 参考
  * Artificial Intelligence: A Modern Approach
* 维基百科
  * [Machine learning](https://en.wikipedia.org/wiki/Machine_learning)


## 基础

### 带参和无参机器学习

#### 参数化机器学习
* [Parametric statistics](https://en.wikipedia.org/wiki/Parametric_statistics)

A learning model that summarizes data with a set of parameters of  fixed size (independent of the number of training examples) is called a parametric model. No matter how much data you throw at a parametric model, it won't change its mind about how many parameters it needs.

将数据概括为一组固定数量的参数的线性模型成为参数化模型. 不管你给参数化模型多少数据, 都不会改变他需要多少参数的核心.

例如在线性回归中, 最主要的目的就是要把参数 B0,B1,B2 的值通过已有的数据集,学习出来.
$$$
B0 + B1 \times X1 + B2 \times X2 = 0
$$$

常见的参数化算法包括

* [逻辑回归](https://zh.wikipedia.org/wiki/逻辑回归)
* [线性判别分析](https://zh.wikipedia.org/wiki/线性判别分析) - LDA - Linear Discriminant Analysis
* [感知器](https://zh.wikipedia.org/wiki/感知器) - Perceptron

参数化学习的好处

* 简单: 方法和结果容易理解
* 速度: 参数化模型能够快速的从数据中学习
* 较少的数据: 不需要太多的数据进行训练,即便是数据不是很完美也能够很好的工作

参数化学习的限制

* 受限制: 通过选择一个函数形式的方法本身就被限制成了特殊的形式
* 复杂度有限: 这类的方法更适合处理简单的问题
* 不匹配: 在实际中, 这类方法往往不能匹配底层的函数

#### 无参数化机器学习
* [Nonparametric statistics](https://en.wikipedia.org/wiki/Nonparametric_statistics)

Nonparametric methods are good when you have a lot of data and no prior knowledge, and when you don't want to worry too much about choosing just the right features.

当你有大量的数据, 并且没有对数据有预先的了解, 你也并不想为为选择合适的特性而操心, 无参数的方法非常适合你.

常见算法包括

* 决策树
  * 例如 CART, C4.5
* Naive Bayes
* 支持向量机 - SVM - Support Vector Machines
* 神经网络 -  Neural Networks

无参数化机器学习的好处

* 灵活: 能够匹配大量的函数形式
* 强大: 对底层的方法没有预先的假设
* 性能: 可以生成高效的预测模型

限制

* 更多的数据: 需要更多的数据来训练映射的函数
* 更慢: 因为有更多的参数进行训练
* 过拟合: 可能训练出来的数据只适合训练的数据集, 并且无法解释为什么出现这样的预测结果.

### 监督学习和非监督学习

#### 监督学习

所有数据都有标注


* 可对监督学习进行分类
  * 分类问题: 输出为一个分类, 例如 红或蓝
  * 回归问题: 输出为一个实数, 例如 金额,重量
  * 常见处理的问题包括推荐和时间序列预测

* 算法
  * 线性回归,处理回归问题
  * 随机森林, 处理分类和回归
  * SVM,处理分类问题

#### 无监督学习
所有数据都没有标注, 需要发现数据中的潜在结构

* 分类
  * 族群 - Clustering: 发现数据中的潜在分组, 例如通过顾客的购买行为对顾客进行分组
  * 关联: 发现潜在的关联规则, 例如买了 A 的用户也会倾向于买 B

* 算法
  * k-means, 处理族群问题
  * Apriori algorithm, 处理关联规则学习问题

#### 半监督学习
数据集中只有部分数据被标注.

此时两种方法都可以使用.

### 偏差方差权衡 - Bias–variance tradeoff
* [Bias-variance tradeoff](https://en.wikipedia.org/wiki/Bias-variance_tradeoff)
* [机器学习中的Bias(偏差)，Error(误差)，和Variance(方差)](https://www.zhihu.com/question/27068705)

分类

* Bias Error - 偏差
* Variance Error - 方差
* Irreducible Error
  * 不可避免的错误, 从一开始便介入, 无论用什么算法都无法避免

#### 偏差 - Bias Error
偏差是简化模型做出的简单假设.
一般来说参数化的算法会有较高的偏置,以使其快速学习和易于理解, 通常来说也没那么灵活. 因此在预测复杂问题的时候效果会很差.

* 低偏差: 对目标函数做更少的假设
  * 决策树
  * KNN
  * SVM
* 高偏差: 对模板函数最更多的假设
  * 线性回归
  * 线性判别分析
  * 逻辑回归

#### 方差 - Variance Error
是对目标函数对不同数据会产生变化的预估.目标函数是从训练数据集训练出来的结果, 那么也对实际预测的数据有同样的假设. 理想情况下, 当使用不同数据时结果不会产生太大变化, 则说明算法能很好的映射出底层关系, 有较小的方差.

* 低方差: 当改变数据集时, 预估结果只产生很小的变化
* 高方差: 当数据集改变时, 预估结果产生较大变化

#### 偏差方差权衡
所有监督学习算法的目标都是达到低偏差低方差.

* 参数化或线性机器学习太长会有 高偏差和低方差
* 非参数化学习或非线性机器学习 低偏差和高方差

一般机器学习算法会在这两者之间权衡, 并能进行一定配置做一定的调整

* kNN 低偏差高方差, 但可以增加 k 以增加偏差
* SVM 低偏差高方差, 增加 C 参数(影响边距)以增加偏差减少方差

偏差和方差都是互斥的

* 增加偏差减少方差
* 增加方差减少偏差

在实际操作中是可以对这两个做一定调整以尝试对你的问题的解决能力.在现实中偏差和方差都是不可能计算出来的, 因为我们不知道底层的目标函数.

### 过拟合和低拟合


## FAQ

### 如果选择一个采样方法
新数据选择 k-fold 交叉验证, 配置好的 k-fold 能比其他算法给出更高效的估算. 但数据量大后可能会很耗时.

train-test 是使用的最多的方法, 简单易于理解和实现, 能够快速的对算法给出估算的性能.但对于新数据, train-test 可能会有较多噪音或者不理想的估算结果, 但如果你有大量的数据,那么这也不是问题.

如果你有大量的数据, 并且划分后的统计属性都差不多, 那么则建议选用 train-test.





<!--  -->
