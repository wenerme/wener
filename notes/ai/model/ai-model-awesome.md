---
tags:
  - Model
---

# LLM Models

| Date       | Model            | Size                                                        | Context Window | Creator         | Ability                           |
| :--------- | :--------------- | :---------------------------------------------------------- | :------------- | :-------------- | --------------------------------- |
| 2025-05-28 | DeepSeek R1 0528 |
| 2025-05-20 | Gemma3n          | 8b-e2b, 8b-e4b                                              |                | Google          | Edge, PLE                         |
| 2025-04-29 | Qwen3            | 0.6b, 1.7b, 4b, 8b, 14b, 30b, 32b, 235b, 30b-a3b, 235b-a22b | 40K            | Alibaba         | MoE, Thinking                     |
| 2025-04-05 | Llama 4          | scout 109b-a17b ,marverik 400b-a17b, _2T_                   | 1M, 10M        | Meta            | MoE, Vision                       |
| 2025-03-26 | Qwen2.5-Omni     | 3B, 7B                                                      |                | Alibaba         | text, audio, image, video, speech |
| 2025-03-12 | Gemma3           | 1b, 4b, 12b, 27b                                            | 128K           | Google DeepMind | Vision                            |
| 2025-02-26 | Wan 2.1          |                                                             |                | Alibaba         | Video                             |
| 2025-02-24 | smollm2          | 135m, 360m, 1.7b                                            | 8K             | HuggingFaceTB   |
| 2025-01-28 | Qwen2.5-VL       | 3b, 7b, 32b, 72b                                            | 125K           | Alibaba         | Vision                            |
| 2025-01-28 | Qwen2.5          | 0.5b, 1.5b, 3b, 7b, 14b, 32b, 72b                           | 32K,1M         | Alibaba         |
| 2025-01-20 | DeepSeek R1      | 1.5b, 7b, 8b, 14b, 32b, 70b, 671b                           | 128K           | DeepSeek AI     |
| 2024-12-07 | Llama 3.3        | 70B                                                         | 128K           | Meta            |
| 2024-10-05 | LLaVA            | 7b, 13b, 34b                                                | 4K, 32K        |
| 2024-09-25 | Llama 3.2        | 1B, 3B, 11B, 90B                                            | 128K           | Meta            |
| 2024-07-23 | Llama 3.1        | 8B, 70.6B, 405B                                             | 128K           | Meta            |
| 2024-06-27 | Gemma 2          | 9b, 27.2b                                                   | 8K             | Google DeepMind |
| 2024-06-07 | Qwen2            | 0.5b, 1.5b, 7b, 57b (A14b), 72b                             | 32K, 64K, 128K | Alibaba         |
| 2024-04-23 | Phi-3            | 3.8b , 7b , 14b                                             | 4K, 128K       | Microsoft       |
| 2024-04-18 | Llama 3          | 8b, 70.6b                                                   | 8K, 128K       | Meta            |
| 2024-02-21 | Gemma            | 2b, 7b                                                      | 8K             | Google DeepMind |
| 2023-12-11 | Mistral          | 7b, 46.7b (8x7B MoE)                                        | 33K            | Mistral AI      |
| 2023-07-18 | Llama 2          | 6.7b, 13b, 69b                                              | 4K             | Meta            |
| 2023-02-24 | LLaMA            | 6.7B, 13B, 32.5B, 65.2B                                     | 2K             | Meta            |
| 2020-06-11 | GPT-3            | 175b                                                        | 2K             | OpenAI          |
| 2019-02-14 | GPT-2            | 1.5b                                                        | 1K             | OpenAI          |
| 2018-06-11 | GPT-1            | 117m                                                        | 512            | OpenAI          |

**Proprietary Models**

| model         | date | notes              |
| ------------- | ---- | ------------------ |
| GPT-3.5-turbo | 2022 | 4K                 |
| GPT-3.5-16k   | 2022 | 16K                |
| GPT-3.5       | 2022 | ChatGPT,570GB Text |
| GPT-4         | 2023 |
| GPT-4-32k     | 2023 |
| GPT-4V        | 2023 |
| GPT-4o        | 2023 |
| Gemini        |
| Gemini 2.0    |
| Gemini 2.5    |

- `*-pt` - Pre-Training - 预训练模型
  - 在大规模数据集上进行初始训练，学习语言模式和结构。
  - 该模型适合作为基础模型，供开发者在特定任务上进行进一步的微调。
- `*-ft`
  - Fine-tuned
- `*-it` - Instruction Tuning - 经过指令微调的模型
  - 在预训练模型的基础上，进一步针对特定任务或指令进行了微调。
  - 此版本更适合直接应用于实际任务，因为它已经针对特定用途进行了优化。
- https://ollama.com/library
- 内存占用计算方式
  - 参数x精度
  - 目前理想精度是 float16, bfloat16 - 1 个参数占用 16bit
    - 1B -> 2GB
  - 量化参数 - 常见量化 int4
    - 1B -> 0.5GB
    - https://huggingface.co/datasets/christopherthompson81/quant_exploration
    - Q4_0 - worse accuracy but higher speed
    - Q4_1 - more accurate but slower
    - q4_2, q4_3 - new generations of q4_0 and q4_1, more accurate
    - https://github.com/ggerganov/llama.cpp/discussions/406
- 7B - 8GB 内存
- 13B - 16GB 内存
- 70B - 32GB/48G 内存
- 小 context window 适用于 RAG
- Context Window
  - LLama-3 8B 8K-1M https://ollama.com/library/llama3-gradient
    - 256k context window requires at least 64GB of memory
    - 1M+ context window requires significantly more (100GB+)

---

> 按照 商业公司分类 模型之间关联性高，模型有连续性。虽然会扩展调整各种能力，但是 Base 模型的发展和用到的技术会相对连续。

- Leader board
  - https://huggingface.co/open-llm-leaderboard
  - https://lmarena.ai/
  - https://www.vellum.ai/llm-leaderboard
  - https://openrouter.ai/rankings
  - https://aider.chat/docs/leaderboards/
  - https://huggingface.co/models
- 价格/Pricing
  - https://openrouter.ai/models
  - https://ai.google.dev/gemini-api/docs/pricing
- Visual
  - [microsoft/Florence-2-large](https://huggingface.co/microsoft/Florence-2-large)
    - MIT
    - base 0.23B, large 0.77B
    - Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks
- 阿里云/Alibaba
  - [QwenLM](https://github.com/QwenLM)
    - [Qwen](https://huggingface.co/Qwen)
    - [QwQ 32B](https://huggingface.co/Qwen/QwQ-32B)
    - Qwen2 VL
      - [Qwen/QVQ-72B-Preview](https://huggingface.co/Qwen/QVQ-72B-Preview)
    - [QwenLM/Qwen2.5](https://github.com/QwenLM/Qwen2.5)
      - Qwen2.5 Coder
      - Qwen2.5 VL
      - Qwen2.5 Math
      - Collection [Qwen/Qwen2.5-VL](https://huggingface.co/collections/Qwen/qwen25-vl-6795ffac22b334a837c0f9a5)
    - [QwenLM/Qwen](https://github.com/QwenLM/Qwen)
    - Qwen3
      - 推荐参数
        - Thinking - temperature=0.6, top_p=0.95, top_k=20
        - temperature=0.7, top_p=0.8, top_k=20
        - min_p=0.0
  - [Wan-Video](https://github.com/Wan-Video)
    - [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1)
  - [HumanMLLM/R1-Omni](https://github.com/HumanMLLM/R1-Omni)
    - 阿里通义实验室
    - Explainable Omni-Multimodal Emotion Recognition with Reinforcement Learning
- deepseek
  - [deepseek-ai/Janus](https://github.com/deepseek-ai/Janus)
    - Janus-Series: Unified Multimodal Understanding and Generation Models
  - [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
    - MoE, GRPO, MLA, RL, MTP, FP8
  - [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3)
  - [deepseek-ai/DeepSeek-VL2](https://github.com/deepseek-ai/DeepSeek-VL2)
    - DeepSeek-VL2: Mixture-of-Experts Vision-Language Models for Advanced Multimodal Understanding
  - DeepSeek-V2
    - MLA
- Google
  - SigLIP2
  - SigLIP1
  - [google-deepmind/gemma](https://github.com/google-deepmind/gemma)
    - Apache-2.0, Flax, JAX
    - by Google DeepMind
    - Ultra, Pro, Flash, Nano
    - https://ai.google.dev/gemma/docs/core
    - gemma 3
      - 1B text only, 4, 12, 27B Vision + text. 14T tokens
      - 128K context length further trained from 32K. 1B is 32K.
      - Removed attn softcapping. Replaced with QK norm
      - 5 sliding + 1 global attn
      - 1024 sliding window attention
      - RL - BOND, WARM, WARP
      - 推荐参数: temperature=1.0, top_k=64, top_p=0.95, min_p=0.0
      - ⚠️注意 不支持获取对象检测的坐标
      - https://huggingface.co/collections/google/gemma-3-release-67c6c6f89c4f76621268bb6d
      - https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf
      - https://blog.google/technology/developers/gemma-3/
      - https://huggingface.co/blog/gemma3
      - https://blog.roboflow.com/gemma-3/
      - https://docs.unsloth.ai/basics/gemma-3-how-to-run-and-fine-tune
      - Ollama 3 Tools support https://github.com/ollama/ollama/issues/9680
- bytedance/字节跳动
  - ~~[ByteDance-Seed/Seed1.5-VL](https://github.com/ByteDance-Seed/Seed1.5-VL)~~
    - https://huggingface.co/spaces/ByteDance-Seed/Seed1.5-VL
  - [bytedance-seed/BAGEL](https://github.com/bytedance-seed/BAGEL)
    - [ByteDance-Seed/BAGEL-7B-MoT](https://huggingface.co/ByteDance-Seed/BAGEL-7B-MoT)
      - 图片理解、生成、编辑
      - https://huggingface.co/spaces/ByteDance-Seed/BAGEL
      - 要求
        - 1024 × 1024 Image Gen 80GB vRAM
        - 4×16G GPU 能运行
        - e.g. 1 minute on 3xRTX3090, 8 minutes on A100
        - https://github.com/ByteDance-Seed/Bagel/issues/4
      - https://github.com/neverbiasu/ComfyUI-BAGEL
- Tencent/腾讯
  - https://huggingface.co/tencent
  - 混元
  - [Tencent-Hunyuan/HunyuanVideo-Avatar](https://github.com/Tencent-Hunyuan/HunyuanVideo-Avatar)
    - Image-to-Video
    - https://arxiv.org/html/2505.20156v1
    - https://aivideo.hunyuan.tencent.com/
    - hf [tencent/HunyuanVideo-Avatar](https://huggingface.co/tencent/HunyuanVideo-Avatar)
  - hf [tencent/Hunyuan3D-2](https://huggingface.co/tencent/Hunyuan3D-2)
    - 2025-01-21
  - hf [tencent/HunyuanVideo](https://huggingface.co/tencent/HunyuanVideo)
    - Text-to-Video
    - 2024-10-03
  - [Tencent/HunyuanVideo-I2V](https://github.com/Tencent/HunyuanVideo-I2V)
    - Image-to-Video
    - 720P, vRAM 60GB - 推荐 vRAM 80GB
    - 2025-03-06
    - hf [tencent/HunyuanVideo-I2V](https://huggingface.co/tencent/HunyuanVideo-I2V)
      - for diffusers [hunyuanvideo-community/HunyuanVideo-I2V](https://huggingface.co/hunyuanvideo-community/HunyuanVideo-I2V)
- LLaMA based
  - Vicuna
- [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA)
  - LLaVA (Large Language and Vision Assistant)
  - Vicuna + CLIP
- OpenGVLab
  - [OpenGVLab/InternVL3-8B](https://huggingface.co/OpenGVLab/InternVL3-8B)
- command-a
  - 主要用于 Agent, 工具调用
  - https://cohere.com/blog/command-a
  - https://huggingface.co/CohereForAI/c4ai-command-a-03-2025
- llama2
  - 7B, 13B, 70B
- uncensored/abliterated/CensorTune
  - [Sumandora/remove-refusals-with-transformers](https://github.com/Sumandora/remove-refusals-with-transformers)
  - https://huggingface.co/huihui-ai
  - https://huggingface.co/datasets/Guilherme34/uncensor
  - https://huggingface.co/models?search=uncensored
  - https://erichartford.com/uncensored-models
  - https://www.pixiv.net/novel/show.php?id=21039830
    - https://huggingface.co/a686d380/rwkv-5-h-world
- [microsoft/BitNet](https://github.com/microsoft/BitNet)
  - MIT, C++, Python
  - by Microsoft
  - [HN](https://news.ycombinator.com/item?id=41877609)
- vicuna
- mistral
- mixtral
- Flan
- Alpaca
- GPT4All
- Chinese LLaMA
- Vigogne (French)
- LLaMA
- Databricks Dolly 2.0
  - https://huggingface.co/databricks/dolly-v2-12b
  - https://github.com/databrickslabs/dolly/tree/master/data
- https://huggingface.co/stabilityai/stable-diffusion-2
- [togethercomputer/OpenChatKit](https://github.com/togethercomputer/OpenChatKit)
- [Alpaca](./alpaca.md)
  - 基于 LLaMA + 指令训练
- [FlagAI-Open/FlagAI](https://github.com/FlagAI-Open/FlagAI)
- [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI)
- [BlinkDL/ChatRWKV](https://github.com/BlinkDL/ChatRWKV)
  - ChatGPT like
  - RWKV (100% RNN)
- [nebuly-ai/nebullvm](https://github.com/nebuly-ai/nebullvm)
- [FMInference/FlexGen](https://github.com/FMInference/FlexGen)
- [EssayKillerBrain/WriteGPT](https://github.com/EssayKillerBrain/WriteGPT)
  - GPT-2
- [ymcui/Chinese-LLaMA-Alpaca](https://github.com/ymcui/Chinese-LLaMA-Alpaca)
- https://www.promptingguide.ai/zh/models/collection
- [Releasing 3B and 7B RedPajama-INCITE family of models including base, instruction-tuned & chat models](https://www.together.xyz/blog/redpajama-models-v1)
- RedPajama-Data-v2
  - https://together.ai/blog/redpajama-data-v2
  - https://github.com/togethercomputer/RedPajama-Data
  - https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2
  - en, de, fr, es, it
- [hysts/ControlNet-v1-1](https://huggingface.co/spaces/hysts/ControlNet-v1-1)
- ggml
  - [ggerganov/ggml](https://github.com/ggerganov/ggml)
    - MIT, C
- .pth - PyTorch
  - checklist.chk - MD5
  - params.json - `{"dim": 4096, "multiple_of": 256, "n_heads": 32, "n_layers": 32, "norm_eps": 1e-06, "vocab_size": -1}`
  - [Saving & Loading Models](https://pytorch.org/tutorials/beginner/saving_loading_models.html)
- https://medium.com/geekculture/list-of-open-sourced-fine-tuned-large-language-models-llm-8d95a2e0dc76
- https://erichartford.com/uncensored-models
- https://huggingface.co/spaces/facebook/seamless_m4t
- https://github.com/LinkSoul-AI/Chinese-Llama-2-7b
- Jina AI 8k text embedding
  - https://news.ycombinator.com/item?id=38020109
  - https://huggingface.co/jinaai/jina-embeddings-v2-base-en
  - https://huggingface.co/jinaai/jina-embeddings-v2-small-en
- Models
  - https://civitai.com/
  - https://huggingface.co/models
  - https://www.modelscope.cn/models


```bash
# AVX = 1 | AVX2 = 0 | AVX512 = 0 | FMA = 0 | NEON = 0 | ARM_FMA = 0 | F16C = 1 | FP16_VA = 0 | WASM_SIMD = 0 | BLAS = 0 | SSE3 = 1 | VSX = 0 |
grep avx /proc/cpuinfo --color # x86_64
```

## 中文 {#chinese}

- Qwen2
- [LlamaFamily/Llama-Chinese](https://github.com/LlamaFamily/Llama-Chinese)
- [UnicomAI/Unichat-llama3-Chinese](https://github.com/UnicomAI/Unichat-llama3-Chinese)
  - 联通 llama3 微调
- https://github.com/datawhalechina/self-llm

## Fine-tuning {#fine-tuning}

- https://huggingface.co/ValueFX9507/Tifa-Deepsex-14b-CoT-GGUF-Q4

## Voice

- TTS, STT, ASR, Dialogue, Audio
- [VITA-MLLM/VITA-Audio](https://github.com/VITA-MLLM/VITA-Audio)
  - ASR, TTS, SpokenQA
  - https://huggingface.co/spaces/shenyunhang/VITA-Audio
- [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)
  - MIT, Python
  - 开源版本只支持 en
  - hf [ResembleAI/chatterbox](https://huggingface.co/ResembleAI/chatterbox)
- [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice)
  - 中文、英文、日文、韩文、中文方言（粤语、四川话、上海话、天津话、武汉话等）
  - hf [FunAudioLLM/CosyVoice2-0.5B](https://huggingface.co/FunAudioLLM/CosyVoice2-0.5B)
- [yl4579/HiFTNet](https://github.com/yl4579/HiFTNet)
- [THUDM/GLM-4-Voice](https://github.com/THUDM/GLM-4-Voice)
  - 中英语音对话模型
  - https://huggingface.co/THUDM/glm-4-voice-tokenizer
  - https://huggingface.co/THUDM/glm-4-voice-decoder
    - 基于 CosyVoice 重新训练的支持流式推理的语音解码器，将离散化的语音 Token 转化为连续的语音输出。
- https://huggingface.co/datasets/gpt-omni/VoiceAssistant-400K
- [shivammehta25/Matcha-TTS](https://github.com/shivammehta25/Matcha-TTS)
- [modelscope/FunASR](https://github.com/modelscope/FunASR)
  - MIT, Python
  - ASR, VAD
- [nari-labs/dia](https://github.com/nari-labs/dia)
  - text to dialogue
  - 只支持 en
  - https://huggingface.co/spaces/nari-labs/Dia-1.6B

## MLLM

- Multimodal Large Language Model - 多模态大语言模型
- 结构: 视觉编码器 + 投影器 + 语言模型
- Vision Model
  - ViT
- Language Model
- Projector / Vision-Language Adapter
  - 将视觉模型提取出的图像特征与语言模型的表示空间对齐
  - Cross-Attention Module - 交叉注意力模块

## Vision

- Document OCR - 文档 OCR
- Handwriting OCR - 手写 OCR
- Visual QA / Image QA - 图片 QA
- Visual Reasoning - 图像推理
- Image Classification - 图片分类
- Document Understanding - 文档理解
- Video Understanding - 视频理解
- Object Detection - 对象识别
- Object Counting - 对象计数
- Agent - 屏幕理解操作
- Object Grounding - 物体定位
  - 返回 Bounding Box 坐标
  - visual grounding poor performance after fine-tuning [2U1/Qwen2-VL-Finetune#77](https://github.com/2U1/Qwen2-VL-Finetune/issues/77)

---

- Qwen2 VL
  - factor=28
- SmolVLM 256M
  - 64 image tokens per 512px image
  - https://huggingface.co/spaces/webml-community/smolvlm-realtime-webgpu
    - 500M, SmolVLM
    - https://www.reddit.com/r/LocalLLaMA/comments/1kmi6vl
- 参考
  - https://blog.roboflow.com/multimodal-vision-models/

## Coding

- [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)
- [block/goose](https://github.com/block/goose)
- https://www.swebench.com/
- 模型
  - devstral 24B
    - https://mistral.ai/news/devstral
    - https://ollama.com/library/devstral

## Video

- 整个流程
- Flow
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)
  - 一键生成高清短视频
  - https://huggingface.co/spaces/chaowenguo/avfwae
- [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video)
  - 30 FPS, 1216×704
  - text-to-image, image-to-video, keyframe-based animation, video extension, video-to-video
- [Wan-Video](https://github.com/Wan-Video)
  - https://huggingface.co/spaces/multimodalart/wan2-1-fast

<!--
make this image come alive, cinematic motion, smooth animation
-->

## Generation

- Text to Image, Video, Audio
- Image Inpainting
- Image Variation
- Text-guided
- Upscale, Super Resolution
- [huggingface/diffusers](https://github.com/huggingface/diffusers)
  - [bghira/SimpleTuner](https://github.com/bghira/SimpleTuner)
  - [ostris/ai-toolkit](https://github.com/ostris/ai-toolkit)
- FLUX.1
  - https://playground.bfl.ai/
  - collection [FLUX.1](https://huggingface.co/collections/black-forest-labs/flux1-679d013aee236841c0e9d38a)
  - hf [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev)
    - 12B
  - FLUX.1 Kontext
    - distilled variant of Kontext
    - 目前生成的图有点糊
    - https://bfl.ai/models/flux-kontext
    - https://replicate.com/black-forest-labs/flux-kontext-pro
    - https://replicate.com/flux-kontext-apps
    - https://news.ycombinator.com/item?id=44128322
  - https://huggingface.co/lodestones/Chroma
- https://genai-showdown.specr.net/

<!--
**Video Generation**
make this image come alive, cinematic motion, smooth animation
The creature from the image starts to move

**Image Generation**

vast snowy grassland as the background and a few snowflakes gently falling

vast forest grassland background, super resolution

Make this a 90s cartoon

make this a photo

Using this style, a panda astronaut riding a unicorn

Replace 'joy' with 'Pro'

Using this style, a bunny, a dog and a cat are having a tea party seated around a small white table

Change the background to a beach while keeping the person in the exact same position, scale, and pose. Maintain identical subject placement, camera angle, framing, and perspective. Only replace the environment around them

Change the background to vast snowy grassland and a few snowflakes gently falling while keeping the person in the exact same position, scale, and pose. Maintain identical subject placement, camera angle, framing, and perspective. Only replace the environment around them
-->


**问题领域**

- Prompt adherence（提示词遵循度）
- Generation quality（生成质量）
- Instructiveness（可指导性）
- Consistency of styles, characters, settings, etc.（风格、角色、设置的一致性）
- Deliberate and exact intentional posing of characters and set pieces（角色和场景元素的精确姿态和故意摆放）
- Compositing different images or layers together（将不同图像或图层组合在一起）
- Relighting（重新打光）
- Posing built into the model. No ControlNet hacks.（姿态控制内置于模型中，无需ControlNet等“黑科技”）
- References built into the model. No IPAdapter, no required character/style LoRAs, etc.（参考功能内置于模型中，无需IPAdapter、角色/风格LoRA等）
- Ability to address objects, characters, mannequins, etc. for deletion / insertion.（能够针对物体、角色、人体模型等进行删除/插入操作）
Ability to pull sources from across multiple images with or without "innovation" / change to their pixels.（能够从多张图片中提取来源，无论是否对其像素进行“创新”/更改）
Fine-tunable (so we can get higher quality and precision)（可微调，以获得更高的质量和精度）
