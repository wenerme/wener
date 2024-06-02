---
title: 数据格式
---

# Schema

## PhonNumber

- https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers

**US 10 digits**

```
^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
```

- https://stackoverflow.com/a/16699507/1870054
- https://regex101.com/r/j48BZs/2

**中国**

- Landlines
  - (0XXX) YYY YYYY
    - XXX ,2-3 位, trunks
    - YYYY YYYY, 7-8 位, subscriber/local number
- 手机号
  - 1WX YYYY ZZZZ
    - W 3-9
- Toll Free
  - 400 XXX XXXX
  - 800 XXXX XXXX
- Service numbers
  - 3-5 位
