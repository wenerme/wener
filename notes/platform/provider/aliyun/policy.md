---
title: Aliyun Policy
tags:
  - Platform
  - Aliyun
  - Policy
---

# Aliyun Policy

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["cr:Get*", "cr:List*", "cr:PullRepository"],
      "Resource": ["acs:cr:*:*:repository/incmirror/*"],
      "Effect": "Allow"
    }
  ]
}
```
