---
title: Audit
---

# Audio

- 建议尽量使用 opus

## Opus

- [Opus:wiki](<https://en.wikipedia.org/wiki/Opus_(audio_format)>)
- [opus-codec](http://opus-codec.org/)
- [Opus Recommended Settings](https://wiki.xiph.org/Opus_Recommended_Settings)

```bash
brew install opus-tools
# Encode
opusenc --bitrate 8 in.wav out.opus
```
