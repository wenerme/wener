---
title: xiaozhi
---

# 小智

- 上行：麦克风 → PCM → Opus 编码 → 服务端
- 下行：服务端 Opus → Opus 解码 → PCM → Codec/I2S → 喇叭
  - 接收 WSS 二进制帧；
  - 解码 mono Opus；
  - 最多缓存约 2.4 秒压缩音频；
  - 把 PCM 交给 ES8311/I2S；
  - 支持中止播放和状态切换。
  - Opus：协议原生支持，ESP-IDF 已集成解码器，60ms 帧可以边收边播
- TTS
  - Microsoft EdgeTTS
- WHA103 的 ES8311 输出是 24kHz
- 24kHz Opus → 设备 Opus 解码 → 24kHz PCM → ES8311
- 唤醒词
  - wn9s_nihaoxiaozhi
  - WakeNet9s
  - C3 可选的 9s 模型只有“你好小智 / Hi 乐鑫 / Hi ESP / Hi Jason”
  - 建议唤醒词包含 3 至 6 个音节
  - 上游任意拼音唤醒词 CustomWakeWord 只支持 ESP32-S3/P4 + PSRAM, Kconfig.projbuild

# xiaozhi-esp32-server

- https://github.com/xinnan-tech/xiaozhi-esp32-server

```
OTA:
POST /xiaozhi/ota/

WebSocket:
GET /xiaozhi/v1/
Authorization: Bearer <token>
Protocol-Version: 1
Device-Id: <MAC>
Client-Id: <UUID>

上行音频:
裸 Opus WebSocket binary frame
16kHz / mono / 60ms / 960 samples

下行音频:
裸 Opus WebSocket binary frame
24kHz / mono / 60ms / 1440 samples
```

**消息类型**

- hello
- listen/start
- listen/stop
- listen/detect
- abort
- stt
- tts/start
- tts/sentence_start
- tts/stop
- llm
- mcp
- system

```
WHA103 16kHz/60ms Opus
  -> WebSocket 二进制帧
  -> 无界 ASR queue
  -> Silero VAD
  -> 整句 Opus 解码为 PCM/WAV
  -> AI ASR
  -> 文本
  -> 流式 LLM
  -> 标点分句
  -> EdgeTTS MP3
  -> FFmpeg/Pydub 解码、重采样为 24kHz PCM
  -> Opus 编码为 60ms 包
  -> 发送速率控制器
  -> WHA103
```

Silero VAD：

- 每个连接独立一个 opuslib_next.Decoder(16000, 1)。
- 每次 Opus 包是 960 samples，也就是 16kHz 下 60ms。
- PCM 按 512 samples 输入 Silero ONNX。
- 使用高低双阈值和 5 帧窗口，至少 3 帧认为有人声。
- 当前配置默认静音约 1000ms 后判定一句话结束。
- 非流式 ASR 至少收集 15 个包，约 900ms，才提交识别。

```
LLM chunks -> 累积到标点 -> 合成这一小句 -> 播放 -> 继续下一句
```

- EdgeTTS

1. Pydub/FFmpeg 解码 MP3；
2. 转为 mono、24kHz、16-bit PCM；
3. OpusEncoderUtils 按 60ms，即每帧 1440 samples 编码；
4. Opus bitrate 24kbps、complexity 10、voice signal；
5. 每个编码包进入 tts_audio_queue。

AudioRateController：

- 前 5 个 Opus 包立即发送，相当于约 300ms 预缓冲；
- 后续包进入 deque；
- 按 monotonic clock 每 60ms 发送一个；
- await websocket.send() 会承接底层 socket 的流控；
- sentence_start、音频包和 stop 消息保持顺序；
- 新 sentence_id 会重置旧发送任务和队列。
