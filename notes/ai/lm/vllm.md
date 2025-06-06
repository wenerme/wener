---
tags:
  - Server
---

# vllm

- [vllm-project/vllm](https://github.com/vllm-project/vllm)
  - Apache-2.0, Python, CUDA, Linux

:::caution

- 不支持 macOS [vllm-project/vllm#1441](https://github.com/vllm-project/vllm/issues/1441)
  - docker x86 跑可以, 但是性能差

:::

```bash
# --shm-size or --ipc=host
docker run --rm -it \
  --runtime nvidia --gpus all \
  -p 8000:8000 \
  --ipc=host \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  --entrypoint bash \
  --name vllm vllm/vllm-openai:v0.8.5

# 目前默认开启
export VLLM_USE_V1=1
vllm serve

vllm -v

curl -v https://huggingface.co                       # 确保 HF 访问正常
huggingface-cli download Qwen/Qwen2.5-VL-7B-Instruct # 手动下载

vllm serve Qwen/Qwen2.5-VL-7B-Instruct --dtype auto --api-key token-abc123
vllm serve NousResearch/Meta-Llama-3-8B-Instruct --dtype auto --api-key token-abc123


curl http://localhost:8000/v1/models
curl http://localhost:8000/v1/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "Qwen/Qwen2.5-7B-Instruct-GPTQ-Int4",
        "prompt": "Today is",
        "max_tokens": 100,
        "temperature": 0
    }'

curl http://localhost:8000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "Qwen/Qwen2.5-7B-Instruct-GPTQ-Int4",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"}
        ]
    }'

docker run --rm -it \
  --runtime nvidia --gpus all \
  -p 8000:8000 \
  --ipc=host \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  --entrypoint bash \
  --name vllm vllm/vllm-openai:v0.8.5 \
  --model Qwen/Qwen2.5-7B-Instruct-GPTQ-Int4 \
  --enable-sleep-mode \
  --dtype float16
```

- 参考
  - https://docs.vllm.ai/en/v0.8.5/serving/engine_args.html

```py
from vllm import LLM

llm = LLM(
    "Qwen/Qwen2.5-VL-7B-Instruct",
    max_num_seqs=1, # 1+
    gpu_memory_utilization=0.9, # 0.9 - 0.95
    max_model_len=4096,
    max_num_batched_tokens=4096,
    mm_processor_kwargs={
        "min_pixels": 56 * 56,
        "max_pixels": 1024 * 1024,
    },
)
```

| env                                     | default                    | desc                                                                                                                                                                                                                                                              |
| --------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| VLLM_TARGET_DEVICE                      | `cuda`                     | vLLM 的目标设备，支持 `[cuda (默认), rocm, neuron, cpu]`                                                                                                                                                                                                          |
| MAX_JOBS                                | `None` (CPU 数量)          | 最大并行编译作业数。默认情况下是 CPU 数量。                                                                                                                                                                                                                       |
| NVCC_THREADS                            | `None` (1)                 | 用于 nvcc 的线程数。默认为 1。如果设置，`MAX_JOBS` 将被减少以避免 CPU 过度占用。                                                                                                                                                                                  |
| VLLM_USE_PRECOMPILED                    | `False`                    | 如果设置，vLLM 将使用预编译的二进制文件（\*.so）。                                                                                                                                                                                                                |
| VLLM_TEST_USE_PRECOMPILED_NIGHTLY_WHEEL | `0`                        | 是否强制在 Python 构建中使用 nightly wheel。这用于在 Python 构建中测试 nightly wheel。                                                                                                                                                                            |
| CMAKE_BUILD_TYPE                        | `Debug` / `RelWithDebInfo` | CMake 构建类型。如果未设置，默认为 "Debug" 或 "RelWithDebInfo"。可用选项："Debug", "Release", "RelWithDebInfo"。                                                                                                                                                  |
| VERBOSE                                 | `0`                        | 如果设置，vLLM 在安装期间将打印详细日志。                                                                                                                                                                                                                         |
| VLLM_CONFIG_ROOT                        | `~/.config/vllm`           | vLLM 配置文件根目录。除非设置了 `XDG_CONFIG_HOME`，否则默认为 `~/.config/vllm`。请注意，这不仅影响 vLLM 在运行时查找其配置文件的方式，还影响 vLLM 在 **安装** 期间安装其配置文件的方式。                                                                          |
| VLLM_CACHE_ROOT                         | `~/.cache/vllm`            | vLLM 缓存文件根目录。除非设置了 `XDG_CACHE_HOME`，否则默认为 `~/.cache/vllm`。                                                                                                                                                                                    |
| VLLM_HOST_IP                            | `""`                       | 在分布式环境中用于确定当前节点的 IP 地址，当节点有多个网络接口时。如果您使用多节点推理，应在每个节点上进行不同设置。                                                                                                                                              |
| VLLM_PORT                               | `None` (0)                 | 在分布式环境中用于手动设置通信端口。注意：如果设置了 `VLLM_PORT`，并且某些代码需要多个端口，`VLLM_PORT` 将用作第一个端口，其余端口将通过递增 `VLLM_PORT` 值生成。'0' 用于使 mypy 满意。                                                                           |
| VLLM_RPC_BASE_PATH                      | 系统的临时目录             | 当前端 API 服务器以多进程模式运行时，用于与后端引擎进程通信的 IPC 路径。                                                                                                                                                                                          |
| VLLM_USE_MODELSCOPE                     | `False`                    | 如果为 true，将从 ModelScope 而非 Hugging Face Hub 加载模型。请注意，值为 true 或 false，而不是数字。                                                                                                                                                             |
| VLLM_RINGBUFFER_WARNING_INTERVAL        | `60`                       | 当环形缓冲区满时，记录警告消息的间隔时间（秒）。                                                                                                                                                                                                                  |
| CUDA_HOME                               | `None`                     | cudatoolkit 主目录的路径，该目录下应包含 bin, include 和 lib 目录。                                                                                                                                                                                               |
| VLLM_NCCL_SO_PATH                       | `None`                     | NCCL 库文件的路径。需要它是因为 PyTorch 带来的 nccl>=2.19 包含一个 bug：[https://github.com/NVIDIA/nccl/issues/1234](https://github.com/NVIDIA/nccl/issues/1234)。                                                                                                |
| LD_LIBRARY_PATH                         | `None`                     | 当 `VLLM_NCCL_SO_PATH` 未设置时，vLLM 将尝试在 `LD_LIBRARY_PATH` 指定的位置查找 nccl 库文件。                                                                                                                                                                     |
| VLLM_USE_TRITON_FLASH_ATTN              | `True`                     | 控制 vLLM 是否应使用 Triton flash attention 的标志。                                                                                                                                                                                                              |
| VLLM_FLASH_ATTN_VERSION                 | `None`                     | 强制 vLLM 使用特定的 flash-attention 版本（2 或 3），仅在使用 flash-attention 后端时有效。                                                                                                                                                                        |
| VLLM_TEST_DYNAMO_FULLGRAPH_CAPTURE      | `True`                     | 启用 Dynamo fullgraph 捕获的内部标志。                                                                                                                                                                                                                            |
| LOCAL_RANK                              | `0`                        | 分布式设置中进程的本地排名，用于确定 GPU 设备 ID。                                                                                                                                                                                                                |
| CUDA_VISIBLE_DEVICES                    | `None`                     | 用于控制分布式设置中可见设备的变量。                                                                                                                                                                                                                              |
| VLLM_ENGINE_ITERATION_TIMEOUT_S         | `60`                       | 引擎中每次迭代的超时时间（秒）。                                                                                                                                                                                                                                  |
| VLLM_API_KEY                            | `None`                     | vLLM API 服务器的 API 密钥。                                                                                                                                                                                                                                      |
| VLLM_DEBUG_LOG_API_SERVER_RESPONSE      | `False`                    | 是否记录 API 服务器响应以进行调试。                                                                                                                                                                                                                               |
| S3_ACCESS_KEY_ID                        | `None`                     | S3 访问信息，用于 tensorizer 从 S3 加载模型。                                                                                                                                                                                                                     |
| S3_SECRET_ACCESS_KEY                    | `None`                     | S3 访问信息，用于 tensorizer 从 S3 加载模型。                                                                                                                                                                                                                     |
| S3_ENDPOINT_URL                         | `None`                     | S3 访问信息，用于 tensorizer 从 S3 加载模型。                                                                                                                                                                                                                     |
| VLLM_USAGE_STATS_SERVER                 | `https://stats.vllm.ai`    | 使用情况统计服务器。                                                                                                                                                                                                                                              |
| VLLM_NO_USAGE_STATS                     | `0`                        | 是否禁用使用情况统计。                                                                                                                                                                                                                                            |
| VLLM_DO_NOT_TRACK                       | `0`                        | 是否启用“请勿跟踪”功能。                                                                                                                                                                                                                                          |
| VLLM_USAGE_SOURCE                       | `production`               | 使用情况来源。                                                                                                                                                                                                                                                    |
| VLLM_CONFIGURE_LOGGING                  | `1`                        | 日志配置。如果设置为 0，vLLM 将不配置日志。如果设置为 1，vLLM 将使用默认配置或 `VLLM_LOGGING_CONFIG_PATH` 指定的配置文件配置日志。                                                                                                                                |
| VLLM_LOGGING_CONFIG_PATH                | `None`                     | 日志配置文件的路径。                                                                                                                                                                                                                                              |
| VLLM_LOGGING_LEVEL                      | `INFO`                     | 用于配置默认日志级别。                                                                                                                                                                                                                                            |
| VLLM_LOGGING_PREFIX                     | `""`                       | 如果设置，`VLLM_LOGGING_PREFIX` 将添加到所有日志消息的前面。                                                                                                                                                                                                      |
| VLLM_LOGITS_PROCESSOR_THREADS           | `None` (0)                 | 如果设置，vLLM 将使用此数量的线程在线程池中调用 logits 处理器。当使用自定义 logits 处理器（a）启动额外的 CUDA 内核或（b）在不持有 Python GIL 的情况下进行大量 CPU 密集型工作，或两者兼有时，这很有用。                                                            |
| VLLM_TRACE_FUNCTION                     | `0`                        | 跟踪函数调用。如果设置为 1，vLLM 将跟踪函数调用。对于调试很有用。                                                                                                                                                                                                 |
| VLLM_ATTENTION_BACKEND                  | `None`                     | 注意力计算的后端。可用选项："TORCH_SDPA", "FLASH_ATTN", "XFORMERS", "ROCM_FLASH", "FLASHINFER", "FLASHMLA"。                                                                                                                                                      |
| VLLM_USE_FLASHINFER_SAMPLER             | `None`                     | 如果设置，vLLM 将使用 flashinfer 采样器。                                                                                                                                                                                                                         |
| VLLM_FLASHINFER_FORCE_TENSOR_CORES      | `0`                        | 如果设置，vLLM 将强制 flashinfer 使用 tensor cores；否则将根据模型架构使用启发式方法。                                                                                                                                                                            |
| VLLM_PP_LAYER_PARTITION                 | `None`                     | 流水线阶段分区策略。                                                                                                                                                                                                                                              |
| VLLM_CPU_KVCACHE_SPACE                  | `0` (4 GiB)                | （仅限 CPU 后端）CPU 键值缓存空间。默认为 4 GiB。                                                                                                                                                                                                                 |
| VLLM_CPU_OMP_THREADS_BIND               | `all`                      | （仅限 CPU 后端）OpenMP 线程绑定的 CPU 核心 ID，例如 "0-31", "0,1,2", "0-31,33"。不同等级的 CPU 核心用 '                                                                                                                                                          | ' 分隔。 |
| VLLM_CPU_MOE_PREPACK                    | `1`                        | （仅限 CPU 后端）是否对 MoE 层使用预打包。这将传递给 ipex.llm.modules.GatedMLPMOE。在不支持的 CPU 上，您可能需要将其设置为 "0" (False)。                                                                                                                          |
| VLLM_USE_RAY_SPMD_WORKER                | `0`                        | 如果设置，所有 worker 将作为独立进程从引擎执行，并且我们使用相同的机制触发所有 worker 的执行。运行 `vLLM` 并设置 `VLLM_USE_RAY_SPMD_WORKER=1` 以启用它。                                                                                                          |
| VLLM_USE_RAY_COMPILED_DAG               | `0`                        | 如果设置，它使用 Ray 的 Compiled Graph（以前称为 ADAG）API，该 API 优化了控制平面开销。请注意，当使用 Ray 分布式执行器时，此变量在 V1 中默认设置为 1。                                                                                                            |
| VLLM_USE_RAY_COMPILED_DAG_CHANNEL_TYPE  | `auto`                     | 如果设置，Ray Compiled Graph 使用指定的通道类型在属于不同流水线并行阶段的 worker 之间进行通信。可用选项："auto"：使用默认通道类型；"nccl"：使用 NCCL 进行通信；"shm"：使用共享内存和 gRPC 进行通信。如果 `VLLM_USE_RAY_COMPILED_DAG` 未设置，则忽略此标志。       |
| VLLM_USE_RAY_COMPILED_DAG_OVERLAP_COMM  | `0`                        | 如果设置，它在 Ray 的 Compiled Graph 中启用 GPU 通信重叠（实验性功能）。如果 `VLLM_USE_RAY_COMPILED_DAG` 未设置，则忽略此标志。                                                                                                                                   |
| VLLM_WORKER_MULTIPROC_METHOD            | `fork`                     | 为 worker 使用专用的多进程上下文。`spawn` 和 `fork` 都有效。                                                                                                                                                                                                      |
| VLLM_ASSETS_CACHE                       | `~/.cache/vllm/assets`     | 用于存储下载资产的缓存路径。                                                                                                                                                                                                                                      |
| VLLM_IMAGE_FETCH_TIMEOUT                | `5`                        | 服务多模态模型时获取图像的超时时间（秒）。默认值为 5 秒。                                                                                                                                                                                                         |
| VLLM_VIDEO_FETCH_TIMEOUT                | `30`                       | 服务多模态模型时获取视频的超时时间（秒）。默认值为 30 秒。                                                                                                                                                                                                        |
| VLLM_AUDIO_FETCH_TIMEOUT                | `10`                       | 服务多模态模型时获取音频的超时时间（秒）。默认值为 10 秒。                                                                                                                                                                                                        |
| VLLM_MM_INPUT_CACHE_GIB                 | `4`                        | 多模态输入缓存大小（GiB）。默认值为 4 GiB。                                                                                                                                                                                                                       |
| VLLM_XLA_CACHE_PATH                     | `~/.cache/vllm/xla_cache`  | XLA 持久缓存目录的路径。仅用于 TPU 等 XLA 设备。                                                                                                                                                                                                                  |
| VLLM_XLA_CHECK_RECOMPILATION            | `0`                        | 如果设置，每次执行步骤后都会断言 XLA 重新编译。                                                                                                                                                                                                                   |
| VLLM_FUSED_MOE_CHUNK_SIZE               | `32768`                    | 融合 MoE 块的大小。                                                                                                                                                                                                                                               |
| VLLM_NO_DEPRECATION_WARNING             | `0`                        | 如果设置，vLLM 将跳过弃用警告。                                                                                                                                                                                                                                   |
| VLLM_KEEP_ALIVE_ON_ENGINE_DEATH         | `0`                        | 如果设置，即使底层 AsyncLLMEngine 出错并停止服务请求，OpenAI API 服务器也将保持活动状态。                                                                                                                                                                         |
| VLLM_ALLOW_LONG_MAX_MODEL_LEN           | `0`                        | 如果设置了环境变量 `VLLM_ALLOW_LONG_MAX_MODEL_LEN`，它允许用户指定一个大于模型 `config.json` 中推导出的最大序列长度。要启用此功能，请设置 `VLLM_ALLOW_LONG_MAX_MODEL_LEN=1`。                                                                                     |
| VLLM_TEST_FORCE_FP8_MARLIN              | `0`                        | 如果设置，无论硬件是否支持 FP8 计算，都强制使用 FP8 Marlin 进行 FP8 量化。                                                                                                                                                                                        |
| VLLM_TEST_FORCE_LOAD_FORMAT             | `dummy`                    | 强制加载格式。                                                                                                                                                                                                                                                    |
| VLLM_RPC_TIMEOUT                        | `10000`                    | zmq 客户端等待后端服务器响应简单数据操作的超时时间（毫秒）。                                                                                                                                                                                                      |
| VLLM_PLUGINS                            | `None`                     | 要加载的插件名称列表，以逗号分隔。如果未设置，表示将加载所有插件；如果设置为空字符串，则不加载任何插件。                                                                                                                                                          |
| VLLM_TORCH_PROFILER_DIR                 | `None`                     | 如果设置，启用 torch profiler。torch profiler 跟踪文件保存的目录路径。请注意，它必须是绝对路径。                                                                                                                                                                  |
| VLLM_USE_TRITON_AWQ                     | `0`                        | 如果设置，vLLM 将使用 Triton 实现的 AWQ。                                                                                                                                                                                                                         |
| VLLM_ALLOW_RUNTIME_LORA_UPDATING        | `0`                        | 如果设置，允许在运行时加载或卸载 Lora 适配器。                                                                                                                                                                                                                    |
| VLLM_SKIP_P2P_CHECK                     | `0`                        | 默认情况下，vLLM 会自行检查对等通信能力，以防驱动程序损坏。如果此环境变量设置为 1，vLLM 将跳过对等检查，并信任驱动程序的对等通信能力报告。                                                                                                                        |
| VLLM_DISABLED_KERNELS                   | `[]`                       | 应禁用（用于测试和性能比较）的量化内核列表。目前仅影响 MPLinearKernel 选择。                                                                                                                                                                                      |
| VLLM_USE_V1                             | `1`                        | 如果设置，使用 V1 代码路径。                                                                                                                                                                                                                                      |
| VLLM_ROCM_USE_AITER                     | `False`                    | 除非明确启用，否则禁用 aiter 操作。作为启用其余操作的父开关。                                                                                                                                                                                                     |
| VLLM_ROCM_USE_AITER_PAGED_ATTN          | `False`                    | 是否使用 aiter 分页注意力。默认禁用。                                                                                                                                                                                                                             |
| VLLM_ROCM_USE_AITER_LINEAR              | `True`                     | 如果启用了 aiter 操作，则使用 aiter 线性操作。相关操作列表：scaled_mm (per-tensor / rowwise)。                                                                                                                                                                    |
| VLLM_ROCM_USE_AITER_MOE                 | `True`                     | 是否使用 aiter moe 操作。默认启用。                                                                                                                                                                                                                               |
| VLLM_ROCM_USE_AITER_RMSNORM             | `True`                     | 如果启用了 aiter 操作，则使用 aiter rms norm 操作。                                                                                                                                                                                                               |
| VLLM_ROCM_USE_AITER_MLA                 | `True`                     | 是否使用 aiter mla 操作。默认启用。                                                                                                                                                                                                                               |
| VLLM_ROCM_USE_SKINNY_GEMM               | `True`                     | 使用 rocm skinny gemms。                                                                                                                                                                                                                                          |
| VLLM_ROCM_FP8_PADDING                   | `1`                        | 为 ROCm 将 FP8 权重填充到 256 字节。                                                                                                                                                                                                                              |
| VLLM_ROCM_MOE_PADDING                   | `1`                        | 为 MoE 内核填充权重。                                                                                                                                                                                                                                             |
| VLLM_ROCM_CUSTOM_PAGED_ATTN             | `True`                     | 适用于 MI3\* 显卡的自定义分页注意力内核。                                                                                                                                                                                                                         |
| Q_SCALE_CONSTANT                        | `200`                      | 用于 FP8 KV Cache 动态查询比例因子计算的除数。                                                                                                                                                                                                                    |
| K_SCALE_CONSTANT                        | `200`                      | 用于 FP8 KV Cache 动态键比例因子计算的除数。                                                                                                                                                                                                                      |
| V_SCALE_CONSTANT                        | `100`                      | 用于 FP8 KV Cache 动态值比例因子计算的除数。                                                                                                                                                                                                                      |
| VLLM_ENABLE_V1_MULTIPROCESSING          | `1`                        | 如果设置，在 V1 代码路径中为 LLM 启用多进程。                                                                                                                                                                                                                     |
| VLLM_LOG_BATCHSIZE_INTERVAL             | `-1`                       | 记录批处理大小的间隔时间（秒）。                                                                                                                                                                                                                                  |
| VLLM_DISABLE_COMPILE_CACHE              | `0`                        | 如果设置，禁用编译缓存。                                                                                                                                                                                                                                          |
| VLLM_SERVER_DEV_MODE                    | `0`                        | 如果设置，vLLM 将以开发模式运行，这将启用一些用于开发和调试的附加端点，例如 `/reset_prefix_cache`。                                                                                                                                                               |
| VLLM_V1_OUTPUT_PROC_CHUNK_SIZE          | `128`                      | 在 V1 AsyncLLM 接口中处理每 token 输出时，单个 asyncio 任务处理请求的最大数量。它适用于处理高并发流式请求的情况。设置过高可能导致消息间延迟的方差增加。设置过低可能对 TTFT 和整体吞吐量产生负面影响。                                                             |
| VLLM_MLA_DISABLE                        | `0`                        | 如果设置，vLLM 将禁用 MLA 注意力优化。                                                                                                                                                                                                                            |
| VLLM_ENABLE_MOE_ALIGN_BLOCK_SIZE_TRITON | `0`                        | 如果设置，vLLM 将使用 Triton 实现的 moe_align_block_size，即 fused_moe.py 中的 moe_align_block_size_triton。                                                                                                                                                      |
| VLLM_RAY_PER_WORKER_GPUS                | `1.0`                      | Ray 中每个 worker 的 GPU 数量，如果设置为小数，则 Ray 可以将多个 actor 调度到单个 GPU 上，以便用户可以将其他 actor 与 vLLM 放置在相同的 GPU 上。                                                                                                                  |
| VLLM_RAY_BUNDLE_INDICES                 | `""`                       | Ray 的 Bundle 索引，如果设置，它可以精确控制每个 worker 使用哪些索引作为 Ray Bundle。格式：逗号分隔的整数列表，例如 "0,1,2,3"。                                                                                                                                   |
| VLLM_CUDART_SO_PATH                     | `None`                     | 在某些系统中，`find_loaded_library()` 可能无法工作。因此，我们允许用户通过环境变量 `VLLM_CUDART_SO_PATH` 指定路径。                                                                                                                                               |
| VLLM_USE_HPU_CONTIGUOUS_CACHE_FETCH     | `True`                     | 连续缓存获取，以避免在 Gaudi3 上使用昂贵的 gather 操作。这仅适用于 HPU 连续缓存。如果设置为 true，将使用连续缓存获取。                                                                                                                                            |
| VLLM_HPU_USE_DELAYED_SAMPLING           | `False`                    | 为 HPU 使用延迟采样以减少每步之间的主机 CPU 开销。                                                                                                                                                                                                                |
| VLLM_DP_RANK                            | `0`                        | 数据并行设置中进程的排名。                                                                                                                                                                                                                                        |
| VLLM_DP_RANK_LOCAL                      | `VLLM_DP_RANK`             | 数据并行设置中进程的本地排名。如果未设置，则默认为 `VLLM_DP_RANK`。                                                                                                                                                                                               |
| VLLM_DP_SIZE                            | `1`                        | 数据并行设置的世界大小。                                                                                                                                                                                                                                          |
| VLLM_DP_MASTER_IP                       | `127.0.0.1`                | 数据并行设置中主节点的 IP 地址。                                                                                                                                                                                                                                  |
| VLLM_DP_MASTER_PORT                     | `0`                        | 数据并行设置中主节点的端口。                                                                                                                                                                                                                                      |
| VLLM_CI_USE_S3                          | `0`                        | 在 CI 中是否通过 RunAI Streamer 使用 S3 路径进行模型加载。                                                                                                                                                                                                        |
| VLLM_MODEL_REDIRECT_PATH                | `None`                     | 使用 `model_redirect` 将模型名称重定向到本地文件夹。`model_redirect` 可以是一个 JSON 文件，映射 repo_id 和本地文件夹之间的模型：`{"meta-llama/Llama-3.2-1B": "/tmp/Llama-3.2-1B"}`；也可以是一个空格分隔的值表文件：`meta-llama/Llama-3.2-1B /tmp/Llama-3.2-1B`。 |
| VLLM_MARLIN_USE_ATOMIC_ADD              | `0`                        | 在 gptq/awq marlin 内核中是否使用 `atomicAdd` 归约。                                                                                                                                                                                                              |
| VLLM_V0_USE_OUTLINES_CACHE              | `0`                        | 是否为 V0 启用 outlines 缓存。此缓存是无限制的，并且存储在磁盘上，因此在可能存在恶意用户的环境中不安全使用。                                                                                                                                                      |
| VLLM_TPU_BUCKET_PADDING_GAP             | `0`                        | 前向传播的填充桶之间的间隙。例如，如果为 8，则前向传播将使用 [16, 24, 32, ...]。                                                                                                                                                                                  |
| VLLM_USE_DEEP_GEMM                      | `0`                        | 允许将 DeepGemm 内核用于融合的 moe 操作。                                                                                                                                                                                                                         |
| VLLM_XGRAMMAR_CACHE_MB                  | `512`                      | 控制 xgrammar 编译器使用的缓存大小。默认 512 MB 应该足以容纳大约 1000 个 JSON schema。如果需要，可以通过此变量进行更改。                                                                                                                                          |
| VLLM_MSGPACK_ZERO_COPY_THRESHOLD        | `256`                      | 控制 msgspec 使用“零拷贝”进行张量序列化/反序列化的阈值。低于此限制的张量将被编码到 msgpack 缓冲区中，而高于此限制的张量将通过单独的消息发送。虽然发送方在所有情况下仍然复制张量，但在接收方，高于此限制的张量将实际进行零拷贝解码。                               |

- https://docs.vllm.ai/en/stable/serving/env_vars.html

# API

- https://docs.vllm.ai/en/v0.8.5/serving/openai_compatible_server.html

# FAQ

- dtype
  - auto, half, float16, bfloat16, float, float32
  - “auto” will use FP16 precision for FP32 and FP16 models, and BF16 precision for BF16 models.
  - “half” for FP16. Recommended for AWQ quantization.
  - “float16” is the same as “half”.
  - “bfloat16” for a balance between precision and range.
  - “float” is shorthand for FP32 precision.
  - “float32” for FP32 precision.
- --quantization
  - aqlm,awq,deepspeedfp,tpu_int8,fp8,ptpc_fp8,fbgemm_fp8,modelopt,nvfp4,marlin,bitblas,gguf,gptq_marlin_24,gptq_marlin
  - gptq_bitblas,awq_marlin,gptq,compressed-tensors,bitsandbytes,qqq,hqq,experts_int8,neuron_quant,ipex,quark,moe_wna16,torchao,None
- capability
  - 8.0 bfloat16
    - 不支持会 cast 为 fp16 或 fp32 - 性能影响很大
  - 7.5 awq

## Compute Capability < 8.0 is not supported by the V1 Engine. Falling back to V0.

## dtype=auto

```
ValueError: Bfloat16 is only supported on GPUs with compute capability of at least 8.0. Your Tesla V100-SXM2-16GB GPU has compute capability 7.0. You can use float16 instead by explicitly setting the `dtype` flag in CLI, for example: --dtype=half.
```

## The quantization method awq is not supported for the current GPU. Minimum capability: 75. Current capability: 70.

- V100
- https://github.com/vllm-project/vllm/issues/1345

## GPTQ-Int4

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct-GPTQ-Int4 --dtype=half
```

```
ValueError: Trying to use the bitblas backend, but could not importwith the following error: No module named 'bitblas'. Please install bitblas through the following command: `pip install bitblas>=0.1.0`
```

## No optimized function available for platform CUDA

```
TVM target not found. Please set the TVM target environment variable using export TVM_TARGET=<target>
```

```bash
# force --quantization=gptq
CUDA_DEVICE_ORDER=PCI_BUS_ID vllm serve Qwen/Qwen2.5-7B-Instruct-GPTQ-Int4 --dtype=half --quantization=gptq
```

- Volta (sm_70) 出错
- gptq_bitblas 会使用 BitBLAS
- BitBLAS 依赖 TVM
- 参考
  - Disable gptq_bitblas for < SM80 to fix GPTQ on V100/T4 [vllm-project/vllm#17541](https://github.com/vllm-project/vllm/pull/17541)
