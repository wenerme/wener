---
title: OpenAI
---

# OpenAI

**价格**

- GPT-4
  - 8K 上下文, Prompt $0.03/1K tokens, Completion $0.06/1K tokens
    - 1.6 万字/$, 0.8 万字/$
  - 32K 上下文, Prompt $0.06/1K tokens, Completion $0.12/1K tokens
    - 0.8 万字/$, 0.4 万字/$,
- Chat
  - gpt-3.5-turbo $0.002/1K tokens
    - 25 万字/$
    - 上下文 4096 tokens
- InstructGPT
  - Ada - $0.0004 / 1K tokens
    - 最快
    - 可以 Embedding
  - Babbage - $0.0005 / 1K tokens
  - Curie - $0.002 / 1K tokens
  - Davinci - $0.02 / 1K tokens
    - 最强
- Fine-tuning InstructGPT
  - 训练价格 ~= 基础模型
  - 使用价格 = 训练价格 x 4
- DALL·E
  - 1024×1024 $0.02/image
  - 512×512 $0.018/image
  - 256×256 $0.016/image
- Audio
  - Whisper $0.006 / minute

## API

- https://platform.openai.com/docs/api-reference
- https://platform.openai.com/docs/models/model-endpoint-compatibility
- https://npmjs.com/package/chatgpt

```json
{
  "error": {
    "message": "This key is associated with a deactivated account. If you feel this is an error, contact us through our help center at help.openai.com.",
    "type": "invalid_request_error",
    "param": null,
    "code": "account_deactivated"
  }
}
```

## fin tune

```bash
pip install --upgrade openai
export OPENAI_API_KEY="<OPENAI_API_KEY>"
# openai tools fine_tunes.prepare_data -f <LOCAL_FILE>

# ada, babbage, curie, davinci
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
openai api fine_tunes.follow -i <YOUR_FINE_TUNE_JOB_ID>
```
