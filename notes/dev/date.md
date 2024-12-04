---
tags:
  - Topic
---

# Date & Time

- JSON 标准为 ISO Date String `RFC 3339` - `2022-01-12T00:00:00Z`
- jsonschema
  - type=string
    - format=date-time - `yyyy-MM-dd HH:mm:ssZ` - `2022-01-12T00:00:00Z`
    - format=date - `yyyy-MM-dd` - `2022-01-12`
    - format=time - `HH:mm:ss` - `00:00:00`
      - `hh:mm:ss[.sss][Z|(+|-)hh:mm]`
- https://tc39.es/proposal-temporal/docs/
