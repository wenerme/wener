---
tags:
  - Cookbook
---

# MySQL Cookbook

## table_size

```sql
CREATE VIEW table_size AS
SELECT
    table_schema AS table_schema,
    table_name AS table_name,
    table_rows AS row_estimate,
    data_length + index_length AS total_bytes,
    data_length AS table_bytes,
    index_length AS index_bytes,
    data_free AS free_space,
    CONCAT(ROUND((data_length + index_length) / 1024 / 1024, 2), ' MB') AS total_pretty,
    CONCAT(ROUND(data_length / 1024 / 1024, 2), ' MB') AS table_pretty,
    CONCAT(ROUND(index_length / 1024 / 1024, 2), ' MB') AS index_pretty
FROM
    information_schema.tables
WHERE
    table_type = 'BASE TABLE'
ORDER BY
    total_bytes DESC;
```
