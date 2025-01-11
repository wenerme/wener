---
title: Sox
---

# sox


```bash
brew install sox
# 录音
rec -r 16000 -c 1 record.flac
# 转码
sox callwait.mp3 -c 1 -r 16000 -b 16 callwait.wav
```
