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
