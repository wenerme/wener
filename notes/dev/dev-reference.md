---
title: Reference
tags:
  - Reference
---

# Dev Reference

| type      | min                                      | max                                        | bytes    |    digits |
| --------- | ---------------------------------------- | ------------------------------------------ | -------- | --------: |
| int8      | -128                                     | 127                                        | 1 byte   |  3 digits |
| int16     | -32768                                   | 32767                                      | 2 bytes  |  5 digits |
| int32     | -2147483648                              | 2147483647                                 | 4 bytes  | 10 digits |
| int64     | -9223372036854775808                     | 9223372036854775807                        | 8 bytes  | 19 digits |
| uint8     | 0                                        | 255                                        | 1 byte   |  3 digits |
| uint16    | 0                                        | 65535                                      | 2 bytes  |  5 digits |
| uint32    | 0                                        | 4294967295                                 | 4 bytes  | 10 digits |
| uint64    | 0                                        | 18446744073709551615                       | 8 bytes  | 20 digits |
| js number | -9007199254740991                        | 9007199254740991                           | 8 bytes  | 16 digits |
| int128    | -170141183460469231731687303715884105728 | 170141183460469231731687303715884105727    | 16 bytes | 39 digits |
| uint128   | 0                                        | 340282366841710300949128831971969468211455 | 16 bytes | 39 digits |

```js
// max uint128
console.log(2n ** 128n);
```

| Availability % | Downtime per year | Downtime per month (30 days) | Downtime per week | notes |
| :------------- | ----------------: | ---------------------------: | ----------------: | ----- |
| 90%            |         36.5 days |                     72 hours |        16.8 hours | 1个9  |
| 95%            |        18.25 days |                     36 hours |         8.4 hours |
| 97%            |        10.96 days |                   21.6 hours |        5.04 hours |
| 98%            |         7.30 days |                   14.4 hours |        3.36 hours |
| 99%            |         3.65 days |                   7.20 hours |        1.68 hours | 2个9  |
| 99.50%         |         1.83 days |                   3.60 hours |      50.4 minutes |
| 99.80%         |       17.52 hours |                86.23 minutes |     20.16 minutes |
| 99.9%          |        8.76 hours |                 43.2 minutes |      10.1 minutes | 3个9  |
| 99.95%         |        4.38 hours |                21.56 minutes |      5.04 minutes |
| 99.99%         |     52.56 minutes |                 4.32 minutes |      1.01 minutes | 4个9  |
| 99.999%        |      5.26 minutes |                 25.9 seconds |      6.05 seconds | 5个9  |
| 99.9999%       |      31.5 seconds |                 2.59 seconds |     0.605 seconds | 6个9  |
