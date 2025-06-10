---
tags:
  - FAQ
---

# LLM FAQ

- LLM
  - 预测下一个 Token
  - 训练不需要标注
- Instruct GPT
  - SFT - Supervised fine-tuning
  - https://huggingface.co/blog/rlhf
  - https://github.com/yizhongw/self-instruct
  - https://platform.openai.com/docs/model-index-for-researchers
- Tokenizer
  - https://github.com/QwenLM/Qwen/blob/main/tokenization_note_zh.md

## model metrics

- 参数量
- 非Embedding参数量
- GQA - Generalized Question Answering
- Tie Embedding
- Context Window - 上下文长度
- 语言支持度
- Code Switch - 语言转换
  - 避免模型直接切换语言
- Safety
- 评测/Benchmark
  - MMLU - Massive Multitask Language Understanding
  - MMLU-Pro
  - GPQA
  - TheoremQA
  - BBH
  - HumanEval
  - MBPP
  - MultiPL-E
  - GSM8K
  - MATH
  - C-Eval
  - CMMLU
  - Multi-Exam
  - Multi-Understanding
  - Multi-Mathematics
- 参考
  - https://qwenlm.github.io/zh/blog/qwen2/


## EF BF BD

- Replacement Character
- `�`
- `\ufffd`
- `\xef\xbf\xbd`
- Azure OpenAI GPT 3.5 turbo
- https://community.openai.com/t/tokens-are-mangled-for-some-non-english-characters-resolved/74315
- https://community.openai.com/t/gpt-4-1106-preview-messes-up-function-call-parameters-encoding/478500

## format

- GGUF
  - llama.cpp, August 21st 2023, 替代 GGML
- GGML
