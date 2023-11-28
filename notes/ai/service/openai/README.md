---
title: OpenAI
---

# OpenAI

**价格**

| Service      | Input/1K tokens | Output/1K tokens |     Chinese | note               |
| ------------ | --------------- | ---------------- | ----------: | ------------------ |
| GPT-4 8K     | $0.03           | $0.06            | ~1.6 万字/$ |
| GPT-4 32K    | $0.06           | $0.12            | ~0.8 万字/$ |
| Chat 3.5 4K  | $0.0015         | $0.002           |  ~30 万字/$ | gpt-3.5-turbo      |
| Chat 3.5 16K | $0.003          | $0.004           |  ~15 万字/$ | gpt-3.5-turbo-0613 |

- InstructGPT - 单个指令生成
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
- https://openai.com/pricing

### Models

- gpt-3.5-turbo-0613
  - 16K 上下文

## API

- https://platform.openai.com/docs/api-reference
- https://platform.openai.com/docs/models/model-endpoint-compatibility
- https://npmjs.com/package/chatgpt

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Organization: YOUR_ORG_ID"
```

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

## 限制 {#limits}

| -                 | Text&Embedding        | Chat                  | Codex               | Edit                 | Image           | Audio  |
| ----------------- | --------------------- | --------------------- | ------------------- | -------------------- | --------------- | ------ |
| Pay-as-you-go 48h | 60 RPM, 250,000 TPM   | 60 RPM, 60,000 TPM    | 20 RPM , 40,000 TPM | 20 RPM , 150,000 TPM | 50 images / min | 50 RPM |
| Pay-as-you-go     | 3,500 RPM,350,000 TPM | 3,500 RPM, 90,000 TPM | 20 RPM, 40,000 TPM  | 20 RPM ,150,000 TPM  | 50 images / min | 50 RPM |

- TPM - tokens per minute - Token/分钟
- RPM - requests per minute - 请求/分钟
- 限制是组织维度
- 替代方案
  - Azure OpenAI
  - 多组织
- 1 token ~= 0.5-1 汉字, 1 token ~= 4 字母
- avg 15 token/s, min 0.7 token/s, max 50 token/s - 基于历史消息统计
- 3,500 RPM, 90,000 TPM - 1 个账号，两种维度限制，请求 和 Token
  - 3500/60 = 58.3 RPS ~ 60/s 并发请求
  - 90000/60 = 1500 TPS
    - 1500/50 = 30/s 并发请求 - 回复内容多
    - 1500/15 = 100/s 并发请求
    - 1500/0.7 = 2142/s 并发请求 - 回复内容少
- 限流都是分钟级别
  - 也就是说持续 1 分钟 RPS 达到 60 就会有问题 - 例如: 1 分钟有 3600 人操作，每秒操作 1。次
  - 基于 Token 的限制则影响有多少个持续的回答

| TYPE    | 1 TPM EQUALS          |
| ------- | --------------------- |
| davinci | 1 token per minute    |
| curie   | 25 tokens per minute  |
| babbage | 100 tokens per minute |
| ada     | 200 tokens per minute |

- https://platform.openai.com/docs/guides/rate-limits

## fin tune

```bash
pip install --upgrade openai
export OPENAI_API_KEY="<OPENAI_API_KEY>"
# openai tools fine_tunes.prepare_data -f <LOCAL_FILE>

# ada, babbage, curie, davinci
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
openai api fine_tunes.follow -i <YOUR_FINE_TUNE_JOB_ID>
```

## Rate limit reached for default-gpt-3.5-turbo in organization org-xxx on requests per min. Limit: 60 / min.

```
Rate limit reached for default-gpt-3.5-turbo in organization org-xxx on requests per min. Limit: 60 / min. Please try again in 1s. Contact us through our help center at help.openai.com if you continue to have issues.
```

## 您的银行卡被拒绝了。


## Access denied

尝试不用 VPN 或者换 VPN

## 清理 Auth 信息

```js
javascript:window.localStorage.removeItem(Object.keys(window.localStorage).find(i=>i.startsWith('@@auth0spajs'))
```
