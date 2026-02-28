---
title: cowire
---

# cowrie

- [cowrie/cowrie](https://github.com/cowrie/cowrie)
  - BSD-3, Python

```bash
# 提取今天的用户名/密码对
grep 'login\.' /var/log/cowrie/cowrie.json | jq -r '[.username,.password] | @tsv' | sort | uniq -c | sort -rn

# 提取所有日志的 Top IP
grep -h 'login\.' /var/log/cowrie/cowrie.json.* | jq -r '.src_ip' | sort | uniq -c | sort -rn | head 20

# 提取某天的详细记录
cat /var/log/cowrie/cowrie.json.2026-02-26 | jq 'select(.eventid | test("login"))'

# 导出完整 CSV
grep -h 'login\.' /var/log/cowrie/cowrie.json.* | jq -r '[.timestamp,.src_ip,.username,.password,.eventid] | @csv'
```

- Mirai 僵尸网络
  - Mirai 是 2016 年出现的一个开源物联网（IoT）恶意软件，源码被作者公开后衍生出大量变种，至今仍然活跃。
  - https://github.com/jgamblin/Mirai-Source-Code
