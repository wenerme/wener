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


# Cookbook

```vrl
# use node name instead of pod name
.host = get_env_var("VECTOR_SELF_NODE_NAME") ?? null
# avoid override, used for routing
._file = .file

# parsing
msg = string!(.message)
if starts_with(msg,"{") && ends_with(msg,"}") {
  del(.message)
  . |= object(parse_json(msg) ?? {}) ?? {}
} else if starts_with(msg,"time=") {
  del(.message)
  . |= parse_key_value(msg) ?? {}
  if .timestamp == null && .time != null {.timestamp = .time}
} else if match(msg,r'^[IWEF]\d{4}'){
  # will override .file
  . |= parse_klog(msg) ?? {}
} else {
  r = parse_syslog(.message) ?? {}
  if r.appname != null { . |= r }
}

if .message == null {
  if .msg != null {
    .message = .msg
    del(.msg)
  }else {
    .message = ""
  }
}

# time for collector
if ._timestamp == null && .timestamp != null {._timestamp = .timestamp}
```
