---
tags:
  - Evaluation
---

# evalscope

- [modelscope/evalscope](https://github.com/modelscope/evalscope)
  - Apache-2.0, Python
  - Evaluation Framework for LLMs

```bash
pip install evalscope
```

## backend

- Native Backend
- OpenCompass
  - 提供了更复杂的评测策略和能够支持更广泛的社区模型。
- VLMEvalKit
  - 支持图像理解、视觉问答等视觉与语言结合的任务。
- RAGEval
  - 支持 MTEB (Massive Text Embedding Benchmark) 和 CLIP Benchmark。
  - 评测 Embedding 模型、检索器效率及生成质量

## service

| 端点                  | 方法 | 功能         |
| --------------------- | ---- | ------------ |
| `/health`             | GET  | 健康检查     |
| `/api/v1/eval`        | POST | 模型评测     |
| `/api/v1/perf`        | POST | 性能压测     |
| `/api/v1/eval/params` | GET  | 评测参数说明 |
| `/api/v1/perf/params` | GET  | 压测参数说明 |

```json
{
  // --- 基本配置 ---
  "api_key": "your-api-key", // str - API 认证密钥 (默认: "EMPTY")
  "api_url": "https://dashscope.aliyuncs.com/compatible-mode/v1", // str - API 服务地址 (必需, 对开放API模型)
  "model": "qwen-plus", // str - 被测模型名称或标识
  "model_id": "qwen-plus-v1", // str - 模型唯一标识 (可选)

  // --- 数据集配置 ---
  "datasets": [
    // 评测所用数据集 (list of str)
    "gsm8k",
    "mmlu"
  ],
  "limit": 10, // int | float - 评测样本上限 (数值为个数, 小数为比例)
  // dict - 加载数据集时的附加参数 (可选)
  "dataset_args": {
    "gsm8k": {
      // 子集
      "subset_list": ["main"],
      "few_shot_num": 0
    }
  },
  "dataset_dir": "~/.cache/modelscope/hub/datasets", // str - 数据集缓存目录 (可选)
  "repeats": 1, // int - 每个样本重复评测次数 (默认: 1)

  // --- 生成配置 ---
  "generation_config": {
    "max_tokens": 2048, // int - 最多生成 token 数 (默认: 2048)
    "temperature": 0, // float - 采样温度 (默认: 0)
    "top_k": 1, // int - top-k 采样参数 (可选)
    "top_p": 1.0, // float - 核采样参数 (可选)
    "stream": false, // bool - 是否开启流式生成 (可选)
    "timeout": 60 // float - 请求超时时间(秒) (可选)
  },

  // --- 评测与评审流程 ---
  "eval_batch_size": 1, // int - 单批次样本数 (默认: 1)
  "eval_type": "service", // str - 评测类型 (填 api_url 则自动为 service, 默认为自动)
  "judge_strategy": "auto", // str - LLM 评审模式 (auto/single/pairwise，默认为 auto)
  "judge_worker_num": 1, // int - 评审进程数 (默认: 1)
  "judge_model_args": {}, // dict - LLM 评审模型配置 (可选)

  // --- 运行配置 ---
  "seed": 42, // int - 随机种子 (默认: 42)
  "work_dir": "./outputs", // str - 输出目录 (日志、结果等)
  "debug": false, // bool - 是否调试模式 (默认: false)
  "use_cache": "", // str - 已有结果缓存路径 (可选，复用结果)
  // dict - 模型初始化额外参数 (可选)
  "model_args": {
    "default_headers": {
      "X-Custom-Header": "custom-value",
      "X-Request-ID": "eval-12345",
      "X-Tenant-ID": "tenant-001"
    },
    "timeout": 60.0,
    "max_retries": 3
  }
}
```

```py
# 使用 OpenAI 兼容客户端，直接透传 model_args
self.client = OpenAI(
    api_key=self.api_key,
    base_url=self.base_url,
    **model_args, # <--- 直接透传所有参数
)
```

- work_dir=./outputs
  - `YYYYMMDD_HHMMSS`
- use_cache
  - 输出目录,
  - 断点续评
  - 强制指定目录

## dataset

- ~/.cache/modelscope/hub/datasets
- ~/.cache/evalscope
- EVALSCOPE_CACHE
- https://evalscope.readthedocs.io/zh-cn/latest/get_started/supported_dataset/index.html

## eval

```
outputs/20251213_141531/
├── configs/          # 任务配置
│   └── task_config_f384e2.yaml
├── logs/             # 评测日志
│   └── eval_log.log
├── predictions/      # 模型预测结果 (原始输出)
│   └── qwen3-vl-4b-instruct/
│       ├── gsm8k_main.jsonl
│       ├── arc_ARC-Easy.jsonl
│       ├── arc_ARC-Challenge.jsonl
│       ├── hellaswag_default.jsonl
│       └── mmlu_*.jsonl (57个子集)
├── reports/          # 评测报告 (汇总分数)
│   └── qwen3-vl-4b-instruct/
│       ├── gsm8k.json
│       ├── arc.json
│       ├── hellaswag.json
│       └── mmlu.json
└── reviews/          # 评分详情 (每道题对错)
    └── qwen3-vl-4b-instruct/
        └── *.jsonl (61个文件)
```
