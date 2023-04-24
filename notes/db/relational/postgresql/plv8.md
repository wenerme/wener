---
title: plv8
---

# PLV8

- [plv8/plv8](https://github.com/plv8/plv8)

```sql
CREATE EXTENSION plv8;
SELECT plv8_version();
SELECT plv8_info();

-- reset globalThis
SELECT plv8_reset();
SELECT plv8_reset('context');

DO $$ plv8.elog(NOTICE, "hello there!"); $$ LANGUAGE plv8;
```

- plv8.memory_limit=265
  - MB
- plv8.max_eval_size=2MB
- plv8.v8_flags
- plv8.execution_timeout=300
- builtins
  - `plv8.elog(LEVEL,messages...)`
  - plv8.quote_literal, plv8.nullable, plv8.quote_ident
  - plv8.find_function
  - plv8.version
  - plv8.memory_usage
  - plv8.run_script - eval
  - `plv8.execute(sql [, args])`
  - `plv8.prepare(sql [, typenames])`
  - `PreparedPlan.execute([ args ])`
  - `PreparedPlan.cursor([ args ])`
  - `PreparedPlan.free`
  - `Cursor.fetch([ nrows ])`
  - `Cursor.move`
  - `Cursor.close`
  - `plv8.subtransaction`
  - WindowObject
- [divyenduz/plv8ify](https://github.com/divyenduz/plv8ify)
