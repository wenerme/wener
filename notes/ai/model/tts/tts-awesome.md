---
title: TTS Awesome
tags:
  - Awesome
---

# TTS Awesome

- TTS - Text-to-Speech - 语音合成
- 常见场景
  - Voice agent：关注 streaming、time to first audio、可打断与并发。
  - 朗读/旁白：关注自然度、长文本稳定性、发音控制和段落一致性。
  - 本地辅助功能：关注 CPU、内存、模型大小、离线运行和平台支持。
  - Voice cloning：关注 speaker similarity、参考音频要求、授权与滥用风险。

## 快速选择

- 快速脚本、原型、中文朗读：优先试 Edge TTS，voice 多、无需 API key，但必须联网且没有正式 API/SLA 保证。
- 本地轻量、CPU/边缘设备：评估 Kokoro、Piper 或 MeloTTS。
- 中文综合质量、voice cloning 和 voice design：优先评估 Qwen3-TTS。
- 中文/多语种、streaming、zero-shot voice cloning：评估 CosyVoice。
- 角色、剧情、细粒度情绪表演：评估 Fish Audio S2 Pro；模型为 research/non-commercial license。
- 中文情绪配音：评估 IndexTTS2；当前 release 不应假设精确时长控制已经可用。
- 多语种、表现力和 cross-language voice cloning：评估 Chatterbox。
- 研究型 zero-shot voice cloning：评估 F5-TTS；官方预训练权重为 CC-BY-NC-4.0，不适合直接用于商业场景。

## Edge TTS vs Local TTS

- “超过 Edge TTS”取决于场景，不能只比较 demo 的单句自然度。
  - Qwen3-TTS、CosyVoice、Fish Audio S2 Pro、IndexTTS2 在 voice cloning、情绪、音色设计和表演力上有明显能力优势。
  - Edge TTS 在免部署、固定 voice 一致性、多语言覆盖、数字/日期/符号规范化和低运维成本上仍然很强。
  - 本地模型的 streaming 是 model/runtime/server 的组合能力；上游支持 streaming，不代表当前使用的 runtime 已暴露 streaming API。

| Model | 主要优势 | 中文 | Upstream streaming | 部署成本 |
| --- | --- | --- | --- | --- |
| Edge TTS | 免部署、固定 voice、文本规范化成熟 | 强 | 是，online service | 低 |
| Qwen3-TTS | 综合质量、3 秒克隆、voice design、instruction control | 强 | 是 | 中高 |
| Fun-CosyVoice 3 | 中文/方言、zero-shot cloning、bi-streaming | 强 | 是 | 中高 |
| Fish Audio S2 Pro | 情绪、角色表演、multi-speaker、细粒度 tag | 强 | 是 | 高 |
| IndexTTS2 | 中英 voice cloning、音色与情绪解耦 | 强 | 非主要目标 | 中高 |

- 推荐组合
  - 普通播报、系统通知、无需个性化：Edge TTS。
  - 中文对话、定制音色：Qwen3-TTS 或 CosyVoice。
  - 角色、剧情、情绪配音：Fish Audio S2 Pro。
  - 中文情绪配音：IndexTTS2。
  - 生产系统可保留 Edge TTS 作为无需本地 GPU 的 fallback。

```text
简单播报、系统通知、无个性化要求
    → Edge TTS

中文对话、声音克隆、定制音色
    → Qwen3-TTS / CosyVoice 3

剧情、角色、情绪配音
    → Fish Audio S2 Pro

视频时长匹配
    → IndexTTS2（确认 duration control 已在所用 release/runtime 启用）
```

## Edge TTS

- `edge-tts` 是 Microsoft Edge online text-to-speech service 的第三方 Python client。
  - 不需要安装 Edge 或 Windows，也不需要 API key。
  - 支持列出 voice、调整 rate/volume/pitch、输出 MP3 和 word-boundary subtitle。
  - 适合个人脚本、临时生成、PoC 和非关键任务。
- 限制
  - 必须联网；接口、认证方式、voice 和限流可能随 Edge 服务变化。
  - 不是 Azure AI Speech SDK，也不是带 SLA 的正式 Microsoft TTS API。
  - custom SSML 已不可用，只能使用 Edge 允许的 voice/prosody 组合。
  - Client 开源许可证不代表 Microsoft online service、voice 或生成内容的使用条款。

```bash
pipx install edge-tts

# 查看 voice
edge-tts --list-voices

# 中文语音，同时输出音频和字幕
edge-tts \
  --voice zh-CN-XiaoxiaoNeural \
  --text '你好，这是 Edge TTS。' \
  --write-media hello.mp3 \
  --write-subtitles hello.srt

# 调整语速、音量、音高
edge-tts \
  --voice zh-CN-XiaoxiaoNeural \
  --rate=+10% \
  --volume=+0% \
  --pitch=+0Hz \
  --text '调整后的语音。' \
  --write-media tuned.mp3
```

## Pipeline

- 传统/模块化 TTS
  - Text normalization：数字、日期、缩写和特殊符号规范化。
  - G2P / phonemization：grapheme 转 phoneme，处理发音与多音字。
  - Acoustic model：从文本/音素生成 mel-spectrogram 或其他声学表示。
  - Vocoder：把声学表示转换为 waveform。
- Speech-token / LLM TTS
  - 使用 speech tokenizer 和 language model 生成离散 speech token，再由 decoder/vocoder 还原音频。
  - 更容易统一 zero-shot cloning、instruction、emotion 和跨语言能力，但通常更依赖 GPU 和生成稳定性控制。

## 能力边界

- Fixed/predefined voice
  - 使用项目或服务提供的固定 speaker；部署简单，身份和质量更稳定。
- Multi-speaker
  - 从训练时已有的 speaker 集合中选择，不等同于克隆任意声音。
- Zero-shot voice cloning
  - 根据短参考音频模仿 speaker identity；需要单独评估口音迁移、内容泄漏和授权。
- Voice conversion
  - 把已有语音转换成目标 speaker，不是从文本直接生成语音。
- Streaming TTS
  - 文本尚未完整输入时开始生成，或逐 chunk 输出音频；不能只看整体 real-time factor，还要看首包延迟和 chunk 连续性。

## 选型与评估

- 语言与发音
  - 中文/英文混读、多音字、数字日期、专有名词、方言、口音、phoneme/SSML 控制。
- 交互延迟
  - time to first audio、real-time factor、音频 chunk 大小、streaming 稳定性、并发和 cold start。
- 音质
  - MOS/主观偏好、intelligibility、ASR WER/CER、prosody、speaker similarity、噪声和 hallucination/repetition。
- 长文本
  - 段落衔接、speaker drift、漏字/重复、停顿、标点和最大输入长度。
- 运行环境
  - online/offline、CPU/GPU、VRAM/内存、模型大小、ONNX/mobile/Web 支持。
- 许可
  - 分别核对 source code、model weights、voice/checkpoint、训练数据和 online service terms。
- Voice cloning 安全
  - 只使用获得明确授权的声音；保留来源/同意记录，考虑 watermark、审计和滥用防护。
- 最终应使用目标文本、目标语言和目标设备做盲听与延迟测试，不直接采用项目 README 的单项 benchmark 排名。

## 参考

### Edge TTS

- [rany2/edge-tts](https://github.com/rany2/edge-tts)
  - LGPL-3.0 (main), MIT (SRT composer), Python
  - Microsoft Edge online TTS 的 Python module/CLI；无需 API key，支持 voice list、rate/volume/pitch、media 和 subtitle 输出。
- [Azure Speech language and voice support](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts)
  - 需要正式 API、区域、配额、SSML 和 SLA 时，应使用 Azure AI Speech，并按官方 pricing/terms 部署。

### 本地轻量

- [hexgrad/kokoro](https://github.com/hexgrad/kokoro)
  - Apache-2.0, JavaScript, Python
  - Kokoro-82M 的 inference library；模型和权重为 Apache-2.0，体积小，支持英文、中文、日文等语言，适合本地和成本敏感场景。
  - 使用预置 voice 或 voice tensor，不是根据任意参考音频进行 zero-shot voice cloning。
- [OHF-Voice/piper1-gpl](https://github.com/OHF-Voice/piper1-gpl)
  - GPL-3.0, C++, Python, ONNX
  - 当前维护的 Piper，面向快速、本地、CPU TTS，内置 `espeak-ng` phonemization，提供 CLI、Python/C++ 和 HTTP API。
  - 支持固定 voice、multi-speaker voice 和训练新 voice，不是参考音频 zero-shot cloning。
  - 旧仓库 `rhasspy/piper` 已归档；每个 Piper voice 的 `MODEL_CARD` 可能有不同许可证，必须单独核对。
- [myshell-ai/MeloTTS](https://github.com/myshell-ai/MeloTTS)
  - MIT, Python, PyTorch
  - 支持 English、Spanish、French、Chinese、Japanese、Korean；中文 voice 支持中英混读，可在 CPU 上实时推理。
  - 定位为本地 fixed-speaker TTS，没有官方增量 streaming API 或 zero-shot voice cloning。

### 多语种与 Voice Cloning

- [QwenLM/Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS)
  - Apache-2.0, Python, PyTorch
  - 覆盖 10 种主要语言；Base 支持约 3 秒参考音频 voice cloning，CustomVoice 提供预置 speaker，VoiceDesign 支持自然语言描述音色。
  - 上游支持 streaming，并报告最低约 97 ms 端到端延迟；实际能力和 TTFA 取决于所用 runtime/server，不应直接套用到其他实现。
- [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice)
  - Apache-2.0, Python, PyTorch
  - 支持 multilingual/cross-lingual zero-shot voice cloning、instruction、中文方言/口音，以及 text-in/audio-out bi-streaming。
  - 当前 Fun-CosyVoice 3.0 覆盖 9 种常用语言和 18+ 中文方言/口音；具体 checkpoint 仍需核对 model card。
- [fishaudio/fish-speech](https://github.com/fishaudio/fish-speech)
  - Fish Audio Research License, Python, PyTorch, SGLang
  - Fish Audio S2 Pro 支持 80+ 语言、voice cloning、multi-speaker/multi-turn，以及 `[whisper]`、`[excited]`、`[angry]` 等细粒度情绪/韵律 tag。
  - Research/non-commercial use 可免费使用；商业使用需要另行获得 Fish Audio 授权。开源本地模型效果不能直接等同于官方 hosted service。
- [index-tts/index-tts](https://github.com/index-tts/index-tts)
  - Bilibili Model Use License, Python, PyTorch
  - IndexTTS2 面向中英 zero-shot voice cloning 和情绪控制，可独立控制 speaker timbre 与 emotion。
  - 精确 duration control 是模型设计重点，但上游 README 标明当前 release 尚未启用；年收入超过 10 亿人民币或月活超过 1 亿需要单独授权。
- [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)
  - MIT, Python, PyTorch
  - Chatterbox Multilingual V3 支持 23+ 语言和 cross-language voice cloning；Turbo 面向低延迟英文 voice agent，并支持 paralinguistic tags。
  - 开源本地 `generate()` 返回完整 waveform；不要把托管服务的低延迟指标直接视为本地增量 streaming 能力。
  - 默认生成音频包含 Perth neural watermark；参考音频语言会影响 cross-language accent。
- [SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)
  - MIT (code), CC-BY-NC-4.0 (pretrained weights), Python, PyTorch
  - 基于 flow matching 的 zero-shot TTS/voice cloning，官方 checkpoint 支持中英文。
  - 提供长文本 chunk generation 和 socket audio chunk stream，但不等同于 text-in/audio-out 原生双向 streaming。
  - 代码可按 MIT 使用，但官方预训练模型因训练数据采用 CC-BY-NC，商业部署需另行解决权重和数据授权。

### Hosted TTS

- [Azure AI Speech](https://azure.microsoft.com/products/ai-services/ai-speech)
- [OpenAI Text to speech](https://platform.openai.com/docs/guides/text-to-speech)
- [ElevenLabs Text to Speech](https://elevenlabs.io/text-to-speech)
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech)
- [Amazon Polly](https://aws.amazon.com/polly/)

### Demo 与 Benchmark

- [TTS Arena](https://huggingface.co/spaces/TTS-AGI/TTS-Arena)
- [TTS Arena V2](https://huggingface.co/spaces/TTS-AGI/TTS-Arena-V2)
- [TTSDS2: Resources and Benchmark for Evaluating Human-Quality Text to Speech Systems](https://arxiv.org/abs/2506.19441)

### Runtime

- [0xShug0/audio.cpp](https://github.com/0xShug0/audio.cpp)
  - 基于 ggml 的纯 C++ audio inference runtime；支持 Qwen3-TTS、IndexTTS2、VoxCPM2、VibeVoice 等，但当前没有 CosyVoice 3 或 Fish Audio S2 Pro。
  - 模型上游能力与 runtime integration 能力要分开核对，例如上游 Qwen3-TTS 支持 streaming，而 audio.cpp 当前 Qwen3-TTS path 仍为 offline。

### Awesome

- [wildminder/awesome-ai-voice](https://github.com/wildminder/awesome-ai-voice)
  - MIT, Markdown
  - 按发布时间整理 TTS、voice cloning 和 music generation 项目，包含 language、streaming 和 license 对比，适合发现新模型。
  - 表格 metadata 仍需回到官方仓库/model card 复核；例如其 IndexTTS2 license 当前标记与上游 Bilibili Model Use License 不一致。
