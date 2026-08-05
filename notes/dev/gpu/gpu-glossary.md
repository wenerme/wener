---
title: GPU Glossary
tags:
  - Glossary
---

# GPU Glossary

| abbr. | stand for                            | cn                      |
| ----- | ------------------------------------ | ----------------------- |
| CTA   | Cooperative Thread Array             | 线程块                  |
| FLOP  | Floating-Point Operation             | 浮点运算                |
| GEMM  | General Matrix Multiply              | 通用矩阵乘法            |
| GMEM  | Global Memory                        | 全局内存                |
| HBM   | High Bandwidth Memory                | 高带宽内存              |
| ILP   | Instruction-Level Parallelism        | 指令级并行              |
| MMA   | Matrix Multiply-Accumulate           | 矩阵乘加                |
| MoE   | Mixture of Experts                   | 混合专家                |
| NCU   | Nsight Compute                       | NVIDIA Compute profiler |
| RMEM  | Register Memory                      | 寄存器                  |
| SM    | Streaming Multiprocessor             | 流式多处理器            |
| SMEM  | Shared Memory                        | 共享内存                |
| TMA   | Tensor Memory Accelerator            | 张量内存加速器          |
| TMEM  | Tensor Memory                        | 张量内存                |
| WGMMA | Warpgroup Matrix Multiply-Accumulate | warpgroup 异步矩阵乘加  |

## 矩阵计算与量化

GEMM
: General Matrix Multiply
: 通用矩阵乘法
: 通常表示 `C = A × B`；实际 kernel 常把 bias、activation、quant/dequant 和 epilogue 一起融合。

Grouped GEMM
: 一次 launch 执行多个 shape 或数据地址不同的 GEMM。
: 常用于 MoE expert 的 batched forward；expert 间 token 数不均衡会直接影响 tile、padding 和 load balance。

MoE
: Mixture of Experts
: 混合专家
: router 将 token 分发给多个 expert 的模型结构。
: 每个 expert 的 routed token 数是 kernel dispatch 与 tiling 的重要输入。

W4A16
: Weight 4-bit, Activation 16-bit
: 4-bit 权重、16-bit 激活
: 通常指 INT4 weight 与 FP16/BF16 activation 的量化 GEMM。
: 必须同时说明 scale granularity、signedness、zero-point、group size 和 accumulator dtype；这些不是可省略的格式细节。

Quantization
: 用更低 bit-width 表示值，减少 storage 和 memory traffic。
: 量化格式、分组大小和反量化路径共同决定误差与性能。

Per-group quantization
: 一组元素共享一个 scale 或 zero-point 的量化方式。
: group size 越小通常误差越低，但 metadata、load 和 dequant 开销越高。

Scale
: 将 quantized integer 映射回近似 real value 的比例参数。
: scale 的 dtype、layout、load path 和使用时机都属于 kernel 设计的一部分。

Zero-point
: affine quantization 的偏移参数。
: symmetric quantization 通常没有 zero-point。

Dequantization / Dequant
: 将低 bit-width 值恢复为计算 dtype 的过程。
: 可以独立执行，也可与 load、MMA 或 epilogue 融合；性能必须按完整 instruction sequence 和数值误差比较。

Scale-on-weight
: 在 weight fragment 进入 MMA 前乘 scale，而不是在 accumulator epilogue 中再做 scale promotion。
: 可减少额外 FMA 或 accumulator state，但必须验证 register fragment layout 和数值等价性。

Gate-up / down projection
: MoE/FFN 常见的两类 linear projection。
: 它们的 M/N/K shape 常不同，不能假设同一 tiling、CTA/SM 数或 kernel 策略都适用。

## 执行层级与 Tensor Core

SM
: Streaming Multiprocessor
: 流式多处理器
: GPU 执行 CTA 的基本硬件单元。
: register、shared memory、resident warp/CTA 上限和硬件 barrier 共同限制其并发 work。

CTA / thread block
: Cooperative Thread Array
: 线程块
: CUDA 的协作执行单元；同一 CTA 的 threads 可通过 shared memory 和 barrier 协作。

Warp
: NVIDIA SIMT 的基本调度组，通常为 32 threads。

Warpgroup
: Hopper WGMMA 的协作范围，固定为 4 warps / 128 threads。

Tensor Core
: 专用矩阵乘加硬件。
: 可用数据类型、instruction shape 和 operand layout 随 GPU architecture 变化。

MMA
: Matrix Multiply-Accumulate
: 矩阵乘加
: `D = A × B + C` 的矩阵乘加操作，也指对应 Tensor Core instruction family。

`mma.sync`
: 单 warp 协作的 Tensor Core PTX instruction family。
: operand fragment 的 lane/register layout 是硬约束，不能按普通 contiguous array 假设处理。

WGMMA
: Warpgroup Matrix Multiply-Accumulate
: warpgroup 异步矩阵乘加
: Hopper 的 `wgmma.mma_async` instruction family。
: 由 warpgroup 协作，以异步 issue、`commit_group` 和 `wait_group` 驱动；accumulator 位于 registers。

WGMMA async group
: 一组由 `commit_group` 提交的 WGMMA。
: `wait_group<N>` 保留至多 N 个 in-flight group，以在 accumulator 依赖允许时重叠后续工作。

`tcgen05` MMA
: NVIDIA 对 Blackwell 第五代 Tensor Core MMA PTX instruction family 的官方命名。
: Blackwell 矩阵乘加通路
: operand、accumulator、CTA group 和 TMEM layout 必须以目标 compute capability 的 PTX ISA 为准。

Register fragment
: Tensor Core operand 或 accumulator 在各 lane register 中的固定分布。
: conversion 或 dequant 的结果必须落到 instruction 所要求的位置，而不是任意寄存器排列。

Accumulator
: 保存 MMA 中间或最终和的 storage。
: WGMMA 常使用 registers；`tcgen05` 的 accumulator 位于 TMEM。

Epilogue
: 主 GEMM loop 后对 accumulator 执行 scale、bias、activation、type conversion 或 store 的阶段。
: 把计算前移融合进 dequant 或 MMA 时，必须验证数值等价性。

RS mode
: Register–Shared memory operand mode
: 寄存器-共享内存操作数模式
: WGMMA operand A 从 registers、operand B 从 shared memory 读取；适用于 A fragment 需先在 register 中形成的路径。

SS mode
: Shared memory–Shared memory operand mode
: 共享内存-共享内存操作数模式
: WGMMA 两个 operand 都经 shared-memory descriptor 提供；是否优于 RS 取决于 load、conversion、register pressure 和 pipeline。

Swap AB
: 将数学上的 A/B 映射到 MMA instruction 的另一侧以匹配 fragment layout 或 shape。
: 会改变 tile geometry；不能在不兼容的 packed-weight layout 间随意切换。

`lop3`
: PTX 的三输入布尔逻辑指令。
: 可用 truth table 合并 bit mask、or、xor 等操作，常用于 low-bit unpack/dequant。

`prmt`
: PTX 的字节置换 instruction。
: 用于重排 register 内字节；是否优于 `lop3`、shift 或 convert 取决于完整 instruction sequence 和目标 architecture。

I2F
: integer-to-floating conversion。
: 整数转浮点
: 在 low-bit dequant 中，应与纯整数 bit-manipulation 路径一起以 SASS 和 profiler 比较。

## 存储与数据搬运

GMEM
: Global Memory
: 全局内存
: kernel 可见的 device memory；数据中心 GPU 中通常由 HBM 提供主带宽。

HBM
: High Bandwidth Memory
: 高带宽内存
: GPU 的片外高带宽内存。
: HBM utilization 高不等于一定是 HBM-bound；仍需排除 L2、TMA、dependency 和并行度限制。

L2 cache
: Level 2 cache
: 二级缓存
: 跨 SM 可共享的 on-chip cache。
: effective traffic 必须按实际 load、cache hit 和重复读取计算，不能只按 tensor logical size 推断。

SMEM
: Shared Memory
: 共享内存
: 同一 CTA threads 共享的片上可编程存储。
: capacity、bank/layout、stage 数和 per-CTA allocation 会影响 occupancy。

RMEM / registers
: Register Memory
: 寄存器
: 每 thread 私有的最快 storage。
: 高 register pressure 会降低 resident warp/CTA 数；compiler register spill 会把 thread-local value 放入 local memory。

TMEM
: Tensor Memory
: 张量内存
: Blackwell 为 tensor operation 提供的专用 on-chip memory space。
: `tcgen05` accumulator 位于 TMEM，operand A 也可按 instruction path 从 TMEM 提供。

TMA
: Tensor Memory Accelerator
: 张量内存加速器
: Hopper 引入的 bulk asynchronous copy engine。
: 可在 global memory 与 shared memory 间传输 1D 到 5D tensor，也支持 cluster 内跨 SM shared-memory transfer。

`cp.async`
: asynchronous copy
: 异步拷贝
: Ampere 起用于 global-to-shared asynchronous copy 的机制。
: 与 TMA 的适用 shape、编程模型和同步方式不同。

`mbarrier`
: 协调 asynchronous transaction arrival/completion 与 consumer wait 的 memory barrier object。
: 不是普通 warp-level `__syncthreads()` 的替代品。

Memory coalescing
: warp 内 threads 的 memory access 被聚合为较少 memory transaction 的模式。
: 地址连续、alignment 和 stride 会影响实际 traffic。

Swizzle
: 对 shared-memory layout/address 做重排。
: 用于降低 bank conflict，或匹配 Tensor Core、TMA 等路径所需的访问模式。

Transaction granularity
: 单次 copy/load 或 tensor-map transfer 的有效数据规模。
: tile 行宽、alignment、`BLOCK_K` 等会影响 producer 是否能高效供给 consumer。

Spill
: 常指 compiler 因 register 不足将 thread-local value 放入 local memory。
: 报告语境也可能指动态 M 超出 cover tile 而额外启动 M tile；两种 spill 必须区分。

## Tiling、流水与调度

Tiling
: 将 M/N/K 或 tensor dimension 分成 tile，以控制 data reuse、parallelism、register/SMEM footprint 和 instruction shape。

`BLOCK_M` / `BLOCK_N` / `BLOCK_K`
: kernel-level M/N/K tile 参数。
: 改变任一参数会同时影响 MMA count、data-movement granularity、padding、SMEM/register footprint 和 occupancy。

Padding
: 为满足 tile 或 instruction shape 而计算的无效元素。
: 小 M 或 uneven MoE routing 下，padding 可能主导 wasted work。

Cover tile / no-spill tile
: tile 足以覆盖动态实际 shape，避免尾部数据触发额外完整 K-loop 的策略。
: 需要权衡 padding 代价与额外 tile 的代价。

Pipeline stage
: 多缓冲的 load/compute phase 数。
: 增加 stage 可隐藏 latency，但会增加 SMEM/register footprint 并可能降低 occupancy。

Software pipelining
: 在不同 iteration 交错 prefetch、dequant、MMA 和 store，让独立工作重叠。
: 必须按 dependency 和实际 wall-clock 验证，不能因为某个 stall 降低就默认提速。

ILP
: Instruction-Level Parallelism
: 指令级并行
: 同一 thread/warp 中可并发推进的独立 instruction chain。
: 可用于隐藏 latency，但会增加 live range 与 register pressure。

Warp specialization
: 同一 CTA 内不同 warp/warpgroup 分担 producer、consumer 或 epilogue 角色。
: 有利于 pipeline，但会改变资源分配和同步结构。

Occupancy
: active warps 相对该 SM 最大 active warps 的比例。
: 低 occupancy 会削弱 latency hiding；更高 occupancy 不保证更高性能。

Theoretical / achieved occupancy
: 前者由 launch/resource limit 推导，后者来自运行期 activity。
: 两者差异较大时常提示 workload imbalance 或执行期限制。

Register pressure
: 每 thread live register 的需求。
: 与 SMEM、thread/block limit、barrier 等共同决定 CTA/warp residency。

CTA/SM
: 每个 SM 的 resident CTA 数。
: 它是 resource limit 的结果，不是独立优化目标；提高它可能通过 latency hiding 获益，也可能因 tile 变小、traffic 增加而变慢。

Thread Block Cluster
: Hopper 的可选执行层级。
: cluster 内 CTA 可访问 distributed shared memory，需用 cluster-aware launch/occupancy 评估。

Stream-K
: 将 K dimension 切片并在多个 CTA 间分担的策略，常用于改善 load balance。
: K 较小或 reduction overhead 高时可能为负收益。

## 性能模型与 Profiling

TFLOPS
: Tera Floating-Point Operations per Second
: 每秒万亿次浮点运算
: throughput 指标。
: 必须说明 precision、是否按 Tensor Core peak，以及 benchmark 的计时口径。

GB/s
: Gigabytes per second
: 每秒千兆字节
: bandwidth throughput 指标。
: 应区分 logical bytes、实际 DRAM bytes 和不同 memory hierarchy 的 traffic。

Arithmetic intensity
: `operations / bytes accessed`。
: 实现中的重复读取会降低实际 arithmetic intensity。

Ops:byte ratio
: GPU math throughput 与 memory bandwidth 的比值。
: 与 arithmetic intensity 比较可作为 roofline 的一阶判读。

Roofline model
: 用 compute roof 与 bandwidth roof 估计 performance upper bound。
: 前提是 parallelism 足够；仍需要 profiler 验证实际 bottleneck。

Ridge point
: arithmetic intensity 等于 hardware ops:byte ratio 的位置。
: 低于它通常更偏 memory-limited，高于它通常更偏 math-limited。

Compute-bound
: 在 parallelism 足够时，math pipeline 成为主要限制。
: tensor utilization 未达 100% 不足以单独否定该判断。

Memory-bound
: 在 parallelism 足够时，某层 memory bandwidth 或 traffic 成为主要限制。
: 必须区分 HBM、L2、SMEM 和 copy engine。

Latency-bound
: parallelism 或独立工作不足，无法隐藏 dependency/memory latency，因而 compute 与 bandwidth 都未饱和。

Nsight Compute / NCU
: NVIDIA Compute profiler
: NVIDIA Compute 内核分析器
: NVIDIA kernel profiler。
: 用于收集 speed-of-light、memory、occupancy、instruction 和 stall 等指标。

SASS
: NVIDIA GPU assembly / machine-instruction representation；没有需要在本页展开的稳定首字母全称。
: NVIDIA GPU 汇编 / 机器指令表示
: NVIDIA GPU 最终 machine instruction 表示。
: 用于核对 compiler 是否生成预期 instruction、register use 和 dependency chain。

Stall reason
: profiler 对 warp 未能 issue 的采样分类。
: 是定位线索，必须结合 instruction、dependency、resource 和对照实验解释。

`long_scoreboard`
: warp 等待较长延迟的 scoreboard dependency，常与 L1TEX 的 local/global/surface/texture operation 有关。
: 不能直接等同于 global-memory bandwidth 不足。

`barrier` stall
: warp 因同步或 producer/consumer 进度不一致而等待。
: 可能来自显式 barrier、asynchronous pipeline 或 workload imbalance。

`mio_throttle`
: warp 等待 memory I/O instruction pipeline 的可用槽位。
: 常提示相关 pipeline 利用过高，需结合具体 instruction 判断。

`not_selected`
: warp 已具备 issue 条件但 scheduler 选择了其他 warp。
: 可能反映可调度 warp 竞争，不可单独归因为 occupancy 问题。

## 参考

- [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/)
- [PTX ISA](https://docs.nvidia.com/cuda/parallel-thread-execution/)
- [NVIDIA Hopper Tuning Guide](https://docs.nvidia.com/cuda/hopper-tuning-guide/)
- [Warpgroup MMA Programming Guide](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/mma_docs/wgmma_programming.html)
- [Nsight Compute Profiling Guide](https://docs.nvidia.com/nsight-compute/ProfilingGuide/)
- [GPU Performance Background User's Guide](https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/)
