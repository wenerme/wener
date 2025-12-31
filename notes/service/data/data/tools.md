---
title: 数据处理工具 (CLI)
tags:
  - Data
  - CSV
  - JSON
  - CLI
  - Tools
---

# 数据处理工具 (CLI)

## csvkit

[csvkit](https://csvkit.readthedocs.io) 是一套用于转换和处理 CSV 的实用工具集。

```bash
pip install csvkit

# Excel 转 CSV
in2csv data.xls > data.csv
# JSON 转 CSV
in2csv data.json > data.csv

# 处理
csvcut -n data.csv                           # 打印列名
csvcut -c column_a,column_c data.csv         # 选择子集
csvcut -c column_c,column_a data.csv         # 重排序
csvgrep -c phone -r "555-555-\d{4}" data.csv # 正则过滤

# 分析
csvstat data.csv

# SQL 交互
csvsql --query "select name from data where age > 30" data.csv > subset.csv
csvsql --db postgresql:///database --insert data.csv
sql2csv --db postgresql:///database --query "select * from data" > extract.csv
```

## csv2json

[csv2json](https://github.com/darwin/csv2json) (Ruby gem)

```bash
gem install csv2json

csv2json file.csv > file.json
json2csv file.json > file.csv
```
