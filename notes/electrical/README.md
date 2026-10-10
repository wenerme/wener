---
title: 电学与电气工程
---

# Electrical

- Electrical Engineering / 电气工程 - 研究电、电磁现象，以及利用这些现象传递能量、处理信息的器件、电路与系统
- Electronics / 电子学 - 侧重电子器件与电子电路，是广义电气工程中的重要方向
- 电气工程的范围包括电力、电机，也包括电子、信号、通信与控制；不同学校与行业的分类侧重点有所不同

- [术语](./electrical-glossary.md)
- [电路基础第五版笔记](./FoEC.5th.md)
- [万用表](./multimeter.md)
- [PCB 设计](../embedded/pcb.md)

## 基础概念

- 电学量 - 电荷、电流、电压、电阻、功率与能量；单位、量纲与正方向
- 基本元件 - 电阻、电容、电感、独立源、受控源与开关
- 元件模型 - 理想与非理想、线性与非线性、集总参数与分布参数
- 基本定律 - 欧姆定律、基尔霍夫电流定律与电压定律、电荷守恒与能量守恒
- 分析方法 - 节点电压法、网孔电流法、叠加、戴维南与诺顿等效
- 信号与状态 - 直流与交流、稳态与暂态、时域与频域

## 内容范围

下表按常见研究与工程方向整理，各方向相互交叉。例如开关电源涉及电路、电子器件、电力电子与控制，通信设备同时涉及电磁学、信号处理和电子电路。

| 方向 | 英文 | 主要内容 |
| --- | --- | --- |
| 电路理论 | Circuit Theory | 网络等效、动态响应、频率响应、电路建模与仿真 |
| 电子学 | Electronics | 半导体器件、模拟与数字电路、放大器、集成电路 |
| 电磁学 | Electromagnetics | 电场、磁场、电磁感应、电磁波、传输线与天线 |
| 电力与能源 | Power and Energy Systems | 发电、输配电、电网、变压器、储能与能源管理 |
| 电机与驱动 | Electrical Machines and Drives | 电动机、发电机、机电能量转换、调速与驱动 |
| 电力电子 | Power Electronics | 整流、逆变、DC–DC 转换、开关电源与功率器件 |
| 信号与系统 | Signals and Systems | 系统建模、采样、滤波、数字信号处理 |
| 通信 | Communications | 调制解调、信息传输、射频与无线系统 |
| 控制 | Control Systems | 反馈、稳定性、系统辨识与控制器设计 |
| 测量与仪器 | Measurement and Instrumentation | 传感器、信号调理、仪器仪表、数据采集与校准 |

- 延伸方向 - 微电子、光电子、声学、生物医学工程、遥感等
- 分类参考 [Illinois ECE 学科方向](https://ece.illinois.edu/academics/ugrad/subdisciplines)，不限定为某一专业的课程目录

## Circuit

- [Circuit / 电路](./circuit.md) - 元件及其连接形成的系统，研究其电压、电流、能量与信号关系
- Schematic / 原理图 - 用符号和连线表达电气连接，通常不反映实际器件位置与走线形状
- PCB / Printed Circuit Board / 印刷电路板 - 以焊盘、走线、过孔等承载器件并实现连接的一种物理形式
- EDA / Electronic Design Automation / 电子设计自动化 - 辅助建模、设计、仿真、检查与生成制造资料的工具和方法
  - KiCad 是支持原理图、仿真与 PCB 设计的 EDA 工具
- 电路是设计对象，原理图是表达方式，PCB 是实现形式，EDA 是设计工具与方法；它们属于不同层面
- 板级电子设计通常包括电路设计、原理图、PCB 布局布线、制造装配与测量验证；仿真和规则检查贯穿相应阶段

## Awesome

- [kitspace/awesome-electronics](https://github.com/kitspace/awesome-electronics)
  - 电子工程与电子制作的学习资源、工具和项目索引
  - [HN](https://news.ycombinator.com/item?id=13507122)
- [lvandeve/logicemu](https://github.com/lvandeve/logicemu)
  - MIT, JavaScript
  - 在浏览器中运行的逻辑电路模拟器

## 参考

- [Electrical Engineering 学科方向 - Illinois ECE](https://ece.illinois.edu/academics/ugrad/subdisciplines)
- [Circuits and Electronics - MIT OpenCourseWare](https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/)
- [KiCad Introduction](https://docs.kicad.org/master/en/introduction/introduction.html)
