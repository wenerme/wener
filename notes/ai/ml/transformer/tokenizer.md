---
title: Tokenizer
---

# Tokenizer

:::tip Workflow

- Tokenization/分词/Encode - 文本 -> Token IDs
  - 一般使用 BPE 算法
- Decode - Token IDs -> 文本

:::

- 算法
  - BPE - Byte Pair Encoding - 基于频率合并、自底向上 - BP 数据压缩算法
    - Byte Level
      - 能处理任意数据，不会出现 `[UNK]`
    - Character Level
    - Word Level
    - e.g. gpt2, llama
  - WordPiece - 基于概率合并、自底向上
    - e.g. bert
    - https://arxiv.org/pdf/1609.08144.pdf
  - Unigram - 基于概率剪枝、自顶向下
    - e.g. T5, ALBERT
- [SentencePiece](https://github.com/google/sentencepiece)
  - Apache-2.0, C++
  - 支持 BPE, unigram, char, word
- [openai/tiktoken](https://github.com/openai/tiktoken)
  - 定义的模型 https://github.com/openai/tiktoken/blob/main/tiktoken_ext/openai_public.py
- [huggingface/tokenizers](https://github.com/huggingface/tokenizers)
- https://github.com/rsennrich/subword-nmt

---

| model                | vocab size | tokenizer      | notes |
| -------------------- | ---------- | -------------- | ----- |
| openai/gpt2          | 50257      | byte-level-bpe |
| openai/r50k_base     | 50257      | byte-level-bpe |
| openai/p50k_base     | 50281      | byte-level-bpe |
| openai/p50k_edit     | 50283      | byte-level-bpe |
| openai/cl100k_base   | 100276     | byte-level-bpe |
| openai/o200k_base    | 200018     | byte-level-bpe |
| openai/o200k_harmony | 201088     | byte-level-bpe |

- o200k_harmony
  - vocabe 201088
  - 在 c200k_base 上增加了额外的特殊 token

| abbr.   | stand for                     | meaning |
| ------- | ----------------------------- | ------- |
| BPE     | Byte Pair Encoding            |
| unigram | Unigram                       |
| NFKC    | Unicode Normalization Form KC |

## SentencePiece

- spm_encode
- spm_decode
- spm_normalize
- spm_train
- spm_export_vocab

```bash
pip install sentencepiece
```

# FAQ

## tokenizer.json vs vocab.json

- vocab.json + merges.txt

```py
tokenizer = Tokenizer.from_file("byte-level-bpe.tokenizer.json)
# 会保存为 merges.txt+vocab.json
tokenizer.model.save('tokenizer')
```
