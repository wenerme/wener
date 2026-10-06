---
title: ASR Awesome
tags:
  - Model
  - ASR
  - STT
  - Awesome
---

# ASR Awesome

ASR（Automatic Speech Recognition）和 STT（Speech-to-Text）模型、工具与评估资源索引。

## 基础概念

- STT / Speech-to-Text / ASR / Automatic Speech Recognition / Speech Recognition。
- 常与 VAD、endpointing、标点恢复和 speaker diarization 组成语音处理 pipeline。
- 流式识别重点关注首 token 延迟、partial transcript、稳定性和最终修正。

## Models

- [modelscope/FunASR](https://github.com/modelscope/FunASR)
  - MIT，Python，PyTorch；包含 ASR、VAD、标点和说话人相关组件。
- Voxtral
  - 支持中文。
  - [Voxtral Mini 3B](https://huggingface.co/mistralai/Voxtral-Mini-3B-2507)
  - [Voxtral Small 24B](https://huggingface.co/mistralai/Voxtral-Small-24B-2507)
  - [Transformers Voxtral 文档](https://huggingface.co/docs/transformers/main/en/model_doc/voxtral)
- [NVIDIA Canary-1B-Flash](https://huggingface.co/nvidia/canary-1b-flash)
  - 语言覆盖需按模型卡确认，原有记录注明不含中文。

## VAD 与辅助组件

- [Silero VAD](https://github.com/snakers4/silero-vad)
- [FunASR FSMN-VAD](https://github.com/modelscope/FunASR)
- [pyannote-audio](https://github.com/pyannote/pyannote-audio)
  - speaker diarization、speech activity detection 和 overlapped speech detection。

## 评估

| 指标 | 全称 | 方向 | 含义 |
| --- | --- | --- | --- |
| WER | Word Error Rate | 越低越好 | 词错误率 |
| CER | Character Error Rate | 越低越好 | 字符错误率 |
| PER | Phoneme Error Rate | 越低越好 | 音素错误率 |
| RTFx | Real-Time Factor | 越高越好 | 实时处理能力 |

- `WER = (S + D + I) / N`
  - `S`：Substitutions；`D`：Deletions；`I`：Insertions；`N`：Total words。
- RTFx 通常表示单位计算时间处理的音频秒数，应和首包延迟、并发、内存一起评估。
- [Hugging Face Evaluate](https://huggingface.co/docs/evaluate/index)
- [WER Metric](https://huggingface.co/spaces/evaluate-metric/wer)
- [Open ASR Leaderboard](https://huggingface.co/spaces/hf-audio/open_asr_leaderboard)
