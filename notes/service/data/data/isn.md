---
title: ISBN & ISSN 标准
tags:
  - Data
  - Standard
  - ISBN
  - ISSN
  - Book
---

# ISBN & ISSN 标准

- [Wikipedia: ISMN](https://en.wikipedia.org/wiki/International_Standard_Music_Number)
- [PostgreSQL: ISN Data Type](https://www.postgresql.org/docs/current/static/isn.html)
- [ISBNSearch](https://isbnsearch.org/)
- [ISBNdb](https://isbndb.com/)

## ISBN (国际标准书号)

- **结构 (10位)**:
  - 组号 (Group Identifier, 如 '7' 代表中国)
  - 为出版者号 (Publisher Identifier)
  - 书名号 (Title Identifier)
  - 校验号 (Check Digit, 模数 11)

> 示例: `7-118-01984-4` (中国, 国防工业出版社, 书名号, 校验号)

## ISSN (国际标准期刊号)

- **ISO 3297** 标准，用于连续出版物（期刊，杂志）。
- **格式**: 8位数字，分为两组，每组4位，中间用连字符分隔 (例如 `ISSN 0211-9153`)。
- 最后一位为校验位。
