---
tags:
- Testing
---

## Structures

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


## DocumentTypeDefinitionTest

> 4o 没问题

调整以下代码，使用正确的 name 和变量名字, 使用 PascalCase

```ts
const a = defineDocumentType({
  name: '',
  title: '经营场所合法证明',
  description: '房屋租赁合同 和 房产证',
});

const b = defineDocumentType({
  name: '',
  title: '经营场所布局',
  description: '平面装修图',
});
const c = defineDocumentType({
  name: '',
  title: '申请书',
});
const d = defineDocumentType({
  name: '',
  title: '食品经营许可证申请书',
});
const e = defineDocumentType({
  name: '',
  title: '食品经营设备设施布局',
  description: '食品经营的设备设施布局图 或 食品安全设施设备登记表',
});
const f = defineDocumentType({
  name: '',
  title: '设备设施布局',
});

const g = defineDocumentType({
  name: '',
  title: '操作流程',
  description: '食品经营操作流程图',
});
const h = defineDocumentType({
  name: '',
  title: '从业人员健康证明',
});
```

## 推理

```
小红有两个姐姐和四个妹妹，她的四个妹妹中年龄第三小的小青总共有几个姐姐？
```

> 答案是 `5`

但这里 `第三小` 有点歧义，也可能得到答案 4

---

```
今有雉兔同笼，上有三十五头，下有九十四足，问雉兔各几何？
```

> 雉（鸡）有 23 只，兔有 12 只。


## Vision

- https://huggingface.co/blog/gemma3
- https://huggingface.co/datasets/merve/vlm_test_images
