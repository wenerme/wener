---
tags:
  - Devlopment
---

# ScyllaDB 开发

- Batch
  - 尽量确保在相同分区
  - max_mutation_size_in_kb
    - commitlog_segment_size_in_mb 至少为 2*max_mutation_size_in_kb/1024
  - batch_size_fail_threshold_in_kb=50

## NodeJS

```bash
pnpm add cassandra-driver
pnpm add -D tsx typescript @types/node

docker exec -it scylla nodetool status
docker exec -it scylla cqlsh -e "CREATE KEYSPACE catalog WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy','datacenter1':1 }"
docker exec -it scylla cqlsh -k catalog -e "CREATE TABLE users (name text, age int, PRIMARY KEY(name))"
```

```js title="test.ts"
import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'catalog',
  // 默认账号密码
  credentials: {
    username: 'cassandra',
    password: 'cassandra',
  },
});

await client.batch(
  [
    {
      query: 'insert into users (name, age) values (?,?)',
      params: ['test', 1],
    },
    {
      query: 'insert into users (name, age) values (?,?)',
      params: ['test2', 1],
    },
    { query: 'update users set age = ? where name = ?', params: [2, 'test2'] },
  ],
  { prepare: true },
);

console.log((await client.execute(`SELECT * FROM users WHERE name = ?`, ['test2'])).rows);
console.log((await client.execute(`SELECT count(1) FROM users`, ['test2'])).rows[0].count);

process.exit(0);
```

```bash
pnpm tsx test.ts
```
