---
tags:
  - ACL
---

# Aliyun ACL

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["oss:*"],
      "Resource": ["acs:oss:*:*:bucket/*"],
      "Condition": {}
    }
  ]
}
```
