---
tags:
  - Model
---

# Decision Model

- Decision Model / 决策模型
- Classifer Model / 分类模型
- type
  - choice / 选择
    - 归类与分流
  - score / 评分
    - 程度评估与分级
  - noul / 是否
    - 单一事实确认

```json
{
  "model": "jev-latest",
  "state": { "message": "I was charged twice for one order." },
  "questions": {
    "team": {
      "type": "choice",
      "instructions": "Choose the reviewing team.",
      "criteria": { "billing": "Payments and refunds", "support": "Technical help" }
    },
    "urgency": {
      "type": "score",
      "instructions": "Evaluate urgency with the ordered rubric.",
      "criteria": ["Normal review", "Timely response", "Immediate human attention"]
    },
    "duplicate": {
      "type": "noul",
      "instructions": "Does the message report a duplicate charge?"
    }
  }
}
```

---

- Clef
  - https://huggingface.co/Cloudflare/clef
    - Qwen/Qwen3.8-27B
  - https://huggingface.co/Cloudflare/clef-flash
    - Qwen/Qwen3.5-9B
  - https://clef-evals.workers-ai-mle.workers.dev/
- DiffusionGemma Jev
- Kev
- Laya

---

- 参考
  - https://docs.system-one.dev/en/docs/api
  - https://openrouter.ai/docs/api/api-reference/alphadecisions/submit-a-decisions-request
