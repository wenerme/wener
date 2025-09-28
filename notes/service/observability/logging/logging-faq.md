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


```

/*
Bunyan
 const levels = {
    FATAL: 60,
    ERROR: 50,
    WARN: 40,
    INFO: 30,
    DEBUG: 20,
    TRACE: 10
  }

  Pino
  const levels = {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  }
Winston
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  }
Syslog RFC 3164
0 = Emergency
1 = Alert
2 = Critical
3 = Error
4 = Warning
5 = Notice
6 = Informational
7 = Debug
 */
```
