---
tags:
  - FAQ
---

# NLP FAQ

## segmentation vs tokenization

- tokenization 是 segmentation
  - 更细分领域
  - 分词
- segmentation
  - 更宽泛的概念
  - 分出来的不一定是 词
  - 例如： Sentence Segmentation

## Intl.Segmenter

- granularity
  - grapheme
  - word
  - sentence
- localeMatcher
  - best fit
  - lookup


```js
const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
const segments = segmenter.segment('今天天气真的好好，好想出去玩。');
console.table(Array.from(segments));

console.log(Intl.Segmenter.supportedLocalesOf(['zh'], { localeMatcher: 'lookup', granularity: 'string' }));
```
