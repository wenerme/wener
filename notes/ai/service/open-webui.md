---
title: OpenWebUI
---

# OpenWebUI

- [open-webui](https://github.com/open-webui/open-webui)
  - BSD-3, Svelte, Python
  - 支持 ollama, 提供内置 ollama

```bash
docker run --rm -it \
  -e OPENAI_API_KEY=your_secret_key \
  -v $PWD/data:/app/backend/data \
  -p 3000:8080 \
  --name open-webui ghcr.io/open-webui/open-webui:main
```

| env                 | demo                      |
| ------------------- | ------------------------- |
| OPENAI_API_BASE_URL | https://api.openai.com/v1 |
| OPENAI_API_KEY      | sk-                       |
| OPENAI_API_KEYS     |
| OLLAMA_BASE_URL     | http://127.0.0.1:11434    |
| HF_HUB_OFFLINE      | 1                         |

- https://github.com/open-webui/open-webui/blob/main/backend/open_webui/config.py
