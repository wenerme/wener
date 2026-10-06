---
title: Image Generation Awesome
tags:
  - Model
  - Image Generation
  - Diffusion
  - Awesome
---

# Image Generation Awesome

图像生成、图像编辑、修复、放大和扩散模型资源索引。

## 能力范围

- Image Generation / Text-to-Image（T2I）
- Image Editing / Image-to-Image（I2I）
- Image Inpainting / Outpainting
- Image Upscaling / Super Resolution
- Image Variation
- Multimodal Understanding
- 风格、角色、姿态和多图一致性

## 2026 重点模型

查证截至 **2026-10-06**。重点补充 2026-02 以后的发布，同时保留 1 月的重要基线。日期优先采用官方权重发布记录；只列月份的条目不推断具体发布日。

这里的“开放权重”表示可以下载并自行部署；研究许可、非商业许可和社区许可需分别看条款。表中的许可指权重，项目条目另列代码许可。规模采用作者口径，独立文本编码器、Prompt Enhancer、VAE 等不一定计入 DiT 参数量。

| date | model | size | author | 权重许可 | 关注点 |
| --- | --- | --- | --- | --- | --- |
| 2026-09-20 | [Qwen-Image-2.1](https://huggingface.co/Qwen/Qwen-Image-2.1) | 7B DiT | Qwen | Qwen Research License，非商业 | 统一生成与编辑、原生 2K/RGBA、最多 10 张参考图、局部标注和 Mask 编辑 |
| 2026-09 | [Ming-Image-0.1-Design](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design) | 6B | inclusionAI | MIT | UI、信息图、海报、密集文字、透明背景；另有 Design-Layer 图层分解模型 |
| 2026-07-20 | [Cosmos3-Super-Text2Image-4Step](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image-4Step) | 64B MoT | NVIDIA | OpenMDW-1.1 | 4 步蒸馏、Physical AI、合成数据；完整步数版于 05-31 发布，部署成本较高 |
| 2026-06-22 | [Krea 2 Raw / Turbo](https://huggingface.co/krea/Krea-2-Turbo) | 12B | Krea | Krea 2 Community License | 从头训练、审美与风格多样性；Raw 用于 LoRA/后训练，Turbo 用于 8 步推理 |
| 2026-05 | [Lens / Lens-Turbo](https://huggingface.co/microsoft/Lens) | 3.8B DiT | Microsoft | MIT | 训练效率、最高 1440×1440；Lens 为 20 步，Turbo 为 4 步，Base 为 50 步 |
| 2026-05-08 | [HiDream-O1-Image](https://huggingface.co/HiDream-ai/HiDream-O1-Image) | 8B | HiDream | MIT | Pixel-level UiT，无外部 VAE 或独立文本编码器；生成、编辑、主体个性化、2K |
| 2026-04 | [ERNIE-Image / Turbo](https://huggingface.co/baidu/ERNIE-Image) | 8B DiT | Baidu | Apache-2.0 | 中英文长文字、版式与结构化生成；SFT 为 50 步，Turbo 为 8 步，配套 Prompt Enhancer |
| 2026-01-27 | [Z-Image](https://huggingface.co/Tongyi-MAI/Z-Image) | 6B DiT | Tongyi-MAI | Apache-2.0 | 非蒸馏基础版，50 步、负面提示词、微调与多样性；区别于 2025 年的 Turbo |
| 2026-01-26 | [HunyuanImage-3.0-Instruct](https://huggingface.co/tencent/HunyuanImage-3.0-Instruct) | 80B MoE / 13B active | Tencent | Tencent Hunyuan Community | 原生多模态、推理与提示词增强、多图编辑；另有 Instruct-Distil |
| 2026-01-15 | [FLUX.2 klein](https://github.com/black-forest-labs/flux2) | 4B / 9B DiT | Black Forest Labs | 4B 为 Apache-2.0；9B 为非商业许可 | 生成与多参考编辑，蒸馏版 4 步；Base 用于训练与 LoRA |

### 官方项目与版本区别

- [QwenLM/Qwen-Image-2.1](https://github.com/QwenLM/Qwen-Image-2.1)
  - Qwen Research License, Python, DiT
  - 7B 指视觉生成主干；另有 Qwen3.5-VL 9B 的 T2I/I2I Prompt Rewriter。生成、编辑、RGBA 使用同一模型。
  - [权重 LICENSE](https://huggingface.co/Qwen/Qwen-Image-2.1/blob/main/LICENSE)：仅研究/评估等非商业用途，商业使用需另获许可；不能沿用早期 Qwen-Image 的 Apache-2.0 标注。
- [inclusionAI/Ming-Image](https://github.com/inclusionAI/Ming-Image)
  - MIT, Python, Image Generation
  - Design 与 [Design-Layer](https://huggingface.co/inclusionAI/Ming-Image-0.1-Design-Layer) 是两个 6B 模型；前者生成设计稿，后者把已有设计拆为可编辑透明图层。官方验证的 BF16 部署使用至少 80 GiB 显存，6B 不代表完整管线显存很小。
- [NVIDIA/cosmos](https://github.com/NVIDIA/cosmos)
  - Cosmos 3 面向世界模拟、机器人和合成数据；Super 为 64B MoT，包含 32B Reasoner 与 32B Generator。Nano 为 16B，Edge 为 4B，能力需按具体模型卡判断。
  - [Super Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image) 于 2026-05-31 发布；4Step 于 07-20 发布。4 步减少采样计算，不改变 64B 模型的显存需求。
- [krea-ai/krea-2](https://github.com/krea-ai/krea-2)
  - Apache-2.0, Python, DiT
  - 代码为 Apache-2.0，两个开放 checkpoint 的权重采用 [Krea 2 Community License](https://huggingface.co/krea/Krea-2-Turbo/blob/main/README.md)。开放的 12B Raw/Turbo 与托管的 Krea 2 Large 不应混为同一版本。
  - 模型卡记权重发布于 06-22，[技术报告](https://www.krea.ai/blog/krea-2-technical-report) 发布于 06-23；建议在 Raw 训练 LoRA、在 Turbo 推理。
- [microsoft/Lens](https://github.com/microsoft/Lens)
  - MIT, Python, MMDiT
  - 组合 GPT-OSS 多层文本特征与 FLUX.2 semantic VAE；基座、RL 与 Turbo 三种 checkpoint 分别适合训练、质量与速度需求，外部组件许可另看各自模型卡。
- [HiDream-ai/HiDream-O1-Image](https://github.com/HiDream-ai/HiDream-O1-Image)
  - MIT, Python, Pixel-level UiT
  - Full 与 Dev 于 05-08 开放；05-14 的 [Dev-2604](https://huggingface.co/HiDream-ai/HiDream-O1-Image-Dev-2604) 专门优化 T2I。Dev-2604 不支持 Full 的全部编辑任务；编辑优先看 Full。
- [baidu/ERNIE-Image](https://github.com/baidu/ERNIE-Image)
  - Apache-2.0, Python, Single-stream DiT
  - [Turbo](https://huggingface.co/baidu/ERNIE-Image-Turbo) 使用 DMD 与 RL；长文字、复杂关系和多面板布局是重点。官方 GenEval、OneIG、LongTextBench 表格属于作者评测，Prompt Enhancer 的开关也是评测配置的一部分。
- [Tongyi-MAI/Z-Image](https://github.com/Tongyi-MAI/Z-Image)
  - Apache-2.0, Python, S3-DiT
  - 已发布 Z-Image 与 Z-Image-Turbo；截至查证日，官方 Model Zoo 中 Omni-Base、Edit 仍标记待发布，不能把能力展示当成已开放 checkpoint。
- [Tencent-Hunyuan/HunyuanImage-3.0](https://github.com/Tencent-Hunyuan/HunyuanImage-3.0)
  - Tencent Hunyuan Community License, Python, MoE
  - Instruct 是 2026 年更新，3.0 原始 T2I 基座是 2025 年模型。[许可](https://huggingface.co/tencent/HunyuanImage-3.0-Instruct/blob/main/LICENSE) 有地域及规模限制，排除欧盟、英国、韩国。

### 商业模型参照

用于理解当前生成质量、编辑与服务能力；以下版本通过产品/API 提供，不列入开放权重模型表。

| date | model | 关注点 | 官方来源 |
| --- | --- | --- | --- |
| 2026-09-08 | GPT Image 2.5 Sunburst / Flare | Sunburst 重精细编辑，Flare 重速度；T2I、多轮编辑、参考图保持 | [OpenAI 公告](https://openai.com/index/introducing-chatgpt-images-2-5/) |
| 2026-08 / 09 | MAI-Image-2.6 / 2.6-Flash | 生成、精确编辑、不同吞吐/成本档位；区别于 MIT 的 Lens | [Microsoft 模型页](https://microsoft.ai/models/mai-image-2-6/) |
| 2026-07-08 | Seedream 5.0 Pro | 设计理解、复杂布局、多语言文字与多图编辑 | [ByteDance 公告](https://seed.bytedance.com/en/blog/beyond-generation-it-understands-design-introducing-seedream-5-0-pro) |
| 2026-02-26 | Nano Banana 2 / Gemini 3.1 Flash Image | Flash 速度、世界知识、主体一致性、图像生成与编辑 | [Google 公告](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/) |

### SOTA 怎么看

- [AA-Image-T2I v2.0](https://artificialanalysis.ai/image/leaderboard/text-to-image) 与 [AA-Image-Editing v2.0](https://artificialanalysis.ai/image/leaderboard/editing) 是不同任务的盲评榜单。2026-10-06 快照中，GPT Image 2.5 Sunburst/Flare 的 `max` 档位在两榜靠前；T2I 中 Qwen-Image-2.1 为 1036±10 Elo。这些结果要连同模型版本、质量档位与榜单版本一起看。
- UI/文字排版、透明图层、主体一致性、微调成本与通用 T2I 偏好并非同一个目标。Ming 的设计任务、ERNIE 的长文字、HiDream 的原始像素架构、Krea 的审美与训练路径，各有收录价值，不能据此统一宣称“当前第一”。
- 厂商 README 中的“发布时第一”、论文自测与独立榜单分别记录；不直接沿用历史排名。商业 API、社区许可权重、MIT/Apache-2.0 权重也分别判断。

## Diffusion / Image Models

| date       | model                                                 | size      | author            | notes                                 |
| ---------- | ----------------------------------------------------- | --------- | ----------------- | ------------------------------------- |
| 2026-01-14 | [GLM-Image](https://huggingface.co/zai-org/GLM-Image) | 9B+7B     | Z.ai              | AR + Diffusion，T2I、I2I、文字渲染    |
| 2025-12-23 | [Qwen-Image-Edit-2511](https://huggingface.co/Qwen/Qwen-Image-Edit-2511) |           | Alibaba           | I2I、多图编辑                        |
| 2025-11-26 | Z-Image-Turbo                                         | 6B        | Tongyi-MAI        | Apache-2.0，8 NFE 快速生成             |
| 2025-11-25 | FLUX.2 dev                                            | 32B       | Black Forest Labs | FLUX Non-Commercial License，多图编辑 |
| 2025-08-17 | Qwen-Image-Edit                                       |           | Alibaba           | 图像编辑、T2I、I2I                    |
| 2025-08-04 | [Qwen-Image](https://huggingface.co/Qwen/Qwen-Image)  | 20B       | Alibaba           | Apache-2.0，MMDiT，T2I、Editing、Text |
| 2025-07-16 | HiDream-E1-1                                          |           |                   | Image Editing                         |
| 2025-06-16 | OmniGen2                                              | 7B        | VectorSpaceLab    | T2I、Editing、Composing               |
| 2025-05-29 | FLUX.1 Kontext                                        | dev 12B   | Black Forest Labs | 上下文图像生成                        |
| 2025-04-07 | HiDream-I1                                            | 17B       |                   | Fast / Dev / Full                     |
| 2025-01-25 | Lumina-Image 2.0                                      | 2B        | OpenGVLab         | Apache-2.0                            |
| 2024-10-22 | SD 3.5                                                | 2.5B / 8B | Stability AI      | turbo / large / medium                |
| 2024-08-01 | FLUX.1                                                | 12B       | Black Forest Labs | dev / schnell                         |
| 2023-07    | SDXL 1.0                                              | 3.5B      |                   | Stable Diffusion XL                   |
| 2022-10    | SD 1.5                                                | 983M      | RunwayML          | Stable Diffusion                      |

## 常用模型与工具

- [huggingface/diffusers](https://github.com/huggingface/diffusers)
  - Diffusion 模型推理与训练生态。
  - [bghira/SimpleTuner](https://github.com/bghira/SimpleTuner)
  - [ostris/ai-toolkit](https://github.com/ostris/ai-toolkit)
- [advimman/lama](https://github.com/advimman/lama)
  - Resolution-robust Large Mask Inpainting。
- [ByteDance/XVerse](https://huggingface.co/ByteDance/XVerse)
  - 多主体身份与语义属性一致性控制。
- [Alpha-VLLM/Lumina-Image-2.0](https://github.com/Alpha-VLLM/Lumina-Image-2.0)
- [VectorSpaceLab/OmniGen2](https://github.com/VectorSpaceLab/OmniGen2)
  - 基于 Qwen-VL-2.5，支持组合和编辑。
- [huanngzh/mv-adapter](https://huggingface.co/huanngzh/mv-adapter)
  - 多视角生成与一致性适配。

## FLUX

- [black-forest-labs/flux](https://github.com/black-forest-labs/flux)
  - FLUX.1-dev 为 Non-Commercial License；FLUX.1-schnell 为 Apache-2.0。
  - [FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev)：质量、guidance distillation。
  - [FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)：1-4 步快速生成、支持 Fine-tune/LoRA。
  - [FLUX.1-Kontext-dev](https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev)：in-context image generation。
- [black-forest-labs/flux2](https://github.com/black-forest-labs/flux2)
  - Apache-2.0, Python, Flow Matching
  - klein 4B / 4B Base 权重为 Apache-2.0；klein 9B / 9B Base / 9B KV、dev 为 [FLUX Non-Commercial License](https://github.com/black-forest-labs/flux2#model-overview)。pro、flex 等托管版本另看商业服务条款。
  - 9B KV 通过 KV cache 加速多参考编辑；Base 保留非蒸馏 checkpoint，适合 LoRA 与后训练。
- [lodestones/Chroma](https://huggingface.co/lodestones/Chroma)
  - 基于 FLUX.1-schnell 微调，Apache-2.0。
- [HiDream-I1-Full](https://huggingface.co/HiDream-ai/HiDream-I1-Full)
  - 17B，使用 FLUX.1 schnell VAE。

## Stable Diffusion

- Stable Diffusion 1.x / 2.x / SDXL / SD 3.5。
- [Stability-AI/stable-diffusion-3.5](https://github.com/Stability-AI/stable-diffusion-3.5)
  - MMDiT；使用 OpenAI CLIP-L、OpenCLIP bigG 和 Google T5-XXL。
- SD 3.5 Medium：2.5B，MMDiT-X；[官方发布说明](https://stability.ai/news/introducing-stable-diffusion-3-5)。
- SD 3.5 Large-Turbo：MMDiT + ADD，约 4 步生成。
- [TMElyralab/lyraDiff](https://github.com/TMElyralab/lyraDiff)
  - Diffusion / DiT 推理加速引擎。

## Prompting

```text
[人物描述] [场景构建] [摄影参数] [氛围强化] [细节补充]
```

- 场景构建：服装细节、动态姿势、光影氛围。
- 摄影参数：镜头、光圈、景深、画面比例和视觉风格。
- 质量：`photorealistic`、`ultra detailed`、`natural skin texture`、`soft film grain`。
- 负面提示词通常关注：`lowres`、`text`、`watermark`、`bad anatomy`、`extra fingers`、`deformed`。
- [FLUX Prompt Generator](https://huggingface.co/spaces/gokaygokay/FLUX-Prompt-Generator)
- [dagthomas/comfyui_dagthomas](https://github.com/dagthomas/comfyui_dagthomas)
- [microsoft/Promptist](https://huggingface.co/microsoft/Promptist)
- [Gustavosta/MagicPrompt-Stable-Diffusion](https://huggingface.co/Gustavosta/MagicPrompt-Stable-Diffusion)

## 评估关注点

- Prompt adherence：提示词遵循度。
- Generation quality：生成质量。
- Consistency：风格、角色、场景和多图一致性。
- Precise posing：角色和场景元素的精确姿态。
- Compositing：多图、多层合成。
- Relighting：重新打光。
- Reference control：参考图、角色和风格控制。
- Object insertion/deletion：对象插入、删除和替换。
- Fine-tuning：是否适合针对业务数据进行微调。

## 相关资源

- [Artificial Analysis Image Leaderboards](https://artificialanalysis.ai/image/leaderboard/text-to-image)
  - 当前榜单入口；分别查看生成、编辑与设计任务，不把历史榜单分数横向混用。
- [ArtificialAnalysis Text-to-Image Leaderboard](https://huggingface.co/spaces/ArtificialAnalysis/Text-to-Image-Leaderboard)
- [genai-showdown.specr.net](https://genai-showdown.specr.net/)
- [civitai.com](https://civitai.com/)
- [OpenModelDB](https://openmodeldb.info/)
- [RunningHub](https://www.runninghub.ai/)
