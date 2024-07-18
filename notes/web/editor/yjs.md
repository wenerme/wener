---
title: yjs
---

# yjs

- [yjs/yjs](https://github.com/yjs/yjs)
  - Shared data types for building collaborative software
- Providers
  - y-webrtc
  - y-websocket
  - y-indexeddb
  - y-libp2p
  - y-dat
- 参考
  - https://github.com/yjs/yjs/blob/main/INTERNALS.md
  - [YousefED/Matrix-CRDT](https://github.com/YousefED/Matrix-CRDT)
    - Matrix-CRDT Yjs provider
    - MSC2477: User-defined ephemeral events in rooms [#2477](https://github.com/matrix-org/matrix-spec-proposals/pull/2477)


```ts
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const ymap = ydoc.getMap()
ymap.set('keyA', 'valueA')

const ydocRemote = new Y.Doc()
const ymapRemote = ydocRemote.getMap()
ymapRemote.set('keyB', 'valueB')

const update = Y.encodeStateAsUpdate(ydocRemote)
Y.applyUpdate(ydoc, update)

console.log(ymap.toJSON()) // => { keyA: 'valueA', keyB: 'valueB' }
```
