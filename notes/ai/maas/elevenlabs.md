---
title: elevenlabs
---

# elevenlabs

## STT

- 3GB, 10hr

```bash
curl -X POST https://api.elevenlabs.io/v1/speech-to-text \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -F "model_id=scribe_v1" \
  -F "file=@audio.mp3" \
  -F "tag_audio_events=true" \
  -F "diarize=true" \
  -F "timestamps_granularity=word" \
  -F "file_format=other" \
  -F 'additional_formats=[{"format":"segmented_json","options":{"include_timestamps":true,"t
  imestamp_format":"s"}}];type=application/json'
```

---

- https://elevenlabs.io/docs/overview/capabilities/speech-to-text
