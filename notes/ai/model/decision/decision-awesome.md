---
tags:
  - Awesome
---

# Awesome Decision Models

Decision Model / 决策模型把输入状态和限定的问题 schema 一起送入模型，直接返回代码可以消费的 typed answer、概率和置信度。它适合路由、分级、风控门禁和 agent 工具选择；输出空间已知时，不需要从自然语言中解析 JSON。

- `choice`：从有限选项中选择一个，返回选项概率分布。
- `score`：在有序等级上评分，返回期望等级和各等级概率。
- `noul`：对一个命题返回 `P(true)`，适合 yes/no 门禁。

## Model

| model                                                      | type                                  | base / size                          | input                           | license / deployment           | notes                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------- | ------------------------------------ | ------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [Jev](https://jevtypesafeai.com/jev)                       | hosted System One                     | closed                               | text、JSON、array               | hosted API                     | TypeSafe AI 的旗舰决策模型；当前 API 支持 `choice`、`score`、`noul`                                                 |
| [Clef](https://huggingface.co/Cloudflare/clef)             | open-weight decision model            | Qwen3.8-27B                          | text、JSON、image、video        | Apache-2.0、local / Workers AI | Jev / System One API compatible；joint schema head；单次 forward pass 返回各选项概率                                |
| [Clef-Flash](https://huggingface.co/Cloudflare/clef-flash) | open-weight decision model            | Qwen3.5-9B                           | text、JSON、image、video        | Apache-2.0、local / Workers AI | Clef 的小模型版本，面向 latency-sensitive workflow                                                                  |
| [Clef-Omni](https://huggingface.co/Cloudflare/clef-omni)   | open-weight multimodal decision model | Qwen3-Omni-30B-A3B-Instruct          | text、JSON、image、audio、video | Apache-2.0、local / Workers AI | 将音频和视频纳入同一次决策请求；本地推理约需 64 GB GPU memory（BF16）                                               |
| [Kev](https://github.com/jaredpalmer/kev)                  | open-weight Jev-like model            | Qwen3.5 / Qwen3.8，0.8B、4B、9B、27B | text、JSON                      | Apache-2.0、local              | API 兼容 TypeSafe System One；支持 CUDA 和 Apple Silicon MLX，可自行 fine-tune                                      |
| [Laya](https://huggingface.co/convaiinnovations/laya)      | open-weight System 1 decision model   | ModernBERT-large，421M               | text、JSON                      | Apache-2.0、local              | 双向 encoder + decision head；另有 multilingual 和 typed-decisions checkpoint                                       |
| DiffusionGemma Jev                                         | Jev-like adaptation                   | Google DiffusionGemma 26B-A4B        | text、image、video              | Apache-2.0 base、local         | 用 constrained generation 把通用 diffusion text model 适配成决策服务；不是 Google 官方决策模型，也不是 TypeSafe Jev |

## API 与 schema

TypeSafe 的 System One 请求以 `state` 描述上下文，以 `questions` 声明待决策的问题。多个互相独立的问题可以在一次请求中批量评估：

```json
{
  "model": "jev-latest",
  "state": {
    "subject": "Checkout is failing",
    "body": "Every customer has received a payment error for the last hour."
  },
  "questions": {
    "team": {
      "type": "choice",
      "instructions": "Which team should handle this incident?",
      "criteria": {
        "billing": "Payments, invoices, and refunds",
        "technical": "Outages, errors, and configuration",
        "sales": "Plans and upgrades"
      }
    },
    "severity": {
      "type": "score",
      "instructions": "How severe is the customer impact?",
      "criteria": ["No impact", "Minor", "Major", "Critical"]
    },
    "urgent": {
      "type": "noul",
      "instructions": "Does this incident require immediate human attention?"
    }
  }
}
```

- `choice` 的 `criteria` 是 `option_id -> description` 映射。
- `score` 的 `criteria` 是从低到高排列的等级列表，模型返回的 `score` 可以是小数。
- `noul` 是 calibrated yes/no probability，不是自然语言的 `true` / `false` 生成。
- 将 `confidence` 当作路由信号使用时，应在自己的数据分布上重新评估 calibration、阈值和 abstention 策略。
- 高风险动作应把低置信度、选项概率接近和输入超出训练分布的情况送人工或更强的 reasoning model。

## Models

### Jev

- [TypeSafe AI: System One](https://docs.typesafe.ai/concepts/system-one)
  - System One 是面向软件工作流的模型类别，Jev 是 TypeSafe AI 的第一个模型。
  - 当前输入是 text、JSON object 或 text array，不支持 image、audio、video。
  - 输出是 typed answer 和 probability；模型不会生成解释、代码或开放式回复。
- [Jev API](https://jevtypesafeai.com/docs)
  - `POST /v1/decide`。
  - 生产环境可以指定固定模型版本，避免模型别名更新后阈值漂移。

### Cloudflare Clef

- [Cloudflare: Introducing Clef](https://blog.cloudflare.com/clef-decision-models/)
  - 2026-10-01 发布 Clef 和 Clef-Flash。
  - Clef 基于 Qwen3.8-27B，Clef-Flash 基于 Qwen3.5-9B；两者增加 joint schema head，对有效选项直接打分。
  - Cloudflare 公布了与 Jev、DiffusionGemma Jev、Kev、Laya 的 Decision Index 对比；这些结果属于厂商公布的内部评测，应记录 suite/version、配置和测试日期后再比较。
- [Cloudflare: Introducing Clef-omni](https://blog.cloudflare.com/clef-faster-cheaper-multimodal/)
  - 2026-10-09 发布 Clef-Omni。
  - 基于 Qwen3-Omni-30B-A3B-Instruct，支持 text、image、audio、video 的统一输入。
  - Hosted Clef-Flash 的 context window、价格和 serving latency 与 Hugging Face 权重能力不同，部署时要分别查看服务端和本地模型说明。
- [Clef model card](https://huggingface.co/Cloudflare/clef)
  - 提供本地 `transformers` 推理、`systemone` 兼容接口和 model card benchmark。
  - 权重和 model card license 为 Apache-2.0；基础模型与训练数据的授权仍应按各自上游条款确认。

### Kev

- [jaredpalmer/kev](https://github.com/jaredpalmer/kev)
  - Apache-2.0, Python, TypeScript, Qwen3.5 / Qwen3.8。
  - `Kev-0.8B` 适合尺寸优先的本地部署；`Kev-4B`、`Kev-9B` 和 `Kev-27B` 用于逐步提高决策质量。
  - 提供 `noul`、`choice`、`score`，并附带温度校准；可以从已标注样本 fine-tune 自己的路由和门禁问题。
  - 仓库中的 benchmark 区分 new sources 和 trained sources；不要把训练集内结果直接当成 zero-shot 能力。

### Laya

- [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)
  - Apache-2.0, ModernBERT-large, 421M。
  - 采用双向 encoder 和 decision head，在一次 forward pass 中并行处理多个 typed questions。
  - `convaiinnovations/laya-multilingual` 使用 mmBERT-base，面向 100+ 语言；`laya-typed-decisions` 面向 agent observability、客服、发票和安全告警等任务。
  - 选项较多时质量会下降；英文 checkpoint、multilingual checkpoint 和 fine-tuned checkpoint 的语言、context、评测集不能混为一谈。

### DiffusionGemma Jev

- [Google DiffusionGemma](https://ai.google.dev/gemma/docs/diffusiongemma)
  - 26B、4B active 的 MoE diffusion text model，Apache-2.0 open weights。
  - 支持 text、image、video 输入，不支持 audio；通过 block-autoregressive multi-canvas sampling 并行去噪文本。
- [Run DiffusionGemma as a Jev-like decision model](https://jevtypesafeai.com/jev/local/diffusion-gemma)
  - 通过 constrained generation 将答案限制为预先定义的 option。
  - 这是把通用生成模型改造成 Jev-like 接口的工程方案，输出概率未必具有决策模型训练得到的 calibration。
- [vLLM structured generation support](https://github.com/vllm-project/vllm/pull/57250)
  - 可关注 runtime 对 DiffusionGemma structured generation 的支持状态；本地部署需要按当前 vLLM、Transformers 或 MLX 版本验证。

### OpenJev 与协议实现

- [xingwudao/OpenJev](https://github.com/xingwudao/OpenJev)
  - 独立的 Jev-inspired API、Python SDK 和 JavaScript / TypeScript SDK。
  - 当前公开版本主要是 local mock server、schema validation 和 contract tests，不包含 Jev 权重，也不提供真实模型推理。
  - 适合先验证 `state`、`questions`、`answers` 协议和业务路由，不应当当作 Jev 的开源权重替代品。

## 选型

| 场景                          | 优先考虑                  | 选择理由                                                                    |
| ----------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| 快速接入 hosted API           | Jev、Workers AI 上的 Clef | 省去模型部署，直接使用 System One / Jev-compatible API                      |
| Apache-2.0 本地 text decision | Kev、Laya                 | 可自托管、可 fine-tune，适合数据不出域的路由和门禁                          |
| 多语言轻量分类                | Laya multilingual         | 参数量较小，并提供多语言 checkpoint；需要先用自己的语言分布验证 calibration |
| 图片、视频决策                | Clef、Clef-Flash          | 具有视觉输入能力；注意清晰区分 hosted 限制和本地权重能力                    |
| 音频与视频联合判断            | Clef-Omni                 | 使用统一多模态输入，省去先 ASR / 抽帧再分类的串联流程                       |
| 研究 diffusion decoding       | DiffusionGemma Jev        | 适合研究 constrained generation 和低延迟本地推理，不适合直接假设概率已校准  |
| 只验证业务协议                | OpenJev                   | mock server 和 SDK 可用于开发接口，不代表模型质量                           |

## 评测

- 分类质量：accuracy、macro-F1、case exact。
- 排序和检索：nDCG、MRR、Top-k recall。
- 概率质量：Brier score、ECE、reliability diagram；Brier 越低越好，ECE 需要说明分桶方法。
- 自动化边界：risk-coverage curve、selective accuracy、abstention rate、人工升级率。
- 性能：median latency、p95 latency、吞吐量；必须注明硬件、batch size、输入 token、问题数量、量化方式和是否包含网络耗时。
- 泛化：区分训练来源、held-out source、zero-shot task、语言和领域；不要只引用模型作者的单一 benchmark 结论。

## 参考

- [TypeSafe AI: System One](https://docs.typesafe.ai/concepts/system-one)
- [Cloudflare: Introducing Clef](https://blog.cloudflare.com/clef-decision-models/)
- [Cloudflare: Introducing Clef-omni](https://blog.cloudflare.com/clef-faster-cheaper-multimodal/)
- [Google AI: DiffusionGemma](https://ai.google.dev/gemma/docs/diffusiongemma)
- [Decision Index](https://clef-evals.workers-ai-mle.workers.dev/)
- [Hugging Face: Cloudflare/clef](https://huggingface.co/Cloudflare/clef)
- [Hugging Face: convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)
- [jaredpalmer/kev](https://github.com/jaredpalmer/kev)
- [xingwudao/OpenJev](https://github.com/xingwudao/OpenJev)
