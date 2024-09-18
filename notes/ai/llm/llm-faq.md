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

## Pricing

|                                 Model | 1M input/output |
| ------------------------------------: | --------------: |
|                                gpt-4o |  $5.00 / $15.00 |
|                           gpt-4o-mini |  $0.150 / $0.60 |
|                            o1-preview | $15.00 / $60.00 |
|                               o1-mini |  $3.00 / $12.00 |
|               Anthropic Claude 3 Opus | $15.00 / $75.00 |
|     Groq Llama 3.1 70B Versatile 128k |   $0.59 / $0.79 |
|                 Groq Whisper V3 Large |        $0.111/h |
| DeepInfra Llama-3.1-70B-Instruct 128k |   $0.35 / $0.40 |
|               DeepInfra Qwen2-72b 32k |   $0.35 / $0.40 |


- https://www.together.ai/pricing
- https://deepinfra.com/pricing
- https://groq.com/pricing/
- https://openai.com/api/pricing/

## model metrics

- 参数量
- 非Embedding参数量
- GQA
- Tie Embedding
- Context Window - 上下文长度
- 语言支持度
- Code Switch - 语言转换
  - 避免模型直接切换语言
- Safety
- 评测/Benchmark
  - MMLU
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

## structure

- https://github.com/dzhng/zod-gpt
- https://github.com/Microsoft/TypeChat

````
将用户提交的信息返回为如下 JSON 格式

```
{"fullName":"姓名","mobilePhone":"电话","address":"完整地址","province":"省","city":"市","zip":"邮编"}
```
````

```
陈小月 18421598413 四川省成都市武侯区天府大道中段666号
```

```
陈小月 18421598413 四川省 成都市 武侯区天府大道中段666号 610000
```

---

````
将用户提交的信息返回为如下 JSON 格式

```
{
 "orderNumber":"订单号",
 "companyName":"公司名称","capital":"注册资金",
 "legalName":"法人名称","legalPhone":"法人电话",
 "supervisorName":"监事名称","supervisorPhone":"监事电话",
 "shareholders":[{"name":"股东名称","phone":"股东电话","ratio":"持股比例"}],
 "scope":"经营范围"
}
```

- shareholders 为股东列表，尝试从上下文提取股东人员信息，如果没有股东则留空，如果强调了法人持股，则法人就是股东。
- ratio 为 number，没有百分号 `%`
````

```
订单号：2023123456789
公司名称：上海东东家政服务有限公司
注册资金：3万，法人持股100%
法人：姚丽，电话，19373380000，1234567@qq.com
监事：唐强 13801234000
一般项目：家政服务；专业保洁、清洗、消毒服务；礼仪服务；
```

## EF BF BD

- Replacement Character
- �
- `\ufffd`
- `\xef\xbf\xbd`
- Azure OpenAI GPT 3.5 turbo
- https://community.openai.com/t/tokens-are-mangled-for-some-non-english-characters-resolved/74315
- https://community.openai.com/t/gpt-4-1106-preview-messes-up-function-call-parameters-encoding/478500

## format

- GGUF
  - llama.cpp, August 21st 2023, 替代 GGML
- GGML
