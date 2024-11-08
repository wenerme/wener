---
tags:
  - FAQ
---

# Logging FAQ

## Level

- level - importance - severity

| mean        | level  | syslog             | console | go/slog | OpenTelemetry | slf4j |
| ----------- | ------ | ------------------ | ------- | ------- | ------------- | ----- |
| Emergency   | emerg  | 0,~~panic~~        |         |         |               |       |
| Alert       | alert  | 1                  |         |         |               |       |
| Critical    | crit   | 2                  |         |         |               |       |
| Fatal       | fatal  |                    |         |         | FATAL, 21-24  |       |
| Error       | error  | 3,err,~~error~~    | ✅      | 8       | ERROR, 17-20  |       |
| Warning     | warn   | 4,warning,~~warn~~ | ✅      | 4       | WARN, 13-16   |       |
| Notice      | notice | 5                  |         |         |               |       |
| Information | info   | 6                  | ✅      | 0       | INFO, 9-12    |       |
| Debug       | debug  | 7                  | ✅      | -4      | DEBUG, 5-8    |       |
| Trace       | trace  |                    | ✅      |         | TRACE, 1-4    |       |

- https://opentelemetry.io/docs/specs/otel/logs/
  - SeverityText
  - SeverityNumber
