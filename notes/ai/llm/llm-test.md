---
tags:
- Testing
---

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
