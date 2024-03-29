---
tags:
  - FAQ
---

# UTM

- utm_source - 来源
  - 例如: google, billboard
- utm_medium - 媒介
  - 例如: cpc, banner, email
- utm_campaign - 活动名称
  - 例如: spring_sale, summer-sale
- utm_term - 关键词
  - 搜索关键词
- utm_content - 内容
  - 用于区分相似的内容
  - 可用于 A/B 测试
  - 例如: toplink
- utm_id
- UTM -> Urchin Tracking Module
  - web statistics analysis by Urchin Software Corporation
  - 2005 被 Google 收购 -> Google Analytics
- GA 必填
  - utm_source,utm_medium,utm_campaign
- GA4 必填
  - utm_source,utm_medium

## 参考

- [UTM 参数](https://en.wikipedia.org/wiki/UTM_parameters)
- https://ga-dev-tools.google/campaign-url-builder/
- [GA4 Collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952)
- [Urchin](<https://en.wikipedia.org/wiki/Urchin_(software)>)
- [Collect campaign data with custom URLs](https://support.google.com/analytics/answer/1033863)
- [百度统计/hm参数与utm参数的对应关系](https://tongji.baidu.com/web/help/article?id=262&type=0)
  - utm_source=hmsr - 媒体平台参数，一般用于标识广告投放的广告主、网站等信息，该参数为必填的物料信息。
  - utm_medium=hmpl - 计划名称参数，一般用于标识广告所属的推广计划信息，只有设置了推广计划信息，才可以设置推广单元信息。
  - utm_campaign=hmcu - 单元名称参数，一般用于标识广告所属的推广单元信息，只有设置了推广单元信息，才可以设置关键词和创意信息。
  - utm_term=hmkw - 关键词参数，一般用于标识触发广告的关键词信息。
  - utm_content=hmci - 创意参数，一般用于标识广告的创意形式信息。
- Matomo
  - 使用 mtm 前缀 - utm -> mtm
  - 额外参数
    - mtm_group, mtm_placement
  - https://matomo.org/faq/general/faq_119/
  - https://matomo.org/faq/tracking-campaigns-url-builder/
