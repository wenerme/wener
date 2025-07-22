---
title: 开发用词字典
tags:
  - Glossary
  - FAQ
  - English
---

# 开发用词字典

统一在开发过程中需要用到的各种词汇. 主要用于

- 数据库表,字段
- 类,方法,字段
- 项目
- 接口
- 前端组件

**基本原则**

- 不要使用拼音
- 不要使用中国式英语
- 尽量避免使用缩写
  - 除非非常长
  - 除非很常见
- 尽量使用常见的词汇
- 对于相同含义的词汇跟进场景选用

:::tip

- 熟悉和使用 专业术语、行话、Glossary
  - 能够更好的沟通
  - 更改更精确的表达含义
  - 本身附带了 “行业” 属性
  - 本身附带了上下文信息
- 需要注意团队内达成一致

:::

| en             | cn                                             |
| -------------- | ---------------------------------------------- |
| sinology       | 汉学                                           |
| year-on-year   | 同比, 年度营收增长率                           |
| month-on-month | 环比, 月度营收增长率                           |
| robust         | 健壮性, ~~鲁棒~~                               |
| socket         | ~~套接字~~                                     |
| handler        | ~~句柄~~                                       |
| macro          | ~~宏~~                                         |
| metaphysics    | 形而上学, 形上学, 形之上学, 玄学, 在物理学之后 |
| philosophy     | 哲学,理学                                      |
| subjective     | 主观的                                         |
| objective      | 客观的                                         |
| idealism       | ~~唯心主义~~                                   |
| utilitarianism | ~~功利主义~~                                   |
| login,signin   | 登录                                           |
| signup         | 注册                                           |
| logout,signout | 登出,退出登录                                  |
| argument       | 实际参数                                       |
| parameter      | 形式参数                                       |
| chorus         | 合唱、复歌、~~副歌~~                           |
| verse          | 主唱                                           |
| debit          | 借, 左                                         |
| credit         | 贷, 右                                         |

> ~~划掉~~ 的词语表示不建议这样翻译, 或尽量避免从翻译去理解，直接理解本来的词义

- metaphysics - 形而上学
  - 越物质世界、探讨存在本质、宇宙本源和终极实在的哲学学说
  - 形而上学 这个翻译从小感觉就是贬义的
- idealism - 唯心主义
  - 本身是个中性词，但是从小的教育是贬义指向

## 多音字 {#heteronym}

| cn  | old              | new   | e.g. |
| --- | ---------------- | ----- | ---- |
| 从  | cóng, ~~cōng~~   | cóng  |      |
| 凿  | záo, ~~zuò~~     | záo   |      |
| 呆  | dāi, ~~ái~~      | dāi   |      |
| 咱  | zán, ~~zá~~      | zán   | 咱家 |
| 寻  | xún, ~~xín~~     | xún   |      |
| 往  | wǎng, ~~wàng~~   | wǎng  |      |
| 拎  | līn, ~~līng~~    | līn   |      |
| 斜  | xié, ~~xiá~~     | xié   |      |
| 框  | kuàng, ~~kuāng~~ | kuàng |      |
| 橙  | chéng, ~~chén~~  | chéng |      |
| 澎  | péng, ~~pēng~~   | péng  |      |
| 绕  | rào, ~~ráo~~     | rào   |      |
| 绩  | jì, ~~jī~~       | jì    |      |
| 脊  | jǐ, ~~jí~~       | jǐ    |      |
| 荨  | xún, ~~qián~~    | xún   |      |
| 说  | shuō, ~~shuì~~   | shuō  | 说服 |
| 迹  | jì, ~~jī~~       | jì    |      |
| 食  | shí, ~~sì~~      | shí   |      |
| 骑  | qí, ~~jì~~       | qí    |      |

| cn       | old             | new             |
| -------- | --------------- | --------------- |
| 阿房宫赋 | e pang gong fu  | e fang gong fu  |
| 大腹便便 | da fu pian pian | da fu bian bian |
| 坐骑     | zuo ji          | zuo qi          |
| 说服     | shui fu         | shuo fu         |

- [普通话异读词审音表（修订稿）](https://zh.wikisource.org/wiki/普通话异读词审音表（修订稿）)
  - 2016年5月 《普通话异读词审音表》（1985年）修订版
- [普通话异读词审音表](https://zh.wikipedia.org/zh-hans/普通话异读词审音表)
- http://www.moe.gov.cn/jyb_sjzl/ziliao/A19/201001/W020190416497956176438.pdf
- https://zhuanlan.zhihu.com/p/58435229

## 中文的优缺点 {#avoid-chinese-defect}

:::tip

- 文字只是辅助理解的工具。
- 近现代科学技术的发展几乎不在中文圈
  - 哲学、政治、经济、科技 相关的翻译先从日本传入
  - 可追溯 汉语外来词词典

:::

- 优点
  - 信息密度 非常/最 高
  - 二义性
    - 文字可以优美 - 留白
    - 文学性强
  - 象形文字
- 缺点
  - 信息密度 非常 高 - 阅读/理解 负担
  - 发音和结构非强相关
  - 汉字去掉了非常多的不常用字 - 记忆负担
  - 二义性
    - 相对不适合用于严谨的科学研究 - 因为总能够被解释
    - 咬文嚼字
    - 学术信息 参考 中文资料 和 英文资料 有明显感受
  - 象形文字 - 形意文字
    - 象形 表达在视觉上，难以体现逻辑关系
    - 不宜造字
    - 字形复杂
    - 书写负担 - 大陆汉字简化后已经没那么 象形 了
    - 舶来语不适应 - 无法联系实际意义
    - 科研相关的翻译就像灾难
    - 例如：化学元素周期表 - 实际的翻译几乎没用

---

- 不同的语言形成的思维会有所不同
- 参考
  - [Lost (or gained) in translation](https://www.economist.com/graphic-detail/2012/03/30/lost-or-gained-in-translation)
  - 知乎 https://www.zhihu.com/question/294972764/answer/790215150
  - 哪些专业名词翻译得特别烂？ https://www.zhihu.com/question/27192923
  - 汉学||这些词竟然来自日本！ https://www.sohu.com/a/253715588_176673

---

- 劳动节 - Labour Day / International Workers' Day
  - 实际是强调劳工，而不是劳动

## 社交 {#social}

> Internet forum

| abbr.  | stand for                     | mean             |
| ------ | ----------------------------- | ---------------- |
| AFAIK  | As Far As I Know              | 据我所知         |
| AMA    | Ask Me Anything               | 问我任何事       |
| BTW    | By The Way                    | 顺便说一下       |
| DM     | Direct Message                | 私信             |
| ETA    | Estimated Time of Arrival     | 预计到达时间     |
| ETC    | Et Cetera                     | 以及其他         |
| FOMO   | Fear of Missing Out           | 害怕错过         |
| ICYMI  | In Case You Missed It         | 如果你错过了     |
| IMHO   | In My Humble Opinion          | 我的谦虚意见     |
| IMO    | In My Opinion                 | 我的看法         |
| IRL    | In Real Life                  | 现实生活         |
| IYKWIM | If You Know What I Mean       | 如果你懂我的意思 |
| LMAO   | Laugh My Ass Off              | 大声笑           |
| LOL    | Laugh Out Loud                | 大声笑, 笑死     |
| NSFW   | Not Safe For Work             | 不适合工作场合   |
| OP     | Original Poster               | 楼主             |
| OTOH   | on the other hand             | 另一方面         |
| PITA   | Pain In The Ass               | 麻烦事           |
| PM     | Private Message               | 私信             |
| PS     | Postscript                    | 附言             |
| ROFL   | Rolling On the Floor Laughing | 笑到在地上打滚   |
| TBH    | To be honest                  | 说实话           |
| TIL    | Today I Learned               | 今天我学到了     |
| TL;TR  | Too Long To Read              | 简而言之         |
| TTYL   | Talk To You Later             | 回头见           |
| YMMV   | Your Mileage May Vary         | 具体情况具体分析 |

| abbr. | stand for              | mean         |
| ----- | ---------------------- | ------------ |
| sns   | social network service | 社交网络服务 |

## 俚语 {#slang}

- [bruh](https://www.urbandictionary.com/define.php?term=Bruh)

  - best answer to literally anything
  - 嘲笑别人的问题很傻

- [lit](https://www.urbandictionary.com/define.php?term=Lit)
  - used to describe something that is exciting or excellent
  - 形容某事令人兴奋或非常好

---

- https://languages.oup.com/google-dictionary-ch/

## 常见词汇 {#common}

|   abbr. | en           | cn           |
| ------: | ------------ | ------------ |
|         | synonym      | 同义词       |
|         | antonym      | 反义词       |
|         | homonym      | 同音异义词   |
|         | homograph    | 同形异义词   |
|         | acronym      | 首字母缩略词 |
|         | idiom        | 成语         |
|         | expression   | 表达         |
|         | phrase       | 短语         |
|   abbr. | abbreviate   | 缩写         |
|    adj. | adjective    | 形容词       |
|    adv. | adverb       | 副词         |
|      n. | noun         | 名词         |
|      v. | verb         | 动词         |
|   prep. | preposition  | 介词         |
|   conj. | conjunction  | 连词         |
|   pron. | pronoun      | 代词         |
| interj. | interjection | 感叹词       |
|    art. | article      | 冠词         |
|     pl. | plural       | 复数         |
|   sing. | singular     | 单数         |

| en                  | cn             | notes                                                         |
| ------------------- | -------------- | ------------------------------------------------------------- |
| list                | 列表           |
| detail              | 详情           |
| resource/res        | 资源           |
| number/no           | 编号           |
| count               | 数量           |
| service             | 服务           |
| management/mgmt     | 管理           |
| dashboard           | 工作台         |
| logo                | 商标           |
| icon                | 图标           |
| avatar              | 头像           |
| picture             | 图片           |
| banner              | 旗帜           |
| photo               | 照片           |
| category            | 分类           |
| amount              | 数额/金额      |
| mobile              | 手机号         |
| telephone           | 座机           |
| gender              | 性别           |
| working             | 在职           |
| leave               | 离职           |
| rank                | 等级           | 主动, 例如: 客户星级,产品评价                                 |
| grade               | 等级           | 被动, 例如: 成绩,商品                                         |
| property            | 属性           | 多指固有的,本身的,proper                                      |
| attribute           | 属性           | 多指特征的,可变的,tribute                                     |
| referral            | 引荐           | 主动, 掌握关系主动方<br/>例如: 别人引荐你给我, 你和我直接联系 |
| introduction        | 推荐           | 被动, 位于关系被动方<br/>例如: 别人介绍你给我, 由别人产生联系 |
| last name           | 姓             |
| surname             | 姓             |
| first name          | 名             |
| census              | 人口普查, 户籍 |
| ​household register | 户籍           |
| residential         | 住宅           |
| business card       | 名片           |
| red packet          | 红包           |
| red envelope        | 红包           |
| standing book       | 台账           |

- Accounting
  - 作为会计 是一门系统的学科，涉及记录、分类、汇总、报告财务交易的完整过程。
  - 包括会计原则、标准、报表和分析等多个层面，用于帮助企业或个人管理财务信息，做出合理决策。
  - 注意⚠️
    - 不只是 账 的概念
    - 不仅是 记录财务数据的行为
    - 包括审计、预算、税务管理等活动。
- 台账 - standing book / Ledger / Log/ Record
  - 流水账, 明细记录表, 日志记录
  - 包括 工作计划、工作记录、工作汇报
  - 原指摆放在台上供人翻阅的账簿，故名台账。
  - 记录详细信息
  - 追溯性和可查性
  - 分类管理

## 技术词汇 {#tech}

| abbr.  | stand for                    | zh_CN          |
| ------ | ---------------------------- | -------------- |
| distro | distribution                 | 发行版         |
| TSC    | Technical Steering Committee | 技术指导委员会 |
| href   | Hypertext REFerence          | 超文本引用     |
| ERP    | Enterprise Resource Planning | 企业资源计划   |
| WMS    | Warehouse Management System  | 仓库管理系统   |
| PRD    | Product Requirement Document | 产品需求文档   |
| MRD    | Market Requirement Document  | 市场需求文档   |

| word           | stand for  | notes                         |
| -------------- | ---------- | ----------------------------- |
| adhesive       | 粘合       |
| cohesive       | 拼装、凝聚 |
| Orchestration  | 编排       | 一个服务调度多个服务          |
| Choreography   | 编舞       | 各自负责各自的角色 - 事件总线 |
| reconciliation | 对账       |

## 服务商 {#service-provider}

| en       | stand for |
| -------- | --------- |
| wechat   | 微信      |
| qq       | QQ        |
| ali      | 阿里      |
| alipay   | 支付宝    |
| wecom    | 企业微信  |
| dingtalk | 钉钉      |

| en               | for    |
| ---------------- | ------ |
| miniprogram      | 小程序 |
| official account | 公众号 |
| public account   | 公众号 |

- mp.weixin.qq.com
  - MP -> Media Press / Media Platform - 媒体平台
  - https://mp.weixin.qq.com/s/Rg8NnCXGosouAm3NjkXu5Q

## 服务系统

| 英文              | 含义              | 释义                      |
| ----------------- | ----------------- | ------------------------- |
| bsp               | 服务商            | bussness service provider |
| provider          | 提供商            |
| vendor            | 厂商              |
| supplier          | 供应商,偏重第三方 |
| operation/op      | 操作              |
| contract          | 合同              |
| agreement         | 协议              |
| service agreement | 服务协议          |
| ability           | 能力              |
| charger           | 负责人            |

### 组织架构

| 英文                      | 含义     | 释义 |
| ------------------------- | -------- | ---- |
| member                    | 成员     |
| department                | 部门     |
| job position              | 工作职位 |
| job number                | 工号     |
| leader                    | 组长     |
| Administration Department | 行政部门 |

### 客户关系管理

| 英文              | 含义              | 释义                             |
| ----------------- | ----------------- | -------------------------------- |
| CRM               | 客户关系管理      | Customer Relationship Management |
| public customer   | 公海客户          |
| contact           | 联系人            |
| lead              | 线索              |
| opportunity       | 商机              |
| account           | 账户、客户        |
| source            | 来源              |
| rank              | 星级              |
| track             | 跟进              |
| track log         | 跟进记录/跟进日志 |
| tracker           | 顾问              | Who track the customer           |
| intension         | 意向              |
| sales             | 销售              |
| seller            | 销售人员/卖家     |
| prospective sales | 预期销售          |

### 交易支付/金融 {#finacial}

| 英文               | 含义                | 释义 |
| ------------------ | ------------------- | ---- |
| discount           | 打折                |
| rebate             | 回扣                |
| commission         | 回扣/抽成/佣金      |
| out of stock       | 缺货                |
| in sale            | 在售                |
| withdraw           | 提现                |
| bank address       | 开户行网点/银行地址 |
| pending payment    | 待付                |
| pending collection | 待收                |
| pre-payment        | 预付款              |
| pre-collection     | 预收款              |
| customer service   | 客户服务/客服       |
| buyer              | 买家                |
| refund             | 退款                |
| refund application | 退款申请            |
| invoice            | 发票                |
| receipt            | 单据                |
| input invoice      | 进项发票            |
| purchase invoice   | 进项发票            |
| output invoice     | 销项发票            |
| sales invoice      | 销项发票            |
| transaction record | 交易记录            |
| referral fee       | 介绍费/推荐费       |
| referral id        | 引荐编号            |
| fee rate           | 费率                |
| bank outlets       | 银行网点            |
| staking            | 质押                |
| deposit            | 订金、储存          |
| Collateral         |
| Balance            | 余额                |
| Asset              | 资产                |

### 电子商务

| 英文       | 含义                   | 释义                 |
| ---------- | ---------------------- | -------------------- |
| catalogue  | 商品目录               |
| article no | 货号                   |
| promotion  | 促销                   |
| promo code | 优惠码                 |
| upc        | Universal Product Code | barcode,通用产品代码 |
| sku        | Stock Keeping Unit     | 库存单位             |

**upc vs sku**

- upc
  - 用于对外 - 标识唯一产品
  - 一般 12 位 数字
- sku
  - 用于对内 - 标识库存信息
  - 一般 8 位 字母+数字

### 业务流程

| 英文       | 含义   | 释义 |
| ---------- | ------ | ---- |
| progress   | 流程   |
| property   | 属性   |
| attrbute   | 属性   |
| form       | 表单   |
| field      | 字段   |
| component  | 组件   |
| controller | 空间   |
| editor     | 编辑器 |
| viewer     | 查看器 |

## 法务

| en                 | cn         |
| ------------------ | ---------- |
| privacy policy     | 隐私政策   |
| privacy agreement  | 隐私协议   |
| service agreement  | 服务条款   |
| terms conditions   | 服务条款   |
| property right     | 物权       |
| software copyright | 软件著作权 |
| patent right       | 专利权     |
| trademark right    | 商标权     |
| website record     | 网站备案   |
| business secret    | 商业秘密   |

## 网站

### 搜索引擎优化

| 英文           | 含义         | 释义                   |
| -------------- | ------------ | ---------------------- |
| SEO            | 搜索引擎优化 | Search Engin Optimize  |
| UTM            | 跟踪模块     | Urchin Tracking Module |
| medium         | 媒体         |
| campaign       | 活动         |
| term           | 词组         |
| Event Tracking | 日志埋点     |

## 投融资

| 英文              | 含义     | 释义 |
| ----------------- | -------- | ---- |
| investor          | 投资人   |
| invest agency     | 投资机构 |
| invest case       | 投资案例 |
| invest domain     | 投资领域 |
| invest stage      | 投资阶段 |
| project stage     | 项目阶段 |
| project financing | 项目融资 |

### 常见数据集 {#dataset}

- 投资阶段
  - 种子轮
  - 天使轮
  - pre-A 轮
  - A 轮
  - B 轮
  - C 轮
- 项目阶段

## 政府 {#gov}

| abbr. | stand for                                                                | zh                                     |
| ----- | ------------------------------------------------------------------------ | -------------------------------------- |
| SAMR  | State Administration for Market Regulation                               | 国家市场监督管理总局                   |
| SFDA  | State Food and Drug Administration                                       | 国家食品药品监督管理局                 |
| CFDA  | China Food and Drug Administration                                       | 中国食品药品监督管理局                 |
| NMPA  | National Medical Products Administration                                 | 国家药品监督管理局                     |
| SAIC  | State Administration of Industry and Commerce                            | 国家工商行政管理总局                   |
| AQSIQ | General Administration of Quality Supervision, Inspection and Quarantine | 中华人民共和国国家质量监督检验检疫总局 |
| NBS   | National Bureau of Statistics                                            | 国家统计局                             |
| STA   | State Taxation Administration                                            | 国家税务总局                           |

## 公司企业 {#company}

| abbr./word               | meaning          | stand for                        |
| ------------------------ | ---------------- | -------------------------------- |
| BLN                      | 营业执照编号     | Business License Number          |
| brn                      | 工商注册号       | Business Registration Number     |
| usci                     | 统一社会信用代码 | unified social credit identifier |
| uscc                     | 统一社会信用代码 | unified social credit code       |
| ucc                      | 统一信用代码     | Uniform Credit Code              |
| org code/oc              | 组织机构代码     | Organization Code                |
| taxpayer no/tn           | 纳税人编号       | Taxpayer Number                  |
| reg number/reg no        | 注册号           |
| credit code              | 信用代码         |
| brand                    | 字号             |
| industry                 | 行业             |
| industry character       | 行业特征         |
| zone                     | 区域             |
| district                 | 行政区           |
| corporation              | 公司、企业、法人 |
| legal representative     | 法人代表         |
| legal person             | 法人             |
| legal entity             | 法人             |
| corporate representative | 法人代表         |
| supervisor               | 监事             |
| entrepreneurial          | 企业家           |

- 子公司 - 独立法律实体，管理上相对独立 - 母公司拥有控制权
  - Subsidiary
  - Affiliate (company)
- 母公司
  - Parent company
  - Holding company
  - Umbrella company
- 分公司 - 通常位于不同的地理位置，业务上可以具有一定的独立性
  - Branch
  - Local office
  - Satellite office
- 总公司
  - Head office
  - Headquarters

### 法人

- Business entity
- [Legal person](https://en.wikipedia.org/wiki/Legal_person)
  - 是 person 或 legal entity
  - legal entity
    - 能做大多 person 能做的事情
    - 但不是 people
    - 分为 human & non-human
      - human person - natural person, physical person
      - non-human - juridical person, legal, juridic, juristic, artificial, fictitious person
        - 拉丁语 persona ficta
- legal person
  - 侧重于法律权利和责任
- legal subject
  - 侧重于法律行为能力
  - anyone or anything that holds legal rights and duties

## 统计分析

| abbr. | word                       | stand for      |
| ----- | -------------------------- | -------------- |
|       | descriptive statistics     | 描述性统计     |
|       | insight                    | 洞察           |
|       | Statistical Analysis       | 统计分析       |
|       | statistics                 | 分析           |
| BI    | Business Intelligence      | 商业智能       |
| CDA   | confirmatory data analysis | 验证性数据分析 |
| EDA   | exploratory data analysis  | 探索性数据分析 |
| IDA   | initial data analysis      | 初步数据分析   |

## 财税 {#taxation}

| en                                        | 中文                              |
| ----------------------------------------- | --------------------------------- |
| Taxation                                  | 财税                              |
| Financial Voucher                         | 财务凭证 - 发票、收据、合同       |
| Financial Document                        | 财务文件 - 报表、预算、计划、分析 |
| Account Reconciliations                   | 对账                              |
| Accounting Outsourcing                    | 代理记账、财务服务外包            |
| Bookkeeping Outsourcing                   | 代理记账                          |
| Accountant                                | 会计师                            |
| Bookkeeping                               | 记账                              |
| Financial Statements                      | 财务报表                          |
| Ledger                                    | 账本                              |
| Income Statement                          | 收支结算表                        |
| Balance Sheet                             | 资产负债表                        |
| Profit and Loss Statement                 | 利润表                            |
| Cash Flow Statement                       | 现金流量表                        |
| Financial Analysis                        | 财务分析                          |
| Accounting Subjects                       | 会计科目                          |
| Tax Return Form                           | 纳税申报表                        |
| Bookkeeper                                | 记账员, 会计                      |
| Social Security                           | 社保                              |
| Imposition                                | 征收                              |
| File Tax                                  | 报税                              |
| Tax Filing                                | 纳税申报                          |
| Tax Planning                              | 税务筹划                          |
| Audit                                     | 审计                              |
| Accounting                                | 会计核算                          |
| Financial Analysis                        | 财务分析                          |
| Finance Advisory                          | 财务咨询                          |
| Customs                                   | 海关, 关税                        |
| Customs Clearance                         | 清关                              |
| Adjusted Gross Income (AGI)               | 调整后总收入                      |
| Taxable Income                            | 应税所得                          |
| Tax Credit                                | 税收抵免                          |
| Tax Deduction                             | 税收减免                          |
| Standard Deduction                        | 标准扣除额                        |
| Itemized Deduction                        | 逐项扣除额                        |
| Tax Exemption                             | 免税 - 减少应税收入的货币豁免     |
| Filing Status                             | 申报状态                          |
| Married Filing Jointly                    | 夫妻联合报税                      |
| Married Filing Separately                 | 夫妻单独报税                      |
| Single Filing                             | 单身个人报税                      |
| Head of Household Filing                  | 家庭户主报税                      |
| Qualifying Widow(er) with Dependent Child | 有子女的丧偶人士报税              |
| Tax Refund/Tax Rebate                     | 退税                              |
| Tax Receipt                               | 纳税收据                          |
| Tax Return Transcript                     | 纳税申报单                        |
| File Tax                                  | 报税                              |
| Evade Tax                                 | 逃税                              |
| Avoid Tax                                 | 避税                              |
| Impose/Levy                               | 征税/课税                         |
| Electronic Filing/E-File                  | 电子报税、网报                    |
| Filing                                    | 报税                              |
| Ledger                                    | 账本                              |
| Checkbook                                 | 支票簿                            |
| Accounts Payable                          | 应付账款                          |
| Accounts Receivable                       | 应收账款                          |
| Accruals                                  | 权责发生额                        |
| Amortization                              | 摊销                              |
| Asset                                     | 资产                              |
| Audit Trail                               | 审计追踪                          |
| Bank Reconciliation                       | 银行对账                          |
| Budget                                    | 预算                              |
| Capital                                   | 资本                              |
| Capital Expenditure                       | 资本支出                          |
| Cash Management                           | 现金管理                          |
| Cost of Goods Sold (COGS)                 | 销售成本                          |
| Credit                                    | 贷记，信用                        |
| Debit                                     | 借记                              |
| Depreciation                              | 折旧                              |
| Equity                                    | 股权，净资产                      |
| Expense                                   | 费用                              |
| Fiscal Year                               | 财政年度                          |
| General Ledger                            | 总账                              |
| Gross Margin                              | 毛利                              |
| Inventory                                 | 存货                              |
| Journal Entry                             | 日记账条目                        |
| Liabilities                               | 负债                              |
| Liquidity                                 | 流动性                            |
| Net Income                                | 净收入                            |
| Operating Expenses                        | 营运费用                          |
| Payroll                                   | 工资单                            |
| Profit Margin                             | 利润率                            |
| Retained Earnings                         | 留存收益                          |
| Return on Investment (ROI)                | 投资回报率                        |
| Revenue                                   | 收入                              |
| Trial Balance                             | 试算表                            |
| Variance Analysis                         | 差异分析                          |
| Working Capital                           | 营运资本                          |
| Year-end Closing                          | 年终结账                          |
| Internal Accounting                       | 内账 - 内部管理和决策             |
| External Accounting                       | 外账 - 财务状况                   |
| Management Bookkeeping                    | 经营账 - 日常收入、成本、费用     |
| Management Accounting                     | 经营会计                          |
| Managerial Accounting                     | 经营会计                          |

| abbr. | en              | cn     |
| ----- | --------------- | ------ |
| VAT   | value added tax | 增值税 |

- 个人/自然人 - individual/natural person
- 实体 - entity
- **return** 在税务领域表示报告纳税情况
  - return -> 回报 -> 往回报告 - 不是收益层的含义
- 稻盛和夫 -> 经营会计 -> 阿米巴经营 模式
  - 每个单位都有自己的利润目标和经营账户
  - 经营状况 - 收入、成本、利润
  - 目的
    - 提高透明度
    - 增强责任感
    - 促进效率
    - 激励创新

### Tax

| en                              | cn                                                  |
| ------------------------------- | --------------------------------------------------- |
| Alternative minimum tax (AMT)   | 替代性最低税                                        |
| Capital gain tax                | 资本利得（收益）税 - 出售股票，债券，贵金属和房地产 |
| Corporate tax                   | 公司税                                              |
| Custom duty                     | 关税                                                |
| Dividend tax                    | 股息税                                              |
| Duty                            | 税，关税                                            |
| duty free                       | 免税                                                |
| Estate tax                      | 遗产税 - 对死者的财产和财产的总价值征收             |
| Excise tax                      | 消费税                                              |
| Federal Unemployment tax (FUTA) | 联邦失业税                                          |
| FICA tax                        | 社会保险医疗保健税                                  |
| Gift tax                        | 赠予税                                              |
| income tax                      | 所得税                                              |
| individual tax                  | 个税                                                |
| Inheritance tax                 | 遗产税 - 向受益人征收                               |
| Medicare tax                    | 医疗保健税                                          |
| Payroll tax                     | 工资税                                              |
| Personal Income Tax             | 个人所得税                                          |
| Property tax                    | 财产税                                              |
| Sales tax                       | 销售税                                              |
| Social security tax             | 社会保险税                                          |
| Tariff                          | 关税、交税                                          |
| value added tax                 | 增值税                                              |
| Withholding tax                 | 预扣税                                              |

## 市场营销 {#marketing}

| abbr. | en                                  | cn                     |
| ----- | ----------------------------------- | ---------------------- |
| CPA   | cost per action                     | 每次行动成本           |
| CTA   | call to action                      | 行动号召               |
| CPC   | cost per click                      | 每次点击成本           |
| CPL   | cost per lead                       | 每次潜在客户成本       |
| CPM   | cost per mile                       | 千次展示成本           |
| EPC   | earnings per click                  | 每次点击收益           |
| CTR   | click through rate                  | 点击率                 |
| UV    | unique visitor                      | 独立访客               |
| PV    | page view                           | 页面浏览量             |
| ROI   | return on investment                | 投资回报率             |
| AIDA  | Attention, Interest, Desire, Action | 吸引、兴趣、欲望、行动 |

| en                  | cn       |
| ------------------- | -------- |
| Rentention          | 留存     |
| Affiliate Agreement | 联盟协议 |
| Commission          | 佣金     |
| Above the fold      | 屏幕上方 |
| Chargeback          | 退款     |

## 房屋租赁 {#property-rent}

| abbr. | en                       | cn           |
| ----- | ------------------------ | ------------ |
| PMS   | Property Rental System   | 物业租赁系统 |
| RMS   | Rental Management System | 租赁管理系统 |

|                         en | cn           |
| -------------------------: | ------------ |
|      Housing Rental System | 房屋租赁系统 |
|   Commercial Rental System | 商业租赁系统 |
| Rental Property Management | 租赁物业管理 |
|            Rental Property | 租赁物业     |
|    Labor Management System | 劳务管理系统 |

| en                       | cn                         |
| ------------------------ | -------------------------- |
| actual received amount   | 实收款                     |
| amortization             | 摊销                       |
| arrear                   | 欠款、拖欠                 |
| asset                    | 资产                       |
| balance                  | 余额                       |
| billing / invoicing      | 开票                       |
| bonus / dividend         | 分红                       |
| buget                    | 预算                       |
| capital                  | 资本                       |
| cash flow                | 现金流                     |
| collect rent             | 收租                       |
| collect security deposit | 收押金                     |
| default on payment       | 违约                       |
| depreciation             | 折旧                       |
| due date                 | 到期日                     |
| Estate                   | 房地产、遗产               |
| expense / expenditure    | 支出                       |
| fee / charge             | 费用                       |
| holder                   | 持有人                     |
| house / unit             | 房屋、单元                 |
| income                   | 收入                       |
| internal transfer        | 内部转账, 内转             |
| invoice number           | 发票号码                   |
| labor fee                | 劳务费                     |
| landlord                 | 房东、地主                 |
| lease                    | 租约、租赁合同             |
| ledger / account book    | 分类账、账簿               |
| liability                | 负债                       |
| loan                     | 贷款                       |
| loan repayment           | 还款                       |
| mantenance               | 维护、保养                 |
| margin                   | 保证金                     |
| notice period            | 通知期限                   |
| overdue                  | 逾期                       |
| payable amount           | 应付款                     |
| payment term             | 付款条款                   |
| property                 | 物业、财产                 |
| proportion / ratio       | 比例                       |
| Raising The Rent         | 提高租金                   |
| Real Estate              | 房地产                     |
| Real Estate Business     | 房地产业务                 |
| receivable amount        | 应收款                     |
| renewal of lease         | 续租                       |
| rent                     | 租赁、租金                 |
| rent collection record   | 收租记录                   |
| rent Due                 | 租金到期                   |
| rental                   | 租赁、租金                 |
| renter                   | 租客                       |
| return security deposit  | 退押金                     |
| security deposit         | 押金                       |
| service fee              | 服务费                     |
| tax                      | 税                         |
| tenant / lessee          | 租户、承租人、房客         |
| transaction              | 交易                       |
| utility                  | 公用事业                   |
| utility bill             | 公用事业账单               |
| utility fee              | 公用事业费用、水电费、杂费 |
| vacancy                  | 空置                       |
| vacancy rate             | 空置率                     |
| voucher / receipt        | 凭证、收据                 |

- Housing
  - 住宅
- Property
  - 物业
  - 房产
- Commercial
  - 商业
- Lessee - 强调租赁关系
- Occupant, Resident - 强调居住状态
- Renter - 租客 - 简单地指一个支付租金使用房屋的个体
- Tenant - 租户
- Holder - 持有人 - 类似 landlord 和 house 的关系
- Rental management - 租赁管理
  - 租赁行业 - rental industry - 设备租赁
  - 工具、重型施工设备、空中设备、车辆、派对和活动设备、计算机、测试和测量设备等
  - 欧洲设备租赁行业 http://www.hae.org.uk
- [Rental management software](https://en.wikipedia.org/wiki/Rental_management_software)

# FAQ

## customer vs account vs client vs consumer vs user

- customer - 顾客、客户
  - 购买产品的个体 - 人或公司
  - 交易性质
  - 在零售、餐饮、在线购物等领域更常使用
- consumer - 消费者
  - producer
  - 使用产品的个体
  - 不一定是 customer
- client - 客户端、客户
  - service
  - 接受服务或信息的个体 - 一般不是产品
  - 系通常更长期、更个性化
  - 作为客户
    - 用于专业服务或定制服务中，指接受这些服务的个人或组织
    - 在法律、会计、咨询、广告等专业服务领域更常使用
    - 关注服务的质量、专业性、定制化程度
- account - 账户
  - 你或你公司 与 其他人或公司 建立的联系
    - 联系类型： 客户、合作伙伴、供应商
  - 持续提供信息，产品，服务等咨询
  - 不同的 context 下可能表示不同的意思
    - 例如 财务行业下可能代表科目
- contact - 联系人
  - 与客户、供应商、合作伙伴等建立联系的个体
  - 通常是 account 的一部分
- user
  - 按照合约使用信息、产品、服务的个体
- vendor - 服务商、供应商
  - 提供产品或服务的个体
  - 平级
- supplier - 供应商
  - 提供产品或服务的个体
  - 侧重于供应链

## username vs user name vs userName

- username - 用户名
  - 唯一性
- user name/userName - 用户的名字
  - 类似于 FirstName，Full name 之类的含义
  - 不具有唯一性
  - 尽量使用 FullName 避免不必要的混淆

## group vs department vs team vs role vs bu

- group
  - 人或事务的集合 - 与人多对多
    - 例如一个群组里可能有用户也可能有机器人
  - 单纯用于分组 - 弱业务性质和上下级关系
    - A 组、B 组
  - 可以用于对 department, team, role 等进行建模
  - 例如:
    - /
      - departments/
        - CEO/
      - teams/
        - Project-A/
      - roles/
        - admin/
- role
  - 通常用于 ACL 语境
  - 结构形式类似于 group
- department
  - 人的集合 - 与人多对一
  - 具有业务属性和上下级关系
    - 财务部 - 表示财务相关的业务
- team
  - 人的集合 - 与人多对多
  - 组织架构中类似 group - 但更具有管理属性
  - 主要便于跨部门协作

## business unit vs division vs deparment

- 组织架构三层关系
- business unit - 事业部/业务单元 - 例如 出版署
  - 侧重独立的业务目标和运营
  - 有自己的目标、战略和运营计划，专注于特定的产品线或市场领域
  - 可能拥有自己的营销、财务、研发等职能部门，相对独立地运作，并针对特定的产品线或市场
  - 有自主的管理和利润中心
  - 独立业务定位目标
  - 按业务目标考核
  - 相对独立的业务单元，可跨组织
  - 位于某个地点
- division - 分部 - 例如 市场分部、消费者分部
  - 位于某个地点的某些办公室或者区域
- deparment - 部门 - 例如 编辑部、较对部
  - 位于公司某个区域
  - 组织内**职能**单位
  - 侧重一个领域的职能作用
  - 受组织层级管理
  - 为组织整体目标服务
  - 按职能目标考核
- 参考
  - [Developing the Organizational Hierarchy](https://www.archibus.net/ai/abizfiles/v21.2_help/archibus_help/Subsystems/webc/Content/background_gen/org_hierarchy.htm)
  - wikipedia [Corporate structure](https://en.wikipedia.org/wiki/Corporate_structure)
  - [Corporate structure](https://corporatefinanceinstitute.com/resources/knowledge/finance/corporate-structure/)

## activity vs event

- event
  - 最原子的事件
  - 使用一个 点 表示
  - 可以被独立标示
- activity
  - 活动 - 通常有开始结束
  - 通常表示状态变化，类似于一个链接
  - 达成活动可能有一定条件 - 例如 A 转变为 B 还是 C 取决于一定条件
  - 活动底层也是通过事件驱动

## notes vs comment vs remark

- notes
  - 简单信息
  - 个人参考或者提醒
  - 对话、会议、演讲的总结，对某个主题的思考和观察
  - 使用场景：学习、会议记录、个人备忘录，或者任何需要记录关键信息的场合。
- comment
  - 对某个话题、事件或意见的评价或解释
  - 包含个人的看法、批评、或者解释
  - 强调能 reply
  - 使用场景：在线讨论、代码评审、书籍或文章边注，或者任何需要提供反馈、见解的地方。
- remark
  - 暗示了观点的智慧或机智，但也可以是比较普通的评论。

## Supplier vs. Provider vs. Vendor

建议同等对待 “服务商”和“供应商”。

---

- Supplier
  - B2B 关系 - 产品供应商
  - 是上游
  - 一般指生产资料供应商，而非直接产品
  - Supplier 之间对比的是质量和影响关系
- Provider
  - 类似于 Supplier
  - 通常用于服务相关，非实际产品
- Vendor
  - B2B 或 B2C 关系
  - 不强调上下游关系
  - 批量采购进行售卖的角色
  - 销售的内容是产品
  - Vendor 之间对比的是价格

## Subject vs Catalog

- Catalog
  - 目录、商品目录
- Subject
  - 主题、科目

都有分类的含义，但分类的方式和内容不同。Subjet 更客观，更规范的分类。Catalog 一般是由人主观进行编撰的。

## up-sell & cross-sell & down-sell

- up-sell
  - 向上销售 - 提更高价产品
  - 提高产品价值，提升单价销售
  - 例如 买车的时候推销更高端的座椅配件、提高免费维保
  - 手段
    - Upgrade
    - Offer a Limited-Time Discount
    - Do a Free Service
    - Provide an Ongoing Service
    - Tell Them What You Can Do
- cross-sell
  - 交叉销售 - 提其他类似产品
  - 例如 买车的时候推销车险
- down-sell
  - 向下销售

## association, relationship & correlation

- association - 关联
  - 是一种 relationship
  - 将两者进行关联 - 相对更加主观，强调关联动作
- relationship - 关系
  - 表明两者有相关性 - 客观关系
  - 表明两者之间有链接
- correlation - 相关性
  - measure of association and mathematical tools are provided to measure the magnitude of the correlation.
  - 度量 association/relationship

## Register vs Registry

- Register - A recording of items, names, or actions
  - 事情/动作
  - 可以是名词也可以是动词
  - 名词 - 登记簿, 注册表, 记录本, 名册
  - 动词 - 登记, 注册, 记录, 挂号
  - 例如 “guest register”（宾客登记簿）， “register a complaint”（登记投诉）
  - 特点
    - 灵活性：可以记录各种类型的信息，如名称、物品、事件等。
    - 日常使用：常见于日常事务中的记录和登记。
- Registry - A place where you Register
  - 地点
  - 存储记录 - 登记册、档案
  - 名词 - 登记处, 注册中心, 记录库, 档案馆, 名册
  - 强调的是存储和管理这些记录的 **实体** 或 **机构**
  - 例如 domain name registry
  - 内容: RegisteredItem, Entry, Record, ComponentRegistration
  - 特点：
    - 专门性：通常是专门设立的机构或数据库，用于存储特定类型的信息。
    - 管理功能：不仅存储记录，还负责管理和维护这些记录的完整性和准确性。
- Registrar - One who registers
  - 人/执行人
  - 负责注册工作的个人或机构
- Registration - the act of registering
  - 动作
  - 指注册的行为本身，包括提交必要的信息以登记记录某物或某人，或是为参加某项活动、获取权限等而进行的行为。

## setting vs configuration vs properties vs options vs preferences

- properties - 属性
  - 通常影响整个组件或程序
  - 相对泛指
  - 可能影响应用行为
  - 键值对 .properties
- configuration - 配置
  - 针对应用和用户自定义
  - 通常有默认值 - 基础
  - 通常在运行前发生
  - 用于定义应用程序的整体行为和环境
- option - 选项
  - 类似配置 - 但可能指更小的范围
  - 通常在运行时发生
  - 例如一个方法有很多选项
  - 临时、局部、方法参数
  - 常见于命令行参数或函数调用中的参数
- setting - 设置
  - 由行为操作发生变化
  - 整个应用维度
  - 通常指用户在应用程序中可以调整的参数
- preferences - 偏好
  - 由用户行为操作发生变化
  - 强调偏好 - 有主体 - 通常为用户
  - 通常指用户在应用程序中的个性化设置

---

- macOS
  - [plist](https://en.wikipedia.org/wiki/Property_list)
    - preference-list, property-list
    - `Library/Preferences`
  - Launch Services Database
    - 类似 Windows HKEY_CLASSES_ROOT
  - `man scutil`
  - mdls
  - [defaults](<https://en.wikipedia.org/wiki/Defaults_(software)>)
    - `defaults read com.apple.iTunes`
    - https://keith.github.io/xcode-man-pages/defaults.1.html
- Windows [Registry](https://en.wikipedia.org/wiki/Windows_Registry)

## picture vs image vs photo

- picture - 图片
  - 更多指打印的，物理的
  - 可以是绘画、照片等实体形式
  - 通常用于描述具体的、可触摸的物体
- image - 图像
  - 更多指数字的，光学成像产生的
  - 可以是数字文件、屏幕显示等
  - 通常用于描述通过电子设备生成或处理的视觉内容
- photo - 照片
  - 通过相机或其他设备拍摄的图像
  - 可以是数字的或打印的
  - 通常用于描述通过摄影技术捕捉的视觉内容

## module vs plugin vs extension

- module
  - 自身完整
  - 新增额外功能
  - 可以是整体里的一部分 - 例如 组件/Component
- plugin
  - 自身不完整
  - 配合现有体系使用 - 可能是可替代的某个角色
  - 通常实现某种接口进行服务提供
- extension
  - 含义相对宽泛 - 增加了 内容/功能/能力
  - 甚至是可以是 完整的软件+Plugin 构成的 新的整体
- 参考
  - https://softwareengineering.stackexchange.com/a/316231/126631

## job title vs job position

- job title - 职称
  - 公司指定的头衔或称谓
  - 通常用于描述员工在公司的等级或角色
  - 例如：软件工程师、项目经理、销售主管
- job position/position - 工作职位
  - 描述具体的职责和工作内容
  - 更关注于员工的实际工作和任务
  - 例如：负责开发新功能的前端开发人员、管理团队的项目经理

## phone

- contact phone - 联系电话
  - 用于联系某人的电话号码，可以是家庭电话、办公电话或手机
- home phone - 家庭电话
  - 安装在家庭中的固定电话
- office phone - 办公电话
  - 安装在办公室中的固定电话
- mobile phone - 手机
  - 便携式的无线电话设备
- telephone - 电话
  - 泛指所有类型的电话设备，包括固定电话和手机

## name

- full name - 全名
- first name - 名
- last name - 姓
- middle name - 中间名
- nickname - 昵称
- display name - 显示名
- login name - 登录名
- username - 用户名
- domain name - 域名
  - LDAP/AD
- unique name - 唯一名
  - 通常用于标识
- salutation - 称谓
  - Mr. Mrs. Ms. Dr.
- code name/code - 代号
  - 通常用于标识
- slug - 短标识
  - 通常用于 url
- title - 标题
  - 通常用于描述

## title vs salutation

- Title
  - 职业称号或学术头衔
  - "Dr."、"Prof."、"Mr."、"Ms."
  - **正式** 地表示一个人的社会、职业或学术地位
- Salutation
  - 用于表示书信或电子邮件
  - 更侧重于个人的社交尊称

## title vs label

- label
  - metadata - 元数据
  - 非常简短
  - 支持指代部分属性
  - 可以作为描述信息
    - 配合 value 组成一组数据 - value 面向逻辑，label 面向人类
    - 这时候和 title 最相似 - 可互换
  - 也可能是 label=value - 例如 namespace=default
    - 可以用于过滤
    - label ~= key
  - label 通常有一定定义 - 例如 female
- title
  - 描述性信息
  - 可能概述了内容
  - 不需要结构性
  - 比 description 更短

## title vs name

- title
  - 通常是一个描述性的名字
  - 用于描述一个事物的名称或头衔
  - 例如：文章标题、书名、电影名称
  - title 通常还配合 description, subtitle, tagline, summary 等
- name
  - 通常是一个唯一的标识符
  - 用于标识一个人、物体或概念
  - 例如：人名、产品名称、文件名
  - name 通常还配合 id, key, code, slug 等

## tltr vs summary vs description

- tltr - 摘要
  - 极其简短，高度浓缩。
  - 只呈现核心内容或关键信息。
  - 不涉及细节或背景。
- summary - 概括
  - 简洁地覆盖全部要点和大致内容脉络。
  - 使读者快速理解整体情况。
  - 适合于提供一个快速的全局理解。
- description - 描述/说明
  - 详细解释具体内容、特征、用途或背景。
  - 包括细节和更深入的信息。
  - 适合需要全面了解具体情况时使用。

## realm vs tenant vs organization

- tenant - 租户
  - 概念更宽泛 - 任何服务
  - 给多个 用户/租户 提供服务的能力
  - 租户=隔离
- realm - 域
  - 在 auth 环境下的术语 - 概念类似 domain
  - 虚拟 Identity Provider/IdP，用于认证 tenant 用户
  - 更大规模的 auth 环境下支持 跨 realm 认证
- organization - 组织
  - 业务语义
  - 取决于怎么实现组织的 SSO - 一般一个组织对应一个 realm

---

- https://www.ibm.com/docs/en/zos/2.2.0?topic=basics-purpose-realms

## glossary vs terminology vs concept vs terms

- glossary - 术语表
  - 包含专用术语的列表
  - 通常不提供详细解释
  - 常用于某特定上下文或领域
  - 示例：包括缩写、专有名词、行业用语
- terminology - 术语
  - 指某一领域或主题中的专用词汇
  - 多为单独的术语
- concept - 概念
  - 对术语或其他抽象思想的解释
  - 较抽象，需要详细说明和阐释
  - 通常是用来解释复杂的 terminology
- terms - 词汇
  - 指一般或特定语境中的词语
  - 范围较广，可以是任何术语或普通词语

## status vs state

- status - 阶段
  - 结果状态 - 成果、失败
  - 面向用户 - 404、200
  - 可以理解为 stage - 阶段
  - 可能支持自定义 - SaaS 场景可能租户能自定义不同 status 来表达不同业务场景含义
- state - 状态
  - 中间状态 - 等待、执行
  - 有限状态 - 状态机 - state machine
  - 通常固定 - 系统判断依据

---

- 一个 state 可能对应 多个 status
- state 整个流程，status 具体步骤
- 简单场景可以考虑只用 status

---

- 例如订单状态
  - state - 已提交, 已支付, 已发货, 已完成
  - status - 等待处理, 正在进行, 暂时延迟, 即将完成

---

- 参考
  - Dynamic365 entity state & status
  - Status (statecode) - Status Reason (statuscode)
    - state -> status
    - status -> Status Reason

## topic vs subject

- topic - 话题
  - 更广泛、简单、日常
  - 通常指讨论或写作的主题
  - 例如：今天的讨论话题是环境保护。
- subject - 主题
  - 更具体
  - 更关注论点
  - 通常指学术或研究中的具体领域或科目
  - 例如：她的研究主题是量子物理。

## study vs learn

- study - 学习
  - 过程
  - 指专注于某一主题或学科，通过阅读、研究、上课等方式获取知识
  - 例如：我每天花两个小时学习数学。
- learn - 学到
  - 结果 - 获取知识
  - 指通过学习、经验或练习掌握新知识或技能
  - 例如：我学会了如何编程。

## sex vs gender

- sex - 性别 - 生理性别/生物性别
  - male, female
  - intersex - 难以划分, 间性
  - 生物特征，出生便决定了
- gender - 社会性别/性别认同
  - 个性 - 可变
  - 内在自我
  - 非二元性别

---

- 性别表达（Gender Expression）：指个人通过行为、服饰、发型等外在方式表达其性别认同。
- 跨性别者（Transgender）：指性别认同与其生理性别不一致的人。
- 性别多样性（Gender Diversity）：强调社会对不同性别身份和表达的包容与认可。
- 性取向（Sexual Orientation）：与性别概念不同，指个人在情感或性方面被何种性别的人所吸引。
- 参考
  - https://www.ons.gov.uk/economy/environmentalaccounts/articles/whatisthedifferencebetweensexandgender/2019-02-21

## study vs research

- verbs
  - study - 学习
    - 表示系统性学习
    - 可以表示为一个动作，例如：I study math every day.
  - research - 研究
    - 表示深入调查和分析
    - 通常用于学术或科学领域，例如：She researches quantum physics.
- nouns
  - study - 学习
    - 单次学习
    - 例如：I have a study session tonight.
  - research - 研究
    - 表示一组 study 的集合
    - 更系统、更深入的调查和分析
    - 例如：His research on climate change is groundbreaking.

## inside vs insight vs internal

- inside
  - 位置
  - 既有事实 - CPU 在电脑中
  - 隐含主观动作 - 把 X 放到 Y 中
  - 例如：The keys are inside the drawer.
- insight
  - 思考
  - 深刻的理解或见解
  - 例如：She has great insight into human behavior.
- internal
  - 描述 inside 这样的一个事实
    - inside of something
  - 描述事物联系 - 与 public 对立
  - 内部的，通常指组织或系统内部
  - 例如：The company has internal policies.

## modeling vs design

- modeling - 建模
  - 描述已知的事情
  - 对即将要做的事情做假设 - 确定事情怎么做、限定范围
  - 通过模型来表示系统或过程的结构和行为
  - 例如：我们使用 UML 建模来描述系统架构。
- design - 设计
  - 对未知的事情进行假设
  - 创造性地规划和构思解决方案
  - 关注外观、功能和用户体验
  - 例如：我们设计了一个新的用户界面。

---

- https://wiki.c2.com/?DesigningVsModeling

## note vs memo vs remark

- note - 笔记
  - 用于记录信息或想法
  - 可以是简短的或详细的
  - 例如：I took notes during the meeting.
- memo - 备忘录
  - short note
  - 通常用于在组织内部传达信息
  - 例如：The manager sent a memo about the new policy.
- remark - 评论
  - 简短的评论或意见
  - 通常是口头的
  - 例如：He made a remark about the weather.

## duration vs interval vs elapsed

- duration - 持续时间
  - 指某个事件或过程从开始到结束所花费的时间
  - 例如：The duration of the meeting was two hours.
- interval - 间隔
  - 指两个事件之间的时间间隔
  - 例如：There was a five-minute interval between the two presentations.
- elapsed - 经过的时间
  - 指从某个起点到现在所经过的时间
  - 通常用于描述时间的流逝

## Software Design vs. Software Architecture

- Architecture
  - 关注整体
  - 战略
- Design
  - 关注局部
  - 战术

## staff vs personnel vs employee

- employee - 员工/雇员
  - 强调雇佣关系
  - 形式上更正式
  - 例如：The company has 100 employees.
- staff - 工作人员
  - 更通用的形式
  - 是一个组织的一员，不一定是雇佣关系，例如 volunteer
  - 例如：
    - staff member - 工作人员
    - member of the staff - 工作人员
    - staff meeting - 员工会议
- personnel - 人员
  - 通常用于指代组织中的所有员工
  - 常用于正式或行政上下文
  - 例如：
    - personnel department - 人事部门
    - director of personnel - 人事主管
    - personnel expenses - 人员开支

## on premise vs cloud

- on premise - 本地化
  - 安装在客户提供的环境 - 可以是本地也可以是客户的云端
  - 按需部署
  - 安全、成本、完全可控
  - 基础成本高，足量后成本低
  - 实现更复杂
  - 例如：On-premises Software - 本地软件
- cloud - 云化
  - 云端部署 - 供应商的环境
  - SaaS (Software as a Service) 模式
  - 低初始成本，按需付费
  - 维护和扩展更简单
  - 例如：使用 AWS、Azure 等云服务

## data breach vs data leak

- data breach - 数据泄露
  - 事件
  - 原因: cyberattack、木马、系统漏洞、不安全密码、第三方
  - 通常指数据被恶意访问或窃取
  - 例如：A data breach occurred due to a cyberattack.
- data leak - 数据泄漏
  - 未知、被动
  - 原因: 错误配置、人为失误、软件漏洞、物理层面、弱密码
  - 通常指数据意外地暴露或泄漏
  - 例如：Sensitive information was exposed due to a data leak.
  - 作为已知事件后一般都用 breach - leak 只表示这个事情发生非主观

---

- https://en.wikipedia.org/wiki/Data_breach
- https://www.upguard.com/blog/data-breach-vs-data-leak

## specification vs descriptor

- specification - 规格信息
  - 限定内容
  - 详细说明产品或系统的要求和标准
  - 例如：The specification outlines the technical requirements.
- descriptor - 描述信息
  - 文字性
  - 用于描述某物的特征或属性
  - 例如：The descriptor provides a summary of the product's features.

---

- https://answers.sap.com/questions/8738184/specification-symbols-and-descriptor-symbols.html

## spec vs schema

- schema - 模式、架构
  - 数据结构
  - 数据组织方式
  - 包含字段、数据类型、约束
- spec - 规范
  - 执行标准
  - 细节规范
  - 包含 步骤、顺序、条件、操作细节

## tag vs label

- label
  - 标签
  - 倾向于正式或预定义的分类
  - 可以是 KV 结构
  - GitHub 的 Issuse 标签使用的 Label
  - Gitlab 的 Issuse 标签使用的 Label
    - 支持多层级 `Parent::Child::Key` - 同层级互斥
  - Kubernetes 的资源使用的 Label+Annotation
    - Label 用于匹配 - 会索引
    - Annotation 任意修改
  - Docker 元数据使用 Label
- tag
  - 标记
  - 表示一种**非正式**的、用户定义的分类方法
  - 通常是一串字符串
  - Stackoverflow 的问题使用的 Tag

## meta vs metadata

- meta
  - 元
  - 是一个词前缀 - `meta-`
  - ObjectMeta - 通常为一个对象
- metadata
  - 元数据
  - 描述数据的数据
  - 通常为一个字段

## profile vs info

- profile - 主观档案
  - 通常指用户的个人资料或配置
  - 包含用户的偏好设置、历史记录等信息
  - 例如：用户可以在个人资料中设置自己的头像和简介。
- info - 客观信息
  - 通常指一般信息或数据
  - 不特指用户的个人信息
  - 例如：系统信息、应用程序信息等。

## view vs viewer

- view
  - 通常偏模型
  - 例如一个 view 可能有多个 viewer
- viewer
  - 通常指视图实体

---

- e.g. Editor 为 Viewer, EditorView 为底层文档模型
- [What is the difference between a view and a viewer?](https://wiki.eclipse.org/FAQ_What_is_the_difference_between_a_view_and_a_viewer%3F)

## enterprise vs corporation vs company vs firm

公司的不同形态

- company - 公司
  - 依法成立的公司
  - 一般指任何类型的商业实体
- enterprise - 企业
  - company 都可以叫 enterprise
  - 一般会用于指代 创新、艰难、重要 的 商业项目
  - 更强调创业精神和创新
- corporation - corp. - 集团公司、大型公司
  - 在 enterprise 基础之上，更严谨
  - 法律义务责任
  - 脱离单个法人
  - legal corporation/法人公司
  - 通常指大型、跨国公司
- incorporated - inc.
  - (of a company or other organization) formed into a legal corporation.
  - 表示公司已注册成为法人实体
- firm - 公司、事务所
  - 提供服务类业务
  - 通常指专业服务公司，如律师事务所、会计师事务所

## namespace 翻译 {#namespace}

- 命名空间
  - 指 可以在一个 空间里进行 命名
  - 通常指代一种行为
  - 只要创建出来了 **上下文** 通常就会产生 命名空间
  - 命名空间 ~= 上下文
  - 例如： Java 里没有 "namespace" 但是有命名空间概念
  - 例如： 通常 module,class,block 都是一个命名空间
- 名字空间
  - 直译 namespace
  - 更能指代具体的事物
  - 例如： Kubernetes 里就是有 Namespace，但也有其他命名空间概念
    - 例如: 全局/Cluster 也是一个命名空间
  - 就像 向量空间、颜色空间、坐标空间 一样
    - 名词+“空间”

---

虽然传统翻译里用 “命名空间” 翻译 namespace 概念，但是认为如果就是指代 “Namespace”，那 “名字空间” 更合适。

## area vs region vs district vs location vs address

- 抽象层级 region > area > district > location > address

---

- area
  - 小区域
  - 面积或区域的广泛概念，可以指自然地理区域、行政划分、或者某个具体的空间或场所。
  - 通常用于泛指一个较大的地理、社会或功能区域，不特指具体的行政单位。例如，可以说“住宅区”、“商业区”等。
- region
  - 大区域
  - 区域，常指较大的地理或行政区域，可以跨越多个国家或包含多个州、省。
  - 常用于描述具有某种共同地理特征、文化特征或经济特征的大片区域。例如，亚马逊雨林、中东地区等。
- district
  - 区或地区，一般指一个较小的行政划分单元，如城市的一部分或乡镇。
  - 在行政管理、选举、商业等多个领域中有特定含义。例如，学区（教育行政区域）、商业区。
- location
  - 位置，指一个点或者一个很小的区域在空间上的具体位置。
  - 通常用于指明某个具体的地点或地理位置，无论是通过描述、坐标还是其他方式。例如，“我们公司的位置在市中心。”
- address
  - 地址，更具体、更正式地标识某个位置或场所的信息。
  - 用于邮件寄送、定位、识别某个特定的住所、建筑或机构等。它通常包括街道名、门牌号、城市、州/省、国家和邮政编码等信息。
- Jurisdiction - 管辖区域
  - 法律上的区域
  - 通常是一个行政区域，由政府或法律规定的机构负责管理和执行法律。
- Administrative Division - 行政区划
  - 行政区域的划分，通常由政府或其他管理机构负责管理和执行。

## location vs coordinate

- location - 位置
  - 通常指一个具体的地点或区域
  - 可以是城市、建筑、地标等
  - 例如：The location of the meeting is at the downtown conference center.
- coordinate - 坐标
  - 通常指一个点在空间中的精确位置
  - 使用数字表示，如经度和纬度
  - 例如：The coordinates of the Eiffel Tower are 48.8584° N, 2.2945° E.

## mobile vs phone vs tel

- tel - telephone
  - 泛指任何通讯设备
  - 包括 mobile 和 landline
- mobile - 移动电话
  - 可指 cordless phone, cellphone, walkie-talkie
  - 通常指手机 (cellphone)
- phone - 电话
  - 泛指所有类型的电话设备
  - 包括固定电话 (landline) 和移动电话 (mobile)

## core vs base vs extend vs common vs share

- core
  - 强调核心、主体
  - 引擎
  - 有业务语义
  - 例如：核心模块 (core module)
- base <-> extend
  - base 强调基础
  - base 通常可以被 extend
    - 与 abstract 不同，base 可独立可用
  - 例如：基础类 (base class)
- extend
  - 附加部分
  - 用于扩展 base 的功能
  - 例如：扩展类 (extended class)
- common
  - 弱业务性质
  - 工具性
  - 例如：通用库 (common library)
- share
  - 多个业务功能共享部分
  - 例如：共享组件 (shared component)

## deposit vs margin

- deposit - 押金、存款、保证金
  - 租赁、银行、预付款、合同履约等
  - 指为确保合同履行、租赁物品归还、账户资金安全等而预先支付的一笔钱。通常在合同结束或义务履行后可退还。
  - 例如：房屋租赁押金、银行存款、预付定金。
- margin - 保证金
  - 金融交易（如股票、期货、外汇）、杠杆交易
  - 指在金融交易中，为了获得更大交易额度或杠杆操作，按规定比例缴纳的最低资金。margin 主要用于风险控制，未必可退还。
  - 例如：股票保证金账户、期货交易保证金。

**对比说明**

- deposit 更加通用，适用于多种场景，强调“预先支付、可退还”。
- margin 主要用于金融领域，强调“风险担保、杠杆交易”，通常与交易额度、风险管理相关。
- 在租赁、合同等场景优先使用 deposit；在金融交易、投资等场景优先使用 margin。

**示例**

- 房屋租赁时支付押金（deposit），合同结束后如无损坏可退还。
- 股票交易时账户需有一定保证金（margin），以满足杠杆交易要求。

## task vs job vs process vs background process vs flow

- job - 作业 / 工作 / 工程
  - 宏观 (Macro)，粒度较大，通常包含多个步骤。
  - 关注 达成目标 / What
  - 侧重描述 可调度性、按需运行
  - 一个 job 可能包含多个 task
  - 通常具有监控、日志记录、故障恢复等机制
  - job 强调被调度执行
- task - 任务 / 步骤 / 事项
  - 微观 (Micro)，粒度较小，是构成Job的具体动作。
  - 关注 要做什么 / How
  - 侧重描述内容
  - 强调 原子性、单一职责原则
  - 通常运行一次
  - 一个 job 或 process 可能包含多个 task
  - 接近 step/activity
- flow/workflow - 工作流
  - 侧重描述流程、依赖
  - 通常具有连续运行的特点
- process - 进程
  - 类似于 job
  - process 更多是自主运行
  - 通常指操作系统中的进程
  - 系统视角 而不是 业务视角
  - BPM 也定义了 Process 对象
  - Process 强调 **规则和顺序**, Job 强调 被调度的 **执行实例**
  - 可以是一个守护进程 (Daemon)，持续在后台监听事件
  - Job 通常是被外部调度器在特定时间或条件下触发
- step - 步骤
  - 强调 描述性
  - 在流程里的 步骤
- activity - 活动
  - 接近一个 event 的概念
  - 很多系统里会把所有发生的 事件 记录为 activity
  - 事件本身是中性的，activity 强调了上下文和做了什么
  - 是过去的、已发生的
  - Task 是未来的、待执行的
- background process / Background Job - 后台进程/后台任务
  - 强调不可见、不需要用户干预
  - 在后台运行的进程
  - 非阻塞、异步、无界面、资源友好
  - 目的: 自动化维护、提升用户体验
  - 例如：后台数据同步

## workflow vs flow

> flow / workflow 通常包含一个或多个 task/job/process
> flow 强调有一定条件性质，不只有一条 Path

---

- workflow
  - 强调 预定义流程
  - 图形化设计
  - 一个系统内部执行
  - 内部事件触发
  - 使用更广泛
- flow
  - 强调 动态自由流程

## usci vs uscc

统一社会信用代码

- uscc - unified social credit code
  - **官方叫法**
  - code 更强调是一个编码
- usci - unified social credit identifier
  - identifier 更强调是一个标识符 - 唯一性、标识性

---

- https://en.wikipedia.org/wiki/Unified_Social_Credit_Identifier

## create vs add

- create
  - 强调从无到有
  - 通常涉及初始化
  - 例如：create a new file, create a user account
- add
  - 强调增加
  - 通常 add X to Y
  - 例如：addUserToGroup, addArticleToCategory
  - 增加到已有的集合或结构中

## address

- Address - 任何类型的地址
- Mailing Address - 地址用于邮寄, 区分账单地址或办公地址
  - 信件、账单、杂志 等
- Shipping Address - 物理商品配送
  - 通常用于较大包裹的发送，特别是涉及到在线购物、大件商品的运输等。
  - 电商场景用的多
  - 与 "shipping costs"（运费）、"shipping information"（运输信息） 相关
- Postal Address - 邮政 - 适合传统的邮件寄送
- Street Address: - 街道信息
- Physical Address: - 区分电子地址（如电子邮件）和物理地址
- recipient address - 收件人地址

## parse vs resolve vs normalize

- parse - 解析
  - 抽象与结构化
  - 文本 -> 信息/结构化
  - 例如：parse a JSON string into an object
- resolve - 确定/解决/解析
  - 决策与确定性
  - 处理不确定性、冲突、多重可能性
  - 例如：resolve a hostname to an IP address
- normalize - 标准化/规范化
  - 标准化与一致性
  - 数据标准化、数据清洗、统一格式
  - 例如：normalize a phone number format

## sort vs order

- sort
  - 排序 - 操作
  - 通常是对一组数据进行排序
  - 例如：sortBy
  - 强调排序的动作或过程
- order
  - 有序 - 定义、规则
  - 通常有序的含义更强
  - 例如：order by
  - 可以是多个 OrderRule
  - 强调数据的顺序或排列方式

## value vs values vs options vs items vs enums vs data

- value
  - 通常单个值
  - 或者指代 “值” 这个概念 - 因此也可能是数组
  - 例如：The value of the variable is 42.
- values
  - 多个值
  - 例如：The values in the array are [1, 2, 3].
- options
  - 选项
  - 面向界面
  - 例如：The dropdown menu has several options.
- items
  - 项
  - 面向数据
  - 例如：The list contains several items.
- enums
  - 枚举
  - 面向代码结构定义
  - 例如：The enum defines the possible states.
- data
  - 数据
  - 没有单数双数概念
  - 例如：The data is stored in a database.
- datum
  - 单个数据点
  - 例如：Each datum represents a unique measurement.

## Resource vs Entity vs Record vs Object vs Item vs Document vs Entry vs Row vs DTO vs Model vs Schema

- 数据库纬度
  - Record、Row、Entry、Document
- 数据维度
  - Item、Entry
- ORM
  - Entity、Object、Document
- 转换
  - DTO、Model

---

- Entity
  - ORM、数据库表模型
- Resource
  - 接口、RPC、Service 层

## PostalCode vs ZipCode

- 邮政编码/邮编
- PostalCode
  - 在许多国家和地区（如加拿大、英国、澳大利亚等）中使用的术语
  - 例如：
    - 英国: AA9A 9AA (e.g. EC1A 1BB)
    - 加拿大: A9A 9A9 (e.g. K1A 0B1)
    - 澳大利亚: 9999 (e.g. 2000)
    - 中国: 999999 (e.g. 100000)
- ZipCode
  - 特别是在美国使用的术语，是“Zone Improvement Plan Code”的缩写
  - 例如：
    - 基础格式: 99999 (e.g. 10001)
    - 扩展格式: 99999-9999 (e.g. 10001-1234)

## expiry vs expire_at vs end_at

- expiry - 名词
  - 到期的时间点或期限
- expire_at
  - 动作的完成状态

## Material vs Document

- Material
  - 物质、原料或具体的物品
  - 可以泛指各种形式的 **物理对象** ，包括文件和其他手持物品
  - 除了纸质文件外，还可能包括其他形式的物理对象
    - 样本、产品、原型、设备等
- Document
  - 特指书面材料，如文件、表格、证书或其他书面记录
  - 文档性质 - 结构化
  - 主要是纸质或电子形式的书面记录和信息

## tag vs label

- tag - 标记
  - 标识性
- label - 标签
  - KV 性质

## message vs event vs command

- event
  - 只关心发出
  - fire and forget
- message
  - 有明确目标
  - 通信方式
- command
  - 有明确寓意

## event bus vs message queue

- event bus
  - 强调实时通信
  - 一般没有缓冲机制
  - 可能同步执行
- message queue
  - 强调队列、阻塞、缓冲
  - 可能被批处理
  - 一般异步执行

## relation vs association

- relation
  - 泛指关系
  - ERM - 实体关系模型 (Entity-Relationship Model)
  - relate - 动词 - 关系
  - 例如：The relation between two tables in a database.
- association
  - 具体关系
  - 强调实体之间的特定关联
  - 例如：User associated with Order
  - 用户与订单一对多的关联关系
  - associate - 动词、名词 - 关联

## relationship vs relation

- relation
  - 如何进行关联的 - how to connect
  - 泛指关系
  - 例如：The relation between two tables in a database.
- relationship
  - 关联本身 - the connection
  - 强调实体之间的特定关联
  - 例如：The relationship between a user and their orders.

## property vs attribute

- property
  - 固有属性
  - 改变 property 则不是同一个物体
- attribute
  - 自有属性
  - 相同 property 下每个物体有不同的属性

## state vs status

- state
  - 一般指瞬时，当前状态
  - 例如 任务的状态：停止
  - 例如 物体的状态：液态的、固态的
  - 固有的状态
- status
  - 一般可枚举，指有那些状态
  - 可指在固定状态中流转
  - 例如 任务状态：停止、运行、初始化
  - 具体情况，例如 status of stop state - 描述停止的原因

## where vs filter vs condition vs criteria

> 都是用于从 集合/表/数组 中筛选数据的术语

- where - SQL、字符串、对象
  - 一般用于 SQL 查询中
  - 指定查询结果需要满足的条件
  - 通常用于数据库查询语句中
  - 内容通常为字符串
  - 例如：SELECT \* FROM users WHERE age > 30;
- filter - 对象、函数
  - 一般用于编程中的数据处理
  - 筛选符合特定条件的数据
  - 通常用于数组、集合等数据结构的操作
  - 例如：users.filter(user => user.age > 30);
- condition - 单个条件
  - 通用术语，指满足特定要求的条件
  - 用于控制流和逻辑判断
  - 广泛应用于编程和查询中
  - 更多描述为逻辑判断，通常不指代整体
  - 例如：if (condition) { ... }
- criteria - 搜索+排序+选择
  - 一般用于定义搜索或排序的标准
  - 指定符合标准的数据或行为
  - 通常用于高级搜索和排序功能
  - 例如：排序标准、搜索标准
  - 例如：JPA CriteriaBuilder 用于构建动态查询

## inspect vs sniff

- inspect - 检查
  - 主动检查获取系统内部的详细信息或状态
  - 代码调试、软件工程、性能分析
  - 例如：使用调试工具 inspect 代码中的变量值
- sniff - 嗅探
  - 被动监测捕获信息
  - 网络安全、性能分析、协议分析
  - 例如：使用网络嗅探器 sniff 网络流量

## handler vs handle

- handler - 句柄
  - 名词 - 表示处理过程或处理机制
  - 一个对象或函数
- handle - 处理
  - 动词 - 表示执行处理的动作。
  - 一个动作或函数
  - 处理某件事情的行为或过程

## path vs dir

- path - 路径
  - 可以是目录也可以是文件
  - 是一个字符串
- dir - directory - 目录
  - 强调是一个目录

## Concurrency vs Parallelism / 并发 vs 并行

- 并发
  - 例如 1 核心的 CPU 运行 4 个线程
- 并行
  - 例如 4 核心的 CPU 运行 4 个线程

摘自 Akka 文档

Concurrency and parallelism are related concepts, but there are small differences.
Concurrency means that two or more tasks are making progress even though they might not be executing simultaneously.
This can for example be realized with time slicing where parts of tasks are executed sequentially and mixed with parts of other tasks.
Parallelism on the other hand arise when the execution can be truly simultaneous.

## Deadlock vs Starvation vs Live-lock / 死锁 vs 饥饿 vs 活锁

- 死锁
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 需要 R2，B 持有 R2 需要 R1
- 饥饿
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 和 R2 需要 R2，B 需要 R1 才能继续进行
- 活锁
  - A B 两个线程， R1 R2 两个资源，A 持有 R1 每隔一段时间检测 R2 是否可用，B 持有 R2 每隔一段时间检测 R1 是否可用
  - 都在允许，但无法进行到下一步

摘自 Akka 文档

Deadlock arises when several participants are waiting on each other to reach a specific state to be able to progress.
As none of them can progress without some other participant to reach a certain state (a “Catch-22” problem) all
affected subsystems stall. Deadlock is closely related to blocking, as it is necessary that a participant thread be
able to delay the progression of other threads indefinitely.
In the case of deadlock, no participants can make progress, while in contrast Starvation happens, when there are
participants that can make progress, but there might be one or more that cannot. Typical scenario is the case
of a naive scheduling algorithm that always selects high-priority tasks over low-priority ones. If the number of
incoming high-priority tasks is constantly high enough, no low-priority ones will be ever finished.
Livelock is similar to deadlock as none of the participants make progress. The difference though is that instead
of being frozen in a state of waiting for others to progress, the participants continuously change their state. An
example scenario when two participants have two identical resources available. They each try to get the resource,
but they also check if the other needs the resource, too. If the resource is requested by the other participant, they
try to get the other instance of the resource. In the unfortunate case it might happen that the two participants
“bounce” between the two resources, never acquiring it, but always yielding to the other.

## language vs script

- language
  - 语言
  - 一种人类交流的方式
  - 例如：中文、英文、法文
- script
  - 文字
  - 一种书写的方式
  - 例如：“简体中文”、“繁体中文”、“拉丁字母”

## 后台管理系统名称 {#admin-system-name}

- Console - 控制台
  - 通常指代系统的管理界面
  - 系统管理、配置或监控等较为技术性的任务
  - 例如 AWS Console, Google Cloud Console
  - 感觉： 传达出一种专业和技术性强的氛围。
- Workbench - 工作台
  - 全面的工作环境
  - 提供了多种工具和功能，让员工可以完成各种任务，从客户关系管理到企业资源规划等。
  - 感觉：给人以实用、多功能的印象，适用于更广泛的工作环境
- Hub - 中心
  - 各种活动和信息集中处理点的概念
  - 所有资源和工具
  - 感觉： 传达出一种集中、统一的印象
- Portal - 门户
  - 作为公司内部信息、任务、资源和服务访问入口的平台
  - 一种全面接入点的概念
  - 使员工能够轻松访问自己需要的一切
  - 感觉： 传达出一种全面、便捷的印象
- Enterprise Suite - 企业套件
  - 一个包含多种功能的综合性企业应用软件集合
- Workspace - 工作空间
  - 个性化和定制化的工作区域
  - 感觉： 传达出一种个性化、定制化的印象

## 帐 vs 账

- **帐 (zhàng)**：多用于指布幕、篷帐，引申为记录、记载。也用于某些旧时的会计科目。
  - 例如：蚊帐、营帐、借帐（旧时指借款的记录）。
- **账 (zhàng)**：主要指关于钱财的记录、债项、账目等。
  - 例如：账本、账单、算账、还账、欠账。

**简单记忆方法：**

- 如果和布有关，用“帐”。
- 如果和钱财数目有关，用“账”。

**容易混淆的词语：**

- **帐号 vs 账号**：现在通常都用“账号”，指网络服务的用户身份。但“帐号”在某些旧的会计语境下也可能出现。
- **记帐 vs 记账**：现在通常都用“记账”，指记录财务账目。

- 现代汉语中，“账”的使用频率远高于“帐”

## 参考 {#reference}

| en         | cn        |
| ---------- | --------- |
| primary    | 初级,主要 |
| secondary  | 次级,次要 |
| tertiary   | 第三级    |
| quaternary | 第四级    |
| quinary    | 第五级    |
| senary     | 第六级    |
| septenary  | 第七级    |
| octonary   | 第八级    |
| nonary     | 第九级    |
| denary     | 第十级    |

---

- https://unbug.github.io/codelf/
  - 起名专用
- https://www.dictionary.com/browse/employee?s=t
  - 查含义和词源
- etymonline.com
- 查询缩写词
  - https://www.abbreviations.com

| abbr. | for                                 |
| ----- | ----------------------------------- |
| SDLC  | Software Development Life Cycle     |
| AIDA  | AI Developer Assistant              |
| AIDA  | Attention, Interest, Desire, Action |

- [AIDA](<https://en.wikipedia.org/wiki/AIDA_(marketing)>)
  - Attention - 注意
  - Interest - 关心
  - Desire - 欲求
  - Memory - 记忆
  - Action - 行动
  - AIDMA
- 中文
  - freemdict.com
  - zdict

## Abbr

| abbr       | latin           | en          |
| ---------- | --------------- | ----------- |
| no., №, Nº | numero          | number      |
| lb         | lībra (balance) | pound       |
| &          | et              | and         |
| e.g.       | exempli gratia  | for example |
| i.e.       | id est          | that is     |
| etc.       | et cetera       | and so on   |
| vs.        | versus          | against     |
| cf.        | confer          | compare     |
| et al.     | et alii         | and others  |
| N.B.       | nota bene       | note well   |
| P.S.       | post scriptum   | postscript  |

- https://www.bbc.com/news/magazine-26014925
