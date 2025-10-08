---
title: kokoro
---

# kokoro

- [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)
  - 2025-01-27
  - 8 langs, 54 voice styles
    - https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md
- [hexgrad/Kokoro-82M-v1.1-zh](https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh)
  - 2025-02-26
  - 2 langs, 103 voice styles
- [hexgrad/misaki](https://github.com/hexgrad/misaki)
  - G2G - Grapheme-to-Phoneme - 字素到音素转换
  - Demo https://huggingface.co/spaces/hexgrad/Misaki-G2P
  - https://github.com/explosion/spaCy/blob/master/spacy/glossary.py
- https://github.com/eduardolat/kokoro-web
- https://voice-generator.pages.dev/

## Kokoro-FastAPI

- https://github.com/remsky/Kokoro-FastAPI
  - https://github.com/remsky/Kokoro-FastAPI/issues/214
  - Cannot use Custom Phonemes in v0.2.4 https://github.com/remsky/Kokoro-FastAPI/issues/348

```bash
# CPU
# http://localhost:8880/docs
# http://localhost:8880/web
# http://localhost:8880/v1 OpenAI 兼容接口
# /api/src/core/openai_mappings.json 配置了 voice 映射关系
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest
# NVIDIA GPU
# docker run --gpus all -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-gpu:latest
```

- model: tts-1 | tts-1-hd | kokoro
- download_format
- return_download_link
- response_format: mp3 | opus | aac | flac | wav | pcm
  - mp3
  - opus
  - aac
  - flac
  - wav
  - pcm
- voice: 基础或组合音色名（支持加减权重语法）
- speed: 0.25–4.0
- stream
- lang_code: a | b | z | en-us | en-gb
- volume_multiplier
- download_format
- normalization_options
  - normalize: 开启整体文本规范化（大小写/标点/常见缩写等统一处理）
  - unit_normalization: 单位转写（如 10KB → “10 kilobytes”）
  - url_normalization: URL 可读化（符号转词，如点/斜杠/等号）
  - email_normalization: 邮箱可读化（user at domain dot com）
  - optional_pluralization_normalization: 将 “(s)” 规范为 “s”
  - phone_normalization: 电话号码转读法
  - replace_remaining_symbols: 将残留符号替换为对应词语（如 “+”→“plus”）

```text
[pause:0.5s]
```

```bash
brew install uv ffmpeg espeak-ng

./start-cpu.sh

uv run --no-sync uvicorn api.src.main:app --host 0.0.0.0 --port 8880
```

## Voice

| code       | for                             | cn           |
| ---------- | ------------------------------- | ------------ |
| **lang**   | 语言                            |
| a          | en-us, American English， 🇺🇸    | 美式英语     |
| b          | en-gb, British English, 🇬🇧      | 英式英语     |
| z          | zh-cn, Mandarin Chinese, 🇨🇳     | 中文         |
| e          | es, Spanish, 🇪🇸                 | 西班牙语     |
| f          | fr-fr, French, 🇫🇷               | 法语         |
| h          | hi, Hindi, 🇮🇳                   | 印地语       |
| i          | it, Italian, 🇮🇹                 | 意大利语     |
| p          | pt-br, Brazilian Portuguese, 🇧🇷 | 巴西葡萄牙语 |
| j          | ja, Japanese, 🇯🇵                | 日语         |
| **gender** | 性别                            |
| f          | Female, 🚺                      | 女           |
| m          | Male, 🚹                        | 男           |

| Name                     | Traits | Target Quality | Overall Grade | CC BY / Note                                                                                        |
| ------------------------ | ------ | -------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| **American English**     |        |                |
| af_heart                 | 🚺❤️   |                | **A**         |                                                                                                     |
| af_alloy                 | 🚺     | B              | C             |                                                                                                     |
| af_aoede                 | 🚺     | B              | C+            |                                                                                                     |
| af_bella                 | 🚺🔥   | **A**          | **A-**        |                                                                                                     |
| af_jessica               | 🚺     | C              | D             |                                                                                                     |
| af_kore                  | 🚺     | B              | C+            |                                                                                                     |
| af_nicole                | 🚺🎧   | B              | B-            |                                                                                                     |
| af_nova                  | 🚺     | B              | C             |                                                                                                     |
| af_river                 | 🚺     | C              | D             |                                                                                                     |
| af_sarah                 | 🚺     | B              | C+            |                                                                                                     |
| af_sky                   | 🚺     | B C-           |               |
| am_adam                  | 🚹     | D              | F+            |                                                                                                     |
| am_echo                  | 🚹     | C              | D             |                                                                                                     |
| am_eric                  | 🚹     | C              | D             |                                                                                                     |
| am_fenrir                | 🚹     | B              | C+            |                                                                                                     |
| am_liam                  | 🚹     | C              | D             |                                                                                                     |
| am_michael               | 🚹     | B              | C+            |                                                                                                     |
| am_onyx                  | 🚹     | C              | D             |                                                                                                     |
| am_puck                  | 🚹     | B              | C+            |                                                                                                     |
| am_santa                 | 🚹     | C              | D-            |                                                                                                     |
| **British English**      |        |                |               |
| bf_alice                 | 🚺     | C              | D             |                                                                                                     |
| bf_emma                  | 🚺     | B              | B-            |                                                                                                     |
| bf_isabella              | 🚺     | B              | C             |                                                                                                     |
| bf_lily                  | 🚺     | C              | D             |                                                                                                     |
| bm_daniel                | 🚹     | C              | D             |                                                                                                     |
| bm_fable                 | 🚹     | B              | C             |                                                                                                     |
| bm_george                | 🚹     | B              | C             |                                                                                                     |
| bm_lewis                 | 🚹     | C              | D+            |                                                                                                     |
| **Japanese**             |        |                |               |
| jf_alpha                 | 🚺     | B              | C+            |                                                                                                     |
| jf_gongitsune            | 🚺     | B              | C             | [gongitsune](https://github.com/koniwa/koniwa/blob/master/source/tnc/tnc__gongitsune.txt)           |
| jf_nezumi                | 🚺     | B              | C-            | [nezuminoyomeiri](https://github.com/koniwa/koniwa/blob/master/source/tnc/tnc__nezuminoyomeiri.txt) |
| jf_tebukuro              | 🚺     | B              | C             | [tebukurowokaini](https://github.com/koniwa/koniwa/blob/master/source/tnc/tnc__tebukurowokaini.txt) |
| jm_kumo                  | 🚹     | B              | C-            | [kumonoito](https://github.com/koniwa/koniwa/blob/master/source/tnc/tnc__kumonoito.txt)             |
| **Mandarin Chinese**     |        |                |               |
| zf_xiaobei               | 🚺     | C              | D             |                                                                                                     |
| zf_xiaoni                | 🚺     | C              | D             |                                                                                                     |
| zf_xiaoxiao              | 🚺     | C              | D             |                                                                                                     |
| zf_xiaoyi                | 🚺     | C              | D             |                                                                                                     |
| zm_yunjian               | 🚹     | C              | D             |                                                                                                     |
| zm_yunxi                 | 🚹     | C              | D             |                                                                                                     |
| zm_yunxia                | 🚹     | C              | D             |                                                                                                     |
| zm_yunyang               | 🚹     | C              | D             |                                                                                                     |
| **Spanish**              |        |                |               |
| ef_dora                  | 🚺     |                |               |                                                                                                     |
| em_alex                  | 🚹     |                |               |                                                                                                     |
| em_santa                 | 🚹     |                |               |                                                                                                     |
| **French**               |        |                |               |
| ff_siwis                 | 🚺     | B              | B-            | [SIWIS](https://datashare.ed.ac.uk/handle/10283/2353)                                               |
| **Hindi**                |        |                |               |
| hf_alpha                 | 🚺     | B              | C             |                                                                                                     |
| hf_beta                  | 🚺     | B              | C             |                                                                                                     |
| hm_omega                 | 🚹     | B              | C             |                                                                                                     |
| hm_psi                   | 🚹     | B              | C             |                                                                                                     |
| **Italian**              |        |                |               |
| if_sara                  | 🚺     | B              | C             |                                                                                                     |
| im_nicola                | 🚹     | B              | C             |                                                                                                     |
| **Brazilian Portuguese** |        |                |               |
| pf_dora                  | 🚺     |                |               |                                                                                                     |
| pm_alex                  | 🚹     |                |               |                                                                                                     |
| pm_santa                 | 🚹     |                |               |                                                                                                     |

- Target Quality
  - 参考音频的音质有多高？评分会受音频质量、杂音、压缩和采样率影响。
  - 文本标签与音频的匹配度如何？若存在文本与音频不同步（如幻听），评分会降低。


```json
{
  "a":"af_heart",
  "b":"bf_alice",
  "z":"zf_xiaobei",
  "e":"ef_dora",
  "f":"ff_siwis",
  "h":"hf_alpha",
  "i":"if_sara",
  "p":"pf_dora",
  "j":"jf_alpha"
}
```
