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
```

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

## 双声道

- https://github.com/modelscope/FunASR/issues/1509
