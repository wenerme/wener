---
title: Customer Relationship Management (CRM)
tags:
  - CRM
  - Service
  - Business
  - Management
---

# Customer Relationship Management (CRM)

- [Wikipedia: Customer relationship management](https://en.wikipedia.org/wiki/Customer_relationship_management) - 客户关系管理
- [SourceForge: RealTime CRM](https://sourceforge.net/software/product/RealTime-CRM/)
- [SourceForge: CRM Software](https://sourceforge.net/software/crm/)

## 核心概念 (Core Concepts)

CRM 系统通常用于管理企业对企业 (B2B) 的关系。区分 **客户 (Accounts)**（组织）和 **联系人 (Contacts)**（人）至关重要。

- [Understanding Accounts and Contacts](https://crmbook.powerobjects.com/basics/searching-and-navigation/understanding-accounts-and-contacts/) - 理解客户和联系人

### 客户与联系人 (Accounts vs. Contacts)

- **客户 (Accounts)**: 组织或公司。
  - 可以有层级关系（参考：父客户（总部）-> 子客户（分公司））。
  - B2B 中的主要实体。
- **联系人 (Contacts)**: 具体的个人。
  - 与客户的关系是对多 (One-to-Many)。
  - 当客户所有者变更时，联系人所有者通常也会变更。
  - **主要联系人 (Primary Contact)**: 客户处的主要联络点。

> [!TIP]
> 除非绝对必要（例如竞争对手），否则避免为组织或人员创建自定义实体。始终使用 Accounts 和 Contacts。

- **B2C 场景**: 在 B2C 中，个人是客户。大多数联系人可能不会关联到账户。
- **灵活性**: CRM 主要是为 B2B 设计的，但可以适应 B2C。

### Dynamics 365 中的实体 (Reference)

- [Account and Contact Entities](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/customer-entities-account-contact)

Account 和 Contact 实体对于识别和管理客户至关重要。

- **Account**: 几乎所有其他实体（包括其他 Account）的父级。
- **Contact**: 除了 Account 和 Contact 之外，可以作为其他实体的父级。一个 Contact 通常只有一个父 Account。

### 关键指标与字段 (Key Metrics & Fields)

- **Accounts**: 主要联系人、最近机会、最近案例、有效权益。
- **Profile**: 产品/服务兴趣、购买历史、参与度、组织契合度。
