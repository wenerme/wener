---
title: whisper
tags:
  - ASR
---

# whisper

- [openai/whisper](https://github.com/openai/whisper)
  - [HN](https://news.ycombinator.com/item?id=32927360)
  - https://openai.com/blog/whisper/

```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make -j

./models/download-ggml-model.sh base.en

./main -f samples/jfk.wav -m models/ggml-base.en.bin -pc

# 国内能直接下载 ～150K/s
# 代理能上 5MB/s
# tiny.en,tiny,base.en,base,small.en,small,medium.en,medium,large-v1,large
curl -LOC- https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin
curl -LOC- https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large.bin

# samples
curl -Lo samples/hp0.ogg https://upload.wikimedia.org/wikipedia/en/d/d4/En.henryfphillips.ogg
ffmpeg -i samples/hp0.ogg -ac 1 -ar 16000 samples/hp0.wav

./main -f samples/hp0.wav -pc -t $(nproc)
```

- 模型越大越准确
- 根据 CPU 不同，可能一般只能跑 base 或 small
- hf 下载域名 cdn-lfs.huggingface.co
- https://github.com/ggerganov/whisper.cpp/tree/master/models

## owhisper

- https://github.com/fastrepl/hyprnote/tree/main/owhisper

```bash
brew install fastrepl/hyprnote/owhisper

owhisper pull whisper-cpp-base-q8 # 78MB
owhisper run whisper-cpp-base-q8
```

- https://huggingface.co/ggerganov/whisper.cpp
- https://huggingface.co/onnx-community/moonshine-base-ONNX
- Models https://github.com/fastrepl/hyprnote/blob/main/owhisper/owhisper-model/src/lib.rs
