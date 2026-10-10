---
title: 唤醒词
---

# Wake Word

```bash
# 样本录音, 2s
ffmpeg \
  -hide_banner \
  -loglevel warning \
  -f avfoundation \
  -i ":0" \
  -ac 1 \
  -ar 16000 \
  -c:a pcm_s16le \
  "NAME-$(date +%Y%m%d-%H%M%S).wav"
```
