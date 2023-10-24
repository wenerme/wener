---
title: Dynamics 365
---

# Microsoft Dynamics 365

- 模块
  - Business Central
  - Commerce
  - Customer Insights
  - Customer Service
  - Customer Voice
  - Field Service
  - Finance
  - Fraud Protection
  - Guides
  - Human Resources
  - Intelligent Order Management
  - Marketing
  - Project Operations
  - Remote Assist
  - Sales (Premium, Enterprise, Professional)
  - Supply Chain Management
- [Microsoft Dynamics 365 documentation](https://learn.microsoft.com/en-us/dynamics365/)

| 术语       | 定义                                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 客户       | 客户可以是单位或联系人。 在企业到企业 (B2B) 场景下，客户通常是一个单位。 在企业到消费者 (B2C) 场景下，客户通常是一个联系人。 在商机中，客户是指商机适用的潜在客户。                                           |
| 单位       | 单位是指企业或组织。 单位可以设置为商机的潜在客户。                                                                                                                                                           |
| 联系人     | 联系人是指一个个人。 联系人可以设置为商机的潜在客户。                                                                                                                                                         |
| 活动       | 活动是一种提供跟踪和计划选项的表。 商机通常包含多个不同类型的活动，例如，任务、预约和电话联络。                                                                                                               |
| 业务流程流 | 业务流程流 (BPF) 是 Microsoft Power Platform 中的一种自动化功能。 BPF 位于一个表页面，可为用户提供关于数据收集的指导和可预测行动计划。 对于商机，业务流程流可以指导用户完成将商机转化为销售所需的步骤和阶段。 |
| 潜在客户   | 潜在客户用于确定某人是否可能成为潜在的客户。 具备资格的潜在客户会转化为商机。                                                                                                                                 |
| 产品目录   | 产品目录是一个记录集合，旨在协助管理销售交易所涉及的产品、价目表、折扣和产品系列。 产品目录中的产品可以添加为商机的明细项。                                                                                   |
| 报价单     | 报价单是产品或服务的正式报价，为客户列出了具体价格和相关付款期限。 您可以从商机记录创建报价单。                                                                                                               |
| 订单       | 订单是依据指定条款交付货物和服务的已确认请求。 或者，它还可以是客户已接受的报价单。                                                                                                                           |
| 发票       | 发票是已向客户开具帐单的订单或销售记录， 其中包括有关所购买产品或服务的详细信息。                                                                                                                             |

- Ticker Symbol - 股票代码、证券代码
- Entitlements - 服务权限、配额
  - Phone, Email, Web, Facebook, Twitter, IoT

## Entity

- View
- Stats
- Status
- List
- Form
- Summary
- Detail
- Import/Export
- Template

## Customer Engagement

- 工作流
- https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/workflow

## Access

- Read
- Write
- Create
- Delete
- Append
- Append To
- Assign
- Share

## Customer Service Hub

- My Work
  - Dashboards
  - Activities
- Customers
  - Accounts
  - Contacts
  - Social Profiles
- Service
  - Cases
  - Queues
- Knowledge
  - Articles
  - Search
- Template
  - Email Templates
  - Email Signatures

## Sales Hub

- Sales
  - Sequences
  - Timeline
  - Assistant
  - Stakeholders
  - Competitors
  - Business Process Flows

---

- 活动 可以转换为 商机

| 信息         | 说明                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| 利益干系人   | Dynamics 365 中对商机有既得利益的联系人。 利益干系人可以包括项目经理、董事会成员、律师和赞助商。 |
| 销售团队     | 将会参与到将商机转化为销售的过程中的内部团队成员。                                               |
| 竞争对手     | 您可能在交易中与之竞争的任何外部竞争对手。                                                       |
| 定价信息     | 将使用的价目表以及用于估算商机价值的计算方法。                                                   |
| 商机明细项目 | 作为解决方案的一部分向客户推荐的特定产品和服务。                                                 |

---

- Viva Sales

---

- My Work
  - Sales Accelerator
  - Activities
  - Dashboards
- Customers
  - Accounts
  - Contacts
- Sales
  - Leads
  - Opportunities
- Collateral - 销售辅助工具/配套材料
  - Quotes
  - Orders
  - Invoices
  - Products
  - Sales Literature
- Marketing
  - Marketing List - 营销名单/邮件列表 - 目标客户群
    - 邮件列表
    - 电话列表
    - 微信列表
    - 邮寄列表
    - 社交媒体列表
- AppSettings
  - Sales Administration
    - Sales Territories
    - Marketing Settings
  - Product Catalog
    - Families and products
    - Discount Lists
    - Price Lists
    - Unit Groups
  - Performance management
    - Goals
    - Goal Metrics
      - No. of Product Units
      - Revenue
      - No. of Cases
    - Rollup Queries

---

- https://dynamics.microsoft.com/zh-cn/sales/overview/
- Dynamics 365 Sales Professional

## State vs Status

- Status
  - 显示为 **Status Reason**
  - 可以修改
  - 绑定 State - 但修改 Status 时会对应修改 State
- State
  - 显示为 **Status**
  - 不可以修改

---

- [Define status reason transitions for a Case entity or custom entity](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/define-status-reason-transitions)
- https://www.msdynamicsblog.com/dynamics-crm-state-status-codes-for-common-entities/

## One Contact to Multi Account

- Connection

## Records

> 从 PowerAPP 导出

| logicalname                                     | title                                          |
| ----------------------------------------------- | ---------------------------------------------- |
| msdyn_analyticsforcs                            | ~~Dynamics Customer Service Analytics~~        |
| account                                         | Account                                        |
| msdyn_accountkpiitem                            | Account KPI Item                               |
| msdyn_actioncardregarding                       | Action Card Regarding                          |
| msdyn_actioncardrolesetting                     | Action Card Role Setting                       |
| msdyn_productivityactioninputparameter          | Action Input Parameter                         |
| msdyn_productivityactionoutputparameter         | Action Output Parameter                        |
| activitypointer                                 | Activity                                       |
| msdyn_activityanalysiscleanupstate              | Activity Analysis CleanUp State                |
| activityfileattachment                          | Activity File Attachment                       |
| activitymonitor                                 | Activity monitor                               |
| msdyn_adaptivecardconfiguration                 | Adaptive Card Configuration                    |
| msdyncrm_addtocalendarstyle                     | AddToCalendar style                            |
| adminsettingsentity                             | admin_settings_entity                          |
| msdyn_adminappstate                             | AdminAppState                                  |
| msdyn_agentcapacityprofileunit                  | Agent Capacity Profile Unit                    |
| msdyn_agentcapacityupdatehistory                | Agent capacity update history                  |
| msdyn_agentcopilotsetting                       | Agent Copilot Setting                          |
| msdyn_agentresourceforecasting                  | Agent Resource Forecasting                     |
| msdyn_productivityagentscript                   | Agent script                                   |
| msdyn_productivityagentscriptstep               | Agent script step                              |
| msdyn_agentstatus                               | Agent Status                                   |
| msdyn_agentstatushistory                        | Agent Status history                           |
| msdyn_aibdataset                                | AI Builder Dataset                             |
| msdyn_aibdatasetfile                            | AI Builder Dataset File                        |
| msdyn_aibdatasetrecord                          | AI Builder Dataset Record                      |
| msdyn_aibdatasetscontainer                      | AI Builder Datasets Container                  |
| msdyn_aibfeedbackloop                           | AI Builder Feedback Loop                       |
| msdyn_aibfile                                   | AI Builder File                                |
| msdyn_aibfileattacheddata                       | AI Builder File Attached Data                  |
| msdyn_aiconfiguration                           | AI Configuration                               |
| msdyn_aievent                                   | AI Event                                       |
| msdyn_aifptrainingdocument                      | AI Form Processing Document                    |
| msdyn_aimodel                                   | AI Model                                       |
| msdyn_aiodtrainingboundingbox                   | AI Object Detection Bounding Box               |
| msdyn_aiodimage                                 | AI Object Detection Image                      |
| msdyn_aiodtrainingimage                         | AI Object Detection Image Mapping              |
| msdyn_aiodlabel                                 | AI Object Detection Label                      |
| msdyn_aitemplate                                | AI Template                                    |
| msdyn_analysiscomponent                         | Analysis Component                             |
| msdyn_analysisjob                               | Analysis Job                                   |
| msdyn_analysisoverride                          | Analysis Override                              |
| msdyn_analysisresult                            | Analysis Result                                |
| msdyn_analysisresultdetail                      | Analysis Result Detail                         |
| appaction                                       | App Action                                     |
| appactionmigration                              | App Action Migration                           |
| appactionrule                                   | App Action Rule                                |
| msdyn_appinsightsmetadata                       | App Insights Metadata                          |
| msdyn_consoleappparameterdefinition             | App Parameter Definition (Deprecated)          |
| msdyn_appconfiguration                          | App profile                                    |
| msdyn_appprofilerolemapping                     | App profile role mapping                       |
| msdyn_appstate                                  | App state                                      |
| msdyn_applicationextension                      | Application Extension                          |
| msdyn_applicationtabtemplate                    | Application Tab Template                       |
| msdyn_consoleapplicationtemplate                | Application Tab Template (Deprecated)          |
| msdyn_consoleapplicationtype                    | Application Type (Deprecated)                  |
| applicationuser                                 | ApplicationUser                                |
| appointment                                     | Appointment                                    |
| archivecleanupinfo                              | ArchiveCleanupInfo                             |
| archivecleanupoperation                         | ArchiveCleanupOperation                        |
| kbarticle                                       | Article                                        |
| msdyn_assetcategorytemplateassociation          | Asset Category Template Association            |
| msdyn_assettemplateassociation                  | Asset Template Association                     |
| msdyn_assignmentconfiguration                   | Assignment Configuration                       |
| msdyn_assignmentconfigurationstep               | Assignment Configuration Step                  |
| msdyn_assignmentmap                             | Assignment Map                                 |
| msdyn_assignmentrule                            | Assignment Rule                                |
| msdyn_skillattachmenttarget                     | Attach Skill                                   |
| msdyn_attribute                                 | Attribute                                      |
| msdyn_attributeinfluencestatistics              | Attribute Influence Statistics                 |
| msdyn_attributevalue                            | Attribute Value                                |
| msdyn_soundfile                                 | Audio File                                     |
| msdyn_authsettingsentry                         | Auth Settings Entry                            |
| msdyn_authenticationsettings                    | Authentication Settings                        |
| msdyn_ocautoblockrule                           | Auto block rule                                |
| msdyn_autocapturerule                           | Auto Capture Rule                              |
| msdyn_autocapturesettings                       | Auto Capture Settings                          |
| msdyncrm_basestyle                              | basestyle                                      |
| bookableresource                                | Bookable Resource                              |
| bookableresourcebooking                         | Bookable Resource Booking                      |
| bookableresourcebookingheader                   | Bookable Resource Booking Header               |
| msdyn_bookableresourcecapacityprofile           | Bookable Resource Capacity Profile             |
| bookableresourcecategory                        | Bookable Resource Category                     |
| bookableresourcecategoryassn                    | Bookable Resource Category Assn                |
| bookableresourcecharacteristic                  | Bookable Resource Characteristic               |
| bookableresourcegroup                           | Bookable Resource Group                        |
| bookingstatus                                   | Booking Status                                 |
| msdyn_ocbotchannelregistration                  | Bot Channel Registration                       |
| msdyn_ocbotchannelregistrationsecret            | Bot Channel Registration Secret                |
| msdynce_botcontent                              | BotContent                                     |
| bulkarchiveconfig                               | BulkArchiveConfig                              |
| bulkarchivefailuredetail                        | BulkArchiveFailureDetail                       |
| bulkarchiveoperation                            | BulkArchiveOperation                           |
| bulkarchiveoperationdetail                      | BulkArchiveOperationDetail                     |
| msdyncrm_buttonstyle                            | Button style                                   |
| campaign                                        | Campaign                                       |
| campaignactivity                                | Campaign Activity                              |
| campaignresponse                                | Campaign Response                              |
| canvasappextendedmetadata                       | CanvasApp Extended Metadata                    |
| msdyn_capacityprofile                           | Capacity Profile                               |
| card                                            | Card                                           |
| cascadegrantrevokeaccessrecordstracker          | CascadeGrantRevokeAccessRecordsTracker         |
| cascadegrantrevokeaccessversiontracker          | CascadeGrantRevokeAccessVersionTracker         |
| incident                                        | Case                                           |
| msdyn_caseenrichment                            | Case Enrichment                                |
| msdyn_casesuggestionrequestpayload              | Case Suggestion Request Payload                |
| msdyn_casetopic                                 | Case Topic                                     |
| msdyn_casetopic_incident                        | Case topic Incident mapping                    |
| msdyn_casetopicsetting                          | Case Topic Setting                             |
| msdyn_casetopicsummary                          | Case Topic Summary                             |
| catalog                                         | Catalog                                        |
| catalogassignment                               | Catalog Assignment                             |
| mspcat_catalogsubmissionfiles                   | Catalog Submission Files                       |
| msdynmkt_catalogeventstatusconfiguration        | CatalogEventStatusConfiguration                |
| msdyn_occhannelapimethodmapping                 | Channel api method mapping                     |
| msdyn_channelcapability                         | Channel Capability                             |
| msdyn_occhannelconfiguration                    | Channel Configuration                          |
| msdyn_channeldefinition                         | Channel Definition                             |
| msdyn_channeldefinitionconsent                  | Channel Definition Consent                     |
| msdyn_channeldefinitionlocale                   | Channel Definition Locale                      |
| msdyn_channelinstance                           | Channel Instance                               |
| msdyn_channelinstanceaccount                    | Channel Instance Account                       |
| msdyn_ciprovider                                | Channel Integration Framework v1.0 Provider    |
| msdyn_channelprovider                           | Channel Integration Framework v2.0 Provider    |
| msdyn_channelmessageattachment                  | Channel Message Attachment                     |
| msdyn_channelmessagecontextpart                 | Channel Message Context Part                   |
| msdyn_channelmessagepart                        | Channel Message Part                           |
| msdyn_occhannelstateconfiguration               | Channel State Configuration                    |
| characteristic                                  | Characteristic                                 |
| msdyn_ocsitdskill                               | Characteristic mapping                         |
| bot                                             | Chatbot                                        |
| botcomponent                                    | Chatbot subcomponent                           |
| msdyncrm_codestyle                              | Code style                                     |
| msdyn_collabspaceteamassociation                | Collab Space Team Association                  |
| msdyncrm_columnstyle                            | Column style                                   |
| comment                                         | Comment                                        |
| competitor                                      | Competitor                                     |
| msdynmkt_configuration                          | Configuration                                  |
| connection                                      | Connection                                     |
| connectioninstance                              | Connection Instance                            |
| connectionreference                             | Connection Reference                           |
| connector                                       | Connector                                      |
| msdyn_consumingapplication                      | Consuming Application                          |
| contact                                         | Contact                                        |
| msdyn_contactkpiitem                            | Contact KPI Item                               |
| msdyn_contactsuggestionrule                     | Contact suggestion rule                        |
| msdyn_contactsuggestionruleset                  | Contact suggestion ruleset                     |
| msdyncrm_contentblockstyle                      | Content Block                                  |
| msdyn_ocliveworkitemcontextitem                 | Context item value                             |
| msdyn_ocliveworkstreamcontextvariable           | Context variable                               |
| contract                                        | Contract                                       |
| msdyn_ocliveworkitem                            | Conversation                                   |
| msdyn_conversationaction                        | Conversation Action                            |
| msdyn_conversationactionlocale                  | Conversation Action Locale                     |
| msdyn_ocliveworkitemcapacityprofile             | Conversation Capacity profile                  |
| msdyn_ocliveworkitemcharacteristic              | Conversation Characteristic                    |
| msdyn_conversationdata                          | Conversation Data (Deprecated)                 |
| msdyn_conversationmessageblock                  | Conversation Message Block                     |
| msdyn_ocliveworkitemsentiment                   | Conversation Sentiment                         |
| msdyn_conversationinsight                       | ConversationInsight                            |
| conversationtranscript                          | ConversationTranscript                         |
| msdyn_copilotinteraction                        | Copilot Interaction                            |
| msdyn_copilotinteractiondata                    | Copilot Interaction Data                       |
| msdyn_copilotsummarizationsetting               | Copilot Summarization Setting                  |
| msdyn_copilottranscript                         | Copilot Transcript                             |
| msdyn_copilottranscriptdata                     | Copilot Transcript Data                        |
| msdyn_crmconnection                             | CRM Connection                                 |
| msdyn_csadminconfig                             | CSAdminConfig                                  |
| customapi                                       | Custom API                                     |
| customapirequestparameter                       | Custom API Request Parameter                   |
| customapiresponseproperty                       | Custom API Response Property                   |
| msdyn_customapirulesetconfiguration             | Custom API Ruleset Configuration               |
| msdyn_customcontrolextendedsettings             | Custom Control Extended Setting                |
| msdyn_customerasset                             | Customer Asset                                 |
| msdyn_customerassetattachment                   | Customer Asset Attachment                      |
| msdyn_customerassetcategory                     | Customer Asset Category                        |
| msdyn_customeremailcommunication                | Customer email communication                   |
| msdyn_dataanalyticsreport_csrmanager            | Customer Service historical analytics          |
| msdyn_cskeyvalueconfig                          | Customer Service Key Value Configuration       |
| msfp_alert                                      | Customer Voice alert                           |
| msfp_alertrule                                  | Customer Voice alert rule                      |
| msfp_fileresponse                               | Customer Voice file response                   |
| msfp_localizedemailtemplate                     | Customer Voice localized survey email template |
| msfp_project                                    | Customer Voice project                         |
| msfp_satisfactionmetric                         | Customer Voice satisfaction metric             |
| msfp_survey                                     | Customer Voice survey                          |
| msfp_emailtemplate                              | Customer Voice survey email template           |
| msfp_surveyinvite                               | Customer Voice survey invite                   |
| msfp_question                                   | Customer Voice survey question                 |
| msfp_questionresponse                           | Customer Voice survey question response        |
| msfp_surveyreminder                             | Customer Voice survey reminder                 |
| msfp_surveyresponse                             | Customer Voice survey response                 |
| msfp_unsubscribedrecipient                      | Customer Voice unsubscribed recipient          |
| msdyn_dailyaccountkpiitem                       | Daily Kpis for account                         |
| msdyn_dailycontactkpiitem                       | Daily kpis for contact                         |
| msdyn_dailyleadkpiitem                          | Daily kpis for lead                            |
| msdyn_dailyopportunitykpiitem                   | Daily kpis for Opportunity                     |
| msdyn_analyticsadminsettings                    | Data Analytics Admin Settings (Deprecated)     |
| msdyn_dataanalyticsdataset                      | Data Analytics Dataset                         |
| msdyn_dataanalyticsreport                       | Data Analytics Report                          |
| msdyn_dataanalyticscustomizedreport             | Data Analytics User Customized Report          |
| msdyn_dataanalyticsworkspace                    | Data Analytics Workspace                       |
| msdyn_datahygienesettinginfo                    | Data Hygiene Setting Info                      |
| datalakefolder                                  | Data Lake Folder                               |
| datalakefolderpermission                        | Data Lake Folder Permission                    |
| datalakeworkspace                               | Data Lake Workspace                            |
| datalakeworkspacepermission                     | Data Lake Workspace Permission                 |
| msdyn_dmsrequest                                | Data Movement Service Request                  |
| msdyn_dmsrequeststatus                          | Data Movement Service Request Status           |
| dataprocessingconfiguration                     | Data Processing configuration                  |
| datasyncstate                                   | Data Sync State                                |
| msdyn_databaseversion                           | Database Version                               |
| msdyn_dataflow                                  | Dataflow                                       |
| msdyn_dataflow_datalakefolder                   | Dataflow DatalakeFolder                        |
| msdyn_dataflowtemplate                          | Dataflow Template                              |
| msdyn_dataflowrefreshhistory                    | DataflowRefreshHistory                         |
| msdyn_dealmanagersettings                       | Deal manager settings                          |
| msdyn_dealmanageraccess                         | dealmanageraccess                              |
| msdyn_decisioncontract                          | Decision contract                              |
| msdyn_decisionruleset                           | Decision rule set                              |
| delegatedauthorization                          | DelegatedAuthorization                         |
| msdyn_deletedconversation                       | DeletedConversation                            |
| msdyn_entityconfig                              | Deprecated Workstream Entity Configuration     |
| desktopflowbinary                               | Desktop Flow Binary                            |
| desktopflowmodule                               | Desktop Flow Module                            |
| msdyn_digitalsellingactivetask                  | DigitalSellingActiveTask                       |
| msdyn_digitalsellingcompletedtask               | DigitalSellingCompletedTask                    |
| msdyn_distributedlock                           | Distributed Lock                               |
| msdyncrm_dividerstyle                           | Divider style                                  |
| recommendeddocument                             | Document Suggestions                           |
| msdyn_duplicatedetectionpluginrun               | Duplicate Detection Plugin Run                 |
| msdyn_duplicateleadmapping                      | Duplicate Lead Mapping                         |
| msdyn_effortpredictionresult                    | Effort estimate                                |
| msdyn_iermlmodel                                | Effort estimation model                        |
| msdyn_iermltraining                             | Effort model training details                  |
| email                                           | Email                                          |
| enablearchivalrequest                           | EnableArchivalRequest                          |
| entitlement                                     | Entitlement                                    |
| entitlementchannel                              | Entitlement Channel                            |
| entitlemententityallocationtypemapping          | Entitlement Entity Allocation Type Mapping     |
| entitlementtemplatechannel                      | Entitlement Template Channel                   |
| msdyn_entityroutingconfiguration                | Entity                                         |
| entityanalyticsconfig                           | Entity Analytics Config                        |
| msdyn_entityattachment                          | Entity Attachment                              |
| msdyn_entitylinkchatconfiguration               | Entity link chat configuration                 |
| msdyn_cdsentityengagementctx                    | Entity Routing Context                         |
| msdyn_entityrankingrule                         | EntityRankingRule                              |
| entityrecordfilter                              | EntityRecordFilter                             |
| msdyn_entityrefreshhistory                      | EntityRefreshHistory                           |
| environmentvariabledefinition                   | Environment Variable Definition                |
| environmentvariablevalue                        | Environment Variable Value                     |
| msdynmkt_eventparametermetadata                 | EventParameterMetadata                         |
| expiredprocess                                  | Expired Process                                |
| exportedexcel                                   | Exported Excel                                 |
| exportsolutionupload                            | ExportSolutionUpload                           |
| msdyn_extendedusersetting                       | Extended User Setting                          |
| msdyn_ocexternalcontext                         | External context                               |
| msdyn_favoriteknowledgearticle                  | Favorite knowledge article                     |
| fax                                             | Fax                                            |
| featurecontrolsetting                           | FeatureControlSetting                          |
| msdyn_fileupload                                | File Upload                                    |
| msdyn_wallsavedqueryusersettings                | Filter                                         |
| msdyn_ocflaggedspam                             | Flagged spam                                   |
| flowmachine                                     | Flow Machine                                   |
| flowmachinegroup                                | Flow Machine Group                             |
| flowmachineimage                                | Flow Machine Image                             |
| flowmachineimageversion                         | Flow Machine Image Version                     |
| flowmachinenetwork                              | Flow Machine Network                           |
| flowsession                                     | Flow Session                                   |
| msdyn_flowcardtype                              | flowcardtype                                   |
| msdyn_forecastinstance                          | Forecast                                       |
| msdyn_dataanalyticsreport_forecast              | Forecast (preview)                             |
| msdyn_forecastconfiguration                     | Forecast Configuration                         |
| msdyn_forecastdefinition                        | Forecast definition                            |
| msdyn_forecastpredictionstatus                  | Forecast Prediction Status                     |
| msdyn_forecastrecurrence                        | Forecast recurrence                            |
| msdyn_forecastsettingsandsummary                | Forecast Summary and Setting                   |
| msdyn_forecastingcache                          | Forecasting Cache                              |
| msdyn_functionallocation                        | Functional Location                            |
| fxexpression                                    | FxExpression                                   |
| msdyn_gdprdata                                  | GDPRData                                       |
| msdyncrm_generalstyles                          | General styles                                 |
| msdyn_oc_geolocationprovider                    | Geo Location Provider                          |
| goal                                            | Goal                                           |
| metric                                          | Goal Metric                                    |
| msdyn_helppage                                  | Help Page                                      |
| msdyn_icebreakersconfig                         | icebreakersconfig                              |
| msdyncrm_imagestyle                             | imagestyle                                     |
| msdyn_inboxconfiguration                        | Inbox Configuration                            |
| msdynmkt_infobipchannelinstance                 | Infobip channel instance                       |
| msdynmkt_infobipchannelinstanceaccount          | Infobip channel instance account               |
| msdyn_salessuggestion                           | Insight                                        |
| msdyn_datainsightsandanalyticsfeature           | Insights                                       |
| msdyn_insightsstorevirtualentity                | Insights Store Virtual Entity                  |
| msdyn_integratedsearchprovider                  | Integrated search provider                     |
| internalcatalogassignment                       | Internal Catalog Assignment                    |
| invoice                                         | Invoice                                        |
| invoicedetail                                   | Invoice Product                                |
| msdyn_iotalert                                  | IoT Alert                                      |
| msdyn_iottocaseprocess                          | IoT Alert to Case Process                      |
| msdyn_iotdevice                                 | IoT Device                                     |
| msdyn_iotdevicecategory                         | IoT Device Category                            |
| msdyn_iotdevicecommand                          | IoT Device Command                             |
| msdyn_iotdevicecommanddefinition                | IoT Device Command Definition                  |
| msdyn_iotdevicedatahistory                      | IoT Device Data History                        |
| msdyn_iotdeviceproperty                         | IoT Device Property                            |
| msdyn_iotdeviceregistrationhistory              | IoT Device Registration History                |
| msdyn_iotdevicevisualizationconfiguration       | IoT Device Visualization Configuration         |
| msdyn_iotfieldmapping                           | IoT Field Mapping                              |
| msdyn_iotpropertydefinition                     | IoT Property Definition                        |
| msdyn_iotprovider                               | IoT Provider                                   |
| msdyn_iotproviderinstance                       | IoT Provider Instance                          |
| msdyn_iotsettings                               | IoT Settings                                   |
| msdyn_kbenrichment                              | KB Enrichment                                  |
| msdyn_kbkeywordsdescsuggestionsetting           | Keywords Description Suggestion Setting        |
| msdyn_dataanalyticsreport_ksinsights            | Knowledge analytics                            |
| knowledgearticle                                | Knowledge Article                              |
| msdyn_kbattachment                              | Knowledge Article Attachment                   |
| msdyn_knowledgearticleimage                     | Knowledge Article Image                        |
| knowledgearticleincident                        | Knowledge Article Incident                     |
| msdyn_kalanguagesetting                         | Knowledge article language setting             |
| msdyn_knowledgearticletemplate                  | Knowledge Article Template                     |
| knowledgearticleviews                           | Knowledge Article Views                        |
| knowledgebaserecord                             | Knowledge Base Record                          |
| msdyn_knowledgeconfiguration                    | Knowledge Configuration                        |
| msdyn_federatedarticle                          | Knowledge Federated Article                    |
| msdyn_federatedarticleincident                  | Knowledge Federated Article Incident           |
| msdyn_knowledgeinteractioninsight               | Knowledge Interaction Insight                  |
| msdyn_knowledgemanagementsetting                | Knowledge Management Setting                   |
| msdyn_kmpersonalizationsetting                  | Knowledge personalization                      |
| msdyn_knowledgesearchfilter                     | Knowledge search filter                        |
| msdyn_knowledgesearchinsight                    | Knowledge Search Insight                       |
| msdyn_knowledgepersonalfilter                   | Knowledge search personal filter config        |
| msdyn_kpieventdata                              | KPI Event Data                                 |
| msdyn_kpieventdefinition                        | KPI Event Definition                           |
| msdyn_oclanguage                                | Language                                       |
| msdyncrm_layoutstyle                            | Layout Style                                   |
| lead                                            | Lead                                           |
| msdyn_leadhygienesetting                        | Lead Hygiene Setting                           |
| msdyn_leadkpiitem                               | Lead KPI Item                                  |
| leadtoopportunitysalesprocess                   | Lead To Opportunity Sales Process              |
| msdyn_leadmodelconfig                           | LeadModelConfig                                |
| letter                                          | Letter                                         |
| msdynmkt_linkmobilitychannelinstance            | Link mobility channel instance                 |
| msdynmkt_linkmobilitychannelinstanceaccount     | Link mobility channel instance account         |
| msdyn_linkedentityattributevalidity             | Linked Entity Attribute Validity               |
| listoperation                                   | List Operation                                 |
| msdyn_liveworkitemevent                         | Live work item event                           |
| msdyn_ocliveworkitemparticipant                 | Live Work Item Participant (Deprecated)        |
| msdyn_oclocalizationdata                        | Localization                                   |
| msdyn_productivitymacroactiontemplate           | Macro Action Template                          |
| msdyn_productivitymacroconnector                | Macro Connector                                |
| msdyn_macrosession                              | Macro Run History                              |
| msdyn_productivitymacrosolutionconfiguration    | Macro Solution Configuration                   |
| mailbox                                         | Mailbox                                        |
| mailboxstatistics                               | Mailbox Statistics                             |
| msdynmkt_featureconfiguration                   | Marketing feature configuration                |
| marketingformdisplayattributes                  | Marketing Form Display Attributes              |
| list                                            | Marketing List                                 |
| msdyn_maskingrule                               | Masking Rule                                   |
| msdyn_masterentityroutingconfiguration          | Master Entity Routing Configuration            |
| msdyn_ocsystemmessage                           | Message                                        |
| msdynmkt_metadataentityrelationship             | Metadata Entity Relationship                   |
| msdynmkt_metadataitem                           | Metadata Item                                  |
| msdynmkt_metadatastorestate                     | Metadata Store State                           |
| metadataforarchival                             | MetadataForArchival                            |
| msdyn_orgchartnode                              | Microsoft Orgchart node entity                 |
| msdyn_teamschatassociation                      | Microsoft Teams chat association entity        |
| msdyn_teamschatsuggestion                       | Microsoft Teams chat suggestion                |
| msdyn_teamscollaboration                        | Microsoft Teams Collaboration entity           |
| msdyn_collabgraphresource                       | Microsoft Teams Graph resource Entity          |
| msdyn_migrationtracker                          | Migration tracker                              |
| msdyn_mobileapp                                 | Mobile App                                     |
| mobileofflineprofileextension                   | MobileOfflineProfileExtension                  |
| mobileofflineprofileitemfilter                  | MobileOfflineProfileItemFilter                 |
| msdynmkt_mocksmsproviderchannelinstance         | MockSmsProvider channel instance               |
| msdynmkt_mocksmsproviderchannelinstanceaccount  | MockSmsProvider channel instance account       |
| msdyn_ocsimltraining                            | Model training details                         |
| appmodulecomponentnode                          | Model-Driven App Component Node                |
| appmodulecomponentedge                          | Model-Driven App Component Node's Edge         |
| appelement                                      | Model-Driven App Element                       |
| appsetting                                      | Model-Driven App Setting                       |
| appusersetting                                  | Model-Driven App User Setting                  |
| msdyn_modelpreviewstatus                        | ModelPreviewStatus                             |
| msdyn_mostcontacted                             | Most Contacted                                 |
| msdyn_mostcontactedby                           | Most Contacted By                              |
| msgraphresourcetosubscription                   | Ms Graph Resource To Subscription              |
| msdyn_defextendedchannelinstance                | msdyn_DefExtendedChannelInstance               |
| msdyn_defextendedchannelinstanceaccount         | msdyn_DefExtendedChannelInstanceAccount        |
| msdyn_msteamssetting                            | msdyn_msteamssetting                           |
| msdyn_msteamssettingsv2                         | msdyn_msteamssettingsv2                        |
| msdyn_relationshipinsightsunifiedconfig         | msdyn_relationshipinsightsunifiedconfig        |
| msdyn_vivaentitysetting                         | msdyn_vivaentitysetting                        |
| msdyn_vivaorgsetting                            | msdyn_vivaorgsetting                           |
| msdyn_vivausersetting                           | msdyn_vivausersetting                          |
| msdynmkt_experimentv2                           | msdynmkt_experimentv2                          |
| newprocess                                      | New Process                                    |
| msdyn_notesanalysisconfig                       | Notes analysis Config                          |
| msdyn_notificationfield                         | Notification Field                             |
| msdyn_consoleapplicationnotificationfield       | Notification Field (Deprecated)                |
| msdyn_notificationtemplate                      | Notification Template                          |
| msdyn_consoleapplicationnotificationtemplate    | Notification Template (Deprecated)             |
| msdyn_ocpaymentprofile                          | OC Payment Profile                             |
| officegraphdocument                             | Office Graph Document                          |
| msdyn_occhannelapiconversationprivilege         | Omnichannel channel api conversation privilege |
| msdyn_occhannelapimessageprivilege              | Omnichannel channel api message privilege      |
| msdyn_omnichannelconfiguration                  | Omnichannel Configuration                      |
| msdyn_omnichannelpersonalization                | Omnichannel Personalization                    |
| msdyn_omnichannelqueue                          | Omnichannel Queue (Deprecated)                 |
| msdyn_ocrequest                                 | Omnichannel Request                            |
| msdyn_omnichannelsyncconfig                     | Omnichannel Sync Config                        |
| msdyn_liveconversation                          | Ongoing conversation (Deprecated)              |
| msdyn_operatinghour                             | Operating Hour                                 |
| opportunity                                     | Opportunity                                    |
| msdyn_opportunitykpiitem                        | Opportunity KPI Item                           |
| opportunityproduct                              | Opportunity Product                            |
| opportunitysalesprocess                         | Opportunity Sales Process                      |
| msdyn_opportunitymodelconfig                    | OpportunityModelConfig                         |
| salesorder                                      | Order                                          |
| salesorderdetail                                | Order Product                                  |
| msdyn_salescopilotorgsettings                   | Org level settings for Sales Copilot apps      |
| organizationsetting                             | Organization Setting                           |
| organizationdatasyncfnostate                    | OrganizationDataSyncFnoState                   |
| organizationdatasyncstate                       | OrganizationDataSyncState                      |
| organizationdatasyncsubscription                | OrganizationDataSyncSubscription               |
| organizationdatasyncsubscriptionentity          | OrganizationDataSyncSubscriptionEntity         |
| organizationdatasyncsubscriptionfnotable        | OrganizationDataSyncSubscriptionFnoTable       |
| msdyn_overflowactionconfig                      | Overflow Action Config                         |
| package                                         | Package                                        |
| mspcat_packagestore                             | Package Submission Store                       |
| msdyn_panetabconfiguration                      | Pane tab configuration                         |
| msdyn_panetoolconfiguration                     | Pane tool configuration                        |
| msdyn_consoleapplicationtemplateparameter       | Parameter (Deprecated)                         |
| msdyn_productivityparameterdefinition           | Parameter definition                           |
| pdfsetting                                      | PDF Setting                                    |
| msdyn_personasecurityrolemapping                | Persona Security Role Mapping                  |
| msdyn_personalmessage                           | Personal quick reply                           |
| msdyn_personalsoundsetting                      | Personal sound setting                         |
| phonecall                                       | Phone Call                                     |
| phonetocaseprocess                              | Phone To Case Process                          |
| msdyn_playbookinstance                          | Playbook                                       |
| msdyn_playbookactivity                          | Playbook activity                              |
| msdyn_playbookactivityattribute                 | Playbook activity attribute                    |
| msdyn_callablecontext                           | Playbook Callable Context                      |
| msdyn_playbookcategory                          | Playbook category                              |
| msdyn_playbooktemplate                          | Playbook template                              |
| pluginpackage                                   | Plugin Package                                 |
| msdyn_pmanalysishistory                         | PM Analysis History                            |
| msdyn_pmcalendar                                | PM Calendar                                    |
| msdyn_pmcalendarversion                         | PM Calendar Version                            |
| msdyn_pminferredtask                            | PM Inferred Task                               |
| msdyn_pmprocessextendedmetadataversion          | PM Process Extended Metadata Version           |
| msdyn_pmprocesstemplate                         | PM Process Template                            |
| msdyn_pmprocessusersettings                     | PM Process User Settings                       |
| msdyn_pmprocessversion                          | PM Process Version                             |
| msdyn_pmrecording                               | PM Recording                                   |
| msdyn_pmtemplate                                | PM Template                                    |
| msdyn_pmview                                    | PM View                                        |
| position                                        | Position                                       |
| msdyn_postconfig                                | Post Configuration                             |
| msdyn_postruleconfig                            | Post Rule Configuration                        |
| msdyn_analytics                                 | Power BI Configuration                         |
| powerbidataset                                  | Power BI Dataset                               |
| powerbimashupparameter                          | Power BI Mashup Parameter                      |
| powerbireport                                   | Power BI Report                                |
| powerbidatasetapdx                              | powerbidatasetapdx                             |
| powerbireportapdx                               | powerbireportapdx                              |
| powerfxrule                                     | PowerfxRule                                    |
| msdynmkt_predefinedplaceholder                  | Predefined Placeholder                         |
| msdyn_predictioncomputationoperation            | Prediction Computation Operation               |
| msdyn_predictionmodelstatus                     | Prediction Model Status                        |
| msdyn_predictionscheduledoperation              | Prediction Scheduled Operation                 |
| msdyn_predictivemodelscore                      | Predictive Model Score                         |
| msdyn_predictivescore                           | Predictive Score                               |
| msdyn_preferredagent                            | Preferred Agent                                |
| msdyn_preferredagentcustomeridentity            | Preferred Agent Customer Identity              |
| msdyn_preferredagentroutedentity                | Preferred Agent Routed Entity                  |
| msdyn_presence                                  | Presence                                       |
| pricelevel                                      | Price List                                     |
| principalentitybusinessunitmap                  | PrincipalEntityBusinessUnitMap                 |
| privilegesremovalsetting                        | Privileges Removal Setting                     |
| workflowlog                                     | Process Log                                    |
| processstageparameter                           | ProcessStageParameter                          |
| product                                         | Product                                        |
| productassociation                              | Product Association                            |
| productsubstitute                               | Product Relationship                           |
| msdyn_paneconfiguration                         | Productivity pane configuration                |
| msdyn_postalbum                                 | Profile Album                                  |
| msdyn_propertyassetassociation                  | Property Asset Association                     |
| msdyn_property                                  | Property Definition                            |
| msdyn_propertylog                               | Property Log                                   |
| msdyn_propertytemplateassociation               | Property Template Association                  |
| msdyn_provider                                  | Provider                                       |
| msdyn_ocprovisioningstate                       | Provisioning State                             |
| provisionlanguageforuser                        | ProvisionLanguageForUser                       |
| msdyncrm_qrcodestyle                            | QR code style                                  |
| queueitem                                       | Queue Item                                     |
| bulkoperation                                   | Quick Campaign                                 |
| msdyn_cannedmessage                             | Quick reply                                    |
| quote                                           | Quote                                          |
| quotedetail                                     | Quote Product                                  |
| ratingmodel                                     | Rating Model                                   |
| ratingvalue                                     | Rating Value                                   |
| msdyn_readtrackingenabledinfo                   | Read tracking enabled information              |
| msdyn_realtimescoring                           | Real Time Scoring                              |
| msdyn_realtimescoringoperation                  | Real Time Scoring Operation                    |
| msdyn_recomputetracker                          | Recompute Tracker                              |
| reconciliationentityinfo                        | ReconciliationEntityInfo                       |
| reconciliationinfo                              | ReconciliationInfo                             |
| recordfilter                                    | Record Filter                                  |
| msdyn_ocrecording                               | Recording                                      |
| msdyn_recording                                 | Recording                                      |
| recurringappointmentmaster                      | Recurring Appointment                          |
| msdyn_recurringsalesaction                      | Recurring Sales Action                         |
| msdyn_activityanalysisconfig                    | Relationship Analytics Config                  |
| msdyn_relationshipanalyticsmetadata             | Relationship Analytics Metadata                |
| report                                          | Report                                         |
| msdyn_reportbookmark                            | Report Bookmark                                |
| retaineddataexcel                               | RetainedData Excel                             |
| retentioncleanupinfo                            | RetentionCleanupInfo                           |
| retentioncleanupoperation                       | RetentionCleanupOperation                      |
| retentionconfig                                 | RetentionConfig                                |
| retentionfailuredetail                          | RetentionFailureDetail                         |
| retentionoperation                              | RetentionOperation                             |
| retentionoperationdetail                        | RetentionOperationDetail                       |
| revokeinheritedaccessrecordstracker             | RevokeInheritedAccessRecordsTracker            |
| msdyn_ocrichobject                              | Rich message                                   |
| msdyn_ocrichobjectmap                           | Rich message map                               |
| msdyn_richtextfile                              | Rich Text Attachment                           |
| roleeditorlayout                                | RoleEditorLayout                               |
| goalrollupquery                                 | Rollup Query                                   |
| msdyn_routingconfiguration                      | Routing configuration                          |
| msdyn_routingconfigurationstep                  | Routing configuration step                     |
| msdyn_unifiedroutingrun                         | Routing diagnostic                             |
| msdyn_unifiedroutingdiagnostic                  | Routing diagnostic item                        |
| msdyn_routingrulesetsetting                     | Routing Rule Set Setting                       |
| msdyn_routingrequest                            | RoutingRequest                                 |
| msdyn_ocruleitem                                | Rule Item                                      |
| msdyn_rulesetdependencymapping                  | Rulesetentitymapping                           |
| msdyn_sabackupdiagnostic                        | sabackupdiagnostic                             |
| msdyn_sabatchruninstance                        | SABatchRunInstance                             |
| msdyn_salesaccelerationinsight                  | Sales acceleration insights                    |
| msdyn_salesaccelerationsettings                 | Sales Acceleration settings                    |
| msdyn_salesassignmentsetting                    | Sales Assignment Setting                       |
| salesliterature                                 | Sales Literature                               |
| msdyn_serviceoneprovisioningrequest             | Sales provisioning request                     |
| msdyn_salesroutingrun                           | Sales routing run                              |
| msdyn_salestag                                  | Sales Tag                                      |
| msdyn_usagereporting                            | Sales usage reporting                          |
| msdyn_dataanalyticsreport_sutreporting          | Sales usage telemetry reports                  |
| msdyn_salesinsightssettings                     | salesinsightssettings                          |
| msdyn_salesocmessage                            | SalesOmnichannel Message                       |
| msdyn_salesroutingdiagnostic                    | salesroutingdiagnostic                         |
| msdyn_saruninstance                             | SARunInstance                                  |
| msdyn_schedule                                  | Schedule                                       |
| msdyn_searchconfiguration                       | Search Configuration                           |
| msdyn_kmfederatedsearchconfig                   | Search provider                                |
| searchattributesettings                         | SearchAttributeSettings                        |
| searchcustomanalyzer                            | SearchCustomAnalyzer                           |
| searchrelationshipsettings                      | SearchRelationshipSettings                     |
| msdyn_segment                                   | Segment                                        |
| msdyn_segmentattribute                          | segmentattribute                               |
| msdyn_segmentationsetting                       | segmentsetting                                 |
| msdyn_segmentcatalogue                          | SegmentsUtil                                   |
| msdyn_visitorjourney                            | Self service                                   |
| msdyn_sentimentanalysis                         | Sentiment analysis                             |
| msdyn_ocsentimentdailytopic                     | Sentiment daily topic                          |
| msdyn_ocsentimentdailytopickeyword              | Sentiment daily topic keyword                  |
| msdyn_ocsentimentdailytopictrending             | Sentiment daily topic trending                 |
| msdyn_sequence                                  | Sequence                                       |
| msdyn_sequencestat                              | Sequence Stat                                  |
| msdyn_sequencetarget                            | Sequence Target                                |
| msdyn_sequencetargetstep                        | Sequence Target Step                           |
| msdyn_sequencetemplate                          | Sequence Template                              |
| service                                         | Service                                        |
| serviceappointment                              | Service Activity                               |
| msdyn_serviceconfiguration                      | Service Configuration                          |
| serviceplan                                     | Service Plan                                   |
| serviceplanmapping                              | Service Plan Mapping                           |
| msdyn_ocsession                                 | Session                                        |
| msdyn_ocsessioncharacteristic                   | Session Characteristic                         |
| msdyn_sessiondata                               | Session Data (Deprecated)                      |
| msdyn_sessionevent                              | Session event                                  |
| msdyn_sessionparticipant                        | Session participant                            |
| msdyn_sessionparticipantdata                    | Session Participant Data (Deprecated)          |
| msdyn_ocsessionparticipantevent                 | Session Participant Event                      |
| msdyn_ocsessionsentiment                        | Session Sentiment                              |
| msdyn_sessiontemplate                           | Session Template                               |
| msdyn_consoleapplicationsessiontemplate         | Session Templates (Deprecated)                 |
| settingdefinition                               | Setting Definition                             |
| msdyn_shareasconfiguration                      | ShareAs Configuration                          |
| sharedlinksetting                               | Shared Link Setting                            |
| sharedobject                                    | Shared Object                                  |
| sharedworkspace                                 | Shared Workspace                               |
| sharedworkspacepool                             | Shared Workspace Pool                          |
| msdyn_sikeyvalueconfig                          | SI Key Value Config                            |
| msdyn_siconfig                                  | siconfig                                       |
| msdyn_similarentitiesfeatureimportance          | Similar entities feature importance            |
| msdyn_skillattachmentruleitem                   | Skill Attachment Rule                          |
| msdyn_ocskillidentmlmodel                       | Skill finder model                             |
| msdyn_slakpi                                    | SLA KPI                                        |
| slakpiinstance                                  | SLA KPI Instance                               |
| msdyn_smartassistconfig                         | Smartassist configuration                      |
| socialactivity                                  | Social Activity                                |
| socialprofile                                   | Social Profile                                 |
| solutioncomponentattributeconfiguration         | Solution Component Attribute Configuration     |
| solutioncomponentbatchconfiguration             | Solution Component Batch Configuration         |
| solutioncomponentconfiguration                  | Solution Component Configuration               |
| solutioncomponentrelationshipconfiguration      | Solution Component Relationship Configuration  |
| msdyn_solutionhealthrule                        | Solution Health Rule                           |
| msdyn_solutionhealthruleargument                | Solution Health Rule Argument                  |
| msdyn_solutionhealthruleset                     | Solution Health Rule Set                       |
| msdyn_soundnotificationsetting                  | Sound notification setting                     |
| stagedentity                                    | Staged Entity                                  |
| stagedentityattribute                           | Staged Entity Attribute                        |
| stagesolutionupload                             | StageSolutionUpload                            |
| msdyn_submodeldefinition                        | Submodel Definition                            |
| msdyn_suggestionassignmentrule                  | Suggestion Assignment Rule                     |
| msdyn_suggestioninteraction                     | Suggestion Interaction                         |
| msdyn_suggestionprincipalobjectaccess           | Suggestion Principal Object Access             |
| msdyn_suggestionrequestpayload                  | Suggestion request payload                     |
| msdyn_suggestionsellerpriority                  | Suggestion Seller Priority                     |
| msdyn_suggestionsmodelsummary                   | Suggestions Model Summary                      |
| msdyn_suggestionssetting                        | Suggestions Setting                            |
| supportusertable                                | SupportUserTable                               |
| msdyn_swarm                                     | Swarm                                          |
| msdyn_swarmparticipant                          | Swarm participant                              |
| msdyn_swarmparticipantrule                      | Swarm participant rule                         |
| msdyn_swarmrole                                 | Swarm role                                     |
| msdyn_swarmskill                                | Swarm skill                                    |
| msdyn_swarmtemplate                             | Swarm template                                 |
| synapsedatabase                                 | Synapse Database                               |
| synapselinkexternaltablestate                   | Synapse Link External Table State              |
| synapselinkprofile                              | Synapse Link Profile                           |
| synapselinkprofileentity                        | Synapse Link Profile Entity                    |
| synapselinkprofileentitystate                   | Synapse Link Profile Entity State              |
| synapselinkschedule                             | Synapse Link Schedule                          |
| systemuserauthorizationchangetracker            | SystemUserAuthorizationChangeTracker           |
| msdyn_octag                                     | Tag                                            |
| msdyn_taggedrecord                              | Tagged Record                                  |
| task                                            | Task                                           |
| tdsmetadata                                     | TdsMetadata                                    |
| team                                            | Team                                           |
| teammobileofflineprofilemembership              | TeamMobileOfflineProfileMembership             |
| chat                                            | Teams chat                                     |
| msdyn_aicontactsuggestion                       | Teams Contact Suggestion by AI                 |
| msdyn_teamsdialeradminsettings                  | Teams Dialer Admin settings                    |
| msdynmkt_telesignchannelinstance                | TeleSign channel instance                      |
| msdynmkt_telesignchannelinstanceaccount         | TeleSign channel instance account              |
| msdyn_templateforproperties                     | Template For Properties                        |
| msdyn_templateparameter                         | Template Parameter                             |
| msdyn_templatetags                              | Template Tag (Deprecated)                      |
| territory                                       | Territory                                      |
| msdyn_salesocsmstemplate                        | Text message template                          |
| msdyncrm_textstyle                              | Text style                                     |
| msdyn_timespent                                 | Time spent in BPF                              |
| msdyn_tour                                      | Tour                                           |
| tracelog                                        | Trace                                          |
| msdyn_ocsitdimportconfig                        | Training data import configuration             |
| msdyn_ocsitrainingdata                          | Training record                                |
| msdyn_trainingresult                            | Training Result                                |
| msdyn_transcript                                | Transcript                                     |
| translationprocess                              | Translation Process                            |
| msdynmkt_eventmetadata                          | Trigger                                        |
| msdynmkt_eventmetadata_sdkmessageprocessingstep | Triggers To Sdk Message Processing Steps       |
| msdynmkt_twiliochannelinstance                  | Twilio channel instance                        |
| msdynmkt_twiliochannelinstanceaccount           | Twilio channel instance account                |
| msdyn_unifiedroutingsetuptracker                | Unified Routing Setup Tracker                  |
| uomschedule                                     | Unit Group                                     |
| msdyn_untrackedappointment                      | UntrackedAppointment                           |
| msdyn_upgraderun                                | Upgrade Run                                    |
| msdyn_upgradestep                               | Upgrade Step                                   |
| msdyn_upgradeversion                            | Upgrade Version                                |
| msdyn_urnotificationtemplate                    | UR notification template                       |
| msdyn_urnotificationtemplatemapping             | UR Notification Template Mapping               |
| msdyn_usagemetric                               | Usage Metric                                   |
| systemuser                                      | User                                           |
| userrating                                      | User Rating                                    |
| msdyn_usersetting                               | User settings                                  |
| usermobileofflineprofilemembership              | UserMobileOfflineProfileMembership             |
| msdyncrm_videostyle                             | Video style                                    |
| virtualentitymetadata                           | Virtual Entity Metadata                        |
| msdyn_virtualtablecolumncandidate               | Virtual Table Column Candidate                 |
| msdyn_vivacustomerlist                          | Viva Sales customer list                       |
| msdyn_wallsavedquery                            | Wall View                                      |
| msdyn_wkwcolleaguesforcompany                   | wkwcolleaguesforcompany                        |
| msdyn_wkwcolleaguesforcontact                   | wkwcolleaguesforcontact                        |
| msdyn_wkwconfig                                 | wkwconfig                                      |
| msdyn_workqueueusersetting                      | Work list user setting                         |
| msdyn_worklistviewconfiguration                 | Work List View Configuration                   |
| workqueue                                       | Work Queue                                     |
| workqueueitem                                   | Work Queue Item                                |
| msdyn_workqueuestate                            | Work Queue Record State                        |
| msdyn_liveworkstream                            | Work Stream                                    |
| msdyn_liveworkstreamcapacityprofile             | Work stream capacity profile                   |
| msdyn_workflowactionstatus                      | Workflow Action Status                         |
| workflowbinary                                  | Workflow Binary                                |

## Connection

```
account_connections1
account_connections2
activitypointer_connections1
activitypointer_connections2
appointment_connections1
appointment_connections2
business_unit_connections
campaign_connections1
campaign_connections2
campaignactivity_connections1
campaignactivity_connections2
competitor_connections1
competitor_connections2
connection_related_connection
connection_role_connections1
connection_role_connections2
constraintbasedgroup_connections1
constraintbasedgroup_connections2
contact_connections1
contact_connections2
contract_connections1
contract_connections2
createdby_connection
email_connections1
email_connections2
entitlement_connections1
entitlement_connections2
entitlementchannel_connections1
entitlementchannel_connections2
entitlementtemplatechannel_connections1
entitlementtemplatechannel_connections2
equipment_connections1
equipment_connections2
fax_connections1
fax_connections2
goal_connections1
goal_connections2
incident_connections1
incident_connections2
invoice_connections1
invoice_connections2
knowledgearticle_connections1
knowledgearticle_connections2
KnowledgeBaseRecord_connections1
KnowledgeBaseRecord_connections2
lead_connections1
lead_connections2
letter_connections1
letter_connections2
list_connections1
list_connections2
lk_connectionbase_createdonbehalfby
lk_connectionbase_modifiedonbehalfby
modifiedby_connection
msdyn_postalbum_connections1
msdyn_postalbum_connections2
opportunity_connections1
opportunity_connections2
phonecall_connections1
phonecall_connections2
position_connection1
position_connection2
pricelevel_connections1
pricelevel_connections2
processsession_connections1
processsession_connections2
product_connections1
product_connections2
quote_connections1
quote_connections2
recurringappointmentmaster_connections1
recurringappointmentmaster_connections2
resourcegroup_connections1
resourcegroup_connections2
salesorder_connections1
salesorder_connections2
serviceappointment_connections1
serviceappointment_connections2
socialactivity_connections1
socialactivity_connections2
socialprofile_connections1
socialprofile_connections2
systemuser_connections1
systemuser_connections2
task_connections1
task_connections2
team_connections1
team_connections2
territory_connections1
territory_connections2
TransactionCurrency_Connection
```

```
KnowledgeBaseRecord
account
activitypointer
appointment
campaign
campaignactivity
competitor
connection_role
constraintbasedgroup
contact
contract
email
entitlement
entitlementchannel
entitlementtemplatechannel
equipment
fax
goal
incident
invoice
knowledgearticle
lead
letter
list
msdyn_postalbum
opportunity
phonecall
position
pricelevel
processsession
product
quote
recurringappointmentmaster
resourcegroup
salesorder
serviceappointment
socialactivity
socialprofile
systemuser
task
team
territory
```


```
KnowledgeBaseRecord - 知识库文章记录
Account - 客户账户
ActivityPointer - 活动指针
Appointment - 约会
Business_unit_connections - 业务单元连接
Campaign - 活动
CampaignActivity - 活动动作
Competitor - 竞争对手
Connection - 连接
ConnectionRole - 连接角色
ConstraintBasedGroup - 基于约束的组
Contact - 联系人
Contract - 合同
CreatedBy_Connection - 创建者连接
Email - 电子邮件
Entitlement - 权益
EntitlementChannel - 权益频道
EntitlementTemplateChannel - 权益模板频道
Equipment - 设备
Fax - 传真
Goal - 目标
Incident - 事件
Invoice - 发票
KnowledgeArticle - 知识文章
Lead - 线索
Letter - 信件
List - 列表
ModifiedBy_Connection - 修改者连接
Opportunity - 商机
PhoneCall - 电话通话
Position - 职位
PriceLevel - 价格层级
ProcessSession - 流程会话
Product - 产品
Quote - 报价
RecurringAppointmentMaster - 定期约会主记录
ResourceGroup - 资源组
SalesOrder - 销售订单
ServiceAppointment - 服务约会
SocialActivity - 社交活动
SocialProfile - 社交配置文件
SystemUser - 系统用户
Task - 任务
Team - 团队
Territory - 区域
```

## Workflow
- Workflow=Process
  - activestageid
  - Process变种
    - PhoneToCaseProcess
    - LeadToOpportunitySalesProcess
    - OpportunitySalesProcess
    - TranslationProcess
    - NewProcess
    - ExpiredProcess
- Workflow -> NewProcess - 创建实例
- ProcessStage
  - 关联
    - account
    - appointments
    - BookableResource
    - BookableResourceBooking
    - BookableResourceBookingHeader
    - BookableResourceCharacteristic
    - campaignactivities
    - campaignresponses
    - campaigns
    - competitors
    - contact
    - emails
    - Entitlement
    - faxes
    - incident
    - invoices
    - knowledgearticle
    - lead
    - letters
    - lists
    - opportunity
    - phonecalls
    - productpricelevels
    - products
    - quotes
    - recurringappointmentmasters
    - salesliteratures
    - salesorders
    - SyncErrors
    - systemusers
    - tasks
    - teams
- ProcessSession
  - Dialog
