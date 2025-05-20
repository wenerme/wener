---
title: Nvidia
tags:
  - AI
---

# Nvidia

- [List of Nvidia graphics processing units](https://en.wikipedia.org/wiki/List_of_Nvidia_graphics_processing_units)
- Tesla A100
  - 2020-05-14

| abbr. | stand for                           | meaning          |
| ----- | ----------------------------------- | ---------------- |
| CC    | Compute Capability                  | 计算能力         |
| CUDA  | Compute Unified Device Architecture | 统一计算设备架构 |
| FP    | Floating Point                      | 浮点数           |
| GPCs  | Graphics Processing Cluster         | 图形处理集群     |
| ISA   | Instruction Set Architecture        | 指令集架构       |
| ROPs  | Raster Operation Pipeline           | 光栅操作管线     |
| RT    | Ray Tracing                         | 光线追踪         |
| SMs   | Streaming Multiprocessor            | 流多处理器       |
| TMUs  | Texture Mapping Unit                | 纹理映射单元     |

- CC - Compute Capability - 计算能力
  - GPU 架构的版本号
  - 由两部分组成：主版本号和次版本号
    - 主版本号表示 GPU 架构的主要版本
    - 次版本号表示该架构的次要更新或修复
  - 例如，CC 6.1 表示主版本号为 6，次版本号为 1

## Arch

> microarchitecture

Pascal (2016) > Volta (2017) > Turing (2018) > Ampere (2020) > Hopper (2022) >= Ada Lovelace (2022)

| year    | code         | Consumer               | Workstation               | Server/DC                      |      CC |
| :------ | :----------- | ---------------------- | ------------------------- | ------------------------------ | ------: |
| 2016    | Pascal       | GeForce GTX 10         | Quadro P                  | Tesla P4, P100, P40            | 6.0,6.1 |
| 2017    | Volta        |                        | Quadro GV100, Titan V     | Tesla V100                     |     7.0 |
| 2018    | Turing       | GeForce GTX 16, RTX 20 | Quadro RTX                | Tesla T4                       |     7.5 |
| 2020    | Ampere       | GeForce RTX 30         | NVIDIA RTX A              | NVIDIA A100, A40, A30, A10, A2 | 8.0,8.6 |
| 2022.09 | Hopper       |                        |                           | NVIDIA H100， H200             |     9.0 |
| 2022.12 | Ada Lovelace | GeForce RTX 40         | NVIDIA RTX Ada Generation | NVIDIA L4, L40, L40S           |     8.9 |
| 2024    | Blackwell    | GeForce RTX 50         | NVIDIA RTX PRO            | NVIDIA B100, B200, GB200       |     9.0 |
| 2026    | Rubin        |                        |                           |                                |

- 市场
  - 消费级/桌面
  - 专业级/工作站
  - 数据中心/服务器
- 产品层级划分 (Tiering)
- 品牌系列
  - GeForce 面向游戏玩家
  - Quadro 面向专业用户
  - Tesla 面向数据中心，CUDA
    - 2020 年后淡化 Tesla 品牌
    - GPGPU 成为主流
    - 避免和 Tesla 汽车混淆
- Pascal - 2016
- Volta - 2017, professional
  - 核心 80SM, 32 FP64+ 63 Int32 + 64 FP32 + 8 Tensor Cores/SM
  - 特点 NVLink 2.0, 第一代 Tensor Cores
  - 制程 12nm, 21.1B 亿个晶体管
  - 产品 V1000TiTan V
- Turning - 2018, consumer
  - 核心 102核心,92SM, 64 FP32 + 64 INT32 + 8 Tensor Cores/SM
  - 特点 Tensor Core 2.0, 第一代 RT Core
  - 制程 12nm, 18.6B 亿个晶体管
  - 产品 T4, 2080Ti, RTX 5000
- Ampere - 2020
  - 核心 108 SM, 64 FP32 + 64 INT32 + 4 Tensor Cores/SM
  - 特点 Tensor Core 3.0, RT Core 2.0, NVLink 3.0, MIG 1.0
  - 制程 7nm, 28.3B 亿个晶体管
  - 产品
    - A100, A800, A30
    - 桌面 GeForce RTX 30 series
    - 专业级/工作站 RTX A series
    - 服务器/数据中心 A100
- Hopper - 2022, datacenter
  - 核心 132 SM, 128 FP32 + 64 INT32 + 64 FP64 + 4 Tensor Cores/SM
  - 特点 Tensor Core 4.0, NVLink 4.0, MIG 2.0
  - 制程 4nm, 80B 亿个晶体管
  - 产品
    - Tesla H 系列
    - H100, H800
- Ada Lovelace - 2022, consumer, professional
  - 产品
    - 桌面 GeForce RTX 40 系列
    - 工作站/专业级 RTX Ada Generation
    - 服务器/数据中心 Tesla Ada (L4x)
- Blackwell - 2024
- Rubin - 2026

## Product Series

- consumer - 消费级
  - Desktop - 桌面 - GeForce RTX 30
  - Professional/workstation - 专业级/工作站 - RTX A/Ada
  - Server/datacenter - 服务器/数据中心 - A100
- datacenter - 数据中心 - Tesla H

---

- 更专业的设备支持更多的精度
  - CUDA - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16
  - Tensor - FP16 FP32 FP64 INT1 INT4 INT8 TF32 BF16
  - FP32 - Tensor 都没有，CUDA 都有

## CUDA

- CUDA（Compute Unified Device Architecture）
- https://en.wikipedia.org/wiki/CUDA

| ver       | date | notes                        |
| --------- | ---- | ---------------------------- |
| CUDA 13.x |      | 弃用 Maxwell、Pascal、 Volta |
