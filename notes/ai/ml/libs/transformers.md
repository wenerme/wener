---
title: transformers
---

# transformers

```bash
uv add transformers torch torchvision pillow accelerate
```

```py
from transformers import AutoConfig, AutoModel, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased", use_fast=True)
print(tokenizer.is_fast)
```

---

- attn_implementation
  - flash_attention_2
    - fp16, bf16
  - sdpa
    - default for PyTorch v2.1.1
  - https://huggingface.co/docs/transformers/perf_infer_gpu_one
- Fast Tokenizer
  - AutoTokenizer.from_pretrained(..., use_fast=True)
  - rust 实现，更快, 10-100 倍
  - 支持并行处理和批量分词
  - 大部分模型都支持
  - 读取统一的 tokenizer.json 格式
  - 支持所有主流分词算法（BPE、WordPiece、SentencePiece）
  - https://huggingface.co/docs/tokenizers/python/latest/quicktour.html#fast-vs-slow-tokenizers
- https://github.com/dottxt-ai/outlines
  - 结构化文本
  - Vision https://dottxt-ai.github.io/outlines/latest/cookbook/atomic_caption/

## 模型文件结构

- **config.json** - 模型架构配置，包含层数、隐藏单元数、注意力头数等超参数
  - 被 `AutoConfig.from_pretrained()` 读取
  - 用于模型初始化和推理配置
- **tokenizer_config.json** - 分词器配置文件
  - 定义分词器类型、特殊标记处理方式、预处理参数
  - 被 `AutoTokenizer.from_pretrained()` 读取
- **vocab.json** - 词汇表映射文件
  - 将词汇/子词映射到数字ID，定义模型词汇空间
  - 分词器初始化时读取，用于文本编码解码
- **special_tokens_map.json** - 特殊标记映射
  - 定义 [CLS]、[SEP]、[PAD]、[UNK] 等特殊标记的具体值
  - 分词器读取，用于序列标记和填充
- **merges.txt** - BPE(Byte Pair Encoding)合并规则
  - 用于子词分割的合并操作序列
  - BPE分词器读取，执行子词切分算法
- **tokenizer.json** - 统一分词器定义文件
  - 包含完整分词逻辑的标准化格式(HuggingFace Tokenizers库格式)
  - 被快速分词器(Fast Tokenizer)读取，提供高性能分词
- **chat_template.json** - 对话模板配置
  - 定义多轮对话的格式化规则和系统提示词
  - 用于聊天模型的对话历史格式化
- **preprocessor_config.json**
  - 图像预处理，也可能包含音频等其他模态的预处理配置
  - 被 AutoImageProcessor.from_pretrained() 或 AutoProcessor.from_pretrained() 读取
  - 常见于视觉-语言模型（如 CLIP、BLIP、LLaVA）
  - 包含的参数例如：
    - size: 图像尺寸
    - mean/std: 归一化参数
    - do_resize/do_normalize: 预处理步骤开关
    - image_processor_type: 处理器类型

## Latest Version

```bash
# 先尝试使用最新版
pip install --upgrade transformers

# 不行则可以尝试使用 source
pip install https://github.com/huggingface/transformers/archive/refs/heads/main.zip
```

# FAQ

## cannot import name 'get_full_repo_name' from 'huggingface_hub'
