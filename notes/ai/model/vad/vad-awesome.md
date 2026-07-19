---
title: VAD Awesome
tags:
  - Awesome
---

# VAD Awesome

- VAD - Voice Activity Detection - 语音活动检测
  - 对音频帧判断 speech / non-speech，常用于过滤静音、切分 ASR 输入、触发录音和辅助 endpointing。
  - VAD 只判断“是否有人声”，不理解一句话是否说完；语音 Agent 通常还要结合 silence/hangover、STT endpointing 或 semantic turn detection。
- 常见输出
  - frame-level speech probability / boolean
  - speech segment timestamps
  - speech start / speech end event

## 快速选择

- 通用本地与服务端：优先评估 Silero VAD，生态成熟，支持 PyTorch/ONNX，便于跨语言部署。
- 极低延迟、C/Web/mobile：评估 TEN VAD；部署前必须检查其 Apache 2.0 附加条件是否适用。
- 多语言、歌声、音乐与 Audio Event Detection：评估 FireRedVAD。
- 中文 ASR pipeline：评估 FunASR FSMN-VAD，可与 ASR、标点和 speaker diarization 组合。
- 极小依赖、传统 DSP、固定帧实时处理：评估 WebRTC VAD；在 speech/noise 混合场景中需重点验证误判。
- 浏览器：使用基于 Silero VAD + ONNX Runtime Web 的封装，或 TEN VAD WASM。

## VAD vs Turn Detection

- VAD
  - 根据音频判断 speech/non-speech，不理解语言和对话上下文。
- Endpointing
  - 在 VAD/STT 信号上增加 silence duration、hangover、punctuation 等规则，判断 utterance 何时结束。
- Semantic turn detection
  - 使用音频语调/节奏、partial transcript 或多模态上下文判断用户是否真正说完，减少停顿处抢话，同时控制响应延迟。
- Speaker diarization
  - 判断“谁在何时说话”，与“是否有人说话”是不同任务；可以消费 VAD/SAD 结果，也可以由统一模型联合预测。
- Voice agent 常见组合
  - VAD 检测 speech start/end。
  - STT 持续生成 partial transcript。
  - Endpointing/turn detector 综合静音与语义决定何时提交用户 turn。
  - Interruption logic 决定用户何时可以打断 TTS。

## 评估

- 不要直接比较不同项目 README 中的单一 F1/AUC；dataset、frame size、threshold、smoothing 和后处理不同会显著影响结果。
- Frame-level
  - precision / recall / F1、ROC-AUC、false positive rate、false negative rate。
- Segment/endpoint-level
  - speech onset latency、endpoint latency、premature cutoff、missed endpoint、segment fragmentation。
- Runtime
  - real-time factor、单帧延迟、CPU/内存、cold start、并发、模型大小。
- 输入与环境
  - sample rate、frame/hop size、噪声、回声、远场、音乐、歌声、重叠说话、多语言和口音。
- 后处理参数
  - threshold、minimum speech/silence duration、speech padding、hangover、maximum segment duration。
- 应使用目标场景录音建立测试集，并同时评估准确率与用户感知延迟。

## 参考

### Neural VAD

- [snakers4/silero-vad](https://github.com/snakers4/silero-vad)
  - MIT, Python, PyTorch, ONNX
  - 支持 8 kHz/16 kHz；项目提供 Python、C++、Rust、Go、Java、C# 和浏览器等部署示例。
  - 适合本地实时语音、服务端切分和跨平台 ONNX 推理。
- [TEN-framework/ten-vad](https://github.com/TEN-framework/ten-vad)
  - Custom license (Apache-2.0 + additional conditions), C, ONNX, WASM
  - 面向实时 voice agent 的 frame-level VAD，输入为 16 kHz，推荐 10/16 ms hop；提供 C、Python、Java、Go、Web、Android 和 iOS 集成。
  - LICENSE 限制与 Agora 竞争的部署方式，不能只按标准 Apache-2.0 理解。
- [FireRedTeam/FireRedVAD](https://github.com/FireRedTeam/FireRedVAD)
  - Apache-2.0, Python, PyTorch
  - 支持 non-streaming/streaming VAD 和 non-streaming Audio Event Detection，覆盖 100+ 语言，并检测 speech、singing、music 等音频事件。
  - 输入为 16 kHz 16-bit mono PCM；仓库提供约 2.2 MB 的 streaming/non-streaming 模型。
- [modelscope/FunASR](https://github.com/modelscope/FunASR)
  - MIT, Python, PyTorch
  - `fsmn-vad` 可独立使用，也可与 Paraformer/SenseVoice、标点恢复和 CAM++ speaker model 组成 pipeline，适合中文语音处理。
  - Toolkit 使用 MIT；预训练模型权重许可证按各 model card 单独确认。

### WebRTC VAD

- WebRTC VAD 是传统低成本 frame classifier，提供 0-3 aggressiveness mode；适合资源受限和固定帧实时处理。
- 输入通常为 16-bit mono PCM，sample rate 为 8/16/32/48 kHz，frame 长度必须为 10/20/30 ms。
- [wiseman/py-webrtcvad](https://github.com/wiseman/py-webrtcvad)
  - MIT (binding), BSD-3-Clause (WebRTC code), C, Python
  - Google WebRTC VAD 的 Python binding，适合快速验证和服务端预处理。
- [dpirch/libfvad](https://github.com/dpirch/libfvad)
  - BSD-3-Clause, C
  - 从 WebRTC Native Code 提取的独立 C library，适合嵌入式或不需要完整 WebRTC stack 的环境。

### Speech analysis

- [pyannote/pyannote-audio](https://github.com/pyannote/pyannote-audio)
  - MIT, Python, PyTorch
  - 以 speaker diarization 为核心，提供 speech activity detection、overlapped speech detection、speaker change detection 和 speaker embedding 等组件；更适合离线/分析场景，不是低延迟 voice-agent VAD 的默认首选。
  - 部分 Hugging Face 模型需要接受使用条件和提供 token，代码许可证不等于模型许可证。

### Runtime 与平台封装

- [k2-fsa/sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)
  - Apache-2.0, C++, ONNX Runtime
  - 提供 Silero VAD 及 VAD + ASR pipeline，覆盖 C/C++、Python、Go、JavaScript、WebAssembly、Android、iOS、HarmonyOS 和嵌入式平台。
- [ricky0123/vad](https://github.com/ricky0123/vad)
  - ISC, TypeScript, ONNX Runtime Web, Web Audio API
  - 浏览器端 Silero VAD（MIT）封装，可直接产生 speech start/end 和音频片段；项目已停止维护 Node.js 支持，聚焦 browser use case。
- [gkonovalov/android-vad](https://github.com/gkonovalov/android-vad)
  - MIT, C, Kotlin, Android
  - Android VAD library，统一封装 WebRTC VAD、Silero VAD 和 YamNet VAD，适合移动端对比与集成。

### Benchmark

- [Picovoice/voice-activity-benchmark](https://github.com/Picovoice/voice-activity-benchmark)
  - Apache-2.0, Python
  - 使用 LibriSpeech speech 与 DEMAND noise 对 VAD engine 进行 frame-level ROC 和 runtime 对比；适合作为评估框架参考，不应替代业务数据集。
- [Silero VAD Quality Metrics](https://github.com/snakers4/silero-vad/wiki/Quality-Metrics)
  - 展示 threshold、ROC-AUC、frame accuracy 和多种 noisy speech/noise dataset 的评估方式。
- [TEN VAD testset](https://github.com/TEN-framework/ten-vad/tree/main/testset)
  - TEN VAD 仓库提供的标注测试集与对比脚本。

### 文档与论文

- [LiveKit: Turns overview](https://docs.livekit.io/agents/logic/turns/)
- [LiveKit turn detector](https://docs.livekit.io/agents/logic/turns/turn-detector/)
- [Semantic VAD: Low-Latency Voice Activity Detection for Speech Interaction](https://arxiv.org/abs/2305.12450)
- [Improved End-of-Query Detection for Streaming Speech Recognition](https://www.isca-archive.org/interspeech_2017/shannon17_interspeech.html)
