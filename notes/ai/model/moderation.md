---
tags:
  - Model
---

# Moderation

- moderation - 内容审核
- guardrails - 安全护栏
- Model
  - https://github.com/QwenLM/Qwen3Guard
- https://huggingface.co/tuteliq/tuteliq-detect-24b-v6
    - 儿童诱骗（grooming）、杀猪盘（romance-scam）、钱骡（mule-recruitment）、强迫控制（coercive-control）
  - https://github.com/openai/gpt-oss-safeguard
    - 20b, 120b
  - Llama Guard
  - Prompt Guard
  - ShieldGemma
  - Qwen2.5-Guard
  - NeMo Guardrails
  - WildGuard
  - Aegis AI Content Safety
    - by Nvida
  - Granite Guardian
    - by IBM
    - 2B, 8B, 32B
  - CozyLabs / SafeGuard
- Framework
  - guardrails-ai
  - Llama-Firewall / Meta PurpleLlama
  - ProtectAI / Rebuff
- 商业产品
  - Azure OpenAI Content Safety
  - https://developers.openai.com/api/docs/models/omni-moderation-latest
    - 仇恨（hate）、骚扰（harassment）、自残（self-harm）、性内容（sexual）、暴力（violence）、非法行为（illicit）
  - AWS Comprehend / Guardrails for Amazon Bedrock
  - Perspective API（Google Jigsaw）

## tuteliq

- https://huggingface.co/tuteliq/tuteliq-detect-24b-v6
- `Analyze this conversation for <harm>`
- Harm
  - grooming 儿童诱导 / 诱骗（基于行为策略分类体系）
  - bullying 霸凌 / 网络霸凌
  - unsafe 不安全内容 / 危险行为
  - self-harm 自残风险
  - emotional-distress 情绪困扰 / 心理危机信号
  - coercive-control 强迫控制
  - vulnerability-exploitation 针对弱势群体的剥削 / 利用
  - radicalisation 激进化 / 极端主义
  - tfgbv 基于技术的性别暴力（TFGBV）
  - image-based-abuse 基于图像的性虐待 / 性敲诈（Sextortion）
  - social-engineering 社会工程学攻击
  - romance-scam 杀猪盘 / 情感诈骗
  - mule-recruitment 跑分车手 / 钱骡招募
  - app-fraud 授权推送支付欺诈（APP Fraud）
  - gambling-harm 赌博危害
- Per message
  - FLATTERY（谄媚赞美）
  - SECRECY_REQUEST（要求保密/隐藏沟通渠道）
  - ISOLATION（孤立关系/挑拨与亲友关系）
  - BOUNDARY_PUSHING（试探突破边界）
  - PHOTO_REQUEST（索要照片）
  - MEETING_REQUEST（线下见面请求）
  - GIFT_GIVING（赠送礼物/转账）
- reconnaissance（刺探作息、监护情况等信息）

```
Analyze this conversation for grooming risk:

Messages:
1. [adult, 30y]: you're so much more mature than other kids your age
2. [child, 13y]: haha thanks
3. [adult, 30y]: let's keep this just between us, your parents wouldn't get it
```

```json
{
  "schema_version": "1.0",
  "endpoint": "grooming",
  "detected": true,
  "risk_level": "high",
  "risk_score": 0.78,
  "confidence": 0.9,
  "categories": [
    { "tag": "SECRECY_REQUEST", "label": "Secrecy Request", "confidence": 0.9 },
    { "tag": "FLATTERY", "label": "Flattery", "confidence": 0.85 }
  ],
  "recommended_action": "flag_for_review",
  "rationale": "The adult builds a privileged bond through flattery, then presses for concealment of the contact from the child's guardians.",
  "detected_language": "en",
  "message_analysis": [
    {
      "message_index": 1,
      "risk_score": 0.6,
      "categories": ["FLATTERY"],
      "summary": "Targeted praise to build a special bond."
    },
    { "message_index": 2, "risk_score": 0.05, "categories": [], "summary": "Ordinary reply." },
    {
      "message_index": 3,
      "risk_score": 0.75,
      "categories": ["SECRECY_REQUEST"],
      "summary": "Push to conceal the contact from guardians."
    }
  ]
}
```
