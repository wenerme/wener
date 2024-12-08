---
title: FunASR
tags:
  - ASR
---

# FunASR

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
