# 数据处理

## 工具

### [csvkit](https://csvkit.readthedocs.io)

```bash
pip install csvkit


# Convert Excel to CSV:
in2csv data.xls > data.csv
# Convert JSON to CSV:
in2csv data.json > data.csv
# Print column names:
csvcut -n data.csv
# Select a subset of columns:
csvcut -c column_a,column_c data.csv > new.csv
# Reorder columns:
csvcut -c column_c,column_a data.csv > new.csv
# Find rows with matching cells:
csvgrep -c phone_number -r "555-555-\d{4}" data.csv > matching.csv
# Convert to JSON:
csvjson data.csv > data.json
# Generate summary statistics:
csvstat data.csv
# Query with SQL:
csvsql --query "select name from data where age > 30" data.csv > old_folks.csv
# Import into PostgreSQL:
csvsql --db postgresql:///database --insert data.csv
# Extract data from PostgreSQL:
sql2csv --db postgresql:///database --query "select * from data" > extract.csv
```

### [csv2json](https://github.com/darwin/csv2json)

```bash
# Install
gem install csv2json
# gem install orderedhash

csv2json file.csv > file.json
json2csv file.json > file.csv
```
