---
title: continue
---

# continue

- [continuedev/continue](https://github.com/continuedev/continue)
  - Apache-2.0, Python
  - ChatGPT -> VS Code and JetBrains
  - Server 可以独立运行，默认 IDE 自动 Setup
  - 默认使用 OpenAI GPT-4, GPT-3.5-turbo
  - 支持 Code Llama, Claude 2, WizardCoder, PaLM 2
    - https://github.com/continuedev/what-llm-to-use
- 参考
  - Jetbrain 插件 https://plugins.jetbrains.com/plugin/22707-continue

```
# PostHog
allow_anonymous_telemetry=False
```

```bash
apk add py3-pip

# manual server
pip install continuedev
# 默认端口 65432
# MeiliSearch
# --headless / --no-headless
# --config
python -m continuedev --port 65432 --host 0.0.0.0

# 运行需要访问目录
# docker run --rm -it -p 65432:65432 --name continue-server wener/continue-server
```

- /gui/socket.io
