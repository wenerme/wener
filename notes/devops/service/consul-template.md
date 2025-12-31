---
title: Consul Template
tags:
  - DevOps
  - Service
  - Consul
  - Automation
---

# Consul Template

[Consul Template](https://github.com/hashicorp/consul-template) provides a convenient way to populate values from Consul into the file system.

## Installation

```bash
brew install consul-template
```

## Usage

Example of reading a key:

```hcl
{{ key "/hashicorp/street_address" }}
```

Execution command:

```bash
consul-template -template "find_address.tpl:hashicorp_address.txt"
```

### Syntax

格式: `模板:目标文件:命令`

```bash
consul-template \
  -consul-addr "10.4.4.6:8500" \
  -vault-addr "https://10.5.32.5:8200"
```

## Links

- [Official Tutorial](https://learn.hashicorp.com/consul/developer-configuration/consul-template)
- [Internal Instance](https://consul.zhensi.wode.co/)
