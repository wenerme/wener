---
title: Voxtral
---

# Voxtral

- 支持中文
- [mistralai/Voxtral-Mini-3B-2507](https://huggingface.co/mistralai/Voxtral-Mini-3B-2507)
  - ~9.5 GB of GPU RAM in bf16 or fp16
- [mistralai/Voxtral-Small-24B-2507](https://huggingface.co/mistralai/Voxtral-Small-24B-2507)
  - ~55 GB of GPU RAM in bf16 or fp16
- Voxtral Mini Transcribe
- https://huggingface.co/docs/transformers/main/en/model_doc/voxtral
- https://mistral.ai/news/voxtral
- https://huggingface.co/spaces/MohamedRashad/Voxtral

```bash
uv pip install -U "vllm[audio]" --torch-backend=auto --extra-index-url https://wheels.vllm.ai/nightly
uv run python -c "import mistral_common; print(mistral_common.__version__)"

vllm serve mistralai/Voxtral-Mini-3B-2507 --tokenizer_mode mistral --config_format mistral --load_format mistral
```
