---
tags:
  - FAQ
---

# Logging FAQ

## Level

- level - importance - severity
- 日志级别有两种表示方式：
  - SeverityText
  - SeverityNumber - Priority
    - 1-100
    - 0-7
- Severity, Urgency
- Filtering
- Actionability
- Consistency
- Customization
- Extensibility

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
  - 0 unspecified
  - 每个级别 4 个数字
  - 1-4	TRACE
  - 5-8	DEBUG
  - 9-12	INFO
  - 13-16	WARN
  - 17-20	ERROR
  - 21-24	FATAL
- consola
  - -Inf silent
  - 0 error, fatal
  - 1 warn
  - 2 log
  - 3 info, success, fail, start, ready, box
  - 4 debug
  - 5 trace
  - +Inf verbose
  - https://github.com/unjs/consola/blob/main/src/constants.ts
- Log4j
  - Name - Priority
  - OFF 0
  - FATAL 100
  - ERROR 200
  - WARN 300
  - INFO 400
  - DEBUG 500
  - TRACE 600
  - ALL Integer.MAX_VALUE
- zap
  - https://github.com/uber-go/zap/blob/master/zapcore/level.go
  - dpanic - 开发模式下 panic - 有点类似于 assert

---

- silent
- fatal
- error
  - panic
  - critical
- warn
  - warning
- log
- info
  - success
  - fail
  - start
  - ready
- debug
- trace
- verbose

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
