---
title: sql.js
---

# sql.js

- [sql-js/sql.js](https://github.com/sql-js/sql.js) - [NPM](https://www.npmjs.com/package/sql.js) - [DEMO](https://kripken.github.io/sql.js/examples/GUI/index.html)
  - MIT, JS
  - SQLite emscripten

:::tip

- 不依赖 C/node-gyp - Webassembly
- 内存读写 - 支持导入和导出 SQLite
- 如果导入 SQLite 需要将所有数据导入内存 - 对内存占用可能较多
- **不能** 和 SQLite 同时读写相同 DB 文件
- 如果环境支持 Node 建议直接使用 SQLite
- typeorm 支持 sql.js 可以在浏览器使用

:::

```bash
yarn add sql.js
yarn add --dev @types/sql.js
```

## 基础功能

```ts
import initSqlJs from 'sql.js';

// 初始化
const SQL = await initSqlJs();

// 准备数据
const db = new SQL.Database(/* data:Uint8Array 初始数据 */);
db.run('CREATE TABLE test (col1, col2);');
db.run('INSERT INTO test VALUES (?,?), (?,?)', [1, 111, 2, 222]);

// 准备语句
const stmt = db.prepare('SELECT * FROM test WHERE col1 BETWEEN $start AND $end');
stmt.getAsObject({ $start: 1, $end: 1 });

// 查询
stmt.bind({ $start: 1, $end: 2 });
while (stmt.step()) {
  const row = stmt.getAsObject();
  // 返回的行对象
  console.log(row);
}

// 自定义函数
function add(a, b) {
  return a + b;
}
db.create_function('add_js', add);

// 释放占用的内存
stmt.free();

// 导出 DB
const data: Uint8Array = db.export();
```
