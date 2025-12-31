---
title: Consul ACL Policies
tags:
  - DevOps
  - Service
  - Consul
  - ACL
  - Security
---

# Consul ACL Policies

## Example Policies

### Global Management

The following HCL defines a global management policy with write access to all prefixes and resources.

```hcl
acl = "write"
operator = "write"

agent_prefix "" {
  policy = "write"
}

event_prefix "" {
  policy = "write"
}

key_prefix "" {
  policy = "write"
}

keyring = "write"

node_prefix "" {
  policy = "write"
}

query_prefix "" {
  policy = "write"
}

service_prefix "" {
  policy = "write"
  intentions = "write"
}

session_prefix "" {
  policy = "write"
}
```
