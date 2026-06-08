---
title: paseo
---

# paseo

- [getpaseo/paseo](https://github.com/getpaseo/paseo)
- 参考
  - iOS https://apps.apple.com/app/paseo-pocket-engineer/id6758887924
  - Web https://app.paseo.sh
  - https://github.com/zenghongtu/paseo-relay

```bash
npm install -g @getpaseo/cli
paseo

paseo ls

# paseo attach <id>
# paseo send <id> "MESSAGE"
# paseo logs <id>
# paseo stop <id>

# ~/.paseo/daemon.log
# 127.0.0.1:6767
# --foreground for debug, --port, --listen
paseo daemon start
paseo daemon status
paseo provider ls

# for public access
paseo daemon set-password
paseo daemon restart

paseo daemon pair --json
paseo ls --host 'https://app.paseo.sh/#offer=...'
paseo --host hostname:6767 ls
# PASEO_PASSWORD=my-secret
#

# paseo import --provider pi <pi-session-id> --cwd /path/to/repo
paseo agent update abc123 --name NAME
```

```
PASEO_HOME=~/.paseo-dev
PASEO_LISTEN=127.0.0.1:6767
PASEO_PASSWORD=xxx
PASEO_HOST=host:6767
```

- ~/.paseo
- ~/.paseo/config.json

```json
{
  "$schema": "https://paseo.sh/schemas/paseo.config.v1.json",
  "version": 1,
  "daemon": {
    "relay": {
      "enabled": true,
      // daemon -> relay
      "endpoint": "relay.example.com:443",
      // client -> relay -  QR code / pairing offer
      "publicEndpoint": "relay.example.com:443",
      "useTls": true,
      "publicUseTls": true
    }
  }
}
```

## Speech

- ~/.paseo/models/local-speech
- 本地 STT、TTS 支持
- STT
  - parakeet-tdt-0.6b-v2-int8
  - https://github.com/k2-fsa/sherpa-onnx
  - NVIDIA Parakeet TDT v2
  - offline NeMo transducer
  - English only
  - int8 ONNX
- TTS
  - kokoro-en-v0_19
  - https://github.com/k2-fsa/sherpa-onnx
  - Kokoro English TTS
  - ONNX
- Turn detection / VAD
  - Silero VAD

可以修改为使用 OpenAI 作为 Provider

```json
{
  "version": 1,
  "features": {
    "dictation": {
      "stt": {
        "provider": "openai"
      }
    },
    "voiceMode": {
      "stt": {
        "provider": "openai"
      },
      "tts": {
        "provider": "openai"
      }
    }
  },
  "providers": {
    "openai": {
      "apiKey": "..."
    }
  }
}
```
