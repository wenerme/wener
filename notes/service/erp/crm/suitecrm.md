---
title: SuiteCRM
tags:
  - CRM
  - SuiteCRM
  - PHP
  - Service
---

# SuiteCRM

- [Wikipedia: SuiteCRM](https://en.wikipedia.org/wiki/SuiteCRM)
- [Crowdin: SuiteCRM Translations (zh-CN)](https://crowdin.com/project/suitecrmtranslations/zhcn)
- [Tenfold: Close-Won Opportunities](https://www.tenfold.com/what-is/close-won-opportunities)
- [Gary Smith: Closed Won](https://garysmithpartnership.com/closed-won/)

## Overview

SuiteCRM 是一款开源 CRM 系统，基于 SugarCRM CE 分支发展而来。

- **API**: Internal usage jsonrpc.
  - [JSON-RPC Specification](https://www.jsonrpc.org/specification)
- **Database**: Approx 220 tables.

## Deployment (Docker)

```bash
# MariaDB
docker run -d \
  -e ALLOW_EMPTY_PASSWORD=yes \
  -e MARIADB_USER=suitecrm \
  -e MARIADB_PASSWORD=suitecrm \
  -e MARIADB_DATABASE=suitecrm \
  -v $PWD/db:/bitnami/mariadb \
  -p 3306:3306 \
  --name suitecrm-mariadb bitnami/mariadb:latest

docker volume create --name suitecrm-data

# SuiteCRM
docker run -d \
  -e SUITECRM_DATABASE_USER=suitecrm \
  -e SUITECRM_DATABASE_PASSWORD=suitecrm \
  -e SUITECRM_DATABASE_NAME=suitecrm \
  -e SUITECRM_USERNAME=admin \
  -e SUITECRM_PASSWORD=admin \
  -v $PWD/data:/bitnami \
  --link suitecrm-mariadb:mariadb \
  -p 80:80 -p 443:443 \
  --name suitecrm bitnami/suitecrm:latest
```

## Core Modules (核心模块)

### Accounts (客户/账号)

中心实体，关联联系人、线索、机会、活动等。它是所有公司与外部关系的合集。

> In real world terms an Account may be a business entity that is a qualified Sales Prospect, Customer, Supplier or Re-seller.

### Contacts (联系人)

独立自然人。通常关联一个账号（企业组织）或机会（合格的潜在客户）。提供所有的历史沟通记录。

- **Who**: 确定了“谁”。
- **Where**: 知道在“何处”工作时，作为客户的一部分。
- **What**: 知道可能会买“什么”时，关联商机。

### Opportunities (商机/机会)

合格的销售潜在客户，很有可能会产生业务来往。已确认有购买力，且在准备进行购买。

> Track your Opportunities throughout the Sales Pipeline until the deal is 'Closed Lost' or 'Closed Won'.

### Leads (线索/潜在客户)

产生的初步联系信息（如通过市场活动、网站表单、展会）。
线索尚未合格，不确定是否有购买能力或权限。
当线索“合格”后，可转化为：

1. **Contact** (Who)
2. **Account** (Where)
3. **Opportunity** (What)

### Other Modules

- **Campaigns**: 营销活动
- **Quotes**: 报价
- **Invoices**: 发票
- **Cases**: 客服案例/反馈
- **Project**: 项目管理
- **Bugs**: 缺陷追踪
- **Knowledge Base**: 知识库

## Development Reference

### Database Tables (Partial List)

<details>
<summary>Click to expand table list</summary>

- accounts, accounts_cstm
- contacts, contacts_cstm
- leads, leads_cstm
- opportunities, opportunities_cstm
- aos_contracts, aos_invoices, aos_quotes
- aow_workflow
- cases, tasks, bugs, notes, calls, meetings, emails
- users, roles, securitygroups

</details>

### Field Translations (Reference)

#### Custom Form Fields

```json
{
  "title": "头衔",
  "photo": "照片",
  "department": "部门",
  "do_not_call": "不要电联",
  "phone_home": "家庭电话",
  "phone_mobile": "手机",
  "phone_work": "办公电话",
  "phone_other": "其他电话",
  "phone_fax": "传真",
  "email1": "Email 地址",
  "email2": "其他 Email 地址",
  "lawful_basis": "法律基础",
  "date_reviewed": "合法依据审查日期",
  "lawful_basis_source": "合法依据来源",
  "primary_address_street": "[主要地址]街道",
  "primary_address_city": "[主要地址]城市",
  "primary_address_state": "[主要地址]省份",
  "primary_address_postalcode": "[主要地址]邮编",
  "primary_address_country": "[主要地址]国家",
  "alt_address_street": "[其他地址]街道",
  "alt_address_city": "[其他地址]城市",
  "alt_address_state": "[其他地址]省份",
  "alt_address_postalcode": "[其他地址]邮编",
  "alt_address_country": "[其他地址]国家",
  "assistant": "助理",
  "assistant_phone": "助理电话",
  "refered_by": "推荐人",
  "lead_source": "潜在客户来源",
  "lead_source_description": "潜在客户来源说明",
  "status": "状态",
  "status_description": "状态说明",
  "account_name": "客户名称",
  "account_description": "客户说明",
  "opportunity_name": "商业机会",
  "opportunity_amount": "金额",
  "birthdate": "出生日期",
  "portal_name": "门户名称",
  "portal_app": "门户应用",
  "website": "网址",
  "jjwg_maps_lat_c": "纬度",
  "jjwg_maps_address_c": "地址",
  "jjwg_maps_lng_c": "经度",
  "jjwg_maps_geocode_status_c": "地理编码状态",
  "last_name": "姓氏 *",
  "description": "说明",
  "first_name": "名字",
  "salutation": "称谓"
}
```

#### Module Names

```json
{
  "ACLRoles": "角色",
  "AOK_KnowledgeBase": "知识库",
  "AOR_Reports": "报表",
  "AOR_Scheduled_Reports": "任务计划报表",
  "AOS_Contracts": "合同",
  "AOS_Invoices": "发票",
  "AOS_PDF_Templates": "PDF 模板",
  "AOS_Product_Categories": "产品类别",
  "AOS_Products": "产品",
  "AOS_Quotes": "报价",
  "AOW_WorkFlow": "工作流",
  "Accounts": "客户",
  "Bugs": "Bugs",
  "Calls": "电话",
  "Campaigns": "营销活动",
  "Cases": "客户反馈",
  "Contacts": "联系人",
  "Documents": "文档",
  "EmailMarketing": "邮件营销",
  "EmailTemplates": "邮件模板",
  "Emails": "电子邮件",
  "FP_Event_Locations": "会展地点",
  "FP_events": "会展",
  "Leads": "潜在客户",
  "Meetings": "会议",
  "Notes": "备忘录",
  "Opportunities": "商业机会",
  "Project": "项目",
  "ProjectTask": "项目任务",
  "ProspectLists": "目标群体",
  "Prospects": "目标对象",
  "Spots": "数据分析",
  "SurveyQuestionOptions": "调查问卷选项",
  "SurveyQuestionResponses": "调查问卷的回复",
  "SurveyQuestions": "调查问卷",
  "SurveyResponses": "调查答复",
  "Surveys": "调查问卷",
  "Tasks": "任务",
  "Users": "用户",
  "jjwg_Areas": "地图区域",
  "jjwg_Maps": "地图",
  "jjwg_Markers": "地图标注"
}
```

#### Field Types

```json
{
  "address": "地址",
  "bool": "复选框",
  "currency": "货币",
  "date": "日期",
  "datetimecombo": "日期时间",
  "decimal": "十进制",
  "dynamicenum": "动态下拉列表",
  "enum": "下拉列表",
  "float": "浮点数",
  "html": "HTML",
  "iframe": "IFrame",
  "image": "图片",
  "int": "整数",
  "multienum": "多选",
  "phone": "电话",
  "radioenum": "单选",
  "relate": "关联",
  "text": "文本域",
  "url": "URL",
  "varchar": "单行文本",
  "wysiwyg": "所见即所得"
}
```
