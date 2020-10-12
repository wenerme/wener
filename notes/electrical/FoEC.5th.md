# 电路基础 - 第五版

所有学习电路基础(Foundation of Electric Circuit 5th ed)的笔记. :P

> 由于 Github 不能显示公式, 可在 [Stackedit](https://stackedit.io/viewer#!url=https://raw.githubusercontent.com/wenerme/wener/master/tricks/eletrical/FoEC.5th.md) 阅读该笔记.

## 笔记

> An electric circuit is an interconnection of electrical elements.

----

* [国际单位制](https://zh.wikipedia.org/wiki/国际单位制)
* [国际单位制导出单位](https://zh.wikipedia.org/wiki/国际单位制导出单位)
* [国际单位制词头](https://zh.wikipedia.org/wiki/国际单位制词头)

六个基础 SI(International System of Units) 定义单位

量 | 基础单位 | 符号
----|----|----|----
Length/长度 | meter | m
Mass/重量 | kilogram | kg
Time/时间 | second | s
Electric current/电流 | ampere/安倍/安 | A
Thermodynamic temperature/热度 | kelvin/开尔文/开 | K
Luminous intensity/发光强度 | candela/坎德拉/坎 | cd
Charge/电量/电荷 | coulomb/库仑 | C

__单位前缀__

Multiplier | 前缀 | 符号
----|----|----
10<sup>18| exa | E
10<sup>15| peta | P
10<sup>12| tera | T
10<sup>9 | giga | G
10<sup>6 | mega | M
10<sup>3 | kilo | k
10<sup>2 | hecto | h
10<sup>1 | deka | da
10<sup>-1| deci | d
10<sup>-2| centi | c
10<sup>-3| milli | m
10<sup>-6| micro| μ
10<sup>-9| nano | n
10<sup>-12| pico | p
10<sup>-15| femto | f
10<sup>-18 | atto | a


----

> Charge is an electrical property of the atomic particles of which matter
consists, measured in coulombs (C).

一个原子有电子,质子和中子组成.电子携带电荷 $e = 1.602 \times 10^{-19} C$, 电子电荷为负点.质子携带等量的正电.等量的电子和质子使原子电荷处于中和状态.

1. 库伦是一个较大的电量单位.1 C 电量为 $1/(1.602 \times 10^{-19}) =  6.24\times 10^{18}$, 在实际中大多使用 pC, nC 或 μC.
2. 根据试验观察,自然中发生的电荷均为电子电荷 $e = -1.602 \times 10^{-19}$ 的整数倍
3. 电荷守恒定义说明,电荷不能被创建和摧毁,只能被传输.因此一个系统的电子电荷总量不会改变.

当导线(由原子组成)连接到电池两端(电动势/electromotive force 来源),正电荷往一个方向移动,负电荷往相反方向移动,这样就形成了电流.


> Electric current is the time rate of change of charge, measured in
amperes (A).

电流 $i$, 电荷 $q$, 时间 $t$
$$
i_{ = }^{ \triangle  }{ \frac { dq }{ dt }  }
$$

$$
1 ampere  1 coulomb/second
$$

> A direct current (dc) is a current that remains constant with time.
> An alternating current (ac) is a current that varies sinusoidally with time

使用 $I$ 表示恒量电流, $i$ 表示变量电流.


__练习 1.1__

Ex 1.1: How much charge is represented by 4,600 electrons?

```
4600 C * e
```
= 4600 * 1.602*10<sup>-19</sup>
= 7369.2*10<sup>-19</sup>
= 7.3692*10<sup>-16</sup> C
= 73.692 fC

Practice 1.1: Calculate the amount of charge represented by six million protons.

```
6MC * e
```
=6 * 1.602*10<sup>-13</sup>
=9.612*10<sup>-12</sup> C
=9.612 pC

Ex 1.2: The total charge entering a terminal is given by $q=5t sin{4 \pi} t$ mC.
Calculate the current at $t=0.5s$.

i=dq/dt
=(d/dt)(5tsin4Pit)mC/s

sin4 = 4 sum cos4Pidt

=5 t sin4 Pi t + 20Pi t cos 4 Pi t mA



Practice 1.2: If in Example 1.2, find the current at s.


----

两点之间的外部电动势(external electromotive force - emf) 也表示为 voltage 或 potential difference.电路上两点之间的电压 $v_{ab}$ 表示从 a 移动一个电荷到 b 需要的能量(或工作).

符号|单位|含义
----|----|----
p| W/watts| 电功率
w| J/joules| 能量
t| s/seconds| 时间
v| v/volt| 电压

$$
v_{ab} {_{ = }^{ \triangle  }} { \frac { dw }{ dq }  }
$$

```
1 volt  1 joule/coulomb  1 newton-meter/coulomb
```

$$
v_{ab} = -v_{ba}
$$

> Voltage (or potential difference) is the energy required to move a unit
charge through an element, measured in volts (V).

$V$ 表示恒量电压, $v$ 表示变量电压.恒量电压一般由电池提供,变量电压一般是发电器.


----


> Power is the time rate of expending or absorbing energy, measured in
watts (W).

符号|单位|含义
----|----|----
p| W/watts| 电功率
w| J/joules| 能量
t| s/seconds| 时间

$$
p {_{ = }^{ \triangle  }} { \frac { dw }{ dt }  }
$$

$$
p= \frac{dw}{dt} = \frac{dw}{dq} \cdot \frac{dq}{dt} = vi
$$


$$
p=vi
$$

> Passive sign convention is satisfied when the current enters through
the positive terminal of an element and `p=+vi`. If the current enters
through the negative terminal, `p=-vi`.

因为能量守恒定义,总电量实际为 0

$$
\sum p = 0
$$

一个原件从 t0 到 t 消耗或提供的电量为

$$
w = \int _{ t_0 }^{ t }{ p dt } = \int _{ t_0 }^{ t }{ vi dt }
$$

> Energy is the capacity to do work, measured in joules (J).

$$
1 Wh = 3600 J
$$

Ex 1.4 An energy source forces a constant current of 2 A for 10 s to flow
through a light bulb. If 2.3 kJ is given off in the form of light and heat
energy, calculate the voltage drop across the bulb.

----

> An ideal independent source is an active element that provides a
specified voltage or current that is completely independent of other
circuit elements.

> An ideal dependent (or controlled) source is an active element in
which the source quantity is controlled by another voltage or current.

four possible types of dependent sources

1. A voltage-controlled voltage source (VCVS).
2. A current-controlled voltage source (CCVS).
3. A voltage-controlled current source (VCCS).
4. A current-controlled current source (CCCS).

[电子原件](https://zh.wikipedia.org/wiki/电子原件)分为

* 被动元件（Passive components）
	是一种电子元件，在使用时它们没有任何的增益或方向性。[1]在电路分析（Network analysis）时，它们被称为电力元件（Electrical elements）。
* 主动元件（Active components）
  是一种电子元件，相对于被动元件所没有的，在使用时它们有增益或方向性。它们包括了半导体器件与真空管。

----

$$
R=\rho \frac{\ell }{A}
$$

$\rho$ 为物质抗阻性,单位为欧姆每米.

R 为电阻阻值,电阻是最简单的 passive element.




材质  | 抗阻率($\Omega \cdot m$) | Usage
----|----|----
Silver/银   | 1.64 x 10<sup>8 | Conductor/导线     |
Copper/铜   | 1.72 x 10<sup>8 | Conductor     |
Aluminum/铝 | 2.8  x 10<sup>8  | Conductor     |
Gold/金     | 2.45 x 10<sup>8 | Conductor     |
Carbon/碳   | 4    x 10<sup>5    | Semiconductor/半导体 |
Germanium/锗| 47   x 10<sup>2   | Semiconductor |
Silicon/硅  | 6.4  x 10<sup>2   | Semiconductor |
Paper/纸    | 10<sup>10| Insulator\绝缘体
Mica/云母     | 5 x 10<sup>11|Insulator
Glass/玻璃    | 10<sup>12|Insulator
Teflon/聚四氟乙烯   | 3 x 10<sup>12| Insulator


> Ohm’s law states that the voltage v across a resistor is directly proportional
to the current i flowing through the resistor.

$$
v\propto i
$$
欧姆定律定义 R 为常量电阻.因为电阻阻值可能受内部或外部环境改变.

$$
v=iR
$$

> The resistance R of an element denotes its ability to resist the flow of
electric current; it is measured in ohms ( $\Omega$ ).

$$
R=\frac{v}{i}
$$
$$
1 \Omega = 1 V/A
$$

以上公式需要保证电流和电压是同向的,如果电流为相反,则为 `-i`.

由于电阻可以是从0到无限大,因此,对于一个小电路而言

$$
v  = iR = 0
$$

电压为0,电流为任意,因此在实际中一个小的电路中认为导线是完美的,没有电阻率.

> A short circuit is a circuit element with resistance approaching zero.
> 短电路电路原件电阻趋于零.

原件 $R=\infty $ 成为开合电路(open circuit).

$$
i=\lim _{ R  \rightarrow \infty } \frac v R = 0
$$

即电流为0,电压为任意值.

> An open circuit is a circuit element with resistance approaching infinity.

遵循欧姆定律的电阻成为线性电阻,非线性电阻的 `v-i` 图是非线性的.所有的电阻在特定环境下都是非线性的,但是实际使用时都假设为是线性电阻.


$$
G=\frac 1 R=\frac i v
$$

原件电导(conductance)用于衡量电流导性,单位为 mho, 反过来的 ohm, IS 单位为 S(siemens)

$$
1 S = 1 \mho = 1 A/V
$$

> __Conductance__ is the ability of an element to conduct electric current;
it is measured in mhos ($\mho$ ) or siemens (S).

同样的电阻率可以表示为欧姆和西门子. 10$\Omega$ = 0.1 $\mho$ = 0.1 S

$$
i = Gv
$$

$$
p=vi=i^2R=\frac {v^2} R
$$

$$
p=vi=v^2G=\frac {i^2} G
$$

上述两个公式需要注意

1. The power dissipated in a resistor is a nonlinear function of either
current or voltage.
2. Since R and G are positive quantities, the power dissipated in a
resistor is always positive. Thus, a resistor always absorbs power
from the circuit. This confirms the idea that a resistor is a passive
element, incapable of generating energy.


----


> A __branch__ represents a single element such as a voltage source or a
resistor.

> A __node__ is the point of connection between two or more branches.

> A __loop__ is any closed path in a circuit.

$$
b = l + n - 1
$$

>Two or more elements are in __series__ if they exclusively share a single node and consequently carry the same current.
> Two or more elements are in __parallel__ if they are connected to the same two nodes and consequently have the same voltage across them.


----

> Kirchhoff’s current law (KCL) states that the algebraic sum of currents entering a node (or a closed boundary) is zero.

where N is the number of branches connected to the node and is
the nth current entering (or leaving) the node.

N 个连接到节点的分支, in 为第 n 个元件进入或离开该节点的电流.

$$
\sum_{i=0}^{N} i_n = 0
$$

KCL 和 欧姆定律是电路基础理论.

> The sum of the currents entering a node is equal to the sum of the currents leaving the node.

> Kirchhoff’s voltage law (KVL) states that the algebraic sum of all voltages around a closed path (or loop) is zero.

M 循环中的电压数
$$
\sum_{v=0}^{M} v_m = 0
$$

> Sum of voltage drops  Sum of voltage rises

----

> The __equivalent resistance__ of any number of resistors connected in series is the sum of the individual resistances.

$$
R_{eq} = R_1 + R_2 + R_3 + \cdots + R_N = \sum_{n=1}^N R_n
$$

## 资源
* [wolframalpha](http://www.wolframalpha.com/) LaTeX 语法计算器


resistors, capacitors, and inductors.generators, batteries, and operational amplifiers
