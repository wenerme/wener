---
tags:
  - Logging
---

# 审计

**目的**

- 数据溯源（Data Provenance）
- 数据血缘（Data Lineage）
- 不可否认性（Non-Repudiation）

**场景**

- request_log
  - 请求日志
- entity_log
  - 实体日志
- task_case_log
  - 任务流程日志
- audit_log
  - 应用审计日志
- CDC - Change Data Capture
  - 变更数据捕获
- Event Source
  - 事件源

---

日志内容

- 上下文
- 环境
- 用户
- 操作
- 结果
- 时间
- 备注
- 其他
- 元数据

```
谁（Who）、在何时（When）、何地（Where）、做了什么（What）

Actor
Action
Timestamp
Context
Target
Metadata
```

```ts
type Audit = {
  actor?: {
    id?: string;
    type?: string;
    displayName?: string;
    fullName?: string;

    userAgent?: string;
    ipAddress?: string;

    [key: string]: any;
  };
  action?: {
    type?: string; // 分类
    name?: string;
    description?: string;
    level?: string;

    [key: string]: any;
  };
  target?: {
    id?: string;
    type?: string;
    displayName?: string;
    fullName?: string;
    before?: any;
    diff?: any;
    after?: any;
    [key: string]: any;
  };
  timestamp?: string | number | Date;
  context?: {
    serviceName?: string;
    serviceVersion?: string;
    hostname?: string;
    requestId?: string;
    sessionId?: string;
    clientId?: string;
    instanceId?: string;
    traceId?: string;
    spanId?: string;

    [key: string]: any;
  };

  message?: string;
  code?: string | number;
  reason?: string;
  error?: boolean;
  result?: any;

  metadata?: Record<string, any>;
};
```

- “成本中心” -> “价值中心”

## 政策法规

- GDPR
- SOX
- HIPAA
- PCI DSS

## 参考

- Salesforce：字段审计追踪（Field Audit Trail）
- SAP S/4HANA：统一审计日志（UAL）
- Oracle Fusion Cloud ERP：审计追踪
