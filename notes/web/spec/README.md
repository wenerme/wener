---
id: spec
---

# 规范

- [tc39](https://github.com/tc39) - Ecma International, Technical Committee 39
  - [proposal-collection-methods](https://github.com/tc39/proposal-collection-methods)
    - 额外的集合方法
    - Set.prototype.addAll
- [wicg](https://github.com/WICG) Web Incubator CG
  - [indexed-db-observers](https://github.com/WICG/indexed-db-observers)
    - IndexedDB 支持 observer
    - [chromestatus](https://chromestatus.com/features/5669292892749824)
    - chrome [#457449](https://bugs.chromium.org/p/chromium/issues/detail?id=457449)
      - 尚不支持，需要添加 flag
    - dexie 支持 [Dexie.Observable](https://dexie.org/docs/Observable/Dexie.Observable)
  - [file-system-access](https://github.com/WICG/file-system-access)
    - Chrome 86 - 新的接口规范
    - Typescript [@types/wicg-file-system-access](https://www.npmjs.com/package/@types/wicg-file-system-access)
  - [entries-api](https://wicg.github.io/entries-api)
    - Chrome 7,8 - 浏览器支持最多的文件接口
    - 主要用于支持 drag-and-drop 文件
  - [uuid](https://wicg.github.io/uuid)
    - crypto.randomUUID
- w3c
  - [FileAPI](https://w3c.github.io/FileAPI)
  - [change-password-url](https://w3c.github.io/webappsec-change-password-url)
  - [Web Application Manifest](https://w3c.github.io/manifest)

---

- 获取拖拽文件详细信息
  - [DataTransferItem.getAsFileSystemHandle](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/getAsFileSystemHandle)
    - Chrome 86
  - [DataTransferItem.webkitGetAsEntry](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry)
    - Chrome 13
- FileSystemAccess
- crypto.randomUUID
  - Chrome 92
- FileSystemEntry
  - Chrome 8

## file system access

- https://wpt.fyi/results/file-system-access

## entries api

- DataTransferItem.webkitGetAsEntry
- HTMLInputElement.webkitEntries
- HTMLInputElement.webkitdirectory
- FileSystem
- FileSystemEntry
  - FileSystemEntry
  - FileSystemDirectoryEntry
- 参考
  - mdn [File and Directory Entries API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API)
  - https://wpt.fyi/results/entries-api/idlharness.window.html

```js
window.requestFileSystem ||= window.webkitRequestFileSystem;
window.directoryEntry ||= window.webkitDirectoryEntry;

function onFs(fs) {
  fs.root.getDirectory(
    'Documents',
    { create: true },
    function (directoryEntry) {
      //directoryEntry.isFile === false
      //directoryEntry.isDirectory === true
      //directoryEntry.name === 'Documents'
      //directoryEntry.fullPath === '/Documents'
    },
    onError,
  );
}
function onError(e) {
  console.error(e);
}
// Opening a file system with temporary storage
window.requestFileSystem(TEMPORARY, 1024 * 1024 /*1MB*/, onFs, onError);
```

## FileAPI

- FileList
- Blob
- File
- FileReader
- URL.createObjectURL
- URL.revokeObjectURL
- 参考
  - https://wpt.fyi/results/FileAPI
