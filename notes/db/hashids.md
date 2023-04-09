---
title:
---

# Hashids

- [niieani/hashids.js](https://github.com/niieani/hashids.js)
  - 用于混淆 IDs
  - 数字+salt -> hash
  - 不支持负数
  - 默认 alphabet - abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
  - 默认不会相邻 - 分隔符 - cfhistuCFHISTU

```js
// salt, minLength, alphabet, curses
var hashids = new Hashids('this is my salt', 8, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
var id = hashids.encode(12345);
// id = "NkK9gjkv"
// 结果均为 array
console.log(`${id} -> ${hashids.decode(id)[0]}`);
```

**PostgreSQL**

```sql
create extension if not exists pg_hashids;
-- id_encode(number,salt,min_length,alphabet)
select id_encode(1234567, 'This is my salt', /*min length*/ 10, /* alphabet */ 'abcdefghijABCDxFGHIJ1234567890');
-- id_decode
```

- [iCyberon/pg_hashids](https://github.com/iCyberon/pg_hashids)

| chars                                                                | len | range           | note               |
| -------------------------------------------------------------------- | --- | --------------- | ------------------ |
| abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890       | 62  | a-zA-Z0-9       |
| abcdefghijklmnopqrstuvwxyz1234567890                                 | 36  | a-z0-9          |
| abcdefghijklmnopqrstuvwxyz1234567890-                                | 37  | -a-z0-9         | 域名有效           |
| `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._~` | 64  | `-._~a-zA-Z0-9` | URL Safe, RFC 3986 |
