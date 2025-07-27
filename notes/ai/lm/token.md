---
title: Token
---

# LLM Tokenizer

- digram coding / Byte-pair encoding / [BPE](https://en.wikipedia.org/wiki/Byte_pair_encoding) tokeniser
- [dqbd/tiktoken](https://github.com/dqbd/tiktoken)
  - JS port and JS/WASM bindings for openai/tiktoken
  - https://github.com/dqbd/tiktoken/blob/main/tiktoken/model_to_encoding.json
  - https://github.com/dqbd/tiktoken/blob/main/tiktoken/registry.json
  - Online https://tiktokenizer.vercel.app/
    - [dqbd/tiktokenizer](https://github.com/dqbd/tiktokenizer)
  - https://tiktokenizer.vercel.app/hf/Qwen/Qwen2.5-72B/tokenizer.json
    - https://huggingface.co/Qwen/Qwen2.5-72B/blob/main/tokenizer.json
- [zurawiki/tiktoken-rs](https://github.com/zurawiki/tiktoken-rs)
  - MIT, Rust
- [openai/tiktoken](https://github.com/openai/tiktoken)
- https://platform.openai.com/tokenizer

**ChatGPT 特殊 Token**

```
<|endoftext|>
<|endofprompt|>
<|eos|>
<|pad|>
<|bos|>
<|eol|>
<|math|>
<|doc|>

<|im_start|>
<|im_end|>
<|im_sep|>

<|fim_prefix|>
<|fim_middle|>
<|fim_suffix|>
```
