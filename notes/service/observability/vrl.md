---
title: vrl
---

# vrl

- Vector Remap Language
- https://vector.dev/docs/reference/vrl/
- https://playground.vrl.dev/
- https://vector.dev/docs/reference/vrl/examples/

```bash
vector vrl --input input.json --program run.vrl --print-object
```

## syslog

- parse_syslog
  - appname
  - hostname
  - message
  - timestamp

```vrl
structured =
  parse_syslog(.message) ??
  parse_common_log(.message) ??
  parse_regex!(.message, r'^(?P<timestamp>\d+/\d+/\d+ \d+:\d+:\d+) \[(?P<severity>\w+)\] (?P<pid>\d+)#(?P<tid>\d+):(?: \*(?P<connid>\d+))? (?P<message>.*)$')
. = merge(., structured)
```

```vrl
structured = parse_syslog(.message) ?? {}
. = merge(., structured)
```
