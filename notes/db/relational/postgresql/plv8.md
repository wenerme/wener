---
title: plv8
---

# PLV8

- [plv8/plv8](https://github.com/plv8/plv8)

:::tip 尽量走 globalThis 执行

```sql
create or replace function my_function(name text,options jsonb default jsonb_build_object()) returns jsonb immutable strict as $JS$

if(globalThis.my_function)return globalThis.my_function(name,options);

// Real code

globalThis.my_function = my_function;
return globalThis.my_function(name,options);

$JS$ language plv8;
```

减少代码执行量

- e.g. 4500 loc, 300ms -> 3ms

:::


:::tip

因为 PostgreSQL 使用  forking model，因此不会有真正的全局上下文，每个 context 会在 connection 关闭时销毁。

:::

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

## Trigger

- NEW
- OLD
- TG_NAME
- TG_WHEN
- TG_LEVEL
- TG_OP
- TG_RELID
- TG_TABLE_NAME
- TG_TABLE_SCHEMA
- TG_ARGV

## build

```makefile
my_function:
	pnpm esbuild --format=cjs --charset=utf8 --legal-comments=external --bundle --define:process.env.NODE_ENV=\"production\" --define:__DEV__=false \
		--minify-syntax \
		--minify-whitespace \
		--outfile=dist/my_function.cjs \
		--banner:js='const module = { exports: {} }' \
		./src/functions/my_function.ts
	echo 'create or replace function my_function(name text,options jsonb default jsonb_build_object()) returns jsonb immutable strict as $$JS$$' > dist/my_function.sql
	pnpm prettier --write dist/my_function.cjs
	echo 'if(globalThis.my_function)return globalThis.my_function(name,options);' >> dist/my_function.sql
	cat dist/my_function.cjs >> dist/my_function.sql
	echo 'globalThis.my_function = my_function' >> dist/my_function.sql
	echo 'return globalThis.my_function(name,options);' >> dist/my_function.sql
	echo '$$JS$$ language plv8;' >> dist/my_function.sql
	cp dist/my_function.sql ./db/migrations/100001_my_function.sql
```

## commonjs module

- https://github.com/JerrySievert/plv8-modules/blob/master/sql/001-startup.sql
- plv8.start_proc = 'commonjs.plv8_startup'
