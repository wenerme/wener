---
title: 语言
---

# Language

- `zh-Hans-CN`
- ISO 639-1 - 两个字母的语言代码
  - zh
- ISO 639-3
- ISO 639-5 - 三个字母的语言代码
- ISO 3166-1 Alpha 2 - 两个字母的国家代码
  - CN
- ISO 15924 - 四个字母的脚本代码
  - Hans
- RFC 4646 - extended language subtag - extlang
- RFC 5645
- RFC 5646
- IETF BCP 47 - 语言标签
  - zh-Hans-CN
  - wikipedia:[IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag)

```js
// > ['zh-Hans-CN']
Intl.getCanonicalLocales('zh-hans-cn');

// requested, available
Intl.LocaleMatcher.match(['zh'], ['zh-Hans-CN', 'zh-Hant']);
```

- Intl.LocaleMatcher
  - [tc39/proposal-intl-localematcher](https://github.com/tc39/proposal-intl-localematcher)
  - npm:@formatjs/intl-datetimeformat

## SEO

- Self-referencing
- HTML
  - meta http-equiv="content-language"
  - link rel="alternate" hreflang="x-default"
  - link rel="canonical"
- HTTP Header
  - Content-Language
  - Link rel="alternate" hreflang="x"
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
- https://technicalseo.com/tools/hreflang/

## developers.google.com

- view-source:https://developers.google.com/
  - zh-CN-x-mtfrom-en
  - x-mtfrom-en
    - 机器翻译（machine translation）自英语（en）
    - IETF BCP 47 `x-` 为私有标签

| hreflang  | Language            | Region        | 中文翻译            |
| --------- | ------------------- | ------------- | ------------------- |
| en        | English             | -             | 英语                |
| x-default | Default (Fallback)  | -             | 默认 (回退)         |
| ar        | Arabic              | -             | 阿拉伯语            |
| bn        | Bengali             | -             | 孟加拉语            |
| zh-Hans   | Simplified Chinese  | -             | 简体中文            |
| zh-Hant   | Traditional Chinese | -             | 繁体中文            |
| fa        | Persian (Farsi)     | -             | 波斯语 (法尔西语)   |
| fr        | French              | -             | 法语                |
| de        | German              | -             | 德语                |
| he        | Hebrew              | -             | 希伯来语            |
| hi        | Hindi               | -             | 印地语              |
| id        | Indonesian          | -             | 印度尼西亚语        |
| it        | Italian             | -             | 意大利语            |
| ja        | Japanese            | -             | 日语                |
| ko        | Korean              | -             | 韩语                |
| pl        | Polish              | -             | 波兰语              |
| pt-BR     | Portuguese          | Brazil        | 葡萄牙语 (巴西)     |
| ru        | Russian             | -             | 俄语                |
| es-419    | Spanish             | Latin America | 西班牙语 (拉丁美洲) |
| th        | Thai                | -             | 泰语                |
| tr        | Turkish             | -             | 土耳其语            |
| vi        | Vietnamese          | -             | 越南语              |

# FAQ

## Missing region-independant link for that language

- 例如 如果有 zh-CN 也一定要包含 zh
  - 不包含 region 的语言代码

## URL is not indexable
