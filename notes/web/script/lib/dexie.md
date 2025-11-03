---
title: dexie
---

# dexie

- [dexie/Dexie.js](https://github.com/dexie/Dexie.js)
  - Apache-2.0, JS, TS
  - A Minimalistic Wrapper for IndexedDB
- dexie-react-hooks
  - [useLiveQuery](<https://dexie.org/docs/dexie-react-hooks/useLiveQuery()>)
    - 会 observe 数据变化
    - 基于 liveQuery 方法
- dexie-observable
  - 提供 `db.on('changes')`
- dexie-export-import
  - 导入、导出 IndexedDB <-> Blob
- 参考
  - https://dexie.org/docs/DerivedWork

:::caution

- NodeJS 持久化 [#480](https://github.com/dexie/Dexie.js/issues/480)
  - [dumbmatter/fakeIndexedDB](https://github.com/dumbmatter/fakeIndexedDB)
    - 内存实现 IndexedDB API - mock 用
- 默认不支持自动生成 uuid 这样的 id

:::

```bash
npm add dexie dexie-react-hooks
```

- schema
  - `++` 自增长主键
  - `&` 唯一索引
  - `*` 多值索引 - 数组
  - `[A+B]` 组合索引或主键
- 索引数据类型
  - string, number, Date, Array
  - 不能索引 boolean, null, undefined

```js
var db = new Dexie('MyDatabase');
db.version(1).stores({
  friends: '++id,name,shoeSize', // 自增长 PK id
  pets: 'id, name, kind', // 非自增长 PK id
  cars: '++, name', // 自增长 PK, 隐藏
  enemies: ',name,*weaknesses', // 隐藏非自增长 PK
  users: 'meta.ssn, addr.city', // keyPath
  people: '[name+ssn], &ssn', // 组合主键
});
```

```js
const db = new Dexie('MyDatabase');
db.version(1).stores({
  // friends: '++id, name, age',
  users: '$$uuid,name',
});

// liveQuery 可以 watch 结果
// https://dexie.org/docs/liveQuery()
const friendsObservable = Dexie.liveQuery(() => db.friends.where('age').between(18, 25).toArray());
const subscription = friendsObservable.subscribe({
  next: (result) => console.log('Got result:', JSON.stringify(result)),
  error: (error) => console.error(error),
});
// 触发 liveQuery
await db.friends.add({ name: 'wener', age: 20 });

// dexie-observable
db.on('changes', function (changes) {
  changes.forEach(function (change) {
    switch (change.type) {
      case 1: // CREATED
        console.log('CREATED: ' + JSON.stringify(change.obj));
        break;
      case 2:
        console.log(`UPDATED ${change.key}: ` + JSON.stringify(change.mods));
        break;
      case 3:
        console.log(`DELETED: ` + JSON.stringify(change.oldObj));
        break;
    }
  });
});
```

## Notes

:::tip

- mapToClass, defineClass 可以将数据转为 Class 方便使用

:::

- Table -> IDBObjectStore
  - hook - creating, reading, updating, deleting
- Collection
  - Query builder
- [Dexie.Syncable](https://dexie.org/docs/Syncable/Dexie.Syncable.js)
  - 同步协议

## SyncProtocol

```ts
interface ISyncProtocol {
    /** Maximum number of changes per sync() call. Default Infinity. */
    partialsThreshold?: number;

    /** Called by the framework to send changes to server and
     * receive changes back from server. */
    sync (
        context: IPersistedContext,
        url: string,
        options: Object,
        baseRevision: any,
        syncedRevision: any,
        changes: IDatabaseChange[],
        partial: boolean,
        applyRemoteChanges: ApplyRemoteChangesFunction,
        onChangesAccepted: ()=>void,
        onSuccess: (continuation: Continuation)=>void,
        onError: (error: any, again?: number) => void)
    : void;
}
```

- [ISyncProtocol](https://dexie.org/docs/Syncable/Dexie.Syncable.ISyncProtocol)
- https://dexie.org/docs/Syncable/Dexie.Syncable.js.html
- [AjaxSyncProtocol](https://github.com/dexie/Dexie.js/blob/master/samples/remote-sync/ajax/AjaxSyncProtocol.js)
  - 使用 jQuery 发起 ajax 请求
- [WebSocketSyncProtocol](https://github.com/dexie/Dexie.js/blob/master/samples/remote-sync/websocket/WebSocketSyncProtocol.js)
  - [WebSocketSyncServer](https://github.com/dexie/Dexie.js/blob/master/samples/remote-sync/websocket/WebSocketSyncServer.js)
- [StorageManager](https://dexie.org/docs/StorageManager)
