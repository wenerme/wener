---
title: Schema
---

# Dynamic356 Schema

| alias                               | entity           |
| ----------------------------------- | ---------------- |
| activitypointer                     | Activity         |
| kbarticle                           | Article          |
| incident                            | Case             |
| incidentresolution, notcustomizable | Case Resolution  |
| contractdetail                      | Contract Line    |
| transactioncurrency                 | Currency         |
| discounttype                        | Discount         |
| list                                | Marketing List   |
| salesorder                          | Order            |
| pricelevel                          | Price List       |
| serviceappointment                  | Service Activity |

- `Article (kbarticle)` -> `Knowledge Article (knowledgearticle)`
  - 废弃 `kbarticle` , `kbarticlecomment`, `kbarticletemplate`
  - [KnowledgeBaseRecord](https://msdn.microsoft.com/en-au/library/dn996872.aspx)
    - https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/knowledgebaserecord?view=op-9-1
  - [Deprecation announcements with Dynamics CRM Online 2016 Update 1 and Microsoft Dynamics CRM 2016 Service Pack 1](https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2016/06/17/deprecation-announcements-with-dynamics-crm-online-2016-update-1-and-microsoft-dynamics-crm-2016-service-pack-1/)
  - [[KB] Understanding Dynamics 365 kbarticle vs knowledgebaserecord vs knowledgearticle entities](https://community.dynamics.com/blogs/post/?postid=97501c3e-626e-47d1-b126-db81b996e80c)
  - Interactive Service Hub > Knowledge Management System
    - Dynamics CRM 2016

## State & Status

- statecode - Status
- statuscode - Status Reason

| Entity            | State          | Status                            |
| ----------------- | -------------- | --------------------------------- |
| Account           | 0 Active       | 1 Active                          |
| ^                 | 1 Inactive     | 2 Inactive                        |
| Activity          | 0 Open         | 1 Open                            |
| ^                 | 1 Completed    | 2 Completed                       |
| ^                 | 2 Canceled     | 3 Canceled                        |
| ^                 | 3 Scheduled    | 4 Scheduled                       |
| Appointment       | 0 Open         | 1 Free                            |
| ^                 | ^              | 2 Tentative                       |
| ^                 | 1 Completed    | 3 Completed                       |
| ^                 | 2 Canceled     | 4 Canceled                        |
| ^                 | 3 Scheduled    | 5 Busy                            |
| ^                 | ^              | 6 Out of Office                   |
| Article           | 1 Draft        | 1 Draft                           |
| ^                 | 2 Unapproved   | 2 Unapproved                      |
| ^                 | 3 Published    | 3 Published                       |
| Campaign          | 0 Active       | 0 Proposed                        |
| ^                 | ^              | 1 Ready To Launch                 |
| ^                 | ^              | 2 Launched                        |
| ^                 | ^              | 3 Completed                       |
| ^                 | ^              | 4 Canceled                        |
| ^                 | ^              | 5 Suspended                       |
| Campaign Activity | 0 Open         | 0 In Progress                     |
| ^                 | ^              | 1 Proposed                        |
| ^                 | ^              | 4 Pending                         |
| ^                 | ^              | 5 System Aborted                  |
| ^                 | ^              | 6 Completed                       |
| ^                 | 1 Closed       | 2 Closed                          |
| ^                 | 2 Canceled     | 3 Canceled                        |
| Campaign Response | 0 Open         | 1 Open                            |
| ^                 | 1 Closed       | 2 Closed                          |
| ^                 | 2 Canceled     | 3 Canceled                        |
| Case              | 0 Active       | 1 In Progress                     |
| ^                 | ^              | 2 On Hold                         |
| ^                 | ^              | 3 Waiting for Details             |
| ^                 | ^              | 4 Researching                     |
| ^                 | 1 Resolved     | 5 Problem Solved                  |
| ^                 | 2 Canceled     | 6 Canceled                        |
| Case Resolution   | 0 Open         | 1 Open                            |
| ^                 | 1 Completed    | 2 Closed                          |
| ^                 | 2 Canceled     | 3 Canceled                        |
| Contact           | 0 Active       | 1 Active                          |
| ^                 | 1 Inactive     | 2 Inactive                        |
| Contract          | 0 Draft        | 1 Draft                           |
| ^                 | 1 Invoiced     | 2 Invoiced                        |
| ^                 | 2 Active       | 3 Active                          |
| ^                 | 3 On Hold      | 4 On Hold                         |
| ^                 | 4 Canceled     | 5 Canceled                        |
| ^                 | 5 Expired      | 6 Expired                         |
| Contract Line     | 0 Existing     | 1 New                             |
| ^                 | 1 Renewed      | 2 Renewed                         |
| ^                 | 2 Canceled     | 3 Canceled                        |
| ^                 | 3 Expired      | 4 Expired                         |
| Currency          | 0 Active       | 0 Active                          |
| ^                 | 1 Inactive     | 1 Inactive                        |
| Discount          | 0 Active       | 100001 Active                     |
| ^                 | 1 Inactive     | 100002 Inactive                   |
| E-mail            | 0 Open         | 1 Draft                           |
| ^                 | ^              | 8 Failed                          |
| ^                 | 1 Completed    | 2 Completed                       |
| ^                 | ^              | 3 Sent                            |
| ^                 | ^              | 4 Received                        |
| ^                 | ^              | 6 Pending Send                    |
| ^                 | ^              | 7 Sending                         |
| ^                 | 2 Canceled     | 5 Canceled                        |
| Fax               | 0 Open         | 1 Open                            |
| ^                 | 1 Completed    | 2 Completed                       |
| ^                 | ^              | 3 Sent                            |
| ^                 | ^              | 4 Received                        |
| ^                 | 2 Canceled     | 5 Canceled                        |
| Invoice           | 0 Active       | 1 New                             |
| ^                 | ^              | 2 Partially Shipped               |
| ^                 | ^              | 4 Billed                          |
| ^                 | ^              | 5 Booked (applies to services)    |
| ^                 | ^              | 6 Installed (applies to services) |
| ^                 | ~~1 Closed~~   | ~~3 Canceled~~                    |
| ^                 | ^              | ~~7 Paid in Full~~                |
| ^                 | 2 Paid         | 100001 Complete                   |
| ^                 | ^              | 100002 Parial                     |
| ^                 | 3 Canceled     | 100003 Canceled                   |
| Lead              | 0 Open         | 1 New                             |
| ^                 | ^              | 2 Contacted                       |
| ^                 | 1 Qualified    | 3 Qualified                       |
| ^                 | 2 Disqualified | 4 Lost                            |
| ^                 | ^              | 5 Cannot Contact                  |
| ^                 | ^              | 6 No Longer Interested            |
| ^                 | ^              | 7 Canceled                        |
| Letter            | 0 Open         | 1 Open                            |
| ^                 | ^              | 2 Draft                           |
| ^                 | 1 Completed    | 3 Received                        |
| ^                 | ^              | 4 Sent                            |
| ^                 | 2 Canceled     | 5 Canceled                        |
| Marketing List    | 0 Active       | 0 Active                          |
| ^                 | 1 Inactive     | 1 Inactive                        |
| Opportunity       | 0 Open         | 1 In Progress                     |
| ^                 | ^              | 2 On Hold                         |
| ^                 | 1 Won          | 3 Won                             |
| ^                 | 2 Lost         | 4 Canceled                        |
| ^                 | ^              | 5 Out-Sold                        |
| Order             | 0 Active       | 1 New                             |
| ^                 | ^              | 2 Pending                         |
| ^                 | 1 Submitted    | 3 In Progress                     |
| ^                 | 2 Canceled     | 4 No Money                        |
| ^                 | 3 Fulfilled    | 100001 Complete                   |
| ^                 | ^              | 100002 Partial                    |
| ^                 | 4 Invoiced     | 100003 Invoiced                   |
| Phone Call        | 0 Open         | 1 Open                            |
| ^                 | 1 Completed    | 2 Made                            |
| ^                 | ^              | 4 Received                        |
| ^                 | 2 Canceled     | 3 Canceled                        |
| Price List        | 0 Active       | 100001 Active                     |
| ^                 | 1 Inactive     | 10002 Inactive                    |
| Product           | 0 Active       | 1 Active                          |
| ^                 | 1 Inactive     | 2 Inactive                        |
| Quote             | 0 Draft        | 1 In Progress                     |
| ^                 | 1 Active       | 2 In Progress                     |
| ^                 | ^              | 3 Open                            |
| ^                 | 2 Won          | 4 Won                             |
| ^                 | ^              | 5 Out-Sold                        |
| ^                 | 3 Closed       | 5 Lost                            |
| ^                 | ^              | 6 Canceled                        |
| ^                 | ^              | 7 Revised                         |
| Service Activity  | 0 Open         | 1 Requested                       |
| ^                 | ^              | 2 Tentative                       |
| ^                 | 1 Closed       | 8 Completed                       |
| ^                 | 2 Canceled     | 9 Canceled                        |
| ^                 | ^              | 10 No Show                        |
| ^                 | 3 Scheduled    | 3 Pending                         |
| ^                 | ^              | 4 Reserved                        |
| ^                 | ^              | 6 In Progress                     |
| ^                 | ^              | 7 Arrived                         |
| Task              | 0 Open         | 2 Not Started                     |
| ^                 | ^              | 3 In Progress                     |
| ^                 | ^              | 4 Waiting on someone else         |
| ^                 | ^              | 7 Deferred                        |
| ^                 | 1 Completed    | 5 Completed                       |
| ^                 | 2 Canceled     | 6 Canceled                        |

- https://www.tpein.dk/?page_id=210
- https://gist.github.com/alikrc/2871a31b5fc237b730a45998e5eb5cb3
