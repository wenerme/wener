---
title: Video Generation Awesome
tags:
  - Model
  - Video Generation
  - Awesome
---

# Video Generation Awesome

视频生成、视频编辑、图像到视频和视频修复资源索引。

## 2026 重点模型

查证截至 **2026-10-06**。重点补充 2026-02 以后的模型，同时保留 1 月关键版本。日期优先采用官方发布记录；上传时间与正式公告日分开记录，不把仓库创建日当成模型发布日。

- T2V：Text-to-Video，文本生成视频。
- I2V / TI2V：Image-to-Video / Text-and-Image-to-Video，图像或图文生成视频。
- V2V：Video-to-Video，视频编辑、变换或续写，具体能力按 checkpoint 判断。
- Audio-Video Generation：生成同步音视频；Audio-driven Video：以已有音频驱动画面，两者要区分。
- 开放权重表示可下载部署。表中的许可指权重；代码、编码器、VAE、超分组件还需分别核对。

| date | model | size | author | 权重许可 | 关注点 |
| --- | --- | --- | --- | --- | --- |
| 2026-08-11 | [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | 22B DiT | Lightricks | LTX-2.x Community | 同步音视频、原生多镜头、生成/编辑管线、dev 与 8 步 distilled；另配 Gemma 4 12B 编码器 |
| 2026-08-03 | [MiniMax H3 Base](https://huggingface.co/MiniMaxAI/MiniMax-H3) | 33B Transformer | MiniMax | MiniMax H3 Community，含地域限制 | FL2VA / Ref2VA：首尾帧、多模态参考、编辑、768p 立体声音视频；完整 2K 系统仅部分开放 |
| 2026-07-20 | [Cosmos3-Super-Image2Video-4Step](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video-4Step) | 64B MoT | NVIDIA | OpenMDW-1.1 | 4 步 I2V、Physical AI 与合成数据；原始 Super 系列于 05-31 发布，需较大显存 |
| 2026-07，权重上传记录 | [Wan-Dancer-14B](https://huggingface.co/Wan-AI/Wan-Dancer-14B) | 14B | Wan-AI | Apache-2.0 | 音乐、参考图与文本驱动舞蹈；专项模型，不等于 Wan3.0 通用权重 |
| 2026-05-21 | [LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) | 基座 13.6B | Meituan | MIT | 音频驱动人物、单/多音轨、长视频续写、Whisper-large-v3、8 步蒸馏 |
| 2026-03，权重上传记录 | [daVinci-MagiHuman](https://huggingface.co/GAIR/daVinci-MagiHuman) | 15B | SII-GAIR / Sand.ai | Apache-2.0，模型卡声明 | 人物中心同步音视频、多语言对白；base、distilled、540p/1080p 超分模型栈 |
| 2026-03-05 | [LTX-2.3](https://huggingface.co/Lightricks/LTX-2.3) | 22B DiT | Lightricks | LTX-2 Community | 同步音视频、T2V/I2V、dev 与 8 步 distilled、时空上采样器；重要历史版本 |
| 2026-03-04 | [Helios](https://github.com/PKU-YuanGroup/Helios) | 14B | PKU-YuanGroup | Apache-2.0 | T2V/I2V/V2V、分钟级自回归长视频、低延迟；Base、Mid、Distilled |
| 2026-01-29 | [SkyReels-V3](https://github.com/SkyworkAI/SkyReels-V3) | R2V/V2V 14B；A2V 19B | Skywork | Skywork Community | 多参考图、视频续写、镜头切换、音频驱动 Avatar；720p |

### 官方项目与开放范围

- [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2)
  - LTX-2 Community / LTX-2.x Community, Python, Audio-Video DiT
  - 2.3 与 2.5 均为 22B，区别于早期 19B 的 LTX-2。2.5 原生多镜头保持角色、环境与音色，并更新视频解码器和文本编码器；[发布记录](https://ltx.io/release-notes) 区分模型与 API 更新。
  - 2.5 分组件权重包供 ComfyUI / `ltx-pipelines` 使用；[Diffusers 权重包](https://huggingface.co/Lightricks/LTX-2.5-Diffusers) 采用另一种布局。ComfyUI INT8 文件不能直接当成 PyTorch BF16 checkpoint。
  - 权重采用社区许可。[2.3 LICENSE](https://huggingface.co/Lightricks/LTX-2.3/blob/main/LICENSE) 与 [2.5 LICENSE](https://huggingface.co/Lightricks/LTX-2.5/blob/main/LICENSE) 有营收等条件；2.5 的模型卡按组织及关联实体合计年营收 1,000 万美元划分许可路径，微调权重转让另有条件。
- [MiniMax H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)
  - [开放公告](https://www.minimax.io/news/minimax-h3-open-source)：开放 H3-Base-FL2VA、H3-Base-Ref2VA、相关 VAE 与推理材料。33B 是生成主干，还需要 Qwen3-VL-32B 编码器。
  - Base 输出 768p、4–15 秒、24fps、原生立体声音频；H3-Context-IR 与 H3-Regenerate-2K 未包含在本次开放范围。完整官方 2K 工作流仍依赖托管服务。
  - [MiniMax H3 Community License](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/LICENSE) 排除欧盟、英国、韩国、美国；商业产品/服务年营收超过 2,000 万美元等情形需另行授权。该许可不能标为 Apache-2.0 或全球自由商用。
- [NVIDIA/cosmos](https://github.com/NVIDIA/cosmos)
  - Cosmos 3 是世界模型家族；Super 为 64B MoT（32B Reasoner + 32B Generator），另有 16B Nano、4B Edge。I2V-4Step 是具体生成 checkpoint，不等于 Edge 的机器人动作模型。
  - [Super I2V](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video) 于 2026-05-31 发布，4Step 于 07-20 发布；模型卡采用 OpenMDW-1.1，推荐配置需要多卡 H100/H200 或 B200 等较大显存硬件。
- [PKU-YuanGroup/Helios](https://github.com/PKU-YuanGroup/Helios)
  - Apache-2.0, Python, Autoregressive Video Diffusion
  - [Base](https://huggingface.co/BestWishYsh/Helios-Base) 用于质量/训练，[Distilled](https://huggingface.co/BestWishYsh/Helios-Distilled) 用于速度，Mid 是蒸馏中间 checkpoint。
  - 作者报告单 H100 约 19.5 FPS、分钟级长视频；速度受 CPU、内存、驱动与配置影响。Offload 降低显存需求不能同时保证这一速度，也没有据此验证原生音频生成。
- [GAIR-NLP/daVinci-MagiHuman](https://github.com/GAIR-NLP/daVinci-MagiHuman)
  - 单流 15B Transformer 联合处理文本、视频与音频；开放 base、8 步 distilled、超分与推理代码，外部文本编码器、音频模型和 VAE 的许可另看各自来源。
  - HF [提交记录](https://huggingface.co/GAIR/daVinci-MagiHuman/commits/main) 可核对 2026-03-21～22 权重上传；正式公告日未单独确认。
  - 对 Ovi 1.1 的 80.0%、对 LTX-2.3 的 60.9% 胜率来自作者组织的 2,000 次成对评测；不改写成独立榜单第一。
- [SkyworkAI/SkyReels-V3](https://github.com/SkyworkAI/SkyReels-V3)
  - Skywork Community License, Python, Multimodal Video Generation
  - [R2V-14B](https://huggingface.co/Skywork/SkyReels-V3-R2V-14B) 接收 1–4 张参考图；[V2V-14B](https://huggingface.co/Skywork/SkyReels-V3-V2V-14B) 支持续写和镜头切换；[A2V-19B](https://huggingface.co/Skywork/SkyReels-V3-A2V-19B) 使用已有音频驱动人物。
  - [LICENSE](https://github.com/SkyworkAI/SkyReels-V3/blob/main/LICENSE) 指向 Skywork Community；后续 SkyReels-V4 的论文或托管服务不能代替 V4 权重开放证据。

### 研究预览

- [Tencent-Hunyuan/Prism](https://github.com/Tencent-Hunyuan/Prism)
  - MIT, Python, Sparse Attention, Audio-Video Generation
  - 面向原生 2K 音视频训练的动态稀疏注意力框架；截至 2026-10-06，[Prism 权重](https://huggingface.co/FrancisRing/Prism) 中可见 alpha / beta preview，支持 720p、1080p、2K。
  - 官方新闻日期仍未填完整，正式发布日期与总参数量不在此推断；Prism-pro 仍是待办，不标成 HunyuanVideo 新正式版。
  - [LICENSE](https://github.com/Tencent-Hunyuan/Prism/blob/main/LICENSE) 明确自有代码、参数和权重为 MIT；MOVA 等第三方组件维持各自许可。不能仅凭 Tencent-Hunyuan 组织名套用社区许可证。

### SOTA 与选型

- [AA-Video-T2V v2.0](https://artificialanalysis.ai/video/leaderboard/text-to-video) 区分有声与无声评测；[开放权重筛选](https://artificialanalysis.ai/video/leaderboard/text-to-video/open-weights) 也不等于 MIT/Apache-2.0 或任意地域可商用。
- 2026-10-06 有声 T2V 榜单快照中，Wan 3.0、Dreamina Seedance 2.5、MiniMax H3 等处于前列；开放权重筛选中 H3 768p 为 1138±9 Elo，LTX-2.5 Fast/Pro 为 947±10 / 944±10。这里是具体服务配置的盲评，下载权重自行部署不保证复现同一分数。
- 通用音视频与多镜头关注 LTX-2.5、H3 Base；分钟级低延迟关注 Helios；人物表演关注 MagiHuman；音频驱动数字人关注 LongCat Avatar / SkyReels A2V；世界模拟与合成数据关注 Cosmos 3。
- 比较时固定分辨率、帧率、时长、采样步数、音频条件和硬件；分别检查提示词遵循、物理/运动一致性、角色保持、对白与口型、长视频漂移。区分原生高分辨率、超分与视频修复。

### 商业模型参照

以下为产品/API 版本；截至查证日，本页未找到对应生成 checkpoint 的官方开放权重证据。

| model | 2026 更新与能力 | 官方来源 |
| --- | --- | --- |
| Wan 3.0 | 8 月商业版本；30 秒、30fps、多模态参考、原生对白/BGM/音效、视频编辑 | [Alibaba Cloud API](https://www.alibabacloud.com/help/en/model-studio/wan3-video-generation-api-reference) |
| Seedance 2.5 | 07-31 发布；30 秒叙事、多模态参考、音视频联合生成、编辑与延长；区别于 02-12 发布的 2.0 | [ByteDance 公告](https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5) |
| FLUX 3 Video | 08-04 一般可用；20 秒、多镜头、关键帧、续写、原生音频；Dev 开放权重仍在路线图 | [BFL 公告](https://bfl.ai/blog/flux-3-video) |
| Kling VIDEO 3.0 / 3.0 Omni | 2 月版本；多镜头、参考元素、同步音视频；产品配置与开放权重分别核对 | [Kling 官方指南](https://kling.ai/quickstart/klingai-video-3-omni-model-user-guide) |
| Veo 3.1 Lite | 03-31 Gemini API 付费层开放；T2V/I2V、720p/1080p、4/6/8 秒，成本档位参照 | [Google 公告](https://blog.google/innovation-and-ai/technology/ai/veo-3-1-lite/) |

## Video Models

| date | model | size | author | notes |
| --- | --- | --- | --- | --- |
| 2026-01-05 | [LTX-2](https://huggingface.co/Lightricks/LTX-2) | 19B | Lightricks | 同步音视频、T2V/I2V、LTX-2 Community |
| 2025-11-20 | [HunyuanVideo-1.5](https://huggingface.co/tencent/HunyuanVideo-1.5) | 8.3B | Tencent | T2V/I2V、Tencent Hunyuan Community；LICENSE 记 11-21 |
| 2025-10-25 | [LongCat-Video](https://huggingface.co/meituan-longcat/LongCat-Video) | 13.6B | Meituan | T2V/I2V、Video continuation、MIT |
| 2025-07-28 | [Wan2.2-T2V-A14B](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B) | 14B active / MoE | Wan-AI | T2V、Apache-2.0 |
| 2025-07-28 | [Wan2.2-TI2V-5B](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B) | 5B | Wan-AI | T2V/I2V、720p/24fps、Apache-2.0 |
| 2025-03-12 | [Open-Sora-v2](https://huggingface.co/hpcai-tech/Open-Sora-v2) | 11B | hpcai-tech | T2V、Apache-2.0 |
| 2025-02-25 | [Wan2.1-T2V-14B](https://huggingface.co/Wan-AI/Wan2.1-T2V-14B) | 14B | Wan-AI | T2V、Apache-2.0 |
| 2025-02-25 | [Wan2.1-T2V-1.3B](https://huggingface.co/Wan-AI/Wan2.1-T2V-1.3B) | 1.3B | Wan-AI | T2V、轻量部署 |
| 2024-12-01 | [HunyuanVideo](https://huggingface.co/tencent/HunyuanVideo) |  | Tencent | T2V |
| 2024-08-27 | [CogVideoX-5b](https://huggingface.co/zai-org/CogVideoX-5b) | 5B | ZhipuAI | T2V、CogVideoX License |
| 2024-08-06 | [CogVideoX-2b](https://huggingface.co/zai-org/CogVideoX-2b) | 2B | ZhipuAI | T2V、Apache-2.0、轻量 |

## Video Generation

- [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2)
  - LTX-2 系列的同步音视频生成与训练入口，支持 2.3 / 2.5 等版本。
- [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video)
  - 早期 LTX-Video 系列入口；30 FPS、1216×704 的规格不能套用到所有 LTX-2 checkpoint。
  - Text-to-Image、Image-to-Video、keyframe animation、video extension、video-to-video。
- [Wan-Video](https://github.com/Wan-Video)
  - Wan 2.1 / 2.2、T2V、I2V、VACE、FLF2V 等开放模型与项目入口。
- [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2)
  - Apache-2.0, Python, MoE, Video Diffusion
  - 2025 年通用开放基线；A14B 为 MoE 的激活参数口径，不能直接作为全部模型存储量。
- [Wan-Video/Wan-Dancer](https://github.com/Wan-Video/Wan-Dancer)
  - Apache-2.0, Python, Audio-driven Video
  - Wan 官方音乐驱动舞蹈模型，720p/30fps、分钟级生成；[权重提交记录](https://huggingface.co/Wan-AI/Wan-Dancer-14B/commits/main) 可核对 2026-07 上传，首个正式开放公告日未单独确认。
- [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora)
  - Apache-2.0, Python, Video Diffusion
  - Open-Sora 2.0 的开放训练与推理代码；11B，官方记录发布于 2025-03-12。
- [Tencent-Hunyuan/HunyuanVideo-1.5](https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5)
  - Tencent Hunyuan Community License, Python, Video Diffusion
  - [模型 LICENSE](https://huggingface.co/tencent/HunyuanVideo-1.5/blob/main/LICENSE) 为社区许可；官方仓库记录代码权重于 2025-11-20 发布，LICENSE/主系列公告记 11-21，保留两种日期口径。
- [zai-org/CogVideo](https://github.com/zai-org/CogVideo)
  - Apache-2.0, Python, Video Diffusion
  - 代码为 Apache-2.0；2B 权重为 Apache-2.0，5B 权重为 [CogVideoX License](https://huggingface.co/zai-org/CogVideoX-5b/blob/main/LICENSE)。官方记录 2B 于 2024-08-06、5B 于 08-27 开放。
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)
  - 一键生成高清短视频。
- [Olow304/memvid](https://github.com/Olow304/memvid)
  - 视频内容检索和记忆相关工具。

## Video Restoration

- SeedVR：3B / 7B，视频修复和画质增强。
- [ByteDance-Seed/SeedVR2-3B](https://huggingface.co/ByteDance-Seed/SeedVR2-3B)
- [ByteDance-Seed/SeedVR collection](https://huggingface.co/collections/ByteDance-Seed/seedvr-6849deeb461c4e425f3e6f9e)

## Avatar 与 Lip Sync

- [meituan-longcat/LongCat-Video](https://github.com/meituan-longcat/LongCat-Video)
  - MIT, Python, Video Diffusion
  - [LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5) 于 2026-05-21 发布：Whisper-large-v3 替代 Wav2Vec2，支持单/多音轨与长视频续写，8 步蒸馏。
- [Skywork/SkyReels-V3-A2V-19B](https://huggingface.co/Skywork/SkyReels-V3-A2V-19B)
  - 参考图与已有音频驱动人物；不要与生成新对白和声音的音视频模型混淆。
- [Tencent-Hunyuan/HunyuanVideo-Avatar](https://github.com/Tencent-Hunyuan/HunyuanVideo-Avatar)
  - Image-to-Video、数字人和口型驱动。
- [OmniAvatar/OmniAvatar-14B](https://huggingface.co/OmniAvatar/OmniAvatar-14B)
  - Audio-driven avatar video generation。
- [tencent-ailab/IP-Adapter](https://github.com/tencent-ailab/IP-Adapter)
  - 基于参考图的身份和风格控制。

## 视频生成平台与工作流

- [fal.ai](https://fal.ai/)
- [Replicate](https://replicate.com/)
- [Runware](https://runware.ai/)
- [Together AI](https://www.together.ai/)
- [Krea](https://www.krea.ai/)
- [Higgsfield](https://higgsfield.ai/)
- [HeyGen](https://heygen.com/)

## 相关资源

- [Artificial Analysis Video Leaderboards](https://artificialanalysis.ai/video/leaderboard/text-to-video)
  - 分别查看 T2V/I2V、有声/无声、开放权重过滤与榜单版本；记录评测配置与查证日期。
- [图像生成模型](../image/image-awesome.md)
  - 参考图生成、图像编辑、RGBA 与多图一致性。
