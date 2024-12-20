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

## analyze_small_tables

```sql
DELIMITER $$

CREATE PROCEDURE analyze_small_tables()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE schema_name VARCHAR(255);
  DECLARE table_name VARCHAR(255);
  DECLARE cur CURSOR FOR
    SELECT table_schema, table_name
    FROM table_size
    WHERE table_schema not in ('information_schema', 'performance_schema', 'mysql','sys')
      AND row_estimate < 10;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO schema_name, table_name;
    IF done THEN
      LEAVE read_loop;
    END IF;

    SET @stmt = CONCAT('ANALYZE TABLE ', schema_name, '.', table_name);
    PREPARE stmt FROM @stmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END LOOP;

  CLOSE cur;
END$$

DELIMITER ;
```
