---
title: MiniMax H3
tags:
  - AI
  - Model
  - Video Generation
---

# MiniMax H3

- [官方仓库](https://github.com/MiniMax-AI/MiniMax-H3)
- [官方模型卡](https://huggingface.co/MiniMaxAI/MiniMax-H3)
- [视频模型索引](video/video-awesome.md)

## 基座与完整系统

- H3-Base 生成 768p 音视频；完整系统还包含上下文处理 H3-Context-IR 与 H3-Regenerate-2K。
- FL2VA 接受零、一或两张图，分别用于文本、首帧/尾帧、首尾帧条件生成。
- Ref2VA 使用图像、视频和音频作为多模态参考，不等于精确锁定首尾帧。
- 开放的 H3-Base 不等于完整托管流程；H3-Context-IR 未包含在开放发布中。
- 部署时分别核对基座、编码器、VAE、量化包和运行框架的兼容性及许可；不能仅凭模型名称判断可商用范围。

## 360° Orbit LoRA

- [pablodawson/MiniMax-H3-360-Orbit-LoRA](https://huggingface.co/pablodawson/MiniMax-H3-360-Orbit-LoRA)
- 针对 FL2VA：同一张图片同时作为首尾帧，生成围绕静止场景的环绕镜头。
- 作者使用 FL2VA pruned，推荐 Comfy-Org 的 int8 ConvRot 重打包权重，不是 Ref2VA 适配器。
- 作者推荐：768 × 768、73 帧、24 fps、28 steps、LoRA strength 1.0，关闭音频。
- 基座经过 guidance distillation，无 CFG 或 negative prompt。
- 权重以 ai-toolkit 的 minimax_h3 扩展训练和测试，键名采用 ComfyUI 的 diffusion_model.* 形式。
- 训练用 adapter 不需要用于推理；作者的 A100 80 GB 训练配置不是最低推理显存要求。
- 训练数据仅 28 段以人物为中心的方形片段；其他主体、宽高比、时长未经验证，仍可能出现眨眼或轻微运动。
- 许可证为 MiniMax H3 Community License Agreement；使用前核对模型卡中的当前条款。
