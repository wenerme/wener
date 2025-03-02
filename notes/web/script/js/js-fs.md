---
tags:
  - Spec
---

# JS File System API


- FileSystem - `{name,root}`
  - Chrome 7, Safari 11.1
- FileSystemEntry
  - FileSystemEntry
  - FileSystemDirectoryEntry
    - FileSystemDirectoryEntry.createReader()
  - FileSystemDirectoryReader
- FileSystemHandle
  - .kind =  directory | file
  - FileSystemDirectoryHandle
    - .entries()
- 类型定义
  - npm:@types/wicg-file-system-access
  - npm:@types/filesystem

**获取 FS 的方式**

- drop 事件
  - DataTransferItem.webkitGetAsEntry
  - DataTransferItem.getAsFileSystemHandle
- HTMLInputElement.webkitdirectory `<input type="file" webkitdirectory>`
  - HTMLInputElement.webkitEntries
- Window.showDirectoryPicker
- Window.showOpenFilePicker
- Window.showSaveFilePicker
- ~~Window.requestFileSystem~~

---

- 参考
  - mdn [File and Directory Entries API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API)
  - [File System Access](https://wicg.github.io/file-system-access/)
    - Chrome 86
    - `Window.{showDirectoryPicker,showOpenFilePicker,showSaveFilePicker}`
    - `handle.queryPermission()`
  - https://wpt.fyi/results/entries-api/idlharness.window.html
  - https://wpt.fyi/results/file-system-access
  - https://fs.spec.whatwg.org/

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

```ts
interface FilePickerAcceptType {
  description: string;
  accept: Record<string, string | string[]>;
}

enum WellKnownDirectory {
  Desktop = 'desktop',
  Documents = 'documents',
  Downloads = 'downloads',
  Music = 'music',
  Pictures = 'pictures',
  Videos = 'videos',
}
```
