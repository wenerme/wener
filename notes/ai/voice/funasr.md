---
title: FunASR
tags:
  - ASR
---

# FunASR

- [modelscope/FunASR](https://github.com/modelscope/FunASR)
  - MIT
- 参考
  - [FunAudioLLM/SenseVoice](https://github.com/FunAudioLLM/SenseVoice)
    - Multilingual Voice Understanding Model
- 模型缓存目录 ~/.cache/modelscope/hub/iic
- 16kHz sampling rate, single channel, 16 bit depth
  - [funasr/utils/load_utils.py](https://github.com/modelscope/FunASR/blob/172a3152b42af36443ec6a0a39969471c35b893d/funasr/utils/load_utils.py)

```bash
# --privileged=true
docker run --rm -it \
  -p 10095:10095 \
  -v $PWD/funasr/models:/workspace/models \
  -w /workspace/FunASR/runtime \
  --name funasr registry.cn-hangzhou.aliyuncs.com/funasr_repo/funasr:funasr-runtime-sdk-cpu-0.4.5

# --certfile 0 关闭 ssl
# damo/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-onnx（时间戳）
# damo/speech_paraformer-large-contextual_asr_nat-zh-cn-16k-common-vocab8404-onnx（nn热词）
# 建议热词长度不超过10，个数不超过1k，权重1~100
# https://modelscope.cn/models/damo -> https://modelscope.cn/models/iic
# https://www.modelscope.cn/models/iic/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-onnx
# 实际启动
# https://github.com/modelscope/FunASR/blob/main/runtime/websocket/bin/funasr-wss-server.cpp
bash run_server.sh \
  --certfile 0 \
  --download-model-dir /workspace/models \
  --vad-dir damo/speech_fsmn_vad_zh-cn-16k-common-onnx \
  --model-dir damo/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-onnx \
  --punc-dir damo/punc_ct-transformer_cn-en-common-vocab471067-large-onnx \
  --lm-dir damo/speech_ngram_lm_zh-cn-ai-wesp-fst \
  --itn-dir thuduj12/fst_itn_zh \
  --hotword /workspace/models/hotwords.txt

# GPU
docker pull registry.cn-hangzhou.aliyuncs.com/funasr_repo/funasr:funasr-runtime-sdk-gpu-0.2.1
docker run --gpus=all -p 10098:10095 -it --privileged=true \
  -v $PWD/funasr/models:/workspace/models \
  --name funasr registry.cn-hangzhou.aliyuncs.com/funasr_repo/funasr:funasr-runtime-sdk-gpu-0.2.1
```

| 缩写 | 英文全称                     | 中文含义     |
| ---- | ---------------------------- | ------------ |
| AED  | Acoustic Event Detection     | 事件检测     |
| ASR  | Automatic Speech Recognition | 自动语音识别 |
| ITN  | Inverse Text Normalization   | 文本归一化   |
| LID  | Language Identification      | 语种识别     |
| SER  | Speech Emotion Recognition   | 情感识别     |

| 模型名称                      | 主要功能描述                              | 语言    | 训练数据     | 参数量 | 特色/备注      |
| ----------------------------- | ----------------------------------------- | ------- | ------------ | ------ | -------------- |
| SenseVoiceSmall               | 多语种语音理解（ASR、ITN、LID、SER、AED） | 多语种  | 300,000 小时 | 234M   |                |
| paraformer-zh                 | 语音识别，带时间戳，非实时                | 中文    | 60,000 小时  | 220M   | 时间戳，       |
| SeACoParaformer-zh            | 热词语音识别，带时间戳，非实时            | 中文    | -            | 220M   | 热词、时间戳   |
| paraformer-zh-spk             | 分角色语音识别，带时间戳，非实时          | 中文    | 60,000 小时  | 220M   | 分角色、时间戳 |
| paraformer-zh-streaming       | 语音识别，实时                            | 中文    | 60,000 小时  | 220M   | 实时，         |
| paraformer-zh-streaming-small | 语音识别，实时                            | 中文    | 60,000 小时  | 220M   | 实时           |
| paraformer-en                 | 英文语音识别，非实时                      | 英文    | 50,000 小时  | 220M   |                |
| conformer-en                  | 英文语音识别，非实时                      | 英文    | 50,000 小时  | 220M   |                |
| ct-punc                       | 标点恢复                                  | 中/英文 | 100M         | 290M   |                |
| fsmn-vad                      | 语音活动检测                              | 中/英文 | 5,000 小时   | 0.4M   |                |
| fsmn-kws                      | 关键词检测，流式                          | 中文    | 5,000 小时   | 0.7M   |                |
| fa-zh                         | 时间戳预测                                | 中文    | 5,000 小时   | 38M    |                |
| cam++                         | 说话人验证/分离                           | -       | 5,000 小时   | 7.2M   |                |
| Whisper-large-v3              | 多语种语音识别，带时间戳，非实时          | 多语种  | -            | 1550M  |                |
| Whisper-large-v3-turbo        | 多语种语音识别，带时间戳，非实时          | 多语种  | -            | 809M   |                |
| Qwen-Audio                    | 音频-文本多模态预训练模型                 | 多语种  | -            | 8B     |                |
| Qwen-Audio-Chat               | 音频-文本多模态对话模型                   | 多语种  | -            | 8B     |                |
| emotion2vec+large             | 语音情感识别                              | -       | 40,000 小时  | 300M   |                |

- Paraformer
  - 主要为中文普通话
    - 声音事件检测 (AED) (如笑声、掌声)
  - 时间戳预测
  - 逆文本正则化 (ITN)
- paraformer-zh
  - https://www.modelscope.cn/models/iic/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-pytorch/summary
  - https://huggingface.co/funasr/paraformer-zh
- SenseVoice-Small
  - 多语言 (中、粤、英、日、韩等)
  - 情感识别 (SER)
  - 声音事件检测 (AED) (如笑声、掌声)
  - 语种识别 (LID)

**模型名字映射**

- ct-punc 1.2G
  - CT-Transformer标点-中英文-通用-large
- ct-punc-c 300M
  - CT-Transformer标点-中文-通用-pytorch

```py
name_maps_ms = {
    "paraformer": "iic/speech_paraformer-large_asr_nat-zh-cn-16k-common-vocab8404-pytorch",
    "paraformer-zh": "iic/speech_seaco_paraformer_large_asr_nat-zh-cn-16k-common-vocab8404-pytorch",
    "paraformer-en": "iic/speech_paraformer-large-vad-punc_asr_nat-en-16k-common-vocab10020",
    "paraformer-en-spk": "iic/speech_paraformer-large-vad-punc_asr_nat-en-16k-common-vocab10020",
    "paraformer-zh-streaming": "iic/speech_paraformer-large_asr_nat-zh-cn-16k-common-vocab8404-online",
    "fsmn-vad": "iic/speech_fsmn_vad_zh-cn-16k-common-pytorch",
    "ct-punc": "iic/punc_ct-transformer_cn-en-common-vocab471067-large",
    "ct-punc-c": "iic/punc_ct-transformer_zh-cn-common-vocab272727-pytorch",
    "fa-zh": "iic/speech_timestamp_prediction-v1-16k-offline",
    "cam++": "iic/speech_campplus_sv_zh-cn_16k-common",
    "Whisper-large-v2": "iic/speech_whisper-large_asr_multilingual",
    "Whisper-large-v3": "iic/Whisper-large-v3",
    "Qwen-Audio": "Qwen/Qwen-Audio",
    "emotion2vec_plus_large": "iic/emotion2vec_plus_large",
    "emotion2vec_plus_base": "iic/emotion2vec_plus_base",
    "emotion2vec_plus_seed": "iic/emotion2vec_plus_seed",
    "Whisper-large-v3-turbo": "iic/Whisper-large-v3-turbo",
}

name_maps_hf = {
    "paraformer": "funasr/paraformer-zh",
    "paraformer-zh": "funasr/paraformer-zh",
    "paraformer-en": "funasr/paraformer-zh",
    "paraformer-zh-streaming": "funasr/paraformer-zh-streaming",
    "fsmn-vad": "funasr/fsmn-vad",
    "ct-punc": "funasr/ct-punc",
    "ct-punc-c": "iic/punc_ct-transformer_zh-cn-common-vocab272727-pytorch",
    "fa-zh": "funasr/fa-zh",
    "cam++": "funasr/campplus",
    "Whisper-large-v2": "iic/speech_whisper-large_asr_multilingual",
    "Whisper-large-v3": "iic/Whisper-large-v3",
    "Qwen-Audio": "Qwen/Qwen-Audio",
    "emotion2vec_plus_large": "emotion2vec/emotion2vec_plus_large",
    "iic/emotion2vec_plus_large": "emotion2vec/emotion2vec_plus_large",
    "emotion2vec_plus_base": "emotion2vec/emotion2vec_plus_base",
    "iic/emotion2vec_plus_base": "emotion2vec/emotion2vec_plus_base",
    "emotion2vec_plus_seed": "emotion2vec/emotion2vec_plus_seed",
    "iic/emotion2vec_plus_seed": "emotion2vec/emotion2vec_plus_seed",
    "Whisper-large-v3-turbo": "iic/Whisper-large-v3-turbo",
}

name_maps_openai = {
    "Whisper-tiny.en": "tiny.en",
    "Whisper-tiny": "tiny",
    "Whisper-base.en": "base.en",
    "Whisper-base": "base",
    "Whisper-small.en": "small.en",
    "Whisper-small": "small",
    "Whisper-medium.en": "medium.en",
    "Whisper-medium": "medium",
    "Whisper-large-v1": "large-v1",
    "Whisper-large-v2": "large-v2",
    "Whisper-large-v3": "large-v3",
    "Whisper-large": "large",
    "Whisper-large-v3-turbo": "turbo",
}
```

- [ddlBoJack/emotion2vec](https://github.com/ddlBoJack/emotion2vec)
  - iic/emotion2vec_base_finetuned
  - iic/emotion2vec_plus_large
- https://github.com/modelscope/FunASR/blob/main/funasr/download/name_maps_from_hub.py

## Notes

- Process
  - vad - 语音活动检测模型
    - 过滤掉无用的静音部分或背景噪音，确保 ASR 模型只处理有效的语音片段。
    - 输出 `[[370, 2230], [2560, 7080]]` - 开始, 结束
      - vad segments
  - asr
    - 输出 `{text:'', timestamp: [[100,200], [200,500]]}`
  - spk
    - speaker verification/diarization
    - 输出 spk_embedding
    - spk_mode = punc_segment | vad_segment
    - 依赖 timestamp
    - 没有 spk_model 的时候可以设置 sentence_timestamp=True 返回 sentence 信息
  - punc
    - 处理 `result["text"]`
    - 输出 `{text:'', punc_array:[]}`
  - 如果设置了 preset_spk_num 会根据 spk_embedding 做 cluster 来确定说话人
  - 如果设置了 return_raw_text 则会设置 `result["raw_text"]`
- params
  - batch_size_s
  - en_post_proc=Flase - 英文后处理
- https://github.com/modelscope/FunASR/blob/main/runtime/run_server.sh
- https://github.com/modelscope/FunASR/blob/main/runtime/websocket/bin/funasr-wss-server.cpp

## Protocol

```ts
interface OfflineRequestMessage {
  mode: 'offline';
  wav_name: string;
  wav_format: string | 'pcm' | 'mp3' | 'mp4';
  is_speaking: boolean; // false -> 断句尾点，例如，vad切割点，或者一条wav结束
  audio_fs?: number; // pcm 采样率
  hotwords?: Record<string, number>; // 热词
  itn?: boolean; // 默认 true
}

interface ResponseMessage {
  mode: 'offline';
  wav_name: string;
  text: string;
  is_final: boolean;
  timestamp?: number[][]; // 时间戳 "[[100,200], [200,500]]"(ms)
  stamp_sents?: {
    text_seg: string; // 正 是 因 为
    punc: string; // ,
    start: number;
    end: number;
    ts_list: number[][]; // [[430,670],[670,810],[810,1030],[1030,1130]]
  }[];
}
```

- mode
  - offline 一句话识别
  - online 实时语音识别
  - 2pass 实时语音识别，并且说话句尾采用离线模型进行纠错
- https://github.com/modelscope/FunASR/blob/main/runtime/docs/websocket_protocol_zh.md

## llvmlite

- 依赖 LLVM
- llvmlite 对 LLVM 版本有硬性要求
- 先安装 llvmlite 再安装 funasr
- `llvm-config --version`
- https://github.com/numba/llvmlite

```bash
apt install llvm
uv add llvmlite
uv add funasr

uv add simplejson pillow sortedcontainers
```

## 双声道

- https://github.com/modelscope/FunASR/issues/1509

# FAQ

## ImportError: cannot import name HubDatasetModuleFactoryWithoutScript from datasets.load

- 使用 datasets 2.19 版本

## IndexError: list index out of range

- 并发问题，使用多个 worker 的方式来避免
